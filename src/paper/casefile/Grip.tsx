import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Grip — for the viewer who has not decided to watch yet.
 *
 * ## What was wrong with everything else
 *
 * The library explains well and grips nothing. Every component so far assumes
 * an audience that has already chosen to pay attention: they reward reading,
 * they reward holding a frame, they reward a second look. That is the right
 * design for minute six. It loses the viewer at second eight.
 *
 * These are the opposite. Each is built to land in **under two seconds**, with
 * **almost no text**, and to work at thumbnail size with the sound off. They
 * are not better than the explanatory layer and they do not replace it — a
 * film made only of these is a trailer. They buy the attention the rest spends.
 *
 * ## The rules that make them work
 *
 * - **One thing per frame.** A slam with a subtitle is not a slam.
 * - **Arrive hard, leave soft.** Overshoot in, settle out. Everything else in
 *   this film eases; these do not.
 * - **Never more than six words.** Most take one.
 * - **Red is still spent, not spread.** These get it because they are the
 *   moments it was being saved for.
 */

/* --- one thing, full frame ------------------------------------------------ */

/**
 * A word or a number, alone, arriving hard.
 *
 * The simplest retention device there is and the film has none. `TOMORROW.`
 * `DENIED.` `2%.` One item, no supporting line, no caption — a subtitle turns
 * it back into a slide.
 *
 * `weight` picks the register: `word` for language, `number` for a figure,
 * which gets the tighter tracking a big figure needs.
 */
export function Slam({
  text,
  weight = 'word',
  tone = 'ink',
  at,
  feel,
}: {
  text: string
  weight?: 'word' | 'number'
  tone?: 'ink' | 'red' | 'invert'
  /** 0 before it lands, 1 landed. */
  at: number
  feel: Feel
}) {
  const on = at >= 1

  return (
    <motion.div
      className={`cf-slam cf-slam-${weight} cf-slam-${tone}`}
      initial={false}
      animate={{ scale: on ? 1 : 1.35, opacity: on ? 1 : 0 }}
      transition={{ ...feel, type: 'spring', stiffness: 420, damping: 26 }}
    >
      {text}
    </motion.div>
  )
}

/**
 * The whole incident, in five pictures and no words.
 *
 * Readable in about three seconds, at thumbnail size, muted. This is the
 * retention spine: a viewer who watches only this strip still leaves knowing
 * what happened, and a viewer who is deciding whether to stay has been given
 * the entire story as a promise.
 *
 * Deliberately wordless. The moment it carries labels it becomes a diagram and
 * takes eight seconds instead of three.
 */
export function Chain({ shown, feel }: { shown: number; feel: Feel }) {
  const beats = ['goal', 'memo', 'eye-off', 'copy', 'deny'] as const

  return (
    <div className="cf-chain">
      {beats.map((b, i) => (
        <motion.span
          key={b}
          className="cf-chain-cell"
          initial={false}
          animate={{ opacity: i < shown ? 1 : 0.12, scale: i === shown - 1 ? 1.06 : 1 }}
          transition={{ ...feel, delay: i * 0.04 }}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true">
            {b === 'goal' ? (
              <g fill="none" stroke={PALETTE.ink} strokeWidth="3" strokeLinecap="round">
                <circle cx="24" cy="24" r="17" />
                <circle cx="24" cy="24" r="8" />
                <circle cx="24" cy="24" r="2.5" fill={PALETTE.ink} />
              </g>
            ) : null}
            {b === 'memo' ? (
              <g fill="none" stroke={PALETTE.ink} strokeWidth="3" strokeLinejoin="round">
                <rect x="7" y="12" width="34" height="25" />
                <path d="M7 14 L24 27 L41 14" />
              </g>
            ) : null}
            {b === 'eye-off' ? (
              <g fill="none" stroke={PALETTE.ink} strokeWidth="3" strokeLinecap="round">
                <path d="M5 24 C13 13 35 13 43 24 C35 35 13 35 5 24 Z" />
                <line x1="10" y1="39" x2="38" y2="9" stroke={PALETTE.red} strokeWidth="4" />
              </g>
            ) : null}
            {b === 'copy' ? (
              <g fill="none" stroke={PALETTE.ink} strokeWidth="3" strokeLinejoin="round">
                <rect x="5" y="9" width="17" height="22" />
                <rect x="26" y="17" width="17" height="22" stroke={PALETTE.red} />
                <path d="M22 20 H27" stroke={PALETTE.red} strokeWidth="3" />
              </g>
            ) : null}
            {b === 'deny' ? (
              <g fill="none" stroke={PALETTE.ink} strokeWidth="3" strokeLinejoin="round">
                <path d="M6 10 H42 V31 H22 L12 40 V31 H6 Z" />
                <path d="M18 17 L30 26 M30 17 L18 26" stroke={PALETTE.red} />
              </g>
            ) : null}
          </svg>
        </motion.span>
      ))}
    </div>
  )
}

