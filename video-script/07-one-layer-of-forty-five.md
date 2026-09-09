# Section 07 — That was one layer. There are 45.

## Contract

| | |
| --- | --- |
| Enters on | how many steps are there? |
| Teaches | **layer**, **sparse** vs **dense** |
| Answers | forty-five, and forty-two of them choose experts — **336 expert visits per token** |
| → next | **therefore** 336 choices, every one needing the floor below to finish first |
| Banks | **336 choices, not one** |
| Target | ~13 beats · ~1:25 |

## The script

> **1.** Forty-five.
>
> **2.** *(the camera pulls back — the room becomes one floor)* That room we've
> been standing in this whole time is one floor.
>
> **3.** *(the tower assembles)* There are forty-five of them.
>
> **4.** The token doesn't get processed once. It climbs.
>
> **5.** And every floor does the same two things. Look around. Pick experts.
> Do the work.
>
> **6.** *(the row changing on each floor)* Which means the row arriving at
> floor two is not the row that arrived at floor one.
>
> **7.** Different row. *(beat)* Different scores.
>
> **8.** *(a new eight lights, one floor up)* Different eight.
>
> **9.** Every floor picks fresh. Same token, same model, new team.
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
> **13.** Three hundred and thirty-six choices, for one token — and every single
> one of them needed the floor below to finish before it could be made.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example |
| --- | --- | --- | --- | --- | --- |
| 1 | the room | — | the room holds, bounded, with the row inside it | the room, one row | — |
| 2 | the tower | **pull back** | we keep backing away and the room shrinks until it is one floor with others above and below | `Tower`, room highlighted | one floor |
| 3 | the tower | — | floors continue stacking upward until the count draws itself | `Tower`, 45 floors | 45 |
| 4 | the tower | — | a marker carrying the row starts climbing from floor one | `Tower` + climbing marker | the token |
| 5 | the tower | — | on each floor it passes, three quick flashes fire in order | flashes per floor | look · pick · work |
| 6 | the tower | — | the row is shown at floor one and floor two — different values | two `NumberRow`s | floor 1 vs floor 2 |
| 7 | the tower | — | the two rows hold side by side | two rows | different |
| 8 | the tower | — | floor two's eight light, in different positions from floor one's | two floors, two teams | different eight |
| 9 | the tower | — | the climb resumes; every floor lights a different eight as it passes | `Tower` climbing | fresh each floor |
| 10 | the tower | — | the bottom three floors redraw themselves plain, without expert walls | `Tower`, 3 dense marked | 3 dense · 42 sparse |
| 11 | the tower | — | 42 and 8 slide together and a multiplication draws itself | `Counter`, `8 × 42` | 8 × 42 |
| 12 | the tower | — | the counter runs up the tower floor by floor and stops | `Counter` running | **336** |
| 13 | the tower | — | 336 holds while a single line traces the whole climb bottom to top | `Counter`, trace line | every one needed the one below |

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
| 11–12 | **answer** — 336, built on screen rather than asserted |
| 13 | **banked** — deposit three, and the strongest one |

## Truth notes

- **45 layers: 3 dense, 42 sparse.** Only the sparse ones route. `GROUND_TRUTH.md`.
- 8 × 42 = 336. **Show the multiplication.** A number the viewer watched being
  built is a number they trust.
- The same token can select a **different team at every sparse layer**. This is
  the crux the entire ending rests on.
- Do not say "42 times per second" or any rate here. Rates arrive in §11.

## Frames

- The pull-back is the one camera move in the video that earns itself. The
  interior is authored at zoom 1 and the camera earns the **scene change** —
  see the note in `src/paper/camera.tsx`.
- Beat 12's counter must be legible as it runs and must land on 336, held.
- The tower marks the 3 dense floors differently from the 42 sparse ones,
  because beat 10 says so and a frame that contradicts the voice is a bug.

## Assets

| Need | Status |
| --- | --- |
| camera pull-back | have |
| 45-floor `Tower`, 3 dense + 42 sparse marked | have |
| climbing marker | have |
| `Counter` running to 336 | have |
