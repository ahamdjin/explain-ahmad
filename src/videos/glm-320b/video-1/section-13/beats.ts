import { centred, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  OTHER_MODEL,
  THIS_MODEL,
  big,
  block,
  cardA,
  cardB,
  ground,
  narrator,
  share,
  verdict,
  type Patch,
} from './scene'

/**
 * Section 13 — What that number actually bought.
 *
 * Board: `video-script/video-1/13-what-that-number-bought.md`. `npm run check:board`.
 *
 * **Beat 3 concedes first.** The true half gets a frame of its own before any
 * qualification arrives. A verdict that only convicts reads as a debunk, and a
 * debunk is a worse video than an explanation.
 *
 * **Beats 9-10 are the carrying frames** and the *oh-now-I-see*: two blocks,
 * one coarse and one fine, with the fine one carrying four chips. The trend, as
 * a picture, with no line of voice-over needed to explain it.
 *
 * No new mechanism appears anywhere in this section. Anything that needed
 * explaining belonged earlier.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'eighteen-billion-active',
    title: 'The plan dissolves; `18` rises and holds alone',
    relation: 'want',
    secs: 8,
    vo: 'Small, or fast. Not both. So — what did "five percent active" actually buy?',
    commands: [
      ground.at(GROUND_Y),
      big.show({ x: 50, y: 42 }, 1, { value: '18 billion', caption: 'active' }),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'what-that-number-tells-you',
    title: 'We slide back to the opening: the number, and the block behind it',
    relation: 'so',
    secs: 5,
    vo: 'Here’s what that number is actually telling you.',
    /* Back to what §1 actually opened with. See the note in scene.ts about
     * why this is not the spec sheet the board asked for. */
    commands: [
      big.moveTo({ x: 50, y: 20 }, 0.7),
      block.show({ x: 50, y: 52 }, 0.72, { grain: 'fine' }),
    ],
  },
  {
    n: 3,
    id: 'that-part-is-true',
    title: 'A small work bar draws itself beside it',
    relation: 'so',
    secs: 16,
    /* The true half, conceded with no hedge. */
    vo: 'Per word, this thing does the thinking of a model about a twentieth of its size. That’s real. That’s why it’s quick, and why it’s cheap to run per word. That part is completely true.',
    commands: [
      block.off(),
      share.show({ x: 50, y: 54 }, 0.86, { mode: 'bar', lit: 0.056, caption: 'the thinking it does per word' }),
      narrator.set({ pose: 'nod' }),
    ],
    lateOverlays: {
      at: 4600,
      overlays: [note('completely true', 18, 72, { tone: 'measure', rotate: -3 })],
    },
  },
  {
    n: 4,
    id: 'all-of-it-in-reach',
    title: 'The block returns behind it, whole, and settles heavily',
    relation: 'wall',
    secs: 12,
    vo: 'But all of it still has to be within reach. Because it never knows which part it wants until the moment it wants it.',
    commands: [
      share.moveTo({ x: 50, y: 82 }, 0.6),
      block.show({ x: 50, y: 42 }, 0.7, { grain: 'fine' }),
      block.whole(),
      narrator.set({ pose: 'carry' }),
    ],
  },
  {
    n: 5,
    id: 'a-compute-number',
    title: 'A label lands between the bar and the block',
    relation: 'therefore',
    secs: 8,
    vo: 'So: "active parameters" is a compute number. It was never a memory number.',
    commands: [],
    /* One of `claim` orange's three budgeted uses in the whole video. */
    overlays: [note('“efficient”', 18, 42, { size: 'lg', tone: 'claim', rotate: -4 })],
  },
  {
    n: 6,
    id: 'compute-not-memory',
    title: 'The bar and the block separate into two labelled halves',
    relation: 'therefore',
    secs: 8,
    vo: 'Sparse routing buys you compute. It doesn’t buy you memory.',
    /* The thesis is a trade, so the figure holds two things at once. */
    commands: [
      share.moveTo({ x: 26, y: 66 }, 0.52),
      block.moveTo({ x: 74, y: 46 }, 0.5),
      narrator.set({ pose: 'weigh' }),
    ],
    overlays: [
      note('compute — bought', 26, 84, { size: 'md', tone: 'measure', rotate: -2 }),
      note('memory — not bought', 74, 84, { size: 'md', tone: 'cost', rotate: 2 }),
    ],
  },
  {
    n: 7,
    id: 'one-chip-or-four',
    title: 'A second card slides in beside the first; chips stack under each',
    relation: 'and-yet',
    secs: 15,
    vo: 'And here’s the part I didn’t expect. This model has a hundred and twenty billion parameters, and it fits on one chip. This one has three hundred and twenty, and needs four.',
    /* Four chips, not a rack. A rack is an unquantified "lots"; four is the
     * promise the video opened on. */
    commands: [
      share.off(),
      block.off(),
      /* The number has done its job by now. Left on screen it competed with
       * the two cards it was supposed to have set up. */
      big.off(),
      cardA.show({ x: 28, y: 50 }, 1.1, { chips: OTHER_MODEL.chips, grain: 'coarse', note: 'fits on one chip' }),
      cardB.show({ x: 72, y: 50 }, 1.1, { chips: THIS_MODEL.chips, grain: 'fine', note: 'needs four' }),
      narrator.set({ pose: 'wonder' }),
    ],
  },
  {
    n: 8,
    id: 'about-five-percent-both',
    title: 'Both cards light their active share; the two shares match',
    relation: 'and-yet',
    secs: 7,
    vo: 'Both of them use about five percent of themselves to answer you.',
    commands: [cardA.set({ litShare: true }), cardB.set({ litShare: true })],
    overlays: [centred('about 5% — both of them', 50, 16, { size: 'md', tone: 'measure', rotate: -1 })],
  },
  {
    n: 9,
    id: 'chopped-finer',
    title: 'Each card’s block divides — one coarse, one into many fine pieces',
    relation: 'so',
    secs: 7,
    vo: 'The difference is that this one is chopped finer. More experts, smaller each.',
    commands: [],
    overlays: [
      note(`${OTHER_MODEL.experts} per floor`, 28, 82, { tone: 'measure', rotate: -2 }),
      note(`${THIS_MODEL.experts} per floor`, 72, 82, { tone: 'measure', rotate: 2 }),
    ],
  },
  {
    n: 10,
    id: 'better-and-harder',
    title: 'The fine-grained one’s chips grow while its pieces get smaller',
    relation: 'and-yet',
    secs: 8,
    /* The carrying frame. The trend, as a picture. */
    vo: 'Which is exactly why it’s better — and exactly why it’s harder to hold.',
    commands: [cardB.moveTo({ x: 72, y: 48 }, 1.24)],
    overlays: [note('better · and harder to hold', 62, 12, { size: 'md', tone: 'cost', rotate: 2 })],
  },
  {
    n: 11,
    id: 'the-trend',
    title: 'The second card withdraws; ours holds with its four chips',
    relation: 'therefore',
    secs: 11,
    /* The sentence the viewer repeats to someone else. */
    vo: 'So the better these models get at using less of themselves, the more of them you have to keep lying around.',
    commands: [cardA.off(), cardB.moveTo({ x: 50, y: 48 }, 1.3), narrator.set({ pose: 'lean' })],
  },
  {
    n: 12,
    id: 'cheap-to-run-not-small',
    title: 'Everything clears to one card',
    relation: 'therefore',
    secs: 21,
    vo: 'Two models. Both about five percent active. One of them runs on a single card; the other one needs four. Now you know why. "Active parameters" is a compute number, not a memory number — and the finer you slice the experts, the wider that gap gets.',
    commands: [cardB.off(), verdict.show({ x: 50, y: 48 }, 1), narrator.off()],
  },
]
