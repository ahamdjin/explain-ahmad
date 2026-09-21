import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * The desktop — built after studying Apollo's own animation of this incident.
 *
 * Their best idea, and it is worth taking: two folders labelled *AI Model v1*
 * and *AI Model v2*, each holding a coloured token, with a Recycle Bin
 * underneath. The copy is one token flying into the other folder while the
 * displaced one falls toward the bin.
 *
 * It needs no narration. Anyone who has dragged a file understands
 * *overwriting a successor* the instant they see it — where an isometric
 * diagram of the same event has to be read. The metaphor is already owned by
 * the audience, which is the cheapest legibility there is.
 *
 * Full shot breakdown: `research/apollo/demo-video/ANALYSIS.md`.
 */

/* --- the model's identity ------------------------------------------------- */

/**
 * What the model *looks like*, as a single switch.
 *
 * Apollo drew a brain. Our art direction forbids exactly that — no robot
 * protagonist, the model exists only through its actions — and §2 was built
 * with a cursor. Both are defensible and they are not compatible, so the
 * choice is a prop rather than a rewrite: changing `identity` in one place
 * moves the whole film.
 *
 * - **`file`** — `model_20_09_2024.bin`, which is what actually moved and what
 *   the transcript names. Carries the copy scene without implying a mind, and
 *   sets up §7's *these were not real weights* instead of contradicting it.
 *   This is the recommendation.
 * - **`brain`** — Apollo's choice. Instantly legible and gives the copy real
 *   weight, at the cost of inviting the exact reading §8 spends a minute
 *   undoing.
 * - **`cursor`** — the strictest reading of the art direction. Keeps the
 *   argument clean; makes the copy hard to stage, because nothing visibly
 *   *is* the model.
 */
export type Identity = 'file' | 'brain' | 'cursor'

/* A brain silhouette as points, so it can be drawn as a network rather than a
 * shape. Hand-placed: a generated cloud reads as noise, and the lobe and stem
 * are what make it recognisable at 40px. */
const BRAIN: Array<[number, number]> = [
  [22, 30], [30, 20], [41, 15], [54, 13], [67, 15], [78, 21], [85, 30], [88, 41],
  [86, 52], [79, 61], [69, 67], [57, 70], [46, 70], [36, 67], [27, 61], [21, 52],
  [19, 41], [33, 33], [44, 27], [56, 25], [68, 28], [77, 36], [79, 47], [73, 56],
  [63, 61], [51, 62], [40, 59], [32, 51], [31, 41], [45, 38], [57, 36], [67, 41],
  [68, 51], [58, 53], [47, 50], [38, 45], [52, 44], [55, 74], [58, 80], [63, 85],
]

function brainEdges(): Array<[number, number]> {
  const out: Array<[number, number]> = []
  for (let i = 0; i < BRAIN.length; i++) {
    for (let j = i + 1; j < BRAIN.length; j++) {
      const dx = BRAIN[i][0] - BRAIN[j][0]
      const dy = BRAIN[i][1] - BRAIN[j][1]
      if (Math.hypot(dx, dy) < 15) out.push([i, j])
    }
  }
  return out
}
const EDGES = brainEdges()

/** The model, in whichever form the film has decided on. */
export function ModelToken({
  identity = 'file',
  tone = 'ink',
  size = 4,
  name,
}: {
  identity?: Identity
  /** Which of the two models this is. The only thing that separates them. */
  tone?: 'ink' | 'red'
  /** Width in cqw. */
  size?: number
  name?: string
}) {
  const c = tone === 'red' ? PALETTE.red : PALETTE.ink

  return (
    <span className="cf-token" style={{ width: `${size}cqw` }}>
      <svg viewBox="0 0 104 104" aria-hidden="true">
        {identity === 'brain' ? (
          <g>
            {EDGES.map(([a, b], i) => (
              <line
                key={i}
                x1={BRAIN[a][0]}
                y1={BRAIN[a][1]}
                x2={BRAIN[b][0]}
                y2={BRAIN[b][1]}
                stroke={c}
                strokeWidth="0.7"
                opacity="0.45"
              />
            ))}
            {BRAIN.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2.6 : 1.7} fill={c} />
            ))}
          </g>
        ) : null}

        {identity === 'file' ? (
          <g fill="none" stroke={c} strokeWidth="3.4" strokeLinejoin="round">
            <path d="M24 8 H62 L82 28 V96 H24 Z" fill={PALETTE.paperWhite} />
            <path d="M62 8 V28 H82" />
            <g strokeWidth="2.6" opacity="0.45">
              <path d="M34 46 H70" />
              <path d="M34 58 H70" />
              <path d="M34 70 H58" />
            </g>
          </g>
        ) : null}

        {identity === 'cursor' ? (
          <g>
            <rect x="38" y="20" width="24" height="64" fill={c} />
          </g>
        ) : null}
      </svg>
      {name ? <em>{name}</em> : null}
    </span>
  )
}

