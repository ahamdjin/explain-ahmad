# Section 10 — And then it does the whole thing again

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
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 10`

## Contract

| | |
| --- | --- |
| Enters on | all that machinery, and one word comes out? |
| Teaches | autoregression — how a paragraph appears |
| Answers | the new word joins the end and climbs all forty-five floors itself — the earlier words' work is kept, the routing is not |
| Exits on | it never stops choosing. So could you store only the part it uses? |
| → next | **therefore** every word of the reply pays 336 all over again |
| Banks | **it never stops re-choosing** |
| Target | ~14 beats · ~1:15 |

## What changed from v8

**1. S-06 was cited on "You run it again."** That is the answer, not a
question — the same false citation §4 had. And there is a real question here,
with a genuinely wrong intuition behind it: most people assume the model
*continues* from where it stopped. It starts over. Beat 2 now asks, beat 3
answers.

**2. The board said a tenth marker.** Stale from the tokenizer measurement —
eight tokens plus the new word is **nine**.

**3. The loop was drawn as a full recompute, which is the wrong computation.**
v9 marched all nine tokens back to the base and replayed the whole climb for
every one of them. That is prefill, not decode. `GROUND_TRUTH.md` is explicit:
the chosen token is appended and *only that new token* is pushed through the 45
layers — earlier positions are reused from the KV cache. v9 knew this and
filed it as an *aside* off beat 5, which cannot work: the main picture was
teaching the thing the aside was meant to correct. The cache is now load-bearing
and sits in the spoken line.

**4. Beat 11 multiplied where it should have added.** v9 said *"336, times
every token, times every word it writes back"*. Your prompt pays 2,688 **once**;
each generated word pays 336. A product instead of a sum overstates the figure
by more than an order of magnitude, and it is the number §11 spends.

**5. Beat 3's answer was "it starts over. All of it."** Also wrong, and the
binary question behind it had no right answer available. The question is now
about the *new word* — does it get a shortcut? — where the wrong intuition is
real and the true answer is no.

**6. The closing recap ran into the handoff.** Splitting them gives *it never
stops re-choosing* its own frame, which is the line §11 is about to spend.

## The script

### Act 1 — banking the one word (beat 1) · **S-14**

> **1.** *(the tower and the single word card hold, apart)* One word. So how do
> you get a paragraph out of a machine that produces one word?

### Act 2 — the question (beats 2–3) · **S-06**

> **2.** *(the card hovers near the base; nothing else moves)* The model has
> just done all of that work. So to make the next word — does this one get a
> shortcut?
>
> **3.** *(the card drops to the base and sits on floor one)* No. It starts at
> the bottom. Floor one, same as the first word did.

### Act 3 — what is kept, and what isn't (beats 4–7) · **S-04**

> **4.** *(the sentence is now one token longer; a ninth marker appears)* The
> word it just made joins the end of your sentence.
>
> **5.** *(the eight earlier markers dim and hold in place, up the tower)* But
> the eight before it don't climb again. Everything the model worked out about
> them is still sitting there, kept. That's the bit it doesn't have to redo.
>
> **6.** *(only the ninth marker enters the base and begins to climb)* Just the
> new word goes up. All forty-five floors, reading the kept work as it passes.
>
> **7.** *(forty-two of the floors light as it passes; a counter runs)*
> Forty-two of those floors choose. Eight experts each time. Three hundred and
> thirty-six expert visits — for this one word.

### Act 4 — the loop (beats 8–12) · **S-04**

> **8.** *(another card drops out at the top)* And another word comes out.
>
> **9.** *(the cycle repeats, accelerating)* Then again. And again. One word at
> a time.
>
> **10.** *(the produced words accumulate beside the tower)* That's it. That's
> what's actually happening while you sit there watching it type.
>
> **11.** *(the prompt's total sets, then a second counter starts per word)*
> Your eight words cost two thousand, six hundred and eighty-eight visits, once.
> Every single word it writes back costs another three hundred and thirty-six.
>
> **12.** *(the running total climbs and does not stop)* And it doesn't know
> which experts the next word needs until the next word is halfway up.

### Act 5 — the wall (beats 13–14) · **S-14**

> **13.** *(everything halts at once)* It never stops re-choosing.
>
> **14.** *(the tower and the finished reply hold together in frame)* Which
> means we can finally ask the question we started with, properly.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | outside the tower | — | the tower and the single word card hold, apart | `Tower`, `WordCard` | one word | S-14 |
| 2 | outside the tower | — | the card hovers near the base; nothing else moves | card, still | **`does it get a shortcut?`** | S-06 |
| 3 | outside the tower | — | the card drops to the base and sits on floor one | card at floor 1 | no shortcut | S-06 |
| 4 | outside the tower | — | the sentence is now one token longer; a ninth marker appears | `Sentence` +1, `TOKENS + 1` markers | 9 tokens | S-04 |
| 5 | outside the tower | — | the eight earlier markers dim and hold in place up the tower; none of them move | 8 dimmed, held | kept | S-04 |
| 6 | outside the tower | — | only the ninth marker enters the base and climbs alone | `Tower`, 1 climbing | just the new word | S-04 |
| 7 | outside the tower | — | 42 of the 45 floors light as it passes; a counter runs with it | `Tower`, `Counter` | 336, for this word | S-04 |
| 8 | outside the tower | — | another card drops out at the top | `WordCard` | the next word | S-04 |
| 9 | outside the tower | — | the cycle repeats, accelerating each time | `GenerateLoop` | again, and again | S-04 |
| 10 | outside the tower | — | the produced words accumulate as a line of text beside the tower | growing sentence | the reply, appearing | S-04 |
| 11 | outside the tower | — | the prompt's total sets once and stops; a second counter starts, adding 336 per produced word | `Counter` ×2 | 2,688 once · +336 each | S-04 |
| 12 | outside the tower | — | the running total climbs and does not stop | `Counter`, unbounded | it never stops | S-04 |
| 13 | outside the tower | — | everything halts at once | `Tower` + reply, frozen | the stop | S-14 |
| 14 | outside the tower | — | the tower and the finished reply hold together | `Tower` + full reply | — | S-14 |

### Board notes

- **No camera moves.** §9 left us outside the tower and §11 stays there. The
  whole loop is watched from one position, which is what lets beat 12's
  unbounded counter read as *this does not stop* rather than as a new scene.
- **Beat 2 is the still frame.** The card has to hover *near the base* — close
  enough that "it can skip ahead from here" looks plausible — or the question
  has no wrong answer to offer, and a question whose wrong answer is
  unavailable is decoration.
- **Beats 5 and 6 are the correction, and they are a pair.** Five holds the
  eight earlier markers *still*, up the tower where they finished; six sends
  only the ninth up from the base. If any of the eight move in beat 6 the
  picture is teaching a full recompute, which is the wrong computation and the
  single biggest error v9 shipped. This cannot be fixed by a caption.
- **Nine markers, not ten.** Eight tokens plus the word it just made. Derived
  from `TOKENS + 1`, never typed.
- **Beat 7's counter counts one word's visits**, not the sentence's. It lands
  on 336 and stops, so beat 11 can add to it rather than contradict it.
- **Beat 11 needs two counters, visibly different.** The prompt's 2,688 sets
  once and then never changes; the reply's grows. One counter cannot carry a
  figure that stops and a figure that doesn't, and conflating them is how v9
  came to multiply the two together.
- **Beat 12's counter must have no ceiling and no final value.** The moment it
  lands on a number, the point inverts — it becomes a cost you could budget for,
  which is exactly the belief §11 goes on to take apart.
- Beat 13 halts **everything at once**, including the counter. §11 opens on the
  stillness.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank** — one word, and the obvious problem with that |
| 2 | **ask** — does the next word get a shortcut? |
| 3 | **correct** — no; it starts at floor one |
| 4–5 | **teach** — the word joins the end, and the earlier work is kept |
| 6–7 | **teach** — only the new word climbs, and it pays its own 336 |
| 8–10 | **teach** — the loop, accelerating, and what it looks like from outside |
| 11–12 | **teach** — once for the prompt, again for every word, and never known in advance |
| 13–14 | **the wall** — it never stops re-choosing |

## Truth notes

- **This section describes decode, and decode is not prefill.** `GROUND_TRUTH.md`
  §"How a prompt actually moves through the model": the chosen token is
  appended and *only that new token* is pushed through all 45 layers; earlier
  tokens' keys and values are reused from the **KV cache**. v9 drew all nine
  climbing, which is the prefill picture, and put the cache in an aside. The
  aside is gone — beats 5 and 6 carry it, because a caption cannot correct the
  main image.
- **What the cache does not save you is the routing.** Every sparse layer
  re-runs its router for the new position, so the 336 expert visits are paid in
  full per generated token. That is why conceding the cache costs the argument
  nothing: it removes the one objection a knowledgeable viewer would raise and
  leaves the cost intact.
- **The total is a sum, not a product.** Prefill pays 336 per prompt token —
  8 × 336 = **2,688**, the figure §8 built on screen. Decode pays 336 per
  generated word. So the running total is 2,688 + 336 per word, *not*
  336 × tokens × words. v9 multiplied them, which inflates the number by more
  than an order of magnitude and would have been the most quotable error in the
  video.
- Beat 5 says the kept work is "everything the model worked out about them",
  which is true and deliberately not called a cache on screen. The word "cache"
  buys nothing here and costs a definition.
- "Until it decides to stop" — an end-of-sequence token. One clause, no more.

## Frames

- Beat 9's acceleration is the one place in the video where speed itself is the
  message. It should become uncomfortable.
- Beat 7: the counter from §7 returns. Same object, same run to 336 — this is
  the third time the viewer has watched that number assemble, and it should
  look like the same number, not a new one.
- **The dimmed eight in beats 5–6 must stay legible.** They are the argument.
  If they fade far enough to read as "gone", the viewer sees one word climbing
  an empty tower and loses the reason it's cheaper than the first pass.

## Assets

| Need | Status |
| --- | --- |
| the generation loop, accelerating | **build** — `GenerateLoop` |
| held, dimmed markers at the top | **have** — `Tower` `kept`, added 2026-09-11, verified by rendering |
| two counters, one frozen and one growing | **build** — `Counter` pair |
