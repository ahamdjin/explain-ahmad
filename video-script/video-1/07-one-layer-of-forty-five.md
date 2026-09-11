# Section 07 — That was one layer. There are 45.

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
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 07`

## Contract

| | |
| --- | --- |
| Enters on | how many steps are there? |
| Teaches | **layer**, **sparse** vs **dense** |
| Answers | forty-five, and forty-two of them run a router — 42 decisions, 8 experts each, **336 expert visits per token** |
| Exits on | 336 expert visits for one token. But a sentence isn't one token. |
| → next | **therefore** 336 visits, every one needing the floor below to finish first |
| Banks | **336 visits, not one** |
| Target | ~13 beats · ~1:25 |

**5. "336 choices" flattened the hierarchy.** There are **42 routing
decisions**, each selecting **8 experts**, giving **336 expert visits**. This
section's own Contract said "visits" while its VO said "choices", so the script
disagreed with itself. It matters because §12 turns on *when a routing decision
becomes knowable* — and that is a per-floor event, not a per-expert one. The
count is now spoken as 42 × 8, and beat 12's counter steps in eights.

**6. Beat 7 answered "No" to "the same eight?"** Too absolute, for the reason
in §5's v10 notes. Beat 6 now asks *pick again, or keep?*, beat 7 answers that
it picks again, and beat 8 shows one or two experts recurring without being
*kept* — which is the honest picture and the one §12 needs.

## The script

### Act 1 — banking one step (beat 1) · **S-14**

> **1.** *(the room holds, bounded, with the row inside it)* That's one step —
> look around, choose, work. And that room we've been standing in this whole
> time is not the machine. It's one part of it.
>
### Act 2 — forty-five floors (beats 2–5) · **S-04**

> **2.** *(the camera pulls back — the room becomes one floor)* It's one floor.
>
> **3.** *(the tower assembles)* There are forty-five of them.
>
> **4.** The token doesn't get processed once. It climbs.
>
> **5.** And every floor does the same two things. Look around. Pick experts.
> Do the work.
>
### Act 3 — the second bet (beats 6–7) · **S-05**

> **6.** *(the row changing on each floor)* So: same word, one floor up. Does
> it pick again — or does it keep the eight it's got?
>
> **7.** It picks again. Every floor runs its own router, from scratch — because
> the row arriving at floor two is not the row that arrived at floor one.
>
### Act 4 — it re-chooses on every floor (beats 8–12) · **S-04**

> **8.** *(a new eight lights one floor up — mostly different, two in the same
> positions as below)* Usually a different eight. Sometimes a couple come up
> again — it isn't keeping them, it just scored them highest twice.
>
> **9.** Forty-two floors, forty-two decisions. Same token, same model, and it
> commits to nothing.
>
> **10.** Now — three of the forty-five don't have experts at all. They're plain
> blocks that everything goes through. The other forty-two are the ones that
> choose. Those are called the **sparse** ones.
>
> **11.** Forty-two floors. Eight experts each.
>
> **12.** *(the counter runs)* Which means this isn't eight expert visits for
> this token. It's three hundred and thirty-six.
>
### Act 5 — 336 — the number nobody quotes (beat 13) · **S-15**

> **13.** Three hundred and thirty-six expert visits, for one token — and every single one
> of them needed the floor below to finish before it could be made. Nobody
> quotes that number. It’s the one that matters.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the room | — | the room holds, bounded, with the row inside it | the room, one row | — | S-14 |
| 2 | the tower | **pull back** | we keep backing away and the room shrinks until it is one floor with others above and below | `Tower`, room highlighted | one floor | S-04 |
| 3 | the tower | — | floors continue stacking upward until the count draws itself | `Tower`, 45 floors | 45 | S-04 |
| 4 | the tower | — | a marker carrying the row starts climbing from floor one | `Tower` + climbing marker | the token | S-04 |
| 5 | the tower | — | on each floor it passes, three quick flashes fire in order | flashes per floor | look · pick · work | S-04 |
| 6 | the tower | — | everything stops; the question holds on screen | floor 1 row, still | **`pick again, or keep?`** | S-05 |
| 7 | the tower | — | the floor-two row appears beside it, visibly different | two `NumberRow`s | floor 1 vs floor 2 | S-05 |
| 8 | the tower | — | floor two's eight light: six in new positions, two in the same slots as floor one | two floors, partial overlap | mostly different | S-04 |
| 9 | the tower | — | the climb resumes; every floor runs its own router and lights its own eight | `Tower` climbing | 42 decisions | S-04 |
| 10 | the tower | — | the bottom three floors redraw themselves plain, without expert walls | `Tower`, 3 dense marked | 3 dense · 42 sparse | S-04 |
| 11 | the tower | — | 42 and 8 slide together and a multiplication draws itself | `Counter`, `8 × 42` | 8 × 42 | S-04 |
| 12 | the tower | — | the counter runs up floor by floor, adding 8 per sparse floor, and stops | `Counter` running | 42 × 8 = **336** | S-04 |
| 13 | the tower | — | 336 holds while a single line traces the whole climb bottom to top | `Counter`, trace line | every one needed the one below | S-15 |

### Board notes

- **One camera move**, beat 2, and it is the biggest single moment in the video.
  §6 gave the room edges for exactly this. The viewer can point at §6 beat 11
  and say "we were in there."
- Beat 5's three flashes must fire **in order** — attention, router, experts —
  because that order is the whole causal argument, and out of order it teaches
  the wrong thing.
- **Beats 6–8 are the carrying frames.** Two floors, two rows, two different
  eights, on one frame.
- Beat 12: the counter climbs **with** the marker, so 336 is watched being
  built rather than announced. A number the viewer saw assembled is a number
  they trust.
- Beat 10 has to happen *before* beat 11, or the arithmetic is 8 × 45.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **answer** — one word, immediately. §6's question is not left hanging for a second |
| 2–3 | **turn** — the pull-back. The biggest "oh" available in the video |
| 4–9 | **teach** — the repeat, and that the choice repeats with it |
| 10 | **teach** — sparse vs dense. One clause, prevents a wrong number |
| 11–12 | **answer** — 42 × 8 = 336, built on screen rather than asserted |
| 13 | **banked** — deposit three, and the strongest one |

## Truth notes

- **45 layers: 3 dense, 42 sparse.** Only the sparse ones route. `GROUND_TRUTH.md`.
- 42 × 8 = 336. **Show the multiplication**, and in that order — 42 decisions,
  eight experts each. A number the viewer watched being
  built is a number they trust.
- The same token can select a **different team at every sparse layer**. This is
  the crux the entire ending rests on.
- Do not say "42 times per second" or any rate here. Rates arrive in §11.

## Frames

- The pull-back is the one camera move in the video that earns itself. The
  interior is authored at zoom 1 and the camera earns the **scene change** —
  see the note in `src/paper/camera.tsx`.
- Beat 12's counter must be legible as it runs and must land on 336, held. It
  steps in eights, once per sparse floor, so the hierarchy is watched rather
  than stated: the floor decides, the eight follow.
- **Beat 8's two repeats are not decoration.** Partial overlap between
  consecutive routing decisions is real and measured, and §12's caching
  argument depends on it. If beat 8 shows eight wholly new positions, §12
  contradicts §7 five sections later.
  `research/glm/OFFLOADING_AND_LOCALITY.md` §5.
- The tower marks the 3 dense floors differently from the 42 sparse ones,
  because beat 10 says so and a frame that contradicts the voice is a bug.

## Assets

| Need | Status |
| --- | --- |
| camera pull-back | have |
| 45-floor `Tower`, 3 dense + 42 sparse marked | have |
| climbing marker | have |
| `Counter` stepping in eights to 336 | **extend** — needs a step size |
