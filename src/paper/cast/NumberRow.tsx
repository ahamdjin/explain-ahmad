import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE } from '../palette'

/**
 * What a word actually looks like inside the model: a long row of numbers.
 *
 * Values are generated from a fixed seed rather than randomly, so every render
 * of a beat is identical and screenshot comparison stays meaningful.
 */
function values(seed: number, count: number) {
  const out: string[] = []
  let state = seed
  for (let i = 0; i < count; i += 1) {
    state = (state * 1103515245 + 12345) % 2147483648
    const v = (state / 2147483648) * 2 - 1
    out.push(v.toFixed(2))
  }
  return out
}

export function NumberRow({
  seed = 7,
  shown = 12,
  total = 4096,
  extend = false,
  label,
  tone = 'ink',
}: {
  seed?: number
  /** How many cells are drawn. The rest is implied by the tail. */
  shown?: number
  total?: number
  /** Runs the row off the right of the frame, so 4096 has a physical size. */
  extend?: boolean
  label?: string
  tone?: 'ink' | 'blue' | 'orange'
}) {
  const cells = values(seed, shown)
  const W = 96
  const GAP = 6
  const width = shown * (W + GAP)
  const stroke = tone === 'blue' ? PALETTE.blueInk : tone === 'orange' ? PALETTE.orangeInk : INK

  return (
    <div className="s1-numrow" data-extend={extend ? 'true' : undefined}>
      <svg viewBox={`0 0 ${width + 320} 150`} aria-hidden="true">
        {cells.map((value, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: 0.03 * i }}
          >
            <rect
              x={i * (W + GAP)}
              y={30}
              width={W}
              height={62}
              rx={4}
              fill={PALETTE.paperLight}
              stroke={stroke}
              strokeWidth="2.6"
            />
            <text x={i * (W + GAP) + W / 2} y={70} textAnchor="middle" className="s1-numrow-v" fill={stroke}>
              {value}
            </text>
          </motion.g>
        ))}

        {/* the tail: the row does not stop, it just stops being drawn */}
        <g opacity="0.5">
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={width + i * (W + GAP) * 0.62}
              y={30}
              width={W * 0.6}
              height={62}
              rx={4}
              fill="none"
              stroke={stroke}
              strokeWidth="2.2"
              strokeDasharray="6 6"
              opacity={0.8 - i * 0.25}
            />
          ))}
        </g>

        {label ? (
          <text x={width / 2} y={132} textAnchor="middle" className="s1-numrow-label" fill={INK}>
            {label}
          </text>
        ) : null}
      </svg>
    </div>
  )
}
