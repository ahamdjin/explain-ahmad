# Section 04 — The word looks around

## Contract

| | |
| --- | --- |
| Enters on | that row is the same every single time. So how does the word ever mean two things? |
| Teaches | **attention**, **context** |
| Answers | every token reads the others and pulls in what matters, and its row changes |
| → next | **therefore** the same word carries different numbers in different sentences |
| Banks | **the numbers depend on the whole sentence** |
| Target | ~13 beats · ~1:30 |
| Still forbidden | `layer` as a count |

## The script

> **1.** So the row is fixed — every "dog" starts out identical. Which can’t be
> right, and it isn’t, for long.
>
> **2.** Because a token never stays on its own. It's sitting in a sentence.
>
> **3.** *(the full sentence, all rows visible)* And before anything else
> happens, every token gets to look at the others.
>
> **4.** Here’s what looking means. Our token asks every other token one question:
> how much do you matter to me?
>
> **5.** *(the lines thicken and thin)* Some matter a lot. Most barely matter at
> all.
>
> **6.** And it can only look backwards — at the words already there. Not at
> what's coming.
>
> **7.** Then it takes a bit of each one, in proportion, and mixes it into
> itself.
>
> **8.** *(the row visibly shifts)* And its row changes. Same token. New
> numbers.
>
> **9.** That's **attention**. That's the whole idea — every token adjusting
> itself based on the company it's in.
>
> **10.** Now watch why that matters. "The dog barked." And "a hot dog."
>
> **11.** *(both rows, clearly different)* Same word both times. Started as the
> exact same row. Ended up nothing like each other.
>
> **12.** So the numbers don't belong to the word any more. They belong to
> **the word in this sentence**.
>
> **13.** And that’s attention. That’s all attention is. The row has changed — and it
> changed because of this sentence. None of it could have been worked out
> ahead of time.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the table | — | the three identical rows collapse back into one | `NumberRow` | the `dog` row | S-14 |
| 2 | the first surface | **pull back** | we back off and the other tokens' rows are all there, in a line | `Sentence` + one row each | 9 tokens, 9 rows | S-06 |
| 3 | the first surface | — | our row lifts slightly out of the line | `Sentence`, `dog` raised | `dog` | S-04 |
| 4 | the first surface | — | lines shoot from our row to every other row | `AttentionLines`, uniform | 8 lines | S-04 |
| 5 | the first surface | — | the lines thicken and thin — `ball` and `dropped` heavy, `the` almost nothing | `AttentionLines` weighted | weight by thickness | S-04 |
| 6 | the first surface | — | the lines running *forward* to later tokens fade out and go | forward lines leaving | only backward lines remain | S-04 |
| 7 | the first surface | — | material travels along the surviving lines into our row | flow along lines | the pull | S-04 |
| 8 | the first surface | — | our row's values visibly change where the flow landed | `NumberRow` value change | before → after | S-04 |
| 9 | the first surface | — | the lines withdraw; a label lands | `Note` | "attention" | S-04 |
| 10 | the first surface | — | the sentence slides left; a second sentence assembles beside it | two `Sentence`s | `the dog barked` / `a hot dog` | S-04 |
| 11 | the first surface | — | both `dog` rows lift out and align — clearly different | two `NumberRow`s | two different rows | S-04 |
| 12 | the first surface | — | the row they *started* from ghosts in behind both, identical | ghost row + two live | same start, two ends | S-04 |
| 13 | the first surface | — | the ghost fades; the two rows hold apart | two rows | the divergence | S-12 |

### Board notes

- **One camera move**, at beat 2, and it does real work: it reveals that our
  row was never alone. The whole section is that reveal.
- Beat 6 is causal masking without the words. The forward lines **leave** —
  they are not crossed out. Nothing in this video is crossed out.
- **Beats 11–12 are the carrying frames.** Two different rows, with the
  identical starting row ghosted behind them, on one frame. That single image
  is the answer to §3's paradox.
- Beat 5's weights are illustrative. Thickness only — no numbers on the lines,
  or the frame claims a precision we do not have.
- The two sentences are the video's one comparison example. They arrive here and
  are reused by §5 beat 12.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **answer** — §3's problem, taken seriously in one line |
| 2–3 | setup |
| 4–8 | **teach** — attention, in five plain beats |
| 9 | **teach** — the name, after the thing |
| 10–11 | **turn** — the example. Nobody can misread it |
| 12 | **therefore** — the sentence a viewer keeps |
| 13 | **banked** — the first real deposit toward the ending |

## Truth notes

- Q/K/V is a teaching lens; this model uses **hybrid KDA + sparse MLA**. Do not
  present the lens as the architecture. `GROUND_TRUTH.md`.
- Beat 6 is causal masking without naming it, and it is one clause. Keep it.
- Beat 4's "how much do you matter to me" is a fair plain-English reading of
  attention scores. Do not put numbers on the lines unless measured.
- **"the dog barked" / "a hot dog"** is the load-bearing example of the whole
  video. It is chosen because the viewer already knows the answer, so the
  section teaches *where the machine does it*, not *that language is contextual*.

## Frames

- Beats 10–11 are the **carrying frames**. Two sentences, two rows, visibly
  different, one frame. This is the frozen-frame test for the section.
- Attention lines are `relate` (purple); rows are `measure` (blue); the tracked
  word is `word` (teal). `art-direction/PALETTE.md`.
- Line thickness = weight. No legend, no numbers.

## Assets

| Need | Status |
| --- | --- |
| weighted attention lines | **build** — `AttentionLines`, thickness = weight |
| `Sentence` with per-token rows | **extend** |
| `NumberRow` value-change state | have |
