import {
  arch,
  blocker,
  card,
  grid,
  mac,
  narrator,
  router,
  sheet,
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
  {
    n: 1,
    id: 'my-machine',
    relation: 'want',
    title: 'My machine',
    vo: "I've got a Mac. 32 gigs of RAM. And I wanted to understand something about GLM-5.3-Flash.",
    commands: [mac.show({ x: 50, y: 52 }, 1.15), narrator.at({ x: 22, y: 62 }, 'point', 0.92)],
    overlays: [H("This is what I'm\nworking with.", { x: '10%', y: '30%' }, { size: 'md', rotate: -3 })],
  },
  {
    n: 2,
    id: 'does-not-fit',
    relation: 'wall',
    title: "It doesn't fit",
    vo: 'It has 320 billion parameters. The download is about 306 gigabytes.',
    // HEADACHE 1a. The Mac shrinks and holds position so the mass can dwarf it.
    commands: [mac.moveTo({ x: 11, y: 54 }, 0.62), narrator.at({ x: 11, y: 82 }, 'wonder', 0.62)],
    stages: [{ at: 380, commands: [grid.show({ x: 60, y: 46 }, 1, '306 GiB')] }],
    overlays: [H('That is… a lot bigger.', { x: '3%', y: '38%' }, { rotate: -2 })],
  },
  {
    n: 3,
    id: 'squeeze-it',
    relation: 'so',
    title: 'Squeeze it',
    vo: 'So squeeze them. Four bits per parameter instead of sixteen.',
    commands: [narrator.at({ x: 11, y: 82 }, 'push', 0.62)],
    stages: [{ at: 300, commands: [grid.squeeze(0.62, '~153 GiB')] }],
    overlays: [
      H('4-bit', { x: '40%', y: '20%' }, { rotate: -1, tone: 'orange' }),
      H('Still about five times\nmore than I have.', { x: '3%', y: '36%' }, { rotate: -2 }),
    ],
  },
  {
    n: 4,
    id: 'the-anomaly',
    relation: 'and-yet',
    title: 'The anomaly',
    vo: 'But for any one word, only about 18 billion of those parameters are active.',
    // HEADACHE 1 in full: a solid block cannot be partly used. So what is it made of?
    commands: [grid.moveTo({ x: 60, y: 46 }, 0.95), narrator.at({ x: 11, y: 82 }, 'think', 0.62)],
    stages: [
      { at: 420, commands: [word.arrive({ x: 44, y: 14 }, 0.86)] },
      { at: 1000, commands: [grid.lightActiveSlice()] },
    ],
    overlays: [{ kind: 'brace', text: '~18B active', anchor: 'grid-active', at: { x: '0%', y: '74%' }, tone: 'orange' }],
    lateOverlays: {
      at: 1500,
      overlays: [H('How does a model use\npart of itself?', { x: '3%', y: '34%' }, { rotate: -2 })],
    },
  },
  {
    n: 5,
    id: 'divided-into-experts',
    relation: 'so',
    title: 'Because it is divided',
    vo: 'Because most of those parameters are divided up into separate experts.',
    // ASPIRIN 1. Worked example first: one expert, then the population.
    commands: [narrator.at({ x: 11, y: 82 }, 'wonder', 0.6)],
    stages: [
      { at: 360, commands: [grid.showOneExpert({ x: 60, y: 46 }, 0.95)] },
      { at: 1500, commands: [grid.becomeExperts({ x: 60, y: 46 }, 0.95)] },
    ],
    overlays: [
      {
        kind: 'note',
        text: 'Most of the parameters are\ndivided into experts.',
        at: { x: '58%', y: '9%' },
        size: 'md',
        rotate: 2,
        tone: 'orange',
      },
      H('expert = a learned network block, not a labelled specialist', { x: '30%', y: '92%' }, { rotate: -1 }),
    ],
    lateOverlays: {
      at: 1900,
      overlays: [{ kind: 'brace', text: '288 per sparse layer', at: { x: '28%', y: '84%' }, width: '62%' }],
    },
  },
  {
    n: 6,
    id: 'something-must-choose',
    relation: 'and-yet',
    title: 'Something has to choose',
    vo: 'But if only a few of them run for one word — something has to decide which few.',
    // HEADACHE 2, deliberately unresolved. No mechanism on screen yet.
    // The gap between the word and the population IS the frame.
    commands: [
      grid.moveTo({ x: 66, y: 46 }, 0.84),
      word.moveTo({ x: 24, y: 46 }, 1),
      narrator.at({ x: 11, y: 80 }, 'think', 0.66),
    ],
    overlays: [H('Which eight? And who picks them?', { x: '4%', y: '30%' }, { size: 'md', rotate: -2 })],
    // The gap between the word and the population is the frame. Nothing fills it.
    lateOverlays: {
      at: 500,
      overlays: [{ kind: 'note', text: '?', at: { x: '32%', y: '43%' }, size: 'lg', rotate: 0, tone: 'red' }],
    },
  },
  {
    n: 7,
    id: 'meet-the-router',
    relation: 'so',
    title: 'Meet the router',
    vo: 'So there is a router.',
    // ASPIRIN 2, introduced plainly. It does nothing yet.
    commands: [],
    stages: [{ at: 260, commands: [router.appear({ x: 33, y: 46 }, 0.78)] }],
    overlays: [H('A router.', { x: '30%', y: '26%' }, { size: 'md', rotate: -2 })],
  },
  {
    n: 8,
    id: 'router-works',
    relation: 'so',
    title: 'The router works',
    vo: 'It reads what the word has become, scores every expert, and takes the top eight. Plus one that is always on.',
    commands: [],
    // Scores everything FIRST, then eight land. Selection has to be earned.
    stages: [
      { at: 200, commands: [grid.score(), router.fanOut()] },
      { at: 1500, commands: [grid.stopScoring(), router.foldFan()] },
    ],
    overlays: [
      {
        kind: 'bubble',
        text: 'I read what this word has become, score every expert, and take the top 8.',
        at: { x: '24%', y: '10%' },
        width: 320,
        tail: 'bottom-left',
      },
    ],
    lateOverlays: {
      at: 1700,
      overlays: [{ kind: 'brace', text: '8 routed + 1 shared', at: { x: '36%', y: '84%' }, width: '48%', tone: 'orange' }],
    },
  },
  {
    n: 9,
    id: 'what-about-the-rest',
    relation: 'and-yet',
    title: 'What about the other 280?',
    vo: 'But that is eight out of 288. So what about the other 280? They just sit there.',
    // HEADACHE 3. Ahmad's line. Hold the exact frame and brace the unlit.
    commands: [narrator.at({ x: 11, y: 80 }, 'think', 0.7)],
    overlays: [
      H('280 of them did nothing.', { x: '3%', y: '30%' }, { size: 'md', rotate: -2 }),
      { kind: 'brace', text: '280 not used for this word', at: { x: '36%', y: '84%' }, width: '48%' },
    ],
  },
  {
    n: 10,
    id: 'why-hold-them',
    relation: 'hope',
    title: 'So why hold them at all?',
    vo: 'And if 280 of them do nothing for this word, why does my 32 gigs have to hold them?',
    // HEADACHE 4 turns into a proposal. The Mac comes back to be measured against.
    commands: [
      grid.moveTo({ x: 68, y: 38 }, 0.6),
      router.park(),
      word.moveTo({ x: 8, y: 24 }, 0.7),
      mac.moveTo({ x: 26, y: 58 }, 0.85),
      narrator.at({ x: 7, y: 78 }, 'wonder', 0.6),
    ],
    stages: [{ at: 500, commands: [mac.load(9)] }],
    overlays: [H('Keep only the eight?', { x: '6%', y: '38%' }, { size: 'md', rotate: -2 })],
    lateOverlays: {
      at: 900,
      overlays: [H('~18 GB, in 32 GB.', { x: '20%', y: '80%' }, { rotate: -1, tone: 'orange' })],
    },
  },
  {
    n: 11,
    id: 'would-that-work',
    relation: 'hope',
    title: 'Would that work?',
    vo: 'The router already knows which eight. So load those, use them, leave everything else asleep. Think about it — would that work?',
    // Hope peak. The frame argues yes. Ahmad pauses here on camera, then clicks.
    commands: [grid.recede(), narrator.at({ x: 47, y: 62 }, 'hopeful', 0.72)],
    overlays: [
      { kind: 'sparks', at: { x: '43%', y: '46%' } },
      H('That would be so much simpler.', { x: '38%', y: '80%' }, { size: 'md', rotate: -2 }),
    ],
  },
  {
    n: 12,
    id: 'it-does-not-work',
    relation: 'wall',
    title: "It doesn't work",
    vo: "And it doesn't work. It really doesn't. And the reason took me a while to understand.",
    // HEADACHE 5. No part of the answer appears here.
    commands: [mac.strain(), narrator.at({ x: 47, y: 66 }, 'think', 0.72)],
    stages: [{ at: 320, commands: [blocker.drop({ x: 43, y: 40 })] }],
    overlays: [
      { kind: 'note', text: 'Something is stopping it.', at: { x: '48%', y: '18%' }, size: 'md', rotate: 2, tone: 'red' },
    ],
    lateOverlays: {
      at: 700,
      overlays: [{ kind: 'note', text: "So… why doesn't this just work?", at: { x: '20%', y: '88%' }, size: 'lg', rotate: -2 }],
    },
  },
  {
    n: 13,
    id: 'go-inside',
    relation: 'therefore',
    title: 'Go inside',
    vo: "Staring at the finished architecture won't tell us. So let's follow one word all the way through it.",
    commands: [
      blocker.park(),
      mac.park(),
      grid.park(),
      router.park(),
      word.arrive({ x: 62, y: 54 }, 0.82),
      sheet.present({ x: 26, y: 50 }),
      sheet.pushAside(),
      arch.open({ x: 82, y: 54 }),
      narrator.at({ x: 44, y: 62 }, 'push', 0.8, true),
    ],
    overlays: [
      H("That's a lot for now.", { x: '44%', y: '32%' }, { rotate: -2 }),
      { kind: 'arrow', from: { x: 1290, y: 590 }, to: { x: 1450, y: 585 }, bow: 0 },
      { kind: 'note', text: 'Inside the model', at: { x: '76%', y: '76%' }, size: 'lg', rotate: 0 },
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
