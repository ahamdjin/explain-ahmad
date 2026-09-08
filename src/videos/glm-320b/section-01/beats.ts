import {
  arch,
  ghosts,
  parcel,
  blocker,
  card,
  grid,
  mac,
  narrator,
  router,
  word,
  type Patch,
} from './scene'
import { HOLD, type Relation } from './motion'

export type Overlay = {
  kind: 'note' | 'bubble' | 'brace' | 'arrow' | 'sparks' | 'cross' | 'title'
  /** Percentages of the stage, except `arrow`, which uses 1920x1080 units. */
  at?: { x: string; y: string }
  from?: { x: number; y: number }
  to?: { x: number; y: number }
  text?: string
  sub?: string
  width?: string | number
  rotate?: number
  tone?: 'ink' | 'orange' | 'red'
  size?: 'sm' | 'md' | 'lg'
  side?: 'top' | 'bottom'
  bow?: number
  dashed?: boolean
  backed?: boolean
  tail?: 'bottom-left' | 'bottom-center' | 'left'
  label?: string
  /** Attaches the overlay to the grid's live geometry rather than fixed coords. */
  anchor?: 'grid-total' | 'grid-active'
}

/**
 * A staged reveal inside one beat. Teachers show a thing, then name it, then let
 * you react -- they do not do all three at once. `at` is ms after the beat opens.
 */
export type Stage = { at: number; commands: Patch[] }

export type Beat = {
  n: number
  id: string
  title: string
  vo: string
  /** What this beat IS in the story. Drives motion feel and hold time. */
  relation: Relation
  /** Fires immediately when the beat opens. */
  commands: Patch[]
  /** Fires later, on a timeline, so one beat can teach in sequence. */
  stages?: Stage[]
  overlays?: Overlay[]
  /** Overlays held back until `at` ms, so a label can follow its object. */
  lateOverlays?: { at: number; overlays: Overlay[] }
  /** Marks the beat where the viewer routes a word themselves. */
  interactive?: boolean
}

const H = (text: string, at: { x: string; y: string }, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at,
  size: 'sm',
  ...extra,
})

