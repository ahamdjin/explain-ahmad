/**
 * Section 07 — "That was one layer. There are 45."
 *
 * Script and board: `video-script/video-1/07-one-layer-of-forty-five.md`
 *
 * Beat 2 is the biggest single moment in the video. §6 spent a whole beat
 * giving the room edges so that this one can take it away — the viewer can
 * point back at §6 beat 11 and say *"we were in there."* That is the entire
 * reason the previous section had no camera moves.
 *
 * Beat 10 has to happen **before** beat 11, or the arithmetic is 8 × 45.
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
  type TowerFlash,
} from '../../../../paper'

/** 8 experts × 42 sparse floors. The number the whole ending rests on. */
export const VISITS = 336

export type SceneState = {
  /** The room from §6, which is about to turn out to be one floor of 45. */
  room: { on: boolean; bounded: boolean; at: At; scale: number }
  tower: Placed & {
    floor: number
    markers: number
    flash?: TowerFlash
    teams: boolean
    trace: boolean
  }
  /** The row at floor one and the row at floor two. Different values. */
  rowA: Placed & { label: string }
  rowB: Placed & { label: string }
  count: { on: boolean; at: At; scale: number; value: number; label: string; run: boolean }
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  room: { on: false, bounded: true, at: { x: 50, y: 50 }, scale: 1 },
  tower: { on: false, at: { x: 52, y: 50 }, scale: 1, floor: 0, markers: 0, teams: false, trace: false },
  rowA: { on: false, at: { x: 18, y: 34 }, scale: 0.34, label: 'floor 1' },
  rowB: { on: false, at: { x: 18, y: 54 }, scale: 0.34, label: 'floor 2' },
  count: { on: false, at: { x: 84, y: 48 }, scale: 1, value: VISITS, label: '', run: false },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const room = { ...a('room'), shrink: (scale: number): Patch => ({ room: { scale } }) }
export const rowA = a('rowA')
export const rowB = a('rowB')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const tower = {
  ...a('tower'),
  /** The token climbs. It does not get processed once. */
  climbTo: (floor: number): Patch => ({ tower: { floor, markers: 1 } }),
  /**
   * Look · pick · work, and the order is the causal argument.
   *
   * Out of order it teaches the wrong thing: the router reads the hidden state
   * **after** attention, and that ordering is the crux of the whole video.
   */
  flash: (flash?: TowerFlash): Patch => ({ tower: { flash } }),
  /** Light this floor's eight, and the floor below's, in different places. */
  showTeams: (): Patch => ({ tower: { teams: true } }),
  /** One line, bottom to top: every floor needed the one below it. */
  trace: (): Patch => ({ tower: { trace: true } }),
}

export const count = {
  ...a('count'),
  /** Watched being built, beside the marker doing the climbing. */
  run: (value: number, label: string): Patch => ({
    count: { on: true, value, label, run: true },
  }),
  hold: (): Patch => ({ count: { run: false } }),
}

export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
