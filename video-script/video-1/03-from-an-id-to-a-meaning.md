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

## Narration — story pass

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

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — the address is good for one thing (beats 1–3)

> **1.** *(`432` holds where §2 left it; the reference book keeps rising behind it.)* Right now, everything the model has for our little `it` is 432. Just an address. And that address is useful because it tells the model where to look next.
>
> **2.** *(The book fills the frame: one indexed page per token.)* Imagine a giant reference book. One page for every token the model knows.
>
> **3.** *(`432` travels up the index like a bookmark and opens its own page.)* We have 432... so we open page 432.

### Act 2 — what is actually on the page (beats 4–8)

> **4.** *(No definition. A row of numbers slides out of the page.)* But instead of finding a definition for `it`, we find something much stranger. A long row of numbers.
>
> **5.** *(The row keeps extending past the frame; a brace builds the count.)* Not ten numbers. Not a hundred. 4,096 numbers.
>
> **6.** *(Only now does the row get its name, with `432 = address` left as a tab on the page.)* That row is called an embedding. And the easiest way to think about it is this: 432 was just the address. The embedding is the model’s learned starting representation for that token.
>
> **7.** *(The row reshapes into one patterned band; single cells stop being readable.)* Those 4,096 numbers were learned during training. No single number means “pronoun” or “ball” or “dog.” It’s the whole pattern that matters.
>
> **8.** *(The `432` card gives way: the row is now the thing we carry.)* So now our `it` is no longer just: 432. It is this entire row of 4,096 values. Which feels much more useful.

### Act 3 — the same row every time (beats 9–13)

> **9.** *(The book returns and the identical row is pulled a second time.)* But there’s a problem. This is a lookup table. Which means every time the token `it` appears... it starts by pulling out the exact same row.
>
> **10.** *(A first ordinary sentence lands above the first row; its `it` lights.)* Take: “The ball rolled because it was pushed.”
>
> **11.** *(A second sentence lands above the second identical row; its `it` lights.)* and: “The dog stopped because it was tired.”
>
> **12.** *(Faint links run `it → ball` and `it → dog` while the two starting rows stay pixel-identical.)* Different `it`. Different thing it refers to. Same starting embedding.
>
> **13.** *(The examples recede; our own prompt returns with its unchanged row beneath it.)* So this row can’t be the whole meaning. Something still has to make our `it` understand the sentence it is inside. And that is what happens next.

---

## Storyboard

There is **one paper stage for all 13 beats**. §2 ends with `432` centred and the
bottom edge of the book already entering; that object continues rather than cuts.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | the book edge from §2 keeps rising behind the held `432` | `432` + book edge | address → somewhere to look | S-14 |
| 2 | the paper stage | — | the book fills the frame, one indexed page per token | reference book | one page per token | S-04 |
| 3 | the paper stage | — | `432` rides the index like a bookmark and opens page 432 | book + bookmark at 432 | open page 432 | S-04 |
| 4 | the paper stage | — | no definition appears; a row of numbers slides out of the page | page + short number row | not a definition | S-08 |
| 5 | the paper stage | — | the row extends past the frame and a brace builds the count | long row + brace | 4,096 values | S-04 |
| 6 | the paper stage | — | the row is named only after it has been seen behaving | row + `embedding` | `432 = address` tab | S-12 |
| 7 | the paper stage | — | the row reshapes into one band; individual cells stop being readable | patterned band | no single number means anything | S-04 |
| 8 | the paper stage | — | the `432` card gives way and the row becomes what we carry | row alone | `it` is now 4,096 values | S-14 |
| 9 | the paper stage | — | the book returns and the identical row is pulled a second time | two identical rows | same row every time | S-09 |
| 10 | the paper stage | — | an ordinary sentence lands above the first row and its `it` lights | sentence A + row A | `The ball rolled because it was pushed.` | S-04 |
| 11 | the paper stage | — | a second sentence lands above the second identical row | sentence B + row B | `The dog stopped because it was tired.` | S-04 |
| 12 | the paper stage | — | referent links are drawn while the two starting rows stay identical | links + identical rows | `it → ball`, `it → dog` | S-01 |
| 13 | the paper stage | — | the examples recede and our own prompt returns above its unchanged row | hero prompt + row | something has to make this `it` fit | S-14 |

## Carrying frames

- **Beat 5:** one page, one row, and the row is far too long to read: **4,096 values**.
- **Beat 9:** the same row, pulled twice, identical.
- **Beat 12:** two different sentences, two different referents, **one identical starting row**.

## Truth / implementation notes

- Hidden size is **4096**, so the embedding row contains 4,096 values.
- Call the row a **starting representation**, not “the meaning.” Contextual layers change it.
- The embedding lookup for a token is fixed at inference time: same token ID → same initial embedding row.
- The two side sentences illustrate the human fact that `it` can refer to different things. Do not put numerical attention weights on those links unless measured.
- The book/page treatment is a visual metaphor for an embedding table. Keep row 432 visibly connected to the real table so the metaphor does not replace the mechanism.

## Sound-compatible actions

- beat 2: pages riffling
- beat 3: one page turn, settling
- beat 4: paper slide as the row comes out
- beat 9: the same slide, repeated exactly
- beat 13: the side examples sliding away