export const BEATS: Beat[] = [
  /* ---- FAST OPEN. Asserted, not taught. Headache exists by beat 5. ---- */
  {
    n: 1,
    id: 'my-mac',
    relation: 'want',
    title: 'My machine',
    vo: "This is my Mac. 32 gigs of memory. Everything it runs has to fit in there.",
    // Capacity and the fitting rule in ONE beat. Anyone who knows RAM nods;
    // anyone who doesn't reads it off the empty slots.
    commands: [mac.show({ x: 50, y: 52 }, 1.1)],
    overlays: [H('everything has to fit in here', { x: '36%', y: '76%' }, { rotate: -2 })],
  },
  {
    n: 2,
    id: 'the-thing',
    relation: 'so',
    title: 'The thing I wanted to run',
    vo: 'And I wanted to run this on it.',
    commands: [mac.moveTo({ x: 14, y: 54 }, 0.6)],
    stages: [{ at: 340, commands: [parcel.arrive({ x: 58, y: 48 }, 1.1)] }],
    overlays: [H('this', { x: '48%', y: '24%' }, { size: 'md', rotate: -3 })],
  },
  {
    n: 3,
    id: 'made-of-parameters',
    relation: 'so',
    title: 'Made of parameters',
    vo: "It's made of parameters. Little numbers it learned. 320 billion of them.",
    // The picture does the decomposing even though the voice moves fast.
    commands: [],
    stages: [
      { at: 260, commands: [parcel.open(), grid.show({ x: 58, y: 46 }, 0.95)] },
      { at: 900, commands: [] },
    ],
    lateOverlays: {
      at: 900,
      overlays: [
        { kind: 'note', text: '320,000,000,000', sub: 'parameters', at: { x: '58%', y: '12%' }, size: 'lg', rotate: -1 },
      ],
    },
  },
  {
    n: 4,
    id: 'that-much-space',
    relation: 'so',
    title: 'They need space',
    vo: 'All together, they need about 306 gigabytes.',
    commands: [grid.squeeze(0.95, '306 GiB')],
  },
  {
    n: 5,
    id: 'ten-of-mine',
    relation: 'wall',
    title: 'Ten of mine',
    vo: "My Mac holds 32. So I'd need ten of them. Not one.",
    // THE WALL, at beat 5. Expressed in a unit the viewer was handed at beat 1.
    commands: [grid.moveTo({ x: 62, y: 34 }, 0.7)],
    stages: [{ at: 380, commands: [ghosts.show(10, { x: 40, y: 72 }, 0.62)] }],
    overlays: [H("ten of mine", { x: '8%', y: '80%' }, { size: 'md', rotate: -2 })],
  },

  /* ---- SLOW DOWN. This is the counterintuitive part. ---- */
  {
    n: 6,
    id: 'send-one-word',
    relation: 'and-yet',
    title: 'But send in one word',
    vo: 'But then I noticed something. Watch what happens when you send in one word.',
    commands: [ghosts.hide(), grid.moveTo({ x: 58, y: 46 }, 0.95)],
    stages: [{ at: 420, commands: [word.arrive({ x: 44, y: 13 }, 0.82)] }],
  },
  {
    n: 7,
    id: 'only-this-lights',
    relation: 'and-yet',
    title: 'Only this much lights up',
    vo: 'Only this much of it actually wakes up.',
    commands: [],
    stages: [{ at: 260, commands: [grid.lightActiveSlice()] }],
    overlays: [{ kind: 'brace', text: '~18B active', anchor: 'grid-active', at: { x: '0%', y: '74%' }, tone: 'orange' }],
  },
  {
    n: 8,
    id: 'rest-did-nothing',
    relation: 'and-yet',
    title: 'The rest did nothing',
    vo: 'Everything else did nothing at all. Not for that word.',
    commands: [grid.recede()],
    overlays: [
      { kind: 'brace', text: '~18B active', anchor: 'grid-active', at: { x: '0%', y: '74%' }, tone: 'orange' },
      H('did nothing', { x: '78%', y: '20%' }, { rotate: 3 }),
    ],
  },
  {
    n: 9,
    id: 'that-would-fit',
    relation: 'hope',
    title: 'That would fit',
    vo: 'And that small part? About 18 gigs. That fits on my Mac right now.',
    commands: [mac.moveTo({ x: 18, y: 58 }, 0.9)],
    stages: [{ at: 420, commands: [mac.load(9)] }],
    overlays: [H('~18 GB, in 32 GB', { x: '10%', y: '82%' }, { rotate: -1, tone: 'orange' })],
  },
  {
    n: 10,
    id: 'the-hook',
    relation: 'and-yet',
    title: 'So why the other 300?',
    vo: "So why do I need the other 300 billion at all?",
    // THE HOOK. Beat 10. Everything after this is earning the answer.
    commands: [],
    stages: [{ at: 300, commands: [] }],
    lateOverlays: {
      at: 300,
      overlays: [
        { kind: 'note', text: '?', at: { x: '66%', y: '44%' }, size: 'lg', rotate: 0, tone: 'red' },
        H('why keep the rest?', { x: '8%', y: '34%' }, { size: 'md', rotate: -2 }),
      ],
    },
  },

  /* ---- MECHANISM. Slow, because this is the actual teaching. ---- */
  {
    n: 11,
    id: 'not-loose',
    relation: 'so',
    title: 'They come in groups',
    vo: "Because the parameters aren't loose. They come in groups.",
    commands: [],
    stages: [{ at: 300, commands: [grid.showOneExpert({ x: 58, y: 46 }, 0.95)] }],
    overlays: [H('a group', { x: '30%', y: '24%' }, { size: 'md', rotate: -2 })],
  },
  {
    n: 12,
    id: 'group-works-together',
    relation: 'so',
    title: 'A group works as one',
    vo: 'A whole group either works, or it does nothing.',
    commands: [],
    overlays: [H('all of it, or none of it', { x: '26%', y: '78%' }, { rotate: -1 })],
  },
  {
    n: 13,
    id: 'lots-of-groups',
    relation: 'so',
    title: 'There are lots',
    vo: 'And there are a lot of these groups. 288 of them, in each layer.',
    commands: [],
    stages: [{ at: 280, commands: [grid.becomeExperts({ x: 58, y: 46 }, 0.95)] }],
    lateOverlays: {
      at: 1400,
      overlays: [
        { kind: 'brace', text: '288 groups', at: { x: '26%', y: '84%' }, width: '64%' },
        H('these are called experts', { x: '62%', y: '10%' }, { rotate: 2, tone: 'orange' }),
      ],
    },
  },
  {
    n: 14,
    id: 'who-chooses',
    relation: 'and-yet',
    title: 'Who chooses?',
    vo: 'So for one word, only a few groups run. But who decides which few?',
    // Pure headache. The gap is the frame. No mechanism on screen.
    commands: [grid.moveTo({ x: 66, y: 46 }, 0.84), word.moveTo({ x: 26, y: 46 }, 1)],
    lateOverlays: {
      at: 420,
      overlays: [{ kind: 'note', text: '?', at: { x: '34%', y: '43%' }, size: 'lg', rotate: 0, tone: 'red' }],
    },
  },
  {
    n: 15,
    id: 'meet-router',
    relation: 'so',
    title: 'This does',
    vo: 'This does.',
    commands: [],
    stages: [{ at: 240, commands: [router.appear({ x: 34, y: 46 }, 0.78)] }],
    overlays: [H('a router', { x: '28%', y: '25%' }, { size: 'md', rotate: -2 })],
  },
  {
    n: 16,
    id: 'reads-the-word',
    relation: 'so',
    title: 'It reads the word',
    vo: 'It looks at the word.',
    commands: [],
    overlays: [{ kind: 'arrow', from: { x: 560, y: 500 }, to: { x: 620, y: 500 }, bow: 0 }],
  },
  {
    n: 17,
    id: 'scores-everything',
    relation: 'so',
    title: 'It scores every group',
    vo: 'It gives every single group a score.',
    commands: [],
    stages: [{ at: 200, commands: [grid.score(), router.fanOut()] }],
  },
  {
    n: 18,
    id: 'keeps-eight',
    relation: 'so',
    title: 'It keeps eight',
    vo: 'And it keeps the best eight.',
    commands: [],
    stages: [{ at: 240, commands: [grid.stopScoring(), router.foldFan()] }],
    lateOverlays: {
      at: 900,
      overlays: [{ kind: 'brace', text: '8 of 288', at: { x: '36%', y: '84%' }, width: '48%', tone: 'orange' }],
    },
  },

  /* ---- THE TRAP. ---- */
  {
    n: 19,
    id: 'two-eighty-idle',
    relation: 'and-yet',
    title: '280 did nothing',
    vo: 'Which means 280 of them did nothing. Again.',
    commands: [],
    overlays: [
      H('280 idle', { x: '78%', y: '18%' }, { rotate: 3 }),
      { kind: 'brace', text: '8 of 288', at: { x: '36%', y: '84%' }, width: '48%', tone: 'orange' },
    ],
  },
  {
    n: 20,
    id: 'take-them-out',
    relation: 'hope',
    title: 'So take them out',
    vo: 'So take them out. The router already knows which eight I need.',
    commands: [grid.moveTo({ x: 70, y: 34 }, 0.5), router.park(), word.moveTo({ x: 8, y: 24 }, 0.7)],
    stages: [{ at: 420, commands: [mac.moveTo({ x: 30, y: 58 }, 0.95), mac.load(9)] }],
    overlays: [H('keep only these', { x: '10%', y: '38%' }, { size: 'md', rotate: -2 })],
  },
  {
    n: 21,
    id: 'and-it-fits',
    relation: 'hope',
    title: 'And it fits',
    vo: 'And now it fits. On the machine I already own. With room to spare.',
    commands: [],
    overlays: [
      { kind: 'sparks', at: { x: '48%', y: '44%' } },
      H('room to spare', { x: '46%', y: '74%' }, { size: 'md', rotate: -1, tone: 'orange' }),
    ],
  },
  {
    n: 22,
    id: 'would-that-work',
    relation: 'hope',
    title: 'Would that work?',
    vo: 'Think about it for a second. Would that work?',
    commands: [narrator.at({ x: 62, y: 62 }, 'hopeful', 0.72)],
    overlays: [H('would that work?', { x: '54%', y: '84%' }, { size: 'lg', rotate: -2 })],
  },
  {
    n: 23,
    id: 'it-does-not',
    relation: 'wall',
    title: "It doesn't",
    vo: "It doesn't. It really doesn't.",
    commands: [mac.strain(), narrator.at({ x: 62, y: 62 }, 'think', 0.72)],
    stages: [{ at: 300, commands: [blocker.drop({ x: 50, y: 40 })] }],
    overlays: [{ kind: 'note', text: 'something stops it', at: { x: '55%', y: '18%' }, size: 'md', rotate: 2, tone: 'red' }],
  },
  {
    n: 24,
    id: 'go-inside',
    relation: 'therefore',
    title: 'Go inside',
    vo: "And to understand why, we have to go inside and follow one word all the way through.",
    commands: [
      blocker.park(),
      mac.park(),
      grid.park(),
      word.arrive({ x: 60, y: 54 }, 0.82),
      arch.open({ x: 82, y: 54 }),
      narrator.at({ x: 42, y: 62 }, 'push', 0.78),
    ],
    overlays: [
      { kind: 'arrow', from: { x: 1250, y: 590 }, to: { x: 1440, y: 585 }, bow: 0 },
      { kind: 'note', text: 'inside the model', at: { x: '76%', y: '76%' }, size: 'lg', rotate: 0 },
    ],
  },
]

export function holdFor(beat: Beat) {
  const staged = beat.stages?.length ? Math.max(...beat.stages.map((stage) => stage.at)) : 0
  return HOLD[beat.relation] + staged
}

/** Longest staged offset, so the recorder knows how long a beat really needs. */
export function stageSpan(beat: Beat) {
  const stages = beat.stages?.map((stage) => stage.at) ?? []
  const late = beat.lateOverlays ? [beat.lateOverlays.at] : []
  const all = [...stages, ...late]
  return all.length ? Math.max(...all) : 0
}
