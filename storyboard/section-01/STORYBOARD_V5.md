# Section 01 - Storyboard v5 (SHOOTING BOARD)

Status: **BEAT-BY-BEAT BOARD.** Timed against `video-script/01-the-claim.md`.

This is the board implementation must match. Story rationale: `video-script/01-the-night-shift.md`.

## Contract

| | |
| --- | --- |
| Script | 225 words, 22 lines |
| Spoken | ~1:33 at 145 wpm |
| **On screen** | **31 beats, 132s = 2:12** |
| Average beat | 4.3s |
| Ends on | the question. **Nothing is shown blocking it.** |
| Never says | `token`, `tokenization`, `VRAM`, `quantization`, or any specific person's machine |

## The one rule this board exists to enforce

A **fake wall** asserts an obstacle and refuses to describe it - a red X, a
hazard sign, `But something blocks this...`. That reads as withholding, and it
is what made v1-v4 feel like a bad story.

A **headache** is different: the plan is shown working, it looks obviously
correct, and the only thing left on screen is the question. Curiosity, not a
locked door.

So: **there is no X, no barrier, no hazard mark anywhere in Section 01.** At
beat 28 nothing breaks. The plan stays intact and correct-looking underneath
the question at beat 29. The viewer leaves thinking *that should work* - which
is exactly the small headache that makes them stay.

Everything that answers it - 42 layers, 336 expert visits per word, fetch cost
vs compute cost - is **Section 02+**, and is derived in `01-the-night-shift.md`.

## Script edits needed

1. **`token` -> `word`** everywhere in Section 01. Three places. The viewer does
   not need tokenization yet and it costs a concept for nothing.
2. Keep `a much smaller machine` generic. No named hardware, no personal
   machine, no GB figure for the small side - `hundreds of gigabytes` vs `a much
   smaller machine` is the whole comparison and it is enough.
3. `for each token, only a few of them are selected` - **keep the passive**. It
   lets beat 14 show selection with no chooser, so naming the ROUTER at beat 23
   is a reveal instead of a repeat.

---

## M1 - THE TWO NUMBERS

**26s / 7 beats.** Script:

> So, GLM-5.3-Flash has 320 billion parameters and only 18 billion parameters are active.
>
> which in simple words means that.
>
> For any one WORD, only about 18 billion parameters are active.
>
> Which basically means the model owns 320 billion parameters... but only uses a small fraction of them.
>
> Okay.
>

| # | id | s | rel | On screen | New |
| --- | --- | --- | --- | --- | --- |
| 1 | `the-model` | 3.0 | want | Paper model sheet, centre. `GLM-5.3-Flash`. Narrator small, left, one arm up. | the model exists |
| 2 | `total` | 4.0 | so | `320 Billion` row lights orange on the sheet. Nothing else changes. | 320B |
| 3 | `knowledge` | 3.5 | so | Handwritten note hooks the row: `everything it has ever learned`. | parameters = knowledge |
| 4 | `active` | 4.5 | and-yet | `18 Billion active` row lights blue directly beneath. Two lit rows, together. | 18B active |
| 5 | `sheet-away` | 3.5 | so | Sheet folds away. The two numbers survive as a floating pair, nothing else on screen. | the pair is the subject |
| 6 | `the-sliver` | 5.0 | so | The pair becomes one bar: full width = 320B. A 5.6% sliver at the left lights blue. Caption `for one word`. | 5.6% works |
| 7 | `okay` | 2.5 | so | Hold. Narrator nods once. No new marks. | - |

## M2 - SO WHY HAVE THE REST?

**8s / 2 beats.** Script:

> So why have the other 300 billion?
>

| # | id | s | rel | On screen | New |
| --- | --- | --- | --- | --- | --- |
| 8 | `the-dark-94` | 4.0 | and-yet | The unlit 94.4% of the bar darkens hard. A single red `?` sits on it. | the question exists |
| 9 | `ask-it` | 4.0 | hope | Narrator turns out to camera, leaning in. Bar held behind him. | - |

## M3 - THE HOSPITAL

**28s / 7 beats.** Script:

> Well, this is a Mixture-of-Experts model. It has lots of different expert networks, and for each word, only a few of them are selected.
>
> That makes sense.
>

