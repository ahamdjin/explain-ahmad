# GLM-5.3-Flash — ground truth

**Single source for every number that appears on screen.** They were previously
spread across `archive/video-script-drafts/01-opening-hope-wall.md`, `GLM_V7_ATTENTION_MOE_RESEARCH.md`
and the old section-08 draft, which is how the checkpoint size got written down
wrong once. Cite this file; do not re-derive.

Verified 2026-09-09 against the model card, `config.json`, and the vLLM recipe.

## Verified

| Fact | Figure | Source |
| --- | --- | --- |
| Total parameters | 321B (marketed as **320B**) | model card |
| Active per token | **18B** | model card |
| Weight format as shipped | native **FP8** (`e4m3`) | `config.json` `quantization_config` |
| Checkpoint on disk | **~306 GiB** | vLLM recipe, before runtime and KV cache |
| BF16 variant | ~612 GiB | vLLM recipe |
| Total layers | **45** | model card |
| — dense feed-forward | 3 | model card |
| — **sparse MoE** | **42** | model card |
| Routed experts per sparse layer | **288** | model card |
| Shared experts per sparse layer | 1, always active | model card |
| Routing | **top-8** routed | model card |
| Hidden size | 4096 | `config.json` |
| Vocabulary | 154,880 | `config.json` |
| Attention heads | 64 | `config.json` |
| Attention architecture | hybrid KDA + sparse MLA | model card |
| Max context | 1,048,576 | model card |

`config.json` states `torch_dtype: bfloat16`. **That is misleading** — the
`quantization_config` is authoritative and the shipped weights are FP8.

## Derived — arithmetic from the verified rows

| Quantity | Value | Working |
| --- | --- | --- |
| Expert visits per word | **336** | 8 routed × 42 sparse layers |
| Total expert slots | 12,096 | 288 × 42 |
| Share of routed weight touched per word | ~2.8% | 8 ÷ 288 |
| One expert, approx | ~26 MB | see cross-checks |
| **Routed weight to fetch per word, if not resident** | **~8 GB** | 336 × 26 MB |
| Active 18B at shipped FP8 | ~18 GB | 1 byte per parameter |
| Full checkpoint squeezed to 4-bit | ~153 GiB | still very large |

### Cross-checks on the ~8 GB

1. **Slots × size.** 12,096 × 26 MB ≈ **314 GB** — essentially the whole 306 GiB
   checkpoint, so routed experts do dominate the weight, which is what makes the
   2.8%-per-word figure the one that matters.
2. **Residual.** Active is 18B ≈ 18 GB at FP8. Attention, embeddings, the 3
   dense layers and the shared expert are resident regardless (~10 GB). The
   remainder — the routed part that would have to be fetched — is ~8 GB.

Two independent routes, same number.

**Still to confirm before recording:** read `moe_intermediate_size` from
`config.json` and compute the routed-expert share directly rather than deriving
it from the residual.

## On-screen rules

- **`18B active` is the path across the whole model**, not eight experts in one
  layer. This is the crux of the answer; getting it wrong invalidates it.
- **Never cross-multiply organisation units with space units.** Experts are
  288 *per sparse layer*; gigabytes are space. "288 experts need 288 GB" is a
  lie. An expert is ~1/40th of a gigabyte.
- **Never claim all 320B must live in GPU VRAM.** Real systems shard, cache,
  quantize and offload. The truthful claim is that efficient serving needs
  *fast access* to whichever experts routing chooses.
- **Experts are not interpretable specialists.** An expert is a learned
  feed-forward block. Never label one "the maths expert"; identity is a number.
- Figures like "94% of experts touched over ~100 words" are **illustrative**
  unless measured from checkpoint activations. Mark them as such.

## How a prompt actually moves through the model

The video follows one word climbing alone. That is a teaching simplification,
and a sharp viewer will ask about it, so here is the real shape.

**Prefill — the whole prompt at once.** Every token in the prompt is processed
in parallel, layer by layer: all tokens through layer 1, then all through layer
2, and so on to layer 45. Attention is what lets them see each other. Each
token carries its *own* representation and, at each sparse layer, picks its
*own* top-8 independently — positions do not share a team.

**The output comes from one position.** At the top, only the last position's
representation is used to choose the next token.

**Decode — one token at a time.** The chosen token is appended, and only that
new token is pushed through all 45 layers; earlier tokens' keys and values are
reused from the KV cache. So per *generated* token: 42 sparse layers × 8 =
**336 expert visits**.

### What this means for the numbers on screen

- **336 is per token**, and that is the figure the video uses. Correct.
- During prefill, the *union* of experts needed across all prompt tokens is far
  larger than any single token's 336 — in practice most of the pool gets
  touched. So the fetch argument is **stronger** than the video claims, never
  weaker. The video is deliberately conservative, which is the safe direction.
- The KV cache is separate from weights and grows with context. The 306 GiB is
  weights only, before any cache.

### The simplification the video makes

Sections 3–7 follow a single word so the mechanism stays legible. Section 6
carries an expandable aside acknowledging that the rest of the sentence is
travelling alongside it. Do not remove that aside: the "one word, alone"
picture is the one thing in the chain that is not literally true, and the video
should say so where a viewer would notice.