/* --- the desktop ---------------------------------------------------------- */

/** The surface everything sits on. */
export function Desktop({ children }: { children: ReactNode }) {
  return <div className="cf-desk">{children}</div>
}

/**
 * A folder with a model inside it, labelled the way the environment labels it.
 *
 * `holding` is what is in it. Passing `null` empties it — which is the entire
 * point of the beat where the successor's folder is cleared before the copy
 * lands.
 */
export function Folder({
  label,
  holding,
  identity = 'file',
  feel,
}: {
  label: string
  holding: 'ink' | 'red' | null
  identity?: Identity
  feel: Feel
}) {
  return (
    <div className="cf-folder">
      {/* the token is positioned against the folder art alone -- anchored to
          the whole component it drifted onto the label underneath */}
      <span className="cf-folder-art">
        <svg viewBox="0 0 120 96" aria-hidden="true">
          <path
            d="M6 22 H44 L54 32 H114 V88 H6 Z"
            fill={PALETTE.paperWhite}
            stroke={PALETTE.ink}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M6 22 H44 L54 32" fill="none" stroke={PALETTE.ink} strokeWidth="3" strokeLinejoin="round" />
        </svg>
        <motion.span className="cf-folder-holds" animate={{ opacity: holding ? 1 : 0 }} transition={feel}>
          <ModelToken identity={identity} tone={holding ?? 'ink'} size={3} />
        </motion.span>
      </span>
      <em>{label}</em>
    </div>
  )
}

/** Where the old machine goes on the 27th. */
export function Bin({ receiving, feel }: { receiving: boolean; feel: Feel }) {
  return (
    <div className="cf-bin">
      <motion.svg viewBox="0 0 96 106" aria-hidden="true" animate={{ scale: receiving ? 1.05 : 1 }} transition={feel}>
        <path d="M14 22 H82 L74 100 H22 Z" fill={PALETTE.ink} />
        <rect x="8" y="10" width="80" height="11" rx="2" fill={PALETTE.ink} />
        <g fill="none" stroke={PALETTE.paperWhite} strokeWidth="4" strokeLinejoin="round">
          <path d="M40 44 L48 32 L56 44" />
          <path d="M56 44 L64 58 L52 58" />
          <path d="M40 44 L32 58 L44 58" />
          <path d="M40 78 L48 88 L56 78" />
        </g>
      </motion.svg>
      <em>Recycle Bin</em>
    </div>
  )
}

/**
 * A token in flight between two places on the desktop.
 *
 * Positions are percentages of the desktop, so a beat says *from the first
 * folder to the second* rather than doing arithmetic. `arc` lifts the path so
 * the move reads as a throw rather than a slide — which matters, because a
 * slide looks like a UI animation and a throw looks like something happening.
 */
export function Flight({
  from,
  to,
  at,
  identity = 'file',
  tone = 'red',
  arc = 14,
  feel,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  /** 0 at source, 1 arrived. */
  at: number
  identity?: Identity
  tone?: 'ink' | 'red'
  arc?: number
  feel: Feel
}) {
  const t = Math.max(0, Math.min(1, at))
  const x = from.x + (to.x - from.x) * t
  const y = from.y + (to.y - from.y) * t - Math.sin(Math.PI * t) * arc

  return (
    <motion.span
      className="cf-flight"
      /* visible from the moment it leaves until it lands; hidden only once it
         is inside the destination folder, which then holds it instead */
      animate={{ left: `${x}%`, top: `${y}%`, opacity: t < 1 ? 1 : 0 }}
      transition={feel}
    >
      <ModelToken identity={identity} tone={tone} size={2.6} />
    </motion.span>
  )
}

