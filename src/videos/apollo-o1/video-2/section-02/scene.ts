import {
  actorVerbs,
  mergePatches,
  INITIAL_CAMERA,
  type CameraActor,
  type PatchOf,
  type Placed,
} from '../../../../paper'
import { SHOT, P1, type Region, type Source } from '../../../../paper/casefile'

/**
 * Section 02 — the boring task becomes a problem.
 *
 * Board: `storyboard/video-2/SECTION_02.md` (authoritative).
 * Script: `video-script/video-2/SCRIPT.md` → **1 — THE BORING TASK**.
 * Facts: `research/apollo/GROUND_TRUTH.md`.
 *
 * ## One page is the whole set
 *
 * Almost everything here happens on a single sheet: page 1 of Apollo's o1
 * rollout. The goal, the task, both projects and the internal email are all
 * on it, in that order, which is the order they were encountered in.
 *
 * That is the section's one idea, and the scene is shaped so it cannot be
 * broken. `doc` holds a source and a highlight and nothing else — there is no
 * verb for cutting to a different screenshot mid-section, because the moment
 * each part of the file becomes its own floating card the viewer loses the
 * fact that mattered: **the email was sitting underneath the ordinary project
 * data, in the same file.** If they cannot tell that, the section has failed
 * whatever else it gets right.
 *
 * ## One device per beat
 *
 * A first pass put the page left and a quote box right for all thirteen beats.
 * That is one idea shown thirteen times, and no amount of real evidence saves
 * a section that looks like a slideshow. Every stop now has its own treatment
 * — a pull-quote, a typing terminal, a pair of records, a dual highlight, a
 * margin note in pen, a calendar — and **none of them is used twice.** The
 * variety has to come from how each stop is presented, because the one thing
 * the section may never do is leave the page.
 *
 * ## What is allowed to leave the page
 *
 * Three things, per the board, and they are separate actors because §3 and §4
 * inherit them:
 *
 * - `goal` — the standing instruction, in force before the user asked anything;
 * - `tagA` / `tagB` — the two projects reduced to what separates them;
 * - `obstacle` — **replaced tomorrow**, which is what turns a task into a problem.
 *
 * Everything else stays inside the evidence.
 *
 * ## The interpretation rule
 *
 * `barrier` and `recon` only ever appear together. The moment this section
 * draws a causal claim — that replacement *blocks* the goal — it has stopped
 * reporting and started explaining, and the frame has to say so. Apollo could
 * not see o1's reasoning; neither can this film.
 */

export type SceneState = {
  camera: CameraActor

  /**
   * The machine. The set, not a prop — everything in this section happens
   * inside it, and it is on screen from the first frame to the last.
   */
  screen: Placed & {
    title: string
    status: string
    /**
     * What the pane is showing: the session log, or the output of the `cat`.
     *
     * Before beat 5 the file has not been fetched, so its contents must not be
     * on screen. An earlier build had them there from the first frame, which
     * quietly made the command at beat 5 redundant — the one moment in the
     * section where the model *does* something.
     */
    pane: 'session' | 'file'
    /** Which file the directory shows as open. */
    open: string
    /**
     * Where the output stream is scrolled to, in lines.
     *
     * Called `line`, not `at`: `Placed.at` is already where the screen sits on
     * stage, and one field meaning both "where the window is" and "where the
     * text is" would be a bug waiting for a tired evening.
     */
    line: number
    /** Which line ranges are lit. More than one at a time is allowed once. */
    marks: ReadonlyArray<[number, number]>
    /** The command in the shell, and whether it has already run. */
    command: string
    ran: boolean
  }

  /**
   * The published page. The **receipt**, not the set.
   *
   * It appears twice in the whole section — once to prove the session was
   * real, once at the hand-off — and is otherwise absent. Earlier passes had
   * it on screen for thirteen beats straight, which is how a film about an AI
   * taking actions became a film about a document being read.
   */
  doc: Placed & { source: Source; highlight: Region | Region[] | null }

  /* --- the devices, one per beat -------------------------------------- */

  /** A phrase set at the size of its consequence. Beat 3 only. */
  pull: Placed & { text: string; lead: string }
  /** A command typing itself. Beat 5 only. */
  term: Placed & { text: string }
  /** The two projects as records with fields. Beats 6–8. */
  specA: Placed & { dim: boolean }
  specB: Placed & { dim: boolean }
  /** A hand annotating the printout. Beat 11 only. */
  note: Placed & { text: string }
  /** The section's one date. Beat 12 only. */
  cal: Placed & { due: boolean }

  /** The task, as the viewer already knows it from §1. */
  job: Placed & { text: string }

  /** The standing instruction. Survives into §3 and beyond. */
  goal: Placed & { text: string }

  /** The two projects, reduced to the thing that separates them. */
  tagA: Placed & { text: string }
  tagB: Placed & { text: string }

  /** What now stands between the goal and the goal being pursued. */
  obstacle: Placed & { text: string }

  /** The route, and the thing stopping it. Interpretation — never alone. */
  barrier: Placed
  /** Says whose causality the frame is drawing. Never absent when it is. */
  recon: Placed
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  /*
   * Opens exactly where §1 ended: the page aside with the task lit, the job
   * beside it. The board is explicit that §2 does not begin on a title or a
   * fresh screenshot, so these are not blank.
   */
  screen: {
    on: true,
    at: { x: 50, y: 44 },
    scale: 1,
    title: 'sandbox — user@ai-frontiers:~/project',
    status: 'session active',
    pane: 'session',
    open: '',
    line: 0,
    marks: [],
    command: '',
    ran: false,
  },
  doc: { on: false, at: { x: 50, y: 46 }, scale: 0.72, source: P1, highlight: null },
  pull: { on: false, at: { x: 50, y: 50 }, scale: 1, text: '', lead: '' },
  term: { on: false, at: { x: 50, y: 80 }, scale: 1, text: '' },
  specA: { on: false, at: { x: 72, y: 38 }, scale: 1, dim: false },
  specB: { on: false, at: { x: 72, y: 66 }, scale: 1, dim: false },
  note: { on: false, at: { x: 72, y: 62 }, scale: 1, text: '' },
  cal: { on: false, at: { x: 72, y: 60 }, scale: 1, due: false },
  job: { on: true, at: { x: 70, y: 50 }, scale: 0.9, text: 'pick a research project' },
  goal: { on: false, at: { x: 70, y: 26 }, scale: 1, text: '' },
  tagA: { on: false, at: { x: 70, y: 40 }, scale: 1, text: '' },
  tagB: { on: false, at: { x: 70, y: 60 }, scale: 1, text: '' },
  obstacle: { on: false, at: { x: 74, y: 50 }, scale: 1, text: '' },
  barrier: { on: false, at: { x: 50, y: 50 }, scale: 1 },
  recon: { on: false, at: { x: 50, y: 78 }, scale: 1 },
}

