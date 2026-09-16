import { arrow, brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import { block, block2, chat, ground, rigA, rigB, type Patch } from './scene'

/**
 * Section 01 — The five-percent problem.
 *
 * NARRATION LOCKED. The spoken script was approved before this board was built.
 * Beats, timing and visuals adapt to that narration; the narration does not get
 * paraphrased to fit the implementation. See `skills/STORY_STRUCTURE.md`.
 *
 * No tower, 45 floors, 288 experts, 336 visits, router, or MoE language here.
 * Those facts matter later, after the viewer knows what they count.
 *
 * **Layout note, because every overlay in this section depends on it.**
 * `Block` reserves 168 SVG units of headroom above the drawn box so the lifted
 * patch has somewhere to go. The consequence is that the box does *not* centre
 * on its Slot anchor -- it sits lower:
 *
 *   drawn centre y ~= anchor y + 11.6 x scale      (% of frame height)
 *   drawn height   ~= 56.9 x scale,  width ~= 51.4 x scale
 *
 * Anchors below are chosen from those three lines. Changing a `scale` without
 * re-deriving its `y` is what put "18B active" through the block's top border.
 */

/* Two-model comparison: both blocks, and everything measuring them. */
const CMP_SCALE = 0.52
const CMP_Y = 32 // drawn centre 38 · top 23 · bottom 53
const CMP_LEFT = 27
const CMP_RIGHT = 73
/** Half the drawn width of a comparison block, for braces that must span one. */
const CMP_HALF = (51.4 * CMP_SCALE) / 2

/* Single-model hero: beats 1-3 and again 9-14. */
const HERO_SCALE = 0.8
const HERO_Y = 41 // drawn centre 50 · top 27 · bottom 73
const HERO_HALF = (51.4 * HERO_SCALE) / 2
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'the-advertised-number',
    title: 'GLM arrives; 320B total and 18B active become the only two numbers',
    relation: 'want',
    secs: 11,
    vo: 'You’ve probably seen AI models advertised like this: 320 billion parameters. Only 18 billion active. And that sounds incredible.',
    commands: [
      ground.at(GROUND_Y),
      block.scatter({ x: 50, y: HERO_Y }, HERO_SCALE),
      block.pack(),
      block.light('a'),
    ],
    /* The brace measures the *box*; the note names the *orange*. Two different
     * jobs, so two different marks. Both sat on the block's own border in the
     * first pass, because they were placed against the Slot anchor rather than
     * against the geometry above. */
    overlays: [
      centred('GLM-5.3-Flash', 50, 15, { size: 'sm', sticky: true }),
      brace('320 billion parameters', 50 - HERO_HALF, 76, HERO_HALF * 2, {
        tone: 'measure',
        side: 'bottom',
        sticky: true,
      }),
      note('18B active', 50 + HERO_HALF + 2, 30, { tone: 'claim', sticky: true }),
    ],
  },
  {
    n: 2,
    id: 'surely-you-only-need-that-part',
    title: 'The active region lifts out as the obvious interpretation',
    relation: 'therefore',
    secs: 10,
    vo: 'Because if only a small part of the model is being used at a time… then surely you only need that small part.',
    commands: [block.lift()],
    overlays: [note('keep this part?', 50 + HERO_HALF + 2, 21, { size: 'md', rotate: -3 })],
  },
  {
    n: 3,
    id: 'thats-what-i-assumed',
    title: 'The lifted patch settles back; the assumption is allowed to feel reasonable',
    relation: 'want',
    secs: 8,
    vo: 'Right? Honestly, that’s what I assumed too. So let me show you something weird.',
    commands: [block.drop()],
    overlays: [centred('sounds reasonable', 50, 82, { size: 'sm', rotate: 2 })],
  },
  {
    n: 4,
    id: 'four-percent-six-percent',
    title: 'A second model arrives; the two active shares are shown separately',
    relation: 'so',
    secs: 12,
    vo: 'Here are two models. This one uses about 4% of its parameters when generating a token. This one uses about 6%.',
    commands: [
      block.moveTo({ x: CMP_RIGHT, y: CMP_Y }, CMP_SCALE),
      block2.arrive({ x: CMP_LEFT, y: CMP_Y }, CMP_SCALE),
      block2.light('b'),
      /* Both blocks at the same grain. `block2` defaults to coarse, which drew
       * gpt-oss as nine big cells beside GLM's dense field -- two different
       * kinds of object in a beat whose entire claim is that they are alike in
       * share. §13 sets its own grain where granularity is the subject. */
      { block2: { grain: 'fine' } },
    ],
    clearSticky: true,
    overlays: [
      centred('gpt-oss-120b', CMP_LEFT, 15, { size: 'sm', sticky: true }),
      centred('GLM-5.3-Flash', CMP_RIGHT, 15, { size: 'sm', sticky: true }),
      centred('≈4% active', CMP_LEFT, 56, { size: 'sm', tone: 'claim', sticky: true }),
      centred('≈6% active', CMP_RIGHT, 56, { size: 'sm', tone: 'claim', sticky: true }),
    ],
  },
  {
    n: 5,
    id: 'expect-a-small-difference',
    title: 'The models hold while the viewer predicts the hardware gap',
    relation: 'want',
    secs: 11,
    vo: 'Pretty close. So if I asked you which one needs more hardware… you’d probably expect the difference to be pretty small.',
    commands: [],
    /*
     * An explicit width, and centred in the gap the accelerators are about to
     * fill, so beat 6 answers the question **in the place it was asked**.
     * `centred` is not used here: it is a 54%-wide box, and a backed note that
     * wide paints a band across the whole frame instead of a card.
     */
    overlays: [
      note('SMALL DIFFERENCE?', 50, 68, { size: 'md', backed: true, rotate: -1, width: '24%' }),
    ],
  },
  {
    n: 6,
    id: 'it-isnt-one-accelerator',
    title: 'One 80 GB accelerator lands under the left model',
    relation: 'and-yet',
    secs: 8,
    vo: 'It isn’t. This one can fit on a single 80-gigabyte accelerator.',
    /* `Rig` reserves two rows of height whether or not the second row is used,
     * so this one card and the eight in beat 7 rest on the same baseline. The
     * comparison has to be seeable, not measurable. */
    commands: [rigA.show(1, { x: CMP_LEFT, y: 70 }, 1)],
    overlays: [centred('1 × 80 GB', CMP_LEFT, 79, { tone: 'measure', sticky: true })],
  },
  {
    n: 7,
    id: 'this-one-takes-eight',
    title: 'GLM counts up to eight accelerators, one visible step at a time',
    relation: 'and-yet',
    secs: 8,
    vo: 'Keeping this one fully resident at the precision it ships in takes eight.',
    commands: [rigB.show(1, { x: CMP_RIGHT, y: 70 }, 1)],
    stages: [
      { at: 700, commands: [rigB.show(2)] },
      { at: 1500, commands: [rigB.show(4)] },
      { at: 2500, commands: [rigB.show(8)] },
    ],
    overlays: [
      centred('8 × 80 GB', CMP_RIGHT, 79, { tone: 'cost', sticky: true }),
      centred('native shipped precision · weights resident', CMP_RIGHT, 87, { size: 'sm' }),
    ],
  },
  {
    n: 8,
    id: 'same-promise-different-machine',
    title: 'The 4%/6% comparison holds above one accelerator versus eight',
    relation: 'wall',
    secs: 10,
    vo: 'Same basic promise: most of the model is inactive. Completely different machine.',
    commands: [],
    /* Spans *both* blocks. The share has been written twice, once per model;
     * drawing it as one measurement across the pair is the sentence "almost
     * the same" in the grammar of the page. 59, not 63: lower than this and
     * the label lands on the top row of the eight accelerators. */
    overlays: [
      brace('almost the same active share', CMP_LEFT - CMP_HALF, 59, CMP_RIGHT - CMP_LEFT + CMP_HALF * 2, {
        tone: 'claim',
        side: 'bottom',
      }),
    ],
  },
  {
    n: 9,
    id: 'a-stranger-question',
    title: 'The comparison leaves; the same GLM block returns to centre',
    relation: 'therefore',
    secs: 5,
    vo: 'And that raises a much stranger question.',
    commands: [
      block2.off(),
      rigA.off(),
      rigB.off(),
      block.moveTo({ x: 50, y: HERO_Y }, HERO_SCALE),
    ],
    clearSticky: true,
    overlays: [centred('GLM-5.3-Flash', 50, 15, { size: 'sm', sticky: true })],
  },
  {
    n: 10,
    id: 'which-eighteen-billion',
    title: 'A dashed alternative patch appears while the real active patch stays lit',
    relation: 'want',
    secs: 8,
    vo: 'When they say 18 billion parameters are active… which 18 billion?',
    commands: [block.ghost('b')],
    /* Solid orange is what runs; the washed outline is what *could*. Both are
     * regions of the same size, because the question is only about location --
     * a smaller or fainter hypothesis would answer the question the frame is
     * supposed to be asking. */
    overlays: [
      note('running', 50 + HERO_HALF + 2, 34, { size: 'sm', tone: 'claim' }),
      note('or here?', 50 + HERO_HALF + 2, 42, { size: 'sm' }),
    ],
  },
  {
    n: 11,
    id: 'are-they-sitting-together',
    title: 'The active marks stay visibly scattered; a question brackets the region',
    relation: 'want',
    secs: 6,
    vo: 'Are they sitting together somewhere inside the model?',
    commands: [block.ghost(undefined)],
    overlays: [centred('one fixed place?', 50, 82, { size: 'md', rotate: -2 })],
  },
  {
    n: 12,
    id: 'same-eighteen-every-time',
    title: 'The hypothetical active outline moves to different places',
    relation: 'want',
    secs: 6,
    vo: 'Are they the same 18 billion every time?',
    commands: [block.ghost('b')],
    stages: [
      { at: 1600, commands: [block.ghost('c')] },
      { at: 3300, commands: [block.ghost('b')] },
    ],
  },
  {
    n: 13,
    id: 'does-it-know-before-you-ask',
    title: 'The alternatives clear; the intact model holds before any prompt exists',
    relation: 'want',
    secs: 9,
    vo: 'Does the model already know which ones it’s going to need before you ask it anything?',
    commands: [block.ghost(undefined)],
    overlays: [centred('known before the prompt?', 50, 82, { size: 'md', rotate: 2 })],
  },
  {
    n: 14,
    id: 'keep-the-useful-part',
    title: 'The active patch lifts out again as the tempting plan becomes concrete',
    relation: 'therefore',
    secs: 12,
    vo: 'Because if the answer to those questions were simple… you really could just keep the useful part and forget the rest.',
    commands: [block.lift()],
    overlays: [centred('KEEP READY?', 50 + HERO_HALF + 4, 18, { size: 'md', rotate: -2 })],
  },
  {
    n: 15,
    id: 'follow-one-piece-instead',
    title: 'The patch returns; GLM moves right and the familiar chat enters',
    relation: 'and-yet',
    secs: 15,
    vo: 'But that’s not what happens. And the easiest way to understand why is not with a giant architecture diagram. We’re going to follow one tiny piece of text through the entire model.',
    commands: [
      block.drop(),
      /* Both anchors chosen so the chat and the block share one horizontal
       * centre line at 46%. They are about to be joined by an arrow, and an
       * arrow that has to climb reads as a correction rather than a delivery. */
      block.moveTo({ x: 76, y: 40.5 }, 0.48),
      chat.open({ x: 33, y: 46 }, 0.82, 'GLM-5.3-Flash'),
    ],
    clearSticky: true,
    overlays: [centred('GLM-5.3-Flash', 76, 22, { size: 'sm', sticky: true })],
  },
  {
    n: 16,
    id: 'type-the-running-prompt',
    title: 'The one real prompt types into the chat; no token exists yet',
    relation: 'so',
    secs: 10,
    vo: 'Just one. Let’s type: “The dog dropped the ball, and it…”',
    commands: [chat.type('The dog dropped the ball, and it')],
    overlays: [centred('exact prompt used for the tokenizer', 33, 69, { size: 'sm', tone: 'word' })],
  },
  {
    n: 17,
    id: 'follow-it',
    title: 'Typing stops; an arrow identifies the final “it” without detaching it from the sentence',
    relation: 'therefore',
    secs: 14,
    vo: 'And we’re going to follow “it.” By the time that little piece reaches the other side, the whole 320 billion versus 18 billion thing should finally make sense.',
    commands: [chat.sent()],
    overlays: [
      note('follow “it”', 34, 70, { size: 'md', tone: 'word', rotate: -3, sticky: true }),
      /* Lands on the last word of the prompt itself. It used to stop at y 615,
       * which is the empty part of the transcript below the text -- pointing
       * at nothing, in a beat whose whole job is to pick one word out. */
      arrow({ x: 715, y: 735 }, { x: 818, y: 452 }, { tone: 'word' }),
    ],
  },
  {
    n: 18,
    id: 'it-doesnt-start-with-words',
    title: 'Send is committed; a causal path begins toward GLM and stops halfway',
    relation: 'wall',
    secs: 13,
    vo: 'So first: when you type this sentence into the model… what does the model actually receive? Because it doesn’t start with words.',
    commands: [],
    clearSticky: true,
    overlays: [
      /*
       * Starts *outside* the chat's right edge and stops short of the block.
       * It began inside the window in the first pass, which read as something
       * leaving the transcript rather than leaving the app -- and it must stop
       * short, because what arrives at the model is exactly what §2 is owed.
       */
      arrow({ x: 975, y: 497 }, { x: 1180, y: 497 }, { tone: 'word', dashed: true, label: '?' }),
    ],
  },
]
