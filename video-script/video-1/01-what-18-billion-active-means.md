# Section 01 — What "five percent active" actually costs

Status: **SCRIPT v10.** Every beat cites a strategy from
`skills/STRATEGY_LEDGER.md`, and no beat uses a technique that is not in it.

Replaces v9 (written the same day, before the research). v9 was built on a
three-phase retention frame that turns out to be **tier B** — a marketing blog,
no study — and it got three things wrong as a result. See *What the research
changed* below.

Spine: `storyboard/video-1/STORY_SPINE.md` v5 · Numbers: `research/glm/GROUND_TRUTH.md`
Strategies: `skills/STRATEGY_LEDGER.md` ·
Teacher for the shape: `skills/ncase/NCASE_EVOLUTION_OF_TRUST.md` §1

## Contract

| | |
| --- | --- |
| Teaches | parameter, expert, active, Mixture of Experts |
| Answers | **"five percent active" does not predict what hardware you need** |
| Exits on | who picks the eight, and why is *that* the expensive question? |
| Built | 17 beats · 2:13 · `npm run timing` is the authority |
| Never says | `token`, `layer`, `attention`, `bandwidth`, `VRAM`, `router` |
| **Must not say** | why you cannot store only the active part. **That is §11.** |
| Hard-bet budget | **uses 1 of 2** (beat 12). The other is reserved for §07. |

## What the research changed

Three corrections to my own v9 draft, each from a named source.

**1. The promise was too late.** v9 asked a question at 0:00 and did not say
what the video would give you until beat 10, around 0:40. **S-03** kills that:
Sanderson's SoME criterion is verbatim *"It should be clear to the
reader/viewer within the first 30 seconds why they should care"*, and Trust
states its outcome — *"game theory can help explain… and how we can fix it"* —
**before** the first interaction. Withhold the *mechanism*, never the
*promise*. The promise is now beat 6, at ~0:26.

**2. The bet was in the wrong place and was the wrong bet.** v9 opened with
*"how much of this thing just ran? Go on, guess"* at 0:08 — a deliberate held
pause sitting exactly where the retention curve is steepest, delaying the hook.
**S-05** also says hard prediction is *scarce*: Trust uses commit-and-branch
prediction **exactly twice in twenty minutes**, and only where the answer is
counterintuitive. "How much of it runs" is the video's premise, not a surprise.
**"288 experts — how many run?"** is a real surprise, and it is now beat 12,
after the hook has landed.

**3. It opened on the subject, not on a contradiction.** **S-01**: Trust opens
*"During World War I, peace broke out."* — six words, contradiction complete,
no topic named. Ours is now two models with the same headline number and eight
times the hardware between them, which is also **S-15**, the only thing in this
field nobody else is saying.

And the move v9 missed entirely — **S-02**, the inversion onto the viewer.
Trust's third move is *"Meanwhile: it's 2017… we suck at trust"*: the
historical fact was the setup, the payload is that it implicates you. Ours is
beat 4: the number you have been quoting is the number that misled you.

---

## The script

Strategy IDs are load-bearing. `skills/STRATEGY_LEDGER.md` says who taught each
one and how good the evidence is; a `C` tier there means I inferred it.

### Act 1 — the contradiction (beats 1–3, 0:00–0:13) · **S-01**

> **1.** *(two paper blocks, side by side, identical. five percent of each is > live;
> the rest is grey)* Two AI models. Both use about five percent of themselves
> to answer you.
>
> **2.** *(one chip slides in under the left block)* This one runs on a
> single chip.
>
> **3.** *(seven more cards stack under the right block)* This one needs eight.

No product names, no spec table, no "today we're talking about". The
contradiction is complete and checkable at 0:13: gpt-oss-120b is ~58 GiB at
MXFP4 and fits one 80 GB card; GLM-5.3-Flash is ~306 GiB at FP8 and does not
fit four — it needs **eight**. Table, working and sources:
`research/glm/GROUND_TRUTH.md` §"How many GPUs". Say **"about five percent"** —
4.4% and 5.6% are the same claim.

