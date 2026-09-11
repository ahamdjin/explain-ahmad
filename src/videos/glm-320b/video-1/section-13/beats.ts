import { centred, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  OTHER_MODEL,
  THIS_MODEL,
  big,
  block,
  cardA,
  cardB,
  block2,
  diffs,
  ground,
  narrator,
  rigA,
  rigB,
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
 * one coarse and one fine, with the fine one carrying eight chips. The trend, as
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
    vo: 'Per token, this thing does the thinking of a model about a twentieth of its size. That’s real. That’s why it’s quick, and why it’s cheap to run per token. That part is true.',
    commands: [
      block.off(),
      share.show({ x: 50, y: 54 }, 0.86, { mode: 'bar', lit: 0.056, caption: 'the thinking it does per token' }),
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
    id: 'work-and-space',
    title: 'The bar and the block separate into two labelled columns',
    relation: 'therefore',
    secs: 8,
    vo: 'One of those is a number about work. The other is a number about space.',
    commands: [],
    /* One of `claim` orange's three budgeted uses in the whole video. */
    overlays: [note('“efficient”', 18, 42, { size: 'lg', tone: 'claim', rotate: -4 })],
  },
  {
    n: 6,
    id: 'one-shrinks-one-doesnt',
    title: 'The work column shrinks to almost nothing; the space column stays full height',
    relation: 'therefore',
    secs: 8,
    vo: 'Sparse routing shrinks the first one. It does nothing at all to the second.',
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
    id: 'one-chip-or-eight',
    title: 'A second card slides in beside the first; chips stack under each',
    relation: 'and-yet',
    secs: 15,
    vo: 'And here’s the part I didn’t expect. This model has about a hundred and twenty billion parameters, and it fits on one chip. This one has three hundred and twenty, and needs eight.',
    /* Eight chips, not a rack. A rack is an unquantified "lots"; eight is the
     * promise the video opened on. */
    commands: [
      share.off(),
      block.off(),
      /* The number has done its job by now. Left on screen it competed with
       * the two cards it was supposed to have set up. */
      big.off(),
      cardA.show({ x: 28, y: 50 }, 1.1, { chips: OTHER_MODEL.chips, grain: 'coarse', note: 'fits on one chip' }),
      cardB.show({ x: 72, y: 50 }, 1.1, { chips: THIS_MODEL.chips, grain: 'fine', note: 'needs eight' }),
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
    id: 'three-things-differ',
    title: 'Three chips land beside the second card: parameters, precision, grain',
    relation: 'so',
    secs: 16,
    /*
     * The three differences, separated before any of them is blamed. v9 said
     * "the difference is that this one is chopped finer" over a frame that
     * divided the blocks, which made granularity look like the cause of the
     * footprint. It is not: 116.8B vs 321B and MXFP4 vs FP8 account for ~58
     * GiB against ~306 GiB almost entirely. See this section's truth notes.
     */
    vo: 'Three things differ, and only one of them is exciting. It’s nearly three times the parameters. It ships at twice the precision per weight. And it’s chopped finer — more experts, smaller each.',
    commands: [diffs.all()],
    overlays: [
      note(`${OTHER_MODEL.experts} per floor`, 28, 82, { tone: 'measure', rotate: -2 }),
      note(`${THIS_MODEL.experts} per floor`, 72, 82, { tone: 'measure', rotate: 2 }),
    ],
  },
  {
    n: 10,
    id: 'only-the-third-is-interesting',
    title: 'The first two chips grey out; the granularity chip stays lit',
    relation: 'and-yet',
    secs: 13,
    vo: 'The first two are why the file is bigger. They’re just size. This one is the interesting one — and it’s not about the file at all.',
    /* Dimming, not removing. The two size differences stay on screen and stay
     * true -- they are just not the thing the rest of the section is about. */
    commands: [diffs.onlyGranularity()],
  },
  {
    n: 11,
    id: 'better-and-harder',
    title: 'The fine-grained one’s chips grow while its pieces get smaller',
    relation: 'and-yet',
    secs: 18,
    /* The carrying frame. The trend, as a picture. */
    vo: 'Chopping finer is exactly why it’s better — better at specialising, better at spreading the load. It’s also why the five percent it uses is smeared across all of it, instead of sitting in one corner you could keep nearby.',
    commands: [cardB.moveTo({ x: 72, y: 48 }, 1.24)],
    overlays: [note('better · and harder to hold', 62, 12, { size: 'md', tone: 'cost', rotate: 2 })],
  },
  {
    n: 12,
    id: 'the-trend',
    title: 'The second card withdraws; ours holds with its eight chips',
    relation: 'therefore',
    secs: 15,
    /* The sentence the viewer repeats to someone else. */
    /*
     * **The corollary, and it must stay arithmetic.** A lower active share
     * against a larger total means more inactive weight that still has to be
     * reachable -- that is division, not a claim about caching. §12 has just
     * conceded that nobody has measured expert locality at 288/top-8, so this
     * beat may not turn round and present "harder to cache" as a proven law.
     * It said "the more of themselves you have to keep within reach", which
     * reads as exactly that law. `research/glm/OFFLOADING_AND_LOCALITY.md` §5.
     */
    vo: 'So the better these models get at using less of themselves at any one moment, the more of themselves has to be sitting there anyway. And the number on the box doesn’t move.',
    commands: [cardA.off(), cardB.moveTo({ x: 50, y: 48 }, 1.3), narrator.set({ pose: 'lean' })],
  },
  {
    n: 13,
    id: 'a-compute-number',
    title: 'Everything clears to a single line of handwriting',
    relation: 'therefore',
    secs: 11,
    /*
     * S-11. The thesis, once, alone, at the end -- and it is the *only* place
     * in the video it is stated. v9 said it at beat 5 as well, which is the
     * one strategy this section cites and the one it broke: a sentence said
     * twice is a sentence the viewer stops hearing.
     */
    vo: '"Active parameters" is a compute number. It was never a memory number.',
    commands: [
      cardA.off(),
      cardB.off(),
      diffs.off(),
      share.off(),
      block.off(),
      big.off(),
      narrator.off(),
    ],
    lateOverlays: {
      at: 2400,
      overlays: [
        centred('“active parameters” is a compute number.\nit was never a memory number.', 50, 46, {
          size: 'lg',
          tone: 'cost',
          rotate: -1,
          sticky: true,
        }),
      ],
    },
  },
  {
    n: 14,
    id: 'two-models-one-card-and-eight',
    title: '§1’s opening frame redraws itself exactly: two sheets, one chip and eight',
    relation: 'so',
    secs: 12,
    /*
     * S-10. The ring closes, and it has to be the *same frame* -- same
     * positions, same scales, same chip counts as §1. A near-miss reads as a
     * similar picture; an exact match reads as a return, which is the only
     * version that pays off seventeen beats of setup.
     */
    /* S-10 pays out here, and it pays out in **nouns**: this line is §1 beat 2
     * said back. §1 says "a single chip", so this says a single chip. It said
     * "card" until 2026-09-11, which made the closing ring rhyme rather than
     * return. */
    vo: 'Two models. Both about five percent active. One of them runs on a single chip; the other one needs eight.',
    /*
     * §1's coordinates, exactly: blocks at 30/42 and 72/42 scale 0.5, rigs at
     * 30/73 and 72/73 with counts 1 and 4. If `section-01/scene.ts` moves,
     * this moves with it -- the whole point of the beat is that the viewer
     * recognises the frame, and a shifted copy is a different picture.
     */
    commands: [
      /*
       * `fine` on both, because §1's block state has no `grain` field at all
       * and `Block` defaults to fine -- so §1's two sheets look identical in
       * grain, and an exact return has to as well. The coarse/fine contrast
       * belongs to beats 9-11, where it is the argument; here it would make
       * the returning frame a *different* frame.
       */
      block.show({ x: 30, y: 42 }, 0.5, { grain: 'fine', lit: 'a', heavy: false }),
      block2.show({ x: 72, y: 42 }, 0.5, { lit: 'b' }),
      rigA.show({ x: 30, y: 73 }, 1, { count: 1 }),
      rigB.show({ x: 72, y: 73 }, 1, { count: 8 }),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'lean', flip: true }),
    ],
    clearSticky: true,
    lateOverlays: {
      at: 3600,
      overlays: [
        note('one', 27, 82, { tone: 'measure', sticky: true }),
        note('eight', 69, 82, { tone: 'cost', sticky: true }),
      ],
    },
  },
  {
    n: 15,
    id: 'now-you-know-why',
    title: 'Nothing moves',
    relation: 'and-yet',
    secs: 7,
    /* Four words, and then the video stops. Anything added here spends the
     * ring's payoff on decoration. */
    vo: 'Now you know why.',
    commands: [narrator.set({ pose: 'nod' })],
  },
]
