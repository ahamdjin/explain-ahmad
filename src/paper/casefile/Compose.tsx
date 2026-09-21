import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { PALETTE } from '../palette'
import { type Feel } from '../motion'

/**
 * Composition — the arrangements, not the pieces.
 *
 * Two hundred components and the film still has to decide, every beat, *where
 * things go*. That decision is where the congestion came from: three good
 * objects placed badly is a crowded frame, and placing them by hand in every
 * beat guarantees they will drift.
 *
 * These are the permitted arrangements. A beat picks one and fills the slots,
 * which makes the composition a **choice from a short list** rather than a set
 * of coordinates — and means a section can be re-laid out by changing one word.
 *
 * The rule they encode: **one idea per frame.** Every layout below has room for
 * exactly one subject and at most one supporting element.
 */

/* --- the permitted frames -------------------------------------------------- */

/**
 * One thing, centred, nothing else.
 *
 * For slams, pull-quotes, single objects and every moment the film wants the
 * viewer to have no choice about where to look. The most-used layout in any
 * good explainer and the one we kept failing to use.
 */
export function Solo({ children }: { children: ReactNode }) {
  return <div className="cf-lay cf-lay-solo">{children}</div>
}

/**
 * Evidence left, explanation right.
 *
 * The workhorse. The document holds its place while the drawn layer does the
 * talking, and the fixed ratio means the page is the same size in every beat
 * that uses it — which is what lets a viewer stop re-reading it.
 */
export function Aside({ main, side }: { main: ReactNode; side: ReactNode }) {
  return (
    <div className="cf-lay cf-lay-aside">
      <div className="cf-lay-main">{main}</div>
      <div className="cf-lay-side">{side}</div>
    </div>
  )
}

/**
 * Two things of equal weight.
 *
 * For comparisons where neither side is the subject — asked-for against
 * also-did, nudged against not, planned against happened. Equal columns
 * deliberately: the moment one is bigger the frame has made the argument
 * before the voice has.
 */
export function Pair({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="cf-lay cf-lay-pair">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}

/**
 * A subject, with something parked.
 *
 * For the beats where an object earned earlier has to stay on screen without
 * competing — the monitoring switch after it has flipped, the goal strip, the
 * obstacle. The parked slot is small, cornered and never animated.
 */
export function Parked({ children, parked, corner = 'tr' }: { children: ReactNode; parked: ReactNode; corner?: 'tl' | 'tr' | 'bl' | 'br' }) {
  return (
    <div className="cf-lay cf-lay-parked">
      {children}
      <div className={`cf-lay-park cf-lay-park-${corner}`}>{parked}</div>
    </div>
  )
}

/**
 * A strip across the bottom.
 *
 * For the standing conditions: the goal, the chapter bar, the caption. Fixed
 * height, fixed position, and nothing else may live there — a film where the
 * bottom edge sometimes holds furniture and sometimes holds the subject has no
 * bottom edge.
 */
export function Footer({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  return (
    <div className="cf-lay cf-lay-footer">
      <div className="cf-lay-body">{children}</div>
      <div className="cf-lay-foot">{footer}</div>
    </div>
  )
}

/**
 * Face camera beside the frame.
 *
 * The only arrangement allowed to put Ahmad next to evidence, and it is
 * deliberately lopsided — he is the smaller element. The art direction
 * forbids face cam beside dense terminal output, so this layout is for
 * interpretation moments only.
 */
export function Host({ frame, host }: { frame: ReactNode; host: ReactNode }) {
  return (
    <div className="cf-lay cf-lay-host">
      <div className="cf-lay-frame">{frame}</div>
      <div className="cf-lay-hostslot">{host}</div>
    </div>
  )
}

/**
 * Three in a row, landing one at a time.
 *
 * For the chain, the three unasked steps, the three-part recap. Three is the
 * limit: four reads as a list and a list is read rather than seen.
 */
export function Triptych({ items, shown, feel }: { items: readonly ReactNode[]; shown: number; feel: Feel }) {
  return (
    <div className="cf-lay cf-lay-tri">
      {items.slice(0, 3).map((it, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: i < shown ? 1 : 0.12, y: i < shown ? 0 : 6 }}
          transition={{ ...feel, delay: i * 0.08 }}
        >
          {it}
        </motion.div>
      ))}
    </div>
  )
}

