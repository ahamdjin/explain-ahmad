# Production Order — script, then frames, then animation

Structure is settled in `skills/STORY_STRUCTURE.md`. This file covers what
happens after the gates pass.

The order is not a preference. Each stage is an order of magnitude cheaper than
the next, and a defect carried forward is paid for at the most expensive stage.

```
script  →  frames  →  animation
cheap      the product   last
```

---

## 1. Script — write what the voice actually says

Write the spoken line for every beat before drawing anything. Not a summary of
the beat: **the words that will be said over it.**

This is the cheapest place to discover that a section is boring, and the only
place where fixing it costs minutes.

For each line, decide which of these it is doing:

| Job | Test |
| --- | --- |
| **hook** | does it create trouble the viewer now wants resolved? |
| **answer** | does it resolve something already asked? |
| **turn** | does it make the previous answer insufficient? |
| **nothing** | cut it |

A line doing none of the four is padding, however true it is.

**Time the script.** Word count ÷ ~145 words per minute gives the spoken
runtime. Add hold time for the beats that need silence after them. Runtime is
decided here, not discovered in the edit.

**Then challenge it.** If the script will not hook or hold, say so before
drawing — see `STORY_STRUCTURE.md` §5. A script is the cheapest thing in the
pipeline to throw away and the most expensive thing to have been wrong about.

## 2. Frames — the product

**The frames the viewer stops on are the deliverable.** Motion is how you get
between them, and it matters far less.

Work out the still first. Only then ask what supports the line:

> Given what this voice line is doing, what single image makes it land?

One image, one job. If a frame needs two ideas, it is two frames.

### The frozen-frame test

Every beat must read with motion disabled. Nominate the two or three frames
that *carry* the section, and be explicit about them. If those do not work as
stills, the section does not work, and no motion pass will rescue it.

### Composition

- One subject per frame. Everything else is context, and should look like it.
- Scale contrast is the strongest tool available — a tiny figure against a huge
  object teaches magnitude with no label.
- Leave the frame's edges quiet. Load-bearing content in a corner will be
  cropped by someone's player.
- Prefer a mark, a number or a brace over a sentence. A note must carry
  something the voice does not — **never transcribe the line being spoken.**

### Review loop

| Stage | Catches |
| --- | --- |
| stills of every beat, on one contact sheet | composition, collisions, off-frame content, missing labels |
| a strip sampling one transition every ~90 ms | wash-outs and mid-transition states invisible in the end states |
| the whole section recorded at real beat timing | pacing, and only pacing |

Look at the output. Reading the source does not substitute — collisions,
clipped text and dropped elements are routinely invisible in code and obvious
in a screenshot.

## 3. Animation — last, and only where it earns

Add motion only when it does a job the still cannot:

- showing that two things are **the same object** in a new state
- showing **causality** — this moved because that arrived
- **staging** a reveal in an order, so a teacher's "show, then name, then react"
  is possible inside one beat

Motion that only decorates a transition is cost with no teaching.

### Two rules that are structural, not stylistic

**Actors persist.** Mount every actor once for the whole section and animate
its properties. Never replace the frame per beat — a keyed presence wrapper
around the beat index turns the piece into a slideshow, and no easing work can
undo that.

**Panels are the exception.** The *world* accumulates and is never destroyed.
An explanatory panel is not part of the world: it may leave when its moment is
over, and it must, because a panel that outlives its beat collides with what
follows. A panel that restates things already on screen should replace them,
not stack on them.

## 4. Assets

Draw nothing twice. Before making a prop, check the asset library, and when you
make one, put it there. See `skills/ASSET_LIBRARY.md`.

## 5. Definition of done for a section

- gates 1–5 pass
- script written, timed, and defended
- every beat readable as a still
- carrying frames nominated and verified
- contact sheet reviewed by eye
- reusable pieces filed in the asset library
