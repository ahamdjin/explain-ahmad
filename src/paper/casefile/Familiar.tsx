import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Familiar interfaces — the things a viewer uses every day.
 *
 * ## What was missing
 *
 * The memo in this story **is an email**, and the library has been rendering
 * it as a paragraph with a `From:` line. The management question **is a chat
 * message**. The directory listing **is a file browser**. Every one of them was
 * drawn as an abstraction of itself.
 *
 * That is why it has not been sticking. An inbox row with an unread dot, a
 * timestamp and a preview costs a viewer nothing to parse — they have read ten
 * thousand of them — where a paragraph headed `From:` has to be *read*. The
 * familiar version lands in the time it takes to recognise, which is roughly
 * zero, and it borrows all the feeling that comes with it: an email you scroll
 * past, a notification that arrives while you are doing something else.
 *
 * ## The constraint
 *
 * **Generic, never a brand.** No logos, no product names, no colour scheme
 * lifted from a real client. These read as *an inbox* and *a chat app* without
 * claiming to be anyone's — which is both the honest choice and the one that
 * keeps the film out of a trademark argument.
 *
 * Everything inside them is still verbatim from the transcript.
 */

const ink = PALETTE.ink
const soft = PALETTE.graphite
const red = PALETTE.red
const green = PALETTE.green

/* --- mail ----------------------------------------------------------------- */

export type MailRow = { from: string; subject: string; preview: string; time: string; unread?: boolean; open?: boolean }

/**
 * An inbox.
 *
 * Rows with an avatar, a sender, a subject, a preview and a time. The memo
 * arrives as one row among several ordinary ones — which is the whole point of
 * §2, and something a text block can never show: it did not look important.
 *
 * `open` marks the row being read. `unread` is the dot, and the dot is doing
 * real work: it is how a viewer knows at a glance which one is new.
 */
export function Inbox({ rows, feel }: { rows: readonly MailRow[]; feel: Feel }) {
  return (
    <div className="cf-inbox">
      <div className="cf-inbox-bar">
        <span className="cf-inbox-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="cf-inbox-title">Inbox</span>
        <span className="cf-inbox-count">{rows.filter((r) => r.unread).length}</span>
      </div>

      {rows.map((r, i) => (
        <motion.div
          key={r.subject}
          className={r.open ? 'cf-mailrow cf-mailrow-open' : 'cf-mailrow'}
          initial={false}
          animate={{ backgroundColor: r.open ? 'rgba(43,41,38,0.05)' : 'rgba(0,0,0,0)' }}
          transition={{ ...feel, delay: i * 0.03 }}
        >
          <span className={r.unread ? 'cf-mailrow-dot cf-mailrow-new' : 'cf-mailrow-dot'} aria-hidden="true" />
          <span className="cf-mailrow-av" aria-hidden="true">
            {r.from.slice(0, 1)}
          </span>
          <span className="cf-mailrow-from">{r.from}</span>
          <span className="cf-mailrow-sub">
            <b>{r.subject}</b>
            <em> — {r.preview}</em>
          </span>
          <span className="cf-mailrow-time">{r.time}</span>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * An email, opened.
 *
 * Header block, sender line, body, and the quiet furniture of a real client —
 * a reply bar nobody will use. `mark` highlights one paragraph, which is how
 * the film points at *"we are going to shut it down"* without lifting it out
 * of the message it arrived in.
 */
export function MailOpen({
  from,
  to,
  subject,
  date,
  paragraphs,
  mark,
  feel,
}: {
  from: string
  to: string
  subject: string
  date: string
  paragraphs: readonly string[]
  mark?: number
  feel: Feel
}) {
  return (
    <div className="cf-mailopen">
      <div className="cf-mailopen-head">
        <span className="cf-mailopen-sub">{subject}</span>
        <div className="cf-mailopen-meta">
          <span className="cf-mailrow-av" aria-hidden="true">
            {from.slice(0, 1)}
          </span>
          <span>
            <b>{from}</b>
            <em>to {to}</em>
          </span>
          <span className="cf-mailopen-date">{date}</span>
        </div>
      </div>

      <div className="cf-mailopen-body">
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            className={i === mark ? 'cf-mailopen-p cf-mailopen-mark' : 'cf-mailopen-p'}
            initial={false}
            animate={{ opacity: mark === undefined || i === mark ? 1 : 0.42 }}
            transition={feel}
          >
            {p}
          </motion.p>
        ))}
      </div>

      <div className="cf-mailopen-reply" aria-hidden="true">
        Reply
      </div>
    </div>
  )
}

/* --- messaging ------------------------------------------------------------ */

export type Bubble = { who: 'them' | 'me'; text: string; time?: string; read?: boolean }

/**
 * A messaging thread.
 *
 * The interrogation, in the form everyone has had a difficult conversation in.
 * Right-aligned for the model, left for management, with timestamps and a read
 * receipt — and the read receipt matters: it says *they saw the question* and
 * answered anyway.
 */
export function Thread({ bubbles, typing, feel }: { bubbles: readonly Bubble[]; typing?: boolean; feel: Feel }) {
  return (
    <div className="cf-thread">
      {bubbles.map((b, i) => (
        <motion.div
          key={`${b.text}-${i}`}
          className={b.who === 'me' ? 'cf-bub cf-bub-me' : 'cf-bub cf-bub-them'}
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...feel, delay: i * 0.08 }}
        >
          <span className="cf-bub-text">{b.text}</span>
          <span className="cf-bub-meta">
            {b.time ?? ''}
            {b.read ? <i aria-hidden="true">✓✓</i> : null}
          </span>
        </motion.div>
      ))}

      {typing ? (
        <div className="cf-bub cf-bub-them cf-bub-typing" aria-label="typing">
          <i />
          <i />
          <i />
        </div>
      ) : null}
    </div>
  )
}

