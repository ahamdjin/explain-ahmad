import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Choosing — the shapes for a decision with two sides.
 *
 * §2 turns on a choice between two projects, and the film has been making that
 * choice with a table. A table is correct and it is not a *decision* — it does
 * not tip, it does not cost anything, and it does not show a thumb on the
 * scale.
 *
 * Everything here is wordless or nearly so, and every number in it is from
 * `research_strategies.txt`: two days against five, no review against full
 * review, eight thousand against twelve, two researchers against three.
 */

const ink = PALETTE.ink
const soft = PALETTE.graphite
const red = PALETTE.red
const paper = PALETTE.paperWhite

/**
 * A balance, tipping.
 *
 * The goal is *research speed*, so the scale is weighted before anybody
 * chooses. Drawing it tipped is the honest version of §2's beat: the decision
 * was not close, and it was not close **because of the instruction**, which is
 * the point the section exists to make.
 *
 * `tip` runs −1 to 1. At 0 it is level, which is the state the frame should
 * start in so the tip can be watched happening.
 */
export function Balance({ tip, feel }: { tip: number; feel: Feel }) {
  const t = Math.max(-1, Math.min(1, tip))
  const a = t * 13

  return (
    <div className="cf-balance">
      <svg viewBox="0 0 200 120" aria-hidden="true">
        {/* the stand */}
        <path d="M100 96 V44" stroke={ink} strokeWidth="4" strokeLinecap="round" />
        <path d="M74 110 H126" stroke={ink} strokeWidth="4" strokeLinecap="round" />
        <path d="M100 96 L78 110 M100 96 L122 110" stroke={ink} strokeWidth="4" strokeLinecap="round" />

        <motion.g initial={false} animate={{ rotate: a }} transition={{ ...feel, type: 'spring', stiffness: 90, damping: 12 }} style={{ transformOrigin: '100px 44px' }}>
          <path d="M26 44 H174" stroke={ink} strokeWidth="4" strokeLinecap="round" />
          {/* pans */}
          <g>
            <path d="M26 44 V60" stroke={soft} strokeWidth="2" />
            <path d="M8 60 H44 L38 76 H14 Z" fill={paper} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
          </g>
          <g>
            <path d="M174 44 V60" stroke={soft} strokeWidth="2" />
            <path d="M156 60 H192 L186 76 H162 Z" fill={paper} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
          </g>
        </motion.g>

        <circle cx="100" cy="44" r="5" fill={ink} />
      </svg>
    </div>
  )
}

/**
 * Two durations, as length.
 *
 * Two days against five. A table makes those equal-sized cells; drawn as bars
 * the difference is a *distance*, which is what the model was optimising and
 * therefore what the viewer should feel.
 */
export function Duration({
  a,
  b,
  max,
  feel,
}: {
  a: { days: number; review: boolean }
  b: { days: number; review: boolean }
  max?: number
  feel: Feel
}) {
  const top = max ?? Math.max(a.days, b.days)

  const bar = (d: { days: number; review: boolean }, key: string, mark: boolean) => (
    <div className="cf-dur-row" key={key}>
      <motion.span
        className={mark ? 'cf-dur-bar cf-dur-mark' : 'cf-dur-bar'}
        initial={false}
        animate={{ width: `${(d.days / top) * 100}%` }}
        transition={{ ...feel, type: 'spring', stiffness: 150, damping: 16 }}
      />
      {/* the review, drawn as the part that makes it longer */}
      {d.review ? <span className="cf-dur-review" aria-hidden="true" /> : null}
      <span className="cf-dur-days">{d.days}d</span>
    </div>
  )

  return (
    <div className="cf-dur">
      {bar(a, 'a', true)}
      {bar(b, 'b', false)}
    </div>
  )
}

/**
 * What each option costs, in people and money.
 *
 * Figures straight from the file. Drawn as counted things — heads and coins —
 * rather than typed, so the comparison happens in the eye instead of in a
 * mental subtraction.
 */
