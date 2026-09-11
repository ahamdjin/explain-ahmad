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

> **1.** It re-chooses — every floor, every word, and it never stops. So: back to
> where we started. Could you just store the part it actually uses?
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
> **13.** So, no. You can’t just store the eighteen billion. Not like that. Although —
> if you’re sitting there thinking 'just keep the popular ones nearby', hold
> that thought. You’re right. That’s next.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | outside the tower | — | the reply clears; `18` and `320` return and settle over the tower | `ModelSheet` over `Tower` | 18 / 320 | S-14 |
| 2 | the plan | **pan** | we slide across to the plan from §1, assembling itself piece by piece | `Store`, `FrontDesk`, `SmallMachine` | drive → router → eight → machine | S-04 |
| 3 | the plan | — | eight blocks fly from the drive into the machine; the work completes; a tick lands | `FetchPath` active | floor 1 — it works | S-04 |
| 4 | the plan | — | eight *different* blocks fly across | `FetchPath`, new eight | floor 2 | S-04 |
| 5 | the plan | — | eight more | `FetchPath` | floor 3 | S-04 |
| 6 | the plan | — | the flights speed up until the path is continuously full | `FetchPath` `congested` | 42 times, one token | S-04 |
| 7 | the plan | — | the flights stop; a counter lands | `Counter` | **336** | S-04 |
| 8 | the plan | — | 336 and 26 MB slide together; a total assembles | `Counter`, arithmetic | 336 × 26 MB | S-04 |
| 9 | the plan | — | the total lands and a label drops under it | `BigNumber`, `Note` | **~8 GB** — for one word | S-15 |
| 10 | the plan | — | a clock draws itself beside the 8 GB and runs | clock, `Counter` | **~1.5 s** | S-08 |
| 11 | the plan | — | a second bar appears beside the first, almost invisible | `CostBars`, work bar | milliseconds | S-09 |
| 12 | the plan | — | both bars redraw to true scale; the small one needs a magnified inset to be visible at all | `CostBars` to scale | fetch vs work | S-04 |
| 13 | the plan | — | the bars hold, then a small cache shelf sketches itself in and stays | `CostBars` + `ExpertCache` ghost | — | S-08 |

### Board notes

- **One camera move**, beat 2, and it takes us to a place the viewer already
  knows — the plan from §1. It must be drawn **identically**, or the callback
  does no work.
- **Beat 3 has to visibly succeed**, with a tick. A plan that never worked
  cannot break, and the failure has to be a discovery rather than a lecture.
- **Beat 12 is the most important frame in the video.** The two bars, to true
  scale. If milliseconds against 1.5 s cannot honestly share a frame, the small
  bar gets a **magnified inset with the magnification labelled** — never a
  fudged ratio. A dishonest bar chart here would undo the whole video.
- Beat 6's congestion is the only "jam" in the video and it is a **traffic**
  read — the path full, things queuing — never a barrier or a cross.
- Bars are `cost` red. `art-direction/PALETTE.md`.

---

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
