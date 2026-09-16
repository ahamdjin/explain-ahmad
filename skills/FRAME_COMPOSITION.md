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
