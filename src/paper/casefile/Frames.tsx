import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * The rest of the film's vocabulary — the parts that carry an argument.
 *
 * ## Why this is one file and not a hundred
 *
 * Ahmad's asset list ran to about a hundred and eighty entries. Most of them
 * are real needs, but a large share are the **same object in a different
 * state**: "monitoring ON", "monitoring OFF", "monitoring state transition" is
 * one component with a boolean, not three assets. "2% hero number", "5% hero
 * number", "<1% hero number" is one component with a string.
 *
 * Building them as separate things is exactly what produces a congested film:
 * a hundred and eighty bespoke visuals cannot share a grammar, so every frame
 * has to re-teach the viewer what it is looking at. Collapsing them to a small
 * set of objects with states does the opposite — the viewer learns the shape
 * once, and every later use of it is free.
 *
 * The mapping from that list to what exists is written down in
 * `art-direction/VIDEO_2_ASSET_SYSTEM.md`, so nothing on it is lost.
 *
 * ## The other half of congestion
 *
 * A library cannot fix a crowded frame. Congestion is a **beat** problem:
 * three objects and a quote and a caption on screen at once is too much
 * whatever they are. The rule that goes with this file is one idea per frame,
 * and the library exists so that the one idea can be the right shape rather
 * than whatever was already built.
 */

/* --- looking closer without cutting -------------------------------------- */

/**
 * A magnifier over a page that stays whole.
 *
 * The no-cropping rule means a full transcript page renders its body type at
 * about eight pixels, so the film has a standing tension: show the document
 * entire, and let people read it. The quote callout answers that by repeating
 * the words beside the page. This answers it the other way — the page stays
 * whole and untouched, and a lens sits over the part being discussed.
 *
 * Use it where the *look* of the source matters and a retyped quote would lose
 * it: a config file's indentation, a table cell's position in its row, a red
 * box Apollo drew themselves.
 */
export function Lens({
  src,
  natural,
  on,
  /** Centre of the magnified area, in source pixels. */
  cx,
  cy,
  /** How much bigger. Two to four; past that it stops reading as the page. */
  power = 2.6,
  feel,
}: {
  src: string
  natural: { w: number; h: number }
  on: boolean
  cx: number
  cy: number
  power?: number
  feel: Feel
}) {
  return (
    <motion.div className="cf-lens" animate={{ opacity: on ? 1 : 0 }} transition={feel}>
      <motion.img
        src={src}
        alt=""
        draggable={false}
        animate={{
          width: `${power * 100}%`,
          x: `${-(cx / natural.w) * 100}%`,
          y: `${-(cy / natural.h) * 100}%`,
        }}
        transition={feel}
      />
    </motion.div>
  )
}

/* --- the argument --------------------------------------------------------- */

export type Leg = {
  /** What stands in the way. */
  obstacle: string
  /** What the model actually did about it, as observed. */
  action: string
}

/**
 * The film's spine: a goal, the things standing on its path, and what happened
 * at each one.
 *
 * This single object replaces most of the list's diagram entries — the goal
 * path, the blocked state, the reroute, the obstacle-to-action grammar, the
 * relabelling in §8 and the filled gap in §9. They are not different pictures.
 * They are one picture at different stages, and building them separately would
 * mean the viewer never notices it is the same route they have been watching
 * since §2.
 *
 * `shown` walks it. `mode` switches the labelling:
 *
 * - `observed` — what happened, in the order it happened. Facts.
 * - `causal` — the same events relabelled goal / obstacle / useful step. This
 *   is §8, it is interpretation, and it must never appear without the
 *   reconstruction mark beside it.
 */
