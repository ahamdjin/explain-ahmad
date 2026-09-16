# Section 05 — The router picks the eight

Status: **STORY PASS — narration-first.** This is where the opening's “which 18 billion?” mystery first becomes mechanical rather than abstract.

## Contract

| | |
| --- | --- |
| Enters on | **we now have `it` in this sentence; which parts of the model should work on it?** |
| Teaches | router, 288 routed experts, top-8, +1 shared expert, MoE |
| Answers | a router scores all 288 against the current hidden row and selects eight; one shared expert always runs |
| Exits on | **the router picked eight; what do they actually do?** |
| Protagonist | contextual `it` row |

## Narration

Now we reach the part that explains the word **active**.

In one of GLM’s sparse layers, our `it` arrives in front of **288 experts**.

And no — you were not supposed to know that number.

GLM simply has 288 routed experts available here.

But it does **not** run all 288.

Something has to choose.

That something is the **router**.

And here’s a question you actually can answer now.

Should the router choose based on the original token ID — **432**...

or based on the row we just changed using the sentence?

It has to use the changed row.

Because 432 is the same every time.

But this row describes `it` **right now, in this context**.

So the router takes that row and gives all 288 experts a score.

Not eight of them.

**All 288.**

Then it keeps the top **eight**.

The other **280** routed experts do nothing for this token, in this layer.

And there’s one more detail.

GLM also has **one shared expert** that runs every time.

It isn’t part of the 288-way competition.

So visually:

**288 are scored.**

**8 are selected.**

**+1 shared expert always runs.**

And one thing I want to kill before it becomes confusing:

an expert is **not** “the dog expert” or “the grammar expert.”

It is just a learned neural-network block that transforms the row.

The router learned which blocks tend to be useful for which hidden states.

That whole setup — many possible expert blocks, only a few routed ones used at a time — is why this is called a **Mixture of Experts**, or MoE.

And notice what just happened.

For the first time, we can point to some parameters in this giant model and say:

**these ones are active for our `it`, right now.**

So what do the eight actually do?

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — the wall and the thing that chooses (beats 1–5)

> **1.** *(The wall finishes drawing behind the unchanged hero row.)* Now we reach the part that explains the word active. In one of GLM’s sparse layers, our `it` arrives in front of 288 experts.
>
> **2.** *(The wall holds; the number is attached to the object, not floated as a title.)* And no — you were not supposed to know that number. GLM simply has 288 routed experts available here.
>
> **3.** *(A small desk draws itself between the row and the wall and is named at once.)* But it does not run all 288. Something has to choose. That something is the router.
>
> **4.** *(`432` returns as a faint old card beside the bright contextual row.)* And here’s a question you actually can answer now. Should the router choose based on the original token ID — 432... or based on the row we just changed using the sentence?
>
> **5.** *(`432` dims out; the contextual row slides into the router.)* It has to use the changed row. Because 432 is the same every time. But this row describes `it` right now, in this context.

### Act 2 — scoring all of them, keeping eight (beats 6–8)

> **6.** *(A blank score badge appears on every slot in the wall.)* So the router takes that row and gives all 288 experts a score.
>
> **7.** *(A sweep fills all of them. No semantic labels anywhere.)* Not eight of them. All 288.
>
> **8.** *(Eight lift forward; the rest flatten.)* Then it keeps the top eight. The other 280 routed experts do nothing for this token, in this layer.

### Act 3 — the ninth block, and what an expert is not (beats 9–12)

> **9.** *(A visually separate block enters from outside the wall entirely.)* And there’s one more detail. GLM also has one shared expert that runs every time. It isn’t part of the 288-way competition.
>
> **10.** *(The arrangement recomposes into one readable count.)* So visually: 288 are scored. 8 are selected. +1 shared expert always runs.
>
> **11.** *(Playful name plates are pressed onto the selected eight and slide straight off.)* And one thing I want to kill before it becomes confusing: an expert is not “the dog expert” or “the grammar expert.”
>
> **12.** *(One selected expert opens like a machine box: row in, transformed row out.)* It is just a learned neural-network block that transforms the row. The router learned which blocks tend to be useful for which hidden states.

### Act 4 — name it, then hand it forward (beats 13–14)

> **13.** *(The name lands on the whole arrangement, never on one expert.)* That whole setup — many possible expert blocks, only a few routed ones used at a time — is why this is called a Mixture of Experts, or MoE.
>
> **14.** *(The selected eight and the shared block open their doors toward the same row. Nothing comes out yet.)* And notice what just happened. For the first time, we can point to some parameters in this giant model and say: these ones are active for our `it`, right now. So what do the eight actually do?

---

## Storyboard

There is **one paper stage for all 14 beats**. §4 leaves the contextual `it` row
in centre with the wall already beginning; that wall completes rather than cuts.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | the wall finishes drawing behind the unchanged hero row | expert wall + `it` row | 288 routed experts | S-14 |
| 2 | the paper stage | — | the wall holds and the count is attached to the object | wall + `288 routed experts` | not a quiz | S-04 |
| 3 | the paper stage | — | a small desk draws itself between the row and the wall | router | something has to choose | S-13 |
| 4 | the paper stage | — | `432` returns as a faint old card beside the bright row | old ID vs current row | which one decides? | S-06 |
| 5 | the paper stage | — | `432` dims out and the contextual row slides into the router | row entering the router | 432 never changes | S-14 |
| 6 | the paper stage | — | a blank score badge appears on every slot in the wall | 288 blank scores | all of them, not eight | S-04 |
| 7 | the paper stage | — | a sweep fills all of the scores, with no semantic labels | 288 scored | all 288 scored | S-04 |
| 8 | the paper stage | — | eight lift forward while the rest flatten | 8 selected / 280 idle | 280 do nothing here | S-01 |
| 9 | the paper stage | — | a separate block enters from outside the wall entirely | shared expert | `shared — always on` | S-04 |
| 10 | the paper stage | — | the arrangement recomposes into one readable count | 288 / 8 / +1 | carrying frame | S-14 |
| 11 | the paper stage | — | name plates are pressed onto the selected eight and slide off | plates falling | not `the dog expert` | S-09 |
| 12 | the paper stage | — | one selected expert opens: row in, transformed row out | expert cutaway | a learned block | S-04 |
| 13 | the paper stage | — | the name lands on the whole arrangement, never on one expert | name over the wall | Mixture of Experts (MoE) | S-12 |
| 14 | the paper stage | — | the eight and the shared block open their doors toward the row | doors open, no output | these are active, right now | S-14 |

## Carrying frames

- **Beat 8:** all 288 scored, **eight** lifted, **280** flat.
- **Beat 10:** 288 scored · 8 selected · +1 shared — the count §6 and §7 both build on.
- **Beat 14:** the first frame in the video where *active* can be pointed at.

## Truth / implementation notes

- `n_routed_experts = 288`, top-k routed experts = **8**, and there is **1 shared expert** in addition.
- The router choice depends on the **current hidden representation**, not token ID alone.
- Expert ≠ human-readable topic specialist. Treat each as a learned feed-forward transformation block.
- “280 do nothing” is scoped to the **routed experts for this token in this sparse layer**; the shared expert still runs.
- This is the first visual payoff of “active”: a small selected subset of a much larger available set.

## Sound-compatible actions

- beat 1: the wall settling
- beat 3: one desk set down
- beat 7: the scoring sweep
- beat 8: eight lifts, the last one heavier
- beat 11: plates failing to stick
- beat 14: doors opening
