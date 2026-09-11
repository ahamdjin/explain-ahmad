# Section 06 — The experts do the work

## Contract

| | |
| --- | --- |
| Enters on | eight experts are picked. What do they actually do? |
| Teaches | expert output, weighted blending |
| Answers | each takes the row and returns a different one; the eight get blended into a single row |
| → next | **therefore** the token leaves changed — and that was one step |
| Target | ~11 beats · ~1:05 |

## The script

> **1.** Right — eight picked, out of two hundred and eighty-eight. What do they
> actually do with it?
>
> **2.** *(the row copies into eight)* Each one takes the row, and puts out a
> different row.
>
> **3.** Same numbers going in. Eight different answers coming out.
>
> **4.** And they don't get an equal say. The router already scored them, so the
> ones that scored higher count for more.
>
> **5.** *(the eight outputs, weighted, merging)* The eight get blended
> together, in proportion to their scores.
>
> **6.** Plus the one that always runs.
>
> **7.** *(one row emerges)* And out comes a single row. Same length as the one
> that went in. Completely different numbers.
>
> **8.** That's the token, thought about, once.
>
> **9.** It arrived as "dog, in this sentence". It leaves as something more like
> "dog, in this sentence, having had eight blocks of the model applied to it".
>
> **10.** And that is one step. Done. Finished.
>
> **11.** And that’s one full step, done. Look around, choose, work. Which raises the
> obvious question — how many steps are there?

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the room | — | the eight lift forward out of the wall; the 280 recede into the background | 8 `Specialist`s forward | 8 | S-14 |
| 2 | the room | — | the row copies eight times, one copy travelling into each | 8 identical rows | same input | S-13 |
| 3 | the room | — | eight visibly different rows emerge on the far side | 8 different `NumberRow`s | 8 different outputs | S-04 |
| 4 | the room | — | each output takes on the size of its expert's score | 8 rows, weighted | bigger = higher score | S-04 |
| 5 | the room | — | the eight converge and merge into a single row, larger ones dominating | 8 → 1 `NumberRow` | the blend | S-04 |
| 6 | the room | — | the dashed shared expert's output joins the merge from the side | +1 joining | always on | S-04 |
| 7 | the room | — | one row settles, the same length as the one that went in | one `NumberRow` | one row out | S-04 |
| 8 | the room | — | the row that arrived ghosts in beside it for comparison | before + after | same length, new values | S-04 |
| 9 | the room | — | the ghost fades; a label lands on the survivor | `Note` | "thought about, once" | S-04 |
| 10 | the room | — | everything else clears; the row is alone in the room | one row, empty room | — | S-04 |
| 11 | the room | — | the room's walls, floor and ceiling draw themselves in around the row | the room, bounded | one step, done | S-12 |

### Board notes

- **No camera moves at all.** This section is one continuous look at one
  operation, and the stillness is what makes §7's pull-back land.
- Beat 4 is why §5's scoring mattered. Without it, the blend looks like an
  average and the scores were decoration.
- **Beats 7–8 are the carrying frames**: the input row and the output row, same
  length, obviously different values. If they look alike, the section taught
  nothing.
- Beat 11 is the setup for the entire next section. The room gets edges for the
  first time, so that when we pull back it can become a floor. Nothing is said
  over it — the frame is doing the work.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | setup |
| 2–3 | **teach** — parallel experts, one row each |
| 4–6 | **teach** — the weighted blend. Beat 4 is why the scores mattered |
| 7–8 | **answer** — one row out |
| 9 | **teach** — what changed, in words a person would use |
| 10–11 | **therefore** — the handoff, and §7 answers it in one syllable |

## Truth notes

- The blend is a weighted sum using the routing weights, usually renormalised
  over the chosen eight. "In proportion to their scores" is honest and enough.
- The shared expert's output is added alongside. It is one clause, beat 6.
- Residual connections and normalisation are **deliberately not** in this
  section. They change nothing the viewer needs and they cost two beats. If a
  viewer asks, that is an aside.
- No `layer` yet. Beat 10 says "one step". The word arrives in §7.

## Frames

- Beat 5 is the frame worth building well: eight rows converging into one, with
  visible weight — thicker or more opaque for higher-scoring experts.
- Beat 7's output row must be **visibly different** from beat 2's input row, or
  the whole section reads as decoration.

## Assets

| Need | Status |
| --- | --- |
| row → eight rows → weighted merge | **build** — `ExpertBlend` |
| `NumberRow` before/after states | have |
