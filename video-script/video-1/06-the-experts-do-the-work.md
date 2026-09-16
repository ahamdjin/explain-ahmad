# Section 06 — The experts do the work

Status: **STORY PASS — narration-first.** Same `it` row, same selected eight from §5.

## Contract

| | |
| --- | --- |
| Enters on | **the router picked eight; what do they actually do?** |
| Teaches | expert transformation, weighted combination, shared expert contribution |
| Answers | each selected expert transforms the same row; their outputs are weighted and combined into one new row |
| Exits on | **we just processed `it` through one sparse layer; how many times does this happen?** |

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

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — one row in, eight rows out (beats 1–3)

> **1.** *(The contextual row reaches the fork; the 280 idle experts recede.)* The router has picked eight. Now the actual work happens.
>
> **2.** *(The same row duplicates into eight copies and enters all eight blocks at once.)* Our `it` row is copied into all eight selected experts. Same input. Eight different blocks.
>
> **3.** *(Each box transforms it differently; eight visibly different rows emerge.)* And each expert transforms that row in its own learned way. So one row goes in... and eight different rows come out.

### Act 2 — nobody wins (beats 4–8)

> **4.** *(Everything freezes on the eight outputs. Nothing is highlighted.)* At this point you might reasonably think: okay — which expert wins?
>
> **5.** *(Nothing is removed. All eight stay.)* None of them. The router’s scores still matter.
>
> **6.** *(The score markers return and the outputs thicken or thin to match.)* The experts that scored higher get more influence. The ones that scored lower get less.
>
> **7.** *(The eight converge into one merge, the heavier ones contributing more.)* So those eight outputs are weighted and blended back together.
>
> **8.** *(The separate block’s output arrives on its own path and joins.)* And remember the shared expert from the side? Its output joins too.

### Act 3 — one row again, one layer deeper (beats 9–12)

> **9.** *(One row settles, with the input row ghosted beside it.)* After all of that... we are back to one row. Still 4,096 numbers long. Still our same `it`. But the values have changed again.
>
> **10.** *(The machinery recedes; only the changed row and its measurement remain.)* So the token has not turned into a word yet. It has not produced an answer. It has simply been processed one step deeper.
>
> **11.** *(The measurement on the row is what the next thing will want; nothing else moves.)* And that is useful, because the next part of the model expects the same kind of object: another row of 4,096 numbers. So it can hand this new row forward.
>
> **12.** *(Walls draw around the whole mechanism, then shrink until it is one room in something taller.)* Context changed the row. The router chose who should work on it. The experts changed it again. That is one sparse layer’s basic story. And our `it` is nowhere near finished. Because GLM has 45 layers.

---

## Storyboard

There is **one paper stage for all 12 beats**. §5 ends with the eight and the
shared block already open toward the row; the row simply continues into them.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | the contextual row reaches the fork and the 280 idle experts recede | row + 8 selected + shared | the work starts | S-14 |
| 2 | the paper stage | — | the same row duplicates into eight copies and enters all eight blocks | one input, eight copies | same input | S-04 |
| 3 | the paper stage | — | each box transforms it differently and eight different rows emerge | 8 output rows | eight different rows out | S-04 |
| 4 | the paper stage | — | everything freezes on the eight outputs with nothing highlighted | 8 outputs, no winner | which expert wins? | S-05 |
| 5 | the paper stage | — | nothing is removed — all eight stay on screen | all eight kept | none of them | S-09 |
| 6 | the paper stage | — | the score markers return and the outputs thicken or thin to match | weighted outputs | higher score, more influence | S-04 |
| 7 | the paper stage | — | the eight converge into one merge, the heavier ones contributing more | eight → one | weighted and blended | S-04 |
| 8 | the paper stage | — | the separate block’s output arrives on its own path and joins | shared joining the merge | the shared one too | S-04 |
| 9 | the paper stage | — | one row settles with the input row ghosted beside it | before vs after row | same shape, new values | S-14 |
| 10 | the paper stage | — | the machinery recedes; only the changed row remains | the row, alone | not an answer yet | S-04 |
| 11 | the paper stage | — | the row is measured as the shape the next layer wants | row + `4,096 values` | same shape in, same shape out | S-14 |
| 12 | the paper stage | — | walls draw around the mechanism, then shrink it into one room of something taller | one layer + tower edge | 45 layers | S-14 |

## Carrying frames

- **Beat 5:** eight outputs, none removed. The answer is drawn by *not* deleting anything.
- **Beat 9:** same shape, new values — the reason the next layer can accept it.
- **Beat 12:** everything just built, revealed as one room.

## Truth / implementation notes

- Each routed expert is a learned feed-forward subnetwork; selected outputs are combined using routing weights.
- The shared expert is separate from the top-8 routed selection and also contributes.
- Residual connections / normalisation are intentionally omitted from the main narration; they are not needed for the causal story being taught.
- Preserve dimensional continuity: the object leaving the layer is still a hidden representation of size **4096**, so it can feed the next layer.

## Sound-compatible actions

- beat 2: the row copying, eight times
- beat 7: the merge closing
- beat 8: one extra path arriving late
- beat 12: the walls drawing, then the pull back
