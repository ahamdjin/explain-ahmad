/**
 * Section 05 — "The router picks the eight"
 *
 * Script and board: `video-script/video-1/05-the-router-picks-the-eight.md`
 *
 * Two things this section exists to prevent.
 *
 * **Beat 5 carries no labels at all.** "The maths expert" is the single most
 * common wrong model of MoE and it is very hard to unlearn. Identity here is an
 * index and nothing else — so the wall stays unlabelled, and the frame that
 * says so gets a whole beat.
 *
 * **Beat 7 touches all 288.** If the scoring sweep only crosses the winners,
 * the frame says the router looked at eight, which is the opposite of the
 * point. The badges are drawn over every expert for the same reason.
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
 * The eight, scattered across the wall rather than adjacent.
 *
 * Deliberately not a contiguous block: routing picks by score and never by
 * locality, and a tidy rectangle would teach the wrong thing. Same set as §1,
 * because it is the same word arriving at the same layer.
 */
export const CHOSEN = [41, 76, 103, 147, 168, 211, 245, 278] as const

/** What the other sentence picks. Two overlap, and the video never counts them. */
export const OTHER = [76, 118, 147, 190, 222, 251, 263, 284] as const

export const DOG_SEED = 5562

export type SceneState = {
  /** The row as attention left it. This is what arrives at the desk. */
  row: Placed & { pulse: boolean; label: string }
  /** The second sentence's row, off to the side. Beat 12. */
  row2: Placed & { label: string }
  desk: Placed & { named: boolean; ringed: boolean }
  hospital: Placed & {
    staffed: boolean
    lit: readonly number[]
    was: readonly number[]
    focus: boolean
    scoring: boolean
    badges: 'none' | 'empty' | 'scored'
  }
  /**
   * `dog` / `French` / `maths`, trying to land on the eight and sliding off.
   * The only labels the video ever puts on an expert, and they are there to
   * be removed. Beat 10. `paper/cast/Plates.tsx`.
   */
  plates: Placed & { landing: boolean; falling: boolean }
  /** §4's arcs, ghosted back in behind the row. Beat 14. */
  arcs: Placed
  /** One expert, lifted out and opened. A row in, a different row out. */
  open: Placed
  /** The one that runs every time, whatever the word is. Dashed, neutral. */
  shared: Placed
  count: { on: boolean; at: At; scale: number; value: number; label: string }
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  row: { on: false, at: { x: 30, y: 40 }, scale: 0.5, pulse: false, label: 'the row, as attention left it' },
  row2: { on: false, at: { x: 15, y: 66 }, scale: 0.34, label: '“a hot dog”' },
  desk: { on: false, at: { x: 62, y: 62 }, scale: 0.8, named: false, ringed: false },
  hospital: {
    on: false,
    at: { x: 52, y: 46 },
    scale: 0.9,
    staffed: true,
    lit: [],
    was: [],
    focus: false,
    scoring: false,
    badges: 'none',
  },
  plates: { on: false, at: { x: 50, y: 30 }, scale: 0.7, landing: false, falling: false },
  arcs: { on: false, at: { x: 15, y: 54 }, scale: 0.6 },
  open: { on: false, at: { x: 50, y: 48 }, scale: 1 },
  shared: { on: false, at: { x: 84, y: 34 }, scale: 1 },
  count: { on: false, at: { x: 16, y: 46 }, scale: 1, value: 8, label: 'of 288' },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const row = { ...a('row'), pulse: (): Patch => ({ row: { pulse: true } }) }
export const row2 = a('row2')
export const arcs = a('arcs')
export const open = a('open')

/**
 * Beat 10. The plates land, then fail.
 *
 * Two calls, not one: they have to be *on* the eight and plausible before
 * they slide, or the viewer never sees the belief being held -- only a label
 * that was never going to fit, which corrects nothing.
 */
export const plates = {
  ...a('plates'),
  land: (): Patch => ({ plates: { on: true, landing: true, falling: false } }),
  slideOff: (): Patch => ({ plates: { landing: false, falling: true } }),
}
export const shared = a('shared')
export const count = a('count')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const desk = {
  ...a('desk'),
  /**
   * On screen unlabelled since §2 beat 1. Naming it here is the payoff of that
   * patience — function before name.
   */
  name: (): Patch => ({ desk: { named: true } }),
  ring: (): Patch => ({ desk: { ringed: true } }),
}

export const hospital = {
  ...a('hospital'),
  /** The question, asked of all 288 at once, before any answer exists. */
  ask: (): Patch => ({ hospital: { badges: 'empty' } }),
  /** The sweep, and every badge filling as it passes. All of them. */
  score: (): Patch => ({ hospital: { badges: 'scored', scoring: true } }),
  /** The best eight rise; the other 280 go flat. */
  choose: (lit: readonly number[]): Patch => ({ hospital: { lit, focus: true, scoring: false } }),
  /** Where the last set sat, so a new eight reads as *different*. */
  remember: (was: readonly number[]): Patch => ({ hospital: { was } }),
  plain: (): Patch => ({ hospital: { badges: 'none', focus: false, lit: [] } }),
}

export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
