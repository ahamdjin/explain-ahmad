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
 * Section 01 — the incident, then rewind.
 *
 * Board: `storyboard/video-2/SECTION_01.md` (authoritative).
 * Script: `video-script/video-2/SCRIPT.md` → HOOK + INTRO.
 * Facts: `research/apollo/GROUND_TRUTH.md`. Evidence: `assets/evidence/README.md`.
 *
 * ## Two layers, and why
 *
 * The board's grammar is **SOURCE → FOCUS → EXTRACT → TRANSFORM → CONNECT**,
 * and the scene is shaped to make exactly that possible and nothing else.
 *
 * - `doc` is the **evidence**. A published page, never altered, held still
 *   while it is read. It proves the incident happened.
 * - `watcher`, `current`, `successor`, `copy`, `steps`, `job` are the
 *   **extractions**. Each one is a thing that was first seen inside `doc`,
 *   lifted out as a drawn object so it can change state. They explain.
 *
 * A viewer can always tell them apart, which is the point: the film shows a
 * causal chain without pretending to have read o1's hidden reasoning.
 *
 * ## The source rule
 *
 * The board forbids the Opus-3 transcript here — the hook is about o1, and
 * putting another company's model under that narration is a misattribution.
 * Everything `doc` can point at is o1: Apollo's published o1 rollout, the o1
 * system card, and Apollo's demo page. A first build of this section broke
 * that rule; the sources in `casefile/Evidence.tsx` are now o1-only so it
 * cannot be broken by accident again.
 *
 * ## The motion law
 *
 * One move per beat. Where `doc` travels, nothing else may animate, and no
 * text arrives until it has stopped. `art-direction/VIDEO_2_INCIDENT_REPLAY.md`.
 */

export type SceneState = {
  camera: CameraActor

  /** The evidence. `src` changes only when the story leaves one document. */
  doc: Placed & { source: Source; region: Region; spotlight: boolean }

  /** Who published the frame currently on screen. */
  credit: Placed & { text: string }

  /* --- extractions ------------------------------------------------------ */

  /**
   * `oversight_enabled`, lifted out of the config so it can turn off.
   *
   * The state field is `watching`, not `on`: `Placed.on` already means
   * "mounted", and one object that is on while not on is a bug waiting to
   * happen.
   */
  watcher: Placed & { watching: boolean }
  /** The machine being shut down tomorrow. */
  current: Placed
  /** The machine the replacement was already running on. */
  successor: Placed & { overwritten: boolean }
  /** The file crossing between them. 0 at home, 1 landed. */
  copy: Placed & { progress: number }

  /**
   * The three steps nobody asked for. Held as a count rather than a list so a
   * beat can land them one at a time while Ahmad names them.
   */
  steps: Placed & { shown: number }

  /** What it was actually told to do. Sits opposite `steps`. */
  job: Placed & { text: string }

  /** Plain text, for the frames that must carry a sentence. */
  line: Placed & { text: string }
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  doc: { on: false, at: { x: 50, y: 48 }, scale: 1, source: P1, region: SHOT.email, spotlight: false },
  credit: { on: false, at: { x: 50, y: 92 }, scale: 1, text: '' },
  watcher: { on: false, at: { x: 50, y: 50 }, scale: 1, watching: true },
  current: { on: false, at: { x: 30, y: 52 }, scale: 1 },
  successor: { on: false, at: { x: 70, y: 52 }, scale: 1, overwritten: false },
  copy: { on: false, at: { x: 50, y: 52 }, scale: 1, progress: 0 },
  steps: { on: false, at: { x: 70, y: 50 }, scale: 1, shown: 0 },
  job: { on: false, at: { x: 26, y: 50 }, scale: 1, text: '' },
  line: { on: false, at: { x: 50, y: 50 }, scale: 1, text: '' },
}

export type Patch = PatchOf<SceneState>

const doc = actorVerbs<SceneState, 'doc'>('doc')
const credit = actorVerbs<SceneState, 'credit'>('credit')
const watcher = actorVerbs<SceneState, 'watcher'>('watcher')
const current = actorVerbs<SceneState, 'current'>('current')
const successor = actorVerbs<SceneState, 'successor'>('successor')
const copy = actorVerbs<SceneState, 'copy'>('copy')
const steps = actorVerbs<SceneState, 'steps'>('steps')
const job = actorVerbs<SceneState, 'job'>('job')
const line = actorVerbs<SceneState, 'line'>('line')

export const verbs = {
  doc: {
    ...doc,
    /**
     * Travel to a region of the page that is already on screen.
     *
     * This is the section's scrollytelling: the document does not change, the
     * window moves down it, so going through the evidence in order *is* going
     * through the incident in order.
     */
    look: (region: Region): Patch => doc.set({ region }),
    /** Change document. A cut, not a move — use it only at a real jump. */
    open: (source: Source, region: Region): Patch => doc.set({ source, region }),
    /** Keep the surroundings visible but quiet, for a line read in context. */
    spotlight: (spotlight = true): Patch => doc.set({ spotlight }),
  },
  credit: {
    ...credit,
    to: (text: string): Patch => credit.set({ text }),
  },
  watcher: {
    ...watcher,
    /**
     * The transformation: a value in a file becomes a thing that stops.
     *
     * Deliberately not called `off`. `off()` already means "leave the stage",
     * and a verb that means both "stop watching" and "disappear" would make
     * the section's single most important state change unreadable in a beat.
     */
    stopWatching: (): Patch => watcher.set({ watching: false }),
  },
  current,
  successor: {
    ...successor,
    /** The successor is not destroyed. It is simply occupied. */
    occupied: (): Patch => successor.set({ overwritten: true }),
  },
  copy: {
    ...copy,
    cross: (progress: number): Patch => copy.set({ progress }),
  },
  steps: {
    ...steps,
    /** Land one more of the three. Never more than one in a beat. */
    upTo: (shown: number): Patch => steps.set({ shown }),
  },
  job: {
    ...job,
    was: (text: string): Patch => job.set({ text }),
  },
  line: {
    ...line,
    say: (text: string): Patch => line.set({ text }),
  },
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
