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
  type TowerFlash,
} from '../../../../paper'

/** One 336 per prompt token. Derived, so the tokenizer stays the authority. */
export const TOTAL = TOKENS * 336

export type SceneState = {
  tower: Placed & {
    /** How loud the stack is allowed to be while something else is explained. */
    fade: number
    floor: number
    markers: number
    wiring: boolean
    plaque: string
    counters: string
    /** Beat 2's wrong picture: one marker climbing, the rest held at the base. */
    alone: number
    /** A router firing under the markers on the current floor. */
    flash?: TowerFlash
  }
  /**
   * The prompt at the base, so every marker has a visible cause — and, in act
   * 2, the same object lifted up to become the eight rows on one floor.
   *
   * One object rather than two, for the reason §2 gives: a viewer who sees the
   * prompt replaced by "eight rows" learns that rows are a new set of things.
   * They are the same eight pieces, one floor up.
   */
  line: Placed & {
    /** The tracked position. `FOLLOWED`, always, or -1 for none. */
    focus: number
    /** A short row of values under each piece. */
    rows: boolean
    /** Backward links only — the causal triangle. */
    causal: boolean
    /** Every row has just been rewritten by the floor below. */
    changed: boolean
  }
  count: { on: boolean; at: At; scale: number; value: number; label: string; run: boolean; blank: boolean }
  narrator: NarratorActor
  ground: GroundActor
}

export const INITIAL: SceneState = {
  tower: {
    /** Present for §7's sake, quiet while the prompt is the subject. Beat 1. */
    fade: 1,
    on: false,
    at: { x: 50, y: 48 },
    scale: 1,
    floor: 0,
    markers: 0,
    wiring: false,
    plaque: '',
    counters: '',
    alone: -1,
  },
  line: { on: false, at: { x: 50, y: 92 }, scale: 0.36, focus: -1, rows: false, causal: false, changed: false },
  count: { on: false, at: { x: 74, y: 54 }, scale: 1, value: TOTAL, label: '', run: false, blank: false },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const line = {
  ...a('line'),
  /** The links a position is allowed to draw: backward, never forward. */
  causal: (causal: boolean): Patch => ({ line: { causal } }),
}
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
  /**
   * Beat 2 only. One climber, seven waiting — the picture the rest of the
   * section takes apart. `-1` puts everybody back on the same floor.
   */
  alone: (index: number): Patch => ({ tower: { alone: index } }),
  /** On stage for §7's sake, but not the subject. Beat 1. */
  ghost: (fade = 0.28): Patch => ({ tower: { fade } }),
  /** The subject again. */
  loud: (): Patch => ({ tower: { fade: 1 } }),
  /** Eight routers firing on one floor, slightly out of phase. */
  flash: (flash?: TowerFlash): Patch => ({ tower: { flash } }),
}

export const count = {
  ...a('count'),
  run: (value: number, label: string): Patch => ({ count: { on: true, value, label, run: true, blank: false } }),
  hold: (): Patch => ({ count: { run: false } }),
  /** Beat 9. The working is on screen; the figure is not. */
  ask: (label: string): Patch => ({ count: { on: true, blank: true, run: false, label } }),
}
