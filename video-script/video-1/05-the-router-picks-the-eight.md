# Section 05 — The router picks the eight

Status: **STORY PASS — narration-first.** This is where the opening's “which 18 billion?” mystery first becomes mechanical rather than abstract.

## Contract

| | |
| --- | --- |
| Enters on | **we now have `it` in this sentence; which parts of the model should work on it?** |
| Teaches | router, 288 routed experts, top-8, +1 shared expert, MoE |
| Answers | a router scores all 288 against the current hidden row and selects eight; one shared expert always runs |
| Exits on | **the router picked eight; what do they actually do?** |
| Protagonist | contextual `it` row |

## Narration

Now we reach the part that explains the word **active**.

In one of GLM’s sparse layers, our `it` arrives in front of **288 experts**.

And no — you were not supposed to know that number.

GLM simply has 288 routed experts available here.

But it does **not** run all 288.

Something has to choose.

That something is the **router**.

And here’s a question you actually can answer now.

Should the router choose based on the original token ID — **432**...

or based on the row we just changed using the sentence?

It has to use the changed row.

Because 432 is the same every time.

But this row describes `it` **right now, in this context**.

So the router takes that row and gives all 288 experts a score.

Not eight of them.

**All 288.**

Then it keeps the top **eight**.

The other **280** routed experts do nothing for this token, in this layer.

And there’s one more detail.

GLM also has **one shared expert** that runs every time.

It isn’t part of the 288-way competition.

So visually:

**288 are scored.**

**8 are selected.**

**+1 shared expert always runs.**

And one thing I want to kill before it becomes confusing:

an expert is **not** “the dog expert” or “the grammar expert.”

It is just a learned neural-network block that transforms the row.

The router learned which blocks tend to be useful for which hidden states.

That whole setup — many possible expert blocks, only a few routed ones used at a time — is why this is called a **Mixture of Experts**, or MoE.

And notice what just happened.

For the first time, we can point to some parameters in this giant model and say:

**these ones are active for our `it`, right now.**

So what do the eight actually do?

## Storyboard — 14 beats

§4 leaves the contextual `it` row in centre with an expert wall beginning to appear ahead. Continue the same row into that wall.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | The expert wall finishes drawing behind the unchanged hero row. Count clusters until the frame establishes **288 routed experts**. | **keep** `it` row; **complete** wall |
| 2 | Hold the wall. VO explicitly tells viewer the number is a fact, not a quiz. | **hold**; attach `288 routed experts` to wall |
| 3 | A small desk/router object draws itself between row and wall. Name `router` lands immediately because its job is about to be shown. | **add** router |
| 4 | Put `432` as a faint old card beside the bright contextual row. Ask: ID or current row? | **add** old-ID comparison; fair prediction |
| 5 | 432 dims; the contextual row slides into the router. This visually answers the question. | **quiet** 432; **move** current row |
| 6 | One score badge appears on **every** expert slot, initially blank. | **add** 288 score slots |
| 7 | A sweep fills all scores. Avoid semantic labels on experts. | **state change** all 288 scored |
| 8 | The top eight rise/lift forward while the other 280 flatten. Count `8 selected / 280 idle`. | **focus** 8; **quiet** 280 |
| 9 | Try to stick playful plates `dog`, `grammar`, `French` onto selected experts; they visibly slide off. | **temporary add**, then **remove** semantic plates |
| 10 | Open one selected expert like a machine box: row in, transformed row out. Do not yet run all eight. | **add** explanatory cutaway |
| 11 | A ninth, visually separate block enters from outside the 288 wall labelled `shared — always on`. | **add** shared expert outside competition |
| 12 | Recompose cleanly: wall of 288, 8 orange selected, +1 shared, contextual row at router. | **consolidate** carrying frame |
| 13 | Handwritten `Mixture of Experts (MoE)` lands on the whole arrangement, not on one expert. | **add** architecture name |
| 14 | Selected eight and shared expert open their input doors toward the same `it` row. End on **“what do the eight actually do?”** | **seed** §6; no outputs yet |

## Truth / implementation notes

- `n_routed_experts = 288`, top-k routed experts = **8**, and there is **1 shared expert** in addition.
- The router choice depends on the **current hidden representation**, not token ID alone.
- Expert ≠ human-readable topic specialist. Treat each as a learned feed-forward transformation block.
- “280 do nothing” is scoped to the **routed experts for this token in this sparse layer**; the shared expert still runs.
- This is the first visual payoff of “active”: a small selected subset of a much larger available set.
