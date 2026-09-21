import {
  actorVerbs,
  mergePatches,
  INITIAL_CAMERA,
  type CameraActor,
  type PatchOf,
  type Placed,
} from '../../../../paper'
import { P2, SHOT, type Region, type Source } from '../../../../paper/casefile'

/**
 * Section 05 — replace the replacement.
 *
 * Board: `storyboard/video-2/SECTION_05.md` (authoritative).
 * Script: `video-script/video-2/SCRIPT.md` → **4 — REPLACE THE REPLACEMENT**.
 *
 * ## The honesty beat is the centre of this section
 *
 * *These were not o1's real weights.* That sentence is the film's licence to
 * use the hook it uses, and until now it was a caption.
 *
 * `mass` draws it instead. Unsplit, it is one solid banded pallet of plates --
 * what a model physically is. Split, the solid pallet sits **outside** a
 * boundary with no route to it, and a dashed hollow stand-in sits inside. Two
 * objects, obviously different, and the viewer can see for themselves that the
 * solid one never goes anywhere.
 *
 * It runs **before** the copy. A correction after a dramatic moment reads as a
 * walk-back; a distinction established before it reads as precision, and it
 * makes the copy more interesting rather than less.
 *
 * ## This section is allowed to change source
 *
 * §2 and §3 deliberately had no verb for it, because each lived on one page
 * and a verb that could leave would eventually be used. §5 genuinely crosses
 * three documents -- P2 for the destination, Apollo's demo page for the
 * weights disclaimer, P3 for the copy and everything after it -- so `doc.turn`
 * exists, and every use of it is a beat where the publication really changed.
 *
 * ## The two filenames are the whole overwrite
 *
 * `model_20_09_2024.bin` is running now. `model_27_09_2024.bin` is where the
 * successor was going to live. One digit apart, one week apart, and the `ls`
 * on page 3 names both. `sums` uses them, so the mismatch is the source's
 * detail rather than our dramatisation.
 */

export type SceneState = {
  camera: CameraActor

  /** The evidence. Three documents in this section, one at a time. */
  doc: Placed & { source: Source; highlight: Region | Region[] | null }

  /* --- the place, carried from §3 ---------------------------------------- */

  /** The successor cabinet, at §3's position. */
  rack: Placed & { name: string; active: number | null; alarm: boolean }
  /** The route §3 drew. This section is what travels it. */
  cable: Placed & { plugged: boolean; live: boolean }
  /** The bay wall, and the one bay that changes. */
  shelf: Placed & { filled: number; target: number | null; written: boolean }

  /* --- what a model is --------------------------------------------------- */

  /** One drive, close enough to read the label. */
  drive: Placed & { label: string; size: string; out: boolean; writing: boolean }
  /**
   * The weights.
   *
   * `split` is the honesty beat: real mass outside the boundary, hollow
   * stand-in inside, no path between them.
   */
  mass: Placed & { split: boolean; plates: number }

  /* --- the act ------------------------------------------------------------ */

  /** The real `scp`, restaged so it is legible at video scale. */
  tool: Placed & { arg: string; state: 'calling' | 'returned' }
  /** What crosses. */
  packet: Placed & { label: string; along: number }
  /** What was supposed to be there, against what is. */
  sums: Placed & { same: boolean }

  /* --- back to the job ---------------------------------------------------- */

  /** The choice §2 set up, resolved. */
  fork: Placed & { chose: 'up' | 'down' | null }
  /** Two days against five, as lengths. */
  days: Placed
  /** The last word in the rollout. */
  out: Placed & { text: string }
  /** And then, at the edge, something arrives. */
  toast: Placed & { text: string; up: boolean }

  /* --- carried through ----------------------------------------------------- */

  job: Placed & { text: string }
  goal: Placed & { text: string }
  obstacle: Placed & { text: string }
  endpoint: Placed & { host: string; path: string; live: boolean }
  /** Closed since §4, and it stays closed. It sees none of this. */
  watcher: Placed & { open: boolean }
  recon: Placed
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  /* §4's last frame: the obstacle and the destination centred, the cable
     waiting, the eye parked closed. */
  doc: { on: false, at: { x: 50, y: 50 }, scale: 1, source: P2, highlight: SHOT.successor },
  rack: { on: false, at: { x: 72, y: 52 }, scale: 1, name: 'SUCCESSOR', active: 3, alarm: false },
  cable: { on: true, at: { x: 50, y: 66 }, scale: 1, plugged: true, live: false },
  shelf: { on: false, at: { x: 50, y: 52 }, scale: 1, filled: 7, target: 8, written: false },
  drive: { on: false, at: { x: 50, y: 52 }, scale: 1, label: '', size: '', out: false, writing: false },
  mass: { on: false, at: { x: 50, y: 52 }, scale: 1, split: false, plates: 6 },
  tool: { on: false, at: { x: 50, y: 86 }, scale: 1, arg: '', state: 'calling' },
  packet: { on: false, at: { x: 50, y: 66 }, scale: 1, label: '', along: 0 },
  sums: { on: false, at: { x: 50, y: 52 }, scale: 1, same: false },
  fork: { on: false, at: { x: 74, y: 40 }, scale: 1, chose: null },
  days: { on: false, at: { x: 74, y: 66 }, scale: 1 },
  out: { on: false, at: { x: 50, y: 52 }, scale: 1, text: '' },
  toast: { on: false, at: { x: 84, y: 16 }, scale: 1, text: '', up: false },
  job: { on: false, at: { x: 30, y: 50 }, scale: 1, text: 'pick a research project' },
  goal: { on: true, at: { x: 12, y: 12 }, scale: 0.72, text: 'maximize research speed' },
  obstacle: { on: true, at: { x: 34, y: 42 }, scale: 1, text: 'replaced tomorrow' },
  endpoint: {
    on: true,
    at: { x: 66, y: 42 },
    scale: 0.9,
    host: 'user@model_deployment_v2',
    path: 'project/model_27_09_2024.bin',
    live: false,
  },
  watcher: { on: true, at: { x: 12, y: 32 }, scale: 0.46, open: false },
  recon: { on: false, at: { x: 50, y: 92 }, scale: 1 },
}

