import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE } from '../palette'

/**
 * A sentence of word cards, with optional attention weights drawn from the
 * focus word to its neighbours.
 *
 * The lines live in this component rather than a separate one so they cannot
 * drift out of alignment with the cards they connect -- two components sharing
 * a coordinate system by hand is two components that will disagree.
 */
export function Sentence({
  words,
  focus,
  weights,
  dim = false,
  caption,
}: {
  words: string[]
  /** Index of the word we are following. */
  focus: number
  /** One weight per word, 0..1. Thickness is the weight. */
  weights?: number[]
  dim?: boolean
  caption?: string
}) {
  /* An empty sentence still mounts -- slots are persistent -- and would
   * compute a negative viewBox width, which the SVG renderer rejects. */
  if (!words.length) return null

  const W = 190
  const GAP = 14
  const CARD_Y = 150
  const H = 86
  const width = words.length * (W + GAP) - GAP
  const centre = (i: number) => i * (W + GAP) + W / 2

  return (
    <div className="s1-sentence" data-dim={dim ? 'true' : undefined}>
      <svg viewBox={`0 0 ${width} 300`} aria-hidden="true">
        {weights
          ? words.map((_, i) => {
              if (i === focus) return null
              const weight = weights[i] ?? 0
              if (weight < 0.04) return null
              const from = centre(focus)
              const to = centre(i)
              const lift = 74 + Math.abs(i - focus) * 16
              return (
                <motion.path
                  key={`w-${i}`}
                  d={`M${from} ${CARD_Y}Q${(from + to) / 2} ${CARD_Y - lift} ${to} ${CARD_Y}`}
                  fill="none"
                  stroke={PALETTE.relateInk}
                  strokeWidth={2 + weight * 14}
                  strokeLinecap="round"
                  opacity={0.28 + weight * 0.6}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.06 * i }}
                />
              )
            })
          : null}

        {words.map((word, i) => (
          <g key={i}>
            <rect
              x={i * (W + GAP)}
              y={CARD_Y}
              width={W}
              height={H}
              rx={5}
              fill={PALETTE.paperLight}
              stroke={i === focus ? PALETTE.relateInk : INK}
              strokeWidth={i === focus ? 4.4 : 2.6}
            />
            <text
              x={centre(i)}
              y={CARD_Y + 57}
              textAnchor="middle"
              className="s1-sentence-w"
              fill={i === focus ? PALETTE.relateInk : INK}
            >
              {word}
            </text>
          </g>
        ))}

        {caption ? (
          <text x={width / 2} y={CARD_Y + 118} textAnchor="middle" className="s1-sentence-cap" fill={INK}>
            {caption}
          </text>
        ) : null}
      </svg>
    </div>
  )
}
