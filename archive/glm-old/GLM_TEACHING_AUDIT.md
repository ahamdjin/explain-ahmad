# GLM-5.3-Flash Production Teaching Audit

This document is the quality gate for `/why-320b-uses-18b`.

The goal is not to fit the most information on screen. The goal is that a viewer with almost no ML background can follow one object from prompt to output and understand why a 320B MoE model can have a much smaller active path for one token.

## Research rules we are applying

The page should behave like an illustrated teaching book that can move.

- **Coherence:** remove information that does not help the current learning goal.
- **Signaling:** visually cue the object, number, or relationship the narration is discussing.
- **Spatial contiguity:** labels and explanations sit beside the visual they explain.
- **Temporal contiguity:** the relevant visual change happens when the narration describes it.
- **Segmenting:** one understandable change per beat; the viewer controls progression.
- **Pre-training:** define the few terms needed before asking the viewer to reason with them.
- **Multimedia:** prefer a meaningful diagram/object plus narration over prose alone.
- **Worked-example thinking:** follow one concrete example all the way through instead of explaining only abstractions.

Primary references:
- Richard E. Mayer, *Using multimedia for e-learning* (2017), Journal of Computer Assisted Learning.
- Fiorella & Mayer, *Cambridge Handbook of Multimedia Learning*, chapters on coherence, signaling, contiguity and worked examples.
- Spanjers, Van Gog & Van Merriënboer, *Segmentation of Worked Examples: Effects on Cognitive Load and Learning*.
- Nicky Case, *Explorable Explanations* / *How I Make an Explorable Explanation*.

## Non-negotiable page rules

1. **One learning sentence per beat.** If we cannot finish “After this beat the viewer understands ___”, the beat is unfocused.
2. **One hero visual per beat.** Other information may remain, but it must be quieter.
3. **Narration carries prose.** On-screen text labels, compares, asks a question, or gives the takeaway.
4. **Persistent object identity.** `it` must feel like the same object from token → ID → embedding → attention → routing → layers.
5. **Persistent location signal.** During the walkthrough, the viewer can always see where they are in `Text → Tokens → ID → Embedding → Attention → MoE → Layers → Output`.
6. **Required text must be readable.** Tiny text is allowed only when it is decorative texture, such as sampled expert IDs.
7. **Real facts vs teaching examples are visually separated.** Architecture facts may be exact. Illustrative token IDs, vector values, attention strengths, routing weights and output probabilities must never look like verified checkpoint values.
8. **Nothing important outside the 16:9 safe frame.** Motion must not override layout centering.
9. **A new click adds understanding.** It should reveal, transform, compare, route, connect, or enter a new conceptual world—not merely replace a slide.
10. **Every metaphor must map to a real computation.** Book = embedding lookup. Doors = routed experts. Floors = transformer layers.

---

# Beat-by-beat audit

## 1. MODEL OVERVIEW — “What are we opening up?”

**Viewer must learn:** We are using GLM-5.3-Flash as the concrete model example, and the strange fact is `320B total` vs `~18B active for one token`.

**Hero:** `320B → ~18B`.

**Necessary supporting information:**
- GLM-5.3-Flash
- Z.ai
- Mixture-of-Experts model
- 45 transformer layers
- 288 routed experts
- top-8 routed experts per token
- 1 shared expert

**Keep quiet for later:** 4,096 hidden size and 154,880 vocabulary. They become useful in embedding/token-ID sections.

**Remove from first scan:** max context, multimodality, 34/11 attention subtype split. These are true but do not help answer this video's question.

**Visual upgrade:** Make the 320B card feel physically much larger than the 18B active-path card, or show a 100-part strip with only ~5.6 parts illuminated. The ratio should be felt before it is read.

**Narration opportunity:** “This entire model has 320 billion learned parameters. But for one token, only about 18 billion are active. What does that even mean?”

---

## 2. PARAMETERS — “What do those numbers mean?”

**Viewer must learn:** A parameter is a learned number; active means participating in this token's computation path.

**Hero:** the meaning of `parameter` and `active`, not more architecture specs.

**Necessary supporting information:** `18 / 320 ≈ 5.6%`.

**Keep:** 320B and 18B cards from the previous beat.

**Dim:** architecture panel.

**Visual upgrade:** Animate a field of tiny marks representing parameters; only ~5.6% light for the active-path example. Do not imply these are literally individual model parameters at screen scale—this is a ratio metaphor.

---

## 3. MOE PRE-TRAINING — “Why can only a small path be active?”

**Viewer must learn:** MoE contains many expert blocks, while a router selects only a few routed experts for each token; a shared expert also participates.

**Hero:** `token → router → 8 of 288 + shared`.

