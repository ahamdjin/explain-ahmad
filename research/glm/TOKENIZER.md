# The real tokenizer and config — measured 2026-09-11

Everything here is read from **`zai-org/GLM-5.3-Flash`** on Hugging Face
(public, ungated). Reproduce with `scripts/tokenize-glm.py`.

This file exists because a GPT review pointed out that §2 showed
`dropp` + `ed` and `under` / `stand` / `ing` as fact with no evidence in the
repo, while hedging `dog → 4021`. The criticism was right, and measuring it
turned out to break **four** things rather than one.

## Config — every architecture number confirmed

From `config.json` → `text_config`:

| key | value | was |
| --- | --- | --- |
| `num_hidden_layers` | **45** | ✓ |
| `first_k_dense_replace` | **3** → 42 sparse | ✓ |
| `n_routed_experts` | **288** | ✓ |
| `n_shared_experts` | **1** | ✓ |
| `num_experts_per_tok` | **8** | ✓ |
| `hidden_size` | **4096** | ✓ |
| `vocab_size` | **154880** | ✓ |
| `intermediate_size` (dense FFN) | **12288** | — |
| **`moe_intermediate_size`** | **2048** | **was unknown** |
| `quantization_config.quant_method` | `fp8` (`e4m3`) | ✓ |

`moe_intermediate_size` was the outstanding blocker on §11
(`GROUND_TRUTH.md` used to say *"still to confirm before recording"*). It is
2048, so the expert size is now derived and not inferred from a residual.

## One expert, measured

A routed expert is three matrices — gate, up, down:

```
4096 × 2048 × 3 = 25,165,824 parameters
at FP8, 1 byte per parameter = 25.17 MB  (24.0 MiB)
```

| quantity | measured | the video used to say |
| --- | --- | --- |
| one expert | **~25 MB** | ~26 MB |
| 336 visits per word | **~8.5 GB** | ~8 GB |
| 12,096 slots | **~304 GB** | ~314 GB |

The cross-check got *better*: 12,096 × 25.17 MB = 304 GB against a ~306 GiB
checkpoint. Routed experts are essentially the whole model.

### What is resident regardless

Derived at FP8, and this is what §1 got wrong:

```
attention, 45 layers   3.0 GB
shared expert × 42     1.1 GB      always on
3 dense FFN layers     0.5 GB
embeddings             0.6 GB
                     ─────────
                       5.2 GB  resident
+ routed per word      8.5 GB
                     ─────────
                      13.7 GB   against a card figure of 18B ≈ 18 GB
```

**The ~4 GB gap is not accounted for here** and must not be presented as if it
were: the config carries a `vision_config`, an untied `lm_head`, norms and the
router, and the 18B on the card covers the multimodal model. Do not claim this
decomposition is complete. What it *does* establish, and what matters, is that
**the routed experts are under half of the active path.**

## The tokenizer — byte-level BPE

154,820 vocab entries plus added tokens, 321,649 merges, GPT-2 style byte-level
pre-tokenisation.

### The running prompt is **eight** tokens, not nine

```
"The dog dropped the ball, and it"

'The' | ' dog' | ' dropped' | ' the' | ' ball' | ',' | ' and' | ' it'
 785     5562     12220       279      4935      11    323     432
```

Three things were wrong:

1. **`dropped` is one token.** The `dropp` + `ed` split does not exist. It was
   invented to teach "token ≠ word" and `src/paper/prompt.ts` admitted as much
   in a comment — *"the unevenness is authored"* — which is not the same as
   being true on screen.
2. **The count is 8.** So §8's on-screen total is **8 × 336 = 2,688**, not
   3,024. That number sits beside countable pieces, so it was checkable and
   wrong.
3. **`dog` is 5562, not 4021** — and only with the leading space. Bare `dog` is
   **18427**. In this sentence it is ` dog` → **5562**. The hedge (*"let's say
   this one's number…"*) can now be dropped.

### A real uneven split, which is better than the invented one

```
'understanding'  →  'under' | 'standing'          (2, not 3)
'unbelievable'   →  'un' | 'belie' | 'vable'      (3)
'strawberry'     →  'str' | 'aw' | 'berry'        (3)
```

`un` / `belie` / `vable` is a **stronger** teaching example than
`under`/`stand`/`ing` ever was, because the pieces are visibly *not* morphemes.
It kills "tokens are syllables" and "tokens are prefixes and suffixes" in one
frame, which the invented split did not.

## What this changed

| file | change |
| --- | --- |
| `GROUND_TRUTH.md` | 26 MB → 25 MB, 8 GB → 8.5 GB, `moe_intermediate_size` confirmed, the "still to confirm" note removed |
| `src/paper/prompt.ts` | 9 pieces → 8, `dropp`+`ed` → `dropped`, 3,024 → 2,688 |
| §2 | ID 4021 → 5562 and unhedged; the sentence's pieces are all whole words; `understanding` → `unbelievable` |
| §8 | 3,024 → 2,688 |
| §11 | ~26 MB → ~25 MB, ~8 GB → ~8.5 GB |
| §1 | the 8-of-288 / five-percent conflation (see `GROUND_TRUTH.md` on-screen rules) |

## Still not measured

- **Attention weights and router scores.** Reading these needs the 62 shards
  and a forward pass. Every such figure on screen stays labelled illustrative.
- **The ~4 GB residual** above.
