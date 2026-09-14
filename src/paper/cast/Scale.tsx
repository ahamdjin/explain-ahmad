import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE, ROLE, type Role } from '../palette'
import { seeded } from '../props/frame'

/**
 * The pieces that make a number into a quantity you can see.
 *
 * Section 01 has to get a viewer from "three hundred and twenty billion" —
 * which is not a quantity, it is a noise — to "a block, and this patch of it
 * is what gets used".
 *
 * That is **two** objects, not three. The scattered field and the solid block
 * were first written as separate components, which would have made beat 3 to
 * beat 4 an object swap — and a swap is exactly what the persistence rule
 * exists to prevent. They are one `Block` with a `scatter` state: the same
 * marks, loose, then gathered. That is what makes the block feel as though it
 * is *made of* them.
 */

/** A number large enough to be the only thing in the frame. */
export function BigNumber({
  value,
  caption,
  tone = 'ink',
}: {
  value: string
  caption?: string
  tone?: Role
}) {
  return (
    <div className="s1-bignum" data-tone={tone}>
      <motion.div
        className="s1-bignum-value"
        style={{ color: ROLE[tone] }}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 16 }}
      >
        {value}
      </motion.div>
      {caption ? <div className="s1-bignum-cap">{caption}</div> : null}
    </div>
  )
}

/**
 * A named region of the block. Patches are declared, never random, because
 * the whole argument of Section 01 is that two of them are *visibly different
 * regions* — and that only works if they are authored.
 */
export type PatchName = 'a' | 'b' | 'c'

const PATCHES: Record<PatchName, { x: number; y: number; w: number; h: number }[]> = {
  /* Each patch is ~5% of the block area, scattered rather than contiguous,
   * because routing picks by score and never by locality. */
  a: [
    { x: 3, y: 2, w: 3, h: 4 },
    { x: 14, y: 7, w: 4, h: 3 },
    { x: 26, y: 3, w: 3, h: 3 },
    { x: 31, y: 12, w: 4, h: 4 },
    { x: 8, y: 17, w: 3, h: 3 },
  ],
  b: [
    { x: 20, y: 1, w: 4, h: 3 },
    { x: 6, y: 9, w: 3, h: 4 },
    { x: 31, y: 6, w: 3, h: 3 },
    { x: 17, y: 15, w: 4, h: 4 },
    { x: 27, y: 19, w: 3, h: 3 },
  ],
  c: [
    { x: 10, y: 4, w: 3, h: 3 },
    { x: 24, y: 10, w: 4, h: 4 },
    { x: 32, y: 2, w: 3, h: 4 },
    { x: 2, y: 13, w: 4, h: 3 },
    { x: 21, y: 21, w: 3, h: 3 },
  ],
}

const CELL = 22
const COLS = 36
const ROWS = 22

/**
 * The whole model as one object, with regions that can light.
 *
 * `lit` is which patch is in use now. `ghost` outlines a patch that is *not*
 * in use. The semantic tones are explicit because the same geometry can mean
 * two different things: the established video uses teal/red for a tracked
 * region and a mismatch, while the rewritten opening uses orange/yellow for
 * active/question as required by the GLM art direction.
 */
