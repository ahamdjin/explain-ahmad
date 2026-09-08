import { motion } from 'motion/react'
import { type CSSProperties, type ReactNode } from 'react'
import { INK } from './paper'

/**
 * Handwritten annotation. Carries the questions in Section 01, so it must be
 * legible at 1920x1080 — this is what the previous version rendered as
 * near-invisible 1px marks.
 */
export function Note({
  children,
  at,
  rotate = -2,
  align = 'left',
  tone = 'ink',
  size = 'md',
  backed = false,
}: {
  children: ReactNode
  at: { x: string; y: string }
  rotate?: number
  align?: 'left' | 'center' | 'right'
  tone?: 'ink' | 'orange' | 'red'
  size?: 'sm' | 'md' | 'lg'
  /** Adds a paper halo so the note stays readable over the parameter grid. */
  backed?: boolean
}) {
  return (
    <motion.p
      className="s1-note"
      data-tone={tone}
      data-size={size}
      data-backed={backed ? 'true' : undefined}
      style={{ left: at.x, top: at.y, '--rotate': `${rotate}deg`, textAlign: align } as CSSProperties}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32 }}
    >
      {children}
    </motion.p>
  )
}

/** Speech from a character. Reserved for the router and reacting parameters. */
export function Bubble({
  children,
  at,
  tail = 'bottom-left',
  width = 260,
}: {
  children: ReactNode
  at: { x: string; y: string }
  tail?: 'bottom-left' | 'bottom-center' | 'left'
  width?: number
}) {
  return (
    <motion.div
      className="s1-bubble"
      data-tail={tail}
      style={{ left: at.x, top: at.y, '--w': `${width}px` } as CSSProperties}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 18 }}
    >
      {children}
    </motion.div>
  )
}

/** A dimension brace with a label, used for 320B total and ~18B active. */
export function Brace({
  label,
  sub,
  at,
  width,
  side = 'bottom',
  tone = 'ink',
}: {
  label: string
  sub?: string
  at: { x: string; y: string }
  width: string
  side?: 'top' | 'bottom'
  tone?: 'ink' | 'orange'
}) {
  return (
    <motion.div
      className="s1-brace"
      data-side={side}
      data-tone={tone}
      style={{ left: at.x, top: at.y, '--w': width } as CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <svg viewBox="0 0 400 16" preserveAspectRatio="none" filter="url(#s1-ink-soft)" aria-hidden="true">
        <path
          d={side === 'bottom' ? 'M2 2v9h396V2M200 11v4' : 'M2 14V5h396v9M200 5V1'}
          fill="none"
          stroke={tone === 'orange' ? '#C87B45' : INK}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="s1-brace-label">
        {label}
        {sub ? <em>{sub}</em> : null}
      </span>
    </motion.div>
  )
}

/** Curved leader arrow connecting an annotation to the thing it describes. */
/**
 * Deliberately unfiltered: the shared ink filter uses an objectBoundingBox
 * region, and an axis-aligned line has a zero-height (or zero-width) bbox,
 * which collapses the filter region and renders nothing at all.
 */
export function Arrow({
  from,
  to,
  bow = 40,
  tone = 'ink',
  dashed = false,
  label,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  bow?: number
  tone?: 'ink' | 'orange'
  dashed?: boolean
  label?: string
}) {
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2 - bow
  const stroke = tone === 'orange' ? '#C87B45' : INK
  const id = `s1-head-${tone}`

  return (
    <svg className="s1-arrow" viewBox="0 0 1920 1080" aria-hidden="true">
      <defs>
        <marker id={id} viewBox="0 0 12 12" refX="9" refY="6" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 1l10 5-10 5" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <motion.path
        d={`M${from.x} ${from.y}Q${midX} ${midY} ${to.x} ${to.y}`}
        fill="none"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray={dashed ? '8 7' : undefined}
        markerEnd={`url(#${id})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      {label ? (
        <text x={midX} y={midY - 8} textAnchor="middle" className="s1-arrow-label" fill={stroke}>
          {label}
        </text>
      ) : null}
    </svg>
  )
}

/** Emphasis ticks. Used sparingly — excitement, or a thing that just landed. */
export function Sparks({ at, tone = 'orange' }: { at: { x: string; y: string }; tone?: 'orange' | 'ink' }) {
  return (
    <motion.svg
      className="s1-sparks"
      style={{ left: at.x, top: at.y } as CSSProperties}
      viewBox="0 0 60 60"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 14 }}
    >
      <g stroke={tone === 'orange' ? '#E79A63' : INK} strokeWidth="3.2" strokeLinecap="round">
        <path d="M30 4v12" />
        <path d="M8 14l8 9" />
        <path d="M52 14l-8 9" />
      </g>
    </motion.svg>
  )
}

/** The red cross that marks the blocked path in frame 13. */
export function Cross({ at }: { at: { x: string; y: string } }) {
  return (
    <motion.svg
      className="s1-cross"
      style={{ left: at.x, top: at.y } as CSSProperties}
      viewBox="0 0 60 60"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 1.5, rotate: -12 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 190, damping: 13 }}
    >
      <g stroke="#C86658" strokeWidth="6.5" strokeLinecap="round" filter="url(#s1-ink-soft)">
        <path d="M13 13l34 34" />
        <path d="M47 13L13 47" />
      </g>
    </motion.svg>
  )
}

/** A titled panel that groups objects, e.g. "Stored experts (on disk / CPU)". */
export function Panel({
  title,
  children,
  dashed = false,
  tone = 'ink',
  className = '',
}: {
  title?: string
  children: ReactNode
  dashed?: boolean
  tone?: 'ink' | 'orange'
  className?: string
}) {
  return (
    <div className={`s1-panel ${className}`.trim()} data-dashed={dashed ? 'true' : undefined} data-tone={tone}>
      {title ? <span className="s1-panel-title">{title}</span> : null}
      <div className="s1-panel-body">{children}</div>
    </div>
  )
}
