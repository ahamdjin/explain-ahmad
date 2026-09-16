/**
 * Section 13 — "What that number actually bought"
 *
 * Script and board: `video-script/video-1/13-what-that-number-bought.md`
 *
 * Not a recap. A viewer who wanted a recap stopped at §11. This section
 * **spends the six deposits** the mechanism sections made, and answers the
 * question from minute one in a way that is now unarguable, because they
 * watched every step.
 *
 * ## Everything here is a callback
 *
 * No new mechanism, no second thesis, no teaser after the last frame. Every
 * object on stage has already been earned: §1's block and its two rows of
 * accelerators, §5's route, §11's footprint. The board's "opening sheet" is
 * **not** one of them — §1 as built has no `ModelSheet`, deliberately, because
 * "no spec read" is the first rule of that opening. So the callbacks are to
 * what §1 *actually* drew: the number, the block, and the one-versus-eight
 * comparison. A sheet here would be a callback to a frame that does not exist.
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
 * The two models, from `research/glm/GROUND_TRUTH.md` and the gpt-oss card.
 *
 * §1 rounds both to "about 4%" and "about 6%", and the closing frame keeps
 * those exact words. Beats 7-8 are the one place the sharper figures are
 * spoken — ~4.4% against ~5.6% — because that is where the *footprints* are
 * measured beside them and the near-identical shares have to be precise.
 *
 * **"One chip", not "one graphics card."** An 80 GB accelerator is not a gaming
 * GPU, and the consumer figure exists only with offloading, which is §12's
 * material and not this section's.
 */
export const OTHER_MODEL = { total: '117B', active: '5.1B', experts: '128', chips: 1 }
/*
 * `chips` is the accelerator count and it is **derived, not published**: ~306
 * GiB is 328.6 GB, four 80 GB cards are 320 GB, and tensor-parallel size has
 * to divide the 64 attention heads -- so the smallest workable count is eight,
 * not four. Both this and §1 must say the same number; §1 reads `rigB.show(8)`.
 * `research/glm/GROUND_TRUTH.md` §"How many GPUs".
 */
export const THIS_MODEL = { total: '321B', active: '18B', experts: '288', chips: 8 }

export type SceneState = {
  /** `18`, alone, and then the two numbers as a measurement. */
  big: { on: boolean; at: At; scale: number; value: string; caption: string }
  share: Placed & { mode: 'pair' | 'bar'; lit: number; caption: string }
  /**
   * §1's block, returning. Whole, and settling heavily.
   *
   * `lit` takes all three patches because beat 3 replays the route: the same
   * block with a *different* eight lit each time is the only way to show
   * "another token can use a different route" without a new object.
   */
  block: Placed & { heavy: boolean; grain: 'fine' | 'coarse'; lit?: 'a' | 'b' | 'c' }
  /** The second model, as evidence. Never as a hook. */
  cardA: Placed & { chips: number; grain?: 'coarse' | 'fine'; litShare: boolean; note: string }
  cardB: Placed & { chips: number; grain?: 'coarse' | 'fine'; litShare: boolean; note: string }
  /**
   * The three differences between the two models, two of which are only size.
   * Beats 9-10. `paper/cast/Plates.tsx`.
   */
  diffs: Placed & { lit: readonly number[] }
  /**
   * §1's opening frame, to be redrawn **exactly** at beat 13.
   *
   * S-10 closes by reusing the opening's nouns, and a near-miss is worse than
   * nothing: a similar picture reads as a similar picture, while an identical
   * one reads as a *return*. The close used `ModelCard`s -- titled, gridded,
   * captioned -- against an opening made of plain `Block` sheets and rows of
   * graphics cards. Different objects, so seventeen beats of setup paid out
   * into a frame the viewer had never seen.
   *
   * Positions and scales are copied from **`section-01/beats.ts`** -- the
   * constants that actually draw §1's frame, not this section's defaults --
   * and must stay in step with them: `CMP_LEFT` 27 and `CMP_RIGHT` 73, `CMP_Y`
   * 32, `CMP_SCALE` 0.52, rigs on y 70 at scale 1, counts 1 and 8, and **both
   * blocks at `fine` grain** (§1 beat 4 sets `block2` fine explicitly, because
   * the beat's whole claim is that the two models are alike in share).
   *
   * The closing beat sets all of that itself, so these defaults are only a
   * starting point. Read `section-01/beats.ts` before changing either.
   */
  block2: Placed & { lit?: 'a' | 'b'; grain: 'fine' | 'coarse' }
  rigA: Placed & { count: number }
  rigB: Placed & { count: number }
  verdict: { on: boolean; at: At; scale: number; lines: [string, string] }
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  big: { on: false, at: { x: 50, y: 42 }, scale: 1, value: '18 billion', caption: '' },
  share: { on: false, at: { x: 50, y: 66 }, scale: 0.8, mode: 'bar', lit: 0.056, caption: '' },
  block: { on: false, at: { x: 50, y: 46 }, scale: 0.8, heavy: false, grain: 'fine', lit: undefined },
  cardA: { on: false, at: { x: 30, y: 50 }, scale: 1, chips: 0, grain: 'coarse', litShare: false, note: '' },
  cardB: { on: false, at: { x: 70, y: 50 }, scale: 1, chips: 0, grain: 'fine', litShare: false, note: '' },
  diffs: { on: false, at: { x: 50, y: 18 }, scale: 0.52, lit: [0, 1, 2] },
  block2: { on: false, at: { x: 30, y: 42 }, scale: 0.5, lit: 'b', grain: 'coarse' },
  rigA: { on: false, at: { x: 30, y: 73 }, scale: 1, count: 1 },
  rigB: { on: false, at: { x: 72, y: 73 }, scale: 1, count: 8 },
  verdict: {
    on: false,
    at: { x: 50, y: 48 },
    scale: 1,
    lines: [
      'Cheap to run is not the same thing as small.',
      '“Active parameters” is a compute number. It was never a memory number.',
    ],
  },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const big = a('big')
export const share = a('share')
/**
 * Beat 9 names all three causes and then keeps only the two that explain the
 * footprint. Granularity (index 2) is real and is on the cards, but total
 * parameters and shipped precision are what make ~58 GiB into ~306 GiB -- so
 * the frame must not leave granularity lit as if it were the reason.
 */
export const diffs = {
  ...a('diffs'),
  all: (): Patch => ({ diffs: { on: true, lit: [0, 1, 2] } }),
  /** Different-sized models, stored at different precisions. That is the cause. */
  onlySize: (): Patch => ({ diffs: { lit: [0, 1] } }),
  onlyGranularity: (): Patch => ({ diffs: { lit: [2] } }),
}
export const block2 = a('block2')
export const rigA = a('rigA')
export const rigB = a('rigB')
export const verdict = a('verdict')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const block = {
  ...a('block'),
  /** A different eight, on the same block. Beats 3 and 12. */
  route: (lit: 'a' | 'b' | 'c'): Patch => ({ block: { lit } }),
  /** All of it, still within reach. It never knows which part it wants. */
  whole: (): Patch => ({ block: { heavy: true, lit: undefined } }),
  /** The same total, divided coarsely or finely. Beats 9-10's argument. */
  grain: (grain: 'fine' | 'coarse'): Patch => ({ block: { grain } }),
}

export const cardA = a('cardA')
export const cardB = a('cardB')