export function Block({
  lit,
  ghost,
  lifted = false,
  heavy = false,
  grain = 'fine',
  scatter = false,
  litTone = 'word',
  ghostTone = 'failure',
}: {
  lit?: PatchName
  ghost?: PatchName
  /** The lit patch floats clear of the block, leaving a hole. */
  lifted?: boolean
  heavy?: boolean
  /** §13: the same block, divided coarsely or finely. */
  grain?: 'fine' | 'coarse'
  /** The marks, loose. The state the number shatters into before it packs. */
  scatter?: boolean
  /** Orange for an active model region; teal for the legacy tracked-piece use. */
  litTone?: 'active' | 'word'
  /** Yellow means a possibility/question; red remains reserved for failure. */
  ghostTone?: 'question' | 'failure'
}) {
  const step = grain === 'coarse' ? 4 : 1
  const inPatch = (name: PatchName | undefined, cx: number, cy: number) =>
    !!name && PATCHES[name].some((r) => cx >= r.x && cx < r.x + r.w && cy >= r.y && cy < r.y + r.h)
  const litFill = litTone === 'active' ? PALETTE.orange : PALETTE.teal2
  const ghostStroke = ghostTone === 'question' ? PALETTE.yellow : PALETTE.red

  const cells: React.ReactNode[] = []
  for (let cy = 0; cy < ROWS; cy += step) {
    for (let cx = 0; cx < COLS; cx += step) {
      const isLit = inPatch(lit, cx, cy)
      cells.push(
        <motion.rect
          key={`${cx}-${cy}`}
          x={cx * CELL}
          y={cy * CELL}
          width={Math.min(CELL * step, (COLS - cx) * CELL) - 2}
          height={Math.min(CELL * step, (ROWS - cy) * CELL) - 2}
          rx={2}
          initial={false}
          animate={{
            fill: scatter ? INK : isLit ? litFill : PALETTE.idleDeep,
            /*
             * The idle field does **not** dim when a patch lights.
             *
             * It used to drop to 0.5, which made "320 billion parameters" read
             * as an almost-empty box with a few orange squares in it -- and
             * the one thing the opening frame has to carry is that the lit
             * part is small *against something vast*. You cannot see a small
             * share of nothing. The lit patch separates by hue, which is the
             * only channel that should be carrying it.
             */
            opacity: scatter ? 0.7 : isLit ? 1 : 0.92,
            /*
             * The lift is a **short diagonal**, not a long rise.
             *
             * It used to translate the lit cells up by 132 units. A patch is
             * scattered down the whole height of the block, so that lifted the
             * top regions clear out of the frame and over the section title
             * while the lower ones were still sitting inside the block on top
             * of other cells -- one action reading as two different things.
             * A small offset away from the sheet, with the dashed holes left
             * behind underneath, says "picked up" without any region having to
             * leave the object it was picked up from.
             */
            x: scatter ? (seeded(cx * 97 + cy) - 0.5) * 260 : isLit && lifted ? 30 : 0,
            y: (scatter ? (seeded(cx * 31 + cy + 500) - 0.5) * 190 : 0) + (isLit && lifted && !scatter ? -30 : 0),
            scale: scatter ? 0.28 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 70,
            damping: 19,
            delay: scatter ? 0 : seeded(cx * 13 + cy) * 0.45,
          }}
        />,
      )
    }
  }

  return (
    <motion.div
      className="s1-block"
      animate={{ scaleY: heavy ? 0.985 : 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      style={{ transformOrigin: 'bottom center' }}
    >
      <svg viewBox={`-8 -168 ${COLS * CELL + 16} ${ROWS * CELL + 184}`} aria-hidden="true">
        {lifted && lit && !scatter
          ? PATCHES[lit].map((r, i) => (
              <rect
                key={`hole-${i}`}
                x={r.x * CELL}
                y={r.y * CELL}
                width={r.w * CELL - 2}
                height={r.h * CELL - 2}
                rx="2"
                fill={PALETTE.paperShade}
                stroke={INK}
                strokeWidth="2"
                strokeDasharray="5 5"
                opacity="0.85"
              />
            ))
          : null}
        <motion.rect
          x="-4"
          y="-4"
          width={COLS * CELL + 8}
          height={ROWS * CELL + 8}
          rx="6"
          fill="none"
          stroke={INK}
          strokeWidth="3.4"
          initial={false}
          animate={{ opacity: scatter ? 0 : 1 }}
          transition={{ duration: 0.5, delay: scatter ? 0 : 0.45 }}
        />
        {cells}
        {/*
          * The hypothesis, drawn as **regions** rather than as dashed cells.
          *
          * Per-cell dashes turn a possible 18B into visual static: at playback
          * size it reads as damage to the block, not as a proposal about it.
          * One outline per region, washed, reads as "this could be the part
          * instead" -- which is the only thing beats 10-11 are asking.
          */}
        {ghost && !scatter
          ? PATCHES[ghost].map((r, i) => (
              <motion.rect
                key={`ghost-${i}`}
                x={r.x * CELL - 3}
                y={r.y * CELL - 3}
                width={r.w * CELL + 4}
                height={r.h * CELL + 4}
                rx="4"
                fill={ghostTone === 'question' ? PALETTE.yellowWash : PALETTE.paperShade}
                stroke={ghostStroke}
                strokeWidth="3"
                strokeDasharray="9 7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.92 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              />
            ))
          : null}
        {heavy ? (
          <g stroke={PALETTE.stone} strokeLinecap="round">
            <path d={`M-4 ${ROWS * CELL + 12}h${COLS * CELL + 8}`} strokeWidth="11" opacity="0.42" />
          </g>
        ) : null}
      </svg>
    </motion.div>
  )
}
