# Section 01 — The Night Shift

Status: **STORY PROPOSAL v5.** Supersedes `01-five-year-old.md` (office),
`01-headache-chain.md`, and the library metaphor in the locked v2 storyboard.

This file is the **story**. No implementation until the spine is agreed.

---

## 1. Why v1–v4 failed

Not pacing. Not animation. Not assets. One thing:

> **Every version had a beautiful hope and a fake wall.**

- GPT board frame 13: a red X, a hazard sign, `But something blocks this…`
- Office build beat 17: *"It doesn't. And the reason is the whole rest of this video."*
- Locked storyboard, audience rule: *"The section must create that headache, not answer it."*

A story is exactly as good as its wall. A viewer shown a red X does not think
*"I need to know."* They think *"you're withholding."* That is the entire
"too bad of story" feeling, and it was never fixable by better motion.

**Nobody had ever worked out what the wall actually is.** So there was nothing to
draw. This file works it out first.

### The second failure: the metaphor could not carry the idea

| Metaphor | What it makes clear | Why it breaks |
| --- | --- | --- |
| **Library** (GPT board) | scale — 320B feels enormous | A book on a shelf **is** available. Shelving is free, retrieval is free. The library has no way to express a cost of absence, so the wall is invisible and must be faked with a road sign. |
| **Office with desks** (v4) | presence — you must be here to work | 280 people asleep at desks reads as **stupid**. So the viewer's answer to *"why not send them home?"* is *"you obviously should"*. When you then say they can't, they feel tricked, not enlightened. |
| **Hospital night shift** (v5) | presence **and** why presence is rational | A hospital that keeps specialists sleeping on-site is not absurd — it's correct, and for exactly the model's reason. The metaphor contains its own answer. No red X needed. |

---

## 2. The dramatic engine

The reason MoE is interesting is not that it's clever. It's that **it looks like
it should solve the memory problem, and it doesn't.**

"Only 18 billion active" sounds precisely like "only needs 18 billion worth of
memory." Every single person who hears it makes that inference. It is a trap
with a hair trigger.

So the job of Section 01 is not to explain MoE. It is to:

1. **walk the viewer into that inference,**
2. **let them feel clever for having it,**
3. **then break it with arithmetic they can follow.**

That's the whole section. Everything else is decoration.

### The chain, in one breath

Huge model — **but** almost none of it works at once — **so** why hold it all? —
**so** send the idle ones home — **and it works!** — **but** the patient isn't
done, there are 42 departments — **so** it's not 8 calls, it's 336 — **and** the
drive is longer than the treatment — **therefore** nobody goes home — **therefore**
306 GB buys you *presence*, not storage.

No "and then" anywhere in it.

---

## 3. The wall, stated properly

This is the part that never existed. Section 01 must be able to say it out loud.

> **Which experts you need is unpredictable, and you need a fresh set 42 times per
> word. Fetching them costs more than the work they do. So they all have to
> already be there.**

### The arithmetic — DERIVED, needs one confirmation pass

| | figure | how |
| --- | --- | --- |
| Checkpoint on disk | **306 GiB** | verified, vLLM recipe (native FP8) |
| Sparse layers | **42** | verified (45 total = 3 dense + 42 sparse) |
| Routed experts per sparse layer | **288** (+1 shared) | verified |
| Active per token | **top-8** routed | verified |
| Expert visits per word | **8 × 42 = 336** | arithmetic |
| Total expert slots | 42 × 288 = **12,096** | arithmetic |
| Share of routed weight touched per word | 8/288 = **~2.8%** | arithmetic |
| Routed-expert share of the checkpoint | ~290 GiB of the 306 | **DERIVED** |
| **Weight to fetch per word, if not resident** | **~8 GB** | 2.8% of ~290 GiB |
| NVMe SSD read | ~5 GB/s | typical, confirm on Ahmad's Mac |
| **Time to fetch, per word** | **~1.6 seconds** | 8 ÷ 5 |
| Resident-in-RAM equivalent | tens of words/sec | — |
| **Penalty** | **~50× slower** | — |

**Cross-check 1 (the strong one):** an expert is ~26 MB (from earlier
verification). There are 12,096 expert slots. `12,096 x 26 MB` = **~314 GB** --
essentially the entire 306 GiB checkpoint. So the routed experts really do
dominate the weight, which is what makes the 2.8%-per-word figure the one that
matters.

