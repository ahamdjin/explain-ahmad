# Section 03 — From an ID to a meaning

Status: **SCRIPT v9.** Written to spine v5. Every beat cites a strategy from
`skills/STRATEGY_LEDGER.md`, and no beat uses a technique that is not in it.

v8's interiors survive — they were built for spatial continuity and that work
stands. What v8 did not have was a **chapter wall** at either end, a named
teacher for anything it was doing, or an `Exits on` that had to equal the next
section's `Enters on` word for word. All three are now in place:

- **Beat 1 banks** the previous section's answer in one clause, then adds the
  *but* that makes this section necessary. It does not carry the previous
  question forward — that was the fault behind *"the whole story feels
  disconnected"*. `STORY_SPINE.md` §5.
- **The closing beat names the mechanism as finished** and says what is now
  missing, so the viewer gets to put something down before picking the next
  thing up.
- **Act headings carry strategy IDs**, derived from the storyboard's own
  strategy column rather than asserted separately.

Spine: `storyboard/video-1/STORY_SPINE.md` v5 · Numbers: `research/glm/GROUND_TRUTH.md`
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 03`

## Contract

| | |
| --- | --- |
| Enters on | a row number has no meaning in it. So how does it know what anything means? |
| Teaches | **embedding** |
| Answers | the ID is used to look up a long row of numbers, and *that* carries the meaning |
| Exits on | that row is the same every single time. So how does the word ever mean two things? |
| → next | **but** that row is identical every single time the word appears |
| Banks | the row is **fixed per token** — half of the paradox §4 resolves |
| Target | ~13 beats · ~1:25 |
| Still forbidden | `attention`, `layer` |

## What changed from v8

**1. It named the thing before showing it behave.** v8's beat 6 landed the word
*embedding* and asserted *"it's the first thing that actually means something"*
— and then spent beats 7 to 11 demonstrating why. The evidence arrived after
the conclusion, which is the order S-04 exists to forbid. The name and the
claim now land together at beat 12, once `dog`, `cat` and `Tuesday` have been
on screen.

**2. Nothing was ever asked.** Thirteen beats of telling. Beat 6 is now a soft
question — *what could one short word need four thousand numbers for?* — which
is the question the next five beats answer, and it is the honest place for one
because the viewer has just watched a row run off both edges of the frame.
S-06, and soft rather than a bet: the hard-bet budget is spent on §1 and §7.

**3. The closing beat carried fifty words.** Naming the lookup as finished and
landing *the same row every time* are two jobs. They are now beats 13–15, and
the identical-row frame gets its own hold, because it is the setup §4 spends.

## The script

### Act 1 — banking the row number (beat 1) · **S-14**

> **1.** *(`5562` alone; the bottom edge of a huge table rises into frame)* So
> every piece has a row number now — and a row number is only a name. A name
> has to turn into a meaning somewhere. Here's where.

### Act 2 — the lookup, in front of you (beats 2–5) · **S-04**

> **2.** *(we pull back; the table's full height comes into view)* The model has
> a table. One row for every token in that list — all hundred and fifty-four
> thousand of them.
>
> **3.** *(the number travels up the table)* The ID is just which row to go and
> fetch.
>
> **4.** *(row 5562 slides out and comes forward)* So token five thousand, five
> hundred and sixty-two pulls out this row.
>
> **5.** *(the row extends past both edges of frame)* Four thousand and
> ninety-six numbers. For one small piece of text.

### Act 3 — the question, and the answer (beat 6) · **S-06**

> **6.** *(the row holds; nothing moves)* Which seems like a lot. What could one
> short word possibly need four thousand numbers for?

### Act 4 — what the numbers are for (beats 7–11) · **S-04**

> **7.** *(two more rows slide out and stack under it)* Here's what. Let's pull
> out two more — "dog", and "cat".
>
> **8.** *(the rows align; the values that nearly match light up)* They're not
> the same. But they're close. Lots of these numbers nearly match.
>
> **9.** *(a third row aligns; almost nothing lights)* Now "Tuesday". Not close
> to either of them.
>
> **10.** *(the three rows collapse into three points, spaced by likeness)*
> Nobody sat down and arranged that. Training did it. Words that get used in
> similar ways ended up with similar rows.
>
> **11.** *(a brace measures the two distances)* So the meaning isn't in any one
> number. It's in **where the row sits** relative to all the other rows.

### Act 5 — the name, now that it is earned (beat 12) · **S-12**

> **12.** *(the points unfold back into the `dog` row; a handwritten label lands
> on it)* This row has a name. It's called an **embedding**. And it's the first
> thing in the whole machine that actually means something.

### Act 6 — the wall (beats 13–15) · **S-14**

> **13.** *(the `dog` row alone in frame)* And that's the lookup, done. That's
> what goes into the model. Not "dog". This.
>
> **14.** *(the same row is pulled from the table a second time)* But here's the
> thing to hold on to. This row is stored in a table.
>
> **15.** *(pulled a third time; all three sit identical)* Which means it is
> exactly the same, every single time the word "dog" turns up. Same word, same
> row, always.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the first surface | — | `5562` sits alone; the bottom edge of a huge table rises into frame | `5562`, a table edge | `5562` | S-14 |
| 2 | the table | **pull back** | we back away and the table's full height comes into view, rows running past the top of frame | `EmbeddingTable` | 154,880 rows | S-04 |
| 3 | the table | — | the number travels up the table and stops at its own row | `5562` moving | row 5562 | S-04 |
| 4 | the table | — | that row slides out of the table and comes forward | `EmbeddingTable`, row extracted | row 5562 | S-04 |
| 5 | the table | — | the extracted row extends sideways past both edges of frame | `NumberRow` extending | 4096 values | S-04 |
| 6 | the table | — | everything stops; the row holds and the question sits under it | `NumberRow`, still | **`what for?`** | S-06 |
| 7 | the table | — | two more rows slide out and stack under it | 3 `NumberRow`s | `dog`, `cat` | S-04 |
| 8 | the table | — | the `dog` and `cat` rows align; the values that nearly match light up | `NumberRow` `compare` | many matches | S-04 |
| 9 | the table | — | a third row slides out and aligns; almost nothing lights | 3 rows aligned | `Tuesday` | S-04 |
| 10 | the table | — | the three rows collapse into three points, spaced by how alike they are | rows → `Space` points | dog·cat close, Tuesday far | S-04 |
| 11 | the table | — | the points hold; a brace measures the two distances | points, `Brace` | the two gaps | S-04 |
| 12 | the table | — | the points unfold back into the `dog` row and a handwritten label lands on it | `NumberRow`, `Note` | **"embedding"** | S-12 |
| 13 | the table | — | the label settles; the row sits alone in frame | one `NumberRow` | row for `dog` | S-14 |
| 14 | the table | — | the same row is pulled from the table a second time, beside the first | 2 identical rows | pulled again | S-14 |
| 15 | the table | — | pulled a third time; all three sit identical, unchanged | 3 identical rows | identical, every time | S-14 |

### Board notes

- **One camera move**, at beat 2, and it earns a place change from the surface
  §2 ended on out to the table. Beats 3–15 are still.
- **Beat 6 is the only held beat**, and it holds on a row that is running off
  both edges of the frame. The question only works if the excess is visible —
  if the row fits on screen, four thousand numbers does not feel like a lot and
  nobody wonders what they are for.
- **Beat 10 is the frame that must not be a diagram of meaning.** Three points
  and two gaps. Any axis labels, any named dimensions, and the viewer learns
  that embeddings have interpretable directions, which is a harder thing to
  unlearn than it is to avoid teaching.
- **The label lands at beat 12, not beat 6.** v8 named it before the evidence.
  The word has to attach to something the viewer has already watched behave,
  which is the whole of S-04 and the reason `NCASE_EVOLUTION_OF_TRUST.md` §2
  matters: the payoff matrix is a summary of a coin machine you already used.
- **Beats 14–15 are the seed §4 spends.** The identical rows need a real hold —
  three of them, visibly unchanged — because §4 opens by finding that
  intolerable. If the sameness is a throwaway here, §4's *but* has nothing to
  push against.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank** — a row number is only a name |
| 2–4 | **teach** — the table, and what an ID is for |
| 5 | setup — the size of one row, visibly too big |
| 6 | **ask** — what could a word need four thousand numbers for? |
| 7–9 | **teach** — dog, cat, Tuesday: likeness is the answer |
| 10 | **teach** — and nobody designed it |
| 11 | **teach** — meaning is position, not any one number |
| 12 | **name** — embedding, once it has been watched behaving |
| 13 | **the handoff** — this is what goes in, not the word |
| 14–15 | **the wall** — and it is the same row every single time |

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
