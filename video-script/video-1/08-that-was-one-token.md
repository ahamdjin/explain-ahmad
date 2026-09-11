# Section 08 — That was one token. Here's the sentence.

Status: **SCRIPT v10.** Written to spine v5. Corrected against a technical
review, 2026-09-11 — see "What changed" below. Every beat cites a strategy from
`skills/STRATEGY_LEDGER.md`, and no beat uses a technique that is not in it.

v8's interiors survive — they were built for spatial continuity and that work
stands. What v8 did not have was a **chapter wall** at either end, a named
teacher for anything it was doing, or an `Exits on` that had to equal the next
section's `Enters on` word for word. All three are now in place:

- **Beat 1 banks** the previous section's answer in one clause, then adds the
  *but* that makes this section necessary. It does not carry the previous
  question forward — that was the fault behind *"the whole story feels
  disconnected"*. `STORY_SPINE.md` §5.
- **The closing beat names the mechanism as finished** and says what is now
  missing, so the viewer gets to put something down before picking the next
  thing up.
- **Act headings carry strategy IDs**, derived from the storyboard's own
  strategy column rather than asserted separately.

Spine: `storyboard/video-1/STORY_SPINE.md` v5 · Numbers: `research/glm/GROUND_TRUTH.md`
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 08`

## Contract

| | |
| --- | --- |
| Enters on | 336 choices for one token. But a sentence isn't one token. |
| Teaches | **transformer**, parallel processing |
| Answers | the whole prompt goes through together, and attention is the wiring between them |
| Exits on | all of that happens. What comes out? |
| → next | **therefore** every token pays its own 336 |
| Banks | **every token pays its own 336** |
| Target | ~11 beats · ~1:10 |

## What changed from v8

**1. The board still said nine markers, in four rows.** Stale from before the
tokenizer was measured, and an earlier sweep missed them because they are
numerals — `9 markers`, `all nine climb`, `all nine counters`, `all nine,
waiting` — while the narration had already been corrected to eight. The frames
and the voice were contradicting each other in the one section whose whole job
is an arithmetic the viewer can check.

**2. The arithmetic was handed over instead of asked.** 8 × 336 is a sum a
viewer can do in their head, and doing it is what makes the total land. Beat 9
now holds the two numbers with the total blank. S-06, soft.

**3. "Transformer" is named in its own act.** v8 buried the naming mid-run
between the attention wiring and the counters. It is the one word most viewers
came in carrying an idea about, so it gets beats 6–7 and nothing else happens
on them.

**5. Beat 4 re-broke causal attention.** It said *"every token, on every
floor, looking at all the others"*. §4 beat 6 explicitly taught the opposite —
*"it can only look backwards… Never at what's coming"* — so v9 contradicted its
own video twelve beats later, and did it while introducing the word
*transformer*, where a viewer is paying most attention. Beat 4 now says each
token pulls from the words behind it, and names it as the same backwards look
already watched.

**6. "What the word transformer actually means" was too broad.** The picture on
screen includes MoE experts, and dense transformers are transformers too. It is
now *the transformer stack*, and the feed-forward block — not "experts" — is
what does the per-floor work in the naming sentence.

## The script

### Act 1 — banking 336, then the correction (beat 1) · **S-14**

> **1.** *(the single marker holds partway up)* Three hundred and thirty-six,
> for one token. Now — I've been following one token this whole time, and I owe
> you a correction.

### Act 2 — the whole prompt at once (beats 2–5) · **S-04**

> **2.** *(seven more markers appear at the base beside it)* It doesn't go in on
> its own. Your entire prompt goes in together.
>
> **3.** *(all eight climb side by side)* Every token climbs at the same time.
> All of them, all forty-five floors, together.
>
> **4.** *(lines appear between the markers on the floor they share, each one
> reaching backwards only)* And attention is the wiring between them. Every
> token, on every floor, pulling from the words behind it — the same backwards
> look, now happening to all of them at once.
>
> **5.** *(the lines redraw on each new floor as they climb)* That's what makes
> it read your sentence as a sentence, instead of a list of separate words.

### Act 3 — the shape has a name (beats 6–7) · **S-12**

> **6.** *(a plate slides onto the front of the tower)* And this whole
> arrangement — a stack of floors, attention wiring them together, a
> feed-forward block doing the work on each one — this is the **transformer**
> stack. That's the word. It's this shape.
>
> **7.** *(the plate settles; the climb continues behind it)* That's it. It
> isn't a mysterious thing. It's this shape.

### Act 4 — the sum (beats 8–9) · **S-06**

> **8.** *(a small counter appears above every marker)* Which means each token
> in your prompt is doing its own three hundred and thirty-six.
>
> **9.** *(the counters hold; the total beneath them stays blank)* Eight tokens.
> Three hundred and thirty-six each. How many is that?

### Act 5 — the total (beats 10–12) · **S-04**

> **10.** *(all eight counters run at once and the total assembles)* Two
> thousand, six hundred and eighty-eight.
>
> **11.** *(the total lands and holds)* Expert visits. For one pass, over eight
> words.
>
> **12.** *(the total holds while the climb finishes behind it)* And every one
> of them decided on the spot, from numbers that didn't exist until a moment
> before.

### Act 6 — the wall (beats 13–14) · **S-14**

> **13.** *(the markers arrive at the top floor)* So every token pays its own
> three hundred and thirty-six.
>
> **14.** *(they stop dead, all eight together)* All of that happens. And what
> comes out?

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the tower | — | the single marker holds partway up | `Tower`, 1 marker | one token | S-14 |
| 2 | the tower | — | seven more markers appear at the base beside it, one per token | `Tower`, 8 markers | 8 tokens | S-04 |
| 3 | the tower | — | all eight climb together, side by side, floor by floor | `Tower`, 8 climbing | together | S-04 |
| 4 | the tower | — | lines appear between the markers on the floor they are all standing on | cross-marker lines | attention, between | S-04 |
| 5 | the tower | — | the lines redraw on each new floor as they climb | lines per floor | on every floor | S-04 |
| 6 | the tower | — | a plate slides onto the front of the tower | `Tower`, plaque | **"transformer" stack** | S-12 |
| 7 | the tower | — | the plate settles; the climb continues behind it | plaque + climb | the shape, named | S-12 |
| 8 | the tower | — | a small counter appears above every marker, each reading 336 | 8 `Counter`s | 336 each | S-04 |
| 9 | the tower | — | the counters hold; a blank total waits beneath them; nothing moves | 8 counters + blank | **`8 × 336 = ?`** | S-06 |
| 10 | the tower | — | all eight counters run at once and the total assembles beneath them | 8 counters + total | 8 × 336 | S-04 |
| 11 | the tower | — | the total lands and holds | `Counter` | **2,688** | S-04 |
| 12 | the tower | — | the total holds while the climb finishes behind it | total + climb | decided on the spot | S-04 |
| 13 | the tower | — | the markers arrive at the top floor | `Tower`, markers near top | all eight | S-14 |
| 14 | the tower | — | they stop dead, together, and nothing happens next | `Tower`, markers stopped | waiting | S-14 |

### Board notes

- **No camera moves.** §7 brought us to the tower and §9 pushes in on its top
  floor. Fourteen beats in one place.
- **Eight markers. Not nine.** Four rows of this board said nine, months after
  the narration said eight, because the numerals survived a text sweep that
  caught the spelled-out words. This is the one section whose argument is an
  arithmetic the viewer can check against countable objects on screen, so a
  miscount here is not cosmetic — it makes the total wrong in front of them.
  `research/glm/TOKENIZER.md`.
- **Beat 9's total must be genuinely blank**, not faint or pre-drawn. If the
  number is visible the sum is not a question, and 8 × 336 is small enough that
  a viewer will actually attempt it — which is the only reason to ask.
- **Beat 4's lines are between markers, not from one marker.** §4 drew attention
  from *our* token outwards; here it is the mesh. If this frame repeats §4's
  one-to-many shape, the correction in beat 1 never lands visually.
- **Beat 14 has to be a dead stop.** Nothing continues, nothing fades. §9 opens
  by pushing in on exactly this frame, and the pause is what makes *"and what
  comes out?"* a question rather than a link.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank**, then admit the simplification |
| 2–3 | **correct** — the whole prompt, together |
| 4–5 | **teach** — attention is the wiring between them |
| 6–7 | **name** — this shape is the transformer stack |
| 8 | **teach** — every token pays its own 336 |
| 9 | **ask** — eight of them. How many is that? |
| 10–11 | **answer** — 2,688 |
| 12 | **teach** — and none of it was knowable in advance |
| 13–14 | **the wall** — all that, and what comes out? |

## Truth notes

- **The example is 9 tokens, not 10.** The running prompt tokenises to nine
  pieces in §2, and it is on screen here, so 8 × 336 = **2,688**. Beat 9 said
  "ten tokens" in the first draft; corrected, because the pieces are countable
  on the frame and a viewer who counts them would catch us.

- This is where v1's "following one word" simplification gets **paid for out
  loud** instead of hidden in a footnote. Beat 1 admits it. That is cheaper
  than an aside and it buys trust.
- Prefill (the prompt, in parallel) and decode (one token at a time, with a KV
  cache) are genuinely different. §8 is prefill; §10 is decode. Do not blur
  them — beat 3 is about the prompt.
- Each token picks its **own** top-8 independently at every sparse layer.
- "Transformer" is defined as the arrangement. Positional information, layer
  norm and the residual stream are asides, not beats.

## Frames

- Beat 3 is the frame: many tokens, side by side, climbing. It should feel
  crowded — that crowding is the point of the section.
- Beat 9's counters multiplying is the second-biggest number moment in the
  video after 336. Give it room.

## Assets

| Need | Status |
| --- | --- |
| many tokens climbing the `Tower` at once | **extend** `Tower` — a multi-marker state |
| attention wiring across parallel tokens | **extend** `AttentionLines` |
| `Counter` × N | have |
