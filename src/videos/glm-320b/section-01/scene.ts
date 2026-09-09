/**
 * Section 01 scene state.
 *
 * One scene, mounted once. A beat issues *partial patches* which are merged
 * cumulatively, so persistence is the default and nothing is ever rebuilt.
 * Verbs describe story actions ("hospital.staff", "desk.name") rather than CSS,
 * so beats.ts reads as direction and not as styling.
 */

export type At = { x: number; y: number }

export type SceneState = {
  /** Beats 1-5. The model info sheet. */
  sheet: { on: boolean; at: At; scale: number; lit: 'none' | 'total' | 'both' }
  /** Beats 5-9. The two numbers, alone, then as one share bar. */
  bar: {
    on: boolean
    at: At
    scale: number
    mode: 'pair' | 'bar'
    /** Fraction of the bar that is lit. 0.056 = 18B of 320B. */
    lit: number
    caption: string
    /** Darkens the unlit remainder, so the question has something to sit on. */
    dark: boolean
  }
  /** Beats 10-31. The world. */
  hospital: {
    on: boolean
    at: At
    scale: number
    sign: string
    plaque: string
    staffed: boolean
    /** Indices of the lit specialists. Empty = nobody chosen yet. */
    lit: readonly number[]
    /** Greys everything unlit, so 8-vs-280 reads instantly. */
    focus: boolean
    /** Whole building recedes to a prop while something else holds the frame. */
    quiet: boolean
    /** The `hundreds of gigabytes` weight, plus a visible sag. */
    heavy: boolean
    /** On-call bunks with zZ, for the plan at beat 26. */
    bunks: boolean
    doorsOpen: boolean
  }
  /** The word being processed. Never called a token in this section. */
  word: { on: boolean; at: At; scale: number; label: string }
  /** The front desk. Present from beat 13, named ROUTER only at beat 23. */
  desk: { on: boolean; at: At; scale: number; named: boolean; ringed: boolean }
  /** The eight, lifted out of the building. */
  team: { on: boolean; at: At; scale: number; boxed: boolean }
  /** Beat 26. The plan, drawn as a plan. */
  plan: { on: boolean; at: At; scale: number }
  /** Beat 27. A generic small machine. Never a named or personal device. */
  machine: { on: boolean; at: At; scale: number; filled: boolean }
  /** Beat 30. The unreadable architecture sheet. */
  archSheet: { on: boolean; at: At; scale: number; pushed: boolean }
  narrator: {
    on: boolean
    at: At
    scale: number
    pose: 'wonder' | 'point' | 'think' | 'hopeful' | 'cheer' | 'push' | 'nod'
    flip: boolean
  }
}

export const INITIAL: SceneState = {
  sheet: { on: false, at: { x: 50, y: 46 }, scale: 1, lit: 'none' },
  bar: { on: false, at: { x: 50, y: 44 }, scale: 1, mode: 'pair', lit: 0.056, caption: '', dark: false },
  hospital: {
    on: false,
    at: { x: 55, y: 47 },
    scale: 1,
    sign: '',
    plaque: '',
    staffed: false,
    lit: [],
    focus: false,
    quiet: false,
    heavy: false,
    bunks: false,
    doorsOpen: false,
  },
  word: { on: false, at: { x: 12, y: 50 }, scale: 1, label: 'scared' },
  desk: { on: false, at: { x: 20, y: 78 }, scale: 1, named: false, ringed: false },
  team: { on: false, at: { x: 15, y: 58 }, scale: 1, boxed: false },
  plan: { on: false, at: { x: 50, y: 52 }, scale: 1 },
  machine: { on: false, at: { x: 76, y: 68 }, scale: 1, filled: false },
  archSheet: { on: false, at: { x: 48, y: 50 }, scale: 1, pushed: false },
  narrator: { on: false, at: { x: 13, y: 68 }, scale: 1, pose: 'wonder', flip: false },
}

type Actor = keyof SceneState
export type Patch = { [K in Actor]?: Partial<SceneState[K]> }

/** Cumulative merge. Absence of a key means "leave it exactly as it was". */
export function applyPatches(base: SceneState, patches: Patch[]): SceneState {
  const next: SceneState = {
    sheet: { ...base.sheet },
    bar: { ...base.bar },
    hospital: { ...base.hospital },
    word: { ...base.word },
    desk: { ...base.desk },
    team: { ...base.team },
    plan: { ...base.plan },
    machine: { ...base.machine },
    archSheet: { ...base.archSheet },
    narrator: { ...base.narrator },
  }

  for (const patch of patches) {
    for (const key of Object.keys(patch) as Actor[]) {
      Object.assign(next[key], patch[key])
    }
  }

  return next
}

/**
 * The eight chosen specialists, scattered across floors rather than adjacent.
 *
 * Deliberately not a contiguous block: routing picks by score, not by locality,
 * and a tidy rectangle would teach the wrong thing. See art-direction §7 —
 * experts are not labelled specialists and are not neighbours.
 */
export const CHOSEN = [41, 76, 103, 147, 168, 211, 245, 278] as const

/* -- Story verbs ------------------------------------------------------------
 * Each returns a patch. beats.ts should never touch scene shape directly. */

