import { motion } from 'motion/react'
import { INK, expertColor } from '../paper'

export type ExpertMood = 'idle' | 'asleep' | 'happy' | 'question'

/**
 * A learned feed-forward block. Identical construction across the whole
 * population so the crowd reads as one family; only fill colour and badge vary.
 *
 * Labels are deliberately neutral (ids/badges, never "math expert") — real MoE
 * experts are not interpretable specialists. See storyboard/section-01/FRAMES.md.
 */
export function Expert({
  index = 0,
  label,
  mood = 'idle',
  size = 46,
  dashed = false,
  dimmed = false,
  className = '',
}: {
  index?: number
  label?: string
  mood?: ExpertMood
  size?: number
  dashed?: boolean
  dimmed?: boolean
  className?: string
}) {
  const fill = dashed ? '#EDE7DA' : expertColor(index)

  return (
    <motion.div
      className={`s1-expert ${className}`.trim()}
      data-mood={mood}
      data-dimmed={dimmed ? 'true' : undefined}
      style={{ '--size': `${size}px` } as React.CSSProperties}
      initial={{ opacity: 0, scale: 0.86 }}
      animate={{ opacity: dimmed ? 0.42 : 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
    >
      <svg viewBox="0 0 64 72" filter="url(#s1-ink-soft)" aria-hidden="true">
        {/* feet */}
        <g stroke={INK} strokeWidth="2.6" strokeLinecap="round">
          <path d="M22 60v7" />
          <path d="M42 60v7" />
        </g>

        <rect
          x="6"
          y="8"
          width="52"
          height="52"
          rx="13"
          fill={fill}
          stroke={INK}
          strokeWidth="2.8"
          strokeDasharray={dashed ? '5 4' : undefined}
        />

        <Face mood={mood} />

        {label ? (
          <text x="32" y="40" textAnchor="middle" className="s1-expert-id" fill={INK}>
            {label}
          </text>
        ) : null}
      </svg>
    </motion.div>
  )
}

function Face({ mood }: { mood: ExpertMood }) {
  if (mood === 'asleep') {
    return (
      <g stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.75">
        <path d="M20 30h8" />
        <path d="M36 30h8" />
      </g>
    )
  }

  if (mood === 'question') {
    return (
      <g>
        <g fill={INK}>
          <circle cx="24" cy="29" r="2.9" />
          <circle cx="40" cy="29" r="2.9" />
        </g>
        <text x="32" y="50" textAnchor="middle" className="s1-expert-mark" fill={INK}>?</text>
      </g>
    )
  }

  return (
    <g>
      <g fill={INK}>
        <circle cx="24" cy="28" r="2.9" />
        <circle cx="40" cy="28" r="2.9" />
      </g>
      <path
        d={mood === 'happy' ? 'M23 40c4 5 14 5 18 0' : 'M25 40c3 3 11 3 14 0'}
        fill="none"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </g>
  )
}

/** The always-on shared expert: same body, neutral fill, dashed outline. */
export function SharedExpert({ size = 46, label = 'shared' }: { size?: number; label?: string }) {
  return (
    <div className="s1-shared-expert">
      <Expert index={0} size={size} dashed mood="happy" />
      <span className="s1-shared-tag">{label}</span>
    </div>
  )
}
