import { GROUND_Y, note, TOKENS, type Beat } from '../../../../paper'
import { LAST, camera, ground, last, narrator, out, rows, tower, vocab, type Patch } from './scene'

/**
 * Section 09 — Where the next token comes from.
 *
 * Nothing new is hidden here. The viewer already owns the final rows; this
 * section shows how the last position becomes one score per vocabulary token
 * and then one next token.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'a-row-for-every-token',
    title: 'We rise to the top and arrive alongside the waiting markers',
    relation: 'want',
    secs: 11,
    vo: 'At the top, we have one final row for each of the eight prompt tokens.',
    commands: [
      ground.at(GROUND_Y),
      tower.show({ x: 50, y: 48 }, 1, { floor: 45, markers: TOKENS }),
      camera.to({ x: 50, y: 22 }, 1.5),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'eight-finished-rows',
    title: 'Each marker unfolds into its finished row, eight in a line',
    relation: 'so',
    secs: 6,
    vo: 'Eight finished representations.',
    commands: [tower.off(), camera.home(), rows.show({ x: 46, y: 48 }, 0.52)],
  },
  {
    n: 3,
    id: 'only-one-matters',
    title: 'The first seven dim; only the last stays lit',
    relation: 'and-yet',
    secs: 8,
    vo: 'For generating the next token, the important one is the last position.',
    commands: [rows.only(LAST)],
  },
  {
    n: 4,
    id: 'next-attaches-to-the-end',
    title: 'The last row lifts clear of the others',
    relation: 'so',
    secs: 11,
    vo: 'Because that is the position we are extending: “The dog dropped the ball, and it…” What comes next attaches here.',
    commands: [last.show({ x: 26, y: 30 }, 0.38), rows.moveTo({ x: 42, y: 62 }, 0.44)],
    overlays: [note('extend this position', 74, 26, { tone: 'word', rotate: 3 })],
  },
  {
    n: 5,
    id: 'the-list-returns',
    title: '§2’s list rises again beside it',
    relation: 'so',
    secs: 12,
    vo: 'That final row is turned into a score for every token in the vocabulary — all one hundred and fifty-four thousand, eight hundred and eighty.',
    commands: [vocab.show({ x: 72, y: 48 }, 1.15)],
    lateOverlays: {
      at: 2600,
      overlays: [note('the same vocabulary\n154,880 entries', 28, 18, { size: 'md', tone: 'measure', rotate: 2, sticky: true })],
    },
  },
  {
    n: 6,
    id: 'every-one-gets-a-score',
    title: 'A value spreads down the entire list, every entry getting one',
    relation: 'so',
    secs: 9,
    vo: 'Each vocabulary token gets a score for how plausible it is as the next token.',
    commands: [vocab.score()],
  },
  {
    n: 7,
    id: 'most-are-hopeless',
    title: 'The list reorders; a handful rise to the top',
    relation: 'so',
    secs: 7,
    vo: 'Most end up very unlikely. A few become plausible candidates.',
    commands: [vocab.rank()],
    clearSticky: true,
  },
  {
    n: 8,
    id: 'one-gets-picked',
    title: 'One entry is lifted out of the list',
    relation: 'therefore',
    secs: 5,
    vo: 'Then the decoding rule picks one.',
    commands: [vocab.pick()],
  },
  {
    n: 9,
    id: 'thats-your-next-word',
    title: 'It becomes a word card and drops clear of the tower',
    relation: 'so',
    secs: 6,
    vo: 'That chosen token is the next output.',
    commands: [out.show({ x: 30, y: 80 }, 0.8), narrator.set({ pose: 'nod' })],
  },
  {
    n: 10,
    id: 'all-of-that',
    title: 'We fall away until the whole tower and one small card share the frame',
    relation: 'and-yet',
    secs: 5,
    vo: 'All that machinery…',
    commands: [
      rows.off(),
      last.off(),
      vocab.off(),
      tower.show({ x: 30, y: 50 }, 1.02, { floor: 0, markers: 0 }),
      out.moveTo({ x: 74, y: 52 }, 0.32),
      narrator.off(),
    ],
    stages: [{ at: 2000, commands: [camera.to({ x: 50, y: 50 }, 0.94)] }],
  },
  {
    n: 11,
    id: 'forty-five-floors',
    title: 'The tower fills the frame; the card stays the size it was',
    relation: 'and-yet',
    secs: 10,
    vo: 'Forty-five layers, routing, experts, and every token in the prompt moving through the stack…',
    commands: [narrator.show({ x: 91, y: 70 }, 1, { pose: 'think', flip: true })],
  },
  {
    n: 12,
    id: 'one-word',
    title: 'Nothing moves; the card sits there, alone against it',
    relation: 'and-yet',
    secs: 7,
    vo: '…to choose one next token.',
    commands: [],
    lateOverlays: {
      at: 2200,
      overlays: [note('one next token.', 74, 66, { size: 'md', tone: 'cost', rotate: -3 })],
    },
  },
]
