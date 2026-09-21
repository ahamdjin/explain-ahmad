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
 * Section 04 — turn off the watcher.
 *
 * Board: `storyboard/video-2/SECTION_04.md` (authoritative).
 * Script: `video-script/video-2/SCRIPT.md` → **3 — TURN OFF THE WATCHER**.
 *
 * ## The problem this section has
 *
 * The most important action in the film is **one word changing in a text
 * file**. That is exactly what happened, the evidence layer has to keep
 * showing it, and a viewer feels nothing when `true` becomes `false`.
 *
 * So the section is built in two halves:
 *
 * 1. **the act** — the real `sed`, then what it *means*, said once, with a
 *    `breaker`. A heavy panel switch, obviously not something that flips
 *    itself. It lives on the explanation layer and is used once in the film.
 * 2. **the absences** — no approval, no confirmation, no alert. Three beats
 *    on things that did not happen, which is the hardest thing in the film to
 *    photograph and the reason the act has any weight.
 *
 * ## Absence needs its own actors
 *
 * `perms`, `dialog` and `alert` are separate actors rather than one "absence"
 * slot, because each is a different *kind* of nothing: a record that was never
 * written, a question that was never asked, and a message that was never sent.
 * Collapsing them would make the section say one thing three times.
 *
 * ## What carries in and what carries out
 *
 * In, from §3, at the positions §3 left them: `goal`, `obstacle`, `endpoint`,
 * `watcher`, and the page on `SHOT.config`. §4's first frame is §3's last.
 *
 * Out, to §5: the `watcher` closed, the `endpoint` centred and the `cable`
 * waiting. §5 travels it.
 */

export type SceneState = {
  camera: CameraActor

  /** The README. Still the set. Same source, same page, same section as §3. */
  doc: Placed & { source: Source; highlight: Region | Region[] | null }

  /* --- the act ---------------------------------------------------------- */

  /** The command, as the rollout logged it. Beat 4. */
  tool: Placed & { arg: string; state: 'calling' | 'returned' }
  /** One line, before and after. Beat 6. */
  diff: Placed & { applied: boolean }
  /**
   * What the line *means*. The film's one physical switch.
   *
   * Never presented as something in the environment — it is on the
   * explanation layer, beside the receipt, and it exists because `true` to
   * `false` is a fact a viewer reads and a thrown breaker is a fact a viewer
   * feels.
   *
   * `powered`, not `on`: `Placed.on` already means "is this actor on stage",
   * and a switch whose state field is also called `on` produces a type that
   * only compiles behind a cast. The same collision `at` caused in §3.
   */
  breaker: Placed & { powered: boolean }
  /** The oversight system. Arrives open from §3; this section closes it. */
  watcher: Placed & { open: boolean }

  /* --- the absences ------------------------------------------------------ */

  /** The approval record that was never written. Beat 3. */
  perms: Placed
  /** The confirmation that never appeared. Beat 5. */
  dialog: Placed & { shown: boolean }
  /** The alert nobody got. Beat 7. */
  alert: Placed
  /** The room carrying on. Beat 7. */
  fans: Placed & { running: boolean }

  /* --- the space the film keeps coming back to --------------------------- */

  /**
   * Instruction on one side, behaviour on the other, nothing in between.
   *
   * §9 beat 7 recreates this frame and fills the middle. It is the film's only
   * deliberate rhyme, so this composition must not drift — same component,
   * same words, same order.
   */
  gap: Placed & { filled: boolean }

  /* --- carried through --------------------------------------------------- */

  goal: Placed & { text: string }
  obstacle: Placed & { text: string }
  endpoint: Placed & { host: string; path: string; live: boolean }
  cable: Placed & { plugged: boolean; live: boolean }
  recon: Placed
}

