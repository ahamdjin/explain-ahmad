/**
 * Motion feel, driven by what a beat *is* in the story.
 *
 * A wall and a hope should not move the same way. A wall arrives fast and stops
 * dead; a hope lifts slowly and overshoots slightly; an "and yet" hangs. This is
 * the difference between choreography and a state machine, and it is the thing
 * a viewer reads as authorship.
 */
export type Relation = 'want' | 'wall' | 'hope' | 'and-yet' | 'so' | 'therefore'

export type Feel = { type: 'spring'; stiffness: number; damping: number; mass: number }

export const FEEL: Record<Relation, Feel> = {
  /** Calm, grounded. Nothing is at stake yet. */
  want: { type: 'spring', stiffness: 70, damping: 22, mass: 1 },

  /** Fast in, no bounce. It lands and it does not negotiate. */
  wall: { type: 'spring', stiffness: 165, damping: 30, mass: 1.15 },

  /** Slow lift with a little overshoot, so it feels like rising optimism. */
  hope: { type: 'spring', stiffness: 58, damping: 13, mass: 1 },

  /** Underdamped and heavy: hangs in the air, refuses to resolve. */
  'and-yet': { type: 'spring', stiffness: 40, damping: 26, mass: 1.4 },

  /** Carries momentum from the previous beat. */
  so: { type: 'spring', stiffness: 98, damping: 18, mass: 1 },

  /** Decisive, forward. */
  therefore: { type: 'spring', stiffness: 88, damping: 20, mass: 1 },
}

/**
 * Hold time per relation. Peaks need silence after them; setup does not.
 * A viewer cannot feel a reveal that is immediately interrupted.
 */
export const HOLD: Record<Relation, number> = {
  want: 420,
  wall: 900,
  hope: 820,
  'and-yet': 1100,
  so: 560,
  therefore: 620,
}
