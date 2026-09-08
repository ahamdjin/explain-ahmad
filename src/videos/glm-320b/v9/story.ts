export type WorldId = 'model' | 'chat' | 'token' | 'transformer' | 'building' | 'output'
export type ChapterId = 'MODEL' | 'TEXT' | 'TOKENS' | 'TOKEN ID' | 'EMBEDDING' | 'ATTENTION' | 'MOE' | 'LAYERS' | 'OUTPUT'

export type Beat = {
  n: number
  id: string
  world: WorldId
  chapter: ChapterId
  learn: string
  cue: string
}

export const CHAPTERS: Array<{ id: ChapterId; label: string; hint: string; start: number; end: number }> = [
  { id: 'MODEL', label: 'Model', hint: 'the 320B → 18B puzzle', start: 1, end: 14 },
  { id: 'TEXT', label: 'Text', hint: 'what we type', start: 15, end: 20 },
  { id: 'TOKENS', label: 'Tokens', hint: 'small pieces', start: 21, end: 28 },
  { id: 'TOKEN ID', label: 'Token ID', hint: 'lookup address', start: 29, end: 35 },
  { id: 'EMBEDDING', label: 'Embedding', hint: 'numbers the model carries', start: 36, end: 44 },
  { id: 'ATTENTION', label: 'Attention', hint: 'gather useful context', start: 45, end: 62 },
  { id: 'MOE', label: 'MoE', hint: 'choose compute', start: 63, end: 84 },
  { id: 'LAYERS', label: 'Layers', hint: 'repeat and refine', start: 85, end: 93 },
  { id: 'OUTPUT', label: 'Output', hint: 'choose the next token', start: 94, end: 100 },
]

