/**
 * Overlay builders, so a beat can place handwriting in one short line.
 *
 * `Overlay['at']` wants `'50%'` strings. Every section got that wrong on its
 * first pass, and the failure is a type error rather than a visible one — so
 * these take plain numbers and do the conversion once.
 *
 * The rule these exist to make cheap: **a note must carry something the voice
 * does not** — a number, a label naming an object, a `?` on the confusing
 * thing, a brace measuring something. A note that transcribes the line being
 * spoken over it is the one banned pattern in this repo.
 */
import { type Overlay } from './overlays'

/**
 * Handwriting at a stage percentage, anchored by its **left edge**.
 *
 * That anchoring is why `centred` exists below, and it is worth knowing: a
 * note placed at `x: 50` does not sit in the middle of the frame, it *starts*
 * in the middle of the frame and runs right. Thirteen sections were built with
 * captions at 50 before a rendered frame made that obvious.
 */
export const note = (text: string, x: number, y: number, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at: { x: `${x}%`, y: `${y}%` },
  size: 'sm',
  ...extra,
})

/**
 * Handwriting centred **on** a point rather than starting at it.
 *
 * `Note` centres itself only when it is given a width — the width is what
 * switches on the translate and the text alignment — so this supplies one. Use
 * it for anything captioning a centred object, which is most captions.
 */
export const centred = (text: string, x: number, y: number, extra: Partial<Overlay> = {}): Overlay =>
  note(text, x, y, { width: '54%', ...extra })

/** A measuring brace under (or over) something, spanning `w` percent. */
export const brace = (
  label: string,
  x: number,
  y: number,
  w: number,
  extra: Partial<Overlay> = {},
): Overlay => ({
  kind: 'brace',
  text: label,
  at: { x: `${x}%`, y: `${y}%` },
  width: `${w}%`,
  ...extra,
})

/** A leader arrow. Unlike the others this is in 1920x1080 stage units. */
export const arrow = (
  from: { x: number; y: number },
  to: { x: number; y: number },
  extra: Partial<Overlay> = {},
): Overlay => ({ kind: 'arrow', from, to, ...extra })

/** It worked. §11 beat 3 -- a plan that never worked cannot break. */
export const tick = (x: number, y: number, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'tick',
  at: { x: `${x}%`, y: `${y}%` },
  ...extra,
})
