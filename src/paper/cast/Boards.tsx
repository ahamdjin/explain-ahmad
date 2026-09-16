import { motion } from 'motion/react'
import { INK, expertColor } from '../ink'
import { PALETTE } from '../palette'

/**
 * Beats 1-5.
 *
 * Deliberately does NOT list experts or layer counts. Those are beats 12 and
 * Section 02 respectively, and putting them on the opening sheet spends the
 * reveal before the viewer has a use for it.
 */
export function ModelSheet({ lit }: { lit: 'none' | 'total' | 'both' }) {
  const rows: { k: string; v: string; key?: 'total' | 'active' }[] = [
    { k: 'Architecture', v: 'Mixture of Experts' },
    { k: 'Total parameters', v: '320 Billion', key: 'total' },
    { k: 'Active parameters', v: '18 Billion', key: 'active' },
    { k: 'Purpose', v: 'fast, capable, efficient' },
  ]

  const isLit = (key?: 'total' | 'active') =>
    key === 'total' ? lit === 'total' || lit === 'both' : key === 'active' ? lit === 'both' : false

  return (
    <div className="s1-sheet">
      {/*
        Sized to the rows it holds -- a taller sheet left an empty lower half
        that read as a missing section rather than as breathing room.

        The tape, the tilt and the shadow are not decoration: a perfectly
        upright rectangle floating on an empty field reads as a slide, and the
        whole point of this world is that things are physically somewhere.
      */}
      <svg viewBox="0 0 700 330" aria-hidden="true">
        <path d="M14 14h672v302H14z" fill={PALETTE.paperLight} stroke={INK} strokeWidth="3.4" />
        <path d="M52 92h596" stroke={INK} strokeWidth="2.2" opacity="0.55" />
        <g transform="rotate(-7 350 14)">
          <path d="M296 -2h108v30H296z" fill="#EFE3C8" stroke={INK} strokeWidth="2.2" opacity="0.92" />
        </g>
      </svg>

      <div className="s1-sheet-body">
        <h2>GLM-5.3-Flash</h2>
        <dl>
          {rows.map((row) => (
            <div className="s1-sheet-row" key={row.k} data-key={row.key} data-lit={isLit(row.key) ? 'true' : undefined}>
              <dt>{row.k}</dt>
              <dd>
                {isLit(row.key) ? (
                  <motion.span
                    className="s1-sheet-pill"
                    data-tone={row.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 190, damping: 16 }}
                  >
                    {row.v}
                  </motion.span>
                ) : (
                  row.v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

/**
 * Beats 5-9. The whole premise of the section in one image.
 *
 * `pair` holds the two numbers alone after the sheet folds away, so the viewer
 * is looking at a relationship rather than a spec list. `bar` then makes that
 * relationship a measurement: one strip, a 5.6% sliver lit.
 *
 * This is the first of three frames that must read as a still with motion off.
 */
export function ShareBar({
  mode,
  lit,
  caption,
  dark,
}: {
  mode: 'pair' | 'bar'
  lit: number
  caption: string
  dark: boolean
}) {
  const W = 1160
  const litW = Math.max(18, W * lit)

  return (
    <div className="s1-bar" data-mode={mode}>
      <svg viewBox="0 0 1200 300" aria-hidden="true">
        {/* the pair */}
        <motion.g animate={{ opacity: mode === 'pair' ? 1 : 0 }} transition={{ duration: 0.34 }}>
          <text x="330" y="150" textAnchor="middle" className="s1-bar-big" fill={PALETTE.orangeInk}>
            320 billion
          </text>
          <text x="330" y="198" textAnchor="middle" className="s1-bar-sub" fill={INK}>
            parameters it has
          </text>
          <text x="870" y="150" textAnchor="middle" className="s1-bar-big" fill={PALETTE.blueInk}>
            18 billion
          </text>
          <text x="870" y="198" textAnchor="middle" className="s1-bar-sub" fill={INK}>
            active for one word
          </text>
        </motion.g>

        {/* the measurement */}
        <motion.g animate={{ opacity: mode === 'bar' ? 1 : 0 }} transition={{ duration: 0.34, delay: mode === 'bar' ? 0.18 : 0 }}>
          <rect
            x="20"
            y="118"
            width={W}
            height="94"
            rx="4"
            fill={dark ? '#D9D0BE' : PALETTE.paperShade}
            stroke={INK}
            strokeWidth="3"
          />
          {/* Width is a real attribute, not just an animation target: Motion
              renders no attribute at all on the first paint, and an SVG rect
              with width="undefined" is dropped by the renderer. */}
          <motion.rect
            x="20"
            y="118"
            width={litW}
            height="94"
            rx="4"
            fill={PALETTE.blue}
            stroke={INK}
            strokeWidth="3"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: '20px 118px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.24 }}
          />
          {/* total, measured above */}
          <g stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round">
            <path d="M20 92v14h1160V92" />
            <path d="M600 106v-14" />
          </g>
          <text x="600" y="76" textAnchor="middle" className="s1-bar-label" fill={INK}>
            320 billion parameters
          </text>

          {/* the sliver, measured below */}
          <g stroke={PALETTE.blueInk} strokeWidth="2.6" fill="none" strokeLinecap="round">
            <path d={`M20 238v-12h${litW}v12`} />
          </g>
          <text x={20 + litW + 22} y="252" className="s1-bar-label" fill={PALETTE.blueInk}>
            18 billion active
          </text>
          {caption ? (
            <text x={20 + litW + 22} y="284" className="s1-bar-cap" fill={INK}>
              {caption}
            </text>
          ) : null}
        </motion.g>
      </svg>
    </div>
  )
}

/**
 * Beat 26. The plan, drawn as a plan.
 *
 * It has to look *correct*. The whole section is built so the viewer finishes
 * thinking "that should work" -- so nothing here is crossed out, greyed as
 * broken, or marked with a warning. The only thing that follows is a question.
 */
export function Plan() {
  const eight = [41, 76, 103, 147, 168, 211, 245, 278]

  return (
    <div className="s1-plan">
      <svg viewBox="0 0 1480 380" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${28 + i * 496} 20h436a6 6 0 0 1 6 6v320a6 6 0 0 1-6 6H${28 + i * 496 + 6}a6 6 0 0 1-6-6V26a6 6 0 0 1 6-6Z`}
            fill={PALETTE.paperLight}
            stroke={INK}
            strokeWidth="3"
          />
        ))}

        {/* between-panel arrows */}
        {[0, 1].map((i) => (
          <g key={i} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round">
            <path d={`M${470 + i * 496} 186h44`} />
            <path d={`M${506 + i * 496} 178l10 8-10 8`} />
          </g>
        ))}

        {/* 1 -- the router picks */}
        <g>
          <text x="246" y="66" textAnchor="middle" className="s1-plan-step" fill={INK}>
            1 &middot; the router picks eight
          </text>
          <g fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round">
            <circle cx="120" cy="176" r="22" fill={PALETTE.paperWhite} />
            <path d="M120 198v28" />
            <path d="M98 232h44v40H98z" fill={PALETTE.paperShade} />
          </g>
          <g fill={INK}>
            <circle cx="113" cy="174" r="2.8" />
            <circle cx="128" cy="174" r="2.8" />
          </g>
          {eight.slice(0, 4).map((n, k) => (
            <g key={n} transform={`translate(${210 + k * 44} 150)`}>
              <rect width="26" height="25" rx="8" fill={expertColor(n)} stroke={INK} strokeWidth="2" />
              <circle cx="8.5" cy="10" r="2.1" fill={INK} />
              <circle cx="18" cy="10" r="2.1" fill={INK} />
            </g>
          ))}
          {eight.slice(4).map((n, k) => (
            <g key={n} transform={`translate(${210 + k * 44} 202)`}>
              <rect width="26" height="25" rx="8" fill={expertColor(n)} stroke={INK} strokeWidth="2" />
              <circle cx="8.5" cy="10" r="2.1" fill={INK} />
              <circle cx="18" cy="10" r="2.1" fill={INK} />
            </g>
          ))}
        </g>

        {/* 2 -- only those eight come in */}
        <g>
          <text x="742" y="66" textAnchor="middle" className="s1-plan-step" fill={INK}>
            2 &middot; only those eight come in
          </text>
          <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinejoin="round">
            <path d="M584 120h316v212H584z" fill={PALETTE.paperSheet} />
            <path d="M572 122 742 96l170 26" fill={PALETTE.paperShade} />
          </g>
          {eight.map((n, k) => (
            <g key={n} transform={`translate(${612 + (k % 4) * 68} ${168 + Math.floor(k / 4) * 68})`}>
              <rect x="-4" y="-4" width="34" height="33" rx="10" fill={PALETTE.paperWhite} stroke={INK} strokeWidth="1.6" />
              <rect width="26" height="25" rx="8" fill={expertColor(n)} stroke={INK} strokeWidth="2" />
              <circle cx="8.5" cy="10" r="2.1" fill={INK} />
              <circle cx="18" cy="10" r="2.1" fill={INK} />
            </g>
          ))}
        </g>

        {/* 3 -- everyone else stays asleep */}
        <g>
          <text x="1238" y="66" textAnchor="middle" className="s1-plan-step" fill={INK}>
            3 &middot; everyone else stays asleep
          </text>
          {Array.from({ length: 12 }, (_, k) => (
            <g key={k} transform={`translate(${1090 + (k % 4) * 76} ${140 + Math.floor(k / 4) * 66})`}>
              <path d="M-6 24h44v10H-6z" fill={PALETTE.paperShade} stroke={INK} strokeWidth="2" />
              <rect width="26" height="22" rx="7" fill={PALETTE.idle} stroke={INK} strokeWidth="2" />
              <path d="M4.5 11h6" stroke={INK} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
              <path d="M16 11h6" stroke={INK} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
            </g>
          ))}
          <text x="1400" y="130" className="s1-plan-z" fill={INK} opacity="0.55">
            z
          </text>
          <text x="1070" y="206" className="s1-plan-z" fill={INK} opacity="0.5">
            z
          </text>
        </g>
      </svg>
    </div>
  )
}

/**
 * §13 beats 7-11. The second model, as evidence.
 *
 * Two of these side by side rather than one component with a `compare` state:
 * they are two objects on the stage, they arrive at different beats, and the
 * whole read of the frame is *two of the same kind of thing, different*. A
 * single component holding both would have to be told which half to animate,
 * which is a second, worse copy of the patch system.
 *
 * `chips` draws a countable stack, never a rack. A rack is an unquantified
 * "lots"; four is the promise the video opened on.
 *
 * `grain` is the argument: the same total, divided coarsely or finely. Beats
 * 9-10 are the carrying frames of the section and they are this prop changing.
 */
export function ModelCard({
  name,
  total,
  active,
  experts,
  chips = 0,
  grain,
  /** Light the active share inside the block. Beat 8: both, and they match. */
  litShare = false,
  note,
}: {
  name: string
  total: string
  active: string
  experts: string
  chips?: number
  grain?: 'coarse' | 'fine'
  litShare?: boolean
  note?: string
}) {
  /* Coarse: 8 x 5. Fine: 20 x 12. Same area, so the frame compares grain and
   * not size -- and the two models really do hold comparable amounts. */
  const cols = grain === 'fine' ? 20 : 8
  const rows = grain === 'fine' ? 12 : 5
  const CW = 240 / cols
  const CH = 132 / rows
  /* ~5% of the block, scattered. Both models, the same share -- that is beat 8,
   * and it only reads if neither one is a tidy contiguous corner. */
  const litSet = new Set(
    Array.from({ length: Math.max(1, Math.round(cols * rows * 0.055)) }, (_, i) =>
      Math.floor(((i + 1) * 9973) % (cols * rows)),
    ),
  )

  return (
    <div className="s1-mcard">
      {/* 470 tall, not 400: eight chips need two rows and the note needs to sit
          under them. In one row they ran off the card, under the narrator and
          off the right edge of frame -- on the beat whose whole line is
          "needs eight", with only seven countable. */}
      <svg viewBox="0 0 300 470" aria-hidden="true">
        <path d="M8 8h284v250H8z" fill={PALETTE.paperLight} stroke={INK} strokeWidth="3.2" />
        <text x="150" y="40" textAnchor="middle" className="s1-mcard-name" fill={INK}>
          {name}
        </text>
        <path d="M28 54h244" stroke={INK} strokeWidth="2" opacity="0.5" />

        {/* the model as a divided block */}
        {grain ? (
          <g>
            {Array.from({ length: cols * rows }, (_, i) => {
              const cx = i % cols
              const cy = Math.floor(i / cols)
              const lit = litShare && litSet.has(i)
              return (
                <motion.rect
                  key={i}
                  x={30 + cx * CW}
                  y={68 + cy * CH}
                  width={CW - 1.6}
                  height={CH - 1.6}
                  rx={grain === 'fine' ? 0.8 : 2}
                  initial={false}
                  animate={{ fill: lit ? PALETTE.teal2 : PALETTE.idleDeep }}
                  transition={{ duration: 0.4, delay: (i % cols) * 0.006 }}
                />
              )
            })}
            <rect x="29" y="67" width="242" height="134" rx="3" fill="none" stroke={INK} strokeWidth="2.4" />
          </g>
        ) : null}

        <g className="s1-mcard-figs">
          <text x="30" y="228" className="s1-mcard-k" fill={INK}>
            {total} total · {active} active
          </text>
          <text x="30" y="250" className="s1-mcard-k" fill={PALETTE.graphite}>
            {experts} experts per sparse layer
          </text>
        </g>

        {/*
          A countable stack, never a rack -- and countable means **it has to
          fit**. Four to a row, wrapping: one chip sits alone, eight read as
          4 + 4, which is quicker to count than a row of eight anyway.
        */}
        <g>
          {Array.from({ length: chips }, (_, i) => {
            const x = 19 + (i % 4) * 68
            const y = 286 + Math.floor(i / 4) * 74
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 140, damping: 16, delay: i * 0.1 }}
              >
                <rect
                  x={x}
                  y={y}
                  width="58"
                  height="58"
                  rx="6"
                  fill={PALETTE.paperShade}
                  stroke={INK}
                  strokeWidth="2.8"
                />
                <rect x={x + 12} y={y + 12} width="34" height="34" rx="3" fill={PALETTE.idleDim} stroke={INK} strokeWidth="2" />
                {/* legs, so it reads as a chip and not as a tile */}
                <g stroke={INK} strokeWidth="2" strokeLinecap="round">
                  <path d={`M${x + 10} ${y + 58}v8M${x + 24} ${y + 58}v8M${x + 38} ${y + 58}v8M${x + 52} ${y + 58}v8`} />
                </g>
              </motion.g>
            )
          })}
        </g>

        {note ? (
          <text x="150" y={chips > 4 ? 452 : 382} textAnchor="middle" className="s1-mcard-note" fill={INK}>
            {note}
          </text>
        ) : null}
      </svg>
    </div>
  )
}
