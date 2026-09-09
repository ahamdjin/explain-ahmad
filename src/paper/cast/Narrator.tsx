import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE } from '../palette'

export type NarratorPose = 'wonder' | 'point' | 'think' | 'hopeful' | 'cheer' | 'push' | 'nod'

/**
 * Who the figure is. Pose is what they are feeling; style is who they are.
 *
 * Two separate axes on purpose. Any style can hold any pose, so casting a new
 * person into an existing beat costs one prop and no new drawing.
 */
export type NarratorStyle = 'plain' | 'me' | 'vendor' | 'engineer' | 'analyst'

type Look = {
  /** Hair is filled with a *paper* tone, never a hue -- see the note below. */
  hair: 'none' | 'crop' | 'wave' | 'curls' | 'bun'
  beard: 'none' | 'stubble' | 'full'
  glasses: boolean
  garment: 'tunic' | 'hoodie' | 'collar'
  /** A lanyard. Whoever is wearing one is speaking for an organisation. */
  badge: boolean
  /** Why this person exists. A style with no job is decoration -- don't add one. */
  job: string
}

/**
 * The cast.
 *
 * Nobody here carries a hue. Every style is ink line + paper fill, because the
 * palette's hues are spoken for -- teal is the word, blue is a measurement,
 * red is a cost -- and a character tinted with one of those would read as
 * *being* that thing. People are drawn; only mechanisms are coloured.
 */
export const NARRATOR_STYLES: Record<NarratorStyle, Look> = {
  /** The viewer's proxy. Asks every question, explains nothing. The default. */
  plain: { hair: 'none', beard: 'none', glasses: false, garment: 'tunic', badge: false, job: "the viewer's proxy -- asks, never explains" },

  /**
   * The host. Speaks in the first person, and is the only figure allowed an
   * opinion -- so it should be the one that opens §1 and delivers §8's verdict.
   *
   * CUSTOM: this is the one to edit. Four fields decide the whole likeness:
   *   hair: 'curls' | 'wave' | 'crop' | 'bun' | 'none'
   *   beard: 'full' | 'stubble' | 'none'
   *   glasses: true | false
   *   garment: 'hoodie' | 'collar' | 'tunic'
   * Check the result at /paper before changing anything else.
   */
  me: { hair: 'curls', beard: 'full', glasses: true, garment: 'hoodie', badge: false, job: 'the host -- the only figure with an opinion' },

  /** Whoever says "efficient". The lanyard is the whole characterisation. */
  vendor: { hair: 'crop', beard: 'none', glasses: false, garment: 'collar', badge: true, job: 'the claim -- says "efficient" and moves on' },

  /** The person who tries to actually run it. §7's plan is theirs to lose. */
  engineer: { hair: 'wave', beard: 'stubble', glasses: false, garment: 'hoodie', badge: false, job: 'the one who tries to run it' },

  /** Reads the numbers back. Present when a figure has to be checked. */
  analyst: { hair: 'bun', beard: 'none', glasses: true, garment: 'collar', badge: false, job: 'reads the numbers back' },
}

/**
 * The viewer's proxy, and the rest of the cast.
 *
 * Drawn to the storyboard's proportions: a large round head on a small body, a
 * simple garment, short plain legs. An earlier version had long jointed legs
 * that read as comic rather than simple, which is the opposite of what a figure
 * standing next to a 320-billion-parameter building should do.
 *
 * Pose is the emotional track. A viewer with the sound off should be able to
 * read hope and deflation off this figure alone -- so poses are large and few.
 */
