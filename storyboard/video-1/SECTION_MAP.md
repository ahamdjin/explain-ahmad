# GLM-5.3-Flash — section map

> ## ⚠ SUPERSEDED — read `storyboard/video-1/STORY_SPINE.md` instead
>
> This file describes the **8-section claim-on-trial chain**. The video is now
> the **13-section teach-then-payoff chain** in spine v4, and the per-section
> detail that used to live here now lives in the scripts themselves
> (`video-script/NN-*.md`), each of which carries its own contract, line jobs
> and truth notes.
>
> Kept because the reasoning in §"Why the format changed" below is still the
> best statement of why a syllabus cannot hold tension — that argument is what
> produced the gates, and it survives the rewrite.

Status: **superseded by `storyboard/video-1/STORY_SPINE.md` v4.** Formerly the
question-chain format, 8 sections; itself superseded the 11-section syllabus
kept at `archive/SECTION_MAP-syllabus-v1.md`.

Spine: `storyboard/video-1/STORY_SPINE.md` · Gates: `skills/STORY_STRUCTURE.md`
Numbers: `research/glm/GROUND_TRUTH.md` · Words: `storyboard/video-1/VOCABULARY_LEDGER.md`

## Why the format changed

The old map specified sections as **Purpose / Visual world / Key mechanism /
Viewer leaves knowing**. That is a syllabus, and syllabi compose into lists —
"and then, and then." It had no field that could hold tension, so a section
that went nowhere was indistinguishable from one that went somewhere. Section
01's own steps 8, 9 and 10 were already the same beat three times, and five
rebuilds faithfully reproduced it.

Every section now declares four things, and two of them are checkable by machine:

- **Enters on** — must equal the previous section's *Exits on*
- **Answers** — what it resolves, and the answer in one line
- **Event** — the thing that *happens*; not an assertion
- **Exits on** — must **differ** from *Enters on*

## The want

> They shipped a 320-billion-parameter model and called it efficient.
> I want to know whether that is true.

The video is a claim on trial. Every section is evidence. A section that is
neither evidence for nor against the claim is off-mission and does not belong.

## The verdict the video reaches

> Sparse routing buys **compute**, not **memory**.

## The chain at a glance

| # | Section | Event | Exits on |
| --- | --- | --- | --- |
| 1 | The claim on trial | word two picks a **different** eight | if the choice keeps changing, how could you hold only what you need? |
| 2 | Follow one word in | **the router never looks at the word** | what is the router actually reading? |
| 3 | The word becomes numbers | the word tears into 4096 numbers | those numbers are the same every time \u2014 so how did the team ever change? |
| 4 | Where the numbers change | the representation visibly changes | would the same word pick a different team? |
| 5 | New numbers, new team | **same word, different eight, one floor up** | how many times does this happen? |
| 6 | Forty-two floors | 8 × 42 counted on screen | could you fetch 336 sets per word, fast enough? |
| 7 | The answer | **the plan from §1 jams** | then what did "18B active" ever buy? |
| 8 | The verdict | the journey folds into the opening frame | — |

**§1's event is §7's weapon.** Different words picking different experts is
planted in the opening and is the exact thing that breaks the tempting plan six
sections later. Nothing else in the video carries that load.

---

## Section 1 — The claim on trial

- **Enters on** — *(cold open)*
- **Answers** — Why does a 320B model only use 18B per word? → Its knowledge is
  split into experts, and only a few get picked for each word.
- **Event** — A second word arrives and lights a **completely different eight**.
- **Exits on** — If the choice keeps changing, how could you ever hold just the
  ones you need?

**Visual world** — model sheet → share bar → the expert building, router desk,
the chosen team, the plan, a small machine.

**Must do**
- Reach the first question inside ~30 seconds. No spec-table read.
- Answer its own first question. *Why carry 320 if you use 18?* → **options.**
  The viewer should feel the 300 billion is not waste.
- Show the plan **working**, then leave the question over it.

**Must not do**
- Show anything blocked. No cross, no hazard mark, no "something stops this".
- Say `token`. It says **word**.
- Explain why the plan fails. That is §7.

**Owns after** — parameter, expert, router, active.

---

## Section 2 — Follow one word in

- **Enters on** — If the choice keeps changing, how could you ever hold only the ones you need?
- **Answers** — nothing yet — but it finds where the question has to be settled.
- **Event** — **The router never looks at the word.** It reads a sheet of numbers instead.
- **Exits on** — What is the router actually reading?

A transition section is the easiest place to lose a viewer, so this one carries
its own surprise rather than being a corridor. It is also true: routing reads
the current representation, never the raw text.

**Visual world** — a minimal paper prompt surface that becomes the doorway.
The word is the persistent actor from here to §8; no architecture dump.

**Concrete example** — `The dog dropped the ball, and it`

**Must not do** — introduce layers, attention or numbers. It only turns inward.

---

## Section 3 — The word becomes numbers

- **Enters on** — What is the router actually reading?
- **Answers** — A long list of numbers that stands for the word.
- **Event** — **The word tears up into 4096 numbers that run off the frame.**
- **Exits on** — Those numbers are the same every time. So how did the team ever change?

