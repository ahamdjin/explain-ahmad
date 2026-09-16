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

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — two numbers, two questions (beats 1–4)

> **1.** *(`320B total` returns above `18B active` and two separate brackets are drawn.)* Here is the payoff. When you read: 320 billion parameters and 18 billion active — those two numbers are answering different questions. The 320 billion tells you how many learned parameters exist in the model. The 18 billion active tells you roughly how much of that parameter set participates in the computation for a token.
>
> **2.** *(The whole model draws as a large field with small active paths lit across it, never one patch.)* And that is the trick Mixture of Experts is buying you. The model can have a huge pool of learned expert weights... without running every expert for every token.
>
> **3.** *(Our own `it` route replays quickly up the sparse floors, a different eight each time.)* For our `it`, the router only selected eight routed experts on each sparse layer. Another token can use a different route. Another sentence can use a different route.
>
> **4.** *(The frame splits: the total model stays full while only the work side shrinks.)* So the model gets access to far more total learned capacity than it has to compute through on every single token. That is the win.

### Act 2 — what it does not buy (beats 5–6)

> **5.** *(The unused pool stays visibly present around the route, labelled as available rather than wasted.)* But notice what it does not magically do. It does not turn a 320-billion-parameter checkpoint into an 18-billion-parameter file. The experts that are inactive for this token still exist. Another token may need them later.
>
> **6.** *(Stored weight and precision return as the thing that sets the footprint.)* So if you want the whole model fully resident in fast memory, total stored weights and their precision still matter enormously.

### Act 3 — the opening comparison, explained (beats 7–9)

> **7.** *(The exact two model cards from §1 return, and the left one is measured.)* And now our opening comparison stops being weird. This model: gpt-oss-120b uses roughly 4.4% of its parameters per token and ships at roughly 58 GiB in its compact MXFP4 format.
>
> **8.** *(The right one is measured the same way.)* This model: GLM-5.3-Flash uses roughly 5.6% per token, but its shipped FP8 checkpoint is roughly 306 GiB before runtime memory.
>
> **9.** *(Three quiet cause cards land between them.)* Similar active percentages. Completely different total footprints. That difference is not some mysterious failure of MoE. They are different-sized models stored at different precisions. And “percent active” was never the number that told us the checkpoint size.

### Act 4 — how to read the number (beats 10–13)

> **10.** *(Everything collapses back to one card with a meaning written under each number.)* So when you see a model advertised as: 320B total — 18B active — read it like this: 320B total: how much learned model exists. 18B active: roughly how much participates for each token.
>
> **11.** *(The opening question returns, put to the viewer rather than to the screen.)* And if someone turns that second number into: “so you only need 18 billion parameters in memory”... now you know exactly what question to ask: which 18 billion — and when does the model know?
>
> **12.** *(Behind the question, the `it` route chooses its experts layer by layer instead of a question mark.)* Because we followed one tiny `it` all the way through. And the answer was: it decides as it goes.
>
> **13.** *(The exact opening composition returns and nothing moves on the final line.)* That is why two models can both say “about five percent active”... while one fits on a single 80-gigabyte accelerator... and keeping the other fully resident at its shipped precision takes eight. Same headline percentage. Different question. Now the number actually means something.

---

## Storyboard

There is **one paper stage for all 13 beats**. §12 leaves the `18B active` card
alone at centre; the finale is built only out of callbacks.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | `320B total` returns above `18B active` and two brackets are drawn | two numbers, two brackets | exists vs participates | S-14 |
| 2 | the paper stage | — | the whole model draws as a field with small active paths lit across it | distributed activity | never one patch | S-04 |
| 3 | the paper stage | — | our own `it` route replays quickly up the sparse floors | the route, a different eight each floor | another token, another route | S-04 |
| 4 | the paper stage | — | the frame splits: total stays full while only the work side shrinks | TOTAL vs PER-TOKEN WORK | that is the win | S-14 |
| 5 | the paper stage | — | the unused pool stays present around the route, labelled available | inactive experts kept | `available later`, not waste | S-09 |
| 6 | the paper stage | — | stored weight and precision return as the thing that sets the footprint | weights + precision | footprint still matters | S-04 |
| 7 | the paper stage | — | the exact two model cards from §1 return and the left one is measured | gpt-oss card | ~4.4% · ~58 GiB MXFP4 | S-04 |
| 8 | the paper stage | — | the right one is measured the same way | GLM card | ~5.6% · ~306 GiB FP8 | S-04 |
| 9 | the paper stage | — | three quiet cause cards land between them | total · precision · architecture | not a failure of MoE | S-01 |
| 10 | the paper stage | — | everything collapses back to one card with a meaning under each number | `320B TOTAL` / `18B ACTIVE` | read it like this | S-04 |
| 11 | the paper stage | — | the opening question returns, put to the viewer rather than the screen | the question, asked of you | which 18 billion, and when? | S-02 |
| 12 | the paper stage | — | the `it` route chooses its experts behind the question, not a question mark | the route answering | it decides as it goes | S-10 |
| 13 | the paper stage | — | the exact opening composition returns and nothing moves | ≈4% / ≈6%; 1 × 80 GB vs 8 × 80 GB | now the number means something | S-11 |

## Carrying frames

- **Beat 4:** the total model full, the per-token work small — on one frame.
- **Beat 9:** two similar percentages, two very different footprints, and the real causes named.
- **Beat 13:** §1 beat 8, returned unchanged, now readable. The video stops here.

## Truth / implementation notes

- Prefer the closing formulation: **“active parameters is primarily a per-token compute/participation number, not a promise about minimum memory.”** This is more accurate than an unqualified “active parameters is not a memory number.”
- GLM exact total is ~321B / marketed 320B; active ~18B/token.
- Shipped GLM FP8 checkpoint is about **306 GiB weights** before runtime/KV/state memory.
- gpt-oss-120b shipped footprint is about **58 GiB MXFP4** and its active share is about **4.4%** versus GLM about **5.6%**.
- The one-vs-eight hardware frame is specifically the project's **native/shipped, fully-resident 80 GB accelerator comparison**. Quantization, sharding strategy, offloading and runtime requirements can change practical hardware choices.
- Do not imply fine-grained routing is the main reason GLM's checkpoint is larger than gpt-oss. Total parameter count and shipped precision explain most of that storage difference.
- This is the end. Do not add a second thesis, extra architecture facts, or another teaser after the opening frame returns.

## Sound-compatible actions

- beat 3: the route, fast
- beat 7: one card set down
- beat 8: the second card, heavier
- beat 13: nothing
