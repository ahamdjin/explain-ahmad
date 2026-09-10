import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE } from '../palette'

/**
 * What a word actually looks like inside the model: a long row of numbers.
 *
 * Values come off a fixed seed rather than a random source, so every render of
 * a beat is identical and screenshot comparison stays meaningful.
 */
function values(seed: number, count: number) {
  const out: number[] = []
  let state = seed
  for (let i = 0; i < count; i += 1) {
    state = (state * 1103515245 + 12345) % 2147483648
    out.push((state / 2147483648) * 2 - 1)
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
  basis,
  drift = 1,
  showMatches = false,
  dim = false,
}: {
  seed?: number
  /** How many cells are drawn. The rest is implied by the tail. */
  shown?: number
  total?: number
  /** Runs the row off the right of the frame, so 4096 has a physical size. */
  extend?: boolean
  label?: string
  tone?: 'ink' | 'measure' | 'relate' | 'word'
  /**
   * §3 beats 8-9. A row this one is being compared against.
   *
   * `drift` is how far from it this row sits: 0 is identical, 1 is unrelated.
   * That is the honest way to draw dog / cat / Tuesday, because **the video may
   * not put a similarity number on screen** — nothing has been measured from
   * this model's own table. The frame shows the *pattern* of agreement and
   * nothing more. See video-script/03 truth notes.
   */
  basis?: number
  drift?: number
  /** Light the cells that nearly match the basis. Many, or almost none. */
  showMatches?: boolean
  dim?: boolean
}) {
  const own = values(seed, shown)
  const base = basis === undefined ? null : values(basis, shown)
  const cells = base ? own.map((v, i) => base[i] * (1 - drift) + v * drift) : own
  /*
   * Tight, because the digits are legible. At 0.18 the frame highlighted
   * `0.00` as "nearly matching" `-0.17`, and a viewer reading two decimal
   * places does not believe that -- which costs the section its own example.
   */
  const near = base ? cells.map((v, i) => Math.abs(v - base[i]) < 0.1) : cells.map(() => false)

  const W = 96
  const GAP = 6
  const width = shown * (W + GAP)
  const stroke =
    tone === 'measure'
      ? PALETTE.blueInk
      : tone === 'relate'
        ? PALETTE.relateInk
        : tone === 'word'
          ? PALETTE.tealInk
          : INK
  void total

  return (
    <div className="s1-numrow" data-extend={extend ? 'true' : undefined} data-dim={dim ? 'true' : undefined}>
      <svg viewBox={`0 0 ${width + 320} 150`} aria-hidden="true">
        {cells.map((value, i) => {
          const lit = showMatches && near[i]
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: 0.03 * i }}
            >
              <motion.rect
                x={i * (W + GAP)}
                y={30}
                width={W}
                height={62}
                rx={4}
                initial={false}
                animate={{
                  fill: lit ? PALETTE.tealWash : PALETTE.paperLight,
                  stroke: lit ? PALETTE.tealInk : stroke,
                  strokeWidth: lit ? 4 : 2.6,
                }}
                transition={{ duration: 0.4, delay: 0.02 * i }}
              />
              <text
                x={i * (W + GAP) + W / 2}
                y={70}
                textAnchor="middle"
                className="s1-numrow-v"
                fill={stroke}
              >
                {value.toFixed(2)}
              </text>
            </motion.g>
          )
        })}

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
          <text x={width / 2} y={132} textAnchor="middle" className="s1-numrow-label" fill={stroke}>
            {label}
          </text>
        ) : null}
      </svg>
    </div>
  )
}
