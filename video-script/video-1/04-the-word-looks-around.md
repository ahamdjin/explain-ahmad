# Section 04 — The word looks around

Status: **SCRIPT v9.** Written to spine v5. Every beat cites a strategy from
`skills/STRATEGY_LEDGER.md`, and no beat uses a technique that is not in it.

v8's interiors survive — they were built for spatial continuity and that work
stands. What v8 did not have was a **chapter wall** at either end, a named
teacher for anything it was doing, or an `Exits on` that had to equal the next
section's `Enters on` word for word. All three are now in place:

- **Beat 1 banks** the previous section's answer in one clause, then adds the
  *but* that makes this section necessary. It does not carry the previous
  question forward — that was the fault behind *"the whole story feels
  disconnected"*. `STORY_SPINE.md` §5.
- **The closing beat names the mechanism as finished** and says what is now
  missing, so the viewer gets to put something down before picking the next
  thing up.
- **Act headings carry strategy IDs**, derived from the storyboard's own
  strategy column rather than asserted separately.

Spine: `storyboard/video-1/STORY_SPINE.md` v5 · Numbers: `research/glm/GROUND_TRUTH.md`
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 04`

## Contract

| | |
| --- | --- |
| Enters on | that row is the same every single time. So how does the word ever mean two things? |
| Teaches | **attention**, **context** |
| Answers | every token reads the others and pulls in what matters, and its row changes |
| Exits on | so the numbers depend on the sentence. Who reads them, and what do they decide? |
| → next | **therefore** the same word carries different numbers in different sentences |
| Banks | **the numbers depend on the whole sentence** |
| Target | ~13 beats · ~1:30 |
| Still forbidden | `layer` as a count |

## What changed from v8

**1. S-06 was cited on a beat that asked nothing.** v8's beat 2 — *"a token
never stays on its own"* — is a statement, and calling it interpolated testing
was a false citation. The question moved to beat 11, where it has a genuinely
surprising answer: two rows that started *identical* end up nothing like each
other. That is worth asking about; "is a word in a sentence" is not.

**2. Attention was named twice, the first time too early.** v8 named it at beat
9 — *"That's attention. That's the whole idea"* — and again at beat 13. Beat 9
came before beats 10–12, which are the demonstration of why it matters, so the
conclusion preceded its own evidence. The name now lands once, at beat 15,
after the two `dog` rows have visibly diverged.

**3. The backward-only rule had one line and no reason.** It is load-bearing —
it is why §10's loop works the way it does — so beat 6 now says *why*: what is
coming has not been decided yet.

**4. The board said nine tokens.** Stale from before the tokenizer was
measured. It is eight. `research/glm/TOKENIZER.md`.

## The script

### Act 1 — banking the fixed row (beat 1) · **S-14**

> **1.** *(the three identical rows collapse back into one)* So the row is fixed
> — every "dog" starts out identical. Which can't be right, and it isn't, for
> long.

### Act 2 — the word is not alone (beats 2–9) · **S-04**

> **2.** *(we pull back; the other tokens' rows are all there, in a line)*
> Because a token never sits on its own. It's in a sentence — and so is
> everything else.
>
> **3.** *(our row lifts slightly out of the line)* And before anything else
> happens, every one of them gets to look at the others.
>
> **4.** *(lines shoot from our row to every other row, all the same weight)*
> Here's what looking means. Our word asks every other word one question. How
> much do you matter to me?
>
> **5.** *(the lines thicken and thin)* Some matter a lot. Most barely matter at
> all.
>
> **6.** *(the lines running forward fade out and go)* And it can only look
> backwards — at the words already there. Never at what's coming, because what's
> coming hasn't been decided yet.
>
> **7.** *(material travels along the surviving lines into our row)* Then it
> takes a bit of each one, in proportion, and mixes it into itself.
>
> **8.** *(the row's values visibly change)* And its row changes. Same token.
> New numbers.
>
> **9.** *(the same thing happening on every row at once)* And every word in the
> sentence is doing that, at the same time, to itself.

### Act 3 — the question (beats 10–11) · **S-06**

> **10.** *(the sentence slides left; a second sentence assembles beside it)*
> Now watch why that matters. "The dog barked." And "a hot dog."
>
> **11.** *(both `dog` rows lift out and align, still covered)* Same word both
> times. Both of them started from the exact same row — the one we pulled out of
> the table. How different do you reckon they end up?

### Act 4 — the divergence (beats 12–14) · **S-04**

> **12.** *(the rows uncover — clearly, obviously different)* Nothing like each
> other.
>
> **13.** *(the row they started from ghosts in behind both, identical)* That's
> what they both began as. Same row, both times.
>
> **14.** *(the ghost fades; the two rows hold apart)* So the numbers don't
> belong to the word any more. They belong to **the word in this sentence**.

### Act 5 — the name, and the wall (beats 15–16) · **S-12**, **S-14**

> **15.** *(a handwritten label lands between the two rows)* That has a name.
> It's called **attention**. And that's all attention is — every word adjusting
> itself based on the company it's in.
>
> **16.** *(the two rows hold apart; everything else recedes)* And that's
> attention, done. The row has changed — and it changed because of this
> sentence. None of it could have been worked out ahead of time.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the table | — | the three identical rows collapse back into one | `NumberRow` | the `dog` row | S-14 |
| 2 | the first surface | **pull back** | we back off and the other tokens' rows are all there, in a line | `Sentence` + one row each | 8 tokens, 8 rows | S-04 |
| 3 | the first surface | — | our row lifts slightly out of the line | `Sentence`, `dog` raised | `dog` | S-04 |
| 4 | the first surface | — | lines shoot from our row to every other row, all the same weight | `AttentionLines`, uniform | 7 lines | S-04 |
| 5 | the first surface | — | the lines thicken and thin — `ball` and `dropped` heavy, `the` almost nothing | `AttentionLines` weighted | weight by thickness | S-04 |
| 6 | the first surface | — | the lines running *forward* to later tokens fade out and go | forward lines leaving | only backward lines remain | S-04 |
| 7 | the first surface | — | material travels along the surviving lines into our row | flow along lines | the pull | S-04 |
| 8 | the first surface | — | our row's values visibly change where the flow landed | `NumberRow` value change | before → after | S-04 |
| 9 | the first surface | — | every other row does the same thing at once, briefly, then settles | all rows flickering | all of them, together | S-04 |
| 10 | the first surface | — | the sentence slides left; a second sentence assembles beside it | two `Sentence`s | `the dog barked` / `a hot dog` | S-04 |
| 11 | the first surface | — | both `dog` rows lift out and align — still covered; nothing moves | two covered rows | **`how different?`** | S-06 |
| 12 | the first surface | — | the covers come off; the two rows are obviously unalike | two `NumberRow`s | two different rows | S-04 |
| 13 | the first surface | — | the row they *started* from ghosts in behind both, identical | ghost row + two live | same start, two ends | S-04 |
| 14 | the first surface | — | the ghost fades; the two rows hold apart | two rows | the divergence | S-04 |
| 15 | the first surface | — | a handwritten label lands between them | `Note` | **"attention"** | S-12 |
| 16 | the first surface | — | everything but the two rows recedes | two rows, alone | the divergence, held | S-14 |

### Board notes

- **One camera move**, at beat 2, and it earns its place change: §3 ended on a
  single row at the table, and this section needs the whole line of them.
  Beats 3–16 are still.
- **Beat 11 is the only covered frame in the video.** The two rows have to be
  *present and unreadable* for the question to be a question. If the values are
  visible, the viewer reads the answer instead of guessing it, and S-06 buys
  nothing. `NCASE_4_MORE_DESIGN_PATTERNS.md` §2: the guess and the answer must
  occupy the same space — so the covers come off in place at beat 12, and the
  rows do not move between the two beats.
- **Beat 6 removes the forward lines as an event**, not as an absence. A viewer
  cannot notice a line that was never drawn, so beat 4 draws all of them and
  beat 6 takes half away. The reason is spoken, because it is the constraint
  §10's loop depends on.
- **Beat 9 is cheap and load-bearing.** One flicker across every row, showing
  that all of them do this at once. Without it, §8's correction — *there isn't
  one token* — arrives as news rather than as something already glimpsed.
- **The label lands at beat 15, once.** v8 named attention at beat 9 and again
  at 13, and the first naming preceded the demonstration that earns it.
- Beat 13's ghost row must be **visibly the same object** as §3's — same
  drawing, same width — or *"same start"* is an assertion rather than a
  recognition.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank** — the row is identical every time, which cannot be right |
| 2–3 | setup — the word is in a sentence, and so is everything else |
| 4–5 | **teach** — looking means asking how much each other word matters |
| 6 | **teach** — backwards only, and why |
| 7–8 | **teach** — the mixing, and the row changing |
| 9 | **teach** — all of them at once. The seed §8 spends |
| 10–11 | **ask** — two identical starts. How far apart do they end? |
| 12–14 | **teach** — nothing like each other, from the same beginning |
| 15 | **name** — attention, after it has been watched working |
| 16 | **the wall** — it changed because of *this* sentence |

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
