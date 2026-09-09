import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'

/**
 * An expandable aside -- the pop-up-textbook pattern.
 *
 * Some ideas are prerequisites for understanding the *model* but not for
 * answering the question the video is actually chasing. Teaching those as
 * sections takes the mystery cold for minutes; hiding them entirely fails the
 * viewer who wants to know. A chip they can open does both.
 *
 * Marked data-no-advance so opening it does not also advance the beat.
 */
export function Aside({ chip, title, children }: { chip: string; title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="s1-aside" data-no-advance data-open={open ? 'true' : undefined}>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        <i aria-hidden="true">{open ? '−' : '?'}</i>
        {chip}
      </button>

      {open ? (
        <motion.div
          className="s1-aside-panel"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26 }}
        >
          <h4>{title}</h4>
          {children}
        </motion.div>
      ) : null}
    </div>
  )
}

/** Two-choice control. The viewer decides; the scene answers. */
export function Choice<T extends string>({
  options,
  value,
  onPick,
  hint,
}: {
  options: readonly T[]
  value: T
  onPick: (next: T) => void
  hint?: string
}) {
  return (
    <div className="s1-choice" data-no-advance>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          data-picked={option === value ? 'true' : undefined}
          onClick={() => onPick(option)}
        >
          &ldquo;{option}&rdquo;
        </button>
      ))}
      {hint ? <span>{hint}</span> : null}
    </div>
  )
}

/** The thesis, on one card. Section 8 only. */
export function VerdictCard({ lines }: { lines: [string, string] }) {
  return (
    <div className="s1-verdict">
      <p>
        <b>{lines[0]}</b>
      </p>
      <p>{lines[1]}</p>
    </div>
  )
}
