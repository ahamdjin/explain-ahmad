# Section 04 — Where the numbers change

## Contract

| | |
| --- | --- |
| Enters on | Those numbers are the same every time. So how did the team ever change? |
| Answers | Because the word never stays alone. It reads its neighbours, and its numbers change. |
| **Event** | **The same word, in two sentences, ends up with two different rows.** |
| Exits on | With different numbers, would the router pick a different eight? |
| Beats | ~11 · ~60s |
| Owns after | `attention`, `context` |
| Still forbidden | `layer` as a count, `bandwidth` |

## The local hook

The example does the work, and it should be one the viewer feels instantly:

> **"the dog barked"** and **"a hot dog"**

Same word. Obviously different meaning. Everyone knows this before we say it —
which is exactly why it lands. We are not teaching them that language is
contextual; we are showing them that the *machine* handles it, and where.

## The script

> **1.** Because a word never arrives on its own.
>
> **2.** *(a sentence assembles)* It arrives in a sentence.
>
> **3.** And before anything picks experts, the word gets to look around.
>
> **4.** It looks at every word it's allowed to see, and asks which of them
> matter to it.
>
> **5.** *(weighted lines appear)* Some matter a lot. Most barely matter at all.
>
> **6.** Then it pulls a bit of them into itself — and its row changes.
>
> **7.** *(the row visibly shifts)* Same word. New numbers.
>
> **8.** Watch it happen twice. *(two sentences, side by side)*
>
> **9.** "The dog barked." And "a hot dog."
>
> **10.** *(both rows, clearly different)* Same word, both times. Two completely
> different rows.
>
> **11.** So — would the router pick a different eight for those?

## Line jobs

| Beat | Job |
| --- | --- |
| 1–2 | answer — the resolution of §3's paradox begins |
| 3–6 | answer — the mechanism |
| 7 | **turn** — the row changes; the contradiction dissolves |
| 8–10 | **turn** — the event, on an example nobody can misread |
| 11 | **hook** — exit, and it is now almost rhetorical, which is good |

## Truth notes

- Q/K/V is a teaching lens. GLM-5.3-Flash uses hybrid KDA + sparse MLA. Do not
  present the lens as the architecture — see `research/glm/GROUND_TRUTH.md`.
- "Looks at every word it's allowed to see" is doing real work: it keeps
  causal masking honest without naming it.

## Assets

| Need | Status |
| --- | --- |
| sentence of word cards | extend `WordCard` into a `Sentence` row — **build** |
| weighted attention lines | **build** — `AttentionLines`, thickness = weight |
| `NumberRow` with a value-change state | from §3 |
