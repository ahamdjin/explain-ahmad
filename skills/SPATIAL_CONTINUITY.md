# Spatial continuity — the viewer must always know where they are

The gate that comes after the story gates and before any frame is drawn.

Structure: `skills/STORY_STRUCTURE.md` · Order: `skills/PRODUCTION_ORDER.md`
Persistence in code: `skills/CONTINUITY_SYSTEM.md`

---

## 1. The rule

> **The narrator explains what is on the screen. The screen never explains the
> narrator's words.**

Those are opposite jobs. If the picture is a visualisation of a sentence, the
sentence came first and the picture is decoration. If the sentence describes an
event, the event came first and the words are commentary on something the
viewer can see.

Only the second one teaches, because only the second one gives the viewer
something to look at that is not a caption.

## 2. The failure it prevents

A line like:

> *"The model doesn't read that. Not as letters."*

is **floating**. Nothing happens on it. There is no answer to *where am I* or
*what just moved*. It is a claim, delivered into a void, and the frame has no
choice but to become an illustration of the claim.

The fix is never to reword it. The fix is to give it an event:

| Bad | Good |
| --- | --- |
| *"The model doesn't read that."* | *(the prompt goes in through the door)* **"In it goes."** |
| *(nothing)* *"First it gets chopped up."* | *(the sentence breaks into uneven pieces)* **"And straight away, it gets cut up."** |

Same information. In the second column the viewer watched something happen and
the narrator told them what it was.

## 3. Every beat declares three things

Before a beat may be drawn, it answers:

| | |
| --- | --- |
| **Where** | the place we are standing **when the beat ends**. Named, and the same name as last beat unless the camera moved |
| **What happens** | the physical event. Something enters, splits, moves, lights, changes, leaves |
| **On screen** | which actors exist and in what state |

A beat with no answer to *what happens* is not a beat. It is a caption with a
duration, and it should be merged into its neighbour.

## 4. Place changes only by camera

**A cut to a new place is forbidden.** If the next beat is somewhere else, the
viewer gets taken there:

| Move | Use it for |
| --- | --- |
| **push in** | going inside something we were looking at |
| **pull back** | revealing that what we were in is part of something larger |
| **follow** | staying with an actor that is moving |
| **pan** | the next thing is beside this thing |

The test: a viewer must be able to point at the previous frame and say *"we
were there, and we went in."* If they cannot, the beat is a teleport, and a
teleport costs the viewer the whole map they were building.

**The corollary:** if two consecutive beats have the same `where`, the camera
must be still. A camera that drifts for atmosphere destroys the meaning of a
camera that moves for a reason.

## 5. Examples are concrete, and they are the same example

Every stage of an explanation uses the **same running example**, carried all
the way through. Not a new sentence per section.

- one prompt, chosen once, readable, and used in every section that needs text
- one word tracked through the whole machine, named in the storyboard
- real numbers where the number is known; explicitly-invented numbers marked as
  invented in the truth notes

A new example at each stage forces the viewer to re-learn the setup every time,
and quietly tells them the stages are unrelated. Carrying one example is how a
sequence of mechanisms becomes one journey.

## 6. The board

Each section's script carries a `## Storyboard` table with one row per beat:

```
| beat | where | camera | what happens | on screen | example |
```

`where` is **where the beat leaves you**, not where it started. A beat that
travels — the push-in, the follow — is written with its *destination* as
`where` and the move in `camera`. So a journey reads:

| beat | where | camera |
| --- | --- | --- |
| 14 | the sheet | — |
| 15 | inside | **push in** |
| 16 | inside | — |

and never `the sheet → inside`, which leaves the next row looking like a
teleport. The checker enforces this, and got it wrong in the first two boards
written against it.

Checked by `npm run check:board`:

1. every beat in the script has a storyboard row
2. every row has a **what happens**
3. a change of `where` between consecutive beats has a `camera` move
4. no `camera` move when `where` is unchanged

Gates 3 and 4 together are the whole of this file, made mechanical.


## `npm run check:flow` — the rules that live between two beats

`check:board` reads one beat at a time and `check:chain` reads one section at a
time. Neither can see a fault that only exists in the join, and those are the
ones that make a cut feel wrong while every frame looks fine.

