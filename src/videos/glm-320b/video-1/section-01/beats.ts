import { brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  CHOSEN,
  big,
  block,
  chat,
  count,
  tower,
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
  /* ═══ ACT 1 · THE SCREEN, AND WHAT IS BEHIND IT ═════════════════════════
   *
   * Six beats, about twenty-eight seconds, and the whole job is to make the
   * viewer want the next twenty-nine minutes.
   *
   * **Why it starts on a chat window.** The section used to open on two
   * abstract sheets and a statistic, and Ahmad kept returning to it: *"it's
   * not something I'd say I want to watch the whole video for."* His own
   * diagnosis is the one that stuck -- *"it's like I'm flying the airplane in
   * the ocean and nobody knows what's happening, they're seeing the ocean and
   * don't understand."* The frame had no coastline. A tower and a wall of 288
   * mean nothing at second zero, because nothing has told the viewer what they
   * are or where they live.
   *
   * A chat window needs no explaining. Everyone watching has typed into one
   * and waited. So the video stands on that, and then goes **behind** it --
   * which is a story rather than a diagram: familiar world, something odd
   * about it, go and look, and what you find is absurd.
   *
   * The absurdity is the hook, and it is a **disproportion**, not a number:
   * one small word on a screen against forty-five floors, two hundred and
   * eighty-eight specialists and three hundred and thirty-six trips. The
   * viewer feels it before a single term is defined -- and then beat 7 tells
   * them that everybody calls this thing efficient, which now reads as an
   * accusation rather than a statistic.
   *
   * Nothing here is explained. Beats 13-23 explain all of it. Show, then name.
   */
  {
    n: 1,
    id: 'you-ask-it-something',
    title: 'A chat window. A question types itself in.',
    relation: 'want',
    secs: 5,
    /*
     * No title card, no "today we're talking about". The model's name sits
     * small and grey on the window chrome where a product label really goes --
     * findable, never announced. `paper/cast/Chat.tsx`.
     */
    vo: 'You type something into one of these.',
    commands: [chat.open({ x: 50, y: 46 }, 1, 'GLM-5.3-Flash')],
    stages: [{ at: 700, commands: [chat.type('why is the sky blue?')] }],
  },
  {
    n: 2,
    id: 'one-word-comes-back',
    title: 'It answers. One word, and it stops there.',
    relation: 'so',
    secs: 4,
    /* It stops on one word on purpose. The whole opening is the cost of
     * *that* word, and a full sentence would make it the cost of a paragraph
     * -- which is a different, larger, less checkable claim. */
    vo: 'And it starts answering. One word.',
    commands: [chat.sent()],
    stages: [{ at: 1400, commands: [chat.reply('Because')] }],
  },
  {
    n: 3,
    id: 'behind-the-screen',
    title: 'The window turns edge-on and we pass behind it',
    relation: 'and-yet',
    secs: 5,
    /*
     * The section's one real move, and it is a *turn*, not a cut. A cut would
     * make what follows a new subject; going behind the screen keeps it the
     * same one -- the word stays on the glass at the left edge for the next
     * three beats, so everything that appears is visibly the cost *of that*.
     */
    vo: 'Here is what happened behind that one word.',
    commands: [
      chat.turn(),
      chat.moveTo({ x: 13, y: 46 }, 0.46),
      narrator.at({ x: 91, y: 70 }, 'point', 1, true),
    ],
  },
  {
    n: 4,
    id: 'forty-five-floors',
    title: 'A tower rises behind the glass',
    relation: 'so',
    secs: 4,
    /* Unexplained, and large. §7 is where forty-five becomes an argument;
     * here it is only a size. */
    vo: 'It went up forty-five floors.',
    commands: [tower.rise({ x: 52, y: 48 }, 0.6), narrator.pose('reach')],
  },
  {
    n: 5,
    id: 'a-room-of-two-eighty-eight',
    title: 'Behind the tower, a room with 288 in it',
    relation: 'so',
    secs: 7,
    /*
     * "Most of those floors" -- 42 of 45, and the section may not say "layer"
     * yet. Claim only what is on screen and let §7 do the arithmetic.
     */
    vo: 'On most of those floors, a room with two hundred and eighty-eight specialists in it.',
    commands: [
      tower.moveTo({ x: 30, y: 48 }, 0.48),
      hospital.rise({ x: 66, y: 46 }, 0.58),
      hospital.staff(),
      narrator.pose('count'),
    ],
  },
  {
    n: 6,
    id: 'three-thirty-six-for-one-word',
    title: 'A counter runs up to 336 under the whole thing',
    relation: 'wall',
    secs: 6,
    /*
     * The hook, and it is a **disproportion** rather than a figure: the word
     * is still on the glass at the left of frame while the count runs. 336 is
     * 8 routed experts x 42 sparse layers, measured -- `GROUND_TRUTH.md`.
     */
    vo: 'Three hundred and thirty-six of them got pulled in. For that one word.',
    commands: [count.run(336, 'experts — for one word'), narrator.pose('slump')],
  },

  /* ═══ ACT 2 · THE CLAIM (S-01) ══════════════════════════════════════════
   * Now the statistic lands, and it lands as an accusation: the viewer has
   * just watched the disproportion themselves, so "only five percent runs"
   * arrives as something to be angry about rather than something to learn. */
  {
    n: 7,
    id: 'only-five-percent-runs',
    title: 'The machinery clears; two model sheets arrive, both five percent lit',
    relation: 'and-yet',
    secs: 9,
    /*
     * The statistic, *after* the disproportion rather than instead of it. The
     * viewer has just watched 336 trips buy one word, so "only five percent
     * runs" is something to be angry about, not something to be taught.
     */
    vo: 'And they tell you only about five percent of it ever runs. Here are two models. Both about five percent.',
    commands: [
      chat.off(),
      tower.off(),
      hospital.off(),
      count.off(),
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
    n: 8,
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
    n: 9,
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
    n: 10,
    id: 'the-number-everybody-quotes',
    title: 'The number everybody quotes',
    relation: 'and-yet',
    secs: 9,
    /* S-02, the inversion: the fact was the setup, the payload is that it
     * implicates you. Beat 7 now carries "everyone quotes that number", so
     * this beat keeps only the turn. */
    vo: 'Both of them have that number. Only one of them is actually cheap to own.',
    commands: [narrator.pose('confide')],
    overlays: [centred('“only 5% active”', 51, 20, { size: 'md', rotate: -2, sticky: true })],
  },
  {
    n: 11,
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
    n: 12,
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
    n: 13,
    id: 'this-is-the-model',
    title: 'The model, whole',
    relation: 'so',
    secs: 5,
    vo: 'This is the model. All of it.',
    commands: [block.light(undefined), narrator.pose('point')],
  },
  {
    n: 14,
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
    n: 15,
    id: 'five-percent-lights',
    title: 'Five percent goes live',
    relation: 'so',
    secs: 7,
    vo: 'And when a token comes in, about five percent of them do something.',
    commands: [block.pack(), block.light('a'), word.arrive({ x: 13, y: 47 }, 0.9, 'dog')],
  },
  {
    n: 16,
    id: 'push-in',
    title: 'The camera pushes into the block',
    relation: 'so',
    secs: 3,
    /* The only camera move in the section. skills/SPATIAL_CONTINUITY.md. */
    vo: 'Let’s get closer.',
    commands: [word.off(), block.moveTo({ x: 52, y: 46 }, 2.6), narrator.off()],
  },
  {
    n: 17,
    id: 'two-eighty-eight',
    title: 'The surface resolves into the room from beat 5',
    relation: 'so',
    secs: 9,
    /*
     * "In each part of the model" was too broad: it is 288 per *sparse* layer,
     * and 3 of the 45 layers have no experts at all. §1 may not say "layer",
     * so the true form is to claim only what is on screen -- **this** part has
     * 288 in it -- and let §7 establish how many such parts there are.
     */
    /* A **return**, not an introduction: beat 5 already put this room behind
     * the screen. Saying it twice as news wasted eight seconds and taught the
     * viewer that the opening had not counted. */
    vo: 'That room again. Two hundred and eighty-eight separate pieces — and this is one small part of the model.',
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
    n: 18,
    id: 'how-many-run',
    title: 'Nothing happens. The viewer bets.',
    relation: 'want',
    secs: 9,
    vo: 'Two hundred and eighty-eight of them. One word comes in. How many do you reckon actually run?',
    commands: [],
    overlays: [centred('how many run?', 50, 78, { size: 'md', rotate: 1 })],
  },
  {
    n: 19,
    id: 'eight',
    title: 'Eight',
    relation: 'and-yet',
    secs: 4,
    vo: 'Eight.',
    commands: [hospital.choose(CHOSEN)],
  },
  {
    n: 20,
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
    n: 21,
    id: 'not-the-whole-five-percent',
    title: 'Eight of 288 is not the five percent',
    relation: 'and-yet',
    secs: 11,
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
    vo: 'You might think that’s the five percent. It isn’t. This is one small part, and plenty more runs every time regardless. Hold onto that.',
    commands: [],
    overlays: [
      centred('8 of 288 — here', 50, 76, { size: 'md', rotate: -1 }),
      note('not 5% of the model', 50, 86, { tone: 'cost', rotate: 2 }),
    ],
  },

  /* ═══ ACT 5 · THE NAME AND THE WALL (S-12, S-14) ════════════════════════ */
  {
    n: 22,
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
    n: 23,
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