**Necessary supporting information:** 42 of the 45 layers use sparse MoE feed-forward blocks; first 3 are dense MLP layers.

**Keep:** 320B / 18B visible but quieter because this diagram is beginning to explain the mechanism.

**Remove/dim:** vocabulary and hidden size for this beat.

**Visual upgrade:** Do not explain the entire router yet. This is only the preview that gives the viewer a mental hook for the question.

---

## 4. JOURNEY MAP — “Before the answer, follow one prompt.”

**Viewer must learn:** We are about to follow one concrete prompt through a simplified model pipeline.

**Hero:** `Text → Tokens → ID → Embedding → Attention → MoE → Layers → Output`.

**Necessary text:** “We’ll open this one piece at a time.”

**Remove:** Router and Experts as two independent top-level stages if they visually make the map too long. They can live together under `MoE` because the MoE section will expand into router + experts.

**Visual upgrade:** Each future chapter should collapse into a faint rail that stays visible. The current chapter becomes dark/highlighted; completed chapters get a check/filled dot; future chapters remain faint.

---

## 5. CHAT EMPTY — “This is how we normally start.”

**Viewer must learn:** A normal user sends text to the model.

**Hero:** familiar chat input.

**Necessary text:** almost none.

**Keep:** journey rail with `TEXT` highlighted.

**Remove:** explanatory paragraph.

**Visual upgrade:** The chat UI should feel like the same paper/ink world, not a pasted ChatGPT clone. It can borrow the familiar composition without copying branded chrome.

---

## 6. CHAT READY — “Our example.”

**Viewer must learn:** This exact sentence is the object we will track.

**Hero:** `The dog chased the ball because it rolled away.`

**Visual upgrade:** Type the sentence naturally, then let it settle. No other object should move while the viewer reads it.

---

## 7. CHAT SENT — “Enter.”

**Viewer must learn:** Sending the prompt hands the text to the model.

**Hero:** sentence leaving the chat UI.

**Keep:** same sentence actor.

**Remove:** chat UI after it has served its purpose.

**Animation:** Chat chrome fades backward while the sentence physically remains and moves into the center. The sentence must not disappear and respawn.

---

## 8. TOKENS — “The model does not start with our sentence as one object.”

**Viewer must learn:** The tokenizer breaks text into token pieces.

**Hero:** sentence physically separating into pieces.

**Necessary text:** `TEXT → TOKENS` or “break into token pieces”.

**Visual upgrade:** Begin as one continuous baseline. Gaps appear between token boundaries. Only after the boundaries are clear should token outlines form around pieces.

---

## 9. WHAT COUNTS AS A TOKEN? — pre-training

**Viewer must learn:** A token can be a whole word, a word piece, punctuation, or sometimes other text fragments.

**Hero:** three simple examples.

