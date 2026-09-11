# Section 13 — What that number actually bought

Status: **SCRIPT v10.** Written to spine v5. Corrected against a technical
review, 2026-09-11 — see "What changed" below. Every beat cites a strategy from
`skills/STRATEGY_LEDGER.md`, and no beat uses a technique that is not in it.

v8's interiors survive — they were built for spatial continuity and that work
stands. What v8 did not have was a **chapter wall** at either end, a named
teacher for anything it was doing, or an `Exits on` that had to equal the next
section's `Enters on` word for word. All three are now in place:

- **Beat 1 banks** the previous section's answer in one clause, then adds the
  *but* that makes this section necessary. It does not carry the previous
  question forward — that was the fault behind *"the whole story feels
  disconnected"*. `STORY_SPINE.md` §5.
- **The closing beat names the mechanism as finished** and says what is now
  missing, so the viewer gets to put something down before picking the next
  thing up.
- **Act headings carry strategy IDs**, derived from the storyboard's own
  strategy column rather than asserted separately.

Spine: `storyboard/video-1/STORY_SPINE.md` v5 · Numbers: `research/glm/GROUND_TRUTH.md`
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 13`

## Contract

| | |
| --- | --- |
| Enters on | it's a price, not a wall. So what did "five percent active" actually get us? |
| Answers | **compute, not memory** — and the number on the box cannot tell you which machine you need |
| Exits on | *(none — the thesis lands)* |
| Target | ~15 beats · ~1:30 |

## The job

Not a recap. A viewer who wanted a recap stopped at §11. This section **spends
the six deposits** the mechanism sections made, and answers the question from
minute one in a way that is now unarguable, because they watched every step.

The answer is split, and the split is the whole video:

> **True about compute. Never true about memory.**

## What changed from v8

**1. It broke the one strategy it cites.** S-11 is *thesis once, one sentence,
at the end* — and v8 stated the thesis at **beat 5**: *"'active parameters' is
a compute number. It was never a memory number."* Then beat 11, the beat
actually carrying the S-11 citation, said something else. So the thesis went
early, in the middle, and the strategy label sat on a different line. It now
lands **once**, at beat 12, and beats 5–6 *show* work against space without
naming the conclusion.

**2. The board still opened on `18B`.** Beat 1's own line asks what *"five
percent active"* bought. The frames have to open on the thing §1 opened on —
which is now two models and their chips, not a number.

**3. The close did not close the ring.** S-10 is *reuse the opening's nouns*,
and the narration did — *two models, one card, eight* — while the board showed a
verdict card with a slogan on it. The last frames are now literally §1's beats
1–3, redrawn, which is the whole point: the same picture, and this time the
viewer can read it.

**4. Beat 9 blamed the footprint on fine-graining.** It said *"the difference
is that this one is chopped finer"* directly after the one-card/eight-card
frame, over an animation that divided the blocks — so the picture made smaller
experts look like the cause of more GPUs. Three things differ between
`gpt-oss-120b` and this model: **parameter count** (116.8B vs 321B), **shipped
precision** (MXFP4 vs FP8), and **granularity**. The first two explain ~58 GiB
against ~306 GiB almost entirely. Granularity explains essentially none of it.

This was the most dangerous claim in the payoff, because it is the one a
knowledgeable viewer disproves with two numbers — in the final minute, on the
thesis beat. Beats 9–10 now name all three differences, grey out the two that
are merely size, and give granularity its real consequence: not a bigger file,
but an active share **smeared across the whole sheet** instead of sitting in
one corner you could keep nearby. Beat 11 carries the better/harder line.

## The script

### Act 1 — banking the price (beat 1) · **S-14**

> **1.** *(the plan dissolves; the two sheets from §1 ghost back in)* Small, or
> fast. Not both. So — what did "five percent active" actually buy?

### Act 2 — what it bought, and what it didn't (beats 2–6) · **S-04**

> **2.** *(we slide back to what §1 opened on)* Here's what that number is
> actually telling you.
>
> **3.** *(a small work bar draws itself)* Per token, this thing does the
> thinking of a model about a twentieth of its size. That's real. That's why
> it's quick, and why it's cheap to run per token. **That part is true.**
>
> **4.** *(the whole model returns behind it, whole, and settles heavily)* But
> all of it still has to be within reach. Because it never knows which part it
> wants until the moment it wants it.
>
> **5.** *(the bar and the block separate into two labelled columns)* One of
> those is a number about **work**. The other is a number about **space**.
>
> **6.** *(the work column tiny, the space column full height)* Sparse routing
> shrinks the first one. It does nothing at all to the second.

### Act 3 — the part I didn't expect (beats 7–10) · **S-04**

> **7.** *(a second sheet slides in; chips stack under each)* And here's the part
> I didn't expect. This model has about a hundred and twenty billion parameters,
> and it fits on one chip. This one has three hundred and twenty, and needs
> eight.
>
> **8.** *(both sheets light their active share; the two shares match)* Both of
> them use about five percent of themselves to answer you.
>
> **9.** *(three chips stack up beside the second sheet, labelled as they land)*
> Three things differ, and only one of them is exciting. It's nearly three
> times the parameters. It ships at twice the precision per weight. And it's
> chopped finer — more experts, smaller each.
>
> **10.** *(the first two chips grey out; the third stays lit)* The first two
> are why the file is bigger. They're just size. This one is the interesting
> one — and it's not about the file at all.
>
> **11.** *(the pieces shrink and multiply; the lit patch scatters across the
> whole sheet)* Chopping finer is exactly **why it's better** — better at
> specialising, better at spreading the load. It's also why the five percent
> it uses is smeared across all of it, instead of sitting in one corner you
> could keep nearby.

### Act 4 — the corollary nobody makes (beat 12) · **S-15**

> **12.** *(the second sheet withdraws; a trend continues past the frame)* So
> the better these models get at using less of themselves at any one moment,
> the more of themselves has to be sitting there anyway. And the number on the
> box doesn't move.

### Act 5 — the thesis, once (beat 13) · **S-11**

> **13.** *(everything clears to one line of handwriting)* "Active parameters" is
> a compute number. It was never a memory number.

### Act 6 — back to the two models (beats 14–15) · **S-10**

> **14.** *(§1's opening frame, redrawn exactly — two sheets, one chip and eight)*
> Two models. Both about five percent active. One of them runs on a single card;
> the other one needs eight.
>
> **15.** *(nothing moves)* Now you know why.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the plan | — | the plan dissolves; the two sheets from §1 ghost back in behind it | two `Block`s, faint | the pair returning | S-14 |
| 2 | the sheet | **pan** | we slide back to what §1 opened on | `Block`, lit share | ~5% of it live | S-04 |
| 3 | the sheet | — | a small work bar draws itself beside the sheet | `CostBars`, work only | 1/20th the thinking | S-04 |
| 4 | the sheet | — | the block returns behind it, whole, and settles heavily | `Block`, whole | all of it, reachable | S-04 |
| 5 | the sheet | — | the bar and the block separate into two labelled columns | two columns | **work / space** | S-04 |
| 6 | the sheet | — | the work column shrinks to almost nothing; the space column stays full height | two columns, unequal | one shrinks, one doesn't | S-04 |
| 7 | the sheet | — | a second sheet slides in beside the first; chips stack under each | two `Block`s, 1 chip vs 4 | ~117B → 1 · 321B → 4 | S-04 |
| 8 | the sheet | — | both sheets light their active share; the two shares visibly match | two lit patches | ~5% both | S-04 |
| 9 | the sheet | — | three chips land beside the second sheet: parameter count, precision, granularity | 3 labelled chips | three differences | S-04 |
| 10 | the sheet | — | the first two chips grey out; the granularity chip stays lit | 1 lit of 3 | only one is interesting | S-09 |
| 11 | the sheet | — | each sheet's block divides — one into coarse pieces, one into many fine ones; the fine one's lit share scatters across the whole sheet | two `Block`s, different grain; scattered lit cells | 128 vs 288 · smeared | S-04 |
| 12 | the sheet | — | the second sheet withdraws; a trend line continues past the edge of frame | one sheet, trend | the direction of travel | S-15 |
| 13 | the sheet | — | everything clears to a single line of handwriting | one line, alone | **compute, not memory** | S-11 |
| 14 | the sheet | — | §1's opening frame redraws itself exactly: two sheets, one chip and eight | two `Block`s + `Rig` ×1, ×8 | the ring closes | S-10 |
| 15 | the sheet | — | nothing moves | the same frame, held | now you know why | S-10 |

### Board notes

- **One camera move**, at beat 2, back to the sheet §1 opened on. Beats 3–14
  are still, and the stillness matters: the last third of this section is the
  same frame twice, and the second time is the payoff.
- **Beats 13–14 are §1 beats 1–3, redrawn.** Same two blocks, same chip counts,
  same positions. Not a callback *about* the opening — the opening itself,
  returned to. `NCASE_EVOLUTION_OF_TRUST.md` §6: Trust's outro reuses its own
  first nouns, *trenches* and *No Man's Land*, and that is what makes the ring
  close rather than merely rhyme.
- **Beat 12 is the only frame in the video with nothing on it but one line.**
  The thesis is said once, and nothing competes with it. v8 said it at beat 5
  as well, which is why it needed protecting here.
- **Beat 6's two columns must be wildly unequal.** If they are comparable
  heights the viewer reads a trade-off; the claim is that one of them does not
  move at all.
- **Beat 9's two grains must be visibly different sizes**, not different
  colours. The argument is about how finely the same mass is divided, and a
  colour difference says "different kind" instead of "same thing, cut smaller".
- No question anywhere in this section, deliberately. It is the verdict.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank** — small or fast, not both. So what did it buy? |
| 2–3 | **concede** — the compute saving is real, and say so plainly |
| 4 | **but** — all of it still has to be reachable |
| 5–6 | **teach** — work and space are two different numbers |
| 7–8 | **the surprise** — two models, same share, different machines |
| 9–10 | **separate** — three differences, and which one actually matters |
| 11 | **teach** — fine-graining is why it is better, and why the share is smeared |
| 12 | **the corollary** — nobody else in the field says this |
| 13 | **the thesis** — once, alone, at the end |
| 14–15 | **the ring** — §1's frame, now readable |

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
- **The scope of the granularity argument, stated once.** §12 concedes that no
  expert-locality figure has been published at 288 experts and top-8 — every
  one we cite is from eight-expert, top-2 models. So this section may say:
  granularity spreads the active weight across the whole checkpoint rather than
  leaving it in one place (geometry, not measurement), and the active-parameter
  figure cannot tell you what machine you need (the thesis). It may **not** say
  that fine-graining defeats caching, or present "harder to hold" as a measured
  law. Beat 12 said the latter until 2026-09-11. If this note and the spoken
  line ever disagree again, **the narrower one is right.**
- **Never let fine-graining explain the footprint.** ~58 GiB against ~306 GiB
  is total parameters (116.8B vs 321B) and shipped precision (MXFP4 vs FP8).
  Granularity contributes essentially nothing to file size. v9's beat 9 said
  *"the difference is that this one is chopped finer"* directly after the
  one-card/four-card frame, over a picture that divided the blocks — so the
  image made smaller experts look like the cause of more GPUs. It is the most
  dangerous claim in the payoff, because it is the one a knowledgeable viewer
  can disprove with two numbers. Granularity's real consequence is where the
  active weight *sits*, which is beat 10's job.
- Honest at 4-bit too: ~58 GiB against ~153 GiB. One against two. The direction
  never reverses, which is why beat 11 is safe to say.

## Assets

| Need | Status |
| --- | --- |
| the three differences, two dimmable | **have** — `Differences`, added 2026-09-11, verified by rendering |
| §1's exact opening frame | **have** — `Rig` moved from §1 into `paper/cast/Props` so both sections draw the same object |
| `CostBars` | have |
| the model, whole and heavy | have |
| two model cards with chip counts and grain | **built** — `ModelCard`, two of them |
| `VerdictCard` | have |
