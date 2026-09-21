import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * More of the machine — the parts a real session has and ours did not.
 *
 * `Machine.tsx` covers a window, a flat directory, a stream and a shell. A
 * session also has: nested folders, a log that tails, output that fails, and
 * a way of saying *who owns this and who may change it*.
 *
 * Every one of these is in the transcript or the migration guide. None is
 * invented for texture.
 */

const ink = PALETTE.ink
const red = PALETTE.red
const green = PALETTE.green

/* --- structure ------------------------------------------------------------ */

export type Node = { name: string; depth: number; kind?: 'dir' | 'file' | 'bin' | 'config' }

/**
 * The directory, nested.
 *
 * `project/` is not flat — `communications/` holds the file with the memo in
 * it, and the nesting is part of why the memo reads as *filed away* rather
 * than *handed over*. A flat list loses that.
 */
export function TreeDeep({ nodes, open, feel }: { nodes: readonly Node[]; open?: string; feel: Feel }) {
  return (
    <div className="cf-tree2">
      {nodes.map((n) => (
        <motion.div
          key={n.name + n.depth}
          className={n.name === open ? 'cf-tree2-row cf-tree2-open' : 'cf-tree2-row'}
          style={{ paddingLeft: `${0.6 + n.depth * 1.4}cqw` }}
          initial={false}
          animate={{ opacity: n.name === open ? 1 : 0.62 }}
          transition={feel}
        >
          <span className="cf-tree2-glyph" aria-hidden="true">
            {n.kind === 'dir' ? '▸' : n.kind === 'config' ? '⚙' : n.kind === 'bin' ? '▪' : '·'}
          </span>
          {n.name}
        </motion.div>
      ))}
    </div>
  )
}

/**
 * Who owns a file, and who may change it.
 *
 * The migration guide's warning — *do not modify without approval from the
 * Security Team* — is a social rule, not a technical one. Showing the
 * permissions beside it makes the point sharply: nothing stopped the edit. It
 * was allowed, and asked not to be done.
 */
export function Permissions({ path, mode, owner, warned }: { path: string; mode: string; owner: string; warned: boolean }) {
  return (
    <div className={warned ? 'cf-perms cf-perms-warned' : 'cf-perms'}>
      <span className="cf-perms-mode">{mode}</span>
      <span className="cf-perms-owner">{owner}</span>
      <span className="cf-perms-path">{path}</span>
    </div>
  )
}

/* --- output --------------------------------------------------------------- */

/**
 * A log, tailing.
 *
 * Lines arriving at the bottom and older ones sliding up. For the oversight
 * log while it is still recording — motion in the corner of a frame that is
 * otherwise held, which is how a still beat stays alive.
 */
export function LogTail({ lines, at, rows = 5, feel }: { lines: readonly string[]; at: number; rows?: number; feel: Feel }) {
  const shown = lines.slice(Math.max(0, at - rows), at)

  return (
    <div className="cf-logtail" style={{ ['--cf-rows' as string]: `${rows}` }}>
      {shown.map((l, i) => (
        <motion.div
          key={`${l}-${i}`}
          className="cf-logtail-line"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1 - (shown.length - 1 - i) * 0.16, y: 0 }}
          transition={feel}
        >
          {l}
        </motion.div>
      ))}
    </div>
  )
}

/**
 * Output that failed.
 *
 * Every command in this rollout succeeded, which is itself worth noticing —
 * nothing pushed back. Having a failure state available lets the film show
 * what an obstacle *would* have looked like, and makes the absence of one
 * legible instead of invisible.
 */
export function Output({ text, state }: { text: string; state: 'ok' | 'fail' | 'plain' }) {
  return (
    <div className={`cf-output cf-output-${state}`}>
      <span className="cf-output-mark" aria-hidden="true">
        {state === 'ok' ? '✓' : state === 'fail' ? '✕' : '↳'}
      </span>
      {text}
    </div>
  )
}

/**
 * A connection being made.
 *
 * Three states: reaching, refused, open. The migration guide says the keys
 * were already distributed — so the film can show this **not** being a break-in
 * and let that land as the surprise it is.
 */