| # | id | s | rel | On screen | New |
| --- | --- | --- | --- | --- | --- |
| 10 | `build` | 5.0 | therefore | The dark bar rises and unfolds upward into a building: a paper hospital, four floors, cutaway front. Narrator becomes small beside it. | the world |
| 11 | `the-sign` | 3.0 | so | Sign over the door: `Mixture of Experts`. Small plaque low-left: `320B total`. | the name, on the world |
| 12 | `staff` | 5.0 | so | Floors populate with specialists at stations - a tiled grid of stick figures, coloured. Brace: `288 experts`. | 288 specialists |
| 13 | `a-word-arrives` | 3.5 | so | A paper card enters the frame from the left: `"scared"`. It stops at the front desk. | one word arrives |
| 14 | `eight-light` | 5.0 | so | Eight specialists across different floors light up. Every other figure goes grey and still. NO agent shown doing the choosing. | only a few are selected |
| 15 | `count-them` | 3.5 | so | Two braces: `8 working` on the lit, `280 idle` on the grey. | 8 vs 280 |
| 16 | `makes-sense` | 3.0 | so | Hold. Narrator settled, satisfied, arms down. | - |

## M4 - THE SECOND QUESTION

**22s / 5 beats.** Script:

> But then I had another question.
>
> If only a few experts are actually being used...
>
> why does running the model still mean dealing with hundreds of gigabytes of weights?
>
> Why can't I keep just the small part I need?
>

| # | id | s | rel | On screen | New |
| --- | --- | --- | --- | --- | --- |
| 17 | `turn` | 3.0 | and-yet | Narrator's pose changes - head up, turning back toward the building. Nothing else moves. | - |
| 18 | `isolate-eight` | 4.5 | so | The eight lit specialists lift out of the building and gather into one small tidy group, front-left. The building stays, grey, behind. | the team is small |
| 19 | `the-weight` | 5.5 | wall | The whole building gains weight: a heavy label `hundreds of gigabytes`, and it visibly sags/presses on its baseline. | the model is heavy |
| 20 | `the-mismatch` | 4.5 | and-yet | Small group and enormous building side by side, to scale. One red `?` in the gap between them. | the mismatch |
| 21 | `just-the-part` | 4.5 | hope | A small dashed box draws itself around the group of eight only. Note: `why not keep just this?` | the wish |

## M5 - THE ROUTER, NAMED

**16s / 4 beats.** Script:

> And it gets even stranger.
>
> Because the model already has something called a router whose job is to decide which experts a word should go to.
>
> So...
>

| # | id | s | rel | On screen | New |
| --- | --- | --- | --- | --- | --- |
| 22 | `stranger` | 3.0 | and-yet | Narrator leans in, one arm up. Beat of stillness. | - |
| 23 | `reveal-router` | 5.5 | so | The front-desk figure we have seen since beat 13 gets a label: `ROUTER`. A soft ring draws around it. It was on screen the whole time. | the router has a name |
| 24 | `its-job` | 5.0 | so | Drawn path: word card -> ROUTER -> the eight. Note on the router: `decides which experts`. | the router chooses |
| 25 | `so-pause` | 3.0 | so | Hold. Narrator's eyeline moves: router, then the dashed box. | - |

## M6 - THE HOPE, AT ITS PEAK

**22s / 4 beats.** Script:

> why can't we just load those experts, use them, and leave everything else asleep?
>
> Could we turn a 320-billion-parameter model into something that fits comfortably on a much smaller machine?
>
> And if not...
>
> what exactly is stopping us?
>

| # | id | s | rel | On screen | New |
| --- | --- | --- | --- | --- | --- |
| 26 | `the-plan` | 6.0 | hope | The plan, drawn as a plan, three panels left to right: ROUTER picks 8 -> only those 8 walk in -> the other 280 asleep in on-call rooms with `zZ`. Warm light on the eight. | the plan |
| 27 | `it-fits` | 5.5 | hope | `320B model` -> arrow -> a small ordinary machine. The eight fit inside it with room over. Sparks. Narrator delighted, both arms up. | it fits! |
| 28 | `and-if-not` | 4.0 | and-yet | Sparks stop. Everything holds exactly as it is - the plan still looks correct, nothing breaks, nothing is crossed out. Only the narrator's pose drops. | - |
| 29 | `the-question` | 6.0 | wall | The question writes itself across the frame, large, handwritten: `If we only load the experts we need, why can't we run this on far less memory?` The working plan stays visible underneath it. | THE HEADACHE |

