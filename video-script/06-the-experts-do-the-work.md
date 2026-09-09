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

> **1.** Right. Eight experts picked. What do they actually do with it?
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
> **11.** Which raises the obvious question — how many steps are there?

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
