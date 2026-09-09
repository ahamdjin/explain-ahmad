# Section 09 — Where the answer comes out

## Contract

| | |
| --- | --- |
| Enters on | all of that happens. What comes out? |
| Teaches | next-token prediction, scores over the vocabulary |
| Answers | the last position gets turned into a score for every token in the list, and one is chosen |
| → next | **therefore** one word comes out — out of all that |
| Target | ~10 beats · ~1:00 |

## The script

> **1.** At the top of the stack we've got a row for every token in your prompt.
>
> **2.** But only one of them matters right now. The last one.
>
> **3.** *(the final position lights)* Because the job is to work out what comes
> **next** — and next attaches to the end.
>
> **4.** So that final row gets compared against the whole list. All hundred and
> fifty-four thousand tokens.
>
> **5.** *(scores spreading across the list)* Every one of them gets a score.
> How likely are you to be the next thing.
>
> **6.** *(the top few rise)* Most are hopeless. A few are plausible.
>
> **7.** And one gets picked.
>
> **8.** *(a single token drops out)* That's your next word. That's the output.
>
> **9.** All of that. Forty-five floors, three hundred and thirty-six experts
> per token, every token in your prompt.
>
> **10.** And what comes out the other end is **one word**.

## Line jobs

| Beat | Job |
| --- | --- |
| 1–3 | **teach** — why the last position |
| 4–6 | **teach** — scores across the vocabulary |
| 7–8 | **answer** — one token out |
| 9–10 | **turn** — the disproportion, stated so it stings. This is what makes §10 land |

## Truth notes

- The final row goes through an output projection to produce one score per
  vocabulary entry. Calling it "compared against the whole list" is a fair
  plain reading. **Never call it a search.**
- Which token is chosen depends on sampling — temperature, top-p. That is an
  **aside**: it does not change the answer and it costs three beats.
- 154,880 vocabulary. `GROUND_TRUTH.md`.
- Beat 10 is the emotional pivot of the whole video. It must be said flatly and
  then left alone.

## Frames

- Beats 9–10 are **carrying frames**: the entire machine on one side, one small
  word card on the other. Scale contrast doing the teaching, no label needed.
- The vocabulary list from §2 returns here. Same object, same drawing — the
  callback only works if it is recognisably the same list.

## Assets

| Need | Status |
| --- | --- |
| `Vocabulary` with a score distribution | **extend** the §2 build |
| whole-machine-vs-one-word composition | **build** — a composition, not a component |
