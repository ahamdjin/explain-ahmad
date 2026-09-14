# Section 08 — That was one token. Here is the whole prompt.

Status: **STORY PASS — narration-first.** The section corrects our deliberate simplification: `it` was the tracked protagonist, not the only token being processed.

## Contract

| | |
| --- | --- |
| Enters on | **our prompt had eight tokens; what were the other seven doing?** |
| Teaches | prompt prefill, parallel positions, causal masking, transformer stack intuition |
| Answers | all eight prompt positions move through the stack layer-by-layer; each gets its own contextual representation and routing |
| Exits on | **the prompt is processed; how do numbers become the next token?** |

## Narration

We followed `it` because following eight things at once would be a terrible explanation.

But `it` was never alone.

Our prompt became **eight tokens**:

**The | dog | dropped | the | ball | , | and | it**

And during the first pass through the prompt, all eight positions are processed through the stack.

Not one token all the way to the top...

then the next one...

then the next one.

Layer by layer, the model works on the prompt positions together.

Each token has its own row.

Each row gets context from the positions it is allowed to see.

Because this is generating text left to right, there is one important rule:

**a token can use the tokens before it, not future tokens that have not happened yet.**

So `The` has almost nothing behind it.

`ball` has several earlier tokens available.

And our `it`, sitting at the end of the prompt, can look back across all seven earlier positions.

Then each position keeps moving upward through the layers.

And on the **42 sparse layers**, each token gets its own routing decision.

So the 336 routed expert visits we counted for `it`...

happen for the other prompt tokens too.

Eight tokens.

336 routed expert visits each.

That gives us:

**2,688 routed expert visits**

for this simplified count across the prompt’s first pass.

That first processing of the prompt is usually called **prefill**.

And this whole stacked architecture — representations moving through layers while positions exchange allowed context — is the transformer stack we have been travelling through.

But none of this has produced an answer yet.

We have eight finished representations at the top.

So how does the model turn those numbers into the **next token**?

## Storyboard — 12 beats

§7 ends with the tower visible and seven additional prompt markers appearing at the bottom beside tracked `it`.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | Expand the base marker row into the eight real prompt tokens. `it` remains orange/tracked; other seven are quieter but fully present. | **keep** tower; **resolve** 8 tokens |
| 2 | Demonstrate the wrong mental model briefly: one marker starts to climb alone while others wait; put a light question mark on it. | **temporary hypothesis** only |
| 3 | Reject that picture by snapping marker back. All eight enter floor 1 together. | **remove** wrong sequence; **move** all eight |
| 4 | On one floor, unfold eight 4096-value rows side by side. This is the layer's set of positions. | **add** rows for all positions |
| 5 | Draw causal context lines as a triangular pattern: early positions have few backward links; later positions have more; `it` can reach all earlier positions. | **add** causal wiring |
| 6 | Progress to the next layer: old wiring clears and redraws from the newly changed rows. | **state change** layer-by-layer, same actors |
| 7 | Start the whole group climbing the tower together. Small router flashes happen independently under each marker on sparse floors. | **animate** group climb |
| 8 | Above tracked `it`, show `336`. Then duplicate that small count above the other seven tokens. | **add** per-token count |
| 9 | Hold the arithmetic `8 × 336 = ?` for a beat. This is a fair calculation prediction. | **hold** question |
| 10 | Total assembles to **2,688 routed expert visits — prompt prefill**. All eight tokens arrive at the top together. | **add** total; **finish** climb |
| 11 | Handwritten `prefill` labels the completed first pass; `transformer stack` labels the tower secondarily. | **add** names after behavior |
| 12 | Tower fades slightly while the eight finished top rows fan out. Then seven dim and the **last position (`it`)** stays bright. End on **“how does the next token come out?”** | **focus** final-position row; seed §9 |

## Truth / implementation notes

- The prompt is **8 tokens**, so the simplified routed-expert count is `8 × 336 = 2,688` visits during prompt prefill.
- That number counts only the top-8 **routed expert visits** in the 42 sparse layers. It is not total FLOPs and does not include shared experts, dense FFNs, attention/KDA work, etc.
- Prompt positions are computed layer-by-layer in parallelizable batches, not by sending one token through all 45 layers before beginning the next.
- Causal masking means a position cannot attend to positions to its right. Because `it` is the final prompt token, it can use all seven earlier prompt positions.
