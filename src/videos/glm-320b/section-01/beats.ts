import {
  arch,
  ghosts,
  parcel,
  blocker,
  card,
  grid,
  office,
  home,
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
  /* ---- What the thing is. Fast: the viewer roughly knows these words. ---- */
  {
    n: 1,
    id: 'the-model',
    relation: 'want',
    title: 'The model',
    vo: "This is GLM-5.3-Flash. It's the AI we're going to pull apart.",
    commands: [parcel.arrive({ x: 50, y: 48 }, 1.2)],
    overlays: [{ kind: 'note', text: 'GLM-5.3-Flash', at: { x: '42%', y: '24%' }, size: 'lg', rotate: -2 }],
  },
  {
    n: 2,
    id: 'parameters',
    relation: 'so',
    title: '320 billion parameters',
    vo: 'It has 320 billion parameters.',
    commands: [],
    stages: [{ at: 280, commands: [parcel.open(), grid.show({ x: 56, y: 46 }, 0.95, '')] }],
    lateOverlays: {
      at: 820,
      overlays: [{ kind: 'note', text: '320,000,000,000', sub: 'parameters', at: { x: '56%', y: '11%' }, size: 'lg', rotate: -1 }],
    },
  },
  {
    n: 3,
    id: 'parameters-are-knowledge',
    relation: 'so',
    title: 'Parameters are its knowledge',
    vo: "And a parameter is just... knowledge. Everything it learned is in there.",
    commands: [],
    overlays: [H('all of its knowledge', { x: '4%', y: '44%' }, { size: 'md', rotate: -2 })],
  },
  {
    n: 4,
    id: 'only-18-active',
    relation: 'and-yet',
    title: 'Only 18B are active',
    vo: 'But only 18 billion of them are active.',
    commands: [],
    stages: [{ at: 300, commands: [grid.lightActiveSlice(), grid.recede()] }],
    overlays: [{ kind: 'brace', text: '18B active', anchor: 'grid-active', at: { x: '0%', y: '74%' }, tone: 'orange' }],
  },
  {
    n: 5,
    id: 'what-active-means',
    relation: 'so',
    title: 'What "active" means',
    vo: "Active just means: that's the only knowledge actually being used. For one word.",
    // The beat I had skipped entirely. "Active" is the whole hinge of the video
    // and it was never defined.
    commands: [],
    stages: [{ at: 300, commands: [word.arrive({ x: 30, y: 16 }, 0.82)] }],
    lateOverlays: {
      at: 900,
      overlays: [H('this much knowledge, for this one word', { x: '4%', y: '40%' }, { size: 'md', rotate: -2 })],
    },
  },
  {
    n: 6,
    id: 'why-the-rest',
    relation: 'and-yet',
    title: 'So why keep the rest?',
    vo: 'So why does it have the other 300 billion at all?',
    commands: [],
    lateOverlays: {
      at: 300,
      overlays: [{ kind: 'note', text: '?', at: { x: '64%', y: '44%' }, size: 'lg', rotate: 0, tone: 'red' }],
    },
  },

  /* ---- The experts. Slower: this is the counterintuitive part. ---- */
  {
    n: 7,
    id: 'experts-exist',
    relation: 'so',
    title: 'Inside, there are experts',
    vo: 'Because inside, that knowledge is split up into experts.',
    commands: [],
    stages: [
      { at: 300, commands: [grid.showOneExpert({ x: 56, y: 46 }, 0.95)] },
      { at: 1500, commands: [grid.becomeExperts({ x: 56, y: 46 }, 0.95)] },
    ],
    overlays: [H('an expert', { x: '28%', y: '26%' }, { size: 'md', rotate: -2 })],
  },
  {
    n: 8,
    id: 'experts-do-the-work',
    relation: 'so',
    title: 'Experts do the work',
    vo: 'There are 288 of them. And the experts are the ones who actually do the work.',
    commands: [],
    lateOverlays: {
      at: 500,
      overlays: [{ kind: 'brace', text: '288 experts', at: { x: '24%', y: '82%' }, width: '64%' }],
    },
  },
  {
    n: 9,
    id: 'only-eight-work',
    relation: 'and-yet',
    title: 'Only 8 work',
    vo: 'But for one word, only eight of them do anything.',
    commands: [],
    overlays: [
      H('8 working', { x: '6%', y: '40%' }, { size: 'md', rotate: -2 }),
      { kind: 'brace', text: '280 doing nothing', at: { x: '24%', y: '82%' }, width: '64%' },
    ],
  },

  /* ---- The office. Memory as presence, not storage. ---- */
  {
    n: 10,
    id: 'my-office',
    relation: 'so',
    title: 'My office',
    vo: "Now — here's my office. It has 32 desks. One desk for every gigabyte I've got.",
    commands: [grid.moveTo({ x: 70, y: 32 }, 0.5), word.moveTo({ x: 8, y: 14 }, 0.68)],
    stages: [{ at: 340, commands: [office.show({ x: 30, y: 62 }, 1)] }],
  },
  {
    n: 11,
    id: 'needs-more-desks',
    relation: 'wall',
    title: 'It needs 306',
    vo: 'To hold all of this model, I would need 306 desks.',
    commands: [],
    stages: [{ at: 340, commands: [ghosts.show(10, { x: 62, y: 66 }, 0.5)] }],
    overlays: [H('about ten offices', { x: '48%', y: '86%' }, { size: 'md', rotate: -1 })],
  },
  {
    n: 12,
    id: 'everyone-in-office',
    relation: 'so',
    title: 'Everyone has to be in',
    vo: 'Because to do any work at all, an expert has to be at a desk. In the office.',
    // The point the box-with-slots could never make: the constraint is
    // presence, not storage.
    commands: [ghosts.hide(), office.moveTo({ x: 34, y: 58 }, 1.15)],
    stages: [{ at: 380, commands: [office.staff(32, 8)] }],
    overlays: [H('to work, you have to be here', { x: '6%', y: '26%' }, { size: 'md', rotate: -2 })],
  },
  {
    n: 13,
    id: 'the-absurdity',
    relation: 'and-yet',
    title: '280 sitting there',
    vo: 'Which means the rest of them are just sitting at desks. Asleep. Taking up the room.',
    // The killer image. A five-year-old gets the absurdity instantly.
    commands: [],
    overlays: [
      H('these eight are working', { x: '6%', y: '24%' }, { rotate: -2 }),
      { kind: 'note', text: 'the rest are just… sitting there', at: { x: '6%', y: '88%' }, size: 'md', rotate: -1, tone: 'red' },
    ],
  },
  {
    n: 14,
    id: 'send-them-home',
    relation: 'hope',
    title: 'So send them home',
    vo: "So why don't I send them home? Leave them at home, and call in only the eight I need.",
    commands: [],
    stages: [
      { at: 300, commands: [home.open({ x: 82, y: 62 }, 1)] },
      { at: 900, commands: [office.staff(8, 8), home.waiting(280)] },
    ],
    overlays: [H('call in only who I need', { x: '6%', y: '26%' }, { size: 'md', rotate: -2 })],
  },
  {
    n: 15,
    id: 'and-it-fits',
    relation: 'hope',
    title: 'And it fits',
    vo: 'Eight experts. Eight desks. It fits in my office, easily.',
    commands: [],
    overlays: [
      { kind: 'sparks', at: { x: '24%', y: '40%' } },
      H('room to spare', { x: '10%', y: '88%' }, { size: 'md', rotate: -1, tone: 'orange' }),
    ],
  },
  {
    n: 16,
    id: 'would-that-work',
    relation: 'hope',
    title: 'Would that work?',
    vo: 'Think about it for a second. Would that actually work?',
    commands: [narrator.at({ x: 58, y: 76 }, 'hopeful', 0.7)],
    overlays: [H('would that work?', { x: '48%', y: '88%' }, { size: 'lg', rotate: -2 })],
  },
  {
    n: 17,
    id: 'it-does-not',
    relation: 'wall',
    title: "It doesn't",
    vo: "It doesn't. And the reason is the whole rest of this video.",
    commands: [office.strain(), narrator.at({ x: 58, y: 76 }, 'think', 0.7)],
    stages: [{ at: 300, commands: [blocker.drop({ x: 62, y: 44 })] }],
    overlays: [{ kind: 'note', text: "it doesn't work", at: { x: '66%', y: '26%' }, size: 'md', rotate: 2, tone: 'red' }],
  },
  {
    n: 18,
    id: 'go-inside',
    relation: 'therefore',
    title: 'Go inside',
    vo: "So let's go inside and follow one word all the way through.",
    commands: [
      blocker.park(),
      office.park(),
      grid.park(),
      word.arrive({ x: 58, y: 52 }, 0.82),
      arch.open({ x: 80, y: 52 }),
      narrator.at({ x: 40, y: 60 }, 'push', 0.78),
    ],
    overlays: [
      { kind: 'arrow', from: { x: 1210, y: 566 }, to: { x: 1400, y: 562 }, bow: 0 },
      { kind: 'note', text: 'inside the model', at: { x: '74%', y: '74%' }, size: 'lg', rotate: 0 },
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
