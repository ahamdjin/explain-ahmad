# Section 13 — What that number actually bought

Status: **SCRIPT v9.** Written to spine v5. Every beat cites a strategy from
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

### Act 1 — banking the price (beat 1) · **S-14**

> **1.** Small, or fast. Not both. So — what did "five percent active" actually buy?
>
### Act 2 — what the number actually bought (beats 2–9) · **S-04**

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
> **7.** And here’s the part I didn’t expect. This model has a hundred and twenty
> billion parameters, and it fits on one chip. This one has three hundred and
> twenty, and needs four.
>
> **8.** Both of them use about five percent of themselves to answer you.
>
> **9.** The difference is that this one is chopped finer. More experts, smaller
> each.
>
### Act 3 — the finer the slice, the wider the gap (beat 10) · **S-15**

> **10.** Which is exactly **why it's better** — and exactly why it's harder to
> hold.
>
### Act 4 — the thesis, once (beat 11) · **S-11**

> **11.** So the better these models get at using less of themselves, the more
> of them you have to keep lying around.
>
### Act 5 — back to the two models (beat 12) · **S-10**

> **12.** Two models. Both about five percent active. One of them runs on a single
> card; the other one needs four. Now you know why. "Active parameters" is a
> compute number, not a memory number — and the finer you slice the experts,
> the wider that gap gets.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the plan | — | the plan dissolves; `18` rises and holds alone | `BigNumber` | `18B` | S-14 |
| 2 | the sheet | **pan** | we slide back to what §1 opened on: the number, and the block behind it | `BigNumber`, `Block` | `18 billion` over the block | S-04 |
| 3 | the sheet | — | a small work bar draws itself beside the sheet | `CostBars`, work only | 1/20th the thinking | S-04 |
| 4 | the sheet | — | the block from §1 returns behind it, whole, and settles heavily | `Block`, whole | all of it, reachable | S-04 |
| 5 | the sheet | — | a label lands between the bar and the block | `Note` in `claim` orange | "efficient" | S-04 |
| 6 | the sheet | — | the bar and the block separate into two labelled halves | two columns | compute / memory | S-04 |
| 7 | the sheet | — | a second sheet slides in beside the first; chips stack under each | two `ModelSheet`s, 1 chip vs 4 | 117B → 1 · 321B → 4 | S-04 |
| 8 | the sheet | — | both sheets light their active share; the two shares match | two lit patches | ~5% both | S-04 |
| 9 | the sheet | — | each sheet's block divides — one into coarse pieces, one into many fine ones | two `Block`s, different grain | 128 vs 288 | S-04 |
| 10 | the sheet | — | the fine-grained one's chip stack grows while its pieces get smaller | grain vs chips | better · harder | S-15 |
| 11 | the sheet | — | the second sheet withdraws; ours holds with its four chips | one sheet, 4 chips | the trend | S-11 |
| 12 | the sheet | — | everything clears to one card | `VerdictCard` | **cheap to run ≠ small** | S-10 |

### Board notes

- **One camera move**, beat 2, back to where we opened — and the callback must
  be to the frame §1 **actually has**. This row originally asked for the opening
  `ModelSheet`; §1 has no spec sheet, on purpose (*no spec read* is the first
  rule of that opening), so beat 2 returns to the number and the block instead.
  A callback to a frame that does not exist is worse than no callback.
- **Beat 3 concedes first.** The true half gets a frame of its own before any
  qualification. A verdict that only convicts reads as a debunk.
- Beat 5 is one of `claim` orange's three budgeted uses in the whole video.
  `art-direction/PALETTE.md`.
- **Beats 9–10 are the carrying frames** and the *oh-now-I-see*: two blocks,
  one coarse and one fine, with the fine one carrying four chips. The trend, as
  a picture, with no line of voice-over needed to explain it.
- Beat 7 draws **four chips, not a rack.** A rack is an unquantified "lots";
  four is the promise.
- No new mechanism appears anywhere in this section. Anything needing
  explanation belonged earlier.

---

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
| two model cards with chip counts and grain | **built** — `ModelCard`, two of them |
| `VerdictCard` | have |