### Act 2 — the inversion and the promise (beats 4–6, 0:13–0:38) · **S-02**, **S-03**

> **4.** *(the eight cards stay. the phrase "only 5% active" writes itself > across >
> both blocks)* Everyone quotes that number to say these models are cheap now.
> Both have it. Only one of them is.
>
> **5.** *(the two blocks hold, unequal)* Same five percent. Eight times the machine.
>
> **6.** *(the right-hand block and its eight cards slide away; one block left)* By
> the end of this you’ll know exactly what that number buys you — and what it
> doesn’t. We’re going to follow one word all the way through.

Beat 4 is the whole reason the opening works. `STORY_SPINE.md` §3 says the
audience for an MoE video *already believes it understands MoE* — "only a few
parts run, so you only need to load a few parts, it's cheaper." Beat 4 names
that belief back to them as the thing that is about to break.

Beat 6 **opens** on the value — *"by the end of this you'll know"* — rather
than working up to it. That matters: a reviewer pointed out that the beat
starting inside the deadline is not the same as the promise being *spoken*
inside it, and the earlier draft buried the payoff twenty words in, at about
0:37. The pivot question that used to sit in front of it is gone entirely.
`npm run restamp 01` prints where it actually lands.

### Act 3 — now the words, because now they are earned (beats 7–11, 0:38–1:18) · **S-04**

> **7.** *(the block sits alone, whole)* This is the model. All of it.
>
> **8.** *(it breaks into a field of tiny separate marks)* Three hundred and twenty
> billion numbers — that’s what there is to store. Each one is something it
> learned while it was being trained. That’s what a parameter is.
>
> **9.** *(the marks resolve; about five percent of them go live)* And when a
> token comes in, about five percent of them do something.
>
> **10.** *(camera pushes in — the only move in the section)* Let's get closer.
>
> **11.** *(288 pieces, in rows)* Up close, it’s not one lump. This is one small part
> of the model — and there are two hundred and eighty-eight separate pieces in
> it.

Sanderson, *Concrete before Abstract*: *"resist the temptation to open a topic
by describing a general result or definition"* — let examples precede
generality. "Parameter" arrives at beat 8, after the viewer has watched the
block behave twice. v8 defined three terms inside twenty seconds.

### Act 4 — the bet (beats 12–13, 1:18–1:31) · **S-05**

> **12.** *(the 288 sit still. nothing moves. the question stays up)* Two
> hundred and eighty-eight of them. One word comes in. **How many do you
> reckon actually run?**
>
> **13.** *(eight light up. the other 280 stay flat)* Eight.

This is **one of only two hard bets in the whole video**, and it is spent here
because the answer is genuinely counterintuitive — eight of 288 is 2.8%, and
nobody guesses that low. Richland, Kornell & Kao (2009) is why the wrong guess
still helps: attempting an answer before instruction improves retention *even
for items the learner got wrong*.

Beat 12 is a held beat with nothing happening, on purpose. It is the only such
beat in the section. `skills/ncase/NCASE_4_MORE_DESIGN_PATTERNS.md` §2: the
guess and the answer must occupy **the same space** — the 288 do not move
between beat 12 and beat 13, and the eight light up in place.

### Act 5 — the name and the wall (beats 14–17, 1:31–2:13) · **S-12**, **S-14**

> **14.** *(the 280 stay grey)* Eight get picked. The other two hundred and eighty do
> nothing at all.
>
> **15.** *(the eight lit pieces line up with the live sliver from beat 9)* You might
> think that’s the five percent. It isn’t — this is one small part of the
> model, and there’s more in here than these, and plenty that runs every time
> regardless. Hold onto that.
>
> **16.** *(the whole arrangement sits still)* And this has a name. It's called
> a Mixture of Experts. Those pieces are the experts.
>
> **17.** *(the eight stay lit; everything else recedes)* So — who picks the
> eight? And why does that turn out to be the expensive question?

Beat 16 names the mechanism **after** the viewer has watched it work — **S-12**,
which is **tier C: my inference from Trust withholding its own title word.**
Not sourced, and flagged as such.

