# Section 08 — That was one token. Here is the whole prompt.

Status: **STORY PASS — narration-first.** The section corrects our deliberate simplification: `it` was the tracked protagonist, not the only token being processed.

## Contract

| | |
| --- | --- |
| Enters on | **our prompt had eight tokens; what were the other seven doing?** |
| Teaches | prompt prefill, parallel positions, causal masking, transformer stack intuition |
| Answers | all eight prompt positions move through the stack layer-by-layer; each gets its own contextual representation and routing |
| Exits on | **the prompt is processed; how do numbers become the next token?** |

## Narration

We followed `it` because following eight things at once would be a terrible explanation.

But `it` was never alone.

Our prompt became **eight tokens**:

**The | dog | dropped | the | ball | , | and | it**

And during the first pass through the prompt, all eight positions are processed through the stack.

Not one token all the way to the top...

then the next one...

then the next one.

Layer by layer, the model works on the prompt positions together.

Each token has its own row.

Each row gets context from the positions it is allowed to see.

Because this is generating text left to right, there is one important rule:

**a token can use the tokens before it, not future tokens that have not happened yet.**

So `The` has almost nothing behind it.

`ball` has several earlier tokens available.

And our `it`, sitting at the end of the prompt, can look back across all seven earlier positions.

Then each position keeps moving upward through the layers.

And on the **42 sparse layers**, each token gets its own routing decision.

So the 336 routed expert visits we counted for `it`...

happen for the other prompt tokens too.

Eight tokens.

336 routed expert visits each.

That gives us:

**2,688 routed expert visits**

for this simplified count across the prompt’s first pass.

That first processing of the prompt is usually called **prefill**.

And this whole stacked architecture — representations moving through layers while positions exchange allowed context — is the transformer stack we have been travelling through.

But none of this has produced an answer yet.

We have eight finished representations at the top.

So how does the model turn those numbers into the **next token**?

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — the cheat, and the wrong picture (beats 1–3)

> **1.** *(The base markers resolve into the eight real prompt tokens; `it` stays tracked.)* We followed `it` because following eight things at once would be a terrible explanation. But `it` was never alone. Our prompt became eight tokens: The | dog | dropped | the | ball | , | and | it
>
> **2.** *(One token starts climbing alone while the others wait. A question mark sits on it.)* Not one token all the way to the top... then the next one... then the next one.
>
> **3.** *(That marker snaps back down and all eight enter the first floor together.)* And during the first pass through the prompt, all eight positions are processed through the stack. Layer by layer, the model works on the prompt positions together.

### Act 2 — each position, and what it may look at (beats 4–7)

> **4.** *(Eight rows unfold side by side on one floor.)* Each token has its own row.
>
> **5.** *(Backward links draw from every position. None point forward.)* Each row gets context from the positions it is allowed to see. Because this is generating text left to right, there is one important rule: a token can use the tokens before it, not future tokens that have not happened yet.
>
> **6.** *(The links resolve into a triangle and three positions are read off it.)* So `The` has almost nothing behind it. `ball` has several earlier tokens available. And our `it`, sitting at the end of the prompt, can look back across all seven earlier positions.
>
> **7.** *(The wiring clears and redraws from the newly changed rows one floor up.)* Then each position keeps moving upward through the layers.

### Act 3 — the count, for all of them (beats 8–11)

> **8.** *(Router flashes fire independently under each marker on the sparse floors.)* And on the 42 sparse layers, each token gets its own routing decision.
>
> **9.** *(`336` above tracked `it` is copied above the other seven.)* So the 336 routed expert visits we counted for `it`... happen for the other prompt tokens too.
>
> **10.** *(The arithmetic holds unfinished on screen.)* Eight tokens. 336 routed expert visits each. That gives us:
>
> **11.** *(The total assembles as the eight arrive at the top together.)* 2,688 routed expert visits for this simplified count across the prompt’s first pass.

### Act 4 — name it, then ask for the answer (beats 12–13)

> **12.** *(The completed pass is labelled, and the tower gets its name secondarily.)* That first processing of the prompt is usually called prefill. And this whole stacked architecture — representations moving through layers while positions exchange allowed context — is the transformer stack we have been travelling through.
>
> **13.** *(The eight finished rows fan out at the top; seven dim and the last stays bright.)* But none of this has produced an answer yet. We have eight finished representations at the top. So how does the model turn those numbers into the next token?

---

## Storyboard

There is **one paper stage for all 13 beats**. §7 ends with the tower up and
seven more markers arriving at its base; those markers resolve here.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | the base markers resolve into the eight real prompt tokens | tower + 8 tokens | `it` was never alone | S-14 |
| 2 | the paper stage | — | one token starts climbing alone while the others wait, marked with a `?` | one climbing, seven waiting | the wrong picture | S-08 |
| 3 | the paper stage | — | that marker snaps back and all eight enter the first floor together | eight entering together | layer by layer, together | S-09 |
| 4 | the paper stage | — | eight rows unfold side by side on one floor | 8 rows on one floor | each token has its own row | S-04 |
| 5 | the paper stage | — | backward links draw from every position and none point forward | backward-only wiring | no future tokens | S-04 |
| 6 | the paper stage | — | the links resolve into a triangle and three positions are read off it | the causal triangle | `The`: 0 back · `it`: 7 back | S-04 |
| 7 | the paper stage | — | the wiring clears and redraws from the newly changed rows one floor up | next layer, new wiring | and upward again | S-04 |
| 8 | the paper stage | — | router flashes fire independently under each marker on the sparse floors | per-token routing | each token routes for itself | S-04 |
| 9 | the paper stage | — | `336` above tracked `it` is copied above the other seven | 336 × 8 positions | the same count each | S-14 |
| 10 | the paper stage | — | the arithmetic holds unfinished on screen | `8 × 336 = ?` | a fair calculation | S-06 |
| 11 | the paper stage | — | the total assembles as the eight arrive at the top together | 2,688 visits | the prompt’s first pass | S-04 |
| 12 | the paper stage | — | the completed pass is labelled and the tower is named secondarily | `prefill` + `transformer stack` | names after behaviour | S-12 |
| 13 | the paper stage | — | the eight finished rows fan out; seven dim and the last stays bright | final-position row lit | still no answer | S-08 |

## Carrying frames

- **Beat 3:** all eight on one floor — the correction to the one-at-a-time picture.
- **Beat 6:** the causal triangle. `it` is the only position that can see all seven.
- **Beat 11:** `2,688 routed expert visits` for one prompt, and still no answer.

## Truth / implementation notes

- The prompt is **8 tokens**, so the simplified routed-expert count is `8 × 336 = 2,688` visits during prompt prefill.
- That number counts only the top-8 **routed expert visits** in the 42 sparse layers. It is not total FLOPs and does not include shared experts, dense FFNs, attention/KDA work, etc.
- Prompt positions are computed layer-by-layer in parallelizable batches, not by sending one token through all 45 layers before beginning the next.
- Causal masking means a position cannot attend to positions to its right. Because `it` is the final prompt token, it can use all seven earlier prompt positions.

## Sound-compatible actions

- beat 2: one lonely climb, then a stop
- beat 3: eight arriving together
- beat 8: eight small flashes, slightly out of phase
- beat 11: the total landing
