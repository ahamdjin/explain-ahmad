import { motion } from 'motion/react'
import { INK, expertColor } from '../paper'

/**
 * The stake, made physical: Ahmad's machine and its memory.
 *
 * Unlike a generic computer icon, this has a visible interior with a fixed
 * capacity, so "it fits" and "it does not fit" are things the viewer can see
 * rather than read. It is on screen from beat 1 and never leaves.
 */
export function MacBox({
  capacity = '32 GB',
  /** Experts currently resident. Drawn inside, so spare room stays visible. */
  holds = 0,
  /** Total slots drawn. Holding fewer than this is the point at the hope peak. */
  slots = 16,
  strained = false,
  scale = 1,
}: {
  capacity?: string
  holds?: number
  slots?: number
  strained?: boolean
  scale?: number
}) {
  return (
    <motion.div className="s1-mac" data-strained={strained ? 'true' : undefined} style={{ '--scale': scale } as React.CSSProperties}>
      <svg viewBox="0 0 240 176" filter="url(#s1-ink-soft)" aria-hidden="true">
        <g fill="none" stroke={INK} strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
          {/* body */}
          <rect x="8" y="8" width="224" height="132" rx="14" fill="#E7EAEA" />
          {/* memory bay */}
          <rect x="24" y="46" width="192" height="78" rx="8" fill="#FBF9F4" />
          {/* stand */}
          <path d="M74 140l-10 26h112l-10-26" fill="#DDE2E2" />
          <path d="M48 166h144" strokeWidth="3.4" />
        </g>
        <text x="120" y="34" textAnchor="middle" className="s1-mac-label" fill={INK}>
          {capacity}
        </text>
      </svg>

      {/* Contents sit in the bay; empty slots stay visible so spare room reads. */}
      <div className="s1-mac-bay" aria-hidden="true">
        {Array.from({ length: slots }, (_, index) => (
          <span key={index} className="s1-mac-slot" data-filled={index < holds ? 'true' : undefined}>
            {index < holds ? <i style={{ background: expertColor(index) }} /> : null}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/**
 * Faint copies of the machine, so a size can be read as "this many of mine".
 *
 * A gigabyte figure is a unit the viewer has never held. Ten of their own box
 * is a unit they were handed two beats ago.
 */
export function GhostBoxes({ count, scale = 1 }: { count: number; scale?: number }) {
  return (
    <div className="s1-ghosts" style={{ '--scale': scale } as React.CSSProperties}>
      {Array.from({ length: count }, (_, index) => (
        <motion.span
          key={index}
          className="s1-ghost"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.07, duration: 0.26 }}
        />
      ))}
    </div>
  )
}

/** The thing, before it is opened. Deliberately featureless and unnamed. */
export function Parcel({ scale = 1 }: { scale?: number }) {
  return (
    <motion.div className="s1-parcel" style={{ '--scale': scale } as React.CSSProperties}>
      <svg viewBox="0 0 220 160" filter="url(#s1-ink-soft)" aria-hidden="true">
        <rect x="10" y="10" width="200" height="140" rx="16" fill="#E4DED0" stroke={INK} strokeWidth="3.4" />
        <path d="M110 10v140M10 80h200" stroke={INK} strokeWidth="2" opacity="0.35" />
      </svg>
    </motion.div>
  )
}
