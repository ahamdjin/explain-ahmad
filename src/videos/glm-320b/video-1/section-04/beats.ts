import { centred, FOLLOWED, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  barked,
  camera,
  ghost,
  ground,
  hot,
  line,
  narrator,
  row,
  rowA,
  rowB,
  type Patch,
} from './scene'

/**
 * Section 04 — The word looks around.
 *
 * Board: `video-script/video-1/04-the-word-looks-around.md`. `npm run check:board`.
 *
 * **One camera move**, at beat 2, and it does real work: it reveals that our
 * row was never alone. The whole section is that reveal, so nothing else moves.
 *
 * Beat 6 is causal masking without the words, and the forward lines **leave**.
 * They are not crossed out — a hazard mark reads as prohibition, and this is
 * not a prohibition. It is simply what is not there yet.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'starts-out-identical',
    title: 'The three identical rows collapse into one',
    relation: 'want',
    secs: 8,
    vo: 'So every "dog" starts out identical. Which can’t be right — and it isn’t, for long.',
    commands: [
      ground.at(GROUND_Y),
      row.show({ x: 50, y: 44 }, 0.7),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'think', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'never-on-its-own',
    title: 'We back off; every token’s row is there, in a line',
    relation: 'so',
    secs: 6,
    vo: 'Because a token never stays on its own. It’s sitting in a sentence.',
    commands: [
      row.off(),
      /* Pull back. The reveal is that the row was one of nine all along, so the
       * camera loses ground rather than the line sliding in from off frame. */
      camera.to({ x: 50, y: 50 }, 0.86),
      /* Tokens are already tokens by now, so the line is always split. */
      line.show({ x: 50, y: 48 }, 1),
      narrator.set({ pose: 'point' }),
    ],
  },
  {
    n: 3,
    id: 'every-token-looks',
    title: 'Our row lifts slightly out of the line',
    relation: 'so',
    secs: 6,
    vo: 'And before anything else happens, every token gets to look at the others.',
    commands: [line.raise(FOLLOWED)],
  },
  {
    n: 4,
    id: 'how-much-do-you-matter',
    title: 'Lines shoot from our row to every other row',
    relation: 'so',
    secs: 9,
    vo: 'Here’s what looking means. Our token asks every other token one question: how much do you matter to me?',
    commands: [line.ask()],
    lateOverlays: {
      at: 3400,
      overlays: [centred('how much do you\nmatter to me?', 50, 12, { size: 'md', tone: 'relate', rotate: -2 })],
    },
  },
  {
    n: 5,
    id: 'some-matter-a-lot',
    title: 'The lines thicken and thin',
    relation: 'so',
    secs: 6,
    vo: 'Some matter a lot. Most barely matter at all.',
    /* Thickness only. No numbers on the lines — nothing has been measured for
     * this sentence, and a figure would claim a precision we do not have. */
    commands: [line.weigh()],
    overlays: [note('thicker = matters more', 78, 20, { tone: 'relate', rotate: 3, sticky: true })],
  },
  {
    n: 6,
    id: 'only-backwards',
    title: 'The lines running forward fade out and go',
    relation: 'wall',
    secs: 7,
    vo: 'And it can only look backwards — at the words already there. Not at what’s coming.',
    commands: [line.mask()],
    clearSticky: true,
    overlays: [note('backwards only', 20, 20, { tone: 'relate', rotate: -3 })],
  },
  {
    n: 7,
    id: 'mixes-it-in',
    title: 'Material travels along the surviving lines into our row',
    relation: 'so',
    secs: 8,
    vo: 'Then it takes a bit of each one, in proportion, and mixes it into itself.',
    commands: [line.pull()],
  },
  {
    n: 8,
    id: 'and-its-row-changes',
    title: 'Our row’s values visibly change where the flow landed',
    relation: 'and-yet',
    secs: 6,
    vo: 'And its row changes. Same token. New numbers.',
    commands: [line.change(FOLLOWED)],
    overlays: [note('same token.\nnew numbers.', 20, 76, { tone: 'measure', rotate: -2 })],
  },
  {
    n: 9,
    id: 'thats-attention',
    title: 'The lines withdraw; a label lands',
    relation: 'so',
    secs: 8,
    vo: 'That’s attention. That’s the whole idea — every token adjusting itself based on the company it’s in.',
    commands: [line.withdraw(), line.raise(-1), narrator.set({ pose: 'nod' })],
    lateOverlays: {
      at: 2600,
      overlays: [centred('attention', 50, 14, { size: 'lg', tone: 'relate', rotate: -2 })],
    },
  },
  {
    n: 10,
    id: 'two-sentences',
    title: 'The sentence slides left; a second assembles beside it',
    relation: 'so',
    secs: 8,
    vo: 'Now watch why that matters. "The dog barked." And "a hot dog."',
    commands: [
      line.off(),
      barked.show({ x: 27, y: 34 }, 0.62),
      hot.show({ x: 73, y: 34 }, 0.62),
      narrator.set({ pose: 'point' }),
    ],
  },
  {
    n: 11,
    id: 'nothing-like-each-other',
    title: 'Both `dog` rows lift out and align — clearly different',
    relation: 'wall',
    secs: 9,
    vo: 'Same word both times. Started as the exact same row. Ended up nothing like each other.',
    commands: [rowA.show({ x: 27, y: 58 }, 0.42), rowB.show({ x: 73, y: 58 }, 0.42)],
  },
  {
    n: 12,
    id: 'the-word-in-this-sentence',
    title: 'The row they started from ghosts in behind both, identical',
    relation: 'therefore',
    secs: 9,
    vo: 'So the numbers don’t belong to the word any more. They belong to the word in this sentence.',
    /* The carrying frame. Two different ends, one identical start, one image. */
    commands: [ghost.show({ x: 50, y: 78 }, 0.42), narrator.set({ pose: 'aha' })],
    overlays: [centred('both started here', 50, 90, { rotate: -2 })],
  },
  {
    n: 13,
    id: 'could-not-have-known',
    title: 'The ghost fades; the two rows hold apart',
    relation: 'and-yet',
    secs: 10,
    vo: 'And notice — none of that could have been worked out ahead of time. It depends entirely on what you typed.',
    commands: [ghost.off(), narrator.set({ pose: 'think' })],
    /* Deposit one. Six of these, then §11 spends them. */
    lateOverlays: {
      at: 2600,
      overlays: [centred('nothing here could have been\nworked out in advance', 50, 84, { size: 'md', tone: 'cost', rotate: 1 })],
    },
  },
]
