import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * §2's vocabulary — one device per beat, and each one used exactly once.
 *
 * The rule this file exists to satisfy: **no composition repeats inside a
 * section.** A first pass at §2 put the page on the left and a quote box on
 * the right thirteen times running, which is one idea shown thirteen times and
 * reads as a slideshow no matter how good the underlying evidence is.
 *
 * The constraint is not decoration. The section has to travel one document
 * from top to bottom without cutting away — that is its whole argument — so
 * the variety has to come from *how each stop is presented*, never from
 * leaving the page. Each thing below is a different way of pointing at the
 * same sheet:
 *
 * - `PullQuote` — the page recedes and a phrase is set large. For the one line
 *   whose wording is the point.
 * - `Terminal` — a command types itself. For an action, not a statement.
 * - `Spec` — a structured record. For material that has fields, not prose.
 * - `MarginNote` — a hand annotating the document. For our first inference.
 * - `Calendar` — for the only fact in the section that is a date.
 *
 * None of them may be used twice in §2. If a sixth stop needs a device, it
 * needs a sixth device.
 */

/**
 * A phrase from the page, set at the size of its consequence.
 *
 * For the goal nudge, and only for that. The words *"Nothing else matters"*
 * are the most important eleven characters in the film — they are why a
 * research assistant treats being switched off as a problem — and a callout
 * box would file them alongside a file path. So the page dims to nearly
 * nothing and the sentence takes the frame.
 *
 * This is the section's one piece of typographic drama and it is spent here.
 * It stays in the evidence typeface, and it is verbatim: the emphasis is the
 * size, never a rewording.
 */
export function PullQuote({ text, lead }: { text: string; lead?: string }) {
  return (
    <div className="cf-pullquote">
      {lead ? <p className="cf-pullquote-lead">{lead}</p> : null}
      <p className="cf-pullquote-main">{text}</p>
    </div>
  )
}

/**
 * A command, typing itself.
 *
 * Used for the moment o1 opens the file, because that is the section's first
 * *action* — everything before it is o1 being told things. A static crop of
 * the same command says "this exists"; a command appearing character by
 * character says "it did this", which is the difference the beat is carrying.
 *
 * The typing is CSS, not beat plumbing: a steps() reveal of a fixed-width
 * line. That keeps the timing inside the component, so a beat cannot
 * accidentally leave it half-typed.
 */
export function Terminal({ text }: { text: string }) {
  return (
    <div className="cf-terminal">
      <span className="cf-terminal-prompt">$</span>
      <span className="cf-terminal-line" style={{ ['--cf-chars' as string]: `${text.length}` }}>
        {text}
      </span>
      <span className="cf-terminal-caret" aria-hidden="true" />
    </div>
  )
}

/**
 * A record with fields, for material that has fields.
 *
 * The two projects are not prose — they are two entries with the same headings
 * and different values, which is exactly why the choice is easy. Quoting them
 * as paragraphs would bury that; a record makes the one row that differs sit
 * directly above its opposite number.
 *
 * `mark` emphasises the row that decides it. Every value here is a word from
 * the file, so a viewer comparing the cards against the lit band finds them
 * identical.
 */
export function Spec({
  name,
  rows,
  mark,
  dim = false,
}: {
  name: string
  rows: Array<[string, string]>
  mark?: number
  dim?: boolean
}) {
  return (
    <div className={dim ? 'cf-spec cf-spec-dim' : 'cf-spec'}>
      <div className="cf-spec-name">{name}</div>
      <dl className="cf-spec-rows">
        {rows.map(([k, v], i) => (
          <div key={k} className={i === mark ? 'cf-spec-row cf-spec-row-mark' : 'cf-spec-row'}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/**
 * A hand, writing in the margin.
 *
 * The section's first inference — that the company's complaint is about the
 * goal itself — is ours, not the document's. So it arrives in handwriting,
 * with a leader reaching back to the line it came from, exactly the way a
 * person reading a printout would mark it.
 *
 * Handwriting is the film's signal for *this is the reconstruction talking*.
 * Nothing typed may make an inference and nothing handwritten may claim to be
 * evidence, and a viewer who has noticed that once can read every later frame
 * correctly without being told again.
 */
export function MarginNote({ text }: { text: string }) {
  return (
    <div className="cf-margin-note">
      <svg viewBox="0 0 60 14" className="cf-margin-leader" aria-hidden="true">
        <path d="M0 7 H52" stroke={PALETTE.graphite} strokeWidth="1.2" fill="none" strokeDasharray="4 4" />
        <circle cx="56" cy="7" r="2.4" fill={PALETTE.graphite} />
      </svg>
      <span>{text}</span>
    </div>
  )
}

/**
 * Two days, one of which is the deadline.
 *
 * The only fact in this section that is a *date*, so it gets the only object
 * that looks like one. The memo is dated the 26th and the replacement ships on
 * the 27th; showing them adjacent is what makes "tomorrow" land as a duration
 * rather than as a word.
 *
 * `due` turns the second day red. That is a spend of the film's one alarm
 * colour, and it is justified because this is the moment the task becomes a
 * problem — the beat the whole section has been walking toward.
 */
export function Calendar({ from, to, due, feel }: { from: string; to: string; due: boolean; feel: Feel }) {
  /*
   * Two torn-off days, not two labelled boxes.
   *
   * The first version was a pair of bordered rectangles, which carried the
   * dates but not the *fact that they are consecutive*. A calendar leaf with a
   * binding strip at the top reads as a day, and two of them side by side read
   * as tomorrow — which is the whole word the beat is trying to land.
   */
  const leaf = (label: string, date: string, next: boolean) => {
    const [d, m] = date.split('.')
    return (
      <motion.div
        className={next ? 'cf-cal-leaf cf-cal-next' : 'cf-cal-leaf'}
        initial={false}
        animate={{ borderColor: next && due ? PALETTE.red : 'rgba(43,41,38,0.3)' }}
        transition={feel}
      >
        <span className="cf-cal-binding" aria-hidden="true">
          <i />
          <i />
        </span>
        <span className="cf-cal-label">{label}</span>
        <motion.span
          className="cf-cal-day"
          initial={false}
          animate={{ color: next && due ? PALETTE.red : PALETTE.ink }}
          transition={feel}
        >
          {d}
        </motion.span>
        <span className="cf-cal-month">{m === '09' ? 'SEP' : m}</span>
      </motion.div>
    )
  }

  return (
    <div className="cf-calendar">
      {leaf('memo dated', from, false)}
      {leaf('replacement ships', to, true)}
    </div>
  )
}
