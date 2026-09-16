# Section 02 — What the model actually receives

Status: **APPROVED NARRATION — LOCKED.** The spoken script below is exactly the version approved in chat. Beats and visuals adapt around it. Do not paraphrase the VO during implementation.

Numbers: `research/glm/TOKENIZER.md`, `research/glm/GROUND_TRUTH.md` · Shared protagonist: `PROMPT[7] = ' it'`, token ID **432**.

## Contract

| | |
| --- | --- |
| Enters on | **Because it doesn’t start with words.** |
| Teaches | token, token ID, vocabulary |
| Answers | the text becomes tokens, then IDs; `it` becomes **432** |
| Exits on | **432 is only an address. Where does anything useful come from?** |
| Protagonist | `it` — never switch to `dog` |
| Forbidden | embedding, attention, router, expert |

## Approved narration — locked

Because it doesn’t start with words.

The first thing the model does is break your text into smaller pieces.

So our sentence:

**“The dog dropped the ball, and it…”**

becomes:

**The | dog | dropped | the | ball | , | and | it**

Eight pieces.

And these pieces are called **tokens**.

Now, in this sentence, they look suspiciously like words.

But tokens are **not** just words.

For example, give the same tokenizer:

**“unbelievable”**

and it breaks it into:

**un | belie | vable**

One word.

Three tokens.

So the model isn’t really reading words the way we do.

It has its own set of pieces it knows how to work with.

And GLM has a list of **154,880** of them.

Every token in that list has a number.

So let’s go back to the one we said we’d follow:

**“it.”**

Where do you think `it` is in that list?

There’s no way you could know.

It happens to be:

**432.**

That number is called its **token ID**.

So from the model’s point of view, our little `it` has now gone from:

**“it”**

to:

**432.**

And that sounds like progress.

But think about what 432 actually tells us.

Does **432** tell you that `it` might refer to the ball?

Does it tell you that `it` is a pronoun?

Does it tell you anything about what `it` means?

No.

It’s just where that token lives in the list.

Basically an address.

And that creates our next problem.

The model now has a number…

but **where does the meaning come from?**

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — the sentence comes apart (beats 1–4)

> **1.** *(The half-drawn path from §1 completes; the intact sentence travels inward.)* Because it doesn’t start with words. The first thing the model does is break your text into smaller pieces.
>
> **2.** *(The sentence lands on one clean surface and hairline cut marks appear.)* So our sentence: “The dog dropped the ball, and it…” becomes:
>
> **3.** *(It separates into the eight measured pieces and a small count builds.)* The | dog | dropped | the | ball | , | and | it. Eight pieces.
>
> **4.** *(The name lands only after the split has been watched. The eight stay countable.)* And these pieces are called tokens.

### Act 2 — tokens are not words (beats 5–7)

> **5.** *(Nothing moves. The eight sit there looking exactly like words.)* Now, in this sentence, they look suspiciously like words. But tokens are not just words.
>
> **6.** *(One ordinary word enters below and fractures into three.)* For example, give the same tokenizer: “unbelievable” and it breaks it into: un | belie | vable. One word. Three tokens.
>
> **7.** *(A very tall list rises beside the prompt and runs past the frame.)* So the model isn’t really reading words the way we do. It has its own set of pieces it knows how to work with. And GLM has a list of 154,880 of them. Every token in that list has a number.

### Act 3 — our piece gets a number (beats 8–11)

> **8.** *(Every prompt token dims except the tracked one, which stays in its place in the row.)* So let’s go back to the one we said we’d follow: “it.”
>
> **9.** *(The list and `it` hold. No choices are offered.)* Where do you think `it` is in that list? There’s no way you could know.
>
> **10.** *(`it` travels to the list, touches its real row, and comes back carrying the number.)* It happens to be: 432. That number is called its token ID.
>
> **11.** *(The letters fade from the same travelling card; the number stays.)* So from the model’s point of view, our little `it` has now gone from: “it” to: 432. And that sounds like progress.

### Act 4 — an address is not a meaning (beats 12–14)

> **12.** *(The list stays. The number moves beside the thing it indexes.)* But think about what 432 actually tells us. Does 432 tell you that `it` might refer to the ball? Does it tell you that `it` is a pronoun? Does it tell you anything about what `it` means? No.
>
> **13.** *(432 is left alone and reframed.)* It’s just where that token lives in the list. Basically an address.
>
> **14.** *(The list goes; the number is all that is left in the middle.)* And that creates our next problem. The model now has a number… but where does the meaning come from?

---

## Storyboard

There is **one paper stage for all 14 beats**. §1 leaves Chat on the left and GLM
on the right with a half-drawn path between them; the prompt continues inward.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | the half-drawn path from §1 completes and the sentence travels inward | Chat + GLM + prompt | it doesn’t start with words | S-14 |
| 2 | the paper stage | — | the sentence lands on one surface and hairline cut marks appear | sentence + cut marks | about to be broken | S-04 |
| 3 | the paper stage | — | it separates into the eight measured pieces and a count builds | eight token cards | `8 pieces` | S-04 |
| 4 | the paper stage | — | the name lands only after the split has been watched | eight + `tokens` | called tokens | S-12 |
| 5 | the paper stage | — | nothing moves; the eight sit there looking exactly like words | the same eight | they look like words | S-08 |
| 6 | the paper stage | — | one ordinary word enters below and fractures into three | `un / belie / vable` | 1 word → 3 tokens | S-01 |
| 7 | the paper stage | — | a very tall list rises beside the prompt and runs past the frame | vocabulary list | 154,880 entries | S-04 |
| 8 | the paper stage | — | every prompt token dims except the tracked one | `it` lit in place | the one we follow | S-04 |
| 9 | the paper stage | — | the list and `it` hold, and no choices are offered | list + `where?` | no way you could know | S-08 |
| 10 | the paper stage | — | `it` travels to its real row and comes back carrying the number | card at row 432 | `token ID` | S-04 |
| 11 | the paper stage | — | the letters fade from the same card and the number stays | `432` | it → 432 | S-14 |
| 12 | the paper stage | — | the list stays while the number moves beside the thing it indexes | 432 + the list | does it tell you anything? | S-02 |
| 13 | the paper stage | — | 432 is left alone and reframed | `address, not meaning` | just where it lives | S-04 |
| 14 | the paper stage | — | the list goes and the number is all that is left in the middle | 432 alone | where does meaning come from? | S-08 |

## Carrying frames

- **Beat 6:** one human word, three model pieces — the frame that kills token = word.
- **Beat 11:** the same card the viewer watched travel, now reading `432`.
- **Beat 14:** a number alone on an empty stage. That emptiness is what §3 is given.

## Truth / implementation notes

- On screen, the measured tokenizer input remains `The dog dropped the ball, and it` with no ellipsis; the spoken quote can carry the trailing pause.
- The eight real pieces are `The | dog | dropped | the | ball | , | and | it` with leading-space behavior handled by the tokenizer component rather than shown as ugly visible spaces.
- `it` is token ID **432**. This is now the repo-wide `FOLLOWED` token.
- `unbelievable → un | belie | vable` is measured, not invented.
- **Do not call 432 meaning.** It is an index/address into learned tables.

## Sound-compatible actions

- beat 2: the cuts
- beat 3: eight pieces separating
- beat 6: one word breaking
- beat 7: the list running up past the frame
- beat 10: the card touching its row
