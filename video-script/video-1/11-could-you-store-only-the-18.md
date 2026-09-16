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

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — the honest answer (beats 1–4)

> **1.** *(The opening numbers hold over a tower the viewer can now read.)* Now we can finally answer the question from the beginning. When GLM says about 18 billion parameters are active per token... which 18 billion are they?
>
> **2.** *(The active highlight splits into a steady always-on part and scattered routed selections.)* The answer is: not one fixed 18-billion-parameter chunk. Some parts of the model are used all the time. Those are predictable. But the routed expert part is different.
>
> **3.** *(One tracked token climbs three sparse floors slowly: arrive, choose eight, change, choose again.)* At each sparse layer, the router waits for the token’s current representation... scores the 288 experts in that layer... and chooses eight. Then the representation changes. The next sparse layer makes its own choice. And the next generated token can make different choices again.
>
> **4.** *(A box labelled `THE 18B` tries to gather the selected pieces and the next layer selects outside it.)* So the model does not know one permanent list of “the useful 18 billion” that we can cut out and keep forever. The routed part of that active set is being decided along the way.

### Act 2 — the plan that sounds reasonable (beats 5–7)

> **5.** *(The failed box is replaced by a store on the left, the tower centre, fast compute on the right.)* Which means our original idea needs an upgrade. Maybe we do not keep all the experts in fast memory. Maybe we keep the full model somewhere cheaper — say system memory or storage — and whenever the router chooses eight experts... we fetch those eight.
>
> **6.** *(One floor selects eight, eight blocks travel, and it works. A tick lands.)* That sounds reasonable.
>
> **7.** *(The next floor chooses from its own 288 and another shipment travels.)* So let’s actually test the naive version of that plan.

### Act 3 — running the numbers (beats 8–11)

> **8.** *(One routed block is zoomed and measured.)* One routed expert in GLM is roughly 25 megabytes at FP8-sized weight storage.
>
> **9.** *(The count builds against the tower, reusing §7’s figure.)* Our token visits: 8 experts × 42 sparse layers = 336 routed expert blocks.
>
> **10.** *(A traffic meter fills for a single token.)* If none of those routed expert weights were already close by, and we fetched every selected block on demand... we would move roughly: 8.5 gigabytes of routed expert weights for one token.
>
> **11.** *(A clock runs while the compute side simply waits. The frame is labelled naive and illustrative.)* Just moving that much data from a fast SSD at, say, around 5 gigabytes per second would take roughly 1.7 seconds. And that is before pretending this is a complete performance model — it isn’t. Different hardware, buses, caching, overlap and prefetching change the real result.

### Act 4 — bad, but not impossible (beats 12–13)

> **12.** *(`bad plan` stamps the route. The machine is left standing and capable.)* The point is simpler: the completely naive “fetch every selected expert from slow storage every time” plan is awful.
>
> **13.** *(A small fast-memory shelf appears between the store and compute. Nothing is explained about it yet.)* But notice what I did not say. I did not say offloading is impossible. Because it isn’t. People do run large MoE models with less fast memory than the full checkpoint needs. So what are they doing differently?

---

## Storyboard

There is **one paper stage for all 13 beats**. §10 freezes the decode loop with
the opening numbers already back over the tower.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | the opening numbers hold over a tower the viewer can now read | tower + `320B / 18B` | which 18 billion? | S-14 |
| 2 | the paper stage | — | the active highlight splits into a steady part and scattered routed picks | fixed vs dynamic | not one fixed chunk | S-04 |
| 3 | the paper stage | — | one token climbs three sparse floors slowly, choosing afresh each time | slow replay of routing | decided along the way | S-04 |
| 4 | the paper stage | — | a box labelled `THE 18B` gathers pieces and the next layer selects outside it | the box failing | no permanent list | S-09 |
| 5 | the paper stage | — | the failed box is replaced by store, tower and fast compute | the offload plan | fetch the eight we need | S-04 |
| 6 | the paper stage | — | one floor selects eight, eight blocks travel, and it works | a shipment + a tick | it does work | S-14 |
| 7 | the paper stage | — | the next floor chooses from its own 288 and another shipment travels | second shipment | test the naive version | S-06 |
| 8 | the paper stage | — | one routed block is zoomed and measured | one block, measured | ~25 MB FP8 | S-04 |
| 9 | the paper stage | — | the count builds against the tower, reusing §7’s figure | 8 × 42 = 336 blocks | 336 routed blocks | S-04 |
| 10 | the paper stage | — | a traffic meter fills for a single token | traffic meter | ~8.5 GB per token | S-04 |
| 11 | the paper stage | — | a clock runs while the compute side simply waits | clock + idle compute | ~1.7 s, naive | S-01 |
| 12 | the paper stage | — | `bad plan` stamps the route and the machine is left standing | stamped route | bad, not impossible | S-14 |
| 13 | the paper stage | — | a small fast-memory shelf appears between the store and compute | an unexplained shelf | what do real systems do? | S-15 |

## Carrying frames

- **Beat 4:** the box that cannot be filled — §1’s tempting plan, finally broken.
- **Beat 11:** one token, one clock, and a compute device doing nothing.
- **Beat 12:** a stamp, not a cross. The plan is bad; the machine still runs.

## Truth / implementation notes

- “18B active” is an architecture-level per-token active-parameter figure. Do not visualize it as one contiguous physical chunk.
- Some weights are always involved; the routed-expert subset is dynamic. The video's main mystery is specifically about the **routed** portion changing by layer/token.
- One routed expert is about `4096 × 2048 × 3 = 25,165,824` parameters, roughly **25 MB decimal at 1 byte/weight** for this FP8-scale illustration.
- `336 × ~25.17 MB ≈ 8.46 GB` of routed expert weights if every routed expert visit required a fresh transfer and none were resident/cached.
- `8.46 GB / 5 GB/s ≈ 1.69 s`. This is a **naive bandwidth thought experiment**, not measured GLM serving latency.
- Explicitly say offloading is possible. §12 exists because caching/prefetch/placement change the calculation.

## Sound-compatible actions

- beat 4: the box failing to close
- beat 6: one shipment arriving, and a tick
- beat 7: the same shipment sound again, sooner
- beat 11: a clock, alone
- beat 12: one stamp
