/**
 * Section 02 — "Your words become tokens"
 *
 * Script and board: `video-script/02-your-words-become-tokens.md`
 *
 * This section exists in the shape it does because of one note from Ahmad: the
 * old version asserted *"the model doesn't read that, not as letters"* over a
 * frame where nothing was happening and the viewer had no idea where they were.
 *
 * So the prompt physically arrives, the camera follows it through the doorway,
 * and the splitting happens in front of us on a surface we watched ourselves
 * land on. **I explain what is on the screen; the screen never explains my
 * wording.** See `skills/SPATIAL_CONTINUITY.md`.
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
} from '../../../paper'

/** The running prompt. Every section that needs text uses this sentence. */

/**
 * `dropp` + `ed` is the whole reason this list is written out by hand.
 *
 * An even split teaches "token = word", and §4's example — the same word
 * carrying different numbers in different sentences — depends on that lesson
 * having landed. The unevenness is load-bearing, so it is authored and never
 * generated.
 */

export type SceneState = {
  /** Carried in from §1, unlabelled, and dim. It is not the subject yet. */
  hospital: Placed & { staffed: boolean; doorsOpen: boolean; dim: boolean }
  desk: Placed
  /** What you typed. One object, from whole card to nine pieces. */
  sentence: Placed & { split: boolean; jumble: boolean; focus: number }
  /** `understanding`, which arrives to break into three and then leaves. */
  extra: Placed & { split: boolean; words: readonly string[] }
  /** Every token the model knows. The same object returns in §9. */
  vocab: Placed & { hit?: number; scrolling: boolean }
  /**
   * The piece that makes the round trip to the list and comes back carrying a
   * number. Going, touching and coming back changed is what makes a lookup
   * feel like a lookup instead of a substitution.
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
  extra: { on: false, at: { x: 50, y: 22 }, scale: 0.6, split: false, words: ['understanding'] },
  vocab: { on: false, at: { x: 84, y: 48 }, scale: 1, hit: undefined, scrolling: false },
  chip: { on: false, at: { x: 50, y: 46 }, scale: 0.55, label: 'dog', id: '4021', becomes: false },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const hospital = { ...a('hospital'), open: (): Patch => ({ hospital: { doorsOpen: true } }) }
export const desk = a('desk')
export const vocab = {
  ...a('vocab'),
  /** Long enough to feel long, and it stops on a real entry. */
  scroll: (): Patch => ({ vocab: { scrolling: true } }),
  land: (hit: number): Patch => ({ vocab: { scrolling: false, hit } }),
}
export const chip = {
  ...a('chip'),
  /** The letters go; the digits stay. The same card, both times. */
  becomes: (): Patch => ({ chip: { becomes: true } }),
}
export const extra = a('extra')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const sentence = {
  ...a('sentence'),
  /** It comes apart where it is. Not replaced — fractured. */
  fracture: (): Patch => ({ sentence: { split: true, jumble: true } }),
  /** The pieces settle into a row. */
  settle: (): Patch => ({ sentence: { jumble: false } }),
  follow: (index: number): Patch => ({ sentence: { focus: index } }),
}

/**
 * The camera. Two moves, both at the front of the section.
 *
 * Beat 3 is the only place in the video the camera passes *through* something.
 * It is one beat with two stages — push into the doorway, then the world
 * changes behind the move — because a doorway crossed over two beats reads as
 * two shots of a door rather than as going in.
 */
export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
