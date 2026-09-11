# Section 06 — The experts do the work

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
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 06`

## Contract

| | |
| --- | --- |
| Enters on | eight experts are picked. What do they actually do? |
| Teaches | expert output, weighted blending |
| Answers | each takes the row and returns a different one; the eight get blended into a single row |
| Exits on | how many steps are there? |
| → next | **therefore** the token leaves changed — and that was one step |
| Target | ~11 beats · ~1:05 |

## What changed from v8

**1. The blend was told, not questioned — and it is the misconception.** A
viewer who knows anything about routing expects a *winner*: the top expert runs
and the rest lose. That is what top-1 routing would do, and it is not what
happens here. v8 simply asserted the blend. Beat 4 now asks *"which one wins?"*
and beat 5 answers *"none of them"*, which is the one genuinely counterintuitive
turn in this section. S-06, soft — the hard-bet budget is spent on §1 and §7.

**2. Two beats said the same thing.** v8's beat 10 — *"and that is one step.
Done. Finished."* — and beat 11 — *"and that's one full step, done"* — were the
same sentence twice. The wall is now one beat, and naming the step is another.

**3. The shared expert was five words.** *"Plus the one that always runs."* §5
now gives it a beat and a place outside the wall, so §6 can show it arriving
into the blend from that same outside position rather than mentioning it.

**4. Beat 9 was a mouthful, not a frame.** *"having had eight blocks of the
model applied to it"* is not something anyone says. It is now a before-and-after
pair on screen and a short line over it.

## The script

### Act 1 — banking the eight (beat 1) · **S-14**

> **1.** *(the eight lift forward out of the wall; the 280 recede)* Right —
> eight picked, out of two hundred and eighty-eight. What do they actually do
> with it?

### Act 2 — eight copies, eight answers (beats 2–3) · **S-04**

> **2.** *(the row copies eight times, one into each)* The row goes into all
> eight of them. The same row, eight times.
>
> **3.** *(eight visibly different rows emerge on the far side)* And eight
> different rows come out. Same numbers going in. Eight different answers coming
> out.

### Act 3 — the question (beat 4) · **S-06**

> **4.** *(the eight outputs hold, side by side, nothing moving)* So — eight
> answers. Which one wins?

### Act 4 — none of them (beats 5–9) · **S-04**

> **5.** *(all eight stay put)* None of them. They all count.
>
> **6.** *(each output takes on the size of its expert's score)* But not
> equally. The router already scored them, so the ones that scored higher count
> for more.
>
> **7.** *(the eight converge and merge, the larger ones dominating)* They get
> blended together, in proportion to those scores.
>
> **8.** *(the shared expert's output joins the merge from outside the wall)*
> And the one that's always on gets blended in too.
>
> **9.** *(one row settles, the same length as the one that went in)* Out comes
> a single row. Same length as the one that went in. Completely different
> numbers.

### Act 5 — what just happened (beats 10–11) · **S-04**

> **10.** *(the row that arrived ghosts in beside it)* That's the token, thought
> about. Once.
>
> **11.** *(the ghost fades; everything else clears)* It arrived as the word in
> this sentence. It leaves changed by eight blocks of the model — and it's the
> same shape it was, so whatever comes next can't tell the difference.

### Act 6 — the step, named and done (beats 12–13) · **S-12**, **S-14**

> **12.** *(the room's walls, floor and ceiling draw themselves in around the
> row)* Look around. Choose. Work. That's one full step of this machine, and
> it's done.
>
> **13.** *(the room shrinks in frame; something suggests more of them above and
> below)* Which raises the obvious question. How many steps are there?

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the room | — | the eight lift forward out of the wall; the 280 recede into the background | 8 `Specialist`s forward | 8 | S-14 |
| 2 | the room | — | the row copies eight times, one copy travelling into each | 8 identical rows | same input | S-04 |
| 3 | the room | — | eight visibly different rows emerge on the far side | 8 different `NumberRow`s | 8 different outputs | S-04 |
| 4 | the room | — | the eight outputs hold side by side; nothing moves | 8 rows, still | **`which one wins?`** | S-06 |
| 5 | the room | — | all eight stay; none dims, none leaves | 8 rows, all live | none of them | S-04 |
| 6 | the room | — | each output takes on the size of its expert's score | 8 rows, weighted | bigger = higher score | S-04 |
| 7 | the room | — | the eight converge and merge into a single row, larger ones dominating | 8 → 1 `NumberRow` | the blend | S-04 |
| 8 | the room | — | the shared expert's output joins the merge **from outside the wall**, where §5 put it | +1 joining, from off-grid | always on | S-04 |
| 9 | the room | — | one row settles, the same length as the one that went in | one `NumberRow` | one row out | S-04 |
| 10 | the room | — | the row that arrived ghosts in beside it for comparison | before + after | same length, new values | S-04 |
| 11 | the room | — | the ghost fades; everything else clears; the row is alone | one row, empty room | — | S-04 |
| 12 | the room | — | the room's walls, floor and ceiling draw themselves in around the row | the room, bounded | one step, done | S-12 |
| 13 | the room | — | the room shrinks in frame; edges above and below hint at more of them | the room, small | how many? | S-14 |

### Board notes

- **No camera moves at all.** §5 brought us into the room and §7 leaves it.
  This section is thirteen beats in one place, and that stillness is what makes
  the room drawing itself at beat 12 mean *this was one box all along*.
- **Beat 4 is the only still frame**, and the eight outputs must be visibly
  *different sizes already withheld* — no weighting yet, no leader. If one is
  bigger at beat 4 the viewer reads the answer off the picture and the question
  is decoration.
- **Beat 5 has to be a non-event, and that is hard.** Nothing dims, nothing
  leaves, nothing wins. The temptation is to animate something; resist it. The
  frame's job is that the expected elimination *does not happen*.
- **Beat 8's shared expert enters from outside the grid**, which only reads if
  §5 beat 12 put it there. If it arrives from among the 288 the two sections
  contradict each other, and §5's *"the other two hundred and eighty"* becomes
  wrong by one.
- **Beat 10's ghost must be the same width as the survivor.** The whole point of
  beat 11 is that the shape is unchanged — that is why a stack of these can be
  stacked at all, which is §7's entire premise.
- Beat 13 hints at more rooms **without showing a number**. §7 opens on
  forty-five and it should land as an answer, not as a confirmation.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank** — eight are picked; what do they do? |
| 2–3 | **teach** — same row in, eight different rows out |
| 4 | **ask** — which one wins? (the top-1 misconception) |
| 5 | **correct** — none. They all count |
| 6–8 | **teach** — weighted by score, blended, plus the always-on one |
| 9 | **teach** — one row out, same shape |
| 10–11 | **teach** — before and after, and why the shape matters |
| 12 | **name** — that was one full step |
| 13 | **the wall** — how many steps are there? |

## Truth notes

- The blend is a weighted sum using the routing weights, usually renormalised
  over the chosen eight. "In proportion to their scores" is honest and enough.
- The shared expert's output is added alongside. It is one clause, beat 6.
- Residual connections and normalisation are **deliberately not** in this
  section. They change nothing the viewer needs and they cost two beats. If a
  viewer asks, that is an aside.
- No `layer` yet. Beat 10 says "one step". The word arrives in §7.

## Frames

- Beat 5 is the frame worth building well: eight rows converging into one, with
  visible weight — thicker or more opaque for higher-scoring experts.
- Beat 7's output row must be **visibly different** from beat 2's input row, or
  the whole section reads as decoration.

## Assets

| Need | Status |
| --- | --- |
| row → eight rows → weighted merge | **build** — `ExpertBlend` |
| `NumberRow` before/after states | have |
