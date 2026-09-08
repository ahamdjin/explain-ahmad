import { motion } from 'motion/react'
import { INK } from '../paper'

/**
 * Dispatcher, not a boss (GLM_PAPER_WORLD.md section 7). Its identity comes
 * from visibly receiving something, deciding, and directing traffic.
 */
export function Router({
  scale = 1,
  gesturing = false,
  className = '',
}: {
  scale?: number
  gesturing?: boolean
  className?: string
}) {
  return (
    <motion.div
      className={`s1-router ${className}`.trim()}
      data-gesturing={gesturing ? 'true' : undefined}
      style={{ '--scale': scale } as React.CSSProperties}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 19 }}
    >
      <svg viewBox="0 0 200 190" filter="url(#s1-ink-soft)" aria-hidden="true">
        <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* antenna */}
          <path d="M100 34V16" />
          <circle cx="100" cy="10" r="6.5" fill="#E79A63" />

          {/* head with screen face */}
          <rect x="46" y="34" width="108" height="76" rx="16" fill="#FBF8F1" />
          <rect x="60" y="46" width="80" height="52" rx="10" fill="#F1ECE0" />
          <g fill={INK} stroke="none">
            <circle cx="82" cy="68" r="5" />
            <circle cx="118" cy="68" r="5" />
          </g>
          <path d="M86 84c6 5 22 5 28 0" strokeWidth="2.8" />

          {/* body */}
          <rect x="58" y="112" width="84" height="52" rx="12" fill="#FBF8F1" />

          {/* arms */}
          {gesturing ? (
            <>
              <path d="M58 126 30 108" />
              <path d="M142 126 172 104" />
              <path d="M172 104l8-6M172 104l1 10" />
            </>
          ) : (
            <>
              <path d="M58 126 34 132" />
              <path d="M142 126 166 132" />
            </>
          )}

          {/* feet */}
          <path d="M78 164v10" />
          <path d="M122 164v10" />
        </g>

        <text x="100" y="146" textAnchor="middle" className="s1-router-label" fill={INK}>
          Router
        </text>

        {gesturing ? (
          <g stroke="#E79A63" strokeWidth="3" strokeLinecap="round" opacity="0.9">
            <path d="M34 44l-9-9" />
            <path d="M28 62l-12-3" />
            <path d="M166 44l9-9" />
          </g>
        ) : null}
      </svg>
    </motion.div>
  )
}
