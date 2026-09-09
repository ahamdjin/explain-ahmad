import { type Beat, type Overlay } from '../../../paper'
import { aside, desk, narrator, row, rowB, word, type Patch } from './scene'

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
    id: 'that-sheet',
    title: 'That sheet is the word',
    relation: 'so',
    secs: 4.5,
    // Lands section 2's answer before adding anything.
    vo: 'That sheet is what the word actually looks like in here.',
    commands: [
      desk.show({ x: 13, y: 76 }, 0.5),
      word.arrive({ x: 18, y: 34 }, 0.55, 'dog'),
      row.show({ x: 56, y: 46 }, 1, 9),
      narrator.at({ x: 8, y: 84 }, 'point', 0.5),
    ],
  },
  {
    n: 2,
    id: 'not-letters',
    title: 'Not letters. Numbers.',
    relation: 'so',
    secs: 3.5,
    vo: 'Not letters. Numbers.',
    commands: [],
    overlays: [
      { kind: 'arrow', from: { x: 400, y: 400 }, to: { x: 640, y: 452 }, bow: -40, tone: 'orange' },
      H('not letters — numbers', { x: '20%', y: '54%' }, { size: 'md', rotate: -2, tone: 'orange' }),
    ],
  },
  {
    n: 3,
    id: 'comes-apart',
    title: 'The word comes apart',
    relation: 'therefore',
    secs: 5,
    vo: 'This word becomes a row of them.',
    commands: [word.off(), aside.show({ x: 15, y: 22 })],
    stages: [{ at: 240, commands: [row.moveTo({ x: 50, y: 44 }, 1.05)] }],
  },
  {
    n: 4,
    id: 'how-many',
    title: 'How many?',
    relation: 'and-yet',
    secs: 3.5,
    vo: 'How many?',
    commands: [narrator.pose('wonder')],
    lateOverlays: {
      at: 200,
      overlays: [{ kind: 'note', text: '?', at: { x: '50%', y: '64%' }, size: 'xl', tone: 'red', rotate: 0 }],
    },
  },
  {
    n: 5,
    id: 'four-thousand',
    title: 'Four thousand and ninety-six',
    relation: 'wall',
    secs: 6,
    // The row runs off the frame. The number is meant to be felt, not read.
    vo: 'Four thousand and ninety-six.',
    commands: [],
    stages: [{ at: 220, commands: [row.extend(16), row.moveTo({ x: 62, y: 44 }, 1)] }],
    lateOverlays: {
      at: 900,
      overlays: [
        { kind: 'note', text: '4,096 numbers', at: { x: '38%', y: '66%' }, size: 'xl', tone: 'blue', rotate: -1, width: '40%' },
        H('for one small word', { x: '38%', y: '78%' }, { size: 'md', rotate: -1, width: '30%' }),
      ],
    },
  },
  {
    n: 6,
    id: 'no-dog-number',
    title: 'None of them means anything alone',
    relation: 'so',
    secs: 6,
    // Not optional. Without it the viewer builds "one number per meaning",
    // which is wrong and would have to be walked back later.
    vo: "And none of them means anything on its own. There's no dog number in there. It's the whole row, together, that stands for the word.",
    commands: [row.extend(9), row.moveTo({ x: 52, y: 42 }, 1)],
    overlays: [
      H('no single number means “dog”\nthe whole row does', { x: '52%', y: '62%' }, { size: 'md', rotate: -1, width: '40%' }),
    ],
  },
  {
    n: 7,
    id: 'fine-then',
    title: 'So it reads the row and picks',
    relation: 'so',
    secs: 4,
    // Stated so it can be broken two beats later.
    vo: 'Fine. So the router reads the row, and picks its eight.',
    commands: [narrator.pose('nod')],
  },
  {
    n: 8,
    id: 'hold-on',
    title: 'Except — hold on',
    relation: 'and-yet',
    secs: 3.5,
    vo: 'Except — hold on.',
    commands: [narrator.pose('think')],
  },
  {
    n: 9,
    id: 'the-same-every-time',
    title: 'The same row, every time',
    relation: 'wall',
    secs: 6.5,
    // THE CONTRADICTION. Two identical rows, stated flatly. The paradox only
    // works if this beat does not hedge.
    vo: 'This row is the same every single time this word turns up. Same word, same numbers.',
    commands: [row.moveTo({ x: 52, y: 34 }, 0.86), row.label('“dog”, the first time')],
    stages: [{ at: 320, commands: [rowB.show({ x: 52, y: 56 }, 0.86, '“dog”, the next time')] }],
    lateOverlays: {
      at: 900,
      overlays: [H('identical', { x: '86%', y: '44%' }, { size: 'lg', rotate: -4, tone: 'red' })],
    },
  },
  {
    n: 10,
    id: 'so-how',
    title: 'So how did the team ever change?',
    relation: 'wall',
    secs: 6,
    vo: 'So how did the team ever change?',
    commands: [],
    overlays: [
      {
        kind: 'note',
        text: 'Those numbers are the same every time.\nSo how did the team ever change?',
        at: { x: '50%', y: '83%' },
        size: 'xl',
        rotate: -1,
        backed: true,
        width: '70%',
      },
    ],
  },
]

export const RUNTIME_SECONDS = BEATS.reduce((total, beat) => total + beat.secs, 0)
