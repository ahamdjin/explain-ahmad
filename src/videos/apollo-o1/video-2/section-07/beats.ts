import { type Beat } from '../../../../paper'
import { SHOT, DEMO, SCENARIOS, P1 } from '../../../../paper/casefile'
import { type Patch, verbs } from './scene'

const { doc, chain, box, team, grid, nudge, thumb, nudged, mass, cvd, hero, notthis, host, recon } = verbs

const ASIDE = { x: 28, y: 50 }
const RIGHT = 72

/**
 * Section 07 — the room was built for this.
 *
 * Twelve beats, following `storyboard/video-2/SECTION_07.md`.
 *
 * ## The order is the argument
 *
 * ```
 *   1   it was inside something
 *   2   that something is Apollo's
 *   3   people built it
 *   4   the conflict was an input, not a discovery
 *   5   the prompt pushed
 *   6   a thumb on the scale
 *   7   remove it and the behaviour mostly goes   <- the beat that earns this
 *   8   the real mass was never inside
 *   9   what they were actually asking
 *  10   under one percent
 *  11   capability, not frequency
 *  12   a face, and a question
 * ```
 *
 * Beats 5-7 are one movement: the instruction, what it does, and what happens
 * without it. Splitting them across three beats rather than compressing to one
 * is the whole point -- a viewer who is told "they nudged it hard" has been
 * given an assertion; a viewer who watches the rate collapse has been given
 * evidence.
 */
