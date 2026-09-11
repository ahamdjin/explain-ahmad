/**
 * Section 12 — "How people actually run these"
 *
 * Script and board: `video-script/video-1/12-how-people-actually-run-these.md`
 *
 * **The honesty section.** Without it the video is contradicted by a
 * `llama.cpp` flag, and the audience most likely to comment is the audience
 * that already knows it. So we raise the objection ourselves, before the
 * comments do, and we concede it **generously**: the machine visibly works,
 * at a real pace, before any qualification arrives.
 *
 * Two figures may not be misused here.
 *
 * **Cite the regime.** The reassuring cache numbers — 44.2% consecutive-token
 * sharing, LRU-128 around 81% — are measured on **Mixtral 8×7B: 8 experts,
 * top-2**, where chance alone is 12.5%. The authors' own summary is that
 * locality *"does exist, but it is not strong"*. So beat 7 says "on a model
 * with eight experts on each floor", and that qualifier is load-bearing.
 *
 * **No number on this model's overlap.** Nobody has published it for 288
 * experts at top-8. Beat 5 says "quite often" and shows a couple staying. No
 * on-screen number claims a fraction. `research/glm/OFFLOADING_AND_LOCALITY.md`.
 */
import {
  actorVerbs,
  mergePatches,
  INITIAL_GROUND,
  INITIAL_NARRATOR,
  type At,
  type GroundActor,
  type NarratorActor,
  type PatchOf,
  type Placed,
} from '../../../../paper'

/** 288 experts on each of 42 sparse floors. The exchange rate is set here. */
export const SLOTS = 288 * 42

export type SceneState = {
  /** It works. Visibly, and before any qualification arrives. */
  machine: Placed & { words: readonly string[] }
  /** §11's verdict, hanging over the machine, unchanged. Both true at once. */
  hangover: { on: boolean; at: At; scale: number; text: string }
  store: Placed & { label: string }
  path: Placed & { items: number; jammed: boolean }
  /** The box in the path. Its size is the machine you have to buy. */
  cache: Placed & { filled: number; hits: number; tag: string }
  /**
   * The one thing the viewer operates.
   *
   * `driven` is a beat demonstrating an end of the range; `undefined` hands the
   * handle back. `ask` is the question, and it is asked **before** anyone drags
   * — so failing to find a good setting is their discovery, not our assertion.
   */
  slider: { on: boolean; at: At; scale: number; driven?: number; ask: string }
  /** The 288 and the 42, ghosted in behind the box, dwarfing it. */
  wall: Placed
  tower: Placed
  count: { on: boolean; at: At; scale: number; value: number; label: string; run: boolean }
  narrator: NarratorActor
  ground: GroundActor
}

export const INITIAL: SceneState = {
  machine: { on: false, at: { x: 74, y: 54 }, scale: 1, words: [] },
  hangover: { on: false, at: { x: 74, y: 16 }, scale: 1, text: '~8 GB a word · ~1.5 s' },
  store: { on: false, at: { x: 12, y: 50 }, scale: 0.56, label: 'the whole model, on a drive' },
  path: { on: false, at: { x: 34, y: 44 }, scale: 0.62, items: 0, jammed: false },
  cache: { on: false, at: { x: 43, y: 50 }, scale: 1, filled: 0, hits: 0, tag: '' },
  slider: { on: false, at: { x: 17, y: 78 }, scale: 1, driven: 0.4, ask: '' },
  wall: { on: false, at: { x: 44, y: 40 }, scale: 0.72 },
  tower: { on: false, at: { x: 62, y: 44 }, scale: 0.6 },
  count: { on: false, at: { x: 43, y: 20 }, scale: 1, value: SLOTS, label: '', run: false },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const machine = { ...a('machine'), say: (words: readonly string[]): Patch => ({ machine: { words } }) }
export const hangover = a('hangover')
export const store = a('store')
export const wall = a('wall')
export const tower = a('tower')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const path = {
  ...a('path'),
  /** Long hops to the drive. Every miss is one of these. */
  fetch: (items: number): Patch => ({ path: { on: true, items, jammed: false } }),
  pileUp: (): Patch => ({ path: { items: 12, jammed: true } }),
}

export const cache = {
  ...a('cache'),
  /** The ones that keep coming back, kept close instead of returning. */
  fill: (filled: number): Patch => ({ cache: { filled } }),
  /** Read from the box rather than fetched. Hits, not misses. */
  hit: (hits: number): Patch => ({ cache: { hits } }),
  /**
   * Which regime the reassuring numbers came from, on the frame that makes the
   * claim. Beat 11 is what that qualifier means here.
   */
  cite: (tag: string): Patch => ({ cache: { tag } }),
}

export const slider = {
  ...a('slider'),
  /** Ask before they drag. Clicking is not thinking. */
  ask: (ask: string): Patch => ({ slider: { on: true, ask, driven: undefined } }),
  /**
   * A beat demonstrating one end. The same handle, and they can take it back.
   *
   * It also drops the question: once we are showing them an end of the range,
   * "where would you put it?" is no longer being asked, and leaving it on
   * screen made the frame ask and answer at the same time.
   */
  drive: (driven: number): Patch => ({ slider: { driven, ask: '' } }),
  release: (): Patch => ({ slider: { driven: undefined } }),
}

export const count = {
  ...a('count'),
  run: (value: number, label: string): Patch => ({ count: { on: true, value, label, run: true } }),
  hold: (): Patch => ({ count: { run: false } }),
}
