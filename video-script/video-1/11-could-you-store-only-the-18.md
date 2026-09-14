# Section 11 — So which 18 billion are active?

Status: **STORY PASS — narration-first.** This is the direct payoff to the question planted in §1. It must answer honestly before introducing the storage experiment.

## Contract

| | |
| --- | --- |
| Enters on | **which 18B are active?** |
| Teaches | fixed vs dynamically routed active parameters; naive expert fetch cost |
| Answers | active parameters are not one permanent 18B block; always-on parts repeat while routed expert weights are selected dynamically layer-by-layer |
| Exits on | **if fetching every selected expert from slow storage is terrible, how can offloading work at all?** |

## Narration

Now we can finally answer the question from the beginning.

When GLM says about **18 billion parameters are active per token**...

which 18 billion are they?

The answer is:

**not one fixed 18-billion-parameter chunk.**

Some parts of the model are used all the time.

Those are predictable.

But the routed expert part is different.

At each sparse layer, the router waits for the token’s current representation...

scores the **288 experts in that layer**...

and chooses **eight**.

Then the representation changes.

The next sparse layer makes its own choice.

And the next generated token can make different choices again.

So the model does not know one permanent list of “the useful 18 billion” that we can cut out and keep forever.

The routed part of that active set is being decided **along the way**.

Which means our original idea needs an upgrade.

Maybe we do not keep all the experts in fast memory.

Maybe we keep the full model somewhere cheaper — say system memory or storage — and whenever the router chooses eight experts...

we fetch those eight.

That sounds reasonable.

So let’s actually test the naive version of that plan.

One routed expert in GLM is roughly **25 megabytes** at FP8-sized weight storage.

Our token visits:

**8 experts × 42 sparse layers = 336 routed expert blocks.**

If none of those routed expert weights were already close by, and we fetched every selected block on demand...

we would move roughly:

**8.5 gigabytes of routed expert weights**

for one token.

Just moving that much data from a fast SSD at, say, around **5 gigabytes per second** would take roughly **1.7 seconds**.

And that is before pretending this is a complete performance model — it isn’t.

Different hardware, buses, caching, overlap and prefetching change the real result.

The point is simpler:

**the completely naive “fetch every selected expert from slow storage every time” plan is awful.**

But notice what I did **not** say.

I did not say offloading is impossible.

Because it isn’t.

People do run large MoE models with less fast memory than the full checkpoint needs.

So what are they doing differently?

## Storyboard — 13 beats

§10 freezes the decode loop with the opening `320B / 18B active` numbers returned over the tower.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | Hold the opening numbers over the tower. Ask **“which 18B?”** again, now with the learned machine visible behind the question. | **keep** tower + opening numbers |
| 2 | Divide the active highlight into two visual classes: a stable always-on backbone/shared portion and routed expert selections distributed across floors. | **add** fixed-vs-dynamic visual distinction |
| 3 | Replay one tracked token climbing only 3 sparse floors in slow motion: row arrives → router chooses eight → row changes → next floor chooses again. | **reuse** known mechanism |
| 4 | A hypothetical box labelled `THE 18B` tries to gather selected pieces into one permanent block; next-layer routing immediately selects pieces outside it and the box fails. | **temporary hypothesis**, then **break** it |
| 5 | Replace it with a more honest plan: full expert store on left, router/tower centre, fast compute on right. Selected expert blocks can travel on demand. | **add** offload plan |
| 6 | First sparse floor selects eight; eight expert blocks travel from store to compute. Put a check mark: mechanically, it works. | **show plan succeed once** |
| 7 | Next floor chooses eight from its own 288; another shipment travels. Repeat once. | **repeat** on-demand fetch |
| 8 | Zoom into one routed expert block and label approximately **25 MB FP8**. | **add** measured size cue |
| 9 | Build arithmetic visibly: `42 layers × 8 experts = 336 blocks`. Keep `336 visits`, not “decisions.” | **add** count |
| 10 | Multiply by ~25 MB; traffic meter lands around **8.5 GB routed weights / token** for the no-cache thought experiment. | **add** transfer total |
| 11 | Add a rough `5 GB/s` storage path and let a clock reach ~`1.7 s` while compute device waits. Label this **naive / no cache / illustrative**. | **add** scoped latency illustration |
| 12 | Big red X is NOT used. Instead, stamp `bad plan` on the naive route while leaving the machine capable of running. | **qualify**, do not imply impossibility |
| 13 | A small fast-memory/cache shelf appears between storage and compute. End on **“what are real systems doing differently?”** | **add** cache outline; seed §12 |

## Truth / implementation notes

- “18B active” is an architecture-level per-token active-parameter figure. Do not visualize it as one contiguous physical chunk.
- Some weights are always involved; the routed-expert subset is dynamic. The video's main mystery is specifically about the **routed** portion changing by layer/token.
- One routed expert is about `4096 × 2048 × 3 = 25,165,824` parameters, roughly **25 MB decimal at 1 byte/weight** for this FP8-scale illustration.
- `336 × ~25.17 MB ≈ 8.46 GB` of routed expert weights if every routed expert visit required a fresh transfer and none were resident/cached.
- `8.46 GB / 5 GB/s ≈ 1.69 s`. This is a **naive bandwidth thought experiment**, not measured GLM serving latency.
- Explicitly say offloading is possible. §12 exists because caching/prefetch/placement change the calculation.
