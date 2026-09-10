import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE, ROLE } from '../palette'
import { AttentionArcs } from './Attention'
import { seeded } from '../props/frame'

/**
 * Your sentence, and every state the video needs it in.
 *
 * One component rather than several, because §2 beat 5 is **the same card
 * coming apart** — not a card being replaced by a row of smaller cards. A
 * viewer who sees a swap learns "tokens are a new set of objects"; a viewer who
 * sees it fracture learns "tokens are pieces of what I typed". That difference
 * is the whole section, and it only survives if there is one object.
 *
 * The pieces are sized by how many characters they hold, so `dropp` and `ed`
 * are visibly different widths. That unevenness is load-bearing: it is what
 * stops the viewer concluding "token = word", and §4's example depends on the
 * lesson having landed.
 */

/** Character width and padding, in the component's own units. */
const CH = 27
const PAD = 22
const GAP = 16
const CARD_Y = 120
const CARD_H = 86

export function Sentence({
  words,
  focus = -1,
  split = false,
  jumble = false,
  rows = false,
  raise = -1,
  changed = -1,
  attention,
  dim = false,
  caption,
}: {
  /** The pieces, in order. Unsplit, they read as one continuous sentence. */
  words: readonly string[]
  /** The piece we are following. -1 for none. */
  focus?: number
  /** Apart, as separate pieces. False draws one card with one outline. */
  split?: boolean
  /**
   * Just come apart, and not yet tidy. Beat 5 of §2 is a fracture and beat 6
   * is the pieces settling into a row — two events, so two states. Without
   * this they are one event and the section loses a beat it needs.
   */
  jumble?: boolean
  /** A short row of values under each piece — what the token actually is. */
  rows?: boolean
  /** One piece lifted slightly clear of the line, before something happens. */
  raise?: number
  /** Whose row has just changed. Redraws its values and recolours them. */
  changed?: number
  /**
   * §4. The lines from `focus` to the others, drawn **inside this svg** so
   * they use the same token positions as the cards they connect. A separate
   * component aligning by hand is a component whose lines miss.
   */
  attention?: {
    weights?: readonly number[]
    /** Even lines, before any weighting is shown. Beat 4. */
    flat?: boolean
    /** The lines to later tokens have withdrawn. Beat 6. */
    masked?: boolean
    /** Material travelling along them into the looker. Beat 7. */
    flow?: boolean
  }
  dim?: boolean
  caption?: string
}) {
  /* An empty sentence still mounts — slots are persistent — and would compute
   * a negative viewBox width, which the SVG renderer rejects outright. */
  if (!words.length) return null

  /*
   * Two width sets, because the two states want different spacing.
   *
   * A piece needs padding inside its own edge. A sentence does not: applying
   * the piece padding to the joined layout put a double space between every
   * word, so the one card read as badly typeset text rather than as a sentence.
   */
  const glyphs = words.map((word) => Math.max(1, word.length) * CH)
  const pieceW = glyphs.map((w) => w + PAD * 2)
  const wordW = glyphs.map((w) => w + 12)

  /** Adjacent: the sentence as one card. */
  const tight: number[] = []
  /** Spaced: the sentence as pieces. */
  const loose: number[] = []
  let a = 0
  let b = 0
  for (let i = 0; i < words.length; i += 1) {
    tight.push(a)
    loose.push(b)
    a += wordW[i]
    b += pieceW[i] + GAP
  }
  const tightW = a
  const looseW = b - GAP

  /*
   * Both layouts are centred on the same point, and the offsets are computed
   * from piece *centres* rather than left edges -- so a piece whose box also
   * changes width still has its text land in the right place.
   */
  const tightOff = (looseW - tightW) / 2
  const centre = (i: number) => loose[i] + pieceW[i] / 2
  const tightCentre = (i: number) => tightOff + tight[i] + wordW[i] / 2

  /*
   * The viewBox hugs the content, so the cards sit in the middle of the slot.
   * Left to a 0-based box the cards rendered in its lower third and every
   * sentence hung 15% below where the beat placed it.
   */
  const midY = CARD_Y + CARD_H / 2
  const reach = rows ? 178 : 148
  const boxH = 2 * (CARD_Y + reach - midY)
  const boxTop = midY - boxH / 2
  return (
    <div className="s1-sentence" data-dim={dim ? 'true' : undefined}>
      <svg viewBox={`0 ${boxTop} ${looseW} ${boxH}`} aria-hidden="true">
        {attention && focus >= 0 ? (
          <AttentionArcs
            xs={words.map((_, i) => centre(i))}
            from={focus}
            weights={attention.weights}
            flat={attention.flat}
            masked={attention.masked}
            flow={attention.flow}
            y={CARD_Y}
          />
        ) : null}

        {/*
          One outline around the whole thing, for as long as it is one thing.
          It fades as the pieces separate and their own edges arrive, which is
          what makes the split read as fracture instead of replacement.
        */}
        <motion.rect
          x={tightOff}
          y={CARD_Y}
          width={tightW}
          height={CARD_H}
          rx={5}
          fill={PALETTE.paperLight}
          stroke={INK}
          strokeWidth="3.2"
          initial={false}
          animate={{ opacity: split ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {words.map((word, i) => {
          const isFocus = i === focus
          const tone = isFocus ? ROLE.word : INK
          return (
            <motion.g
              key={`${i}-${word}`}
              initial={false}
              animate={{
                x: split
                  ? jumble
                    ? (seeded(i * 23 + 3) - 0.5) * 26
                    : 0
                  : tightCentre(i) - centre(i),
                y: (i === raise ? -34 : 0) + (jumble ? (seeded(i * 53 + 11) - 0.5) * 44 : 0),
                rotate: jumble ? (seeded(i * 71 + 5) - 0.5) * 13 : 0,
              }}
              transition={{ type: 'spring', stiffness: 84, damping: 17, delay: split ? seeded(i * 7) * 0.16 : 0 }}
              style={{ transformOrigin: `${centre(i)}px ${CARD_Y + CARD_H / 2}px` }}
            >
              {/* Each piece's own edge, which only exists once it is a piece. */}
              <motion.rect
                x={loose[i]}
                y={CARD_Y}
                height={CARD_H}
                rx={5}
                fill={PALETTE.paperLight}
                stroke={tone}
                strokeWidth={isFocus ? 4.4 : 2.6}
                initial={false}
                animate={{ opacity: split ? 1 : 0, width: pieceW[i] }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={centre(i)}
                y={CARD_Y + 57}
                textAnchor="middle"
                className="s1-sentence-w"
                fill={tone}
              >
                {word}
              </text>

              {/*
                What the piece actually is inside the model: a row of values.
                Drawn as marks, not digits — 4096 of them cannot be read, and
                the pattern is the honest part.
              */}
              {rows ? (
                <motion.g
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.04 * i }}
                >
                  {Array.from({ length: 7 }, (_, k) => {
                    /* A changed row is a different row: new seed, new colour. */
                    const seed = i === changed ? i * 41 + k * 13 + 900 : i * 17 + k * 5
                    const h = 6 + seeded(seed) * 26
                    return (
                      <motion.rect
                        key={k}
                        x={loose[i] + PAD + k * (glyphs[i] / 7) + 1}
                        width={Math.max(4, glyphs[i] / 7 - 4)}
                        rx="1.6"
                        fill={i === changed ? PALETTE.blue : isFocus ? PALETTE.blueWash : PALETTE.idleDeep}
                        stroke={i === changed || isFocus ? PALETTE.blueInk : 'none'}
                        strokeWidth={i === changed || isFocus ? 1.2 : 0}
                        initial={false}
                        animate={{ y: CARD_Y + 122 - h, height: h }}
                        transition={{ type: 'spring', stiffness: 90, damping: 16 }}
                      />
                    )
                  })}
                </motion.g>
              ) : null}
            </motion.g>
          )
        })}

        {caption ? (
          <text
            x={looseW / 2}
            y={rows ? CARD_Y + 168 : CARD_Y + 138}
            textAnchor="middle"
            className="s1-sentence-cap"
            fill={INK}
          >
            {caption}
          </text>
        ) : null}
      </svg>
    </div>
  )
}
