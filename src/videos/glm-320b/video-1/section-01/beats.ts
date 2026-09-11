import { brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  CHOSEN,
  big,
  block,
  block2,
  rigA,
  rigB,
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
 * Script and board: `video-script/video-1/01-what-18-billion-active-means.md`
 * Checked by `npm run check:board` and `npm run timing -- --scripts`.
 *
 * **Script v10.** Every beat cites a strategy from `skills/STRATEGY_LEDGER.md`
 * -- see the Storyboard table in the script. The opening is a *comparison*,
 * not a number: two models with the same headline figure and eight times the
 * hardware between them, which `research/COMPETITIVE_FIELD.md` shows is the
 * one opening nobody else in the field is using. Two of the three competing
 * videos open the way v8 did.
 *
 * The section happens in one place for nine beats. The only camera move is the
 * push-in at beat 10, and the stillness before it is what makes it mean
 * something. Beat 12 is a held beat with nothing happening at all -- it is the
 * bet, and it needs the air.
 */

/* Layout anchors. Reflow the whole section from here. */
const BLOCK = { x: 52, y: 46 }
const BLOCK_S = 1
/** The block's left edge and width as stage percentages, for braces under it. */
const BLOCK_LEFT = 26
const BLOCK_W = 52

export const BEATS: Beat<Patch>[] = [
  /* ═══ ACT 1 · THE CONTRADICTION (S-01) ══════════════════════════════════
   * No product name, no spec table, no big number alone. Two objects, and a
   * difference between them the viewer can see. Complete by 0:13. */
  {
    n: 1,
    id: 'two-models',
    title: 'Two models, both five percent active',
    relation: 'want',
    secs: 6,
    vo: 'Two AI models. Both use about five percent of themselves to answer you.',
    commands: [
      ground.at(GROUND_Y),
      block.scatter({ x: 72, y: 42 }, 0.5),
      block.pack(),
      block.light('a'),
      block2.arrive({ x: 30, y: 42 }, 0.5),
      /* A *different* patch, deliberately: the two models are not active in the
       * same place, and the section's whole claim is that the share is the
       * same while everything else about it is not. */
      block2.light('b'),
      narrator.at({ x: 91, y: 70 }, 'point', 1, true),
    ],
    overlays: [centred('about 5% active', 51, 56, { size: 'sm', rotate: -1 })],
  },
  {
    n: 2,
    id: 'one-card',
    title: 'One chip',
    relation: 'so',
    secs: 4,
    /*
     * **"Chip", not "graphics card."** An 80 GB accelerator is not a gaming
     * GPU, and §13's truth notes say so in as many words. It matters more here
     * than as a wording nit: S-10 closes the video by redrawing this exact
     * frame and reusing its nouns, and §13 beat 7 says "fits on one chip". A
     * ring that opens on one noun and closes on another is not a ring.
     */
    vo: 'This one runs on a single chip.',
    commands: [rigA.show(1), narrator.pose('offer')],
    /* Sticky, because beat 3 is the comparison and a comparison needs both
     * halves on screen at once. Non-sticky, "one" vanished as "eight" arrived
     * and the contradiction never existed in a single frame. */
    overlays: [note('one', 27, 80, { tone: 'measure', sticky: true })],
  },
  {
    n: 3,
    id: 'eight-cards',
    title: 'Eight of them',
    relation: 'wall',
    secs: 3,
    /* The contradiction is complete here, at about 0:13. Checkable:
     * gpt-oss-120b is ~58 GiB at MXFP4 and fits one 80 GB card. GLM-5.3-Flash
     * is ~306 GiB = 328.6 GB at FP8, so it does *not* fit four cards' 320 GB,
     * and tensor-parallel size has to divide the 64 attention heads -- five is
     * enough arithmetically and impossible in practice. Eight.
     *
     * This said "four" for a long time, directly above a comment saying
     * ~306 GiB does not fit four. Nobody did the division.
     * `research/glm/GROUND_TRUTH.md` §"How many GPUs". */
    vo: 'This one needs eight.',
    commands: [rigB.show(8), narrator.pose('count')],
    overlays: [note('eight', 69, 80, { tone: 'cost', sticky: true })],
  },

  /* ═══ ACT 2 · THE INVERSION AND THE PROMISE (S-02, S-03) ════════════════
   * Trust's third move: the fact was the setup, the payload is that it
   * implicates you. STORY_SPINE.md §3 -- this audience already believes it
   * understands MoE, so name the belief back to them. */
  {
    n: 4,
    id: 'the-number-everybody-quotes',
    title: 'The number everybody quotes',
    relation: 'and-yet',
    secs: 9,
    vo: 'Everyone quotes that number to say these models are cheap now. Both have it. Only one of them is.',
    commands: [narrator.pose('confide')],
    overlays: [centred('“only 5% active”', 51, 20, { size: 'md', rotate: -2, sticky: true })],
  },
  {
    n: 5,
    id: 'unequal',
    title: 'Level above, unequal below',
    relation: 'and-yet',
    secs: 4,
    vo: 'Same five percent. Eight times the machine.',
    commands: [narrator.pose('weigh')],
    /* The brace spans both blocks: left block starts at ~17%, right ends at
     * ~85%. `brace`'s x is the LEFT EDGE, not the centre. */
    overlays: [brace('same share', 17, 63, 68, { tone: 'measure' })],
  },
  {
    n: 6,
    id: 'the-promise',
    title: 'The promise',
    relation: 'therefore',
    secs: 12,
    /* S-03. Sanderson's SoME criterion, verbatim: "It should be clear to the
     * reader/viewer within the first 30 seconds why they should care." This
     * lands at about 0:26. Withhold the mechanism, never the promise. */
    vo: 'By the end of this you’ll know exactly what that number buys you — and what it doesn’t. We’re going to follow one word all the way through.',
    commands: [
      block2.off(),
      rigA.off(),
      rigB.off(),
      block.moveTo({ x: 52, y: 46 }, 1),
      narrator.pose('reach'),
    ],
    clearSticky: true,
  },

  /* ═══ ACT 3 · NOW THE WORDS (S-04) ══════════════════════════════════════
   * Sanderson, Concrete before Abstract: let examples precede generality.
   * "Parameter" arrives at 0:40, after the block has been watched behaving
   * twice. v8 defined three terms inside twenty seconds. */
  {
    n: 7,
    id: 'this-is-the-model',
    title: 'The model, whole',
    relation: 'so',
    secs: 5,
    vo: 'This is the model. All of it.',
    commands: [block.light(undefined), narrator.pose('point')],
  },
  {
    n: 8,
    id: 'what-a-parameter-is',
    title: 'It breaks into marks',
    relation: 'so',
    secs: 13,
    vo: 'Three hundred and twenty billion numbers — that’s what there is to store. Each one is something it learned while it was being trained. That’s what a parameter is.',
    commands: [block.scatter({ x: 52, y: 46 }, 1), narrator.pose('count')],
    lateOverlays: {
      at: 3600,
      overlays: [centred('320,000,000,000', 50, 14, { size: 'md', rotate: -1 })],
    },
  },
  {
    n: 9,
    id: 'five-percent-lights',
    title: 'Five percent goes live',
    relation: 'so',
    secs: 7,
    vo: 'And when a token comes in, about five percent of them do something.',
    commands: [block.pack(), block.light('a'), word.arrive({ x: 13, y: 47 }, 0.9, 'dog')],
  },
  {
    n: 10,
    id: 'push-in',
    title: 'The camera pushes into the block',
    relation: 'so',
    secs: 3,
    /* The only camera move in the section. skills/SPATIAL_CONTINUITY.md. */
    vo: 'Let’s get closer.',
    commands: [word.off(), block.moveTo({ x: 52, y: 46 }, 2.6), narrator.off()],
  },
  {
    n: 11,
    id: 'two-eighty-eight',
    title: 'The surface resolves into 288',
    relation: 'so',
    secs: 12,
    /*
     * "In each part of the model" was too broad: it is 288 per *sparse* layer,
     * and 3 of the 45 layers have no experts at all. §1 may not say "layer",
     * so the true form is to claim only what is on screen -- **this** part has
     * 288 in it -- and let §7 establish how many such parts there are.
     */
    vo: 'Up close, it’s not one lump. This is one small part of the model — and there are two hundred and eighty-eight separate pieces in it.',
    commands: [block.off(), hospital.rise({ x: 52, y: 46 }, 0.86), hospital.staff(), ground.at(GROUND_Y)],
    lateOverlays: {
      at: 3400,
      overlays: [centred('288', 50, 12, { size: 'md', rotate: -2, sticky: true })],
    },
  },

  /* ═══ ACT 4 · THE BET (S-05) ════════════════════════════════════════════
   * One of only two hard bets in the whole video; the other is §7. Spent here
   * because eight of 288 is 2.8% and nobody guesses that low. Richland,
   * Kornell & Kao (2009): the wrong guess still helps. The guess and the
   * answer occupy the same space -- the 288 do not move between 12 and 13. */
  {
    n: 12,
    id: 'how-many-run',
    title: 'Nothing happens. The viewer bets.',
    relation: 'want',
    secs: 9,
    vo: 'Two hundred and eighty-eight of them. One word comes in. How many do you reckon actually run?',
    commands: [],
    overlays: [centred('how many run?', 50, 78, { size: 'md', rotate: 1 })],
  },
  {
    n: 13,
    id: 'eight',
    title: 'Eight',
    relation: 'and-yet',
    secs: 4,
    vo: 'Eight.',
    commands: [hospital.choose(CHOSEN)],
  },
  {
    n: 14,
    id: 'the-other-280',
    title: 'The other 280 do nothing',
    relation: 'so',
    secs: 9,
    /*
     * **280 is correct, and the detour that got here is worth recording.**
     *
     * A review said this beat omitted the always-on shared expert, which was
     * true. My first fix said "279 idle, one always on" -- and that was a new
     * and worse error, because `n_routed_experts` is 288 and
     * `n_shared_experts` is 1 *on top of it*. The shared expert is not one of
     * the 288. Of the 288 routed, 8 run and **280** do not.
     *
     * The shared expert is therefore a 289th object this section has no frame
     * for, and a floating "always on" label pointing at nothing was worse than
     * silence -- the render made that obvious. It is introduced properly in §5
     * beat 10, which has a picture of it. §1 must simply not imply the 288 are
     * everything, which the next beat now handles.
     */
    vo: 'Eight get picked. The other two hundred and eighty do nothing at all.',
    commands: [hospital.idle('280 idle')],
  },
  {
    n: 15,
    id: 'not-the-whole-five-percent',
    title: 'Eight of 288 is not the five percent',
    relation: 'and-yet',
    secs: 15,
    /*
     * **The fix that matters most in this section.**
     *
     * v10 said "there's your five percent, that's where it comes from" over a
     * frame of eight lit experts. That is the one error `GROUND_TRUTH.md`
     * warns is disqualifying: 8 / 288 is 2.8% of the routed weight in *one*
     * sparse layer; 18 / 321 is 5.6% of the *model*. Neither causes the other,
     * and the routed experts are under half the active path -- attention, the
     * embeddings, the dense layers and the shared expert are on regardless.
     *
     * So the beat now does the opposite job: it *refuses* the easy sum. That
     * is stronger anyway, because the question it leaves -- then where does the
     * five percent come from? -- is what §7 answers with 336 and §11 prices.
     */
    vo: 'You might think that’s the five percent. It isn’t — this is one small part of the model, and there’s more in here than these, and plenty that runs every time regardless. Hold onto that.',
    commands: [],
    overlays: [
      centred('8 of 288 — here', 50, 76, { size: 'md', rotate: -1 }),
      note('not 5% of the model', 50, 86, { tone: 'cost', rotate: 2 }),
    ],
  },

  /* ═══ ACT 5 · THE NAME AND THE WALL (S-12, S-14) ════════════════════════ */
  {
    n: 16,
    id: 'mixture-of-experts',
    title: 'It takes its name',
    relation: 'so',
    secs: 9,
    /* S-12, tier C -- named at the close, after it has been watched working.
     * The one inferred strategy in this section, and the ledger says so. It is
     * also the first time the whole video says "Mixture of Experts" out loud. */
    vo: 'And this has a name. It’s called a Mixture of Experts. Those pieces are the experts.',
    commands: [hospital.label('Mixture of Experts', 'the experts')],
  },
  {
    n: 17,
    id: 'who-picks-the-eight',
    title: 'The chapter wall',
    relation: 'and-yet',
    secs: 9,
    /* The handoff. §2 opens by banking exactly this. STORY_SPINE.md §5. */
    vo: 'So — who picks the eight? And why does that turn out to be the expensive question?',
    commands: [
      hospital.moveTo({ x: 58, y: 46 }, 0.72),
      desk.arrive({ x: 17, y: 74 }, 0.8),
      narrator.at({ x: 91, y: 70 }, 'wonder', 1, true),
    ],
    clearSticky: true,
  },
]
