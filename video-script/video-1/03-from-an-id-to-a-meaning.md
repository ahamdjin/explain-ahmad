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

> **1.** So every piece has a row number now — and a row number is only a name. A
> name has to turn into a meaning somewhere. Here’s where.
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
> **13.** And that’s the lookup, done — the word is four thousand and ninety-six
> numbers now. But here’s the thing to hold on to. This row is stored in a
> table. Which means it is exactly the same every single time the word "dog"
> turns up. Same word, same row, always.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the first surface | — | `4021` sits alone; the bottom edge of a huge table rises into frame | `4021`, a table edge | `4021` | S-14 |
| 2 | the table | **pull back** | we back away and the table's full height comes into view, rows running past the top of frame | `EmbeddingTable` | 154,880 rows | S-04 |
| 3 | the table | — | the number travels up the table and stops at its own row | `4021` moving | row 4021 | S-04 |
| 4 | the table | — | that row slides out of the table and comes forward | `EmbeddingTable`, row extracted | row 4021 | S-04 |
| 5 | the table | — | the extracted row extends sideways past both edges of frame | `NumberRow` extending | 4096 values | S-04 |
| 6 | the table | — | the row holds; a handwritten label lands on it | `NumberRow`, `Note` | "embedding" | S-04 |
| 7 | the table | — | two more rows slide out and stack under it | 3 `NumberRow`s | `dog`, `cat` | S-04 |
| 8 | the table | — | the `dog` and `cat` rows align; the values that nearly match light up | `NumberRow` `compare` | many matches | S-04 |
| 9 | the table | — | a third row slides out and aligns; almost nothing lights | 3 rows aligned | `Tuesday` | S-04 |
| 10 | the table | — | the three rows collapse into three points, spaced by how alike they are | rows → `Space` points | dog·cat close, Tuesday far | S-04 |
| 11 | the table | — | the points hold; a brace measures the two distances | points, `Brace` | the two gaps | S-04 |
| 12 | the table | — | the points unfold back into the `dog` row, alone | one `NumberRow` | row for `dog` | S-04 |
| 13 | the table | — | the same row is pulled from the table twice more; all three are identical | 3 identical rows | identical, every time | S-14 |

### Board notes

- **One camera move**, at beat 2, and it exists to make the table's height felt.
  After that the section is still for eleven beats.
- **Beats 8–11 are the carrying frames.** dog / cat / Tuesday. If that image
  does not teach "meaning is where the row sits", the section fails and no
  motion pass saves it.
- Beat 10 turns rows into points. That is a **representation change**, so it
  must be animated as a fold — the same objects rearranging, never a cut to a
  scatter plot. See the truth note.
- Beat 13 is the deposit. **Three identical rows on one frame** is the whole
  setup for §4, so it is a picture and not a line of voice-over.

---

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

- **Beat 10's two-dimensional placement is an analogy.** These rows live in
  4096 dimensions and cannot be drawn. Show *relative distance only*, never
  axes, never a grid, and never a coordinate. If a viewer could read a position
  off it, the frame is lying.

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
