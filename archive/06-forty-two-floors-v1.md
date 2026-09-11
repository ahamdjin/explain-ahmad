# Section 06 — Forty-two floors

> **Built.** 11 beats, 0:55. Board: `storyboard/video-1/BOARD.md` (generated).
> Route: `/section-06` · in sequence: `/watch?section=6`

## Contract

| | |
| --- | --- |
| Enters on | So this happens once per word — right? |
| Answers | No. It happens 42 times per word — 336 expert visits. |
| **Event** | **The room turns out to be one floor of a tower, and the counter runs to 336.** |
| Exits on | Could you fetch 336 different sets, per word, fast enough? |
| Beats | **11 · 0:55** — built |
| Owns after | `layer`, `sparse` vs `dense` |
| Still forbidden | `bandwidth` (it arrives in §7) |

## The local hook

The vertigo. Everything so far has happened in one room, and the viewer has
quietly assumed that room *is* the model. Pulling the camera back to show it is
one floor of forty-five is the biggest single "oh" available in the whole video,
and it costs one camera move.

Then the counter does the rest. 8 is a small number. 336 is not.

## The script

> **1.** No.
>
> **2.** *(the camera pulls back — the room is one floor)* That room is one
> floor.
>
> **3.** *(the tower assembles)* There are forty-five.
>
> **4.** The word doesn't get processed once. It climbs.
>
> **5.** And on every floor, the same thing happens again — it looks around, its
> numbers change…
>
> **6.** *(the row changes at each floor)* …and its numbers are different from
> the floor below.
>
> **7.** Different numbers. *(beat)* Different scores.
>
> **8.** *(a new eight lights on the next floor)* Different eight.
>
> **9.** Forty-two of those floors work this way. Eight experts, every one.
>
> **10.** *(the counter runs)* Which is not eight expert visits for this word.
> It's three hundred and thirty-six.
>
> **11.** Three hundred and thirty-six — for one word. Could you fetch those out
> of storage, fast enough, every single word?

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **turn** — takes §5's confident ending away in one syllable |
| 2–3 | **turn** — the event, the pull-back |
| 4–8 | answer — the mechanism repeats, and so does the consequence |
| 9–10 | answer — the number, built rather than asserted |
| 11 | **hook** — exit, and it hands §7 a question with arithmetic already in it |

## The aside — do not remove it

Beat 4 carries an expandable aside: **"what about the rest of the sentence?"**

Following one word alone is the only thing in the whole chain that is not
literally true. The real shape is that the entire prompt goes in at once and
climbs together, each word carrying its own numbers and picking its own eight
independently. See `research/glm/GROUND_TRUTH.md`.

It belongs in an aside rather than in beats because it does not change the
answer — and because it makes the problem §7 is about **worse**, not better.
Following one word is the kind version. Beat 4 is where a viewer starts
wondering, so that is where the chip goes.

## Truth notes

- 45 layers: **3 dense, 42 sparse.** Only the sparse ones route. Say so at beat
  9 — it is one clause and it prevents a wrong number.
- 8 × 42 = 336. Show the multiplication; a number the viewer watched being built
  is a number they trust.
- The same word can select a **different team at every sparse layer** — this is
  the crux the whole answer rests on.

## Assets

| Need | Status |
| --- | --- |
| camera pull-back | from §2 |
| 45-floor tower | **build** — `Tower`, with 3 dense + 42 sparse marked |
| climbing marker | **build** — the word ascending |
| `Counter` running to 336 | **build** — reusable |