export const sheet = {
  arrive: (at: At, scale = 1): Patch => ({ sheet: { on: true, at, scale, lit: 'none' } }),
  lightTotal: (): Patch => ({ sheet: { lit: 'total' } }),
  lightBoth: (): Patch => ({ sheet: { lit: 'both' } }),
  foldAway: (): Patch => ({ sheet: { on: false, scale: 0.72 } }),
}

export const bar = {
  /** The two numbers survive the sheet, alone on the paper. */
  asPair: (at: At, scale = 1): Patch => ({ bar: { on: true, at, scale, mode: 'pair' } }),
  /** The pair becomes one measured bar: the whole premise in a single image. */
  asBar: (at: At, scale = 1, caption = ''): Patch => ({ bar: { on: true, at, scale, mode: 'bar', caption } }),
  darken: (): Patch => ({ bar: { dark: true } }),
  moveTo: (at: At, scale: number): Patch => ({ bar: { at, scale } }),
  off: (): Patch => ({ bar: { on: false } }),
}

export const hospital = {
  /** Rises out of the bar. Same subject, new form -- never a slide change. */
  rise: (at: At, scale = 1): Patch => ({ hospital: { on: true, at, scale } }),
  label: (sign: string, plaque: string): Patch => ({ hospital: { sign, plaque } }),
  staff: (): Patch => ({ hospital: { staffed: true } }),
  choose: (lit: readonly number[]): Patch => ({ hospital: { lit, focus: true } }),
  heavy: (): Patch => ({ hospital: { heavy: true } }),
  /** Clears the weight. The plan is the answer to it, so it stops pressing. */
  unheavy: (): Patch => ({ hospital: { heavy: false } }),
  quiet: (): Patch => ({ hospital: { quiet: true } }),
  wake: (): Patch => ({ hospital: { quiet: false } }),
  bunks: (): Patch => ({ hospital: { bunks: true } }),
  unbunk: (): Patch => ({ hospital: { bunks: false } }),
  openDoors: (): Patch => ({ hospital: { doorsOpen: true } }),
  moveTo: (at: At, scale: number): Patch => ({ hospital: { at, scale } }),
}

export const word = {
  /** Superseded by a later object that restates it. See `plan`. */
  off: (): Patch => ({ word: { on: false } }),
  arrive: (at: At, scale = 1, label = 'scared'): Patch => ({ word: { on: true, at, scale, label } }),
  moveTo: (at: At, scale?: number): Patch => ({ word: { at, ...(scale === undefined ? {} : { scale }) } }),
}

export const desk = {
  /** Superseded by a later object that restates it. See `plan`. */
  off: (): Patch => ({ desk: { on: false } }),
  /** Present, unlabelled, unremarked. The whole reveal at beat 23 depends on
   *  this landing ten beats early. */
  arrive: (at: At, scale = 1): Patch => ({ desk: { on: true, at, scale } }),
  name: (): Patch => ({ desk: { named: true, ringed: true } }),
  moveTo: (at: At, scale?: number): Patch => ({ desk: { at, ...(scale === undefined ? {} : { scale }) } }),
}

export const team = {
  /** Superseded by a later object that restates it. See `plan`. */
  off: (): Patch => ({ team: { on: false } }),
  lift: (at: At, scale = 1): Patch => ({ team: { on: true, at, scale } }),
  box: (): Patch => ({ team: { boxed: true } }),
  moveTo: (at: At, scale?: number): Patch => ({ team: { at, ...(scale === undefined ? {} : { scale }) } }),
}

/*
 * Panels are the exception to persistence.
 *
 * The rule is that the *world* accumulates -- the hospital, the word and the
 * narrator are never destroyed and never rebuilt. But an explanatory panel is
 * not part of the world, and a panel that outlives its beat collides with
 * whatever comes next. The plan is also a restatement: it already contains the
 * router, the eight and the sleepers, so leaving the originals on screen
 * underneath it is duplication, not continuity.
 */
export const plan = {
  draw: (at: At, scale = 1): Patch => ({ plan: { on: true, at, scale } }),
  moveTo: (at: At, scale?: number): Patch => ({ plan: { at, ...(scale === undefined ? {} : { scale }) } }),
  off: (): Patch => ({ plan: { on: false } }),
}

export const machine = {
  off: (): Patch => ({ machine: { on: false } }),
  arrive: (at: At, scale = 1): Patch => ({ machine: { on: true, at, scale } }),
  fill: (): Patch => ({ machine: { filled: true } }),
}

export const archSheet = {
  slam: (at: At, scale = 1): Patch => ({ archSheet: { on: true, at, scale, pushed: false } }),
  shove: (at: At, scale: number): Patch => ({ archSheet: { at, scale, pushed: true } }),
  off: (): Patch => ({ archSheet: { on: false } }),
}

export const narrator = {
  at: (at: At, pose: SceneState['narrator']['pose'], scale = 1, flip = false): Patch => ({
    narrator: { on: true, at, scale, pose, flip },
  }),
  pose: (pose: SceneState['narrator']['pose']): Patch => ({ narrator: { pose } }),
}
