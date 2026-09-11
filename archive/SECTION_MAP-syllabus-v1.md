# GLM-5.3-Flash — Visual Section Map

Status: **pre-production structure**. This sits between the script and individual storyboard frames.

The job of this file is to define the large visual pages/worlds of the video **before** we draw every frame or write more production code.

## Rule

A **section/page** is one stable mental world with one conceptual job. It may contain several storyboard frames and several narration sentences.

Do not create a new page just because the narration moves to a new sentence.

The approved art direction is `art-direction/GLM_PAPER_WORLD.md`.

---

## Section 01 — The 320B → 18B Mystery

**Purpose:** Create the central question before teaching the machinery.

**Narration source:** `video-script/video-1/01-opening-narration.md`

**Visual world:** Paper model profile → parameter field → playful MoE expert world → router → RAM/storage hypothesis.

**Story progression:**

1. Meet GLM-5.3-Flash as a clean model information sheet.
2. Highlight `320B total parameters` and `18B active parameters`.
3. Use one simple word to show that only a small part is active.
4. Let the apparently unused majority react: why are we here?
5. Reveal that the capacity is organized as many experts.
6. Introduce the router/dispatcher.
7. Show that one word gets a small expert team and different words can get different teams.
8. Introduce RAM / running memory and the tempting idea: keep only the selected experts there.
9. Show the stronger hypothesis: experts live separately in storage, router chooses what is needed, selected experts load into a smaller machine.
10. End on the unresolved question: **what stops this from being easy?**

**Storyboard status:** Frames 1–8 approved in concept/style. RAM/storage portion still to storyboard.

**Do not answer the bottleneck yet.** This section creates the headache.

---

## Section 02 — Follow One Prompt Inside

**Purpose:** Stop looking at architecture from the outside and follow one concrete example.

**Visual world:** Minimal paper prompt/chat surface that becomes the entrance to the model.

**Concrete example:** `The dog dropped the ball, and it`

**Key transition:** The sentence itself becomes the persistent actor; no architecture dump.

**Viewer leaves knowing:** We are going to answer the mystery by following what actually happens to the input.

---

## Section 03 — Text → Tokens

**Purpose:** Show that the model does not directly process ordinary written words as one indivisible object.

**Visual world:** The same sentence on paper physically separates into tokenizer pieces.

**Key beats:**

- sentence remains recognizable
- tokenizer boundaries appear
- pieces separate
- briefly establish that tokens can be words, pieces, or punctuation
- choose one persistent token to follow

**Viewer leaves knowing:** The model works with a sequence of tokens.

---

## Section 04 — Token → Token ID

**Purpose:** Explain the integer ID without implying that the number contains meaning.

**Visual world:** A huge paper index/catalog.

**Key mechanism:** Token → lookup number → one exact row/address.

**Viewer leaves knowing:** The token ID is an address/key, not a definition.

---

## Section 05 — Token ID → Embedding

**Purpose:** Turn an abstract embedding lookup into a concrete physical operation.

**Visual world:** Giant numerical reference book.

**Key mechanism:**

- token ID behaves like a page/index address
- book flips to one row/page
- that page contains a learned numerical vector
- expand sideways to make `4096 values` feel physically large

**Viewer leaves knowing:** The token now has a learned numerical representation that can travel through the model.

---

## Section 06 — One Transformer Layer: Attention

**Purpose:** Show how the token representation gathers useful context from the other available tokens.

**Visual world:** One paper Transformer floor / workshop, with Attention and MoE as neighboring mechanisms.

**Key mechanism:**

- persistent token representation enters Attention
- Query / Key / Value are introduced only as needed
- compare against allowed context
- create attention weights
- read/mix Values
- return changed contextual representation to the same token position

**Truth note:** Use a familiar Q/K/V teaching lens while quietly acknowledging GLM-5.3-Flash uses a hybrid attention architecture.

**Viewer leaves knowing:** The representation for the token has changed because it gathered context.

---

## Section 07 — One Transformer Layer: Router + Experts

