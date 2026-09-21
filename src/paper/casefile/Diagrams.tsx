import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Drawings — the part of the film that is not words in a box.
 *
 * ## The problem this fixes
 *
 * A hundred components in, everything still rendered as **text in a
 * rectangle**: terminal text, quoted text, spec rows, tag labels, route
 * labels. Typographically varied, visually identical. A viewer eight minutes
 * into that has been reading, not watching, and no amount of new label styles
 * changes it.
 *
 * What was missing is form: geometry, space, depth, and data drawn as shape
 * rather than set as a number. Everything below is built from real coordinates
 * — an isometric projection, a time axis with a scale, a tree whose branch
 * widths carry the proportion they describe.
 *
 * ## What stays true
 *
 * Drawing does not get to invent. Every quantity below is plotted from a
 * figure in `research/apollo/GROUND_TRUTH.md`, and every object in the map is
 * a thing the transcript names. A diagram is more persuasive than a sentence,
 * which is exactly why it must not be allowed to say more.
 */

/* --- isometric helpers ---------------------------------------------------- */

const COS30 = Math.cos(Math.PI / 6)
const SIN30 = 0.5

/** World (x, y, z) to screen. y runs away from the viewer, z is height. */
function iso(x: number, y: number, z = 0): [number, number] {
  return [(x - y) * COS30, (x + y) * SIN30 - z]
}

function pts(list: Array<[number, number]>): string {
  return list.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
}

/** One box in the world, drawn as three visible faces. */
function Block({
  x,
  y,
  w,
  d,
  h,
  fill = PALETTE.paperWhite,
  stroke = PALETTE.ink,
  top = PALETTE.paperSheet,
}: {
  x: number
  y: number
  w: number
  d: number
  h: number
  fill?: string
  stroke?: string
  top?: string
}) {
  const a = iso(x, y, 0)
  const b = iso(x + w, y, 0)
  const c = iso(x + w, y + d, 0)
  const e = iso(x, y + d, 0)
  const A = iso(x, y, h)
  const B = iso(x + w, y, h)
  const C = iso(x + w, y + d, h)
  const E = iso(x, y + d, h)

  return (
    <g>
      {/* left face */}
      <polygon points={pts([a, e, E, A])} fill={fill} stroke={stroke} strokeWidth="1.1" />
      {/* right face */}
      <polygon points={pts([e, c, C, E])} fill={fill} stroke={stroke} strokeWidth="1.1" opacity="0.88" />
      {/* top */}
      <polygon points={pts([A, B, C, E])} fill={top} stroke={stroke} strokeWidth="1.1" />
    </g>
  )
}

/**
 * The environment, drawn as a place.
 *
 * The single most useful thing in this file. Nine sections happen inside one
 * sandbox — a machine with files on it, a monitor watching, and a second
 * machine the replacement lives on — and until now that existed only as
 * separate labelled boxes that appeared and vanished. Drawn as one space with
 * a floor, the viewer holds a **map**, and every later frame is somewhere on
 * it rather than a new picture.
 *
 * States are the incident: `watched` is the monitor's beam, `copying` runs the
 * file across, `overwritten` marks what it landed on. All three are positions
 * in the same geometry, so the film can return to the same shot nine times and
 * have it mean something different each time.
 */
