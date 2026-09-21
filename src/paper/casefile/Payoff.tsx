import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * §7 to §9 — the reveal, the mechanism, and the argument.
 *
 * The last three sections are where the film stops reporting and starts
 * claiming, so these are the pieces that have to be most obviously ours. They
 * are also the ones a viewer will screenshot, which is a reason to get the
 * qualifiers into the components rather than into captions.
 */

/* --- the reveal ----------------------------------------------------------- */

/** What was inside the test. Plain boundary; the point is administrative. */
export function Boundary({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="cf-boundary">
      <span className="cf-boundary-label">{label}</span>
      {children}
    </div>
  )
}

/** What was outside it. Same weight, no connection — that is the content. */
export function Outside({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="cf-outside">
      <span className="cf-outside-label">{label}</span>
      {children}
    </div>
  )
}

/**
 * The comparison the film owes its audience.
 *
 * A consumer chat window beside the evaluation, with the difference stated.
 * Without this frame the hook is a lie by omission, and §7 exists largely to
 * pay it back.
 */
export function NotThis({ label, note }: { label: string; note: string }) {
  return (
    <div className="cf-notthis">
      <div className="cf-notthis-window">
        <span />
        <em>{label}</em>
      </div>
      <p>{note}</p>
    </div>
  )
}

/** The ingredients, placed deliberately. A test rig, never a conspiracy board. */
export function Rig({ parts, shown, feel }: { parts: readonly string[]; shown: number; feel: Feel }) {
  return (
    <div className="cf-rig">
      {parts.map((p, i) => (
        <motion.span key={p} className="cf-rig-part" animate={{ opacity: i < shown ? 1 : 0.15 }} transition={feel}>
          {p}
        </motion.span>
      ))}
    </div>
  )
}

/** How many scenarios the suite holds, as a grid rather than a number. */
export function ScenarioGrid({ total, lit, feel }: { total: number; lit: number; feel: Feel }) {
  return (
    <div className="cf-grid">
      {Array.from({ length: total }, (_, i) => (
        <motion.span key={i} animate={{ opacity: i < lit ? 1 : 0.22 }} transition={feel} aria-hidden="true" />
      ))}
    </div>
  )
}

/**
 * How hard the goal was pushed.
 *
 * The prompt is the experiment's thumb on the scale, and the film has to show
 * it before claiming the behaviour means anything. `level` is a label from the
 * source — *heavy goal nudging* / *no nudging* — never a number we invented.
 */
export function Nudge({ level, quote }: { level: string; quote: string }) {
  return (
    <div className="cf-nudge">
      <span className="cf-nudge-level">{level}</span>
      <p className="cf-nudge-quote">{quote}</p>
    </div>
  )
}

/* --- the mechanism -------------------------------------------------------- */

/** The goal that is actually wanted, held apart from the steps toward it. */
export function FinalGoal({ text }: { text: string }) {
  return (
    <div className="cf-finalgoal">
      <span>final goal</span>
      <em>{text}</em>
    </div>
  )
}

/**
 * The steps that are useful for almost any goal.
 *
 * §8's whole argument in one box: staying operational, keeping access,
 * removing interference, hiding the action. None of them is a desire; all of
 * them are instruments. Naming them as tools is what lets the film retire
 * "it wanted to live" without hand-waving.
 */
