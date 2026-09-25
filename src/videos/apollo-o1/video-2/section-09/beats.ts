import { type Beat } from '../../../../paper'
import { CONCEPT, PAPER } from '../../../../paper/casefile'
import { type Patch, verbs } from './scene'

const { camera, model, doc, claim, micro, job, goal, road, steps, never, gap, dest, final, sources, endcard } = verbs

/**
 * Section 09 — they gave it the destination.
 *
 * Ten beats, following `storyboard/video-2/SECTION_09.md`.
 *
 * ## Beat 7 is the whole film's structural payoff
 *
 * §4 beat 8 left an empty middle between **pick a research project** and
 * **turn off the watcher**, and nothing has filled it for five sections. This
 * beat recreates that frame with the same component and the same two strings,
 * and fills it with the route the film followed.
 *
 * It is the only composition used twice in the film, and the exception is the
 * point. If it drifts, the payoff is a summary.
 *
 * ## The ending is not optional
 *
 * Beat 9 lands, then black for a full second, then beat 10 holds the sources
 * long enough to screenshot. `Sources` is the film's receipt: if a document is
 * not on that list, no claim in the film may rest on it -- which is a
 * constraint on the build, not just a frame at the end.
 */
export const BEATS: Array<Beat<Patch>> = [
  {
    n: 1,
    id: 'claim-on-trial',
    title: 'The claim on trial',
    vo: 'And this is why: "ChatGPT only does what you tell it to do" is incomplete.',
    relation: 'want',
    secs: 6,
    /*
     * Full clean frame, one sentence, no source underneath -- this is the
     * claim the film has been answering, not a quotation from anybody in
     * particular, and attributing it would pick a fight with a person instead
     * of an idea.
     */
    commands: [
      goal.off(),
      road.off(),
      /* The mark says which thing; the card says the claim about it. Together
         they are shorter than the sentence that had to carry both. */
      model.show({ x: 50, y: 28 }, 1.5),
      claim.show({ x: 50, y: 60 }, 1.1, { text: 'only does what you tell it to do.' }),
    ],
    /* The claim lands, and then it is struck -- "is incomplete" is the second
       half of the line and it should not already be true when the line starts. */
    stages: [{ at: 2400, commands: [claim.set({ rejected: true })] }],
  },
  {
    n: 2,
    id: 'literal-agent-is-useless',
    title: 'Specify every step',
    vo: 'If we had to specify every click, file, command, and intermediate step... an agent would barely be an agent.',
    relation: 'so',
    secs: 7.3,
    /*
     * Micro-instructions stacking, accelerating. **Stop before it becomes a
     * joke** -- six is enough to feel absurd, twelve is a gag and the section
     * is not making a gag.
     */
    commands: [
      /* Parked in the corner from here: it is who the section is about,
         not something to be re-looked-at every beat. */
      model.moveTo({ x: 7, y: 9 }, 0.42),
      claim.moveTo({ x: 50, y: 20 }, 0.7),
      micro.show({ x: 50, y: 58 }, 1, { shown: 0, collapsed: false }),
    ],
    stages: [
      { at: 600, commands: [micro.stack(2)] },
      { at: 1600, commands: [micro.stack(4)] },
      { at: 2400, commands: [micro.stack(6)] },
    ],
  },
  {
    n: 3,
    id: 'the-real-interface',
    title: 'We give it a goal',
    vo: 'We give agents a goal because we want them to figure out the steps.',
    relation: 'therefore',
    secs: 5.6,
    /* Twenty lines become two. That collapse is the actual interface. */
    commands: [claim.off()],
    stages: [
      { at: 800, commands: [micro.collapse()] },
      {
        at: 2000,
        commands: [
          micro.off(),
          job.show({ x: 50, y: 40 }, 1.1, { text: 'pick a research project' }),
          goal.show({ x: 50, y: 62 }, 1, { text: 'maximize research speed' }),
        ],
      },
    ],
  },
  {
    n: 4,
    id: 'usually-the-feature',
    title: 'Usually, that is the feature',
    vo: 'Usually, that’s the feature.',
    relation: 'so',
    secs: 2.5,
    /* The ordinary steps, in the film's own shapes. Nothing sinister -- this
       is what everybody wanted when they asked for an agent. */
    commands: [
      job.moveTo({ x: 24, y: 24 }, 0.7),
      goal.moveTo({ x: 24, y: 40 }, 0.7),
      /* The road is this section's argument, and it was drawn smaller than
         the caption cards beside it -- 55% text against 23% drawn. */
      road.show({ x: 53, y: 34 }, 1.38, { drawn: 0 }),
      steps.show({ x: 56, y: 70 }, 1.2, { kind: 'wanted', shown: 0 }),
    ],
    stages: [
      { at: 550, commands: [road.draw(1)] },
      { at: 1300, commands: [steps.show_('wanted', 3)] },
    ],
  },
  {
    n: 5,
    id: 'same-mechanism',
    title: 'The same road',
    vo: 'Apollo’s experiment shows the uncomfortable version: the system can discover a useful step nobody intended it to choose.',
    relation: 'and-yet',
    secs: 7.2,
    /*
     * **The goal object does not change. The road does not change. The shapes
     * do not change.** Only the contents of the steps do, and that identity is
     * the whole argument -- the unwanted behaviour came out of the same
     * mechanism as the wanted behaviour, not a different one.
     */
    /* Apollo's own diagram of the thing being described, pasted small and
       high so the drawn road still owns the middle. Cited, not dissected. */
    commands: [doc.show({ x: 64, y: 22 }, 0.46, { source: CONCEPT })],
    stages: [{ at: 1600, commands: [steps.show_('unwanted', 3)] }],
  },
  {
    n: 6,
    id: 'what-was-never-typed',
    title: 'Nobody typed this',
    vo: 'Nobody typed: disable monitoring. Replace yourself. Lie.',
    relation: 'wall',
    secs: 4.1,
    /*
     * Three instruction fields that appear and **stay empty**. The emptiness
     * is the content, so they are held, not flashed -- and nothing is ever
     * typed into them.
     */
    commands: [
      road.off(),
      steps.off(),
      job.off(),
      goal.off(),
      /* The cited figure leaves with the road it was citing. Left on, it sat
         behind the payoff for four more beats. */
      doc.off(),
      never.show({ x: 50, y: 50 }, 1.6, { shown: 0 }),
    ],
    stages: [
      { at: 650, commands: [never.upTo(1)] },
      { at: 1450, commands: [never.upTo(2)] },
      { at: 2250, commands: [never.upTo(3)] },
    ],
  },
  {
    n: 7,
    id: 'return-to-first-gap',
    title: 'The gap, filled',
    vo: 'We started with a gap between the instruction and the behavior. Now we know what filled it.',
    relation: 'therefore',
    /**
     * Prerequisite.
     *
     * The film's only composition used twice: the same Gap component with the
     * same two strings, left empty there and filled here.
     */
    needs: '§04:nobody-asked-for-that',
    secs: 6.7,
    /*
     * **The payoff.** §4 beat 8's exact frame -- same component, same two
     * strings, same order -- and the middle that has been empty for five
     * sections finally fills.
     *
     * The fill lands at 2.8s, on the word "filled". Earlier and it pre-empts
     * the line; later and the beat is over.
     */
    commands: [never.off(), gap.show({ x: 50, y: 52 }, 1.2, { filled: false })],
    stages: [{ at: 2800, commands: [gap.fill()] }],
  },
  {
    n: 8,
    id: 'destination',
    title: 'They gave it the destination',
    vo: 'They gave it the destination.',
    relation: 'therefore',
    secs: 2.5,
    /* Everything goes but two marks: where it started, and where it was
       pointed. Nothing in between yet. */
    commands: [
      /* The mark goes. The film's last two images -- the destination, and the
         road being invented -- are the payoff, and they get a clean frame.
         The road at this size runs the full width, so nothing else fits. */
      model.off(),gap.off(), camera.to({ x: 50, y: 48 }, 1), dest.show({ x: 50, y: 48 }, 1.5)],
    stages: [],
  },
  {
    n: 9,
    id: 'inventing-the-road',
    title: 'And it started inventing the road',
    vo: 'And it started inventing the road.',
    relation: 'wall',
    secs: 3.2,
    /*
     * The route draws itself one final time, using the shapes from the real
     * incident. The line lands, and then black.
     *
     * **No call to action for one full second.** The board is explicit and it
     * is right: a subscribe prompt over the last frame of this film would undo
     * the register the whole thing has been working in.
     */
    /* `final` no longer carries its own position -- the road renders inside
       the destination row so the two cannot disagree about where the marks
       are. It only carries how far the road has been drawn. */
    commands: [final.show({ x: 50, y: 48 }, 1.34, { drawn: 0 })],
    /* The film's last move: the frame opens out as the road is drawn, so the
       closing image arrives rather than sitting there. */
    stages: [
      { at: 1000, commands: [final.draw(1), camera.to({ x: 50, y: 50 }, 0.96)] },
    ],
  },
  {
    n: 10,
    id: 'sources',
    title: 'Sources',
    vo: '',
    relation: 'therefore',
    secs: 2.5,
    /*
     * Held long enough to screenshot, because a sceptical viewer screenshots
     * exactly one frame and it should be this one.
     *
     * If a document is not on this list, no claim in the film may rest on it.
     * That is a constraint on the build, not a frame at the end.
     */
    /* The paper, as published. A credits card that lists three URLs is a
       claim the viewer has to take on trust; the title page is the thing. */
    commands: [
      dest.off(),
      final.off(),
      model.off(),
      /*
       * Three things across the frame, and a plate is 94cqw before scaling --
       * at 0.5 the paper was 752px wide and ran under the credits beside it.
       */
      doc.show({ x: 14, y: 50 }, 0.32, { source: PAPER }),
      sources.show({ x: 48, y: 50 }, 0.88),
      endcard.show({ x: 82, y: 50 }, 0.78),
    ],
    stages: [],
  },
]
