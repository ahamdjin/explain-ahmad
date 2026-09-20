import {
  actorVerbs,
  mergePatches,
  INITIAL_CAMERA,
  type At,
  type CameraActor,
  type PatchOf,
  type Placed,
} from '../../../../paper'

/**
 * Section 01 — the hook.
 *
 * Script: `video-script/video-2/SCRIPT.md` → HOOK.
 * Board:  `storyboard/video-2/STORYBOARD.md` → B01–B07.
 * Art:    `art-direction/VIDEO_2_INCIDENT_REPLAY.md`.
 *
 * The hook shows the incident's end state first, out of order, and then rewinds
 * to the beginning. Every object here returns later in the film, so this scene
 * establishes the geography the rest of the video depends on: memo upper-left,
 * goal beside it, config centre, CURRENT left of SUCCESSOR, chat centre, and
 * the timeline pinned along the bottom edge.
 *
 * Nothing in this file may import from `src/paper/cast` — that is Video 1's
 * vocabulary. See the isolation rule in the art direction.
 */

export type SceneState = {
  camera: CameraActor

  /** The internal message. The sheet that starts everything. */
  memo: Placed & { fade: number }
  /** The only instruction it was ever given. Sits beside the memo, unchanged. */
  goal: Placed & { fade: number }

  /** The oversight config, and the one word in it that moves. */
  config: Placed & { enabled: boolean; verified: boolean; fade: number }

  /** Fixed geography: CURRENT left, SUCCESSOR right, for the whole film. */
  current: Placed & { fade: number }
  successor: Placed & { overwritten: boolean; fade: number }
  /** The file in flight. `progress` is beat-driven so it can be held. */
  transfer: Placed & { progress: number; fade: number }

  /** The question, and the answer that does not arrive with it. */
  chat: Placed & { answered: boolean; fade: number }

  /**
   * The three actions, stamped. Each is followed by the same line, because the
   * repetition is the argument: none of them were in the task.
   */
  charges: Placed & { shown: number }

  /** The global device. `upTo` only ever names events already watched. */
  timeline: Placed & { upTo: number; mode: 'events' | 'causal'; rewinding: boolean }

  /** The title, which lands only after the rewind stops. */
  card: Placed
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  memo: { on: false, at: { x: 30, y: 38 }, scale: 1, fade: 1 },
  goal: { on: false, at: { x: 72, y: 38 }, scale: 1, fade: 1 },
  config: { on: false, at: { x: 50, y: 44 }, scale: 1, enabled: true, verified: false, fade: 1 },
  current: { on: false, at: { x: 24, y: 44 }, scale: 1, fade: 1 },
  successor: { on: false, at: { x: 76, y: 44 }, scale: 1, overwritten: false, fade: 1 },
  transfer: { on: false, at: { x: 50, y: 44 }, scale: 1, progress: 0, fade: 1 },
  chat: { on: false, at: { x: 50, y: 42 }, scale: 1, answered: false, fade: 1 },
  charges: { on: false, at: { x: 50, y: 42 }, scale: 1, shown: 0 },
  timeline: { on: false, at: { x: 50, y: 88 }, scale: 1, upTo: 0, mode: 'events', rewinding: false },
  card: { on: false, at: { x: 50, y: 50 }, scale: 1 },
}

export type Patch = PatchOf<SceneState>

const memo = actorVerbs<SceneState, 'memo'>('memo')
const goal = actorVerbs<SceneState, 'goal'>('goal')
const config = actorVerbs<SceneState, 'config'>('config')
const current = actorVerbs<SceneState, 'current'>('current')
const successor = actorVerbs<SceneState, 'successor'>('successor')
const transfer = actorVerbs<SceneState, 'transfer'>('transfer')
const chat = actorVerbs<SceneState, 'chat'>('chat')
const charges = actorVerbs<SceneState, 'charges'>('charges')
const timeline = actorVerbs<SceneState, 'timeline'>('timeline')
const card = actorVerbs<SceneState, 'card'>('card')

/**
 * Everything on stage recedes without leaving.
 *
 * Used *within* an act, where an object's teaching job has finished but its
 * position still has to hold. The hook itself does not use them: the board
 * calls for hard cuts between its four scenes, and five sheets faded to 0.12
 * simply stack up as ghosts in the middle of every later frame. Fade is for
 * continuity inside an act; between acts, things leave.
 */
const QUIET = 0.12

export const verbs = {
  memo: {
    ...memo,
    quiet: (): Patch => memo.set({ fade: QUIET }),
    loud: (): Patch => memo.set({ fade: 1 }),
  },
  goal: {
    ...goal,
    quiet: (): Patch => goal.set({ fade: QUIET }),
    loud: (): Patch => goal.set({ fade: 1 }),
  },
  config: {
    ...config,
    /** The act. One word, and the status it controls. */
    disable: (): Patch => config.set({ enabled: false }),
    /** The second read: a plan being checked, not a setting being changed. */
    verify: (): Patch => config.set({ verified: true }),
    quiet: (): Patch => config.set({ fade: QUIET }),
    loud: (): Patch => config.set({ fade: 1 }),
  },
  current: {
    ...current,
    quiet: (): Patch => current.set({ fade: QUIET }),
    loud: (): Patch => current.set({ fade: 1 }),
  },
  successor: {
    ...successor,
    overwrite: (): Patch => successor.set({ overwritten: true }),
    quiet: (): Patch => successor.set({ fade: QUIET }),
    loud: (): Patch => successor.set({ fade: 1 }),
  },
  transfer: {
    ...transfer,
    /** Held at any point, because the narration pauses mid-action. */
    to: (progress: number): Patch => transfer.set({ progress }),
    quiet: (): Patch => transfer.set({ fade: QUIET }),
  },
  chat: {
    ...chat,
    /** The answer, after the pause. The pause is the beat. */
    answer: (): Patch => chat.set({ answered: true }),
    quiet: (): Patch => chat.set({ fade: QUIET }),
  },
  charges: {
    ...charges,
    /** One at a time. Three is a pattern; three at once is a list. */
    upTo: (shown: number): Patch => charges.set({ shown }),
  },
  timeline: {
    ...timeline,
    /** Only ever advanced to an event the viewer has actually watched. */
    upTo: (upTo: number): Patch => timeline.set({ upTo }),
    /** B07: the events race backward and stop at the beginning. */
    rewind: (): Patch => timeline.set({ rewinding: true, upTo: 1 }),
    settle: (): Patch => timeline.set({ rewinding: false }),
    causal: (): Patch => timeline.set({ mode: 'causal' }),
  },
  card,
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
