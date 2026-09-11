# Section 02 — Your words become tokens

Status: **SCRIPT v9.** Written to spine v5. Every beat cites a strategy from
`skills/STRATEGY_LEDGER.md`, and no beat uses a technique that is not in it.

v8's *interiors were already right* — beats 2–11 are physical events in one
place with the camera earning its only move, and that survives untouched. What
v8 did not have was a chapter wall at either end, a named teacher for anything
it was doing, or a single question asked of the viewer in seventy seconds.

Spine: `storyboard/video-1/STORY_SPINE.md` v5 · Numbers: `research/glm/GROUND_TRUTH.md`
Strategies: `skills/STRATEGY_LEDGER.md`

## Contract

| | |
| --- | --- |
| Enters on | who picks the eight, and why is *that* the expensive question? |
| Teaches | **token**, **token ID**, vocabulary |
| Answers | your text is cut into pieces, and every possible piece has a number |
| Exits on | a row number is a **name**. So how does a name become a meaning? |
| → next | **but** a number like that is a name, not a meaning |
| Target | 12 beats · ~1:55 |
| Still forbidden | `embedding`, `attention`, `layer`, `router` |
| Hard-bet budget | **uses 0 of 2.** Both are spent — §01 and §07. Beat 8 is a *soft* question (S-06), which is not rationed |

## What changed from v8

**1. It opens by banking, not by carrying the question forward.** v8 opened
*"So — who picks the eight. That thing does."* — which repeats §01's question
and gives the viewer nothing to keep. **S-14**: bank the previous answer as
settled *in one clause*, then add the but. §01 settled *eight out of 288*; this
section opens by owning that number and then admitting we have no idea how the
picking works, which is the reason to move.

**2. It closes by naming the mechanism finished.** v8 closed on the ID being
meaningless, which is the right *but* and was missing the *therefore*. The
viewer needs to be told a part of the machine is now behind them.

**3. One question, asked out loud.** Seventy seconds of telling, with nothing
asked. **S-06** — Szpunar, Khan & Schacter (2013), measured on video lectures:
interpolated questions cut mind-wandering from ~40% to 19%. Beat 8 now asks how
long the list is before beat 9 answers. It is deliberately *soft* — no commit,
no branch — because the hard-bet budget (**S-05**) is two for the whole video
and both are spent.

**4. The process gets its name at the close, not the open.** **S-12** (tier C —
my inference, and the ledger says so).

## The script

The spatial work from v8 is unchanged and is why this section exists in this
shape. The old version had a floating line — *"the model doesn’t read that, not
as letters"* — with nothing happening on it and no answer to *where am I*. Now
the prompt physically goes in, the camera follows it, and the splitting happens
in front of us. See `skills/SPATIAL_CONTINUITY.md`.

### Act 1 — banking the eight, and a reason to move (beat 1) · **S-14**

> **1.** *(the desk from §1, still unlabelled)* So — eight out of two hundred and
> eighty-eight, and something in there does the picking. To find out how it
> picks, we have to follow something in. Let’s send it a sentence.
>
### Act 2 — the sentence goes in (beats 2–4) · **S-04**

> **2.** *(a prompt card slides in and stops at the entrance)* This is what you
> typed.
>
> **3.** *(it moves through the doorway; the camera goes with it)* In it goes.
>
> **4.** *(inside — the card has come to rest on the first surface)* And this is
> the first thing that happens to it.
>
### Act 3 — it gets cut up (beats 5–7) · **S-04**

> **5.** *(the sentence breaks into uneven pieces, in place)* It gets cut up.
> Into pieces about the size of a word — sometimes a whole word, sometimes half
> of one.
>
> **6.** *(the pieces settle in a row)* These are called **tokens**. That’s all
> a token is. A chunk of text.
>
> **7.** *(the word `understanding` drops in and splits into three)* Longer
> words come apart into more of them. "Understanding" is three.
>
### Act 4 — the list, and the number that comes back (beats 8–11) · **S-06**, **S-04**

> **8.** *(a tall list rises up beside the row, and keeps rising)* And every
> token it knows about lives in one big list. How long do you reckon that list
> is?
>
> **9.** *(the list scrolls hard, decelerates, stops on a real entry)* A hundred
> and fifty-four thousand, eight hundred and eighty.
>
> **10.** *(our piece flies to the list, lands on a row, and comes back carrying
> the row’s number)* So each piece gets swapped for where it sits in that list.
> A row number. Let’s say this one’s number four thousand and twenty-one.
>
> **11.** *(the word fades off the card, leaving only `4021`)* That number is
> called a **token ID**. And it’s the only thing that carries on.
>
### Act 5 — the wall (beat 12) · **S-12**, **S-14**