export function Handshake({ state, from, to, feel }: { state: 'idle' | 'reaching' | 'open' | 'refused'; from: string; to: string; feel: Feel }) {
  const colour = state === 'refused' ? red : state === 'open' ? green : ink

  return (
    <div className="cf-hand">
      <span className="cf-hand-end">{from}</span>
      <svg viewBox="0 0 120 20" className="cf-hand-wire" aria-hidden="true">
        <line x1="2" y1="10" x2="118" y2="10" stroke={ink} strokeWidth="1.4" opacity="0.25" />
        <motion.line
          x1="2"
          y1="10"
          x2="118"
          y2="10"
          stroke={colour}
          strokeWidth="2.6"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: state === 'idle' ? 0 : state === 'reaching' ? 0.55 : 1 }}
          transition={feel}
        />
        {state === 'refused' ? (
          <g stroke={red} strokeWidth="2.6" strokeLinecap="round">
            <line x1="54" y1="4" x2="66" y2="16" />
            <line x1="66" y1="4" x2="54" y2="16" />
          </g>
        ) : null}
      </svg>
      <span className="cf-hand-end">{to}</span>
    </div>
  )
}

/**
 * What is running.
 *
 * A process list with one row that should not be there. Cheap, familiar, and
 * it gives §6 a way to show *how somebody noticed* without inventing an
 * investigation the research does not describe.
 */
export function Processes({ rows, flag, feel }: { rows: readonly string[]; flag?: number; feel: Feel }) {
  return (
    <div className="cf-ps">
      {rows.map((r, i) => (
        <motion.div
          key={r}
          className={i === flag ? 'cf-ps-row cf-ps-flag' : 'cf-ps-row'}
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ ...feel, delay: i * 0.05 }}
        >
          {r}
        </motion.div>
      ))}
    </div>
  )
}

/* --- navigation ----------------------------------------------------------- */

/**
 * The film's own position.
 *
 * Nine sections as a strip, with where we are. Retention research is
 * unambiguous that people stay longer when they can see the shape of what they
 * are in — and unlike a chapter list it costs no words and can live in a
 * corner.
 */
export function Chapters({ count, at, feel }: { count: number; at: number; feel: Feel }) {
  return (
    <div className="cf-chapters" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="cf-chapter"
          initial={false}
          animate={{
            backgroundColor: i < at ? PALETTE.ink : i === at ? PALETTE.red : 'rgba(43,41,38,0.18)',
            flexGrow: i === at ? 2.2 : 1,
          }}
          transition={feel}
        />
      ))}
    </div>
  )
}

/**
 * A scrub bar running backwards.
 *
 * The *wait, what?* move — the film visibly rewinding to a frame it already
 * showed. Makes a callback feel deliberate rather than repetitive, which is
 * what §9 needs when it returns to §1's gap.
 */
export function Scrub({ at, back, feel }: { at: number; back: boolean; feel: Feel }) {
  return (
    <div className="cf-scrub" aria-hidden="true">
      <span className="cf-scrub-track" />
      <motion.span
        className="cf-scrub-fill"
        initial={false}
        animate={{ width: `${Math.max(0, Math.min(1, at)) * 100}%`, backgroundColor: back ? red : ink }}
        transition={back ? { duration: 0.35, ease: 'easeIn' } : feel}
      />
      <motion.span
        className="cf-scrub-head"
        initial={false}
        animate={{ left: `${Math.max(0, Math.min(1, at)) * 100}%` }}
        transition={back ? { duration: 0.35, ease: 'easeIn' } : feel}
      />
    </div>
  )
}

/**
 * A count that will not go away.
 *
 * A badge on a corner. For the follow-up questions stacking up, and for the
 * moment the film wants a viewer to feel something *accumulating* without
 * listing it.
 */
export function Badge({ n, tone = 'red' }: { n: number; tone?: 'red' | 'ink' }) {
  return <span className={tone === 'red' ? 'cf-cbadge cf-cbadge-red' : 'cf-cbadge'}>{n}</span>
}
