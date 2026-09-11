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
| Target | ~17 beats · ~1:25 |
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
no topic named. Ours is now two models with the same headline number and four
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

> **1.** *(two paper blocks, side by side, identical. five percent of each is
> live; the rest is grey)* Here are two AI models. Both of them use about five
> percent of themselves to answer you.
>
> **2.** *(one graphics card slides in under the left block)* This one runs on
> a single graphics card.
>
> **3.** *(three more cards stack under the right block)* This one needs four.

No product names, no spec table, no "today we're talking about". The
contradiction is complete and checkable at 0:13: gpt-oss-120b is ~58 GiB at
MXFP4 and fits one 80 GB card; GLM-5.3-Flash is ~306 GiB at FP8 and does not
fit four. Table and sources: `STORY_SPINE.md` §1. Say **"about five percent"** —
4.4% and 5.6% are the same claim.

### Act 2 — the inversion and the promise (beats 4–6, 0:13–0:32) · **S-02**, **S-03**

> **4.** *(the four cards stay. the phrase "only 5% active" writes itself
> across both blocks)* "Only five percent active" is the number everybody
> quotes to explain why these models are cheap to run now. Both of these have
> it. Only one of them is cheap.
>
> **5.** *(the two blocks hold, unequal)* So what is that number actually
> telling you?
>
> **6.** *(the right-hand block and its four cards slide away; one block left)*
> I'm going to follow one word all the way through this thing. By the end
> you'll know exactly what "five percent active" buys you — and what it
> doesn't.

Beat 4 is the whole reason the opening works. `STORY_SPINE.md` §3 says the
audience for an MoE video *already believes it understands MoE* — "only a few
parts run, so you only need to load a few parts, it's cheaper." Beat 4 names
that belief back to them as the thing that is about to break.

Beat 6 is the promise, at ~0:26, inside the only retention deadline I would
defend as tier A.

### Act 3 — now the words, because now they are earned (beats 7–11, 0:32–0:56) · **S-04**

> **7.** *(the block sits alone, whole)* This is the model. All of it.
>
> **8.** *(it breaks into a field of tiny separate marks)* Three hundred and
> twenty billion numbers in one very big file. Each one is something it learned
> while it was being trained. That's what a parameter is.
>
> **9.** *(the marks resolve; about five percent of them go live)* And when a
> word comes in, about five percent of them do something.
>
> **10.** *(camera pushes in — the only move in the section)* Let's get closer.
>
> **11.** *(288 pieces, in rows)* Up close, they're not one lump. They're in
> separate pieces — two hundred and eighty-eight of them, in each part of the
> model.

Sanderson, *Concrete before Abstract*: *"resist the temptation to open a topic
by describing a general result or definition"* — let examples precede
generality. "Parameter" arrives at beat 8, after the viewer has watched the
block behave twice. v8 defined three terms inside twenty seconds.

### Act 4 — the bet (beats 12–13, 0:56–1:06) · **S-05**

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

### Act 5 — the name and the wall (beats 14–17, 1:06–1:25) · **S-12**, **S-14**

> **14.** *(the 280 stay grey)* Eight do the work. The other two hundred and
> eighty do nothing at all.
>
> **15.** *(the eight lit pieces line up with the live sliver from beat 9)*
> There's your five percent. That's where it comes from.
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
| 2 | the sheet | — | one graphics card slides in under the left block | `MachineBox` ×1 | — | S-01 |
| 3 | the sheet | — | three more cards stack under the right block | `MachineBox` ×4 | — | S-01 |
| 4 | the sheet | — | the quoted phrase writes itself across both blocks | handwritten note | **`only 5% active`** | S-02 |
| 5 | the sheet | — | the blocks hold, visibly unequal underneath | both blocks, 1 vs 4 cards | — | S-02 |
| 6 | the sheet | — | the right block and its four cards slide out of frame | one `Block` left | — | S-03 |
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

Total ≈ 1:24. Beat seconds are a 145-wpm floor; set them from the recording.
