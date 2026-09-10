/**
 * The running prompt, and the numbers derived from it.
 *
 * One sentence, used by every section that needs text: §2 cuts it up, §4 runs
 * attention over it, §8 counts it, §9 predicts from it, §10 grows it.
 *
 * It lives here because it was declared five times, once per section, and the
 * copies are not independent facts — **§8's arithmetic is a function of §2's
 * split.** Nine pieces means 9 × 336 = 3,024 expert visits, and that total is
 * on screen while the pieces are still countable beside it. A sixth copy that
 * quietly said ten would put a wrong number in front of a viewer who can check
 * it, which is the cheapest possible way to lose them.
 *
 * The unevenness is authored and load-bearing. `dropp` + `ed` is what stops a
 * viewer concluding "token = word", and §4's example depends on that lesson
 * having landed. See `skills/ASSET_LIBRARY.md`.
 */
export const PROMPT = ['The', 'dog', 'dropp', 'ed', 'the', 'ball', ',', 'and', 'it'] as const

/** The piece the video follows, from §2 to §7. `dog`. */
export const FOLLOWED = 1

export const TOKENS = PROMPT.length

/** 8 experts × 42 sparse floors, for one token. `research/glm/GROUND_TRUTH.md`. */
export const VISITS_PER_TOKEN = 336

/** Every token in the prompt, one pass. 9 × 336. */
export const VISITS_PER_PASS = TOKENS * VISITS_PER_TOKEN

/** A plausible continuation, and the words arrive in this order. */
export const REPLY = ['bounced', 'off', 'the', 'wall', 'and', 'rolled'] as const

/**
 * The video's one comparison example, and the load-bearing one.
 *
 * Chosen because the viewer already knows the answer — so §4 teaches *where the
 * machine does it*, not *that language is contextual*.
 */
export const BARKED = ['the', 'dog', 'barked'] as const
export const HOT = ['a', 'hot', 'dog'] as const
