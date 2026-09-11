import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE } from '../palette'

/**
 * Name-plates that try to land on something and slide off.
 *
 * §5 beat 10. The section has just shown the router choosing eight experts,
 * and the intuition every viewer arrives with is that it picked the eight that
 * *know about dogs*. Saying "there is no dog expert" does not dislodge that;
 * the belief is visual, so the correction has to be too.
 *
 * So three plates -- `dog`, `French`, `maths` -- fall towards the chosen eight,
 * fail to stick, and slide away. `GROUND_TRUTH.md` is explicit that an expert
 * is a learned feed-forward block and that identity is a number: **never label
 * one "the maths expert"**. This component is the only place in the video that
 * puts such a label on screen, and it exists to take it off again.
 *
 * That rule is also why `STRATEGY_LEDGER.md` S-13 ("give mechanisms faces") is
 * barred from the experts. The router gets a plaque; the experts never do.
 */
export function Plates({
  labels = ['dog', 'French', 'maths'],
  /** Held in place, before they fail. The still half of the beat. */
  landing = false,
  /** They have failed and are sliding away. */
  falling = false,
}: {
  labels?: readonly string[]
  landing?: boolean
  falling?: boolean
}) {
  const W = 150
  const H = 58
  return (
    <svg viewBox="0 0 560 300" aria-hidden="true" style={{ width: '100%', overflow: 'visible' }}>
      {labels.map((label, i) => {
        const x = 40 + i * 176
        return (
          <motion.g
            key={label}
            initial={{ y: -140, opacity: 0, rotate: 0 }}
            animate={
              falling
                ? /* Off and down, each at its own angle -- three plates leaving
                     in formation would read as a decision rather than a
                     failure. */
                  { y: 210 + i * 26, opacity: 0, rotate: i === 1 ? 16 : -14 }
                : landing
                  ? { y: 90, opacity: 1, rotate: i === 1 ? 3 : -2 }
                  : { y: -140, opacity: 0, rotate: 0 }
            }
            transition={{
              type: falling ? 'tween' : 'spring',
              duration: falling ? 0.8 : undefined,
              stiffness: 120,
              damping: 14,
              delay: i * 0.12,
            }}
          >
            <rect
              x={x}
              y={0}
              width={W}
              height={H}
              rx={5}
              fill={PALETTE.paperSheet}
              stroke={INK}
              strokeWidth="2.6"
            />
            <text
              x={x + W / 2}
              y={H / 2 + 7}
              textAnchor="middle"
              className="s1-plate-label"
              fill={PALETTE.stone}
            >
              {label}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}

/**
 * Three named differences, side by side, where two of them can be dimmed.
 *
 * §13 beats 9-10, and it exists to defuse the most dangerous claim in the
 * video. `gpt-oss-120b` ships at ~58 GiB and this model at ~306 GiB, and three
 * things differ: **total parameters** (116.8B vs 321B), **shipped precision**
 * (MXFP4 vs FP8) and **expert granularity** (128 vs 288 per sparse layer). The
 * first two account for the footprint almost entirely. Granularity accounts
 * for essentially none of it.
 *
 * An earlier cut said *"the difference is that this one is chopped finer"* over
 * a frame that divided the blocks, so the picture made smaller experts look
 * like the cause of more GPUs -- a claim a knowledgeable viewer disproves with
 * two numbers, on the thesis beat. Naming all three and then dimming the two
 * that are merely size is the correction, and it has to be *visual*: the VO
 * alone leaves the old implication on screen.
 *
 * `research/glm/OFFLOADING_AND_LOCALITY.md` §5.
 */
export function Differences({
  items,
  /** Indices still lit. Beat 9 lights all three; beat 10 lights only the last. */
  lit,
}: {
  items: readonly { label: string; detail: string }[]
  lit: readonly number[]
}) {
  const W = 300
  const H = 108
  const GAP = 26
  return (
    <svg
      viewBox={`0 0 ${items.length * (W + GAP)} ${H + 40}`}
      aria-hidden="true"
      style={{ width: items.length * (W + GAP), overflow: 'visible' }}
    >
      {items.map((item, i) => {
        const on = lit.includes(i)
        return (
          <motion.g
            key={item.label}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: on ? 1 : 0.3 }}
            transition={{ type: 'spring', stiffness: 140, damping: 16, delay: i * 0.14 }}
          >
            <rect
              x={i * (W + GAP)}
              y={0}
              width={W}
              height={H}
              rx={6}
              fill={PALETTE.paperSheet}
              stroke={INK}
              strokeWidth={on ? 3.2 : 2}
            />
            <text
              x={i * (W + GAP) + W / 2}
              y={44}
              textAnchor="middle"
              className="s1-diff-label"
              fill={INK}
            >
              {item.label}
            </text>
            <text
              x={i * (W + GAP) + W / 2}
              y={82}
              textAnchor="middle"
              className="s1-diff-detail"
              fill={on ? PALETTE.blueInk : PALETTE.stone}
            >
              {item.detail}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}
