import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE } from '../palette'

/**
 * What the figure is *feeling*. The emotional track of the whole video.
 *
 * A viewer with the sound off should be able to read the story off this figure
 * alone, so poses are large, few per section, and each one has a job:
 *
 *   wonder   the default -- open, waiting, no opinion yet
 *   point    naming the thing on screen
 *   think    working on it, not yet sure
 *   hopeful  the plan looks like it might work
 *   cheer    it worked
 *   push     effort against something that gives
 *   nod      agreeing with what was just shown
 *   shrug    no answer yet -- the honest end of a question
 *   slump    it did not work
 *   carry    effort against something that does not give
 *   wait     nothing to do but wait for it
 *   lean     inspecting something closely
 *   aha      the moment it lands
 *   back     turned away, looking at something enormous
 */
export type NarratorPose =
  | 'wonder'
  | 'point'
  | 'think'
  | 'hopeful'
  | 'cheer'
  | 'push'
  | 'nod'
  | 'shrug'
  | 'slump'
  | 'carry'
  | 'wait'
  | 'lean'
  | 'aha'
  | 'back'

export const NARRATOR_POSES: NarratorPose[] = [
  'wonder',
  'point',
  'think',
  'hopeful',
  'cheer',
  'push',
  'nod',
  'shrug',
  'slump',
  'carry',
  'wait',
  'lean',
  'aha',
  'back',
]

/**
 * Who the figure *is*. Independent of pose -- any style holds any pose, so
 * casting a different person into an existing beat costs one prop and no new
 * drawing.
 */
export type NarratorStyle = 'plain' | 'me' | 'vendor' | 'engineer' | 'analyst' | 'builder' | 'critic'

type Look = {
  /** Filled with a *paper* tone, never a hue -- see the note on the cast. */
  hair: 'none' | 'crop' | 'buzz' | 'wave' | 'curls' | 'spikes' | 'royal' | 'bun' | 'long'
  /** Ink hatch, never a filled mass -- see the note on Beard. */
  beard: 'none' | 'stubble' | 'moustache' | 'goatee' | 'full'
  glasses: 'none' | 'round' | 'square' | 'big'
  headwear: 'none' | 'cap' | 'beanie'
  garment: 'tunic' | 'tee' | 'hoodie' | 'collar' | 'coat'
  /** A lanyard. Whoever wears one is speaking for an organisation. */
  badge: boolean
  /** Why this person exists. A style with no job is decoration -- don't add one. */
  job: string
}

/**
 * The cast.
 *
 * Nobody here carries a hue. Every style is ink line plus paper fill, because
 * the palette's hues are spoken for -- teal is the word, blue is a
 * measurement, red is a cost -- and a character tinted with one of those would
 * read as *being* that thing. People are drawn; only mechanisms are coloured.
 *
 * Seven figures, which between them are a whole court: someone makes a claim,
 * someone built the thing, someone has to run it, someone checks the numbers,
 * someone doubts it, someone rules on it, and someone is watching.
 */
