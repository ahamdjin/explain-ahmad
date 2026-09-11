# Section 12 — How people actually run these

Status: **SCRIPT v10.** Written to spine v5. Corrected against a technical
review, 2026-09-11 — see "What changed" below. Every beat cites a strategy from
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
Strategies: `skills/STRATEGY_LEDGER.md` · Runtime: `npm run restamp 12`

**The honesty section.** Without it the video is contradicted by a
`llama.cpp` flag, and the audience most likely to comment is the audience that
already knows it.

## Contract

| | |
| --- | --- |
| Enters on | so you can't store only the active part. But people run big models on small machines. |
| Teaches | caching, and the memory-for-speed trade |
| Answers | experts repeat, so you keep the frequent ones close — and it genuinely works |
| Exits on | it's a price, not a wall. So what did "five percent active" actually get us? |
| → next | **but** with 12,096 expert slots, nothing about "five percent active" tells you where the good setting is |
| Built | 16 beats · 2:47 · `npm run timing` is the authority |

## What changed from v8

**1. The reversal had nothing to reverse, and now it does.** S-09 requires
taking back a belief *this video taught* — not a misconception the viewer
brought. §11 beats 14–15 now plant it deliberately and endorse it (*"you're
right"*), beat 7 here confirms it (*"it works. Genuinely."*), and beats 12–14
take it away. The chain across two sections is the strategy; neither half works
alone.

**2. Fourteen beats and nothing asked, right before the turn.** Beat 9 now
holds the slider and asks the viewer to put it somewhere before it moves. That
is the strongest place in the whole video for a question, because the honest
answer is **there isn't a good setting** — so the viewer commits to one existing
and then watches both ends fail. A guess that turns out to be unanswerable is
worth more here than a correct one. S-06, soft.

**3. Beat 1 ignored what §11 left on screen.** §11 now ends on a cache shelf,
drawn and empty. This section has to pick that object up rather than clear the
frame and introduce a new one.

**4. Beat 14 asserted a measurement we do not have.** *"There's no setting on
that slider where it's both… on a model chopped this fine, the exchange rate is
brutal."* `research/glm/OFFLOADING_AND_LOCALITY.md` is explicit that **no
locality measurement has been published for 288 experts at top-8** — every
reassuring cache figure we cite comes from Mixtral-style 8-expert, top-2
models. 12,096 slots against a cache that saturates near 384 is a real
*direction*, not a measured exchange rate, and more experts also means smaller
experts.

The slider stays — it is the best thing in the section. What changed is the
conclusion: the trade is real, the good setting depends on repeat rate, that
rate is measured only for coarse models, and **the number on the box cannot
locate it**. That is a claim we can defend, and it still lands §13.

## The script

### Act 1 — banking the answer, then the exception (beat 1) · **S-14**

> **1.** *(the empty shelf §11 drew stays; a small machine slides in beside it
> and runs)* So you can't store only the active part. Except — people **do** run
> models like this on small machines. Right now. And they're not lying about it.

### Act 2 — caching, and it works (beats 2–8) · **S-04**

> **2.** *(the machine keeps running; §11's numbers hang over it, unchanged)* So
> what are they doing that we just failed to do?
>
> **3.** *(the shelf fills in solid; a label lands)* Caching. That thing you
> thought of.
>
> **4.** *(two words run through; some of the same blocks used both times)*
> Here's the thing we noticed all the way back at the start. Experts repeat. Not
> always — but often enough to matter.
>
> **5.** *(the repeating blocks stay in the box instead of returning to the
> drive)* The next token quite often wants some of the same experts the last one
> did. So you don't fetch every time.
>
> **6.** *(the next word's fetches split — most short hops, a few long)* You keep
> the ones that keep coming back close, and you only go to the drive for the
> ones you're missing.
>
> **7.** *(the machine speeds up; a small-model tag appears on the box)* And it
> works. Genuinely. On a model with eight experts on each floor, a small cache
> catches most of what you need.
>
> **8.** *(a slider rises out of the floor under the box)* Which turns the
> whole thing into one dial. **How much you keep close.**

### Act 3 — the question (beat 9) · **S-06**

> **9.** *(the slider holds, untouched, at neither end)* Before I move it —
> where do you reckon the good setting is?

### Act 4 — both ends fail (beats 10–11) · **S-04**

> **10.** *(dragging up)* Keep more, and it's fast — but now you need a big
> machine again, which is the thing we were trying to avoid.
>
> **11.** *(dragging down)* Keep less, the machine gets small — and the misses
> pile up, and it crawls.

### Act 5 — why the box number can't find the setting (beats 12–15) · **S-09**

> **12.** *(the 288 wall and the 42 floors ghost in behind the box, dwarfing
> it)* And remember what we're choosing from. Two hundred and eighty-eight
> experts, on each of forty-two floors.
>
> **13.** *(a count assembles from them and lands on the box)* Twelve thousand
> and ninety-six slots.
>
> **14.** *(the slider is dragged across its whole range; neither end shows
> both)* So it's a trade — and where the good setting sits depends on how often
> the experts repeat. On eight-expert models, people have measured that. Nobody
> has measured it for twelve thousand slots.
>
> **15.** *(a question mark settles over the middle of the slider's range)* So
> the honest answer is that nobody knows where the good setting is. And "five
> percent active" was never going to tell you.

### Act 6 — a price, not a wall (beat 16) · **S-14**

> **16.** *(the slider settles mid-range; the machine runs, slowly, and keeps
> running)* So you **can** run it on less. It'll just be slow. That was never a
> wall — it's a price.

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the plan | — | §11's empty shelf stays; a small machine slides in beside it and runs, steadily, producing words | `ExpertCache` empty + `SmallMachine` | it works | S-14 |
| 2 | the plan | — | the machine keeps running while the numbers from §11 hang over it, unchanged | machine + 8.5 GB label | both true at once | S-04 |
| 3 | the plan | — | the shelf fills in solid and takes a label | `ExpertCache`, named | "cache" | S-04 |
| 4 | the plan | — | two words run through; a couple of the same blocks are used both times | two teams, overlap lit | some repeat | S-04 |
| 5 | the plan | — | those repeating blocks stay in the box instead of returning to the drive | `ExpertCache` filling | kept close | S-04 |
| 6 | the plan | — | the next word's fetches split: most come from the box, a few from the drive | short hops + long hops | hit / miss | S-04 |
| 7 | the plan | — | the machine speeds up; a small model tag appears on the box | machine faster, tag | 8 experts per floor | S-04 |
| 8 | the plan | — | a slider rises out of the floor under the box | `TradeSlider` | one dial | S-04 |
| 9 | the plan | — | the slider holds untouched at neither end; nothing moves | `TradeSlider`, still | **`where's the good setting?`** | S-06 |
| 10 | the plan | — | the slider is dragged up: the box swells, the machine races, its frame grows huge | slider high | fast, but big | S-04 |
| 11 | the plan | — | dragged down: the box shrinks, long hops multiply, the machine crawls | slider low | small, but slow | S-04 |
| 12 | the plan | — | the 288 wall and the 42 floors ghost in behind the box, dwarfing it | `Hospital` + `Tower` ghosted | 288 × 42 | S-09 |
| 13 | the plan | — | a count assembles from them and lands on the box | `Counter` | **12,096** slots | S-09 |
| 14 | the plan | — | the slider is dragged across its whole range; neither end ever shows both | slider sweeping | measured for 8, not for 12,096 | S-09 |
| 15 | the plan | — | a question mark settles over the middle of the range, where a position would go | slider, `?` mid-range | nobody knows | S-09 |
| 16 | the plan | — | the slider settles mid-range; the machine runs, slowly, and keeps running | machine, slow, working | a price, not a wall | S-14 |

### Board notes

- **No camera moves.** §11 set the plan up and §13 pans away from it. Fifteen
  beats in one place.
- **Beat 1 must pick up §11's shelf, not draw a new one.** It is the same
  object, in the same position, and that continuity is what makes *"that thing
  you thought of"* at beat 3 land as a payoff rather than a coincidence.
- **Beat 9 is the most valuable still frame in the video.** The slider is
  untouched and at neither end, and the viewer is asked to put it somewhere.

  **The guess is not wrong — it is unanswerable, and that is the point.** This
  note used to say "there is no good setting, so the guess cannot be right",
  which is a *stronger* claim than the section is allowed to make and directly
  contradicts the line beat 14 now speaks. Nobody has measured expert locality
  for 288 experts at top-8, so the video may not assert that no good setting
  exists; what it can show is that both ends fail and that *"five percent
  active"* cannot locate the middle.

  If a future pass finds this note and the spoken line disagreeing again,
  **the spoken line is the one that matches the research** —
  `research/glm/OFFLOADING_AND_LOCALITY.md` §5. Do not "fix" beat 14 back.

  `NCASE_4_MORE_DESIGN_PATTERNS.md` warns against clicking mistaken for
  thinking; this is the opposite case, a question whose value is entirely in
  what it costs the viewer to answer.
- **Beats 10–11 must both fail visibly**, and by different failures: the frame
  grows too big at one end, the machine crawls at the other. If either end
  merely looks *worse*, the trade reads as tuning rather than as a wall.
- **Beat 12's ghosts have to dwarf the box.** 288 × 42 against a cache that
  holds a handful. The count at beat 13 is the reversal, and it only works if
  the scale was felt one beat earlier.
- **Beat 16 keeps the machine running.** Slowly, and working. The section's
  last claim is *a price, not a wall*, and a stopped machine would say the
  opposite.

---

## Line jobs

| Beat | Job |
| --- | --- |
| 1 | **bank**, then the exception that needs explaining |
| 2–3 | **answer** — caching, and it is the viewer's own idea |
| 4–6 | **teach** — experts repeat, so keep the repeaters close |
| 7 | **confirm** — it genuinely works, at eight experts a floor |
| 8 | **frame** — it all reduces to one dial, stated not asked |
| 9 | **ask** — where is the good setting? |
| 10–11 | **teach** — both ends fail, differently |
| 12–15 | **the reversal** — 12,096 slots, and the box number can't locate the setting |
| 16 | **the wall** — a price, not a wall; the machine is still running |

## Truth notes — mandatory

- **Cite the regime.** The reassuring cache figures — 44.2% consecutive-token
  sharing, LRU-128 hitting ~81% — are measured on **Mixtral 8×7B: 8 experts,
  top-2**, where chance alone is 12.5%. The authors' own summary is that
  locality *"does exist, but it is not strong"*. Beat 7 therefore says "on a
  model with eight experts on each floor" — that qualifier is load-bearing.
- **No number on this model's overlap.** Nobody has published it for 288
  experts at top-8. Beat 5 says "quite often" and shows a couple staying.
  `research/glm/OFFLOADING_AND_LOCALITY.md`.
- **Beat 14 is the video's honesty and may not be cut for time.** People run
  `gpt-oss-120b` on a 24 GB card with expert offloading today.
- The slider must be **real** — a control the viewer drags, not an animation of
  one. A trade you operate yourself is a trade you believe.

## Frames

- **The slider is the interaction of the video.** Per
  `skills/ncase/NCASE_I_DO_AND_I_UNDERSTAND.md`, clicking is not thinking: ask
  before they drag — *"where would you put it?"* — so failing to find a good
  setting is **their** discovery, not our assertion.
- Both ends must be visibly bad in a way that reads with the sound off: big
  machine, or slow machine.
- 12,096 lands as a built number, the way 336 did in §7.

## Assets

| Need | Status |
| --- | --- |
| expert cache, filling and evicting | **build** — `ExpertCache` |
| **the slider** — memory against speed | **build** — `TradeSlider`. The most important thing left to build |
| `Store` / `FastMemory` / `FetchPath` | have |
| `Counter` to 12,096 | have |
