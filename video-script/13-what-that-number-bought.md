# Section 13 — What that number actually bought

## Contract

| | |
| --- | --- |
| Enters on | it's a price, not a wall. So what did "18 billion active" actually get us? |
| Answers | **compute, not memory** — and the finer the experts, the wider the gap |
| Exits on | *(none — the thesis lands)* |
| Target | ~12 beats · ~1:15 |

## The job

Not a recap. A viewer who wanted a recap stopped at §11. This section **spends
the six deposits** the mechanism sections made, and answers the question from
minute one in a way that is now unarguable, because they watched every step.

The answer is split, and the split is the whole video:

> **True about compute. Never true about memory.**

## The script

> **1.** So. Eighteen billion active.
>
> **2.** Here's what that number is actually telling you.
>
> **3.** *(the work bar, small)* Per word, this thing does the thinking of a
> model about a twentieth of its size. That's real. That's why it's quick, and
> why it's cheap to run per word. **That part is completely true.**
>
> **4.** *(the whole model, heavy)* But all of it still has to be within reach.
> Because it never knows which part it wants until the moment it wants it.
>
> **5.** So: **"active parameters" is a compute number.** It was never a memory
> number.
>
> **6.** *(both, side by side)* Sparse routing buys you compute. It doesn't buy
> you memory.
>
> **7.** And here's the part I didn't expect. *(two models appear)* This model
> has a hundred and twenty billion parameters, and it fits on one chip. This one
> has three hundred and twenty, and needs four.
>
> **8.** Both of them use about five percent of themselves to answer you.
>
> **9.** The difference is that this one is chopped finer. More experts, smaller
> each.
>
> **10.** Which is exactly **why it's better** — and exactly why it's harder to
> hold.
>
> **11.** So the better these models get at using less of themselves, the more
> of them you have to keep lying around.
>
> **12.** A three-hundred-and-twenty-billion-parameter model doing eighteen
> billion of work is still a three-hundred-and-twenty-billion-parameter model.
> It just isn't a three-hundred-and-twenty-billion-parameter **bill**. And
> that's the difference between something that's cheap to run — and something
> that's small.

## Line jobs

| Beat | Job |
| --- | --- |
| 1–2 | setup |
| 3 | **answer** — the true half, conceded generously and without hedging |
| 4 | **answer** — the false half |
| 5–6 | **answer** — the thesis, stated once, plainly |
| 7–10 | **answer** — the trend, with evidence. This is the *oh, now I see* |
| 11 | **answer** — the sentence the viewer repeats to someone else |
| 12 | **answer** — the landing |

## Rules

- **Be fair to the claim.** Beat 3 concedes what is genuinely true with no
  hedge. A verdict that only convicts reads as a debunk, and a debunk is a
  worse video than an explanation.
- **No new mechanism.** Anything needing explanation here belonged earlier.
- Beats 7–10 are the only place the second model appears. It is **evidence**,
  not a hook — and it earns its place because the viewer now knows what
  "chopped finer" costs.
- Beat 11 is the thesis line. It should be sayable from memory a week later.
- The word **"efficient"** may appear on screen at beat 5 in `claim` orange.
  That is one of its three budgeted uses. `art-direction/PALETTE.md`.

## Truth notes

| | gpt-oss-120b | this model |
| --- | --- | --- |
| Total | 116.8B | 321B |
| Active | 5.1B (**4.4%**) | 18B (**5.6%**) |
| Experts per sparse layer | 128 | **288** |
| Footprint | ~58 GiB (MXFP4) | ~306 GiB (FP8) |
| Fits on | **one** 80 GB chip | **four** |

- Say **"about five percent"** of both. Putting 4.4 and 5.6 on screen invites a
  comparison the beat does not need.
- **"One chip", not "one graphics card."** An 80 GB accelerator is not a gaming
  GPU, and the consumer figure exists only with offloading — which is §12's
  material.
- Honest at 4-bit too: ~58 GiB against ~153 GiB. One against two. The direction
  never reverses, which is why beat 11 is safe to say.

## Assets

| Need | Status |
| --- | --- |
| `CostBars` | have |
| the model, whole and heavy | have |
| two `ModelSheet`s with chip counts | **extend** — a compare state |
| `VerdictCard` | have |
