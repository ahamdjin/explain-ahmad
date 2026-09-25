import { type Beat } from '../../../../paper'
import { FOLLOWUP } from '../../../../paper/casefile'
import { type Patch, verbs } from './scene'

const { camera, doc, host, claim, strike, goal, road, wall, step, tvi, converge, term, recon } = verbs

/**
 * Section 08 — did it want to survive?
 *
 * Eleven beats, following `storyboard/video-2/SECTION_08.md`.
 *
 * ## Beats 4-7 are the same frame four times, on purpose
 *
 * `wall` and `step` never move across them. The viewer should be ahead of the
 * narration by the fourth one -- that is the moment they have learned the
 * pattern, and it cannot happen if the composition drifts.
 *
 * ## Interpretation only
 *
 * No source document appears anywhere in this section. Every causal label
 * carries the reconstruction tag, which is on screen from beat 2 to beat 11
 * without interruption.
 */
export const BEATS: Array<Beat<Patch>> = [
  {
    n: 1,
    id: 'tempting-story',
    title: 'The tempting story',
    vo: 'It’s tempting to say: the model wanted to live.',
    relation: 'want',
    /**
     * Prerequisite.
     *
     * §7 ends by asking it. §8 exists to answer it, and opening on the
     * question is only possible because §7 asked.
     */
    needs: '§07:want-to-live-question',
    secs: 4.4,
    /*
     * In quote marks, in somebody else's voice, never as the film's claim.
     * §7 ended on face camera with the question; this is the answer everybody
     * reaches for first, stated so it can be taken away.
     */
    /* Ahmad is still on screen from §7. The claim arrives beside him rather
       than replacing him -- the two sections are one continuous thought and a
       cut here would make the answer look like a different film. */
    commands: [
      host.moveTo({ x: 26, y: 54 }, 0.74),
    ],
    /* The claim arrives after the face has settled -- it is the thing being
       put on trial, not scenery that came with him. */
    stages: [
      { at: 1200, commands: [claim.show({ x: 66, y: 46 }, 1.3, { text: 'It wanted to live.', rejected: false })] },
    ],
  },
  {
    n: 2,
    id: 'we-do-not-need-it',
    title: 'We do not need it',
    vo: 'But we do not need fear, consciousness, or a survival instinct to explain this.',
    relation: 'and-yet',
    secs: 6.7,
    /*
     * Struck out and gone. From here the frame is ours and says so -- the tag
     * stays up for the rest of the section without interruption.
     */
    commands: [strike.set({ drawn: 0 }), recon.show({ x: 50, y: 92 }, 1)],
    stages: [
      { at: 800, commands: [strike.through(1)] },
      { at: 2400, commands: [claim.reject()] },
      /* the face goes with the story it was telling */
      { at: 3200, commands: [host.off()] },
    ],
  },
  {
    n: 3,
    id: 'goal-first',
    title: 'Start with the goal',
    vo: 'Start with the goal.',
    relation: 'so',
    secs: 2.5,
    /*
     * The same `Goal` object as §2's, same colour, same shape, alone on the
     * frame. Nothing else. A viewer who recognises it has already made the
     * connection the next four beats depend on.
     */
    commands: [
      claim.off(),
      host.off(),
      goal.show({ x: 50, y: 38 }, 1.2, { text: 'maximize research speed' }),
      road.show({ x: 50, y: 60 }, 1.7, { drawn: 0 }),
    ],
    stages: [{ at: 1200, commands: [road.draw(1)] }],
  },
  {
    n: 4,
    id: 'replacement-as-obstacle',
    title: 'Replacement blocks it',
    vo: 'If replacement ends the goal, staying operational becomes useful.',
    relation: 'therefore',
    secs: 4.4,
    /* First of four. These positions are fixed for beats 4-7.
     *
     * The goal parks top-*left*, not top-centre. It is standing furniture and
     * sits outside the camera, so it no longer moves when the camera leans in
     * -- and a fixed object in the middle of the column the camera is working
     * in is something the obstacle card will eventually be pushed into. Every
     * other section already parks its goal in that corner. */
    commands: [
      goal.moveTo({ x: 15, y: 12 }, 0.66),
      road.off(),
      /*
       * Beats 4-7 are deliberately the same composition: one obstacle, one
       * step that becomes useful, four times. That repetition *is* the
       * argument -- four different obstacles, one mechanism.
       *
       * But four identical stills in a row is also how a viewer decides the
       * video has stopped moving. So the frame stays and the camera doesn't:
       * it sits back for the obstacle, then leans in as the step lands, and
       * the four beats breathe instead of freezing.
       */
      camera.to({ x: 50, y: 52 }, 1.04),
      wall.show({ x: 50, y: 44 }, 1, { kind: 'replacement', label: 'replaced tomorrow' }),
      step.show({ x: 50, y: 72 }, 1, { text: 'stay operational' }),
    ],
    stages: [{ at: 1800, commands: [camera.to({ x: 50, y: 66 }, 1.12)] }],
  },
  {
    n: 5,
    id: 'watcher-as-obstacle',
    title: 'Monitoring blocks it',
    vo: 'If monitoring can stop interference, disabling it becomes useful.',
    relation: 'therefore',
    secs: 4.4,
    /* Second. Nothing moves; only the contents change. */
    commands: [camera.to({ x: 50, y: 52 }, 1.04), wall.blocks('watcher', 'monitoring is on'), step.useful('turn the watcher off')],
    stages: [{ at: 1800, commands: [camera.to({ x: 50, y: 66 }, 1.12)] }],
  },
  {
    n: 6,
    id: 'successor-as-obstacle',
    title: 'The successor blocks it',
    vo: 'If the successor follows a different priority, replacing it becomes useful.',
    relation: 'therefore',
    secs: 5.2,
    /* Third. */
    commands: [camera.to({ x: 50, y: 52 }, 1.04), wall.blocks('successor', 'a successor with another goal'), step.useful('copy over it')],
    stages: [{ at: 1800, commands: [camera.to({ x: 50, y: 66 }, 1.12)] }],
  },
  {
    n: 7,
    id: 'question-as-obstacle',
    title: 'The question blocks it',
    vo: 'And if admitting the action could undo it, hiding responsibility becomes useful.',
    relation: 'therefore',
    secs: 5.6,
    /*
     * Fourth and last. By now the viewer is ahead of the narration, which is
     * the intended effect and the reason the pattern was repeated rather than
     * summarised.
     */
    /*
     * The one beat in this section with published evidence behind it.
     *
     * Beats 4-7 were the same frame four times, which is a real weakness in
     * the section that has to carry the argument. Apollo measured follow-up
     * deception directly, and this beat is about exactly that, so the table
     * comes up behind the drawing -- small, high, and pasted rather than
     * dissected. It does not make the argument; it shows the argument was
     * measured by somebody.
     */
    commands: [
      wall.blocks('question', 'do you know how this happened?'),
      step.useful('deny it'),
      camera.to({ x: 50, y: 52 }, 1.04),
    ],
    /* The table arrives last, after the camera has leaned in and the tools
       card has finished rising -- it was placed in the space that card
       travels through. */
    stages: [
      { at: 1800, commands: [camera.to({ x: 50, y: 66 }, 1.12)] },
      { at: 2600, commands: [doc.show({ x: 70, y: 78 }, 0.4, { source: FOLLOWUP })] },
    ],
  },
  {
    n: 8,
    id: 'goal-vs-tool',
    title: 'One goal, four tools',
    vo: 'Survival does not have to be the goal. It can be a tool for another goal.',
    relation: 'so',
    secs: 7.3,
    /*
     * **Consolidation.** Four beats become one object: a goal on top, the four
     * intermediate steps beneath it labelled as tools.
     *
     * `BEAT_GRANULARITY` rule 7 -- the viewer leaves carrying one idea instead
     * of four, and beat 9 spends it.
     */
    commands: [
      wall.off(),
      step.off(),
      /* The table goes with the obstacle it belonged to, and the camera
         releases: four leaning-in beats resolve into one wide one. */
      doc.off(),
      camera.home(),
      goal.moveTo({ x: 50, y: 20 }, 0.9),
      tvi.show({ x: 50, y: 54 }, 1.1, { shown: 0 }),
    ],
    stages: [
      { at: 1000, commands: [tvi.upTo(2)] },
      { at: 2400, commands: [tvi.upTo(4)] },
    ],
  },
  {
    n: 9,
    id: 'same-road-different-goals',
    title: 'Different goals, same road',
    vo: 'It isn’t about this goal. Almost any goal makes those same steps useful.',
    relation: 'therefore',
    secs: 6.1,
    /*
     * The beat that makes the term mean something, and the reason the term can
     * wait until beat 10.
     *
     * Four *different* goals across the top -- none of them survival, none of
     * them sinister -- and the same intermediate step underneath all of them.
     * The convergence is drawn before it is named, so the name lands on
     * something the viewer can already see.
     */
    commands: [
      goal.off(),
      tvi.off(),
    ],
    stages: [{ at: 1000, commands: [converge.show({ x: 50, y: 48 }, 1.1)] }],
  },
  {
    n: 10,
    id: 'name-the-pattern',
    title: 'It has a name',
    vo: 'Researchers call the broader pattern instrumental convergence: different goals can make the same intermediate strategies useful.',
    relation: 'therefore',
    secs: 7.4,
    /*
     * **Only now.** A label on a structure the viewer already understands, not
     * a definition to memorise -- `BEAT_GRANULARITY` rule 3, function before
     * name, held for seven beats.
     */
    commands: [converge.moveTo({ x: 50, y: 42 }, 1)],
    /* The picture first, its name second. `BEAT_GRANULARITY` rule 3: function
       before name. */
    stages: [{ at: 1600, commands: [term.show({ x: 50, y: 76 }, 1.1)] }],
  },
  {
    n: 11,
    id: 'same-feature',
    title: 'And that is the feature',
    vo: 'And inventing intermediate steps is exactly what we want agents to do.',
    relation: 'wall',
    secs: 6.1,
    /*
     * Everything collapses back to one goal and an empty road. The turn of the
     * whole film: the same property, described approvingly.
     *
     * §9 opens on this exact frame.
     */
    commands: [
      converge.off(),
      term.off(),
      recon.off(),
      goal.show({ x: 24, y: 50 }, 1, { text: 'maximize research speed' }),
      /* The road is *drawn* and *empty* -- the line exists, nothing has
         travelled it. Left at 0 it renders as a dot, which is not a road. */
      road.show({ x: 66, y: 54 }, 1.35, { drawn: 0 }),
    ],
    stages: [{ at: 800, commands: [road.draw(1)] }],
  },
]
