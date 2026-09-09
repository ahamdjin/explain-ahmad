# Section 02 — Your words become numbers

Status: **SCRIPT v2.** Written to spine v3. Replaces `02-follow-one-word.md`,
a 46-second corridor that answered nothing.

## Contract

| | |
| --- | --- |
| Enters on | who picks the eight, and why can't they say in advance? |
| Teaches | **token**, and that a piece of text becomes a row of numbers |
| Answers | the thing that picks never sees your words. It sees numbers |
| Therefore | so whatever those numbers are, they are what the choice depends on |
| Target | ~12 beats · ~1:05 |
| Owns after | `token`, "its numbers" |
| Still forbidden | `attention`, `layer`, `bandwidth` |

## Why tokenization is taught here after all

It was cut from the v1 and v2 chains as "a different video". That was wrong,
and Ahmad said so twice.

The answer given in §1 — *it picks a different eight every word and can't know
in advance* — is only believable if the viewer sees **what the chooser is
actually looking at.** You cannot skip from "a word arrives" to "the numbers
changed" without the step where the word *becomes* numbers. Skipping it is what
made v2 feel like theory.

It costs about forty seconds and it is the floor everything else stands on.

---

## The script

> **1.** So: who picks the eight.
>
> **2.** *(the desk, unlabelled)* There's one thing in there that makes that
> choice. It's called a router, and we'll come back to it.
>
> **3.** Because the strange part is what it's looking at.
>
> **4.** *(your sentence, on screen)* Here's what you typed.
>
> **5.** The model doesn't read that. First it gets chopped into pieces.
>
> **6.** *(the sentence splits)* Pieces roughly the size of a word. Sometimes a
> whole word, sometimes part of one. They're called **tokens**.
>
> **7.** *(one token lifted out)* Let's take one and follow it. This one.
>
> **8.** And then this happens. *(the token becomes a row of numbers)*
>
> **9.** It gets swapped for a row of numbers. That row *is* the word, as far as
> the model is concerned.
>
> **10.** How long a row? *(the row extends past the frame)* Four thousand and
> ninety-six numbers. For that one small piece.
>
> **11.** And none of them means anything on its own. There's no "dog" number in
> there. It's the whole row, together, that stands for the word.
>
> **12.** So the router never sees your words. It sees this row. **Which means
> whatever happens to this row, happens to the choice.**

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1–2 | **answer** — §1's question gets its subject named, immediately |
| 3 | setup — one sentence of anticipation, and it is paid inside four beats |
| 4–6 | **teach** — tokens, plainly, with the sentence on screen |
| 7 | setup — the actor we follow to §7 |
| 8–10 | **teach** — the row, and its size |
| 11 | **teach** — the necessary caveat, and it is interesting rather than dutiful |
| 12 | **therefore** — the row controls the choice. That is the handoff |

Nothing here is a cliffhanger. Beat 12 is a **conclusion** that happens to open
the next door: if the row decides the choice, then what changes the row?

## Truth notes

- Tokens are **not** words. Beat 6 says "sometimes a whole word, sometimes part
  of one" and that is enough. Byte-pair encoding, vocabulary size and token IDs
  are an **expandable aside**, not beats. See `skills/ncase/NCASE_POP_UP_TEXTBOOKS.md`.
- 4096 is the hidden size, from `config.json`. `GROUND_TRUTH.md`.
- Beat 11 is not optional. Without it the viewer builds "one number per
  meaning", which is wrong and would have to be walked back.
- The router is **named** at beat 2 and not explained until §4. Naming is not
  explaining, and withholding a name to seem clever is the thing spine v3 bans.
- Say **`token`** from beat 6 onward. It is earned here.

## Rules for the frames

- Beat 4 uses a real sentence the viewer can read: **`The dog dropped the ball, and it`**
- Beat 6: the split must be *visibly uneven* — one piece shorter than a word —
  or the viewer learns "token = word" and §3's example breaks.
- Beat 10: the row runs off the edge of the frame. That is the whole point of
  the beat; do not shrink it to fit.

## Assets

| Need | Status |
| --- | --- |
| `Sentence` splitting into uneven pieces | **extend** — `Sentence` exists, needs a split state |
| `NumberRow` extending past the frame | have |
| `FrontDesk` (unlabelled, then named) | have |
| expandable aside | have — `Aside` |
