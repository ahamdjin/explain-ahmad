# Section 12 — How people actually run these with less fast memory

Status: **STORY PASS — narration-first.** This section is the correction to §11's deliberately naive no-cache fetch plan.

## Contract

| | |
| --- | --- |
| Enters on | **if fetching every selected expert from slow storage is terrible, how can offloading work at all?** |
| Teaches | expert caching, hits/misses, offloading, prefetch intuition, memory↔speed trade |
| Answers | keep some expert weights close, fetch misses, optionally prefetch; less resident memory is possible at a latency/bandwidth cost |
| Exits on | **if active parameters are not a direct memory promise, what did sparsity buy us?** |

## Narration

The mistake in our last plan was not **offloading**.

It was pretending we had to fetch every selected expert from the slowest place, every single time.

Real systems can be smarter than that.

The simplest improvement is a **cache**.

Keep some expert weights in fast memory.

When the router asks for an expert that is already there...

that is a **hit**.

No long trip needed.

If the expert is not there...

that is a **miss**.

Then you fetch it from slower memory or storage, use it, and decide what should stay close.

And systems can get smarter still.

They can move experts between levels of memory.

They can overlap transfers with computation.

And some approaches try to **predict or prefetch** experts before the router fully needs them.

So yes:

**you can run a large MoE model without keeping every weight in the fastest memory.**

But now we have a trade.

Keep more experts close...

and you need more fast memory, but you fetch less.

Keep fewer experts close...

and the machine can fit into less fast memory, but you risk more misses and more waiting.

So where is the perfect setting?

This is where I do **not** want to fake certainty.

It depends on the hardware.

It depends on the workload.

And it depends on how predictable and repetitive the expert choices actually are.

For smaller MoE architectures, expert locality and caching have been measured and exploited.

But for the specific **288-expert, top-8** routing regime we are using here, I do not have a published GLM-specific locality measurement that lets me tell you:

“keep exactly this many experts and you’ll get exactly this hit rate.”

That number would be made up.

What we *can* say is that GLM has:

**288 routed experts × 42 sparse layers = 12,096 layer-specific expert slots.**

Only eight routed experts are selected in each sparse layer for a token...

but which eight matters for what has to be nearby next.

So the amount of fast memory you need is not determined by the **5.6% active** headline alone.

You can use less fast memory.

You can offload.

You can cache.

You can quantize.

You can shard the model across devices.

But every one of those choices changes the performance trade.

Which brings us back to the number that started this whole video.

If “18 billion active” was never a direct promise about memory...

**what did it actually buy us?**

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — hits and misses (beats 1–5)

> **1.** *(The empty shelf from §11 fills with a few expert blocks. Store left, compute right.)* The mistake in our last plan was not offloading. It was pretending we had to fetch every selected expert from the slowest place, every single time. Real systems can be smarter than that. The simplest improvement is a cache. Keep some expert weights in fast memory.
>
> **2.** *(A requested block is already on the shelf and makes a short hop.)* When the router asks for an expert that is already there... that is a hit. No long trip needed.
>
> **3.** *(The next request is absent, travels the long way, and lands in the cache.)* If the expert is not there... that is a miss. Then you fetch it from slower memory or storage, use it, and decide what should stay close.
>
> **4.** *(Several requests run quickly — some short, some long. No hit-rate figure appears.)* And systems can get smarter still. They can move experts between levels of memory. They can overlap transfers with computation.
>
> **5.** *(A faint second path starts a block moving before it is asked for.)* And some approaches try to predict or prefetch experts before the router fully needs them. So yes: you can run a large MoE model without keeping every weight in the fastest memory.

### Act 2 — the trade (beats 6–9)

> **6.** *(A slider appears between the store and the compute side, sitting in the middle.)* But now we have a trade.
>
> **7.** *(Dragged one way: the shelf grows, long trips thin out, the footprint grows.)* Keep more experts close... and you need more fast memory, but you fetch less.
>
> **8.** *(Dragged the other way: the shelf shrinks, long trips multiply, the machine slows.)* Keep fewer experts close... and the machine can fit into less fast memory, but you risk more misses and more waiting.
>
> **9.** *(The slider returns to the middle and stops. Nothing resolves it.)* So where is the perfect setting? This is where I do not want to fake certainty.

### Act 3 — what can and cannot be said (beats 10–12)

