import { type NarratorPose } from './cast/Narrator'

/**
 * The persistent scene for Section 01.
 *
 * Per NICKY_CASE_PRODUCTION_ARCHAEOLOGY.md, a beat is "an explicit list of
 * commands to existing scene objects", not a page replacement. So:
 *
 *   - every actor is declared here once and stays mounted for the whole section
 *   - a beat contributes a PARTIAL patch
 *   - state at beat N is the merge of beats 1..N
 *
 * Persistence is therefore the default: an actor keeps whatever it was given
 * until some later beat explicitly changes it. Nothing is ever rebuilt.
 */

export type Spot = { x: number; y: number }

export type SceneState = {
  card: { on: boolean; highlight: boolean; at: Spot; scale: number }
  grid: {
    on: boolean
    at: Spot
    scale: number
    slice: boolean
    reacting: boolean
    /** Cells lift out of the grid and become expert characters in place. */
    asExperts: boolean
    /** One expert first, as a worked example, before the whole population. */
    lead: boolean
    /** Router sweeps a score across the population before anything is chosen. */
    scoring: boolean
    dim: boolean
  }
  word: { on: boolean; at: Spot; scale: number }
  router: { on: boolean; at: Spot; scale: number; gesturing: boolean; fan: boolean }
  team: { on: boolean; at: Spot; count: number; size: number; label: string; sub: string }
  shelf: { on: boolean; at: Spot; scale: number; dim: boolean; title: string; size: string; shelves: number }
  ram: { on: boolean; at: Spot; count: number; note: string }
  picked: { on: boolean; at: Spot }
  blocker: { on: boolean; at: Spot }
  machine: { on: boolean; at: Spot }
  arch: { on: boolean; at: Spot }
  sheet: { on: boolean; at: Spot; pushed: boolean }
  narrator: { on: boolean; at: Spot; pose: NarratorPose; flip: boolean; scale: number }
  /** Set by the viewer, not by a beat. See the routing experiment at beat 8. */
  route: 'scared' | 'calculate'
}

const OFF: Spot = { x: 50, y: 50 }

export const INITIAL: SceneState = {
  card: { on: false, highlight: false, at: { x: 52, y: 50 }, scale: 1 },
  grid: {
    on: false,
    at: { x: 56, y: 50 },
    scale: 1,
    slice: false,
    reacting: false,
    asExperts: false,
    lead: false,
    scoring: false,
    dim: false,
  },
  word: { on: false, at: { x: 10, y: 32 }, scale: 1 },
  router: { on: false, at: { x: 43, y: 54 }, scale: 0.92, gesturing: false, fan: false },
  team: { on: false, at: { x: 66, y: 50 }, count: 9, size: 54, label: '', sub: '' },
  shelf: { on: false, at: { x: 76, y: 50 }, scale: 1, dim: false, title: '', size: '', shelves: 6 },
  ram: { on: false, at: { x: 42, y: 50 }, count: 9, note: '' },
  picked: { on: false, at: { x: 66, y: 30 } },
  blocker: { on: false, at: { x: 67, y: 48 } },
  machine: { on: false, at: { x: 81, y: 43 } },
  arch: { on: false, at: { x: 84, y: 52 } },
  sheet: { on: false, at: { x: 26, y: 48 }, pushed: false },
  narrator: { on: false, at: OFF, pose: 'wonder', flip: false, scale: 0.9 },
  route: 'scared',
}

/** What a single story verb returns: a partial update to one or more actors. */
export type Patch = {
  [K in keyof SceneState]?: SceneState[K] extends object ? Partial<SceneState[K]> : SceneState[K]
}

/** Shallow-merges one level deep, which is all the actor shape needs. */
export function applyPatches(base: SceneState, patches: Patch[]): SceneState {
  const next = { ...base } as Record<string, unknown>
  for (const patch of patches) {
    for (const [actor, value] of Object.entries(patch)) {
      next[actor] =
        value !== null && typeof value === 'object' && !Array.isArray(value)
          ? { ...(next[actor] as object), ...value }
          : value
    }
  }
  return next as SceneState
}

/*
 * Story verbs. These name what happens in the story, never CSS properties.
 */

export const card = {
  show: (at: Spot = { x: 52, y: 50 }) => ({ card: { on: true, highlight: true, at } }),
  putAway: () => ({ card: { on: false } }),
}