**Cross-check 2:** active per token is 18B ≈ 18 GB at FP8.
Of that, attention + embeddings + the 3 dense layers + the shared expert are
resident regardless (~10 GB). The remainder — the routed part that would have to
be fetched — is ~8 GB. Two independent routes, same number.

**Confirmation needed before recording:** read `moe_intermediate_size` from
`config.json` and compute the routed-expert share directly instead of deriving it
from the residual. Also benchmark Ahmad's actual SSD.

### Why this is the right wall

- It is **arithmetic the viewer can follow**, not an appeal to authority.
- The failure is not *"it doesn't fit."* It's **"it fits and it's useless"** —
  a far better and more honest wall, and it is *why real deployments hold all
  320B in fast memory.*
- It gives a real answer to *"why can't my 32 GB run it?"* — **not because the
  numbers don't add up, but because being there is the thing you're paying for.**

### Recommended departure from the locked storyboard

The locked contract says Section 01 must *create* the headache, not answer it.
**I think that rule is what killed the story, and I'd drop it.**

ncase never withholds. He gives you the intuition immediately, then spends the
rest of the piece making it precise. Section 01 should deliver a **complete small
hope→wall→therefore cycle** and end on a *new, bigger* question — not on a
deferral. Sections 02+ then earn the detail.

The new question Section 01 hands forward is a genuinely good one:
**"42 departments? A different team at every one? What is actually happening in
there?"**

---

## 4. Why the hospital

Not decoration — it is structurally isomorphic to the mechanism, piece for piece.

| Model | Hospital | Why it's the right mapping |
| --- | --- | --- |
| token / word | a patient arriving | discrete, continuous arrival, each one different |
| router | **triage** | A real job that exists to do exactly this: read the case, decide who's needed. It is not a robot dispatcher we invented. |
| 288 routed experts | 288 specialists | plausible for a large hospital; nobody thinks the idle ones are useless |
| top-8 routing | triage pages eight | natural, requires no explanation |
| 42 sparse layers | 42 departments the patient passes through | **the reveal**, and it's realistic — imaging, labs, theatre… |
| routing is input-dependent | you can't know who's needed until the patient is in front of you | this is the whole point, and it's obvious in a hospital |
| weights resident in RAM | specialists sleeping in the on-call rooms | **a real thing that really exists for really this reason** |
| weights on disk | specialists at home, 40 minutes away | — |
| fetch latency > compute | the drive is longer than the treatment | — |
| 306 GB vs 32 GB | a full hospital vs a small clinic | — |

The load-bearing row is **the on-call room**. Hospitals genuinely keep
specialists sleeping in the building, and they do it because summoning one takes
longer than the emergency allows. A viewer who has ever known a doctor already
understands the answer before we give it. That is what a metaphor is *for*, and
neither the library nor the office had anything like it.

### Tone

Paper world, stick figures, no jeopardy. Nobody is dying — the story is entirely
about **speed**. Sleeping stick specialists with `zZ` is the same image as the
GPT board's frame 13, which already worked.

### The unit rule — do not break this

`1 GB` is **floor space**, and stays as `GB`. Do not invent a bed-per-gigabyte
unit — specialists are an *organisation* unit (288 per layer) and gigabytes are a
*space* unit, and cross-multiplying them produces a lie on screen.

- ✅ *"The whole hospital, staffed and equipped, needs 306 gigabytes of building.
  My Mac is a 32-gigabyte clinic."*
- ✅ *"One specialist is about 26 megabytes."*
- ❌ *"288 specialists need 288 beds."*
- ❌ any specific number of specialists shown fitting in 32 GB.

---

## 5. The beat sheet — 40 beats, 4 acts

`rel` = story relation (drives spring feel + hold). `←` = the prerequisite beat.
At ~3s while Ahmad speaks, this is **~2 minutes**.

### ACT 1 — THE OFFER (beats 1–10)
*Goal: the viewer concludes, on their own, "so I only need the small part."*

