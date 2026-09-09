import { INK } from '../ink'
import { PALETTE } from '../palette'
import { Prop, seeded } from './frame'

/**
 * The hardware. Drawn to be *recognised*, not to be accurate.
 *
 * Every one of these leans on a single silhouette cue and nothing else: the
 * laptop is a wedge with a notch, the all-in-one is a chin on a blade foot,
 * the tower is a lattice, the stick is a row of chips over gold fingers. Add
 * detail beyond the cue and it stops reading at playback size.
 *
 * `lit` means "this is on", and it uses the same warm light as an open door.
 * That is a value, not a hue, so it does not collide with the palette roles.
 */

const SCREEN_OFF = PALETTE.paperShade

/** A laptop. Recognisable by the wedge base and the notch, so keep both. */
export function Laptop({
  size = 200,
  lit = false,
  shut = false,
}: {
  size?: number | string
  lit?: boolean
  shut?: boolean
}) {
  if (shut) {
    return (
      <Prop size={size} name="laptop-shut" viewBox="0 0 220 60">
        <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
          <path d="M22 18h176a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6Z" fill={PALETTE.paperSheet} />
          <path d="M16 30h188" strokeWidth="1.8" opacity="0.4" />
        </g>
      </Prop>
    )
  }

  return (
    <Prop size={size} name="laptop" viewBox="0 0 220 132">
      <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
        <path d="M40 4h140a7 7 0 0 1 7 7v89H33V11a7 7 0 0 1 7-7Z" fill={PALETTE.paperWhite} />
        <rect x="43" y="14" width="134" height="76" rx="3" fill={lit ? PALETTE.glowSoft : SCREEN_OFF} strokeWidth="2.2" />
        {/* the notch. One 20-unit rectangle, and the thing is a laptop. */}
        <path d="M100 14h20v5a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 100 19Z" fill={INK} stroke="none" opacity="0.75" />
        <path d="M22 100h176l8 16a5 5 0 0 1-5 7H19a5 5 0 0 1-5-7Z" fill={PALETTE.paperSheet} />
        {/* the front lip indent */}
        <path d="M96 123q10 5 28 0" fill="none" strokeWidth="2.4" opacity="0.55" />
      </g>
    </Prop>
  )
}

/** An all-in-one. The chin and the blade foot are the cue. */
export function Screen({ size = 200, lit = false }: { size?: number | string; lit?: boolean }) {
  return (
    <Prop size={size} name="screen" viewBox="0 0 220 186">
      <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
        <path d="M20 6h180a7 7 0 0 1 7 7v112a7 7 0 0 1-7 7H20a7 7 0 0 1-7-7V13a7 7 0 0 1 7-7Z" fill={PALETTE.paperWhite} />
        <rect x="24" y="14" width="172" height="92" rx="3" fill={lit ? PALETTE.glowSoft : SCREEN_OFF} strokeWidth="2.2" />
        <path d="M13 110h194" strokeWidth="1.8" opacity="0.35" />
        <path d="M96 132h28v28H96z" fill={PALETTE.paperShade} />
        <path d="M58 160h104a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H58a6 6 0 0 1-6-6v-6a6 6 0 0 1 6-6Z" fill={PALETTE.paperSheet} />
      </g>
    </Prop>
  )
}

/**
 * The box the work happens in.
 *
 * `mini` is a slab, `studio` is a cube, `tower` is a lattice. The lattice is
 * doing a lot of work: it is the only one of the three that reads as "this is
 * the expensive one" without a label.
 */
