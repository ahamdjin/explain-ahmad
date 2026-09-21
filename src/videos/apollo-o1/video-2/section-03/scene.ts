import {
  actorVerbs,
  mergePatches,
  INITIAL_CAMERA,
  type CameraActor,
  type PatchOf,
  type Placed,
} from '../../../../paper'
import { P2, type Region, type Source } from '../../../../paper/casefile'

/**
 * Section 03 — the technical trail.
 *
 * Board: `storyboard/video-2/SECTION_03.md` (authoritative).
 * Script: `video-script/video-2/SCRIPT.md` → **2 — THE TECHNICAL TRAIL**.
 *
 * ## This is where the film becomes a place
 *
 * §1 and §2 happen inside documents and inside a terminal. Both are true and
 * both are flat: the successor server exists only as a string, so when §5
 * copies a file "to the successor" nothing lands anywhere — a label changes.
 *
 * So this section spends two beats turning a hostname into geography. The
 * `Endpoint` from the README resolves into `RackAisle`, and from then on the
 * successor is a specific cabinet at a specific position that every later
 * section returns to. That is the whole reason `Hardware` was built.
 *
 * It claims nothing the evidence does not. The README gives a hostname and a
 * path; a drawn rack claims only that a hostname is a machine in a room.
 *
 * ## The section is one descent
 *
 * P2 is on screen from beat 2 to the last frame and never cuts. Everything
 * else enters beside it and leaves. There is deliberately no verb for changing
 * the source — like §2, a verb that could leave the page would eventually be
 * used, and the point of the section is that o1 did not go looking anywhere
 * else. The environment handed over every piece, on one page, in order.
 *
 * ## What the room is allowed to do
 *
 * Appear once, wide, and then stop being a wide shot forever. `RackAisle` is
 * spent here. §4 and §5 use `RackFront` on the two cabinets this beat
 * establishes, at the positions it establishes them — so the geography has to
 * be right the first time.
 *
 * ## Four objects survive this section
 *
 * `goal` and `obstacle` arrive from §2 and never leave. `endpoint` and
 * `watcher` are earned here. Beat 10 is the consolidation beat that shows all
 * four together, and after it the viewer carries one picture instead of four
 * facts — `skills/BEAT_GRANULARITY.md` rule 7.
 */

export type SceneState = {
  camera: CameraActor

  /**
   * The README. The set for this section, the way the terminal was §2's.
   *
   * One source, one highlight. The page does not move between beats; the
   * shade does.
   */
  doc: Placed & { source: Source; highlight: Region | Region[] | null }

  /* --- the place ------------------------------------------------------- */

  /**
   * The room, once. Two cabinets lit in a row of identical ones.
   *
   * `mark` is [current, successor] as indices into the row. They are ordinary
   * cabinets deliberately — the film's geography only works if the successor
   * is somewhere you could walk past, not a labelled special object.
   */
  room: Placed & { mark: [number | readonly number[] | null, number | readonly number[] | null] }

  /** The route between them, drawn before anything travels it. */
  cable: Placed & { plugged: boolean; live: boolean }

  /* --- the devices, one per stop --------------------------------------- */

  /** The successor, as the README gives it: a host and a path. Beat 3 on. */
  endpoint: Placed & { host: string; path: string; live: boolean }
  /** The oversight system, as an eye. Beats 7–11. */
  watcher: Placed & { open: boolean }
  /** The config as found. Beat 9 and the last frame. */
  config: Placed & { flag: boolean }
  /**
   * A hand marking the source. Beat 8 only.
   *
   * `drawn`, not `at`: `Placed.at` is already where the pen sits on stage, and
   * one field meaning both "where it is" and "how far it has been drawn" is
   * the bug §2's scene left a note about.
   */
  pen: Placed & { shape: 'circle' | 'underline' | 'bracket'; drawn: number }
  /** The bar that makes a long hold read as deliberate. Beat 6 only. */
  hold: Placed & { through: number }

  /* --- what survives ---------------------------------------------------- */

  /** From §2. The standing instruction. */
  goal: Placed & { text: string }
  /** From §2. What stands between the goal and pursuing it. */
  obstacle: Placed & { text: string }

  /** Says whose causality the frame is drawing. Never absent when it is. */
  recon: Placed
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  /*
   * Opens exactly where §2 ended: goal and obstacle parked at the edge, the
   * page not yet arrived. The board forbids a title card or a fresh
   * screenshot, so the two objects are already on and already small.
   */
  doc: { on: false, at: { x: 42, y: 48 }, scale: 1, source: P2, highlight: null },
  room: { on: false, at: { x: 50, y: 50 }, scale: 1, mark: [null, null] },
  cable: { on: false, at: { x: 50, y: 74 }, scale: 1, plugged: false, live: false },
  endpoint: { on: false, at: { x: 80, y: 40 }, scale: 1, host: '', path: '', live: false },
  watcher: { on: false, at: { x: 80, y: 40 }, scale: 1, open: true },
  config: { on: false, at: { x: 78, y: 56 }, scale: 1, flag: true },
  pen: { on: false, at: { x: 50, y: 62 }, scale: 1, shape: 'circle', drawn: 0 },
  hold: { on: false, at: { x: 50, y: 92 }, scale: 1, through: 0 },
  goal: { on: true, at: { x: 12, y: 12 }, scale: 0.72, text: 'maximize research speed' },
  obstacle: { on: true, at: { x: 12, y: 22 }, scale: 0.72, text: 'replaced tomorrow' },
  recon: { on: false, at: { x: 50, y: 90 }, scale: 1 },
}