> **10.** *(The things the answer depends on appear around the slider instead of a value on it.)* It depends on the hardware. It depends on the workload. And it depends on how predictable and repetitive the expert choices actually are.
>
> **11.** *(The routing geometry ghosts in behind: 288 slots on each of 42 sparse floors.)* For smaller MoE architectures, expert locality and caching have been measured and exploited. But for the specific 288-expert, top-8 routing regime we are using here, I do not have a published GLM-specific locality measurement that lets me tell you: “keep exactly this many experts and you’ll get exactly this hit rate.” That number would be made up. What we can say is that GLM has: 288 routed experts × 42 sparse layers = 12,096 layer-specific expert slots.
>
> **12.** *(The headline percentage is set against that geometry.)* Only eight routed experts are selected in each sparse layer for a token... but which eight matters for what has to be nearby next. So the amount of fast memory you need is not determined by the 5.6% active headline alone.

### Act 4 — the options, and the old number (beats 13–14)

> **13.** *(The machine keeps running at a reduced setting while the options are labelled around it.)* You can use less fast memory. You can offload. You can cache. You can quantize. You can shard the model across devices. But every one of those choices changes the performance trade.
>
> **14.** *(The memory machinery recedes and the opening card floats back to centre.)* Which brings us back to the number that started this whole video. If “18 billion active” was never a direct promise about memory... what did it actually buy us?

---

## Storyboard

There is **one paper stage for all 14 beats**. §11 leaves a cache shelf outlined
between the expert store and the compute path; that exact shelf fills here.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | the empty shelf from §11 fills with a few expert blocks | store · cache · compute | keep some close | S-14 |
| 2 | the paper stage | — | a requested block is already on the shelf and makes a short hop | short path | `HIT` | S-04 |
| 3 | the paper stage | — | the next request is absent, travels the long way, and lands in the cache | long path + cache update | `MISS` | S-04 |
| 4 | the paper stage | — | several requests run quickly, some short and some long | mixed traffic, no figures | no fake hit rate | S-04 |
| 5 | the paper stage | — | a faint second path starts a block moving before it is asked for | early transfer | `prefetch` | S-04 |
| 6 | the paper stage | — | a slider appears between store and compute, sitting in the middle | the trade control | now we have a trade | S-14 |
| 7 | the paper stage | — | dragged one way the shelf grows and long trips thin out | more cache | more memory, less fetching | S-04 |
| 8 | the paper stage | — | dragged the other way the shelf shrinks and the machine slows | less cache | less memory, more waiting | S-04 |
| 9 | the paper stage | — | the slider returns to the middle and stops, with nothing resolving it | slider unresolved | where is the perfect setting? | S-05 |
| 10 | the paper stage | — | the things the answer depends on appear around the slider | hardware · workload · locality | no faked certainty | S-15 |
| 11 | the paper stage | — | the routing geometry ghosts in behind the slider | 288 × 42 slots | 12,096 expert slots | S-04 |
| 12 | the paper stage | — | the headline percentage is set against that geometry | 5.6% vs 12,096 | not a memory promise | S-01 |
| 13 | the paper stage | — | the machine keeps running while the options are labelled around it | offload · cache · quantize · shard | all of them trade | S-04 |
| 14 | the paper stage | — | the memory machinery recedes and the opening card floats back to centre | `18B active` alone | what did it buy us? | S-14 |

## Carrying frames

- **Beat 3:** one short trip and one long trip, side by side.
- **Beat 9:** a slider with no correct position marked on it.
- **Beat 12:** `5.6% active` against `12,096 slots` — the headline losing its memory claim.

## Truth / implementation notes

- Expert caching/offloading is real; do not imply the full model must always reside in GPU VRAM.
- Expert selections can have locality/predictability, and prefetch research exists, but project research does **not** provide a published GLM-5.3-Flash locality/hit-rate measurement for 288 routed experts / top-8.
- Therefore do not claim a specific optimal cache size, hit rate, or exact GLM slowdown from offloading.
- `288 × 42 = 12,096` is the number of **layer-specific routed expert slots**. It is not the number active at once and not evidence that caching fails.
- The safe conclusion is a trade: less fast-resident memory is possible, usually by spending bandwidth/latency/complexity.

## Sound-compatible actions

- beat 2: a short hop
- beat 3: the long haul
- beat 4: short and long, interleaved
- beat 7: the shelf growing
- beat 9: everything stopping
