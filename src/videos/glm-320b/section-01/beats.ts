import { type Beat, type Overlay } from '../../../paper'
import {
  CHOSEN,
  big,
  block,
  desk,
  ground,
  hospital,
  narrator,
  word,
  word2,
  word3,
  type Patch,
} from './scene'

/**
 * Section 01 — What "18 billion active" means.
 *
 * Script and board: `video-script/01-what-18-billion-active-means.md`
 * Checked by `npm run check:board` and `npm run timing -- --scripts`.
 *
 * The section happens in **one place for fourteen beats**. The only camera
 * move is the push-in at beat 15, and the stillness before it is what makes
 * that move mean anything.
 */

/**
 * A handwritten note, placed in stage percentages as plain numbers.
 *
 * The overlay type wants `'50%'` strings, which is very easy to get wrong and
 * fails as a type error rather than a visible one. This takes numbers.
 *
 * A note must carry something the voice does not. Never transcribe the line.
 */
const H = (text: string, x: number, y: number, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at: { x: `${x}%`, y: `${y}%` },
  size: 'sm',
  ...extra,
})

/* Layout anchors. Reflow the whole section from here. */
const BLOCK = { x: 52, y: 46 }
const BLOCK_S = 1
/** The block's left edge and width as stage percentages, for braces under it. */
const BLOCK_LEFT = '26%'
const BLOCK_W = '52%'

