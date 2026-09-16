import type { ReactNode } from 'react'
import { PALETTE } from '../palette'

/**
 * The wrapper every object in the library uses.
 *
 * `size` is the object's *width*: a number is px, a string is any CSS length,
 * so on the fixed 1920x1080 stage you can pass `"18cqw"` and it scales with
 * the frame instead of with the browser. Height always follows the viewBox.
 */
export function Prop({
  size = 120,
  name,
  viewBox,
  children,
}: {
  size?: number | string
  /** Goes on the element as `data-prop`, which makes frames easy to read. */
  name: string
  viewBox: string
  children: ReactNode
}) {
  return (
    <div
      className="s1-prop"
      data-prop={name}
      style={{ '--size': typeof size === 'number' ? `${size}px` : size } as React.CSSProperties}
    >
      <svg viewBox={viewBox} aria-hidden="true">
        {children}
      </svg>
    </div>
  )
}

/**
 * Fixed-seed noise in [0,1).
 *
 * Everything in this library that wants variety -- book widths, vent holes,
 * key rows -- takes it from here rather than from Math.random, so a screenshot
 * taken today can be compared with one taken next week.
 */
export function seeded(i: number) {
  const v = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return v - Math.floor(v)
}

/**
 * The neutral value ladder.
 *
 * Objects get variety from *value*, not from hue -- every hue in the palette
 * already means something (teal is the word, blue is a measurement, red is a
 * cost), so a coloured book or a coloured car would read as being one of
 * those. Anything that genuinely stands for a coded thing takes an explicit
 * `tone` instead.
 */
export const SHADES = [
  PALETTE.paperSheet,
  PALETTE.idle,
  PALETTE.paperFold,
  PALETTE.idleDeep,
  PALETTE.paperShade,
  PALETTE.idleAsleep,
] as const

export function shade(i: number) {
  return SHADES[Math.floor(seeded(i) * SHADES.length) % SHADES.length]
}
