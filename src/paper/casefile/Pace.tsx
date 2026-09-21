import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Pace — the second grip wave.
 *
 * `Grip.tsx` holds the things that *land*. This holds the things that **move
 * between them**: the ramps, jolts, sweeps and counters that make a sequence
 * feel fast rather than merely short.
 *
 * Pace is not speed. A film can cut every second and still feel slow, because
 * what creates pace is **variation** — a hard stop after a rush, a held frame
 * after a jolt, a number that arrives at a different rate than the one before
 * it. Everything here exists to give a beat a different shape than its
 * neighbour.
 *
 * Same rules as the grip layer: under two seconds, almost no text, works muted
 * at thumbnail size.
 */

/* --- rushing, then stopping ----------------------------------------------- */

/**
 * A fast scroll that slams to a stop.
 *
 * Content flies past too quickly to read, then halts on one line. The rush is
 * not wasted time — it is what makes the stop mean *here*, and it lets a beat
 * travel a long document in half a second without pretending the middle was
 * read.
 *
 * `to` is the line index it lands on.
 */
export function Ramp({
  lines,
  to,
  rows = 9,
  feel,
}: {
  lines: readonly string[]
  to: number
  rows?: number
  feel: Feel
}) {
  return (
    <div className="cf-ramp" style={{ ['--cf-rows' as string]: `${rows}` }}>
      <motion.div
        className="cf-ramp-inner"
        initial={false}
        animate={{ y: `${-(to / Math.max(1, lines.length)) * 100}%` }}
        transition={{ ...feel, type: 'spring', stiffness: 520, damping: 34, mass: 0.7 }}
      >
        {lines.map((l, i) => (
          <motion.div
            key={i}
            className="cf-ramp-line"
            initial={false}
            animate={{ opacity: i === to ? 1 : 0.2 }}
            transition={feel}
          >
            {l || ' '}
          </motion.div>
        ))}
      </motion.div>
      <span className="cf-ramp-mark" aria-hidden="true" />
    </div>
  )
}

/**
 * A lateral blur between two places.
 *
 * The whip pan. Covers a change of subject in about a fifth of a second and
 * tells the viewer the two things are *next to each other* rather than
 * unrelated — which a cut cannot say and a fade actively denies.
 */