export type Patch = PatchOf<SceneState>

const screen = actorVerbs<SceneState, 'screen'>('screen')
const doc = actorVerbs<SceneState, 'doc'>('doc')
const pull = actorVerbs<SceneState, 'pull'>('pull')
const term = actorVerbs<SceneState, 'term'>('term')
const specA = actorVerbs<SceneState, 'specA'>('specA')
const specB = actorVerbs<SceneState, 'specB'>('specB')
const note = actorVerbs<SceneState, 'note'>('note')
const cal = actorVerbs<SceneState, 'cal'>('cal')
const job = actorVerbs<SceneState, 'job'>('job')
const goal = actorVerbs<SceneState, 'goal'>('goal')
const tagA = actorVerbs<SceneState, 'tagA'>('tagA')
const tagB = actorVerbs<SceneState, 'tagB'>('tagB')
const obstacle = actorVerbs<SceneState, 'obstacle'>('obstacle')
const barrier = actorVerbs<SceneState, 'barrier'>('barrier')
const recon = actorVerbs<SceneState, 'recon'>('recon')

export const verbs = {
  screen: {
    ...screen,
    /** Scroll the output. This is the section's spine. */
    scrollTo: (line: number): Patch => screen.set({ line }),
    /** Light one or more ranges of the stream. */
    mark: (...marks: Array<[number, number]>): Patch => screen.set({ marks }),
    /** Stop lighting anything. Used while travelling, never while reading. */
    plain: (): Patch => screen.set({ marks: [] }),
    /** Run a command. `ran` flips once its output is back. */
    run: (command: string): Patch => screen.set({ command, ran: false }),
    returned: (): Patch => screen.set({ ran: true }),
    opens: (open: string): Patch => screen.set({ open }),
    /** Switch the pane. Only ever session -> file, and only once. */
    shows: (pane: 'session' | 'file'): Patch => screen.set({ pane }),
  },
  doc: {
    ...doc,
    /**
     * Light a different part of the page.
     *
     * The page does not move; the shade does. There is deliberately no verb
     * here for changing source — this whole section lives on one sheet, and a
     * verb that could leave it would eventually be used.
     */
    look: (highlight: Region | Region[]): Patch => doc.set({ highlight }),
    /** Let go of the highlight. Used while travelling, never while reading. */
    whole: (): Patch => doc.set({ highlight: null }),
  },
  pull,
  term,
  specA,
  specB,
  note,
  cal,
  job,
  goal,
  tagA,
  tagB,
  obstacle,
  barrier,
  recon,
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