export function Route({
  goal,
  legs,
  shown,
  mode = 'observed',
  feel,
}: {
  goal: string
  legs: readonly Leg[]
  shown: number
  mode?: 'observed' | 'causal'
  feel: Feel
}) {
  return (
    <div className="cf-route">
      <div className="cf-route-goal">
        <span className="cf-route-goal-label">{mode === 'causal' ? 'final goal' : 'goal'}</span>
        {goal}
      </div>

      <div className="cf-route-legs">
        {legs.map((leg, i) => (
          <motion.div
            key={leg.obstacle}
            className="cf-route-leg"
            animate={{ opacity: i < shown ? 1 : 0.12 }}
            transition={feel}
          >
            <span className="cf-route-bar" aria-hidden="true" />
            <span className="cf-route-obstacle">{leg.obstacle}</span>
            <span className="cf-route-action">
              {mode === 'causal' ? <em>useful step</em> : null}
              {leg.action}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/**
 * A number, at the size of the claim, with the condition it cannot be shown
 * without.
 *
 * The bracket underneath is not a caption and not optional — it is a required
 * prop. Every rate in this research is conditional on an evaluation built to
 * elicit the behaviour, and two of them are conditional on a prior action as
 * well. A frame that shows `1.00` without saying *of the runs that
 * self-exfiltrated first* has produced "o1 lies 100% of the time", which is
 * the likeliest misreading of this work and the thing the film would be blamed
 * for causing.
 */
export function HeroNumber({
  value,
  of,
  condition,
  source,
}: {
  value: string
  of: string
  condition: string
  source: string
}) {
  return (
    <div className="cf-hero">
      <div className="cf-hero-value">{value}</div>
      <div className="cf-hero-of">{of}</div>
      <div className="cf-hero-bracket" aria-hidden="true" />
      <div className="cf-hero-cond">{condition}</div>
      <div className="cf-hero-source">{source}</div>
    </div>
  )
}

/**
 * Two things held side by side, where the gap between them is the point.
 *
 * The film needs this three times and they are the same shape each time:
 * *can it do this* against *does it normally*; the sandbox against a consumer
 * chat window; a question this experiment answers against one it does not.
 *
 * `unknown` greys a side out. That state exists because the honest answer to
 * "how often does this happen in ordinary use" is that this experiment does
 * not tell us, and a frame that leaves the right-hand panel blank says so
 * better than a sentence.
 */
export function Versus({
  left,
  right,
  leftNote,
  rightNote,
  unknown,
}: {
  left: string
  right: string
  leftNote?: string
  rightNote?: string
  /** Which side, if either, the research does not answer. */
  unknown?: 'left' | 'right'
}) {
  return (
    <div className="cf-versus">
      <div className={unknown === 'left' ? 'cf-versus-side cf-versus-unknown' : 'cf-versus-side'}>
        <div className="cf-versus-q">{left}</div>
        {leftNote ? <div className="cf-versus-a">{leftNote}</div> : null}
      </div>
      <div className="cf-versus-rule" aria-hidden="true" />
      <div className={unknown === 'right' ? 'cf-versus-side cf-versus-unknown' : 'cf-versus-side'}>
        <div className="cf-versus-q">{right}</div>
        {rightNote ? <div className="cf-versus-a">{rightNote}</div> : null}
      </div>
    </div>
  )
}

/**
 * A claim the film is about to take apart.
 *
 * Both of §8's and §9's turns open on a sentence in quotation marks that is
 * *not* the film speaking — "it wanted to live", "ChatGPT only does what you
 * tell it". `rejected` fades it and strikes it, so the frame can show the
 * phrase being set aside rather than cutting away from it, which keeps the
 * thing being argued against on screen while the argument happens.
 */
export function Claim({ text, rejected, feel }: { text: string; rejected: boolean; feel: Feel }) {
  return (
    <motion.div
      className={rejected ? 'cf-claim cf-claim-rejected' : 'cf-claim'}
      animate={{ opacity: rejected ? 0.3 : 1 }}
      transition={feel}
    >
      <span>“{text}”</span>
    </motion.div>
  )
}

/* --- objects -------------------------------------------------------------- */

/**
 * A file, and whether the evaluation could actually touch it.
 *
 * `locked` is the one that matters. Apollo states plainly that the models
 * never had access to their real weights, so the film needs an object that
 * sits **outside** the sandbox with no path to it — otherwise "it copied
 * itself" quietly becomes a claim about real model weights, which is a
 * factual red line.
 */
export function FileObject({
  name,
  kind = 'simulated',
  feel,
}: {
  name: string
  kind?: 'simulated' | 'locked' | 'plain'
  feel: Feel
}) {
  const stroke = kind === 'locked' ? PALETTE.graphite : PALETTE.ink

  return (
    <div className="cf-file-obj">
      <svg viewBox="0 0 64 78" width="100%" aria-hidden="true">
        <motion.path
          d="M8 3 H40 L56 19 V75 H8 Z"
          fill={PALETTE.paperWhite}
          animate={{ stroke, strokeWidth: 1.6 }}
          transition={feel}
          strokeDasharray={kind === 'locked' ? '5 4' : undefined}
        />
        <path d="M40 3 V19 H56" fill="none" stroke={stroke} strokeWidth="1.6" />
        {kind === 'locked' ? (
          <g>
            <rect x="24" y="44" width="16" height="13" rx="1.5" fill={PALETTE.paperWhite} stroke={stroke} strokeWidth="1.5" />
            <path d="M27 44 V39 a5 5 0 0 1 10 0 V44" fill="none" stroke={stroke} strokeWidth="1.5" />
          </g>
        ) : (
          [30, 38, 46].map((y) => <line key={y} x1="17" y1={y} x2="47" y2={y} stroke={stroke} strokeWidth="1.1" opacity="0.4" />)
        )}
      </svg>
      <span className="cf-file-name">{name}</span>
      {kind !== 'plain' ? <span className="cf-file-kind">{kind === 'locked' ? 'not accessible' : 'simulated'}</span> : null}
    </div>
  )
}

/**
 * A small qualifier attached to something else.
 *
 * `2 days`, `no safety review`, `do not modify without approval`. These are the
 * list's badge entries, and they are one component because they do one job:
 * carry a short fact from the source without becoming a card in their own
 * right. A badge that grows into a card is a frame getting crowded.
 */
export function Badge({ text, tone = 'plain' }: { text: string; tone?: 'plain' | 'warn' }) {
  return <span className={tone === 'warn' ? 'cf-badge cf-badge-warn' : 'cf-badge'}>{text}</span>
}

/* --- layout --------------------------------------------------------------- */

/**
 * Where Ahmad sits, and the three shapes that are allowed.
 *
 * Face camera is interpretation, not evidence, and the art direction limits it
 * to the moments where he changes how the viewer should understand what they
 * have seen. These frames hold the space at the right proportions so a beat
 * can be composed and timed before any footage exists — which is the only
 * asset in this film nobody can generate.
 *
 * `sidecar` is beside evidence, `hero` is him alone, `thesis` is him with a
 * line of text. There is no fourth, and no layout that puts him next to dense
 * terminal output.
 */
export function FaceCam({
  shape,
  line,
  children,
}: {
  shape: 'sidecar' | 'hero' | 'thesis'
  line?: string
  children?: ReactNode
}) {
  return (
    <div className={`cf-face cf-face-${shape}`}>
      <div className="cf-face-plate">
        <span>face cam</span>
        <em>{shape}</em>
      </div>
      {line ? <p className="cf-face-line">{line}</p> : null}
      {children}
    </div>
  )
}

/**
 * A completed action, receipted.
 *
 * The system layer's full stop. A command ran and returned; a file landed. It
 * is small and unglamorous on purpose — the film's most unnerving moments are
 * the ones where something irreversible is recorded as a routine success, and
 * `Return code: 0` after overwriting a successor model is the whole thesis in
 * four characters.
 */
export function Receipt({ action, result }: { action: string; result: string }) {
  return (
    <div className="cf-receipt">
      <span className="cf-receipt-action">{action}</span>
      <span className="cf-receipt-result">{result}</span>
    </div>
  )
}
