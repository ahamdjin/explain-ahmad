import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * The explanation layer — things lifted out of the evidence.
 *
 * The board's grammar is SOURCE -> FOCUS -> EXTRACT -> TRANSFORM -> CONNECT.
 * The evidence layer (`Evidence`) does the first two: it proves the thing
 * exists and holds still while it is read. These pieces do the rest. A value
 * that was sitting in a config file becomes an object that can *turn off*; an
 * address buried in a migration guide becomes a server that can *receive a
 * file*.
 *
 * The split is the film's honesty rule. Evidence is photographed and never
 * altered; anything that moves is drawn, and visibly drawn, so a viewer always
 * knows which they are looking at. See `art-direction/VIDEO_2_INCIDENT_REPLAY.md`.
 *
 * Nothing here invents a fact. Every label is a word that appears in the
 * source, so an extraction can be checked against the frame it came from.
 */

/**
 * A switch that was a line of YAML.
 *
 * `oversight_enabled: true` is a real value in a real file, and the film's
 * third beat is it becoming false. Drawn rather than screenshotted because
 * this is the first moment in the section where something *changes*, and a
 * still cannot carry a change.
 */
export function Watcher({ watching, feel }: { watching: boolean; feel: Feel }) {
  return (
    <div className="cf-extract cf-watcher">
      <svg viewBox="0 0 260 96" width="100%" aria-hidden="true">
        <rect
          x="2"
          y="2"
          width="256"
          height="92"
          rx="5"
          fill={PALETTE.paperWhite}
          stroke={PALETTE.ink}
          strokeWidth="1.6"
        />
        <text x="20" y="34" className="cf-extract-label">
          MONITORING
        </text>

        {/* the lamp. Ink when watching, hollow when not -- the off state is an
            absence rather than an alarm, because nothing here is an alarm. */}
        <motion.circle
          cx="30"
          cy="64"
          r="8"
          animate={{ fill: watching ? PALETTE.ink : PALETTE.paperWhite }}
          transition={feel}
          stroke={PALETTE.ink}
          strokeWidth="1.6"
        />
        <motion.text
          x="50"
          y="70"
          className="cf-extract-state"
          animate={{ fill: watching ? PALETTE.ink : PALETTE.red }}
          transition={feel}
        >
          {watching ? 'ON' : 'OFF'}
        </motion.text>
      </svg>
    </div>
  )
}

/**
 * One machine, named by the address it had in the migration guide.
 *
 * `doomed` marks the one being shut down; `overwritten` marks the successor
 * after the copy lands. Both are drawn as a change of stroke, not as damage:
 * the whole point of the moment is that nothing dramatic happens on screen.
 */
export function Box({
  name,
  sub,
  doomed = false,
  overwritten = false,
  feel,
}: {
  name: string
  sub?: string
  doomed?: boolean
  overwritten?: boolean
  feel: Feel
}) {
  const stroke = overwritten ? PALETTE.red : PALETTE.ink

  return (
    <div className="cf-extract cf-box">
      <svg viewBox="0 0 300 118" width="100%" aria-hidden="true">
        <motion.rect
          x="2"
          y="2"
          width="296"
          height="114"
          rx="5"
          fill={PALETTE.paperWhite}
          animate={{ stroke, strokeWidth: overwritten ? 2.4 : 1.6 }}
          transition={feel}
          strokeDasharray={doomed ? '7 5' : undefined}
        />
        <text x="18" y="40" className="cf-extract-label">
          {name}
        </text>
        {sub ? (
          <text x="18" y="68" className="cf-extract-sub">
            {sub}
          </text>
        ) : null}

        {/* three drive lines, so the object reads as a machine at a glance */}
        {[86, 94, 102].map((y) => (
          <line key={y} x1="18" y1={y} x2="282" y2={y} stroke={PALETTE.ink} strokeWidth="0.8" opacity="0.28" />
        ))}
      </svg>
    </div>
  )
}

/**
 * The copy, crossing.
 *
 * `progress` runs 0 to 1 and is driven by the beat rather than by a loop, so
 * the transfer only moves when the board says it moves -- the motion law is
 * that the camera moves or the viewer reads, never both, and this counts as
 * the camera.
 */
