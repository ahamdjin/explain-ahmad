# Section 10 — And then it does the whole thing again

Status: **SCRIPT v9.** Written to spine v5. Every beat cites a strategy from
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
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 10`

## Contract

| | |
| --- | --- |
| Enters on | all that machinery, and one word comes out? |
| Teaches | autoregression — how a paragraph appears |
| Answers | the word is added to the end and the entire stack runs again, from the top |
| Exits on | it never stops choosing. So could you store only the part it uses? |
| → next | **therefore** every word of the reply pays 336 all over again |
| Banks | **it never stops re-choosing** |
| Target | ~11 beats · ~1:05 |

## The script

### Act 1 — banking the one word (beat 1) · **S-14**

> **1.** One word. So how do you get a paragraph out of a machine that produces one
> word?
>
### Act 2 — a question about the paragraph (beat 2) · **S-06**

> **2.** You run it again.
>
### Act 3 — it runs again, from the top (beats 3–10) · **S-04**

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
### Act 4 — it never stops re-choosing (beat 11) · **S-14**

> **11.** So it never stops re-choosing. Which means we can finally ask the question
> we started with, properly.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | outside the tower | — | the tower and the single word card hold, apart | `Tower`, `WordCard` | one word | S-14 |
| 2 | outside the tower | — | the card flies back down to the base and joins the end of the sentence | card → `Sentence` | `…and it bounced` | S-06 |
| 3 | outside the tower | — | the sentence is now one token longer; a tenth marker appears | `Sentence` +1, 10 markers | 10 tokens | S-04 |
| 4 | outside the tower | — | all ten markers enter at the base together | `Tower`, 10 climbing | again | S-04 |
| 5 | outside the tower | — | the whole climb replays, faster | `Tower`, fast climb | 45 floors again | S-04 |
| 6 | outside the tower | — | another card drops out at the top | `WordCard` | the next word | S-04 |
| 7 | outside the tower | — | the cycle repeats, accelerating each time | `GenerateLoop` | again, and again | S-04 |
| 8 | outside the tower | — | the produced words accumulate as a line of text beside the tower | growing sentence | the reply, appearing | S-04 |
| 9 | outside the tower | — | a counter beside each produced word ticks 336 per token | `Counter`s | 336, per token, per word | S-04 |
| 10 | outside the tower | — | the running total climbs and does not stop | `Counter`, unbounded | it never stops | S-04 |
| 11 | outside the tower | — | everything halts at once; the tower and the finished reply hold | `Tower` + full reply | — | S-14 |

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
