/**
 * Section 08 scene -- the verdict.
 *
 * Script: video-script/08-the-verdict.md
 *
 * A verdict, not a recap. The want was "they called it efficient -- is that
 * true?", and the answer is genuinely split: true about compute, false about
 * memory. Beat 4 concedes the true half without hedging, because a verdict
 * that only convicts reads as a debunk, and a debunk is a worse video than an
 * explanation.
 */
export type At = { x: number; y: number }

export type SceneState = {
  /** The opening sheet, returned. Must be recognisably the same object. */
  sheet: { on: boolean; at: At; scale: number; lit: 'none' | 'total' | 'both' }
  bars: { on: boolean; at: At; scale: number; show: 'fetch' | 'both'; ratio: string }
  building: { on: boolean; at: At; scale: number; heavy: boolean }
  verdict: { on: boolean; at: At; scale: number; lines: [string, string] }
  narrator: {
    on: boolean
    at: At
    scale: number
    pose: 'wonder' | 'point' | 'think' | 'hopeful' | 'cheer' | 'push' | 'nod'
    flip: boolean
  }
}

export const INITIAL: SceneState = {
  sheet: { on: false, at: { x: 52, y: 44 }, scale: 1, lit: 'both' },
  bars: { on: false, at: { x: 50, y: 44 }, scale: 1, show: 'fetch', ratio: '~50×' },
  building: { on: false, at: { x: 74, y: 42 }, scale: 0.6, heavy: false },
  verdict: {
    on: false,
    at: { x: 50, y: 52 },
    scale: 1,
    lines: ['Sparse routing buys compute, not memory.', ''],
  },
  narrator: { on: false, at: { x: 9, y: 82 }, scale: 0.5, pose: 'wonder', flip: false },
}

type Actor = keyof SceneState
export type Patch = { [K in Actor]?: Partial<SceneState[K]> }

export function applyPatches(base: SceneState, patches: Patch[]): SceneState {
  const next: SceneState = {
    sheet: { ...base.sheet },
    bars: { ...base.bars },
    building: { ...base.building },
    verdict: { ...base.verdict },
    narrator: { ...base.narrator },
  }
  for (const patch of patches) {
    for (const key of Object.keys(patch) as Actor[]) Object.assign(next[key], patch[key])
  }
  return next
}

export const sheet = {
  show: (at: At, scale = 1): Patch => ({ sheet: { on: true, at, scale } }),
  moveTo: (at: At, scale?: number): Patch => ({ sheet: { at, ...(scale === undefined ? {} : { scale }) } }),
  off: (): Patch => ({ sheet: { on: false } }),
}

export const bars = {
  show: (at: At, scale = 1): Patch => ({ bars: { on: true, at, scale, show: 'both' } }),
  moveTo: (at: At, scale?: number): Patch => ({ bars: { at, ...(scale === undefined ? {} : { scale }) } }),
  off: (): Patch => ({ bars: { on: false } }),
}

export const building = {
  show: (at: At, scale = 0.6): Patch => ({ building: { on: true, at, scale } }),
  heavy: (): Patch => ({ building: { heavy: true } }),
  moveTo: (at: At, scale?: number): Patch => ({
    building: { at, ...(scale === undefined ? {} : { scale }) },
  }),
  off: (): Patch => ({ building: { on: false } }),
}

export const verdict = {
  show: (at: At, lines: [string, string], scale = 1): Patch => ({ verdict: { on: true, at, scale, lines } }),
  off: (): Patch => ({ verdict: { on: false } }),
}

export const narrator = {
  at: (at: At, pose: SceneState['narrator']['pose'], scale = 0.5, flip = false): Patch => ({
    narrator: { on: true, at, scale, pose, flip },
  }),
  pose: (pose: SceneState['narrator']['pose']): Patch => ({ narrator: { pose } }),
}
