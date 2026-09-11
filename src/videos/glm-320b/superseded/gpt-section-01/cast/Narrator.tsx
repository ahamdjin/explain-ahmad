import { motion } from 'motion/react'
import { INK } from '../paper'

export type NarratorPose = 'wonder' | 'point' | 'think' | 'hopeful' | 'cheer' | 'push' | 'nod'

/**
 * The viewer's proxy. Asks every question in Section 01 and explains nothing.
 *
 * Redrawn to the storyboard's proportions: a large round head on a small body,
 * a simple tunic, and short plain legs. The previous version had long jointed
 * legs that read as comic rather than simple, which is the opposite of what a
 * figure standing next to a 320-billion-parameter building should do.
 *
 * Pose is the emotional track. A viewer with the sound off should be able to
 * read hope and deflation off this figure alone -- so poses are large and few.
 */
export function Narrator({
  pose = 'wonder',
  flip = false,
  scale = 1,
}: {
  pose?: NarratorPose
  flip?: boolean
  scale?: number
}) {
  return (
    <motion.div
      className="g1-narrator"
      data-pose={pose}
      style={{ '--flip': flip ? -1 : 1, '--scale': scale } as React.CSSProperties}
      animate={{ y: pose === 'cheer' ? -6 : 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 14 }}
    >
      <svg viewBox="0 0 130 200" aria-hidden="true">
        <g fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          {/* head */}
          <circle cx="65" cy="46" r="40" fill="#FFFDF8" />

          {/* neck */}
          <path d="M65 86v10" />

          {/* tunic */}
          <path d="M49 96h32l6 50H43z" fill="#FFFDF8" />

          {/* legs -- short and plain */}
          <path d="M57 146v32" />
          <path d="M75 146v32" />
          <path d="M57 178q-7 3-11 2" />
          <path d="M75 178q7 3 11 2" />

          <Arms pose={pose} />
        </g>

        <Face pose={pose} />

        {/* the "!" ticks the storyboard figures use when something lands */}
        {(pose === 'point' || pose === 'cheer' || pose === 'hopeful') ? (
          <g stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.8">
            <path d="M22 16l-6-9" />
            <path d="M40 8l-2-10" />
            <path d="M108 16l6-9" />
          </g>
        ) : null}

        {pose === 'think' ? (
          <g fill={INK} opacity="0.5">
            <circle cx="106" cy="22" r="3" />
            <circle cx="116" cy="12" r="4.2" />
          </g>
        ) : null}
      </svg>
    </motion.div>
  )
}

function Face({ pose }: { pose: NarratorPose }) {
  if (pose === 'cheer') {
    return (
      <g fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round">
        <path d="M45 40c3-5 8-5 11 0" />
        <path d="M74 40c3-5 8-5 11 0" />
        <path d="M55 58c5 5 15 5 20 0" />
      </g>
    )
  }

  /* Eyeline carries most of the acting: forward when engaged, off to the side
   * when questioning, down when deflated. */
  const shift = pose === 'point' || pose === 'push' ? 5 : pose === 'hopeful' ? 3 : pose === 'think' ? -4 : 0
  const drop = pose === 'think' ? 3 : 0

  return (
    <g>
      <g fill={INK}>
        <ellipse cx={51 + shift} cy={44 + drop} rx="4.4" ry="5.2" />
        <ellipse cx={79 + shift} cy={44 + drop} rx="4.4" ry="5.2" />
      </g>
      {pose === 'think' ? (
        <path d="M56 63h18" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      ) : pose === 'hopeful' || pose === 'nod' ? (
        <path d="M56 60c4 4 12 4 16 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      ) : null}
    </g>
  )
}

/** Arm tips stay clear of the head circle (cx 65, cy 46, r 40). */
function Arms({ pose }: { pose: NarratorPose }) {
  switch (pose) {
    case 'point':
      return (
        <>
          <path d="M49 104 26 122" />
          <path d="M81 102l30 -16" />
        </>
      )
    case 'think':
      return (
        <>
          <path d="M49 106 28 124" />
          <path d="M81 104l14 -10 -3 -9" />
        </>
      )
    case 'hopeful':
      return (
        <>
          <path d="M49 104 34 96 42 90" />
          <path d="M81 104 96 96 88 90" />
        </>
      )
    case 'cheer':
      return (
        <>
          <path d="M49 100 20 76" />
          <path d="M81 100 110 76" />
        </>
      )
    case 'push':
      return (
        <>
          <path d="M81 100 114 96" />
          <path d="M114 88v16" />
          <path d="M81 114 112 110" />
          <path d="M112 102v16" />
          <path d="M49 106 30 122" />
        </>
      )
    case 'nod':
      return (
        <>
          <path d="M49 102 34 124" />
          <path d="M81 102 96 124" />
        </>
      )
    default:
      return (
        <>
          <path d="M49 102 28 122" />
          <path d="M81 102 102 122" />
        </>
      )
  }
}
