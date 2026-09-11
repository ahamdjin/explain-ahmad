/**
 * Section 07 scene -- the answer.
 *
 * Script: video-script/video-1/07-the-answer.md
 *
 * The section 1 plan is rebuilt here deliberately, frame for frame, and then
 * *run*. It works for the first fetch and fails on the repeat. Letting the hope
 * succeed once is what makes the failure a discovery instead of a lecture.
 */

export type At = { x: number; y: number }

export type SceneState = {
  store: { on: boolean; at: At; scale: number; label: string }
  memory: { on: boolean; at: At; scale: number; count: number; label: string; strained: boolean }
  path: { on: boolean; at: At; scale: number; items: number; jammed: boolean }
  /** Which floor of the 42 we are on, so the repetition is countable. */
  floor: { on: boolean; at: At; scale: number; n: number }
  counter: { on: boolean; at: At; scale: number; value: number; label: string }
  bars: { on: boolean; at: At; scale: number; show: 'fetch' | 'both'; ratio: string }
  word: { on: boolean; at: At; scale: number; label: string }
  narrator: {
    on: boolean
    at: At
    scale: number
    pose: 'wonder' | 'point' | 'think' | 'hopeful' | 'cheer' | 'push' | 'nod'
    flip: boolean
  }
}

export const INITIAL: SceneState = {
  store: { on: false, at: { x: 20, y: 44 }, scale: 1, label: 'storage — all 320B' },
  memory: { on: false, at: { x: 82, y: 46 }, scale: 1, count: 0, label: 'fast memory', strained: false },
  path: { on: false, at: { x: 51, y: 46 }, scale: 1, items: 0, jammed: false },
  floor: { on: false, at: { x: 51, y: 20 }, scale: 1, n: 1 },
  counter: { on: false, at: { x: 51, y: 74 }, scale: 1, value: 0, label: 'expert visits' },
  bars: { on: false, at: { x: 50, y: 52 }, scale: 1, show: 'fetch', ratio: '~50×' },
  word: { on: false, at: { x: 8, y: 16 }, scale: 1, label: 'dog' },
  narrator: { on: false, at: { x: 8, y: 84 }, scale: 0.5, pose: 'wonder', flip: false },
}

type Actor = keyof SceneState
export type Patch = { [K in Actor]?: Partial<SceneState[K]> }

/** Cumulative merge. Absence of a key means "leave it exactly as it was". */
export function applyPatches(base: SceneState, patches: Patch[]): SceneState {
  const next: SceneState = {
    store: { ...base.store },
    memory: { ...base.memory },
    path: { ...base.path },
    floor: { ...base.floor },
    counter: { ...base.counter },
    bars: { ...base.bars },
    word: { ...base.word },
    narrator: { ...base.narrator },
  }
  for (const patch of patches) {
    for (const key of Object.keys(patch) as Actor[]) Object.assign(next[key], patch[key])
  }
  return next
}

/* -- Story verbs ---------------------------------------------------------- */

export const store = {
  show: (at: At, scale = 1, label = 'storage — all 320B'): Patch => ({ store: { on: true, at, scale, label } }),
  off: (): Patch => ({ store: { on: false } }),
}

export const memory = {
  show: (at: At, scale = 1, label = 'fast memory'): Patch => ({ memory: { on: true, at, scale, label, count: 0 } }),
  hold: (count: number): Patch => ({ memory: { count } }),
  strain: (): Patch => ({ memory: { strained: true } }),
  off: (): Patch => ({ memory: { on: false } }),
}

export const path = {
  show: (at: At, scale = 1): Patch => ({ path: { on: true, at, scale } }),
  carry: (items: number): Patch => ({ path: { items, jammed: false } }),
  /** The finding, made physical: a new set is needed before the last arrived. */
  jam: (items: number): Patch => ({ path: { items, jammed: true } }),
  off: (): Patch => ({ path: { on: false } }),
}

export const floor = {
  at: (n: number, position: At, scale = 1): Patch => ({ floor: { on: true, n, at: position, scale } }),
  off: (): Patch => ({ floor: { on: false } }),
}

export const counter = {
  show: (at: At, scale = 1, label = 'expert visits'): Patch => ({ counter: { on: true, at, scale, label } }),
  to: (value: number): Patch => ({ counter: { value } }),
  relabel: (label: string): Patch => ({ counter: { label } }),
  off: (): Patch => ({ counter: { on: false } }),
}

export const bars = {
  fetch: (at: At, scale = 1): Patch => ({ bars: { on: true, at, scale, show: 'fetch' } }),
  both: (): Patch => ({ bars: { show: 'both' } }),
  off: (): Patch => ({ bars: { on: false } }),
}

export const word = {
  arrive: (at: At, scale = 1, label = 'dog'): Patch => ({ word: { on: true, at, scale, label } }),
  off: (): Patch => ({ word: { on: false } }),
}

export const narrator = {
  at: (at: At, pose: SceneState['narrator']['pose'], scale = 0.5, flip = false): Patch => ({
    narrator: { on: true, at, scale, pose, flip },
  }),
  pose: (pose: SceneState['narrator']['pose']): Patch => ({ narrator: { pose } }),
}
