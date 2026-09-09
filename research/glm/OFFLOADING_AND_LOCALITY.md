# Offloading, expert locality, and the honest version of the wall

Researched 2026-09-09. **This file corrects the video's thesis.** Read it
before writing another line of script.

Numbers for GLM-5.3-Flash itself stay in `GROUND_TRUTH.md`. This file is about
what the rest of the world has measured, and it changes what we are allowed to
claim.

## 1. The problem with what we were about to say

Section 07 said: 336 expert visits × ~26 MB ≈ **8 GB per word**, off an SSD at
~5 GB/s ≈ **~1.6 seconds per word**, against milliseconds of compute — a ~50×
penalty. The arithmetic is right. The conclusion — *so you cannot run it on
less memory* — is **wrong as stated**, and the audience most likely to comment
is the audience that already knows it is wrong.

People run large MoE models on small cards **today**:

| Measured | Source |
| --- | --- |
| `gpt-oss-120b` **runs on a single 24 GB card** | [TurboLLM](https://turbollm.dev/guides/moe-expert-offloading) |
| a tuned offload config held **~40 tokens/sec on a 16 GB card** | same |
| Mixtral-Offloading: **2.28× tokens/sec** over baseline | [survey](https://arxiv.org/pdf/2412.14219) |
| consumer decode **18.4 → 24.2 tok/s (+31%)** with 48 cache slots per layer (~4.1 GiB VRAM), 2× RTX 3090 | [llama.cpp PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861) |

If the video says "you can't", it is contradicted by a `llama.cpp` flag.

## 2. Why offloading works — expert locality

Expert choice is not random from token to token, so a cache helps:

| Finding | Model measured | Source |
| --- | --- | --- |
| consecutive tokens share **44.2%** of their experts | Mixtral 8×7B | [llama.cpp PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861) |
| an expert chosen for token *i* is **>10% more likely** than chance to be chosen for *i+1*, "sometimes near 30%" against a **12.5% random baseline** | Mixtral 8×7B, 8 experts top-2 | [2511.05814](https://arxiv.org/html/2511.05814) |
| per-layer **LRU-64 ≈ 67% hit**, **LRU-128 ≈ 81%**, saturating around **384 slots**, residual 1.5% cold-start | Mixtral 8×7B | [llama.cpp PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861) |
| the authors' own summary: **"although the temporal locality does exist, it is not strong"** | Mixtral 8×7B | [2511.05814](https://arxiv.org/html/2511.05814) |

## 3. The finding the whole video should be built on

**Every one of those numbers is measured on coarse-grained MoE — 8 experts per
layer, top-2.** The offloading literature has barely touched the architecture
we are actually explaining.

| Model | Experts / layer | Top-k | Random overlap between two tokens |
| --- | --- | --- | --- |
| Mixtral 8×7B | 8 | 2 | **12.5–25%** |
| Phi-3.5-MoE | 16 | 2 | ~12% |
| Qwen1.5-MoE | 60 | 4 | ~7% |
| DeepSeek-V3 | 256 + 1 shared | 8 | **~3%** |
| **GLM-5.3-Flash** | **288 + 1 shared** | **8** | **~2.8%** |

Sources: [FineMoE](https://arxiv.org/pdf/2502.05370) for the first three,
[DeepSeek-V3 technical report](https://arxiv.org/html/2412.19437v1) for the
fourth, `GROUND_TRUTH.md` for ours.

So the reassuring cache numbers come from the regime where there are only eight
things to cache. Ours has **288 per layer across 42 sparse layers — 12,096
expert slots.** A cache that saturates at 384 slots is most of a Mixtral layer
stack and a rounding error of ours.

And the inactive fraction rises with granularity:

| Model | Inactive parameters | Source |
| --- | --- | --- |
| Mixtral 8×7B | **72%** (67 GB) | [FineMoE](https://arxiv.org/pdf/2502.05370) |
| Qwen1.5-MoE | **81%** (23 GB) | same |
| Phi-3.5-MoE | **84%** (70 GB) | same |
| **GLM-5.3-Flash** | **~94%** (18B of 321B) | `GROUND_TRUTH.md` |

The literature also finds that **coarse-grained (request-level) expert patterns
are too high-entropy to predict from**, and that predictability lives only at
the per-iteration level — i.e. you find out which experts you need at
essentially the moment you need them
([FineMoE](https://arxiv.org/pdf/2502.05370)).

## 4. The corrected thesis

> **Sparse routing buys compute, not memory** — and the *finer* you slice the
> experts, the more true that gets.
>
> Fine-graining is not a mistake. It is why modern MoE models are good: more
> experts, smaller each, better specialisation, better load balance. It is also
> precisely what defeats the trick that lets you run Mixtral on a laptop.

**The better these models get at being sparse, the harder they get to hold.**

## 5. What this obliges us to change

| Where | Was | Must become |
| --- | --- | --- |
| §1 event | "a **completely** different eight" | a different eight, and **show which ones stayed** — partial overlap is true, and it sets up caching honestly |
| §7 | "so you can't run it on less memory" | "you *can* — people do — and here is the price, and here is why it gets worse, not better" |
| §7 | ~1.6 s/word presented as the fact | the **naive** cost. Then caching. Then why 12,096 slots defeats the cache |
| §8 | compute not memory | compute not memory, **and the trend** |

## 6. Still true, still verified

Nothing in `GROUND_TRUTH.md` is retracted. 336 expert visits per word,
~26 MB per expert, ~8 GB of routed weight per word, ~306 GiB at native FP8,
~153 GiB even at 4-bit. Those are the naive-fetch numbers and they are correct.
What changes is that the video must not pretend the naive fetch is the only
option — it must show why the clever options run out.

**This makes the video better.** Conceding that offloading works, then showing
the specific reason it stops working at 288 experts, is a stronger and more
surprising story than a wall with no door in it.
