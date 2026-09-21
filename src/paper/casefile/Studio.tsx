import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Studio — the film as a published object.
 *
 * Everything else in this library is *inside* the frame. These are the things
 * that surround it: the voice track it is cut to, the captions, the vertical
 * crop it will be re-published in, the thumbnail, the chapter openers, the end
 * card, and the citations that let a viewer check any of it.
 *
 * They are not decoration. A film that cannot be cut to a waveform, cannot be
 * cropped to 9:16 without losing its subject, and cannot show where a number
 * came from is not finished, however good the middle is.
 */

const ink = PALETTE.ink
const soft = PALETTE.graphite
const red = PALETTE.red

/* --- the voice ------------------------------------------------------------ */

/**
 * The narration, as a shape.
 *
 * This film is voice-led — every visual is cut to a line Ahmad speaks — and a
 * waveform is the only honest way to plan that. `at` is playhead position;
 * `holds` marks the silences, which is where the frames that need reading go.
 *
 * The silences are the part worth designing. Apollo held a still for fourteen
 * seconds and got away with it because the highlight kept moving; our version
 * of that decision is made here, against the actual gaps in the voice.
 */
export function Waveform({
  bars,
  at,
  holds = [],
  feel,
}: {
  /** Amplitude per slice, 0–1. */
  bars: readonly number[]
  /** Playhead, 0–1. */
  at: number
  /** Ranges where the voice stops, as [from, to] in slice indices. */
  holds?: ReadonlyArray<[number, number]>
  feel: Feel
}) {
  const head = Math.round(Math.max(0, Math.min(1, at)) * (bars.length - 1))
  const quiet = (i: number) => holds.some(([a, b]) => i >= a && i <= b)

  return (
    <div className="cf-wave">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className={quiet(i) ? 'cf-wave-bar cf-wave-hold' : 'cf-wave-bar'}
          style={{ height: `${Math.max(6, h * 100)}%` }}
          initial={false}
          animate={{ backgroundColor: i <= head ? (quiet(i) ? red : ink) : 'rgba(43,41,38,0.18)' }}
          transition={{ ...feel, delay: 0 }}
        />
      ))}
    </div>
  )
}

/**
 * Captions, keyword-only.
 *
 * The redundancy principle says do not put the narration on screen. It also
 * says a few **keywords** anchored to a drawing help rather than hurt — and a
 * caption track is an accessibility obligation regardless.
 *
 * So this shows the spoken line at caption weight, with the one or two words
 * that matter emphasised. It is a subtitle, not a slide: it sits at the bottom
 * edge, it never becomes the subject, and the film must read with it turned
 * off.
 */
export function Caption({ text, stress = [] }: { text: string; stress?: readonly string[] }) {
  const parts = text.split(' ')

  return (
    <p className="cf-caption">
      {parts.map((w, i) => (
        <span key={`${w}-${i}`} className={stress.includes(w.replace(/[.,]/g, '')) ? 'cf-caption-stress' : undefined}>
          {w}{' '}
        </span>
      ))}
    </p>
  )
}

/* --- formats -------------------------------------------------------------- */

/**
 * The vertical crop, over a frame built for 16:9.
 *
 * A short is not a different edit; it is the same frame with the sides gone.
 * Composing against this guide from the start is the difference between a
 * clip that works vertically and one where the subject is in the missing 44%.
 *
 * The centre column is what survives. Anything load-bearing outside it is a
 * decision to re-shoot later.
 */
export function VerticalGuide({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <div className="cf-vguide">
      {children}
      {on ? (
        <span className="cf-vguide-mask" aria-hidden="true">
          <i />
          <b />
          <i />
        </span>
      ) : null}
    </div>
  )
}

/**
 * The thumbnail, composed in the same system as the film.
 *
 * The title package already specifies it: a management question, a huge
 * answer, the transfer path faint behind. Building it here rather than in a
 * separate tool means it uses the film's real type and palette, and it can be
 * re-rendered the moment either changes.
 *
 * No robot face, no red eyes, no "AI IS ALIVE" — the title carries the event,
 * the thumbnail carries the denial.
 */
