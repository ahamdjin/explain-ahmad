/**
 * Section 04 — "The word looks around"
 *
 * Script and board: `video-script/video-1/04-the-word-looks-around.md`
 *
 * **Beats 11-12 are the carrying frames**: two different rows, with the
 * identical starting row ghosted behind them. That single image is the answer
 * to §3's paradox, and everything else in the section is arranging the stage so
 * it can exist.
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

export const DOG_SEED = 5562

/**
 * The video's one comparison example, and the load-bearing one.
 *
 * It is chosen because the viewer already knows the answer — so the section
 * teaches *where the machine does it*, not *that language is contextual*.
 */

export type SceneState = {
  /** The three identical rows from §3, collapsing back into one. */
  row: Placed & { dim: boolean }
  /** The prompt, with a row under every token. */
  line: Placed & {
    raise: number
    changed: number
    flat: boolean
    weighted: boolean
    masked: boolean
    flow: boolean
    lines: boolean
    /** Every row changing at once. Beat 9. */
    changedAll: boolean
  }
  /** The two sentences, side by side. Beat 10. */
  barked: Placed
  hot: Placed
  /** Their two `dog` rows, lifted out and aligned. Beats 11-14. */
  rowA: Placed & { covered: boolean }
  rowB: Placed & { covered: boolean }
  /** The row they both started from. Identical, and behind both. */
  ghost: Placed
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  row: { on: false, at: { x: 50, y: 44 }, scale: 0.7, dim: false },
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
    changedAll: false,
  },
  barked: { on: false, at: { x: 26, y: 34 }, scale: 0.66 },
  hot: { on: false, at: { x: 74, y: 34 }, scale: 0.66 },
  rowA: { on: false, at: { x: 26, y: 62 }, scale: 0.44, covered: true },
  rowB: { on: false, at: { x: 74, y: 62 }, scale: 0.44, covered: true },
  ghost: { on: false, at: { x: 50, y: 80 }, scale: 0.44 },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const row = a('row')
export const barked = a('barked')
export const hot = a('hot')
/** Both rows uncover together -- one at a time would answer half a question. */
export const rowA = { ...a('rowA'), uncover: (): Patch => ({ rowA: { covered: false } }) }
export const rowB = { ...a('rowB'), uncover: (): Patch => ({ rowB: { covered: false } }) }
export const ghost = a('ghost')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const line = {
  ...a('line'),
  /** One token lifts slightly out of the line, before anything happens to it. */
  raise: (index: number): Patch => ({ line: { raise: index } }),
  /** Even lines to everything. The question, before the answers. */
  ask: (): Patch => ({ line: { lines: true, flat: true } }),
  /** Thickness becomes weight. Some matter a lot; most barely matter. */
  weigh: (): Patch => ({ line: { flat: false, weighted: true } }),
  /**
   * Causal masking, without the words. The forward lines **leave** — they are
   * not crossed out. Nothing in this video is crossed out.
   */
  mask: (): Patch => ({ line: { masked: true } }),
  /** Material travelling along the surviving lines into the looker. */
  pull: (): Patch => ({ line: { flow: true } }),
  /** Its row changes. Same token, new numbers. */
  change: (index: number): Patch => ({ line: { changed: index, flow: false } }),
  /**
   * Beat 9. Every row changes at once.
   *
   * The lines come off first: with the wiring still drawn, "all of them, to
   * themselves" reads as our word doing something to the others rather than
   * each word doing it to itself.
   */
  changeAll: (): Patch => ({ line: { changedAll: true, lines: false, flow: false } }),
  withdraw: (): Patch => ({ line: { lines: false, flow: false } }),
}

export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
