# Section 03 — From an ID to a meaning

## Contract

| | |
| --- | --- |
| Enters on | a row number has no meaning in it. So how does it know what anything means? |
| Teaches | **embedding** |
| Answers | the ID is used to look up a long row of numbers, and *that* carries the meaning |
| → next | **but** that row is identical every single time the word appears |
| Banks | the row is **fixed per token** — half of the paradox §4 resolves |
| Target | ~13 beats · ~1:25 |
| Still forbidden | `attention`, `layer` |

## The script

> **1.** Here's how it gets meaning out of a row number.
>
> **2.** *(a very tall table)* The model has a table. One row for every token
> in that list — all hundred and fifty-four thousand of them.
>
> **3.** The ID is just which row to go and fetch.
>
> **4.** *(row 4021 slides out)* So token four thousand and twenty-one pulls out
> this row.
>
> **5.** *(the row extends past the frame)* Four thousand and ninety-six numbers.
> For one small piece of text.
>
> **6.** This row is called an **embedding**. And it's the first thing in the
> whole machine that actually means something.
>
> **7.** Here's why it means something. *(two rows, side by side)* Let's pull
> out "dog", and "cat".
>
> **8.** *(the rows line up, mostly similar)* They're not the same — but they're
> close. Lots of these numbers nearly match.
>
> **9.** *(a third row, clearly different)* Now "Tuesday". Not close to either
> of them.
>
> **10.** Nobody sat down and made that happen. Training did it. Words that get
> used in similar ways ended up with similar rows.
>
> **11.** So the meaning isn't in any one number. It's in **where the row sits**
> relative to all the other rows.
>
> **12.** And that's what goes into the model. Not "dog". This.
>
> **13.** **But** here's the thing to hold on to. This row is stored in a table.
> Which means it is *exactly the same* every single time the word "dog" turns
> up. Same word, same row, always.

## Line jobs

| Beat | Job |
| --- | --- |
| 1–4 | **answer** — the lookup, plainly |
| 5–6 | **teach** — the row, its size, its name |
| 7–9 | **teach** — the example. This is the section's job and it gets three beats |
| 10 | **teach** — where it came from, so it isn't magic |
| 11 | **teach** — the one sentence a viewer should keep |
| 12 | answer — the handoff |
| 13 | **but** — the row is fixed. **This is the setup for §4 and it must land flatly** |

## Truth notes

- **dog/cat close, dog/Tuesday far** is a real and standard property of learned
  embeddings. It is safe to show. Do **not** put a cosine-similarity number on
  screen unless it has been measured from this model's own table.
- The rows shown are illustrative. Say "roughly like this" if a number is
  legible on screen, or keep the values too small to read and show the
  *pattern* instead — the pattern is the honest part.
- 4096 = hidden size; 154,880 = vocabulary. `GROUND_TRUTH.md`.
- Beat 13 is **not hedged**. The paradox only works if this is stated flatly,
  and it is true: the embedding table is a fixed lookup. What changes it comes
  next, and that is the whole point of §4.
- The banked line for this section is beat 13 itself. It is the first deposit.

## Frames

- Beat 2: the table must feel absurdly tall — that is the whole read.
- Beats 7–9 are the **carrying frames** of this section. dog / cat / Tuesday,
  three rows, aligned, on one frame. If that image does not work, the section
  does not work.
- Use colour by role: the rows are `measure` (blue), the words are `word`
  (teal). See `art-direction/PALETTE.md`.

## Assets

| Need | Status |
| --- | --- |
| a very tall lookup table with a row pulling out | **build** — `EmbeddingTable` |
| three `NumberRow`s aligned for comparison | **extend** — a `compare` state |
