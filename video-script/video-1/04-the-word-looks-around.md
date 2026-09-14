# Section 04 — `it` gets context

Status: **STORY PASS — narration-first.** The hero remains the exact `it` from the locked opening.

## Contract

| | |
| --- | --- |
| Enters on | **every `it` starts with the same embedding; how does this one become sentence-specific?** |
| Teaches | causal context mixing / attention intuition |
| Answers | the token representation is changed using information from allowed earlier tokens |
| Exits on | **now that `it` has a sentence-specific row, what part of the model should work on it?** |
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

## Storyboard — 13 beats

§3 ends on the original prompt returning around the fixed `it` embedding. Continue from that exact arrangement.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | The other seven prompt tokens resolve from silhouettes into their token cards around the `it` row. | **keep** `it` row; **add** other seven prompt tokens |
| 2 | Re-form the sentence horizontally above the rows: `The dog dropped the ball, and it`. `it` stays slightly raised as our tracked actor. | **rearrange** existing actors; no new page |
| 3 | On “look at the tokens it is allowed to see,” thin lines grow backward from `it` to the seven earlier positions. No lines point forward. | **add** relationship lines |
| 4 | Hold and ask the viewer which earlier pieces they would inspect. `dog`, `dropped`, `ball` get only a soft hover/highlight after the question, not before. | **prediction hold**, then **signal** likely useful context |
| 5 | Lines vary in thickness as an **illustrative** attention/context picture. No numbers are shown. | **state change** line weights |
| 6 | Small fragments/colour from earlier rows travel along those lines into the `it` row. | **animate** information flow; keep sentence visible |
| 7 | The 4096-number `it` row visibly rewrites sections of itself. Place old row as a faint ghost behind the new row. | **state change** same actor; **add** faint before-state |
| 8 | Put `432` beside both before and after rows. The ID stays fixed while the row changes. | **add** comparison cue `same ID` |
| 9 | Bank the idea in one frame: `generic it` on the ghost row → `it in this sentence` on the new row. | **add** small labels; nothing else moves |
| 10 | Handwritten `attention / context mixing` arrives beside the wiring only after the viewer has watched the behavior. | **add** mechanism name |
| 11 | Tiny technical aside appears at edge: `GLM uses a hybrid attention design`. Keep it secondary; do not interrupt the main row. | **add** optional honesty note |
| 12 | The wiring and other token rows recede; the new contextual `it` row remains hero in centre. | **remove/quiet** context mechanism; **keep** changed row |
| 13 | A large wall of unopened expert slots begins to appear ahead of the row. End on **“which parts of itself should work on it next?”** | **seed** §5 expert wall, no router answer yet |

## Truth / implementation notes

- Because `it` is the final prompt token, causal masking allows it to use all seven earlier prompt positions.
- Do not claim measured attention weights for `dog`, `dropped`, or `ball`; visual emphasis is pedagogical, not an observation from a GLM run.
- GLM-5.3-Flash has a hybrid KDA / sparse-attention design. The narration explicitly scopes “attention” as the context-mixing intuition rather than claiming every layer is vanilla self-attention.
- The load-bearing frame is beat 8: **same token ID, changed hidden representation**. That is what makes dynamic routing understandable in §5.
