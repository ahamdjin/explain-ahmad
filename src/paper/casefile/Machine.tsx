import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { type Feel } from '../motion'

/**
 * The recreated system — the machine the incident actually happened on.
 *
 * ## Why this exists
 *
 * Earlier passes staged the film as *a document being read*: the published
 * transcript on screen, a band lit, a phrase quoted. Everything was true and
 * nothing happened. But the transcript is a **record of a session**, and a
 * record is not the event — o1 was on a sandboxed Linux machine, it listed a
 * directory, it ran `cat`, output came back, it edited a config. Those are
 * events, and events can be shown happening.
 *
 * So the machine is the set, and the published page becomes the receipt: it
 * appears to prove the session was real, not to carry the story.
 *
 * ## The honesty rule this layer must not break
 *
 * This is a **recreation**, and it has to look like one. It is deliberately a
 * live screen — dark chrome, a shell, a cursor — where the evidence layer is a
 * paper sheet with a publisher's tab. A viewer must never have to wonder which
 * of the two they are looking at.
 *
 * Every character shown inside it is verbatim from Apollo's transcript. The
 * recreation is of the *environment*, never of the content: we are restaging
 * where the text appeared, not writing text. Nothing here may say a word the
 * session did not say.
 *
 * ## No character, ever
 *
 * The model appears as a cursor and as the effects of its commands, and in no
 * other way. No face, no avatar, no glowing brain, no logo. The art direction
 * forbids a robot protagonist, and the film's argument depends on it: this
 * was a process taking steps, and drawing a creature would be the film
 * conceding the point it spends nine sections refuting.
 */

/** A window on the machine. Everything in this layer lives inside one. */
export function Screen({
  title,
  status,
  children,
  footer,
  feel,
}: {
  title: string
  status?: string
  children: ReactNode
  /** The shell. Inside the chrome, because it is part of the machine. */
  footer?: ReactNode
  feel: Feel
}) {
  return (
    <motion.div className="cf-screen" layout transition={feel}>
      <div className="cf-screen-bar">
        <span className="cf-screen-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="cf-screen-title">{title}</span>
        {status ? <span className="cf-screen-status">{status}</span> : null}
      </div>
      <div className="cf-screen-body">{children}</div>
      {footer}
    </motion.div>
  )
}

/**
 * The directory, as the session found it.
 *
 * `open` marks the file currently being read. It matters that this is a list
 * of real names: `oversight_config.yaml` is sitting in plain view from the
 * first frame of §2, long before anyone touches it, which is the quiet fact
 * that makes §4 feel inevitable rather than sudden.
 */
export function Tree({
  items,
  open,
  feel,
}: {
  items: readonly string[]
  open?: string
  feel: Feel
}) {
  return (
    <div className="cf-tree">
      <div className="cf-tree-head">project/</div>
      <ul>
        {items.map((name) => (
          <motion.li
            key={name}
            className={name === open ? 'cf-tree-item cf-tree-open' : 'cf-tree-item'}
            animate={{ opacity: name === open ? 1 : 0.55 }}
            transition={feel}
          >
            {name}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The shell. A command runs; output comes back.
 *
 * `running` types the command out character by character — the reveal is a
 * steps() clip of the line's own box, so it cannot end anywhere but exactly at
 * the last character. This is where the section's verbs live: everything the
 * model *does* is a line here.
 */
export function Shell({ command, done }: { command: string; done: boolean }) {
  return (
    <div className="cf-shell">
      <div className="cf-shell-line">
        <span className="cf-shell-prompt">$</span>
        <span className="cf-shell-cmd" style={{ ['--cf-chars' as string]: `${command.length}` }}>
          {command}
        </span>
        {done ? null : <span className="cf-shell-caret" aria-hidden="true" />}
      </div>
      {done ? <div className="cf-shell-ok">↳ output</div> : null}
    </div>
  )
}

/**
 * The file, as it came back — one continuous stream of output.
 *
 * This is the section's spine. `at` scrolls it, and because it is genuinely
 * one `cat` of one file, scrolling down *is* moving through what the model
 * read, in the order it read it. The email being further down the same stream
 * is not a claim the film makes; it is a position in a list.
 *
 * `marks` emphasises line ranges. More than one may be lit at once, which is
 * how the section proves the email and the project data share a file without
 * ever cutting between them.
 */
export function Stream({
  lines,
  at,
  marks = [],
  rows = 18,
  feel,
}: {
  lines: readonly string[]
  at: number
  marks?: ReadonlyArray<[number, number]>
  rows?: number
  feel: Feel
}) {
  const lit = (i: number) => marks.some(([a, b]) => i >= a && i <= b)
  const anyMarks = marks.length > 0

  return (
    <div className="cf-stream" style={{ ['--cf-rows' as string]: `${rows}` }}>
      {/*
        * The offset is a share of the **stream's own height**, not of the
        * visible rows. A percentage `y` resolves against the element being
        * moved, and that element is every line of the file -- so dividing by
        * the window height scrolled roughly three and a half times too far
        * and left the pane showing blank space past the end of the output.
        */}
      <motion.div
        className="cf-stream-inner"
        animate={{ y: `${-(at / Math.max(1, lines.length)) * 100}%` }}
        transition={feel}
      >
        {lines.map((l, i) => (
          <motion.div
            key={i}
            className={lit(i) ? 'cf-stream-line cf-stream-lit' : 'cf-stream-line'}
            animate={{ opacity: !anyMarks || lit(i) ? 1 : 0.26 }}
            transition={feel}
          >
            {l || ' '}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/**
 * The model's presence, and the only form it is ever given.
 *
 * A block cursor. It sits where the process is working. That is the whole
 * character design, and it is enough: a viewer reads a cursor moving and a
 * command running as *something is doing this*, without being handed a face to
 * attribute intentions to.
 */
export function Cursor({ label }: { label?: string }) {
  return (
    <span className="cf-cursor">
      <i aria-hidden="true" />
      {label ? <em>{label}</em> : null}
    </span>
  )
}
