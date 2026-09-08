import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { INK } from './paper'

export const COLS = 30
export const ROWS = 12

/**
 * The active block is deliberately contiguous and exactly 20 of 360 cells
 * (5.56%), so the ~18B/320B ratio the frame claims is the ratio it draws.
 */
const ACTIVE_COL = 4
const ACTIVE_ROW = 6
const ACTIVE_W = 5
const ACTIVE_H = 4

/** Grey cells that grow faces and ask questions in frame 4. */
const REACTING = [104, 137, 168, 201, 232, 259, 286]

function isActive(index: number) {
  const col = index % COLS
  const row = Math.floor(index / COLS)
  return col >= ACTIVE_COL && col < ACTIVE_COL + ACTIVE_W && row >= ACTIVE_ROW && row < ACTIVE_ROW + ACTIVE_H
}

export function ParameterGrid({
  activeVisible,
  reacting = false,
  scale = 1,
}: {
  activeVisible: boolean
  reacting?: boolean
  scale?: number
}) {
  const reactingSet = new Set(reacting ? REACTING : [])

  return (
    <motion.div
      className="s1-grid"
      style={{ '--cols': COLS, '--scale': scale } as CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {Array.from({ length: COLS * ROWS }, (_, index) => {
        const active = activeVisible && isActive(index)
        const asks = reactingSet.has(index)

        return (
          <motion.span
            key={index}
            className="s1-cell"
            data-active={active ? 'true' : undefined}
            data-asks={asks ? 'true' : undefined}
            initial={false}
            animate={{
              opacity: active ? 1 : activeVisible ? 0.62 : 0.78,
              scale: active ? 1.04 : 1,
            }}
            transition={{ delay: active ? (index % COLS) * 0.012 : 0, duration: 0.24 }}
          >
            {asks ? <ParameterFace /> : null}
          </motion.span>
        )
      })}
    </motion.div>
  )
}

/** A grey parameter that has noticed it is not being used. */
function ParameterFace() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" filter="url(#s1-ink-soft)">
      <g fill={INK}>
        <circle cx="14" cy="16" r="2.6" />
        <circle cx="26" cy="16" r="2.6" />
      </g>
      <path d="M14 27c4 3 8 3 12 0" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

/** Grid width in container units, kept inside the 90% safe frame. */
export const GRID_W = 66

/**
 * Brace geometry in stage percentages. Braces have to line up with the cells
 * they measure, so the arithmetic lives next to the grid constants rather than
 * being guessed at each call site.
 */
export function braceBox(centerX: number, scale = 1) {
  const width = GRID_W * scale
  const left = centerX - width / 2
  return {
    total: { left: `${left}%`, width: `${width}%` },
    active: {
      left: `${left + (ACTIVE_COL / COLS) * width}%`,
      width: `${(ACTIVE_W / COLS) * width}%`,
    },
  }
}