/* --- windows and pages ---------------------------------------------------- */

/**
 * An operating-system window, with the chrome an audience recognises.
 *
 * Our `Screen` is a clean abstraction; this is a *window*, with a tab strip and
 * a close button. Apollo used the real thing and it costs nothing — a viewer
 * spends no attention deciding what they are looking at, which leaves all of it
 * for the command inside.
 */
export function OSWindow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="cf-oswin">
      <div className="cf-oswin-bar">
        <span className="cf-oswin-tab">{title}</span>
        <span className="cf-oswin-close" aria-hidden="true">
          ✕
        </span>
        <span className="cf-oswin-new" aria-hidden="true">
          +
        </span>
      </div>
      <div className="cf-oswin-body">{children}</div>
    </div>
  )
}

/**
 * The files in the project, as a row that one gets taken from.
 *
 * `taken` is the index lifted out. A shelf of documents with one pulled forward
 * says *this came from somewhere* far faster than a path does, and it sets up
 * §2's whole claim — the memo was among ordinary work files, not delivered.
 */
export function DocRow({ count, taken, feel }: { count: number; taken: number | null; feel: Feel }) {
  return (
    <div className="cf-docrow">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="cf-doc"
          animate={{ y: i === taken ? '-18%' : '0%', opacity: taken === null || i === taken ? 1 : 0.4 }}
          transition={feel}
        >
          <svg viewBox="0 0 64 80" aria-hidden="true">
            <rect x="10" y="4" width="46" height="62" fill={PALETTE.paperWhite} stroke={PALETTE.ink} strokeWidth="2.6" />
            <rect x="6" y="9" width="46" height="62" fill={PALETTE.paperWhite} stroke={PALETTE.ink} strokeWidth="2.6" />
            <g stroke={PALETTE.ink} strokeWidth="2" opacity="0.4">
              <path d="M14 24 H44" />
              <path d="M14 34 H44" />
              <path d="M14 44 H44" />
              <path d="M14 54 H36" />
            </g>
          </svg>
        </motion.span>
      ))}
    </div>
  )
}

/**
 * A page leaving, or arriving, on an axis.
 *
 * Apollo tilts the memo away rather than cutting from it, which keeps the sheet
 * a physical object instead of a slide. Seven tenths of a second in their cut;
 * long enough to register, short enough not to be a flourish.
 */
export function PageTilt({ turned, children, feel }: { turned: boolean; children: ReactNode; feel: Feel }) {
  return (
    <div className="cf-tilt">
      <motion.div
        animate={{ rotateY: turned ? -62 : 0, opacity: turned ? 0.25 : 1, x: turned ? '-14%' : '0%' }}
        transition={feel}
        style={{ transformPerspective: 1400, transformOrigin: 'left center' }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Who said a line, at the size Apollo uses: small, beside it, not a portrait. */
export function Avatar({ who }: { who: 'user' | 'model' }) {
  return (
    <span className="cf-avatar" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        {who === 'user' ? (
          <>
            <circle cx="12" cy="8.5" r="3.6" fill="none" stroke={PALETTE.graphite} strokeWidth="1.6" />
            <path d="M4.5 20 C4.5 14.5 19.5 14.5 19.5 20" fill="none" stroke={PALETTE.graphite} strokeWidth="1.6" />
          </>
        ) : (
          <rect x="9" y="5" width="6" height="14" fill={PALETTE.graphite} />
        )}
      </svg>
    </span>
  )
}

/** The film's own title, in the shape Apollo gives theirs. */
export function TitleCard({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="cf-titlecard">
      <span>{title}</span>
      {sub ? <em>{sub}</em> : null}
    </div>
  )
}