export const grid = {
  show: (at: Spot = { x: 56, y: 50 }, scale = 1) => ({ grid: { on: true, at, scale } }),
  lightActiveSlice: () => ({ grid: { slice: true } }),
  letInactiveAsk: () => ({ grid: { reacting: true } }),
  stopAsking: () => ({ grid: { reacting: false } }),
  /** Worked example: one cell becomes an expert before the rest follow. */
  showOneExpert: (at: Spot, scale: number) => ({ grid: { lead: true, at, scale } }),
  /** Beat 5: the same cells lift out and become the expert population. */
  becomeExperts: (at: Spot, scale: number) => ({ grid: { asExperts: true, lead: false, at, scale } }),
  /** The router scores every expert before any is selected. */
  score: () => ({ grid: { scoring: true } }),
  stopScoring: () => ({ grid: { scoring: false } }),
  moveTo: (at: Spot, scale: number) => ({ grid: { at, scale } }),
  recede: () => ({ grid: { dim: true } }),
  hide: () => ({ grid: { on: false } }),
}

export const word = {
  arrive: (at: Spot, scale = 1) => ({ word: { on: true, at, scale } }),
  moveTo: (at: Spot, scale?: number) => ({ word: { at, ...(scale ? { scale } : {}) } }),
  hide: () => ({ word: { on: false } }),
}

export const router = {
  appear: (at: Spot, scale = 0.9) => ({ router: { on: true, at, scale } }),
  moveTo: (at: Spot, scale: number) => ({ router: { at, scale } }),
  fanOut: () => ({ router: { fan: true } }),
  foldFan: () => ({ router: { fan: false } }),
  speakUp: () => ({ router: { gesturing: true } }),
  settle: () => ({ router: { gesturing: false } }),
  hide: () => ({ router: { on: false } }),
}

export const team = {
  form: (at: Spot, size: number, label = '', sub = '') => ({
    team: { on: true, at, size, label, sub },
  }),
  moveTo: (at: Spot, size?: number) => ({ team: { at, ...(size ? { size } : {}) } }),
  relabel: (label: string, sub = '') => ({ team: { label, sub } }),
  hide: () => ({ team: { on: false } }),
}

export const shelf = {
  reveal: (title: string, size: string, at: Spot = { x: 76, y: 50 }) => ({
    shelf: { on: true, title, size, at },
  }),
  relabel: (title: string, size: string) => ({ shelf: { title, size } }),
  recede: () => ({ shelf: { dim: true } }),
  restore: () => ({ shelf: { dim: false } }),
  moveTo: (at: Spot, scale = 1) => ({ shelf: { at, scale } }),
  hide: () => ({ shelf: { on: false } }),
}

export const memory = {
  open: (at: Spot, count = 9, note = '') => ({ ram: { on: true, at, count, note } }),
  load: (count: number, note = '') => ({ ram: { count, note } }),
  moveTo: (at: Spot) => ({ ram: { at } }),
  hide: () => ({ ram: { on: false } }),
}

export const picked = {
  show: (at: Spot) => ({ picked: { on: true, at } }),
  hide: () => ({ picked: { on: false } }),
}

export const blocker = {
  drop: (at: Spot = { x: 67, y: 48 }) => ({ blocker: { on: true, at } }),
  hide: () => ({ blocker: { on: false } }),
}

export const machine = {
  show: (at: Spot = { x: 81, y: 43 }) => ({ machine: { on: true, at } }),
  hide: () => ({ machine: { on: false } }),
}

export const arch = {
  open: (at: Spot = { x: 84, y: 52 }) => ({ arch: { on: true, at } }),
}

export const sheet = {
  present: (at: Spot = { x: 26, y: 48 }) => ({ sheet: { on: true, at } }),
  pushAside: () => ({ sheet: { pushed: true } }),
}

export const narrator = {
  at: (at: Spot, pose: NarratorPose, scale = 0.9, flip = false) => ({
    narrator: { on: true, at, pose, scale, flip },
  }),
  pose: (pose: NarratorPose) => ({ narrator: { pose } }),
  hide: () => ({ narrator: { on: false } }),
}

/** Expert ids for the two routable words. Different sets, same field. */
export const ROUTES = {
  scared: [4, 17, 22, 29, 33, 41, 48, 52],
  calculate: [2, 9, 14, 26, 31, 37, 44, 50],
} as const