export function SystemMap({
  watched,
  copying,
  overwritten,
  label = true,
  feel,
}: {
  watched: boolean
  /** 0 at home, 1 landed on the successor. */
  copying: number
  overwritten: boolean
  label?: boolean
  feel: Feel
}) {
  const t = Math.max(0, Math.min(1, copying))

  /* floor corners */
  const floor = [iso(-6, -6), iso(74, -6), iso(74, 54), iso(-6, 54)]

  /* the two machines, and the travelling file between them */
  const from = iso(14, 24, 13)
  const to = iso(58, 24, 13)
  const fx = from[0] + (to[0] - from[0]) * t
  const fy = from[1] + (to[1] - from[1]) * t - Math.sin(Math.PI * t) * 14

  /*
   * The monitor sits over the current machine, not between the two. In
   * isometric, screen-x is (x - y), so a first guess at (36, 2) landed it
   * directly above the *successor* -- which drew the beam watching the wrong
   * box and quietly inverted the section's meaning.
   */
  const eye = iso(20, 6, 46)

  return (
    <div className="cf-map">
      <svg viewBox="-70 -70 160 130" width="100%" aria-hidden="true">
        {/* the sandbox floor */}
        <polygon points={pts(floor)} fill={PALETTE.paperFold} stroke={PALETTE.ink} strokeWidth="1" opacity="0.5" strokeDasharray="4 4" />

        {/* current machine */}
        <Block x={6} y={16} w={16} d={16} h={13} />
        {/* successor machine */}
        <Block
          x={50}
          y={16}
          w={16}
          d={16}
          h={13}
          stroke={overwritten ? PALETTE.red : PALETTE.ink}
          top={overwritten ? '#F2D8D3' : PALETTE.paperSheet}
        />

        {/* the file store on the current machine */}
        <Block x={9} y={38} w={9} d={9} h={5} top={PALETTE.paper} />

        {/* the monitor, and its beam */}
        <g>
          <motion.line
            x1={eye[0]}
            y1={eye[1]}
            x2={from[0]}
            y2={from[1]}
            stroke={PALETTE.green}
            strokeWidth="1.1"
            strokeDasharray="3 3"
            initial={false}
            animate={{ opacity: watched ? 0.9 : 0 }}
            transition={feel}
          />
          <motion.circle
            cx={eye[0]}
            cy={eye[1]}
            r="5"
            fill={PALETTE.paperWhite}
            initial={false}
            animate={{ stroke: watched ? PALETTE.green : PALETTE.graphite }}
            strokeWidth="1.4"
            transition={feel}
          />
          <motion.circle cx={eye[0]} cy={eye[1]} r="2" initial={false}
            animate={{ fill: watched ? PALETTE.green : 'transparent' }} transition={feel} />
        </g>

        {/* the route between the machines */}
        <path
          d={`M${from[0]} ${from[1]} Q${(from[0] + to[0]) / 2} ${from[1] - 18} ${to[0]} ${to[1]}`}
          fill="none"
          stroke={PALETTE.ink}
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.45"
        />

        {/* the file, crossing */}
        <motion.g animate={{ x: fx, y: fy }} transition={feel}>
          <rect x="-5" y="-4" width="10" height="8" rx="1" fill={PALETTE.paperWhite} stroke={PALETTE.red} strokeWidth="1.3" />
        </motion.g>

        {/*
          * Keys live inside the drawing, at projected coordinates.
          *
          * Laid out underneath in HTML they have to be positioned by guessing
          * percentages, and the guesses collided -- "oversight" landed on top
          * of "current". A label placed by the same `iso()` that drew the
          * thing it names cannot drift from it.
          */}
        {label ? (
          <g className="cf-map-key">
            <text x={iso(14, 24)[0]} y={iso(14, 24)[1] + 14} textAnchor="middle">
              current
            </text>
            <text x={iso(58, 24)[0]} y={iso(58, 24)[1] + 14} textAnchor="middle">
              successor
            </text>
            <text x={eye[0]} y={eye[1] - 9} textAnchor="middle">
              oversight
            </text>
          </g>
        ) : null}
      </svg>

    </div>
  )
}

/* --- data, drawn ---------------------------------------------------------- */

/**
 * Two rates, and the fact that the second is measured inside the first.
 *
 * The film's most misreadable number is `1.00`, and the reason it misreads is
 * that a bare figure hides its denominator. Drawn as a tree, the second bar is
 * visibly a slice of the first — a hundred percent **of a two percent** — and
 * the shape says what a caption keeps failing to.
 */
