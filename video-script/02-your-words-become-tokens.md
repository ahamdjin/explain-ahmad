# Section 02 — Your words become tokens

Spine: `storyboard/STORY_SPINE.md` (v4) · Numbers: `research/glm/GROUND_TRUTH.md`

## Contract

| | |
| --- | --- |
| Enters on | who picks the eight, and why can't they tell us in advance? |
| Teaches | **token**, **token ID**, vocabulary |
| Answers | your text is cut into pieces, and every possible piece has a number |
| → next | **but** a number like that is a name, not a meaning |
| Target | ~11 beats · ~1:10 |
| Still forbidden | `embedding`, `attention`, `layer` |

## The script

> **1.** So: who picks the eight. There's one thing in there that does it, and
> we'll get to it — but first you have to see what it's actually looking at.
>
> **2.** *(the prompt, on screen)* Here's what you typed.
>
> **3.** The model doesn't read that. Not as letters.
>
> **4.** *(the sentence splits into uneven pieces)* First it gets chopped up.
> Into pieces about the size of a word — sometimes a whole word, sometimes half
> of one.
>
> **5.** These are called **tokens**. That's all a token is. A chunk of text.
>
> **6.** *(the word "understanding" splits into three)* Longer words break into
> more pieces. "Understanding" is three of them.
>
> **7.** And every token the model knows about lives in one big list.
>
> **8.** *(the list scrolls)* This model's list has a hundred and fifty-four
> thousand, eight hundred and eighty entries in it.
>
> **9.** So each token gets swapped for its position in that list. A row number.
> *(dog → 4021)* "Dog" is number four thousand and twenty-one.
>
> **10.** That number is called a **token ID**. And it's the only thing that
> goes in.
>
> **11.** **But** think about what that number actually is. It's a row number.
> Four thousand and twenty-one doesn't mean *dog* — it just means *the four
> thousand and twenty-first thing on our list.* There's no meaning in it at all.

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **answer** — §1's question gets acknowledged and deferred *with a reason*, in one line |
| 2–5 | **teach** — tokens |
| 6 | **teach** — the example that stops "token = word" |
| 7–10 | **teach** — the list, and the ID |
| 11 | **but** — the ID is meaningless. That is the hinge into §3 |

## Truth notes

- 154,880 is this model's vocabulary size, from `config.json`. `GROUND_TRUTH.md`.
- **Token ID 4021 for "dog" is invented.** Either measure it from the real
  tokenizer before recording, or say *"let's say it's number four thousand and
  twenty-one"*. Do not present an unmeasured ID as fact.
- Byte-pair encoding, how the vocabulary was built, and why " dog" and "dog"
  are different tokens go in an **expandable aside**, not in beats.
- Beat 11 must land as a genuine problem, not a technicality. The viewer should
  finish this section thinking *"so how does it know what anything means?"* —
  which is exactly §3.

## Frames

- Beat 2 uses a real sentence: **`The dog dropped the ball, and it`**
- Beat 4: the split must be **visibly uneven**, or the viewer learns token = word.
- Beat 8: the list scrolls fast enough to feel long and stops on a real entry.
- Beat 11: the number sits alone on the frame, with the word gone. The absence
  is the point.

## Assets

| Need | Status |
| --- | --- |
| `Sentence` with a split state, uneven pieces | **extend** |
| a long scrolling list of tokens with row numbers | **build** — `Vocabulary` |
| `WordCard` → number transition | **extend** — a `becomes` state |