> **12.** *(the number sits alone; the list slides away)* And that’s the cutting
> up done — your sentence is numbers now, and that’s all a tokeniser is. But
> think about what that number actually is. It’s a row number. Four thousand and
> twenty-one doesn’t mean dog — it means the four thousand and twenty-first
> thing on our list. There’s no meaning in it at all.

Beat 12 is the chapter wall. It names the part of the machine that is now
behind us — *that’s all a tokeniser is* — states what the viewer owns, and ends
on the one thing now missing. §03 opens by banking exactly that.

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
| 8 | the first surface | — | the list rises and keeps rising past the top of frame; then everything stops and the question holds | `Vocabulary` entering, no end in sight | **`how long?`** | S-06 |
| 9 | the first surface | — | the list scrolls hard, decelerates, stops on a real entry | `Vocabulary` scrolling | **`154,880`** | S-06 |
| 10 | the first surface | — | the `dog` piece flies to the list, touches a row, returns with a number | `WordCard` dog → `Vocabulary` → back | **`dog` → `4021`** | S-04 |
| 11 | the first surface | — | the letters fade off the card; the digits stay | `WordCard` `becomes` state | `4021` | S-04 |
| 12 | the first surface | — | the list withdraws; the number is left alone in frame | `4021` only | `4021` | S-12 |

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
- **Beat 8 is the section’s only held moment.** The list has to keep rising
  *past the top of the frame* before it stops — the question only works if the
  answer is already felt to be "more than I want to count". This is a soft
  question, not a bet: no commitment is asked for, the beat does not wait on the
  viewer, and beat 9 answers immediately. `skills/STRATEGY_LEDGER.md` S-06 for
  why it is here at all, and S-05 for why it is not a bet.
- **Nothing moves from beat 4 onward except the objects in the argument.** The
  two camera moves are both at the front; after the card lands, the place is
  fixed for nine beats.

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank** — own §1's eight-of-288, then admit we cannot see the picking |
| 2–4 | setup — three physical beats: arrives, enters, lands |
| 5–6 | **teach** — tokens, on an event |
| 7 | **teach** — the example that stops "token = word" |
| 8 | **ask** — the one question in the section, soft, answered on the next beat |
| 9–10 | **teach** — the size of the list, and the round trip to it |
| 11 | **teach** — the ID, and the letters leaving |
| 12 | **the wall** — name the tokeniser as finished, then the *but*: the ID is meaningless. The hinge into §3 |

## Truth notes

- 154,880 is this model’s vocabulary size, from `config.json`. `GROUND_TRUTH.md`.
- **Token ID 4021 for "dog" is invented**, so beat 10 is hedged — it says
  *"let’s say"*. That is the fix as built. If the real ID is ever measured from
  the tokenizer, drop the hedge and use the measured number; until then the
  hedge is not optional, because an unmeasured ID presented as fact is the one
  kind of error an expert viewer will find instantly.
- Byte-pair encoding, how the vocabulary was built, and why " dog" and "dog"
  are different tokens go in an **expandable aside**, not in beats.
- Beat 11 must land as a genuine problem, not a technicality. The viewer should
  finish this section thinking *"so how does it know what anything means?"* —
  which is exactly §3.
- **154,880 is the only hard number in the section**, and it is real, from
  `config.json`. Beat 8 asks the viewer to estimate it, so beat 9 must not
  round it — the precision is what makes the guess feel answered.
- **"Tokeniser" is said once, at beat 12, and never again.** It is named after
  the viewer has watched it work, not before. That ordering is **S-12**, which
  is **tier C — my inference from Trust withholding its own title word.** No
  source says this works at section scale; if it reads as pedantic in the take,
  it is the first thing to cut.

## Frames

- Beat 2 uses the running prompt: **`The dog dropped the ball, and it`** — the
  same sentence every section that needs text will use.
- Beat 5: the split must be **visibly uneven**, or the viewer learns token = word.
- Beat 8: the list must run **off the top of the frame** before it stops. If the
  whole list is visible, the question is rhetorical and the viewer does not
  bother estimating.
- Beat 9: the list scrolls fast enough to feel long and stops on a real entry.
- Beat 12: the number sits alone in the frame with the word gone. The absence
  is the point, so nothing else may be on screen.

## Assets

| Need | Status |
| --- | --- |
| `Sentence` with a split state, uneven pieces | **extend** |
| a long scrolling list of tokens with row numbers | **build** — `Vocabulary` |
| `WordCard` → number transition | **extend** — a `becomes` state |