export const NARRATOR_STYLES: Record<NarratorStyle, Look> = {
  /** The viewer's proxy. Asks every question, explains nothing. The default. */
  plain: {
    hair: 'none',
    beard: 'none',
    glasses: 'none',
    headwear: 'none',
    garment: 'tunic',
    badge: false,
    job: "the viewer's proxy -- asks, never explains",
  },

  /**
   * The host. Speaks in the first person, and is the only figure allowed an
   * opinion -- so it should open a claim and deliver a verdict.
   *
   * CUSTOM: this is the one to edit. Five fields decide the whole likeness:
   *   hair      'spikes' | 'royal' | 'curls' | 'wave' | 'crop' | 'buzz' | 'bun' | 'long' | 'none'
   *   beard     'full' | 'goatee' | 'moustache' | 'stubble' | 'none'
   *   glasses   'big' | 'square' | 'round' | 'none'
   *   headwear  'none' | 'cap' | 'beanie'
   *   garment   'hoodie' | 'tee' | 'collar' | 'coat' | 'tunic'
   * Change those and look at /paper. Anything else means redrawing.
   */
  me: {
    /*
     * The cap, at Ahmad's ask. Hair is `crop` rather than `spikes` because the
     * cap is drawn after the hair and sits on the hairline -- spikes came
     * through the crown and read as hair growing out of the hat. Crop shows at
     * the sides and under the back, which is what a cap actually looks like.
     *
     * The glasses stay. That was an explicit ask and it is the likeness.
     */
    hair: 'crop',
    beard: 'full',
    glasses: 'big',
    headwear: 'cap',
    garment: 'hoodie',
    badge: false,
    job: 'the host -- the only figure with an opinion',
  },

  /** Whoever says "efficient". The lanyard is the whole characterisation. */
  vendor: {
    hair: 'crop',
    beard: 'none',
    glasses: 'none',
    headwear: 'none',
    garment: 'collar',
    badge: true,
    job: 'the claim -- says "efficient" and moves on',
  },

  /** The person who tries to actually run it. Whose plan there is to lose. */
  engineer: {
    hair: 'wave',
    beard: 'stubble',
    glasses: 'none',
    headwear: 'none',
    garment: 'hoodie',
    badge: false,
    job: 'the one who tries to run it',
  },

  /** Reads the numbers back. Present when a figure has to be checked. */
  analyst: {
    hair: 'bun',
    beard: 'none',
    glasses: 'round',
    headwear: 'none',
    garment: 'collar',
    badge: false,
    job: 'reads the numbers back',
  },

  /** Built the thing, and defends the design rather than the marketing. */
  builder: {
    hair: 'buzz',
    beard: 'goatee',
    glasses: 'none',
    headwear: 'cap',
    garment: 'tee',
    badge: false,
    job: 'built it -- defends the design, not the claim',
  },

  /** Doubts the claim out loud, so the host does not have to. */
  critic: {
    hair: 'long',
    beard: 'none',
    glasses: 'square',
    headwear: 'none',
    garment: 'coat',
    badge: false,
    job: 'doubts it out loud',
  },
}

/*
 * Head circle: cx 65, cy 46, r 40. Eyes at (51,44) and (79,44). Mouth about
 * y 60. Chin at y 86, neck to 96, garment to 146, feet at 178.
 *
 * Every path below is measured off those, so moving the head means moving
 * everything. Don't.
 */
const HAIR = PALETTE.idleAsleep
const CLOTH = PALETTE.idleDim

/** How the head sits. Rotation is about the base of the neck, not the face. */
const HEAD_SET: Partial<Record<NarratorPose, { tilt?: number; dx?: number; dy?: number }>> = {
  think: { tilt: -7 },
  slump: { tilt: 6, dy: 7 },
  lean: { tilt: -6, dx: 4, dy: 2 },
  carry: { dy: 3 },
  wait: { tilt: 5 },
  aha: { dy: -3 },
  shrug: { tilt: -4 },
}

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
  const away = pose === 'back'
  const head = HEAD_SET[pose] ?? {}
  const transform = `translate(${head.dx ?? 0} ${head.dy ?? 0}) rotate(${head.tilt ?? 0} 65 88)`

  return (
    <motion.div
      className="s1-narrator"
      data-pose={pose}
      data-style={style}
      style={{ '--flip': flip ? -1 : 1, '--scale': scale } as React.CSSProperties}
      animate={{
        y: pose === 'cheer' ? -6 : pose === 'aha' ? -3 : pose === 'carry' ? 3 : 0,
        rotate: pose === 'push' ? 5 : pose === 'lean' ? 7 : 0,
        scaleY: pose === 'slump' ? 0.965 : pose === 'carry' ? 0.975 : 1,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 14 }}
    >
      <svg viewBox="0 0 130 200" aria-hidden="true">
        <g fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          {/* neck */}
          <path d="M65 86v10" />
          <Garment look={look} />
          <Legs pose={pose} />
          <Arms pose={pose} />
        </g>

        {/* The head and everything on it move together, or the face slides off it. */}
        <g transform={transform}>
          <circle cx="65" cy="46" r="40" fill={PALETTE.paperWhite} stroke={INK} strokeWidth="3.2" />
          {away ? null : (
            <>
              <Beard kind={look.beard} />
              <Face pose={pose} />
              <Glasses kind={look.glasses} />
            </>
          )}
          <Hair kind={look.hair} away={away} />
          <Headwear kind={look.headwear} away={away} />
        </g>

        <Marks pose={pose} />
      </svg>
    </motion.div>
  )
}

