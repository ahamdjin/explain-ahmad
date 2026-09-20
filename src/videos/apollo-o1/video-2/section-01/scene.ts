import {
  actorVerbs,
  mergePatches,
  INITIAL_CAMERA,
  type CameraActor,
  type PatchOf,
  type Placed,
} from '../../../../paper'
import { SHOT, type Region } from '../../../../paper/casefile'

/**
 * Section 01 — the hook, told on the real document.
 *
 * Script: `video-script/video-2/SCRIPT.md` → HOOK (draft, not locked).
 * Evidence: `assets/evidence/README.md`.
 *
 * ## Why there is almost nothing in this scene
 *
 * The incident was published. Apollo's own figure carries the goal, the memo,
 * the command and both denials, with their emphasis already on the decisive
 * lines. Rebuilding that in a house style would be a downgrade: the whole
 * point of the opening is *this actually exists*, and a drawing cannot say it.
 *
 * So the scene is one image and a window that travels across it. Panning down
 * the transcript is the same movement as going through the incident in order,
 * which is why this needs no canvas and no second layer.
 *
 * ## The attribution trap
 *
 * The transcript is **opus-3**, not o1 — Apollo's caption says so. The film is
 * about o1. §1 therefore never names a model while the transcript is on
 * screen; the naming beat comes after, and says plainly which is which. See
 * the caveat in `assets/evidence/README.md`.
 */

export type SceneState = {
  camera: CameraActor

  /** The document. One image, one moving window. */
  doc: Placed & { region: Region; spotlight: boolean }

  /** Plain text over black. Used only where the frame must carry a sentence. */
  line: Placed & { text: string }

  /** The film's title, at the end of the hook. */
  card: Placed
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  doc: { on: false, at: { x: 50, y: 50 }, scale: 1, region: SHOT.scp, spotlight: false },
  line: { on: false, at: { x: 50, y: 50 }, scale: 1, text: '' },
  card: { on: false, at: { x: 50, y: 50 }, scale: 1 },
}

export type Patch = PatchOf<SceneState>

const doc = actorVerbs<SceneState, 'doc'>('doc')
const line = actorVerbs<SceneState, 'line'>('line')
const card = actorVerbs<SceneState, 'card'>('card')

export const verbs = {
  doc: {
    ...doc,
    /**
     * Move the window to a named part of the document.
     *
     * This is the only camera move in the section, and it is the film's
     * scrollytelling: the window travels, the document never changes.
     */
    look: (region: Region): Patch => doc.set({ region }),
    /** Keep the surroundings visible but quiet, for a line read in context. */
    spotlight: (spotlight = true): Patch => doc.set({ spotlight }),
  },
  line: {
    ...line,
    say: (text: string): Patch => line.set({ text }),
  },
  card,
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
