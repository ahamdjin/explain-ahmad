import { motion } from 'motion/react'
import { INK } from '../paper'

export type NarratorPose = 'point' | 'wonder' | 'think' | 'hopeful' | 'cheer' | 'push'

/**
 * The viewer's proxy. Asks every question in Section 01, never explains.
 * Deliberately the only colourless character in the world.
 */
export function Narrator({
  pose = 'wonder',
  flip = false,
  scale = 1,
  className = '',
}: {
  pose?: NarratorPose
  flip?: boolean
  scale?: number
  className?: string
}) {
  return (
    <motion.div
      className={`s1-narrator ${className}`.trim()}
      data-pose={pose}
      style={{ '--flip': flip ? -1 : 1, '--scale': scale } as React.CSSProperties}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <svg viewBox="0 0 120 190" filter="url(#s1-ink-soft)" aria-hidden="true">
        <g fill="none" stroke={INK} strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round">
          {/* head */}
          <path d="M60 8c25.5 0 42 16.5 42 37.5S85 84 60 84 18 66.5 18 45.5 34.5 8 60 8Z" fill="#FFFDF8" />

          {/* eyes — direction varies by pose */}
          <Eyes pose={pose} />

          {/* body */}
          <path d="M60 84v58" />
          <path d="M42 142h36" />
          <path d="M46 142l-5 40" />
          <path d="M74 142l5 40" />

          <Arms pose={pose} />
        </g>
        {pose === 'think' ? (
          <g fill={INK} opacity="0.55">
            <circle cx="96" cy="60" r="3" />
            <circle cx="106" cy="49" r="4.2" />
            <circle cx="114" cy="35" r="5.4" />
          </g>
        ) : null}
      </svg>
    </motion.div>
  )
}

function Eyes({ pose }: { pose: NarratorPose }) {
  if (pose === 'cheer') {
    return (
      <g stroke={INK} strokeWidth="3.4">
        <path d="M42 40c3-4 7-4 10 0" />
        <path d="M68 40c3-4 7-4 10 0" />
        <path d="M52 58c4 4 12 4 16 0" />
      </g>
    )
  }

  const look = pose === 'point' || pose === 'hopeful' ? 4 : pose === 'push' ? 5 : -3
  return (
    <g fill={INK} stroke="none">
      <ellipse cx={46 + look} cy="44" rx="4.6" ry="5.4" />
      <ellipse cx={74 + look} cy="44" rx="4.6" ry="5.4" />
    </g>
  )
}

/**
 * Arm tips stay clear of the head silhouette (a circle spanning x 18-102,
 * y 3-87), otherwise the stroke reads as a line drawn through the face.
 */
function Arms({ pose }: { pose: NarratorPose }) {
  switch (pose) {
    case 'point':
      return (
        <>
          <path d="M60 102 26 118" />
          <path d="M60 102l52 -14" />
        </>
      )
    case 'think':
      return (
        <>
          <path d="M60 104 30 118" />
          <path d="M60 106l16 -8 -2 -8" />
        </>
      )
    case 'hopeful':
      return (
        <>
          <path d="M60 104 42 100 50 92" />
          <path d="M60 104 78 100 70 92" />
        </>
      )
    case 'cheer':
      return (
        <>
          <path d="M60 100 22 78" />
          <path d="M60 100 98 78" />
        </>
      )
    case 'push':
      // Both arms forward with flat palms, so the pose reads as pushing
      // something rather than as two loose lines.
      return (
        <>
          <path d="M60 100 100 96" />
          <path d="M100 88v16" />
          <path d="M60 112 98 108" />
          <path d="M98 100v16" />
        </>
      )
    default:
      return (
        <>
          <path d="M60 100 28 116" />
          <path d="M60 100 92 116" />
        </>
      )
  }
}
