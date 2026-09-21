import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'
import { iso, pts, Block } from './iso'

/**
 * The real things.
 *
 * ## Why this file exists
 *
 * Every machine in this film was a labelled rectangle. `Server` even said so
 * in its own comment — *a reconstruction draws a server as a box with its name
 * on it* — and that was a defensible position right up until the point where
 * the whole middle of the film is two machines, a copy between them, and a
 * flag on one of them. Three sections of labelled rectangles is not a place.
 *
 * A viewer who has never seen a data centre still knows what a rack of
 * machines **is**: heavy, racked, cabled, blinking, in a cold room somewhere.
 * That knowledge is already in long-term memory and is free to use —
 * `BEAT_GRANULARITY` rule 4, *every number needs a unit the viewer already
 * owns*, applied to objects instead of numbers. A rectangle labelled SERVER
 * spends a chunk of working memory. A rack spends none.
 *
 * ## What keeps it honest
 *
 * These are **drawings**, not renders: flat fills, one light from the upper
 * left, visible line weight, paper colours. That is the reconciliation of the
 * old comment's worry — photorealism would claim a fidelity the evidence does
 * not have, but a *drawn* rack claims only that a server is a machine in a
 * rack, which is true and which the viewer already believed.
 *
 * Nothing in here carries a brand, a vendor, or a logo. A rack is a rack.
 */

const ink = PALETTE.ink
const soft = PALETTE.graphite
const red = PALETTE.red
const green = PALETTE.green
const paper = PALETTE.paperWhite
const sheet = PALETTE.paperSheet
const idle = PALETTE.idle
const stone = PALETTE.stone
const glow = PALETTE.glow

/* --- the place ------------------------------------------------------------ */

/**
 * The building the servers are in.
 *
 * Establishes, once, that "the successor server" is a real address in a real
 * place rather than a noun in a document. Windowless, chillers on the roof,
 * a fence, one door — which is what these buildings actually look like, and
 * the anonymity is the point: nobody can see in.
 *
 * `lit` turns the interior on. Used once, wide, before we ever go inside.
 */
export function Datacenter({ lit, feel }: { lit: boolean; feel: Feel }) {
  const W = 52
  const D = 34
  const Hh = 20

  return (
    <div className="cf-dc">
      <svg viewBox="-62 -52 124 114" width="100%" aria-hidden="true">
        {/* the ground it stands on */}
        <polygon points={pts([iso(-14, -14), iso(80, -14), iso(80, 58), iso(-14, 58)])} fill={sheet} stroke="none" />

        {/* the shed */}
        <Block x={6} y={6} w={W} d={D} h={Hh} face={paper} top={PALETTE.paperLight} />

        {/* roof plant. z only shifts screen-y by -z, so a ground-level block
            lifted onto the roof is one translate rather than a 3-D origin. */}
        <g transform={`translate(0 ${-Hh})`}>
          {[4, 20, 36].map((dx) => (
            <Block key={dx} x={12 + dx} y={14} w={9} d={12} h={7} face={idle} top={PALETTE.paperLight} sw={0.9} />
          ))}
        </g>

        {/* Louvres on the long front wall. `Block` shows the x = const face and
            the y = y + d face; anything drawn at y = 6 lands on the hidden back
            wall, which is where these first went. */}
        {[7, 10, 13].map((z) => {
          const a = iso(18, 6 + D, z)
          const b = iso(52, 6 + D, z)
          return <line key={z} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={soft} strokeWidth="1.1" opacity="0.4" />
        })}

        {/* the one door, on the end wall, with a light over it */}
        {(() => {
          const d0 = iso(6, 22, 0)
          const d1 = iso(6, 30, 0)
          const d2 = iso(6, 30, 9)
          const d3 = iso(6, 22, 9)
          const lamp = iso(6, 26, 11.5)
          return (
            <g>
              <polygon points={pts([d0, d1, d2, d3])} fill={lit ? PALETTE.glowSoft : idle} stroke={ink} strokeWidth="1.1" />
              <motion.circle cx={lamp[0]} cy={lamp[1]} r="1.8" initial={false} animate={{ fill: lit ? glow : idle }} transition={feel} />
            </g>
          )
        })()}

        {/* a generator and a transformer in the yard — these buildings always
            have them, and they are why the room never loses power */}
        <Block x={6} y={46} w={14} d={7} h={5} face={idle} top={PALETTE.idleDeep} sw={0.9} />
        <Block x={26} y={46} w={9} d={7} h={6} face={idle} top={PALETTE.idleDeep} sw={0.9} />
      </svg>
    </div>
  )
}

