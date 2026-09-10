# Section 01 — What "five percent active" actually costs

Status: **SCRIPT v9.** Written to spine v5 — *the intro asks, §11 answers.*
Replaces v8, which opened on a bare number and gave the whole answer away at
1:20. v8's own note argued for that; Ahmad watched it and reported the video
"feels disconnected", with no sense of where the intro ended. He is right, and
the cause is below.

Spine: `storyboard/STORY_SPINE.md` · Numbers: `research/glm/GROUND_TRUTH.md`
Hook research: `research/RETENTION_AND_ANGLE.md` ·
Method: `skills/ncase/NCASE_EVOLUTION_OF_TRUST.md`

## Contract

| | |
| --- | --- |
| Teaches | parameter, expert, active, Mixture of Experts |
| Answers | **about five percent of it runs — and that number does not predict the hardware** |
| Exits on | who picks the eight, and why is *that* the expensive question? |
| Therefore | so we go and watch it choose — which is the rest of the video |
| Target | ~19 beats · ~1:22 |
| Never says | `token`, `layer`, `attention`, `bandwidth`, `VRAM`, `router` |
| **Must not say** | why you cannot store only the active part. **That is §11.** |

## What changed, and why

Three faults, all of them mine.

**1. It opened on the subject.** `research/RETENTION_AND_ANGLE.md` scores the
opening in three phases — pattern interrupt (0–5s), specific payoff promise
(5–15s), stakes (15–30s) — and v8 missed all three: a number at 0:00, a
definition at 0:07, and no stake at all. `NCASE_EVOLUTION_OF_TRUST.md` §1 is
the same finding from the other direction: a piece about game theory opens on
the Christmas truce, not on game theory. **Open on a concrete situation with a
contradiction in it.** Ours is the thing every viewer has done — typing into a
box and hitting enter.

**2. The spine's own promise was never built.** `STORY_SPINE.md` §1 states the
promise as *"Two models. Both use about five percent of themselves to answer
you. One runs on a single graphics card. The other needs four."* That is a
verifiable contradiction, it is what §4 of the retention research says to buy,
and no competing video makes it. It is not in v8 anywhere. It is now beats 6–9.

**3. It answered its own question at 1:20** — *"That's the answer. That's the
whole thing."* — and then §11 re-asked it fifteen minutes later. Ahmad's call:
the intro asks, §11 answers. Those five beats are gone.

## The one rule this section exists to obey

**Ask the question. Prove it is a real question. Do not answer it.**

The distinction that keeps this from being v2's mystery bug: v2 asserted an
obstacle and refused to describe it. This section asserts *nothing* it does not
show. Five percent is shown. The two machines are shown. The 288 and the eight
are shown. What is withheld is only the **consequence**, and a withheld
consequence with all its evidence on screen is a hook, not a cheat.
`skills/STORY_STRUCTURE.md` §2.

---

## The script

### Act 1 — the bet (beats 1–5, 0:00–0:20)

> **1.** *(a prompt box, a cursor blinking in it; a message types itself)*
> You type something. You hit enter.
>
> **2.** *(the model arrives whole — one solid block, no label, no spec table)*
> How much of this thing do you reckon just ran, to answer you?
>
> **3.** *(nothing moves. the block sits there. the question stays up)*
> Go on, guess. All of it? Half?
>
> **4.** *(95% of the block goes grey. a thin live sliver stays)*
> About five percent.
>
> **5.** *(hold)*
> Which sounds like very good news.

`Place Your Bets` — `skills/ncase/NCASE_4_MORE_DESIGN_PATTERNS.md` §2. The
guess and the answer occupy the **same block in the same position**, because
the pattern's whole power is spatial comparison. Beat 3 is a held beat with
nothing happening on purpose: it is the only moment in the video that asks the
viewer to commit to a belief, and it needs the air.

### Act 2 — the contradiction (beats 6–10, 0:20–0:45)

