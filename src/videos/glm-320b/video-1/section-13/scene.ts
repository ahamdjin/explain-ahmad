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
 * ## One correction to the board
 *
 * The board says beat 2 pans "back to the opening sheet, exactly as it was —
 * `ModelSheet`, 320 / 18". **§1 as built has no `ModelSheet`**, deliberately:
 * "no spec read" is the first rule of that opening, so §1 opens on the number
 * itself and then on the block it shatters into. See the note in
 * `section-01/scene.ts`.
 *
 * So beat 2 returns to what §1 *actually* opened with — the number, and the
 * block behind it. That keeps the callback honest. A sheet here would be a
 * callback to a frame that does not exist, which is worse than no callback.
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
 * Say **"about five percent"** of both. Putting 4.4 and 5.6 on screen invites a
 * comparison the beat does not need, and the claim is honest at either
 * precision — which is what made it safe to open the video on.
 *
 * **"One chip", not "one graphics card."** An 80 GB accelerator is not a gaming
 * GPU, and the consumer figure exists only with offloading, which is §12's
 * material and not this section's.
 */
export const OTHER_MODEL = { total: '117B', active: '5.1B', experts: '128', chips: 1 }
export const THIS_MODEL = { total: '321B', active: '18B', experts: '288', chips: 4 }

export type SceneState = {
  /** `18`, alone, and then the two numbers as a measurement. */
  big: { on: boolean; at: At; scale: number; value: string; caption: string }
  share: Placed & { mode: 'pair' | 'bar'; lit: number; caption: string }
  /** §1's block, returning. Whole, and settling heavily. */
  block: Placed & { heavy: boolean; grain: 'fine' | 'coarse'; lit?: 'a' }
  /** The second model, as evidence. Never as a hook. */
  cardA: Placed & { chips: number; grain?: 'coarse' | 'fine'; litShare: boolean; note: string }
  cardB: Placed & { chips: number; grain?: 'coarse' | 'fine'; litShare: boolean; note: string }
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
export const verdict = a('verdict')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const block = {
  ...a('block'),
  /** All of it, still within reach. It never knows which part it wants. */
  whole: (): Patch => ({ block: { heavy: true, lit: undefined } }),
  /** The same total, divided coarsely or finely. Beats 9-10's argument. */
  grain: (grain: 'fine' | 'coarse'): Patch => ({ block: { grain } }),
}

export const cardA = a('cardA')
export const cardB = a('cardB')