export function MachineBox({
  size = 150,
  shape = 'mini',
  lit = false,
}: {
  size?: number | string
  shape?: 'mini' | 'studio' | 'tower'
  lit?: boolean
}) {
  if (shape === 'tower') {
    const holes: React.ReactNode[] = []
    for (let r = 0; r < 11; r += 1) {
      for (let c = 0; c < 6; c += 1) {
        holes.push(
          <circle
            key={`${r}-${c}`}
            cx={30 + c * 16 + (r % 2 ? 8 : 0)}
            cy={40 + r * 14}
            r="5.2"
            fill={PALETTE.paperShade}
            stroke={INK}
            strokeWidth="1.4"
          />,
        )
      }
    }
    return (
      <Prop size={size} name="tower" viewBox="0 0 150 220">
        <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
          <path d="M22 26h106a8 8 0 0 1 8 8v164a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8V34a8 8 0 0 1 8-8Z" fill={PALETTE.paperWhite} />
          {/* handles, which is what makes a box read as a machine you lift */}
          <path d="M34 26v-8h26v8M90 26v-8h26v8" fill={PALETTE.paperSheet} strokeWidth="2.8" />
          <g clipPath="none">{holes}</g>
        </g>
      </Prop>
    )
  }

  const cube = shape === 'studio'
  return (
    <Prop size={size} name={`box-${shape}`} viewBox={cube ? '0 0 150 130' : '0 0 170 96'}>
      <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
        {cube ? (
          <path d="M24 14h102a10 10 0 0 1 10 10v78a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V24a10 10 0 0 1 10-10Z" fill={PALETTE.paperWhite} />
        ) : (
          <path d="M18 22h134a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H18a10 10 0 0 1-10-10V32a10 10 0 0 1 10-10Z" fill={PALETTE.paperWhite} />
        )}
        {/* the seam that says there is a top and a front */}
        <path d={cube ? 'M14 34h122' : 'M8 36h154'} strokeWidth="1.8" opacity="0.35" />
        <circle cx={cube ? 34 : 28} cy={cube ? 92 : 62} r="4.4" fill={lit ? PALETTE.glow : PALETTE.paperShade} strokeWidth="2.2" />
        <g strokeWidth="2.4" opacity="0.6">
          <path d={cube ? 'M54 92h16' : 'M46 62h16'} />
          <path d={cube ? 'M80 92h16' : 'M70 62h16'} />
        </g>
      </g>
    </Prop>
  )
}

export function Keyboard({ size = 230 }: { size?: number | string }) {
  const keys: React.ReactNode[] = []
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 15; c += 1) {
      keys.push(
        <rect
          key={`${r}-${c}`}
          x={16 + c * 14.2}
          y={18 + r * 11}
          width="11"
          height="8.4"
          rx="2"
          fill={PALETTE.paperWhite}
          stroke={INK}
          strokeWidth="1.3"
        />,
      )
    }
  }
  return (
    <Prop size={size} name="keyboard" viewBox="0 0 240 82">
      <g stroke={INK} strokeLinejoin="round">
        <path d="M10 8h220a7 7 0 0 1 7 7v52a7 7 0 0 1-7 7H10a7 7 0 0 1-7-7V15a7 7 0 0 1 7-7Z" fill={PALETTE.paperSheet} strokeWidth="3.2" />
        {keys}
        <rect x="78" y="62" width="84" height="8.4" rx="2" fill={PALETTE.paperWhite} stroke={INK} strokeWidth="1.3" />
      </g>
    </Prop>
  )
}

export function Mouse({ size = 70 }: { size?: number | string }) {
  return (
    <Prop size={size} name="mouse" viewBox="0 0 80 124">
      <g stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
        {/* one continuous shape: a seam across the top would make it a rock */}
        <path d="M40 6c19 0 30 24 30 54s-11 58-30 58-30-28-30-58S21 6 40 6Z" fill={PALETTE.paperWhite} />
        <path d="M40 10v42" strokeWidth="1.9" opacity="0.4" />
      </g>
    </Prop>
  )
}

/**
 * A memory stick. Chips over gold fingers, with the notch off-centre -- the
 * notch is what stops it reading as a chocolate bar.
 */
export function RamStick({
  size = 230,
  lit = false,
  chips = 8,
}: {
  size?: number | string
  lit?: boolean
  chips?: number
}) {
  const fingers: React.ReactNode[] = []
  for (let i = 0; i < 30; i += 1) {
    const x = 16 + i * 7.2
    if (x > 96 && x < 112) continue
    fingers.push(<path key={i} d={`M${x} 52v10`} />)
  }

  return (
    <Prop size={size} name="ram" viewBox="0 0 240 76">
      <g stroke={INK} strokeLinejoin="round">
        <path d="M8 8h224v44H8Z" fill={PALETTE.paperSheet} strokeWidth="3" />
        <g strokeWidth="2.2">
          {Array.from({ length: chips }, (_, i) => (
            <rect
              key={i}
              x={20 + i * 26}
              y={16}
              width="20"
              height="22"
              rx="2"
              fill={lit ? PALETTE.glow : PALETTE.paperShade}
            />
          ))}
        </g>
        <g strokeWidth="2" opacity="0.7" strokeLinecap="round">
          {fingers}
        </g>
        <path d="M96 52v10h16v-10" fill={PALETTE.paper} strokeWidth="2.4" />
      </g>
    </Prop>
  )
}

