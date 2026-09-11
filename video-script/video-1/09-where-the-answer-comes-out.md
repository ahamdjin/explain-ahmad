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

> **1.** So every token in your prompt pays its own three hundred and thirty-six, all
> at once. At the top of the stack we’ve got a row for every one of them.
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
> **10.** All of that. Forty-five floors, three hundred and thirty-six experts per
> token, every token in your prompt. And what comes out the other end is one
> word.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the top floor | **push in** | we rise to the top and arrive alongside the waiting markers | top of `Tower` | nine rows | S-14 |
| 2 | the top floor | — | each marker unfolds into its finished row, nine in a line | 9 `NumberRow`s | one per token | S-04 |
| 3 | the top floor | — | the first eight dim; only the last stays lit | 8 dim, 1 lit | the last one | S-04 |
| 4 | the top floor | — | the last row lifts clear of the others | one `NumberRow` | `it` | S-04 |
| 5 | the top floor | — | the vocabulary list from §2 rises again beside it | `Vocabulary` returning | 154,880 | S-04 |
| 6 | the top floor | — | a value spreads down the entire list, every entry getting one | scores across list | every token scored | S-04 |
| 7 | the top floor | — | the list reorders; a handful rise to the top | top candidates | `was` `is` `bounced` … | S-04 |
| 8 | the top floor | — | one entry is lifted out of the list | one entry | the pick | S-04 |
| 9 | the top floor | — | it becomes a word card and drops clear of the tower | `WordCard` | **`bounced`** | S-04 |
| 10 | outside the tower | **pull back** | we fall away until the whole tower and the single small card share the frame | `Tower` + one `WordCard` | all that → one word | S-14 |

### Board notes

- **Two camera moves, one at each end**: up to meet them, then all the way out.
  Beat 10's pull-back is the emotional beat of the section and it is the frame,
  not the line.
- Beat 5 **must reuse the §2 list**, drawn identically. The callback only works
  if it is recognisably the same object — same height, same scroll, same edge.
- **Beat 10 is a carrying frame**: the entire machine on one side, one small
  card on the other. Scale contrast teaching magnitude with no label, per
  `skills/PRODUCTION_ORDER.md`.
- Beat 7's candidates must be **plausible continuations of the real prompt**, or
  an attentive viewer catches it. `The dog dropped the ball, and it` → `bounced`
  is honest.

---

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