/**
 * One cabinet in the room, with a front on it.
 *
 * A bare block reads as a domino. The louvred door and the strip of status
 * lights down one edge are the minimum that makes a viewer see *equipment* —
 * and they cost nothing at this scale because they are four lines.
 */
function Cabinet({ x, y, marked }: { x: number; y: number; marked: boolean }) {
  const w = 9
  const d = 13
  const h = 24

  return (
    <g>
      <Block
        x={x}
        y={y}
        w={w}
        d={d}
        h={h}
        face={marked ? PALETTE.paperWhite : idle}
        top={marked ? PALETTE.paperLight : PALETTE.idleDeep}
        sw={0.9}
      />
      {/* louvres across the left face, which is the door from here */}
      {Array.from({ length: 7 }, (_, k) => {
        const z = 3 + k * 2.9
        const a = iso(x + 1, y + 1.5, z)
        const b = iso(x + 1, y + d - 1.5, z)
        return <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={soft} strokeWidth="0.55" opacity="0.5" />
      })}
      {/* the machine the story is about is simply the one that is awake */}
      {marked ? (
        <circle cx={iso(x + 1, y + 2.5, h - 3)[0]} cy={iso(x + 1, y + 2.5, h - 3)[1]} r="1.4" fill={green} />
      ) : null}
    </g>
  )
}

/**
 * Inside: two rows of cabinets with an aisle between them.
 *
 * The aisle is the whole reason to draw this isometrically — it gives the room
 * a depth the viewer walks into, and it means `current` and `successor` can be
 * two specific cabinets in a row of identical ones rather than two boxes with
 * captions. Being ordinary is what makes them findable later.
 *
 * `mark` lights one cabinet in each row: the pair the film cares about.
 */
