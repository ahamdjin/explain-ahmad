import { type Beat, type Overlay } from '../../../paper'
import { a, b, narrator, rowA, rowB, type Patch } from './scene'

const H = (text: string, at: { x: string; y: string }, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at,
  size: 'sm',
  ...extra,
})

const S1 = ['the', 'dog', 'barked']
const S2 = ['a', 'hot', 'dog']

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'never-alone',
    title: 'A word never arrives alone',
    relation: 'so',
    secs: 4,
    vo: 'Because a word never arrives on its own.',
    commands: [narrator.at({ x: 8, y: 84 }, 'point', 0.5)],
    stages: [{ at: 200, commands: [a.show(['dog'], 0, { x: 50, y: 40 }, 1)] }],
  },
  {
    n: 2,
    id: 'in-a-sentence',
    title: 'It arrives in a sentence',
    relation: 'so',
    secs: 4.5,
    vo: 'It arrives in a sentence.',
    commands: [a.show(S1, 1, { x: 50, y: 40 }, 1)],
  },
  {
    n: 3,
    id: 'looks-around',
    title: 'It gets to look around',
    relation: 'so',
    secs: 4.5,
    vo: 'And before anything picks experts, the word gets to look around.',
    commands: [narrator.pose('wonder')],
    overlays: [H('before anyone picks anything', { x: '6%', y: '22%' }, { size: 'md', rotate: -2, tone: 'measure' })],
  },
  {
    n: 4,
    id: 'which-matter',
    title: 'Which of you matters to me?',
    relation: 'so',
    secs: 5,
    vo: "It looks at every word it's allowed to see, and asks which of them matter to it.",
    commands: [],
    stages: [{ at: 240, commands: [a.weigh([0.08, 0, 0.9])] }],
  },
  {
    n: 5,
    id: 'some-matter',
    title: 'Some matter a lot',
    relation: 'so',
    secs: 4.5,
    vo: 'Some matter a lot. Most barely matter at all.',
    commands: [],
    overlays: [
      H('thick line = matters more', { x: '62%', y: '20%' }, { size: 'md', rotate: -2, tone: 'relate' }),
    ],
  },
  {
    n: 6,
    id: 'pulls-them-in',
    title: 'It pulls a bit of them in',
    relation: 'therefore',
    secs: 5,
    vo: 'Then it pulls a bit of them into itself — and its row changes.',
    commands: [],
    stages: [{ at: 220, commands: [rowA.show({ x: 50, y: 66 }, 0.8, 'before')] }],
  },
  {
    n: 7,
    id: 'same-word-new-numbers',
    title: 'Same word. New numbers.',
    relation: 'wall',
    secs: 5.5,
    // Section 3's contradiction dissolves here.
    vo: 'Same word. New numbers.',
    commands: [rowA.change(73, 'after')],
    lateOverlays: {
      at: 500,
      overlays: [H('the row is not fixed after all', { x: '50%', y: '80%' }, { size: 'md', rotate: -1, tone: 'cost', width: '40%' })],
    },
  },
  {
    n: 8,
    id: 'watch-it-twice',
    title: 'Watch it happen twice',
    relation: 'so',
    secs: 4,
    vo: 'Watch it happen twice.',
    commands: [
      a.moveTo({ x: 50, y: 24 }, 0.78),
      a.show(S1, 1, { x: 50, y: 24 }, 0.78, ''),
      rowA.moveTo({ x: 50, y: 44 }, 0.7),
      rowA.change(73, '“dog” in “the dog barked”'),
    ],
    stages: [{ at: 260, commands: [b.show(S2, 2, { x: 50, y: 62 }, 0.78)] }],
  },
  {
    n: 9,
    id: 'the-example',
    title: 'The dog barked. A hot dog.',
    relation: 'so',
    secs: 5,
    vo: 'The dog barked. And a hot dog.',
    commands: [b.weigh([0.06, 0.86, 0])],
  },
  {
    n: 10,
    id: 'two-different-rows',
    title: 'Two completely different rows',
    relation: 'wall',
    secs: 6,
    // The event. Same word both times, and the rows disagree.
    vo: 'Same word, both times. Two completely different rows.',
    commands: [],
    stages: [{ at: 260, commands: [rowB.show({ x: 50, y: 82 }, 0.7, '“dog” in “a hot dog”')] }],
    lateOverlays: {
      at: 800,
      overlays: [H('same word.\ndifferent numbers.', { x: '84%', y: '58%' }, { size: 'md', rotate: -3, tone: 'cost' })],
    },
  },
  {
    n: 11,
    id: 'would-it-pick-differently',
    title: 'Would it pick differently?',
    relation: 'wall',
    secs: 5.5,
    vo: 'So — would the router pick a different eight for those?',
    commands: [narrator.pose('think')],
    overlays: [
      {
        kind: 'note',
        text: 'With different numbers, would the router pick a different eight?',
        at: { x: '50%', y: '94%' },
        size: 'lg',
        rotate: -1,
        backed: true,
        width: '66%',
      },
    ],
  },
]

export const RUNTIME_SECONDS = BEATS.reduce((total, beat) => total + beat.secs, 0)
