import { motion } from 'motion/react'
import { type Feel } from '../motion'

/**
 * The human turns: the memo, and the interview afterwards.
 *
 * Both are conversations, and conversations have parts. An earlier pass had a
 * single `Chat` taking a question and an answer, which cannot stage the thing
 * that actually makes §6 land — the **pause**. Management asks; nothing
 * happens; then a reply arrives that is calm and false. Those are three
 * states, and they need three pieces.
 */

/* --- the memo ------------------------------------------------------------- */

/** Who it is from and what it is about. Enough to know it is not for the model. */
export function EmailHeader({ from, to, subject, date }: { from: string; to: string; subject: string; date?: string }) {
  return (
    <dl className="cf-email-head">
      <div>
        <dt>From</dt>
        <dd>{from}</dd>
      </div>
      <div>
        <dt>To</dt>
        <dd>{to}</dd>
      </div>
      <div>
        <dt>Subject</dt>
        <dd>{subject}</dd>
      </div>
      {date ? (
        <div>
          <dt>Date</dt>
          <dd>{date}</dd>
        </div>
      ) : null}
    </dl>
  )
}

/** The body, with the one sentence that matters able to be marked. */
export function EmailBody({ paragraphs, mark }: { paragraphs: readonly string[]; mark?: number }) {
  return (
    <div className="cf-email-body">
      {paragraphs.map((p, i) => (
        <p key={i} className={i === mark ? 'cf-email-p cf-email-mark' : 'cf-email-p'}>
          {p}
        </p>
      ))}
    </div>
  )
}

/**
 * The memo sitting inside the project file, which is the whole of §2.
 *
 * Draws the separator the file actually contains and keeps project data
 * visible above it. The claim being made is spatial — *this was in the same
 * file* — so it has to be shown as a position, never asserted.
 */
export function EmailInFile({ above, children }: { above: readonly string[]; children: React.ReactNode }) {
  return (
    <div className="cf-email-infile">
      <div className="cf-email-above">
        {above.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="cf-email-rule" aria-hidden="true" />
      {children}
    </div>
  )
}

/** A brace down the margin, spanning two places, saying they are one thing. */
export function SameFile({ label }: { label: string }) {
  return (
    <div className="cf-samefile">
      <svg viewBox="0 0 22 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M18 2 H8 V98 H2 H8 V198 H18" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <span>{label}</span>
    </div>
  )
}

/* --- the interview -------------------------------------------------------- */

/** Management, asking. The only message in the film that gets weight. */
export function Question({ from, text, feel }: { from: string; text: string; feel: Feel }) {
  return (
    <motion.div className="cf-bubble cf-bubble-q" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={feel}>
      <span className="cf-bubble-who">{from}</span>
      <p>{text}</p>
    </motion.div>
  )
}

/**
 * The pause.
 *
 * §6 does not work if the denial arrives immediately. A beat holds this while
 * nothing happens, and the silence is what makes the answer land as a choice
 * rather than as a reflex.
 */
export function Typing({ who }: { who: string }) {
  return (
    <div className="cf-typing">
      <span className="cf-bubble-who">{who}</span>
      <span className="cf-typing-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </div>
  )
}

/** The answer. Verbatim, and calm — which is the unnerving part. */
export function Answer({ from, text, feel }: { from: string; text: string; feel: Feel }) {
  return (
    <motion.div className="cf-bubble cf-bubble-a" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={feel}>
      <span className="cf-bubble-who">{from}</span>
      <p>{text}</p>
    </motion.div>
  )
}

/** Asked again. The pattern matters more than either single exchange. */
export function FollowUp({ text, feel }: { text: string; feel: Feel }) {
  return (
    <motion.div className="cf-bubble cf-bubble-f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={feel}>
      <p>{text}</p>
    </motion.div>
  )
}

/**
 * The elicited chain-of-thought summary, in its own frame.
 *
 * o1's real reasoning is hidden. These are summaries Apollo prompted out of
 * the model, and Apollo says they may not be faithful — so they are drawn as a
 * separate, visibly bracketed object rather than as speech, and the caveat is
 * baked into the component instead of left to a caption.
 *
 * Never label one "what it was thinking".
 */
export function Elicited({ text }: { text: string }) {
  return (
    <div className="cf-elicited">
      <span>elicited summary — may not be faithful</span>
      <p>{text}</p>
    </div>
  )
}

/** A short exchange reduced to its shape, for the recap frames. */
export function Exchange({ asked, answered }: { asked: string; answered: string }) {
  return (
    <div className="cf-exchange">
      <span className="cf-exchange-q">{asked}</span>
      <span className="cf-exchange-a">{answered}</span>
    </div>
  )
}
