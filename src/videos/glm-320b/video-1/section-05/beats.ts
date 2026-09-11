import { GROUND_Y, note, type Beat } from '../../../../paper'
import {
  CHOSEN,
  OTHER,
  arcs,
  camera,
  count,
  desk,
  ground,
  hospital,
  narrator,
  open,
  plates,
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
 * Beats 13-15 are the section's whole argument: the row, lines from it to the
 * scores, and §4's arcs ghosting in behind it. The choice comes from those
 * numbers -- and those numbers did not exist until attention finished making
 * them one beat ago. `research/COMPETITIVE_FIELD.md` shows nobody else makes
 * this argument, so it gets three beats rather than a clause.
 *
 * Beat 10 is the other one that cannot be cut: the name-plates that fail to
 * stick. Every viewer arrives believing the router picked the eight that know
 * about dogs, and that belief is visual, so the correction has to be.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'something-has-to-read-it',
    title: 'The changed row travels right and rests at the unlabelled desk',
    relation: 'want',
    secs: 15,
    vo: 'So the row belongs to this sentence now, not just to the word. Which means there’s finally something worth reading — and something has to read it.',
    commands: [
      ground.at(GROUND_Y),
      row.show({ x: 22, y: 44 }, 0.44, { label: 'the row, as attention left it' }),
      camera.to({ x: 54, y: 50 }, 1),
      desk.show({ x: 62, y: 62 }, 0.8),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
    stages: [{ at: 1800, commands: [row.moveTo({ x: 40, y: 44 }, 0.44)] }],
  },
  {
    n: 2,
    id: 'this-is-the-router',
    title: 'A small plaque lands on the desk',
    relation: 'so',
    secs: 10,
    /*
     * S-13, and the router is the *only* mechanism in this section that gets a
     * name-plate. The experts must never get one -- see beat 10 and
     * `GROUND_TRUTH.md`.
     */
    vo: 'This is the router. It’s tiny compared to everything around it, and it has exactly one job.',
    commands: [desk.name(), desk.ring(), narrator.set({ pose: 'offer' })],
  },
  {
    n: 3,
    id: 'two-eighty-eight-in-front',
    title: 'We back off and the 288 fill the frame beyond the desk',
    relation: 'so',
    secs: 7,
    vo: 'In front of it: two hundred and eighty-eight experts. It has to pick some.',
    /*
     * The row moves **with** the pull-back. It used to hold at 40/44, which is
     * where the building lands -- so the frame for this beat had the sentence's
     * numbers printed across the third floor. An actor that does not move when
     * the world does is not staying put, it is being overrun.
     */
    commands: [
      camera.to({ x: 50, y: 48 }, 0.86),
      hospital.show({ x: 52, y: 44 }, 0.9, { staffed: true }),
      desk.moveTo({ x: 62, y: 74 }, 0.66),
      row.moveTo({ x: 30, y: 78 }, 0.4),
      narrator.set({ pose: 'reach' }),
    ],
    lateOverlays: {
      at: 3200,
      overlays: [note('288 experts', 82, 22, { size: 'md', tone: 'measure', rotate: 2, sticky: true })],
    },
  },
  {
    n: 4,
    id: 'exactly-one-thing',
    title: 'The row arrives at the desk and stops; the whole wall waits, unscored',
    relation: 'so',
    secs: 8,
    /*
     * The still frame before the mechanism. Nothing on the wall has happened
     * yet -- no badges, no light -- so that beat 5's "all 288 at once" is a
     * change the viewer watches rather than a state they arrived into.
     */
    vo: 'The row arrives. And the router does exactly one thing with it.',
    /*
     * It rests *beside* the desk, not on it. At 52/74 the row sat inside the
     * router's ring -- for this beat and the eight after it, because nothing
     * moved it again until beat 13.
     */
    commands: [row.moveTo({ x: 40, y: 78 }, 0.4), hospital.plain(), narrator.set({ pose: 'wonder' })],
  },
  {
    n: 5,
    id: 'every-single-one',
    title: 'An empty score badge appears on all 288 at once',
    relation: 'so',
    secs: 9,
    /* Empty badges first. The question exists before any answer does, and
     * *every* expert is asked -- not just the ones that go on to win. */
    vo: 'It gives every single expert a score. All two hundred and eighty-eight of them.',
    commands: [hospital.ask(), narrator.set({ pose: 'count' })],
  },
  {
    n: 6,
    id: 'how-well-do-you-fit',
    title: 'A sweep crosses the whole wall left to right, filling every badge',
    relation: 'so',
    secs: 10,
    vo: 'And the question it’s scoring is always the same one. How well does this expert fit these numbers?',
    commands: [hospital.score(), row.pulse()],
    lateOverlays: {
      at: 3600,
      overlays: [note('every one of them —\nnot just the winners', 16, 22, { tone: 'measure', rotate: -3 })],
    },
  },
  {
    n: 7,
    id: 'these-numbers-right-now',
    title: 'The badges settle; the row stays lit beside them',
    relation: 'and-yet',
    secs: 9,
    /*
     * The line the whole section exists for. What is being matched against is
     * *this row, as it is now* -- not the word, not the sentence. §11's answer
     * is a consequence of this beat, so the row has to stay visibly lit while
     * the scores sit next to it.
     */
    vo: 'Not this word. Not this sentence. These numbers, as they are right now.',
    commands: [row.pulse(), narrator.set({ pose: 'point' })],
    overlays: [note('the row — not the word', 16, 82, { size: 'md', tone: 'word', rotate: -2 })],
  },
  {
    n: 8,
    id: 'keeps-the-best-eight',
    title: 'The eight highest rise forward; the other 280 go flat',
    relation: 'therefore',
    secs: 8,
    vo: 'Then it keeps the best eight. That’s it. That’s the whole decision.',
    commands: [hospital.choose(CHOSEN)],
  },
  {
    n: 9,
    id: 'eight-of-two-eighty-eight',
    title: 'A bracket draws around the eight and counts them against the wall',
    relation: 'and-yet',
    secs: 10,
    /*
     * 280 idle, not 281. `n_routed_experts` is 288 and `n_shared_experts` is 1
     * *on top of it*, so the shared one is a 289th object -- which is beat 12's
     * job, outside this wall. `GROUND_TRUTH.md`.
     */
    vo: 'Eight, out of two hundred and eighty-eight. The other two hundred and eighty do nothing at all.',
    commands: [
      count.show({ x: 15, y: 40 }, 1, { value: 8, label: 'of 288 did anything' }),
      hospital.idle('280 idle'),
    ],
  },
  {
    n: 10,
    id: 'no-dog-expert',
    title: 'Name-plates try to land on the eight and slide off',
    relation: 'wall',
    secs: 15,
    /*
     * The intuition being corrected is visual, so the correction is too.
     * `plates.land()` then `plates.slideOff()` in one beat: they have to be
     * *on* the eight and plausible before they fail, or nothing is dislodged.
     * These are the only labels the video ever puts on an expert.
     */
    vo: 'Now — it’s tempting to think it picked the eight that know about dogs. It didn’t. There is no dog expert. There’s no French expert, no maths expert.',
    commands: [plates.land()],
    stages: [{ at: 6000, commands: [plates.slideOff(), narrator.set({ pose: 'flat' })] }],
    lateOverlays: {
      at: 7200,
      overlays: [note('no plate sticks', 80, 76, { size: 'md', tone: 'cost', rotate: 3 })],
    },
  },
  {
    n: 11,
    id: 'what-an-expert-is',
    title: 'One expert lifts out and opens: a row in, a different row out',
    relation: 'so',
    secs: 17,
    vo: 'They’re two hundred and eighty-eight blocks of numbers that came out of training slightly different from each other. A row goes in, a different row comes out. That is the whole of what an expert is.',
    commands: [plates.off(), open.show({ x: 50, y: 48 }, 1.05)],
  },
  {
    n: 12,
    id: 'one-more-over-here',
    title: 'A ninth slides in from outside the wall entirely, already lit',
    relation: 'so',
    secs: 16,
    /*
     * The shared expert, and it enters from **outside** the 288. It is a 289th
     * object: `n_routed_experts: 288`, `n_shared_experts: 1`, additional. It
     * is never scored and never chosen, so it must not be drawn inside the
     * wall or among the eight. `GROUND_TRUTH.md`.
     */
    vo: 'And there’s one more, over here. It isn’t one of the two hundred and eighty-eight, and it never gets scored — it just runs, for every word, whatever the word is. So: eight picked, plus that one.',
    commands: [open.off(), shared.show({ x: 86, y: 30 }, 1.6)],
    lateOverlays: {
      at: 5200,
      overlays: [note('+1 — never scored,\nalways runs', 84, 54, { tone: 'relate', rotate: 3, sticky: true })],
    },
  },
  {
    n: 13,
    id: 'look-what-the-scores-came-from',
    title: 'The row that produced the scores pulses; a line links it to the badges',
    relation: 'wall',
    secs: 8,
    vo: 'But look at what those scores were made from. These numbers.',
    commands: [row.moveTo({ x: 15, y: 62 }, 0.4), row.pulse(), narrator.set({ pose: 'point' })],
    clearSticky: true,
  },
  {
    n: 14,
    id: 'only-just-finished-making-them',
    title: 'Attention’s arcs ghost in behind the row, then fade',
    relation: 'and-yet',
    secs: 9,
    /*
     * §4's wiring, remembered rather than re-run -- faint, and behind the row.
     * This is the beat that makes §11's answer inevitable: the thing the
     * routing depends on did not exist until a moment ago.
     */
    vo: 'The ones that didn’t exist a moment ago. Attention had only just finished making them.',
    commands: [arcs.show({ x: 15, y: 54 }, 0.6)],
    stages: [{ at: 5200, commands: [arcs.off()] }],
  },
  {
    n: 15,
    id: 'change-the-sentence',
    title: 'A second sentence swaps in; the row changes; most of the eight change',
    relation: 'therefore',
    secs: 16,
    /*
     * `remember(CHOSEN)` before `choose(OTHER)`, so the old positions stay
     * marked and "mostly different" is legible. Two of the eight overlap on
     * purpose -- a fresh decision is not a guaranteed different team, and §12's
     * caching argument depends on that being true here.
     * `research/glm/OFFLOADING_AND_LOCALITY.md` §5.
     */
    vo: 'Change the sentence, and the row changes. Change the row, and the scores change. Change the scores, and it picks again — a fresh decision, and mostly a different eight.',
    commands: [row2.show({ x: 15, y: 66 }, 0.34), hospital.remember(CHOSEN)],
    stages: [{ at: 4400, commands: [hospital.choose(OTHER)] }],
  },
  {
    n: 16,
    id: 'could-not-have-been-earlier',
    title: 'The new eight hold; the old eight’s empty places stay marked',
    relation: 'and-yet',
    secs: 16,
    /* Deposit two, and the one §11 spends. */
    vo: 'And that’s the router, done. Eight picked out of two hundred and eighty-eight — and that choice could not have been made any earlier than this. It needed the row to exist first.',
    commands: [narrator.set({ pose: 'think' })],
    lateOverlays: {
      at: 4000,
      overlays: [
        note('it needed the row\nto exist first', 78, 78, { size: 'md', tone: 'cost', rotate: -2 }),
      ],
    },
  },
]