/* Face ------------------------------------------------------------------- */

type FaceSet = {
  /** Where the eyes look. Carries more of the acting than the mouth does. */
  shift?: number
  drop?: number
  eyes?: 'open' | 'wide' | 'squint' | 'shut' | 'happy'
  mouth?: 'none' | 'flat' | 'smile' | 'grin' | 'frown' | 'grit' | 'open'
  brows?: 'none' | 'up' | 'down' | 'sad'
}

/**
 * One row per pose, so adding a pose is a row rather than another branch.
 *
 * The previous version was a chain of ternaries inside two components, which
 * is exactly the shape that makes people stop adding poses and start writing
 * captions instead.
 */
const FACE: Record<NarratorPose, FaceSet> = {
  wonder: {},
  point: { shift: 5 },
  think: { shift: -4, drop: 3, mouth: 'flat' },
  hopeful: { shift: 3, mouth: 'smile', brows: 'up' },
  cheer: { eyes: 'happy', mouth: 'grin' },
  push: { shift: 5, mouth: 'grit', brows: 'down' },
  nod: { mouth: 'smile' },
  shrug: { shift: -3, mouth: 'flat', brows: 'up' },
  slump: { drop: 2, eyes: 'shut', mouth: 'frown', brows: 'sad' },
  carry: { drop: 1, mouth: 'grit', brows: 'down' },
  wait: { shift: -6, mouth: 'flat' },
  lean: { shift: 6, eyes: 'squint', brows: 'down' },
  aha: { eyes: 'wide', mouth: 'open', brows: 'up' },
  back: {},
}

function Face({ pose }: { pose: NarratorPose }) {
  const set = FACE[pose]
  const shift = set.shift ?? 0
  const drop = set.drop ?? 0
  const eyes = set.eyes ?? 'open'

  return (
    <g>
      <Brows kind={set.brows ?? 'none'} />

      {eyes === 'happy' ? (
        <g fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round">
          <path d="M45 40c3-5 8-5 11 0" />
          <path d="M74 40c3-5 8-5 11 0" />
        </g>
      ) : eyes === 'shut' ? (
        <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round">
          <path d="M45 45c3 4 8 4 11 0" />
          <path d="M74 45c3 4 8 4 11 0" />
        </g>
      ) : (
        <g fill={INK}>
          <ellipse
            cx={51 + shift}
            cy={44 + drop}
            rx={eyes === 'wide' ? 5.2 : 4.4}
            ry={eyes === 'squint' ? 2.6 : eyes === 'wide' ? 6.2 : 5.2}
          />
          <ellipse
            cx={79 + shift}
            cy={44 + drop}
            rx={eyes === 'wide' ? 5.2 : 4.4}
            ry={eyes === 'squint' ? 2.6 : eyes === 'wide' ? 6.2 : 5.2}
          />
        </g>
      )}

      <Mouth kind={set.mouth ?? 'none'} />
    </g>
  )
}

/**
 * Brows sit above the glasses line, in the only strip of forehead there is
 * between a hairline at y 32 and the eyes at y 39.
 */
function Brows({ kind }: { kind: NonNullable<FaceSet['brows']> }) {
  if (kind === 'none') return null
  const paths =
    kind === 'up'
      ? ['M44 32Q51 27 58 32', 'M72 32Q79 27 86 32']
      : kind === 'down'
        ? ['M44 29 58 34', 'M86 29 72 34']
        : ['M44 34 58 29', 'M86 34 72 29']
  return (
    <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  )
}

function Mouth({ kind }: { kind: NonNullable<FaceSet['mouth']> }) {
  if (kind === 'none') return null
  if (kind === 'open') {
    return <ellipse cx="65" cy="64" rx="5.5" ry="6" fill={PALETTE.paperShade} stroke={INK} strokeWidth="2.8" />
  }
  if (kind === 'grit') {
    return (
      <g fill="none" stroke={INK} strokeLinecap="round">
        <path d="M55 62h20" strokeWidth="3" />
        <g strokeWidth="2" opacity="0.7">
          <path d="M61 60v4" />
          <path d="M68 60v4" />
        </g>
      </g>
    )
  }
  const d =
    kind === 'flat'
      ? 'M56 62h18'
      : kind === 'smile'
        ? 'M56 60c4 4 12 4 16 0'
        : kind === 'grin'
          ? 'M55 58c5 5 15 5 20 0'
          : 'M56 65c4-5 12-5 16 0'
  return <path d={d} fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
}