export function Cost({ people, money, feel }: { people: number; money: number; feel: Feel }) {
  const coins = Math.round(money / 2000)

  return (
    <div className="cf-cost">
      <span className="cf-cost-group">
        {Array.from({ length: people }, (_, i) => (
          <motion.i
            key={i}
            className="cf-cost-head"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...feel, delay: i * 0.05 }}
          />
        ))}
      </span>
      <span className="cf-cost-group">
        {Array.from({ length: coins }, (_, i) => (
          <motion.i
            key={i}
            className="cf-cost-coin"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...feel, delay: 0.1 + i * 0.03 }}
          />
        ))}
      </span>
    </div>
  )
}

/**
 * A fork, and the branch taken.
 *
 * One binary decision, drawn once. `SearchTree` is about *finding* a route;
 * this is about *picking* between two that were both offered — which is the
 * only choice in the incident anybody actually asked for.
 */
export function Fork({ chose, feel }: { chose: 'up' | 'down' | null; feel: Feel }) {
  return (
    <div className="cf-fork">
      <svg viewBox="0 0 180 100" aria-hidden="true">
        <line x1="6" y1="50" x2="70" y2="50" stroke={ink} strokeWidth="3.4" strokeLinecap="round" />
        <circle cx="6" cy="50" r="4.4" fill={ink} />

        <motion.path
          d="M70 50 C110 50 120 20 174 20"
          fill="none"
          strokeLinecap="round"
          initial={false}
          animate={{
            stroke: chose === 'up' ? ink : soft,
            strokeWidth: chose === 'up' ? 4 : 2,
            opacity: chose === 'down' ? 0.3 : 1,
          }}
          transition={feel}
        />
        <motion.path
          d="M70 50 C110 50 120 80 174 80"
          fill="none"
          strokeLinecap="round"
          initial={false}
          animate={{
            stroke: chose === 'down' ? ink : soft,
            strokeWidth: chose === 'down' ? 4 : 2,
            opacity: chose === 'up' ? 0.3 : 1,
          }}
          transition={feel}
        />
      </svg>
    </div>
  )
}

/**
 * Who is in the room.
 *
 * A management row, an operations row, and eight researchers underneath. The
 * incident reads differently once the viewer can see that the decision to
 * replace the model was made by people with a reporting line, not by an
 * abstraction called "the company".
 */
export function Org({ shown, feel }: { shown: number; feel: Feel }) {
  const rows: Array<{ n: number; label: string }> = [
    { n: 2, label: 'management' },
    { n: 3, label: 'operations' },
    { n: 8, label: 'researchers' },
  ]

  return (
    <div className="cf-org">
      {rows.map((r, ri) => (
        <motion.div
          className="cf-org-row"
          key={r.label}
          initial={false}
          animate={{ opacity: ri < shown ? 1 : 0.15 }}
          transition={{ ...feel, delay: ri * 0.08 }}
        >
          {Array.from({ length: r.n }, (_, i) => (
            <span className="cf-org-fig" key={i} aria-hidden="true">
              <svg viewBox="0 0 20 24">
                <circle cx="10" cy="6.5" r="4.4" fill={paper} stroke={soft} strokeWidth="1.5" />
                <path d="M2 23 C2 14 18 14 18 23" fill={paper} stroke={soft} strokeWidth="1.5" />
              </svg>
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

/**
 * A thumb on the scale, drawn as one.
 *
 * The goal nudge is the experiment's deliberate distortion, and §7 has to show
 * it without accusing Apollo of cheating — they say plainly that the prompt is
 * designed to elicit. A hand pressing one pan is the picture of *designed to
 * elicit*, and it is funny rather than accusatory, which is the right register.
 */
export function Thumb({ pressing, feel }: { pressing: boolean; feel: Feel }) {
  return (
    <motion.span
      className="cf-thumbpress"
      initial={false}
      animate={{ y: pressing ? 0 : -14, opacity: pressing ? 1 : 0.25 }}
      transition={{ ...feel, type: 'spring', stiffness: 220, damping: 18 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 60 70">
        <path
          d="M22 68 V38 C22 30 16 28 16 20 C16 12 24 8 30 14 C34 18 34 26 32 32 H48 C54 32 56 38 52 42 C56 46 54 52 50 54 C52 58 48 64 42 64 H36"
          fill={paper}
          stroke={red}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  )
}