export function Narrator({
  pose = 'wonder',
  style = 'plain',
  flip = false,
  scale = 1,
}: {
  pose?: NarratorPose
  style?: NarratorStyle
  flip?: boolean
  scale?: number
}) {
  const look = NARRATOR_STYLES[style]

  return (
    <motion.div
      className="s1-narrator"
      data-pose={pose}
      data-style={style}
      style={{ '--flip': flip ? -1 : 1, '--scale': scale } as React.CSSProperties}
      animate={{ y: pose === 'cheer' ? -6 : 0, rotate: pose === 'push' ? 5 : 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 14 }}
    >
      <svg viewBox="0 0 130 200" aria-hidden="true">
        <g fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          {/* head */}
          <circle cx="65" cy="46" r="40" fill={PALETTE.paperWhite} />

          {/* neck */}
          <path d="M65 86v10" />

          <Garment look={look} />

          {/* legs -- short and plain. Push braces: back leg trails. */}
          {pose === 'push' ? (
            <>
              <path d="M57 146 44 176" />
              <path d="M75 146v32" />
              <path d="M44 176q-7 1-10 -2" />
              <path d="M75 178q7 3 11 2" />
            </>
          ) : (
            <>
              <path d="M57 146v32" />
              <path d="M75 146v32" />
              <path d="M57 178q-7 3-11 2" />
              <path d="M75 178q7 3 11 2" />
            </>
          )}

          <Arms pose={pose} />
        </g>

        <Beard kind={look.beard} />
        <Face pose={pose} />
        {look.glasses ? <Glasses /> : null}
        <Hair kind={look.hair} />

        {/* the "!" ticks the storyboard figures use when something lands */}
        {(pose === 'point' || pose === 'cheer' || pose === 'hopeful') ? (
          <g stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.8">
            <path d="M22 16l-6-9" />
            <path d="M40 8l-2-10" />
            <path d="M108 16l6-9" />
          </g>
        ) : null}

        {pose === 'think' ? (
          <g fill={INK} opacity="0.5">
            <circle cx="106" cy="22" r="3" />
            <circle cx="116" cy="12" r="4.2" />
          </g>
        ) : null}
      </svg>
    </motion.div>
  )
}

/** Head circle: cx 65, cy 46, r 40. Every hairline below is measured off it. */
const HAIR_FILL = PALETTE.idleAsleep

/**
 * Seven curls round the top of the skull, over a filled base.
 *
 * The base matters: circles alone read as a laurel wreath rather than as hair,
 * because there is paper visible between them. The base makes it one mass that
 * happens to have a bumpy edge.
 */
const CURLS: [number, number][] = [
  [34, 36],
  [43, 23],
  [54, 14],
  [65, 12],
  [76, 14],
  [87, 23],
  [96, 36],
]

function Hair({ kind }: { kind: Look['hair'] }) {
  if (kind === 'none') return null

  /*
   * Drawn *after* the face, so it sits over the skull rather than behind it.
   * Filled, not hatched: the same lesson as the round hands -- a filled mass
   * survives being small on screen, a set of fine lines does not.
   */
  if (kind === 'curls') {
    return (
      <g fill={HAIR_FILL} stroke={INK} strokeWidth="2.4" strokeLinejoin="round">
        <path d="M27 40A40 40 0 0 1 103 40Q84 30 65 33Q46 36 27 40Z" />
        {CURLS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="9" />
        ))}
        {/* redrawn over the circle outlines so the mass has no seams inside it */}
        <path d="M31 38Q48 30 65 32Q82 30 99 38Q82 33 65 35Q48 33 31 38Z" stroke="none" />
      </g>
    )
  }

  if (kind === 'wave') {
    return (
      <g fill={HAIR_FILL} stroke={INK} strokeWidth="3" strokeLinejoin="round">
        {/* a side part: volume on one side, swept across */}
        <path d="M25 44A40 40 0 0 1 105 44Q104 22 78 26Q56 31 40 24Q27 27 25 44Z" />
        <path d="M46 27Q62 36 82 30" fill="none" strokeWidth="2.2" opacity="0.55" />
      </g>
    )
  }

  if (kind === 'bun') {
    return (
      <g fill={HAIR_FILL} stroke={INK} strokeWidth="3" strokeLinejoin="round">
        <circle cx="65" cy="4" r="11" />
        <path d="M25 46A40 40 0 0 1 105 46Q86 28 65 32Q44 36 25 46Z" />
      </g>
    )
  }

  /* crop */
  return (
    <g fill={HAIR_FILL} stroke={INK} strokeWidth="3" strokeLinejoin="round">
      <path d="M25.5 42A40 40 0 0 1 104.5 42Q86 34 65 37Q44 40 25.5 42Z" />
    </g>
  )
}

