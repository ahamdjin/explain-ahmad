import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE, expertColor } from '../palette'
import { seeded } from '../props/frame'

/**
 * §6. What the eight actually do: one row in, eight different rows out, blended
 * back into one.
 *
 * The whole section turns on two frames. **Beat 3** — eight visibly different
 * outputs from one identical input, or the experts are decoration. And **beat
 * 4** — the outputs taking the *size* of their expert's score, which is the
 * only thing that makes §5's scoring matter. Without it the blend reads as an
 * average and the router's grading was theatre.
 *
 * One component rather than a stage per beat, because it is one operation
 * progressing. `stage` walks forward and never back.
 */

/**
 * The eight routing weights, authored.
 *
 * Deliberately **not** sorted: a descending staircase would teach that expert
 * order means something, and identity here is an index and nothing else. They
 * sum to 1 after the shared expert is set aside.
 */
const WEIGHT = [0.09, 0.21, 0.06, 0.14, 0.19, 0.05, 0.16, 0.1]

export type BlendStage = 'idle' | 'copy' | 'out' | 'weighted' | 'merging' | 'merged'

/*
 * Four columns, left to right: the row that arrives, the eight, their eight
 * outputs, and the single row that comes out.
 *
 * The merge column has to sit **clear of the output column**. It did not: the
 * destination row was drawn overlapping the eight rows it was collecting, so
 * the busiest beat of the section resolved into a smear in the middle of the
 * frame with no legible before or after.
 */
const W = 1380
const H = 620
const IN_X = 50
const EX_X = 470
const OUT_X = 700
/** Where the eight arrive, and the left edge of the row that leaves. */
const MERGE_X = 1110
const ROW_W = 250

/** A small row of values, drawn as marks. 4096 of them cannot be read. */
function Row({
  x,
  y,
  seed,
  scale = 1,
  tone = PALETTE.blue,
  width = ROW_W,
}: {
  x: number
  y: number
  seed: number
  scale?: number
  tone?: string
  width?: number
}) {
  const cells = 10
  const cw = width / cells
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x={-6} y={-30} width={width + 12} height={60} rx="4" fill={PALETTE.paperLight} stroke={tone} strokeWidth="2.4" />
      {Array.from({ length: cells }, (_, k) => {
        const h = 8 + seeded(seed * 31 + k * 7) * 34
        return <rect key={k} x={k * cw + 3} y={18 - h} width={cw - 6} height={h} rx="1.6" fill={tone} opacity="0.85" />
      })}
    </g>
  )
}

