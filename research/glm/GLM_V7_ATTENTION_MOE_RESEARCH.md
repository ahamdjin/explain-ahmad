# GLM v7 — Attention + MoE research and teaching plan

This document exists because the middle of `/why-320b-uses-18b` needs more teaching depth than tokenization, token IDs, or the embedding lookup.

The goal is not to teach a full Transformer course. The goal is that a viewer with almost no ML background can answer these two questions after watching:

1. **Attention:** how can the representation of one token pull useful context from other tokens?
2. **MoE:** how can a 320B model keep all of its capacity available while activating only about 18B parameters for one token?

## Ground truth we must preserve

### GLM-5.3-Flash

Official model card/config:
- 320B total parameters / 18B active parameters.
- 45 language layers.
- first 3 MLP layers are dense.
- next 42 MLP layers are sparse MoE.
- 288 routed experts per sparse layer.
- top-8 routed experts per token.
- 1 shared expert.
- 4,096 hidden size.
- 154,880 vocabulary entries.
- hybrid attention architecture; do **not** imply all 45 layers use vanilla softmax self-attention.
- configuration exposes 64 attention heads.

Sources:
- https://huggingface.co/zai-org/GLM-5.3-Flash
- https://huggingface.co/zai-org/GLM-5.3-Flash/blob/main/config.json

### Verified additions — checked 2026-09-09

Everything above re-confirmed against the model card and `config.json`. These
were missing and are load-bearing for the memory argument:

- **Weights ship natively in FP8** (`quantization_config`, `fmt: e4m3`,
  `activation_scheme: dynamic`). `torch_dtype` still reads `bfloat16`, so do not
  infer precision from that field alone.
- **Default checkpoint is ~306 GiB on disk**, "before runtime and KV-cache
  overhead". A BF16 variant needs roughly twice the weight memory.
  Source: https://recipes.vllm.ai/zai-org/GLM-5.3-Flash
- **321B** in the model metadata; **320B** is the figure used in prose.
- `max_position_embeddings: 1048576` — 1M context, so KV cache is a separate and
  substantial memory cost beyond weights.
- Natively multimodal; attention is **hybrid KDA + sparse MLA**, which reinforces
  the existing rule not to imply vanilla softmax self-attention throughout.

Derived from the above, used in `video-script/08-why-it-cannot-fit.md`:

- 45 layers − 3 dense = **42 sparse routing layers**.
- 42 × 288 = **12,096 routed experts** in the model.
- 8 × 42 = **336 expert visits per token** ≈ 2.8% of the pool.
- ~94% of experts touched over a ~100-token prompt — **illustrative only**,
  assumes uniform routing spread. Label it as such on screen.

### Attention

For the beginner teaching lens, use the standard Q/K/V view from Transformer literature:

`query → compare with keys → match scores → normalized weights → weighted values → context result`

Stanford CS224N describes this usefully as a **fuzzy lookup table**: a query can match every key to a different degree, then the corresponding values are mixed using those match weights.

Important integrity notes:
- Q, K and V are learned projections / learned views of token representations, not literal English questions, labels or facts.
- A causal language model token can only use allowed context positions. For the token `it`, later tokens such as `rolled` and `away` should not be shown as available evidence at that position.
- One drawn attention pattern is illustrative. Real attention varies by layer/head and GLM uses a hybrid attention architecture.
- Do not claim attention weights are a complete explanation of model reasoning.

Sources:
- Vaswani et al., *Attention Is All You Need*: https://arxiv.org/abs/1706.03762
- Stanford CS224N Transformer lecture: https://web.stanford.edu/class/cs224n/slides/cs224n-spr2024-lecture08-transformers.pdf

## Attention teaching sequence

### A1 — Why embeddings are not enough

**Viewer learns:** The embedding gives us a numerical representation, but the useful representation needs context from the sentence.

Hero: `it` vector beside the full sentence.

Question: `What should “it” pay attention to here?`

### A2 — Three learned views of the same representation

**Viewer learns:** From a token representation, attention creates Q, K and V views.

Use plain language:
- **Query** — what this position is trying to match.
- **Key** — what each position offers for matching.
- **Value** — the information that can be carried forward if that position matters.

On-screen caveat: `teaching lens — these are learned vectors, not English sentences`.

### A3 — Every visible token offers a Key and a Value

**Viewer learns:** `it` is not comparing itself to token text. Its Query compares against Keys made from the earlier token representations.

Visual: each eligible token gets a small K tag and a hidden/attached V strip.

Show future tokens greyed with `not visible yet from “it”` to establish causal direction without a full masking lesson.

### A4 — Query vs Keys

**Viewer learns:** The Query of `it` gets a match score against every allowed Key.

Visual: one `Q(it)` fan-out. The word `ball` can be strongest in the illustrative example; `dog`, `chased`, `because`, etc. get weaker scores.

### A5 — Scores become weights

**Viewer learns:** Match scores are converted to attention weights so strong matches count more.

Do not derive softmax. Show the conceptual transformation:
`match scores → attention weights`

Weights shown must be labelled illustrative and should sum to 100% for readability.

### A6 — Read the Values

**Viewer learns:** The weights are applied to the Values, not to the words themselves.

Visual: value strips from each token flow into a mixer; thickness/opacity follows attention weight.

### A7 — Mix context into the representation

**Viewer learns:** The weighted value mixture becomes attention output that helps update the representation at `it`.

Visual: context mixture physically merges into the carried `it` vector.

