/**
 * The scene kit — what every section's `scene.ts` is made of.
 *
 * Section 01 hand-wrote its `applyPatches`: a nine-line object spread naming
 * every actor. That is correct once and a liability thirteen times, because the
 * merge is identical in all of them and the copies drift the moment an actor is
 * added. So the merge lives here, generic over the actor map, and a section's
 * `scene.ts` is left holding only the two things that are genuinely its own:
 * **which actors are on stage**, and **what the story does to them**.
 *
 * See skills/ASSET_LIBRARY.md. A copied director is thirteen directors.
 */

/** A position on the stage, in percentages. */
export type At = { x: number; y: number }

/** What every actor has, because every actor lives in a `Slot`. */
export type Placed = { on: boolean; at: At; scale: number }

/**
 * A partial patch over a scene. Absence of a key means "leave it as it was",
 * which is what makes persistence the default rather than a thing to remember.
 */
export type PatchOf<S> = { [K in keyof S]?: Partial<S[K]> }

/**
 * Cumulative merge, one level deep.
 *
 * One level is deliberate: an actor is a flat bag of primitives, and keeping it
 * that way is what makes a patch cheap to read in `beats.ts`. If an actor ever
 * needs nested state, that is a signal it should be two actors.
 */
export function mergePatches<S extends Record<string, object>>(base: S, patches: PatchOf<S>[]): S {
  const next = {} as S
  for (const key of Object.keys(base) as (keyof S)[]) {
    next[key] = { ...(base[key] as object) } as S[keyof S]
  }
  for (const patch of patches) {
    for (const key of Object.keys(patch) as (keyof S)[]) {
      Object.assign(next[key] as object, patch[key])
    }
  }
  return next
}

/**
 * The verbs every actor gets for free: arrive somewhere, move, change, leave.
 *
 * Story verbs are then written *on top of* these — `block.scatter()`,
 * `hospital.choose()` — so `beats.ts` still reads as direction rather than as
 * state assignment. The generic four are the plumbing, not the vocabulary.
 */
export function actorVerbs<S extends Record<string, object>, K extends keyof S>(key: K) {
  type A = S[K]
  return {
    /** On stage, at a place, at a size. Extra fields set its initial state. */
    show: (at: At, scale = 1, extra: Partial<A> = {}): PatchOf<S> =>
      ({ [key]: { on: true, at, scale, ...extra } }) as unknown as PatchOf<S>,
    /** Change what it is without moving it. */
    set: (extra: Partial<A>): PatchOf<S> => ({ [key]: extra }) as unknown as PatchOf<S>,
    /** Travel. `scale` only if the distance is meant to change too. */
    moveTo: (at: At, scale?: number): PatchOf<S> =>
      ({ [key]: { at, ...(scale === undefined ? {} : { scale }) } }) as unknown as PatchOf<S>,
    off: (): PatchOf<S> => ({ [key]: { on: false } }) as unknown as PatchOf<S>,
  }
}

/* -- The two actors that are in every section ----------------------------- */

export type NarratorActor = Placed & {
  pose:
    | 'wonder' | 'point' | 'think' | 'hopeful' | 'cheer' | 'push' | 'nod'
    | 'shrug' | 'slump' | 'carry' | 'wait' | 'lean' | 'aha' | 'back'
  style: 'plain' | 'me'
  flip: boolean
}

/** A horizon, so the frame is a place rather than a slide. */
export type GroundActor = { on: boolean; y: number }

/**
 * The narrator's home.
 *
 * Right of frame, mirrored, for every section. This is not a preference: the
 * words, cards and rows all enter from the left and are wide, and in §1 the
 * narrator drawn on the same side landed on top of a 408px word card. One
 * home means it can never happen again.
 */
export const NARRATOR_HOME: At = { x: 91, y: 70 }

export const INITIAL_NARRATOR: NarratorActor = {
  on: false,
  at: NARRATOR_HOME,
  scale: 1,
  pose: 'wonder',
  style: 'me',
  flip: true,
}

/**
 * The horizon, and there is only one.
 *
 * **82% is the narrator's foot line**, measured rather than guessed: the figure
 * is 11cqw wide on a 130x200 viewBox, so it spans 55%-85% of the frame, and
 * its feet sit at 178/200 of that box.
 *
 * It is a constant because the sections had drifted to six different values --
 * 72, 74, 84, 86, 88 and 96 -- and at 72 the line ran straight through the
 * narrator's waist and across the middle of the frame, which is the one thing a
 * horizon must never look like. At 96 the figure floated above it instead.
 *
 * A single height is also the correct answer on its own terms: the video is one
 * continuous space, so it is one ground. A horizon that changes height between
 * sections is a continuity bug wearing an art direction costume.
 */
export const GROUND_Y = 82

export const INITIAL_GROUND: GroundActor = { on: false, y: GROUND_Y }

/** The camera, when a section needs the frame itself to move. */
export type CameraActor = { x: number; y: number; zoom: number }
export const INITIAL_CAMERA: CameraActor = { x: 50, y: 50, zoom: 1 }