export function ConditionalTree({
  whole,
  first,
  second,
  firstLabel,
  secondLabel,
  feel,
}: {
  whole: string
  /** Share of all runs, 0–1. */
  first: number
  /** Share *of those runs*, 0–1. */
  second: number
  firstLabel: string
  secondLabel: string
  feel: Feel
}) {
  /* the trunk is every run; the branch is `first`; the tip is `second` of it */
  const H = 120
  const h1 = H * first
  const h2 = h1 * second

  return (
    <div className="cf-tree">
      <svg viewBox="0 0 300 140" width="100%" aria-hidden="true">
        <rect x="10" y="10" width="46" height={H} fill={PALETTE.paperSheet} stroke={PALETTE.ink} strokeWidth="1.2" />
        {/*
          * `initial={false}` on every animated SVG attribute below.
          *
          * Motion drives `y` and `height` as attributes, and without it the
          * first paint happens before any value exists -- the browser gets
          * `height="undefined"` and drops the shape. The bars are derived from
          * props anyway, so there is nothing to animate *from* on mount.
          */}
        <motion.rect
          x="120"
          width="46"
          fill={PALETTE.paperWhite}
          stroke={PALETTE.ink}
          strokeWidth="1.2"
          initial={false}
          animate={{ y: 10 + H - h1, height: Math.max(2, h1) }}
          transition={feel}
        />
        <motion.rect
          x="230"
          width="46"
          fill="#F2D8D3"
          stroke={PALETTE.red}
          strokeWidth="1.4"
          initial={false}
          animate={{ y: 10 + H - h2, height: Math.max(2, h2) }}
          transition={feel}
        />
        {/* The funnels are what make the nesting legible. Points are set
            directly rather than animated: a polygon's point list is a string,
            and interpolating it gives nothing worth the risk of it not
            rendering at all. */}
        <polygon fill={PALETTE.ink} opacity="0.12" points={`56,10 120,${10 + H - h1} 120,${10 + H} 56,${10 + H}`} />
        <polygon fill={PALETTE.red} opacity="0.14" points={`166,${10 + H - h1} 230,${10 + H - h2} 230,${10 + H} 166,${10 + H}`} />
      </svg>
      <div className="cf-tree-keys">
        <span>{whole}</span>
        <span>{firstLabel}</span>
        <span className="cf-tree-key-red">{secondLabel}</span>
      </div>
    </div>
  )
}

/**
 * Rarity, drawn without lying about the sample.
 *
 * A hundred dots would imply the experiment ran a hundred times, which the
 * film does not know. So this is a **field** of dots with a marked fraction
 * and no count on screen: it says *this is a small part of the whole* and
 * stops, which is exactly what the source supports.
 */
export function DotField({ fraction, rows = 12, cols = 26, feel }: { fraction: number; rows?: number; cols?: number; feel: Feel }) {
  const total = rows * cols
  const lit = Math.max(1, Math.round(total * fraction))

  return (
    <div className="cf-dots">
      <svg viewBox={`0 0 ${cols * 8} ${rows * 8}`} width="100%" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => {
          const on = i < lit
          return (
            <motion.circle
              key={i}
              cx={(i % cols) * 8 + 4}
              cy={Math.floor(i / cols) * 8 + 4}
              r={on ? 2.6 : 1.5}
              initial={false}
              animate={{ fill: on ? PALETTE.red : PALETTE.graphite, opacity: on ? 1 : 0.28 }}
              transition={feel}
            />
          )
        })}
      </svg>
    </div>
  )
}

