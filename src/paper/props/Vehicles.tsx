import { INK } from '../ink'
import { PALETTE } from '../palette'
import { Prop } from './frame'

/**
 * Things that move other things.
 *
 * These exist for one job: a journey with a *duration*. A car or a van makes
 * "this took time to arrive" self-evident in a way an arrow never does, which
 * is exactly what a fetch from storage needs.
 */

function wheels(xs: number[], y: number, r = 15) {
  return (
    <g strokeWidth="3">
      {xs.map((x) => (
        <g key={x}>
          <circle cx={x} cy={y} r={r} fill={PALETTE.paperShade} />
          <circle cx={x} cy={y} r={r * 0.4} fill={PALETTE.paperWhite} strokeWidth="2.4" />
        </g>
      ))}
    </g>
  )
}

/** Speed lines. Two or three, behind -- more and it reads as rain. */
function speed(y: number, from: number) {
  return (
    <g stroke={INK} strokeWidth="2.6" strokeLinecap="round" opacity="0.45">
      <path d={`M${from} ${y}h22`} />
      <path d={`M${from + 6} ${y + 14}h16`} />
      <path d={`M${from + 2} ${y + 28}h20`} />
    </g>
  )
}

export function Car({ size = 200, moving = false }: { size?: number | string; moving?: boolean }) {
  return (
    <Prop size={size} name="car" viewBox="0 0 240 116">
      {moving ? speed(38, 4) : null}
      <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
        <path d="M34 82Q36 56 58 52L78 28h68l26 24q22 4 24 30Z" fill={PALETTE.paperWhite} />
        <path d="M82 34h26v18H66Z" fill={PALETTE.paperShade} strokeWidth="2.6" />
        <path d="M116 34h26l16 18h-42Z" fill={PALETTE.paperShade} strokeWidth="2.6" />
        <path d="M110 52v-18" strokeWidth="2.2" opacity="0.5" />
        {wheels([72, 168], 84)}
        <path d="M34 82h172" strokeWidth="2.2" opacity="0.3" />
      </g>
    </Prop>
  )
}

/**
 * A van, which is a car that is carrying something. `load` shows the cargo
 * through the side, so the same drawing can be empty on the way out and full
 * on the way back.
 */
export function Van({
  size = 210,
  moving = false,
  load = 0,
}: {
  size?: number | string
  moving?: boolean
  /** 0-3 crates visible in the body. */
  load?: number
}) {
  return (
    <Prop size={size} name="van" viewBox="0 0 240 124">
      {moving ? speed(40, 2) : null}
      <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
        {/* cargo box tall, cab stepped down: the step is what says "van" */}
        <path d="M20 88V30h106v18h20l24 24v16Z" fill={PALETTE.paperWhite} />
        <path d="M132 52h14l16 16h-30Z" fill={PALETTE.paperShade} strokeWidth="2.6" />
        <path d="M126 30v58" strokeWidth="2.4" opacity="0.5" />
        <g strokeWidth="2.4">
          {/*
            The load sits on the floor. Floating it mid-body read as a row of
            windows rather than as cargo.
          */}
          {Array.from({ length: Math.max(0, Math.min(3, load)) }, (_, i) => (
            <rect key={i} x={28 + i * 32} y={58} width="26" height="28" rx="2" fill={PALETTE.paperSheet} />
          ))}
        </g>
        <path d="M100 30v58" strokeWidth="2" opacity="0.35" />
        <circle cx="95" cy="60" r="2.6" fill={INK} stroke="none" opacity="0.5" />
        {wheels([58, 152], 90, 16)}
      </g>
    </Prop>
  )
}

/** One crate. The unit of "how much did we have to move". */
export function Crate({ size = 90, open = false }: { size?: number | string; open?: boolean }) {
  return (
    <Prop size={size} name="crate" viewBox="0 0 100 96">
      <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
        <path d="M12 26h76v62H12z" fill={PALETTE.paperSheet} />
        {open ? (
          <>
            <path d="M12 26 2 8h48l-8 18Z" fill={PALETTE.paperShade} strokeWidth="2.8" />
            <path d="M50 26 92 6l6 18Z" fill={PALETTE.paperShade} strokeWidth="2.8" />
          </>
        ) : (
          <g strokeWidth="2.4" opacity="0.55">
            {/*
              Straps, not a cross brace. An X over a box reads as negation --
              which is why there is no Cross in this library at all -- and a
              crate is not a thing being ruled out.
            */}
            <path d="M32 26v62M68 26v62" />
          </g>
        )}
        <path d="M12 40h76" strokeWidth="2.2" opacity="0.4" />
      </g>
    </Prop>
  )
}