> **6.** *(a second block slides in beside the first. both get the same grey
> treatment, the same live sliver)* Here are two models. Both of them use about
> five percent of themselves to answer you.
>
> **7.** *(one graphics card appears under the left block)* This one runs on a
> single graphics card.
>
> **8.** *(three more cards appear under the right block)* This one needs four.
>
> **9.** *(the two sliver-percentages sit level with each other; the cards do
> not)* Same five percent. Four times the machine.
>
> **10.** *(the grey drains back in; one block remains)* So "five percent
> active" is not telling you what you think it's telling you. And I want to
> know what it *is* telling you — that's the video.

Beats 7–8 are the promise, and they are checkable: gpt-oss-120b is ~58 GiB at
MXFP4 and fits one 80 GB card; GLM-5.3-Flash is ~306 GiB at FP8 and does not
fit four. `STORY_SPINE.md` §1 carries the table and the sources. Say **"about
five percent"** — 4.4% and 5.6% are the same claim, and the contradiction is
honest at either precision.

### Act 3 — now the words, because now they are needed (beats 11–14, 0:45–1:05)

> **11.** *(the block breaks into a field of tiny separate marks)* Quick, so
> the rest of this makes sense. A parameter is one number the model learned
> while it was being trained.
>
> **12.** *(the marks resolve back; the count sits under them)* Three hundred
> and twenty billion of them. One very big file.
>
> **13.** *(camera pushes in — the only move in the section)* And they're not
> one lump. Up close, they're in separate pieces.
>
> **14.** *(288 of them, in rows)* Two hundred and eighty-eight, in each part
> of the model. They're called experts.

Vocabulary arrives at 0:45, not 0:07. `NCASE_EVOLUTION_OF_TRUST.md` §2: the
abstraction is built out of a concrete thing the learner has already operated.
By beat 11 the viewer has watched five percent of a block light up twice, so
"parameter" is a name for something they have already seen behave.

### Act 4 — the handoff (beats 15–19, 1:05–1:22)

> **15.** *(a word arrives; eight of the 288 light)* A word comes in. Eight of
> them get used.
>
> **16.** *(the other 280 stay flat and grey)* The other two hundred and eighty
> do nothing at all.
>
> **17.** *(the eight lit ones and the grey sliver from beat 4 line up)*
> There's your five percent. That's where it comes from.
>
> **18.** *(the whole arrangement sits still and gets its name)* This has a
> name, by the way. It's called a Mixture of Experts.
>
> **19.** *(the eight stay lit. everything else recedes)* So — who picks the
> eight? And why does that turn out to be the expensive question?

**Beat 19 is the chapter wall.** It states what the section settled (five
percent is eight of 288) and names the one thing that is now missing (who
chooses). §02 opens by banking exactly that and adding its own *but*. This is
the handoff pattern in `STORY_SPINE.md` §5, and it is the fix for "the whole
story feels disconnected" — no title cards, no chrome, the narration carries
the wall.

## Storyboard

| # | Place | Event | Relation | Secs |
| --- | --- | --- | --- | --- |
| 1 | the prompt | a message is typed and sent | want | 4 |
| 2 | the sheet | the model arrives whole | want | 4 |
| 3 | the sheet | nothing moves — the viewer guesses | want | 3 |
| 4 | the sheet | 95% goes grey | and-yet | 4 |
| 5 | the sheet | hold | so | 3 |
| 6 | the sheet | a second model arrives beside it | and-yet | 5 |
| 7 | the sheet | one card under the left | so | 4 |
| 8 | the sheet | four cards under the right | wall | 5 |
| 9 | the sheet | the percentages level, the cards do not | wall | 4 |
| 10 | the sheet | the second model leaves; the question stays | therefore | 6 |
| 11 | the sheet | the block breaks into marks | so | 6 |
| 12 | the sheet | the marks resolve; the count lands | so | 4 |
| 13 | inside | push in | so | 3 |
| 14 | inside | the 288 appear | so | 6 |
| 15 | inside | a word arrives; eight light | so | 4 |
| 16 | inside | the other 280 stay flat | and-yet | 4 |
| 17 | inside | the eight line up with the sliver | therefore | 4 |
| 18 | inside | the arrangement is named | so | 4 |
| 19 | inside | everything recedes but the eight | and-yet | 5 |

Total ≈ 1:22. `npm run timing -- --scripts` after recording.
