/**
 * Section 07 — "That was one layer. There are 45."
 *
 * Script and board: `video-script/video-1/07-one-layer-of-forty-five.md`
 *
 * Beat 6 is the biggest single moment in the video. §6 spent a whole beat
 * giving the room edges so that this one can take it away — the viewer can
 * point back at §6 beat 11 and say *"we were in there."* That is the entire
 * reason the previous section had no camera moves.
 *
 * The room therefore has to survive beats 1–5 at full size: the rerouting
 * argument is made *inside* it, and the pull-back only pays off if the thing
 * that shrinks is the same object we were just standing in.
 *
 * Two counters, not one. Beat 11 is a correction — `42 decisions` against
 * `336 routed expert visits` — and a correction needs both numbers in one
 * frame. One counter re-labelled is the mistake the beat exists to fix.
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
  type TowerFlash,
} from '../../../../paper'

/** 8 experts × 42 sparse floors. The number the whole ending rests on. */
export const VISITS = 336

/** 42 sparse floors, one routing decision each. Never 336. */
export const DECISIONS = 42

export type SceneState = {
  /** The room from §6, which is about to turn out to be one floor of 45. */
  room: { on: boolean; bounded: boolean; at: At; scale: number }
  tower: Placed & {
    floor: number
    markers: number
    flash?: TowerFlash
    teams: boolean
    trace: boolean
  }
  /** The row at floor one and the row at floor two. Different values. */
  rowA: Placed & { label: string }
  rowB: Placed & { label: string }
  /**
   * The eight that worked on floor one, and the eight on floor two.
   *
   * Two actors rather than one re-lit, because beats 4–5 are about the
   * **overlap** between them: a single team that changes its lit set shows a
   * swap, and a swap teaches that a fresh decision forces a new set. It does
   * not. Both sets have to be in the frame together for the partial overlap
   * to be visible at all.
   */
  teamA: Placed & { lit: number[]; boxed: boolean }
  teamB: Placed & { lit: number[]; boxed: boolean }
  /** 42 routing decisions. */
  count: { on: boolean; at: At; scale: number; value: number; label: string; run: boolean }
  /** 336 routed expert visits, beside it and never instead of it. */
  visits: { on: boolean; at: At; scale: number; value: number; label: string; run: boolean }
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  room: { on: false, bounded: true, at: { x: 50, y: 50 }, scale: 1 },
  tower: { on: false, at: { x: 52, y: 50 }, scale: 1, floor: 0, markers: 0, teams: false, trace: false },
  rowA: { on: false, at: { x: 18, y: 34 }, scale: 0.34, label: 'floor 1' },
  rowB: { on: false, at: { x: 18, y: 54 }, scale: 0.34, label: 'floor 2' },
  teamA: { on: false, at: { x: 26, y: 74 }, scale: 0.62, lit: [1, 3, 6, 8, 11, 13, 16, 17], boxed: true },
  teamB: { on: false, at: { x: 26, y: 40 }, scale: 0.62, lit: [3, 6, 7, 10, 11, 14, 15, 18], boxed: true },
  /* Flanking the tower rather than stacked, so beat 11 reads as two figures
   * being compared rather than one figure being corrected downward. */
  count: { on: false, at: { x: 15, y: 46 }, scale: 1, value: DECISIONS, label: '', run: false },
  visits: { on: false, at: { x: 85, y: 46 }, scale: 1, value: VISITS, label: '', run: false },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const room = { ...a('room'), shrink: (scale: number): Patch => ({ room: { scale } }) }
export const rowA = a('rowA')
export const rowB = a('rowB')
export const teamA = a('teamA')
export const teamB = a('teamB')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const tower = {
  ...a('tower'),
  /** The token climbs. It does not get processed once. */
  climbTo: (floor: number): Patch => ({ tower: { floor, markers: 1 } }),
  /**
   * Look · pick · work, and the order is the causal argument.
   *
   * Out of order it teaches the wrong thing: the router reads the hidden state
   * **after** attention, and that ordering is the crux of the whole video.
   */
  flash: (flash?: TowerFlash): Patch => ({ tower: { flash } }),
  /** Light this floor's eight, and the floor below's, in different places. */
  showTeams: (): Patch => ({ tower: { teams: true } }),
  /** One line, bottom to top: every floor needed the one below it. */
  trace: (): Patch => ({ tower: { trace: true } }),
  /**
   * The other seven prompt tokens, arriving at the base.
   *
   * At the base, and not mid-climb: they were simplified away, not hidden,
   * and the only honest place for them to appear is where they started.
   * §8 beat 1 picks them up from here.
   */
  allEight: (): Patch => ({ tower: { markers: 8, floor: 1 } }),
}

export const count = {
  ...a('count'),
  /** Watched being built, beside the marker doing the climbing. */
  run: (value: number, label: string): Patch => ({
    count: { on: true, value, label, run: true },
  }),
  hold: (): Patch => ({ count: { run: false } }),
}

export const visits = {
  ...a('visits'),
  run: (value: number, label: string): Patch => ({
    visits: { on: true, value, label, run: true },
  }),
  hold: (): Patch => ({ visits: { run: false } }),
}

export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
