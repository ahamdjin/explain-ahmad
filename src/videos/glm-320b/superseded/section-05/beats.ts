import { type Beat, type Overlay } from '../../../../paper'
import { CHOSEN } from '../section-01/scene'
import { choice, desk, narrator, row, shared, wall, type Patch } from './scene'

const H = (text: string, at: { x: string; y: string }, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at,
  size: 'sm',
  ...extra,
})

const WALL = { x: 57, y: 38 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'yes-and-how',
    title: 'Yes. And here is how.',
    relation: 'so',
    secs: 4,
    vo: "Yes. And here's exactly how.",
    commands: [
      wall.show(WALL, 0.78),
      desk.show({ x: 14, y: 62 }, 0.62),
      row.show({ x: 15, y: 24 }, 0.5, 'the current row'),
      narrator.at({ x: 7, y: 86 }, 'point', 0.44),
    ],
  },
  {
    n: 2,
    id: 'row-and-288',
    title: 'A row, and 288 to choose from',
    relation: 'so',
    secs: 4.5,
    vo: 'The router has the row, and it has 288 experts to choose from.',
    commands: [],
    overlays: [
      { kind: 'brace', text: '288 experts', at: { x: '33%', y: '67%' }, width: '48%' },
    ],
  },
  {
    n: 3,
    id: 'scores-every-one',
    title: 'It scores every one',
    relation: 'so',
    secs: 5,
    vo: 'It gives every single one of them a score. All 288.',
    commands: [wall.score(), narrator.pose('wonder')],
  },
  {
    n: 4,
    id: 'how-well-do-you-fit',
    title: 'How well do you fit these numbers?',
    relation: 'so',
    secs: 4.5,
    vo: 'How well does this expert fit these numbers.',
    commands: [],
    overlays: [
      H('how well do you fit\nthese numbers?', { x: '5%', y: '40%' }, { size: 'md', rotate: -2, tone: 'measure' }),
    ],
  },
  {
    n: 5,
    id: 'keeps-the-best-eight',
    title: 'It keeps the best eight',
    relation: 'therefore',
    secs: 5,
    vo: "Then it keeps the best eight. That's it. That's the whole decision.",
    commands: [wall.keep(CHOSEN)],
  },
  {
    n: 6,
    id: 'eight-of-288',
    title: 'Eight, out of 288',
    relation: 'so',
    secs: 4,
    vo: "Eight, out of 288.",
    commands: [],
    overlays: [
      { kind: 'brace', text: '280 not chosen', at: { x: '33%', y: '67%' }, width: '48%' },
    ],
  },
  {
    n: 7,
    id: 'one-always-works',
    title: 'One always works',
    relation: 'and-yet',
    secs: 4.5,
    vo: 'Oh — and one more always works, every time, whatever the word.',
    commands: [shared.show({ x: 14, y: 40 }, 1)],
  },
  {
    n: 8,
    id: 'eight-plus-one',
    title: 'Eight chosen, plus one always on',
    relation: 'so',
    secs: 4,
    vo: 'So: eight chosen, plus one always on.',
    commands: [narrator.pose('nod')],
  },
  {
    n: 9,
    id: 'now-you-try',
    title: 'Now you try it',
    relation: 'hope',
    secs: 7,
    // The one interaction. The question is asked *before* the click, so the
    // viewer has to predict -- clicking is not thinking.
    vo: 'Now you try it. Two sentences. Same word in both. Which team changes more — and how much?',
    commands: [choice.show({ x: 50, y: 90 }), narrator.pose('hopeful')],
    lateOverlays: {
      at: 300,
      overlays: [
        H('guess first, then pick', { x: '50%', y: '80%' }, { size: 'md', rotate: -1, tone: 'measure', width: '30%' }),
      ],
    },
  },
  {
    n: 10,
    id: 'different-team',
    title: 'Different numbers, different team',
    relation: 'so',
    secs: 5.5,
    vo: 'Different numbers, different scores, different team.',
    commands: [row.change(41, 'this sentence’s row')],
    overlays: [H('nothing about the model changed', { x: '5%', y: '76%' }, { size: 'md', rotate: -2, tone: 'cost' })],
  },
  {
    n: 11,
    id: 'once-per-word-right',
    title: 'So once per word. Right?',
    relation: 'so',
    secs: 5.5,
    // Written to be WRONG. The viewer should agree, so section 6 can take it
    // away in one syllable.
    vo: 'So this happens once per word. Right?',
    commands: [narrator.pose('nod')],
    overlays: [
      {
        kind: 'note',
        text: 'So this happens once per word — right?',
        at: { x: '50%', y: '78%' },
        size: 'lg',
        rotate: -1,
        backed: true,
        width: '52%',
      },
    ],
  },
]

export const RUNTIME_SECONDS = BEATS.reduce((total, beat) => total + beat.secs, 0)