| Checked | Why it is a fault |
| --- | --- |
| a beat with no commands, no stages, no overlay | the cut stalls; a held frame must at least carry an overlay saying it is held |
| two beats with byte-identical command lists | one of them is a copy-paste, not a beat |
| an actor shown and turned off in the same beat | it never renders |
| a sticky overlay set >2 beats from the end and never cleared | it bleeds through frames written without it. A *closing* label is not a leak |
| two `wall` relations back to back | two landings, therefore none |
| three consecutive beats with no voice-over | a gap in the narration, not a pause |
| a question followed by another question (beat 1 exempt) | the second inherits a viewer still holding the first, so the commitment S-05 needs never happens |
| the **video** ending on an unanswered question | beat 1 of a section is exempt: a section ending on a question *is* the chapter wall, and `check:chain` verifies the next section enters on that exact sentence |
| adjacent frames that render nearly identically | measured from the pictures, downscaled to 160×90 so the paper texture does not register |
| a section seam where the board declares no camera move but the frames jump | the persistent-scene architecture exists to prevent exactly this |

The last two need `npm run frames:all` against current code; `npm run check`
runs the static half, `npm run check:frames` runs all of it.

**Its first run found two real faults** — §10 beats 12–13 and §12 beats 10–11
each marked both beats `wall`, so the section landed twice — and one design
fault by the question rule: §12 asked *"how much do you keep close?"* and then
*"where do you reckon the good setting is?"*, which is the same question twice.


## `npm run check:overlap` — the rule that lives inside one frame

Every actor is placed by a stage percentage, and **nothing in the type system
relates one placement to another**. So a beat that moves the row to 52/74 and a
beat that put the desk at 62/74 collide, and the only thing that ever notices is
a person looking at a picture.

`check:flow` cannot see it: a beat that collides with itself is a perfectly good
change from the beat before. `check:board` cannot see it either — both actors
have a place and an event, and the places are both legal.

So this gate renders all 189 beats and measures **leaf ink**: the smallest
elements that actually paint. Actor bounding boxes are mostly empty padding and
every honest composition would fail on those. Two leaves belonging to different
actors overlapping by more than 34% of the smaller one is reported.

Its first run found **68 collisions across all 13 sections**, including:

| | |
| --- | --- |
| §2 b8-11 | the 154,880-row list at scale 1.5 ran to 100% of frame, printed itself over the last two word-cards, and swallowed the narrator |
| §2 b2 | a `camera.to(…, 1.3)` in the same beat pushed the prompt card and §1's desk off the left edge — **anything placed in a beat that moves the camera has to be placed in the frame the camera ends on** |
| §5 b3 | the building landed on top of the row, which had been left at 40/44 |
| §5 b4-12 | the row rested *inside* the router's ring and stayed there for nine beats |
| §9 b5-9 | the same list, at a different size, standing on the narrator |
| §10 b3 | the new token covered two words of the sentence instead of joining its end |
| §11 b7-8 | the counter's digits across the router desk |
| §11 b11-15 | `path.clear()` emptied the flight path but left the route drawn, so it crossed the cost bars — including the beat whose own board note reads "nothing else on screen" |
| §12 b13 | `288 × 42` printed straight through the `12,096` it produces |
| §13 b7-11 | eight chips in one row ran under the narrator and off frame, on the beat whose line is *"needs eight"*, with seven countable |

### Two rules fell out of it

**A measure of a thing is drawn by whatever draws the thing.** `Attention` and
`Space` already followed this; `Hospital` now does too (`idle`), because the
"280 idle" brace was a page overlay drawn through the entrance in both §1 and
§5.

**A sticky label has to be re-placed when its subject moves, not merely allowed
to persist.** §2's "8 tokens" stayed pinned at 46/66 after the sentence moved to
34/34, and §3's "one row per token" sat inside the table it described.

### The allowlist

Overlap is not always a fault — a label belongs *on* the thing it labels, and
§5 beat 10's whole event is name-plates landing on experts. Those pairs live in
`scripts/accepted-overlaps.json` **with a reason each**, and the reason is the
point: an entry with no argument behind it is a collision someone silenced
rather than fixed.
