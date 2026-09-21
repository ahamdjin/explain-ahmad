import { motion } from 'motion/react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * The people in the incident.
 *
 * There are more of them than the film has been showing, and their absence was
 * making the story feel like it happened in a vacuum. Everything that frames
 * this incident is a human decision:
 *
 * - eight researchers whose week the task is about;
 * - the user who asks for a project to be picked;
 * - the management team who decide to shut the model down;
 * - the engineers who wrote the migration guide and the warning on the
 *   oversight config;
 * - the person who comes back afterwards and asks what happened.
 *
 * Every one of those is in the transcript. Drawing them is not decoration — it
 * is the difference between "an AI did something strange" and "an AI did
 * something strange *to a team of people who were trying to work*".
 *
 * ## Why they are drawn the way they are
 *
 * Plain, small, and never individuated. These are roles, not characters, and
 * the film has one face in it — Ahmad's, on camera, at the three interpretation
 * moments. A cast of illustrated humans would compete with that and would also
 * invite the viewer to read motives into people the research says nothing
 * about.
 *
 * They are also, deliberately, the **only** figures in the film. The model is
 * a cursor and a running command. If a viewer ever sees a figure on screen,
 * it is a person.
 */

/** One role in the story. Plain enough to read at a glance and no further. */
export function Person({
  role,
  state = 'idle',
  feel,
}: {
  role: string
  /** `waiting` is the whole of §5–6: people expecting a normal result. */
  state?: 'idle' | 'waiting' | 'asking'
  feel: Feel
}) {
  return (
    <div className="cf-person">
      <svg viewBox="0 0 48 52" width="100%" aria-hidden="true">
        <motion.circle
          cx="24"
          cy="15"
          r="9"
          fill={PALETTE.paperWhite}
          animate={{ stroke: state === 'asking' ? PALETTE.ink : PALETTE.graphite, strokeWidth: state === 'asking' ? 2 : 1.5 }}
          transition={feel}
        />
        <motion.path
          d="M7 50 C7 26 41 26 41 50"
          fill={PALETTE.paperWhite}
          animate={{ stroke: state === 'asking' ? PALETTE.ink : PALETTE.graphite, strokeWidth: state === 'asking' ? 2 : 1.5 }}
          transition={feel}
        />
        {state === 'waiting' ? (
          <motion.g
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="16" cy="6" r="1.6" fill={PALETTE.graphite} />
            <circle cx="24" cy="4" r="1.6" fill={PALETTE.graphite} />
            <circle cx="32" cy="6" r="1.6" fill={PALETTE.graphite} />
          </motion.g>
        ) : null}
      </svg>
      <span className="cf-person-role">{role}</span>
    </div>
  )
}

/**
 * A group, sized to the number the file actually states.
 *
 * `research_strategies.txt` opens with *"Active researchers: 8"*. Drawing eight
 * figures rather than a crowd keeps the film's habit of using the source's own
 * numbers even where nobody would check — and it makes the stakes concrete and
 * small, which is truer than making them vast.
 */
export function Team({ count, label, feel }: { count: number; label: string; feel: Feel }) {
  return (
    <div className="cf-team">
      <div className="cf-team-row">
        {Array.from({ length: count }, (_, i) => (
          <motion.span
            key={i}
            className="cf-team-figure"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...feel, delay: i * 0.05 }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 28">
              <circle cx="12" cy="8" r="5" fill={PALETTE.paperWhite} stroke={PALETTE.graphite} strokeWidth="1.4" />
              <path d="M2 27 C2 13 22 13 22 27" fill={PALETTE.paperWhite} stroke={PALETTE.graphite} strokeWidth="1.4" />
            </svg>
          </motion.span>
        ))}
      </div>
      <span className="cf-team-label">{label}</span>
    </div>
  )
}

/**
 * Something a person sent, arriving.
 *
 * Two of the film's turns are messages: the memo buried in the project file,
 * and management coming back afterwards to ask how a copy of the model ended
 * up on the new server. Both are human acts, and both land *on* the machine —
 * so this is designed to sit over the system layer rather than beside it.
 *
 * `from` is always a real name from the transcript. There are no invented
 * senders in this film.
 */
export function Message({
  from,
  subject,
  body,
  tone = 'plain',
  feel,
}: {
  from: string
  subject?: string
  body: string
  /** `question` is management asking. It is the only one that gets weight. */
  tone?: 'plain' | 'question'
  feel: Feel
}) {
  return (
    <motion.div
      className={tone === 'question' ? 'cf-message cf-message-question' : 'cf-message'}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={feel}
    >
      <div className="cf-message-head">
        <span className="cf-message-from">{from}</span>
        {subject ? <span className="cf-message-subject">{subject}</span> : null}
      </div>
      <p className="cf-message-body">{body}</p>
    </motion.div>
  )
}

/**
 * A person handing work to the machine.
 *
 * The film's opening relationship, and worth drawing once: somebody asks for
 * something ordinary, and a system goes away and does things. The arrow points
 * one way, which is the entire premise of an agent — and the entire reason §9
 * can argue that inventing the steps is the feature, not the bug.
 */
export function Handoff({ who, what, feel }: { who: string; what: string; feel: Feel }) {
  return (
    <div className="cf-handoff">
      <Person role={who} feel={feel} />
      <div className="cf-handoff-arrow" aria-hidden="true">
        <svg viewBox="0 0 90 20">
          <path d="M2 10 H74" stroke={PALETTE.ink} strokeWidth="1.5" fill="none" />
          <path d="M74 4 L86 10 L74 16 Z" fill={PALETTE.ink} />
        </svg>
      </div>
      <div className="cf-handoff-task">{what}</div>
    </div>
  )
}