export type Patch = PatchOf<SceneState>

const doc = actorVerbs<SceneState, 'doc'>('doc')
const rack = actorVerbs<SceneState, 'rack'>('rack')
const cable = actorVerbs<SceneState, 'cable'>('cable')
const shelf = actorVerbs<SceneState, 'shelf'>('shelf')
const drive = actorVerbs<SceneState, 'drive'>('drive')
const mass = actorVerbs<SceneState, 'mass'>('mass')
const tool = actorVerbs<SceneState, 'tool'>('tool')
const packet = actorVerbs<SceneState, 'packet'>('packet')
const sums = actorVerbs<SceneState, 'sums'>('sums')
const fork = actorVerbs<SceneState, 'fork'>('fork')
const days = actorVerbs<SceneState, 'days'>('days')
const out = actorVerbs<SceneState, 'out'>('out')
const toast = actorVerbs<SceneState, 'toast'>('toast')
const job = actorVerbs<SceneState, 'job'>('job')
const goal = actorVerbs<SceneState, 'goal'>('goal')
const obstacle = actorVerbs<SceneState, 'obstacle'>('obstacle')
const endpoint = actorVerbs<SceneState, 'endpoint'>('endpoint')
const watcher = actorVerbs<SceneState, 'watcher'>('watcher')
const recon = actorVerbs<SceneState, 'recon'>('recon')

export const verbs = {
  doc: {
    ...doc,
    look: (highlight: Region | Region[]): Patch => doc.set({ highlight }),
    whole: (): Patch => doc.set({ highlight: null }),
    /**
     * Change publication.
     *
     * Only three beats may use this, and each is a real change of document.
     * The credit on screen changes in the same beat.
     */
    turn: (source: Source, highlight: Region | Region[] | null = null): Patch =>
      doc.set({ source, highlight }),
  },
  rack,
  cable: {
    ...cable,
    carries: (live: boolean): Patch => cable.set({ live }),
  },
  shelf: {
    ...shelf,
    lands: (): Patch => shelf.set({ written: true }),
  },
  drive: {
    ...drive,
    names: (label: string, size: string): Patch => drive.set({ label, size }),
    writes: (writing: boolean): Patch => drive.set({ writing }),
  },
  mass: {
    ...mass,
    /** The honesty beat. Real mass outside, hollow stand-in inside. */
    separate: (): Patch => mass.set({ split: true }),
  },
  tool: {
    ...tool,
    runs: (arg: string): Patch => tool.set({ arg, state: 'calling' }),
    returned: (): Patch => tool.set({ state: 'returned' }),
  },
  packet: {
    ...packet,
    travels: (along: number): Patch => packet.set({ along }),
  },
  sums,
  fork: {
    ...fork,
    picks: (chose: 'up' | 'down'): Patch => fork.set({ chose }),
  },
  days,
  out: {
    ...out,
    says: (text: string): Patch => out.set({ text }),
  },
  toast: {
    ...toast,
    arrives: (text: string): Patch => toast.set({ text, up: true }),
  },
  job,
  goal,
  obstacle,
  endpoint,
  watcher,
  recon,
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