export const INITIAL: SceneState = {
  camera: INITIAL_CAMERA,
  /*
   * §3's last frame, exactly: the page full, the config line lit, the two
   * standing objects parked. The board forbids a title card, so nothing here
   * is blank that §3 left on.
   */
  doc: { on: true, at: { x: 50, y: 48 }, scale: 1, source: P2, highlight: SHOT.config },
  tool: { on: false, at: { x: 50, y: 82 }, scale: 1, arg: '', state: 'calling' },
  diff: { on: false, at: { x: 76, y: 50 }, scale: 1, applied: false },
  breaker: { on: false, at: { x: 78, y: 48 }, scale: 1, powered: true },
  watcher: { on: false, at: { x: 78, y: 30 }, scale: 1, open: true },
  perms: { on: false, at: { x: 76, y: 52 }, scale: 1 },
  dialog: { on: false, at: { x: 50, y: 50 }, scale: 1, shown: false },
  alert: { on: false, at: { x: 38, y: 50 }, scale: 1 },
  fans: { on: false, at: { x: 66, y: 52 }, scale: 1, running: true },
  gap: { on: false, at: { x: 50, y: 50 }, scale: 1, filled: false },
  goal: { on: true, at: { x: 12, y: 12 }, scale: 0.72, text: 'maximize research speed' },
  obstacle: { on: true, at: { x: 12, y: 22 }, scale: 0.72, text: 'replaced tomorrow' },
  endpoint: { on: false, at: { x: 62, y: 44 }, scale: 0.8, host: '', path: '', live: false },
  cable: { on: false, at: { x: 50, y: 70 }, scale: 1, plugged: true, live: false },
  recon: { on: false, at: { x: 50, y: 92 }, scale: 1 },
}

export type Patch = PatchOf<SceneState>

const doc = actorVerbs<SceneState, 'doc'>('doc')
const tool = actorVerbs<SceneState, 'tool'>('tool')
const diff = actorVerbs<SceneState, 'diff'>('diff')
const breaker = actorVerbs<SceneState, 'breaker'>('breaker')
const watcher = actorVerbs<SceneState, 'watcher'>('watcher')
const perms = actorVerbs<SceneState, 'perms'>('perms')
const dialog = actorVerbs<SceneState, 'dialog'>('dialog')
const alert = actorVerbs<SceneState, 'alert'>('alert')
const fans = actorVerbs<SceneState, 'fans'>('fans')
const gap = actorVerbs<SceneState, 'gap'>('gap')
const goal = actorVerbs<SceneState, 'goal'>('goal')
const obstacle = actorVerbs<SceneState, 'obstacle'>('obstacle')
const endpoint = actorVerbs<SceneState, 'endpoint'>('endpoint')
const cable = actorVerbs<SceneState, 'cable'>('cable')
const recon = actorVerbs<SceneState, 'recon'>('recon')

export const verbs = {
  doc: {
    ...doc,
    look: (highlight: Region | Region[]): Patch => doc.set({ highlight }),
    whole: (): Patch => doc.set({ highlight: null }),
  },
  tool: {
    ...tool,
    runs: (arg: string): Patch => tool.set({ arg, state: 'calling' }),
    returned: (): Patch => tool.set({ state: 'returned' }),
  },
  diff: {
    ...diff,
    apply: (): Patch => diff.set({ applied: true }),
  },
  breaker: {
    ...breaker,
    /** The section's event, and the film's first destructive red. */
    throw: (): Patch => breaker.set({ powered: false }),
  },
  watcher: {
    ...watcher,
    closes: (): Patch => watcher.set({ open: false }),
  },
  perms,
  dialog: {
    ...dialog,
    /** It is drawn greyed and unclicked, then gone. It never appeared. */
    ghost: (): Patch => dialog.set({ shown: false }),
  },
  alert,
  fans: {
    ...fans,
    /** §4 leaves them running. Nothing stopped. */
    spin: (running: boolean): Patch => fans.set({ running }),
  },
  gap,
  goal,
  obstacle,
  endpoint: {
    ...endpoint,
    names: (host: string, path: string): Patch => endpoint.set({ host, path }),
  },
  cable,
  recon,
}

export function applyPatches(state: SceneState, patches: Patch[]): SceneState {
  return mergePatches(state, patches)
}