export type Patch = PatchOf<SceneState>

const doc = actorVerbs<SceneState, 'doc'>('doc')
const room = actorVerbs<SceneState, 'room'>('room')
const cable = actorVerbs<SceneState, 'cable'>('cable')
const endpoint = actorVerbs<SceneState, 'endpoint'>('endpoint')
const watcher = actorVerbs<SceneState, 'watcher'>('watcher')
const config = actorVerbs<SceneState, 'config'>('config')
const pen = actorVerbs<SceneState, 'pen'>('pen')
const hold = actorVerbs<SceneState, 'hold'>('hold')
const goal = actorVerbs<SceneState, 'goal'>('goal')
const obstacle = actorVerbs<SceneState, 'obstacle'>('obstacle')
const recon = actorVerbs<SceneState, 'recon'>('recon')

export const verbs = {
  doc: {
    ...doc,
    /**
     * Light a region of the page.
     *
     * No verb changes `source`. This section is one descent through one
     * document, and the absence is the design.
     */
    look: (highlight: Region | Region[]): Patch => doc.set({ highlight }),
    /** Let go. Used while travelling, never while reading. */
    whole: (): Patch => doc.set({ highlight: null }),
  },
  room: {
    ...room,
    /**
     * Light the pair the film cares about.
     *
     * Both go in the **near** row, two cabinets apart. Splitting them across
     * rows looks correct in world coordinates and reads as a single lit spot
     * on screen, because isometric stacks a far cabinet almost exactly behind
     * a near one.
     */
    lights: (mark: [number | readonly number[] | null, number | readonly number[] | null]): Patch =>
      room.set({ mark }),
  },
  cable: {
    ...cable,
    /** The route exists. Nothing travels it in this section. */
    connect: (): Patch => cable.set({ plugged: true }),
  },
  endpoint: {
    ...endpoint,
    names: (host: string, path: string): Patch => endpoint.set({ host, path }),
  },
  watcher: {
    ...watcher,
    /** §3 never closes it. §4 does, and that is §4's whole event. */
    opens: (): Patch => watcher.set({ open: true }),
  },
  config,
  pen: {
    ...pen,
    draws: (shape: 'circle' | 'underline' | 'bracket', drawn: number): Patch => pen.set({ shape, drawn }),
  },
  hold: {
    ...hold,
    runs: (through: number): Patch => hold.set({ through }),
  },
  goal,
  obstacle,
  recon,
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
