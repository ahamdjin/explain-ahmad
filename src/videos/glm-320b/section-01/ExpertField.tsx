import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { INK, expertColor } from './paper'

export const COLS = 30
export const ROWS = 12
export const GRID_W = 66

/**
 * The active block is contiguous and exactly 20 of 360 cells (5.56%), so the
 * ~18B/320B ratio the frame claims is the ratio it actually draws.
 */
const ACTIVE_COL = 4
const ACTIVE_ROW = 6
const ACTIVE_W = 5
const ACTIVE_H = 4

/** Grey cells that grow faces and ask questions. */
const REACTING = [104, 137, 168, 201, 232, 259, 286]

/**
 * Cells on this sub-lattice are the ones that become expert characters. They
 * stay in their own grid slots and scale up, while the cells between them fade
 * out — so the expert wall occupies exactly the space the parameters did.
 *
 * This is the continuity beat the section turns on: the same objects transform,
 * rather than a grid being replaced by a separate crowd.
 */
const EXPERT_COL_STEP = 3
const EXPERT_ROW_STEP = 2
const EXPERT_COL_OFFSET = 1
const EXPERT_ROW_OFFSET = 1

function isActive(index: number) {
  const col = index % COLS
  const row = Math.floor(index / COLS)
  return col >= ACTIVE_COL && col < ACTIVE_COL + ACTIVE_W && row >= ACTIVE_ROW && row < ACTIVE_ROW + ACTIVE_H
}

function expertSlot(index: number) {
  const col = index % COLS
  const row = Math.floor(index / COLS)
  if ((col - EXPERT_COL_OFFSET) % EXPERT_COL_STEP !== 0) return -1
  if ((row - EXPERT_ROW_OFFSET) % EXPERT_ROW_STEP !== 0) return -1
  if (col < EXPERT_COL_OFFSET || row < EXPERT_ROW_OFFSET) return -1
  const eCol = (col - EXPERT_COL_OFFSET) / EXPERT_COL_STEP
  const eRow = (row - EXPERT_ROW_OFFSET) / EXPERT_ROW_STEP
  const perRow = Math.floor((COLS - EXPERT_COL_OFFSET - 1) / EXPERT_COL_STEP) + 1
  return eRow * perRow + eCol
}

/** One expert always participates. Fixed slot so it reads as the same one. */
export const SHARED_SLOT = 9

export const EXPERT_COUNT = (() => {
  let count = 0
  for (let index = 0; index < COLS * ROWS; index += 1) if (expertSlot(index) >= 0) count += 1
  return count
})()

export function ExpertField({
  on,
  at,
  scale,
  slice,
  reacting,
  asExperts,
  dim,
  selected,
}: {
  on: boolean
  at: { x: number; y: number }
  scale: number
  slice: boolean
  reacting: boolean
  asExperts: boolean
  dim: boolean
  selected: readonly number[]
}) {
  const reactingSet = new Set(reacting ? REACTING : [])
  const selectedSet = new Set(selected)
  const hasSelection = selectedSet.size > 0

  return (
    <motion.div
      className="s1-field"
      data-mode={asExperts ? 'experts' : 'grid'}
      style={{ '--cols': COLS } as CSSProperties}
      // Centring lives in the animate object, not CSS: Motion writes its own
      // inline transform and would discard a CSS translate(-50%, -50%).
      animate={{
        left: `${at.x}%`,
        top: `${at.y}%`,
        x: '-50%',
        y: '-50%',
        scale,
        opacity: on ? (dim ? 0.5 : 1) : 0,
      }}
      transition={{ type: 'spring', stiffness: 74, damping: 20 }}
      aria-hidden={!on}
    >
      {Array.from({ length: COLS * ROWS }, (_, index) => {
        const slot = expertSlot(index)
        const isExpert = asExperts && slot >= 0
        const fades = asExperts && slot < 0
        const active = !asExperts && slice && isActive(index)
        const asks = !asExperts && reactingSet.has(index)
        const isShared = isExpert && slot === SHARED_SLOT
        const chosen = isExpert && (selectedSet.has(slot) || isShared)

        return (
          <motion.span
            key={index}
            className="s1-cell"
            data-active={active ? 'true' : undefined}
            data-asks={asks ? 'true' : undefined}
            data-expert={isExpert ? 'true' : undefined}
            data-chosen={chosen ? 'true' : undefined}
            data-shared={isShared ? 'true' : undefined}
            animate={{
              opacity: fades ? 0 : isExpert && hasSelection && !chosen ? 0.3 : active ? 1 : slice && !asExperts ? 0.62 : 0.78,
              scale: isExpert ? 2.55 : active ? 1.04 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 18,
              delay: isExpert ? (slot % 11) * 0.014 : active ? (index % COLS) * 0.012 : 0,
            }}
          >
            {isExpert ? <ExpertFace index={slot} chosen={chosen} shared={isShared} /> : null}
            {asks ? <AskingFace /> : null}
          </motion.span>
        )
      })}
    </motion.div>
  )
}

function ExpertFace({ index, chosen, shared }: { index: number; chosen: boolean; shared: boolean }) {
  return (
    <svg viewBox="0 0 64 72" aria-hidden="true">
      <g stroke={INK} strokeWidth="2.4" strokeLinecap="round">
        <path d="M22 60v7" />
        <path d="M42 60v7" />
      </g>
      <rect
        x="6"
        y="8"
        width="52"
        height="52"
        rx="13"
        fill={shared ? '#74A297' : expertColor(index)}
        stroke={INK}
        strokeWidth="2.6"
        strokeDasharray={shared ? '6 4' : undefined}
      />
      <g fill={INK}>
        <circle cx="24" cy="28" r="2.9" />
        <circle cx="40" cy="28" r="2.9" />
      </g>
      <path
        d={chosen ? 'M23 40c4 5 14 5 18 0' : 'M25 40c3 3 11 3 14 0'}
        fill="none"
        stroke={INK}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** A parameter that has noticed it is not being used. */
function AskingFace() {
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

/** Brace geometry that lines up with the cells it measures. */
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
