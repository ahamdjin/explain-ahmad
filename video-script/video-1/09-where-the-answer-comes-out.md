# Section 09 — Where the answer comes out

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
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 09`

## Contract

| | |
| --- | --- |
| Enters on | all of that happens. What comes out? |
| Teaches | next-token prediction, scores over the vocabulary |
| Answers | the last position gets turned into a score for every token in the list, and one is chosen |
| Exits on | all that machinery, and one token comes out? |
| → next | **therefore** one word comes out — out of all that |
| Built | 12 beats · 1:39 · `npm run timing` is the authority |

## What changed from v8

**1. Beats 9 and 10 were the same sentence twice.** Both opened *"All of that.
Forty-five floors, three hundred and thirty-six expert visits…"*. The recap is worth
having — it is the section's whole emotional point — but once, over three
frames where the picture does the work, not twice in words.

**2. The board said nine rows.** Stale from before the tokenizer was measured;
it is eight, and beat 3 dims seven of them, not eight.
`research/glm/TOKENIZER.md`.

## The script

### Act 1 — banking the parallel pass (beat 1) · **S-14**

> **1.** *(we rise to the top and arrive alongside the waiting markers)* So every
> token in your prompt pays its own three hundred and thirty-six, all at once.
> At the top of the stack there's a row for every one of them.

### Act 2 — only the last one matters (beats 2–4) · **S-04**

> **2.** *(each marker unfolds into its finished row, eight in a line)* Eight
> rows. One per token, all of them finished.
>
> **3.** *(the first seven dim; only the last stays lit)* But only one of them
> matters right now. The last one.
>
> **4.** *(the last row lifts clear of the others)* Because the job is to work
> out what comes **next** — and next attaches to the end.

### Act 3 — scoring the whole vocabulary (beats 5–9) · **S-04**

> **5.** *(the vocabulary list from §2 rises again beside it)* So that final row
> gets compared against the whole list. All hundred and fifty-four thousand,
> eight hundred and eighty of them.
>
> **6.** *(a value spreads down the entire list)* Every single one gets a score.
> How well does this word fit — right here, right now?
>
> **7.** *(the list reorders; a handful rise)* Most are hopeless. A few are
> plausible.
>
> **8.** *(one entry is lifted out of the list)* And one gets picked.
>
> **9.** *(it becomes a word card and drops clear of the tower)* That's your next
> word. That's the output.

### Act 4 — the wall (beats 10–12) · **S-14**

> **10.** *(we fall away until the whole tower and the single small card share
> the frame)* All of that.
>
> **11.** *(the tower fills the frame; the card stays tiny)* Forty-five floors.
> Three hundred and thirty-six expert visits per token. Every token in your prompt,
> all the way up.
>
> **12.** *(nothing moves; the card sits there)* And what comes out the other end
> is **one word**.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the top floor | **push in** | we rise to the top and arrive alongside the waiting markers | top of `Tower` | eight rows | S-14 |
| 2 | the top floor | — | each marker unfolds into its finished row, eight in a line | 8 `NumberRow`s | one per token | S-04 |
| 3 | the top floor | — | the first seven dim; only the last stays lit | 7 dim, 1 lit | the last one | S-04 |
| 4 | the top floor | — | the last row lifts clear of the others | one `NumberRow` | `it` | S-04 |
| 5 | the top floor | — | the vocabulary list from §2 rises again beside it | `Vocabulary` returning | 154,880 | S-04 |
| 6 | the top floor | — | a value spreads down the entire list, every entry getting one | scores across list | every token scored | S-04 |
| 7 | the top floor | — | the list reorders; a handful rise to the top | top candidates | `was` `is` `bounced` … | S-04 |
| 8 | the top floor | — | one entry is lifted out of the list | one entry | the pick | S-04 |
| 9 | the top floor | — | it becomes a word card and drops clear of the tower | `WordCard` | **`bounced`** | S-04 |
| 10 | outside the tower | **pull back** | we fall away until the whole tower and the single small card share the frame | `Tower` + one `WordCard` | all that → one word | S-14 |
| 11 | outside the tower | — | the tower fills the frame; the card stays the size it was | `Tower` large, card tiny | the disproportion | S-14 |
| 12 | outside the tower | — | nothing moves; the card sits there, alone against it | `Tower` + `WordCard` | one word | S-14 |

### Board notes

- **Two camera moves, and they bracket the section**: a push in to the top
  floor at beat 1, a pull back out at beat 10. Beats 2–9 are still, and beats
  10–12 hold the same wide frame while the words do the last of the work.
- **Eight rows, seven dimmed.** The board said nine. This is the frame that
  makes §8's arithmetic countable, so the number of objects has to match the
  number the voice just said.
- **Beat 6's score must spread down the whole list**, past the top and bottom
  of frame. If only the candidates get scored, the frame says the model shortlists
  first, which is not what happens and quietly undoes §5's *"every single one
  gets a score"*.
- **Beats 10–12 are one image held for three beats.** The tower enormous, the
  card tiny, nothing moving. That disproportion is the section's whole argument
  and v8 spent it on two beats of identical narration instead of letting the
  picture carry it.
- Beat 9's card must be the **same object** that §10 beat 3 picks up. If it is
  redrawn, the loop reads as a new thing rather than as the thing that just
  came out.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank** — all of them paid 336, at once |
| 2–4 | **teach** — only the last position is asked the question |
| 5–6 | **teach** — the whole vocabulary is scored, not a shortlist |
| 7–9 | **teach** — a few plausible, one picked, one card out |
| 10–12 | **the wall** — all that machinery, one word |

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