**Purpose:** Explain the actual MoE selection mechanism with the same persistent representation.

**Visual world:** Paper expert workshop connected to the Attention room — not a disconnected new slide.

**Key mechanism:**

- many learned expert networks exist
- router reads the current hidden representation
- router scores candidate experts
- top 8 routed experts are selected
- one shared expert also participates
- selected experts transform the representation in parallel
- outputs combine into one changed representation
- another token can select another expert team
- the same token may select a different team in a later sparse layer

**Important:** Experts are playful characters visually, but the explanation must state that an expert is a learned feed-forward neural-network block, not a human-labelled specialty such as “math expert.”

**Viewer leaves knowing:** `18B active` is selective computation, not a permanently fixed 18B sub-model.

---

## Section 08 — The Missing Answer: Why Not Load Only Those Experts?

**Purpose:** Directly answer the question the opening promised.

**Status:** **This section is missing from the current 100-beat production story and must be designed before final production.**

**Visual world:** Reuse the exact router + expert + RAM/storage world from the opening, now with enough knowledge to see the problem.

**Key causal answer:**

1. The router cannot know the expert choice for all future work once at startup; routing depends on the current hidden representation.
2. That representation changes token-by-token and layer-by-layer.
3. Therefore the selected expert set can change at every sparse MoE layer and for different tokens.
4. Keeping experts outside fast memory means selected expert weights may need to be transferred into the compute device repeatedly.
5. Expert weights are large; moving them can turn weight-transfer bandwidth and latency into the bottleneck.
6. Real inference systems can shard, cache, quantize and offload. The truthful claim is **not** that all 320B parameters must always live in GPU VRAM.
7. The model still has a huge total checkpoint/capacity and efficient serving needs fast access to whichever experts routing chooses.

**Visual payoff:** The opening's elegant `storage → router → load 8 experts → small RAM` machine starts to jam when the required team keeps changing across layers/tokens.

**Viewer leaves knowing:** Sparse compute saves computation; it does not automatically turn the entire model into a tiny storage/memory footprint.

---

## Section 09 — Repeat Through the Layers

**Purpose:** Show that Attention + feed-forward/MoE is repeated, refining the representation rather than happening once.

**Visual world:** The one Transformer workshop becomes one floor in a 45-floor paper building/machine.

**GLM structure:**

- 45 language layers
- first 3 use dense feed-forward blocks
- later sparse layers use MoE feed-forward blocks

**Key action:** The same token representation travels upward; its representation changes and later routing decisions can change with it.

**Viewer leaves knowing:** The model repeatedly refines representations through many layers.

---

## Section 10 — Next-Token Prediction

**Purpose:** Finish the forward pass without turning the ending into another architecture lesson.

**Visual world:** Vocabulary/index returns as a callback.

**Key mechanism:**

- final representation scores possible next tokens
- a few candidates rise above the rest
- one token is selected/appended
- the updated sequence goes through the model again for the next generated token

**Viewer leaves knowing:** Generation is repeated next-token prediction.

---

## Section 11 — Return to the Opening Question

**Purpose:** Close the exact loop opened in Section 01.

**Visual world:** Fold the whole journey back into the original GLM model profile / RAM-storage setup.

**Final conceptual separation:**

- `320B` = total learned model capacity / stored parameters
- `~18B active` = approximate parameters participating in one token's forward path
- sparse MoE = compute selectivity
- large checkpoint / expert pool = still exists and must remain accessible
- memory/runtime behavior depends on precision, quantization, sharding, caching and offload strategy

**Viewer leaves knowing:** Why a huge MoE model can perform much less computation per token without becoming a genuinely tiny model.

---

# Production Order From Here

1. **Lock this section map.**
2. Finish Section 01 storyboard only.
3. Create reusable paper asset sheet from the approved storyboard language.
4. Build one coded proof frame and compare it visually against the storyboard.
5. Only after the proof succeeds, storyboard/build Section 02 onward one section at a time.

Do **not** return to broad art-direction exploration unless a genuine visual problem is discovered.
