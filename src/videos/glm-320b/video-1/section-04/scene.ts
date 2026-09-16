/**
 * Section 04 — "`it` gets context"
 *
 * Script and board: `video-script/video-1/04-the-word-looks-around.md`
 *
 * **Beats 8–9 are the carrying frames**: one token ID against two different
 * rows. That single image is the answer to §3's paradox and the thing §5's
 * routing argument stands on — if the row never changed, the router would have
 * nothing new to read.
 *
 * Attention is drawn *inside* the sentence rather than as a separate actor, so
 * the lines cannot drift out of alignment with the cards they connect. See the
 * note in `paper/cast/Attention.tsx`.
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
 * The embedding row for `it`, carried in from §3 and generated from the same
 * seed there. Beat 8's claim — *same ID, different numbers* — is only honest
 * if the before-row here is literally §3's row.
 */
export const ROW_SEED = 432

export type SceneState = {
  /**
   * The tracked row itself. `changed` is what beat 7 does to it: it keeps
   * `ROW_SEED` as its basis and drifts away from it, so the after-row is
   * visibly a *changed version of the same row* rather than an unrelated one.
   */
  row: Placed & { dim: boolean; changed: boolean }
  /** The prompt, with a row under every token, and the wiring drawn inside it. */
  line: Placed & {
    raise: number
    changed: number
    flat: boolean
    weighted: boolean
    masked: boolean
    flow: boolean
    lines: boolean
  }
  /** What `it` started as. Stays behind the changed row from beat 7 on. */
  ghost: Placed
  /** `432`, brought back in beat 8 to sit against both rows at once. */
  chip: Placed & { label: string; id: string; becomes: boolean }
  /** Beat 13. Closed, unexplained, and completed by §5. */
  wall: Placed
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  row: { on: false, at: { x: 50, y: 52 }, scale: 0.7, dim: false, changed: false },
  line: {
    on: false,
    at: { x: 50, y: 50 },
    scale: 1,
    raise: -1,
    changed: -1,
    flat: false,
    weighted: false,
    masked: false,
    flow: false,
    lines: false,
  },
  ghost: { on: false, at: { x: 50, y: 70 }, scale: 0.5 },
  chip: { on: false, at: { x: 16, y: 62 }, scale: 0.5, label: 'it', id: '432', becomes: true },
  wall: { on: false, at: { x: 50, y: 104 }, scale: 0.8 },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const row = { ...a('row'), rewrite: (): Patch => ({ row: { changed: true } }) }
export const ghost = a('ghost')
export const chip = a('chip')
export const wall = a('wall')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const line = {
  ...a('line'),
  /** One token lifts slightly out of the line, before anything happens to it. */
  raise: (index: number): Patch => ({ line: { raise: index } }),
  /**
   * Lines to everything it is allowed to see, all the same weight. The
   * question, before any answer — which is why beat 4 can honestly hold on it.
   */
  ask: (): Patch => ({ line: { lines: true, flat: true } }),
  /**
   * Causal masking, without the words. The forward lines **leave** — they are
   * not crossed out. Nothing in this video is crossed out.
   */
  mask: (): Patch => ({ line: { masked: true } }),
  /** Thickness becomes weight. Illustrative only: no number is ever drawn. */
  weigh: (): Patch => ({ line: { flat: false, weighted: true } }),
  /** Material travelling along the surviving lines into the looker. */
  pull: (): Patch => ({ line: { flow: true } }),
  /** Its row changes. Same token, new numbers. */
  change: (index: number): Patch => ({ line: { changed: index, flow: false } }),
  withdraw: (): Patch => ({ line: { lines: false, flow: false } }),
}

export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