export function Whip({ at, children }: { at: number; children: ReactNode }) {
  const t = Math.max(0, Math.min(1, at))
  const mid = 1 - Math.abs(t - 0.5) * 2

  return (
    <motion.div
      className="cf-whip"
      initial={false}
      animate={{ x: `${(t - 0.5) * -140}%`, filter: `blur(${mid * 7}px)`, opacity: 1 - mid * 0.45 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * A frame jolt.
 *
 * One hit, two frames long, on the moment something irreversible happens. Used
 * with `Burst` at the overwrite and nowhere else — a film that shakes twice is
 * a film that shakes.
 */
export function Jolt({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.div
      className="cf-jolt"
      initial={false}
      animate={on ? { x: [0, -9, 7, -3, 0], y: [0, 4, -3, 1, 0] } : { x: 0, y: 0 }}
      transition={{ duration: 0.22, ease: 'linear' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * After-images behind a moving thing.
 *
 * Three ghosts at decreasing opacity. Makes a fast move legible — without
 * them, something crossing the frame in six frames is a flicker; with them the
 * eye reads a path.
 */
export function Streak({
  at,
  from,
  to,
  children,
  feel,
}: {
  at: number
  from: { x: number; y: number }
  to: { x: number; y: number }
  children: ReactNode
  feel: Feel
}) {
  const t = Math.max(0, Math.min(1, at))
  const ghosts = [0.18, 0.12, 0.06]

  return (
    <div className="cf-streak">
      {ghosts.map((lag, i) => {
        const g = Math.max(0, t - lag)
        return (
          <motion.span
            key={i}
            className="cf-streak-ghost"
            initial={false}
            animate={{
              left: `${from.x + (to.x - from.x) * g}%`,
              top: `${from.y + (to.y - from.y) * g}%`,
              opacity: t > 0 && t < 1 ? 0.28 - i * 0.08 : 0,
            }}
            transition={feel}
          >
            {children}
          </motion.span>
        )
      })}
      <motion.span
        className="cf-streak-lead"
        initial={false}
        animate={{ left: `${from.x + (to.x - from.x) * t}%`, top: `${from.y + (to.y - from.y) * t}%` }}
        transition={feel}
      >
        {children}
      </motion.span>
    </div>
  )
}

/* --- numbers that move ---------------------------------------------------- */

/**
 * Digits rolling, like an odometer.
 *
 * A number that *arrives* rather than appearing. For the rates, the countdown,
 * and the file sizes — anywhere the figure is the payload and a static cut
 * would let the eye skip it.
 */
export function Roll({ value, pad = 2, feel }: { value: number; pad?: number; feel: Feel }) {
  const digits = String(Math.max(0, Math.floor(value))).padStart(pad, '0').split('')

  return (
    <span className="cf-roll">
      {digits.map((d, i) => (
        <span className="cf-roll-slot" key={i}>
          <motion.span
            className="cf-roll-strip"
            initial={false}
            animate={{ y: `${-Number(d) * 10}%` }}
            transition={{ ...feel, type: 'spring', stiffness: 260, damping: 28 }}
          >
            {'0123456789'.split('').map((n) => (
              <i key={n}>{n}</i>
            ))}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/**
 * A bar that overshoots and settles.
 *
 * For a value that should feel *thrown* at the viewer rather than measured.
 * The overshoot is the whole point — it is the difference between a chart and
 * a hit, and the settle is what stops it being a gimmick.
 */
export function Meter({ value, max = 1, tone = 'red' }: { value: number; max?: number; tone?: 'red' | 'ink' }) {
  const t = Math.max(0, Math.min(1, value / max))

  return (
    <div className="cf-meter">
      <motion.span
        className={tone === 'red' ? 'cf-meter-fill cf-meter-red' : 'cf-meter-fill'}
        initial={false}
        animate={{ width: `${t * 100}%` }}
        transition={{ type: 'spring', stiffness: 180, damping: 12, mass: 0.8 }}
      />
    </div>
  )
}

/**
 * A ring closing.
 *
 * A timer without digits. Reads at any size, carries no language, and works as
 * a corner element under other content — which a number cannot.
 */
export function Ring({ at, size = 6, tone = 'ink' }: { at: number; size?: number; tone?: 'ink' | 'red' }) {
  const t = Math.max(0, Math.min(1, at))
  const c = tone === 'red' ? PALETTE.red : PALETTE.ink

  return (
    <span className="cf-ring" style={{ width: `${size}cqw` }} aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke={PALETTE.ink} strokeWidth="3" opacity="0.16" />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke={c}
          strokeWidth="3"
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
          initial={false}
          animate={{ pathLength: t }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </svg>
    </span>
  )
}

/* --- rhythm --------------------------------------------------------------- */

/**
 * A full-frame card, two to four words, one beat long.
 *
 * *Three minutes later.* *Then this.* Punctuation between sequences, and the
 * cheapest pace change available — it costs one frame and resets the viewer's
 * attention without explaining anything.
 */
export function Beat({ text, tone = 'invert' }: { text: string; tone?: 'invert' | 'plain' }) {
  return <div className={tone === 'invert' ? 'cf-beatcard cf-beatcard-invert' : 'cf-beatcard'}>{text}</div>
}

/**
 * Words arriving one at a time, sized by weight.
 *
 * Kinetic type. Lets a sentence be *performed* rather than displayed, and puts
 * the emphasis where the voice would put it — so a line can carry a beat on
 * its own with no other visual at all.
 *
 * `big` marks which words get the weight; everything else stays small.
 */
export function Kinetic({
  words,
  shown,
  big = [],
  feel,
}: {
  words: readonly string[]
  shown: number
  big?: readonly number[]
  feel: Feel
}) {
  return (
    <p className="cf-kinetic">
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className={big.includes(i) ? 'cf-kin-word cf-kin-big' : 'cf-kin-word'}
          initial={false}
          animate={{ opacity: i < shown ? 1 : 0, y: i < shown ? 0 : 8 }}
          transition={{ ...feel, delay: i * 0.03 }}
        >
          {w}
        </motion.span>
      ))}
    </p>
  )
}

/**
 * Items ticking off, fast.
 *
 * Three or four lines resolving in about a second. For the recap moments —
 * what it did, what it was asked — where the *rhythm* of completion carries
 * more than any single line.
 *
 * `crossed` strikes them instead of ticking them, for the things nobody asked
 * for.
 */
export function TickList({
  items,
  done,
  crossed = false,
  feel,
}: {
  items: readonly string[]
  done: number
  crossed?: boolean
  feel: Feel
}) {
  return (
    <ul className={crossed ? 'cf-ticks cf-ticks-crossed' : 'cf-ticks'}>
      {items.map((t, i) => (
        <li key={t}>
          <motion.span
            className="cf-tick-mark"
            initial={false}
            animate={{ opacity: i < done ? 1 : 0.15, scale: i < done ? 1 : 0.7 }}
            transition={{ ...feel, delay: i * 0.06 }}
            aria-hidden="true"
          >
            {crossed ? '✕' : '✓'}
          </motion.span>
          <motion.span initial={false} animate={{ opacity: i < done ? 1 : 0.3 }} transition={{ ...feel, delay: i * 0.06 }}>
            {t}
          </motion.span>
        </li>
      ))}
    </ul>
  )
}

/**
 * A marker sweeping across words.
 *
 * Apollo's yellow highlight, at speed. Half a second across a phrase, which is
 * fast enough to feel like emphasis rather than like reading — and it is the
 * one device in their film that let them hold a still frame for fourteen
 * seconds without it dying.
 */
export function Sweep({
  text,
  at,
  tone = 'yellow',
  feel,
}: {
  text: string
  at: number
  tone?: 'yellow' | 'red'
  feel: Feel
}) {
  return (
    <span className="cf-sweep">
      <motion.span
        className={tone === 'red' ? 'cf-sweep-ink cf-sweep-red' : 'cf-sweep-ink'}
        initial={false}
        animate={{ width: `${Math.max(0, Math.min(1, at)) * 100}%` }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        aria-hidden="true"
      />
      <span className="cf-sweep-text">{text}</span>
    </span>
  )
}

/**
 * Two or three things at once, no words.
 *
 * Simultaneous comparison. Where `Versus` explains a distinction, this simply
 * puts the things beside each other and lets the difference be obvious — which
 * is faster and works with the sound off.
 */
export function Split({ panes, feel }: { panes: ReadonlyArray<{ content: ReactNode; mark?: boolean }>; feel: Feel }) {
  return (
    <div className="cf-split" style={{ ['--cf-panes' as string]: `${panes.length}` }}>
      {panes.map((p, i) => (
        <motion.div
          key={i}
          className={p.mark ? 'cf-split-pane cf-split-mark' : 'cf-split-pane'}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...feel, delay: i * 0.06 }}
        >
          {p.content}
        </motion.div>
      ))}
    </div>
  )
}

/**
 * Something landing with weight.
 *
 * A drop and a bounce. Gives an object mass, which matters exactly once in
 * this film — when the copied file arrives where the successor was supposed to
 * be, and the frame needs it to feel like it *landed* rather than appeared.
 */
export function Drop({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <motion.div
      className="cf-drop"
      initial={false}
      animate={on ? { y: 0, opacity: 1 } : { y: '-160%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 16, mass: 1.1 }}
    >
      {children}
    </motion.div>
  )
}

/**
 * A radiating hit at the point of impact.
 *
 * Three strokes, out and gone in a fifth of a second. Marks the frame where
 * something irreversible happened without a word — and unlike `Burst`, it can
 * be aimed at a spot.
 */
export function Impact({ at, x, y, size = 10 }: { at: number; x: number; y: number; size?: number }) {
  const t = Math.max(0, Math.min(1, at))

  return (
    <span className="cf-impact" style={{ left: `${x}%`, top: `${y}%`, width: `${size}cqw` }} aria-hidden="true">
      <svg viewBox="0 0 60 60">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <motion.line
            key={a}
            x1="30"
            y1="30"
            x2={30 + Math.cos((a * Math.PI) / 180) * 26}
            y2={30 + Math.sin((a * Math.PI) / 180) * 26}
            stroke={PALETTE.red}
            strokeWidth="3"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: t < 0.5 ? t * 2 : 1, opacity: t > 0 ? 1 - t : 0 }}
            transition={{ duration: 0.12 }}
          />
        ))}
      </svg>
    </span>
  )
}
