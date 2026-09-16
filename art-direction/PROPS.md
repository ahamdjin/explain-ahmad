# The object library

Things rather than people. People are in `art-direction/CAST.md`; colour is in
`art-direction/PALETTE.md`.

`src/paper/props/` · see every object in every state at `/paper`

## How an object works

```tsx
<Laptop size="18cqw" lit />
<Library size={260} shelves={4} seed={4} lit />
<Van size={210} load={3} moving />
```

`size` is the **width**. A number is px; a string is any CSS length, so on the
fixed 1920×1080 stage pass a container unit — `size="18cqw"` — and the object
scales with the frame instead of with the browser. Height always follows the
viewBox, so nothing needs a hard-coded height.

## Nothing carries a hue

Variety comes from **value**, not hue. Every hue in the palette already means
something — teal is the word, blue is a measurement, red is a cost — so a
coloured book or a coloured car would read as *being* one of those things.
Objects use the neutral ladder in `props/frame.ts` (`SHADES`, `shade(i)`).

Two exceptions, both principled:

- **`lit`** uses the warm light (`glow`, `glowSoft`) that already means "this
  is on, or this door is open". It is a value shift, not a new role.
- **`tone?: Role`** on `Book` — for when a book genuinely stands for a coded
  thing. Default is paper.

## Variety is seeded, never random

`seeded(i)` in `props/frame.ts` is fixed-hash noise. Book widths, shelf gaps,
vent holes and rack lights all come from it, so a screenshot taken today can
be compared with one taken next week. **Never `Math.random` in a prop** — it
breaks frame comparison, which is the only review loop that works.

## What is in it

### Books

| | |
| --- | --- |
| `Book` | `state="shut" \| "open"`, `tone`, `lines` |
| `BookStack` | `count` — a pile that looks like a pile |
| `Shelf` | `seed` — widths, gaps and one leaner |
| `Library` | `shelves`, `seed`, `lit` — the case, with a cornice |

A library is the **wrong** metaphor for a cost of absence: a book on a shelf is
already available, so shelving is free and retrieval is free. It is the right
metaphor for capacity, indexing, and "we own more than we can read". See
`skills/STORY_STRUCTURE.md` §9.

### Hardware

| | |
| --- | --- |
| `Laptop` | `lit`, `shut` |
| `Screen` | `lit` — the all-in-one |
| `MachineBox` | `shape="mini" \| "studio" \| "tower"`, `lit` |
| `Keyboard`, `Mouse` | |
| `RamStick` | `lit`, `chips` |
| `RamBank` | `count`, `filled` — the empty slots are the headroom |
| `Drive` | `kind="ssd" \| "disk"`, `label` |
| `DriveRack` | `rows` — what "more than fits" looks like |

Each leans on **one silhouette cue** and nothing else: the laptop is a wedge
with a notch, the all-in-one is a chin on a blade foot, the tower is a lattice,
the stick is a row of chips over gold fingers, the disk is a platter and an
arm. Add detail beyond the cue and it stops reading at playback size.

The platter is worth its extra lines: a spinning disk is the only drawing that
makes "this one is slow" self-evident without a label.

### Creatures

`Dog` (`sits`), `Cat`, `Bird`.

They exist for the same reason the word cards say "dog" and "cat": a concrete
noun is easier to hold than an abstract one, and nobody needs a dog explained.
Legs stay short and plain — long jointed legs read as comic, which is the wrong
note next to a number.

### Vehicles

`Car` (`moving`), `Van` (`moving`, `load` 0–3), `Crate` (`open`).

These are for a journey with a **duration**. A van makes "this took time to
arrive" self-evident in a way an arrow never does, which is exactly what a
fetch from storage needs. Same drawing empty on the way out and loaded on the
way back.

## What the frames taught

- **An X over a box reads as negation.** The crate is strapped, not braced —
  and there is deliberately no `Cross` anywhere in this library.
- **Cargo has to sit on the floor.** Floated mid-body it reads as a row of
  windows.
- **Speed lines: two or three.** More reads as rain.
- **A seam across the top of a mouse makes it a rock.** One continuous shape.
- **The cornice is what makes a rectangle read as furniture.** Same for the
  handles on the tower and the notch on the laptop: one non-rectangular
  detail per object is the difference between a machine and a box.
- **A tail held level makes a dog a fox.** Put it up.
- **Warm light needs to be warm.** A pale wash for `lit` was invisible next to
  the unlit version; it wants the full `glow`.
