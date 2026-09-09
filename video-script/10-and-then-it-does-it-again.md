# Section 10 — And then it does the whole thing again

## Contract

| | |
| --- | --- |
| Enters on | all that machinery, and one word comes out? |
| Teaches | autoregression — how a paragraph appears |
| Answers | the word is added to the end and the entire stack runs again, from the top |
| → next | **therefore** every word of the reply pays 336 all over again |
| Banks | **it never stops re-choosing** |
| Target | ~11 beats · ~1:05 |

## The script

> **1.** So how do you get a paragraph out of a machine that produces one word?
>
> **2.** You run it again.
>
> **3.** *(the new word joins the end of the sentence)* The word it just made
> gets added onto the end of your sentence.
>
> **4.** And the whole thing goes back in. From the beginning.
>
> **5.** *(the stack runs again)* New sentence — one word longer. Forty-five
> floors. Look around, pick experts, do the work.
>
> **6.** And another word comes out.
>
> **7.** *(the loop, accelerating)* Then again. And again. One word at a time,
> until it decides to stop.
>
> **8.** That's it. That's what's actually happening while you sit there
> watching a reply appear.
>
> **9.** Every single word of that reply. Full stack. Fresh choices.
>
> **10.** So it isn't three hundred and thirty-six choices. It's three hundred
> and thirty-six **per token, per word it writes**. It never stops choosing.
>
> **11.** Which means we can finally ask the question we started with properly.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example |
| --- | --- | --- | --- | --- | --- |
| 1 | outside the tower | — | the tower and the single word card hold, apart | `Tower`, `WordCard` | one word |
| 2 | outside the tower | — | the card flies back down to the base and joins the end of the sentence | card → `Sentence` | `…and it bounced` |
| 3 | outside the tower | — | the sentence is now one token longer; a tenth marker appears | `Sentence` +1, 10 markers | 10 tokens |
| 4 | outside the tower | — | all ten markers enter at the base together | `Tower`, 10 climbing | again |
| 5 | outside the tower | — | the whole climb replays, faster | `Tower`, fast climb | 45 floors again |
| 6 | outside the tower | — | another card drops out at the top | `WordCard` | the next word |
| 7 | outside the tower | — | the cycle repeats, accelerating each time | `GenerateLoop` | again, and again |
| 8 | outside the tower | — | the produced words accumulate as a line of text beside the tower | growing sentence | the reply, appearing |
| 9 | outside the tower | — | a counter beside each produced word ticks 336 per token | `Counter`s | 336, per token, per word |
| 10 | outside the tower | — | the running total climbs and does not stop | `Counter`, unbounded | it never stops |
| 11 | outside the tower | — | everything halts at once; the tower and the finished reply hold | `Tower` + full reply | — |

### Board notes

- **No camera moves.** We watch the loop from one fixed position for the whole
  section, because the loop is the subject and a moving camera would make it
  read as a montage rather than a cycle.
- **Beat 7's acceleration is the one place speed itself is the message.** It
  should become slightly uncomfortable. That discomfort is the argument.
- Beat 8 connects it to something the viewer has literally watched happen — a
  reply appearing a word at a time. The line of text must build **at the pace
  of the loop**, not smoothly.
- The KV-cache aside chips off **beat 5** and must open without stopping the
  loop behind it.
- Beat 11's total halt buys §11's opening. Stop everything, then ask.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **hook** — the question the viewer has after §9 beat 10 |
| 2 | **answer** — three words |
| 3–7 | **teach** — the loop |
| 8 | **teach** — connects it to something they have literally watched happen |
| 9–10 | **banked** — deposit five, and the one that makes §11 inevitable |
| 11 | **therefore** — the turn back to the opening |

## Truth notes

- Real systems keep a **KV cache**, so earlier tokens are not fully recomputed
  each step. That matters here: without it, beat 4's "from the beginning" is
  misleading about compute. Say the words *"from the beginning"* about the
  **sentence**, not about the work, and put the KV cache in an **aside** off
  beat 5. `research/glm/GROUND_TRUTH.md`.
- **But the expert routing is genuinely redone** for each new token at every
  sparse layer — the KV cache does not save you any of that. That is exactly
  why the cache is worth an aside rather than a rewrite: it removes an
  objection without weakening the point.
- "Until it decides to stop" — an end-of-sequence token. One clause, no more.

## Frames

- Beat 7's acceleration is the one place in the video where speed itself is the
  message. It should become uncomfortable.
- Beat 10: the counter from §7 returns and keeps going. Same object.
- The aside chip on beat 5 must not interrupt the loop's rhythm — it opens on
  click and the loop keeps running behind it.

## Assets

| Need | Status |
| --- | --- |
| the generation loop, accelerating | **build** — `GenerateLoop` |
| `Aside` for the KV cache | have |
| `Counter`, continuing | have |
