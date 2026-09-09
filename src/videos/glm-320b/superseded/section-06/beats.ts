import { type Beat, type Overlay } from '../../../paper'
import { CHOSEN, CHOSEN_B } from '../section-01/scene'
import { aside, camera, counter, narrator, row, tower, wall, type Patch } from './scene'

const H = (text: string, at: { x: string; y: string }, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at,
  size: 'sm',
  ...extra,
})

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'no',
    title: 'No.',
    relation: 'wall',
    secs: 3,
    // Takes section 5's confident ending away in one syllable.
    vo: 'No.',
    commands: [
      wall.show({ x: 50, y: 42 }, 0.82, CHOSEN),
      narrator.at({ x: 7, y: 86 }, 'think', 0.44),
    ],
    overlays: [H('no', { x: '50%', y: '80%' }, { size: 'xl', rotate: -3, tone: 'cost', width: '20%' })],
  },
  {
    n: 2,
    id: 'one-floor',
    title: 'That room is one floor',
    relation: 'and-yet',
    secs: 5,
    // The event: the pull-back. The camera does what no actor could.
    vo: 'That room is one floor.',
    commands: [],
    stages: [{ at: 200, commands: [camera.to(50, 42, 0.42)] }],
  },
  {
    n: 3,
    id: 'there-are-45',
    title: 'There are forty-five',
    relation: 'wall',
    secs: 5.5,
    vo: 'There are forty-five.',
    commands: [camera.home(), wall.moveTo({ x: 26, y: 34 }, 0.34)],
    stages: [{ at: 300, commands: [tower.show({ x: 70, y: 48 }, 1, 1)] }],
  },
  {
    n: 4,
    id: 'it-climbs',
    title: 'The word climbs',
    relation: 'so',
    secs: 4.5,
    vo: "The word doesn't get processed once. It climbs.",
    // The aside lands with the climb, because this is the beat where a viewer
    // starts wondering where the rest of the sentence went.
    commands: [row.show({ x: 24, y: 68 }, 0.5, 'floor 1'), aside.show({ x: 17, y: 90 })],
    stages: [{ at: 240, commands: [tower.climbTo(6)] }],
  },
  {
    n: 5,
    id: 'again-on-every-floor',
    title: 'Again on every floor',
    relation: 'so',
    secs: 5,
    vo: 'And on every floor, the same thing happens again — it looks around, its numbers change…',
    commands: [tower.climbTo(14), row.change(41, 'floor 14')],
  },
  {
    n: 6,
    id: 'different-from-below',
    title: 'Different from the floor below',
    relation: 'so',
    secs: 4.5,
    vo: '…and its numbers are different from the floor below.',
    commands: [tower.climbTo(21), row.change(97, 'floor 21')],
    overlays: [H('new numbers on every floor', { x: '5%', y: '80%' }, { size: 'md', rotate: -2, tone: 'measure' })],
  },
  {
    n: 7,
    id: 'different-scores',
    title: 'Different numbers, different scores',
    relation: 'so',
    secs: 4,
    vo: 'Different numbers. Different scores.',
    commands: [wall.reroute(CHOSEN_B, CHOSEN)],
  },
  {
    n: 8,
    id: 'different-eight',
    title: 'Different eight',
    relation: 'wall',
    secs: 5,
    vo: 'Different eight.',
    commands: [tower.climbTo(28), row.change(151, 'floor 28')],
    lateOverlays: {
      at: 300,
      overlays: [H('a new team, every floor', { x: '5%', y: '20%' }, { size: 'md', rotate: -2, tone: 'cost' })],
    },
  },
  {
    n: 9,
    id: 'forty-two-of-them',
    title: 'Forty-two floors work this way',
    relation: 'so',
    secs: 5.5,
    // The 3 dense layers matter: one clause, and it prevents a wrong number.
    vo: 'Forty-two of those floors work this way. Eight experts, every one.',
    commands: [tower.climbTo(42), row.change(211, 'floor 42')],
    stages: [{ at: 260, commands: [counter.show({ x: 26, y: 70 }, 0.9), counter.to(8)] }],
  },
  {
    n: 10,
    id: 'not-eight',
    title: 'Not eight. Three hundred and thirty-six.',
    relation: 'wall',
    secs: 6.5,
    // A number the viewer watched being built is a number they trust.
    vo: "Which is not eight expert visits for this word. It's three hundred and thirty-six.",
    commands: [row.off()],
    stages: [
      { at: 200, commands: [counter.to(336), counter.relabel('8 × 42 — for one word')] },
    ],
    lateOverlays: {
      at: 800,
      overlays: [H('not eight. this.', { x: '26%', y: '84%' }, { size: 'lg', rotate: -2, tone: 'cost', width: '24%' })],
    },
  },
  {
    n: 11,
    id: 'could-you-fetch',
    title: 'Could you fetch those fast enough?',
    relation: 'wall',
    secs: 6,
    vo: 'Three hundred and thirty-six — for one word. Could you fetch those out of storage, fast enough, every single word?',
    commands: [narrator.pose('think')],
    overlays: [
      {
        kind: 'note',
        text: 'Could you fetch 336 different sets,\nper word, fast enough?',
        at: { x: '52%', y: '86%' },
        size: 'lg',
        rotate: -1,
        backed: true,
        width: '58%',
      },
    ],
  },
]

export const RUNTIME_SECONDS = BEATS.reduce((total, beat) => total + beat.secs, 0)
