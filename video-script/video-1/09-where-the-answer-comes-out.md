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

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — only the last position can answer (beats 1–3)

> **1.** *(All eight final rows hold long enough to read as one per input position.)* At the top of the stack, we now have a finished row for every position in the prompt. Eight tokens in. Eight final representations out.
>
> **2.** *(The first seven dim; the last-position row brightens and comes forward.)* But to predict what comes next, there is one position we care about most: the last one. Our `it`.
>
> **3.** *(The sentence returns beneath the rows with an empty slot immediately after `it`.)* Because the next token has to come after `it`.

### Act 2 — a score for everything it knows (beats 4–7)

> **4.** *(The final row enters a scoring strip.)* So the model takes that final row... and turns it into a score for every token in the vocabulary.
>
> **5.** *(§2’s vocabulary list returns at the same size and style, and score marks populate all of it.)* All 154,880 possible token entries get a score. You can think of each score as: how plausible would this token be next, given everything we have processed so far?
>
> **6.** *(The list reorders; most entries recede and a small group stays plausible. No exact probabilities.)* Most of them will be terrible choices. Some will be plausible. A few may be very plausible.
>
> **7.** *(A small aside sits at the frame edge and is deliberately not opened.)* Then the decoding settings decide how that distribution becomes an actual choice. Maybe the highest-scoring token is taken. Maybe sampling adds some randomness. We do not need that rabbit hole for this video.

### Act 3 — one token (beats 8–11)

> **8.** *(One entry lifts out of the list.)* The important part is: one next token gets selected. Suppose the model chooses something corresponding to: “bounced”
>
> **9.** *(That same lifted actor travels down and fills the empty slot.)* So our prompt: “The dog dropped the ball, and it…” becomes: “The dog dropped the ball, and it bounced…”
>
> **10.** *(The whole tower and one small token hold in the same frame.)* And after this entire journey — tokenizing, embeddings, context, routing, experts, 45 layers — what came out? One token. Just one.
>
> **11.** *(A second empty slot opens after `bounced`.)* Which creates a pretty obvious problem. ChatGPT-style models do not answer you with one token. So how do we get the second one?

---

## Storyboard

There is **one paper stage for all 11 beats**. §8 leaves eight final rows at the
top with the last-position row already bright.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | all eight final rows hold, one per input position | 8 final rows | eight in, eight out | S-14 |
| 2 | the paper stage | — | the first seven dim and the last-position row comes forward | the `it` row lit | the one we care about | S-04 |
| 3 | the paper stage | — | the sentence returns beneath with an empty slot right after `it` | prompt + blank slot | next attaches here | S-04 |
| 4 | the paper stage | — | the final row enters a scoring strip | row → scoring | a score for every token | S-04 |
| 5 | the paper stage | — | §2’s vocabulary list returns and score marks populate all of it | scored vocabulary | all 154,880 | S-04 |
| 6 | the paper stage | — | the list reorders; most entries recede and a few stay plausible | ranked vocabulary | no exact probabilities | S-04 |
| 7 | the paper stage | — | a small aside sits at the frame edge and is deliberately not opened | edge aside | greedy / sampling / temperature | S-15 |
| 8 | the paper stage | — | one entry lifts out of the list | one token selected | `bounced` | S-04 |
| 9 | the paper stage | — | that same lifted actor travels down and fills the empty slot | prompt with the new token | and it bounced… | S-04 |
| 10 | the paper stage | — | the whole tower and the one small token hold in the same frame | tower vs one token | all of that, for one token | S-01 |
| 11 | the paper stage | — | a second empty slot opens after `bounced` | another blank slot | how do we get the second? | S-08 |

## Carrying frames

- **Beat 3:** a blank slot after `it`, so *next* has a place before it has a value.
- **Beat 10:** the tower and one token in the same frame — the scale contrast the section exists for.

## Truth / implementation notes

- The next-token distribution is produced from the representation at the **last prompt position**.
- The output projection creates a score/logit for each of the **154,880** vocabulary entries.
- Selection depends on decoding settings; do not imply “highest score always wins.”
- `bounced` is an illustrative continuation for the story unless separately measured from a real GLM run. Do not display a fabricated probability or claim GLM actually chose it in a measured inference.

## Sound-compatible actions

- beat 2: seven quieting
- beat 5: the scoring sweep across the list
- beat 8: one entry lifting
- beat 9: the token landing in the slot
