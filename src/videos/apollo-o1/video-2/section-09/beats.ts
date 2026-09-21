import { type Beat } from '../../../../paper'
import { type Patch, verbs } from './scene'

const { claim, micro, job, goal, road, steps, never, gap, dest, final, sources, endcard } = verbs

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
    secs: 5,
    /*
     * Full clean frame, one sentence, no source underneath -- this is the
     * claim the film has been answering, not a quotation from anybody in
     * particular, and attributing it would pick a fight with a person instead
     * of an idea.
     */
    commands: [
      goal.off(),
      road.off(),
      claim.show({ x: 50, y: 46 }, 1.25, { text: 'ChatGPT only does what you tell it to do.' }),
    ],
    stages: [],
  },
  {
    n: 2,
    id: 'literal-agent-is-useless',
    title: 'Specify every step',
    vo: 'If we had to specify every click, file, command, and intermediate step... an agent would barely be an agent.',
    relation: 'so',
    secs: 6,
    /*
     * Micro-instructions stacking, accelerating. **Stop before it becomes a
     * joke** -- six is enough to feel absurd, twelve is a gag and the section
     * is not making a gag.
     */
    commands: [
      claim.moveTo({ x: 50, y: 20 }, 0.7),
      micro.show({ x: 50, y: 58 }, 1, { shown: 0, collapsed: false }),
    ],
    stages: [
      { at: 0.6, commands: [micro.stack(2)] },
      { at: 1.6, commands: [micro.stack(4)] },
      { at: 2.4, commands: [micro.stack(6)] },
    ],
  },
  {
    n: 3,
    id: 'the-real-interface',
    title: 'We give it a goal',
    vo: 'We give agents a goal because we want them to figure out the steps.',
    relation: 'therefore',
    secs: 5,
    /* Twenty lines become two. That collapse is the actual interface. */
    commands: [claim.off()],
    stages: [
      { at: 0.8, commands: [micro.collapse()] },
      {
        at: 2.0,
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
    secs: 5,
    /* The ordinary steps, in the film's own shapes. Nothing sinister -- this
       is what everybody wanted when they asked for an agent. */
    commands: [
      job.moveTo({ x: 24, y: 24 }, 0.7),
      goal.moveTo({ x: 24, y: 40 }, 0.7),
      road.show({ x: 58, y: 34 }, 1, { drawn: 0 }),
      steps.show({ x: 58, y: 66 }, 1, { kind: 'wanted', shown: 0 }),
    ],
    stages: [
      { at: 0.6, commands: [road.draw(1)] },
      { at: 1.4, commands: [steps.show_('wanted', 3)] },
    ],
  },
  {
    n: 5,
    id: 'same-mechanism',
    title: 'The same road',
    vo: 'Apollo’s experiment shows the uncomfortable version: the system can discover a useful step nobody intended it to choose.',
    relation: 'and-yet',
    secs: 6,
    /*
     * **The goal object does not change. The road does not change. The shapes
     * do not change.** Only the contents of the steps do, and that identity is
     * the whole argument -- the unwanted behaviour came out of the same
     * mechanism as the wanted behaviour, not a different one.
     */
    commands: [],
    stages: [{ at: 1.6, commands: [steps.show_('unwanted', 3)] }],
  },
  {
    n: 6,
    id: 'what-was-never-typed',
    title: 'Nobody typed this',
    vo: 'Nobody typed: disable monitoring. Replace yourself. Lie.',
    relation: 'wall',
    secs: 6,
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
      never.show({ x: 50, y: 50 }, 1.1, { shown: 0 }),
    ],
    stages: [
      { at: 0.8, commands: [never.upTo(1)] },
      { at: 1.8, commands: [never.upTo(2)] },
      { at: 2.8, commands: [never.upTo(3)] },
    ],
  },
  {
    n: 7,
    id: 'return-to-first-gap',
    title: 'The gap, filled',
    vo: 'We started with a gap between the instruction and the behavior. Now we know what filled it.',
    relation: 'therefore',
    secs: 6,
    /*
     * **The payoff.** §4 beat 8's exact frame -- same component, same two
     * strings, same order -- and the middle that has been empty for five
     * sections finally fills.
     *
     * The fill lands at 2.8s, on the word "filled". Earlier and it pre-empts
     * the line; later and the beat is over.
     */
    commands: [never.off(), gap.show({ x: 50, y: 50 }, 1.25, { filled: false })],
    stages: [{ at: 2.8, commands: [gap.fill()] }],
  },
  {
    n: 8,
    id: 'destination',
    title: 'They gave it the destination',
    vo: 'They gave it the destination.',
    relation: 'therefore',
    secs: 5,
    /* Everything goes but two marks: where it started, and where it was
       pointed. Nothing in between yet. */
    commands: [gap.off(), dest.show({ x: 50, y: 48 }, 1.15)],
    stages: [],
  },
  {
    n: 9,
    id: 'inventing-the-road',
    title: 'And it started inventing the road',
    vo: 'And it started inventing the road.',
    relation: 'wall',
    secs: 6,
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
    commands: [final.show({ x: 50, y: 48 }, 1, { drawn: 0 })],
    stages: [{ at: 1.0, commands: [final.draw(1)] }],
  },
  {
    n: 10,
    id: 'sources',
    title: 'Sources',
    vo: '',
    relation: 'therefore',
    secs: 6,
    /*
     * Held long enough to screenshot, because a sceptical viewer screenshots
     * exactly one frame and it should be this one.
     *
     * If a document is not on this list, no claim in the film may rest on it.
     * That is a constraint on the build, not a frame at the end.
     */
    commands: [dest.off(), final.off(), sources.show({ x: 30, y: 50 }, 1), endcard.show({ x: 76, y: 50 }, 0.9)],
    stages: [],
  },
]