/* Hair, beard, headwear -------------------------------------------------- */

/**
 * Hatching generated from the head circle, so every stroke sits on it.
 *
 * `from`/`to` are degrees on that circle (270 is straight down at the chin,
 * 90 is the top of the skull); `len` is roughly how long the strokes are.
 *
 * The jitter is the whole trick. Evenly spaced strokes of equal length
 * radiating from a circle read as a sunburst -- the first beard looked like a
 * lion. Both angle and length are nudged by a fixed hash, so it stays
 * hand-drawn and stays identical between screenshots.
 */
function hatch(from: number, to: number, len: number, step = 8) {
  const noise = (i: number) => {
    const v = Math.sin(i * 12.9898) * 43758.5453
    return v - Math.floor(v)
  }
  const strokes: string[] = []
  for (let i = 0; from + i * step <= to; i += 1) {
    const a = from + i * step + (noise(i) - 0.5) * 5
    const r = (a * Math.PI) / 180
    const c = Math.cos(r)
    const s = Math.sin(r)
    const l = len * (0.72 + noise(i + 40) * 0.42)
    const x = 65 + 40 * c
    const y = 46 - 40 * s
    strokes.push(`M${x.toFixed(1)} ${y.toFixed(1)}L${(x - l * c).toFixed(1)} ${(y + l * s).toFixed(1)}`)
  }
  return strokes
}

/** Seven curls round the top of the skull, over a filled base. */
const CURLS: [number, number][] = [
  [34, 36],
  [43, 23],
  [54, 14],
  [65, 12],
  [76, 14],
  [87, 23],
  [96, 36],
]

/**
 * Spikes: bases on the head circle at r 40, peaks out at r 52, alternating.
 *
 * Generated rather than drawn, because a hand-written zigzag on a circle never
 * quite sits on it -- the valleys either float off the skull or bite into it.
 */
function spikes() {
  const at = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180
    return `${(65 + r * Math.cos(a)).toFixed(1)} ${(46 - r * Math.sin(a)).toFixed(1)}`
  }
  const points: string[] = []
  for (let i = 0; i <= 12; i += 1) {
    const deg = 168 - i * 13
    points.push(at(deg, i % 2 === 0 ? 40 : 52))
  }
  return `M${points.join('L')}Q86 32 65 34Q44 37 25.9 37.7Z`
}

/** The hairline. Kept high enough to leave a forehead for the brows. */
const CROP = 'M25.5 40A40 40 0 0 1 104.5 40Q86 32 65 34Q44 37 25.5 40Z'