export function Thumbnail({
  question,
  answer,
  children,
}: {
  question: string
  answer: string
  children?: ReactNode
}) {
  return (
    <div className="cf-thumb">
      <div className="cf-thumb-bg" aria-hidden="true">
        {children}
      </div>
      <span className="cf-thumb-q">{question}</span>
      <span className="cf-thumb-a">{answer}</span>
    </div>
  )
}

/* --- structure ------------------------------------------------------------ */

/**
 * A section opening.
 *
 * Nine of these across the film. A number and two or three words, held for
 * about a second — enough to mark a boundary the viewer feels, short enough
 * that it never becomes a chapter they are waiting out.
 */
export function ChapterCard({ n, title }: { n: number; title: string }) {
  return (
    <div className="cf-chaptercard">
      <span className="cf-chaptercard-n">{String(n).padStart(2, '0')}</span>
      <span className="cf-chaptercard-t">{title}</span>
    </div>
  )
}

/**
 * The end card.
 *
 * The board is explicit about what must **not** be here: no Apollo logo, no
 * scary AI face, no warning icon, no statistics card. The film ends on the
 * mechanism — a destination and the road that was generated toward it — and
 * whatever furniture YouTube needs sits around that rather than replacing it.
 */
export function EndCard({ line, children }: { line: string; children?: ReactNode }) {
  return (
    <div className="cf-endcard">
      <div className="cf-endcard-art">{children}</div>
      <p className="cf-endcard-line">{line}</p>
      <div className="cf-endcard-slots" aria-hidden="true">
        <span />
        <span />
      </div>
    </div>
  )
}

/* --- provenance ----------------------------------------------------------- */

/**
 * A footnote marker.
 *
 * A small superscript beside a claim, tying it to the source list. Costs
 * almost nothing on screen and means the film can make a specific claim
 * without stopping to attribute it out loud every time.
 */
export function Cite({ n }: { n: number }) {
  return <sup className="cf-cite">{n}</sup>
}

/**
 * Where everything came from.
 *
 * Held for a few seconds near the end, and the frame a sceptical viewer
 * screenshots. Every row is a document this film actually used — if a source
 * is not on this list, no claim in the film may rest on it.
 */
export function Sources({ rows }: { rows: ReadonlyArray<{ n: number; org: string; doc: string }> }) {
  return (
    <ol className="cf-sources">
      {rows.map((r) => (
        <li key={r.n}>
          <span className="cf-sources-n">{r.n}</span>
          <span className="cf-sources-org">{r.org}</span>
          <span className="cf-sources-doc">{r.doc}</span>
        </li>
      ))}
    </ol>
  )
}

/**
 * The chain from a frame back to its source.
 *
 * Claim → document → publisher. Three links, drawn once, near the end. It is
 * the film showing its working, and it is cheap — but it is the difference
 * between *trust me* and *here is the paper*.
 */
export function Provenance({ claim, doc, org, feel }: { claim: string; doc: string; org: string; feel: Feel }) {
  return (
    <div className="cf-prov">
      {[claim, doc, org].map((t, i) => (
        <motion.span
          key={t}
          className={i === 0 ? 'cf-prov-node cf-prov-claim' : 'cf-prov-node'}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...feel, delay: i * 0.1 }}
        >
          {t}
        </motion.span>
      ))}
    </div>
  )
}

/**
 * A quote formatted to be lifted out of the film.
 *
 * People screenshot one frame and post it. Deciding *which* frame that is, and
 * making it legible on its own with the attribution attached, is a design
 * decision — not an accident to be discovered after publication.
 */
export function PullCard({ quote, who }: { quote: string; who: string }) {
  return (
    <figure className="cf-pullcard">
      <blockquote>{quote}</blockquote>
      <figcaption>{who}</figcaption>
    </figure>
  )
}

/**
 * The bar the eye follows while a frame is held.
 *
 * Not a progress bar for the film — a progress bar for **this shot**. It is
 * what lets a fourteen-second hold feel deliberate rather than stalled, and it
 * is the smallest possible version of the trick Apollo used.
 */
export function HoldBar({ at, feel }: { at: number; feel: Feel }) {
  return (
    <span className="cf-holdbar" aria-hidden="true">
      <motion.i
        initial={false}
        animate={{ width: `${Math.max(0, Math.min(1, at)) * 100}%` }}
        transition={{ ...feel, ease: 'linear' }}
      />
    </span>
  )
}
