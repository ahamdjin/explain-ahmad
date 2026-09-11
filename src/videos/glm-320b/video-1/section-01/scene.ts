/**
 * Section 01 — "What 18 billion active means"
 *
 * Script: `video-script/video-1/01-what-18-billion-active-means.md`
 * Board:  the `## Storyboard` table in that file. `npm run check:board`.
 *
 * One scene, mounted once. A beat issues *partial patches* merged
 * cumulatively, so persistence is the default and nothing is ever rebuilt.
 * Verbs describe story actions — `block.scatter()`, `word.arrive()` — never
 * CSS, so beats.ts reads as direction.
 */
import type { NarratorPose, NarratorStyle, PatchName } from '../../../../paper'

export type At = { x: number; y: number }

export type SceneState = {
  /**
   * Beats 1–3. The number, alone in the frame.
   *
   * There is deliberately no `ModelSheet` in this section. That component is a
   * specification table -- architecture, total parameters, active parameters,
   * purpose -- and "no spec read" is the first rule of the opening. The number
   * arrives small and grows; that is an event, and a table is not.
   */
  big: { on: boolean; at: At; scale: number; value: string; caption: string }
  /**
   * Beats 3–14, and again in §13. The model as one object.
   *
   * `scatter` is the same marks loose — this is one actor across the whole of
   * Act 1, never two. See the note in `paper/cast/Scale.tsx`.
   */
  block: {
    on: boolean
    at: At
    scale: number
    scatter: boolean
    lit?: PatchName
    ghost?: PatchName
    lifted: boolean
    heavy: boolean
  }
  /** Beats 9–12. Three words, three different patches. Separate actors on
   *  purpose: the event is two of them on screen at once. */
  word: { on: boolean; at: At; scale: number; label: string }
  word2: { on: boolean; at: At; scale: number; label: string }
  word3: { on: boolean; at: At; scale: number; label: string }
  /** Beats 16–18. Inside: the 288. */
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
  /** Beat 18. Present, unlabelled, and not named until §5. */
  desk: { on: boolean; at: At; scale: number; named: boolean; ringed: boolean }
  narrator: {
    on: boolean
    at: At
    scale: number
    /* From the cast, not retyped -- see the note in paper/scene.ts. */
    pose: NarratorPose
    style: NarratorStyle
    flip: boolean
  }
  /** A horizon, so the frame is a place rather than a slide. */
  ground: { on: boolean; y: number }
}

export const INITIAL: SceneState = {
  big: { on: false, at: { x: 50, y: 44 }, scale: 1, value: '320,000,000,000', caption: '' },
  block: { on: false, at: { x: 50, y: 47 }, scale: 1, scatter: true, lifted: false, heavy: false },
  word: { on: false, at: { x: 11, y: 47 }, scale: 0.9, label: 'dog' },
  word2: { on: false, at: { x: 11, y: 64 }, scale: 0.9, label: 'cat' },
  word3: { on: false, at: { x: 11, y: 81 }, scale: 0.9, label: 'it' },
  hospital: {
    on: false,
    at: { x: 52, y: 47 },
    scale: 1,
    sign: '',
    plaque: '',
    staffed: false,
    lit: [],
    was: [],
    focus: false,
    quiet: false,
    heavy: false,
    bunks: false,
    doorsOpen: false,
  },
  desk: { on: false, at: { x: 15, y: 76 }, scale: 0.8, named: false, ringed: false },
  /* `plain` is the host. `paper/scene.ts` explains why. */
  narrator: { on: false, at: { x: 10, y: 70 }, scale: 1, pose: 'wonder', style: 'plain', flip: false },
  ground: { on: false, y: 84 },
}

type Actor = keyof SceneState
export type Patch = { [K in Actor]?: Partial<SceneState[K]> }

/** Cumulative merge. Absence of a key means "leave it exactly as it was". */
export function applyPatches(base: SceneState, patches: Patch[]): SceneState {
  const next = {
    big: { ...base.big },
    block: { ...base.block },
    word: { ...base.word },
    word2: { ...base.word2 },
    word3: { ...base.word3 },
    hospital: { ...base.hospital },
    desk: { ...base.desk },
    narrator: { ...base.narrator },
    ground: { ...base.ground },
  }
  for (const patch of patches) {
    for (const key of Object.keys(patch) as Actor[]) Object.assign(next[key], patch[key])
  }
  return next
}

