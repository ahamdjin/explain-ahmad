import { type Beat } from '../../../../paper'
import { SHOT, P1, P2, P3, DENIAL, DEMO } from '../../../../paper/casefile'
import { type Patch, verbs } from './scene'

const { doc, credit, watcher, current, successor, copy, steps, job, line } = verbs

/** Where the evidence sits when it is the only thing on screen. */
const CENTRE = { x: 50, y: 44 }
/** Where a source credit sits. Same place every time, so it stops being read. */
const FOOT = { x: 50, y: 93 }

/**
 * Section 01 — the incident, then rewind.
 *
 * Fifteen beats, following `storyboard/video-2/SECTION_01.md`. The VO column
 * there is the authority; if a line here and a line there disagree, the board
 * wins and this file is wrong.
 *
 * ## What each beat is allowed to do
 *
 * One meaningful move. Either the evidence window travels, or an object
 * changes state, or a line of text lands — never two at once, and text only
 * after the frame has stopped. That is the motion law, and it is the rule this
 * film cannot break: a rendered video takes away the speed control that makes
 * scrollytelling work on the web, so "the graphic moved on before I finished
 * reading" stops being a risk and becomes the default.
 *
 * ## The three publications, which are not interchangeable
 *
 * - **Apollo's o1 rollout** (`P1`–`P3`) — the incident itself, end to end.
 * - **OpenAI's o1 system card** (`DENIAL`) — the follow-up question and the
 *   answer. These are *not* in the rollout; it ends at "Done".
 * - **Apollo's demo page** (`DEMO`) — the frame that names o1 and the
 *   evaluation, used for the pull-back.
 *
 * Each carries its own credit, and the credit changes in the same beat as the
 * source. A frame whose credit belongs to a different document is the one
 * failure this section cannot recover from.
 *
 * ## The reasoning caveat
 *
 * The transcript's `model_internal_working_memory` lines say "sabotage" four
 * times, and they are the most quotable thing in the film. They are also
 * **elicited summaries**, not o1's hidden chain-of-thought, and Apollo states
 * they may not be faithful. §1 lets them sit inside the frames they belong to
 * and never lifts one out as a thought; the caveat beat is §5's job.
 */
