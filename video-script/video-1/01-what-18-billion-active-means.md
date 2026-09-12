# Section 01 — What "five percent active" actually costs

Status: **SCRIPT v10.** Every beat cites a strategy from
`skills/STRATEGY_LEDGER.md`, and no beat uses a technique that is not in it.

Spine: `storyboard/video-1/STORY_SPINE.md` v5 · Numbers: `research/glm/GROUND_TRUTH.md`
Strategies: `skills/STRATEGY_LEDGER.md` ·
Teacher for the shape: `skills/ncase/NCASE_EVOLUTION_OF_TRUST.md` §1

## Contract

| | |
| --- | --- |
| Teaches | parameter, expert, active, Mixture of Experts |
| Answers | **"five percent active" does not predict what hardware you need** |
| Exits on | who picks the eight, and why is *that* the expensive question? |
| Built | 23 beats · 2:40 planned · `npm run timing` is the authority |
| Never says | `layer`, `attention`, `bandwidth`, `VRAM`, `router` |
| **Must not say** | why you cannot store only the active part. **That is §11.** |
| Hard-bet budget | **uses 1 of 2** (beat 18). The other is reserved for §07. |

## Why this opening exists

The opening now starts on the one object that needs no explanation: a chat
window. It then turns through that screen and shows the disproportion behind
one generated piece of text — forty-five floors, a room of 288 specialists,
and 336 specialist uses — before asking the hardware question.

The value promise starts on beat 6, while that disproportion is still on
screen. This protects the first-thirty-seconds job without answering the
mechanism early: the viewer is told **what question the film will settle**, not
how it will settle it.

The 1-chip / 8-chip comparison is derived in `research/glm/GROUND_TRUTH.md`.
The comparison is intentionally about hardware footprint, not about whether
sparse compute itself is cheap.

---

## The script

**This block mirrors `section-01/beats.ts`.** `npm run drift` is what keeps the
spoken lines identical; the build is the authority for beat timing.

### Act 1 — the screen, what is behind it, and the promise (beats 1–6) · **S-01**, **S-03**

> **1.** *(A chat window. A question types itself in.)* You type something into one of these.
>
> **2.** *(It answers. One word, and it stops there.)* And it starts answering. One word.
>
> **3.** *(The window turns edge-on and we pass behind it.)* Here is what happened behind that one word.
>
> **4.** *(A tower rises behind the glass.)* It went up forty-five floors.
>
> **5.** *(Behind the tower, a room with 288 in it.)* On most of those floors, a room with two hundred and eighty-eight specialists in it.
>
> **6.** *(The counter runs to 336 while the value promise lands.)* By the end, you’ll know why using only a small part can still mean a huge machine. Across that climb, those specialists got used three hundred and thirty-six times. For one token.

### Act 2 — the claim and the hardware contradiction (beats 7–12) · **S-01**, **S-02**, **S-03**

> **7.** *(The machinery clears; two model sheets arrive, both five percent lit.)* And they tell you only about five percent of it ever runs. Here are two models. Both about five percent.
>
> **8.** *(One chip.)* This one runs on a single chip.
>
> **9.** *(Eight of them.)* This one needs eight.
>
> **10.** *(The number everybody quotes.)* Both of them have that number. Clearly, that number alone doesn’t tell you how much hardware you need.
>
> **11.** *(Level above, unequal below.)* Same five percent. Eight times the machine.
>
> **12.** *(The comparison clears to one model.)* So now, let’s follow one token all the way through.

### Act 3 — concrete before abstract (beats 13–17) · **S-04**

> **13.** *(The model, whole.)* This is the model. All of it.
>
> **14.** *(It breaks into marks.)* Three hundred and twenty billion numbers — that’s what there is to store. Each one is something it learned while it was being trained. That’s what a parameter is.
>
> **15.** *(Five percent goes live.)* And when a token comes in, about five percent of them do something.
>
> **16.** *(The camera pushes into the block.)* Let’s get closer.
>
> **17.** *(The surface resolves into the room from beat 5.)* That room again. Two hundred and eighty-eight separate pieces — and this is one small part of the model.

### Act 4 — the bet (beats 18–21) · **S-05**

> **18.** *(Nothing happens. The viewer bets.)* Two hundred and eighty-eight of them. One word comes in. How many do you reckon actually run?
>
> **19.** *(Eight.)* Eight.
>
> **20.** *(The other 280 do nothing.)* Eight get picked. The other two hundred and eighty do nothing at all.
>
> **21.** *(Eight of 288 is not the five percent.)* You might think that’s the five percent. It isn’t. This is one small part, and plenty more runs every time regardless. Hold onto that.

### Act 5 — the name and the wall (beats 22–23) · **S-12**, **S-14**

> **22.** *(It takes its name.)* And this has a name. It’s called a Mixture of Experts. Those pieces are the experts.
>
> **23.** *(The chapter wall.)* So — who picks the eight? And why does that turn out to be the expensive question?

