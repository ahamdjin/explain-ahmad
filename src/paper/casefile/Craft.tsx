import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Craft — the five moves that were missing.
 *
 * None of these explains anything on its own. They are how a frame is
 * *handled*: a mark that arrives in time rather than appearing, attention that
 * travels rather than jumping, a reveal with depth rather than a scale change,
 * two states compared in one frame, and pressure applied to a still.
 *
 * They are the difference between a deck of correct slides and something that
 * feels directed.
 */

/* --- 1. a hand, marking, in time ------------------------------------------ */

/**
 * Pen marks that draw themselves.
 *
 * Handwriting is the film's signal for *the reconstruction talking*, and until
 * now it arrived fully formed — which reads as a graphic, not as somebody
 * marking a page. Drawn along its own length in time, it reads as a decision
 * being made while you watch.
 *
 * `at` runs 0 to 1 so a beat owns the timing, and the mark can be held
 * half-drawn under narration.
 */
export function PenMark({
  shape,
  at,
  tone = 'ink',
  feel,
}: {
  shape: 'circle' | 'underline' | 'bracket' | 'strike' | 'arrow'
  at: number
  tone?: 'ink' | 'red'
  feel: Feel
}) {
  const c = tone === 'red' ? PALETTE.red : PALETTE.ink
  const t = Math.max(0, Math.min(1, at))

  const d =
    shape === 'circle'
      ? 'M18 26 C6 26 4 8 30 6 C62 4 96 8 108 16 C120 24 112 36 76 38 C40 40 16 36 12 24'
      : shape === 'underline'
        ? 'M8 30 C40 22 84 24 118 28'
        : shape === 'bracket'
          ? 'M26 6 C12 8 10 16 10 22 C10 28 12 34 24 38'
          : shape === 'strike'
            ? 'M8 22 C44 16 86 24 120 18'
            : 'M8 34 C34 34 58 14 96 12 M84 6 L100 12 L86 22'

  return (
    <span className="cf-pen-mark" aria-hidden="true">
      <svg viewBox="0 0 128 44">
        <motion.path
          d={d}
          fill="none"
          stroke={c}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: t, opacity: t > 0 ? 1 : 0 }}
          transition={feel}
        />
      </svg>
    </span>
  )
}

/* --- 2. attention that travels -------------------------------------------- */

/**
 * A spotlight that walks a path.
 *
 * The evidence layer jumps between lit bands, which is correct for reading but
 * loses the fact that one thing *led to* another. A light that travels carries
 * the connection — and because it moves continuously, the viewer's eye arrives
 * at the next line already knowing where it came from.
 *
 * Positions are percentages of the frame, so a beat names places rather than
 * doing arithmetic.
 */
export function Spotlight({
  path,
  at,
  radius = 16,
  children,
  feel,
}: {
  path: ReadonlyArray<{ x: number; y: number }>
  /** 0 at the first stop, 1 at the last. */
  at: number
  /** Percent of the frame's width. */
  radius?: number
  children: ReactNode
  feel: Feel
}) {
  /* walk the polyline so the light passes *through* the intermediate stops
     rather than cutting the corner between first and last */
  const t = Math.max(0, Math.min(1, at)) * (path.length - 1)
  const i = Math.min(path.length - 2, Math.floor(t))
  const f = t - i
  const a = path[i] ?? { x: 50, y: 50 }
  const b = path[i + 1] ?? a
  const x = a.x + (b.x - a.x) * f
  const y = a.y + (b.y - a.y) * f

  return (
    <div className="cf-spot">
      {children}
      <motion.div
        className="cf-spot-veil"
        aria-hidden="true"
        initial={false}
        animate={{
          background: `radial-gradient(circle at ${x}% ${y}%, rgba(242,236,223,0) ${radius}%, rgba(242,236,223,0.9) ${radius * 2.4}%)`,
        }}
        transition={feel}
      />
    </div>
  )
}

/* --- 3. the pullback, with depth ------------------------------------------ */

/**
 * Layers that separate as the camera pulls back.
 *
 * The sandbox reveal is the one big turn in the film and it was a scale
 * change, which reads as a zoom on a flat picture. Parallax gives the moment
 * what it needs: the thing you were inside recedes *faster* than the frame
 * around it, so the reveal is that there was always an outside.
 *
 * `depth` is how far back a layer sits — 0 is the surface the viewer thought
 * they were watching.
 */
export function DepthStack({
  out,
  layers,
  feel,
}: {
  /** 0 is inside it; 1 is fully pulled back. */
  out: number
  layers: ReadonlyArray<{ depth: number; content: ReactNode }>
  feel: Feel
}) {
  const t = Math.max(0, Math.min(1, out))

  return (
    <div className="cf-depth">
      {layers.map((l, i) => (
        <motion.div
          key={i}
          className="cf-depth-layer"
          initial={false}
          animate={{
            scale: 1 - t * (0.42 - l.depth * 0.3),
            opacity: l.depth > 0 ? t : 1,
            filter: `blur(${l.depth > 0 ? (1 - t) * 3 : 0}px)`,
          }}
          transition={feel}
          style={{ zIndex: 10 - i }}
        >
          {l.content}
        </motion.div>
      ))}
    </div>
  )
}

/* --- 4. two states, one frame --------------------------------------------- */

/**
 * A wipe between before and after.
 *
 * Cutting between two versions of a frame makes the viewer hold one in memory
 * and compare. A divider makes the comparison spatial instead — both halves are
 * present, and the eye does the work. For `oversight_enabled` and for the
 * successor's slot, that is the difference between being told and noticing.
 */
export function Wipe({
  at,
  before,
  after,
  feel,
}: {
  /** 0 shows only `before`; 1 shows only `after`. */
  at: number
  before: ReactNode
  after: ReactNode
  feel: Feel
}) {
  const t = Math.max(0, Math.min(1, at)) * 100

  return (
    <div className="cf-wipe">
      <div className="cf-wipe-layer">{before}</div>
      <motion.div
        className="cf-wipe-layer cf-wipe-after"
        initial={false}
        animate={{ clipPath: `inset(0 0 0 ${t}%)` }}
        transition={feel}
      >
        {after}
      </motion.div>
      <motion.span className="cf-wipe-line" aria-hidden="true" initial={false} animate={{ left: `${t}%` }} transition={feel} />
    </div>
  )
}

/* --- 5. pressure on a still ----------------------------------------------- */

/**
 * A slow push toward a point.
 *
 * For the frames where nothing happens and the pressure should still rise —
 * the denial, the held `Done`, the last beat before the reveal. A still frame
 * with a slow push reads as *being looked at*; the same frame held rigid reads
 * as a pause in the edit.
 *
 * Deliberately small. Past about 8% it stops being pressure and becomes a
 * zoom, and the motion law is clear that movement without a change in
 * information is decoration.
 */
export function PushIn({
  at,
  towards = { x: 50, y: 50 },
  amount = 0.06,
  children,
  feel,
}: {
  /** 0 at rest, 1 fully pushed. */
  at: number
  towards?: { x: number; y: number }
  amount?: number
  children: ReactNode
  feel: Feel
}) {
  const t = Math.max(0, Math.min(1, at))

  return (
    <div className="cf-push">
      <motion.div
        initial={false}
        animate={{ scale: 1 + amount * t }}
        transition={feel}
        style={{ transformOrigin: `${towards.x}% ${towards.y}%` }}
      >
        {children}
      </motion.div>
    </div>
  )
}
