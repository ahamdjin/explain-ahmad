# Section 06 — The experts do the work

Status: **STORY PASS — narration-first.** Same `it` row, same selected eight from §5.

## Contract

| | |
| --- | --- |
| Enters on | **the router picked eight; what do they actually do?** |
| Teaches | expert transformation, weighted combination, shared expert contribution |
| Answers | each selected expert transforms the same row; their outputs are weighted and combined into one new row |
| Exits on | **if that was one sparse layer, how many times does this happen?** |

## Narration

The router has picked eight.

Now the actual work happens.

Our `it` row is copied into **all eight selected experts**.

Same input.

Eight different blocks.

And each expert transforms that row in its own learned way.

So one row goes in...

and eight different rows come out.

At this point you might reasonably think:

**okay — which expert wins?**

None of them.

The router’s scores still matter.

The experts that scored higher get more influence.

The ones that scored lower get less.

So those eight outputs are **weighted and blended back together**.

And remember the shared expert from the side?

Its output joins too.

After all of that...

we are back to **one row**.

Still 4,096 numbers long.

Still our same `it`.

But the values have changed again.

So the token has not turned into a word yet.

It has not produced an answer.

It has simply been **processed one step deeper**.

And that is useful, because the next part of the model expects the same kind of object:

another row of 4,096 numbers.

So it can hand this new row forward.

Context changed the row.

The router chose who should work on it.

The experts changed it again.

That is one sparse layer’s basic story.

And our `it` is nowhere near finished.

Because GLM has **45 layers**.

## Storyboard — 11 beats

§5 ends with eight selected experts and the shared expert opening toward the same `it` row. No scene reset.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | The contextual `it` row reaches the fork feeding the eight selected experts. The 280 idle experts recede to background. | **keep** row + selected eight + shared; **quiet** 280 |
| 2 | The same row visibly duplicates into eight copies and enters all eight expert blocks simultaneously. | **state change** one input → 8 copies |
| 3 | Each expert box animates a different internal transformation; eight output rows emerge, visibly different patterns. | **add** 8 output rows |
| 4 | Everything freezes on eight outputs. Ask **“which expert wins?”** | **hold** for prediction; no motion |
| 5 | Nothing disappears. Put `none` / `all eight count` beside the group. | **answer by non-removal** |
| 6 | Router score markers return beside each output. Outputs scale/thicken according to their weights. | **add** score influence cue |
| 7 | The eight outputs converge into a central merge. Higher-weight outputs visually contribute more. | **merge** eight → one |
| 8 | The shared expert’s output enters from its separate path and joins the merge. | **add** shared contribution |
| 9 | One 4096-value row settles. Ghost the input row beside it for a clear before/after comparison. | **carrying frame** input vs output |
| 10 | All machinery recedes; only the changed output row remains. A small `same shape: 4096 values` brace stays. | **remove/quiet** experts; **keep** row |
| 11 | Walls/floor draw around this mechanism and then begin shrinking as if it is only one room in a taller structure. Reveal edge of tower. VO lands **“GLM has 45 layers.”** | **transform place** into one layer; seed §7 |

## Truth / implementation notes

- Each routed expert is a learned feed-forward subnetwork; selected outputs are combined using routing weights.
- The shared expert is separate from the top-8 routed selection and also contributes.
- Residual connections / normalisation are intentionally omitted from the main narration; they are not needed for the causal story being taught.
- Preserve dimensional continuity: the object leaving the layer is still a hidden representation of size **4096**, so it can feed the next layer.
