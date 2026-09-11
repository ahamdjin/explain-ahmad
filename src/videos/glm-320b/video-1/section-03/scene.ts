/**
 * Section 03 — "From an ID to a meaning"
 *
 * Script and board: `video-script/video-1/03-from-an-id-to-a-meaning.md`
 *
 * The section's whole job is beats 7-11: **dog, cat, Tuesday**. If that image
 * does not teach "meaning is where the row sits", no motion pass saves the
 * section — so the three rows are three separate actors, and beat 10 folds
 * them into three points rather than cutting to a chart.
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

/** The seed the `dog` row is generated from. `cat` drifts from it; `Tuesday` doesn't. */
export const DOG_SEED = 4021

export type SceneState = {
  /** `4021`, carried in from §2's last frame. */
  chip: Placed & { label: string; id: string; becomes: boolean }
  /** 154,880 rows, running past the top of frame. The height is the point. */
  table: Placed & { pulled: boolean; seeking: boolean }
  /**
   * The three rows. Separate actors because the event of beats 8-9 is **two
   * of them on one frame, aligned** — and an actor cannot be two places.
   */
  dog: Placed & { extend: boolean; matches: boolean; label: string }
  cat: Placed & { matches: boolean; label: string }
  tues: Placed & { matches: boolean; label: string }
  /** The same row, pulled twice more. Beat 13's deposit is three identical rows. */
  again1: Placed
  again2: Placed
  /** Relative distance only. No axes, no grid, no coordinates. */
  space: { on: boolean; show: boolean; at: At; scale: number }
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  chip: { on: false, at: { x: 46, y: 46 }, scale: 1, label: 'dog', id: '4021', becomes: true },
  table: { on: false, at: { x: 22, y: 50 }, scale: 1, pulled: false, seeking: false },
  dog: { on: false, at: { x: 58, y: 34 }, scale: 0.6, extend: false, matches: false, label: 'dog' },
  cat: { on: false, at: { x: 58, y: 52 }, scale: 0.6, matches: false, label: 'cat' },
  tues: { on: false, at: { x: 58, y: 70 }, scale: 0.6, matches: false, label: 'Tuesday' },
  again1: { on: false, at: { x: 58, y: 52 }, scale: 0.6 },
  again2: { on: false, at: { x: 58, y: 70 }, scale: 0.6 },
  space: { on: false, show: false, at: { x: 58, y: 52 }, scale: 1.4 },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const chip = a('chip')
export const dog = { ...a('dog'), compare: (): Patch => ({ dog: { matches: true } }) }
export const cat = { ...a('cat'), compare: (): Patch => ({ cat: { matches: true } }) }
export const tues = { ...a('tues'), compare: (): Patch => ({ tues: { matches: true } }) }
export const again1 = a('again1')
export const again2 = a('again2')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const table = {
  ...a('table'),
  /** The ID travels up the table and stops at its own row. */
  seek: (): Patch => ({ table: { seeking: true } }),
  /** That row slides out and comes forward. */
  pull: (): Patch => ({ table: { pulled: true, seeking: false } }),
}

/**
 * Beat 10. The rows become points.
 *
 * A **representation change**, so it is animated as a fold — the same objects
 * rearranging. Never a cut to a scatter plot: the rows live in 4096 dimensions
 * and a viewer who could read a position off the frame would be reading a lie.
 */
export const space = {
  fold: (): Patch => ({ space: { on: true, show: true } }),
  unfold: (): Patch => ({ space: { on: false, show: false } }),
}

export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
