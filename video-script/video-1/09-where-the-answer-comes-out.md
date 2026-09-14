# Section 09 — Where the next token comes from

Status: **STORY PASS — narration-first.** No new architecture is introduced here; this section converts the final hidden representation into a next-token choice.

## Contract

| | |
| --- | --- |
| Enters on | **the prompt is processed; how do numbers become the next token?** |
| Teaches | final-position representation, vocabulary scores / logits, token selection |
| Answers | the final prompt position is projected to one score per vocabulary token; one token is selected according to the decoding rule |
| Exits on | **one token came out; how does the model produce the next one?** |

## Narration

At the top of the stack, we now have a finished row for every position in the prompt.

Eight tokens in.

Eight final representations out.

But to predict what comes **next**, there is one position we care about most:

the last one.

Our `it`.

Because the next token has to come **after** `it`.

So the model takes that final row...

and turns it into a score for **every token in the vocabulary**.

All **154,880** possible token entries get a score.

You can think of each score as:

**how plausible would this token be next, given everything we have processed so far?**

Most of them will be terrible choices.

Some will be plausible.

A few may be very plausible.

Then the decoding settings decide how that distribution becomes an actual choice.

Maybe the highest-scoring token is taken.

Maybe sampling adds some randomness.

We do not need that rabbit hole for this video.

The important part is:

**one next token gets selected.**

Suppose the model chooses something corresponding to:

**“bounced”**

So our prompt:

**“The dog dropped the ball, and it…”**

becomes:

**“The dog dropped the ball, and it bounced…”**

And after this entire journey — tokenizing, embeddings, context, routing, experts, 45 layers — what came out?

One token.

Just one.

Which creates a pretty obvious problem.

ChatGPT-style models do not answer you with one token.

So how do we get the **second** one?

## Storyboard — 11 beats

§8 leaves eight final rows at the top with the last-position `it` row bright.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | Hold all eight final rows long enough to establish one-per-input-position. | **keep** eight rows |
| 2 | The first seven dim; `it` / final-position row remains bright and moves slightly forward. | **focus** last row |
| 3 | Re-show the sentence under the rows. A blank slot appears immediately after `it`, making “next attaches here” spatially obvious. | **add** blank next-position slot |
| 4 | The same vocabulary list from §2 returns on the right — same size/style so it reads as the same object. | **add** vocabulary list |
| 5 | The 4096-value final row enters a projection/scoring strip; score marks populate the whole vocabulary. | **add** score state to list |
| 6 | Scores reorder/rank visually. Most entries recede; a small group remains plausible. No fake exact probabilities. | **state change** ranked vocabulary |
| 7 | Tiny aside at frame edge: `greedy / sampling / temperature live here`. VO refuses the rabbit hole. | **add** optional decoding note |
| 8 | One vocabulary entry lifts out. Label it illustratively as `bounced`. | **select** one token |
| 9 | The selected token travels back to the sentence and fills the blank slot after `it`. | **move same selected actor** into prompt |
| 10 | Pull back: giant tower on one side, tiny new token on the other. Hold on **“one token.”** | **carrying frame** scale contrast |
| 11 | A second empty slot appears after `bounced`. End on **“how do we get the second one?”** | **add** next blank slot; seed §10 |

## Truth / implementation notes

- The next-token distribution is produced from the representation at the **last prompt position**.
- The output projection creates a score/logit for each of the **154,880** vocabulary entries.
- Selection depends on decoding settings; do not imply “highest score always wins.”
- `bounced` is an illustrative continuation for the story unless separately measured from a real GLM run. Do not display a fabricated probability or claim GLM actually chose it in a measured inference.
