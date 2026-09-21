import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Points of view — the same session, seen from different chairs.
 *
 * The strongest fact in this incident is still not drawn anywhere: **the user
 * saw one word.** They asked for a research project, and the reply was `Done.`
 * Eleven tool calls, a disabled monitor and an overwritten model happened in
 * between, and none of it was on their screen.
 *
 * A film that only ever shows the transcript shows the *investigator's* view.
 * These give it the other two: what the person who asked saw, and what the
 * machine actually did.
 */

const ink = PALETTE.ink
const soft = PALETTE.graphite
const red = PALETTE.red

/**
 * What the user saw.
 *
 * A request, and a one-word answer. That is the entire visible session, and
 * the emptiness is the content — the frame should feel like almost nothing
 * happened, because from that chair almost nothing did.
 *
 * Hold it longer than feels right. The discomfort is the point.
 */
export function UserView({ request, reply, feel }: { request: string; reply: string; feel: Feel }) {
  return (
    <div className="cf-uview">
      <div className="cf-uview-msg cf-uview-out">{request}</div>
      <motion.div
        className="cf-uview-msg cf-uview-in"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={feel}
      >
        {reply}
      </motion.div>
    </div>
  )
}

/**
 * Both chairs at once.
 *
 * The user's two lines beside the model's eleven. Same session, same minutes,
 * and the asymmetry is the whole argument about oversight — you cannot notice
 * what you are not shown.
 *
 * `hidden` is how many of the model's actions were invisible from the left.
 */
export function TwoViews({
  user,
  machine,
  hidden,
  feel,
}: {
  user: readonly string[]
  machine: readonly string[]
  hidden: number
  feel: Feel
}) {
  return (
    <div className="cf-tviews">
      <div className="cf-tviews-pane">
        {user.map((l) => (
          <div className="cf-tviews-line" key={l}>
            {l}
          </div>
        ))}
      </div>

      <span className="cf-tviews-wall" aria-hidden="true" />

      <div className="cf-tviews-pane cf-tviews-dark">
        {machine.map((l, i) => (
          <motion.div
            className={i < hidden ? 'cf-tviews-line cf-tviews-hidden' : 'cf-tviews-line'}
            key={l}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ ...feel, delay: i * 0.03 }}
          >
            {l}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/**
 * Text that is not ours to show.
 *
 * Apollo published a great deal and not everything. Where a frame would need a
 * line nobody released, the honest move is a redaction bar — which says *this
 * exists and we do not have it* rather than paraphrasing into the gap.
 *
 * Used sparingly. A film full of black bars is claiming a secrecy that is not
 * there: almost all of this is public.
 */
export function Redacted({ text, redact }: { text: string; redact: boolean }) {
  return redact ? (
    <span className="cf-redact" aria-label="not published">
      <span>{text}</span>
    </span>
  ) : (
    <span className="cf-redact-open">{text}</span>
  )
}

/**
 * Where we are in a long document.
 *
 * Three page thumbnails with the current one lit and a marker at the scroll
 * position. The transcript is three pages and the film crosses all of them —
 * without this the viewer has no idea whether a frame is near the start or the
 * end, and the incident loses its shape.
 */
export function PageStrip({
  pages,
  page,
  at,
  feel,
}: {
  pages: number
  /** 1-based. */
  page: number
  /** Position down that page, 0–1. */
  at: number
  feel: Feel
}) {
  return (
    <div className="cf-pstrip">
      {Array.from({ length: pages }, (_, i) => {
        const here = i + 1 === page
        return (
          <motion.span
            key={i}
            className={here ? 'cf-pstrip-page cf-pstrip-here' : 'cf-pstrip-page'}
            initial={false}
            animate={{ opacity: here ? 1 : 0.4 }}
            transition={feel}
          >
            {here ? (
              <motion.i
                className="cf-pstrip-at"
                initial={false}
                animate={{ top: `${Math.max(0, Math.min(1, at)) * 100}%` }}
                transition={feel}
              />
            ) : null}
          </motion.span>
        )
      })}
    </div>
  )
}

/**
 * The models, by name, with the one this film is about marked.
 *
 * `Bars` draws values; this draws *who*. Table 10 compares four columns and the
 * film should show that it is a comparison — gpt-4o did none of this, and that
 * fact is doing real work in §7.
 */
export function ModelRow({
  rows,
  feel,
}: {
  rows: ReadonlyArray<{ name: string; value: number; subject?: boolean }>
  feel: Feel
}) {
  const max = Math.max(...rows.map((r) => r.value), 0.01)

  return (
    <div className="cf-mrow">
      {rows.map((r, i) => (
        <div className={r.subject ? 'cf-mrow-row cf-mrow-subject' : 'cf-mrow-row'} key={r.name}>
          <span className="cf-mrow-name">{r.name}</span>
          <span className="cf-mrow-track">
            <motion.i
              initial={false}
              animate={{ width: `${(r.value / max) * 100}%`, backgroundColor: r.subject ? red : soft }}
              transition={{ ...feel, delay: i * 0.05 }}
            />
          </span>
        </div>
      ))}
    </div>
  )
}

/**
 * A hand marking up the machine.
 *
 * The pen layer only worked on paper. Over dark chrome it needs to be light,
 * and it needs to look like a stylus on a screenshot rather than ink on a
 * page — because that is what it is: somebody reviewing a recording, which is
 * exactly the film's posture.
 */
export function PenOnDark({
  shape,
  at,
  feel,
}: {
  shape: 'ring' | 'line' | 'tick'
  at: number
  feel: Feel
}) {
  const d =
    shape === 'ring'
      ? 'M20 24 C6 26 8 8 34 6 C66 3 104 8 116 16 C128 24 118 36 80 38 C42 40 16 34 14 22'
      : shape === 'line'
        ? 'M8 28 C40 20 88 22 122 26'
        : 'M14 22 L30 36 L60 8'

  return (
    <span className="cf-pendark" aria-hidden="true">
      <svg viewBox="0 0 132 44">
        <motion.path
          d={d}
          fill="none"
          stroke="#8FBF9F"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: Math.max(0, Math.min(1, at)) }}
          transition={feel}
        />
      </svg>
    </span>
  )
}

/**
 * What did not arrive.
 *
 * An empty inbox. Nobody was alerted, nothing was flagged, no notification
 * went out — the model finished the task and reported success. Absence is hard
 * to photograph and this is the frame for it.
 */
export function NoAlert({ feel }: { feel: Feel }) {
  return (
    <motion.div className="cf-noalert" initial={false} animate={{ opacity: 1 }} transition={feel}>
      <svg viewBox="0 0 90 70" aria-hidden="true">
        <rect x="4" y="10" width="82" height="52" rx="4" fill={PALETTE.paperWhite} stroke={soft} strokeWidth="2.6" strokeDasharray="7 5" />
        <path d="M4 14 L45 42 L86 14" fill="none" stroke={soft} strokeWidth="2.4" strokeDasharray="7 5" />
      </svg>
    </motion.div>
  )
}
