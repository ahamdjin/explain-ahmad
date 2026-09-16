# Section 10 — And then it does it again

Status: **STORY PASS — narration-first.** This section distinguishes prompt prefill from autoregressive decoding without pretending all previous tokens are recomputed.

## Contract

| | |
| --- | --- |
| Enters on | **one token came out; how does the model produce the next one?** |
| Teaches | autoregressive generation, reusable cached state, one new token through the stack |
| Answers | append the generated token, process the new position through the layers while reusing stored state from prior positions, then predict again |
| Exits on | **which 18B are active?** |

## Narration

The answer is almost annoyingly simple.

The model takes the token it just produced...

and adds it to the end.

So now the sequence is one token longer.

Then it predicts again.

But there is an important shortcut here.

The model does **not** throw away everything it learned about the earlier positions and recompute the whole prompt from scratch for every new token.

It keeps reusable state from the earlier work.

The exact cached state depends on the kind of layer — and GLM has a hybrid attention design — but the idea we need is simple:

**the old context is kept; the new position is the thing that has to travel through the stack.**

So our new token enters layer one.

It reads the earlier context through that stored state.

Its representation changes.

On a sparse layer, the router looks at that new representation and picks eight experts.

Next sparse layer...

new representation...

new routing decision.

Again.

And again.

Across all 42 sparse layers, that new token gets another:

**42 routing decisions**

and

**336 routed expert visits.**

Then the model reaches the top...

scores the vocabulary again...

chooses another token...

adds it to the end...

and repeats.

That is autoregressive generation.

One new token at a time.

And this is what you are watching when an AI answer appears piece by piece on your screen.

Now think back to our opening question.

We asked:

if only about **18 billion parameters are active**...

**which 18 billion?**

We finally have enough of the machine in our heads to answer that properly.

---

## The script

These are **cuts of the narration above**, not rewritten versions of it.
Concatenate them in order and the narration is what is spoken.

### Act 1 — append, and the shortcut (beats 1–3)

> **1.** *(`bounced` settles into the sequence and the blank slot moves one place right.)* The answer is almost annoyingly simple. The model takes the token it just produced... and adds it to the end. So now the sequence is one token longer. Then it predicts again.
>
> **2.** *(Every earlier marker drops back to floor one, as if starting over. A `?` sits over it.)* But there is an important shortcut here. The model does not throw away everything it learned about the earlier positions and recompute the whole prompt from scratch for every new token.
>
> **3.** *(The markers return to their finished positions and a quiet stored-state ribbon appears beside every layer.)* It keeps reusable state from the earlier work. The exact cached state depends on the kind of layer — and GLM has a hybrid attention design — but the idea we need is simple: the old context is kept; the new position is the thing that has to travel through the stack.

### Act 2 — one new position climbs (beats 4–8)

> **4.** *(Only the new token’s marker starts at floor one. The others stay dim and stored.)* So our new token enters layer one.
>
> **5.** *(It reads from the stored ribbon and its row changes.)* It reads the earlier context through that stored state. Its representation changes.
>
> **6.** *(The router mechanism from §5 runs again on the new row.)* On a sparse layer, the router looks at that new representation and picks eight experts.
>
> **7.** *(The same three steps repeat upward without new explanation.)* Next sparse layer... new representation... new routing decision. Again. And again.
>
> **8.** *(Two counters assemble beside the climbing marker.)* Across all 42 sparse layers, that new token gets another: 42 routing decisions and 336 routed expert visits.

### Act 3 — the loop, and the old question (beats 9–12)

> **9.** *(At the top, §9’s scoring runs again and another token is appended.)* Then the model reaches the top... scores the vocabulary again... chooses another token... adds it to the end... and repeats.
>
> **10.** *(The loop accelerates over several reply tokens; only the newest marker ever travels.)* That is autoregressive generation. One new token at a time.
>
> **11.** *(The growing reply reads the way an answer appears on a screen, piece by piece.)* And this is what you are watching when an AI answer appears piece by piece on your screen.
>
> **12.** *(The loop freezes and §1’s two numbers return over the tower — not on a new page.)* Now think back to our opening question. We asked: if only about 18 billion parameters are active... which 18 billion? We finally have enough of the machine in our heads to answer that properly.

---

## Storyboard

There is **one paper stage for all 12 beats**. §9 ends with `bounced` added and a
blank slot after it; the tower is still standing behind it.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | `bounced` settles in and the blank slot moves one place right | growing sentence | one token longer | S-14 |
| 2 | the paper stage | — | every earlier marker drops back to floor one as if starting over | the recompute picture, marked `?` | does it all restart? | S-08 |
| 3 | the paper stage | — | the markers return to their finished positions and a stored-state ribbon appears | stored state beside each layer | the old context is kept | S-09 |
| 4 | the paper stage | — | only the new token’s marker starts at floor one | one marker climbing | the new position travels | S-04 |
| 5 | the paper stage | — | it reads from the stored ribbon and its row changes | context read + new row | representation changes | S-04 |
| 6 | the paper stage | — | the router mechanism from §5 runs again on the new row | router + top-8 | picks eight again | S-04 |
| 7 | the paper stage | — | the same three steps repeat upward without new explanation | repeat montage | again, and again | S-04 |
| 8 | the paper stage | — | two counters assemble beside the climbing marker | 42 decisions / 336 visits | another 336 | S-04 |
| 9 | the paper stage | — | §9’s scoring runs again at the top and another token is appended | score → select → append | and repeats | S-04 |
| 10 | the paper stage | — | the loop accelerates; only the newest marker ever travels | the decode loop | autoregressive generation | S-12 |
| 11 | the paper stage | — | the growing reply reads the way an answer appears on a screen | reply appearing piece by piece | this is what you watch | S-02 |
| 12 | the paper stage | — | the loop freezes and §1’s two numbers return over the tower | `320B total / 18B active` | which 18 billion? | S-14 |

## Carrying frames

- **Beat 3:** stored state beside every layer, and only one marker with anywhere to go.
- **Beat 11:** the loop, recognised as the thing the viewer has already seen on their own screen.
- **Beat 12:** §1’s numbers back over a tower the viewer can now read.

## Truth / implementation notes

- During autoregressive decode, previous positions are not naively recomputed through the full stack for every generated token; reusable state is cached.
- Do not oversimplify that stored state as only a conventional KV cache. GLM-5.3-Flash uses hybrid mechanisms, so the safe main-language phrase is **reusable state from earlier positions**.
- Each newly decoded token still passes through the model's layers and encounters fresh routing on the 42 sparse layers.
- `42 × 8 = 336` remains a routed-expert-visit count, not total model work.

## Sound-compatible actions

- beat 1: one card settling
- beat 2: everything falling back at once
- beat 7: the same three sounds, compressed
- beat 10: the loop finding a rhythm
- beat 12: the loop stopping