export const BEATS: Beat[] = [
  { n: 1, id: 'total-capacity', world: 'model', chapter: 'MODEL', learn: 'GLM-5.3-Flash contains 320B total parameters.', cue: 'Show the model and make 320B feel physically large before adding terminology.' },
  { n: 2, id: 'active-slice', world: 'model', chapter: 'MODEL', learn: 'Only about 18B parameters are active for one token.', cue: 'Send one token in and light only a thin ~5.6% slice.' },
  { n: 3, id: 'active-contrast', world: 'model', chapter: 'MODEL', learn: 'Total stored capacity and active per-token compute are different quantities.', cue: 'Keep the huge quiet field visible while the small active path runs.' },
  { n: 4, id: 'rest-question', world: 'model', chapter: 'MODEL', learn: 'The unused-looking majority creates the first useful question.', cue: 'Bracket the quiet mass and ask: Then what is all this for?' },
  { n: 5, id: 'moe-wall', world: 'model', chapter: 'MODEL', learn: 'The model stores many possible feed-forward expert blocks.', cue: 'Reorganize the same visual mass into an expert wall, then name Mixture of Experts.' },
  { n: 6, id: 'select-few', world: 'model', chapter: 'MODEL', learn: 'A sparse MoE layer selects only a few routed experts plus a shared expert for this token.', cue: 'Light exactly top-8 routed experts plus the shared expert; dim the rest.' },
  { n: 7, id: 'memory-headache', world: 'model', chapter: 'MODEL', learn: 'Sparse active compute does not make the stored weight set small.', cue: 'Pull back without cutting and reveal the huge weight store behind the small active expert path.' },
  { n: 8, id: 'keep-small-part', world: 'model', chapter: 'MODEL', learn: 'The tempting idea is to keep only the selected experts available.', cue: 'Copy the active experts into a tiny tray and ask: Just keep these?' },
  { n: 9, id: 'router-reveal', world: 'model', chapter: 'MODEL', learn: 'A router already decides which experts this token should use.', cue: 'Show token → router → selected experts before naming ROUTER.' },
  { n: 10, id: 'load-selected', world: 'model', chapter: 'MODEL', learn: 'The viewer can now propose loading only the experts selected by the router.', cue: 'Visualize LOAD ONLY SELECTED as a hypothetical optimization, not as the answer.' },
  { n: 11, id: 'smaller-machine', world: 'model', chapter: 'MODEL', learn: 'If that worked cleanly, the model might appear able to fit on a much smaller machine.', cue: 'Begin shrinking the machine but stop the transformation with a question mark.' },
  { n: 12, id: 'what-stops-this', world: 'model', chapter: 'MODEL', learn: 'The unresolved question is what prevents the obvious router-plus-load-only-selected trick.', cue: 'Freeze token, router, selected experts, and the huge weight store together under WHAT STOPS THIS?' },
  { n: 13, id: 'reject-architecture-dump', world: 'model', chapter: 'MODEL', learn: 'A final architecture dump will not explain the causal reason.', cue: 'Let a dense architecture sheet start to appear, then push it away.' },
  { n: 14, id: 'enter-model', world: 'model', chapter: 'MODEL', learn: 'We will answer the mystery by following one token through what actually happens.', cue: 'Keep one token and move it toward the model entrance as the opening world recedes.' },

  { n: 15, id: 'chat-shell', world: 'chat', chapter: 'TEXT', learn: 'We begin with the familiar way a user talks to the model.', cue: 'Draw only the useful chat UI.' },
  { n: 16, id: 'chat-focus', world: 'chat', chapter: 'TEXT', learn: 'The prompt input is the only active object.', cue: 'Blink the cursor and dim everything else.' },
  { n: 17, id: 'chat-type', world: 'chat', chapter: 'TEXT', learn: 'Our real example sentence is typed into the actual input.', cue: 'Type: The dog dropped the ball, and it rolled away.' },
  { n: 18, id: 'chat-send', world: 'chat', chapter: 'TEXT', learn: 'Pressing Enter sends exactly that sentence.', cue: 'Move the same sentence from the input into the chat history.' },
  { n: 19, id: 'chat-processing', world: 'chat', chapter: 'TEXT', learn: 'Now the model begins processing the prompt.', cue: 'Show a restrained GLM processing state.' },
  { n: 20, id: 'enter-model', world: 'chat', chapter: 'TEXT', learn: 'We are about to inspect what happens inside.', cue: 'Zoom into the processing indicator while preserving the sentence.' },

  { n: 21, id: 'sentence-floats', world: 'token', chapter: 'TOKENS', learn: 'Inside the model, start from the same sentence.', cue: 'Keep the sentence floating cleanly.' },
  { n: 22, id: 'token-boundaries', world: 'token', chapter: 'TOKENS', learn: 'The tokenizer finds boundaries in the text.', cue: 'Draw boundary marks without separating pieces yet.' },
  { n: 23, id: 'token-boundaries-hold', world: 'token', chapter: 'TOKENS', learn: 'A token is a piece of text chosen by the tokenizer.', cue: 'Hold the boundaries long enough to understand them.' },
  { n: 24, id: 'token-separate', world: 'token', chapter: 'TOKENS', learn: 'The sentence becomes separate token pieces.', cue: 'Slide pieces apart gently.' },
  { n: 25, id: 'token-kinds', world: 'token', chapter: 'TOKENS', learn: 'Tokens can be whole words, word pieces, or punctuation.', cue: 'Show three tiny examples, then return to the real prompt.' },
  { n: 26, id: 'token-count', world: 'token', chapter: 'TOKENS', learn: 'The prompt is now a sequence of tokens.', cue: 'Write the token count beside the row.' },
  { n: 27, id: 'scan-tokens', world: 'token', chapter: 'TOKENS', learn: 'We only need to follow one token to learn the pipeline.', cue: 'Camera scans the row.' },
  { n: 28, id: 'focus-it', world: 'token', chapter: 'TOKENS', learn: 'We will follow the token it.', cue: 'Stop on it and dim all other tokens.' },

  { n: 29, id: 'chapter-token-id', world: 'token', chapter: 'TOKEN ID', learn: 'Next the token gets a numeric lookup address.', cue: 'Move the chapter marker from Tokens to Token ID without moving it.' },
  { n: 30, id: 'ids-arrive', world: 'token', chapter: 'TOKEN ID', learn: 'Every token maps to an integer ID.', cue: 'Write IDs under token cards one at a time.' },
  { n: 31, id: 'id-definition', world: 'token', chapter: 'TOKEN ID', learn: 'Token ID is an address, not meaning.', cue: 'Write: Token ID = lookup number.' },
  { n: 32, id: 'vocab-scale', world: 'token', chapter: 'TOKEN ID', learn: 'The tokenizer vocabulary has 154,880 possible entries.', cue: 'Pull back into an enormous index wall.' },
  { n: 33, id: 'index-scroll', world: 'token', chapter: 'TOKEN ID', learn: 'The token uses its ID to locate one row.', cue: 'Keep it stable while the index scrolls underneath.' },
  { n: 34, id: 'id-lands', world: 'token', chapter: 'TOKEN ID', learn: 'The selected row corresponds to it.', cue: 'Stop at the target row and highlight it by hand.' },
  { n: 35, id: 'id-becomes-key', world: 'token', chapter: 'TOKEN ID', learn: 'After the lookup address is known, the ID can become the key for the next lookup.', cue: 'Fade the letters and turn the ID into a page-tab actor.' },

  { n: 36, id: 'enter-embedding', world: 'token', chapter: 'EMBEDDING', learn: 'The ID now looks up a numerical representation.', cue: 'Move the chapter marker to Embedding.' },
  { n: 37, id: 'index-to-book', world: 'token', chapter: 'EMBEDDING', learn: 'The embedding table is represented as a giant numerical reference book.', cue: 'Fold the index wall into page edges and reveal the book.' },
  { n: 38, id: 'id-page-tab', world: 'token', chapter: 'EMBEDDING', learn: 'The token ID acts like a page address.', cue: 'Insert the ID tab into the book.' },
  { n: 39, id: 'page-flip', world: 'token', chapter: 'EMBEDDING', learn: 'The lookup jumps to the token row.', cue: 'Flip pages rapidly, then decelerate.' },
  { n: 40, id: 'embedding-page', world: 'token', chapter: 'EMBEDDING', learn: 'The page is the embedding row for it.', cue: 'Stop on the exact conceptual page.' },
  { n: 41, id: 'values-appear', world: 'token', chapter: 'EMBEDDING', learn: 'An embedding is a list of learned numbers.', cue: 'Write the first few values and an ellipsis.' },
  { n: 42, id: 'not-dictionary', world: 'token', chapter: 'EMBEDDING', learn: 'This is not a dictionary definition; it is a learned numerical starting representation.', cue: 'Cross out dictionary definition and annotate representation.' },
  { n: 43, id: '4096-scale', world: 'token', chapter: 'EMBEDDING', learn: 'GLM carries 4,096 values in this representation.', cue: 'Unfold the page sideways until 4,096 feels huge.' },
  { n: 44, id: 'carry-embedding', world: 'token', chapter: 'EMBEDDING', learn: 'Every token gets an embedding, but we carry only it forward.', cue: 'Show all embeddings briefly, then lift it out as one persistent vector.' },

  { n: 45, id: 'transformer-floor', world: 'transformer', chapter: 'ATTENTION', learn: 'Attention and MoE are parts of one Transformer layer, not unrelated pages.', cue: 'Land the vector on one large Transformer floor with two rooms.' },
  { n: 46, id: 'enter-attention-room', world: 'transformer', chapter: 'ATTENTION', learn: 'First we inspect the Attention room.', cue: 'Pan into Attention while the MoE room stays faintly visible.' },
  { n: 47, id: 'attention-problem', world: 'transformer', chapter: 'ATTENTION', learn: 'The embedding alone does not yet tell the model which context is useful.', cue: 'Bring back the sentence and ask what it should use.' },
  { n: 48, id: 'anchor-it', world: 'transformer', chapter: 'ATTENTION', learn: 'The it representation remains physically attached to the it token.', cue: 'Place the vector directly under it with a vertical guide.' },
  { n: 49, id: 'make-qkv', world: 'transformer', chapter: 'ATTENTION', learn: 'The current representation is transformed into Query, Key, and Value views.', cue: 'Branch Q, K, V from the same source so nothing teleports.' },
  { n: 50, id: 'teach-qkv', world: 'transformer', chapter: 'ATTENTION', learn: 'Query looks for a match; Key is used for matching; Value carries information.', cue: 'Teach Q, then K, then V in the same physical lane.' },
  { n: 51, id: 'kv-under-tokens', world: 'transformer', chapter: 'ATTENTION', learn: 'Every allowed position has Key and Value views; future positions are not available at it.', cue: 'Place K/V directly under each token and hatch future words.' },
  { n: 52, id: 'anchor-query', world: 'transformer', chapter: 'ATTENTION', learn: 'The Query comes from it and stays anchored to it.', cue: 'Keep Q under it; never float it elsewhere.' },
  { n: 53, id: 'compare-sequentially', world: 'transformer', chapter: 'ATTENTION', learn: 'Query is compared with allowed Keys one by one.', cue: 'Move a comparison marker across Keys and leave a local score.' },
  { n: 54, id: 'strong-ball-match', world: 'transformer', chapter: 'ATTENTION', learn: 'In the illustrative view, ball produces a stronger match.', cue: 'Make the ball comparison visibly stronger.' },
  { n: 55, id: 'collect-scores', world: 'transformer', chapter: 'ATTENTION', learn: 'The separate match results become one aligned score row.', cue: 'Move local scores straight down into a clean row.' },
  { n: 56, id: 'normalize-weights', world: 'transformer', chapter: 'ATTENTION', learn: 'Match scores become attention weights.', cue: 'Morph scores into percentage bars; label the values illustrative.' },
  { n: 57, id: 'interpret-weight', world: 'transformer', chapter: 'ATTENTION', learn: 'Higher attention means more of that position can contribute in this teaching view.', cue: 'Temporarily make ball the only high-contrast word.' },
  { n: 58, id: 'keys-fold-away', world: 'transformer', chapter: 'ATTENTION', learn: 'Keys are for matching; Values are what get read.', cue: 'Fold K away and promote V.' },
  { n: 59, id: 'weight-values', world: 'transformer', chapter: 'ATTENTION', learn: 'Each Value is scaled by its attention weight.', cue: 'Open visual gates in proportion to each weight.' },
  { n: 60, id: 'weighted-mixer', world: 'transformer', chapter: 'ATTENTION', learn: 'Weighted Values are mixed together.', cue: 'Send clean weighted streams into one Σ mixer.' },
  { n: 61, id: 'context-returns', world: 'transformer', chapter: 'ATTENTION', learn: 'The mixed context changes the it representation while it remains the same token position.', cue: 'Return the mixture to it and visibly alter the vector.' },
  { n: 62, id: 'attention-caveat', world: 'transformer', chapter: 'ATTENTION', learn: 'We used a familiar Q/K/V lens; GLM-5.3-Flash actually uses a hybrid attention architecture.', cue: 'Zoom out, keep the conceptual lesson, add a quiet truthful margin note.' },

  { n: 63, id: 'pan-to-moe', world: 'transformer', chapter: 'MOE', learn: 'After Attention, the same representation moves to the feed-forward/MoE room on the same floor.', cue: 'Pan right instead of cutting to a new page.' },
  { n: 64, id: 'dense-baseline', world: 'transformer', chapter: 'MOE', learn: 'A dense feed-forward block uses the same MLP for every token.', cue: 'Show vector → one MLP → changed vector.' },
  { n: 65, id: 'why-more-capacity', world: 'transformer', chapter: 'MOE', learn: 'MoE asks how to add much more capacity without using all of it for each token.', cue: 'Make the dense machine physically huge and write the question beside it.' },
  { n: 66, id: 'one-to-many', world: 'transformer', chapter: 'MOE', learn: 'One feed-forward block can be replaced by many learned expert blocks.', cue: 'Animate one MLP unfolding into many; do not spawn experts from nowhere.' },
  { n: 67, id: '288-experts', world: 'transformer', chapter: 'MOE', learn: 'Each sparse GLM MoE layer has 288 routed experts plus one shared expert.', cue: 'Keep pulling back until the 288-expert scale is visible.' },
  { n: 68, id: 'define-expert', world: 'transformer', chapter: 'MOE', learn: 'An expert is a learned feed-forward neural network block, not literally a hand-labelled math/code specialist.', cue: 'Open one expert and show its MLP internals.' },
  { n: 69, id: 'it-arrives-router', world: 'transformer', chapter: 'MOE', learn: 'The same contextual it representation reaches the router.', cue: 'Bring the persistent vector into the routing junction.' },
  { n: 70, id: 'router-appears', world: 'transformer', chapter: 'MOE', learn: 'A learned router reads the current representation, not the token ID.', cue: 'Place ROUTER physically between vector and experts.' },
  { n: 71, id: 'score-one', world: 'transformer', chapter: 'MOE', learn: 'The router can score how suitable an expert is for this current representation.', cue: 'Score one expert first so the operation is understood.' },
  { n: 72, id: 'score-all', world: 'transformer', chapter: 'MOE', learn: 'The router produces scores across all 288 routed experts.', cue: 'Spread a scoring pulse across the full expert field.' },
  { n: 73, id: 'freeze-scores', world: 'transformer', chapter: 'MOE', learn: 'Some experts score higher than others.', cue: 'Freeze brightness and circle leading candidates.' },
  { n: 74, id: 'select-top8', world: 'transformer', chapter: 'MOE', learn: 'Only the top eight routed experts are selected for this token in this layer.', cue: 'Select 1 through 8, then dim the other 280 while keeping their scale visible.' },
  { n: 75, id: 'shared-expert', world: 'transformer', chapter: 'MOE', learn: 'One shared expert always participates.', cue: 'Light the separate shared lane after top-8 is understood.' },
  { n: 76, id: 'route-token', world: 'transformer', chapter: 'MOE', learn: 'The representation is routed only to the eight selected experts plus the shared expert.', cue: 'Draw exactly nine clean paths.' },
  { n: 77, id: 'duplicate-input', world: 'transformer', chapter: 'MOE', learn: 'The selected experts transform the same current token representation.', cue: 'Duplicate the input vector into nine small copies only now.' },
  { n: 78, id: 'open-one-expert', world: 'transformer', chapter: 'MOE', learn: 'Each expert applies its own learned weights and produces a different output vector.', cue: 'Zoom into one chosen expert: input → MLP weights → output.' },
  { n: 79, id: 'parallel-experts', world: 'transformer', chapter: 'MOE', learn: 'The selected experts run in parallel.', cue: 'Return to the field and animate only the active expert machines.' },
  { n: 80, id: 'routing-weights', world: 'transformer', chapter: 'MOE', learn: 'The routed expert outputs can contribute with different routing weights.', cue: 'Attach illustrative weights to routed outputs.' },
  { n: 81, id: 'combine-experts', world: 'transformer', chapter: 'MOE', learn: 'Weighted routed outputs are combined, and the shared path also contributes.', cue: 'Flow outputs into Σ, then add the shared lane, then emit one vector.' },
  { n: 82, id: 'different-token', world: 'transformer', chapter: 'MOE', learn: 'Routing is per token, so another token can select a different expert set.', cue: 'Hold the expert field fixed and swap it → ball → dog.' },
  { n: 83, id: 'next-layer-reroute', world: 'transformer', chapter: 'MOE', learn: 'The same token may route differently in the next sparse layer because its representation changed.', cue: 'Show layer N route → changed vector → layer N+1 new route.' },
  { n: 84, id: 'connect-320-18', world: 'transformer', chapter: 'MOE', learn: '320B is total stored capacity; ~18B is the approximate active path for one token across the model, not simply eight experts in one layer.', cue: 'Split total capacity from the one illuminated active path.' },

  { n: 85, id: 'moe-becomes-floor', world: 'building', chapter: 'LAYERS', learn: 'The MoE room we just studied is one component of one Transformer floor.', cue: 'Shrink the exact MoE room into a floor without cutting.' },
  { n: 86, id: 'building-reveal', world: 'building', chapter: 'LAYERS', learn: 'GLM-5.3-Flash has 45 Transformer language layers.', cue: 'Pull back as floor after floor appears.' },
  { n: 87, id: 'floor-bracket', world: 'building', chapter: 'LAYERS', learn: 'Layers 1-3 use dense MLPs; layers 4-45 use sparse MoE feed-forward blocks.', cue: 'Draw one readable architecture bracket beside the building.' },
  { n: 88, id: 'floor1', world: 'building', chapter: 'LAYERS', learn: 'The token representation enters layer 1 and is transformed.', cue: 'Light Attention then dense MLP on floor 1.' },
  { n: 89, id: 'floor2', world: 'building', chapter: 'LAYERS', learn: 'Layer 2 receives a representation already changed by layer 1.', cue: 'Move the same actor upward and alter it slightly.' },
  { n: 90, id: 'floor3', world: 'building', chapter: 'LAYERS', learn: 'The third layer is still dense on the feed-forward side.', cue: 'Repeat one more dense floor.' },
  { n: 91, id: 'floor4-moe', world: 'building', chapter: 'LAYERS', learn: 'From layer 4 onward the feed-forward side is sparse MoE.', cue: 'On floor 4, flash eight routed expert lights plus the shared path.' },
  { n: 92, id: 'timelapse-layers', world: 'building', chapter: 'LAYERS', learn: 'The representation keeps moving through the remaining layers, with routing choices able to change.', cue: 'Time-lapse floors 5 through 45 with controlled selection fingerprints.' },
  { n: 93, id: 'why-repeat', world: 'building', chapter: 'LAYERS', learn: 'Each layer works on a representation already refined by previous layers; we should not invent one fixed linguistic job per floor.', cue: 'Pause the time-lapse and annotate progressive refinement.' },

  { n: 94, id: 'vocab-head', world: 'output', chapter: 'OUTPUT', learn: 'After the final layer, the model scores possible next tokens.', cue: 'Bring back the vocabulary wall as a callback.' },
  { n: 95, id: 'score-vocab', world: 'output', chapter: 'OUTPUT', learn: 'There are 154,880 vocabulary possibilities to score.', cue: 'Keep most candidates tiny; show scale rather than unreadable numbers.' },
  { n: 96, id: 'top-candidates', world: 'output', chapter: 'OUTPUT', learn: 'A few candidate tokens receive the highest probabilities.', cue: 'Lift only the top few candidates into a readable shortlist; mark values illustrative unless pinned.' },
  { n: 97, id: 'token-selected', world: 'output', chapter: 'OUTPUT', learn: 'One next token is selected and appended to the sequence.', cue: 'Move the chosen token physically from the shortlist into the sentence.' },
  { n: 98, id: 'loop-next-token', world: 'output', chapter: 'OUTPUT', learn: 'For the next generated token, the updated sequence runs through the model stack again.', cue: 'Curl the sentence back toward the 45-layer building.' },
  { n: 99, id: 'generation-montage', world: 'output', chapter: 'OUTPUT', learn: 'Autoregressive generation repeats context → model → vocabulary → next token.', cue: 'Generate rolled → away → . with one controlled building pulse per token.' },
  { n: 100, id: 'payoff', world: 'output', chapter: 'OUTPUT', learn: 'Huge total capacity plus selective per-token compute is the point of Mixture of Experts.', cue: 'Fold everything back into the opening model sheet and close the 320B → 18B loop.' },
]

export function beatAt(index: number) {
  return BEATS[Math.max(0, Math.min(BEATS.length - 1, index))]
}

export function chapterAt(index: number) {
  return CHAPTERS.find((chapter) => index + 1 >= chapter.start && index + 1 <= chapter.end) ?? CHAPTERS[0]
}

export function localBeat(index: number, startBeat: number) {
  return index + 1 - startBeat
}
