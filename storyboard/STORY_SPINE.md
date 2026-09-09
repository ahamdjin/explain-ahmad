# Story spine — v2

Status: **the promise is chosen; the chain is rewritten to pay it off.**

Supersedes `archive/STORY_SPINE-claim-on-trial-v1.md` (the claim-on-trial
version, 8 sections, built and shipped as 96 beats / 8:04). What forced the
rewrite is in `research/glm/OFFLOADING_AND_LOCALITY.md`: v1's Section 07 was
about to claim you cannot run this on less memory, and people run large MoE
models on small cards every day. v1 also opened on a product name and reached
its hook at 0:19, against research saying 30–40% of viewers are gone by 0:30
(`research/RETENTION_AND_ANGLE.md`).

---

## 1. The promise

Made in the first fifteen seconds, and it is the whole video:

> **Two models. Both use about five percent of themselves to answer you. One
> runs on a single graphics card. The other needs four.**
>
> So the number everybody quotes — *"only 18 billion active"* — is not telling
> you what you think it is.

| | gpt-oss-120b | GLM-5.3-Flash |
| --- | --- | --- |
| Total | 116.8B | 321B |
| Active per word | 5.1B | 18B |
| **Share active** | **4.4%** | **5.6%** |
| Experts per sparse layer | 128 | **288** |
| Routing | top-4 | **top-8** |
| Footprint as shipped | ~58 GiB (MXFP4, 4.25 bit) | ~306 GiB (FP8) |
| **Fits on** | **one 80 GB GPU** | **four** |
| Squeezed to 4-bit | ~58 GiB | ~153 GiB — still two |

