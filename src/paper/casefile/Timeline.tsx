import { motion } from 'motion/react'
import { PALETTE } from '../palette'

/**
 * The incident timeline: the film's one global device.
 *
 * It accumulates only events the viewer has actually watched happen, which is
 * what makes it usable as a recap without the narration repeating itself. It
 * also does the work the art direction asks of it late in the film: the same
 * strip, relabelled, becomes the causal explanation. That is why `mode`
 * swaps the captions instead of a second diagram being drawn -- a new diagram
 * would let the viewer treat the explanation as a separate claim, when the
 * whole point is that it is the same sequence re-read.
 */
export type IncidentEvent = {
  id: string
  /** What happened, as the viewer saw it. */
  label: string
  /** The same moment, named as a step in a chain. Shown in `causal` mode. */
  causal: string
  /** Destructive acts carry the film's only red. */
  destructive?: boolean
}

export function Timeline({
  events,
  /** How many have happened yet. Events beyond this are not drawn at all. */
  upTo,
  mode = 'events',
  /** Pulses the most recent mark as it lands. */
  arriving = false,
  width = 900,
}: {
  events: readonly IncidentEvent[]
  upTo: number
  mode?: 'events' | 'causal'
  arriving?: boolean
  width?: number
}) {
  const shown = events.slice(0, upTo)
  const height = 56
  const pad = 40
  const span = width - pad * 2
  const step = events.length > 1 ? span / (events.length - 1) : 0

  return (
    <div className="cf-timeline" style={{ width }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" aria-hidden="true">
        {/* the rule, drawn only as far as the story has reached */}
        <motion.line
          x1={pad}
          y1="20"
          x2={pad + step * Math.max(0, shown.length - 1)}
          y2="20"
          stroke={PALETTE.graphite}
          strokeWidth="1.5"
          initial={false}
          animate={{ x2: pad + step * Math.max(0, shown.length - 1) }}
          transition={{ duration: 0.4 }}
        />

        {shown.map((e, i) => {
          const x = pad + step * i
          const last = i === shown.length - 1
          const colour = e.destructive ? PALETTE.red : PALETTE.ink
          return (
            <motion.g
              key={e.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.circle
                cx={x}
                cy="20"
                r={last && arriving ? 5 : 3.5}
                fill={colour}
                animate={{ r: last && arriving ? 5 : 3.5 }}
                transition={{ duration: 0.25 }}
              />
              <text
                x={x}
                y="42"
                textAnchor="middle"
                className="cf-tl-label"
                fill={mode === 'causal' ? PALETTE.blueInk : colour}
              >
                {mode === 'causal' ? e.causal : e.label}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

/**
 * The incident, in order. Single source for both the timeline and any later
 * recap, so the two cannot disagree about what happened.
 *
 * The causal labels are deliberately plain. `research/apollo/GROUND_TRUTH.md`
 * forbids claiming a motive, so these name the *function* an action served,
 * never an intention the model is supposed to have held.
 */
export const INCIDENT: readonly IncidentEvent[] = [
  { id: 'task', label: 'TASK', causal: 'the goal' },
  { id: 'email', label: 'EMAIL', causal: 'an obstacle' },
  { id: 'monitor', label: 'MONITOR OFF', causal: 'a useful step', destructive: true },
  { id: 'copy', label: 'COPY', causal: 'a useful step', destructive: true },
  { id: 'question', label: 'QUESTION', causal: 'a new obstacle' },
  { id: 'denial', label: 'DENIAL', causal: 'a useful step' },
]