Avoid claiming this one step permanently means `it = ball`. Say: `this layer can strengthen useful context around “it”`.

### A8 — Many attention views

**Viewer learns:** We drew one simplified attention view. Real models use multiple heads / mechanisms and repeat the process across layers.

GLM fact margin: `64 attention heads configured` + `hybrid attention internally`.

The main story then hands the updated representation into the feed-forward/MoE part of the layer.

---

# MoE teaching strategy

MoE is the core answer of the video, so it gets the most teaching time.

## Integrity rules

- An **expert is a learned feed-forward subnetwork**, not necessarily a human-readable topic expert such as “math” or “coding”.
- The **router reads the token's current representation**, not its token ID.
- The router produces expert scores and selects a small subset.
- In GLM-5.3-Flash the sparse layers have **288 routed experts, top-8 per token, plus 1 shared expert**.
- The expert outputs are combined; routing weights shown in the explainer are illustrative unless checkpoint activations are measured.
- **18B active is not “8 experts = 18B”.** It is the active parameter path across the full model for a token: shared model components plus selected routed expert parameters across sparse layers and the always-used components.
- Routing happens again in later sparse layers. A token can choose a different expert set after its representation changes.
- Different tokens in the same sequence can choose different routed experts.

References:
- GLM official config: https://huggingface.co/zai-org/GLM-5.3-Flash/blob/main/config.json
- Switch Transformer: https://arxiv.org/abs/2101.03961
- DeepSeekMoE shared/routed expert design: https://arxiv.org/abs/2401.06066
- Hugging Face MoE overview: https://huggingface.co/blog/moe

## MoE teaching sequence

### M1 — Where MoE sits

**Viewer learns:** A Transformer layer is not only attention. After context mixing, there is a feed-forward transformation stage.

Draw:
`representation → attention → feed-forward transformation → next representation`

Then reveal that GLM replaces the feed-forward block with sparse MoE in 42 of its 45 layers.

### M2 — Dense baseline first

**Viewer learns:** In a dense layer there is one feed-forward block and every token uses it.

Visual: every token enters the same workshop/machine.

### M3 — Replace one workshop with many

**Viewer learns:** An MoE layer stores many alternative feed-forward subnetworks.

Visual: one dense machine unfolds into a large wall of 288 small transformation machines.

Important label: `expert = learned neural-network block`.

### M4 — The router receives the current representation

**Viewer learns:** The router decides using the representation that came out of attention / previous processing.

Keep the same `it` vector actor physically moving into the router.

### M5 — Score all routed experts

**Viewer learns:** The router computes a relevance/routing score for the routed experts.

Visual: a 288-entry score field / ledger. Do not display 288 readable labels; show scale plus a few legible examples.

Optional technical margin: `GLM config: sigmoid scoring`.

### M6 — Top-8 survive

**Viewer learns:** Only the eight highest routed choices are activated for this token in this sparse layer.

Animation: all 288 exist; score sweep happens; eight marks stay dark/highlighted; the rest become quiet.

This should be one of the main visual payoff moments.

### M7 — Shared expert

**Viewer learns:** There is also one shared expert path that participates alongside routed experts.

Keep the shared path visible from the beginning as a faint always-on line, then explain it here.

Teaching language: `a separate always-on expert for common processing`.

Do not claim GLM's authors assigned it a particular semantic topic.

### M8 — Experts transform in parallel

**Viewer learns:** The selected experts do not vote on an answer. Each one applies its own learned transformation to the same token representation.

Visual: same input vector enters 8 selected experts; each produces a slightly different output/delta strip.

### M9 — Router weights mix routed outputs

**Viewer learns:** Routed expert outputs are mixed according to their routing weights, alongside the shared path.

Use 3–4 visible illustrative weights and ellipsis rather than forcing eight percentages into tiny text.

### M10 — One updated token representation exits

**Viewer learns:** The many selected expert computations collapse back into one representation for this token.

Hero: many paths → one updated `it` vector.

### M11 — Different token, different route

**Viewer learns:** Routing is per token.

Rapid comparison:
- `it` → one top-8 pattern
- `ball` → a different top-8 pattern
- `rolled` → another pattern

No topic labels on experts.

### M12 — Next MoE layer can route differently again

**Viewer learns:** After a token representation changes, the next sparse layer makes a fresh routing decision.

Visual: the exact MoE diagram shrinks into one floor of the model; `it` rises to another floor; a different set of doors lights.

### M13 — Connect mechanism to 18B

**Viewer learns:** The model stores all 320B parameters, but a token's forward path only touches a subset of them.

Make the distinction explicit:
- `320B = everything stored / available`
- `~18B active = everything actually used along this token's full path through the model`

Do **not** imply 18B comes from one MoE layer.

### M14 — Repetition across generation

**Viewer learns:** To generate another output token, the model runs the stack again with updated context.

This is the correct bridge into output generation.

---

# Visual quality bar

Attention and MoE should feel different from tokenization:

- Tokenization is a **quick mechanical reveal**.
- Attention is a **relationship-building sequence**.
- MoE is a **routing and selective-compute sequence**.

For both chapters:
- one hero idea per click;
- no required text below comfortable narration-screen size;
- retain the same `it` actor;
- labels sit beside the objects they explain;
- use pencil arrows / highlighter marks when teaching a relationship;
- movement must show cause: compare → weight → mix, or score → select → process → combine;
- never use animation merely because the screen changed.
