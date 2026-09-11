import { CAMERA_HOME, type CameraState } from '../../../../paper'

/**
 * Section 02 scene -- follow one word in.
 *
 * Script: video-script/video-1/02-follow-one-word.md
 *
 * A transition section is the easiest place in a video to lose someone, so this
 * one is not a corridor: it carries its own reveal, which is that the router
 * never looks at the word. That is true -- routing reads the current
 * representation, never the raw text -- and it reframes all of section 1.
 */

export type At = { x: number; y: number }

export type SceneState = {
  camera: CameraState
  hospital: {
    on: boolean
    at: At
    scale: number
    sign: string
    plaque: string
    staffed: boolean
    lit: readonly number[]
    was: readonly number[]
    focus: boolean
    quiet: boolean
    heavy: boolean
    bunks: boolean
    doorsOpen: boolean
  }
  desk: { on: boolean; at: At; scale: number; named: boolean; ringed: boolean }
  /** The word, and whether it has been physically set aside by the router. */
  word: { on: boolean; at: At; scale: number; label: string; refused: boolean }
  row: { on: boolean; at: At; scale: number; label: string }
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
  hospital: {
    on: false,
    at: { x: 55, y: 42 },
    scale: 0.78,
    sign: 'Mixture of Experts',
    plaque: '320B total',
    staffed: true,
    lit: [],
    was: [],
    focus: false,
    quiet: false,
    heavy: false,
    bunks: false,
    doorsOpen: false,
  },
  desk: { on: false, at: { x: 55, y: 74 }, scale: 0.6, named: false, ringed: false },
  word: { on: false, at: { x: 22, y: 52 }, scale: 0.5, label: 'dog', refused: false },
  row: { on: false, at: { x: 62, y: 58 }, scale: 1, label: '' },
  narrator: { on: false, at: { x: 8, y: 84 }, scale: 0.5, pose: 'wonder', flip: false },
}

type Actor = keyof SceneState
export type Patch = { [K in Actor]?: Partial<SceneState[K]> }

export function applyPatches(base: SceneState, patches: Patch[]): SceneState {
  const next: SceneState = {
    camera: { ...base.camera },
    hospital: { ...base.hospital },
    desk: { ...base.desk },
    word: { ...base.word },
    row: { ...base.row },
    narrator: { ...base.narrator },
  }
  for (const patch of patches) {
    for (const key of Object.keys(patch) as Actor[]) Object.assign(next[key], patch[key])
  }
  return next
}

/* -- Story verbs ---------------------------------------------------------- */

export const camera = {
  /** Bring a stage point to the middle of frame at a given zoom. */
  to: (x: number, y: number, zoom: number): Patch => ({ camera: { x, y, zoom } }),
  home: (): Patch => ({ camera: CAMERA_HOME }),
}

export const hospital = {
  show: (at: At, scale: number): Patch => ({ hospital: { on: true, at, scale } }),
  moveTo: (at: At, scale?: number): Patch => ({
    hospital: { at, ...(scale === undefined ? {} : { scale }) },
  }),
  quiet: (): Patch => ({ hospital: { quiet: true } }),
  wake: (): Patch => ({ hospital: { quiet: false } }),
  off: (): Patch => ({ hospital: { on: false } }),
}

export const desk = {
  show: (at: At, scale: number): Patch => ({ desk: { on: true, at, scale, named: true } }),
  ring: (): Patch => ({ desk: { ringed: true } }),
  unring: (): Patch => ({ desk: { ringed: false } }),
  moveTo: (at: At, scale?: number): Patch => ({ desk: { at, ...(scale === undefined ? {} : { scale }) } }),
}

export const word = {
  arrive: (at: At, scale = 0.5, label = 'dog'): Patch => ({ word: { on: true, at, scale, label } }),
  moveTo: (at: At, scale?: number): Patch => ({ word: { at, ...(scale === undefined ? {} : { scale }) } }),
  /** Set down, not faded out. A refusal has to look like a refusal. */
  refuse: (at: At): Patch => ({ word: { at, refused: true } }),
}

export const row = {
  slideIn: (at: At, scale = 1, label = ''): Patch => ({ row: { on: true, at, scale, label } }),
  off: (): Patch => ({ row: { on: false } }),
}

export const narrator = {
  at: (at: At, pose: SceneState['narrator']['pose'], scale = 0.5, flip = false): Patch => ({
    narrator: { on: true, at, scale, pose, flip },
  }),
  pose: (pose: SceneState['narrator']['pose']): Patch => ({ narrator: { pose } }),
}
