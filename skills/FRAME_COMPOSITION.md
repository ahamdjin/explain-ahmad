# Frame composition — the pass that happens with the pictures open

`DIAGRAM_GRAMMAR.md` says what a diagram must communicate. `SPATIAL_CONTINUITY.md`
says where the viewer is. This file is the one between them: **how a single
frame is laid out**, and it exists because eleven sections were once built by
keeping the previous section's actors and nudging coordinates until
`check:overlap` went quiet.

That is not composition. It produces frames that pass every gate and teach
nothing: a count floating in the middle of the paper, a brace measuring blank
space, a book holding a quarter of the frame six beats after its job ended.

> **A green build is necessary. It is never sufficient evidence of visual
> refinement.** — `REFINEMENT_STANDARD.md`

## The five questions, per beat

Before a beat is done, answer all five **from the rendered frame**, not from
the code:

1. **What is the hero?** One object carries this beat. It has the most visual
   weight and it is near the optical centre. If two things compete, the frame
   has no subject.
2. **What has finished?** Anything whose job ended goes quiet — off, smaller,
   or pushed to an edge. Machinery that stays at full strength after its beat
   is clutter that the viewer is still trying to read.
3. **Is every label touching what it is about?** A measure is drawn *by* the
   thing it measures. A name sits *on* its object. A count sits against the
   edge of the thing counted. If a label could be slid ten percent in any
   direction without looking wrong, it is not anchored to anything.
4. **Does the stage direction actually describe this picture?** *"The book
   fills the frame"* is not satisfied by a strip against the left edge. The
   direction is the spec.
5. **Where is the dead paper?** A hole in the middle of the frame usually
   means an actor is the wrong size or in the wrong place, not that the frame
   needs decoration.

## Placement rules

- **Pairing is proximity.** Two things that belong together sit closer to each
  other than either sits to anything else. When two pairs must be compared, put
  the compared halves **face to face** so the gap between them is a real
  channel, and put the label for the comparison *in* that channel.
- **A hero is big.** A row that carries a beat is not at the same scale as a row
  that is merely present. Scale is how the frame says which one to read.
- **State does not leak.** A visual treatment turned on for one beat (a band, a
  highlight, a measure) is turned **off** before a later beat compares that
  object with anything. §3 once printed *identical* between a banded row and an
  unbanded one.
- **Sticky labels are re-placed or cleared.** A label pinned in beat 2 that is
  still there in beat 5, after its subject moved or left, is a leak.
- **Anything placed in a beat that moves the camera is placed in the frame the
  camera ends on.**

## Knowing how wide a thing actually is

A placement is `at` plus `scale`, and `scale` multiplies a width set in
`paper.css`, not the frame. Guessing that width is how §9's prompt kept landing
on top of the vocabulary list: `Sentence` is **74cqw**, not the ~54 that was
assumed, so at scale 0.78 it ran to 69% of the frame.

Natural widths, as a fraction of frame width at `scale: 1`:

| actor | width | actor | width |
| --- | --- | --- | --- |
| `Sentence` | 74 | `Attention` | 76 |
| `ExpertBlend` | 72 | `Room` | 64 |
| `NumberRow` | 56 (**118** extended) | `Hospital` | 62 |
| `Bars` | 62 | `ExpertOpen` | 50 |
| `Chat` | 40 | `Run` | 34 |
| `Fetch` | 32 | `Store` / `Tower` / `Loop2` | 30 |
| `Cache` / `FastMem` | 20 | `ModelCard` | 19 |
| `Clock` | 12 | `EmbeddingTable` | 26 |

Two traps in that table:

- **`NumberRow` draws narrower than its box.** The tail and the measure live in
  the remainder, so the *cells* occupy about 76% of `56cqw × scale`. A row that
  carries a beat wants a scale near 1, not the 0.6 that looks right in source.
- **`EmbeddingTable` is 1:2.35 and is meant to run past the top and bottom of
  the frame** -- `paper.css` says so. At a scale that fits inside the frame it
  reads as a modest box on a shelf. Its own caption then sits off-frame, so the
  count has to be placed against its edge instead.

Height is width × the component's viewBox aspect, and the frame is 16:9 -- so a
thing 40% of the frame *wide* is 40 × (16/9) = 71% of the frame *tall* per unit
of aspect. Vertical crowding is easy to under-estimate from the source.

## The loop

There is no substitute for this and it is the step that was skipped:

```
npm run frames:sNN          # render every beat
npm run sheet -- --section=section-NN   # tile them into one image
# look at the sheet. Answer the five questions for every beat.
npm run check:overlap --section=NN      # the mechanical half
```

`npm run sheet` exists so that looking at thirteen frames costs one glance.
Use it. A section is not finished because it typechecks and the gates are
green; it is finished when the contact sheet is right.

## Quiet, not gone: `fade`

The commonest fault found in the final design pass was not collision. It was an
actor that had *finished teaching* and was still the loudest ink on the frame:
§10's stored-state column shouting through seven beats it was not the subject
of, §5's 288-wall winning every one of the fourteen beats it stands in, §8's
`2,688` beating the eight representations it was supposed to be handing to §9.

`off()` is the wrong tool for this. Losing the actor loses the geography, and
the next beat that needs it back reads as a cut to a new scene.

`Slot` takes a `fade` (default `1`). Give the actor a `fade` field in its scene
state, pass it through `Stage.tsx`, and add the pair of verbs:

```ts
ghost: (fade = 0.3): Patch => ({ wall: { fade } }),
loud:  (): Patch => ({ wall: { fade: 1 } }),
```

Then the actor stays exactly where it is, at exactly its size -- the scale
comparison the frame depends on survives -- while ceding the eye to whatever
the narration has moved on to. `0.25`-`0.3` is enough; the object stays
legible as context and stops competing.

Ask it of every beat: **what is on this frame at full ink whose teaching job
finished two beats ago?**

A corollary for overlays: `brace` and `note` are placed in *page* percentages
and do not follow a `camera.to()`. Zooming the scene to measure something
therefore separates the figure from the object it measures -- §11 beat 8 lost
`~25 MB · 4096 × 2048 × 3` behind the tower that way. Enlarge the *actor*
(`moveTo(at, scale)`) rather than the camera when a page overlay has to land on
it.