| # | Beat | On screen | rel | ← |
| --- | --- | --- | --- | --- |
| 1 | This is GLM-5.3-Flash. | Model sheet, narrator beside it. | want | — |
| 2 | 320 billion parameters. | `320B` emphasised on the sheet. | so | 1 |
| 3 | A parameter is just knowledge. Everything it learned. | `all of its knowledge` note. | so | 2 |
| 4 | On disk that's 306 gigabytes. | `306 GB` stamped. | so | 3 |
| 5 | My Mac has 32. *(light aside, not the spine)* | Small Mac, `32 GB`, dwarfed. | wall | 4 |
| 6 | But here's the strange part. Only 18 billion are active. | `18B active` brace. | and-yet | 2 |
| 7 | Active means: that's the only knowledge actually used. For one word. | One word card; small lit region. | so | 6 |
| 8 | About 5% works. 95% sits there. | The contrast, held. | so | 7 |
| 9 | **So why hold all 306?** | `?` on the dark 95%. | and-yet | 8 |
| 10 | Ahmad asks it to camera. Hold. | Narrator, hopeful, leaning in. | hope | 9 |

The question arrives at **beat 9 of 40** — not beat 30. This is the single
biggest fix versus every previous version.

### ACT 2 — THE HOSPITAL (beats 11–20)
*Goal: make the mechanism physical, and arm the trap.*

| # | Beat | On screen | rel | ← |
| --- | --- | --- | --- | --- |
| 11 | Let me show you what's actually in there. It's not a filing cabinet. It's a hospital. | Building assembles. | therefore | 10 |
| 12 | 288 specialists. | The staff, populated. | so | 11 |
| 13 | A patient arrives. | One patient card enters. | so | 12 |
| 14 | Triage reads the case. | Triage desk; a line to the patient. | so | 13 |
| 15 | And pages eight people. | Eight light; 280 stay grey. | so | 14 |
| 16 | Those eight do the work. The other 280 do nothing at all. | Brace: `280 idle`. | so | 15 |
| 17 | Next patient. Different case. | Second patient card. | so | 16 |
| 18 | Different eight. | A visibly different set lights. | so | 17 |
| 19 | Same hospital. Different team, every time. | Both teams side by side. | so | 18 |
| 20 | **So why are 280 specialists in the building doing nothing?** | The idle 280, `?`. | and-yet | 19 |

### ACT 3 — THE TEST (beats 21–30)
*Goal: spring the trap. Let it succeed first, then break it.*

| # | Beat | On screen | rel | ← |
| --- | --- | --- | --- | --- |
| 21 | Send them home. Page them when you need them. | 280 walk out to `home`. | hope | 20 |
| 22 | Patient one. Triage pages eight. They drive in. | Eight travel in from home. | hope | 21 |
| 23 | Treated. **It worked.** | Sparks. Narrator delighted. | hope | 22 |
| 24 | But the patient isn't finished. | Patient card still on screen. | and-yet | 23 |
| 25 | They don't see one team. They go through 42 departments. | 42 department doors appear. | so | 24 |
| 26 | And at every single door, triage pages a **different** eight. | Rapid re-paging down the row. | so | 25 |
| 27 | **So that's not 8 calls. It's 336.** | `8 × 42 = 336`. | wall | 26 |
| 28 | For one word. | `336 calls · 1 word`. | wall | 27 |
| 29 | And words arrive continuously. | Queue of patients stacking. | wall | 28 |
| 30 | Every call is a 40-minute drive. The treatment takes 4 minutes. | Drive vs treatment, to scale. | wall | 29 |

Beat 23 is essential. **The hope must actually succeed once**, or breaking it is
a cheat rather than a discovery.

### ACT 4 — THE PRICE (beats 31–40)
*Goal: pay it off in real numbers, then hand forward a better question.*

| # | Beat | On screen | rel | ← |
| --- | --- | --- | --- | --- |
| 31 | In real numbers: one specialist is about 26 megabytes. | `1 expert ≈ 26 MB`. | so | 30 |
| 32 | 336 of them is about 8 gigabytes. Per word. | `≈ 8 GB / word`. | so | 31 |
| 33 | Off an SSD, that's about a second and a half. Per word. | `8 GB ÷ 5 GB/s ≈ 1.6 s`. | wall | 32 |
| 34 | You wanted thirty words a second. You'd get one every two. | The two rates, side by side. | wall | 33 |
| 35 | Fifty times slower. It's not broken. It's just useless. | `~50×`. | wall | 34 |
| 36 | **Therefore nobody goes home.** | The 280 walk back in. | therefore | 35 |
| 37 | They sleep in the building. | On-call rooms, `zZ`. | therefore | 36 |
| 38 | That's what 306 gigabytes buys. Not storage — **presence**. | `presence, not storage`. | therefore | 37 |
| 39 | And that's why 32 can't do it. Not because it doesn't fit. Because being there *is* the product. | Clinic vs hospital, final. | therefore | 38 |
| 40 | **But — 42 departments? A different team at every one? What is going on in there?** | One patient at door 1. | and-yet | 25 |