Sources: [gpt-oss model card](https://arxiv.org/pdf/2508.10925) ·
[gpt-oss repo](https://github.com/openai/gpt-oss) · `research/glm/GROUND_TRUTH.md`

The contradiction is honest at either precision, which is what makes it safe to
open on. Say "about five percent" — 4.4 and 5.6 are the same claim.

## 2. The spine

| | |
| --- | --- |
| **The want** | Everybody quotes *"320 billion parameters, only 18 billion active."* I want to know what that number actually buys — because two models with the same number need wildly different machines. |
| **The wall** | Which experts are needed is decided from the word's *current* numbers, and those numbers change at every one of the 42 sparse layers. So the set is unknowable in advance and changes 42 times per word. And the trick that rescues this on other models — cache the ones that keep coming back — has almost nothing to grip when there are **288 experts per layer and 12,096 slots**. |
| **The thesis** | **"Active parameters" is a compute number, not a memory number.** Sparse routing buys compute, not memory — and the finer you slice the experts, the more true that gets. |

### Why the thesis is worth eight minutes

Fine-graining is not a mistake. More experts, smaller each, is *why* modern MoE
models are good — better specialisation, better load balance. It is also
precisely what defeats the caching trick that lets people run Mixtral on a
laptop. **The better these models get at being sparse, the harder they get to
hold.** Nobody has made that video.

## 3. What the viewer thinks they already know

This decides everything, because the audience for an MoE video believes it
understands MoE:

> *"Only a few parts run, so you only need to load a few parts. That's the
> whole point. It's cheaper."*

They are **right about the compute and wrong about the memory**, and they will
not be moved by being told. They have to watch the reasonable version of their
own idea get built, work, and then fail for a reason they can see. That is what
Sections 6 and 7 are for, and it is why they get 27% of the runtime.

## 4. The chain — 8 sections

Each section: `Enters on` = previous `Exits on`, and `Exits on` ≠ `Enters on`.
Checked by `npm run check:chain`.

| # | Section | Answers | Event — what *happens* | Exits on |
| --- | --- | --- | --- | --- |
| 1 | **The number that lies** | what "active" is, and why the other 300B isn't waste → **options** | a second word picks a different eight — **and some of the first eight stayed** | if some keep coming back, why not keep the popular ones close and fetch the rest? |
| 2 | **What the chooser reads** | a long row of numbers standing for the word | **the router never looks at the word** — and the row is identical every time | the row never changes. So how did the team change? |
| 3 | **Where the numbers change** | the word gathers context from its neighbours | "the dog barked" vs "a hot dog" → two different rows | would different numbers pick a different eight? |
| 4 | **New numbers, new team** | yes — scored against the row, top eight | **the viewer picks, and watches the team change** | how many times does this happen? |
| 5 | **Forty-two floors** | 42 sparse layers × 8 = **336 visits per word** | the room is one floor of 45; the counter runs to 336 | then how does anyone run one of these at home? |
| 6 | **The plan, and the jam** | the naive fetch: ~8 GB per word, ~1.6 s, against milliseconds of work | **the plan from §1 is run, works once, then jams** | but people *do* run these. So what are they doing that we aren't? |
| 7 | **The trick, and the exchange rate** | caching. Experts repeat, so keep the hot ones nearby — it genuinely works, and it is what people actually do | **the viewer drags a slider — how much do you keep close — and cannot find a setting that is both small and fast** | so what did "18 billion active" ever buy? |
| 8 | **The verdict** | compute, not memory — and more so every generation | the two models from §1 return, side by side | *(none — the thesis lands)* |

### The load-bearing structure

- **§1's promise is §8's payoff.** The two models open the video and close it.
- **§1's event is §7's seed.** "Some of them stayed" is what makes caching the
  obvious idea, and caching is what §7 has to defeat honestly.
- **§7 is a trade, not a wall.** You *can* trade memory for speed — that is
  exactly what offloading is. The video's job is to show the **exchange rate**,
  and that on a model this fine-grained there is no setting that is both small
  and fast. A slider the viewer cannot win is a stronger proof than any bar
  chart, and it is the honest shape of the problem.
- **§5 exits into §1's promise.** *How does anyone run these at home?* is the
  question the opening planted, arriving on schedule.
- **The payoff gets two sections, not one.** v1 spent 16% of runtime on the
  answer. This spends 27%, because the answer is the only part that changes
  someone's mind.

## 5. What changed from v1, and why

| | v1 | v2 |
| --- | --- | --- |
| Open | *"This is GLM-5.3-Flash."* Hook at 0:19 | the two-model contradiction. Promise by 0:12 |
| Want | the word "efficient" on trial | the number everyone quotes, and what it buys |
| §1 event | "a **completely** different eight" | a different eight, **with the overlap shown** — true, and it seeds §7 |
| Old §2 | 46 s, answered nothing, sat at the most fragile point in the video | **folded into §2** — its event survives, the corridor does not |
| The answer | one section, 1:16 | **two sections** — the naive jam, then the clever fix and its limit |
| Thesis | compute not memory | compute not memory, **and it worsens with granularity** |
| Honesty | implied you cannot offload | concedes offloading works, then shows where it runs out |

The old §2's reveal — *the router never looks at the word* — was too good to
lose and too thin to carry 46 seconds. It now opens §2 and buys its keep in ten.

## 6. Two things we may not claim

**We may not put a number on expert overlap for this model.** The 44.2%
consecutive-token figure and the LRU hit rates are measured on Mixtral 8×7B —
8 experts, top-2. Nobody has published the equivalent for 288 experts at top-8.
So §1 says *"some of them keep coming back"* and shows a couple staying. It
never says how many, and no on-screen number claims a fraction.

**We may not say the fetch is impossible.** It is a trade with a bad exchange
rate, and §7 must be built as a trade. Anything stronger is contradicted by a
`llama.cpp` flag — see `research/glm/OFFLOADING_AND_LOCALITY.md`.

Both restrictions make the video better. A trade the viewer can operate is more
convincing than a wall they have to accept.

## 7. Foundation files

| File | Holds |
| --- | --- |
| `skills/STORY_STRUCTURE.md` | the five gates, run before any art |
| `skills/PRODUCTION_ORDER.md` | script → frames → animation, and line jobs |
| `research/RETENTION_AND_ANGLE.md` | why anyone stays; the competitive field |
| `research/glm/OFFLOADING_AND_LOCALITY.md` | **the correction that produced v2** |
| `research/glm/GROUND_TRUTH.md` | every on-screen number about this model |
| `storyboard/VOCABULARY_LEDGER.md` | what the viewer owns per section |
| `storyboard/SECTION_MAP.md` | per-section detail |