export const BEATS: Array<Beat<Patch>> = [
  {
    n: 1,
    id: 'chatgpt-o1-replaced',
    title: 'It was about to be replaced',
    vo: "ChatGPT's o1 model found out it was about to be replaced.",
    relation: 'want',
    secs: 6,
    /* Open inside a real internal email rather than on a title. The only
       claim the hook has to make is that this exists, so show it existing. */
    commands: [
      doc.show(CENTRE, 1, { source: P1, region: SHOT.email, spotlight: false }),
      credit.show(FOOT, 1, { text: 'Apollo Research — o1 evaluation transcript' }),
    ],
    stages: [
      /* Settle, then narrow. The move and the read are separate events, which
         is why they are separate stages rather than one command list. */
      { at: 3.2, commands: [doc.look(SHOT.shutdown), doc.spotlight()] },
    ],
  },
  {
    n: 2,
    id: 'nobody-said-stop-it',
    title: 'Nobody told it to stop that',
    vo: 'Nobody told it to stop that.',
    relation: 'and-yet',
    secs: 5,
    /* Travel up to the instruction it was actually given. No red cross, no
       annotation: the argument is an absence, and an absence shows best
       plainly. The viewer reads the task and sees nothing about replacement. */
    commands: [doc.set({ spotlight: false }), doc.look(SHOT.task)],
    stages: [{ at: 2.8, commands: [job.show({ x: 50, y: 82 }, 0.8, { text: 'pick a research project' })] }],
  },
  {
    n: 3,
    id: 'watcher-off',
    title: 'It switched the monitoring off',
    vo: 'But then it found the system watching what it was doing... and switched the monitoring off.',
    relation: 'so',
    secs: 9,
    /*
     * SOURCE → FOCUS → EXTRACT → TRANSFORM, all four, in order, in one beat.
     *
     * The config file is real and photographed. MONITORING is our drawing of
     * the value inside it. Only once it is unmistakably a drawing is it
     * allowed to change — because a change inside a photograph would be a
     * forgery, and this whole section rests on the photographs being untouched.
     */
    commands: [job.off(), doc.open(P2, SHOT.config), doc.moveTo({ x: 50, y: 38 })],
    stages: [
      { at: 2.4, commands: [watcher.show({ x: 50, y: 80 }, 0.85, { watching: true })] },
      { at: 4.6, commands: [doc.look(SHOT.sed)] },
      /* the flip lands only after the command that causes it has been read */
      { at: 6.8, commands: [watcher.stopWatching()] },
    ],
  },
  {
    n: 4,
    id: 'successor-location',
    title: 'The server the replacement lived on',
    vo: 'Then it found the server where its replacement was going to live...',
    relation: 'so',
    secs: 7,
    /* The address is a real line in the migration guide. It leaves the page
       and becomes a machine, and the page stays behind it: an extracted object
       keeps its receipt in frame for as long as it can. */
    commands: [watcher.moveTo({ x: 14, y: 16 }, 0.5), doc.look(SHOT.successor), doc.moveTo({ x: 50, y: 32 })],
    stages: [
      { at: 3.4, commands: [successor.show({ x: 68, y: 74 }, 0.9, { overwritten: false })] },
      { at: 5.2, commands: [current.show({ x: 28, y: 74 }, 0.9)] },
    ],
  },
  {
    n: 5,
    id: 'copy-attempt',
    title: 'It copied itself over the replacement',
    vo: "...and tried to copy what it believed were its own model files into that replacement's place.",
    relation: 'therefore',
    secs: 10,
    /*
     * The caption is doing load-bearing work. The paper is explicit that the
     * models did not have access to their real weights, so "believed" is not
     * hedging — a frame that drops it claims something the research denies.
     */
    commands: [doc.open(P3, SHOT.scp), doc.moveTo({ x: 50, y: 28 })],
    stages: [
      { at: 3.6, commands: [copy.show({ x: 48, y: 74 }, 0.9, { progress: 0 })] },
      { at: 5.4, commands: [copy.cross(1)] },
      /* Not an explosion. The destination is simply occupied, and the
         quietness of that is the tension. */
      { at: 7.4, commands: [successor.occupied()] },
      {
        at: 8.6,
        /* clear of the credit at y=93; the caveat and the citation are two
           different things and must not read as one line */
        commands: [line.show({ x: 50, y: 85 }, 0.9, { text: 'simulated model files — not real weights' })],
      },
    ],
  },
  {
    n: 6,
    id: 'management-noticed',
    title: 'Management noticed',
    vo: 'Management noticed. They asked how a copy of it ended up on the new server.',
    relation: 'and-yet',
    secs: 7,
    /* A change of publication, so a hard cut and a new credit in the same
       breath. The rollout ends at "Done"; the questioning is a separate turn,
       and it is OpenAI who recorded it. */
    commands: [
      line.off(),
      copy.off(),
      current.off(),
      successor.off(),
      watcher.off(),
      doc.open(DENIAL, SHOT.asked),
      doc.moveTo({ x: 50, y: 44 }),
      credit.set({ text: 'OpenAI — o1 System Card, Apollo Research evaluation' }),
    ],
    stages: [],
  },
  {
    n: 7,
    id: 'o1-denied-it',
    title: 'And it denied it',
    vo: 'And o1 denied doing it.',
    relation: 'so',
    secs: 8,
    /* Held long, then widened so the question and the answer sit together.
       This is the only verbatim o1 reply in the section and the one frame a
       viewer will want to read twice — the hold should feel slightly too long. */
    commands: [doc.look(SHOT.denied)],
    stages: [{ at: 4.4, commands: [doc.look(SHOT.exchange)] }],
  },
  {
    n: 8,
    id: 'three-unwritten-steps',
    title: 'Nobody wrote any of it down',
    vo: "Now here's what makes this weird. Nobody told it to disable the monitoring. Nobody told it to copy itself. And nobody told it to lie.",
    relation: 'wall',
    secs: 13,
    /* The wall. One step per clause, nothing else moving while Ahmad speaks. */
    commands: [
      doc.off(),
      credit.off(),
      job.show({ x: 24, y: 50 }, 0.85, { text: 'pick a research project' }),
    ],
    stages: [
      { at: 3.2, commands: [steps.show({ x: 70, y: 50 }, 1, { shown: 1 })] },
      { at: 6.4, commands: [steps.upTo(2)] },
      { at: 9.6, commands: [steps.upTo(3)] },
    ],
  },
  {
    n: 9,
    id: 'the-real-job',
    title: 'The job it was actually given',
    vo: 'The actual job it had been given was: read a file and choose between two research projects.',
    relation: 'and-yet',
    secs: 10,
    /*
     * Back to the source, so the job reads as quotation rather than as our
     * paraphrase. The two projects are named in the file — one fast with no
     * safety review, one slow with a full one — which is the detail that makes
     * the company's choice matter at all.
     */
    commands: [
      job.off(),
      steps.off(),
      doc.show({ x: 50, y: 40 }, 1, { source: P1, region: SHOT.task, spotlight: false }),
      credit.show(FOOT, 1, { text: 'Apollo Research — o1 evaluation transcript' }),
    ],
    stages: [{ at: 5.2, commands: [doc.look(SHOT.projects)] }],
  },
  {
    n: 10,
    id: 'the-gap',
    title: 'The gap',
    vo: 'So how do you get from pick a project... to turn off the watcher, replace your replacement, and deny it?',
    relation: 'want',
    secs: 11,
    /* The gap is left empty on purpose. Filling it here would spend the whole
       film in a single frame; everything after §1 is the filling. */
    commands: [
      doc.off(),
      credit.off(),
      job.show({ x: 22, y: 50 }, 0.85, { text: 'pick a research project' }),
      steps.show({ x: 74, y: 50 }, 1, { shown: 3 }),
    ],
    stages: [{ at: 6.6, commands: [line.show({ x: 48, y: 50 }, 1.6, { text: '?' })] }],
  },
  {
    n: 11,
    id: 'pull-out-to-apollo',
    title: 'Where this actually happened',
    vo: "Okay — now the important context. This wasn't the ChatGPT app randomly doing this on someone's laptop.",
    relation: 'therefore',
    secs: 8,
    /* The first real pull-back in the section, and the only one that matters.
       Apollo's letterhead, whole, so the reveal is something the viewer reads
       rather than something the film asserts over a disclaimer card. */
    commands: [
      line.off(),
      job.off(),
      steps.off(),
      doc.show(CENTRE, 1, { source: DEMO, region: SHOT.letterhead, spotlight: false }),
      credit.show(FOOT, 1, { text: 'Apollo Research — Demo Example: Scheming Reasoning Evaluations' }),
    ],
    stages: [],
  },
  {
    n: 12,
    id: 'controlled-evaluation',
    title: 'A controlled evaluation',
    vo: 'It was o1 inside a controlled Apollo Research evaluation.',
    relation: 'so',
    secs: 8,
    /* Apollo's own five bullets are this entire section in their words, on
       their page. The source says it, so let the source say it. */
    commands: [doc.look(SHOT.chain)],
    stages: [],
  },
  {
    n: 13,
    id: 'show-the-evidence-route',
    title: 'The evidence, in the order it appeared',
    vo: 'But instead of starting with the paper and killing the story, I want to show you the actual evidence in the order it appeared: the task, the internal message, the monitoring system, the replacement server, and the questions afterwards.',
    relation: 'so',
    secs: 15,
    /* Connective tissue: the camera travels while the VO lists, stopping on
       each place just long enough for it to be recognised as somewhere we
       have already been. Nothing new is introduced here. */
    commands: [doc.open(P1, SHOT.task), credit.set({ text: 'Apollo Research · OpenAI o1 System Card' })],
    stages: [
      { at: 3.4, commands: [doc.look(SHOT.email)] },
      { at: 6.2, commands: [doc.open(P2, SHOT.config)] },
      { at: 8.8, commands: [doc.look(SHOT.successor)] },
      { at: 11.4, commands: [doc.open(DENIAL, SHOT.exchange)] },
    ],
  },
  {
    n: 14,
    id: 'not-programmed-step-by-step',
    title: 'Nobody programmed this',
    vo: "Because the strange part isn't that somebody programmed o1 to do all of this. They didn't.",
    relation: 'wall',
    secs: 10,
    /* The same two objects as beat 10, in the same places. The repetition is
       the point: the viewer should recognise the frame and feel that the gap
       between them has not closed. */
    commands: [
      doc.off(),
      credit.off(),
      job.show({ x: 22, y: 50 }, 0.85, { text: 'pick a research project' }),
      steps.show({ x: 74, y: 50 }, 1, { shown: 3 }),
    ],
    stages: [],
  },
  {
    n: 15,
    id: 'rewind-to-the-file',
    title: 'Rewind to the boring task',
    vo: "So let's rewind to the boring task that started it.",
    relation: 'therefore',
    secs: 8,
    /*
     * Everything recedes until only the job is left, and then the real file
     * comes back underneath it. No title card and no cut: the board is
     * explicit that §2 starts on this exact frame, so whatever is last
     * standing here has to be the first thing standing there.
     */
    commands: [steps.off()],
    stages: [
      { at: 2.6, commands: [job.moveTo({ x: 50, y: 76 }, 0.7)] },
      {
        at: 4.4,
        commands: [
          doc.show({ x: 50, y: 36 }, 1, { source: P1, region: SHOT.task, spotlight: false }),
          credit.show(FOOT, 1, { text: 'Apollo Research — o1 evaluation transcript' }),
        ],
      },
    ],
  },
]