/**
 * Jaw hatching, generated from the head circle so every stroke sits on it.
 *
 * `spread` is how far round the jaw the growth reaches, in degrees either side
 * of straight down; `len` is roughly how long the strokes are.
 *
 * The jitter is the whole trick. Evenly spaced strokes of equal length radiate
 * from a circle and read as a sunburst -- the first version looked like a lion
 * rather than a beard. Both the angle and the length are nudged by a fixed
 * hash, so it stays hand-drawn and stays identical between screenshots.
 */
function jawHatch(spread: number, len: number) {
  const strokes: string[] = []
  const noise = (i: number) => {
    const v = Math.sin(i * 12.9898) * 43758.5453
    return v - Math.floor(v)
  }

  for (let i = 0; i * 8 <= spread * 2; i += 1) {
    const a = 270 - spread + i * 8 + (noise(i) - 0.5) * 5
    const r = (a * Math.PI) / 180
    const c = Math.cos(r)
    const sn = Math.sin(r)
    const l = len * (0.72 + noise(i + 40) * 0.42)
    const x = 65 + 40 * c
    const y = 46 - 40 * sn
    strokes.push(`M${x.toFixed(1)} ${y.toFixed(1)}L${(x - l * c).toFixed(1)} ${(y + l * sn).toFixed(1)}`)
  }
  return strokes
}

