import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Transitions and chrome.
 *
 * An earlier pass argued these were "beat moves, not components" and refused
 * to build them. That was half right and wholly unhelpful: the *timing* of a
 * transition belongs to a beat, but the **shape** of one is a thing that
 * should be written once and reused. A rewind hand-rolled in nine sections is
 * nine slightly different rewinds.
 *
 * Everything here wraps content rather than replacing it, so a transition can
 * be put around actors that already exist without rebuilding them.
 */

/** Runs content backwards. The hook's rewind, and §9's return to the gap. */
export function Rewind({ active, children, feel }: { active: boolean; children: ReactNode; feel: Feel }) {
  return (
    <motion.div
      className="cf-rewind"
      animate={{ scaleX: active ? -1 : 1, opacity: active ? 0.55 : 1 }}
      transition={feel}
    >
      {children}
    </motion.div>
  )
}

/**
 * The one pull-back in the film.
 *
 * §7's turn: everything the viewer has watched shrinks and is revealed to have
 * been inside something. Reserved — the art direction allows exactly one, and
 * a second would spend the first.
 */
export function Pullback({ to, children, feel }: { to: number; children: ReactNode; feel: Feel }) {
  return (
    <motion.div className="cf-pullback" animate={{ scale: to }} transition={feel} style={{ transformOrigin: 'center' }}>
      {children}
    </motion.div>
  )
}

/** A publication change. The only place in the film a hard cut is allowed. */
export function HardCut({ from, to }: { from: string; to: string }) {
  return (
    <div className="cf-hardcut">
      <span className="cf-hardcut-from">{from}</span>
      <span className="cf-hardcut-arrow" aria-hidden="true">
        →
      </span>
      <span className="cf-hardcut-to">{to}</span>
    </div>
  )
}

/** Evidence becoming our drawing of it. Crossfade, so both are briefly true. */
export function Morph({ showing, source, drawn, feel }: { showing: 'source' | 'drawn'; source: ReactNode; drawn: ReactNode; feel: Feel }) {
  return (
    <div className="cf-morph">
      <motion.div animate={{ opacity: showing === 'source' ? 1 : 0 }} transition={feel}>
        {source}
      </motion.div>
      <motion.div className="cf-morph-over" animate={{ opacity: showing === 'drawn' ? 1 : 0 }} transition={feel}>
        {drawn}
      </motion.div>
    </div>
  )
}

/** Back to the receipt. A reconstruction pinned to the page it came from. */
export function Snapback({ children, feel }: { children: ReactNode; feel: Feel }) {
  return (
    <motion.div className="cf-snapback" initial={{ scale: 1.06, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={feel}>
      {children}
    </motion.div>
  )
}

/** Page 1 → 2 → 3 of one document, so the sheets read as one object. */
export function PageTurn({ page, of, feel }: { page: number; of: number; feel: Feel }) {
  return (
    <div className="cf-pageturn">
      {Array.from({ length: of }, (_, i) => (
        <motion.span key={i} animate={{ opacity: i + 1 === page ? 1 : 0.28 }} transition={feel} />
      ))}
      <em>
        {page} / {of}
      </em>
    </div>
  )
}

/** Where we are in the film. Continuity across section boundaries. */
export function Waypoint({ section, title }: { section: number; title: string }) {
  return (
    <div className="cf-waypoint">
      <span>§{String(section).padStart(2, '0')}</span>
      <em>{title}</em>
    </div>
  )
}

/** Punctuation. A held black frame, used where silence is the point. */
export function BlackFrame({ on, feel }: { on: boolean; feel: Feel }) {
  return <motion.div className="cf-blackframe" animate={{ opacity: on ? 1 : 0 }} transition={feel} />
}

/** A document that has not arrived yet. Makes fetching feel like fetching. */
export function Loading({ label }: { label: string }) {
  return (
    <div className="cf-loading">
      <span className="cf-loading-bar" aria-hidden="true" />
      <em>{label}</em>
    </div>
  )
}

/* --- chrome --------------------------------------------------------------- */

/** Where a web capture came from, in the browser's own furniture. */
export function UrlBar({ url, secure = true }: { url: string; secure?: boolean }) {
  return (
    <div className="cf-urlbar">
      {secure ? <span className="cf-urlbar-lock" aria-hidden="true" /> : null}
      <span>{url}</span>
    </div>
  )
}

/** Which page of a real document is on screen. Proof it is a document. */
export function PageNumber({ n }: { n: number }) {
  return <span className="cf-pagenum">{n}</span>
}

/** A date from the source, set as a date. */
export function Timestamp({ value, label }: { value: string; label?: string }) {
  return (
    <div className="cf-timestamp">
      {label ? <span>{label}</span> : null}
      <em>{value}</em>
    </div>
  )
}

/** Provenance, at the size a broadcast lower-third would use. */
export function LowerThird({ org, doc, url }: { org: string; doc: string; url?: string }) {
  return (
    <div className="cf-lowerthird">
      <span className="cf-lowerthird-org">{org}</span>
      <span className="cf-lowerthird-doc">{doc}</span>
      {url ? <span className="cf-lowerthird-url">{url}</span> : null}
    </div>
  )
}

/** The smallest possible credit, for frames with no room for anything more. */
export function Attribution({ text }: { text: string }) {
  return <span className="cf-attrib">{text}</span>
}

/**
 * A numbered exhibit tag.
 *
 * Lets a late section point back at a frame by number — "exhibit 4" — instead
 * of describing it again. Cheap continuity for a film that returns to the same
 * six pieces of evidence repeatedly.
 */
export function ExhibitTag({ n, label }: { n: number; label?: string }) {
  return (
    <span className="cf-exhibit">
      <i>{n}</i>
      {label ? <em>{label}</em> : null}
    </span>
  )
}

/** A source sleeve on its own, for frames where the page is not shown. */
export function Sleeve({ org, doc }: { org: string; doc: string }) {
  return (
    <div className="cf-tab cf-tab-loose">
      <span className="cf-tab-org">{org}</span>
      <span className="cf-tab-doc">{doc}</span>
    </div>
  )
}

/** Paper depth, for placing a sheet on the desk without the Evidence frame. */
export function Sheet({ children }: { children: ReactNode }) {
  return <div className="cf-plain-sheet">{children}</div>
}

/** A dimming veil, for holding one thing while everything else recedes. */
export function Veil({ on, feel }: { on: boolean; feel: Feel }) {
  return <motion.div className="cf-veil" animate={{ opacity: on ? 1 : 0 }} transition={feel} aria-hidden="true" />
}

/** A caret that marks where the film is pointing, without a full highlight. */
export function Pointer({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  return (
    <span className={`cf-pointer cf-pointer-${direction}`} aria-hidden="true">
      <svg viewBox="0 0 24 14">
        <path d="M1 7 H18" stroke={PALETTE.ink} strokeWidth="1.6" fill="none" />
        <path d="M18 2 L23 7 L18 12 Z" fill={PALETTE.ink} />
      </svg>
    </span>
  )
}