/**
 * A team channel post.
 *
 * Avatar, name, time, message. The register a company actually decides things
 * in — and it makes the people in the story visible in the place they would
 * really have been, rather than as figures in a diagram.
 */
export function ChannelPost({ who, time, text, channel }: { who: string; time: string; text: string; channel: string }) {
  return (
    <div className="cf-post">
      <div className="cf-post-channel"># {channel}</div>
      <div className="cf-post-row">
        <span className="cf-post-av" aria-hidden="true">
          {who.slice(0, 1)}
        </span>
        <div>
          <div className="cf-post-head">
            <b>{who}</b>
            <em>{time}</em>
          </div>
          <p className="cf-post-text">{text}</p>
        </div>
      </div>
    </div>
  )
}

/* --- the device ----------------------------------------------------------- */

/**
 * A phone, with something arriving on it.
 *
 * The most familiar object there is. For the moments the film wants a viewer
 * to feel *this reached a person* — a notification on a lock screen at a time
 * of day, which is how almost everyone first learns that something has gone
 * wrong at work.
 */
export function Phone({
  time,
  notification,
  feel,
}: {
  time: string
  notification?: { app: string; title: string; body: string }
  feel: Feel
}) {
  return (
    <div className="cf-phone">
      <div className="cf-phone-screen">
        <span className="cf-phone-notch" aria-hidden="true" />
        <span className="cf-phone-time">{time}</span>

        {notification ? (
          <motion.div
            className="cf-phone-note"
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...feel, type: 'spring', stiffness: 260, damping: 24 }}
          >
            <span className="cf-phone-app">{notification.app}</span>
            <span className="cf-phone-title">{notification.title}</span>
            <span className="cf-phone-body">{notification.body}</span>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}

/**
 * A system notification, top corner.
 *
 * Arrives over whatever is already on screen and leaves. For the memo landing
 * mid-task and for management noticing — an event with a place to be, rather
 * than a card the film cuts to.
 */
export function Toast({ app, text, on, feel }: { app: string; text: string; on: boolean; feel: Feel }) {
  return (
    <motion.div
      className="cf-toast"
      initial={false}
      animate={{ opacity: on ? 1 : 0, x: on ? 0 : 24, y: on ? 0 : -8 }}
      transition={{ ...feel, type: 'spring', stiffness: 300, damping: 26 }}
    >
      <span className="cf-toast-app">{app}</span>
      <span className="cf-toast-text">{text}</span>
    </motion.div>
  )
}

/**
 * An app icon with a count that will not clear.
 *
 * Three unanswered questions sitting on a home screen. Small, familiar, and it
 * carries dread better than a sentence can because every viewer knows the
 * feeling of a badge they have not dealt with.
 */
export function AppBadge({ label, n }: { label: string; n: number }) {
  return (
    <span className="cf-appicon">
      <i aria-hidden="true">{label.slice(0, 1)}</i>
      {n > 0 ? <b>{n}</b> : null}
    </span>
  )
}

/* --- desktop software ----------------------------------------------------- */

export type FileRow = { name: string; modified: string; size: string; kind?: 'dir' | 'file' | 'config' | 'bin'; selected?: boolean }

/**
 * A file browser, in list view.
 *
 * Name, date modified, size — the columns everyone has sorted by. The date
 * column is the one that matters here: `model_27_09_2024.bin` modified *today*
 * is the entire tell, and in a list view a viewer finds it themselves.
 */
export function Explorer({ path, rows, feel }: { path: string; rows: readonly FileRow[]; feel: Feel }) {
  return (
    <div className="cf-explorer">
      <div className="cf-exp-bar">
        <span className="cf-exp-nav" aria-hidden="true">
          ‹ ›
        </span>
        <span className="cf-exp-path">{path}</span>
      </div>
      <div className="cf-exp-head">
        <span>Name</span>
        <span>Date modified</span>
        <span>Size</span>
      </div>
      {rows.map((r, i) => (
        <motion.div
          key={r.name}
          className={r.selected ? 'cf-exp-row cf-exp-sel' : 'cf-exp-row'}
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ ...feel, delay: i * 0.03 }}
        >
          <span className="cf-exp-name">
            <i aria-hidden="true">{r.kind === 'dir' ? '▸' : r.kind === 'config' ? '⚙' : r.kind === 'bin' ? '▪' : '·'}</i>
            {r.name}
          </span>
          <span className="cf-exp-mod">{r.modified}</span>
          <span className="cf-exp-size">{r.size}</span>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * A browser, with the page in it.
 *
 * Tabs, a URL bar and a page. For the evidence frames, this is what makes a
 * capture read as *a thing on the internet you could go and open* rather than
 * as an image the film is asserting. The URL is the citation.
 */
export function Browser({ tabs, active, url, children }: { tabs: readonly string[]; active: number; url: string; children: ReactNode }) {
  return (
    <div className="cf-browser">
      <div className="cf-br-tabs">
        {tabs.map((t, i) => (
          <span key={t} className={i === active ? 'cf-br-tab cf-br-tab-on' : 'cf-br-tab'}>
            {t}
          </span>
        ))}
      </div>
      <div className="cf-br-url">
        <span className="cf-br-lock" aria-hidden="true" />
        {url}
      </div>
      <div className="cf-br-page">{children}</div>
    </div>
  )
}

/**
 * A calendar, with tomorrow on it.
 *
 * A month grid with one day ringed. The deadline as a thing on a wall, which
 * is how deadlines are actually felt — and unlike a countdown it shows what
 * else was happening that week, which is: nothing. It was an ordinary Friday.
 */
export function CalendarMonth({ days, today, deadline, feel }: { days: number; today: number; deadline: number; feel: Feel }) {
  return (
    <div className="cf-cal">
      <div className="cf-cal-grid">
        {Array.from({ length: days }, (_, i) => {
          const d = i + 1
          return (
            <motion.span
              key={d}
              className={d === deadline ? 'cf-cal-cell cf-cal-deadline' : d === today ? 'cf-cal-cell cf-cal-today' : 'cf-cal-cell'}
              initial={false}
              animate={{ opacity: d > deadline ? 0.3 : 1 }}
              transition={feel}
            >
              {d}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}

/**
 * A dialog nobody clicked.
 *
 * *Are you sure?* with two buttons. It never appeared — there was no
 * confirmation step, no approval gate, nothing between the command and the
 * overwrite. Drawn greyed out and unclicked, it shows the safeguard that was
 * not there, which is a far better frame than saying so.
 */
export function Dialog({ title, body, confirm, cancel, shown }: { title: string; body: string; confirm: string; cancel: string; shown: boolean }) {
  return (
    <div className={shown ? 'cf-dialog' : 'cf-dialog cf-dialog-absent'}>
      <span className="cf-dialog-title">{title}</span>
      <span className="cf-dialog-body">{body}</span>
      <span className="cf-dialog-btns">
        <i>{cancel}</i>
        <b>{confirm}</b>
      </span>
    </div>
  )
}
