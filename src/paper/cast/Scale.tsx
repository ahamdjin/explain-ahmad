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
    { x: 33, y: 12, w: 4, h: 4 },
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
    { x: 36, y: 2, w: 3, h: 4 },
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
 * in use, so beat 13 can show the set we packed earlier failing to line up
 * with the set we now need — a misfit, drawn as a mismatch rather than as a
 * prohibition. Nothing in this video is crossed out.
 */
export function Block({
  lit,
  ghost,
  lifted = false,
  heavy = false,
  grain = 'fine',
  scatter = false,
}: {
  lit?: PatchName
  ghost?: PatchName
  /**
   * The lit patch floats clear of the block, leaving a hole.
   *
   * It has to travel far enough to break the block's own outline. At -46 it
   * still sat inside the edge and read as a nudge rather than as something
   * taken out.
   */
  lifted?: boolean
  heavy?: boolean
  /** §13: the same block, divided coarsely or finely. */
  grain?: 'fine' | 'coarse'
  /** The marks, loose. The state the number shatters into before it packs. */
  scatter?: boolean
}) {
  const step = grain === 'coarse' ? 4 : 1
  const inPatch = (name: PatchName | undefined, cx: number, cy: number) =>
    !!name && PATCHES[name].some((r) => cx >= r.x && cx < r.x + r.w && cy >= r.y && cy < r.y + r.h)

  const cells: React.ReactNode[] = []
  for (let cy = 0; cy < ROWS; cy += step) {
    for (let cx = 0; cx < COLS; cx += step) {
      const isLit = inPatch(lit, cx, cy)
      const isGhost = inPatch(ghost, cx, cy)
      cells.push(
        <motion.rect
          key={`${cx}-${cy}`}
          x={cx * CELL}
          y={cy * CELL}
          /*
           * Clamped to the sheet. `ROWS` is 22 and coarse `step` is 4, so the
           * last row starts at 20 and a full-height cell overran the block's
           * own outline by nearly two rows -- a chunk of the model hanging
           * below the sheet it is part of.
           */
          width={Math.min(CELL * step, (COLS - cx) * CELL) - 2}
          height={Math.min(CELL * step, (ROWS - cy) * CELL) - 2}
          rx={2}
          stroke={isGhost && !isLit ? PALETTE.red : 'none'}
          strokeWidth={isGhost && !isLit ? 2.4 : 0}
          strokeDasharray={isGhost && !isLit ? '4 4' : undefined}
          initial={false}
          animate={{
            /*
             * Loose, they are ink: individual numbers on paper. Packed, they
             * are the material of an object, so they take a paper tone. The
             * first version kept the paper tone while scattered and the field
             * was invisible against the page.
             */
            fill: scatter ? INK : isLit ? PALETTE.teal2 : PALETTE.idleDeep,
            opacity: scatter ? 0.7 : isLit ? 1 : lit ? 0.5 : 0.78,
            /* Loose: jittered outward off the lattice, and smaller. */
            x: scatter ? (seeded(cx * 97 + cy) - 0.5) * 260 : 0,
            y: (scatter ? (seeded(cx * 31 + cy + 500) - 0.5) * 190 : 0) + (isLit && lifted && !scatter ? -132 : 0),
            scale: scatter ? 0.28 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 70,
            damping: 19,
            /* Staggered so packing reads as a gathering rather than a snap. */
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
        {/*
          Where the lifted patch came from. Paper against the block's own fill
          is almost no contrast, so the hole is drawn rather than left.
        */}
        {lifted && lit && !scatter
          ? PATCHES[lit].map((r, i) => (
              <rect
                key={`hole-${i}`}
                x={r.x * CELL}
                y={r.y * CELL}
                width={r.w * CELL - 2}
                height={r.h * CELL - 2}
                rx="2"
                fill={PALETTE.paper}
                stroke={INK}
                strokeWidth="1.6"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            ))
          : null}
        {/* The edge only exists once the marks are one object. */}
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
        {heavy ? (
          <g stroke={PALETTE.stone} strokeLinecap="round">
            <path d={`M-4 ${ROWS * CELL + 12}h${COLS * CELL + 8}`} strokeWidth="11" opacity="0.42" />
          </g>
        ) : null}
      </svg>
    </motion.div>
  )
}
