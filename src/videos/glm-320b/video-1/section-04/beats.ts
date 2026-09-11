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
    secs: 10,
    vo: 'So the row is fixed — every "dog" starts out identical. Which can’t be right, and it isn’t, for long.',
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
    secs: 9,
    vo: 'Because a token never sits on its own. It’s in a sentence — and so is everything else.',
    commands: [
      row.off(),
      /* Pull back. The reveal is that the row was one of eight all along, so the
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
    secs: 7,
    vo: 'And before anything else happens, every one of them gets to look at the others.',
    commands: [line.raise(FOLLOWED)],
  },
  {
    n: 4,
    id: 'how-much-do-you-matter',
    title: 'Lines shoot from our row to every other row',
    relation: 'so',
    secs: 10,
    vo: 'Here’s what looking means. Our word asks every other word one question. How much do you matter to me?',
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
    secs: 11,
    vo: 'And it can only look backwards — at the words already there. Never at what’s coming, because what’s coming hasn’t been decided yet.',
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
    id: 'all-of-them-at-once',
    title: 'Every other row does the same thing at once, then settles',
    relation: 'so',
    secs: 10,
    /*
     * The correction to the whole section's simplification. We have followed
     * one word through attention, and a viewer could easily come away
     * thinking the others sat still and were read from. They did the same
     * thing to themselves, simultaneously. `line.changeAll()` drops the
     * wiring first, or this reads as our word acting *on* them.
     */
    vo: 'And every word in the sentence is doing that, at the same time, to itself.',
    commands: [line.changeAll(), line.raise(-1), narrator.set({ pose: 'count' })],
    lateOverlays: {
      at: 3200,
      overlays: [note('all of them.\nat once.', 20, 20, { size: 'md', tone: 'relate', rotate: -3 })],
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
    id: 'how-different',
    title: 'Both `dog` rows lift out and align, still covered; nothing moves',
    relation: 'and-yet',
    secs: 14,
    /*
     * S-06, and the covers are the whole mechanism. The rows are on screen and
     * unreadable while the question is asked: present enough to guess about,
     * hidden enough that the guess is real. v9 showed the answer and the
     * question in the same beat, which is not a question.
     */
    vo: 'Same word both times. Both of them started from the exact same row — the one we pulled out of the table. How different do you reckon they end up?',
    commands: [
      rowA.show({ x: 27, y: 58 }, 0.42, { covered: true }),
      rowB.show({ x: 73, y: 58 }, 0.42, { covered: true }),
      narrator.set({ pose: 'wonder' }),
    ],
    lateOverlays: {
      at: 4000,
      overlays: [centred('how different?', 50, 88, { size: 'lg', rotate: -2, sticky: true })],
    },
  },
  {
    n: 12,
    id: 'nothing-like-each-other',
    title: 'The covers come off; the two rows are obviously unalike',
    relation: 'wall',
    secs: 6,
    /* Both at once. Uncovering one first answers half the question. */
    vo: 'Nothing like each other.',
    commands: [rowA.uncover(), rowB.uncover(), narrator.set({ pose: 'push' })],
    clearSticky: true,
  },
  {
    n: 13,
    id: 'same-row-both-times',
    title: 'The row they started from ghosts in behind both, identical',
    relation: 'so',
    secs: 8,
    /* The carrying frame. Two different ends, one identical start, one image. */
    vo: 'That’s what they both began as. Same row, both times.',
    commands: [ghost.show({ x: 50, y: 78 }, 0.42), narrator.set({ pose: 'aha' })],
    overlays: [centred('both started here', 50, 90, { rotate: -2 })],
  },
  {
    n: 14,
    id: 'the-word-in-this-sentence',
    title: 'The ghost fades; the two rows hold apart',
    relation: 'therefore',
    secs: 11,
    vo: 'So the numbers don’t belong to the word any more. They belong to the word in this sentence.',
    commands: [ghost.off(), narrator.set({ pose: 'nod' })],
  },
  {
    n: 15,
    id: 'thats-attention',
    title: 'A handwritten label lands between the two rows',
    relation: 'so',
    secs: 12,
    /* S-12. The name arrives after the mechanism, never before it. */
    vo: 'That has a name. It’s called attention. And that’s all attention is — every word adjusting itself based on the company it’s in.',
    commands: [narrator.set({ pose: 'nod' })],
    lateOverlays: {
      at: 3400,
      overlays: [centred('attention', 50, 44, { size: 'lg', tone: 'relate', rotate: -2, sticky: true })],
    },
  },
  {
    n: 16,
    id: 'could-not-have-known',
    title: 'The two rows hold apart; everything else recedes',
    relation: 'and-yet',
    secs: 13,
    vo: 'And that’s attention, done. The row has changed — and it changed because of this sentence. None of it could have been worked out ahead of time.',
    commands: [narrator.set({ pose: 'think' })],
    clearSticky: true,
    /* Deposit one. Six of these, then §11 spends them. */
    lateOverlays: {
      at: 2600,
      overlays: [centred('nothing here could have been\nworked out in advance', 50, 84, { size: 'md', tone: 'cost', rotate: 1 })],
    },
  },
]