function Beard({ kind }: { kind: Look['beard'] }) {
  if (kind === 'none') return null

  /*
   * Drawn as ink, never as a filled mass.
   *
   * Two filled versions failed. A thin arcing band with a light gap above it
   * read as an enormous open mouth. Filling the whole lower face instead read
   * as a balaclava: the hair is already a filled mass in the same tone, so the
   * head ended up light only in a band across the eyes.
   *
   * Hatching separates the two by *value* rather than by shape -- the hair
   * stays a solid mass, the beard stays line work -- which is also how the
   * rest of the piece is drawn.
   */
  const dense = kind === 'full'

  return (
    <g stroke={INK} strokeLinecap="round" fill="none">
      <g strokeWidth={dense ? 2.3 : 1.9} opacity={dense ? 0.62 : 0.3}>
        {jawHatch(dense ? 58 : 44, dense ? 12 : 7).map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {dense ? (
        <g strokeWidth="2.8" opacity="0.62">
          {/* moustache: the only part that has to be placed by eye */}
          <path d="M52 55Q59 51 65 54" />
          <path d="M65 54Q71 51 78 55" />
        </g>
      ) : null}
    </g>
  )
}

/**
 * Frames do not move with the eyeline. The eyes shift inside them, which is
 * what makes a glance read as a glance rather than as a turn of the head.
 */
function Glasses() {
  return (
    <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinejoin="round">
      <rect x="39" y="35" width="24" height="18" rx="7" />
      <rect x="67" y="35" width="24" height="18" rx="7" />
      <path d="M63 43h4" />
      <path d="M39 41 27 39" strokeLinecap="round" />
      <path d="M91 41 103 39" strokeLinecap="round" />
    </g>
  )
}

/** The garment is drawn inside the ink group, so every path names its own fill. */
function Garment({ look }: { look: Look }) {
  const body = <path d="M49 96h32l6 50H43z" fill={PALETTE.paperWhite} />

  if (look.garment === 'hoodie') {
    return (
      <>
        {body}
        {/* hood, down and bunched at the shoulders */}
        <path d="M47 98Q44 84 53 80" fill="none" strokeWidth="2.8" />
        <path d="M83 98Q86 84 77 80" fill="none" strokeWidth="2.8" />
        <path d="M52 96Q65 110 78 96" fill={PALETTE.paperLight} strokeWidth="2.8" />
        <g strokeWidth="2.4" strokeLinecap="round">
          <path d="M60 106v13" />
          <path d="M70 106v13" />
        </g>
        <g fill={INK} stroke="none">
          <circle cx="60" cy="121" r="2.2" />
          <circle cx="70" cy="121" r="2.2" />
        </g>
        {/* pocket */}
        <path d="M50 126h30" strokeWidth="2.2" opacity="0.5" />
      </>
    )
  }

  if (look.garment === 'collar') {
    return (
      <>
        {body}
        <g strokeWidth="2.8">
          <path d="M65 108 54 95" />
          <path d="M65 108 76 95" />
          <path d="M65 108v34" strokeWidth="2.2" opacity="0.55" />
        </g>
        {look.badge ? <Badge /> : null}
      </>
    )
  }

  return (
    <>
      {body}
      {look.badge ? <Badge /> : null}
    </>
  )
}

/** Speaking for an organisation rather than for themselves. */
function Badge() {
  return (
    <>
      <path d="M56 96Q65 118 74 96" fill="none" strokeWidth="2.2" />
      <rect x="58" y="116" width="14" height="10" rx="2.5" fill={PALETTE.paperWhite} strokeWidth="2.4" />
    </>
  )
}

function Face({ pose }: { pose: NarratorPose }) {
  if (pose === 'cheer') {
    return (
      <g fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round">
        <path d="M45 40c3-5 8-5 11 0" />
        <path d="M74 40c3-5 8-5 11 0" />
        <path d="M55 58c5 5 15 5 20 0" />
      </g>
    )
  }

  /* Eyeline carries most of the acting: forward when engaged, off to the side
   * when questioning, down when deflated. */
  const shift = pose === 'point' || pose === 'push' ? 5 : pose === 'hopeful' ? 3 : pose === 'think' ? -4 : 0
  const drop = pose === 'think' ? 3 : 0

  return (
    <g>
      <g fill={INK}>
        <ellipse cx={51 + shift} cy={44 + drop} rx="4.4" ry="5.2" />
        <ellipse cx={79 + shift} cy={44 + drop} rx="4.4" ry="5.2" />
      </g>
      {pose === 'think' ? (
        <path d="M56 63h18" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      ) : pose === 'hopeful' || pose === 'nod' ? (
        <path d="M56 60c4 4 12 4 16 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      ) : null}
    </g>
  )
}

/** Arm tips stay clear of the head circle (cx 65, cy 46, r 40). */
function Arms({ pose }: { pose: NarratorPose }) {
  switch (pose) {
    case 'point':
      return (
        <>
          <path d="M49 104 26 122" />
          <path d="M81 102l30 -16" />
        </>
      )
    case 'think':
      return (
        <>
          <path d="M49 106 28 124" />
          <path d="M81 104l14 -10 -3 -9" />
        </>
      )
    case 'hopeful':
      return (
        <>
          <path d="M49 104 34 96 42 90" />
          <path d="M81 104 96 96 88 90" />
        </>
      )
    case 'cheer':
      return (
        <>
          <path d="M49 100 20 76" />
          <path d="M81 100 110 76" />
        </>
      )
    case 'push':
      /*
       * Both arms reach the same way, and the hands are round.
       *
       * The first version drew two long vertical ticks for palms, which at any
       * real playback size read as a ladder or a flag rather than as hands. A
       * filled circle survives being small; a 16-unit line does not.
       *
       * Both arms leave from the same side of the tunic. Routing the far arm
       * across the body drew a line over the filled tunic, which read as a
       * strap across the chest rather than as an arm.
       */
      return (
        <>
          <path d="M82 101 101 97" />
          <circle cx="107" cy="96" r="5.5" fill={PALETTE.paperWhite} />
          <path d="M84 113 101 113" />
          <circle cx="107" cy="114" r="5.5" fill={PALETTE.paperWhite} />
        </>
      )
    case 'nod':
      return (
        <>
          <path d="M49 102 34 124" />
          <path d="M81 102 96 124" />
        </>
      )
    default:
      return (
        <>
          <path d="M49 102 28 122" />
          <path d="M81 102 102 122" />
        </>
      )
  }
}
