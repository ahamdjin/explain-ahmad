# Section 05 — The router picks the eight

## Contract

| | |
| --- | --- |
| Enters on | so the numbers depend on the sentence. Who reads them, and what do they decide? |
| Teaches | **router**, **top-8**, **shared expert**, what an expert actually is |
| Answers | it scores all 288 experts against the row *as it is now*, and keeps the best eight |
| → next | **therefore** the choice is made from numbers that only just existed |
| Banks | **the choice depends on those numbers** |
| Target | ~13 beats · ~1:25 |

## The script

> **1.** So: we've now got a row of numbers that's specific to this sentence.
> This is what arrives here.
>
> **2.** *(the desk, named at last)* This is the **router**. It's tiny compared
> to everything around it, and it has exactly one job.
>
> **3.** *(the 288)* In front of it: two hundred and eighty-eight experts.
>
> **4.** And I should say what an expert actually is, because the name oversells
> it. It's a block of numbers that takes a row in and puts a different row out.
> That's all.
>
> **5.** Nobody assigned them subjects. There's no French expert, no maths
> expert. They're just two hundred and eighty-eight different blocks that came
> out of training different from each other.
>
> **6.** The router gives every single one of them a score. All 288.
>
> **7.** *(a sweep across the wall)* And the question it's scoring is: how well
> does this expert fit **these** numbers?
>
> **8.** Then it keeps the best eight. That's it. That's the whole decision.
>
> **9.** *(eight land)* Eight, out of two hundred and eighty-eight. The other
> two hundred and eighty do nothing at all.
>
> **10.** Oh — and one extra that runs every time, no matter what the word is.
> So: eight chosen, plus one always on.
>
> **11.** **But** look at what those scores were made from. *(the row)* These
> numbers. The ones that only existed a moment ago, because attention had just
> finished making them.
>
> **12.** Change the sentence and the row changes. Change the row and the scores
> change. Change the scores and you get a different eight.
>
> **13.** And notice — that choice could not have been made any earlier than
> this. It needed the row to exist first.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example |
| --- | --- | --- | --- | --- | --- |
| 1 | the desk | **pan** | the changed row travels right and comes to rest at the unlabelled desk | `NumberRow`, `FrontDesk` | the post-attention row |
| 2 | the desk | — | a small plaque lands on the desk | `FrontDesk` named | "router" |
| 3 | the room | **pull back** | we back off and the 288 fill the frame beyond the desk | `Hospital`, 288 | 36 × 8 |
| 4 | the room | — | one expert lifts out and opens: a row goes in, a different row comes out | one `Specialist`, enlarged | row in → row out |
| 5 | the room | — | it drops back into the wall; no labels appear on any of them | `Hospital`, all plain | no names, anywhere |
| 6 | the room | — | an empty score badge appears on all 288 at once | 288 badges | 288 |
| 7 | the room | — | a sweep crosses the whole wall left to right, filling every badge as it passes | `Hospital` `scoring` | every one, not just the winners |
| 8 | the room | — | the eight highest rise forward; the other 280 go flat | `Hospital` `lit` + `focus` | 8 |
| 9 | the room | — | a bracket draws around the eight and counts them against the wall | `Brace`, `Counter` | 8 of 288 |
| 10 | the room | — | a ninth, dashed and unscored, slides in beside the eight | shared `Specialist` | +1 always on |
| 11 | the room | — | the row that produced the scores pulses; a line links it to the badges | `NumberRow` → badges | the dependency |
| 12 | the room | — | the second sentence swaps in off to the side; the row changes; the eight change | two rows, two teams | `hot dog` → different eight |
| 13 | the room | — | the new eight hold; the old eight's empty places stay marked | `was` markers | which ones moved |

### Board notes

- **Two camera moves, both at the front**, and each earns a place change: to the
  desk, then out to the room. Beats 4–13 are still.
- Beat 5 is the **most important frame for not teaching a lie.** The wall must
  carry no labels at all. One label — "maths", "French" — and the viewer builds
  a model that is wrong and very hard to unlearn.
- Beat 7's sweep must **visibly touch all 288.** If it only crosses the winners,
  the frame says the router looked at eight, which is the opposite of the point.
- Beat 11 is the section's whole argument in one image: the row, and lines from
  it to the scores. **The choice comes from those numbers.**
- Beat 13 keeps the vacated positions marked, because a new eight lighting up
  does not read as *different* unless you can see where the old ones were. This
  is the seed §12 spends.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1–2 | **answer** — the router, finally named |
| 3–5 | **teach** — what an expert is, and what it is not. Beat 5 prevents a wrong model |
| 6–9 | **teach** — scoring and top-8 |
| 10 | **teach** — the shared expert, cheap here |
| 11–12 | **but** — the dependency chain, spelled out |
| 13 | **banked** — deposit two |

## Truth notes

- **Beat 5 is mandatory.** "The maths expert" is the single most common wrong
  model of MoE and it is very hard to unlearn. Identity is an index.
- GLM uses **sigmoid** expert scoring; the maths is deliberately not shown. Do
  not put score values on screen unless measured from activations.
- 288 routed + 1 shared, **top-8**. `GROUND_TRUTH.md`.
- The router reads the hidden state **after** attention. That ordering is the
  crux of the whole video and beat 11 says it out loud.

## Frames

- The router was on screen unlabelled from §2 beat 1. Naming it here is the
  payoff of that patience — **function before name**.
- The scoring sweep is `measure` (blue) across all 288, and it must visibly
  touch every one. If it only sweeps the winners, the frame lies.
- Chosen experts keep their family colour and gain an ink ring; the rest go
  flat beige. No new hue. `art-direction/CAST.md`.

## Assets

| Need | Status |
| --- | --- |
| `Hospital` with a `scoring` sweep | have |
| `FrontDesk` named + ringed | have |
| shared-expert glyph | **extend** `Specialist` — dashed, neutral |