### Structure check

| Act | Beats | New ideas | Ends on |
| --- | --- | --- | --- |
| 1 — The Offer | 10 | 4 (huge · knowledge · active · mostly idle) | *why hold all of it?* |
| 2 — The Hospital | 10 | 4 (specialists · triage · eight · different every time) | *why are they here?* |
| 3 — The Test | 10 | 4 (send home · it works · 42 departments · 336 calls) | the drive > the treatment |
| 4 — The Price | 10 | 4 (26 MB · 8 GB/word · 1.6 s · presence) | *what's inside the 42?* |

Never more than four new ideas before a consolidation. Each act ends on a
question or a verdict — never on an inventory.

### Emotional curve (readable with sound off)

```
hope   ·                        ·23·
       ·        ·10·           /    \
flat  1····8····      ··20··  /      ·36·38·40·
       \                    \/            
wall    ·5·                 ·27·30·33·35·
```

Two peaks (10, 23), two troughs (30–35, and the small one at 5). Beat **23 → 27**
is the largest swing in the section and everything is built to serve it.

---

## 6. Asset plan

From `visual-assets/vendor/excalidraw/` (already synced via `npm run assets:sync`):

| Need | Source | Status |
| --- | --- | --- |
| Narrator + poses | *Stick people*, *Stick Figures* | ✅ have |
| 288 specialists | *Stick people* recoloured, code-tiled | ✅ have |
| Sleeping `zZ` specialists | *Stick people* + authored `zZ` mark | ✅ have |
| Patient / word cards | *Simple Sticky Notes*, *Forms* | ✅ have |
| Triage desk, chairs, lamps, plants | *Office Items* | ✅ have |
| Department signs, wayfinding | *Some handdrawn signs*, *System Icons* | ✅ have |
| Mac / clinic box | *Computers*, *Gadgets* | ✅ have |
| Disk / home / storage | *Data processing*, *Software Architecture* | ✅ have |
| **Hospital shell (facade, floors, corridor)** | — | ⚠️ **author** |
| **Hospital bed / on-call bunk** | — | ⚠️ **author** |
| **Department doorway (×42, tiled)** | — | ⚠️ **author** |

**Honest cost:** three new authored props. Everything else already exists in the
pool. That is the price of dropping the library, and it is worth paying — the
library needs zero new art and cannot tell the story.

**Repeated geometry stays code-generated** (the 288 grid, the 42 doors, braces,
connector paths), per the production rule in `visual-assets/README.md`.
Personality objects are authored vectors. My hand-coded stick legs are retired —
they were the wrong call and you were right that they read as funny, not simple.

---

## 7. What I need from you

You asked what to provide. **Honestly: nothing.** The documents and the ncase
research were never the bottleneck — I had them and still produced a fake wall,
because the wall had never been derived. It has now.

Two decisions only, and I've assumed an answer to each so nothing is blocked:

1. **May Section 01 answer the question** (my recommendation, §3) or must it end
   on the red X per the locked contract? *Assuming: it answers.*
2. **~2 minutes for Section 01** at ~3s/beat — acceptable? *Assuming: yes.*

One task for you if you want the numbers bulletproof: run a disk read benchmark
on your Mac so beat 33 uses your real SSD speed rather than a typical figure.

## 8. What this replaces

- `01-five-year-old.md` — the office. Density rules were right, metaphor wasn't.
- `01-headache-chain.md` — superseded.
- Library metaphor in `storyboard/section-01/FRAMES.md` (locked v2) — superseded,
  along with the "create the headache, not answer it" rule.
- `08-why-it-cannot-fit.md` — **now largely absorbed into Act 4.** Section 08 can
  become the precise version (bandwidth, batching, why not even a 4-bit quant
  saves you) rather than the first time the viewer hears the answer.
