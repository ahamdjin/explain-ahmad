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

> **1.** Except — people **do** run models like this on small machines. Right
> now. And they're not lying about it.
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
> **14.** So you **can** run it on less. It'll just be slow. That was never a
> wall — it's a price.

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