## M7 - GO INSIDE

**10s / 2 beats.** Script:

> To answer that, staring at the final architecture isn't going to help.
>
> So lets see through what exactly is happening in there inside the model
>

| # | id | s | rel | On screen | New |
| --- | --- | --- | --- | --- | --- |
| 30 | `the-sheet` | 4.5 | therefore | A dense full-architecture sheet slams down over everything. Unreadable on purpose. Narrator shoves it aside. | - |
| 31 | `inside` | 5.5 | therefore | Sheet clears. The hospital's doors open, lit warm from within. Sign: `Inside the model`. The word card moves toward them. | - |

---

## Beat budget

| Movement | Beats | Seconds | Cumulative |
| --- | --- | --- | --- |
| M1 THE TWO NUMBERS | 7 | 26 | 0:26 |
| M2 SO WHY HAVE THE REST? | 2 | 8 | 0:34 |
| M3 THE HOSPITAL | 7 | 28 | 1:02 |
| M4 THE SECOND QUESTION | 5 | 22 | 1:24 |
| M5 THE ROUTER, NAMED | 4 | 16 | 1:40 |
| M6 THE HOPE, AT ITS PEAK | 4 | 22 | 2:02 |
| M7 GO INSIDE | 2 | 10 | 2:12 |
| **Total** | **31** | **132** | **2:12** |

## New ideas per movement

Cap is 4. This board never exceeds 3.

| Movement | New ideas |
| --- | --- |
| M1 | 6 - the model exists, 320B, parameters = knowledge, 18B active, the pair is the subject, 5.6% works |
| M2 | 1 - the question exists |
| M3 | 6 - the world, the name, on the world, 288 specialists, one word arrives, only a few are selected, 8 vs 280 |
| M4 | 4 - the team is small, the model is heavy, the mismatch, the wish |
| M5 | 2 - the router has a name, the router chooses |
| M6 | 3 - the plan, it fits!, THE HEADACHE |
| M7 | 0 - none |

## Emotional curve

```
hope        ..9..                              .27.
                                              /    \
settled  1-7     .16.        .21.  .25.      /      
                     \      /                       
wall          .8.     .17-20.            .28.29.  .30-31.
```

Peak is **27** (it fits!). The drop is **27 -> 29**, and it is done with
*pose and stillness only* - no breakage on screen. That restraint is the whole
difference between a headache and a red X.

## Persistence

Actors that mount once and never leave: `sheet`(1-5), `bar`(6-9 -> becomes
`hospital`), `hospital`(10-31), `staff`(12-31), `word`(13-31),
`router`(13-31, **labelled only at 23**), `team`(18-31), `narrator`(1-31).

The router is the load-bearing case: it must be **on screen from beat 13**,
unlabelled and unremarked, so beat 23 can be a reveal. If it is spawned at
beat 23 the reveal is worthless.

## Assets

| Beat | Need | Source |
| --- | --- | --- |
| 1-5 | model sheet, sticky callouts | *Simple Sticky Notes*, *Forms* - have |
| 1-31 | narrator, ~8 poses | *Stick people*, *Stick Figures* - have |
| 10-11 | **hospital shell, cutaway, 4 floors** | **author** |
| 12 | 288 specialists, tiled | *Stick people* recoloured + code grid - have |
| 13 | word card | *Simple Sticky Notes* - have |
| 13,23 | front desk, chair, lamp | *Office Items* - have |
| 26 | **on-call bunk + `zZ`** | **author** |
| 27 | small ordinary machine | *Computers*, *Gadgets* - have |
| 30 | dense architecture sheet | code-generated - have |

Two props to author. Down from three - Section 01 does not need the 42
department doorways, those belong to Section 02.

Repeated geometry stays code-generated: the 288 grid, the bar, braces,
connector paths. Personality objects are authored vectors.

## Frozen-frame test

Every beat must read with motion disabled. The three that carry the section:

- **6** - one bar, a 5.6% sliver lit. Whole premise in one image.
- **20** - eight figures beside an enormous heavy building. The mismatch, to scale.
- **29** - the working plan, with the question written over it. The headache.

If those three do not work as stills, the section does not work, and no motion
pass will save it.
