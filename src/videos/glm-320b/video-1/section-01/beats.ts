import { arrow, brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import { block, block2, chat, ground, rigA, rigB, type Patch } from './scene'

/**
 * Section 01 — The five-percent problem.
 *
 * Rewrite v1: the opening does one job. It lets the viewer form the tempting
 * model "~5% active should mean ~5% of the hardware", breaks that prediction
 * with the 1-vs-8 comparison, then turns the failure into the question the
 * rest of the video will answer: which 18B are active, and when is that known?
 *
 * No tower, 45 floors, 288 experts, 336 visits, router, or MoE language here.
 * Those numbers are useful only after the viewer knows what they count.
 *
 * **Layout note, because every overlay in this section depends on it.**
 * `Block` reserves 168 SVG units of headroom above the drawn box so the lifted
 * patch has somewhere to go. The consequence is that the box does *not* centre
 * on its Slot anchor -- it sits lower:
 *
 *   drawn centre y ≈ anchor y + 11.6 × scale      (% of frame height)
 *   drawn height   ≈ 56.9 × scale,  width ≈ 51.4 × scale
 *
 * Anchors below are chosen from those three lines. Changing a `scale` without
 * re-deriving its `y` is what put "18B active" through the block's top border
 * in the first pass.
 */

/* Two-model comparison: both blocks, and everything measuring them. */
const CMP_SCALE = 0.52
const CMP_Y = 32 // drawn centre 38 · top 23 · bottom 53
const CMP_LEFT = 27
const CMP_RIGHT = 73
/** Half the drawn width of a comparison block, for braces that must span one. */
const CMP_HALF = (51.4 * CMP_SCALE) / 2

/* Single-model hero: beats 1-2 and again 9-13. */
const HERO_SCALE = 0.8
const HERO_Y = 41 // drawn centre 50 · top 27 · bottom 73
const HERO_HALF = (51.4 * HERO_SCALE) / 2

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'three-twenty-eighteen-active',
    title: 'GLM arrives as one model; a small region lights',
    relation: 'want',
    secs: 10,
    /*
     * The brace measures the *box*; the note names the *orange*. Two different
     * jobs, so two different marks -- a second floating note would have made
     * the viewer decide which number belonged to which thing, and the whole
     * beat is the relationship between them.
     */
    vo: 'Three hundred and twenty billion parameters. Only eighteen billion active. Sounds like most of the model isn’t doing anything, right?',
    commands: [
      ground.at(GROUND_Y),
      block.scatter({ x: 50, y: HERO_Y }, HERO_SCALE),
      block.pack(),
      block.light('a'),
    ],
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
    id: 'keep-the-small-part',
    title: 'The active region lifts out as the tempting plan',
    relation: 'therefore',
    secs: 10,
    vo: 'So here’s the obvious guess: if only a small part is working, you should only need that small part close by.',
    commands: [block.lift()],
    overlays: [note('keep this part?', 50 + HERO_HALF + 2, 21, { size: 'md', rotate: -3 })],
  },
  {
    n: 3,
    id: 'two-models-same-share',
    title: 'A second model arrives; both show about five percent active',
    relation: 'therefore',
    secs: 8,
    /*
     * The share is written under *each* block rather than once in the gutter.
     * A single label between two objects makes the viewer assign it, and the
     * claim beat 7 has to break is that the number is true of **both**.
     */
    vo: 'Let’s test that. These two models both use about five percent of themselves for each token.',
    commands: [
      block.drop(),
      block.moveTo({ x: CMP_RIGHT, y: CMP_Y }, CMP_SCALE),
      block2.arrive({ x: CMP_LEFT, y: CMP_Y }, CMP_SCALE),
      block2.light('b'),
      { block2: { grain: 'fine' } },
    ],
    clearSticky: true,
    overlays: [
      centred('gpt-oss-120b', CMP_LEFT, 15, { size: 'sm', sticky: true }),
      centred('GLM-5.3-Flash', CMP_RIGHT, 15, { size: 'sm', sticky: true }),
      centred('about 5% active', CMP_LEFT, 56, { size: 'sm', tone: 'claim', sticky: true }),
      centred('about 5% active', CMP_RIGHT, 56, { size: 'sm', tone: 'claim', sticky: true }),
    ],
  },
  {
    n: 4,
    id: 'make-a-fair-guess',
    title: 'The viewer commits only to similar or very different hardware',
    relation: 'want',
    secs: 7,
    /*
     * The two choices sit exactly where the accelerators are about to land, so
     * beat 5 answers the question **in the place the question was asked**
     * rather than somewhere else on the page.
     */
    vo: 'Same percentage. So make a guess: roughly similar hardware, or wildly different?',
    commands: [],
    overlays: [
      /*
       * An explicit narrow width, **not** `centred`. `centred` is a 54%-wide
       * box, and two of them painted their backings into a single band across
       * the whole frame -- one banner where the beat needs two things you are
       * choosing between.
       */
      note('ROUGHLY SIMILAR', CMP_LEFT, 68, { size: 'md', backed: true, rotate: -1, width: '21%' }),
      note('WILDLY DIFFERENT', CMP_RIGHT, 68, { size: 'md', backed: true, rotate: 1, width: '21%' }),
    ],
  },
  {
    n: 5,
    id: 'one-accelerator',
    title: 'One accelerator lands under the left model',
    relation: 'so',
    secs: 5,
    /*
     * `Rig` reserves two rows of height whether or not the second row is used,
     * so this one card and the eight in beat 6 rest on the same baseline. The
     * comparison has to be seeable, not measurable.
     */
    vo: 'This one fits on a single eighty-gigabyte accelerator.',
    commands: [rigA.show(1, { x: CMP_LEFT, y: 70 }, 1)],
    overlays: [centred('1 × 80 GB', CMP_LEFT, 79, { tone: 'measure', sticky: true })],
  },
  {
    n: 6,
    id: 'eight-accelerators',
    title: 'GLM counts up to eight accelerators',
    relation: 'and-yet',
    secs: 8,
    /* They arrive in stages rather than all at once because the beat is a
     * *count*. Eight appearing together is a quantity; eight arriving is an
     * event, and it is the event the next beat argues from. */
    vo: 'To keep GLM fully loaded at the precision it ships in, you need eight.',
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
    n: 7,
    id: 'same-share-different-machine',
    title: 'The contradiction is allowed to sit',
    relation: 'and-yet',
    secs: 13,
    /* The brace spans *both* blocks. Up to here the share has been written
     * twice, once per model; drawing it as one measurement across the pair is
     * the sentence "same headline share" in the grammar of the page. */
    vo: 'Same basic idea: most of the model stays inactive. But the hardware is nowhere close. So "five percent active" clearly isn’t telling us the whole story.',
    commands: [],
    overlays: [
      /* 59, not 61: at 61 the brace's label landed on the top row of the
       * eight accelerators. `npm run check:overlap` is what caught it. */
      brace('the same headline share', CMP_LEFT - CMP_HALF, 59, CMP_RIGHT - CMP_LEFT + CMP_HALF * 2, {
        tone: 'claim',
        side: 'bottom',
      }),
    ],
  },
  {
    n: 8,
    id: 'parameter-in-one-line',
    title: 'One small note gives parameter just enough meaning',
    relation: 'so',
    secs: 11,
    /* Pointed at a real mark inside GLM rather than parked in the margin: the
     * word is being defined by *indication*, which is the cheapest definition
     * there is and the only one this section can afford. */
    vo: 'And if "parameter" is a fuzzy word, don’t worry. For now, just think of it as one learned number inside the model.',
    commands: [],
    overlays: [
      /*
       * The arrow lands on an **idle** cell, not on an orange one. Pointing
       * "one mark = one learned number" at a lit patch would quietly redefine
       * parameter as *active* parameter, which is the exact confusion the rest
       * of the section is trying to take apart.
       */
      note('one mark =\none learned number', 41.5, 41, { size: 'sm', tone: 'measure', backed: true }),
      arrow({ x: 1090, y: 452 }, { x: 1186, y: 424 }, { tone: 'measure' }),
    ],
  },
  {
    n: 9,
    id: 'back-to-glm',
    title: 'The comparison leaves; the same GLM block returns to centre',
    relation: 'therefore',
    secs: 5,
    /* The eight cards come with it. They are the reason the next question is
     * worth asking, and sending them off stage here would make beat 10 a fresh
     * curiosity instead of an unpaid bill. */
    vo: 'So here’s the question I actually care about.',
    commands: [
      block2.off(),
      rigA.off(),
      block.moveTo({ x: 50, y: HERO_Y - 4 }, HERO_SCALE),
      rigB.show(8, { x: 50, y: 80 }, 0.68),
    ],
    clearSticky: true,
    overlays: [centred('GLM-5.3-Flash', 50, 12, { size: 'sm', sticky: true })],
  },
  {
    n: 10,
    id: 'which-eighteen',
    title: 'A second possible patch appears without changing the real active patch',
    relation: 'want',
    secs: 8,
    /* Solid orange is what runs; the washed yellow outline is what *could*.
     * Both are regions of the same size, because the question is only about
     * location -- if the hypothesis were drawn smaller or fainter the frame
     * would be answering the question it is supposed to be asking. */
    vo: 'When GLM says eighteen billion are active... which eighteen billion?',
    commands: [block.ghost('b')],
    overlays: [
      centred('which eighteen billion?', 50, 18, { size: 'md', tone: 'claim' }),
      note('running', 50 + HERO_HALF + 2, 34, { size: 'sm', tone: 'claim' }),
      note('or here?', 50 + HERO_HALF + 2, 42, { size: 'sm' }),
    ],
  },
  {
    n: 11,
    id: 'could-be-somewhere-else',
    title: 'Only the hypothetical outline moves',
    relation: 'so',
    secs: 9,
    /* The real patch does not move on any of these stages. That is the whole
     * content of the beat: one of these two things is knowledge and the other
     * is a guess, and the guess is the only one allowed to wander. */
    vo: 'Maybe they’re always the same ones. Or maybe the useful part can be somewhere else. We don’t know yet.',
    commands: [],
    stages: [
      { at: 1700, commands: [block.ghost('c')] },
      { at: 3500, commands: [block.ghost('b')] },
    ],
  },
  {
    n: 12,
    id: 'the-tempting-plan',
    title: 'If the subset were fixed, take it out and keep it ready',
    relation: 'therefore',
    secs: 8,
    vo: 'Because if they are fixed, our idea works: keep that part ready, and leave the rest alone.',
    commands: [block.ghost(undefined), block.lift()],
    overlays: [centred('KEEP READY?', 50 + HERO_HALF + 4, 18, { size: 'md', rotate: -2 })],
  },
  {
    n: 13,
    id: 'turn-it-into-an-experiment',
    title: 'The patch returns; the whole model becomes the experiment',
    relation: 'therefore',
    secs: 11,
    vo: 'So rather than guessing, we’re going to follow one real prompt through this model and watch exactly what gets used, when, and why.',
    commands: [block.drop(), rigB.off()],
    clearSticky: true,
    /* The name goes straight back up. Clearing the sticky overlays takes it
     * with them, and this beat holds for eleven seconds -- long enough for an
     * unlabelled box to stop being *this* model and start being a diagram. */
    overlays: [centred('GLM-5.3-Flash', 50, 15, { size: 'sm', sticky: true })],
  },
  {
    n: 14,
    id: 'chat-enters-beside-model',
    title: 'The model moves right and a chat window enters on the same stage',
    relation: 'so',
    secs: 6,
    /* Both anchors are chosen so the chat and the block share one horizontal
     * centre line at 46%. They are about to be joined by an arrow, and an
     * arrow that has to climb reads as a correction rather than a delivery. */
    vo: 'And we’ll do it with one example all the way through.',
    commands: [
      block.moveTo({ x: 76, y: 40.5 }, 0.48),
      chat.open({ x: 33, y: 46 }, 0.82, 'GLM-5.3-Flash'),
    ],
    /* The block's centred title has to go with it when the block moves right,
     * or the name is on screen three times at once -- twice as handwriting and
     * once on the window chrome. */
    clearSticky: true,
    overlays: [centred('GLM-5.3-Flash', 76, 22, { size: 'sm', sticky: true })],
  },
  {
    n: 15,
    id: 'type-the-running-prompt',
    title: 'The measured running prompt types into the chat',
    relation: 'so',
    secs: 8,
    vo: 'Let’s use: "The dog dropped the ball, and it".',
    commands: [chat.type('The dog dropped the ball, and it')],
  },
  {
    n: 16,
    id: 'one-piece-next',
    title: 'The intact human sentence holds; no token exists on screen yet',
    relation: 'so',
    secs: 8,
    vo: 'Once it breaks apart, we’ll pick one piece and keep following that same piece through the machine.',
    commands: [chat.sent()],
    overlays: [centred('still the text you typed', 33, 66, { size: 'sm', tone: 'word' })],
  },
  {
    n: 17,
    id: 'what-arrives-first',
    title: 'A causal path starts from chat toward GLM and stops halfway',
    relation: 'wall',
    secs: 8,
    /*
     * The arrow starts *outside* the chat's right edge and stops short of the
     * block. It began inside the window in the first pass, which read as
     * something leaving the transcript rather than leaving the app -- and it
     * must stop short, because what arrives at the model is exactly the thing
     * §2 is owed.
     */
    vo: 'I hit send. What is the first thing the model actually receives?',
    commands: [],
    overlays: [
      arrow({ x: 975, y: 497 }, { x: 1180, y: 497 }, { tone: 'word', dashed: true, label: '?' }),
    ],
  },
]
