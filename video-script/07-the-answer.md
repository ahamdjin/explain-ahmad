# Section 07 — The answer

**The payoff.** Everything before this exists to make this section inevitable,
and this is the only section that has to change someone's mind.

Supersedes `08-why-it-cannot-fit.md`, which was written as an explanation rather
than as a scene.

## Contract

| | |
| --- | --- |
| Enters on | Could you fetch 336 different sets, per word, fast enough? |
| Answers | No. The fetching costs more than the work it does. |
| **Event** | **The plan from §1 is run, and it jams.** |
| Exits on | What did "18 billion active" ever buy? |
| Beats | ~13 · ~75s |
| Owns after | memory vs storage, `bandwidth`, `quantization` |

## How this section wins or loses

Not by asserting a bottleneck. **By racing two bars and letting the viewer read
the result.** The verdict has to arrive as arithmetic they followed, not as a
claim from authority.

The §1 plan is rebuilt exactly as it was — deliberately, frame for frame — and
then run. It works for the first word. It fails on the second. Letting it
succeed once is what makes the failure a discovery instead of a lecture.

## The numbers — `research/glm/GROUND_TRUTH.md`

| | |
| --- | --- |
| Routed weight to fetch, per word | **~8 GB** (336 × ~26 MB, cross-checked two ways) |
| Off an SSD at ~5 GB/s | **~1.6 seconds per word** |
| The compute itself | milliseconds |
| Penalty | **~50×** |
| Even at 4-bit, the full checkpoint | ~153 GiB — still very large |

## The script

> **1.** Let's actually try it. Here's the plan again, exactly as we had it.
>
> **2.** Everything in storage. The router calls in the eight it needs.
>
> **3.** *(word one — it works)* First word. Eight experts in. Done. It works.
>
> **4.** *(and again)* Floor two. New numbers, new eight — fetch those as well.
>
> **5.** Floor three. Again.
>
> **6.** *(accelerating, the counter climbing)* And again, and again, forty-two
> times, for one word.
>
> **7.** *(the counter stops at 336)* So how much are we actually carrying in?
>
> **8.** One expert is about twenty-six megabytes. Three hundred and thirty-six
> of them is **about eight gigabytes.** For one word.
>
> **9.** Off a fast drive, that's **roughly a second and a half.** For one word.
>
> **10.** *(the two bars appear)* And the actual work those experts do? *(beat)*
> Milliseconds.
>
> **11.** *(the bars, to scale)* That's the whole answer. **The fetching costs
> more than the work.** You'd spend all day carrying people in and out of the
> building.
>
> **12.** And you can't squeeze your way out of it either. Halve every number
> and the whole thing is still over a hundred and fifty gigabytes.
>
> **13.** So they stay. All of them, ready, all the time. Which leaves one last
> question: if we still need all of it sitting there — what did "eighteen
> billion active" ever actually buy us?

## Line jobs

| Beat | Job |
| --- | --- |
| 1–2 | setup — the plan, rebuilt with no editorial |
| 3 | **turn** — it works. Essential; a hope that never worked cannot be broken |
| 4–6 | **turn** — the repetition becomes the problem |
| 7–9 | answer — arithmetic, one step at a time |
| 10–11 | **answer** — the verdict, as a picture |
| 12 | answer — closes the obvious escape route |
| 13 | **hook** — exit into §8 |

## Truth notes — mandatory

- **Never claim all 320B must live in GPU VRAM.** Real systems shard, cache,
  quantize and offload. The truthful claim is that efficient serving needs
  *fast access* to whichever experts routing picks.
- The ~1.6s figure is derived from a typical SSD rate. Say "roughly", and
  confirm `moe_intermediate_size` before recording.
- `18B active` is the path across the whole model, not eight experts in one
  layer. Getting this wrong invalidates the section.

## Gates

| | |
| --- | --- |
| 1 · circularity | enters on *can you fetch fast enough*, exits on *what did active buy* — different **Pass** |
| 2 · event | the plan is run and jams **Pass** |
| 3 · escalation | beat 13 needs the whole chain to be askable **Pass** |
| 4 · setup/payoff | **this is the payoff of §1 beat 12.** The different-eight event planted in the opening is precisely what makes the fetch unpredictable and therefore fatal **Pass** |
| 5 · link | opens on §6's therefore, closes on a but **Pass** |

## Assets

| Need | Status |
| --- | --- |
| §1's plan, rebuilt | reuse `Plan` — must be visually identical |
| storage vs fast memory | **build** — `Store` (disk) and `FastMemory` |
| a fetch path that can jam | **build** — `FetchPath`, with a congested state |
| **two cost bars, to scale** | **build** — `CostBars`. The most important prop in the video |
| `Counter` to 336 | from §6 |
