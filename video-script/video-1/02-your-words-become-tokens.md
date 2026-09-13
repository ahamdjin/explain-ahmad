# Section 02 — Your words become tokens

Status: **SCRIPT v10 — opening seam rewritten with §01.** The tokenizer lesson
from beats 5–13 is unchanged in substance; beats 1–4 now continue the prompt
from the new five-percent opening instead of jumping back to the old expert room.

Numbers: `research/glm/GROUND_TRUTH.md` · Tokenizer measurements:
`research/glm/TOKENIZER.md` · Strategies: `skills/STRATEGY_LEDGER.md`

## Contract

| | |
| --- | --- |
| Enters on | **what is the first thing the model actually receives when you hit send?** |
| Teaches | **token**, **token ID**, vocabulary |
| Answers | your text is cut into pieces, and every possible piece has a number |
| Exits on | a row number has no meaning in it. So how does it know what anything means? |
| → next | **but** a number like that is a name, not a meaning |
| Built | 13 beats · placeholder timing · `npm run timing` is the authority |
| Still forbidden | `embedding`, `attention`, `layer`, `router` |

## The script

### Act 1 — continue the send from §01 (beats 1–4)

> **1.** *(The exact prompt from §01 arrives at the model entrance.)* You hit send. This exact sentence is what goes in.
>
> **2.** *(The sentence starts travelling inward; the camera goes with it.)* And in it goes.
>
> **3.** *(We cross inside with the same prompt card.)* We follow it in.
>
> **4.** *(The prompt lands on the first surface.)* And before the model can do anything useful with it, this is the first thing that happens.

### Act 2 — it gets cut up (beats 5–7)

> **5.** *(The sentence fractures into pieces, in place.)* It gets cut up. Into pieces — and this sentence happens to break mostly along the words.
>
> **6.** *(The pieces settle into a row.)* These are called tokens. That’s all a token is. A chunk of text. And from here on, whenever I count something, I’m counting tokens.
>
> **7.** *(`unbelievable` drops in and shatters into three.)* Don’t get comfortable, though. Feed it "unbelievable" and you get this. Un. Belie. Vable. Not syllables, not prefixes — just the pieces it happens to have.

### Act 3 — the list and the number (beats 8–11)

> **8.** *(A tall list rises beside the row.)* And every token it knows about lives in one big list. How long do you reckon that list is?
>
> **9.** *(The list scrolls hard and stops.)* A hundred and fifty-four thousand, eight hundred and eighty.
>
> **10.** *(The ` dog` piece makes a round trip to its row and comes back.)* So each piece gets swapped for where it sits in that list. A row number. This one is five thousand, five hundred and sixty-two.
>
> **11.** *(The letters fade off the card; only the digits stay.)* That number is called a token ID. And it’s the only thing that carries on.

### Act 4 — the wall (beats 12–13)

> **12.** *(Everything else leaves; the number is alone.)* And that’s the cutting up done — your sentence is numbers now. That’s all a tokeniser is.
>
> **13.** *(5562 holds alone.)* But think about what that number actually is. It’s a row number. It doesn’t mean dog — it means the five thousand, five hundred and sixty-second thing on a list. There’s no meaning in it at all.

---

## Storyboard

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | at the model entrance | — | the intact prompt from §01 arrives and stops | `Sentence`, narrator | **`The dog dropped the ball, and it`** | S-14 |
| 2 | at the doorway | **push in** | the same prompt moves inward and the camera goes with it | same `Sentence` | same prompt | S-04 |
| 3 | the first surface | **follow** | the camera crosses inside with the same card; the outside world drops away behind the move | same `Sentence` travelling | same prompt | S-04 |
| 4 | the first surface | — | the prompt lands and settles | `Sentence` at rest | same prompt | S-04 |
| 5 | the first surface | — | the sentence fractures into its real measured pieces **in place** | `Sentence` split state | `The` ` dog` ` dropped` ` the` ` ball` `,` ` and` ` it` | S-04 |
| 6 | the first surface | — | the pieces settle into a readable row | split `Sentence` | **8 tokens** | S-04 |
| 7 | the first surface | — | `unbelievable` arrives and splits into three real tokenizer pieces | extra `Sentence` | **`un` `belie` `vable`** | S-04 |
| 8 | the first surface | — | a vocabulary list rises beside the row; it is too long to see at once | `Vocabulary` + tokens | `how long?` | S-06 |
| 9 | the first surface | — | the list scrolls hard, decelerates and lands | `Vocabulary` | **154,880** | S-06 |
| 10 | the first surface | — | the ` dog` token makes a round trip to its real vocabulary row and returns | `WordCard` + `Vocabulary` | **` dog` → `5562`** | S-04 |
| 11 | the first surface | — | letters fade from the same card while `5562` remains | `WordCard` becomes state | **token ID 5562** | S-04 |
| 12 | the first surface | — | the vocabulary, sentence and narrator leave; the ID moves to centre | `5562` only | `5562` | S-12 |
| 13 | the first surface | — | the ID holds; a short note makes the missing meaning explicit | `5562` + note | **a name, not a meaning** | S-14 |

## Seam rule from §01

§01 ends with the intact human sentence leaving chat and a causal path pointing
toward GLM. §02 does **not** redraw the 288-expert room, router desk, or any
other later mechanism. Its first visible object is that same sentence. This is
conceptual continuation rather than a new topic.

## Truth notes

- The exact prompt is `The dog dropped the ball, and it` with **no ellipsis**.
- GLM-5.3-Flash's measured tokenizer produces exactly eight pieces:
  `The | dog | dropped | the | ball | , | and | it`.
- ` dog` with its leading space is token ID **5562**. Bare `dog` is a different
  token and must not be substituted in the lookup frame.
- `unbelievable` measures as `un | belie | vable`; it is the honest example that
  breaks the naive `token = word` assumption.
- Vocabulary size is **154,880** from the model config.
- Beat 10 is deliberately a round trip on the same object. The card travels to
  the list, touches a row, and comes back changed; it is not replaced by a new
  number card.

## Carrying frames

- Beat 1: the intact prompt has clearly continued from §01.
- Beat 5: the human sentence has physically become eight countable pieces.
- Beat 10: ` dog` visibly travels to the list and comes back as `5562`.
- Beat 13: only `5562` remains, making the lack of meaning the problem §03 must solve.