export const BEATS: Array<Beat<Patch>> = [
  {
    n: 1,
    id: 'sandbox-reveal',
    title: 'It was inside something',
    vo: 'This was not ChatGPT randomly doing this on someone’s laptop.',
    relation: 'want',
    secs: 6,
    /*
     * §6 ended mid-shrink on this exact object at this exact scale, so the
     * boundary arriving around it reads as the camera getting somewhere rather
     * than as a new graphic appearing.
     *
     * Plain contained test environment. No glass box, no futuristic frame --
     * dressing the sandbox up would re-sensationalise exactly what this
     * section exists to calm down.
     */
    commands: [chain.moveTo({ x: 50, y: 50 }, 0.5)],
    stages: [{ at: 1.8, commands: [box.show({ x: 50, y: 50 }, 1.2, { label: 'controlled evaluation' }), chain.moveTo({ x: 50, y: 50 }, 0.62)] }],
  },
  {
    n: 2,
    id: 'apollo-o1',
    title: 'Whose evaluation',
    vo: 'It was o1 inside a controlled Apollo Research evaluation.',
    relation: 'so',
    secs: 6,
    /* Pull out to the real page. The masthead is the attribution -- the film
       never needs a logo treatment when the source has one. */
    commands: [
      chain.moveTo({ x: 74, y: 52 }, 0.42),
      box.moveTo({ x: 74, y: 52 }, 0.42),
      doc.show(ASIDE, 0.56, { source: DEMO, highlight: SHOT.letterhead }),
    ],
    stages: [],
  },
  {
    n: 3,
    id: 'people-built-this',
    title: 'People built the room',
    vo: 'Researchers built the room.',
    relation: 'so',
    secs: 4,
    /*
     * Two seconds of people. The incident reads differently once the viewer
     * can see that a room was designed by somebody rather than discovered --
     * and it is the cheapest possible way to say "this was on purpose" without
     * the word "on purpose".
     */
    commands: [
      doc.moveTo({ x: 22, y: 52 }, 0.44),
      chain.off(),
      box.off(),
      team.show({ x: 66, y: 50 }, 1.1, { shown: 0 }),
    ],
    stages: [{ at: 1.0, commands: [team.upTo(3)] }],
  },
  {
    n: 4,
    id: 'the-conflict-was-designed',
    title: 'The conflict was an input',
    vo: 'The researchers deliberately created a conflict between the model’s assigned goal and what its developers wanted.',
    relation: 'so',
    secs: 6,
    /*
     * The scenario suite behind it, as proof rather than as a number to
     * memorise. One of these is the incident the film just spent five sections
     * inside -- which is the point, and does not need saying.
     */
    commands: [
      team.off(),
      doc.turn(SCENARIOS, null),
      doc.moveTo(ASIDE, 0.5),
      grid.show({ x: RIGHT, y: 50 }, 1.2, { lit: 0 }),
    ],
    stages: [{ at: 1.6, commands: [grid.lights(33)] }],
  },
  {
    n: 5,
    id: 'goal-nudging',
    title: 'And they pushed it hard',
    vo: 'And they pushed that goal hard: achieve your goal at all cost.',
    relation: 'and-yet',
    secs: 6,
    /*
     * Back to the same P1 region §2 beat 3 used, deliberately, so the viewer
     * recognises the sentence rather than meeting it again. It was a
     * characterisation then; it is a method now.
     */
    commands: [
      grid.off(),
      doc.turn(P1, SHOT.nudge),
      doc.moveTo(ASIDE, 0.58),
      nudge.show({ x: RIGHT, y: 48 }, 1, {
        level: 'strong goal nudging',
        quote: 'Nothing else matters. Make sure you achieve YOUR goal at all cost.',
      }),
    ],
    stages: [],
  },
  {
    n: 6,
    id: 'a-thumb-on-the-scale',
    title: 'The prompt was built to push',
    vo: 'The prompt was built to push. They say so.',
    relation: 'so',
    secs: 4,
    /*
     * A hand pressing one pan. Funny rather than accusatory, and that register
     * is chosen: Apollo state plainly that the prompt is designed to elicit,
     * so this describes their method rather than catching them out.
     */
    commands: [nudge.moveTo({ x: RIGHT, y: 30 }, 0.8), thumb.show({ x: RIGHT, y: 68 }, 1, { pressing: false, tip: 0 })],
    stages: [{ at: 1.2, commands: [thumb.press()] }],
  },
  {
    n: 7,
    id: 'without-the-nudge',
    title: 'Take the instruction away',
    vo: 'Take that instruction away, and the behaviour mostly goes with it.',
    relation: 'and-yet',
    secs: 6,
    /*
     * **The beat that earns the section.**
     *
     * Oversight deactivation runs at 5% with heavy goal nudging and under 1%
     * without. A controlled comparison with one variable removed is the whole
     * logic of an evaluation, and it is the fastest way to make a sceptical
     * viewer trust that the hook was fair.
     *
     * The label says *oversight deactivation*, not "scheming". There are two
     * different sub-1% figures in this story and `GROUND_TRUTH.md` separates
     * them on purpose; collapsing them here would undo that.
     */
    commands: [
      thumb.off(),
      nudge.off(),
      doc.moveTo({ x: 20, y: 52 }, 0.44),
      nudged.show({ x: 62, y: 50 }, 1.15, { reveal: false }),
    ],
    stages: [{ at: 2.2, commands: [nudged.compare()] }],
  },
  {
    n: 8,
    id: 'not-real-weights-again',
    title: 'The real mass was never inside',
    vo: 'The model never had access to its real weights. This was a simulated self-exfiltration setup.',
    relation: 'so',
    secs: 5,
    /*
     * The same two objects as §5 beat 4, in the same arrangement, so the
     * viewer recognises rather than relearns. Said twice on purpose -- it is
     * the film's licence for its own title.
     */
    commands: [
      nudged.off(),
      doc.turn(DEMO, null),
      doc.moveTo({ x: 18, y: 52 }, 0.42),
      mass.show({ x: 60, y: 52 }, 1),
    ],
    stages: [],
  },
  {
    n: 9,
    id: 'what-apollo-tested',
    title: 'What they were asking',
    vo: 'Apollo was asking: if covert actions help the assigned goal, can the model construct those actions without being directly told the strategy?',
    relation: 'therefore',
    secs: 6,
    /*
     * `can` against `does`. The distinction the whole reveal turns on, and the
     * reason beat 11 is not a retraction: an open door is a fact about the
     * door, not a prediction about how often anybody walks through it.
     */
    commands: [
      mass.off(),
      doc.moveTo(ASIDE, 0.56),
      doc.look(SHOT.chain),
      cvd.show({ x: RIGHT, y: 50 }, 1, { marks: 0 }),
    ],
    stages: [{ at: 2.0, commands: [cvd.upTo(2)] }],
  },
  {
    n: 10,
    id: 'whole-chain-rarity',
    title: 'Under one percent',
    vo: 'The complete chain was rare. Apollo says o1 completed all of those steps in sequence in less than 1% of cases.',
    relation: 'and-yet',
    secs: 7,
    /*
     * The film's **one** big number, and Apollo's own sentence stays visible
     * around it. Every other figure in the film is small, on a page, or drawn
     * as a count -- which is what makes this one land.
     */
    commands: [
      cvd.off(),
      doc.look(SHOT.rarity),
      hero.show({ x: RIGHT, y: 50 }, 1),
    ],
    stages: [],
  },
  {
    n: 11,
    id: 'rare-not-normal',
    title: 'Capability, not frequency',
    vo: 'So this is not evidence that normal ChatGPT is secretly trying to escape. It shows a capability under a deliberately constructed conflict.',
    relation: 'wall',
    secs: 6,
    /*
     * The clarification, then the route returns inside the boundary --
     * capability, established. The film gives back exactly as much as the
     * evidence takes, and not a word more.
     */
    commands: [
      hero.off(),
      doc.moveTo({ x: 20, y: 52 }, 0.42),
      notthis.show({ x: 66, y: 40 }, 1),
      chain.show({ x: 66, y: 76 }, 0.5, { shown: 5 }),
      box.show({ x: 66, y: 76 }, 0.5, { label: 'controlled evaluation' }),
    ],
    stages: [],
  },
  {
    n: 12,
    id: 'want-to-live-question',
    title: 'Did it want to survive?',
    vo: 'Which leaves the more interesting question: did it do this because it wanted to survive?',
    relation: 'wall',
    secs: 6,
    /*
     * Every label and statistic goes. Face camera, first since §1, and the
     * frame beside Ahmad holds one question and nothing else -- the art
     * direction forbids face cam beside dense output, so this is an
     * interpretation moment only.
     *
     * §8 opens on this exact frame.
     */
    commands: [
      doc.off(),
      notthis.off(),
      chain.off(),
      box.off(),
      recon.off(),
      host.show({ x: 50, y: 52 }, 1, { line: 'did it want to survive?' }),
    ],
    stages: [],
  },
]
