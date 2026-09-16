import { INK } from '../ink'
import { PALETTE } from '../palette'
import { Prop } from './frame'

/**
 * Animals, in side view, for the same reason the word cards say "dog" and
 * "cat": a concrete noun is easier to hold than an abstract one, and the
 * viewer needs no explanation of what a dog is.
 *
 * Legs stay short and plain. An earlier figure had long jointed legs and read
 * as comic rather than simple, which is the wrong note next to a number.
 */

/** Four short legs, in one place, so the animals stay siblings. */
function legs(xs: number[], top: number, bottom: number) {
  return (
    <g strokeWidth="3.4" strokeLinecap="round">
      {xs.map((x) => (
        <path key={x} d={`M${x} ${top}v${bottom - top}`} />
      ))}
    </g>
  )
}

export function Dog({ size = 150, sits = false }: { size?: number | string; sits?: boolean }) {
  return (
    <Prop size={size} name="dog" viewBox="0 0 170 118">
      <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
        {/* tail up: a dog with a level tail reads as a fox */}
        <path d="M130 58q18-8 15-30" fill="none" strokeWidth="3.6" />
        <path d="M62 46h50a24 24 0 0 1 0 48H62a24 24 0 0 1 0-48Z" fill={PALETTE.paperWhite} />
        {sits ? (
          <>
            {/* the haunch does the sitting; a wedge behind read as a ramp */}
            <circle cx="110" cy="84" r="19" fill={PALETTE.paperSheet} strokeWidth="2.8" />
            {legs([74, 88], 92, 106)}
          </>
        ) : (
          legs([70, 86, 106, 120], 92, 106)
        )}
        <circle cx="44" cy="48" r="21" fill={PALETTE.paperWhite} />
        {/* muzzle */}
        <path d="M26 52q-14 0-14 7t14 5" fill={PALETTE.paperSheet} strokeWidth="2.8" />
        <circle cx="14" cy="57" r="3.2" fill={INK} stroke="none" />
        <path d="M50 30q14-10 18 4q-10 8-20-1Z" fill={PALETTE.paperShade} strokeWidth="2.6" />
        <circle cx="38" cy="44" r="2.8" fill={INK} stroke="none" />
      </g>
    </Prop>
  )
}

export function Cat({ size = 150 }: { size?: number | string }) {
  return (
    <Prop size={size} name="cat" viewBox="0 0 170 118">
      <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
        {/* the curl is the whole cat */}
        <path d="M128 62q26-4 22-30-3-13-14-8" fill="none" strokeWidth="3.6" />
        <path d="M62 52h46a22 22 0 0 1 0 44H62a22 22 0 0 1 0-44Z" fill={PALETTE.paperWhite} />
        {legs([70, 84, 104, 118], 94, 106)}
        <circle cx="44" cy="52" r="19" fill={PALETTE.paperWhite} />
        <path d="M30 40 28 22 44 34Z" fill={PALETTE.paperSheet} strokeWidth="2.6" />
        <path d="M58 40 62 23 46 33Z" fill={PALETTE.paperSheet} strokeWidth="2.6" />
        <g fill={INK} stroke="none">
          <circle cx="37" cy="50" r="2.6" />
          <circle cx="51" cy="50" r="2.6" />
        </g>
        <g strokeWidth="1.9" opacity="0.55">
          <path d="M32 60 18 57M32 63 18 66M56 60 70 57M56 63 70 66" />
        </g>
      </g>
    </Prop>
  )
}

export function Bird({ size = 90 }: { size?: number | string }) {
  return (
    <Prop size={size} name="bird" viewBox="0 0 110 96">
      <g stroke={INK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M78 44 100 32 96 54Z" fill={PALETTE.paperSheet} strokeWidth="2.6" />
        <ellipse cx="52" cy="46" rx="26" ry="21" fill={PALETTE.paperWhite} />
        <circle cx="28" cy="30" r="14" fill={PALETTE.paperWhite} />
        <path d="M15 30 2 34 15 38Z" fill={PALETTE.paperShade} strokeWidth="2.4" />
        <path d="M48 40q18 4 20 22-18 2-26-10Z" fill={PALETTE.paperSheet} strokeWidth="2.4" />
        <circle cx="24" cy="27" r="2.4" fill={INK} stroke="none" />
        <g strokeWidth="2.6">
          <path d="M44 66v14M58 66v14M40 80h8M54 80h8" />
        </g>
      </g>
    </Prop>
  )
}
