/**
 * Section 06 — "The experts do the work"
 *
 * Script and board: `video-script/video-1/06-the-experts-do-the-work.md`
 *
 * **No camera moves at all.** This section is one continuous look at one
 * operation, and the stillness is what makes §7's pull-back land.
 *
 * Beat 11 is the setup for the entire next section: the room gets edges for the
 * first time, so that when we pull back it can become a floor. Nothing is said
 * over it — the frame does the work, and §7 spends it.
 */
import {
  actorVerbs,
  mergePatches,
  INITIAL_GROUND,
  INITIAL_NARRATOR,
  type BlendStage,
  type GroundActor,
  type NarratorActor,
  type PatchOf,
  type Placed,
} from '../../../../paper'

export const CHOSEN = [41, 76, 103, 147, 168, 211, 245, 278] as const

export type SceneState = {
  /** The wall from §5, receding into the background as the eight come forward. */
  hospital: Placed & { lit: readonly number[]; recede: boolean }
  /** One row in, eight different rows out, blended back into one. */
  blend: Placed & { stage: BlendStage; shared: boolean; ghost: boolean; label: string }
  /** The survivor, alone. Beat 10. */
  row: Placed & { label: string }
  /** Edges, for the first time. This is what §7 pulls back from. */
  room: { on: boolean; bounded: boolean; more: boolean; scale: number }
  narrator: NarratorActor
  ground: GroundActor
}

export const INITIAL: SceneState = {
  hospital: { on: false, at: { x: 52, y: 40 }, scale: 0.86, lit: CHOSEN, recede: false },
  blend: { on: false, at: { x: 50, y: 50 }, scale: 1, stage: 'idle', shared: false, ghost: false, label: '' },
  row: { on: false, at: { x: 50, y: 50 }, scale: 0.72, label: '' },
  room: { on: false, bounded: false, more: false, scale: 1 },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const hospital = { ...a('hospital'), recede: (): Patch => ({ hospital: { recede: true } }) }
export const row = a('row')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const blend = {
  ...a('blend'),
  /** Each of the eight takes a copy. Same numbers, eight times. */
  copy: (): Patch => ({ blend: { stage: 'copy' } }),
  /** Eight visibly different rows come out the far side. */
  out: (): Patch => ({ blend: { stage: 'out' } }),
  /**
   * Each output takes the size of its expert's score.
   *
   * This is why §5's scoring mattered. Without it the blend looks like an
   * average and the router's grading was decoration.
   */
  weigh: (): Patch => ({ blend: { stage: 'weighted' } }),
  merge: (): Patch => ({ blend: { stage: 'merging' } }),
  /** The always-on expert's output, joining from the side. */
  plusOne: (): Patch => ({ blend: { shared: true } }),
  done: (label = ''): Patch => ({ blend: { stage: 'merged', label } }),
  /** The row that arrived, for comparison. Same length, new values. */
  compare: (): Patch => ({ blend: { ghost: true } }),
}

/**
 * Beat 11. The room gets edges.
 *
 * It exists for exactly one reason, and the reason is in the next section.
 */
export const room = {
  draw: (): Patch => ({ room: { on: true, bounded: true } }),
  /**
   * Beat 13. The room gives up frame and neighbours appear at the edges.
   *
   * Shrinking *in place* rather than cutting away, because §7 beat 2 continues
   * this exact move -- the room the viewer has stood in for two sections turns
   * out to be one floor, and that only lands if it is the same object all the
   * way through.
   */
  hintAtMore: (scale = 0.82): Patch => ({ room: { more: true, scale } }),
}
