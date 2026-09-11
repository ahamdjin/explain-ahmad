# Section 11 — So could you store only the 18 billion?

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
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 11`

**The payoff begins here.** Everything before this exists to make this section
arithmetic the viewer can follow, rather than a claim from authority.

## Contract

| | |
| --- | --- |
| Enters on | it never stops choosing. So could you store only the part it uses? |
| Teaches | memory vs storage |
| Answers | no — you would fetch about 8.5 GB per word, against milliseconds of actual work |
| Exits on | so you can't store only the active part. But people run big models on small machines. |
| → next | **but** people run models like this on small machines every day |
| Target | ~13 beats · ~1:25 |

## The numbers — `research/glm/GROUND_TRUTH.md`

| | |
| --- | --- |
| One expert | ~25 MB |
| Expert visits per token | 336 |
| **Routed weight per word, if not resident** | **~8.5 GB** |
| Off a fast drive at ~5 GB/s | **~1.6 s** |
| The compute itself | milliseconds |
| Penalty | **~50×** |

## What changed from v8

**1. A stale beat survived a patch, at the worst possible place.** The script
carried *both* "about twenty-six megabytes / about eight gigabytes" **and**
"about twenty-five / eight and a half" — the measured line had been written one
beat too low, leaving the superseded number in front of it and overwriting
*"For one token."* entirely. Two different figures for the same quantity, four
beats apart, in the section that is the video's answer.

It survived because the agreement check only ran one way: it asked whether
every built line appears in the script, never whether the script contains a
line the build does not. `scripts/drift.mjs` now checks both directions.

**2. The closing beat carried three jobs.** *The answer*, *the tease*, and
*hold that thought* were one 32-word beat. They are now beats 13–15, and the
tease gets its own frame — which matters more than it looks, because **§12's
whole reversal depends on the viewer actually leaving here believing caching
will save them** (S-09). A belief planted in a subordinate clause is not a
belief.

## The script

### Act 1 — banking the loop, then the plan (beats 1–2) · **S-14**

> **1.** *(everything from §10 still halted)* It re-chooses — every floor, every
> word, and it never stops. So: back to where we started. Could you just store
> the part it actually uses?
>
> **2.** *(a drive appears; the model settles onto it)* And here's the plan,
> stated honestly: keep the whole model on a drive. When the router picks its
> eight, go and get those eight. Do the work. Move on.

### Act 2 — the plan, working (beats 3–7) · **S-04**

> **3.** *(word one, floor one — it works)* First token, first floor. Eight
> experts fetched. It works.
>
> **4.** *(floor two)* Second floor. New row, new eight. Fetch those as well.
>
> **5.** *(floor three)* Third floor. Again.
>
> **6.** *(accelerating, the counter climbing)* And again, and again — forty-two
> times, for one token.
>
> **7.** *(the counter stops at 336)* So how much did we actually carry in?

### Act 3 — the arithmetic nobody does (beats 8–9) · **S-15**

> **8.** *(336 and 25 MB slide together; a total assembles)* One expert is about
> twenty-five megabytes, at the precision this thing ships in. Three hundred and
> thirty-six of them is about eight and a half gigabytes.
>
> **9.** *(the total holds, alone)* For one token.

### Act 4 — against milliseconds of work (beats 10–12) · **S-04**

> **10.** *(a clock runs beside the total)* Off a fast drive — call it five
> gigabytes a second — that's the better part of two seconds. For one token.
>
> **11.** *(two bars appear)* And the expert computation itself? Milliseconds.
>
> **12.** *(the bars, to scale)* There it is. **The fetching costs more than the
> thinking.** Not a bit more — about fifty times more.

### Act 5 — the answer (beat 13) · **S-14**

> **13.** *(the bars hold; nothing else on screen)* So, no. You can't just store
> the part it uses. Not like that.

### Act 6 — a thread left hanging (beats 14–15) · **S-08**

> **14.** *(a small cache shelf sketches itself in beside the bars)* Although —
> if you're sitting there thinking *"just keep the popular ones nearby"* —
>
> **15.** *(the shelf stays, drawn but empty)* Hold that thought. You're right.
> That's next.

Beats 14–15 are not a tease for its own sake. **§12's reversal only works if the
viewer arrives there believing caching solves this** — S-09 requires a belief
*this video taught them*, not one they brought. So the belief has to be planted
deliberately, in its own frame, and it has to be endorsed: *you're right*.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the plan | **pull back** | the tower and reply recede; a drive and a router sketch themselves as a plan | `Drive`, `Tower` small | the proposal | S-14 |
| 2 | the plan | — | the whole model settles onto the drive; a path draws from drive to floor | `Drive` + path | keep it on disk | S-14 |
| 3 | the plan | — | eight experts travel the path and land on floor one; it runs | 8 moving, floor lit | it works | S-04 |
| 4 | the plan | — | floor two asks for a different eight; they travel too | 8 more moving | new eight | S-04 |
| 5 | the plan | — | floor three, again, slightly faster | 8 more | again | S-04 |
| 6 | the plan | — | the remaining floors blur past, the counter climbing | fast climb, `Counter` | 42 times | S-04 |
| 7 | the plan | — | the counter stops dead | `Counter` | **336** | S-04 |
| 8 | the plan | — | 336 and 25 MB slide together and a total assembles | `Counter` × size | **~8.5 GB** | S-15 |
| 9 | the plan | — | everything else clears; the total sits alone | the total | for one word | S-15 |
| 10 | the plan | — | a clock runs beside the total and stops | `Clock` | ~2 s | S-04 |
| 11 | the plan | — | two bars appear, one for fetching, one for the work | `CostBars`, work tiny | ms vs s | S-04 |
| 12 | the plan | — | the bars redraw to true scale; the work bar nearly vanishes | `CostBars` to scale | about 50× | S-04 |
| 13 | the plan | — | the bars hold; nothing else on screen | `CostBars` | the answer | S-14 |
| 14 | the plan | — | a small cache shelf sketches itself in beside the bars | `ExpertCache`, outline | "keep some close" | S-08 |
| 15 | the plan | — | the shelf finishes drawing and stays, empty | `ExpertCache`, empty | held open | S-08 |

### Board notes

- **One camera move**, at beat 1, and it earns the change from outside the
  tower to the plan. Beats 2–15 are still.
- **Beat 9 holds the total alone.** Eight and a half gigabytes, nothing else on
  screen, for one word. The number has to be allowed to sit there — it is the
  video's answer and the only frame where it is uncontested by anything else.
- **Beat 12's bars must be drawn to true scale**, not to a readable scale. The
  work bar nearly vanishing is the argument; a bar chart that keeps both
  legible is a bar chart that softens the finding.
- **Beats 14–15 exist for §12, not for §11.** The shelf is drawn, labelled and
  left **empty**, and it stays on screen into the next section. §12 beat 1 picks
  up this exact object rather than introducing a cache of its own — and §12's
  reversal only lands if the viewer leaves here holding the belief that caching
  solves this. That is why beat 15 endorses it out loud: *you're right.*
- **The precision is stated on screen at beat 8.** ~25 MB is the FP8 figure and
  the frame says so, because the number is only true at a stated precision.
  This was the one criticism a GPT review landed on the built video, and it was
  right. `research/glm/TOKENIZER.md`.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank** — it never stops re-choosing. So could we? |
| 2 | setup — the plan, stated fairly |
| 3–6 | **teach** — the plan working, floor after floor |
| 7 | **ask** — so how much did we carry? |
| 8–9 | **the answer** — ~8.5 GB, for one word |
| 10–12 | **the comparison** — against milliseconds of work |
| 13 | **the wall** — no, not like that |
| 14–15 | **plant** — the belief §12 takes away |

## Truth notes — mandatory

- **Never claim all 320B must sit in GPU VRAM.** Real systems shard, cache,
  quantize and offload. The honest claim is that efficient serving needs *fast
  access* to whichever experts routing picks.
- ~1.6 s is derived from a typical SSD rate. **Say "roughly".** Confirm
  `moe_intermediate_size` before recording.
- Beat 13's **"not like that"** is the hinge into §12 and is not optional. It is
  what stops this section from being the overclaim the earlier drafts made. See
  `research/glm/OFFLOADING_AND_LOCALITY.md`.
- 18B active is the path across the **whole model**, not eight experts in one
  layer.

## Frames

- The plan must be drawn **identically** to §1 beat 13. The callback only works
  if it is the same object.
- Beat 12's two bars are the most important prop in the video and must be **to
  scale**. If milliseconds against 1.6 s cannot be drawn honestly on one frame,
  the small bar gets a magnified inset — never a fudged ratio.
- Cost bars are `cost` (red). `art-direction/PALETTE.md`.

## Assets

| Need | Status |
| --- | --- |
| §1's `Plan`, rebuilt verbatim | have |
| `Store` (drive) and `FastMemory` | have |
| `FetchPath` with a congested state | have |
| **`CostBars`, to scale** | have |
