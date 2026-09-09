/**
 * Section 05 scene -- new numbers, new team.
 *
 * Script: video-script/05-new-numbers-new-team.md
 *
 * Carries the one interaction in the video, because the claim the whole answer
 * rests on is the one the viewer should verify themselves. Per
 * skills/ncase/NCASE_I_DO_AND_I_UNDERSTAND.md the click has to be a choice with
 * a consequence the viewer predicted -- not a "next" button in disguise.
 */
import { CHOSEN, CHOSEN_B } from '../section-01/scene'

export type At = { x: number; y: number }
export type Route = 'barked' | 'hot'

export const TEAMS: Record<Route, readonly number[]> = { barked: CHOSEN, hot: CHOSEN_B }

export type SceneState = {
  wall: {
    on: boolean
    at: At
    scale: number
    lit: readonly number[]
    was: readonly number[]
    focus: boolean
    scoring: boolean
  }
  row: { on: boolean; at: At; scale: number; seed: number; label: string }
  desk: { on: boolean; at: At; scale: number }
  /** The always-on shared expert, added once the top-8 has landed. */
  shared: { on: boolean; at: At; scale: number }
  /** The viewer's control. Off until the mechanism has been shown. */
  choice: { on: boolean; at: At }
  narrator: {
    on: boolean
    at: At
    scale: number
    pose: 'wonder' | 'point' | 'think' | 'hopeful' | 'cheer' | 'push' | 'nod'
    flip: boolean
  }
}

export const INITIAL: SceneState = {
  wall: { on: false, at: { x: 57, y: 40 }, scale: 0.78, lit: [], was: [], focus: false, scoring: false },
  row: { on: false, at: { x: 16, y: 24 }, scale: 0.5, seed: 73, label: '' },
  desk: { on: false, at: { x: 15, y: 62 }, scale: 0.62 },
  shared: { on: false, at: { x: 15, y: 40 }, scale: 1 },
  choice: { on: false, at: { x: 50, y: 90 } },
  narrator: { on: false, at: { x: 7, y: 86 }, scale: 0.44, pose: 'wonder', flip: false },
}

type Actor = keyof SceneState
export type Patch = { [K in Actor]?: Partial<SceneState[K]> }

export function applyPatches(base: SceneState, patches: Patch[]): SceneState {
  const next: SceneState = {
    wall: { ...base.wall },
    row: { ...base.row },
    desk: { ...base.desk },
    shared: { ...base.shared },
    choice: { ...base.choice },
    narrator: { ...base.narrator },
  }
  for (const patch of patches) {
    for (const key of Object.keys(patch) as Actor[]) Object.assign(next[key], patch[key])
  }
  return next
}

export const wall = {
  show: (at: At, scale: number): Patch => ({ wall: { on: true, at, scale } }),
  /** Grading all 288 against the current row. */
  score: (): Patch => ({ wall: { scoring: true } }),
  keep: (lit: readonly number[]): Patch => ({ wall: { lit, focus: true, scoring: false } }),
  reroute: (lit: readonly number[], was: readonly number[]): Patch => ({ wall: { lit, was, focus: true } }),
}

export const row = {
  show: (at: At, scale = 0.5, label = ''): Patch => ({ row: { on: true, at, scale, label } }),
  change: (seed: number, label?: string): Patch => ({
    row: { seed, ...(label === undefined ? {} : { label }) },
  }),
}

export const desk = { show: (at: At, scale = 0.62): Patch => ({ desk: { on: true, at, scale } }) }
export const shared = { show: (at: At, scale = 1): Patch => ({ shared: { on: true, at, scale } }) }
export const choice = { show: (at: At): Patch => ({ choice: { on: true, at } }) }

export const narrator = {
  at: (at: At, pose: SceneState['narrator']['pose'], scale = 0.44, flip = false): Patch => ({
    narrator: { on: true, at, scale, pose, flip },
  }),
  pose: (pose: SceneState['narrator']['pose']): Patch => ({ narrator: { pose } }),
}
