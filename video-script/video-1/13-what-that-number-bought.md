# Section 13 — What “18 billion active” actually buys

Status: **FINAL STORY PASS.** This is where the video should end. No new mechanism is introduced; every image is a callback to something already earned.

## Contract

| | |
| --- | --- |
| Enters on | **if active parameters are not a direct memory promise, what did sparsity buy us?** |
| Answers | it decouples much of per-token compute from total model size: a large pool of learned weights exists, while only a subset participates for each token |
| Ends on | the exact opening contradiction, now understood |

## Narration

Here is the payoff.

When you read:

**320 billion parameters**

and

**18 billion active**

those two numbers are answering **different questions**.

The **320 billion** tells you how many learned parameters exist in the model.

The **18 billion active** tells you roughly how much of that parameter set participates in the computation for a token.

And that is the trick Mixture of Experts is buying you.

The model can have a huge pool of learned expert weights...

without running every expert for every token.

For our `it`, the router only selected eight routed experts on each sparse layer.

Another token can use a different route.

Another sentence can use a different route.

So the model gets access to far more total learned capacity than it has to compute through on every single token.

**That is the win.**

But notice what it does **not** magically do.

It does not turn a 320-billion-parameter checkpoint into an 18-billion-parameter file.

The experts that are inactive for this token still exist.

Another token may need them later.

So if you want the whole model fully resident in fast memory, total stored weights and their precision still matter enormously.

And now our opening comparison stops being weird.

This model:

**gpt-oss-120b**

uses roughly **4.4%** of its parameters per token and ships at roughly **58 GiB** in its compact MXFP4 format.

This model:

**GLM-5.3-Flash**

uses roughly **5.6%** per token, but its shipped FP8 checkpoint is roughly **306 GiB** before runtime memory.

Similar active percentages.

Completely different total footprints.

That difference is not some mysterious failure of MoE.

They are different-sized models stored at different precisions.

And “percent active” was never the number that told us the checkpoint size.

So when you see a model advertised as:

**320B total — 18B active**

read it like this:

**320B total:** how much learned model exists.

**18B active:** roughly how much participates for each token.

And if someone turns that second number into:

“so you only need 18 billion parameters in memory”...

now you know exactly what question to ask:

**which 18 billion — and when does the model know?**

Because we followed one tiny `it` all the way through.

And the answer was:

**it decides as it goes.**

That is why two models can both say “about five percent active”...

while one fits on a single 80-gigabyte accelerator...

and keeping the other fully resident at its shipped precision takes eight.

Same headline percentage.

Different question.

Now the number actually means something.

## Storyboard — 12 beats

§12 leaves the `18B active` card alone after all memory machinery recedes. The finale builds only from callbacks.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | `18B active` holds centre. `320B total` returns above it. Draw two separate question brackets: `how much exists?` / `how much works per token?` | **keep** 18B; **add** 320B + two meanings |
| 2 | Show full GLM block as a large field of weights. Small orange routed/active paths light across it rather than one contiguous patch. | **add** whole model; **state** distributed activity |
| 3 | Replay our tiny `it` path rapidly through 42 sparse floors: different eight highlighted per floor. | **callback** routing journey |
| 4 | Pull back so the inactive expert pool remains visible around the route. Label `available later`, not `waste`. | **keep** unused weights present |
| 5 | Split screen into `TOTAL MODEL` and `PER-TOKEN WORK`. Shrink only the work side to ~5.6%; the total-model side remains full. | **carrying frame** compute vs stored model |
| 6 | Return the exact two model cards from §1: gpt-oss left, GLM right. No new art style. | **callback** opening frame |
| 7 | Light active share on each: ~4.4% and ~5.6%. Hold them visually similar. | **add** active percentages |
| 8 | Under them, bring back shipped checkpoint footprints: `~58 GiB MXFP4` vs `~306 GiB FP8`, then the fully-resident comparison `1 × 80 GB` vs `8 × 80 GB`. | **add** scoped storage/hardware facts |
| 9 | Put three quiet cause cards between them: `total parameters`, `storage precision`, `architecture/routing`. Do not blame footprint primarily on expert granularity. | **add** explanation cues |
| 10 | Collapse back to one GLM card: `320B TOTAL` over `18B ACTIVE`. Underneath write `exists` / `participates per token`. | **consolidate** meaning |
| 11 | Re-show the opening question **“which 18B?”**. Instead of a question mark, animate the `it` route choosing experts layer-by-layer behind it. | **pay off** mystery visually |
| 12 | Exact opening composition returns: two models, similar active share, **1 vs 8**. Nothing moves on the final line **“Now the number actually means something.”** | **final carrying frame**; stop video |

## Truth / implementation notes

- Prefer the closing formulation: **“active parameters is primarily a per-token compute/participation number, not a promise about minimum memory.”** This is more accurate than an unqualified “active parameters is not a memory number.”
- GLM exact total is ~321B / marketed 320B; active ~18B/token.
- Shipped GLM FP8 checkpoint is about **306 GiB weights** before runtime/KV/state memory.
- gpt-oss-120b shipped footprint is about **58 GiB MXFP4** and its active share is about **4.4%** versus GLM about **5.6%**.
- The one-vs-eight hardware frame is specifically the project's **native/shipped, fully-resident 80 GB accelerator comparison**. Quantization, sharding strategy, offloading and runtime requirements can change practical hardware choices.
- Do not imply fine-grained routing is the main reason GLM's checkpoint is larger than gpt-oss. Total parameter count and shipped precision explain most of that storage difference.
- This is the end. Do not add a second thesis, extra architecture facts, or another teaser after the opening frame returns.