export const BEATS: Beat<Patch>[] = [
  /* ═══ ACT 1 · THE NUMBER, PLAINLY ═══════════════════════════════════════
   * No product name, no spec table. A number, and then what it is made of. */
  {
    n: 1,
    id: 'this-number',
    title: 'Start with this number',
    relation: 'want',
    secs: 3,
    vo: "Let's start with this number.",
    commands: [
      ground.at(86),
      big.show('320,000,000,000', { x: 52, y: 44 }, 0.42),
      /* The narrator lives on the right for the whole section. The words come
       * in from the left, and at 408px wide they own that side of the frame. */
      narrator.at({ x: 91, y: 68 }, 'point', 1, true),
    ],
  },
  {
    n: 2,
    id: 'three-twenty',
    title: '320,000,000,000',
    relation: 'so',
    secs: 4,
    vo: 'Three hundred and twenty billion.',
    commands: [big.scale(1), narrator.pose('wonder')],
  },
  {
    n: 3,
    id: 'what-a-parameter-is',
    title: 'It shatters into separate numbers',
    relation: 'so',
    secs: 8,
    vo: 'That’s how many parameters it has. And a parameter is just a number it learned while it was being trained.',
    commands: [big.off(), block.scatter(BLOCK, BLOCK_S)],
    /* The label arrives after the marks, so the viewer sees the thing first. */
    lateOverlays: { at: 2600, overlays: [H('every one of these\nis a parameter', 26, 88, { rotate: -3 })] },
  },
  {
    n: 4,
    id: 'one-big-file',
    title: 'The marks pack into one object',
    relation: 'so',
    secs: 7,
    vo: 'So the whole model is three hundred and twenty billion numbers, sitting in one very big file.',
    commands: [block.pack()],
  },
  {
    n: 5,
    id: 'only-this-much',
    title: 'A patch of it lights',
    relation: 'and-yet',
    secs: 6,
    vo: 'And to answer you, it only uses this much of it. About eighteen billion.',
    commands: [block.light('a')],
  },
  {
    n: 6,
    id: 'roughly-five-percent',
    title: '18 of 320 — about 5%',
    relation: 'and-yet',
    secs: 5,
    vo: 'Eighteen, out of three hundred and twenty. Roughly five percent.',
    commands: [],
    overlays: [
      {
        kind: 'brace',
        at: { x: BLOCK_LEFT, y: '80%' },
        width: BLOCK_W,
        label: '320 billion — all of it',
        sticky: true,
      },
      H('≈ 18 billion\nof it', 12, 34, { tone: 'measure', rotate: 3, sticky: true }),
    ],
  },

  /* ═══ ACT 2 · THE REASONABLE IDEA ═══════════════════════════════════════
   * The viewer's own thought, said out loud for them, then answered flatly. */
  {
    n: 7,
    id: 'so-keep-that-bit',
    title: 'The patch lifts free',
    relation: 'hope',
    secs: 7,
    vo: 'So the obvious thought is — take that bit. Keep it. Throw the rest away.',
    commands: [block.lift(), narrator.pose('hopeful')],
    clearSticky: true,
    overlays: [H('keep this…', 12, 26, { rotate: -5 })],
  },
  {
    n: 8,
    id: 'that-doesnt-work',
    title: 'It drops back; the block seals',
    relation: 'wall',
    secs: 7,
    vo: 'And that doesn’t work. You need all three hundred and twenty billion, sitting there, ready.',
    commands: [block.drop(), block.light(undefined), narrator.pose('shrug')],
  },
  {
    n: 9,
    id: 'watch-a-word',
    title: '`dog` arrives, patch A lights',
    relation: 'so',
    secs: 6,
    vo: 'Here’s why. Watch what happens when a word comes in.',
    commands: [word.arrive({ x: 10, y: 26 }, 0.8), narrator.pose('point')],
    stages: [{ at: 1400, commands: [block.light('a')] }],
  },
  {
    n: 10,
    id: 'a-different-part',
    title: '`cat` lights a different patch',
    relation: 'wall',
    secs: 6,
    vo: 'Now another word. Different part of the file.',
    commands: [word2.arrive({ x: 10, y: 50 }, 0.8)],
    stages: [{ at: 1200, commands: [block.light('b')] }],
    overlays: [H('a different part', 84, 20, { tone: 'cost', rotate: 4, sticky: true })],
  },
  {
    n: 11,
    id: 'same-amount-different-part',
    title: 'Same amount. Different eighteen billion.',
    relation: 'and-yet',
    secs: 8,
    vo: 'Same amount — about eighteen billion, both times. Different eighteen billion.',
    commands: [block.ghost('a')],
    overlays: [
      H('a different part', 84, 20, { tone: 'cost', rotate: 4, sticky: true }),
      H('where “cat” went', 50, 88, { tone: 'measure', rotate: -1 }),
      H('where “dog” went — dashed', 50, 94, { tone: 'cost', rotate: 1 }),
    ],
  },
  {
    n: 12,
    id: 'not-until-it-turns-up',
    title: '`it` — a third patch again',
    relation: 'wall',
    secs: 6,
    vo: 'And it doesn’t work out which part until the word actually turns up.',
    commands: [word3.arrive({ x: 10, y: 74 }, 0.8), block.ghost(undefined)],
    clearSticky: true,
    stages: [{ at: 1200, commands: [block.light('c')] }],
  },

  /* ═══ ACT 3 · THE ANSWER, AND THE DOORWAY ═══════════════════════════════ */
  {
    n: 13,
    id: 'nothing-to-pack',
    title: 'The packed patch does not line up',
    relation: 'therefore',
    secs: 8,
    vo: 'Which is why you can’t pack a smaller version in advance. There’s nothing to pack.',
    commands: [block.ghost('a'), narrator.pose('slump')],
    overlays: [
      H('what we packed', 50, 88, { tone: 'cost', rotate: -1 }),
      H('what it needs now', 50, 94, { tone: 'word', rotate: 1 }),
    ],
  },
  {
    n: 14,
    id: 'thats-the-answer',
    title: "That's the whole thing",
    relation: 'therefore',
    secs: 5,
    vo: 'That’s the answer. That’s the whole thing.',
    commands: [
      block.ghost(undefined),
      word.off(),
      word2.off(),
      word3.off(),
      narrator.pose('nod'),
    ],
  },
  {
    n: 15,
    id: 'let-me-show-you',
    title: 'The camera pushes into the block',
    relation: 'so',
    secs: 5,
    vo: 'But it’s hard to believe, so let me show you.',
    commands: [
      /* The only camera move in the section. `skills/SPATIAL_CONTINUITY.md`. */
      block.moveTo({ x: 52, y: 46 }, 2.6),
      narrator.off(),
    ],
  },
  {
    n: 16,
    id: 'two-eighty-eight-experts',
    title: 'The surface resolves into 288',
    relation: 'so',
    secs: 9,
    vo: 'Up close, the model’s knowledge is in separate pieces. Two hundred and eighty-eight of them, in each part of the model. They’re called experts.',
    commands: [
      block.off(),
      hospital.rise({ x: 52, y: 46 }, 0.86),
      hospital.staff(),
      ground.at(88),
    ],
    lateOverlays: {
      at: 4200,
      overlays: [H('288 experts', 50, 12, { size: 'md', rotate: -2, sticky: true })],
    },
  },
  {
    n: 17,
    id: 'eight-get-picked',
    title: 'Eight light, 280 go flat',
    relation: 'so',
    secs: 9,
    vo: 'A word comes in, eight of them get used, and the other two hundred and eighty do nothing at all.',
    commands: [word.arrive({ x: 10, y: 30 }, 0.78)],
    stages: [{ at: 1600, commands: [hospital.choose(CHOSEN)] }],
    overlays: [
      H('288 experts', 50, 12, { size: 'md', rotate: -2, sticky: true }),
      H('8', 12, 46, { size: 'lg', tone: 'measure' }),
    ],
  },
  {
    n: 18,
    id: 'who-picks-the-eight',
    title: 'A plain desk slides in',
    relation: 'and-yet',
    secs: 9,
    vo: 'So the question I actually have to answer is: who picks the eight, and why can’t they tell us in advance?',
    commands: [desk.arrive({ x: 14, y: 78 }, 0.66), narrator.at({ x: 91, y: 70 }, 'think', 1, true)],
    clearSticky: true,
    overlays: [
      H('who picks\nthe eight?', 50, 86, { size: 'md', rotate: -2 }),
    ],
  },
]
