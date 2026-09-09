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
