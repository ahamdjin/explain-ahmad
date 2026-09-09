# Section 03 — The word becomes numbers

> **Built.** 10 beats, 0:49. Board: `storyboard/BOARD.md` (generated).
> Route: `/section-03` · in sequence: `/watch?section=3`

## Contract

| | |
| --- | --- |
| Enters on | What is the router actually reading? |
| Answers | A long list of numbers that stands for the word. |
| **Event** | **The word tears up into 4096 numbers that run off the frame.** |
| Exits on | Those numbers are the same every time. So how did the team ever change? |
| Beats | **10 · 0:49** — built |
| Owns after | `token`, "its numbers" |
| Still forbidden | `attention`, `layer`, `bandwidth` |

## The local hook, and the paradox it plants

Two payoffs in one section. The **scale** of 4096 values for one small word, and
then a genuine **contradiction**: §1 proved the team changes, and this section
proves the numbers don't. Both cannot be true.

That contradiction is what makes §4 necessary rather than merely next. A viewer
who feels a contradiction will sit through anything to have it resolved.

## The script

> **1.** That sheet is what the word actually looks like in here.
>
> **2.** Not letters. Numbers.
>
> **3.** *(the card comes apart)* This word becomes a row of them.
>
> **4.** How many? *(the row extends)*
>
> **5.** *(it keeps going, off the frame)* Four thousand and ninety-six.
>
> **6.** For one small word.
>
> **7.** And none of them means anything on its own. There's no "dog" number in
> there. It's the whole row, together, that stands for the word.
>
> **8.** Fine. So the router reads the row, and picks its eight.
>
> **9.** Except — hold on.
>
> **10.** *(two identical rows, side by side)* This row is the same every single
> time this word turns up. Same word, same numbers.
>
> **11.** So how did the team ever change?

## Line jobs

| Beat | Job |
| --- | --- |
| 1–2 | answer — §2's question, settled |
| 3–6 | **turn** — the event, and the scale |
| 7 | answer — the necessary caveat, and it is interesting rather than dutiful |
| 8 | setup — the viewer's conclusion, stated so it can be broken |
| 9–10 | **turn** — the contradiction |
| 11 | **hook** — exit |

## Truth notes

- Beat 7 is not optional. Without it a viewer builds "one number per meaning",
  which is wrong and would have to be walked back later.
- The row at this point *is* fixed per word — that is precisely why §4 exists.
  Do not hedge it here; the paradox only works if beat 10 is stated flatly.
- **Tokenization is an expandable aside, not beats.** A click-to-open footnote
  off beat 3 covering words splitting into pieces and ids. See
  `skills/ncase/NCASE_POP_UP_TEXTBOOKS.md`. The spine stays tight; the curious
  viewer is served.

## Assets

| Need | Status |
| --- | --- |
| `NumberRow` — a row of values that can extend past the frame, and animate value changes | **build** |
| word card tearing into the row | **build** — a state of `NumberRow` |
| expandable footnote component | **build** — reusable across all sections |
