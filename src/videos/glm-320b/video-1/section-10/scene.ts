/**
 * Section 10 — "And then it does the whole thing again"
 *
 * Script and board: `video-script/video-1/10-and-then-it-does-it-again.md`
 *
 * **No camera moves.** We watch the loop from one fixed position for the whole
 * section, because the loop is the subject and a moving camera would make it
 * read as a montage rather than as a cycle.
 *
 * The honesty here is the KV cache. Real systems keep one, so earlier tokens
 * are not fully recomputed each step — which matters, because without saying so
 * "from the beginning" is misleading about compute. The fix is in the wording
 * and in an aside: *the sentence* goes back in from the beginning, and the
 * **routing is genuinely redone** for every new token at every sparse layer.
 * The cache does not save you any of that, which is exactly why it removes an
 * objection without weakening the point.
 */
import {
  actorVerbs,
  INITIAL_GROUND,
  INITIAL_NARRATOR,
  mergePatches,
  PROMPT,
  REPLY,
  type GroundActor,
  type NarratorActor,
  type At,
  type PatchOf,
  type Placed,
  type TowerFlash,
} from '../../../../paper'


/** A plausible continuation, and the words arrive in this order. */

/** One 336 per prompt token, then another 336 for every word it writes. */
export const PREFILL = PROMPT.length * 336
export const visitsAfter = (words: number) => PREFILL + words * 336

export type SceneState = {
  /**
   * `kept` markers hold at the top, dimmed; only `alone` climbs. Beats 2-8.
   *
   * `teams` and `flash` are §5's router, borrowed back for beat 6 — the script
   * asks for *the same* mechanism running again on a new row, so running a
   * second, differently drawn router here would teach a second mechanism.
   */
  tower: Placed & {
    floor: number
    markers: number
    kept: number
    alone?: number
    teams: boolean
    flash?: TowerFlash
  }
  /**
   * The reusable state beside every layer. Beat 3.
   *
   * Deliberately not called a KV cache on screen: GLM's attention is hybrid, so
   * the honest main-language claim is *state kept from earlier positions*. The
   * aside is where the word `cache` is allowed to appear.
   */
  stored: Placed & { lit: boolean }
  /** §1's two numbers, returning over the same tower. Beat 12. */
  numbers: { on: boolean; at: At; scale: number; value: string; caption: string }
  /** The prompt, growing by one token every time round. */
  line: Placed & { words: readonly string[] }
  /** The word that just came out, before it goes back on the end. */
  out: Placed & { label: string }
  /** The cycle, the reply building at its pace, and the total. */
  loop: Placed & {
    words: readonly string[]
    pace: number
    total?: number
    cycling: boolean
    halted: boolean
  }
  /** The one thing an expert viewer will object to, answered on click. */
  aside: Placed
  narrator: NarratorActor
  ground: GroundActor
}

export const INITIAL: SceneState = {
  tower: { on: false, at: { x: 26, y: 48 }, scale: 0.82, floor: 0, markers: 0, kept: 0, teams: false },
  stored: { on: false, at: { x: 44, y: 48 }, scale: 0.82, lit: false },
  numbers: { on: false, at: { x: 66, y: 34 }, scale: 1, value: '18 of 320', caption: 'billion — which 18?' },
  line: { on: false, at: { x: 26, y: 93 }, scale: 0.32, words: PROMPT },
  out: { on: false, at: { x: 62, y: 22 }, scale: 0.62, label: REPLY[0] },
  loop: { on: false, at: { x: 72, y: 50 }, scale: 1, words: [], pace: 0.14, cycling: false, halted: false },
  aside: { on: false, at: { x: 16, y: 20 }, scale: 1 },
  narrator: { ...INITIAL_NARRATOR },
  ground: { ...INITIAL_GROUND },
}

export type Patch = PatchOf<SceneState>
export const applyPatches = (base: SceneState, patches: Patch[]) => mergePatches(base, patches)

/* -- Story verbs ----------------------------------------------------------- */

const a = <K extends keyof SceneState>(key: K) => actorVerbs<SceneState, K>(key)

export const tower = {
  ...a('tower'),
  climbTo: (floor: number): Patch => ({ tower: { floor } }),
  /** look · pick · work, in that order, or nothing at all. */
  runRouter: (flash: TowerFlash): Patch => ({ tower: { teams: true, flash } }),
  settle: (): Patch => ({ tower: { teams: false, flash: undefined } }),
}
export const stored = {
  ...a('stored'),
  /** The new position reading from it. Beat 5. */
  read: (): Patch => ({ stored: { lit: true } }),
}
export const numbers = a('numbers')
export const out = a('out')
export const aside = a('aside')
export const narrator = a('narrator')
export const ground = { at: (y: number): Patch => ({ ground: { on: true, y } }) }

export const line = {
  ...a('line'),
  /** One word longer, every time round. */
  grow: (words: readonly string[]): Patch => ({ line: { words } }),
}

export const loop = {
  ...a('loop'),
  start: (): Patch => ({ loop: { cycling: true } }),
  /**
   * Beat 7's acceleration is the one place in the video where speed itself is
   * the message. It should become slightly uncomfortable, and that discomfort
   * is the argument.
   */
  faster: (pace: number): Patch => ({ loop: { pace } }),
  /** The reply, appearing at the pace of the loop and never smoothly. */
  say: (words: readonly string[]): Patch => ({ loop: { words } }),
  count: (total: number): Patch => ({ loop: { total } }),
  /** Everything stops at once. That total halt buys §11 its opening. */
  halt: (): Patch => ({ loop: { halted: true, cycling: false } }),
}