**Recommended examples:**
- `dog` → whole-word token example
- `un · believe · able` → conceptual multi-piece example (clearly marked generic, not GLM's exact split)
- `.` → punctuation token

**Keep:** our real sentence tokens quiet in the background.

**Remove:** IDs; they have not been introduced yet.

**Visual upgrade:** Examples should assemble/disassemble in place instead of appearing as definition cards.

---

## 10. TOKEN IDs — “Every vocabulary entry has a lookup number.”

**Viewer must learn:** GLM's tokenizer vocabulary has 154,880 entries; each vocabulary entry is associated with an integer ID.

**Hero:** token pieces gain small ID tags.

**Necessary text:** `154,880 vocabulary entries` and `IDs 0 … 154,879`.

**Important wording:** Do not say “a token ID can be any number the model creates.” It is an index into the tokenizer vocabulary.

**Keep:** sentence/token layout.

**Visual upgrade:** IDs should stamp onto tokens one after another, like catalog numbers.

---

## 11. FOLLOW `it` — “We only need one example.”

**Viewer must learn:** We will follow one token so the rest of the pipeline stays understandable.

**Hero:** `it`.

**Keep:** other tokens visible but strongly dimmed.

**Animation:** Camera/focus shift, not screen replacement. `it` lifts slightly while everything else falls quiet.

---

## 12. VOCABULARY INDEX — “Find the matching row.”

**Viewer must learn:** The token ID identifies the token's row/index in the model's token vocabulary/lookup system.

**Hero:** `it` moves to its row in a giant index wall.

**Important:** Until the exact GLM tokenizer ID is verified, the displayed ID must visibly say `illustrative`.

**Visual upgrade:** The index wall should feel far larger than the few visible rows—cropped edges, row numbers continuing, or a rapid vertical scan can create scale without tiny text.

---

## 13. EMBEDDING BOOK ARRIVES — “The ID now acts like a lookup key.”

**Viewer must learn:** The token ID selects the corresponding embedding row.

**Hero:** the ID and the book.

**Metaphor:** ID ≈ page/lookup number; book ≈ embedding table.

**Keep:** `it` ID visible beside the book.

**Animation:** Book should enter from the index-wall world, not materialize independently. The index can fold/condense into the book spine to strengthen the metaphor.

---

## 14. EMBEDDING PAGE — “This page is not an English definition.”

**Viewer must learn:** The embedding row is a learned numerical representation.

**Hero:** page labelled `it` with the first few vector values.

**Necessary text:**
- `embedding`
- `4,096 values`
- first few values + ellipsis

**Recommended wording:** “This is the numerical representation the model carries for the token.” Avoid calling it the token's complete “meaning” or fixed “identity,” because context will modify representations later.

**Visual upgrade:** Show 5–8 numbers, then pull sideways to reveal that the row continues far beyond the page edge. The ellipsis should communicate scale, not missing data by accident.

---

## 15. EVERY TOKEN GETS ONE — “Repeat the lookup.”

**Viewer must learn:** Each input token gets an embedding vector before model layers process the sequence.

**Hero:** several token → vector pairs appear around the sentence.

**Keep:** `it` in full contrast; others can appear briefly then dim.

**Remove:** detailed number values for every token. They would add noise without teaching more.

---

## 16. CARRY `it` — continuity handoff

**Viewer must learn:** We will carry the `it` representation forward through the rest of the explanation.

**Hero:** one compact `it` vector actor.

**Visual upgrade:** The book closes/fades backward while the vector lifts out and stays. This actor should remain recognizable through attention and MoE.

---

## 17. ATTENTION QUESTION — “Embeddings alone are not enough.”

**Viewer must learn:** The model needs context to relate tokens to other tokens.

**Hero:** sentence returns with `it` and `ball` highlighted but not yet connected.

**Necessary question:** `What does “it” refer to here?`

**Keep:** carried `it` vector in a corner or attached to `it`.

**Remove:** Q/K/V until the viewer feels the problem first.

---

## 18. Q / K / V PRE-TRAINING

**Viewer must learn:** In one attention operation, a token forms query/key/value representations used to compare and move information.

**Simple labels:**
- Q — “What am I looking for?”
- K — “What can I match?”
- V — “What information can I carry?”

**Important:** These are intuition labels, not literal natural-language questions computed by the model.

**Visual upgrade:** Derive Q/K/V from the same `it` representation rather than making three unrelated cards appear.

---

## 19. ATTENTION LINKS — “Look across the sentence.”

**Viewer must learn:** A token can weight information from other token positions differently.

**Hero:** lines from `it` to the other token positions.

**Keep:** all words readable.

**Remove:** fixed numeric percentages unless they materially help. Thickness/opacity is enough for a beginner and avoids implying one universal attention score.

**Visual upgrade:** Draw weak links first, then strengthen the important relation. Viewer attention should follow the line animation automatically.

---

## 20. ATTENTION RESULT — “Context changed what `it` carries.”

**Viewer must learn:** In this simplified view, the relationship between `it` and `ball` becomes strong; the representation moving forward now contains contextual information.

**Hero:** `it ↔ ball` plus an updated vector.

**Important wording:** Do not claim a single attention head/layer definitively “solves pronoun reference.” We are showing intuition for how contextualization accumulates.

**Transition:** The updated `it` vector becomes the token representation entering the MoE block.

---

## 21. MOE INTRO — “Now the main question.”

**Viewer must learn:** The feed-forward part of most GLM layers is sparse: many expert blocks exist, but only a subset is routed for each token.

**Hero:** one sparse transformer layer, with attention side already completed and MoE side opening up.

**Necessary facts:** `288 routed experts`, `top-8`, `1 shared expert`.

**Remove:** 48 expert IDs as the first thing the viewer sees. Show the room/wall scale first; IDs can be texture after.

---

## 22. ROUTER — “Who chooses?”

**Viewer must learn:** The router scores expert choices separately for this token.

**Hero:** `it` vector enters router; expert wall remains dim.

**Visual upgrade:** The router should visibly inspect/score the token, then send ranking pulses toward the wall. This makes the decision causal rather than decorative.

---

## 23. TOP-8 — “Only eight routed experts open.”

**Viewer must learn:** Out of 288 routed experts, top-8 are selected for this token in this layer.

**Hero:** exactly eight doors/rooms light up.

**Keep:** `8 / 288` visibly close to the doors.

**Remove:** illustrative routing percentages for the beginner explanation unless narration explicitly discusses weighted combination.

**Visual upgrade:** Non-selected experts should remain visibly present but asleep. That contrast is the answer to the title.

---

## 24. SHARED EXPERT — “One path is always there.”

**Viewer must learn:** GLM also includes a shared expert path alongside routed experts.

**Hero:** one persistent shared door/path that was already faintly present and now lights up.

**Animation:** Do not spawn it after top-8 as if it was created then. It should have existed quietly from the start of the MoE scene.

---

## 25. MERGE — “Bring the expert outputs back together.”

**Viewer must learn:** Routed expert outputs are combined using router weights, alongside the shared-expert contribution, to form the layer's updated representation.

**Hero:** eight paths + shared path converge into one vector.

**Visual upgrade:** Paths physically flow back into the same `it` actor. If percentages are shown, show only 2–3 plus ellipsis or a stacked weighted bar; eight tiny percentages are not worth the visual load.

---

## 26. BUILDING REVEAL — “That was only one layer.”

**Viewer must learn:** The MoE scene was one part of one transformer layer, and GLM has 45 layers.

**Hero:** the exact MoE panel shrinks into one floor of the building.

**Necessary facts:** first 3 layers use dense MLP; layers 4–45 use sparse MoE feed-forward blocks.

**Animation:** This transition must be literal continuity. The panel becomes a floor; do not cut to a different building.

---

## 27. REPEAT THROUGH FLOORS — “Why so many layers?”

**Viewer must learn:** Layer after layer updates/refines the sequence representations; different MoE layers/tokens may route to different experts.

**Hero:** carried vector moves floor to floor while different expert doors light on different floors.

**Recommended explanation:** “Each floor gets another chance to mix context and transform the representation.”

**Avoid:** “This repeated pass is the model thinking.” A model may generate visible reasoning tokens, but internal layer depth is not the same thing as a chain-of-thought sequence.

**Visual upgrade:** Keep one example of accumulated understanding: first highlight `it ↔ ball`, then another relation in a later floor, then the whole sentence becoming richer. Do not create a checklist of invented things the model definitely understands at exact layer numbers.

---

## 28. NEXT TOKEN — “After layer 45.”

**Viewer must learn:** The final hidden representation is converted into scores for possible next tokens; one token is selected according to the decoding procedure.

**Hero:** top candidate bar(s), then selected token.

**Remove:** fake exact probabilities if they are not essential. A ranking bar labelled “higher / lower” is safer and clearer for this video.

**Keep:** building in the background, because it is about to run again.

---

## 29. OUTPUT REPEATS — “One token at a time.”

**Viewer must learn:** After a token is generated, the model runs forward again to produce the next token, repeating until the answer is complete.

**Hero:** output sentence grows one token at a time while the building pulses again for each token.

**Visual upgrade:** `The` appears → pulse through model → `ball` appears → pulse → `rolled` → pulse. Three cycles visually teach more than a paragraph.

---

## 30. PAYOFF — “Why 320B but ~18B active?”

**Viewer must learn:** The model stores 320B parameters in total, but sparse expert routing makes the active computation path for one token much smaller; different tokens/layers can activate different experts, so the larger capacity remains available across the model.

**Hero:** return to the opening 320B / 18B visual, now with the path inside 320B highlighted.

**Necessary takeaway:** `Big total capacity. Smaller active path per token.`

**Visual upgrade:** The final frame should reuse visual objects from the opening, but now show the explanation inside them: 45 floors, top-8 doors, shared path. The answer should feel earned rather than restated.

---

# Information classification

## Must be visible somewhere in the video
- GLM-5.3-Flash
- 320B total parameters
- ~18B active parameters / token
- MoE
- 45 layers
- first 3 dense MLP, remaining 42 sparse MoE feed-forward layers
- 288 routed experts
- top-8 routed experts / token
- 1 shared expert
- 154,880 vocabulary entries
- 4,096 hidden size / embedding-vector width used in this explanation
- next-token generation repeats

## Keep in source/research but not necessary on screen
- configured max context length
- natively multimodal label
- exact attention architecture split (34 linear / 11 sparse-attention layers), unless the video later decides to explain GLM's hybrid attention specifically
- attention-head count

These facts are not “bad.” They simply cost viewer attention without helping answer the current question.

# Visual-attention checklist for every beat

Before approving a beat, answer all seven:

1. If the narration stopped, can I tell what object I should look at?
2. Is the current stage of the journey visible?
3. Does the new animation show cause/effect, or is it decorative motion?
4. Is any required text below comfortable reading size?
5. Is there information on screen that the narration is not using and will not use soon?
6. Does the object from the previous beat remain when conceptual continuity requires it?
7. Could a viewer explain the beat in one sentence after seeing it once?

If any answer is “no,” the beat is not production-ready.
