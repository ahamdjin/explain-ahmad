/**
 * Section 04 scene -- where the numbers change.
 *
 * Script: video-script/video-1/04-where-the-numbers-change.md
 *
 * Resolves section 3's contradiction. The example does the work: "the dog
 * barked" against "a hot dog". Everyone knows those mean different things
 * before we say so, which is exactly why it lands -- we are not teaching that
 * language is contextual, we are showing where the machine handles it.
 */
export type At = { x: number; y: number }

type Line = {
  on: boolean
  at: At
  scale: number
  words: string[]
  focus: number
  weights?: number[]
  dim: boolean
  caption: string
}

export type SceneState = {
  a: Line
  b: Line
  rowA: { on: boolean; at: At; scale: number; seed: number; label: string }
  rowB: { on: boolean; at: At; scale: number; seed: number; label: string }
  narrator: {
    on: boolean
    at: At
    scale: number
    pose: 'wonder' | 'point' | 'think' | 'hopeful' | 'cheer' | 'push' | 'nod'
    flip: boolean
  }
}

const BLANK: Line = { on: false, at: { x: 50, y: 34 }, scale: 1, words: [], focus: 0, dim: false, caption: '' }

export const INITIAL: SceneState = {
  a: { ...BLANK },
  b: { ...BLANK },
  rowA: { on: false, at: { x: 50, y: 62 }, scale: 0.8, seed: 11, label: '' },
  rowB: { on: false, at: { x: 50, y: 78 }, scale: 0.8, seed: 41, label: '' },
  narrator: { on: false, at: { x: 8, y: 84 }, scale: 0.5, pose: 'wonder', flip: false },
}

type Actor = keyof SceneState
export type Patch = { [K in Actor]?: Partial<SceneState[K]> }

export function applyPatches(base: SceneState, patches: Patch[]): SceneState {
  const next: SceneState = {
    a: { ...base.a },
    b: { ...base.b },
    rowA: { ...base.rowA },
    rowB: { ...base.rowB },
    narrator: { ...base.narrator },
  }
  for (const patch of patches) {
    for (const key of Object.keys(patch) as Actor[]) Object.assign(next[key], patch[key])
  }
  return next
}

function line(key: 'a' | 'b') {
  return {
    show: (words: string[], focus: number, at: At, scale = 1, caption = ''): Patch =>
      ({ [key]: { on: true, words, focus, at, scale, caption } }) as Patch,
    /** One weight per word, 0..1. Thickness is the weight. */
    weigh: (weights: number[]): Patch => ({ [key]: { weights } }) as Patch,
    moveTo: (at: At, scale?: number): Patch =>
      ({ [key]: { at, ...(scale === undefined ? {} : { scale }) } }) as Patch,
    dim: (): Patch => ({ [key]: { dim: true } }) as Patch,
    off: (): Patch => ({ [key]: { on: false } }) as Patch,
  }
}

export const a = line('a')
export const b = line('b')

export const rowA = {
  show: (at: At, scale = 0.8, label = ''): Patch => ({ rowA: { on: true, at, scale, label } }),
  /** A different seed is a different row: this is the whole point of the beat. */
  change: (seed: number, label?: string): Patch => ({
    rowA: { seed, ...(label === undefined ? {} : { label }) },
  }),
  moveTo: (at: At, scale?: number): Patch => ({ rowA: { at, ...(scale === undefined ? {} : { scale }) } }),
}

export const rowB = {
  show: (at: At, scale = 0.8, label = ''): Patch => ({ rowB: { on: true, at, scale, label } }),
  moveTo: (at: At, scale?: number): Patch => ({ rowB: { at, ...(scale === undefined ? {} : { scale }) } }),
}

export const narrator = {
  at: (at: At, pose: SceneState['narrator']['pose'], scale = 0.5, flip = false): Patch => ({
    narrator: { on: true, at, scale, pose, flip },
  }),
  pose: (pose: SceneState['narrator']['pose']): Patch => ({ narrator: { pose } }),
}
