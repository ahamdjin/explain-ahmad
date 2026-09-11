import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE, ROLE, expertColor } from '../palette'
import { seeded } from '../props/frame'

/**
 * The model as a building: 45 floors, the first 3 dense and the other 42 sparse.
 *
 * Everything up to §7 has happened in one room, and the viewer has quietly
 * assumed that room *is* the model. Beat 2 of §7 is the pull-back that takes it
 * away, and it is the biggest single moment in the video — which is why §6 beat
 * 11 spends a whole beat giving the room edges. This object is what the room
 * turns out to be one of.
 *
 * It then has to survive four more sections without being rebuilt: §8 puts nine
 * tokens on it at once, §9 climbs to the top of it, §10 runs the whole thing in
 * a loop, and §12 ghosts it behind a cache. Every one of those is a state here,
 * never a second tower.
 */

const FLOORS = 45
const DENSE = 3
const FLOOR_H = 17
const TOP = 30
const BODY_X = 108
const BODY_W = 372
const HEIGHT = FLOORS * FLOOR_H + TOP * 2

/** Floor 1 at the bottom, so climbing reads as climbing. */
const floorY = (n: number) => TOP + (FLOORS - n) * FLOOR_H

/**
 * Where a floor's eight experts sit, per floor.
 *
 * Authored off a fixed hash rather than drawn at random, so floor 1 and floor 2
 * genuinely differ — which is the frame §7 beats 6–8 are built on — and so the
 * same floor looks the same on every render and screenshots stay comparable.
 */
function team(floor: number) {
  const slots = 18
  const picked: number[] = []
  for (let i = 0; i < slots && picked.length < 8; i += 1) {
    if (seeded(floor * 97 + i * 13) > 0.56) picked.push(i)
  }
  /* Top up deterministically if the hash was stingy on this floor. */
  for (let i = 0; picked.length < 8; i += 1) if (!picked.includes(i)) picked.push(i)
  return picked.slice(0, 8).sort((a, b) => a - b)
}

const slotX = (slot: number) => BODY_X + 16 + slot * ((BODY_W - 32) / 18)

export type TowerFlash = 'look' | 'pick' | 'work'

