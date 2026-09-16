import { INK } from '../ink'
import { PALETTE, ROLE, type Role } from '../palette'
import { Prop, seeded, shade } from './frame'

/**
 * Books, shelves and the room they live in.
 *
 * A library is the wrong metaphor for a *cost of absence* -- a book on a shelf
 * is already available, so shelving is free and retrieval is free -- but it is
 * the right one for capacity, indexing, and "we own more than we can read".
 * See skills/STORY_STRUCTURE.md on choosing the place before the picture.
 */

/** One book. `shut` is a cover, `open` is a spread, `spine` is on a shelf. */
export function Book({
  size = 64,
  state = 'shut',
  tone,
  lines = 2,
}: {
  size?: number | string
  state?: 'shut' | 'open'
  /** Only when the book stands for a coded thing. Otherwise it is paper. */
  tone?: Role
  lines?: number
}) {
  const fill = tone ? PALETTE.paperWhite : PALETTE.paperSheet
  const edge = tone ? ROLE[tone] : INK

  if (state === 'open') {
    return (
      <Prop size={size} name="book-open" viewBox="0 0 120 84">
        <g fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          {/* two pages that sag away from the spine, which is what says "open" */}
          <path d="M60 16Q34 6 8 12L14 70Q38 62 60 72Z" fill={PALETTE.paperWhite} />
          <path d="M60 16Q86 6 112 12L106 70Q82 62 60 72Z" fill={PALETTE.paperLight} />
          <path d="M60 16v56" strokeWidth="2.6" />
          <g strokeWidth="1.9" opacity="0.42" stroke={edge}>
            {Array.from({ length: lines }, (_, i) => (
              <path key={`l${i}`} d={`M18 ${26 + i * 11}q18-4 34 1`} />
            ))}
            {Array.from({ length: lines }, (_, i) => (
              <path key={`r${i}`} d={`M68 ${27 + i * 11}q18-5 34-1`} />
            ))}
          </g>
        </g>
      </Prop>
    )
  }

  return (
    <Prop size={size} name="book" viewBox="0 0 64 88">
      <g stroke={INK} strokeWidth="3" strokeLinejoin="round">
        {/* page block, offset so the cover reads as a cover and not a card */}
        <path d="M14 10h44v70H14z" fill={PALETTE.paperWhite} strokeWidth="2.2" />
        <path d="M6 6h46v74H6z" fill={fill} />
        <path d="M14 6v74" strokeWidth="2.2" opacity="0.5" />
        <g fill="none" stroke={edge} strokeWidth="2.6" strokeLinecap="round" opacity={tone ? 0.9 : 0.45}>
          {Array.from({ length: lines }, (_, i) => (
            <path key={i} d={`M22 ${26 + i * 12}h${22 - i * 6}`} />
          ))}
        </g>
      </g>
    </Prop>
  )
}

/**
 * Books standing on a plank. Widths, heights and lean come from the seed, so
 * two shelves with different seeds look like different shelves.
 */
function standing(seed: number, x0: number, x1: number, floor: number, tall: number) {
  const out: React.ReactNode[] = []
  let x = x0
  let i = 0
  while (x < x1 - 8) {
    const n = seeded(seed * 31 + i)
    const w = 7 + Math.round(n * 9)
    if (x + w > x1) break
    /* One gap per shelf, and one leaner. A full tidy shelf reads as a barcode. */
    const gap = seeded(seed * 17 + i + 5) > 0.88
    if (!gap) {
      const h = tall * (0.72 + seeded(seed * 7 + i) * 0.28)
      const lean = seeded(seed * 13 + i) > 0.93 ? 8 : 0
      out.push(
        <g key={`${seed}-${i}`} transform={lean ? `rotate(${lean} ${x + w / 2} ${floor})` : undefined}>
          <rect
            x={x}
            y={floor - h}
            width={w}
            height={h}
            rx="1.5"
            fill={shade(seed * 5 + i)}
            stroke={INK}
            strokeWidth="1.9"
          />
          <path d={`M${x + 2} ${floor - h + 6}h${w - 4}`} stroke={INK} strokeWidth="1.2" opacity="0.4" />
        </g>,
      )
    }
    x += w + 2
    i += 1
  }
  return out
}

/** A single shelf, seen straight on. */
export function Shelf({ size = 220, seed = 1 }: { size?: number | string; seed?: number }) {
  return (
    <Prop size={size} name="shelf" viewBox="0 0 220 96">
      <g fill="none" stroke={INK} strokeLinejoin="round">
        {standing(seed, 14, 206, 78, 62)}
        <path d="M8 78h204" strokeWidth="3.4" />
        <path d="M12 78 18 90" strokeWidth="2.4" opacity="0.5" />
        <path d="M208 78 202 90" strokeWidth="2.4" opacity="0.5" />
      </g>
    </Prop>
  )
}

/**
 * The library: a case of shelves.
 *
 * `lit` puts a warm wash inside it, which is the same warm light used for a
 * door being open or a machine being on.
 */
export function Library({
  size = 260,
  shelves = 4,
  seed = 1,
  lit = false,
}: {
  size?: number | string
  shelves?: number
  seed?: number
  lit?: boolean
}) {
  const top = 26
  const step = (250 - top) / shelves

  return (
    <Prop size={size} name="library" viewBox="0 0 240 268">
      {lit ? <rect x="16" y={top} width="208" height={250 - top} fill={PALETTE.glowPale} /> : null}

      <g fill="none" stroke={INK} strokeLinejoin="round" strokeLinecap="round">
        {/* the cornice is what makes a rectangle read as furniture */}
        <path d="M6 26h228l-10-16H16Z" fill={PALETTE.paperShade} strokeWidth="3" />
        <path d="M10 26h220v226H10z" fill={lit ? 'none' : PALETTE.paperSheet} strokeWidth="3.2" />

        {Array.from({ length: shelves }, (_, r) => {
          const floor = top + step * (r + 1) - 6
          return (
            <g key={r}>
              {standing(seed * 3 + r, 20, 220, floor, step * 0.66)}
              <path d={`M12 ${floor}h216`} strokeWidth="2.8" />
            </g>
          )
        })}

        <path d="M10 252h220v10H10z" fill={PALETTE.paperShade} strokeWidth="3" />
      </g>
    </Prop>
  )
}

/** Books lying down. Useful when a pile has to look like a pile. */
export function BookStack({ size = 120, count = 4 }: { size?: number | string; count?: number }) {
  const h = 15
  return (
    <Prop size={size} name="book-stack" viewBox={`0 0 130 ${count * h + 16}`}>
      <g stroke={INK} strokeWidth="2.6" strokeLinejoin="round">
        {Array.from({ length: count }, (_, i) => {
          const w = 78 + Math.round(seeded(i + 3) * 34)
          const x = 8 + Math.round(seeded(i + 9) * 12)
          const y = count * h + 2 - (i + 1) * h
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h - 2} rx="2" fill={shade(i + 2)} />
              <path d={`M${x + 5} ${y + 3}v${h - 8}`} strokeWidth="1.6" opacity="0.45" />
            </g>
          )
        })}
      </g>
    </Prop>
  )
}
