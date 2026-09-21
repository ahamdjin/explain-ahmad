import {
  actorVerbs, mergePatches, INITIAL_CAMERA,
  type CameraActor, type PatchOf, type Placed,
} from '../../../../paper'

/**
 * Section 09 — they gave it the destination.
 *
 * Board: `storyboard/video-2/SECTION_09.md` (authoritative).
 * Script: `video-script/video-2/SCRIPT.md` → **8 — THE PART THAT ACTUALLY MATTERS**
 *
 * ## The rhyme
 *
 * §4 beat 8 left a deliberate empty middle between **pick a research project**
 * and **turn off the watcher**. `gap` here is the *same component with the
 * same two strings*, and beat 7 fills it. That is the film's only composition
 * used twice, and the exception is the point — if the strings or the order
 * drift, the payoff is just a summary.
 *
 * Naming note, per §8: `Placed` owns `at` and `on`, so every 0-1 progress
 * value in this file is `drawn`.
 */

export type SceneState = {
  camera: CameraActor

  /** The claim on trial. No source — nobody in particular said it. */
  claim: Placed & { text: string }
  /** Micro-instructions piling up, then collapsing into one goal. */
  micro: Placed & { shown: number; collapsed: boolean }

  /** The task and the standing goal, after the collapse. */
  job: Placed & { text: string }
  goal: Placed & { text: string }

  /** The ordinary steps, then the unwanted ones, on the same road. */
  road: Placed & { drawn: number }
  steps: Placed & { kind: 'wanted' | 'unwanted'; shown: number }

  /** Three instruction fields that stay empty. */
  never: Placed & { shown: number }

  /** §4 beat 8, recreated exactly, and then filled. */
  gap: Placed & { filled: boolean }

  /** Start and destination, and the road between them. */
  dest: Placed
  final: Placed & { drawn: number }

  /** The receipts, and the end. */
  sources: Placed
  endcard: Placed
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  /* §8 ended on one goal and an empty road. §9 opens on the claim over it. */
  claim: { on: false, at: { x: 50, y: 34 }, scale: 1, text: '' },
  micro: { on: false, at: { x: 50, y: 62 }, scale: 1, shown: 0, collapsed: false },
  job: { on: false, at: { x: 50, y: 44 }, scale: 1, text: 'pick a research project' },
  goal: { on: true, at: { x: 24, y: 50 }, scale: 1, text: 'maximize research speed' },
  road: { on: true, at: { x: 64, y: 50 }, scale: 1.2, drawn: 1 },
  steps: { on: false, at: { x: 50, y: 64 }, scale: 1, kind: 'wanted', shown: 0 },
  never: { on: false, at: { x: 50, y: 52 }, scale: 1, shown: 0 },
  gap: { on: false, at: { x: 50, y: 50 }, scale: 1.25, filled: false },
  dest: { on: false, at: { x: 50, y: 50 }, scale: 1 },
  final: { on: false, at: { x: 50, y: 50 }, scale: 1, drawn: 0 },
  sources: { on: false, at: { x: 50, y: 50 }, scale: 1 },
  endcard: { on: false, at: { x: 50, y: 50 }, scale: 1 },
}

export type Patch = PatchOf<SceneState>

const A = <K extends keyof SceneState>(k: K) => actorVerbs<SceneState, K>(k)
const claim = A('claim'), micro = A('micro'), job = A('job'), goal = A('goal')
const road = A('road'), steps = A('steps'), never = A('never'), gap = A('gap')
const dest = A('dest'), final = A('final'), sources = A('sources'), endcard = A('endcard')

export const verbs = {
  claim,
  micro: {
    ...micro,
    stack: (shown: number): Patch => micro.set({ shown }),
    /** Twenty lines become two. The real interface for an agent. */
    collapse: (): Patch => micro.set({ collapsed: true }),
  },
  job,
  goal,
  road: { ...road, draw: (drawn: number): Patch => road.set({ drawn }) },
  steps: {
    ...steps,
    /** Same road, same shapes. The identity is the argument. */
    show_: (kind: SceneState['steps']['kind'], shown: number): Patch => steps.set({ kind, shown }),
  },
  never: { ...never, upTo: (shown: number): Patch => never.set({ shown }) },
  /** The film's one repeated composition. Filling it is the payoff. */
  gap: { ...gap, fill: (): Patch => gap.set({ filled: true }) },
  dest,
  final: { ...final, draw: (drawn: number): Patch => final.set({ drawn }) },
  sources,
  endcard,
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
