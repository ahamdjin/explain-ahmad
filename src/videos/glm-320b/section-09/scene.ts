/**
 * Section 09 — "Where the answer comes out"
 *
 * Script and board: `video-script/09-where-the-answer-comes-out.md`
 *
 * Beat 5 **must reuse §2's list**, drawn identically. The callback only works
 * if it is recognisably the same object — same height, same rows, same edge —
 * which is why `Vocabulary` is one component with a `scores` state rather than
 * a second list built for this section.
 *
 * Beat 10 is the emotional pivot of the whole video: the entire machine on one
 * side of the frame, one small card on the other. Scale contrast doing the
 * teaching, with no label. It must be said flatly and then left alone.
 */
import {
  actorVerbs,
  INITIAL_CAMERA,
  INITIAL_GROUND,
  INITIAL_NARRATOR,
  mergePatches,
  PROMPT,
  type At,
  type CameraActor,
  type GroundActor,
  type NarratorActor,
  type PatchOf,
  type Placed,
} from '../../../paper'

/** The last position. "Next" attaches to the end, so this is the one that matters. */
export const LAST = PROMPT.length - 1

/**
 * Plausible continuations of the **real** prompt.
 *
 * An attentive viewer checks these, and `The dog dropped the ball, and it`
 * really does want `bounced`. Invented candidates that do not fit the sentence
 * on screen are the cheapest way to lose a viewer who was paying attention.
 */
export const CANDIDATES = [
  'bounced',
  ' rolled',
  ' was',
  ' hit',
  ' went',
  ' landed',
  ' broke',
  ' flew',
] as const

export type SceneState = {
  tower: Placed & { floor: number; markers: number }
  /** The nine finished rows at the top of the stack. */
  rows: Placed & { focus: number }
  /** The last row, lifted clear of the others. */
  last: Placed & { label: string }
  /** §2's list, returning. Same object, same drawing. */
  vocab: Placed & { scores: boolean; candidates: boolean; picked: boolean }
  /** The one word that comes out. */
  out: Placed & { label: string }
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  tower: { on: false, at: { x: 50, y: 48 }, scale: 1, floor: 45, markers: 9 },
  rows: { on: false, at: { x: 46, y: 52 }, scale: 0.5, focus: -1 },
  last: { on: false, at: { x: 26, y: 34 }, scale: 0.4, label: '“it” — the last position' },
  vocab: { on: false, at: { x: 76, y: 50 }, scale: 1.4, scores: false, candidates: false, picked: false },
  out: { on: false, at: { x: 30, y: 74 }, scale: 0.8, label: 'bounced' },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const tower = a('tower')
export const rows = { ...a('rows'), only: (index: number): Patch => ({ rows: { focus: index } }) }
export const last = a('last')
export const out = a('out')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const vocab = {
  ...a('vocab'),
  /**
   * A score against every entry in the list.
   *
   * Plainly: the final row goes through an output projection producing one
   * score per vocabulary entry. Calling it "compared against the whole list" is
   * fair. **Never call it a search.**
   */
  score: (): Patch => ({ vocab: { scores: true } }),
  /** The list reorders and a handful of plausible continuations rise. */
  rank: (): Patch => ({ vocab: { candidates: true } }),
  /** One entry lifted out. Which one depends on sampling — that is an aside. */
  pick: (): Patch => ({ vocab: { picked: true } }),
}

export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
