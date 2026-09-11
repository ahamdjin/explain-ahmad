import { arrow, brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  CHOSEN,
  OTHER,
  camera,
  count,
  desk,
  ground,
  hospital,
  narrator,
  open,
  row,
  row2,
  shared,
  type Patch,
} from './scene'

/**
 * Section 05 — The router picks the eight.
 *
 * Board: `video-script/video-1/05-the-router-picks-the-eight.md`. `npm run check:board`.
 *
 * **Two camera moves, both at the front**, and each earns a change of place: to
 * the desk, then out to the room. Beats 4-13 are still.
 *
 * Beat 11 is the section's whole argument in one image: the row, and lines from
 * it to the scores. The choice comes from those numbers — and those numbers did
 * not exist until attention finished making them one beat ago.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'this-is-what-arrives',
    title: 'The changed row travels right and rests at the unlabelled desk',
    relation: 'want',
    secs: 14,
    vo: 'So the row is specific to this sentence now. Which means something can finally read it — as it is — and choose. This is what arrives here.',
    commands: [
      ground.at(GROUND_Y),
      row.show({ x: 20, y: 40 }, 0.5),
      desk.show({ x: 62, y: 62 }, 0.8),
      /* Pan. The row travels and the frame goes with it, which is what makes
       * the desk somewhere we arrived at rather than somewhere we cut to. */
      camera.to({ x: 56, y: 52 }, 1.1),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'carry', flip: true }),
    ],
    stages: [{ at: 1600, commands: [row.moveTo({ x: 40, y: 44 }, 0.44)] }],
  },
  {
    n: 2,
    id: 'this-is-the-router',
    title: 'A small plaque lands on the desk',
    relation: 'so',
    secs: 9,
    vo: 'This is the router. It’s tiny compared to everything around it, and it has exactly one job.',
    commands: [desk.name(), desk.ring(), narrator.set({ pose: 'offer' })],
  },
  {
    n: 3,
    id: 'two-eighty-eight-in-front',
    title: 'We back off and the 288 fill the frame beyond the desk',
    relation: 'so',
    secs: 6,
    vo: 'In front of it: two hundred and eighty-eight experts.',
    commands: [
      /* Pull back. The router is tiny compared to what it is choosing from, and
       * that is only true if both are in one frame. */
      camera.home(),
      hospital.show({ x: 52, y: 42 }, 0.86, { staffed: true }),
      desk.moveTo({ x: 16, y: 80 }, 0.5),
      desk.ring(),
      row.moveTo({ x: 16, y: 56 }, 0.3),
    ],
    lateOverlays: {
      at: 3000,
      overlays: [centred('288 experts', 52, 12, { size: 'md', rotate: -2, sticky: true })],
    },
  },
  {
    n: 4,
    id: 'what-an-expert-is',
    title: 'One expert lifts out and opens: a row in, a different row out',
    relation: 'so',
    secs: 15,
    vo: 'And I should say what an expert actually is, because the name oversells it. It’s a block of numbers that takes a row in and puts a different row out. That’s all.',
    commands: [open.show({ x: 50, y: 50 }, 1.05)],
    clearSticky: true,
    lateOverlays: {
      at: 4200,
      overlays: [centred('that’s the whole thing', 50, 74, { rotate: 2 })],
    },
  },
  {
    n: 5,
    id: 'no-french-expert',
    title: 'It drops back; no labels appear on any of them',
    relation: 'wall',
    secs: 14,
    vo: 'Nobody assigned them subjects. There’s no French expert, no maths expert. They’re just two hundred and eighty-eight different blocks that came out of training different from each other.',
    /*
     * The most important frame in this section for not teaching a lie. The wall
     * carries no labels at all, and the note says why rather than naming one.
     */
    /* Deadpan, not a shrug. A shrug says "I don't know"; here we do know --
     * nobody assigned them subjects, and that is a flat statement of fact. */
    commands: [open.off(), hospital.plain(), narrator.set({ pose: 'flat' })],
    lateOverlays: {
      at: 4800,
      overlays: [centred('no names on any of them —\nnot one', 50, 86, { size: 'md', rotate: -1 })],
    },
  },
  {
    n: 6,
    id: 'every-single-one',
    title: 'An empty score badge appears on all 288 at once',
    relation: 'so',
    secs: 7,
    vo: 'The router gives every single one of them a score. All 288.',
    commands: [hospital.ask()],
    overlays: [note('all of them', 14, 30, { tone: 'measure', rotate: -3, sticky: true })],
  },
  {
    n: 7,
    id: 'how-well-do-you-fit',
    title: 'A sweep crosses the whole wall, filling every badge as it passes',
    relation: 'so',
    secs: 8,
    vo: 'And the question it’s scoring is: how well does this expert fit these numbers?',
    commands: [hospital.score(), row.pulse()],
  },
  {
    n: 8,
    id: 'keeps-the-best-eight',
    title: 'The eight highest rise forward; the other 280 go flat',
    relation: 'therefore',
    secs: 7,
    vo: 'Then it keeps the best eight. That’s it. That’s the whole decision.',
    commands: [hospital.choose(CHOSEN)],
    clearSticky: true,
  },
  {
    n: 9,
    id: 'eight-of-two-eighty-eight',
    title: 'A bracket draws around the eight and counts them against the wall',
    relation: 'and-yet',
    secs: 9,
    vo: 'Eight, out of two hundred and eighty-eight. The other two hundred and eighty do nothing at all.',
    commands: [count.show({ x: 15, y: 40 }, 1, { value: 8, label: 'of 288 did anything' })],
    overlays: [brace('288 — all of them scored', 24, 76, 56, { tone: 'measure', sticky: true })],
  },
  {
    n: 10,
    id: 'one-always-on',
    title: 'A ninth, dashed and unscored, slides in beside the eight',
    relation: 'so',
    secs: 11,
    vo: 'Oh — and one extra that runs every time, no matter what the word is. So: eight chosen, plus one always on.',
    commands: [shared.show({ x: 84, y: 34 }, 1.6)],
    overlays: [note('always on —\nnever chosen', 80, 46, { rotate: 3 })],
  },
  {
    n: 11,
    id: 'look-what-the-scores-came-from',
    title: 'The row pulses; a line links it to the badges',
    relation: 'wall',
    secs: 13,
    vo: 'But look at what those scores were made from. These numbers. The ones that only existed a moment ago, because attention had just finished making them.',
    /* The section's whole argument in one image. */
    commands: [row.moveTo({ x: 15, y: 62 }, 0.4), row.pulse(), narrator.set({ pose: 'point' })],
    clearSticky: true,
    overlays: [
      arrow({ x: 330, y: 640 }, { x: 700, y: 400 }, { tone: 'measure', bow: 80, label: 'these numbers' }),
    ],
  },
  {
    n: 12,
    id: 'change-the-sentence',
    title: 'The second sentence swaps in; the row changes; the eight change',
    relation: 'therefore',
    secs: 12,
    vo: 'Change the sentence and the row changes. Change the row and the scores change. Change the scores and you get a different eight.',
    commands: [row2.show({ x: 15, y: 66 }, 0.34), hospital.remember(CHOSEN)],
    stages: [{ at: 2200, commands: [hospital.choose(OTHER)] }],
  },
  {
    n: 13,
    id: 'could-not-have-been-earlier',
    title: 'The new eight hold; the old eight’s places stay marked',
    relation: 'and-yet',
    secs: 16,
    vo: 'And that’s the router, done. Eight picked out of two hundred and eighty-eight — and that choice could not have been made any earlier than this. It needed the row to exist first.',
    /*
     * The vacated seats stay marked, because a new eight lighting up does not
     * read as *different* unless you can see where the old ones were. This is
     * the seed §12 spends.
     */
    commands: [narrator.set({ pose: 'think' })],
    lateOverlays: {
      at: 2800,
      overlays: [
        note('red rings = where the\nlast eight sat', 62, 20, { tone: 'cost', rotate: 3 }),
        centred('the choice needed the row\nto exist first', 50, 92, { size: 'md', tone: 'cost', rotate: -1 }),
      ],
    },
  },
]
