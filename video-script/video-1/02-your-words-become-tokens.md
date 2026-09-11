# Section 02 — Your words become tokens

Spine: `storyboard/video-1/STORY_SPINE.md` (v4) · Numbers: `research/glm/GROUND_TRUTH.md`

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

Rebuilt for spatial continuity. The old version had a floating line — *"the
model doesn't read that, not as letters"* — with nothing happening on it and no
answer to *where am I*. Now the prompt physically goes in, the camera follows
it, and the splitting happens in front of us. See `skills/SPATIAL_CONTINUITY.md`.

> **1.** *(the desk from §1, still unlabelled)* So — eight out of two hundred and
> eighty-eight, and something in there does the picking. To find out how it
> picks, we have to follow something in. Let’s send it a sentence.
>
> **2.** *(a prompt card slides in and stops at the entrance)* This is what you
> typed.
>
> **3.** *(it moves through the doorway; the camera goes with it)* In it goes.
>
> **4.** *(inside — the card has come to rest on the first surface)* And this is
> the first thing that happens to it.
>
> **5.** *(the sentence breaks into uneven pieces, in place)* It gets cut up.
> Into pieces about the size of a word — sometimes a whole word, sometimes half
> of one.
>
> **6.** *(the pieces settle in a row)* These are called **tokens**. That's all
> a token is. A chunk of text.
>
> **7.** *(the word `understanding` drops in and splits into three)* Longer
> words come apart into more of them. "Understanding" is three.
>
> **8.** *(a tall list rises up beside the row)* And every token the model knows
> about lives in one big list.
>
> **9.** *(the list scrolls, then stops)* This one has a hundred and fifty-four
> thousand, eight hundred and eighty entries in it.
>
> **10.** *(our piece flies to the list, lands on a row, and comes back carrying
> the row's number)* So each piece gets swapped for where it sits in that list.
> A row number. Let's say this one's number four thousand and twenty-one.
>
> **11.** *(the word fades off the card, leaving only `4021`)* That number is
> called a **token ID**. And it's the only thing that carries on.
>
> **12.** *(the number sits alone; the list slides away)* And that’s your sentence
> turned into numbers — that part’s done. But think about what that number
> actually is. It’s a row number. Four thousand and twenty-one doesn’t mean
> dog — it means the four thousand and twenty-first thing on our list. There’s
> no meaning in it at all.

---

## Storyboard

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | inside, one part | — | the desk holds; the 288 dim behind it | `FrontDesk` (unnamed), `Hospital` dim | — | S-14 |
| 2 | at the entrance | **pan** | a prompt card slides in from the left and stops | `Sentence` card, the doorway | **`The dog dropped the ball, and it`** | S-04 |
| 3 | the first surface | **follow** | the card passes through the doorway, camera travels with it | card moving, doorway passing | the same card | S-04 |
| 4 | the first surface | — | the card lands and settles | `Sentence` at rest | the same card | S-04 |
| 5 | the first surface | — | the sentence fractures into uneven pieces **in place** | `Sentence` → `split` state | `The` `dog` `dropp` `ed` `the` `ball` `,` `and` `it` | S-04 |
| 6 | the first surface | — | the pieces slide into an even row | `Sentence` `split`, spaced | 9 tokens | S-04 |
| 7 | the first surface | — | `understanding` drops in above, breaks into 3, leaves | one extra `WordCard` → 3 | `under` `stand` `ing` | S-04 |
| 8 | the first surface | — | a tall list rises from below beside the row | `Vocabulary` entering | the list | S-04 |
| 9 | the first surface | — | the list scrolls fast, decelerates, stops on a real entry | `Vocabulary` scrolling | `154,880` entries | S-04 |
| 10 | the first surface | — | the `dog` piece flies to the list, touches a row, returns with a number | `WordCard` dog → `Vocabulary` → back | **`dog` → `4021`** | S-04 |
| 11 | the first surface | — | the letters fade off the card; the digits stay | `WordCard` `becomes` state | `4021` | S-04 |
| 12 | the first surface | — | the list withdraws; the number is left alone in frame | `4021` only | `4021` | S-14 |

### Board notes

- **This section fixes the exact fault Ahmad found.** Beats 2–4 are three
  physical events — arrives, goes in, lands — where the old script had one
  floating assertion. The camera earns the change of place at beat 3, so the
  viewer can point at beat 2 and say *"we went in there."*
- **Two camera moves, both at the front.** Nothing moves from beat 4 onward:
  the section is one continuous place and every event happens in it.
- **The split happens in place** (beat 5). The card must not be replaced by a
  new row of cards — it is the same object coming apart, which is what makes
  tokens feel like *pieces of your sentence* rather than a new set of objects.
- **The uneven split is load-bearing.** `dropp` + `ed` on screen is what stops
  the viewer learning "token = word". If the split is even, §4's example breaks.
- Beat 10 is a **round trip** — go, touch, come back changed. That is what makes
  a lookup feel like a lookup instead of a substitution.
- Beat 12 leaves the number **alone in an empty frame**. The absence is the
  argument, and it is the setup for §3.

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **answer** — §1's question gets its subject, and a reason to move |
| 2–4 | setup — three physical beats: arrives, enters, lands |
| 5–6 | **teach** — tokens, on an event |
| 7 | **teach** — the example that stops "token = word" |
| 8–10 | **teach** — the list, and the round trip to it |
| 11 | **teach** — the ID, and the letters leaving |
| 12 | **but** — the ID is meaningless. The hinge into §3 |

## Truth notes

- 154,880 is this model's vocabulary size, from `config.json`. `GROUND_TRUTH.md`.
- **Token ID 4021 for "dog" is invented**, so beat 10 is hedged — it says
  *"let's say"*. That is the fix as built. If the real ID is ever measured from
  the tokenizer, drop the hedge and use the measured number; until then the
  hedge is not optional, because an unmeasured ID presented as fact is the one
  kind of error an expert viewer will find instantly.
- Byte-pair encoding, how the vocabulary was built, and why " dog" and "dog"
  are different tokens go in an **expandable aside**, not in beats.
- Beat 11 must land as a genuine problem, not a technicality. The viewer should
  finish this section thinking *"so how does it know what anything means?"* —
  which is exactly §3.

## Frames

- Beat 2 uses the running prompt: **`The dog dropped the ball, and it`** — the
  same sentence every section that needs text will use.
- Beat 5: the split must be **visibly uneven**, or the viewer learns token = word.
- Beat 9: the list scrolls fast enough to feel long and stops on a real entry.
- Beat 12: the number sits alone in the frame with the word gone. The absence
  is the point, so nothing else may be on screen.

## Assets

| Need | Status |
| --- | --- |
| `Sentence` with a split state, uneven pieces | **extend** |
| a long scrolling list of tokens with row numbers | **build** — `Vocabulary` |
| `WordCard` → number transition | **extend** — a `becomes` state |