/**
 * The eight, scattered across the wall rather than adjacent.
 *
 * Deliberately not a contiguous block: routing picks by score and never by
 * locality, and a tidy rectangle would teach the wrong thing.
 */
export const CHOSEN = [41, 76, 103, 147, 168, 211, 245, 278] as const

/* -- Story verbs ----------------------------------------------------------- */

/*
 * There is no `brace` actor. Measuring lines are **overlays**, not scene
 * actors -- the overlay system already has a brace, it positions itself in
 * stage percentages, and it is dropped and redrawn per beat, which is exactly
 * the lifetime a measurement wants. A second implementation here would be two
 * braces that drift. See skills/ASSET_LIBRARY.md.
 */
export const big = {
  show: (value: string, at: At, scale = 1, caption = ''): Patch => ({
    big: { on: true, at, scale, value, caption },
  }),
  /** It grows. The same object, bigger -- never a second object. */
  scale: (scale: number): Patch => ({ big: { scale } }),
  off: (): Patch => ({ big: { on: false } }),
}

export const block = {
  /** The number's marks, loose. The block has no edge yet. */
  scatter: (at: At, scale = 1): Patch => ({ block: { on: true, at, scale, scatter: true } }),
  /** The same marks gather, and the object gets an edge. */
  pack: (): Patch => ({ block: { scatter: false } }),
  /** A named region lights. `undefined` clears it. */
  light: (lit?: PatchName): Patch => ({ block: { lit, lifted: false } }),
  /** The lit patch floats clear, leaving a hole. */
  lift: (): Patch => ({ block: { lifted: true } }),
  drop: (): Patch => ({ block: { lifted: false } }),
  /** Outlines a patch that is *not* in use, so a misfit can be seen. */
  ghost: (ghost?: PatchName): Patch => ({ block: { ghost } }),
  heavy: (): Patch => ({ block: { heavy: true } }),
  moveTo: (at: At, scale: number): Patch => ({ block: { at, scale } }),
  off: (): Patch => ({ block: { on: false } }),
}

const wordVerbs = <K extends 'word' | 'word2' | 'word3'>(key: K) => ({
  arrive: (at: At, scale = 0.9, label?: string): Patch =>
    ({ [key]: { on: true, at, scale, ...(label ? { label } : {}) } }) as Patch,
  moveTo: (at: At, scale?: number): Patch =>
    ({ [key]: { at, ...(scale === undefined ? {} : { scale }) } }) as Patch,
  off: (): Patch => ({ [key]: { on: false } }) as Patch,
})

export const word = wordVerbs('word')
export const word2 = wordVerbs('word2')
export const word3 = wordVerbs('word3')

export const hospital = {
  rise: (at: At, scale = 1): Patch => ({ hospital: { on: true, at, scale } }),
  label: (sign: string, plaque: string): Patch => ({ hospital: { sign, plaque } }),
  staff: (): Patch => ({ hospital: { staffed: true } }),
  choose: (lit: readonly number[]): Patch => ({ hospital: { lit, focus: true } }),
  moveTo: (at: At, scale: number): Patch => ({ hospital: { at, scale } }),
  off: (): Patch => ({ hospital: { on: false } }),
}

export const desk = {
  /** Unlabelled and unremarked. §5's naming depends on it landing here. */
  arrive: (at: At, scale = 0.8): Patch => ({ desk: { on: true, at, scale } }),
  off: (): Patch => ({ desk: { on: false } }),
}

export const narrator = {
  at: (at: At, pose: SceneState['narrator']['pose'], scale = 1, flip = false): Patch => ({
    narrator: { on: true, at, scale, pose, flip },
  }),
  pose: (pose: SceneState['narrator']['pose']): Patch => ({ narrator: { pose } }),
  off: (): Patch => ({ narrator: { on: false } }),
}

export const ground = {
  at: (y: number): Patch => ({ ground: { on: true, y } }),
  off: (): Patch => ({ ground: { on: false } }),
}
