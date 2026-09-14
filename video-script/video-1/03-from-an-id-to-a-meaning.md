# Section 03 — From an ID to a useful representation

Status: **STORY PASS — narration-first.** Section 2 is locked; this section is written to continue its exact last frame and keep `it` as the protagonist.

## Contract

| | |
| --- | --- |
| Enters on | **432 is only an address. Where does anything useful come from?** |
| Teaches | embedding lookup, 4096-number starting representation |
| Answers | ID 432 selects one learned row; that row is the token's fixed starting representation |
| Exits on | **every `it` starts with the same embedding; how does this one become sentence-specific?** |
| Protagonist | `it` / ID 432 |

## Narration

Right now, everything the model has for our little `it` is **432**.

Just an address.

And that address is useful because it tells the model where to look next.

Imagine a giant reference book.

One page for every token the model knows.

We have **432**...

so we open page **432**.

But instead of finding a definition for `it`, we find something much stranger.

A long row of numbers.

Not ten numbers.

Not a hundred.

**4,096 numbers.**

That row is called an **embedding**.

And the easiest way to think about it is this:

432 was just the address.

The embedding is the model's learned **starting representation** for that token.

Those 4,096 numbers were learned during training.

No single number means “pronoun” or “ball” or “dog.”

It’s the whole pattern that matters.

So now our `it` is no longer just:

**432**

It is this entire row of 4,096 values.

Which feels much more useful.

But there’s a problem.

This is a lookup table.

Which means every time the token `it` appears...

it starts by pulling out **the exact same row**.

Take:

**“The ball rolled because it was pushed.”**

and:

**“The dog stopped because it was tired.”**

Different `it`.

Different thing it refers to.

Same starting embedding.

So this row can’t be the whole meaning.

Something still has to make our `it` understand the sentence it is inside.

And that is what happens next.

## Storyboard — 12 beats

§2 ends with 432 centred and only the bottom edge of a giant lookup object entering. Continue that object; do not cut.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | `432` holds exactly where §2 left it. The book/table edge rises enough to reveal thousands of indexed rows/pages. | **keep** 432; **continue** same rising object |
| 2 | 432 moves like a bookmark/index tab up the object until row/page 432 is reached. | **move** 432; **keep** table/book |
| 3 | Row 432 slides physically out. It begins as a short strip, then keeps extending sideways as the count grows. | **add** one extracted row; same lookup remains behind |
| 4 | The row runs past the frame. A brace builds to **4,096 values**. Let excess size be felt before naming it. | **state change** row expands |
| 5 | Handwritten `embedding` lands on the row. `432 = address` remains as a small tab pointing back to the source row. | **add** name only after behavior is seen |
| 6 | Zoom/reshape the long row into one coherent patterned band. Individual cells become visually secondary. VO explains no single number carries a human-readable concept. | **keep** same row; no new diagram |
| 7 | The lookup table returns to prominence. Pull row 432 out a second time and place it beneath the first. They are pixel-for-pixel identical. | **add** second identical instance |
| 8 | Pull it a third time. Now three identical `it` embeddings sit stacked. | **add** third identical instance |
| 9 | First sentence card appears above row A: `The ball rolled because it was pushed.` Highlight `it`. | **add** sentence A; **keep** identical rows |
| 10 | Second sentence appears above row B: `The dog stopped because it was tired.` Highlight `it`. | **add** sentence B |
| 11 | Draw faint referent links: first `it → ball`, second `it → dog`, while their starting rows remain visibly identical. These are linguistic examples, not measured model-attention weights. | **add** explanatory links; **keep** same rows |
| 12 | The duplicate examples recede. Return to our original `The dog dropped the ball, and it`. Its unchanged starting embedding sits underneath; earlier prompt tokens begin appearing around it as silhouettes. End on: **something still has to make our `it` understand this sentence.** | **remove** side examples; **restore** hero prompt; seed §4 |

## Truth / implementation notes

- Hidden size is **4096**, so the embedding row contains 4,096 values.
- Call the row a **starting representation**, not “the meaning.” Contextual layers change it.
- The embedding lookup for a token is fixed at inference time: same token ID → same initial embedding row.
- The two side sentences illustrate the human fact that `it` can refer to different things. Do not put numerical attention weights on those links unless measured.
- The book/page treatment is a visual metaphor for an embedding table. Keep row 432 visibly connected to the real table so the metaphor does not replace the mechanism.
