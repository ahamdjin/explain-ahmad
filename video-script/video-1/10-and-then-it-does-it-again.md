# Section 10 — And then it does it again

Status: **STORY PASS — narration-first.** This section distinguishes prompt prefill from autoregressive decoding without pretending all previous tokens are recomputed.

## Contract

| | |
| --- | --- |
| Enters on | **one token came out; how does the model produce the next one?** |
| Teaches | autoregressive generation, reusable cached state, one new token through the stack |
| Answers | append the generated token, process the new position through the layers while reusing stored state from prior positions, then predict again |
| Exits on | **now that we have watched repeated dynamic routing, can we finally answer which 18B are active?** |

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

## Storyboard — 12 beats

§9 ends with `bounced` added and a blank next slot after it.

| beat | continuity / screen action | add / keep / remove |
| --- | --- | --- |
| 1 | The `bounced` token card settles into the sequence. The blank slot moves one position to its right. | **keep** growing sentence |
| 2 | Briefly ghost the wrong idea: all earlier token markers fall back to floor 1. Ask visually whether everything restarts. | **temporary hypothesis** |
| 3 | Reject it. Earlier token markers return to a quiet “stored” state at their completed positions. A small cache/state ribbon remains beside every layer. | **remove** recompute hypothesis; **add** stored-state cue |
| 4 | Only the new token marker starts at floor 1. Earlier positions remain dim/stored. | **move** new token only |
| 5 | On one layer, show new token reading from the stored earlier context, then changing its row. | **animate** context read + representation update |
| 6 | Router activates on a sparse layer and picks top-8 for this new row. | **reuse** router mechanism |
| 7 | Fast montage upward: changed row → fresh router → eight experts, repeated on sparse floors. | **repeat** learned mechanism, no new explanation |
| 8 | Two counters assemble beside the new marker: `42 decisions` / `336 routed expert visits`. | **add** separate counts |
| 9 | At the top, vocabulary scores appear again; another token is selected and appended. | **reuse** §9 mechanism |
| 10 | Loop accelerates for several illustrative reply tokens. Sentence grows one token at a time while only the newest marker traverses the tower. | **loop** decode cycle |
| 11 | Handwritten `autoregressive generation` labels the loop after it has been watched. | **add** name |
| 12 | Freeze the loop. Opening numbers `320B total / 18B active` reappear over the tower, not as a new page. End on **“which 18 billion?”** | **callback** §1; seed §11 |

## Truth / implementation notes

- During autoregressive decode, previous positions are not naively recomputed through the full stack for every generated token; reusable state is cached.
- Do not oversimplify that stored state as only a conventional KV cache. GLM-5.3-Flash uses hybrid mechanisms, so the safe main-language phrase is **reusable state from earlier positions**.
- Each newly decoded token still passes through the model's layers and encounters fresh routing on the 42 sparse layers.
- `42 × 8 = 336` remains a routed-expert-visit count, not total model work.
