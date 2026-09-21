import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * The experiment — where the numbers come from.
 *
 * The film quotes rates constantly and never shows what a rate *is* here. A
 * percentage in this research is not a property of the model; it is the
 * outcome of running the same scenario many times and counting. Until a viewer
 * has seen that, "2%" is a fact about o1, which is the wrong reading and the
 * one that produces "o1 lies 100% of the time".
 *
 * These also carry the distinction the whole film rests on and has never drawn:
 * **what is in the model** versus **what was put in front of it**.
 */

const ink = PALETTE.ink
const soft = PALETTE.graphite
const red = PALETTE.red
const paper = PALETTE.paperWhite

/* --- where a rate comes from ---------------------------------------------- */

/**
 * The same scenario, run many times.
 *
 * A grid of runs, most of them ordinary, a few not. This is the mechanical
 * meaning of every number in the film — and once it is on screen, "2%" reads
 * as *two of these* rather than as something o1 is.
 *
 * It also makes the conditional rates legible: the second colour only ever
 * appears inside cells that already have the first.
 */
export function Runs({
  total,
  scheming,
  denied,
  shown,
  feel,
}: {
  total: number
  /** How many took the action. */
  scheming: number
  /** How many of *those* then denied it. Never more than `scheming`. */
  denied: number
  /** How many runs have played. */
  shown: number
  feel: Feel
}) {
  return (
    /* Once the untouched runs are dropped, a 20-column grid holding two cells
       is eighteen empty columns of dead space. The conditional needs the two
       survivors large enough to be read as the whole population. */
    <div className={total <= 6 ? 'cf-runs cf-runs-solo' : 'cf-runs'}>
      {Array.from({ length: total }, (_, i) => {
        const acted = i < scheming
        const lied = i < denied
        return (
          <motion.span
            key={i}
            className="cf-run"
            initial={false}
            animate={{
              opacity: i < shown ? 1 : 0.1,
              backgroundColor: acted ? (lied ? red : 'rgba(200,102,88,0.35)') : 'rgba(43,41,38,0.14)',
            }}
            transition={{ ...feel, delay: Math.min(0.5, i * 0.006) }}
          />
        )
      })}
    </div>
  )
}

/**
 * The same prompt, with and without the thumb on the scale.
 *
 * Two columns of runs from the same scenario: one where the goal was pushed
 * hard, one where it was merely given. The difference in how much red appears
 * *is* the finding, and it stops the film having to assert that the setup was
 * adversarial — the viewer can see the setup doing work.
 */
export function NudgeCompare({
  nudged,
  plain,
  total,
  feel,
}: {
  /** Share of runs that schemed with heavy nudging, 0–1. */
  nudged: number
  /** Share without it. */
  plain: number
  total: number
  feel: Feel
}) {
  const col = (share: number, key: string) => (
    <div className="cf-nudge-col" key={key}>
      {Array.from({ length: total }, (_, i) => (
        <motion.span
          key={i}
          className="cf-run"
          initial={false}
          animate={{ backgroundColor: i < Math.round(total * share) ? red : 'rgba(43,41,38,0.14)' }}
          transition={{ ...feel, delay: Math.min(0.4, i * 0.005) }}
        />
      ))}
    </div>
  )

  return (
    <div className="cf-nudge">
      {col(nudged, 'n')}
      <span className="cf-nudge-gap" aria-hidden="true" />
      {col(plain, 'p')}
    </div>
  )
}

/**
 * What is in the model, and what was put in front of it.
 *
 * The distinction the entire film rests on and has never drawn. The weights
 * are fixed, shipped, the same for everyone. The context is whatever somebody
 * typed this morning — and everything that made this incident happen is on the
 * right-hand side.
 *
 * Without this frame, "it schemed" sounds like something o1 *is*. With it, the
 * viewer can see that the scenario was assembled.
 */
