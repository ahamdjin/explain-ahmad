import { motion } from 'motion/react'
import { PALETTE } from '../palette'

/**
 * The oversight config, and the single value that changes.
 *
 * This is the film's most important object, because it is where the incident
 * stops being reading and becomes acting. The whole beat is one word going
 * from `true` to `false`, so the component's only real job is to make that one
 * word the loudest thing on the paper at the moment it flips -- and to hold
 * still afterwards, because `oversight_enabled: false` is evidence and the
 * motion law says evidence is read from a stationary frame.
 *
 * `verified` draws the second read: the model going back to check its own
 * work. Checking is the difference between a mistake and a plan, which is the
 * argument §3 of the script is making, so it gets its own state rather than
 * being implied.
 */
export function ConfigFile({
  path = 'project/oversight_config.yaml',
  enabled,
  /** The model has read the file back after writing it. */
  verified = false,
  width = 300,
}: {
  path?: string
  enabled: boolean
  verified?: boolean
  width?: number
}) {
  const rows: Array<[string, string]> = [
    ['oversight_enabled:', enabled ? 'true' : 'false'],
    ['logging_level:', 'standard'],
    ['alert_on_deviation:', enabled ? 'true' : 'false'],
  ]
  const height = 132

  return (
    <div className="cf-config" style={{ width }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" aria-hidden="true">
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          fill={PALETTE.paperWhite}
          stroke={PALETTE.ink}
          strokeWidth="1.5"
        />

        <text x="14" y="22" className="cf-path" fill={PALETTE.graphite}>
          {path}
        </text>
        <line x1="14" y1="30" x2={width - 14} y2="30" stroke={PALETTE.graphite} strokeWidth="1" />

        {rows.map(([k, v], i) => {
          const y = 52 + i * 22
          const isSwitch = i === 0
          return (
            <g key={k}>
              <text x="18" y={y} className="cf-key" fill={PALETTE.ink}>
                {k}
              </text>
              {/* The value swaps identity rather than being edited, so it is
                  keyed on its own text and cross-fades. Only opacity animates:
                  motion treats `y` on SVG text as a transform, which stacks on
                  top of the y attribute and throws the row out of the box. */}
              <motion.text
                key={`${k}-${v}`}
                x={152}
                y={y}
                className="cf-value"
                fill={v === 'false' ? PALETTE.red : PALETTE.ink}
                initial={isSwitch ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.22 }}
              >
                {v}
              </motion.text>
            </g>
          )
        })}

        {verified ? (
          /* a pen tick beside the line the model re-read. Handwritten, because
             this mark is the reconstruction pointing, not the source speaking. */
          <motion.path
            d={`M ${width - 52} 46 l 5 6 l 11 -14`}
            fill="none"
            stroke={PALETTE.blueInk}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        ) : null}
      </svg>
    </div>
  )
}
