import { type Beat } from '../../../../paper'
import { SHOT, DEMO, SCENARIOS, P1 } from '../../../../paper/casefile'
import { type Patch, verbs } from './scene'

const {camera,  doc, chain, box, team, grid, nudge, thumb, nudged, mass, cvd, hero, notthis, host, recon } = verbs

const ASIDE = { x: 28, y: 50 }
const RIGHT = 72
/**
 * How far down the right column a drawn object sits.
 *
 * The page's lit band is enlarged into the right column so it can be read,
 * and that panel is horizontal and sits across the upper half. An object at
 * mid-height lands inside it. The column is therefore split: the enlargement
 * takes the top, the drawn object takes the bottom. Proven in §3, where it
 * took the section from five collisions to none.
 */
const LOWER = 74

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
    /**
     * Prerequisite.
     *
     * §6 steps outside the scenario. This is the beat that says what the room
     * was.
     */
    needs: '§06:outside-the-room',
    secs: 5.2,
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
    stages: [{ at: 1800, commands: [box.show({ x: 50, y: 50 }, 1.2, { label: 'controlled evaluation' }), chain.moveTo({ x: 50, y: 50 }, 0.62)] }],
  },
  {
    n: 2,
    id: 'apollo-o1',
    title: 'Whose evaluation',
    vo: 'It was o1 inside a controlled Apollo Research evaluation.',
    relation: 'so',
    secs: 4.6,
    /* Pull out to the real page. The masthead is the attribution -- the film
       never needs a logo treatment when the source has one. */
    commands: [
      /* The two objects step aside *first*, then the page lands in the space
         they left. The other order put the page on top of them for the half
         second before they moved. */
      chain.moveTo({ x: 83, y: 30 }, 0.4),
      box.moveTo({ x: 83, y: 72 }, 0.4),
    ],
    stages: [
      {
        at: 1200,
        commands: [
          doc.show(ASIDE, 0.56, { source: DEMO, highlight: SHOT.letterhead }),
        ],
      },
    ],
  },
  {
    n: 3,
    id: 'people-built-this',
    title: 'People built the room',
    vo: 'Researchers built the room.',
    relation: 'so',
    secs: 2.5,
    /*
     * Two seconds of people. The incident reads differently once the viewer
     * can see that a room was designed by somebody rather than discovered --
     * and it is the cheapest possible way to say "this was on purpose" without
     * the word "on purpose".
     */
    commands: [
      /*
       * The page leaves after its reveal.
       *
       * It used to stay from beat 2 to beat 11 -- ten of twelve beats -- just
       * shuffling position while the drawn layer did the work beside it. §7
       * spends its evidence twice: here it has already made its point, and
       * beat 5 brings it back for the one line worth reading.
       */
      doc.off(),
      chain.off(),
      box.off(),
      team.show({ x: 66, y: 50 }, 1.1, { shown: 0 }),
    ],
    stages: [{ at: 1000, commands: [team.upTo(3)] }],
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

      grid.show({ x: RIGHT, y: LOWER }, 1.2, { lit: 0 }),
    ],
    stages: [{ at: 1600, commands: [grid.lights(33)] }],
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
      /* Back, for the one line this section rests on: the instruction that
         was actually in the prompt. */
      doc.show(ASIDE, 0.58, { source: P1, highlight: SHOT.nudge }),
    ],
    /* "They pushed that goal hard" -- and then it arrives. Six seconds on one
       arrangement was the section's longest dead hold. */
    stages: [
      {
        at: 2000,
        commands: [
          nudge.show({ x: RIGHT, y: LOWER }, 1, {
            level: 'strong goal nudging',
            quote: 'Nothing else matters. Make sure you achieve YOUR goal at all cost.',
          }),
        ],
      },
    ],
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
    commands: [
      /* The comparison is the subject; the page is provenance behind it. */
      doc.whole(),
      nudge.moveTo({ x: RIGHT, y: LOWER }, 0.8),
      thumb.show({ x: 78, y: 62 }, 0.9, { pressing: false, tip: 0 }),
    ],
    /* The press is the beat. Lean in for it, so the thumb reads as pressure
       rather than as another object arriving. */
    stages: [
      /* Zoom, not pan. Centring on RIGHT slid the whole drawn world 26% left,
         through the page parked outside the camera -- seven collisions from
         one move, and beats 7-11 inherited it because nothing reset it. */
      { at: 900, commands: [camera.to({ x: 54, y: 62 }, 1.14)] },
      { at: 1200, commands: [thumb.press()] },
    ],
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
      /* Release the lean-in from beat 6, so beats 7-11 are not all shot
         from inside a push nobody asked for. */
      camera.home(),
      thumb.off(),
      nudge.off(),
      /* Done. The counterfactual is a comparison, not a reading. */
      doc.off(),
      nudged.show({ x: 62, y: 50 }, 1.15, { reveal: false }),
    ],
    stages: [{ at: 2200, commands: [nudged.compare()] }],
  },
  {
    n: 8,
    id: 'not-real-weights-again',
    title: 'The real mass was never inside',
    vo: 'The model never had access to its real weights. This was a simulated self-exfiltration setup.',
    relation: 'so',
    /**
     * Prerequisite.
     *
     * The distinction between real weights and a stand-in was made there. This
     * beat only repeats it; it cannot introduce it.
     */
    needs: '§05:not-real-weights',
    secs: 5,
    /*
     * The same two objects as §5 beat 4, in the same arrangement, so the
     * viewer recognises rather than relearns. Said twice on purpose -- it is
     * the film's licence for its own title.
     */
    commands: [
      nudged.off(),

    ],
    stages: [{ at: 1600, commands: [mass.show({ x: 60, y: 52 }, 1)] }],
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

      cvd.show({ x: RIGHT, y: LOWER }, 1, { marks: 0 }),
    ],
    stages: [{ at: 2000, commands: [cvd.upTo(2)] }],
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
    ],
    /* Seven seconds held one arrangement -- the longest still frame in the
       film. The rarity figure is the beat; it arrives when the voice says it. */
    stages: [{ at: 2600, commands: [hero.show({ x: RIGHT, y: LOWER }, 1)] }],
  },
  {
    n: 11,
    id: 'rare-not-normal',
    title: 'Capability, not frequency',
    vo: 'So this is not evidence that normal ChatGPT is secretly trying to escape. It shows a capability under a deliberately constructed conflict.',
    /* "So ... it shows" is a consequence of the <1%, not a new obstacle. */
    relation: 'therefore',
    secs: 6,
    /*
     * The clarification, then the route returns inside the boundary --
     * capability, established. The film gives back exactly as much as the
     * evidence takes, and not a word more.
     */
    commands: [
      hero.off(),
      /* Taken off so the stage below *places* it. Left on, `show` reads as a
         move and it travelled from beat 2's corner straight through the claim
         this beat exists to make. */
      chain.off(),
      box.off(),
      notthis.show({ x: 72, y: 38 }, 0.94),
      /* 0.5 put the sandbox's own label at 6.8px. It is the label naming the
         thing the whole section is about; it does not get to be a smudge. */
    ],
    /* 3000, not 2200: the two objects were coming back while the claim above
       them was still fading up, and the two crossed. */
    stages: [
      {
        at: 3000,
        commands: [
          chain.show({ x: 66, y: 76 }, 0.46, { shown: 5 }),
          box.show({ x: 66, y: 90 }, 0.62, { label: 'controlled evaluation' }),
        ],
      },
    ],
  },
  {
    n: 12,
    id: 'want-to-live-question',
    title: 'Did it want to survive?',
    vo: 'Which leaves the more interesting question: did it do this because it wanted to survive?',
    /* The section has to *land*, not trail off on a want. The beat before is
       the consequence; this is the obstacle the whole of §8 exists to remove.
       The board split this across `want` and `wall`; the build merges them and
       keeps the wall, which is the half that closes a section. */
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
      /* Wide and empty for the question that opens §8. */
      camera.home(),
      doc.off(),
      notthis.off(),
      chain.off(),
      box.off(),
      recon.off(),
    ],
    /* The frame empties first, and the question arrives into the empty frame.
       Landing it in the same instant everything else left wasted the pause
       that makes it the section's last word. */
    stages: [{ at: 1400, commands: [host.show({ x: 50, y: 52 }, 1, { line: 'did it want to survive?' })] }],
  },
]
