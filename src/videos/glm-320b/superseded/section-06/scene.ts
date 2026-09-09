/**
 * Section 06 scene -- forty-two floors.
 *
 * Script: video-script/06-forty-two-floors.md
 *
 * Everything so far has happened in one room, and the viewer has quietly
 * assumed that room *is* the model. The pull-back is the biggest single "oh"
 * available in the whole video, and it costs one camera move.
 */
import { CAMERA_HOME, type CameraState } from '../../../paper'

export type At = { x: number; y: number }

export type SceneState = {
  camera: CameraState
  wall: { on: boolean; at: At; scale: number; lit: readonly number[]; was: readonly number[]; focus: boolean }
  tower: { on: boolean; at: At; scale: number; floor: number; label: string }
  row: { on: boolean; at: At; scale: number; seed: number; label: string }
  counter: { on: boolean; at: At; scale: number; value: number; label: string }
  /** Owns the one thing in the chain that is not literally true. */
  aside: { on: boolean; at: At }
  narrator: {
    on: boolean
    at: At
    scale: number
    pose: 'wonder' | 'point' | 'think' | 'hopeful' | 'cheer' | 'push' | 'nod'
    flip: boolean
  }
}

export const INITIAL: SceneState = {
  camera: CAMERA_HOME,
  wall: { on: false, at: { x: 55, y: 40 }, scale: 0.78, lit: [], was: [], focus: true },
  tower: { on: false, at: { x: 74, y: 50 }, scale: 1, floor: 1, label: '' },
  row: { on: false, at: { x: 22, y: 24 }, scale: 0.5, seed: 73, label: '' },
  counter: { on: false, at: { x: 26, y: 68 }, scale: 1, value: 8, label: 'expert visits so far' },
  aside: { on: false, at: { x: 16, y: 90 } },
  narrator: { on: false, at: { x: 7, y: 86 }, scale: 0.44, pose: 'wonder', flip: false },
}

type Actor = keyof SceneState
export type Patch = { [K in Actor]?: Partial<SceneState[K]> }

export function applyPatches(base: SceneState, patches: Patch[]): SceneState {
  const next: SceneState = {
    camera: { ...base.camera },
    wall: { ...base.wall },
    tower: { ...base.tower },
    row: { ...base.row },
    counter: { ...base.counter },
    aside: { ...base.aside },
    narrator: { ...base.narrator },
  }
  for (const patch of patches) {
    for (const key of Object.keys(patch) as Actor[]) Object.assign(next[key], patch[key])
  }
  return next
}

export const camera = {
  to: (x: number, y: number, zoom: number): Patch => ({ camera: { x, y, zoom } }),
  home: (): Patch => ({ camera: CAMERA_HOME }),
}

export const wall = {
  show: (at: At, scale: number, lit: readonly number[]): Patch => ({ wall: { on: true, at, scale, lit } }),
  reroute: (lit: readonly number[], was: readonly number[]): Patch => ({ wall: { lit, was } }),
  moveTo: (at: At, scale?: number): Patch => ({ wall: { at, ...(scale === undefined ? {} : { scale }) } }),
  off: (): Patch => ({ wall: { on: false } }),
}

export const tower = {
  show: (at: At, scale = 1, floor = 1): Patch => ({ tower: { on: true, at, scale, floor } }),
  climbTo: (floor: number): Patch => ({ tower: { floor } }),
  label: (label: string): Patch => ({ tower: { label } }),
  moveTo: (at: At, scale?: number): Patch => ({ tower: { at, ...(scale === undefined ? {} : { scale }) } }),
}

export const row = {
  show: (at: At, scale = 0.5, label = ''): Patch => ({ row: { on: true, at, scale, label } }),
  change: (seed: number, label?: string): Patch => ({
    row: { seed, ...(label === undefined ? {} : { label }) },
  }),
  off: (): Patch => ({ row: { on: false } }),
}

export const counter = {
  show: (at: At, scale = 1, label = 'expert visits so far'): Patch => ({
    counter: { on: true, at, scale, label },
  }),
  to: (value: number): Patch => ({ counter: { value } }),
  relabel: (label: string): Patch => ({ counter: { label } }),
}

export const aside = { show: (at: At): Patch => ({ aside: { on: true, at } }) }

export const narrator = {
  at: (at: At, pose: SceneState['narrator']['pose'], scale = 0.44, flip = false): Patch => ({
    narrator: { on: true, at, scale, pose, flip },
  }),
  pose: (pose: SceneState['narrator']['pose']): Patch => ({ narrator: { pose } }),
}
