# Section 12 — How people actually run these with less fast memory

Status: **STORY PASS — narration-first.** This section is the correction to §11's deliberately naive no-cache fetch plan.

## Contract

| | |
| --- | --- |
| Enters on | **if fetching every selected expert from slow storage is terrible, how can offloading work at all?** |
| Teaches | expert caching, hits/misses, offloading, prefetch intuition, memory↔speed trade |
| Answers | keep some expert weights close, fetch misses, optionally prefetch; less resident memory is possible at a latency/bandwidth cost |
| Exits on | **so what did “18B active” actually buy us?** |

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

## Storyboard — 13 beats

§11 leaves a cache shelf outlined between the expert store and compute path. Do not cut; fill that exact shelf.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | The empty cache shelf from §11 fills with a few expert blocks. Keep storage left and compute right. | **fill** existing cache; same plan |
| 2 | Router requests an expert already on shelf. It makes a short hop to compute. Stamp `HIT`. | **animate** short path |
| 3 | Router requests one absent from shelf. It travels from slower store, then lands in cache. Stamp `MISS`. | **animate** long path; cache updates |
| 4 | Run several requests quickly: some hits, some misses. Do not put a GLM-specific hit-rate percentage on screen. | **repeat** mechanism without fake data |
| 5 | Add a faint second path where a predicted expert starts moving early; label `prefetch` as an optional technique, not guaranteed magic. | **add** prefetch intuition |
| 6 | A slider appears: `more fast memory ↔ less fast memory`. Start in middle. | **add** trade control |
| 7 | Drag toward more cache: shelf grows, long misses decrease, machine runs smoother; physical fast-memory footprint grows. | **state change** bigger/faster |
| 8 | Drag toward less cache: shelf shrinks, misses/long transfers increase, machine slows but footprint shrinks. | **state change** smaller/slower |
| 9 | Stop slider at middle and ask **“where is the perfect setting?”** Hold. | **fair question**, no answer implied |
| 10 | Behind the slider, ghost the routing geometry: 288 expert slots per sparse floor × 42 floors. Build **12,096 layer-specific routed expert slots**. | **add** scale context |
| 11 | Instead of landing on a magic slider position, show variables around it: `hardware`, `workload`, `locality`, `cache policy`, `prefetch`. | **answer** depends on system/workload |
| 12 | Keep machine running at a reduced-memory setting. Place labels `offload`, `cache`, `quantize`, `shard` around the same model as options, not mutually exclusive answers. | **add** solution family |
| 13 | The memory machinery recedes. Opening `18B active` card floats back to centre. End on **“what did it actually buy us?”** | **remove** implementation clutter; seed finale |

## Truth / implementation notes

- Expert caching/offloading is real; do not imply the full model must always reside in GPU VRAM.
- Expert selections can have locality/predictability, and prefetch research exists, but project research does **not** provide a published GLM-5.3-Flash locality/hit-rate measurement for 288 routed experts / top-8.
- Therefore do not claim a specific optimal cache size, hit rate, or exact GLM slowdown from offloading.
- `288 × 42 = 12,096` is the number of **layer-specific routed expert slots**. It is not the number active at once and not evidence that caching fails.
- The safe conclusion is a trade: less fast-resident memory is possible, usually by spending bandwidth/latency/complexity.
