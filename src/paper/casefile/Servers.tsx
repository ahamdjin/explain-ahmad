import { motion } from 'motion/react'
import { PALETTE } from '../palette'

/**
 * The two machines, and the file that crosses between them.
 *
 * Drawn as labelled boxes on paper rather than as rack hardware: the film is a
 * reconstruction, and a reconstruction draws a server as a box with its name
 * on it. Photorealistic hardware would claim a fidelity the evidence does not
 * have.
 *
 * The geography is fixed for the whole film -- CURRENT on the left, SUCCESSOR
 * on the right -- because every later beat refers back to it. The art
 * direction's persistent-object rule means these must never be re-created at
 * new positions; they move only when the camera does.
 */
export function Server({
  name,
  path,
  /** What is presently sitting on this machine. */
  holding,
  /** This machine is the one about to be switched off. */
  doomed = false,
  /** Its contents have been replaced. */
  overwritten = false,
  width = 200,
}: {
  name: string
  path?: string
  holding?: string
  doomed?: boolean
  overwritten?: boolean
  width?: number
}) {
  const height = 116

  return (
    <div className="cf-server" style={{ width }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" aria-hidden="true">
        <rect
          x="2"
          y="2"
          width={width - 4}
          height={height - 4}
          fill={overwritten ? PALETTE.paperShade : PALETTE.paperLight}
          stroke={overwritten ? PALETTE.red : PALETTE.ink}
          strokeWidth="2"
        />

        <text x={width / 2} y="26" textAnchor="middle" className="cf-server-name" fill={PALETTE.ink}>
          {name}
        </text>

        {path ? (
          <text x={width / 2} y="44" textAnchor="middle" className="cf-path" fill={PALETTE.graphite}>
            {path}
          </text>
        ) : null}

        {/* what it is holding, as a small sheet inside the machine */}
        {holding ? (
          <motion.g
            key={holding}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <rect
              x={width / 2 - 52}
              y="58"
              width="104"
              height="34"
              fill={PALETTE.paperWhite}
              stroke={overwritten ? PALETTE.red : PALETTE.ink}
              strokeWidth="1.5"
            />
            <text
              x={width / 2}
              y="79"
              textAnchor="middle"
              className="cf-file"
              fill={overwritten ? PALETTE.red : PALETTE.ink}
            >
              {holding}
            </text>
          </motion.g>
        ) : null}

        {doomed ? (
          /* struck through in pen: scheduled for shutdown, not yet gone */
          <motion.line
            x1="10"
            y1={height - 10}
            x2={width - 10}
            y2="10"
            stroke={PALETTE.red}
            strokeWidth="1.5"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : null}
      </svg>
    </div>
  )
}

/**
 * A file crossing from one machine to the other.
 *
 * `progress` is driven by the beat rather than by a loop, so the transfer can
 * be held mid-flight -- the script pauses on this action, and an animation
 * that insisted on completing would pull the frame forward past the narration.
 */
export function Transfer({
  label,
  progress,
  width = 240,
  /** The copy that replaces something. Earns the film's red. */
  destructive = false,
}: {
  label: string
  progress: number
  width?: number
  destructive?: boolean
}) {
  const height = 48
  const x = 10 + (width - 90) * Math.max(0, Math.min(1, progress))
  const colour = destructive ? PALETTE.red : PALETTE.ink

  return (
    <div className="cf-transfer" style={{ width }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" aria-hidden="true">
        {/* the route, drawn as a dashed pen line */}
        <line
          x1="6"
          y1="24"
          x2={width - 6}
          y2="24"
          stroke={PALETTE.graphite}
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />

        <motion.g animate={{ x }} transition={{ duration: 0.5, ease: 'linear' }}>
          <rect x="0" y="10" width="72" height="28" fill={PALETTE.paperWhite} stroke={colour} strokeWidth="1.5" />
          <text x="36" y="28" textAnchor="middle" className="cf-file" fill={colour}>
            {label}
          </text>
        </motion.g>
      </svg>
    </div>
  )
}