/* --- production furniture -------------------------------------------------- */

/**
 * Where a sound lands.
 *
 * The art direction asks for tiny ordinary interface sounds and forbids
 * drones, sirens and risers. Marking the cues in the build means the edit
 * inherits them instead of guessing — and it makes an over-scored section
 * visible before it is heard.
 */
export function SfxCue({ name, at }: { name: string; at: number }) {
  return (
    <span className="cf-sfx" style={{ left: `${at}%` }} title={name}>
      <i aria-hidden="true" />
      <em>{name}</em>
    </span>
  )
}

/**
 * Broadcast guides.
 *
 * Title-safe and action-safe, plus thirds. A dev overlay — it never ships, and
 * it is the difference between "it looks fine here" and "it looks fine on a
 * phone with a progress bar over the bottom eighth".
 */
export function Guides({ on }: { on: boolean }) {
  if (!on) return null

  return (
    <div className="cf-guides" aria-hidden="true">
      <span className="cf-guide-action" />
      <span className="cf-guide-title" />
      <span className="cf-guide-thirds" />
    </div>
  )
}

/**
 * What a beat is, on the beat.
 *
 * Number, relation and the exact line of voice over it. A dev overlay for
 * reviewing a section without a script open in another window — and it catches
 * the commonest error in this project, a visual that no longer matches the
 * sentence it was built for.
 */
export function BeatTag({ n, relation, vo }: { n: number; relation: string; vo: string }) {
  return (
    <div className="cf-beattag">
      <span className="cf-beattag-n">{String(n).padStart(2, '0')}</span>
      <span className="cf-beattag-rel">{relation}</span>
      <span className="cf-beattag-vo">{vo}</span>
    </div>
  )
}

/**
 * Every beat of a section at once.
 *
 * The contact sheet, in the app rather than as an exported PNG. It is the only
 * way to see repetition — a section whose thumbnails all look the same is a
 * section that will feel the same, and that is invisible while building one
 * beat at a time.
 */
export function ContactSheet({ frames }: { frames: readonly ReactNode[] }) {
  return (
    <div className="cf-contact">
      {frames.map((f, i) => (
        <div className="cf-contact-cell" key={i}>
          <span className="cf-contact-n">{i + 1}</span>
          <div className="cf-contact-art">{f}</div>
        </div>
      ))}
    </div>
  )
}

/**
 * A colour, and whether it may be used here.
 *
 * The palette is small and the rules on it are strict — red is spent, not
 * spread. A swatch that says where each colour is permitted keeps that
 * enforceable rather than remembered.
 */
export function Swatch({ name, value, rule }: { name: string; value: string; rule: string }) {
  return (
    <div className="cf-swatch">
      <span className="cf-swatch-chip" style={{ background: value }} aria-hidden="true" />
      <span className="cf-swatch-name">{name}</span>
      <span className="cf-swatch-rule">{rule}</span>
    </div>
  )
}

/**
 * The palette, with its rules attached.
 *
 * Four colours and a ground. Everything in this film is one of these, and the
 * discipline is the reason the red lands when it finally arrives.
 */
export function Palette() {
  const rows = [
    { name: 'ink', value: PALETTE.ink, rule: 'everything typed, every line' },
    { name: 'graphite', value: PALETTE.graphite, rule: 'secondary, labels, the pen' },
    { name: 'green', value: PALETTE.green, rule: 'live system state only' },
    { name: 'red', value: PALETTE.red, rule: 'destructive acts and the lie — nowhere else' },
    { name: 'paper', value: PALETTE.paper, rule: 'the ground' },
  ]

  return (
    <div className="cf-palette">
      {rows.map((r) => (
        <Swatch key={r.name} {...r} />
      ))}
    </div>
  )
}
