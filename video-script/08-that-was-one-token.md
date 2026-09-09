# Section 08 — That was one token. Here's the sentence.

## Contract

| | |
| --- | --- |
| Enters on | 336 choices for one token. But a sentence isn't one token. |
| Teaches | **transformer**, parallel processing |
| Answers | the whole prompt goes through together, and attention is the wiring between them |
| → next | **therefore** every token pays its own 336 |
| Banks | **every token pays its own 336** |
| Target | ~11 beats · ~1:10 |

## The script

> **1.** Now. I've been following one token this whole time, and I owe you a
> correction.
>
> **2.** *(the whole sentence enters at once)* It doesn't go in on its own. Your
> entire prompt goes in together.
>
> **3.** *(all tokens climbing side by side)* Every token climbs at the same
> time. All of them, all forty-five floors, together.
>
> **4.** And **attention** is the wiring between them. That's what connects
> them — every token, on every floor, looking at all the others.
>
> **5.** That's what makes it read your sentence as a sentence, instead of a
> list of separate words.
>
> **6.** And this whole arrangement — the stack of floors, attention wiring them
> together, experts doing the work on each one — this is what the word
> **transformer** actually means.
>
> **7.** That's it. It's not a mysterious thing. It's this shape.
>
> **8.** Which means each token in your prompt is doing its own three hundred
> and thirty-six.
>
> **9.** *(counters multiplying)* Ten tokens in your sentence? That's three
> thousand, three hundred and sixty expert visits.
>
> **10.** And every one of them decided on the spot, from numbers that didn't
> exist until a moment before.
>
> **11.** So all of that happens. *(beat)* And what comes out?

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **honest** — the simplification is named and paid for, not buried in an aside |
| 2–3 | **answer** — parallel, together |
| 4–5 | **teach** — attention as wiring. Reframes §4 at no cost |
| 6–7 | **teach** — "transformer" defined as a shape, not a mystery |
| 8–10 | **banked** — deposit four, and it multiplies |
| 11 | **therefore** — the question §9 answers |

## Truth notes

- This is where v1's "following one word" simplification gets **paid for out
  loud** instead of hidden in a footnote. Beat 1 admits it. That is cheaper
  than an aside and it buys trust.
- Prefill (the prompt, in parallel) and decode (one token at a time, with a KV
  cache) are genuinely different. §8 is prefill; §10 is decode. Do not blur
  them — beat 3 is about the prompt.
- Each token picks its **own** top-8 independently at every sparse layer.
- "Transformer" is defined as the arrangement. Positional information, layer
  norm and the residual stream are asides, not beats.
- 10 × 336 = 3,360. Keep the example at ten tokens so the arithmetic is
  something the viewer can do in their head.

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
