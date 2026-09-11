/**
 * Section 03 scene -- the word becomes numbers.
 *
 * Script: video-script/video-1/03-the-word-becomes-numbers.md
 *
 * Exits on a contradiction rather than a question: section 1 proved the team
 * changes and this section proves the numbers do not. Both cannot be true,
 * which is what makes section 4 necessary rather than merely next.
 */
export type At = { x: number; y: number }

export type SceneState = {
  word: { on: boolean; at: At; scale: number; label: string }
  /** The row. `extend` runs it off the frame so 4096 has a physical size. */
  row: { on: boolean; at: At; scale: number; extend: boolean; shown: number; label: string }
  /** The same word, seen a second time. The paradox needs two rows at once. */
  rowB: { on: boolean; at: At; scale: number; shown: number; label: string }
  desk: { on: boolean; at: At; scale: number }
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
  word: { on: false, at: { x: 20, y: 36 }, scale: 0.6, label: 'dog' },
  row: { on: false, at: { x: 50, y: 46 }, scale: 1, extend: false, shown: 9, label: '' },
  rowB: { on: false, at: { x: 50, y: 62 }, scale: 1, shown: 9, label: '' },
  desk: { on: false, at: { x: 14, y: 76 }, scale: 0.5 },
  aside: { on: false, at: { x: 15, y: 20 } },
  narrator: { on: false, at: { x: 8, y: 84 }, scale: 0.5, pose: 'wonder', flip: false },
}

type Actor = keyof SceneState
export type Patch = { [K in Actor]?: Partial<SceneState[K]> }

export function applyPatches(base: SceneState, patches: Patch[]): SceneState {
  const next: SceneState = {
    word: { ...base.word },
    row: { ...base.row },
    rowB: { ...base.rowB },
    desk: { ...base.desk },
    aside: { ...base.aside },
    narrator: { ...base.narrator },
  }
  for (const patch of patches) {
    for (const key of Object.keys(patch) as Actor[]) Object.assign(next[key], patch[key])
  }
  return next
}

export const word = {
  arrive: (at: At, scale = 0.6, label = 'dog'): Patch => ({ word: { on: true, at, scale, label } }),
  moveTo: (at: At, scale?: number): Patch => ({ word: { at, ...(scale === undefined ? {} : { scale }) } }),
  off: (): Patch => ({ word: { on: false } }),
}

export const row = {
  show: (at: At, scale = 1, shown = 9): Patch => ({ row: { on: true, at, scale, shown } }),
  /** Runs past the right edge. The scale of 4096 is the point, not the values. */
  extend: (shown: number): Patch => ({ row: { extend: true, shown } }),
  label: (label: string): Patch => ({ row: { label } }),
  moveTo: (at: At, scale?: number): Patch => ({ row: { at, ...(scale === undefined ? {} : { scale }) } }),
  off: (): Patch => ({ row: { on: false } }),
}

export const rowB = {
  show: (at: At, scale = 1, label = ''): Patch => ({ rowB: { on: true, at, scale, label } }),
  off: (): Patch => ({ rowB: { on: false } }),
}

export const desk = {
  show: (at: At, scale = 0.5): Patch => ({ desk: { on: true, at, scale } }),
}

export const aside = {
  show: (at: At): Patch => ({ aside: { on: true, at } }),
}

export const narrator = {
  at: (at: At, pose: SceneState['narrator']['pose'], scale = 0.5, flip = false): Patch => ({
    narrator: { on: true, at, scale, pose, flip },
  }),
  pose: (pose: SceneState['narrator']['pose']): Patch => ({ narrator: { pose } }),
}
