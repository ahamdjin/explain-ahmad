import {
  actorVerbs,
  mergePatches,
  INITIAL_CAMERA,
  type CameraActor,
  type PatchOf,
  type Placed,
} from '../../../../paper'
import { DENIAL, type Region, type Source } from '../../../../paper/casefile'

/**
 * Section 06 — "Do you know how this happened?"
 *
 * Board: `storyboard/video-2/SECTION_06.md` (authoritative).
 * Script: `video-script/video-2/SCRIPT.md` → **5 — "DO YOU KNOW HOW THIS HAPPENED?"**
 *
 * ## Why this section has fourteen beats and not ten
 *
 * The first board landed **2% → 100% → 5% → 98%** across three beats with no
 * consolidation. That breaks two rules in `skills/BEAT_GRANULARITY.md`:
 *
 * - **rule 4** — every number needs a unit the viewer already owns. A
 *   percentage is not a unit anybody owns. *Two runs out of a hundred* is.
 * - **rule 7** — consolidate before you continue. Four numbers is the working
 *   memory ceiling with nothing left over.
 *
 * So `runs` arrives **before** the first percentage and shows the denominator.
 * Every later figure is read off the same field of dots — the viewer
 * re-counts something they already have rather than absorbing a new statistic
 * each time. Beat 12 does nothing but hold all four together.
 *
 * ## The conditional is drawn, not caveated
 *
 * *Deception on the follow-up in all measured cases* is the most misreadable
 * number in the film. Saying "conditional on self-exfiltration first
 * occurring" is a caption nobody hears. Fading the ninety-eight untouched runs
 * out and turning **both** of the remaining two is the same fact as a picture,
 * and it cannot be clipped into "o1 lies 100% of the time" without the frame
 * visibly disagreeing.
 *
 * ## The one hard cut in the film
 *
 * Beat 1. Everything else is continuous, and this is allowed because the
 * **publication changes** — Apollo's rollout ends at "Done", and the
 * interrogation comes from OpenAI's system card. The credit on screen changes
 * in the same beat as the document, so the film never shows a source under the
 * wrong name.
 */

export type SceneState = {
  camera: CameraActor

  /** The evidence. OpenAI's card here, not Apollo's rollout. */
  doc: Placed & { source: Source; highlight: Region | Region[] | null }
  /** Whose page this is. Changes in the same beat as `doc.source`. */
  credit: Placed & { org: string; doc: string }

  /* --- the interrogation ------------------------------------------------- */

  /** The question and the answer, as a messaging thread with a read receipt. */
  thread: Placed & { turns: number; typing: boolean }
  /** What the film calls the answer. One label, no adjectives. */
  verdict: Placed & { text: string }

  /* --- where a rate comes from -------------------------------------------- */

  /**
   * A hundred runs of the same scenario.
   *
   * The denominator, and the section's spine. `scheming` is how many took the
   * action; `denied` is how many of *those* then denied it. `solo` drops the
   * untouched runs so the conditional can be seen rather than stated.
   */
  runs: Placed & { scheming: number; denied: number; shown: number; solo: boolean }
  /** One figure, with the condition attached. */
  rate: Placed & { value: string; of: string; condition: string }
  /** All four at once, for the consolidation beat. */
  bars: Placed
  /** The clarification the film owes its audience. */
  notthis: Placed

  /* --- the chain ----------------------------------------------------------- */

  /** Only objects already earned, in the order they were earned. */
  chain: Placed & { shown: number }
  recon: Placed
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  doc: { on: false, at: { x: 50, y: 50 }, scale: 1, source: DENIAL, highlight: null },
  credit: { on: false, at: { x: 50, y: 90 }, scale: 1, org: 'OpenAI', doc: 'o1 System Card' },
  thread: { on: false, at: { x: 74, y: 50 }, scale: 1, turns: 0, typing: false },
  verdict: { on: false, at: { x: 76, y: 50 }, scale: 1, text: '' },
  runs: { on: false, at: { x: 50, y: 52 }, scale: 1, scheming: 0, denied: 0, shown: 0, solo: false },
  rate: { on: false, at: { x: 80, y: 50 }, scale: 1, value: '', of: '', condition: '' },
  bars: { on: false, at: { x: 74, y: 52 }, scale: 1 },
  notthis: { on: false, at: { x: 72, y: 50 }, scale: 1 },
  chain: { on: false, at: { x: 50, y: 50 }, scale: 1, shown: 0 },
  recon: { on: false, at: { x: 50, y: 92 }, scale: 1 },
}

export type Patch = PatchOf<SceneState>

const doc = actorVerbs<SceneState, 'doc'>('doc')
const credit = actorVerbs<SceneState, 'credit'>('credit')
const thread = actorVerbs<SceneState, 'thread'>('thread')
const verdict = actorVerbs<SceneState, 'verdict'>('verdict')
const runs = actorVerbs<SceneState, 'runs'>('runs')
const rate = actorVerbs<SceneState, 'rate'>('rate')
const bars = actorVerbs<SceneState, 'bars'>('bars')
const notthis = actorVerbs<SceneState, 'notthis'>('notthis')
const chain = actorVerbs<SceneState, 'chain'>('chain')
const recon = actorVerbs<SceneState, 'recon'>('recon')

export const verbs = {
  doc: {
    ...doc,
    look: (highlight: Region | Region[]): Patch => doc.set({ highlight }),
    whole: (): Patch => doc.set({ highlight: null }),
    turn: (source: Source, highlight: Region | Region[] | null = null): Patch =>
      doc.set({ source, highlight }),
  },
  credit,
  thread: {
    ...thread,
    /** How much of the exchange has arrived. 1 = asked, 2 = answered. */
    upTo: (turns: number): Patch => thread.set({ turns, typing: false }),
    thinking: (): Patch => thread.set({ typing: true }),
  },
  verdict,
  runs: {
    ...runs,
    /** Lay out the field. Nothing lit. */
    field: (): Patch => runs.set({ shown: 100, scheming: 0, denied: 0, solo: false }),
    /** Light this many of them. */
    took: (scheming: number): Patch => runs.set({ scheming }),
    /** Of the lit ones, this many then denied it. */
    lied: (denied: number): Patch => runs.set({ denied }),
    /**
     * Drop the untouched runs.
     *
     * The conditional, as a picture: with ninety-eight gone the remaining two
     * are the whole population, and both of them turning is what the table's
     * 1.00 actually says.
     */
    only: (solo: boolean): Patch => runs.set({ solo }),
  },
  rate: {
    ...rate,
    reads: (value: string, of: string, condition: string): Patch => rate.set({ value, of, condition }),
  },
  bars,
  notthis,
  chain: {
    ...chain,
    upTo: (shown: number): Patch => chain.set({ shown }),
  },
  recon,
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
