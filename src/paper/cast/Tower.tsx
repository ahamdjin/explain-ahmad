import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE } from '../palette'

/**
 * The model as a building: 45 layers, the first 3 dense and the other 42 sparse.
 *
 * Everything before this has happened in one room, and the viewer has quietly
 * assumed that room *is* the model. This is the pull-back that takes it away.
 */
const FLOORS = 45
const DENSE = 3

export function Tower({ floor, label }: { floor: number; label?: string }) {
  const H = 15
  const TOP = 24
  const height = FLOORS * H + TOP * 2
  /* Floor 1 at the bottom, so climbing reads as climbing. */
  const y = (n: number) => TOP + (FLOORS - n) * H

  return (
    <div className="s1-tower">
      <svg viewBox={`0 0 520 ${height}`} aria-hidden="true">
        <g fill="none" stroke={INK} strokeLinejoin="round">
          <path d={`M96 ${TOP}h330v${FLOORS * H}H96z`} fill={PALETTE.paperSheet} strokeWidth="3" />
          <path d={`M84 ${TOP} 261 ${TOP - 20} 438 ${TOP}`} fill={PALETTE.paperShade} strokeWidth="2.6" />
        </g>

        {Array.from({ length: FLOORS }, (_, i) => {
          const n = i + 1
          const dense = n <= DENSE
          return (
            <g key={n}>
              <rect
                x={98}
                y={y(n) + 1}
                width={326}
                height={H - 2}
                fill={dense ? PALETTE.idleDeep : n === floor ? PALETTE.orangeWash : PALETTE.paperLight}
                stroke={INK}
                strokeWidth="1.1"
                opacity={dense ? 0.9 : 1}
              />
              {n === floor ? (
                <motion.g initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                  <rect x={104} y={y(n) + 3} width={26} height={H - 6} rx="3" fill={PALETTE.orange} stroke={INK} strokeWidth="1.6" />
                  <text x={444} y={y(n) + 12} className="s1-tower-here" fill={PALETTE.orangeInk}>
                    floor {n}
                  </text>
                </motion.g>
              ) : null}
            </g>
          )
        })}

        {/* the two populations, braced */}
        <g fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round">
          <path d={`M88 ${y(FLOORS)}h-14v${(FLOORS - DENSE) * H}h14`} />
          <path d={`M88 ${y(DENSE)}h-14v${DENSE * H}h14`} />
        </g>
        <text x="66" y={y(FLOORS) + ((FLOORS - DENSE) * H) / 2} textAnchor="end" className="s1-tower-tag" fill={INK}>
          42 sparse
        </text>
        <text x="66" y={y(DENSE) + (DENSE * H) / 2 + 4} textAnchor="end" className="s1-tower-tag" fill={INK}>
          3 dense
        </text>

        {label ? (
          <text x="261" y={height - 4} textAnchor="middle" className="s1-tower-label" fill={INK}>
            {label}
          </text>
        ) : null}
      </svg>
    </div>
  )
}