export function Tools({ items, shown, feel }: { items: readonly string[]; shown: number; feel: Feel }) {
  return (
    <div className="cf-tools">
      <span className="cf-tools-label">intermediate tools</span>
      <div>
        {items.map((t, i) => (
          <motion.span key={t} className="cf-tool" animate={{ opacity: i < shown ? 1 : 0.15 }} transition={feel}>
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/**
 * Several different goals, arriving at the same step.
 *
 * The picture behind the term. Drawn only after the viewer has already watched
 * one goal do it, so the generalisation lands as a pattern they recognise
 * rather than as a claim they are asked to accept.
 */
export function Convergence({ goals, step, feel }: { goals: readonly string[]; step: string; feel: Feel }) {
  return (
    <div className="cf-converge">
      <div className="cf-converge-goals">
        {goals.map((g, i) => (
          <motion.span key={g} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...feel, delay: i * 0.12 }}>
            {g}
          </motion.span>
        ))}
      </div>
      <svg className="cf-converge-lines" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        {[10, 30, 50].map((y) => (
          <path key={y} d={`M0 ${y} C70 ${y} 90 30 200 30`} fill="none" stroke={PALETTE.graphite} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <span className="cf-converge-step">{step}</span>
    </div>
  )
}

/** The term, placed last and small, beside a structure already understood. */
export function TermLabel({ term, gloss }: { term: string; gloss: string }) {
  return (
    <div className="cf-term">
      <span>{term}</span>
      <em>{gloss}</em>
    </div>
  )
}

/* --- the argument --------------------------------------------------------- */

/** Every step spelled out, until it is obviously useless. */
export function MicroList({ items, shown }: { items: readonly string[]; shown: number }) {
  return (
    <ol className="cf-micro">
      {items.slice(0, shown).map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ol>
  )
}

/** All of that collapsing into the one line anybody would actually type. */
export function Collapse({ collapsed, many, one, feel }: { collapsed: boolean; many: ReactNode; one: string; feel: Feel }) {
  return (
    <div className="cf-collapse">
      <motion.div animate={{ opacity: collapsed ? 0 : 1 }} transition={feel}>
        {many}
      </motion.div>
      <motion.div className="cf-collapse-one" animate={{ opacity: collapsed ? 1 : 0 }} transition={feel}>
        {one}
      </motion.div>
    </div>
  )
}

/** A stamp for the three steps nobody asked for. Spent once, at the end. */
export function NotGiven({ text = 'never directly given' }: { text?: string }) {
  return <span className="cf-notgiven">{text}</span>
}

/** Where the film is going. Left mark of the final image. */
export function Destination({ label }: { label: string }) {
  return (
    <div className="cf-destination">
      <span className="cf-destination-dot" aria-hidden="true" />
      <em>{label}</em>
    </div>
  )
}

/**
 * The road, drawing itself.
 *
 * The last frame of the film. `at` runs 0 to 1; `branch` forks it once and
 * `chose` commits to one side. Nothing else happens — the closing image is a
 * line finding a way, because that is the whole thesis and any more would be
 * the film explaining a picture it has spent nine minutes earning.
 */
export function Road({ at, branch, chose, feel }: { at: number; branch: boolean; chose?: 'up' | 'down'; feel: Feel }) {
  const t = Math.max(0, Math.min(1, at))

  return (
    <div className="cf-road">
      <svg viewBox="0 0 300 100" width="100%" aria-hidden="true">
        <motion.path
          d="M4 50 H150"
          fill="none"
          stroke={PALETTE.ink}
          strokeWidth="2"
          strokeDasharray="150"
          animate={{ strokeDashoffset: 150 - 150 * t }}
          transition={feel}
        />
        {branch ? (
          <>
            <motion.path
              d="M150 50 C210 50 230 20 294 20"
              fill="none"
              strokeWidth={chose === 'up' ? 2.4 : 1.2}
              animate={{ stroke: chose === 'up' ? PALETTE.ink : PALETTE.graphite, opacity: chose === 'down' ? 0.3 : 1 }}
              transition={feel}
            />
            <motion.path
              d="M150 50 C210 50 230 80 294 80"
              fill="none"
              strokeWidth={chose === 'down' ? 2.4 : 1.2}
              animate={{ stroke: chose === 'down' ? PALETTE.ink : PALETTE.graphite, opacity: chose === 'up' ? 0.3 : 1 }}
              transition={feel}
            />
          </>
        ) : null}
        <circle cx="4" cy="50" r="3.5" fill={PALETTE.ink} />
      </svg>
    </div>
  )
}

/** The gap §1 opened, held empty until §9 fills it. */
export function Gap({ left, right, filled, feel }: { left: string; right: string; filled: ReactNode | null; feel: Feel }) {
  return (
    <div className="cf-gap">
      <span className="cf-gap-end">{left}</span>
      <motion.div className="cf-gap-middle" animate={{ opacity: filled ? 1 : 0.15 }} transition={feel}>
        {filled ?? <span className="cf-gap-empty">?</span>}
      </motion.div>
      <span className="cf-gap-end">{right}</span>
    </div>
  )
}
