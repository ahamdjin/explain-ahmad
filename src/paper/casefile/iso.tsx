import { PALETTE } from '../palette'

/**
 * Isometric projection, shared.
 *
 * `Diagrams` had these privately and `Hardware` needed exactly the same
 * geometry — and two copies of a projection is two worlds that will disagree
 * about where the successor server is. One file, so a machine drawn in a map
 * and the same machine drawn as hardware occupy the same space.
 */

const COS30 = Math.cos(Math.PI / 6)
const SIN30 = 0.5

/** World (x, y, z) to screen. y runs away from the viewer, z is height. */
export function iso(x: number, y: number, z = 0): [number, number] {
  return [(x - y) * COS30, (x + y) * SIN30 - z]
}

export function pts(list: Array<[number, number]>): string {
  return list.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
}

/**
 * One box in the world, drawn as three visible faces.
 *
 * The three faces must not share a fill. An earlier version gave the left and
 * right the same value, which flattens the box into an outline drawing — the
 * whole reason to project isometrically is that a viewer reads volume from
 * *tonal difference between planes*, not from the angles. Top lightest, left
 * mid, right darkest, as if the light comes from the upper left.
 */
export function Block({
  x,
  y,
  w,
  d,
  h,
  face = PALETTE.paperWhite,
  stroke = PALETTE.ink,
  top = PALETTE.paperWhite,
  sw = 1.1,
}: {
  x: number
  y: number
  w: number
  d: number
  h: number
  face?: string
  stroke?: string
  top?: string
  sw?: number
}) {
  const a = iso(x, y, 0)
  const b = iso(x + w, y, 0)
  const c = iso(x + w, y + d, 0)
  const e = iso(x, y + d, 0)
  const A = iso(x, y, h)
  const B = iso(x + w, y, h)
  const C = iso(x + w, y + d, h)
  const E = iso(x, y + d, h)

  return (
    <g>
      {/* left face — mid value */}
      <polygon points={pts([a, e, E, A])} fill={face} stroke={stroke} strokeWidth={sw} />
      <polygon points={pts([a, e, E, A])} fill={PALETTE.ink} opacity="0.07" stroke="none" />
      {/* right face — darkest, turned away from the light */}
      <polygon points={pts([e, c, C, E])} fill={face} stroke={stroke} strokeWidth={sw} />
      <polygon points={pts([e, c, C, E])} fill={PALETTE.ink} opacity="0.16" stroke="none" />
      {/* top — lightest */}
      <polygon points={pts([A, B, C, E])} fill={top} stroke={stroke} strokeWidth={sw} />
      {/* b is the near-bottom corner; named so the face order above reads */}
      <polygon points={pts([a, b, c, e])} fill="none" stroke="none" />
    </g>
  )
}