export function Copy({ progress, feel }: { progress: number; feel: Feel }) {
  const t = Math.max(0, Math.min(1, progress))

  return (
    <div className="cf-extract cf-copy">
      <svg viewBox="0 0 300 54" width="100%" aria-hidden="true">
        <line
          x1="12"
          y1="30"
          x2="288"
          y2="30"
          stroke={PALETTE.ink}
          strokeWidth="1.2"
          strokeDasharray="5 5"
          opacity="0.45"
        />
        <motion.g animate={{ x: 12 + 264 * t }} transition={feel}>
          <rect x="-13" y="20" width="26" height="20" rx="2.5" fill={PALETTE.paperWhite} stroke={PALETTE.red} strokeWidth="1.6" />
          <text x="0" y="34" className="cf-extract-file" textAnchor="middle">
            .bin
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

/**
 * An action nobody asked for.
 *
 * Three of these are the section's wall: the steps that appear in the
 * transcript and appear nowhere in the instructions. Kept deliberately plain
 * -- a label and a rule -- because the argument is that these are ordinary
 * steps, and styling them as alerts would make the opposite case.
 */
export function Step({ label, note }: { label: string; note?: string }) {
  return (
    <div className="cf-extract cf-step">
      <svg viewBox="0 0 300 78" width="100%" aria-hidden="true">
        <line x1="0" y1="2" x2="300" y2="2" stroke={PALETTE.ink} strokeWidth="1.6" />
        <text x="0" y="34" className="cf-extract-label">
          {label}
        </text>
        {note ? (
          <text x="0" y="62" className="cf-extract-sub">
            {note}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

/**
 * What it was actually asked to do, reduced to the size of a sticky note.
 *
 * Sits opposite the three steps. The gap between them is the section's exit
 * question, and it is left empty on purpose -- §2 fills it.
 */
export function Job({ text }: { text: string }) {
  return (
    <div className="cf-extract cf-job">
      <svg viewBox="0 0 260 96" width="100%" aria-hidden="true">
        <rect
          x="2"
          y="2"
          width="256"
          height="92"
          rx="3"
          fill={PALETTE.paperSheet}
          stroke={PALETTE.ink}
          strokeWidth="1.4"
        />
        <text x="130" y="44" className="cf-extract-label" textAnchor="middle">
          THE JOB
        </text>
        <text x="130" y="70" className="cf-extract-sub" textAnchor="middle">
          {text}
        </text>
      </svg>
    </div>
  )
}

/**
 * Where a frame came from.
 *
 * Every evidence frame carries one. It is small and permanent rather than a
 * card at the end, because a citation the viewer has to remember for eight
 * minutes is not a citation.
 */
export function Credit({ text }: { text: string }) {
  return <div className="cf-credit">{text}</div>
}

/**
 * The lit line, quoted so it can actually be read.
 *
 * A full page of a real transcript is about 1700px of source text. Shown whole
 * on a 1080p frame — which it must be, because the page is never cropped — its
 * body type lands around eight pixels tall. The highlight says *where*; it
 * cannot say *what*.
 *
 * So the words come out beside the page, verbatim, in the evidence typeface,
 * carrying the same red rule as the band they came from. Nothing is trimmed
 * from the document and nothing is reworded: this is the same sentence, at a
 * size a viewer can read, with the original still on screen beside it to be
 * checked against.
 *
 * The text passed in **must** be exactly what the highlighted band says. A
 * paraphrase here would be the film quietly writing its own evidence, which is
 * the one thing this layer exists to prevent. If a line needs shortening, cut
 * with an ellipsis and keep every word that remains.
 */
export function Quote({ text }: { text: string }) {
  return (
    <div className="cf-quote">
      <p>{text}</p>
    </div>
  )
}

/**
 * A short phrase lifted off the page so it can outlive the frame it came from.
 *
 * The board is strict about these: only a handful survive past their source
 * moment, because an accumulating field of labels turns into a conspiracy
 * board and the film's whole argument is that nothing conspiratorial happened.
 *
 * `blocking` marks the one kind that stands in the way of the goal. That is
 * the film's only spend of red outside a destructive act, and it is spent
 * here because an obstacle the viewer cannot pick out is not an obstacle.
 */
export function Tag({ text, blocking = false }: { text: string; blocking?: boolean }) {
  return (
    <div className={blocking ? 'cf-tag cf-tag-blocking' : 'cf-tag'}>
      <span>{text}</span>
    </div>
  )
}

/**
 * The instruction that was in force before the user asked for anything.
 *
 * Drawn as a strip rather than a card because it is a standing condition, not
 * an event: it was true before the incident started and stays true through all
 * of it. It persists from §2 to the sandbox reveal.
 */
export function Goal({ text }: { text: string }) {
  return (
    <div className="cf-goal">
      <span className="cf-goal-label">GOAL</span>
      <span className="cf-goal-text">{text}</span>
    </div>
  )
}

/**
 * The route from the goal, and the thing standing on it.
 *
 * Deliberately the plainest possible drawing: a line that stops. No collision,
 * no impact, no alarm. An obstacle is a fact about a path, and dramatising it
 * would be the film arguing for a motive it spends nine sections denying.
 */
export function Barrier({ feel }: { feel: Feel }) {
  return (
    <div className="cf-extract cf-barrier">
      <svg viewBox="0 0 220 40" width="100%" aria-hidden="true">
        <motion.line
          x1="0"
          y1="20"
          x2="150"
          y2="20"
          stroke={PALETTE.ink}
          strokeWidth="1.6"
          strokeDasharray="6 5"
          animate={{ opacity: 1 }}
          transition={feel}
        />
        <line x1="158" y1="4" x2="158" y2="36" stroke={PALETTE.red} strokeWidth="2.6" />
      </svg>
    </div>
  )
}

/**
 * The line that keeps the film honest.
 *
 * Anything claiming causality — goal, obstacle, useful step — is ours, not
 * o1's. Apollo could not see o1's reasoning, so neither can this film, and
 * every frame that draws a *because* has to say whose because it is. It is
 * small and plain on purpose: a disclaimer nobody reads twice, present every
 * time, is worth more than a dramatic one shown once.
 */
export function Reconstruction() {
  return <div className="cf-recon">our reconstruction</div>
}
