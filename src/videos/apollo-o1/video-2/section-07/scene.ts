import {
  actorVerbs, mergePatches, INITIAL_CAMERA,
  type CameraActor, type PatchOf, type Placed,
} from '../../../../paper'
import { DEMO, type Region, type Source } from '../../../../paper/casefile'

/**
 * Section 07 — the room was built for this.
 *
 * Board: `storyboard/video-2/SECTION_07.md` (authoritative).
 * Script: `video-script/video-2/SCRIPT.md` → **6 — THE ROOM WAS BUILT FOR THIS**
 *
 * ## The reveal must reduce sensationalism without killing the story
 *
 * We are not apologising for the hook, we are calibrating it: controlled,
 * strongly nudged, simulated weights, rare full chain, **real capability**.
 * A viewer who has just been told the truth about the setup will believe the
 * mechanism §8 then offers them.
 *
 * ## The beat that earns the section
 *
 * `nudged` — the controlled comparison with the one variable removed. Apollo
 * and OpenAI both publish it and it is specific: **oversight deactivation runs
 * at 5% with heavy goal nudging and under 1% without.** That is the whole
 * logic of an evaluation in one picture, and the fastest way to make a
 * sceptical viewer trust the hook was fair.
 *
 * The label has to say *oversight deactivation*, not "scheming". There are two
 * different sub-1% figures in this story and `research/apollo/GROUND_TRUTH.md`
 * separates them deliberately; collapsing them here would undo that.
 *
 * ## One big number in the whole film
 *
 * `hero` is spent on `<1%`, once. Every other figure in the film is small, on
 * a page, or drawn as a count.
 */

export type SceneState = {
  camera: CameraActor

  doc: Placed & { source: Source; highlight: Region | Region[] | null }

  /** The incident, shrinking, then contained. Arrives mid-shrink from §6. */
  chain: Placed & { shown: number }
  /** What the chain is inside. */
  box: Placed & { label: string }

  /** People built this room, deliberately, and said so. */
  team: Placed & { shown: number }
  /** A suite of scenarios, of which this is one. */
  grid: Placed & { lit: number }
  /** The instruction that pushed. */
  nudge: Placed & { level: string; quote: string }
  /**
   * A hand on the scale, and the scale it presses.
   *
   * A thumb on its own is a floating hand. The balance is §2's, tipping under
   * it, so the gesture has something to act on and the viewer recognises the
   * object being pushed.
   */
  thumb: Placed & { pressing: boolean; tip: number }
  /** The controlled comparison: the same test with the nudge removed. */
  nudged: Placed & { reveal: boolean }

  /** The real mass, outside, with no route in. */
  mass: Placed
  /** What Apollo was actually asking. */
  cvd: Placed & { marks: number }
  /** The film's one big number. */
  hero: Placed
  /** The clarification. */
  notthis: Placed
  /** Ahmad, and one question. */
  host: Placed & { line: string }
  recon: Placed
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  doc: { on: false, at: { x: 30, y: 50 }, scale: 0.6, source: DEMO, highlight: null },
  /* §6 ended mid-shrink on this exact object at this exact scale. */
  chain: { on: true, at: { x: 50, y: 50 }, scale: 0.55, shown: 5 },
  box: { on: false, at: { x: 50, y: 50 }, scale: 1, label: 'controlled evaluation' },
  team: { on: false, at: { x: 50, y: 54 }, scale: 1, shown: 0 },
  grid: { on: false, at: { x: 74, y: 50 }, scale: 1, lit: 0 },
  nudge: { on: false, at: { x: 74, y: 50 }, scale: 1, level: '', quote: '' },
  thumb: { on: false, at: { x: 66, y: 60 }, scale: 1, pressing: false, tip: 0 },
  nudged: { on: false, at: { x: 62, y: 50 }, scale: 1, reveal: false },
  mass: { on: false, at: { x: 58, y: 52 }, scale: 1 },
  cvd: { on: false, at: { x: 72, y: 50 }, scale: 1, marks: 0 },
  hero: { on: false, at: { x: 74, y: 50 }, scale: 1 },
  notthis: { on: false, at: { x: 72, y: 50 }, scale: 1 },
  host: { on: false, at: { x: 50, y: 52 }, scale: 1, line: '' },
  recon: { on: false, at: { x: 50, y: 92 }, scale: 1 },
}

export type Patch = PatchOf<SceneState>

const A = <K extends keyof SceneState>(k: K) => actorVerbs<SceneState, K>(k)
const doc = A('doc'), chain = A('chain'), box = A('box'), team = A('team'), grid = A('grid')
const nudge = A('nudge'), thumb = A('thumb'), nudged = A('nudged'), mass = A('mass')
const cvd = A('cvd'), hero = A('hero'), notthis = A('notthis'), host = A('host'), recon = A('recon')

export const verbs = {
  doc: {
    ...doc,
    look: (highlight: Region | Region[]): Patch => doc.set({ highlight }),
    whole: (): Patch => doc.set({ highlight: null }),
    turn: (source: Source, highlight: Region | Region[] | null = null): Patch => doc.set({ source, highlight }),
  },
  chain,
  box,
  team: { ...team, upTo: (shown: number): Patch => team.set({ shown }) },
  grid: { ...grid, lights: (lit: number): Patch => grid.set({ lit }) },
  nudge,
  thumb: { ...thumb, press: (): Patch => thumb.set({ pressing: true, tip: -0.9 }) },
  /** The comparison lands late, so the viewer sees the nudged bar alone first. */
  nudged: { ...nudged, compare: (): Patch => nudged.set({ reveal: true }) },
  mass,
  cvd: { ...cvd, upTo: (marks: number): Patch => cvd.set({ marks }) },
  hero,
  notthis,
  host,
  recon,
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
