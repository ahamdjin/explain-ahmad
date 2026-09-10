import {
  centred,
  note,
  TOKENS,
  type Beat,
} from '../../../paper'
import {TOTAL, count, ground, line, narrator, tower, type Patch} from './scene'

/**
 * Section 08 — That was one token. Here's the sentence.
 *
 * Board: `video-script/08-that-was-one-token.md`. `npm run check:board`.
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
    secs: 7,
    vo: 'Now. I’ve been following one token this whole time, and I owe you a correction.',
    commands: [
      ground.at(96),
      tower.show({ x: 50, y: 48 }, 1, { markers: 1, floor: 22 }),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'lean', flip: true }),
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
    title: 'All nine climb together, side by side, floor by floor',
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
    secs: 11,
    vo: 'And attention is the wiring between them. That’s what connects them — every token, on every floor, looking at all the others.',
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
    secs: 8,
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
    secs: 13,
    vo: 'And this whole arrangement — the stack of floors, attention wiring them together, experts doing the work on each one — this is what the word transformer actually means.',
    commands: [tower.name('transformer'), narrator.set({ pose: 'point' })],
  },
  {
    n: 7,
    id: 'not-a-mysterious-thing',
    title: 'The plate settles; the climb continues behind it',
    relation: 'so',
    secs: 5,
    vo: 'That’s it. It’s not a mysterious thing. It’s this shape.',
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
    id: 'nine-times-three-thirty-six',
    title: 'All nine counters run at once and a total assembles beneath',
    relation: 'so',
    secs: 8,
    /*
     * Nine, not ten. The prompt is on screen and a viewer can count it, so the
     * neater number is not available to us. 9 x 336 = 3,024.
     */
    vo: 'Nine tokens in your sentence? That’s three thousand and twenty-four expert visits.',
    commands: [count.run(TOTAL, 'expert visits — one pass')],
    overlays: [note(`${TOKENS} × 336`, 84, 40, { size: 'lg', tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 10,
    id: 'decided-on-the-spot',
    title: 'The total lands and holds',
    relation: 'and-yet',
    secs: 8,
    vo: 'And every one of them decided on the spot, from numbers that didn’t exist until a moment before.',
    commands: [count.hold(), narrator.set({ pose: 'think' })],
    /* Deposit four, and it multiplies. */
    lateOverlays: {
      at: 2600,
      overlays: [note('every one of them decided\non the spot', 18, 66, { size: 'md', tone: 'cost', rotate: -1 })],
    },
  },
  {
    n: 11,
    id: 'and-what-comes-out',
    title: 'The markers arrive at the top floor and stop dead',
    relation: 'and-yet',
    secs: 7,
    vo: 'So all of that happens. And what comes out?',
    /* The dead stop is the setup for §9. Silence, then the question. */
    commands: [tower.climbTo(45), tower.each('')],
    clearSticky: true,
    lateOverlays: {
      at: 3000,
      overlays: [centred('and what comes out?', 50, 12, { size: 'md', rotate: -2 })],
    },
  },
]
