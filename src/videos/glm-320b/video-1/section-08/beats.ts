import { centred, GROUND_Y, note, TOKENS, type Beat } from '../../../../paper'
import { TOTAL, count, ground, line, narrator, tower, type Patch } from './scene'

/**
 * Section 08 — That was one token. Here is the whole prompt.
 *
 * We followed one token to make the mechanism visible. Now we zoom back out
 * and pay that simplification off explicitly: prompt tokens are processed
 * together during prefill, layer by layer, with causal attention connecting
 * positions.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'i-owe-you-a-correction',
    title: 'The single marker holds partway up',
    relation: 'want',
    secs: 10,
    vo: 'So far we followed one token because it made the mechanism easier to see. But your prompt has eight tokens.',
    commands: [
      ground.at(GROUND_Y),
      tower.show({ x: 50, y: 48 }, 1, { markers: 1, floor: 22 }),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'confide', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'the-whole-prompt-goes-in',
    title: 'Eight more markers appear at the base beside it',
    relation: 'so',
    secs: 8,
    vo: 'During the initial prompt pass, all eight enter the stack together.',
    commands: [tower.everyone(), line.show({ x: 50, y: 93 }, 0.36)],
    lateOverlays: {
      at: 2400,
      overlays: [note(`${TOKENS} tokens`, 20, 88, { tone: 'measure', rotate: -3, sticky: true })],
    },
  },
  {
    n: 3,
    id: 'all-at-the-same-time',
    title: 'All eight climb together, side by side, floor by floor',
    relation: 'so',
    secs: 8,
    vo: 'They move through each layer in parallel.',
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
    secs: 14,
    vo: 'Attention is the connection between those positions. Each token can use the earlier positions it is allowed to see while they move through the same layer.',
    commands: [tower.wire()],
    lateOverlays: {
      at: 3400,
      overlays: [note('attention connects\npositions', 18, 46, { tone: 'relate', rotate: -3 })],
    },
  },
  {
    n: 5,
    id: 'on-every-floor',
    title: 'The lines redraw on each new floor as they climb',
    relation: 'so',
    secs: 9,
    vo: 'So the prompt is processed as a connected sequence, not eight isolated tokens.',
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
    secs: 14,
    vo: 'This repeated stack — context mixing, then feed-forward work, layer after layer — is the transformer stack.',
    commands: [tower.name('transformer stack'), narrator.set({ pose: 'point' })],
  },
  {
    n: 7,
    id: 'not-a-mysterious-thing',
    title: 'The plate settles; the climb continues behind it',
    relation: 'so',
    secs: 9,
    vo: 'The important part is not the name. It is the repetition: the same kind of representation moves upward and keeps getting updated.',
    commands: [tower.climbTo(38)],
  },
  {
    n: 8,
    id: 'its-own-three-thirty-six',
    title: 'A small counter appears above every marker',
    relation: 'so',
    secs: 10,
    vo: 'And each of our eight prompt tokens goes through its own routed work: three hundred and thirty-six expert visits per token.',
    commands: [tower.each('336'), tower.name('')],
  },
  {
    n: 9,
    id: 'how-many-is-that',
    title: 'The counters hold; a blank total waits beneath them; nothing moves',
    relation: 'and-yet',
    secs: 8,
    vo: 'Eight tokens, times three hundred and thirty-six. What is the total?',
    commands: [count.ask('expert visits — one prompt pass'), narrator.set({ pose: 'wonder' })],
    lateOverlays: {
      at: 2600,
      overlays: [note('8 × 336 = ?', 74, 30, { size: 'lg', tone: 'measure', rotate: -2, sticky: true })],
    },
  },
  {
    n: 10,
    id: 'two-thousand-six-eighty-eight',
    title: 'All eight counters run at once and the total assembles beneath them',
    relation: 'so',
    secs: 7,
    vo: 'Two thousand, six hundred and eighty-eight routed expert visits.',
    commands: [count.run(TOTAL, 'expert visits — one prompt pass'), narrator.set({ pose: 'count' })],
    clearSticky: true,
  },
  {
    n: 11,
    id: 'for-one-pass',
    title: 'The total lands and holds',
    relation: 'so',
    secs: 6,
    vo: 'That is once, to process this eight-token prompt.',
    commands: [count.hold()],
  },
  {
    n: 12,
    id: 'decided-on-the-spot',
    title: 'The total lands and holds',
    relation: 'and-yet',
    secs: 11,
    vo: 'And each routing decision is made from that layer’s current representation, not from a complete expert path planned at the start.',
    commands: [count.hold(), narrator.set({ pose: 'think' })],
    lateOverlays: {
      at: 2800,
      overlays: [note('route from the\ncurrent row', 18, 66, { size: 'md', tone: 'cost', rotate: -1 })],
    },
  },
  {
    n: 13,
    id: 'every-token-pays-its-own',
    title: 'The markers arrive at the top floor',
    relation: 'and-yet',
    secs: 6,
    vo: 'Eventually all eight positions reach the top.',
    commands: [tower.climbTo(45), tower.each('')],
    clearSticky: true,
  },
  {
    n: 14,
    id: 'and-what-comes-out',
    title: 'They stop dead, all eight together, and nothing happens next',
    relation: 'and-yet',
    secs: 10,
    vo: 'So what does the model do with those final rows to produce the next token?',
    commands: [narrator.set({ pose: 'wonder' })],
    lateOverlays: {
      at: 2800,
      overlays: [note('how does one next\ntoken come out?', 16, 24, { size: 'md', rotate: -2 })],
    },
  },
]