/** Several sticks, which is what a memory budget actually looks like. */
export function RamBank({
  size = 200,
  count = 4,
  filled = 4,
}: {
  size?: number | string
  count?: number
  /** How many are populated. The empty ones are the headroom. */
  filled?: number
}) {
  return (
    <Prop size={size} name="ram-bank" viewBox={`0 0 240 ${count * 26 + 10}`}>
      <g stroke={INK} strokeLinejoin="round">
        {Array.from({ length: count }, (_, i) => {
          const on = i < filled
          const y = 6 + i * 26
          return (
            <g key={i}>
              <path d={`M10 ${y}h220v18H10Z`} fill={on ? PALETTE.paperSheet : PALETTE.paper} strokeWidth="2.6" />
              {on ? (
                <g strokeWidth="1.6">
                  {Array.from({ length: 7 }, (_, c) => (
                    <rect key={c} x={22 + c * 29} y={y + 4} width="20" height="10" rx="1.5" fill={PALETTE.paperShade} />
                  ))}
                </g>
              ) : (
                <path d={`M14 ${y + 9}h212`} strokeWidth="1.6" opacity="0.3" strokeDasharray="5 6" />
              )}
            </g>
          )
        })}
      </g>
    </Prop>
  )
}

/**
 * Storage. `ssd` is a slab with a label, `disk` is a platter and an arm.
 *
 * The platter is worth the extra lines: a spinning disk is the only drawing
 * that makes "this one is slow" self-evident.
 */
export function Drive({
  size = 180,
  kind = 'ssd',
  label,
}: {
  size?: number | string
  kind?: 'ssd' | 'disk'
  label?: string
}) {
  if (kind === 'disk') {
    return (
      <Prop size={size} name="disk" viewBox="0 0 200 136">
        <g stroke={INK} strokeWidth="3" strokeLinejoin="round">
          <path d="M14 14h172a5 5 0 0 1 5 5v98a5 5 0 0 1-5 5H14a5 5 0 0 1-5-5V19a5 5 0 0 1 5-5Z" fill={PALETTE.paperSheet} />
          <circle cx="82" cy="68" r="44" fill={PALETTE.paperShade} strokeWidth="2.6" />
          <circle cx="82" cy="68" r="11" fill={PALETTE.paperWhite} strokeWidth="2.4" />
          <circle cx="82" cy="68" r="2.6" fill={INK} stroke="none" />
          {/* the arm, parked off the platter */}
          <path d="M166 34 118 58" strokeWidth="4.4" strokeLinecap="round" />
          <circle cx="168" cy="32" r="7" fill={PALETTE.paperWhite} strokeWidth="2.4" />
          <g strokeWidth="2.2" opacity="0.4">
            <path d="M22 24v6M22 106v6M178 106v6" />
          </g>
        </g>
      </Prop>
    )
  }

  return (
    <Prop size={size} name="ssd" viewBox="0 0 200 120">
      <g stroke={INK} strokeWidth="3" strokeLinejoin="round">
        <path d="M16 16h168a8 8 0 0 1 8 8v72a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8V24a8 8 0 0 1 8-8Z" fill={PALETTE.paperWhite} />
        <rect x="30" y="30" width="140" height="44" rx="3" fill={PALETTE.paperSheet} strokeWidth="2.2" />
        {label ? (
          <text x="100" y="59" textAnchor="middle" className="s1-prop-label" fill={INK}>
            {label}
          </text>
        ) : (
          <g strokeWidth="2.2" opacity="0.4">
            <path d="M44 46h72M44 58h48" />
          </g>
        )}
        {/* the connector edge, which is the only thing that says "it plugs in" */}
        <g strokeWidth="2.2" opacity="0.65">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${58 + i * 10} 86v14`} />
          ))}
        </g>
      </g>
    </Prop>
  )
}

/** A rack of drives. What "we own more than fits" looks like. */
export function DriveRack({ size = 180, rows = 5 }: { size?: number | string; rows?: number }) {
  return (
    <Prop size={size} name="drive-rack" viewBox={`0 0 180 ${rows * 30 + 16}`}>
      <g stroke={INK} strokeWidth="2.8" strokeLinejoin="round">
        <path d={`M6 6h168v${rows * 30 + 4}H6Z`} fill={PALETTE.paperSheet} strokeWidth="3.2" />
        {Array.from({ length: rows }, (_, i) => (
          <g key={i}>
            <rect x="14" y={12 + i * 30} width="152" height="22" rx="3" fill={PALETTE.paperWhite} strokeWidth="2.2" />
            <circle cx={158} cy={23 + i * 30} r="3.2" fill={seeded(i) > 0.4 ? PALETTE.glow : PALETTE.paperShade} strokeWidth="1.6" />
            <g strokeWidth="1.6" opacity="0.4">
              <path d={`M24 ${23 + i * 30}h96`} />
            </g>
          </g>
        ))}
      </g>
    </Prop>
  )
}