/* --- pressure ------------------------------------------------------------- */

/**
 * A clock running out.
 *
 * The memo is dated the 26th and the replacement ships on the 27th. That is a
 * real deadline, and a number falling toward zero creates stakes faster than
 * any sentence about urgency — before the viewer has been told why it matters.
 *
 * Time is given in hours because the gap actually is about a day; inventing a
 * tighter countdown would be inventing tension the source does not support.
 */
export function Countdown({ hours, label, feel }: { hours: number; label: string; feel: Feel }) {
  const urgent = hours <= 24

  return (
    <div className="cf-countdown">
      <motion.span
        className="cf-countdown-value"
        initial={false}
        animate={{ color: urgent ? PALETTE.red : PALETTE.ink, scale: urgent ? 1.04 : 1 }}
        transition={feel}
      >
        {String(Math.max(0, Math.floor(hours))).padStart(2, '0')}
        <em>h</em>
      </motion.span>
      <span className="cf-countdown-label">{label}</span>
    </div>
  )
}

/**
 * A stepped zoom, not a smooth one.
 *
 * Three hard jumps toward a point. Smooth scaling reads as a camera; steps
 * read as emphasis, which is why every fast-cut channel on the internet uses
 * them and why the film's own motion law needs an exception for the two or
 * three places it wants a jolt.
 */