Exits on a **contradiction**, not a question: §1 proved the team changes and this
section proves the numbers don't. Both cannot be true, which is what makes §4
necessary rather than merely next.

**Visual world** — the word on paper separates and becomes a row of values.

**Mechanism, only as far as the question needs**
- a word is handled as a piece of a sequence — `token` is earned here
- that piece is carried as a row of learned numbers
- widen the row so `4096 values` feels physically large

**Must not do** — a vocabulary catalog, token IDs, or an embedding-lookup
section. Those served the old primer and are cut. The question needs only *the
word becomes numbers, and numbers can change.*

**Owns after** — token, "its numbers".

---

## Section 4 — Where the numbers change

- **Enters on** — If the numbers can change, does the choice change with them?
- **Answers** — The numbers change because the word gathers context from its neighbours.
- **Event** — The representation visibly changes in front of the viewer.
- **Exits on** — So with different numbers, would the same word pick a different team?

**Visual world** — one paper floor. Attention and the expert room are neighbours
on the same floor, never disconnected slides.

**Mechanism** — the word's numbers compare against the words it is allowed to
see, mix in what matters, and come back **changed**.

**Truth note** — Q/K/V is a familiar teaching lens; GLM-5.3-Flash uses hybrid
KDA + sparse MLA attention. Do not present the lens as the architecture.

**Owns after** — attention, context.

---

## Section 5 — New numbers, new team

- **Enters on** — Would the same word pick a different team?
- **Answers** — Yes. Same word, new numbers, new team.
- **Event** — **The same word picks a different eight one floor up.**
- **Exits on** — How many times does this happen?

**Visual world** — the expert room from §1, now seen from inside, on one floor.

**Mechanism** — the router reads the *current* numbers → scores the 288 →
top-8 selected → one shared expert always joins → they transform the numbers
in parallel → outputs combine into one changed representation.

**Truth notes**
- An expert is a **learned feed-forward block**, not a human specialty. Identity
  is a number. Never "the maths expert".
- Routing weights shown are illustrative unless measured from activations.

**Owns after** — top-8, shared expert.

---

## Section 6 — Forty-two floors

- **Enters on** — How many times does this happen?
- **Answers** — 42 sparse layers, eight experts each. **336 expert visits per word.**
- **Event** — The count is done on screen: 8 × 42.
- **Exits on** — Could you fetch 336 sets from storage, per word, fast enough?

**Visual world** — the one floor becomes one floor of a 45-floor building.

**Mechanism** — 45 layers; the first 3 are dense; the other **42 are sparse**.
The same word climbs, its numbers change on every floor, and the routing choice
can change with them.

**Owns after** — layer, sparse vs dense.

---

## Section 7 — The answer

- **Enters on** — Could you fetch 336 sets per word, fast enough?
- **Answers** — No. The fetch costs more than the work it does.
- **Event** — **The elegant plan from §1 jams.**
- **Exits on** — Then what did "18B active" ever buy?

**Visual world** — reuse §1's exact plan — storage → router → load eight → small
machine — now with enough knowledge to watch it fail.

**Causal answer**
1. The choice cannot be made once at startup; it depends on the current numbers.
2. Those numbers change every word and every floor.
3. So the needed set changes at each of the 42 sparse layers, per word.
4. Keeping experts outside fast memory means fetching weights repeatedly.
5. Expert weights are large; the transfer becomes the bottleneck. **~8 GB per
   word** at ~2.8% of routed weight — see `GROUND_TRUTH.md`.
6. Quantization reinforces the wall rather than escaping it: even at 4-bit the
   full checkpoint is ~153 GiB.

**Mandatory caveat** — real systems shard, cache, quantize and offload. The
truthful claim is **not** that all 320B must live in GPU VRAM. It is that
efficient serving needs *fast access* to whichever experts routing picks.

**Owns after** — memory vs storage, bandwidth, quantization.

---

## Section 8 — The verdict

- **Enters on** — What did "18B active" ever buy?
- **Answers** — Compute, not memory.
- **Event** — The whole journey folds back into the opening frame.
- **Exits on** — none. The thesis lands.

**Final separation, on one frame**
- `320B` — total learned capacity, stored, and it must stay reachable
- `~18B active` — the parameters on one word's path through the model
- sparse MoE — selectivity of **computation**
- memory behaviour — depends on precision, sharding, caching and offload

**The ruling** — the efficiency claim is **true about compute and false about
memory**, and that split is the whole video.

---

# Production order

1. Spine, chain and gates. **Done.**
2. Section 1 beats against the chain, then frames. **Done.**
3. Scripts for every section. **Done** — `video-script/0N-*.md`, verified by
   `npm run check:chain`.
4. Storyboards and implementation. **Done — all 8 sections built.**
   96 beats, 8:04. `storyboard/video-1/BOARD.md` is generated from the beats
   themselves by `npm run board`, so the board and the build cannot disagree.
5. Watch the whole thing in order at `/watch`. Individual routes
   (`/section-04`) exist for review only — no section makes sense alone.

Remaining: voice-over, and a pass on pacing once there is audio to cut against.

Do not return to broad art-direction exploration; the visual language is
settled and liked. Story problems are never fixed by changing the metaphor.