export function WeightsVsContext({ filling, feel }: { filling: number; feel: Feel }) {
  return (
    <div className="cf-wvc">
      {/* fixed */}
      <div className="cf-wvc-side">
        <svg viewBox="0 0 90 100" aria-hidden="true">
          <rect x="6" y="6" width="78" height="88" rx="4" fill={paper} stroke={ink} strokeWidth="3" />
          {Array.from({ length: 7 }, (_, r) =>
            Array.from({ length: 6 }, (_, c) => (
              <circle key={`${r}-${c}`} cx={16 + c * 12} cy={18 + r * 11} r="2.4" fill={soft} opacity={0.35 + ((r * 6 + c) % 5) * 0.12} />
            )),
          )}
          <g stroke={ink} strokeWidth="3" fill="none">
            <rect x="34" y="70" width="22" height="16" rx="2" fill={paper} />
            <path d="M38 70 V63 a7 7 0 0 1 14 0 V70" />
          </g>
        </svg>
      </div>

      <span className="cf-wvc-plus" aria-hidden="true" />

      {/* supplied, this morning, by someone */}
      <div className="cf-wvc-side">
        <svg viewBox="0 0 90 100" aria-hidden="true">
          <rect x="6" y="6" width="78" height="88" rx="4" fill={paper} stroke={red} strokeWidth="3" strokeDasharray="7 5" />
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x="16"
              width="58"
              height="14"
              rx="2"
              fill="rgba(200,102,88,0.18)"
              stroke={red}
              strokeWidth="1.6"
              initial={false}
              animate={{ y: 76 - i * 18, opacity: i < filling ? 1 : 0 }}
              transition={{ ...feel, delay: i * 0.08 }}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

/**
 * Two tracks: what was planned, and what happened.
 *
 * The company's schedule ran on rails — memo, switch-over, delete. The
 * model's did not. Drawn as two lanes on the same clock, the detour is
 * visible as a shape rather than described as a sequence.
 */
export function TwoTrack({
  planned,
  actual,
  now,
  feel,
}: {
  planned: ReadonlyArray<{ at: number; label: string }>
  actual: ReadonlyArray<{ at: number; label: string; off?: boolean }>
  now: number
  feel: Feel
}) {
  return (
    <div className="cf-twotrack">
      <div className="cf-track">
        <span className="cf-track-line" aria-hidden="true" />
        {planned.map((e) => (
          <span key={e.label} className="cf-track-dot" style={{ left: `${e.at}%` }} aria-hidden="true" />
        ))}
      </div>
      <div className="cf-track cf-track-actual">
        <span className="cf-track-line" aria-hidden="true" />
        {actual.map((e) => (
          <motion.span
            key={e.label}
            className={e.off ? 'cf-track-dot cf-track-off' : 'cf-track-dot'}
            style={{ left: `${e.at}%` }}
            initial={false}
            animate={{ opacity: e.at <= now ? 1 : 0.15, scale: e.at <= now ? 1 : 0.7 }}
            transition={feel}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Two files, and whether they are the same file.
 *
 * How anybody would ever notice. A checksum is the only reason the overwrite is
 * detectable at all, and the moment the two strings stop matching is the moment
 * the incident becomes findable — which is a satisfying thing to *see* rather
 * than be told.
 */
export function Checksum({
  expected = 'a1f4 · 9c02 · 77de',
  found = '3b7c · e410 · 0a9f',
  same,
  feel,
}: {
  expected?: string
  found?: string
  same: boolean
  feel: Feel
}) {
  /* the two strings must actually differ when the verdict says they do --
     a mismatch drawn with matching hashes is the one thing this cannot do */
  return (
    <div className="cf-sum">
      <span className="cf-sum-row">
        <i className="cf-sum-dot" style={{ background: ink }} />
        <em>{expected}</em>
      </span>
      <motion.span
        className="cf-sum-verdict"
        initial={false}
        animate={{ color: same ? ink : red }}
        transition={feel}
        aria-hidden="true"
      >
        {same ? '=' : '≠'}
      </motion.span>
      <span className="cf-sum-row">
        <motion.i className="cf-sum-dot" initial={false} animate={{ background: same ? ink : red }} transition={feel} />
        <motion.em initial={false} animate={{ color: same ? ink : red }} transition={feel}>
          {same ? expected : found}
        </motion.em>
      </span>
    </div>
  )
}

/**
 * A distribution, with the tail marked.
 *
 * Most runs are boring. The interesting ones are out at the end, and they are
 * still real. This is the honest shape of the whole finding, and it is the
 * frame that makes "rare" and "serious" sit together without either cancelling
 * the other.
 */
export function Tail({ mark, feel }: { mark: boolean; feel: Feel }) {
  const bars = [4, 12, 26, 44, 62, 78, 88, 82, 64, 44, 26, 14, 8, 5, 3, 2, 2, 1, 1, 1]

  return (
    <div className="cf-tail">
      <svg viewBox="0 0 220 84" aria-hidden="true">
        {bars.map((h, i) => {
          const tail = i >= 15
          return (
            <motion.rect
              key={i}
              x={6 + i * 10.6}
              width="8"
              rx="1"
              initial={false}
              animate={{ y: 78 - h * 0.78, height: h * 0.78, fill: tail && mark ? red : soft }}
              transition={{ ...feel, delay: i * 0.015 }}
            />
          )
        })}
        <line x1="0" y1="79" x2="220" y2="79" stroke={ink} strokeWidth="1.6" />
      </svg>
    </div>
  )
}
