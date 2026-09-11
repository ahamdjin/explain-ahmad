/**
 * The running prompt, and the numbers derived from it.
 *
 * One sentence, used by every section that needs text: §2 cuts it up, §4 runs
 * attention over it, §8 counts it, §9 predicts from it, §10 grows it.
 *
 * It lives here because it was declared five times, once per section, and the
 * copies are not independent facts — **§8's arithmetic is a function of §2's
 * split.** Eight pieces means 8 × 336 = 2,688 expert visits, and that total is
 * on screen while the pieces are still countable beside it. A sixth copy that
 * quietly said nine would put a wrong number in front of a viewer who can
 * count, which is the cheapest possible way to lose them.
 *
 * **Measured, 2026-09-11.** This used to read `dropp` + `ed` and nine pieces,
 * and the comment here defended the split as "authored and load-bearing" —
 * which was an honest way of saying invented. GLM-5.3-Flash's real tokenizer
 * gives eight tokens and `dropped` whole, so 3,024 became 2,688. The
 * token-is-not-a-word lesson moved to §2 beat 7, where the *real* tokenizer
 * splits `unbelievable` into `un` / `belie` / `vable` — visibly not morphemes,
 * which teaches it better than the invented split did.
 * `research/glm/TOKENIZER.md`, `scripts/tokenize-glm.py`.
 */
export const PROMPT = ['The', ' dog', ' dropped', ' the', ' ball', ',', ' and', ' it'] as const

/** Real ids for the pieces above, in order. `scripts/tokenize-glm.py`. */
export const PROMPT_IDS = [785, 5562, 12220, 279, 4935, 11, 323, 432] as const

/** §2 beat 7: a word the real tokenizer does break, and not on morphemes. */
export const UNEVEN = ['un', 'belie', 'vable'] as const

/** The piece the video follows, from §2 to §7. ` dog`, id 5562. */
export const FOLLOWED = 1

export const TOKENS = PROMPT.length

/** 8 experts × 42 sparse floors, for one token. `research/glm/GROUND_TRUTH.md`. */
export const VISITS_PER_TOKEN = 336

/** Every token in the prompt, one pass. 8 × 336. */
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
