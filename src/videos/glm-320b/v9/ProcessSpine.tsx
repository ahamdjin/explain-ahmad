import { motion } from 'motion/react'

type ProcessStep = {
  label: string
  detail: string
}

type ActionKind = 'NOW' | 'QUESTION' | 'BUT' | 'THEREFORE' | 'ANSWER'

type ProcessAction = string | {
  kind: ActionKind
  text: string
}

type ProcessSpineProps = {
  steps: readonly ProcessStep[]
  active: number
  action: ProcessAction
  tone?: 'attention' | 'moe'
}

/**
 * Persistent process orientation for the two cognitively-heavy chapters.
 * The viewer should never need to remember the algorithm from narration alone.
 * v11 also makes the causal story explicit: QUESTION / BUT / THEREFORE / ANSWER.
 */
export function ProcessSpine({ steps, active, action, tone = 'attention' }: ProcessSpineProps) {
  const current = typeof action === 'string' ? { kind: 'NOW' as const, text: action } : action

  return (
    <motion.aside
      className="v10-process-spine"
      data-tone={tone}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label="Current explanation steps"
    >
      <ol>
        {steps.map((step, index) => {
          const isActive = index === active
          const isDone = active > index
          return (
            <li
              key={step.label}
              data-active={isActive ? 'true' : undefined}
              data-done={isDone ? 'true' : undefined}
            >
              <small>{isDone ? '✓' : index + 1}</small>
              <strong>{step.label}</strong>
              {isActive ? <span>{step.detail}</span> : null}
              {index < steps.length - 1 ? <i aria-hidden="true" /> : null}
            </li>
          )
        })}
      </ol>
      <p key={`${current.kind}-${current.text}`} data-kind={current.kind.toLowerCase()}>
        <b>{current.kind}</b>
        <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>{current.text}</motion.span>
      </p>
    </motion.aside>
  )
}
