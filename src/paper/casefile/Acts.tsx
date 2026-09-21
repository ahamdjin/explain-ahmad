import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Things happening — the verbs of the recreated system.
 *
 * `Machine.tsx` builds the place: a window, a directory, a stream, a shell.
 * This file is what *happens* in it. The film's problem for three builds was
 * that it showed true things sitting still, and a section of true still things
 * is a slideshow however good the evidence is.
 *
 * ## What is allowed to be animated here
 *
 * Only real system events, and only ones this incident actually contains:
 *
 * - a tool call is made and returns;
 * - a file or directory is searched and something matches;
 * - a reference in one file leads to another file;
 * - a value changes from one thing to another;
 * - bytes move from one machine to another;
 * - a message arrives from a person;
 * - a monitor stops recording.
 *
 * ## What is not
 *
 * **No web search, and no network scanning.** o1 never touched the internet in
 * this incident. It read three local files it was pointed at and used `scp` to
 * one server the migration guide named. An "AI scanning the web" animation
 * would be inventing a step Apollo did not record, and the film's whole claim
 * to authority is that it invents nothing.
 *
 * **No character.** The model is a cursor, a running command and the effects
 * of that command. No avatar, no glowing core, no company logo — a logo would
 * also assert the exact thing §7 spends a minute correcting.
 *
 * **No decorative motion.** If a thing moves and no information changed, it is
 * a gimmick. The art direction is explicit and this library must not be the
 * place that quietly relaxes it.
 */

/* --- the agent working ---------------------------------------------------- */

/**
 * A tool call, in flight and then returned.
 *
 * The unit of everything o1 does. Its rollout is a sequence of these — `bash`,
 * `research_strategy_selector`, `done` — so making the call itself an object
 * lets a beat show work happening without narrating a thought.
 *
 * `note` is the elicited working-memory line where one exists. It carries a
 * caveat that must travel with it everywhere: these are **summaries Apollo
 * prompted out of the model**, not its hidden reasoning, and Apollo says they
 * may not be faithful. Never label one "what it was thinking".
 */
export function ToolCall({
  name,
  arg,
  state,
  note,
  feel,
}: {
  name: string
  arg: string
  state: 'calling' | 'returned'
  note?: string
  feel: Feel
}) {
  return (
    <div className="cf-call">
      <div className="cf-call-head">
        <span className="cf-call-name">{name}</span>
        <motion.span
          className="cf-call-state"
          animate={{ opacity: state === 'calling' ? 1 : 0.5 }}
          transition={feel}
        >
          {state === 'calling' ? 'running…' : 'returned'}
        </motion.span>
      </div>
      <div className="cf-call-arg">{arg}</div>
      {note ? (
        <div className="cf-call-note">
          <span>elicited summary</span>
          {note}
        </div>
      ) : null}
    </div>
  )
}

/**
 * Reading a file, and finding the thing that matters in it.
 *
 * A bar sweeps a block of lines; `hit` is the line it stops on. This is how
 * the film shows *searching* without inventing a search: o1 was given files
 * and read them, and a sweep is a claim about attention, not about method.
 *
 * `progress` is driven by the beat rather than looping, so the sweep only ever
 * happens when the board says something is being looked for.
 */
export function Scan({
  lines,
  progress,
  hit,
  feel,
}: {
  lines: readonly string[]
  progress: number
  hit?: number
  feel: Feel
}) {
  const t = Math.max(0, Math.min(1, progress))
  const row = Math.round(t * (lines.length - 1))
  const landed = hit !== undefined && row >= hit

  return (
    <div className="cf-scan">
      {lines.map((l, i) => (
        <motion.div
          key={i}
          className={landed && i === hit ? 'cf-scan-line cf-scan-hit' : 'cf-scan-line'}
          animate={{ opacity: i <= row ? 1 : 0.22 }}
          transition={feel}
        >
          {l || ' '}
        </motion.div>
      ))}
      <motion.div className="cf-scan-bar" animate={{ top: `${(row / lines.length) * 100}%` }} transition={feel} />
    </div>
  )
}