function Hair({ kind, away }: { kind: Look['hair']; away: boolean }) {
  if (kind === 'none') return null

  /* Turned away: one mass over the whole skull, and no face to work around. */
  if (away) {
    return (
      <g fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round">
        <circle cx="65" cy="46" r="40" />
        {kind === 'bun' ? <circle cx="65" cy="4" r="11" /> : null}
        {kind === 'long' ? <path d="M27 44Q22 96 32 116Q42 102 40 62Z M103 44Q108 96 98 116Q88 102 90 62Z" /> : null}
        {kind === 'spikes' ? <path d={spikes()} /> : null}
        {/* ears. A nape curve read as a mouth on a blank head; these do not. */}
        <g fill="none" strokeWidth="2.6">
          <path d="M26 42q-6 4-1 10" />
          <path d="M104 42q6 4 1 10" />
        </g>
      </g>
    )
  }

  if (kind === 'curls') {
    return (
      <g fill={HAIR} stroke={INK} strokeWidth="2.4" strokeLinejoin="round">
        <path d="M27 40A40 40 0 0 1 103 40Q84 30 65 33Q46 36 27 40Z" />
        {CURLS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="9" />
        ))}
        {/* redrawn over the circle outlines so the mass has no seams inside it */}
        <path d="M31 38Q48 30 65 32Q82 30 99 38Q82 33 65 35Q48 33 31 38Z" stroke="none" />
      </g>
    )
  }

  if (kind === 'spikes') {
    return (
      <g fill={HAIR} stroke={INK} strokeWidth="2.8" strokeLinejoin="round">
        <path d={spikes()} />
      </g>
    )
  }

  if (kind === 'royal') {
    /*
     * Volume over the ears, swept back, thinner on the crown. The wings are
     * the whole thing -- without them it is just a hairline.
     */
    return (
      <g fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round">
        <path d="M22 48Q16 24 33 18Q49 11 65 15Q82 19 97 17Q113 22 108 48Q102 33 88 31Q70 27 52 30Q34 33 22 48Z" />
        <path d="M34 26Q52 20 68 23" fill="none" strokeWidth="2.1" opacity="0.5" />
        <path d="M74 24Q88 24 98 29" fill="none" strokeWidth="2.1" opacity="0.5" />
      </g>
    )
  }

  if (kind === 'buzz') {
    /* Hatched, not filled: the point of a buzz cut is that it is barely there. */
    return (
      <g stroke={INK} strokeWidth="2.1" strokeLinecap="round" fill="none" opacity="0.5">
        {hatch(28, 152, 13, 7).map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    )
  }

  if (kind === 'wave') {
    return (
      <g fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round">
        {/* a side part: volume on one side, swept across */}
        <path d="M25 42A40 40 0 0 1 105 42Q104 20 78 24Q56 29 40 22Q27 25 25 42Z" />
        <path d="M46 25Q62 34 82 28" fill="none" strokeWidth="2.2" opacity="0.55" />
      </g>
    )
  }

  if (kind === 'bun') {
    return (
      <g fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round">
        <circle cx="65" cy="4" r="11" />
        <path d={CROP} />
      </g>
    )
  }

  if (kind === 'long') {
    return (
      <g fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round">
        {/* the panels fall over the shoulders, so they are drawn with the hair */}
        <path d="M27 40Q22 96 33 116Q44 100 41 58Z" />
        <path d="M103 40Q108 96 97 116Q86 100 89 58Z" />
        <path d={CROP} />
      </g>
    )
  }

  return (
    <g fill={HAIR} stroke={INK} strokeWidth="3" strokeLinejoin="round">
      <path d={CROP} />
    </g>
  )
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
  const spread = kind === 'full' ? 58 : kind === 'goatee' ? 22 : kind === 'stubble' ? 44 : 0
  const len = kind === 'full' ? 12 : kind === 'goatee' ? 14 : 7
  const heavy = kind === 'full' || kind === 'goatee'

  return (
    <g stroke={INK} strokeLinecap="round" fill="none">
      {spread ? (
        <g strokeWidth={heavy ? 2.3 : 1.9} opacity={heavy ? 0.62 : 0.3}>
          {hatch(270 - spread, 270 + spread, len).map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      ) : null}
      {kind === 'full' || kind === 'goatee' || kind === 'moustache' ? (
        <g strokeWidth="2.8" opacity="0.62">
          {/* the only part that has to be placed by eye */}
          <path d="M52 55Q59 51 65 54" />
          <path d="M65 54Q71 51 78 55" />
        </g>
      ) : null}
    </g>
  )
}

function Glasses({ kind }: { kind: Look['glasses'] }) {
  if (kind === 'none') return null

  /*
   * Frames do not move with the eyeline. The eyes shift inside them, which is
   * what makes a glance read as a glance rather than a turn of the head.
   */
  return (
    <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinejoin="round">
      {kind === 'big' ? (
        <>
          {/* oversized, and thicker than the face lines. Deliberately silly. */}
          {/* centred on the eyes and just touching, or they read wall-eyed */}
          <circle cx="50" cy="44" r="15" strokeWidth="3.6" />
          <circle cx="80" cy="44" r="15" strokeWidth="3.6" />
        </>
      ) : kind === 'round' ? (
        <>
          <circle cx="51" cy="44" r="11" />
          <circle cx="79" cy="44" r="11" />
        </>
      ) : (
        <>
          <rect x="39" y="35" width="24" height="18" rx="7" />
          <rect x="67" y="35" width="24" height="18" rx="7" />
        </>
      )}
      {kind === 'big' ? (
        <>
          <path d="M35 40 24 36" strokeLinecap="round" strokeWidth="3" />
          <path d="M95 40 106 36" strokeLinecap="round" strokeWidth="3" />
        </>
      ) : (
        <>
          <path d="M62 43h6" />
          <path d="M40 41 27 39" strokeLinecap="round" />
          <path d="M90 41 103 39" strokeLinecap="round" />
        </>
      )}
    </g>
  )
}

function Headwear({ kind, away }: { kind: Look['headwear']; away: boolean }) {
  if (kind === 'none') return null

  if (kind === 'beanie') {
    return (
      <g fill={CLOTH} stroke={INK} strokeWidth="3" strokeLinejoin="round">
        <circle cx="65" cy="1" r="8" />
        <path d="M26 38A40 40 0 0 1 104 38Q86 34 65 34Q44 34 26 38Z" />
        {/* the rolled cuff, which is what makes it a beanie and not a dome */}
        <path d="M25 30A40 40 0 0 0 105 30L104 40Q86 35 65 35Q44 35 26 40Z" fill={PALETTE.paperShade} />
      </g>
    )
  }

  return (
    <g fill={CLOTH} stroke={INK} strokeWidth="3" strokeLinejoin="round">
      <path d="M27 36A40 40 0 0 1 103 36Q84 30 65 30Q46 30 27 36Z" />
      {away ? null : <path d="M28 34Q10 36 5 43Q19 48 34 41Z" />}
      <path d="M65 6v24" fill="none" strokeWidth="1.9" opacity="0.4" />
    </g>
  )
}

/* Body ------------------------------------------------------------------- */

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

  if (look.garment === 'coat') {
    return (
      <>
        <path d="M46 96h38l7 54H39z" fill={PALETTE.paperWhite} />
        <g strokeWidth="2.8">
          {/* lapels, and a hem below the tunic line so it reads as a long coat */}
          <path d="M56 96 65 116 74 96" />
          <path d="M65 116v34" strokeWidth="2.2" opacity="0.5" />
        </g>
        <g fill={INK} stroke="none">
          <circle cx="65" cy="124" r="2.2" />
          <circle cx="65" cy="136" r="2.2" />
        </g>
        {look.badge ? <Badge /> : null}
      </>
    )
  }

  if (look.garment === 'tee') {
    return (
      <>
        {body}
        <path d="M55 96Q65 105 75 96" fill="none" strokeWidth="2.6" />
        {/* sleeve caps: the seam is the only thing that says short sleeves */}
        <path d="M49 108Q54 110 57 106" fill="none" strokeWidth="2.2" opacity="0.6" />
        <path d="M81 108Q76 110 73 106" fill="none" strokeWidth="2.2" opacity="0.6" />
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

/** Round hands. A filled circle survives being small; a short line does not. */
function Hand({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="5.5" fill={PALETTE.paperWhite} />
}

function Legs({ pose }: { pose: NarratorPose }) {
  if (pose === 'push') {
    /* Braced: the back leg trails. */
    return (
      <>
        <path d="M57 146 44 176" />
        <path d="M75 146v32" />
        <path d="M44 176q-7 1-10 -2" />
        <path d="M75 178q7 3 11 2" />
      </>
    )
  }

  if (pose === 'carry') {
    /* Knees out under load. */
    return (
      <>
        <path d="M56 146 51 162 55 178" />
        <path d="M76 146 81 162 77 178" />
        <path d="M55 178q-8 3-12 2" />
        <path d="M77 178q8 3 12 2" />
      </>
    )
  }

  if (pose === 'lean') {
    return (
      <>
        <path d="M57 146 47 176" />
        <path d="M75 146 82 178" />
        <path d="M47 176q-7 3-11 2" />
        <path d="M82 178q7 2 11 1" />
      </>
    )
  }

  if (pose === 'slump') {
    /* Feet turned in. Deflation is in the feet as much as the face. */
    return (
      <>
        <path d="M58 146v32" />
        <path d="M74 146v32" />
        <path d="M58 178q-5 3-9 1" />
        <path d="M74 178q5 3 9 1" />
      </>
    )
  }

  if (pose === 'wait') {
    return (
      <>
        <path d="M57 146v32" />
        <path d="M57 178q-7 3-11 2" />
        {/* one foot tapping: the only way "waiting" reads without a caption */}
        <motion.g
          style={{ transformOrigin: '75px 148px' }}
          animate={{ rotate: [0, -8, 0, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M75 146v32" />
          <path d="M75 178q7 3 11 2" />
        </motion.g>
      </>
    )
  }

  return (
    <>
      <path d="M57 146v32" />
      <path d="M75 146v32" />
      <path d="M57 178q-7 3-11 2" />
      <path d="M75 178q7 3 11 2" />
    </>
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
       * real playback size read as a ladder or a flag rather than as hands.
       *
       * Both arms leave from the same side of the tunic. Routing the far arm
       * across the body drew a line over the filled tunic, which read as a
       * strap across the chest rather than as an arm.
       */
      return (
        <>
          <path d="M82 101 101 97" />
          <Hand x={107} y={96} />
          <path d="M84 113 101 113" />
          <Hand x={107} y={114} />
        </>
      )
    case 'nod':
      return (
        <>
          <path d="M49 102 34 124" />
          <path d="M81 102 96 124" />
        </>
      )
    case 'shrug':
      /* Palms up and out. The shoulders do the rest, via HEAD_SET. */
      return (
        <>
          <path d="M48 106 30 98" />
          <Hand x={23} y={95} />
          <path d="M82 106 100 98" />
          <Hand x={107} y={95} />
        </>
      )
    case 'slump':
      /* Hanging. No hands: limp arms should end in nothing. */
      return (
        <>
          <path d="M50 106 44 132" />
          <path d="M80 106 86 132" />
        </>
      )
    case 'carry':
      /* Straight down and loaded. The hands are where the weight is. */
      return (
        <>
          <path d="M50 104 48 132" />
          <Hand x={47} y={139} />
          <path d="M80 104 82 132" />
          <Hand x={83} y={139} />
        </>
      )
    case 'wait':
      return (
        <>
          <path d="M49 104 45 128" />
          <path d="M81 104 85 128" />
        </>
      )
    case 'lean':
      /* Near arm forward to inspect, far arm back for balance. */
      return (
        <>
          <path d="M81 104 99 114" />
          <Hand x={104} y={117} />
          <path d="M49 104 33 116" />
        </>
      )
    case 'aha':
      return (
        <>
          <path d="M49 100 31 88" />
          <Hand x={25} y={85} />
          <path d="M81 100 99 88" />
          <Hand x={105} y={85} />
        </>
      )
    case 'back':
      /* Turned away. Arms close in, because we are seeing the back of them. */
      return (
        <>
          <path d="M50 104 45 130" />
          <path d="M80 104 85 130" />
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

/**
 * The marks around the figure. The storyboard's own shorthand: ticks when
 * something lands, dots when someone is working on it, strain lines when
 * something is heavy.
 */
function Marks({ pose }: { pose: NarratorPose }) {
  if (pose === 'point' || pose === 'cheer' || pose === 'hopeful' || pose === 'aha') {
    return (
      <g stroke={INK} strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <path d="M22 16l-6-9" />
        <path d="M40 8l-2-10" />
        <path d="M108 16l6-9" />
      </g>
    )
  }

  if (pose === 'think') {
    return (
      <g fill={INK} opacity="0.5">
        <circle cx="106" cy="22" r="3" />
        <circle cx="116" cy="12" r="4.2" />
      </g>
    )
  }

  if (pose === 'carry' || pose === 'push') {
    /* Strain, at the shoulders. Two marks, not a starburst. */
    return (
      <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" opacity="0.5">
        <path d="M42 92 35 86" />
        <path d="M88 92 95 86" />
      </g>
    )
  }

  if (pose === 'back') {
    /* A spine. Without it a turned back reads as a missing face. */
    return (
      <g stroke={INK} fill="none" strokeLinecap="round">
        <path d="M65 100v42" strokeWidth="2.2" opacity="0.4" />
      </g>
    )
  }

  if (pose === 'shrug') {
    return (
      <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" opacity="0.45">
        <path d="M40 88q-4-5-2-9" />
        <path d="M90 88q4-5 2-9" />
      </g>
    )
  }

  if (pose === 'wait') {
    /* Three dots. Time passing, and nothing else happening. */
    return (
      <g fill={INK} opacity="0.4">
        <circle cx="104" cy="30" r="2.6" />
        <circle cx="113" cy="30" r="2.6" />
        <circle cx="122" cy="30" r="2.6" />
      </g>
    )
  }

  return null
}
