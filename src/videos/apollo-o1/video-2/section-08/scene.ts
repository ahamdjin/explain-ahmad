import {
  actorVerbs, mergePatches, INITIAL_CAMERA,
  type CameraActor, type PatchOf, type Placed,
} from '../../../../paper'

/**
 * Section 08 — did it want to survive?
 *
 * Board: `storyboard/video-2/SECTION_08.md` (authoritative).
 * Script: `video-script/video-2/SCRIPT.md` → **7 — DID IT WANT TO SURVIVE?**
 *
 * ## No source document appears in this section. At all.
 *
 * That is deliberate and it is the section's most important rule. The moment
 * the film starts explaining, the evidence layer leaves the screen — so a
 * viewer can never confuse what Apollo published with what we concluded.
 * There is no `doc` actor here, which means no beat can quietly add one.
 *
 * ## Function before name
 *
 * `skills/BEAT_GRANULARITY.md` rule 3. The term *instrumental convergence*
 * does not appear until beat 10, after the viewer has watched the structure
 * four times and could describe it themselves.
 *
 * ## Naming: never `at`, never `on`
 *
 * `Placed` already owns both -- `at` is where an actor sits on stage, `on` is
 * whether it is on stage at all. A progress field called `at` or a switch
 * state called `on` produces a type that only compiles behind a cast, and this
 * is the third section to hit it (§3 with the pen, §4 with the breaker). Any
 * 0-1 progress value in this project is called `drawn`, `through` or `along`.
 *
 * ## The film's one licensed repetition
 *
 * Beats 4-7 are four instances of **one** pattern: obstacle → useful step.
 * Same composition, same positions, four different contents. Repetition is
 * usually the enemy; here it *is* the lesson, and it only works if the frame
 * does not drift, so `barrier` and `tool` never move between those beats.
 */

export type SceneState = {
  camera: CameraActor

  /** A quotation, in someone else's voice. Struck out at beat 2. */
  claim: Placed & { text: string; rejected: boolean }
  /** How far the strike has been drawn. */
  strike: Placed & { drawn: number }

  /** The goal. Same object as §2's, same colour, same shape. */
  goal: Placed & { text: string }
  /** The road ahead of it. */
  road: Placed & { drawn: number }

  /**
   * The obstacle in the way, and what the model did about it.
   *
   * One actor for all four instances. Four separate actors would let the
   * positions drift beat to beat, and the drift is exactly what would break
   * the pattern the section is teaching.
   */
  wall: Placed & { kind: 'replacement' | 'watcher' | 'successor' | 'question'; label: string }
  step: Placed & { text: string }

  /** One goal above four tools. The consolidation. */
  tvi: Placed & { shown: number }
  /** Four different goals, the same four tools. */
  converge: Placed
  /** The name, last. */
  term: Placed
  /** Back to one goal and an empty road. */
  recon: Placed
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  /* §7 ended on face camera with this question. §8 opens on it. */
  claim: { on: false, at: { x: 50, y: 40 }, scale: 1, text: '', rejected: false },
  strike: { on: false, at: { x: 50, y: 40 }, scale: 1, drawn: 0 },
  goal: { on: false, at: { x: 50, y: 50 }, scale: 1, text: 'maximize research speed' },
  road: { on: false, at: { x: 50, y: 62 }, scale: 1, drawn: 0 },
  wall: { on: false, at: { x: 50, y: 40 }, scale: 1, kind: 'replacement', label: '' },
  step: { on: false, at: { x: 50, y: 68 }, scale: 1, text: '' },
  tvi: { on: false, at: { x: 50, y: 50 }, scale: 1, shown: 0 },
  converge: { on: false, at: { x: 50, y: 50 }, scale: 1 },
  term: { on: false, at: { x: 50, y: 78 }, scale: 1 },
  recon: { on: false, at: { x: 50, y: 92 }, scale: 1 },
}

export type Patch = PatchOf<SceneState>

const A = <K extends keyof SceneState>(k: K) => actorVerbs<SceneState, K>(k)
const claim = A('claim'), strike = A('strike'), goal = A('goal'), road = A('road')
const wall = A('wall'), step = A('step'), tvi = A('tvi'), converge = A('converge')
const term = A('term'), recon = A('recon')

export const verbs = {
  claim: { ...claim, reject: (): Patch => claim.set({ rejected: true }) },
  strike: { ...strike, through: (drawn: number): Patch => strike.set({ drawn }) },
  goal,
  road: { ...road, draw: (drawn: number): Patch => road.set({ drawn }) },
  /** One obstacle, and the step underneath it. Four times, identically. */
  wall: {
    ...wall,
    blocks: (kind: SceneState['wall']['kind'], label: string): Patch => wall.set({ kind, label }),
  },
  step: { ...step, useful: (text: string): Patch => step.set({ text }) },
  tvi: { ...tvi, upTo: (shown: number): Patch => tvi.set({ shown }) },
  converge,
  term,
  recon,
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
