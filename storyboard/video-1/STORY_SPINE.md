# The 18 Billion Mystery — Story Spine

**YouTube title:** **320B Parameters, Only 18B Active — Why Does It Need 8 GPUs?**

Status: **current source of truth for the active video.**

## Non-negotiable production rule

The spoken story comes first.

If narration is marked **APPROVED NARRATION — LOCKED**, implementation is not allowed to shorten, paraphrase, reorder, or “improve” it. Beat count, timing, components, camera moves and storyboard structure must change around the approved narration.

Section 1 and Section 2 are currently locked. Sections 3–13 are the current narration-first story pass and should be reviewed before receiving the same lock.

## The one story

A model advertises roughly:

**320B total · 18B active**

That sounds like only a small part of the model should need to be kept around.

We test that intuition with two models that both activate roughly five percent of their parameters per token, but have radically different shipped fully-resident footprints: one 80 GB accelerator versus eight in the project's scoped comparison.

The viewer's mystery becomes:

> **When they say 18B are active — which 18B?**

We answer it by following one real token — **`it`** from:

> `The dog dropped the ball, and it`

through the entire causal chain.

## Teaching method

Use three modes deliberately:

1. **Tell facts the viewer cannot infer.** Example: GLM has 288 routed experts and selects eight.
2. **Ask when the viewer can reason.** Example: should routing use token ID 432 or the sentence-specific hidden row?
3. **Let visuals prove transformations.** Same actor moves and changes: `it` → 432 → embedding → contextual row → routed expert work → next-token distribution.

Never turn unknown architecture constants into fake quizzes.

## The chain — 13 sections

| § | Section | Main event | Viewer leaves knowing | Handoff |
| --- | --- | --- | --- | --- |
| 1 | **The five-percent problem** | viewer predicts similar hardware; 1 vs 8 breaks the prediction | active percentage alone does not predict resident hardware | **which 18B? follow `it`** |
| 2 | **What the model actually receives** | sentence splits into real tokenizer pieces; `it` becomes **432** | token IDs are addresses, not meanings | **where does meaning/useful representation come from?** |
| 3 | **From 432 to a useful representation** | row 432 pulls out **4,096 values** | embedding is a fixed learned starting representation | **same `it` always starts identical — where does context enter?** |
| 4 | **`it` gets context** | earlier prompt positions change the `it` row | same ID, new sentence-specific hidden representation | **which model parts should work on this row?** |
| 5 | **The router picks the eight** | router scores 288 and selects top-8; +1 shared expert | routing depends on the current row, not token ID | **what do experts do?** |
| 6 | **The experts do the work** | same row enters eight experts; weighted outputs merge | selected experts transform the row and return one same-shaped row | **how many times does this happen?** |
| 7 | **One layer becomes forty-five** | room becomes tower; sparse layers reroute | **42 routing decisions × 8 = 336 routed expert visits** for one token | **what about the other seven prompt tokens?** |
| 8 | **That was one token** | all eight prompt positions move layer-by-layer | prompt prefill handles all positions; simplified routed count = **2,688 visits** | **how does one next token come out?** |
| 9 | **Where the next token comes from** | final `it` row becomes vocabulary scores | one vocabulary token is selected from the next-token distribution | **how do we get token two?** |
| 10 | **And then it does it again** | generated token is appended; only new position traverses stack using reusable prior state | autoregressive decode repeats fresh routing for each new token | **now which 18B are active?** |
| 11 | **So which 18B are active?** | fixed always-on pieces separate from dynamically routed expert pieces; naive fetch plan is tested | there is no one permanent 18B block; naive no-cache fetching is bandwidth-expensive | **how does real offload work?** |
| 12 | **How people actually run these** | cache turns some long fetches into hits; slider exposes memory↔speed trade | offload/cache/quantize/shard can reduce fast-memory need, with tradeoffs; active % does not set the working set | **what did sparsity actually buy?** |
| 13 | **What 18B active actually buys** | exact §1 comparison returns | total params answer “how much model exists”; active params answer roughly “how much participates per token” | **end** |

## The protagonist rule

The tracked piece is **`it`**, token index 7, token ID **432**.

Main-story sections may use side examples, but they must return to the same `it` actor.

Shared source: `src/paper/prompt.ts` → `FOLLOWED = 7`.

## The opening mystery — exact answer

The viewer asks whether the active 18B are one fixed block.

The answer is deliberately nuanced:

- some model weights are always used;
- the routed-expert portion is dynamic;
- each sparse layer chooses its top-8 based on the hidden representation arriving at that layer;
- that representation changes as the token moves through the network;
- future tokens can therefore route differently.

So **“18B active” is not the address of one permanent 18B subset you can simply cut out of the checkpoint.**

## The memory/offload claim — scoped

Never say:

> “You need all 320B in GPU VRAM.”

That is false as a general claim. Models can be quantized, sharded, cached and offloaded.

The safe argument is:

1. A completely naive no-cache scheme that fetches every selected routed expert from slow storage would move about **8.5 GB of routed expert weights per token** in this architecture-level thought experiment.
2. Real systems reduce that cost with caching, memory tiers, overlapping transfers and/or prefetching.
3. Project research does **not** contain a published GLM-5.3-Flash expert-locality measurement for 288 routed experts / top-8, so do not invent an optimal cache size or hit rate.
4. Therefore “5.6% active” alone does not tell the viewer how much fast memory is required for a chosen performance target.

## Finale thesis

Prefer this wording:

> **Active parameters is primarily a per-token compute/participation number, not a promise about minimum memory.**

Do not use an unqualified “active parameters is not a memory number” as if active working-set behavior has zero relationship to memory systems.

The final visual is the exact §1 comparison again:

**roughly similar active share · one 80 GB accelerator vs eight in the scoped native/shipped fully-resident comparison.**

The viewer now knows why the percentages never predicted the footprint.

## No extra ending

Section 13 is the end. Once the opening frame returns and the distinction between **total model** and **per-token participation** is clear, stop.

No second thesis. No new benchmark. No teaser. No architecture appendix in the spoken ending.
