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

> **1.** So every "dog" starts out identical. Which can't be right — and it
> isn't, for long.
>
> **2.** Because a token never stays on its own. It's sitting in a sentence.
>
> **3.** *(the full sentence, all rows visible)* And before anything else
> happens, every token gets to look at the others.
>
> **4.** Here's what looking means. *(lines from our token to the rest)* Our
> token asks every other token one question: **how much do you matter to me?**
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
> **10.** Now watch why that matters. *(two sentences, side by side)* "The dog
> barked." And "a hot dog."
>
> **11.** *(both rows, clearly different)* Same word both times. Started as the
> exact same row. Ended up nothing like each other.
>
> **12.** So the numbers don't belong to the word any more. They belong to
> **the word in this sentence**.
>
> **13.** And notice — none of that could have been worked out ahead of time. It
> depends entirely on what you typed.

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
