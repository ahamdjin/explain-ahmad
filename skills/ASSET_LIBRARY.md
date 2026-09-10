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

## The scene kit is part of the library too

`src/paper/scene.ts` holds the cumulative merge and the four generic actor
verbs; `src/paper/notes.ts` holds the overlay builders. Section 01 hand-wrote
its own `applyPatches` — a nine-line object spread naming every actor — which
is correct once and a liability thirteen times, because the merge is identical
in all of them and the copies drift the moment an actor is added.

So a section's `scene.ts` should contain only the two things that are genuinely
its own:

1. **which actors are on stage** — the state type and its initial value
2. **what the story does to them** — named story verbs, written on top of the
   generic four

Story verbs still matter. `block.scatter()` and `hospital.choose()` are why
`beats.ts` reads as direction rather than as state assignment, and
`actorVerbs` supplies the plumbing underneath them, not the vocabulary.

## Alignment is not a thing two components can agree on by hand

`AttentionLines` was built as its own actor, positioned in stage percentages
next to a `Sentence` that computes its token layout internally. Those two would
have had to agree about where the ninth token's centre is, by hand, at every
scale — and lines that miss the cards they connect teach nothing.

The fix is the shape to reuse: the geometry is a bare `<g>` (`AttentionArcs`)
that the owner of the coordinate system drops **inside its own `svg`**, plus a
thin wrapper (`AttentionLines`) for the rare standalone case.

> **If two components need to agree on a position, one of them should be
> rendering inside the other.**

## One number, many pictures

§12 has a cache box, a machine, and two read-outs, all of which are the same
fact: how much of the model you keep close. A demonstration like that dies of
exactly one failure — the control saying one thing while the picture says
another — so the value lives in the section's `Stage`, and the box's size, the
machine's pace and its bulk are all derived from it.

A beat can drive the control, and the viewer can always take it back.

## One host, and a cast you almost never need

`plain` is the host — Ahmad on screen, and the default for every section. It is
deliberately the plainest figure in the set: no hair, no beard, no glasses, no
hat. Nothing about the drawing competes with what is being explained beside it,
and there is nothing in it to date.

The other six styles are a supporting cast, and they are for **beats that
genuinely need a second person in the frame** — which is rare. One figure
carrying the whole video is not a limitation. It is why the piece reads as one
person explaining something rather than as a cast performing a script.

Two figures that do share a frame must be distinguishable at a glance. Two
built from the same primitives, twenty percent apart, read as a continuity
error rather than as a cast.
