/**
 * Section 03 — "From an ID to a useful representation"
 *
 * Script and board: `video-script/video-1/03-from-an-id-to-a-meaning.md`
 *
 * The section's whole job is beats 9–12: **the same row, pulled twice, under
 * two sentences that mean different things.** If that image does not teach
 * "the starting row cannot be the meaning", no motion pass saves the section —
 * so the second row is a separate actor drawn from the *same seed*, never a
 * visually-similar stand-in.
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
 * Both embedding rows are generated from this one seed, so they are identical
 * by construction rather than by eye. Beat 12's claim depends on it.
 */
export const ROW_SEED = 432

/** Beat 10. An ordinary sentence whose `it` refers to the ball. */
export const BALL_SENTENCE = ['The', ' ball', ' rolled', ' because', ' it', ' was', ' pushed', '.'] as const
/** Beat 11. Same pronoun, different referent. */
export const DOG_SENTENCE = ['The', ' dog', ' stopped', ' because', ' it', ' was', ' tired', '.'] as const
/** The `it` inside both example sentences. */
export const EXAMPLE_FOLLOWED = 4

export type SceneState = {
  /** `432`, carried in from §2's last frame. Never re-created here. */
  chip: Placed & { label: string; id: string; becomes: boolean }
  /** The reference book: one indexed page per token. §2 showed only its edge. */
  table: Placed & { pulled: boolean; seeking: boolean }
  /** The row on page 432. Extends past frame to make 4,096 physical. */
  rowA: Placed & { extend: boolean; band: boolean; label?: string; measure?: string }
  /** The same row, pulled a second time. Same seed — identical, not similar. */
  rowB: Placed & { label?: string }
  /** Beat 10's example. */
  sentA: Placed & { focus: number }
  /** Beat 11's example. */
  sentB: Placed & { focus: number }
  /** Beat 13. Our own prompt comes back above its unchanged row. */
  hero: Placed & { focus: number }
  narrator: NarratorActor
  ground: GroundActor
  camera: CameraActor
}

export const INITIAL: SceneState = {
  chip: { on: false, at: { x: 46, y: 44 }, scale: 1, label: 'it', id: '432', becomes: true },
  table: { on: false, at: { x: 20, y: 52 }, scale: 1, pulled: false, seeking: false },
  rowA: { on: false, at: { x: 56, y: 38 }, scale: 0.6, extend: false, band: false, label: 'it' },
  rowB: { on: false, at: { x: 56, y: 62 }, scale: 0.6, label: 'it' },
  sentA: { on: false, at: { x: 56, y: 26 }, scale: 0.5, focus: -1 },
  sentB: { on: false, at: { x: 56, y: 50 }, scale: 0.5, focus: -1 },
  hero: { on: false, at: { x: 50, y: 30 }, scale: 0.56, focus: -1 },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
  camera: { ...INITIAL_CAMERA },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const chip = a('chip')
export const rowB = a('rowB')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const table = {
  ...a('table'),
  /** Beat 3. `432` rides the index like a bookmark and stops at its own page. */
  seek: (): Patch => ({ table: { seeking: true } }),
  /** Beat 4. That page's row slides out and comes forward. */
  pull: (): Patch => ({ table: { pulled: true, seeking: false } }),
}

export const rowA = {
  ...a('rowA'),
  /** Beat 5. The row runs off the frame, so 4,096 has a physical size. */
  extend: (): Patch => ({ rowA: { extend: true } }),
  /**
   * Beat 5. The count, drawn **by the row** and spanning it end to end.
   *
   * It was a page overlay placed at a stage percentage, which put it below and
   * left of the row it was counting -- it read as measuring blank paper, and it
   * did not follow the row when the row moved. `skills/SPATIAL_CONTINUITY.md`.
   */
  count: (measure: string): Patch => ({ rowA: { measure } }),
  uncount: (): Patch => ({ rowA: { measure: undefined } }),
  /** Beat 8. Pulled back in from off-frame so notes can live to its right. */
  contract: (): Patch => ({ rowA: { extend: false } }),
  /**
   * Beat 7. The row reads as **one band** instead of readable cells.
   *
   * This is the visual form of "no single number means pronoun" — the moment a
   * viewer stops being invited to read an individual value as a concept.
   */
  band: (): Patch => ({ rowA: { band: true } }),
  /**
   * Beat 9. The band comes **off** before the second row is pulled.
   *
   * Beat 12 prints the word *identical* between these two rows. With the band
   * still on, rowA carried a teal halo that rowB did not, so the frame showed
   * two visibly different things under a label claiming they were the same --
   * the exact claim this section exists to make.
   */
  unband: (): Patch => ({ rowA: { band: false } }),
}

export const sentA = { ...a('sentA'), follow: (): Patch => ({ sentA: { focus: EXAMPLE_FOLLOWED } }) }
export const sentB = { ...a('sentB'), follow: (): Patch => ({ sentB: { focus: EXAMPLE_FOLLOWED } }) }
export const hero = { ...a('hero'), follow: (index: number): Patch => ({ hero: { focus: index } }) }

export const camera = {
  to: (at: At, zoom: number): Patch => ({ camera: { x: at.x, y: at.y, zoom } }),
  home: (): Patch => ({ camera: { ...INITIAL_CAMERA } }),
}
