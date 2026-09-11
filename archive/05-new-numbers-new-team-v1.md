# Section 05 — New numbers, new team

> **Built.** 11 beats, 0:54. Board: `storyboard/video-1/BOARD.md` (generated).
> Route: `/section-05` · in sequence: `/watch?section=5`

## Contract

| | |
| --- | --- |
| Enters on | With different numbers, would the router pick a different eight? |
| Answers | Yes. It scores all 288 against the row and takes the top eight. |
| **Event** | **The viewer picks the sentence, and watches the team change.** |
| Exits on | So this happens once per word — right? |
| Beats | **11 · 0:54** — built |
| Owns after | `top-8`, `shared expert` |
| Still forbidden | `bandwidth`, `VRAM` |

## The local hook — the one interaction in the video

This is where the viewer should *do* something, because this is the claim the
whole answer rests on and a claim you verified yourself is one you believe.

Two buttons: **"the dog barked"** / **"a hot dog"**. The viewer routes it and
watches the eight change. Same 288 experts, same model, different team.

Per `skills/ncase/NCASE_I_DO_AND_I_UNDERSTAND.md` — clicking is not thinking, so
this cannot be a "next" button in disguise. It has to be a **choice with a
consequence the viewer predicted**. Ask before they click: *which do you think
changes more?*

## The script

> **1.** Yes. And here's exactly how.
>
> **2.** *(the desk, the row, the 288)* The router has the row, and it has 288
> experts to choose from.
>
> **3.** It gives every single one of them a score. All 288.
>
> **4.** *(a sweep across the wall)* How well does this expert fit *these*
> numbers.
>
> **5.** Then it keeps the best eight. That's it. That's the whole decision.
>
> **6.** *(the eight land)* Eight, out of 288.
>
> **7.** Oh — and one more always works, every time, whatever the word.
>
> **8.** So: eight chosen, plus one always on.
>
> **9.** Now you try it. Two sentences. Same word in both. **Which team changes
> more — and how much?**
>
> **10.** *(viewer picks; the team re-lights)*
>
> **11.** Different numbers, different scores, different team. So this happens
> once per word. Right?

## Line jobs

| Beat | Job |
| --- | --- |
| 1–6 | answer — the mechanism, plainly |
| 7–8 | answer — the shared expert, cheap to add here |
| 9–10 | **turn** — the viewer proves it themselves |
| 11 | **hook** — a leading question, deliberately confident, so §6 can break it |

Beat 11 is written to be **wrong**. The viewer should agree with it. §6's first
beat takes it away.

## Truth notes

- An expert is a learned feed-forward block, **not** a specialty. Identity is a
  number, never "the maths expert".
- Scores shown are illustrative unless measured from activations.
- 288 routed + 1 shared, top-8. `research/glm/GROUND_TRUTH.md`.

## Assets

| Need | Status |
| --- | --- |
| scoring sweep across 288 | **build** — a `scoring` state on `Hospital` |
| one-floor interior view | **build** — `Floor`, the room rather than the facade |
| two-choice control | **build** — `RouteChoice`, reusable |
| shared expert glyph | extend `Specialist` — dashed, neutral |