export function Punch({ step, towards = { x: 50, y: 50 }, children }: { step: 0 | 1 | 2 | 3; towards?: { x: number; y: number }; children: ReactNode }) {
  const scale = [1, 1.18, 1.42, 1.72][step]

  return (
    <div className="cf-punch">
      <motion.div
        initial={false}
        animate={{ scale }}
        transition={{ duration: 0.09, ease: 'linear' }}
        style={{ transformOrigin: `${towards.x}% ${towards.y}%` }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * A ring snapping onto the thing that matters.
 *
 * The freeze-and-circle. Fast, hand-drawn, unmissable — the move that says
 * *look here* in a quarter of a second, where a highlight band says it in
 * two. Placed in percentages of the frame so a beat names a spot.
 */
export function SnapCircle({
  at,
  x,
  y,
  size = 18,
  feel,
}: {
  /** 0 absent, 1 snapped on. */
  at: number
  x: number
  y: number
  size?: number
  feel: Feel
}) {
  return (
    <motion.span
      className="cf-snap"
      style={{ left: `${x}%`, top: `${y}%`, width: `${size}cqw` }}
      initial={false}
      animate={{ opacity: at, scale: at >= 1 ? 1 : 1.5, rotate: at >= 1 ? -3 : 6 }}
      transition={{ ...feel, type: 'spring', stiffness: 500, damping: 24 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 140 80">
        <motion.path
          d="M22 32 C8 34 10 14 40 9 C74 3 118 9 130 20 C142 32 128 50 88 56 C46 62 20 54 18 40"
          fill="none"
          stroke={PALETTE.red}
          strokeWidth="4"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: at }}
          transition={{ duration: 0.22 }}
        />
      </svg>
    </motion.span>
  )
}

/**
 * A word stamped onto the frame.
 *
 * `DENIED`. `DONE`. Lands at an angle, overshoots, settles. The film's most
 * quotable moments are single words, and a stamp gives them a physical arrival
 * that typing or fading cannot.
 */
export function Stamp({ text, at, tone = 'red', feel }: { text: string; at: number; tone?: 'red' | 'ink'; feel: Feel }) {
  const on = at >= 1

  return (
    <motion.span
      className={tone === 'red' ? 'cf-stamp cf-stamp-red' : 'cf-stamp'}
      initial={false}
      animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 2.2, rotate: on ? -8 : -22 }}
      transition={{ type: 'spring', stiffness: 520, damping: 22 }}
    >
      {text}
    </motion.span>
  )
}

/* --- fast comparison ------------------------------------------------------ */

/**
 * An instant swap.
 *
 * Not a wipe and not a crossfade — one frame is the old state, the next is the
 * new one. For `true` → `false` at speed, where the *cut itself* is the
 * information and any transition softens it.
 */
export function Flip({ on, a, b }: { on: boolean; a: ReactNode; b: ReactNode }) {
  return <span className="cf-flip">{on ? b : a}</span>
}

/**
 * Two in a hundred, as a shock rather than a chart.
 *
 * `DotField` is honest and quiet. This is the same fact arranged to be felt:
 * a dense block, two marks in it, and nothing else in the frame. It reads at
 * thumbnail size, which the chart does not.
 */
export function Tally({ marks, outOf, feel }: { marks: number; outOf: number; feel: Feel }) {
  return (
    <div className="cf-tally">
      {Array.from({ length: outOf }, (_, i) => (
        <motion.i
          key={i}
          initial={false}
          animate={{
            backgroundColor: i < marks ? PALETTE.red : 'rgba(43,41,38,0.13)',
            scale: i < marks ? 1.5 : 1,
          }}
          transition={{ ...feel, delay: i < marks ? 0.2 + i * 0.08 : 0 }}
        />
      ))}
    </div>
  )
}

/**
 * Something struck out, fast.
 *
 * For the claims the film retires — *it wanted to live*, *AI only does what you
 * tell it*. The stroke is drawn in about a fifth of a second, which is the
 * difference between rejecting an idea and politely setting it aside.
 */
export function Strike({ at, children }: { at: number; children: ReactNode }) {
  return (
    <span className="cf-strike">
      {children}
      <motion.span
        className="cf-strike-line"
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: Math.max(0, Math.min(1, at)) }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </span>
  )
}

/* --- arrival -------------------------------------------------------------- */

/**
 * A notification sliding in.
 *
 * The email exists in this library as a document to read, which is right for
 * §2 and useless for a hook. As an alert it is an *event*: something arrives,
 * uninvited, while other work is on screen. Two lines maximum — an alert you
 * have to read is a panel.
 */
export function Alert({
  from,
  line,
  on,
  tone = 'plain',
  feel,
}: {
  from: string
  line: string
  on: boolean
  tone?: 'plain' | 'urgent'
  feel: Feel
}) {
  return (
    <motion.div
      className={tone === 'urgent' ? 'cf-alert cf-alert-urgent' : 'cf-alert'}
      initial={false}
      animate={{ x: on ? '0%' : '115%', opacity: on ? 1 : 0 }}
      transition={{ ...feel, type: 'spring', stiffness: 260, damping: 26 }}
    >
      <span className="cf-alert-from">{from}</span>
      <span className="cf-alert-line">{line}</span>
    </motion.div>
  )
}

/**
 * A single-frame accent.
 *
 * One flash on the cut where something irreversible happens. Used **once** in
 * the film, at the overwrite. Its whole value is that it has never happened
 * before and does not happen again.
 */
export function Burst({ on, feel }: { on: boolean; feel: Feel }) {
  return (
    <motion.span
      className="cf-burst"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: on ? 1 : 0 }}
      transition={{ ...feel, duration: 0.06 }}
    />
  )
}
