# Section 07 — One layer becomes forty-five

Status: **STORY PASS — narration-first.** This section pays off the tower only after the viewer understands what one layer does.

## Contract

| | |
| --- | --- |
| Enters on | **we just processed `it` through one sparse layer; how many times does this happen?** |
| Teaches | 45 layers, 42 sparse MoE layers, 3 dense FFN layers, rerouting, 336 routed expert visits |
| Answers | the representation moves through 45 layers; 42 make fresh top-8 routing decisions |
| Exits on | **our prompt had eight tokens; what were the other seven doing?** |

## Narration

What we just watched was **one sparse layer**.

Our `it` came in as one row...

looked at context...

had experts chosen...

went through those experts...

and left as a changed row.

Now here’s the next fair question.

When `it` reaches the next sparse layer...

does it keep the same eight experts?

Or does it choose again?

It chooses again.

Because look at what we’re carrying upward.

The row has changed.

And the router makes its decision from **that row**.

So a new layer means a new router score.

Some experts might happen to be selected again.

Others won’t.

But it is a **fresh decision**.

Now pull the camera back.

That room we were standing in?

It is one layer in a stack of **45**.

Three of those layers use a normal dense feed-forward block instead of routed experts.

The other **42** are the sparse MoE layers we care about here.

So for one token:

**42 routing decisions.**

And each decision selects **8 routed experts**.

So:

**42 × 8 = 336 expert visits.**

Important distinction:

not 336 routing decisions.

**42 decisions. 336 routed expert visits.**

For our one little `it`.

And each decision happens only after the representation for that layer exists.

Which already starts to answer our opening mystery.

There isn’t one permanent group of experts called “the active 18 billion.”

The active routed pieces are being chosen **as the token moves through the model**.

But we have been cheating a little.

Because we followed only `it`.

Our prompt had **eight tokens**.

What happened to the other seven?

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — does it keep the same eight? (beats 1–5)

> **1.** *(The bounded room holds with the changed row inside it.)* What we just watched was one sparse layer. Our `it` came in as one row... looked at context... had experts chosen... went through those experts... and left as a changed row.
>
> **2.** *(Floor one’s eight sit beside the exiting row as small marks. Nothing moves.)* Now here’s the next fair question. When `it` reaches the next sparse layer... does it keep the same eight experts? Or does it choose again?
>
> **3.** *(The same row moves one floor up, its pattern visibly different from the one that entered.)* It chooses again. Because look at what we’re carrying upward. The row has changed.
>
> **4.** *(A new sweep runs on floor two; eight light, overlapping the old eight only partly.)* And the router makes its decision from that row. So a new layer means a new router score.
>
> **5.** *(The same three steps run again, quickly, so the rule is seen rather than stated.)* Some experts might happen to be selected again. Others won’t. But it is a fresh decision.

### Act 2 — the stack (beats 6–8)

> **6.** *(The room shrinks in place rather than being cut away from.)* Now pull the camera back. That room we were standing in?
>
> **7.** *(Floors finish stacking around it until the count is readable.)* It is one layer in a stack of 45.
>
> **8.** *(Three floors redraw as plain blocks; the rest keep their router marks.)* Three of those layers use a normal dense feed-forward block instead of routed experts. The other 42 are the sparse MoE layers we care about here.

### Act 3 — two numbers that are not the same number (beats 9–11)

> **9.** *(One routing dot lands on each sparse floor as `it` climbs; a counter runs beside the tower.)* So for one token: 42 routing decisions.
>
> **10.** *(On each sparse floor eight tiny ticks fan out, accumulating on a second counter.)* And each decision selects 8 routed experts. So: 42 × 8 = 336 expert visits.
>
> **11.** *(Both counters hold side by side. Nothing moves.)* Important distinction: not 336 routing decisions. 42 decisions. 336 routed expert visits. For our one little `it`. And each decision happens only after the representation for that layer exists.

### Act 4 — the opening mystery, and the cheat (beats 12–13)

> **12.** *(The tower holds while the §1 question is answered against it.)* Which already starts to answer our opening mystery. There isn’t one permanent group of experts called “the active 18 billion.” The active routed pieces are being chosen as the token moves through the model.
>
> **13.** *(Seven more token markers appear at the base of the tower beside `it`.)* But we have been cheating a little. Because we followed only `it`. Our prompt had eight tokens. What happened to the other seven?

---

## Storyboard

There is **one paper stage for all 13 beats**. §6 ends with the room already
shrinking and the tower’s edge showing; that exact room becomes a floor here.
The camera never cuts — the room changes size inside the frame.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | the bounded room holds with the changed row inside it | one room + row | one sparse layer | S-14 |
| 2 | the paper stage | — | floor one’s eight sit beside the exiting row; nothing moves | previous eight as marks | same eight, or choose again? | S-06 |
| 3 | the paper stage | — | the same row moves one floor up, visibly different from before | row on floor two | the row has changed | S-04 |
| 4 | the paper stage | — | a new sweep runs on floor two, overlapping the old eight only partly | fresh top-8 | a new router score | S-04 |
| 5 | the paper stage | — | the same three steps run again quickly so the rule is seen, not stated | repeat of the mechanism | a fresh decision | S-04 |
| 6 | the paper stage | — | the room shrinks in place rather than being cut away from | room becoming a floor | that room we were in | S-04 |
| 7 | the paper stage | — | floors finish stacking around it until the count is readable | the tower | 45 layers | S-04 |
| 8 | the paper stage | — | three floors redraw as plain blocks; the rest keep their router marks | 3 dense / 42 sparse | 42 are the sparse ones | S-04 |
| 9 | the paper stage | — | one routing dot lands on each sparse floor as `it` climbs | climb + decision counter | 42 routing decisions | S-04 |
| 10 | the paper stage | — | eight tiny ticks fan out per sparse floor onto a second counter | visit counter | 42 × 8 = 336 visits | S-04 |
| 11 | the paper stage | — | both counters hold side by side and nothing moves | two counters | 42 decisions, 336 visits | S-01 |
| 12 | the paper stage | — | the tower holds while the §1 question is answered against it | tower + the old question | no permanent active set | S-09 |
| 13 | the paper stage | — | seven more token markers appear at the base beside `it` | eight tokens at the base | what about the other seven? | S-08 |

## Carrying frames

- **Beat 5:** the same three steps, twice, so *fresh decision* is a seen rule rather than a claim.
- **Beat 11:** `42 routing decisions` and `336 routed expert visits` on one frame — the correction.
- **Beat 12:** §1’s “which 18 billion?” loses its premise: there is no permanent group.

## Truth / implementation notes

- GLM-5.3-Flash has **45 layers**; project ground truth uses **42 sparse MoE + 3 dense FFN**.
- Top-8 routing happens in each sparse MoE layer, so the simplified routed count is **42 decisions × 8 = 336 routed expert visits per token**.
- Never call 336 “choices” or “routing decisions.”
- A fresh routing decision does not guarantee a completely different set; selected experts may overlap between layers. The mechanism is fresh scoring, not forced novelty.
- The exact attention/context sublayer differs across GLM's hybrid architecture; the main story here is repeated representation update + fresh sparse routing.

## Sound-compatible actions

- beat 3: one floor of travel
- beat 5: the same three sounds, faster
- beat 6: the pull back
- beat 9: countable decision ticks
- beat 10: a faster, lighter run of visit ticks
