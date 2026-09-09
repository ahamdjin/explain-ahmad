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
