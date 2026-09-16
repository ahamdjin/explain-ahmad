import { brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  block,
  block2,
  cardA,
  cardB,
  diffs,
  ground,
  narrator,
  rigA,
  rigB,
  share,
  type Patch,
} from './scene'

/**
 * Section 13 — What that number actually bought.
 *
 * Script and board: `video-script/video-1/13-what-that-number-bought.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * §12 leaves `18 billion active` alone at centre. Beat 1 puts the other number
 * back above it and measures both — every image from here is a callback, and
 * no new mechanism appears anywhere in this section.
 *
 * **The video stops on beat 13.** Nothing may be added after it.
 */

/**
 * §1's opening frame, by the constants that draw it in `section-01/beats.ts`.
 *
 * `CMP_LEFT` / `CMP_RIGHT` / `CMP_Y` / `CMP_SCALE`, and the accelerator rows on
 * y 70. These are copied rather than imported because §1 does not export them,
 * so they are the one thing in this file that has to be checked by hand: an
 * approximate return reads as a new picture, and a new picture at minute
 * twenty-nine spends the whole video's setup on nothing.
 */
const CMP_LEFT = 27
const CMP_RIGHT = 73
const CMP_Y = 32
const CMP_SCALE = 0.52
const CMP_HALF = (51.4 * CMP_SCALE) / 2
const RIG_Y = 70

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'two-numbers-two-questions',
    title: '`320 billion` returns above `18 billion active`, and both are bracketed',
    relation: 'want',
    secs: 26,
    vo: 'Here is the payoff. When you read: 320 billion parameters and 18 billion active — those two numbers are answering different questions. The 320 billion tells you how many learned parameters exist in the model. The 18 billion active tells you roughly how much of that parameter set participates in the computation for a token.',
    /* `pair` mode is the two numbers side by side with their own captions,
     * which is the beat: one object holding two answers. */
    commands: [
      ground.at(GROUND_Y),
      share.show({ x: 50, y: 44 }, 0.92, { mode: 'pair' }),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
    /* Two braces, each naming the *question* rather than repeating the answer
     * under the number. The voice says exists and participates; the braces say
     * what you would go and measure. */
    lateOverlays: {
      at: 12000,
      overlays: [
        brace('what is stored', 16, 54, 26, { tone: 'measure', side: 'bottom' }),
        brace('what runs, per token', 56, 54, 28, { tone: 'word', side: 'bottom' }),
      ],
    },
  },
  {
    n: 2,
    id: 'a-huge-pool',
    title: 'The whole model draws as one field with small active paths lit across it',
    relation: 'so',
    secs: 13,
    vo: 'And that is the trick Mixture of Experts is buying you. The model can have a huge pool of learned expert weights... without running every expert for every token.',
    /* Scattered, never one patch. Routing picks by score and not by locality,
     * and every frame in this video that says otherwise is a lie the viewer
     * has already been taught to catch. */
    commands: [
      share.moveTo({ x: 50, y: 20 }, 0.5),
      block.show({ x: 50, y: 44 }, 0.78, { grain: 'fine', heavy: false }),
      block.route('a'),
      narrator.set({ pose: 'wonder' }),
    ],
  },
  {
    n: 3,
    id: 'another-token-another-route',
    title: 'Our own `it` route replays, a different eight each time',
    relation: 'so',
    secs: 12,
    vo: 'For our `it`, the router only selected eight routed experts on each sparse layer. Another token can use a different route. Another sentence can use a different route.',
    commands: [narrator.set({ pose: 'count' })],
    /* The same block, relit. A second object here would say "another model"
     * when the line says "another token". */
    stages: [
      { at: 5000, commands: [block.route('b')] },
      { at: 8500, commands: [block.route('c')] },
    ],
    overlays: [note('8 per sparse layer · 42 layers', 62, 20, { tone: 'measure', rotate: 2 })],
  },
  {
    n: 4,
    id: 'that-is-the-win',
    title: 'The frame splits: the total stays full while only the work side shrinks',
    relation: 'therefore',
    secs: 11,
    vo: 'So the model gets access to far more total learned capacity than it has to compute through on every single token. That is the win.',
    /* Both halves on one frame, because the whole thesis is that one of them
     * shrank and the other did not. */
    commands: [
      block.moveTo({ x: 67, y: 42 }, 0.62),
      share.show({ x: 26, y: 58 }, 0.5, { mode: 'bar', lit: 0.056, caption: '' }),
      narrator.set({ pose: 'weigh' }),
    ],
    overlays: [
      note('PER-TOKEN WORK', 14, 74, { tone: 'word', rotate: -2 }),
      note('TOTAL', 66, 74, { tone: 'measure', rotate: 2 }),
    ],
  },
  {
    n: 5,
    id: 'the-inactive-still-exist',
    title: 'The unused pool stays visibly present around the route',
    relation: 'and-yet',
    secs: 18,
    vo: 'But notice what it does not magically do. It does not turn a 320-billion-parameter checkpoint into an 18-billion-parameter file. The experts that are inactive for this token still exist. Another token may need them later.',
    /* Heavy, and still lit: available, not wasted, and not gone. */
    commands: [
      share.off(),
      block.moveTo({ x: 50, y: 42 }, 0.8),
      block.set({ heavy: true }),
      narrator.set({ pose: 'carry' }),
    ],
    overlays: [note('321B stored · 18B run', 20, 20, { size: 'md', tone: 'measure', rotate: -2 })],
  },
  {
    n: 6,
    id: 'weights-and-precision',
    title: 'Stored weight and precision return as the thing that sets the footprint',
    relation: 'therefore',
    secs: 11,
    vo: 'So if you want the whole model fully resident in fast memory, total stored weights and their precision still matter enormously.',
    commands: [narrator.set({ pose: 'point' })],
    /* The arithmetic of a checkpoint, which the voice never spells out. It is
     * also the sum beats 7-8 are about to do twice. */
    overlays: [
      brace('weights × precision = the file', 50 - 20, 76, 40, { tone: 'measure', side: 'bottom' }),
    ],
  },
  {
    n: 7,
    id: 'the-left-card-measured',
    title: 'The two model cards from §1 return and the left one is measured',
    relation: 'so',
    secs: 18,
    vo: 'And now our opening comparison stops being weird. This model: gpt-oss-120b uses roughly 4.4% of its parameters per token and ships at roughly 58 GiB in its compact MXFP4 format.',
    commands: [
      block.off(),
      cardA.show({ x: 28, y: 48 }, 1.05, {
        chips: 0,
        grain: 'coarse',
        litShare: true,
        note: '~58 GiB · MXFP4',
      }),
      narrator.set({ pose: 'offer' }),
    ],
    overlays: [centred('≈4.4% active', 28, 14, { size: 'md', tone: 'measure', rotate: -1 })],
  },
  {
    n: 8,
    id: 'the-right-card-measured',
    title: 'The right one is measured the same way',
    relation: 'so',
    secs: 15,
    vo: 'This model: GLM-5.3-Flash uses roughly 5.6% per token, but its shipped FP8 checkpoint is roughly 306 GiB before runtime memory.',
    commands: [
      cardB.show({ x: 72, y: 48 }, 1.05, {
        chips: 0,
        grain: 'fine',
        litShare: true,
        note: '~306 GiB · FP8',
      }),
    ],
    overlays: [
      centred('≈4.4% active', 28, 14, { size: 'md', tone: 'measure', rotate: -1 }),
      centred('≈5.6% active', 72, 14, { size: 'md', tone: 'measure', rotate: 1 }),
    ],
  },
  {
    n: 9,
    id: 'not-a-failure-of-moe',
    title: 'Three quiet cause cards land between them; grain dims',
    relation: 'and-yet',
    secs: 16,
    vo: 'Similar active percentages. Completely different total footprints. That difference is not some mysterious failure of MoE. They are different-sized models stored at different precisions. And “percent active” was never the number that told us the checkpoint size.',
    commands: [
      cardA.moveTo({ x: 24, y: 56 }, 0.92),
      cardB.moveTo({ x: 76, y: 56 }, 0.92),
      diffs.all(),
      narrator.set({ pose: 'think' }),
    ],
    /* Granularity is real and stays on screen, but it goes dim: total size and
     * shipped precision are what turn ~58 GiB into ~306 GiB, and a lit grain
     * plate beside that brace would name the wrong cause. */
    stages: [{ at: 8000, commands: [diffs.onlySize()] }],
    /* The carrying frame: two similar shares, two footprints five times apart,
     * measured across the pair rather than asserted. */
    overlays: [brace('~58 GiB → ~306 GiB', 24, 84, 52, { tone: 'cost', side: 'bottom' })],
  },
  {
    n: 10,
    id: 'read-it-like-this',
    title: 'Everything collapses back to one card with a meaning under each number',
    relation: 'therefore',
    secs: 18,
    vo: 'So when you see a model advertised as: 320B total — 18B active — read it like this: 320B total: how much learned model exists. 18B active: roughly how much participates for each token.',
    commands: [
      cardA.off(),
      cardB.off(),
      diffs.off(),
      share.show({ x: 50, y: 44 }, 0.92, { mode: 'pair' }),
      narrator.set({ pose: 'nod' }),
    ],
  },
  {
    n: 11,
    id: 'which-eighteen-billion',
    title: 'The opening question returns, put to the viewer rather than to the screen',
    relation: 'and-yet',
    secs: 16,
    vo: 'And if someone turns that second number into: “so you only need 18 billion parameters in memory”... now you know exactly what question to ask: which 18 billion — and when does the model know?',
    commands: [share.moveTo({ x: 50, y: 22 }, 0.56), narrator.set({ pose: 'offer' })],
    /* §1 beat 10's mark, returned. The question is the frame; the answer is
     * the next beat, and it is a picture rather than a sentence. */
    lateOverlays: {
      at: 9000,
      overlays: [centred('?', 50, 50, { size: 'lg', tone: 'claim', sticky: true })],
    },
  },
  {
    n: 12,
    id: 'it-decides-as-it-goes',
    title: 'Behind the question, the route chooses its experts layer by layer',
    relation: 'therefore',
    secs: 10,
    vo: 'Because we followed one tiny `it` all the way through. And the answer was: it decides as it goes.',
    /* The question mark is replaced by the thing that answers it. A `?` left
     * over a working route would say we never found out. */
    commands: [block.show({ x: 50, y: 48 }, 0.7, { grain: 'fine', heavy: false }), block.route('b')],
    clearSticky: true,
    stages: [
      { at: 2600, commands: [block.route('c')] },
      { at: 5200, commands: [block.route('a')] },
    ],
  },
  {
    n: 13,
    id: 'the-opening-frame-returns',
    title: '§1’s opening composition returns exactly, and nothing moves',
    relation: 'wall',
    secs: 20,
    vo: 'That is why two models can both say “about five percent active”... while one fits on a single 80-gigabyte accelerator... and keeping the other fully resident at its shipped precision takes eight. Same headline percentage. Different question. Now the number actually means something.',
    /*
     * §1 beats 4, 6, 7 and 8, redrawn: same objects, same coordinates, same
     * scales, same chip counts, same labels, both blocks `fine`. The narrator
     * goes because §1 has no narrator — she was never in this frame.
     *
     * Nothing is staged and nothing arrives late. The line is spoken over a
     * still picture, and then the video is over.
     */
    commands: [
      share.off(),
      block.show({ x: CMP_RIGHT, y: CMP_Y }, CMP_SCALE, { grain: 'fine', heavy: false }),
      block.route('a'),
      block2.show({ x: CMP_LEFT, y: CMP_Y }, CMP_SCALE, { lit: 'b', grain: 'fine' }),
      rigA.show({ x: CMP_LEFT, y: RIG_Y }, 1, { count: 1 }),
      rigB.show({ x: CMP_RIGHT, y: RIG_Y }, 1, { count: 8 }),
      narrator.off(),
    ],
    clearSticky: true,
    overlays: [
      centred('gpt-oss-120b', CMP_LEFT, 15, { size: 'sm' }),
      centred('GLM-5.3-Flash', CMP_RIGHT, 15, { size: 'sm' }),
      centred('≈4% active', CMP_LEFT, 56, { size: 'sm', tone: 'claim' }),
      centred('≈6% active', CMP_RIGHT, 56, { size: 'sm', tone: 'claim' }),
      brace('almost the same active share', CMP_LEFT - CMP_HALF, 59, CMP_RIGHT - CMP_LEFT + CMP_HALF * 2, {
        tone: 'claim',
        side: 'bottom',
      }),
      centred('1 × 80 GB', CMP_LEFT, 79, { tone: 'measure' }),
      centred('8 × 80 GB', CMP_RIGHT, 79, { tone: 'cost' }),
      centred('native shipped precision · weights resident', CMP_RIGHT, 87, { size: 'sm' }),
    ],
  },
]
