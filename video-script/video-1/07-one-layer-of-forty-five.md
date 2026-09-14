# Section 07 — One layer becomes forty-five

Status: **STORY PASS — narration-first.** This section pays off the tower only after the viewer understands what one layer does.

## Contract

| | |
| --- | --- |
| Enters on | **we just processed `it` through one sparse layer; how many times does this happen?** |
| Teaches | 45 layers, 42 sparse MoE layers, 3 dense FFN layers, rerouting, 336 routed expert visits |
| Answers | the representation moves through 45 layers; 42 make fresh top-8 routing decisions |
| Exits on | **we followed one token, but what happened to the other seven?** |

## Narration

What we just watched was **one sparse layer**.

Our `it` came in as one row...

looked at context...

had experts chosen...

went through those experts...

and left as a changed row.

Now here’s the next fair question.

When `it` reaches the next sparse layer...

does it keep the same eight experts?

Or does it choose again?

It chooses again.

Because look at what we’re carrying upward.

The row has changed.

And the router makes its decision from **that row**.

So a new layer means a new router score.

Some experts might happen to be selected again.

Others won’t.

But it is a **fresh decision**.

Now pull the camera back.

That room we were standing in?

It is one layer in a stack of **45**.

Three of those layers use a normal dense feed-forward block instead of routed experts.

The other **42** are the sparse MoE layers we care about here.

So for one token:

**42 routing decisions.**

And each decision selects **8 routed experts**.

So:

**42 × 8 = 336 expert visits.**

Important distinction:

not 336 routing decisions.

**42 decisions. 336 routed expert visits.**

For our one little `it`.

And each decision happens only after the representation for that layer exists.

Which already starts to answer our opening mystery.

There isn’t one permanent group of experts called “the active 18 billion.”

The active routed pieces are being chosen **as the token moves through the model**.

But we have been cheating a little.

Because we followed only `it`.

Our prompt had **eight tokens**.

What happened to the other seven?

## Storyboard — 12 beats

§6 ends with the room shrinking and the edge of a tower appearing. Continue that exact room into the tower; never cut from “room” to an unrelated tower graphic.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | Hold the bounded room with the changed `it` row inside. Bank: **one sparse layer**. | **keep** room + row |
| 2 | Ask “keep the same eight or choose again?” Show floor 1's eight as small orange marks beside the exiting row. | **add** previous team; prediction hold |
| 3 | Move the same row one floor upward. Its pattern is visibly different from the row that entered floor 1. | **move** same actor upward; **keep** faint old row below |
| 4 | A new router sweep happens on floor 2; eight positions light, with partial overlap allowed. | **add** fresh decision; never animate “same team carried upward” |
| 5 | Repeat once more quickly so the rule becomes visible: changed row → score again → new top-8. | **repeat mechanism**, not exposition |
| 6 | Camera pulls back while the room shrinks in place into one band of a tall building. | **transform** room → floor; **add** tower around it |
| 7 | Floors finish stacking until **45** is visibly countable/labelled. | **add** remaining floors |
| 8 | Three floors redraw as plain/dense blocks; the other **42** retain sparse/router marks. | **state change** 3 dense / 42 sparse |
| 9 | Put one small routing dot on each sparse floor as `it` climbs. Count **42 decisions** beside the tower. | **animate** climb; **add** decision counter |
| 10 | On each sparse floor, eight tiny expert ticks fan out. A second counter accumulates to **336 visits**. | **add** visit counter separately |
| 11 | Hold both labels side-by-side: `42 routing decisions` / `336 routed expert visits`. This is the correction frame. | **hold**; no motion |
| 12 | Zoom slightly out. Seven additional token markers appear at the base beside `it`. End on **“what happened to the other seven?”** | **add** rest of prompt; seed §8 |

## Truth / implementation notes

- GLM-5.3-Flash has **45 layers**; project ground truth uses **42 sparse MoE + 3 dense FFN**.
- Top-8 routing happens in each sparse MoE layer, so the simplified routed count is **42 decisions × 8 = 336 routed expert visits per token**.
- Never call 336 “choices” or “routing decisions.”
- A fresh routing decision does not guarantee a completely different set; selected experts may overlap between layers. The mechanism is fresh scoring, not forced novelty.
- The exact attention/context sublayer differs across GLM's hybrid architecture; the main story here is repeated representation update + fresh sparse routing.