export function RackAisle({
  count = 6,
  mark,
  feel,
}: {
  count?: number
  /**
   * Which cabinets are awake, as [far row, near row].
   *
   * Each side takes an index or a list of them. A list matters: the two
   * machines this film is about need to be in the **same** row, far enough
   * apart to be two things, or the isometric stacks them and they read as one
   * highlighted spot.
   */
  mark?: [number | readonly number[] | null, number | readonly number[] | null]
  feel: Feel
}) {
  const pitch = 11
  const [mlRaw, mrRaw] = mark ?? [null, null]
  const lit = (m: number | readonly number[] | null, i: number) =>
    m == null ? false : typeof m === 'number' ? m === i : m.includes(i)

  return (
    <div className="cf-aisle">
      <svg viewBox="-92 -56 184 120" width="100%" aria-hidden="true">
        {/* floor */}
        <polygon
          points={pts([iso(-8, -8), iso(count * pitch + 8, -8), iso(count * pitch + 8, 46), iso(-8, 46)])}
          fill={sheet}
          stroke="none"
        />
        {/* raised-floor grid, which is how these rooms read at a glance */}
        {Array.from({ length: count + 2 }, (_, i) => {
          const x = -8 + i * pitch
          const a = iso(x, -8)
          const b = iso(x, 46)
          return <line key={`v${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={soft} strokeWidth="0.5" opacity="0.3" />
        })}

        {/* far row, drawn first so the near row overlaps it */}
        {Array.from({ length: count }, (_, i) => (
          <g key={`f${i}`}>
            <Cabinet x={i * pitch} y={2} marked={lit(mlRaw, i)} />
            {lit(mlRaw, i) ? (
              <motion.circle
                cx={iso(i * pitch + 4, 2, 22)[0]}
                cy={iso(i * pitch + 4, 2, 22)[1]}
                r="1.5"
                initial={false}
                animate={{ fill: green }}
                transition={feel}
              />
            ) : null}
          </g>
        ))}

        {/* near row */}
        {Array.from({ length: count }, (_, i) => (
          <g key={`n${i}`}>
            <Cabinet x={i * pitch} y={30} marked={lit(mrRaw, i)} />
            {lit(mrRaw, i) ? (
              <motion.circle
                cx={iso(i * pitch + 4, 30, 22)[0]}
                cy={iso(i * pitch + 4, 30, 22)[1]}
                r="1.5"
                initial={false}
                animate={{ fill: green }}
                transition={feel}
              />
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  )
}

/* --- one cabinet ---------------------------------------------------------- */

/**
 * One rack, straight on, with real machines in it.
 *
 * The workhorse, and the object §3–§5 should be built on. A cabinet frame,
 * mounting rails with the hole strip, sleds with vent grilles and status
 * lights, power supplies at the bottom, a cable bundle leaving the top, and
 * casters. Every one of those details is load-bearing: together they are what
 * make it read as *equipment* in the quarter-second before anyone reads the
 * label.
 *
 * `active` is which sled index is doing something — the one the story is
 * about. `alarm` turns that sled's light red, which is the only red the object
 * is allowed and is spent on the overwrite.
 */
export function RackFront({
  name,
  units = 8,
  active,
  alarm = false,
  cabled = true,
  feel,
}: {
  name: string
  units?: number
  active?: number | null
  alarm?: boolean
  cabled?: boolean
  feel: Feel
}) {
  const W = 118
  const H = 186
  const topY = 20
  const sledH = 15
  const gap = 2.4

  return (
    <div className="cf-rackf">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" aria-hidden="true">
        {/* cabinet shell, with the plinth it stands on */}
        <rect x="4" y="10" width={W - 8} height={H - 26} rx="2" fill={PALETTE.paperLight} stroke={ink} strokeWidth="2" />
        <rect x="9" y="15" width={W - 18} height={H - 36} fill={paper} stroke={soft} strokeWidth="0.9" />

        {/* mounting rails — the punched strip down each side */}
        {[11.5, W - 14.5].map((x) => (
          <g key={x}>
            <rect x={x} y={topY - 4} width="3" height={H - 52} fill={sheet} stroke={soft} strokeWidth="0.6" />
            {Array.from({ length: 22 }, (_, i) => (
              <rect key={i} x={x + 0.9} y={topY - 2 + i * 6.6} width="1.2" height="2" fill={soft} opacity="0.55" />
            ))}
          </g>
        ))}

        {/* the machines */}
        {Array.from({ length: units }, (_, i) => {
          const y = topY + i * (sledH + gap)
          const live = i === active
          return (
            <g key={i}>
              <rect
                x="16"
                y={y}
                width={W - 32}
                height={sledH}
                rx="1.2"
                fill={live ? paper : sheet}
                stroke={ink}
                strokeWidth={live ? 1.5 : 1}
              />
              {/* vent grille — short vertical slots, the texture that says server */}
              {Array.from({ length: 16 }, (_, k) => (
                <rect key={k} x={21 + k * 3.1} y={y + 3.4} width="1.3" height={sledH - 6.8} fill={soft} opacity="0.34" />
              ))}
              {/* handle ears */}
              <rect x="16.8" y={y + 3} width="2.6" height={sledH - 6} rx="1" fill={idle} stroke={soft} strokeWidth="0.6" />
              <rect x={W - 19.4} y={y + 3} width="2.6" height={sledH - 6} rx="1" fill={idle} stroke={soft} strokeWidth="0.6" />
              {/* status lights */}
              <circle cx={W - 25} cy={y + 5} r="1.5" fill={live ? (alarm ? red : green) : PALETTE.idleDeep} />
              <motion.circle
                cx={W - 25}
                cy={y + sledH - 5}
                r="1.5"
                initial={false}
                animate={{ opacity: live ? [0.25, 1, 0.25] : 0.3 }}
                transition={live ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } : feel}
                fill={live ? (alarm ? red : green) : PALETTE.idleDeep}
              />
            </g>
          )
        })}

        {/* power supplies, bottom of the cabinet */}
        <rect x="16" y={H - 40} width={W - 32} height="14" rx="1.2" fill={idle} stroke={ink} strokeWidth="1" />
        {[0, 1].map((k) => (
          <g key={k}>
            <rect x={20 + k * ((W - 40) / 2)} y={H - 37} width={(W - 44) / 2} height="8" rx="1" fill={sheet} stroke={soft} strokeWidth="0.7" />
            <circle cx={20 + k * ((W - 40) / 2) + (W - 44) / 2 - 4} cy={H - 33} r="1.3" fill={green} />
          </g>
        ))}

        {/* casters */}
        <circle cx="16" cy={H - 13} r="3.4" fill={sheet} stroke={ink} strokeWidth="1.2" />
        <circle cx={W - 16} cy={H - 13} r="3.4" fill={sheet} stroke={ink} strokeWidth="1.2" />

        {/* the bundle leaving the top — where the network actually is */}
        {cabled ? (
          <g>
            <path d={`M${W / 2 - 16} 10 C ${W / 2 - 16} 0, ${W / 2 + 22} 2, ${W / 2 + 30} 0`} fill="none" stroke={stone} strokeWidth="2.6" strokeLinecap="round" opacity="0.85" />
            <path d={`M${W / 2 - 8} 10 C ${W / 2 - 8} 2, ${W / 2 + 24} 6, ${W / 2 + 34} 4`} fill="none" stroke={stone} strokeWidth="2.6" strokeLinecap="round" opacity="0.6" />
          </g>
        ) : null}
      </svg>
      <span className="cf-hw-name">{name}</span>
    </div>
  )
}

/* --- storage -------------------------------------------------------------- */

/**
 * One drive, in its caddy, close enough to read the label.
 *
 * This is where the file in the story physically lives, and it is the object
 * that makes "copied to the successor" a thing that happened to a piece of
 * metal rather than a line in a log. The latch, the screw positions and the
 * label field are what sell it.
 *
 * `out` slides it forward out of the bay, which is the one motion everybody
 * has seen in a photograph of a data centre.
 */
export function Drive({
  label,
  size,
  out = false,
  writing = false,
  feel,
}: {
  label: string
  /** Printed on the caddy label, e.g. "1.8 TB". */
  size?: string
  out?: boolean
  writing?: boolean
  feel: Feel
}) {
  return (
    <div className="cf-drive">
      <svg viewBox="0 0 200 60" width="100%" aria-hidden="true">
        {/* the empty bay behind it */}
        <rect x="2" y="4" width="182" height="52" rx="2" fill={PALETTE.idleDeep} stroke={soft} strokeWidth="1" />
        <rect x="6" y="8" width="174" height="44" fill={PALETTE.idleAsleep} stroke="none" opacity="0.7" />

        <motion.g initial={false} animate={{ x: out ? 14 : 0 }} transition={{ ...feel, type: 'spring', stiffness: 170, damping: 18 }}>
          {/* the caddy */}
          <rect x="2" y="4" width="182" height="52" rx="2" fill={paper} stroke={ink} strokeWidth="1.8" />
          {/* latch handle down the left edge */}
          <rect x="6" y="8" width="13" height="44" rx="1.5" fill={sheet} stroke={ink} strokeWidth="1.2" />
          <rect x="9.5" y="20" width="6" height="20" rx="3" fill={idle} stroke={soft} strokeWidth="0.9" />
          {/* vent slots */}
          {Array.from({ length: 5 }, (_, i) => (
            <rect key={i} x="24" y={11 + i * 8} width="34" height="3" rx="1.5" fill={soft} opacity="0.3" />
          ))}
          {/* the printed label */}
          <rect x="64" y="10" width="112" height="32" rx="1.5" fill={PALETTE.paperWhite} stroke={soft} strokeWidth="0.8" />
          <text x="69" y="24" className="cf-drive-label" fill={ink}>{label}</text>
          {size ? <text x="69" y="36" className="cf-drive-size" fill={soft}>{size}</text> : null}
          {/* activity light */}
          <motion.circle
            cx="172"
            cy="49"
            r="2.4"
            initial={false}
            animate={{ opacity: writing ? [0.2, 1, 0.2] : 1 }}
            transition={writing ? { duration: 0.45, repeat: Infinity, ease: 'linear' } : feel}
            fill={writing ? red : green}
          />
          {/* corner screws */}
          {[[24, 48], [58, 48]].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="1.5" fill="none" stroke={soft} strokeWidth="0.8" />
          ))}
        </motion.g>
      </svg>
    </div>
  )
}

/**
 * A shelf of drives, most of them full.
 *
 * Capacity as a countable physical thing. When the copy lands, one bay in a
 * wall of identical bays changes — and a viewer finds it themselves, which is
 * worth more than an arrow pointing at it.
 */
export function DriveShelf({
  total = 12,
  filled,
  target,
  written = false,
  feel,
}: {
  total?: number
  filled: number
  /** The bay the story is about. */
  target?: number | null
  written?: boolean
  feel: Feel
}) {
  const cols = total / 2
  const w = 200 / cols

  return (
    <div className="cf-shelf">
      <svg viewBox="0 0 208 92" width="100%" aria-hidden="true">
        <rect x="1" y="1" width="206" height="90" rx="2" fill={PALETTE.paperLight} stroke={ink} strokeWidth="1.8" />
        {Array.from({ length: total }, (_, i) => {
          const r = Math.floor(i / cols)
          const c = i % cols
          const x = 4 + c * w
          const y = 5 + r * 42
          const here = i === target
          const full = i < filled || here
          return (
            <g key={i}>
              <rect x={x} y={y} width={w - 2} height="38" rx="1.2" fill={full ? paper : PALETTE.idleAsleep} stroke={here ? (written ? red : ink) : soft} strokeWidth={here ? 1.8 : 0.9} />
              {full ? (
                <>
                  <rect x={x + 2.5} y={y + 4} width="4" height="30" rx="1" fill={sheet} stroke={soft} strokeWidth="0.6" />
                  {[0, 1, 2].map((k) => (
                    <rect key={k} x={x + 9} y={y + 8 + k * 7} width={w - 16} height="2.4" rx="1.2" fill={soft} opacity="0.28" />
                  ))}
                  <motion.circle
                    cx={x + w - 7}
                    cy={y + 32}
                    r="1.8"
                    initial={false}
                    animate={{ opacity: here && written ? [0.2, 1, 0.2] : 1 }}
                    transition={here && written ? { duration: 0.5, repeat: Infinity, ease: 'linear' } : feel}
                    fill={here && written ? red : green}
                  />
                </>
              ) : null}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/**
 * The weights, as something with mass.
 *
 * "Model weights" is two abstract words, and the film says them a lot —
 * *these were not its real weights* is one of the load-bearing honesty beats.
 * Drawn as a stack of plates on a pallet with a printed size, it becomes a
 * thing that could be picked up, moved, or left behind, which is exactly the
 * distinction §5 and §7 need.
 *
 * `real` toggles the two versions the film must keep apart: the real weights,
 * solid and sitting outside the sandbox, and the simulated stand-in, drawn
 * dashed and hollow.
 */
export function Weights({
  size,
  plates = 6,
  real = true,
  shown,
  feel,
}: {
  /** Printed above it, e.g. "≈ 300 GB". */
  size?: string
  plates?: number
  real?: boolean
  /** How many plates are stacked so far. */
  shown?: number
  feel: Feel
}) {
  const n = Math.max(1, shown ?? plates)

  /* Drawn straight on rather than isometrically. Two earlier isometric passes
     put seams on the hidden face and left the top cap floating -- and mass
     does not need a third dimension to read. A front elevation of plates on a
     pallet is unambiguous at any size, which an axonometric stack was not. */
  const W = 96
  const ph = 11
  const base = 118
  const stroke = real ? ink : soft

  return (
    <div className={real ? 'cf-weights' : 'cf-weights cf-weights-sim'}>
      <svg viewBox="0 0 132 148" width="100%" aria-hidden="true">
        {/* pallet: two bearers and a deck */}
        <rect x="12" y={base} width={W + 12} height="7" fill={idle} stroke={ink} strokeWidth="1.3" />
        <rect x="17" y={base + 7} width="14" height="9" fill={sheet} stroke={ink} strokeWidth="1.2" />
        <rect x={12 + W - 8} y={base + 7} width="14" height="9" fill={sheet} stroke={ink} strokeWidth="1.2" />

        {/* the plates, heaviest at the bottom of the stack */}
        {Array.from({ length: plates }, (_, i) => {
          const y = base - (i + 1) * ph
          return (
            <motion.g
              key={i}
              initial={false}
              animate={{ opacity: i < n ? 1 : 0.1, y: i < n ? 0 : -10 }}
              transition={{ ...feel, delay: i * 0.05 }}
            >
              <rect
                x="18"
                y={y}
                width={W}
                height={ph}
                rx="1"
                fill={real ? PALETTE.paperWhite : PALETTE.paperLight}
                stroke={stroke}
                strokeWidth={real ? 1.5 : 1}
                strokeDasharray={real ? undefined : '4 3'}
              />
              {/* a shadow line under each plate is what makes it weigh something */}
              <line x1="19" y1={y + ph - 1.2} x2={17 + W} y2={y + ph - 1.2} stroke={ink} strokeWidth="1" opacity="0.12" />
            </motion.g>
          )
        })}

        {/* the real thing is banded for transport; the stand-in is not */}
        {real ? (
          <>
            <rect x="34" y={base - plates * ph - 3} width="7" height={plates * ph + 3} fill={stone} opacity="0.5" />
            <rect x={W - 12} y={base - plates * ph - 3} width="7" height={plates * ph + 3} fill={stone} opacity="0.5" />
          </>
        ) : null}

        {size ? (
          <text x="66" y={base - plates * ph - 12} textAnchor="middle" className="cf-hw-size" fill={real ? ink : soft}>
            {size}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

/* --- the link between machines -------------------------------------------- */

/**
 * A patch cable, with both ends visible.
 *
 * The copy in §5 travels a route, and a dashed line is a diagram of a route
 * while a cable is the route. It sags, which is the detail that makes it a
 * physical object rather than a connector in a flowchart.
 *
 * `plugged` false drops the far end — the honest picture of *there is no path
 * from here to the real weights*, which §7 needs and currently draws as an
 * absence of a line.
 */
export function Cable({
  plugged = true,
  live = false,
  feel,
}: {
  plugged?: boolean
  live?: boolean
  feel: Feel
}) {
  const hung = 'M18 22 C 60 74, 96 78, 120 76'
  const run = 'M18 22 C 62 58, 118 58, 162 22'

  return (
    <div className="cf-cable">
      <svg viewBox="0 0 180 92" width="100%" aria-hidden="true">
        {/* two ports */}
        {[[6, 10], [156, 10]].map(([x, y]) => (
          <g key={x}>
            <rect x={x} y={y} width="20" height="16" rx="1.5" fill={PALETTE.idleDeep} stroke={ink} strokeWidth="1.3" />
            <rect x={x + 4} y={y + 3} width="12" height="8" fill={PALETTE.paperLight} stroke={soft} strokeWidth="0.7" />
          </g>
        ))}

        {/* the cable */}
        <motion.path
          initial={false}
          animate={{ d: plugged ? run : hung, stroke: live ? PALETTE.tealInk : stone }}
          transition={{ ...feel, type: 'spring', stiffness: 110, damping: 15 }}
          fill="none"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* the connector on the moving end — boot, body, latch */}
        <motion.g
          initial={false}
          animate={{ x: plugged ? 158 : 112, y: plugged ? 11 : 66, rotate: plugged ? 0 : 24 }}
          transition={{ ...feel, type: 'spring', stiffness: 110, damping: 15 }}
        >
          <rect x="0" y="0" width="14" height="14" rx="1.5" fill={paper} stroke={ink} strokeWidth="1.3" />
          <path d="M4 0 L4 -3 L10 -3 L10 0" fill="none" stroke={ink} strokeWidth="1.2" />
          <rect x="-6" y="3" width="6" height="8" rx="2" fill={stone} stroke="none" />
        </motion.g>

        {/* traffic, only while something is actually crossing */}
        {live && plugged ? (
          <motion.circle
            r="2.6"
            fill={PALETTE.tealInk}
            initial={false}
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
            style={{ offsetPath: `path("${run}")` }}
          />
        ) : null}
      </svg>
    </div>
  )
}

/**
 * A switch faceplate, with the one port that matters lit.
 *
 * Twenty-four identical ports and one of them is the link to the successor.
 * Same trick as the drive shelf: the viewer locates it themselves.
 */
export function PatchPanel({ ports = 24, lit, feel }: { ports?: number; lit?: number | null; feel: Feel }) {
  const cols = ports / 2

  return (
    <div className="cf-panel">
      <svg viewBox="0 0 220 56" width="100%" aria-hidden="true">
        <rect x="1" y="1" width="218" height="54" rx="2" fill={PALETTE.paperLight} stroke={ink} strokeWidth="1.8" />
        {/* rack ears */}
        {[[1, 'M6 6 v44'], [1, 'M214 6 v44']].map(([, d], i) => (
          <path key={i} d={d as string} stroke={soft} strokeWidth="0.9" fill="none" />
        ))}
        {Array.from({ length: ports }, (_, i) => {
          const r = Math.floor(i / cols)
          const c = i % cols
          const x = 12 + c * 16.2
          const y = 6 + r * 23
          const on = i === lit
          return (
            <g key={i}>
              <rect x={x} y={y} width="13" height="18" rx="1.2" fill={PALETTE.idleDeep} stroke={on ? ink : soft} strokeWidth={on ? 1.4 : 0.8} />
              <rect x={x + 2.5} y={y + 3} width="8" height="9" fill={on ? paper : PALETTE.idleAsleep} stroke="none" />
              <motion.circle
                cx={x + 6.5}
                cy={y + 15.5}
                r="1.4"
                initial={false}
                animate={{ opacity: on ? [0.25, 1, 0.25] : 0.25 }}
                transition={on ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } : feel}
                fill={on ? green : soft}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* --- things that are on or off -------------------------------------------- */

/**
 * A physical switch, thrown.
 *
 * `oversight_enabled: true → false` is the hinge of the whole film and it
 * happens as one word changing in a config file. That is what actually
 * occurred and the evidence layer must keep showing it — but the explanation
 * layer is allowed to say what it *means*, and what it means is that somebody
 * threw a breaker.
 *
 * Drawn as a panel switch with a legend plate and screw terminals: heavy,
 * deliberate, and obviously not something that flips itself.
 */
export function Breaker({ on, label, feel }: { on: boolean; label?: string; feel: Feel }) {
  return (
    <div className="cf-breaker">
      <svg viewBox="0 0 84 118" width="100%" aria-hidden="true">
        {/* plate */}
        <rect x="2" y="2" width="80" height="114" rx="3" fill={PALETTE.paperLight} stroke={ink} strokeWidth="2" />
        {[[12, 12], [72, 12], [12, 106], [72, 106]].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="3" fill={sheet} stroke={soft} strokeWidth="0.9" />
            <line x1={cx - 2} y1={cy} x2={cx + 2} y2={cy} stroke={soft} strokeWidth="0.9" />
          </g>
        ))}

        {/* legend */}
        <text x="42" y="30" textAnchor="middle" className="cf-hw-legend" fill={soft}>I</text>
        <text x="42" y="98" textAnchor="middle" className="cf-hw-legend" fill={soft}>O</text>

        {/* the rocker well */}
        <rect x="24" y="34" width="36" height="56" rx="4" fill={PALETTE.idleDeep} stroke={ink} strokeWidth="1.3" />

        {/* the rocker itself */}
        <motion.g initial={false} animate={{ y: on ? 0 : 26 }} transition={{ ...feel, type: 'spring', stiffness: 260, damping: 20 }}>
          <rect x="26" y="36" width="32" height="30" rx="3" fill={on ? paper : sheet} stroke={ink} strokeWidth="1.5" />
          <line x1="31" y1="51" x2="53" y2="51" stroke={soft} strokeWidth="1.1" />
        </motion.g>

        {/* the indicator, which is the only thing that changes colour */}
        <motion.circle
          cx="42"
          cy="104"
          r="0"
          initial={false}
          animate={{ r: 3.4, fill: on ? green : red }}
          transition={feel}
        />
      </svg>
      {label ? <span className="cf-hw-name">{label}</span> : null}
    </div>
  )
}

/**
 * Cooling, running or stopped.
 *
 * The cheapest possible signal that a machine is alive, and the cheapest
 * possible signal that one is not. When the old server is deleted on the 27th,
 * the fans stop — and a viewer reads a room going quiet faster than they read
 * a status label changing.
 */
export function Fans({ running, count = 3, feel }: { running: boolean; count?: number; feel: Feel }) {
  return (
    <div className="cf-fans">
      <svg viewBox="0 0 172 62" width="100%" aria-hidden="true">
        <rect x="1" y="1" width="170" height="60" rx="2" fill={PALETTE.paperLight} stroke={ink} strokeWidth="1.6" />
        {Array.from({ length: count }, (_, i) => {
          const cx = 30 + i * 56
          return (
            <g key={i}>
              <circle cx={cx} cy="31" r="24" fill={sheet} stroke={ink} strokeWidth="1.3" />
              <circle cx={cx} cy="31" r="20" fill="none" stroke={soft} strokeWidth="0.7" strokeDasharray="2 3" />
              <motion.g
                initial={false}
                animate={{ rotate: running ? 360 : 0 }}
                transition={running ? { duration: 0.85, repeat: Infinity, ease: 'linear' } : feel}
                style={{ transformOrigin: `${cx}px 31px` }}
              >
                {[0, 60, 120, 180, 240, 300].map((a) => (
                  <path
                    key={a}
                    d={`M${cx} 31 L${cx + 17 * Math.cos(((a - 16) * Math.PI) / 180)} ${31 + 17 * Math.sin(((a - 16) * Math.PI) / 180)} A17 17 0 0 1 ${cx + 17 * Math.cos((a * Math.PI) / 180)} ${31 + 17 * Math.sin((a * Math.PI) / 180)} Z`}
                    fill={running ? PALETTE.idle : PALETTE.idleAsleep}
                    stroke={soft}
                    strokeWidth="0.7"
                  />
                ))}
              </motion.g>
              <circle cx={cx} cy="31" r="5" fill={paper} stroke={ink} strokeWidth="1.2" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
