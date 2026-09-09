# Section 11 — So could you store only the 18 billion?

**The payoff begins here.** Everything before this exists to make this section
arithmetic the viewer can follow, rather than a claim from authority.

## Contract

| | |
| --- | --- |
| Enters on | it never stops choosing. So could you store only the part it uses? |
| Teaches | memory vs storage |
| Answers | no — you would fetch about 8 GB per word, against milliseconds of actual work |
| → next | **but** people run models like this on small machines every day |
| Target | ~13 beats · ~1:25 |

## The numbers — `research/glm/GROUND_TRUTH.md`

| | |
| --- | --- |
| One expert | ~26 MB |
| Expert visits per token | 336 |
| **Routed weight per word, if not resident** | **~8 GB** |
| Off a fast drive at ~5 GB/s | **~1.6 s** |
| The compute itself | milliseconds |
| Penalty | **~50×** |

## The script

> **1.** Back to where we started. Eighteen billion out of three hundred and
> twenty.
>
> **2.** And here's the plan, stated honestly: keep the whole model on a drive.
> When the router picks its eight, go and get those eight. Do the work. Move on.
>
> **3.** *(word one, floor one — it works)* First token, first floor. Eight
> experts fetched. It works.
>
> **4.** *(floor two)* Second floor. New row, new eight. Fetch those as well.
>
> **5.** Third floor. Again.
>
> **6.** *(accelerating, the counter climbing)* And again, and again — forty-two
> times, for one token.
>
> **7.** *(the counter stops at 336)* So how much did we actually carry in?
>
> **8.** One expert is about twenty-six megabytes. Three hundred and thirty-six
> of them is **about eight gigabytes**.
>
> **9.** For one word.
>
> **10.** Off a fast drive, that's **roughly a second and a half**. For one
> word.
>
> **11.** *(two bars appear)* And the work those eight experts actually did?
> *(beat)* Milliseconds.
>
> **12.** *(the bars, to scale)* There it is. **The fetching costs more than the
> thinking.** Not a bit more — hundreds of times more.
>
> **13.** So, no. You can't just store the eighteen billion. Not like that.

## Line jobs

| Beat | Job |
| --- | --- |
| 1–2 | setup — the plan, stated with no editorial |
| 3 | **turn** — **it works.** Essential: a plan that never worked cannot break |
| 4–6 | **turn** — the repetition becomes the problem |
| 7–10 | answer — arithmetic, one step at a time |
| 11–12 | **answer** — the verdict as a picture, not a sentence |
| 13 | answer — plainly, and "not like that" is doing real work |

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
