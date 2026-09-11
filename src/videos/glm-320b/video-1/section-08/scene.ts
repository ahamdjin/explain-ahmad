/**
 * Section 08 — "That was one token. Here's the sentence."
 *
 * Script and board: `video-script/video-1/08-that-was-one-token.md`
 *
 * **No camera moves.** We stay outside the tower for the whole section, because
 * the section is about *how many things are happening at once* — and that only
 * reads from a distance.
 *
 * The arithmetic is **8 × 336 = 2,688**, measured. The running
 * prompt tokenises to eight pieces in §2 and it is on screen here, so a viewer
 * can count it. The script's original "ten tokens" was corrected before this
 * was built; see the truth note in the script.
 */
import {
  actorVerbs,
  INITIAL_GROUND,
  INITIAL_NARRATOR,
  mergePatches,
  TOKENS,
  type At,
  type GroundActor,
  type NarratorActor,
  type PatchOf,
  type Placed,
} from '../../../../paper'

/** One 336 per prompt token. Derived, so the tokenizer stays the authority. */
export const TOTAL = TOKENS * 336

export type SceneState = {
  tower: Placed & {
    floor: number
    markers: number
    wiring: boolean
    plaque: string
    counters: string
  }
  /** The prompt at the base, so every marker has a visible cause. */
  line: Placed
  count: { on: boolean; at: At; scale: number; value: number; label: string; run: boolean; blank: boolean }
  narrator: NarratorActor
  ground: GroundActor
}

export const INITIAL: SceneState = {
  tower: { on: false, at: { x: 50, y: 48 }, scale: 1, floor: 0, markers: 0, wiring: false, plaque: '', counters: '' },
  line: { on: false, at: { x: 50, y: 92 }, scale: 0.4 },
  count: { on: false, at: { x: 84, y: 56 }, scale: 1, value: TOTAL, label: '', run: false, blank: false },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const line = a('line')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const tower = {
  ...a('tower'),
  /**
   * The correction the voice-over admits at beat 1, made physical.
   *
   * The eight new markers appear **at the base**, not mid-climb — otherwise it
   * looks as though they were hidden from the viewer rather than simplified
   * away, and the admission stops buying any trust.
   */
  everyone: (): Patch => ({ tower: { markers: TOKENS, floor: 1 } }),
  climbTo: (floor: number): Patch => ({ tower: { floor } }),
  /** Attention, as the wiring *between* tokens on the floor they share. */
  wire: (): Patch => ({ tower: { wiring: true } }),
  /** The shape, named. Not a mysterious thing — this arrangement. */
  name: (plaque: string): Patch => ({ tower: { plaque } }),
  /** 336 above every marker, once per prompt token. */
  each: (counters: string): Patch => ({ tower: { counters } }),
}

export const count = {
  ...a('count'),
  run: (value: number, label: string): Patch => ({ count: { on: true, value, label, run: true, blank: false } }),
  hold: (): Patch => ({ count: { run: false } }),
  /** Beat 9. The working is on screen; the figure is not. */
  ask: (label: string): Patch => ({ count: { on: true, blank: true, run: false, label } }),
}
