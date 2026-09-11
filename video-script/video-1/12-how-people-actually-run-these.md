# Section 12 — How people actually run these

**The honesty section.** Without it the video is contradicted by a
`llama.cpp` flag, and the audience most likely to comment is the audience that
already knows it.

## Contract

| | |
| --- | --- |
| Enters on | so you can't store only the active part. But people run big models on small machines. |
| Teaches | caching, and the memory-for-speed trade |
| Answers | experts repeat, so you keep the frequent ones close — and it genuinely works |
| → next | **but** with 12,096 expert slots there is no setting that is both small and fast |
| Target | ~14 beats · ~1:35 |

## The script

> **1.** So you can’t store only the active part. Except — people do run models like
> this on small machines. Right now. And they’re not lying about it.
>
> **2.** So what are they doing that we just failed to do?
>
> **3.** *(one word on screen)* Caching.
>
> **4.** Here's the thing we noticed all the way back at the start. Experts
> repeat. Not always — but often enough to matter.
>
> **5.** *(a couple stay lit between two words)* The next token quite often
> wants some of the same experts the last one did.
>
> **6.** So you don't fetch every time. You keep the ones that keep coming back
> in fast memory, and you only go to the drive for the ones you're missing.
>
> **7.** *(the cache filling)* And it works. Genuinely. On a model with eight
> experts on each floor, a small cache catches most of what you need.
>
> **8.** *(a slider appears)* Which turns the whole thing into one question.
> **How much do you keep close?**
>
> **9.** *(dragging up)* Keep more, and it's fast — but now you need a big
> machine again, which is the thing we were trying to avoid.
>
> **10.** *(dragging down)* Keep less, the machine gets small — and the misses
> pile up, and it crawls.
>
> **11.** And remember what we're choosing from. Two hundred and eighty-eight
> experts, on each of forty-two floors.
>
> **12.** *(the number builds)* Twelve thousand and ninety-six slots.
>
> **13.** There's no setting on that slider where it's both. That's the trade,
> and on a model chopped this fine the exchange rate is brutal.
>
> **14.** So you can run it on less. It’ll just be slow. That was never a wall — it’s
> a price.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the plan | — | the bars clear; a small machine slides in and runs, steadily, producing words | `SmallMachine` running | it works | S-14 |
| 2 | the plan | — | the machine keeps running while the numbers from §11 hang over it, unchanged | machine + 8 GB label | both true at once | S-04 |
| 3 | the plan | — | a box appears in the path between the drive and the machine | `ExpertCache`, empty | "cache" | S-04 |
| 4 | the plan | — | two words run through; a couple of the same blocks are used both times | two teams, overlap lit | some repeat | S-04 |
| 5 | the plan | — | those repeating blocks stay in the box instead of returning to the drive | `ExpertCache` filling | kept close | S-04 |
| 6 | the plan | — | the next word's fetches split: most come from the box, a few from the drive | short hops + long hops | hit / miss | S-04 |
| 7 | the plan | — | the machine speeds up; a small model tag appears on the box | machine faster, tag | 8 experts per floor | S-04 |
| 8 | the plan | — | a slider rises out of the floor under the box | `TradeSlider` | how much do you keep? | S-04 |
| 9 | the plan | — | the slider is dragged up: the box swells, the machine races, the machine's frame grows huge | slider high | fast, but big | S-15 |
| 10 | the plan | — | dragged down: the box shrinks, long hops multiply, the machine crawls | slider low | small, but slow | S-15 |
| 11 | the plan | — | the 288 wall and the 42 floors ghost in behind the box, dwarfing it | `Hospital` + `Tower` ghosted | 288 × 42 | S-09 |
| 12 | the plan | — | a count assembles from them and lands on the box | `Counter` | **12,096** slots | S-09 |
| 13 | the plan | — | the slider is dragged across its whole range; neither end ever shows both | slider sweeping | no good setting | S-15 |
| 14 | the plan | — | the slider settles mid-range; the machine runs, slowly, and keeps running | machine, slow, working | a price, not a wall | S-14 |

### Board notes

- **No camera moves.** We stay at the plan for the whole section, because the
  section is a *modification* of the thing we are already looking at. Moving
  would make the cache look like somewhere else.
- Beat 1 is the concession and it must be **generous** — the machine visibly
  works before any qualification arrives. We raise the objection ourselves,
  before the comments do.
- **The slider is the interaction of the video.** Ask before they drag —
  *"where would you put it?"* — so failing to find a good setting is the
  viewer's own discovery. `skills/ncase/NCASE_I_DO_AND_I_UNDERSTAND.md`.
- Beat 7's tag is load-bearing honesty: the reassuring cache numbers are
  measured on **8 experts per floor**, and beat 11 is what that means here.
- **Beat 14 is the video's honesty and may not be cut.** The machine is still
  running at the end of this section. Slowly, but running.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1–2 | **turn** — the objection, raised by us before the comments raise it |
| 3–7 | **answer** — caching, conceded generously. Beat 7 admits it *works* |
| 8 | **turn** — the trade, made operable |
| 9–10 | **answer** — both ends of the slider, both bad |
| 11–12 | **answer** — the number that sets the exchange rate |
| 13–14 | **answer** — the honest verdict: a price, not a wall |

## Truth notes — mandatory

- **Cite the regime.** The reassuring cache figures — 44.2% consecutive-token
  sharing, LRU-128 hitting ~81% — are measured on **Mixtral 8×7B: 8 experts,
  top-2**, where chance alone is 12.5%. The authors' own summary is that
  locality *"does exist, but it is not strong"*. Beat 7 therefore says "on a
  model with eight experts on each floor" — that qualifier is load-bearing.
- **No number on this model's overlap.** Nobody has published it for 288
  experts at top-8. Beat 5 says "quite often" and shows a couple staying.
  `research/glm/OFFLOADING_AND_LOCALITY.md`.
- **Beat 14 is the video's honesty and may not be cut for time.** People run
  `gpt-oss-120b` on a 24 GB card with expert offloading today.
- The slider must be **real** — a control the viewer drags, not an animation of
  one. A trade you operate yourself is a trade you believe.

## Frames

- **The slider is the interaction of the video.** Per
  `skills/ncase/NCASE_I_DO_AND_I_UNDERSTAND.md`, clicking is not thinking: ask
  before they drag — *"where would you put it?"* — so failing to find a good
  setting is **their** discovery, not our assertion.
- Both ends must be visibly bad in a way that reads with the sound off: big
  machine, or slow machine.
- 12,096 lands as a built number, the way 336 did in §7.

## Assets

| Need | Status |
| --- | --- |
| expert cache, filling and evicting | **build** — `ExpertCache` |
| **the slider** — memory against speed | **build** — `TradeSlider`. The most important thing left to build |
| `Store` / `FastMemory` / `FetchPath` | have |
| `Counter` to 12,096 | have |
