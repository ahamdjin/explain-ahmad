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

## Storyboard — 14 beats

One continuous paper stage. Section 1 leaves Chat on the left and GLM on the right. We do not cut to a fresh page; the prompt continues inward.

| beat | continuity / screen action | add / keep / remove |
| --- | --- |
| 1 | Pick up the half-drawn path from §1. The intact sentence travels from Chat toward GLM while VO lands **“it doesn’t start with words.”** | **keep** Chat + GLM; **move** prompt; no new diagram |
| 2 | Once inside, the sentence lands on one clean paper surface. As “break your text” is said, hairline cut marks appear between the real tokenizer pieces. | **keep** same sentence; **add** cut marks |
| 3 | The sentence physically separates into the eight measured pieces. A small count builds `1…8`. | **state change** same sentence → eight token cards |
| 4 | `tokens` label lands only after the viewer has watched the split. The eight remain countable. | **add** label `tokens`; nothing leaves |
| 5 | The eight slide slightly upward. `unbelievable` enters below as one ordinary word. | **add** temporary example; **keep** main prompt visible |
| 6 | `unbelievable` fractures into `un | belie | vable`. Hold the contrast: one human word, three model pieces. | **state change** temporary example; then let it leave |
| 7 | A very tall vocabulary/book index rises beside the eight tokens. It runs past the frame. `154,880` is attached to the object, not floating as a title. | **add** vocabulary list |
| 8 | All prompt tokens dim except `it`. `it` lifts but stays visibly connected to its place in the original row. | **focus** `it`; **keep** full prompt as context |
| 9 | Fair non-quiz: show the list and ask where `it` sits. Do not provide choices; VO explicitly says the viewer cannot know. | **hold**; no motion during the thought |
| 10 | `it` travels to the list; the list snaps/scrolls to row **432**. The card touches that row and comes back carrying `432`. | **move same actor**; no replacement card |
| 11 | The letters `it` fade from the travelling card while **432** remains. Handwritten `token ID` lands beside it. | **state change** `it` → `432` |
| 12 | The huge list recedes. Bring back a faint ghost of `ball` and `dog` while VO asks whether 432 tells us anything about them or pronouns. Nothing connects. | **remove** vocabulary; **add** faint question context |
| 13 | Everything except `432` clears. A tiny address-tab shape appears under it: `address, not meaning`. | **remove** ghosts; **keep** 432 alone |
| 14 | The bottom edge of a giant lookup table/book begins rising into frame behind `432` but is not explained yet. End on the question **“where does the meaning come from?”** | **add only an edge** of next mechanism; handoff to §3 |

## Truth / implementation notes

- On screen, the measured tokenizer input remains `The dog dropped the ball, and it` with no ellipsis; the spoken quote can carry the trailing pause.
- The eight real pieces are `The | dog | dropped | the | ball | , | and | it` with leading-space behavior handled by the tokenizer component rather than shown as ugly visible spaces.
- `it` is token ID **432**. This is now the repo-wide `FOLLOWED` token.
- `unbelievable → un | belie | vable` is measured, not invented.
- **Do not call 432 meaning.** It is an index/address into learned tables.
