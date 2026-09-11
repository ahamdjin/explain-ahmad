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

## What changed from v8

**1. S-06 was cited on "You run it again."** That is the answer, not a
question — the same false citation §4 had. And there is a real question here,
with a genuinely wrong intuition behind it: most people assume the model
*continues* from where it stopped. It starts over. Beat 2 now asks, beat 3
answers.

**2. The board said a tenth marker.** Stale from the tokenizer measurement —
eight tokens plus the new word is **nine**.

**3. The closing recap ran into the handoff.** Splitting them gives *it never
stops re-choosing* its own frame, which is the line §11 is about to spend.

## The script

### Act 1 — banking the one word (beat 1) · **S-14**

> **1.** *(the tower and the single word card hold, apart)* One word. So how do
> you get a paragraph out of a machine that produces one word?

### Act 2 — the question (beats 2–3) · **S-06**

> **2.** *(the card hovers near the base; nothing else moves)* To make the next
> one — do you reckon it carries on from where it stopped? Or starts over?
>
> **3.** *(the card joins the end of the sentence and the whole thing turns back
> towards the base)* It starts over. All of it.

### Act 3 — the loop (beats 4–11) · **S-04**

> **4.** *(the sentence is now one token longer; a ninth marker appears)* The
> word it just made joins the end of your sentence.
>
> **5.** *(all nine enter at the base together)* And the whole thing goes back
> in. From the beginning. One token longer than last time.
>
> **6.** *(the whole climb replays, faster)* Forty-five floors again. Three
> hundred and thirty-six choices again — for every single token.
>
> **7.** *(another card drops out at the top)* And another word comes out.
>
> **8.** *(the cycle repeats, accelerating)* Then again. And again. One word at
> a time.
>
> **9.** *(the produced words accumulate beside the tower)* That's it. That's
> what's actually happening while you sit there watching it type.
>
> **10.** *(a counter beside each produced word ticks)* Every single word of
> that reply. Full stack. Fresh choices.
>
> **11.** *(the running total climbs and does not stop)* So it isn't three
> hundred and thirty-six choices. It's three hundred and thirty-six, times
> every token, times every word it writes back.

### Act 4 — the wall (beats 12–13) · **S-14**

> **12.** *(everything halts at once)* It never stops re-choosing.
>
> **13.** *(the tower and the finished reply hold together in frame)* Which
> means we can finally ask the question we started with, properly.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | outside the tower | — | the tower and the single word card hold, apart | `Tower`, `WordCard` | one word | S-14 |
| 2 | outside the tower | — | the card hovers near the base; nothing else moves | card, still | **`carry on, or start over?`** | S-06 |
| 3 | outside the tower | — | the card joins the end of the sentence and the whole line turns back towards the base | card → `Sentence` | `…and it bounced` | S-06 |
| 4 | outside the tower | — | the sentence is now one token longer; a ninth marker appears | `Sentence` +1, 9 markers | 9 tokens | S-04 |
| 5 | outside the tower | — | all nine markers enter at the base together | `Tower`, 9 climbing | again | S-04 |
| 6 | outside the tower | — | the whole climb replays, faster | `Tower`, fast climb | 45 floors again | S-04 |
| 7 | outside the tower | — | another card drops out at the top | `WordCard` | the next word | S-04 |
| 8 | outside the tower | — | the cycle repeats, accelerating each time | `GenerateLoop` | again, and again | S-04 |
| 9 | outside the tower | — | the produced words accumulate as a line of text beside the tower | growing sentence | the reply, appearing | S-04 |
| 10 | outside the tower | — | a counter beside each produced word ticks 336 per token | `Counter`s | 336, per token, per word | S-04 |
| 11 | outside the tower | — | the running total climbs and does not stop | `Counter`, unbounded | it never stops | S-04 |
| 12 | outside the tower | — | everything halts at once | `Tower` + reply, frozen | the stop | S-14 |
| 13 | outside the tower | — | the tower and the finished reply hold together | `Tower` + full reply | — | S-14 |

### Board notes

- **No camera moves.** §9 left us outside the tower and §11 stays there. The
  whole loop is watched from one position, which is what lets beat 11's
  unbounded counter read as *this does not stop* rather than as a new scene.
- **Beat 2 is the still frame.** The card has to hover *near the base* — close
  enough that "carry on from here" looks plausible — or the question has no
  wrong answer to offer, and a question whose wrong answer is unavailable is
  decoration.
- **Nine markers, not ten.** Eight tokens plus the word it just made. The board
  said ten, stale from before the tokenizer was measured.
- **Beat 6 must replay the *whole* climb**, from the base, not resume partway.
  That is the entire content of beat 3's answer, and if the animation cheats by
  starting halfway the picture teaches the intuition the beat just corrected.
- **Beat 11's counter must have no ceiling and no final value.** The moment it
  lands on a number, the point inverts — it becomes a cost you could budget for,
  which is exactly the belief §11 goes on to take apart.
- Beat 12 halts **everything at once**, including the counter. §11 opens on the
  stillness.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank** — one word, and the obvious problem with that |
| 2 | **ask** — carry on, or start over? |
| 3 | **correct** — it starts over, all of it |
| 4–6 | **teach** — one token longer, forty-five floors again |
| 7–9 | **teach** — the loop, accelerating, and what it looks like from outside |
| 10–11 | **teach** — the cost multiplies by every word it writes |
| 12–13 | **the wall** — it never stops re-choosing |

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