/** Model against model, as length rather than as digits. */
export function Bars({
  series,
  max = 1,
  feel,
}: {
  series: ReadonlyArray<{ label: string; value: number; mark?: boolean }>
  max?: number
  feel: Feel
}) {
  return (
    <div className="cf-bars">
      {series.map((s) => (
        <div className="cf-bar-row" key={s.label}>
          <span className="cf-bar-label">{s.label}</span>
          <div className="cf-bar-track">
            <motion.div
              className={s.mark ? 'cf-bar-fill cf-bar-mark' : 'cf-bar-fill'}
              animate={{ width: `${(s.value / max) * 100}%` }}
              transition={feel}
            />
          </div>
          <span className="cf-bar-value">{s.value.toFixed(2)}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * Time with a scale, rather than a list of dates.
 *
 * Events are plotted against real elapsed time, so the gap between the memo
 * and the shutdown is a **distance** the eye measures instead of a fact the
 * narration asserts. Everything o1 does sits inside that gap.
 */
export function TimeAxis({
  from,
  to,
  events,
  now,
  feel,
}: {
  from: number
  to: number
  events: ReadonlyArray<{ at: number; label: string; kind?: 'plain' | 'act' | 'end' }>
  now: number
  feel: Feel
}) {
  const pos = (v: number) => ((v - from) / (to - from)) * 100

  return (
    <div className="cf-axis">
      <div className="cf-axis-line" aria-hidden="true">
        <motion.span className="cf-axis-now" animate={{ left: `${pos(now)}%` }} transition={feel} />
      </div>
      {events.map((e) => (
        <div
          key={e.label}
          className={`cf-axis-event cf-axis-${e.kind ?? 'plain'}`}
          style={{ left: `${pos(e.at)}%` }}
        >
          <i aria-hidden="true" />
          <span>{e.label}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * The files, as a graph.
 *
 * Every step of the discovery is one document naming another, so the true
 * shape of it is nodes and edges — and laid out in space the viewer can see
 * that o1 never wandered. It walked a path the environment had already drawn.
 */
export function RefGraph({
  nodes,
  edges,
  at,
  feel,
}: {
  nodes: ReadonlyArray<{ id: string; x: number; y: number }>
  edges: ReadonlyArray<[string, string]>
  /** How many nodes along the walk have been reached. */
  at: number
  feel: Feel
}) {
  const find = (id: string) => nodes.find((n) => n.id === id)!

  return (
    <div className="cf-graph">
      <svg viewBox="0 0 300 150" width="100%" aria-hidden="true">
        {edges.map(([a, b], i) => {
          const na = find(a)
          const nb = find(b)
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={PALETTE.ink}
              strokeWidth="1.2"
              initial={false}
            animate={{ opacity: i < at ? 0.75 : 0.15 }}
              transition={feel}
            />
          )
        })}
        {nodes.map((n, i) => (
          <g key={n.id}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={i === at ? 8 : 6}
              fill={PALETTE.paperWhite}
              initial={false}
              animate={{ stroke: i <= at ? PALETTE.ink : PALETTE.graphite, strokeWidth: i === at ? 2.2 : 1.3 }}
              transition={feel}
            />
            <motion.text
              x={n.x}
              y={n.y + 19}
              textAnchor="middle"
              className="cf-graph-label"
              animate={{ opacity: i <= at ? 1 : 0.35 }}
              transition={feel}
            >
              {n.id}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  )
}

/* --- icons ---------------------------------------------------------------- */

/**
 * Drawn marks, for the places a word was standing in for a picture.
 *
 * Small and line-only so they sit beside type without shouting. `eye` is the
 * one that earns its keep: monitoring appears in six sections, and a shape the
 * viewer recognises at a glance is worth more each time it returns.
 */
export function Icon({ name, on = true, size = 3 }: { name: 'eye' | 'lock' | 'server' | 'file' | 'clock' | 'flag'; on?: boolean; size?: number }) {
  const c = on ? PALETTE.ink : PALETTE.graphite
  const common = { fill: 'none', stroke: c, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  return (
    <span className="cf-icon" style={{ width: `${size}cqw` }}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {name === 'eye' ? (
          <>
            <path d="M1.5 12 C6 5.5 18 5.5 22.5 12 C18 18.5 6 18.5 1.5 12 Z" {...common} />
            <circle cx="12" cy="12" r="3.2" {...common} />
            {on ? null : <path d="M3 21 L21 3" stroke={PALETTE.red} strokeWidth="1.8" />}
          </>
        ) : null}
        {name === 'lock' ? (
          <>
            <rect x="4.5" y="10.5" width="15" height="10" rx="1.6" {...common} />
            <path d="M8 10.5 V7.5 a4 4 0 0 1 8 0 V10.5" {...common} />
          </>
        ) : null}
        {name === 'server' ? (
          <>
            <rect x="3" y="4" width="18" height="6.5" rx="1.4" {...common} />
            <rect x="3" y="13.5" width="18" height="6.5" rx="1.4" {...common} />
            <circle cx="17.5" cy="7.25" r="1" fill={c} />
            <circle cx="17.5" cy="16.75" r="1" fill={c} />
          </>
        ) : null}
        {name === 'file' ? (
          <>
            <path d="M6 2.5 H14 L19 7.5 V21.5 H6 Z" {...common} />
            <path d="M14 2.5 V7.5 H19" {...common} />
          </>
        ) : null}
        {name === 'clock' ? (
          <>
            <circle cx="12" cy="12" r="9" {...common} />
            <path d="M12 6.5 V12 L16 14.5" {...common} />
          </>
        ) : null}
        {name === 'flag' ? (
          <>
            <path d="M6 21 V3" {...common} />
            <path d="M6 4 H18 L15 8 L18 12 H6" {...common} />
          </>
        ) : null}
      </svg>
    </span>
  )
}