export function Tower({
  /** The `42 sparse` / `3 dense` braces. Off before §7 has said "layer". */
  tags = true,
  /** The floor the climbers are on. Also the highlighted floor. */
  floor = 0,
  /** How many token markers are on the building. §8 puts eight here. */
  markers = 0,
  /**
   * How many of those markers are *kept* -- already finished, held at the top,
   * dimmed, and not climbing.
   *
   * This exists for §10, which is **decode, not prefill**. Only the newly
   * chosen token is pushed through the 45 layers; the earlier positions are
   * reused from the KV cache. The section used to march all nine markers back
   * to the base and replay the climb, which is the prefill picture, and filed
   * the cache as an aside -- a caption cannot correct the main image. So the
   * first `kept` markers hold at the top and only the remainder climbs.
   * `research/glm/GROUND_TRUTH.md`.
   */
  kept = 0,
  /** The three-flash sequence on the current floor: look · pick · work. */
  flash,
  /** Light the current floor's eight, and the floor below's, differently. */
  teams = false,
  /** Attention, as wiring between the markers on the floor they share. */
  wiring = false,
  /** A plate on the front of the building. §8 names the shape. */
  plaque,
  /** A small count above every marker. §8's 336 each. */
  counters,
  /** A line tracing the whole climb, bottom to top. §7 beat 13. */
  trace = false,
  /** Drawn faintly, as a backdrop for something else. §12 beat 11. */
  ghost = false,
  label,
}: {
  tags?: boolean
  floor?: number
  markers?: number
  kept?: number
  flash?: TowerFlash
  teams?: boolean
  wiring?: boolean
  plaque?: string
  counters?: string
  trace?: boolean
  ghost?: boolean
  label?: string
}) {
  const markerXs = Array.from({ length: markers }, (_, i) =>
    markers === 1 ? BODY_X + BODY_W / 2 : BODY_X + 34 + i * ((BODY_W - 68) / Math.max(1, markers - 1)),
  )
  const flashOrder: TowerFlash[] = ['look', 'pick', 'work']

  return (
    <div className="s1-tower" data-ghost={ghost ? 'true' : undefined}>
      <svg viewBox={`0 0 560 ${HEIGHT + 26}`} aria-hidden="true">
        <g fill="none" stroke={INK} strokeLinejoin="round">
          <path d={`M${BODY_X} ${TOP}h${BODY_W}v${FLOORS * FLOOR_H}H${BODY_X}z`} fill={PALETTE.paperSheet} strokeWidth="3" />
          <path d={`M${BODY_X - 14} ${TOP} ${BODY_X + BODY_W / 2} ${TOP - 24} ${BODY_X + BODY_W + 14} ${TOP}`} fill={PALETTE.paperShade} strokeWidth="2.6" />
        </g>

        {Array.from({ length: FLOORS }, (_, i) => {
          const n = i + 1
          const isDense = n <= DENSE
          const here = n === floor
          const below = n === floor - 1
          return (
            <g key={n}>
              <rect
                x={BODY_X + 2}
                y={floorY(n) + 1}
                width={BODY_W - 4}
                height={FLOOR_H - 2}
                fill={isDense ? PALETTE.idleDeep : here ? PALETTE.tealWash : PALETTE.paperLight}
                stroke={INK}
                strokeWidth="1.1"
              />

              {/*
                The eight on this floor, and the eight on the floor below — in
                different positions. Two floors, two teams, one frame: that is
                what §7 beats 6-8 are for, and it cannot be said, only shown.
              */}
              {teams && !isDense && (here || below) ? (
                <g>
                  {Array.from({ length: 18 }, (_, slot) => {
                    const lit = team(n).includes(slot)
                    return (
                      <rect
                        key={slot}
                        x={slotX(slot)}
                        y={floorY(n) + 4}
                        width="12"
                        height={FLOOR_H - 8}
                        rx="2.4"
                        fill={lit ? expertColor(slot) : PALETTE.idle}
                        stroke={lit ? INK : 'none'}
                        strokeWidth={lit ? 1 : 0}
                        opacity={below ? 0.62 : 1}
                      />
                    )
                  })}
                </g>
              ) : null}

              {/* look · pick · work, in that order. Out of order it teaches
                  the wrong causal chain, which is the whole argument. */}
              {here && flash ? (
                <motion.rect
                  x={BODY_X + 2}
                  y={floorY(n) + 1}
                  width={BODY_W - 4}
                  height={FLOOR_H - 2}
                  fill={
                    flash === 'look' ? PALETTE.relate : flash === 'pick' ? PALETTE.blue : PALETTE.teal2
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.55, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    times: [0, 0.2, 0.5],
                    delay: flashOrder.indexOf(flash) * 0.34,
                  }}
                />
              ) : null}

              {here ? (
                <text x={BODY_X + BODY_W + 22} y={floorY(n) + 13} className="s1-tower-here" fill={PALETTE.tealInk}>
                  floor {n}
                </text>
              ) : null}
            </g>
          )
        })}

        {/*
          The two populations, braced, because §7 beat 10 says 3 and 42.
          **Suppressed by `tags={false}`** -- §1 beat 4 shows this tower fifteen
          seconds into the video, before "layer" has been said once, and
          "42 sparse / 3 dense" there is the exact jargon-before-landmark
          problem the new opening exists to avoid. It is a height then, and a
          population later.
        */}
        {tags ? (
        <>
        <g fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round">
          <path d={`M${BODY_X - 8} ${floorY(FLOORS)}h-14v${(FLOORS - DENSE) * FLOOR_H}h14`} />
          <path d={`M${BODY_X - 8} ${floorY(DENSE)}h-14v${DENSE * FLOOR_H}h14`} />
        </g>
        <text x={BODY_X - 30} y={floorY(FLOORS) + ((FLOORS - DENSE) * FLOOR_H) / 2} textAnchor="end" className="s1-tower-tag" fill={INK}>
          42 sparse
        </text>
        <text x={BODY_X - 30} y={floorY(DENSE) + (DENSE * FLOOR_H) / 2 + 5} textAnchor="end" className="s1-tower-tag" fill={INK}>
          3 dense
        </text>
        </>
        ) : null}

        {/* the climb, traced whole. Every floor needed the one below it. */}
        {trace ? (
          <motion.path
            d={`M${BODY_X + BODY_W / 2} ${floorY(1) + FLOOR_H / 2}V${floorY(FLOORS) + FLOOR_H / 2}`}
            fill="none"
            stroke={ROLE.word}
            strokeWidth="3.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        ) : null}

        {/* attention, as the wiring between tokens on the floor they share */}
        {wiring && markers > 1 && floor > 0 ? (
          <g>
            {markerXs.map((x1, a) =>
              markerXs.slice(a + 1).map((x2, k) => {
                const b = a + k + 1
                const y = floorY(floor) + FLOOR_H / 2
                const lift = 8 + (b - a) * 3
                return (
                  <motion.path
                    key={`${a}-${b}`}
                    d={`M${x1} ${y}Q${(x1 + x2) / 2} ${y - lift} ${x2} ${y}`}
                    fill="none"
                    stroke={PALETTE.relateInk}
                    strokeWidth="1.3"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: Math.min(0.5, (a + b) * 0.02) }}
                  />
                )
              }),
            )}
          </g>
        ) : null}

        {/* the climbers -- and, in §10, the ones that are not climbing */}
        {markerXs.map((x, i) => {
          /*
           * A kept marker sits at the top, where it finished, dimmed. It must
           * stay legible: if it fades far enough to read as "gone", the viewer
           * sees one word climbing an empty tower and loses the reason this
           * pass is cheaper than the first one. That *is* the argument.
           */
          const isKept = i < kept
          return (
          <motion.g
            key={i}
            initial={false}
            animate={{ y: isKept ? floorY(FLOORS) + FLOOR_H / 2 : floorY(Math.max(1, floor)) + FLOOR_H / 2 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: isKept ? 0 : i * 0.015 }}
            opacity={isKept ? 0.34 : 1}
          >
            <circle
              cx={x}
              cy={0}
              r="6.6"
              fill={isKept ? PALETTE.paperShade : PALETTE.teal2}
              stroke={INK}
              strokeWidth={isKept ? 1.4 : 2}
            />
            {counters ? (
              <text x={x} y={-13} textAnchor="middle" className="s1-tower-count" fill={PALETTE.blueInk}>
                {counters}
              </text>
            ) : null}
          </motion.g>
          )
        })}

        {/* the shape, named */}
        {plaque ? (
          <motion.g
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 16 }}
          >
            <path
              d={`M${BODY_X + 44} ${HEIGHT / 2 - 26}h${BODY_W - 88}a5 5 0 0 1 5 5v42a5 5 0 0 1-5 5H${BODY_X + 44}a5 5 0 0 1-5-5v-42a5 5 0 0 1 5-5Z`}
              fill={PALETTE.paperWhite}
              stroke={INK}
              strokeWidth="2.8"
            />
            <text x={BODY_X + BODY_W / 2} y={HEIGHT / 2 + 4} textAnchor="middle" className="s1-tower-plaque" fill={INK}>
              {plaque}
            </text>
          </motion.g>
        ) : null}

        {label ? (
          <text x="284" y={HEIGHT + 18} textAnchor="middle" className="s1-tower-label" fill={INK}>
            {label}
          </text>
        ) : null}
      </svg>
    </div>
  )
}
