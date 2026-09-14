/**
 * Section 02 — "What the model actually receives"
 *
 * Script and board: `video-script/video-1/02-your-words-become-tokens.md`
 *
 * APPROVED NARRATION IS LOCKED. This scene adapts around the script. The
 * protagonist is `it`, token index 7, measured token ID 432.
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

export type SceneState = {
  /** Legacy entrance actors retained because the stage already supports them. */
  hospital: Placed & { staffed: boolean; doorsOpen: boolean; dim: boolean }
  desk: Placed
  /** What the viewer typed. One object, from whole sentence to eight pieces. */
  sentence: Placed & { split: boolean; jumble: boolean; focus: number }
  /** Real tokenizer counterexample: unbelievable -> un / belie / vable. */
  extra: Placed & { split: boolean; words: readonly string[] }
  /** Every token the model knows. The same conceptual object returns in §9. */
  vocab: Placed & { hit?: number; scrolling: boolean }
  /**
   * The tracked `it` piece. It makes a round trip to vocabulary row 432 and
   * returns carrying the ID. It is never replaced by a new actor.
   */
  chip: Placed & { label: string; id: string; becomes: boolean }
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  hospital: { on: false, at: { x: 52, y: 46 }, scale: 0.86, staffed: true, doorsOpen: false, dim: true },
  desk: { on: false, at: { x: 14, y: 78 }, scale: 0.66 },
  sentence: { on: false, at: { x: 50, y: 46 }, scale: 1, split: false, jumble: false, focus: -1 },
  extra: { on: false, at: { x: 50, y: 22 }, scale: 0.6, split: false, words: ['unbelievable'] },
  vocab: { on: false, at: { x: 84, y: 48 }, scale: 1, hit: undefined, scrolling: false },
  chip: { on: false, at: { x: 50, y: 46 }, scale: 0.55, label: 'it', id: '432', becomes: false },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const hospital = { ...a('hospital'), open: (): Patch => ({ hospital: { doorsOpen: true } }) }
export const desk = a('desk')
export const vocab = {
  ...a('vocab'),
  scroll: (): Patch => ({ vocab: { scrolling: true } }),
  land: (hit: number): Patch => ({ vocab: { scrolling: false, hit } }),
}
export const chip = {
  ...a('chip'),
  becomes: (): Patch => ({ chip: { becomes: true } }),
}
export const extra = a('extra')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const sentence = {
  ...a('sentence'),
  fracture: (): Patch => ({ sentence: { split: true, jumble: true } }),
  settle: (): Patch => ({ sentence: { jumble: false } }),
  follow: (index: number): Patch => ({ sentence: { focus: index } }),
}

export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