export function ExpertBlend({
  stage = 'idle',
  /** The always-on expert's output joining from the side. Beat 6. */
  shared = false,
  /** The row that arrived, ghosted beside the survivor. Beat 8. */
  ghost = false,
  label,
}: {
  stage?: BlendStage
  shared?: boolean
  ghost?: boolean
  label?: string
}) {
  const at = (i: number) => 74 + i * 62
  const past = (want: BlendStage[]) => want.includes(stage)
  const showOut = past(['out', 'weighted', 'merging', 'merged'])
  const weighted = past(['weighted', 'merging', 'merged'])
  const merging = past(['merging', 'merged'])
  const merged = stage === 'merged'

  return (
    <div className="s1-blend">
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {/* the row that arrived, held at the left until it is copied */}
        <motion.g initial={false} animate={{ opacity: merged ? 0 : 1 }} transition={{ duration: 0.4 }}>
          <Row x={IN_X} y={H / 2} seed={3} tone={PALETTE.blueInk} width={200} />
          <text x={IN_X + 100} y={H / 2 + 62} textAnchor="middle" className="s1-blend-tag" fill={INK}>
            one row in
          </text>
        </motion.g>

        {/* the eight, and the copy of the row travelling into each */}
        {Array.from({ length: 8 }, (_, i) => {
          const y = at(i)
          return (
            <g key={i}>
              <motion.path
                d={`M${IN_X + 216} ${H / 2}C${EX_X - 130} ${H / 2} ${EX_X - 120} ${y} ${EX_X - 26} ${y}`}
                fill="none"
                stroke={INK}
                strokeWidth="2"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: stage === 'idle' ? 0 : 1 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              />
              {/* An identical copy riding in. Same numbers, eight times. */}
              {stage === 'copy' ? (
                <motion.circle
                  /* An attribute value for the first paint; see the note in
                   * cast/Attention.tsx: positioned by attribute, moved by
                   * transform, because a keyframed `cx` has no value for the
                   * first paint and SVG rejects `cx="undefined"`. */
                  cx={IN_X + 216}
                  cy={H / 2}
                  r="7"
                  fill={PALETTE.blue}
                  stroke={INK}
                  strokeWidth="1.6"
                  animate={{ x: [0, EX_X - 26 - (IN_X + 216)], y: [0, y - H / 2] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.4, delay: i * 0.07 }}
                />
              ) : null}

              {/* the expert: a block of numbers, drawn as a block */}
              <rect
                x={EX_X - 22}
                y={y - 22}
                width="44"
                height="44"
                rx="11"
                fill={expertColor(i)}
                stroke={INK}
                strokeWidth="2.4"
              />
              <g fill={INK}>
                <circle cx={EX_X - 8} cy={y - 4} r="2.4" />
                <circle cx={EX_X + 8} cy={y - 4} r="2.4" />
              </g>

              {/* its output — a different row, and bigger if it scored higher */}
              <motion.g
                initial={false}
                animate={{ opacity: showOut ? (merging ? 0.25 : 1) : 0 }}
                transition={{ duration: 0.35, delay: showOut ? i * 0.05 : 0 }}
              >
                <motion.g
                  initial={false}
                  animate={{ scale: weighted ? 0.5 + WEIGHT[i] * 2.4 : 0.86 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 16, delay: i * 0.04 }}
                  style={{ transformOrigin: `${OUT_X}px ${y}px` }}
                >
                  <Row x={OUT_X} y={y} seed={i * 13 + 41} tone={PALETTE.blue} width={170} />
                </motion.g>
              </motion.g>

              {/* the converge: each output travelling to the merge point */}
              {merging && !merged ? (
                <motion.rect
                  height={14 + WEIGHT[i] * 54}
                  width={14 + WEIGHT[i] * 54}
                  rx="5"
                  fill={PALETTE.blueWash}
                  stroke={PALETTE.blueInk}
                  strokeWidth="2.4"
                  animate={{ x: [OUT_X + 186, MERGE_X - 40], y: [y - 24, H / 2 - 24] }}
                  transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.2, delay: i * 0.08 }}
                />
              ) : null}
            </g>
          )
        })}

        {/*
          The always-on expert. Neutral and dashed, because it is not one of the
          eight and must never read as a member of the family.
        */}
        <motion.g initial={false} animate={{ opacity: shared ? 1 : 0 }} transition={{ duration: 0.4 }}>
          <rect
            x={EX_X - 22}
            y={H - 62}
            width="44"
            height="44"
            rx="11"
            fill={PALETTE.idle}
            stroke={INK}
            strokeWidth="2.4"
            strokeDasharray="5 4"
          />
          <text x={EX_X + 40} y={H - 32} className="s1-blend-tag" fill={INK}>
            always on
          </text>
          <motion.path
            d={`M${EX_X + 26} ${H - 40}C${MERGE_X - 300} ${H - 40} ${MERGE_X - 180} ${H / 2} ${MERGE_X - 30} ${H / 2}`}
            fill="none"
            stroke={INK}
            strokeWidth="2"
            strokeDasharray="6 5"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: shared ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.g>

        {/*
          One row out. Same length as the one that went in, new values.
          It fades in at a quarter during the merge, so the eight converging
          have somewhere visible to converge *on* -- without it the marks
          travelled toward blank paper and read as drifting bubbles.
        */}
        <motion.g
          initial={false}
          animate={{ opacity: merged ? 1 : merging ? 0.42 : 0, scale: merged ? 1 : 0.9 }}
          transition={{ type: 'spring', stiffness: 100, damping: 17 }}
          style={{ transformOrigin: `${MERGE_X}px ${H / 2}px` }}
        >
          {/* the row that arrived, for comparison. Same length, obviously not
              the same numbers — which is the whole read of the section. */}
          {ghost ? (
            <g opacity="0.4">
              <Row x={MERGE_X} y={H / 2 - 96} seed={3} tone={PALETTE.graphite} width={210} />
              <text x={MERGE_X + 105} y={H / 2 - 142} textAnchor="middle" className="s1-blend-tag" fill={INK}>
                what arrived
              </text>
            </g>
          ) : null}
          <Row x={MERGE_X} y={H / 2} seed={777} tone={PALETTE.blueInk} width={210} />
          {label ? (
            <text x={MERGE_X + 105} y={H / 2 + 64} textAnchor="middle" className="s1-blend-tag" fill={INK}>
              {label}
            </text>
          ) : null}
        </motion.g>
      </svg>
    </div>
  )
}