Beat 17 is the chapter wall. It states what the section settled and names the
one thing now missing; §02 opens by banking exactly that. **S-14**.

## What is deliberately not here

- **No answer.** Why you cannot store only the active part is §11. This section
  asserts nothing it does not show: five percent is shown, the two machines are
  shown, the eight of 288 are shown. Only the *consequence* is held.
- **No second hard bet.** Budget is two (S-05). The other is §07: *"same word,
  next floor up — same eight?"*
- **No stake about my own machine.** Ahmad's note: it is not relatable as an
  opening. The inversion in beat 4 does that job instead, using the viewer's
  own belief rather than my hardware.

## Storyboard

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the sheet | — | two model blocks arrive side by side, five percent live on each | two `Block`s, 5% lit | — | S-01 |
| 2 | the sheet | — | one chip slides in under the left block | `MachineBox` ×1 | — | S-01 |
| 3 | the sheet | — | seven more cards stack under the right block | `Rig` ×8 | — | S-01 |
| 4 | the sheet | — | the quoted phrase writes itself across both blocks | handwritten note | **`only 5% active`** | S-02 |
| 5 | the sheet | — | the blocks hold, visibly unequal underneath | both blocks, 1 vs 4 cards | — | S-02 |
| 6 | the sheet | — | the right block and its eight cards slide out of frame | one `Block` left | — | S-03 |
| 7 | the sheet | — | the block settles alone, whole | `Block` solid | — | S-04 |
| 8 | the sheet | — | it breaks into a field of separate marks | `Block` scattered | **`320,000,000,000`** | S-04 |
| 9 | the sheet | — | the marks resolve and about five percent go live | `Block`, 5% lit | — | S-04 |
| 10 | inside | **push in** | the camera moves in on the lit region | the block filling frame | — | S-04 |
| 11 | inside | — | 288 separate pieces appear in rows | `Hospital` staffed | — | S-04 |
| 12 | inside | — | everything stops; the question holds on screen | the 288, still | **`how many run?`** | S-05 |
| 13 | inside | — | eight of them light, in place | `Hospital` lit ×8 | — | S-05 |
| 14 | inside | — | the other 280 stay flat and grey | `Hospital` quiet | — | S-05 |
| 15 | inside | — | the eight line up with beat 9's live sliver | brace between them | — | S-14 |
| 16 | inside | — | the arrangement holds and takes its name | plaque | **`Mixture of Experts`** | S-12 |
| 17 | inside, one part | **push in** | everything recedes but the eight | `Hospital` focus | — | S-14 |

Beat seconds are a 145-wpm floor plus a breath; set them from the recording.
The coded runtime is whatever `npm run restamp 01` prints — **do not write a
total here.** A hand-typed total is how this script came to claim 1:24 and
2:13 in the same file while the code said 2:15.

### Board notes

- **Nine beats in one place, then one camera move.** Beats 1–9 never change
  where you are. The push-in at 10 is the only move in the section, and the
  stillness before it is what makes it mean *we are going inside this thing*
  rather than *here is a new slide*.
- **The two blocks are one comparison, not two subjects.** They arrive
  together, they get the same treatment, and the only thing that differs is
  what is underneath them. If the right-hand block ever gets its own moment,
  the section has become about two models instead of about one number.
- **Beat 4's phrase is sticky and beats 2–3's counts are sticky.** Found by
  rendering: without it, "one" left the screen as "eight" arrived and the
  contradiction never existed in a single frame. A comparison needs both halves
  visible at once or it is two facts in sequence.
- **Beat 6 clears everything.** The second model and both rigs leave together,
  so Act 3 starts on one object with nothing borrowed from the comparison.
- **Beat 12 is a held beat with nothing happening.** The only one in the
  section. It is the bet, and a bet needs air — if something moves, the viewer
  watches instead of guessing.
- **The 288 do not move between 12 and 13.** The guess and the answer occupy
  the same space, which is the whole mechanism of Place Your Bets. Eight light
  up *in place*.
