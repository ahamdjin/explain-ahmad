import { centred, GROUND_Y, note, TOKENS, type Beat } from '../../../../paper'
import {TOTAL, count, ground, line, narrator, tower, type Patch} from './scene'

/**
 * Section 08 — That was one token. Here's the sentence.
 *
 * Board: `video-script/video-1/08-that-was-one-token.md`. `npm run check:board`.
 *
 * Beat 1 is where the "following one word" simplification gets **paid for out
 * loud** instead of hidden in a footnote. That is cheaper than an aside and it
 * buys trust.
 *
 * Beat 3 should feel crowded. The crowding is the point of the section.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'i-owe-you-a-correction',
    title: 'The single marker holds partway up',
    relation: 'want',
    secs: 12,
    vo: 'Three hundred and thirty-six, for one token. Now — I’ve been following one token this whole time, and I owe you a correction.',
    commands: [
      ground.at(GROUND_Y),
      tower.show({ x: 50, y: 48 }, 1, { markers: 1, floor: 22 }),
      /* Leaning in to admit something, which is what beat 1 is. */
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'confide', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'the-whole-prompt-goes-in',
    title: 'Eight more markers appear at the base beside it',
    relation: 'so',
    secs: 7,
    vo: 'It doesn’t go in on its own. Your entire prompt goes in together.',
    /* At the base. Not mid-climb -- see the note on `tower.everyone`. */
    commands: [tower.everyone(), line.show({ x: 50, y: 93 }, 0.36)],
    lateOverlays: {
      at: 2600,
      overlays: [note(`${TOKENS} tokens`, 20, 88, { tone: 'measure', rotate: -3, sticky: true })],
    },
  },
  {
    n: 3,
    id: 'all-at-the-same-time',
    title: 'All eight climb together, side by side, floor by floor',
    relation: 'so',
    secs: 8,
    vo: 'Every token climbs at the same time. All of them, all forty-five floors, together.',
    commands: [],
    stages: [
      { at: 500, commands: [tower.climbTo(7)] },
      { at: 2200, commands: [tower.climbTo(15)] },
      { at: 3800, commands: [tower.climbTo(22)] },
    ],
  },
  {
    n: 4,
    id: 'attention-is-the-wiring',
    title: 'Lines appear between the markers on the floor they share',
    relation: 'so',
    secs: 15,
    vo: 'And attention is the wiring between them. Every token, on every floor, pulling from the words behind it — the same backwards look, now happening to all of them at once.',
    /* §4 reframed at no cost: attention is the wiring *between* tokens, which
     * the viewer can only see now that there is more than one. */
    commands: [tower.wire()],
    lateOverlays: {
      at: 3600,
      overlays: [note('attention — between them', 18, 46, { tone: 'relate', rotate: -3 })],
    },
  },
  {
    n: 5,
    id: 'on-every-floor',
    title: 'The lines redraw on each new floor as they climb',
    relation: 'so',
    secs: 9,
    vo: 'That’s what makes it read your sentence as a sentence, instead of a list of separate words.',
    commands: [],
    stages: [
      { at: 900, commands: [tower.climbTo(28)] },
      { at: 2600, commands: [tower.climbTo(34)] },
    ],
  },
  {
    n: 6,
    id: 'this-is-a-transformer',
    title: 'A plate slides onto the front of the tower',
    relation: 'therefore',
    secs: 16,
    vo: 'And this whole arrangement — a stack of floors, attention wiring them together, a feed-forward block doing the work on each one — this is the transformer stack. That’s the word. It’s this shape.',
    commands: [tower.name('transformer stack'), narrator.set({ pose: 'point' })],
  },
  {
    n: 7,
    id: 'not-a-mysterious-thing',
    title: 'The plate settles; the climb continues behind it',
    relation: 'so',
    secs: 6,
    vo: 'That’s it. It isn’t a mysterious thing. It’s this shape.',
    commands: [tower.climbTo(38)],
  },
  {
    n: 8,
    id: 'its-own-three-thirty-six',
    title: 'A small counter appears above every marker',
    relation: 'so',
    secs: 8,
    vo: 'Which means each token in your prompt is doing its own three hundred and thirty-six.',
    commands: [tower.each('336'), tower.name('')],
  },
  {
    n: 9,
    id: 'how-many-is-that',
    title: 'The counters hold; a blank total waits beneath them; nothing moves',
    relation: 'and-yet',
    secs: 9,
    /*
     * S-06, and the arithmetic is the point: 8 x 336 is small enough that a
     * viewer will actually attempt it, which is what makes them own the
     * answer. The total must be *visibly missing* -- `count.ask()` draws the
     * working with a gap where the figure goes. v9 handed the number over
     * instead and cited S-06 on it, which is not a question.
     */
    vo: 'Eight tokens. Three hundred and thirty-six each. How many is that?',
    commands: [count.ask('expert visits — one pass'), narrator.set({ pose: 'wonder' })],
    lateOverlays: {
      at: 3000,
      overlays: [note('8 × 336 = ?', 74, 30, { size: 'lg', tone: 'measure', rotate: -2, sticky: true })],
    },
  },
  {
    n: 10,
    id: 'two-thousand-six-eighty-eight',
    title: 'All eight counters run at once and the total assembles beneath them',
    relation: 'so',
    secs: 7,
    /* All eight at once, not in sequence -- the tokens are processed in
     * parallel and a staggered count would teach the opposite. */
    vo: 'Two thousand, six hundred and eighty-eight.',
    commands: [count.run(TOTAL, 'expert visits — one pass'), narrator.set({ pose: 'count' })],
    clearSticky: true,
  },
  {
    n: 11,
    id: 'for-one-pass',
    title: 'The total lands and holds',
    relation: 'so',
    secs: 6,
    /* The units, alone. The number is big and meaningless without them, and
     * "one pass, eight words" is what §10 will multiply. */
    vo: 'Expert visits. For one pass, over eight words.',
    commands: [count.hold()],
  },
  {
    n: 12,
    id: 'decided-on-the-spot',
    title: 'The total lands and holds',
    relation: 'and-yet',
    secs: 9,
    vo: 'And every one of them decided on the spot, from numbers that didn’t exist until a moment before.',
    commands: [count.hold(), narrator.set({ pose: 'think' })],
    /* Deposit four, and it multiplies. */
    lateOverlays: {
      at: 2600,
      overlays: [note('every one of them decided\non the spot', 18, 66, { size: 'md', tone: 'cost', rotate: -1 })],
    },
  },
  {
    n: 13,
    id: 'every-token-pays-its-own',
    title: 'The markers arrive at the top floor',
    relation: 'and-yet',
    secs: 7,
    /* Banks the section in one clause, so beat 14 can be a question with
     * nothing else in it. */
    vo: 'So every token pays its own three hundred and thirty-six.',
    commands: [tower.climbTo(45), tower.each('')],
    clearSticky: true,
  },
  {
    n: 14,
    id: 'and-what-comes-out',
    title: 'They stop dead, all eight together, and nothing happens next',
    relation: 'and-yet',
    secs: 9,
    /*
     * The dead stop is the setup for §9: everything halts, and then the
     * question. It needs its own beat -- asked over a still-climbing tower it
     * is a transition, and §9 opens on the stillness this leaves behind.
     */
    vo: 'All of that happens. And what comes out?',
    commands: [narrator.set({ pose: 'wonder' })],
    lateOverlays: {
      at: 3000,
      overlays: [centred('and what comes out?', 50, 12, { size: 'md', rotate: -2 })],
    },
  },
]
