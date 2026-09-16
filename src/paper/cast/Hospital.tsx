import { motion } from 'motion/react'
import { INK, expertColor } from '../ink'
import { PALETTE } from '../palette'

/**
 * The world of Section 01.
 *
 * A hospital rather than a library, because a book on a shelf is *already
 * available* -- shelving is free and retrieval is free -- so a library has no
 * way to express a cost of absence, and the wall has to be faked with a hazard
 * sign. A hospital that keeps specialists on site is not absurd, it is correct,
 * and for the model's own reason. See video-script/video-1/01-the-night-shift.md §4.
 *
 * Section 01 never states that reason. It only has to make the plan look
 * obviously right, so the closing question stings.
 */

const COLS = 36
const ROWS = 8
/** 36 x 8 = 288 routed experts per sparse layer. Verified figure. */
const TOTAL = COLS * ROWS

const X0 = 93
const STEP_X = 26
const Y0 = 184
const STEP_Y = 43

/** Scattered on purpose: routing picks by score, never by locality. */
function seat(index: number) {
  return { x: X0 + (index % COLS) * STEP_X, y: Y0 + Math.floor(index / COLS) * STEP_Y }
}

export function Hospital({
  sign,
  plaque,
  staffed,
  lit,
  was,
  focus,
  quiet,
  heavy,
  bunks,
  doorsOpen,
  scoring = false,
  badges = 'none',
  idle,
}: {
  sign: string
  plaque: string
  staffed: boolean
  lit: readonly number[]
  /** Where the *previous* word's team sat. */
  was: readonly number[]
  focus: boolean
  quiet: boolean
  heavy: boolean
  bunks: boolean
  doorsOpen: boolean
  /** The router is grading all 288 against the current numbers. */
  scoring?: boolean
  /**
   * Score marks over every expert.
   *
   * `empty` is beat 6: the question is asked of all 288 at once, before any
   * answer exists. `scored` is beat 7: every one of them has a value.
   *
   * The count is not negotiable. If the marks only appear over the winners the
   * frame says the router looked at eight, which is the exact opposite of what
   * the section is for.
   */
  badges?: 'none' | 'empty' | 'scored'
  /**
   * A brace under the wall counting the experts that did nothing -- "280 idle".
   *
   * It is drawn **here**, in the building's own viewBox, and not as a page
   * overlay at a hand-tuned stage percentage. It was an overlay in both §1 and
   * §5, and in both it drew straight through the entrance: no percentage can
   * track a building that two beats earlier changed scale and camera. The rule
   * is the one `Attention` and `Space` already follow -- **a measure of a thing
   * is drawn by whatever draws the thing.**
   *
   * The label sits left of the doors (486-634) rather than centred under the
   * brace, which is the one place a centred label cannot go.
   */
  idle?: string
}) {
  const chosen = new Set(lit)
  /*
   * The event of this section is that a second word picks a different eight.
   * Lighting the new team alone cannot show that -- the viewer has no memory
   * of where the last one sat, so the frame reads as "eight are lit" rather
   * than "eight *different* ones are lit". These are the empty chairs.
   */
  const vacated = was.filter((i) => !chosen.has(i))

  return (
    <motion.div
      className="s1-hospital"
      data-quiet={quiet ? 'true' : undefined}
      animate={{ scaleY: heavy ? 0.988 : 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      style={{ transformOrigin: 'bottom center' }}
    >
      <svg viewBox="0 0 1120 660" aria-hidden="true">
        {/* warm spill from the doorway, behind everything */}
        {doorsOpen ? (
          <motion.ellipse
            cx="560"
            cy="566"
            rx="210"
            ry="86"
            fill={PALETTE.glow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.5 }}
          />
        ) : null}

        <g fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
          {/* body */}
          <path d="M60 162h1000v422H60z" fill={PALETTE.paperSheet} strokeWidth="3.2" />

          {/* roof */}
          <path d="M44 166 560 56l516 110" fill={PALETTE.paperShade} strokeWidth="3.2" />

          {/* sign band across the front */}
          <path d="M344 100h432a5 5 0 0 1 5 5v50a5 5 0 0 1-5 5H344a5 5 0 0 1-5-5v-50a5 5 0 0 1 5-5Z" fill={PALETTE.paperLight} strokeWidth="3" />

          {/* floor lines */}
          {Array.from({ length: ROWS }, (_, r) => (
            <path key={r} d={`M76 ${Y0 + r * STEP_Y + 31}h968`} strokeWidth="1.9" opacity="0.42" />
          ))}

          {/* lobby */}
          <path d={`M60 ${528}h1000`} strokeWidth="2.4" opacity="0.6" />
        </g>

        {sign ? (
          <text x="560" y="141" textAnchor="middle" className="s1-hosp-sign" fill={INK}>
            {sign}
          </text>
        ) : null}

        {/* the staff */}
        {staffed ? (
          <g>
            {Array.from({ length: TOTAL }, (_, i) => {
              const isLit = chosen.has(i)
              const { x, y } = seat(i)
              const dim = focus && !isLit
              const asleep = bunks && !isLit
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: dim ? 0.68 : 1, y: 0 }}
                  transition={{
                    duration: 0.34,
                    // Staggered by column so the wall populates as a sweep
                    // rather than snapping on all at once.
                    delay: staffed ? 0.2 + (i % COLS) * 0.008 : 0,
                  }}
                >
                  {/*
                    A wash alone was too quiet against the paper. The ring is
                    what makes eight of 288 findable at a glance, without
                    reaching for a loud colour to do it.
                  */}
                  {isLit ? (
                    <rect
                      x={x - 6}
                      y={y - 6}
                      width="31"
                      height="31"
                      rx="11"
                      fill={PALETTE.paperWhite}
                      stroke={INK}
                      strokeWidth="1.8"
                    />
                  ) : null}
                  <g stroke={INK} strokeWidth="1.7" strokeLinecap="round">
                    <path d={`M${x + 5} ${y + 18}v7`} />
                    <path d={`M${x + 14} ${y + 18}v7`} />
                  </g>
                  <rect
                    x={x}
                    y={y}
                    width="19"
                    height="18"
                    rx="5.5"
                    fill={dim ? PALETTE.idleDim : expertColor(i)}
                    stroke={INK}
                    strokeWidth="1.8"
                  />
                  {asleep ? (
                    <g stroke={INK} strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
                      <path d={`M${x + 3.5} ${y + 8}h4`} />
                      <path d={`M${x + 11.5} ${y + 8}h4`} />
                    </g>
                  ) : (
                    <g fill={INK} opacity={dim ? 0.5 : 1}>
                      <circle cx={x + 5.6} cy={y + 7.6} r="1.7" />
                      <circle cx={x + 13.4} cy={y + 7.6} r="1.7" />
                    </g>
                  )}
                </motion.g>
              )
            })}
          </g>
        ) : null}

        {/*
          A score mark over every single expert. All 288, not the eight -- the
          router grades the whole wall, and a frame that shows otherwise
          teaches the wrong thing about what routing costs.
        */}
        {staffed && badges !== 'none' ? (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            {Array.from({ length: TOTAL }, (_, i) => {
              const { x, y } = seat(i)
              const score = 0.14 + ((i * 2654435761) % 1000) / 1000 * 0.86
              return (
                <g key={`badge-${i}`}>
                  <rect
                    x={x + 1}
                    y={y - 15}
                    width="17"
                    height="10"
                    rx="2"
                    fill={PALETTE.paperWhite}
                    stroke={PALETTE.blueInk}
                    strokeWidth="1.1"
                    opacity="0.85"
                  />
                  {badges === 'scored' ? (
                    <motion.rect
                      x={x + 2.4}
                      y={y - 13.6}
                      height="7.2"
                      rx="1"
                      fill={PALETTE.blue}
                      initial={{ width: 0 }}
                      animate={{ width: 14.2 * score }}
                      transition={{ duration: 0.3, delay: (i % COLS) * 0.014 }}
                    />
                  ) : null}
                </g>
              )
            })}
          </motion.g>
        ) : null}

        {/* every expert being graded, all 288 of them */}
        {staffed && scoring ? (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
            {Array.from({ length: ROWS }, (_, r) => (
              <rect
                key={r}
                x={X0 - 8}
                y={Y0 + r * STEP_Y - 6}
                width={COLS * STEP_X}
                height="32"
                rx="8"
                fill={PALETTE.blue}
                opacity="0.1"
              />
            ))}
            <motion.rect
              x={X0 - 10}
              y={Y0 - 10}
              width="34"
              height={ROWS * STEP_Y}
              fill={PALETTE.blue}
              opacity="0.28"
              animate={{ x: [X0 - 10, X0 + COLS * STEP_X - 24] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </motion.g>
        ) : null}

        {/* the seats the previous word's team has just left */}
        {staffed && vacated.length ? (
          <g>
            {vacated.map((i) => {
              const { x, y } = seat(i)
              return (
                <motion.g key={`was-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                  {/*
                    A solid red ring, not a dashed one.
                    Dashed already means "not one of the eight" -- it is how the
                    always-on shared expert is drawn -- and §5 beat 13 had both
                    on screen at once, so "dashed" meant two different things in
                    one frame and neither could be read.
                  */}
                  <rect
                    x={x - 5}
                    y={y - 5}
                    width="29"
                    height="29"
                    rx="10"
                    fill="none"
                    stroke={PALETTE.red}
                    strokeWidth="2.4"
                  />
                </motion.g>
              )
            })}
          </g>
        ) : null}

        {/* a few zZ, rather than 280 of them */}
        {bunks ? (
          <g className="s1-hosp-zz" fill={INK} opacity="0.55">
            {[
              [200, 216],
              [430, 302],
              [700, 260],
              [880, 388],
              [300, 474],
              [640, 430],
            ].map(([x, y]) => (
              <text key={`${x}-${y}`} x={x} y={y} className="s1-hosp-z">
                z
              </text>
            ))}
          </g>
        ) : null}

        {/* how many did nothing -- measured against the wall it counts */}
        {idle ? (
          <motion.g
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <path
              d={`M${X0 - 10} 512v8q0 5 5 5h${(COLS * STEP_X) / 2 - 24}q5 0 5 5 0-5 5-5h${(COLS * STEP_X) / 2 - 24}q5 0 5-5v-8`}
              fill="none"
              stroke={PALETTE.red}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="286" y="566" textAnchor="middle" className="s1-hosp-idle" fill={PALETTE.red}>
              {idle}
            </text>
          </motion.g>
        ) : null}

        {/* entrance */}
        <g fill="none" stroke={INK} strokeWidth="2.8" strokeLinejoin="round">
          <path d="M486 534h148v50H486z" fill={doorsOpen ? PALETTE.glowSoft : PALETTE.paperShade} />
          <motion.path
            d="M560 534v50"
            animate={{ opacity: doorsOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </g>

        {/*
          The building presses down. The weight is one heavy line plus its
          label -- small arrow glyphs under the building read as stray marks
          rather than as load.
        */}
        {heavy ? (
          <motion.g
            stroke={PALETTE.stone}
            strokeLinecap="round"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <path d="M60 597h1000" strokeWidth="11" opacity="0.42" />
            <path d="M60 592h1000" strokeWidth="4" opacity="0.7" />
          </motion.g>
        ) : (
          <path d="M16 590h1088" stroke={INK} strokeWidth="2.4" opacity="0.35" />
        )}

        {plaque ? (
          <g>
            <path d="M74 604h236a4 4 0 0 1 4 4v38a4 4 0 0 1-4 4H74a4 4 0 0 1-4-4v-38a4 4 0 0 1 4-4Z" fill={PALETTE.paperLight} stroke={INK} strokeWidth="2.4" />
            <text x="192" y="632" textAnchor="middle" className="s1-hosp-plaque" fill={INK}>
              {plaque}
            </text>
          </g>
        ) : null}
      </svg>
    </motion.div>
  )
}

/**
 * The eight, lifted out of the building and stood together.
 *
 * Beat 18 exists so the viewer can hold "the team is tiny" and "the building is
 * enormous" in one frame at beat 20. Two separate objects, one comparison.
 */
export function ChosenTeam({ lit, boxed }: { lit: readonly number[]; boxed: boolean }) {
  return (
    <div className="s1-team" data-boxed={boxed ? 'true' : undefined}>
      <div className="s1-team-row">
        {lit.map((index) => (
          <div className="s1-team-one" key={index}>
            <svg viewBox="0 0 40 52" aria-hidden="true">
              <rect x="1" y="1" width="38" height="34" rx="11" fill={PALETTE.paperWhite} stroke={INK} strokeWidth="1.6" />
              <g stroke={INK} strokeWidth="2.1" strokeLinecap="round">
                <path d="M14 33v10" />
                <path d="M26 33v10" />
              </g>
              <rect x="5" y="3" width="30" height="30" rx="9" fill={expertColor(index)} stroke={INK} strokeWidth="2.2" />
              <g fill={INK}>
                <circle cx="15" cy="16" r="2.3" />
                <circle cx="25" cy="16" r="2.3" />
              </g>
            </svg>
          </div>
        ))}
      </div>
      <span className="s1-team-cap">the eight that worked</span>
    </div>
  )
}
