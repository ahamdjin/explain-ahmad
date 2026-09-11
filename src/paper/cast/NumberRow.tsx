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
  covered = false,
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
  /**
   * Light the row as **one band** when it is close to the basis, rather than
   * lighting the cells that individually agree.
   *
   * It used to light per cell, under the line *"lots of these numbers nearly
   * match"*. Two nearby rows do mostly have nearby values, so that was not
   * false -- but it teaches similarity *as* coordinate agreement, which does
   * not generalise, and §3 beat 11 then has to undo it to say the meaning is
   * in where the whole row sits. A band makes the claim the section actually
   * wants: these two rows are near each other, taken whole.
   */
  showMatches?: boolean
  dim?: boolean
  /**
   * Hide the values behind a cover, keeping the row's shape and label.
   *
   * §4 beat 11 asks *"how different do you reckon they end up?"* and the two
   * rows have to be **on screen and unreadable** while it asks -- a question
   * whose answer is already visible is not a question, and one asked over an
   * empty frame gives the viewer nowhere to put a guess. Beat 12 uncovers.
   */
  covered?: boolean
}) {
  const own = values(seed, shown)
  const base = basis === undefined ? null : values(basis, shown)
  const cells = base ? own.map((v, i) => base[i] * (1 - drift) + v * drift) : own
  /*
   * Tight, because the digits are legible. At 0.18 the frame highlighted
   * `0.00` as "nearly matching" `-0.17`, and a viewer reading two decimal
   * places does not believe that -- which costs the section its own example.
   */
  /*
   * How close the rows are *as rows* -- mean absolute difference across the
   * cells on screen, which is the honest one-number summary of "near each
   * other" and is what the band's strength is driven from. No per-cell verdict
   * is drawn any more, so nothing on screen invites the viewer to read
   * similarity as a count of matching digits.
   */
  const closeness = base
    ? 1 - Math.min(1, cells.reduce((sum, v, i) => sum + Math.abs(v - base[i]), 0) / cells.length / 0.6)
    : 0

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
        {/*
          The band: one shape behind the whole row, not a verdict per cell.
          `dog`/`cat` light strongly, `Tuesday` barely at all -- and the read
          is "this row is near that one", which is what beats 10-11 go on to
          turn into distance.
        */}
        {showMatches && closeness > 0.02 ? (
          <motion.rect
            x={-10}
            y={22}
            width={width + 12}
            height={78}
            rx={8}
            fill={PALETTE.tealWash}
            stroke={PALETTE.tealInk}
            strokeWidth="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 + closeness * 0.55 }}
            transition={{ duration: 0.5 }}
          />
        ) : null}

        {cells.map((value, i) => (
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
                animate={{ fill: PALETTE.paperLight, stroke, strokeWidth: 2.6 }}
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
        ))}

        {/*
          The cover. Drawn over the cells rather than replacing them, so
          uncovering in the next beat is the same object revealed and not a new
          row arriving.
        */}
        {covered ? (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <rect x={-10} y={22} width={width + 12} height={78} rx={8} fill={PALETTE.paperShade} stroke={INK} strokeWidth="2.6" />
            {Array.from({ length: Math.ceil((width + 22) / 22) }, (_, i) => (
              <line
                key={i}
                x1={-10 + i * 22}
                y1={100}
                x2={-10 + i * 22 + 26}
                y2={22}
                stroke={INK}
                strokeWidth="1"
                opacity="0.28"
              />
            ))}
          </motion.g>
        ) : null}

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