## Storyboard

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | a screen | — | a chat window; a question types itself in | `Chat`, model name small on chrome | **`GLM-5.3-Flash`** | S-01 |
| 2 | a screen | — | it answers and stops on one word | `Chat` reply, caret holding | **`Because`** | S-01 |
| 3 | behind the screen | **turn through** | the window goes edge-on; we pass behind it and it holds at the left edge | `Chat` turned, small | — | S-01 |
| 4 | behind the screen | — | a tower rises behind the glass | `Tower`, 45 floors | — | S-01 |
| 5 | behind the screen | — | a room of 288 appears beside the tower | `Hospital` staffed | — | S-01 |
| 6 | behind the screen | — | the promise lands while a counter runs to 336 | `Counter` → 336 | **`uses — one token`** | S-03 |
| 7 | the sheet | **back out** | machinery clears; two model sheets arrive side by side, left coarse and right fine, five percent live on each | two `Block`s, 5% lit | — | S-01 |
| 8 | the sheet | — | one chip slides in under the left block | `Rig` ×1 | — | S-01 |
| 9 | the sheet | — | seven more chips stack under the right block | `Rig` ×8 | — | S-01 |
| 10 | the sheet | — | the quoted phrase writes itself across both blocks | handwritten note | **`only 5% active`** | S-02 |
| 11 | the sheet | — | the blocks hold, visibly unequal underneath | both blocks, **1 vs 8** chips | — | S-02 |
| 12 | the sheet | — | the left block and its single chip leave; the eight-chip model remains | one `Block` left | — | S-03 |
| 13 | the sheet | — | the block settles alone, whole | `Block` solid | — | S-04 |
| 14 | the sheet | — | it breaks into a field of separate marks | `Block` scattered | **`320,000,000,000`** | S-04 |
| 15 | the sheet | — | the marks resolve and about five percent go live | `Block`, 5% lit | — | S-04 |
| 16 | inside | **push in** | the camera moves in on the lit region | block filling frame | — | S-04 |
| 17 | inside | — | the room from beat 5 returns at full scale | `Hospital` staffed | 288 | S-04 |
| 18 | inside | — | everything stops; the question holds | the 288, still | **`how many run?`** | S-05 |
| 19 | inside | — | eight light up in place | `Hospital` lit ×8 | — | S-05 |
| 20 | inside | — | the other 280 stay flat and grey | `Hospital` idle | **`280 idle`** | S-05 |
| 21 | inside | — | the frame explicitly refuses to equate 8/288 with 5% of the model | lit 8 + note | **`not 5% of the model`** | S-14 |
| 22 | inside | — | the arrangement takes its name | plaque | **`Mixture of Experts`** | S-12 |
| 23 | inside, one part | **push in** | everything recedes but the chosen area and the unlabelled desk | `Hospital` focus + desk | — | S-14 |

Beat seconds are placeholders until the real recording. `npm run timing` is the
authority; after VO, restamp from measured audio.

### Board notes

- **The opening has a coastline.** Chat is familiar; the camera then literally
  goes behind it. Forty-five, 288 and 336 therefore belong to the thing the
  viewer just used rather than arriving as free-floating diagrams.
- **336 is a count of uses/visits, not 336 distinct specialists.** The old line
  *"336 of them got pulled in"* was wrong because it followed a wall of 288 and
  naturally read as 336 different experts.
- **Beat 6 carries the promise.** The promise begins immediately on that beat;
  the viewer does not wait until the 1-vs-8 comparison has finished to learn
  why the film is worth staying for.
- **The hardware comparison keeps both halves visible at once.** Beats 8–11
  must show one and eight simultaneously; otherwise the contradiction becomes
  two unrelated facts.
- **Beat 12 clears the comparison.** From there onward the film follows one
  model and one token.
- **The 288 do not move between beats 18 and 19.** The guess and the answer
  occupy the same space; eight light up in place.
- **All 288 are drawn.** Not a representative sample. The later 12,096 argument
  depends on the scale being felt honestly here.

## Line jobs

| Beat | Job |
| --- | --- |
| 1–3 | familiar world → go behind it |
| 4–5 | **disproportion** — 45 floors, 288 specialists |
| 6 | **promise + hook number** — why so little work can still need so much machine; 336 uses/token |
| 7–11 | **contradiction** — about 5% active, one chip vs eight |
| 12 | **turn** — follow one token through |
| 13–17 | **teach** — model, parameter, active share, return to the 288 room |
| 18 | **hard bet** — how many run? |
| 19–21 | **reveal and correction** — eight, 280 idle, and 8/288 is not the model's 5% |
| 22 | **name** — Mixture of Experts, after the viewer has seen it |
| 23 | **wall** — who picks the eight, and why is that expensive? |

## Truth notes

- **321B, said as "three hundred and twenty billion."** The round number is
  what the field quotes; `GROUND_TRUTH.md` carries the exact figure.
- **"About five percent" is doing real work.** gpt-oss-120b is 4.4% active and
  GLM-5.3-Flash is 5.6%.
- **One chip versus eight is derived and checkable.** ~58 GiB at MXFP4 fits one
  80 GB accelerator. ~306 GiB at FP8 is 328.6 GB and does not fit four cards'
  320 GB; tensor-parallel size must divide the 64 attention heads, so the
  smallest workable count is eight. `research/glm/GROUND_TRUTH.md`.
- **Nothing here says why you cannot store only the active part.** That is §11.
- **Eight of 288 is not the five percent.** 8 ÷ 288 is 2.8% of routed weight in
  one sparse layer; 18 ÷ 321 is 5.6% of the whole model. They are different
  claims and neither causes the other.
- **280 idle is correct.** The shared expert is a 289th additional expert, not
  one of the 288 routed experts; it is introduced later where it has a frame.

## Frames

- Beats 1–6: the chat stays visibly connected to the machinery behind it.
- Beats 8–11: the chips must remain countable as **one versus eight**.
- Beat 18: nothing on screen but the 288 and the question.
- Beat 21: the correction `not 5% of the model` must be legible before moving on.

## Assets

| Need | Status |
| --- | --- |
| chat window and turned state | **have** — `Chat` |
| 45-floor tower | **have** — `Tower` |
| counter to 336 | **have** — `Counter` |
| second `Block`, independently lit | **built** — `block2` |
| 1-vs-8 accelerator rig | **built** — `Rig` |
| `Hospital` at 288 with eight lit | **have** |
