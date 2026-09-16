# Section 04 — `it` gets context

Status: **STORY PASS — narration-first.** The hero remains the exact `it` from the locked opening.

## Contract

| | |
| --- | --- |
| Enters on | **every `it` starts with the same embedding; how does this one become sentence-specific?** |
| Teaches | causal context mixing / attention intuition |
| Answers | the token representation is changed using information from allowed earlier tokens |
| Exits on | **we now have `it` in this sentence; which parts of the model should work on it?** |
| Protagonist | our original `it` |

## Narration

So our `it` starts with the same embedding every time.

But ours is not alone.

It is sitting here:

**The dog dropped the ball, and it**

with seven other tokens around it.

And this is where the model starts adding **context**.

The useful intuition is simple:

each token gets to look at the tokens it is allowed to see and ask:

**which of these matter to me right now?**

For our `it`, everything before it is available.

So if you were `it`...

which pieces would you want to pay attention to?

Probably things like **dog**, **dropped**, and **ball**.

The model does something much more mathematical than that, of course.

It compares the current representations, works out relationships between them, and mixes useful information back into the row for `it`.

Some connections matter more.

Some matter less.

And after that mixing happens...

our row changes.

Same token.

Same ID 432.

But now, different numbers.

Because these numbers describe `it` **in this sentence**.

That general idea is what attention is doing for us here: letting a token change based on its context.

One technical detail: GLM-5.3-Flash uses a hybrid design, so not every layer is plain textbook self-attention.

But for our story, the important job is the same:

**context changes the representation.**

And now something interesting happens.

We finally have a row that is specific to this `it`, in this sentence.

So what does the model do with it?

It decides **which parts of itself should work on it next.**

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — `it` is not alone (beats 1–3)

> **1.** *(The other seven prompt tokens resolve out of silhouette around the held `it` row.)* So our `it` starts with the same embedding every time. But ours is not alone. It is sitting here: The dog dropped the ball, and it — with seven other tokens around it.
>
> **2.** *(The eight re-form as the sentence, with `it` still raised as the tracked one.)* And this is where the model starts adding context.
>
> **3.** *(Thin lines grow backward from `it` to the seven earlier positions. None point forward.)* The useful intuition is simple: each token gets to look at the tokens it is allowed to see and ask: which of these matter to me right now? For our `it`, everything before it is available.

### Act 2 — the mixing (beats 4–7)

> **4.** *(The frame holds on the question before anything is highlighted.)* So if you were `it`... which pieces would you want to pay attention to? Probably things like dog, dropped, and ball.
>
> **5.** *(The lines take on different weights — illustrative, never numbered.)* The model does something much more mathematical than that, of course. It compares the current representations, works out relationships between them, and mixes useful information back into the row for `it`.
>
> **6.** *(Fragments of the earlier rows travel along the lines into the `it` row.)* Some connections matter more. Some matter less.
>
> **7.** *(The row rewrites parts of itself; the old row stays behind it as a ghost.)* And after that mixing happens... our row changes.

### Act 3 — same token, different numbers (beats 8–11)

> **8.** *(`432` is placed against both the ghost row and the new row.)* Same token. Same ID 432. But now, different numbers.
>
> **9.** *(Small labels bank the change: generic `it` above, `it` in this sentence below.)* Because these numbers describe `it` in this sentence.
>
> **10.** *(Only now does the wiring get its name.)* That general idea is what attention is doing for us here: letting a token change based on its context.
>
> **11.** *(A small honesty note sits at the edge without interrupting the row.)* One technical detail: GLM-5.3-Flash uses a hybrid design, so not every layer is plain textbook self-attention. But for our story, the important job is the same: context changes the representation.

### Act 4 — hand it forward (beats 12–13)

> **12.** *(The wiring and the other rows quiet down; the changed row is alone and hero.)* And now something interesting happens. We finally have a row that is specific to this `it`, in this sentence.
>
> **13.** *(A wall of unopened slots begins to appear ahead of the row. Nothing opens.)* So what does the model do with it? It decides which parts of itself should work on it next.

---

## Storyboard

There is **one paper stage for all 13 beats**. §3 ends on the original prompt
returning around the fixed `it` row; that exact arrangement continues here.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | the other seven prompt tokens resolve out of silhouette | `it` row + seven tokens | not alone | S-14 |
| 2 | the paper stage | — | the eight re-form as the sentence with `it` still raised | the prompt + raised `it` | context starts here | S-04 |
| 3 | the paper stage | — | thin lines grow backward from `it`; none point forward | backward context lines | everything before it | S-04 |
| 4 | the paper stage | — | the frame holds on the question before anything is highlighted | same lines, no emphasis yet | which would you look at? | S-05 |
| 5 | the paper stage | — | the lines take different weights, illustrative and unnumbered | weighted lines | some matter more | S-04 |
| 6 | the paper stage | — | fragments of earlier rows travel along the lines into the `it` row | information flowing in | mixing | S-04 |
| 7 | the paper stage | — | the row rewrites parts of itself with the old row left as a ghost | new row + ghost row | the row changes | S-09 |
| 8 | the paper stage | — | `432` is placed against both the ghost and the new row | one ID, two rows | same ID, different numbers | S-01 |
| 9 | the paper stage | — | small labels bank the change on each row | generic vs in-sentence | `it` in this sentence | S-14 |
| 10 | the paper stage | — | the wiring is named only after it has been watched working | name beside the wiring | attention / context mixing | S-12 |
| 11 | the paper stage | — | a small honesty note sits at the edge without interrupting the row | edge aside | hybrid attention design | S-15 |
| 12 | the paper stage | — | the wiring and other rows quiet; the changed row is alone and hero | contextual `it` row | specific to this sentence | S-14 |
| 13 | the paper stage | — | a wall of unopened slots begins to appear ahead of the row | row + closed slot wall | which parts should work on it? | S-08 |

## Carrying frames

- **Beat 3:** every line from `it` runs backward. Nothing points forward.
- **Beat 8:** one token ID, two different rows — the frame §5 depends on.
- **Beat 13:** a changed row facing a wall that has not opened.

## Truth / implementation notes

- Because `it` is the final prompt token, causal masking allows it to use all seven earlier prompt positions.
- Do not claim measured attention weights for `dog`, `dropped`, or `ball`; visual emphasis is pedagogical, not an observation from a GLM run.
- GLM-5.3-Flash has a hybrid KDA / sparse-attention design. The narration explicitly scopes “attention” as the context-mixing intuition rather than claiming every layer is vanilla self-attention.
- The load-bearing frame is beat 8: **same token ID, changed hidden representation**. That is what makes dynamic routing understandable in §5.

## Sound-compatible actions

- beat 1: paper settling as the seven resolve
- beat 6: soft travel along the lines
- beat 7: the row rewriting
- beat 13: the wall arriving, closed