- **All 288 are drawn.** Not a representative sample. §12's whole argument
  depends on 288 being felt as a large number, and a grid of 72 standing in for
  288 makes the model four times less selective than it is — which is the
  single worst fault in the GPT cut (`storyboard/video-2-gpt/GPT_REVIEW.md`).

## Line jobs

| Beat | Job |
| --- | --- |
| 1–3 | **the contradiction** — two objects and a visible difference. No topic named |
| 4 | **the inversion** — the viewer's own belief, named back to them |
| 5 | hold — the unequal thing sits there |
| 6 | **the promise** — what they get for staying, by 0:26 |
| 7–9 | **teach** — parameter, and the five percent, on events |
| 10 | the only camera move |
| 11 | **teach** — 288 separate pieces |
| 12 | **the bet** — the one commit in this section |
| 13–15 | **the reveal** — eight, the idle 280, and where 5% came from |
| 16 | **the name** — after it has been watched working |
| 17 | **the wall** — what is settled, and what is now missing |

## Truth notes

- **321B, said as "three hundred and twenty billion."** The round number is
  what the field quotes and what the viewer will have seen. `GROUND_TRUTH.md`
  carries the exact figure; §13 is where precision matters.
- **"About five percent" is doing real work.** gpt-oss-120b is 4.4% active and
  GLM-5.3-Flash is 5.6%. Saying *about five percent* makes one true sentence
  cover both, and the contradiction is honest at either precision.
  `storyboard/video-1/STORY_SPINE.md` §1.
- **One card versus eight is checkable, and was wrong until 2026-09-11.**
  ~58 GiB at MXFP4 fits one 80 GB accelerator. ~306 GiB at FP8 is 328.6 GB and
  does **not** fit four cards' 320 GB; tensor-parallel size must divide the 64
  attention heads, so the smallest workable count is **eight**. This bullet
  used to say "four" in the same breath as "does not fit four".
  `research/glm/GROUND_TRUTH.md` §"How many GPUs".
- **The two models are not named on screen.** Naming them invites "which is
  better", which is not the question. They are *two models*, and the difference
  between them is the only thing being claimed.
- **Nothing here says why you cannot store the active part.** That is §11, and
  saying it here is what v8 did wrong.
- **Eight of 288 is not the five percent, and beat 15 exists to refuse that
  sum.** `GROUND_TRUTH.md` calls this the disqualifying error: 8 ÷ 288 is 2.8%
  of the routed weight in *one* sparse layer, while 18 ÷ 321 is 5.6% of the
  model, and neither causes the other. Measured at FP8, the routed experts are
  ~8.5 GB of an ~18 GB active path — **under half**. v10 said *"there's your
  five percent, that's where it comes from"* over a frame of eight lit experts,
  which is exactly the error, and a reviewer caught it rather than any gate.
- **280 idle is correct, and the shared expert is a 289th object.**
  `n_routed_experts` is 288 and `n_shared_experts` is 1 **on top of it** — the
  always-on expert is not one of the 288. My first attempt at this said "279
  idle, one always on", which was a worse error than the omission it fixed.
  The shared expert has no frame in this section, so it is introduced in §5
  beat 10 where it has a picture; §1 only has to avoid implying the 288 are
  everything, which beat 15 now does.

## Frames

- Beat 1: the two blocks must be the **same size** and read as the same kind of
  object. Their lit regions are deliberately **different patches** — the active
  part is not in the same place in both, and that is quietly true.
- Beats 2–3: one card, then eight. The eight must not be a stack or a bigger
  box — eight separate objects, so the count is countable at a glance. At eight
  they may need two rows of four; they must still read as eight things.
- Beat 5: the brace spans **both** blocks. `brace`'s x is its left edge.
- Beat 12: nothing on screen but the 288 and the question.
- Beat 15: the eight lit pieces and beat 9's live sliver are the same claim
  arriving twice; they need to be visibly the same proportion.

## Assets

| Need | Status |
| --- | --- |
| a second `Block`, comparable, independently lit | **built** — `block2` |
| a row of machines under a block | **built** — `Rig`, local to this section |
| `Hospital` at 288 with eight lit | **have** |