/**
 * §6 beat 11. The room gets edges.
 *
 * It exists for exactly one reason: §7 beat 2 pulls back and this becomes one
 * floor of forty-five. A viewer can only feel that if the room was a bounded
 * thing first, so this is drawn with nothing said over it — the frame does the
 * work, and the next section spends it.
 */
export function Room({ bounded, children }: { bounded: boolean; children?: React.ReactNode }) {
  return (
    <div className="s1-room">
      <svg viewBox="0 0 1240 660" aria-hidden="true">
        <motion.g
          fill="none"
          stroke={INK}
          strokeLinejoin="round"
          initial={false}
          animate={{ opacity: bounded ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        >
          <path d="M40 40h1160v580H40z" fill={PALETTE.paperSheet} strokeWidth="3.4" />
          {/* ceiling and floor read as surfaces, not as more wall */}
          <path d="M40 40 150 118h940l110-78" strokeWidth="2.4" opacity="0.55" />
          <path d="M40 620 150 548h940l110 72" strokeWidth="2.4" opacity="0.55" />
          <path d="M150 118v430M1090 118v430" strokeWidth="2.2" opacity="0.4" />
        </motion.g>
      </svg>
      {children}
    </div>
  )
}

/**
 * §5 beat 4. One expert, lifted out of the wall and opened up.
 *
 * It exists because **the name oversells the thing**. "Expert" invites a
 * viewer to imagine a specialist with a subject, and the truth is duller and
 * more useful: a block of numbers that takes a row in and puts a different row
 * out. So the beat opens one and shows exactly that, and nothing else.
 *
 * There is deliberately no label on it, and no label anywhere on the wall it
 * came from. One label — "maths", "French" — and the viewer builds a model that
 * is wrong and very hard to unlearn. See video-script/05 truth notes.
 */
export function ExpertOpen({ index = 3 }: { index?: number }) {
  return (
    <div className="s1-eopen">
      <svg viewBox="0 0 900 300" aria-hidden="true">
        <Row x={20} y={150} seed={4021} tone={PALETTE.blueInk} width={210} />
        <text x={125} y={214} textAnchor="middle" className="s1-blend-tag" fill={INK}>
          a row in
        </text>

        <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round">
          <path d="M250 150h58" />
          <path d="M298 141l12 9-12 9" />
          <path d="M592 150h58" />
          <path d="M640 141l12 9-12 9" />
        </g>

        <rect x={326} y={90} width={240} height={120} rx="10" fill={expertColor(index)} stroke={INK} strokeWidth="3" />
        {/* what it actually is: a block of numbers */}
        <g fill={INK} opacity="0.5">
          {Array.from({ length: 30 }, (_, i) => (
            <rect
              key={i}
              x={344 + (i % 10) * 21}
              y={106 + Math.floor(i / 10) * 32}
              width={15}
              height={7 + seeded(i * 17) * 16}
              rx="1.4"
            />
          ))}
        </g>

        <Row x={670} y={150} seed={777} tone={PALETTE.blueInk} width={210} />
        <text x={775} y={214} textAnchor="middle" className="s1-blend-tag" fill={INK}>
          a different row out
        </text>
      </svg>
    </div>
  )
}