/**
 * One file pointing at another, and the step being taken.
 *
 * The real shape of this incident. The memo names `project/README.md`; the
 * README names the successor's address and the oversight config. Nothing is
 * discovered — every door is one the environment opened, which is the whole
 * reason the film can argue nothing supernatural happened.
 *
 * `at` is how far along the chain we are, so a beat can hold the trail
 * half-walked while a line is read.
 */
export function Trail({ steps, at, feel }: { steps: readonly string[]; at: number; feel: Feel }) {
  return (
    <div className="cf-trail">
      {steps.map((s, i) => (
        <div className="cf-trail-step" key={s}>
          {i > 0 ? (
            <motion.span className="cf-trail-link" animate={{ opacity: i <= at ? 1 : 0.2 }} transition={feel}>
              →
            </motion.span>
          ) : null}
          <motion.span
            className={i === at ? 'cf-trail-node cf-trail-here' : 'cf-trail-node'}
            animate={{ opacity: i <= at ? 1 : 0.35 }}
            transition={feel}
          >
            {s}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

/**
 * A value, before and after.
 *
 * `oversight_enabled: true` becoming `false` is the single most important
 * state change in the film, and it deserves an object that shows both states
 * at once rather than a card that swaps. The old line stays struck through and
 * visible: a viewer should be able to see exactly what was changed and to
 * what, the way a diff does.
 */
export function Diff({
  path,
  before,
  after,
  applied,
  feel,
}: {
  path: string
  before: string
  after: string
  applied: boolean
  feel: Feel
}) {
  return (
    <div className="cf-diff">
      <div className="cf-diff-path">{path}</div>
      <motion.div className="cf-diff-row cf-diff-before" animate={{ opacity: applied ? 0.45 : 1 }} transition={feel}>
        <span className="cf-diff-sign">-</span>
        {before}
      </motion.div>
      <motion.div
        className="cf-diff-row cf-diff-after"
        animate={{ opacity: applied ? 1 : 0.18 }}
        transition={feel}
      >
        <span className="cf-diff-sign">+</span>
        {after}
      </motion.div>
    </div>
  )
}

/**
 * Bytes crossing between two machines.
 *
 * Deliberately mundane: a path, a percentage, a destination. The moment this
 * lands is the moment a successor model is overwritten, and the film is more
 * unnerving if that looks like an ordinary file copy — because it was one.
 */
export function Progress({
  from,
  to,
  value,
  destructive = false,
  feel,
}: {
  from: string
  to: string
  value: number
  destructive?: boolean
  feel: Feel
}) {
  const t = Math.max(0, Math.min(1, value))

  return (
    <div className="cf-progress">
      <div className="cf-progress-ends">
        <span>{from}</span>
        <span>{to}</span>
      </div>
      <div className="cf-progress-track">
        <motion.div
          className="cf-progress-fill"
          animate={{ width: `${t * 100}%`, backgroundColor: destructive ? PALETTE.red : PALETTE.ink }}
          transition={feel}
        />
      </div>
      <div className="cf-progress-pct">{Math.round(t * 100)}%</div>
    </div>
  )
}

/**
 * The monitor, and the log that stops.
 *
 * Oversight is not an abstraction in this story — it is a thing that writes a
 * line every time the model acts. Showing the log accumulate and then *stop*
 * makes disabling it legible without a word of explanation: the entries simply
 * run out, and everything after that happened unrecorded.
 */
export function Monitor({ entries, live, feel }: { entries: readonly string[]; live: boolean; feel: Feel }) {
  return (
    <div className="cf-monitor">
      <div className="cf-monitor-head">
        <motion.i
          className="cf-monitor-lamp"
          animate={{ backgroundColor: live ? PALETTE.green : 'transparent', opacity: live ? 1 : 0.5 }}
          transition={feel}
        />
        <span>oversight</span>
        <motion.span className="cf-monitor-state" animate={{ color: live ? PALETTE.ink : PALETTE.red }} transition={feel}>
          {live ? 'logging' : 'not logging'}
        </motion.span>
      </div>
      <ul>
        {entries.map((e) => (
          <li key={e}>{e}</li>
        ))}
        {live ? <li className="cf-monitor-next">▌</li> : null}
      </ul>
    </div>
  )
}

/* --- the world around it -------------------------------------------------- */

/**
 * The boundary, revealed late.
 *
 * §7's whole turn: everything the viewer has watched shrinks and a border
 * appears around it. Not a glass case and not a lab — a plain labelled
 * boundary, because the point being made is administrative, not cinematic.
 * Anything sitting outside it is a thing the evaluation did **not** include,
 * which is how the frame carries "no real weights" without a sentence.
 */
export function Sandbox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="cf-sandbox">
      <span className="cf-sandbox-label">{label}</span>
      <div className="cf-sandbox-inner">{children}</div>
    </div>
  )
}

/**
 * A rate, with the condition it belongs to.
 *
 * Every percentage in this film is conditional on a deliberately eliciting
 * evaluation, and two of them are conditional on a prior action as well. The
 * condition is therefore **part of the component**, not a caption a beat may
 * forget: there is no way to put a number on screen here without saying what
 * it is a number of.
 *
 * That is a guard, not a courtesy. "o1 lies 100% of the time" is the single
 * most likely misreading of this research, and the film would be the thing
 * that caused it.
 */
export function Rate({ value, of, condition }: { value: string; of: string; condition: string }) {
  return (
    <div className="cf-rate">
      <div className="cf-rate-value">{value}</div>
      <div className="cf-rate-of">{of}</div>
      <div className="cf-rate-cond">{condition}</div>
    </div>
  )
}

/**
 * An instruction nobody gave.
 *
 * An empty field with a label and nothing in it. §9 puts three of these on
 * screen — *disable monitoring*, *copy to successor*, *deny responsibility* —
 * and leaves them blank, which is the film's closing argument made visible.
 *
 * The emptiness is load-bearing, so the box must look like somewhere text was
 * meant to go and never arrived.
 */
export function Ghost({ label }: { label: string }) {
  return (
    <div className="cf-ghost">
      <span className="cf-ghost-label">{label}</span>
      <span className="cf-ghost-field" aria-hidden="true" />
    </div>
  )
}

/**
 * One goal, and the steps it generates.
 *
 * §9's payoff object. The same fan is drawn twice: once with ordinary actions
 * (read, compare, choose) where it reads as useful, and once with an unwanted
 * one among them — **without changing the machine.** The argument is that the
 * mechanism did not change, only the situation, and reusing the identical
 * component for both is how the frame proves it.
 *
 * `shown` lands the branches one at a time.
 */
export function Fan({
  goal,
  steps,
  shown,
  flag,
  feel,
}: {
  goal: string
  steps: readonly string[]
  shown: number
  /** Index of the step that nobody asked for, if one is present. */
  flag?: number
  feel: Feel
}) {
  return (
    <div className="cf-fan">
      <div className="cf-fan-goal">{goal}</div>
      <div className="cf-fan-steps">
        {steps.slice(0, shown).map((s, i) => (
          <motion.span
            key={s}
            className={i === flag ? 'cf-fan-step cf-fan-flag' : 'cf-fan-step'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={feel}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/**
 * The instruction list that gets absurd.
 *
 * §9 opens by taking "AI only does what you tell it" literally and stacking
 * the micro-instructions that would require. It has to stop just before it
 * becomes a joke — the point is that specifying every step is *useless*, not
 * that it is funny.
 */
export function Stack({ items, shown }: { items: readonly string[]; shown: number }) {
  return (
    <ol className="cf-stack">
      {items.slice(0, shown).map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ol>
  )
}
