/**
 * Section 11 — "So could you store only the 18 billion?"
 *
 * Script and board: `video-script/video-1/11-could-you-store-only-the-18.md`
 *
 * **The payoff begins here.** Everything before this exists to make this
 * section arithmetic the viewer can follow rather than a claim from authority.
 *
 * Three things are load-bearing and none may be cut.
 *
 * **Beat 3 has to visibly succeed**, with a tick. A plan that never worked
 * cannot break, and the failure has to be a discovery rather than a lecture.
 *
 * **Beat 12's bars are to true scale**, and the small one is enlarged with the
 * enlargement labelled. A dishonest bar chart here would undo the whole video.
 *
 * **Beat 13's "not like that"** is the hinge into §12 and is not optional. It
 * is what stops this section being the overclaim the earlier drafts made — see
 * `research/glm/OFFLOADING_AND_LOCALITY.md`.
 */
import {
  actorVerbs,
  mergePatches,
  INITIAL_CAMERA,
  INITIAL_GROUND,
  INITIAL_NARRATOR,
  type At,
  type CameraActor,
  type GroundActor,
  type NarratorActor,
  type PatchOf,
  type Placed,
} from '../../../../paper'

/**
 * The arithmetic, from `research/glm/GROUND_TRUTH.md`.
 *
 * ~1.7 s is 8.46 GB off a ~5 GB/s drive. It is derived from a typical rate
 * rather than measured, so the spoken line says "the better part of two
 * seconds" and never a decimal. The on-screen clock read ~1.5 s, which is not
 * the better part of two anything.
 *
 * `moe_intermediate_size` **is** confirmed: 2048, read from `config.json` on
 * 2026-09-11, so one expert is 4096 × 2048 × 3 = 25.17 MB at FP8 and 336 of
 * them is 8.46 GB. That arithmetic is the only thing holding up this section's
 * answer, so it is a measured number and not an estimate.
 *
 * **These have to agree with the spoken line**, which says "about twenty-five"
 * and "about eight and a half". `MB_PER_EXPERT` read 26 and `GB_PER_TOKEN` read
 * 8 while the narrator said 25 and 8.5 -- the frame contradicting the voice
 * over the top of it. `research/glm/GROUND_TRUTH.md`.
 */
export const VISITS = 336
export const MB_PER_EXPERT = 25
export const GB_PER_TOKEN = 8.5

export type SceneState = {
  /** The tower, still there, with the two numbers settling over it. */
  tower: Placed & { floor: number }
  numbers: { on: boolean; at: At; scale: number; value: string; caption: string }
  /** The plan, drawn identically to §1's. The callback needs the same object. */
  store: Placed & { label: string }
  desk: Placed & { named: boolean }
  machine: Placed & { filled: boolean }
  path: Placed & { items: number; jammed: boolean }
  count: { on: boolean; at: At; scale: number; value: number; label: string; run: boolean }
  /**
   * ~8.5 GB, for one token.
   *
   * **Token, not word.** §2 beat 6 spends a whole clause establishing the rule
   * -- *"from here on, whenever I count something, I'm counting tokens"* -- and
   * this caption read "for one word" while the narrator said "For one token"
   * over the top of it, in the same beat. The licence §2 grants is to keep
   * saying "word" about *this sentence*, where every token happens to be one.
   * It is not a licence to put a figure on screen against the wrong unit.
   */
  total: { on: boolean; at: At; scale: number; value: string; caption: string }
  clock: Placed & { seconds: number; running: boolean; label: string }
  bars: Placed & { show: 'fetch' | 'both'; ratio: string; inset: boolean }
  /**
   * The cache shelf, sketched in at the very end and left **empty**. Beats
   * 14-15.
   *
   * §12's reversal only works if the viewer arrives there already believing
   * that caching solves this -- S-09 needs a belief *this video taught them*,
   * not one they brought with them. So the belief is planted deliberately, in
   * its own frame, and endorsed out loud: *you're right*. Empty, because §12
   * is what fills it.
   */
  shelf: Placed & { outline: boolean }
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  tower: { on: false, at: { x: 26, y: 48 }, scale: 0.82, floor: 0 },
  numbers: { on: false, at: { x: 66, y: 34 }, scale: 1, value: '18 of 320', caption: 'billion — the bit it uses' },
  store: { on: false, at: { x: 16, y: 44 }, scale: 0.72, label: 'the whole model, on a drive' },
  desk: { on: false, at: { x: 44, y: 66 }, scale: 0.5, named: true },
  machine: { on: false, at: { x: 80, y: 44 }, scale: 0.8, filled: false },
  path: { on: false, at: { x: 50, y: 40 }, scale: 0.9, items: 0, jammed: false },
  /*
   * Right of the router, not on it. At 50/74 the counter's digits landed
   * across the desk (40-50, 63-77) for every beat it was on screen -- the
   * number the section is built on, printed over the mechanism that produces
   * it.
   */
  count: { on: false, at: { x: 62, y: 74 }, scale: 1, value: VISITS, label: '', run: false },
  total: { on: false, at: { x: 50, y: 40 }, scale: 1, value: '~8.5 GB', caption: 'for one token' },
  clock: { on: false, at: { x: 80, y: 44 }, scale: 1, seconds: 1.7, running: false, label: '~1.7 s' },
  bars: { on: false, at: { x: 50, y: 48 }, scale: 1, show: 'fetch', ratio: '', inset: false },
  shelf: { on: false, at: { x: 24, y: 80 }, scale: 0.58, outline: true },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const tower = a('tower')
export const numbers = a('numbers')
export const store = a('store')
export const desk = a('desk')
export const machine = a('machine')
export const total = a('total')
/** Beat 14 sketches it; beat 15 lets it finish and stay, still empty. */
export const shelf = {
  ...a('shelf'),
  finish: (): Patch => ({ shelf: { outline: false } }),
}

export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const path = {
  ...a('path'),
  /** Eight blocks fly across. It works. */
  fetch: (items = 8): Patch => ({ path: { on: true, items, jammed: false } }),
  /**
   * The only "jam" in the video, and it is a **traffic** read — the path full,
   * things queuing. Never a barrier and never a cross.
   */
  congest: (): Patch => ({ path: { items: 12, jammed: true } }),
  clear: (): Patch => ({ path: { items: 0, jammed: false } }),
}

export const count = {
  ...a('count'),
  run: (value: number, label: string): Patch => ({ count: { on: true, value, label, run: true } }),
  hold: (): Patch => ({ count: { run: false } }),
}

export const clock = {
  ...a('clock'),
  start: (): Patch => ({ clock: { on: true, running: true } }),
}

export const bars = {
  ...a('bars'),
  /** The cost of carrying them in. One bar, alone, so it has no rival yet. */
  fetch: (): Patch => ({ bars: { on: true, show: 'fetch' } }),
  /** And the work. Almost invisible, which is the finding. */
  both: (ratio: string): Patch => ({ bars: { show: 'both', ratio } }),
  /** To true scale, with the enlargement of the small bar labelled. */
  toScale: (): Patch => ({ bars: { inset: true } }),
}

export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
