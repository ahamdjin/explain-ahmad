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
 * -- see the Storyboard table in the script. The opening starts on a familiar
 * chat, goes behind it, then turns the mechanism into a hardware contradiction.
 */

/* Layout anchors. Reflow the whole section from here. */
const BLOCK = { x: 52, y: 46 }
const BLOCK_S = 1
/** The block's left edge and width as stage percentages, for braces under it. */
const BLOCK_LEFT = 26
const BLOCK_W = 52

export const BEATS: Beat<Patch>[] = [
  /* ═══ ACT 1 · THE SCREEN, AND WHAT IS BEHIND IT ═════════════════════════
   * Six beats. Familiar world first, then the disproportion behind one token.
   * The promise now starts on beat 6 instead of waiting until the hardware
   * comparison has finished. */
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
    title: 'The promise lands, then the counter runs to 336',
    relation: 'wall',
    secs: 14,
    /*
     * 336 is **visits/uses**, not 336 distinct experts. The old "336 of them"
     * wording taught the wrong object. The counter is staged after the promise
     * phrase so the visual and its ratchet do not finish before the VO reaches
     * "Across that climb...".
     */
    vo: 'By the end, you’ll know why using only a small part can still mean a huge machine. Across that climb, those specialists got used three hundred and thirty-six times. For one token.',
    commands: [narrator.pose('slump')],
    stages: [{ at: 5000, commands: [count.run(336, 'uses — one token')] }],
  },

  /* ═══ ACT 2 · THE CLAIM (S-01) ══════════════════════════════════════════
   * Now the statistic lands after the disproportion, so the hardware
   * comparison has something concrete to contradict. */
  {
    n: 7,
    id: 'only-five-percent-runs',
    title: 'The machinery clears; two model sheets arrive, both five percent lit',
    relation: 'and-yet',
    secs: 9,
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
    overlays: [note('one', 27, 80, { tone: 'measure', sticky: true })],
  },
  {
    n: 9,
    id: 'eight-cards',
    title: 'Eight of them',
    relation: 'wall',
    secs: 3,
    /* Checkable: gpt-oss-120b is ~58 GiB at MXFP4 and fits one 80 GB card.
     * GLM-5.3-Flash is ~306 GiB = 328.6 GB at FP8, so four 80 GB cards are
     * insufficient; tensor-parallel size must divide the 64 attention heads,
     * making eight the smallest workable size. `GROUND_TRUTH.md`. */
    vo: 'This one needs eight.',
    commands: [rigB.show(8), narrator.pose('count')],
    overlays: [note('eight', 69, 80, { tone: 'cost', sticky: true })],
  },
  {
    n: 10,
    id: 'the-number-everybody-quotes',
    title: 'The number everybody quotes',
    relation: 'and-yet',
    secs: 9,
    vo: 'Both of them have that number. Clearly, that number alone doesn’t tell you how much hardware you need.',
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
    overlays: [brace('same share', 17, 63, 68, { tone: 'measure' })],
  },
  {
    n: 12,
    id: 'the-promise',
    title: 'Follow one token',
    relation: 'therefore',
    secs: 5,
    /* The value promise already landed at beat 6. This beat only turns the
     * hardware contradiction into the journey that will prove it. */
    vo: 'So now, let’s follow one token all the way through.',
    commands: [
      block2.off(),
      rigA.off(),
      rigB.off(),
      block.moveTo({ x: 52, y: 46 }, 1),
      narrator.pose('reach'),
    ],
    clearSticky: true,
  },

  /* ═══ ACT 3 · NOW THE WORDS (S-04) ══════════════════════════════════════ */
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
    vo: 'Let’s get closer.',
    commands: [word.off(), block.moveTo({ x: 52, y: 46 }, 2.6), narrator.off()],
  },
  {
    n: 17,
    id: 'two-eighty-eight',
    title: 'The surface resolves into the room from beat 5',
    relation: 'so',
    secs: 9,
    vo: 'That room again. Two hundred and eighty-eight separate pieces — and this is one small part of the model.',
    commands: [block.off(), hospital.rise({ x: 52, y: 46 }, 0.86), hospital.staff(), ground.at(GROUND_Y)],
    lateOverlays: {
      at: 3400,
      overlays: [centred('288', 50, 12, { size: 'md', rotate: -2, sticky: true })],
    },
  },
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
    /* Of the 288 routed experts, 8 run and 280 do not. The shared expert is a
     * 289th additional object and is introduced properly in §5. */
    vo: 'Eight get picked. The other two hundred and eighty do nothing at all.',
    commands: [hospital.idle('280 idle')],
  },
  {
    n: 21,
    id: 'not-the-whole-five-percent',
    title: 'Eight of 288 is not the five percent',
    relation: 'and-yet',
    secs: 11,
    vo: 'You might think that’s the five percent. It isn’t. This is one small part, and plenty more runs every time regardless. Hold onto that.',
    commands: [],
    overlays: [
      centred('8 of 288 — here', 50, 76, { size: 'md', rotate: -1 }),
      note('not 5% of the model', 50, 86, { tone: 'cost', rotate: 2 }),
    ],
  },
  {
    n: 22,
    id: 'mixture-of-experts',
    title: 'It takes its name',
    relation: 'so',
    secs: 9,
    vo: 'And this has a name. It’s called a Mixture of Experts. Those pieces are the experts.',
    commands: [hospital.label('Mixture of Experts', 'the experts')],
  },
  {
    n: 23,
    id: 'who-picks-the-eight',
    title: 'The chapter wall',
    relation: 'and-yet',
    secs: 9,
    vo: 'So — who picks the eight? And why does that turn out to be the expensive question?',
    commands: [
      hospital.moveTo({ x: 58, y: 46 }, 0.72),
      desk.arrive({ x: 17, y: 74 }, 0.8),
      narrator.at({ x: 91, y: 70 }, 'wonder', 1, true),
    ],
    clearSticky: true,
  },
]
