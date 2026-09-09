# Asset Library — make it once

Every hour spent redrawing something that already exists is an hour not spent
on the story. The rule is simple:

> **Draw nothing twice.** Before making a prop, look in the library. After
> making one, put it there.

## Where things live

| Path | Holds | Rule |
| --- | --- | --- |
| `assets/source/` | raw, editable art — SVG exports, `.excalidrawlib` files, sketches | never imported by the app; this is the editable master |
| `assets/vendor/` | pinned third-party source pools, with a manifest recording URL, hash and licence | fetched by script, never hand-edited |
| `src/paper/` | the **production** component library: shared primitives and cast | imported by every section |
| `src/videos/<video>/<section>/` | only what is genuinely unique to that section | if a second section needs it, promote it to `src/paper/` |

## The promotion rule

The first section builds a prop locally. **The moment a second section needs
it, it moves to the shared library** rather than being copied. A copied
component is two components that will drift.

If you find yourself copying a file between sections, stop and promote it.

## Borrowing from a source pool

A pool of third-party drawings is raw material, not a shortcut to a finished
scene. Borrowing an item does not mean dropping it in unchanged. Adapt it to
one visual language: line weight, palette, scale and hierarchy must match
everything already on screen, or the frame reads as assembled rather than
authored.

Record licence and provenance for anything vendored, in a manifest and in
`THIRD_PARTY.md`.

## Authored vs generated

| Make it art | Make it code |
| --- | --- |
| characters and their poses | repeated lattices and grids |
| props with personality — desks, doors, machines | connector paths, braces, measurement marks |
| anything the viewer reads as *someone* | anything countable, where the count is the point |

Code-generate repetition. A population of hundreds should be generated from one
glyph plus a layout rule, so the count can be exact and the whole field can
change state at once. Hand-drawing it makes the number a lie and the states
unmaintainable.

## A cast member is one component with states

Not five components for five moods. One component, with the mood as a prop —
otherwise the family drifts apart and the scene stops looking like one world.

Two characters that appear near each other must be **visually
distinguishable at a glance**. Two figures built from the same primitives, on
screen at the same time, read as a continuity error rather than as a cast; give
one of them a distinguishing mark, colour or silhouette.

## Catalogue

The library must be *visible*, or it will not be used. Keep a route that renders
every piece in every state on one page. If a prop cannot be seen without
running a section, it will be rebuilt by whoever needs it next.
