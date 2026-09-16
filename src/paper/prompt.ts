/**
 * The running prompt, and the numbers derived from it.
 *
 * One sentence, used by every section that needs text: §2 cuts it up, §4 runs
 * attention over it, §8 counts it, §9 predicts from it, §10 grows it.
 *
 * It lives here because it was declared five times, once per section, and the
 * copies are not independent facts — **§8's arithmetic is a function of §2's
 * split.** Eight pieces means 8 × 336 = 2,688 expert visits, and that total is
 * on screen while the pieces are still countable beside it.
 *
 * **Measured, 2026-09-11.** GLM-5.3-Flash's public tokenizer gives eight
 * tokens for this prompt and keeps `dropped` whole. `unbelievable` is used in
 * §2 as the real counterexample showing that tokens are not simply words.
 * `research/glm/TOKENIZER.md`, `scripts/tokenize-glm.py`.
 */
export const PROMPT = ['The', ' dog', ' dropped', ' the', ' ball', ',', ' and', ' it'] as const

/** Real ids for the pieces above, in order. `scripts/tokenize-glm.py`. */
export const PROMPT_IDS = [785, 5562, 12220, 279, 4935, 11, 323, 432] as const

/** §2: a word the real tokenizer does break, and not on word boundaries. */
export const UNEVEN = ['un', 'belie', 'vable'] as const

/**
 * APPROVED STORY PROMISE.
 *
 * Section 1 explicitly promises that the video will follow `it` through the
 * machine. This constant is therefore story-critical: changing it changes the
 * protagonist. Storyboards and components must adapt around this value, never
 * silently switch the journey back to another token.
 *
 * `it` is PROMPT[7], real token id 432.
 */
export const FOLLOWED = 7

export const TOKENS = PROMPT.length

/** 8 experts × 42 sparse floors, for one token. `research/glm/GROUND_TRUTH.md`. */
export const VISITS_PER_TOKEN = 336

/** Every token in the prompt, one pass. 8 × 336. */
export const VISITS_PER_PASS = TOKENS * VISITS_PER_TOKEN

/** A plausible continuation, and the words arrive in this order. */
export const REPLY = ['bounced', 'off', 'the', 'wall', 'and', 'rolled'] as const

/** Legacy comparison examples kept available for optional side demonstrations. */
export const BARKED = ['the', 'dog', 'barked'] as const
export const HOT = ['a', 'hot', 'dog'] as const
