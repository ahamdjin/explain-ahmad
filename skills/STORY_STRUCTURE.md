# Story Structure — the gate before any art

Read this before writing a script, a beat, a frame or a component.

Every other check in this repo — beat granularity, continuity, diagram grammar,
refinement, visual system — presupposes that a story exists and measures only
how well it is finished. **None of them can detect a section that goes
nowhere.** This is the only file that can, so it runs first.

## The failure mode it catches

A section that asks the same question at the end that it asked at the
beginning. It will pass every quality check, look beautiful, and be worthless,
because a viewer who is in the same place after ten beats as before them has
been given a list, not a story.

Cause is almost always the specification format. **Purpose / Visual world / Key
mechanism / Viewer leaves knowing** is a syllabus. Syllabi compose into "and
then, and then." A story format needs one field a syllabus never has: **the
question the viewer leaves with.**

---

## 1. The spine — one per video, before any section

| | |
| --- | --- |
| **The want** | What the protagonist is trying to do and cannot. A blocked goal. |
| **The wall** | The real reason it cannot be done, in one sentence, verified. |
| **The thesis** | The one thing a viewer can retell a week later. |

If any of the three is missing, stop and get it. Do not start building.

**A want is not a question.** *"I wonder why X is like this"* is a curiosity and
produces exposition with a face on it. *"I want to do X and cannot"* is a want
and produces a story. Best of all is **a claim on trial** — someone asserts
something, and the video reaches a verdict. Then every section is evidence, and
any section that is neither evidence for nor against is off-mission.

**Write the wall down even when no section is allowed to say it.** A section
built without knowing the answer ends on a hazard sign, because the author has
nothing to aim at. Knowing the answer is what turns a withheld answer into a
hook.

## 2. The link rule — how one section joins the next

Every section opens by **landing the previous section's answer**, then adds a
**but**.

```
THEREFORE  — the thing you just earned, stated as settled
BUT        — the new trouble it creates
∴ the next section now has a reason to exist
```

A section that opens on fresh material with no *therefore* has orphaned its
predecessor: the viewer never got to keep what they just learned, so learning
it felt pointless. A section that closes without a *but* has nothing to hand
forward, and the video stops rather than continues.

**Headache before aspirin.** The trouble must be *felt* before the fix is
offered. A fix arriving before its problem is a fact; the same fix arriving
after it is a relief, and relief is what a viewer remembers.

**But never assert a headache you refuse to describe.** A red cross, a hazard
sign, "something stops this" — that reads as withholding, not mystery.
Deferring an *answer* is a hook. Asserting an *obstacle* and declining to
describe it is a cheat. Show the plan working and leave the question.

## 3. The question chain

Every section declares four things. Two are checkable by machine.

| Field | Rule |
| --- | --- |
| **Enters on** | The question the viewer arrives holding. **Must equal the previous section's *Exits on*.** |
| **Answers** | What it resolves, and the answer in one line. May be `nothing` for pure setup — but then it must earn that with an event. |
| **Event** | The thing that *happens*. Not an assertion — a change, an attempt, a surprise, a failure. |
| **Exits on** | The new question. **Must differ from *Enters on*.** |

## 4. The five gates

Run all five before any art. They take minutes and they save weeks.

**Gate 1 — Circularity.** Write out every question the section asks, in order.
If any two are the same question in different words, there is no story. Fix the
structure; do not proceed.

**Gate 2 — Event.** Name the thing that happens. If the honest answer is "the
narrator notices something" or "a label appears," the section is exposition.

**Gate 3 — Escalation.** Could *Exits on* have been asked before the section
ran? If yes, the section taught nothing.

**Gate 4 — Setup and payoff.** At least one event should come back later to
break something. An event nothing depends on is decoration. The strongest
structure available is *the surprise planted in the opening is the exact thing
that destroys the tempting plan several sections later.*

**Gate 5 — Link.** Does the section open with a *therefore* and close with a
*but*? See §2.

## 5. Duty to challenge the script

**A written script is not permission to build it.** If you believe it will not
hook a viewer or will not hold one, say so plainly *before* building, because
building is the most expensive part of the pipeline and a script defect
survives every stage of it.

Say it directly — *"I don't think this script will keep a viewer"* — then name
the line where attention is lost, say why, propose the replacement, and let the
author decide. Do not build a script you believe is broken and hope the visuals
rescue it. They cannot.

Signals a script will not hold:

- it opens on a specification table, a definition, or a list of properties
- the closing question is the opening question
- nothing happens: no attempt, no change, no surprise, no failure
- the first ~15 seconds contain no trouble
- the viewer's own question is never said out loud
- a section's material could be reordered freely without anything breaking —
  which means there is no causality in it

## 6. When stuck, go and read

Do not invent structure from first principles. Study how the best explainers do
it and extract the mechanism.

- `skills/ncase/` — the primary method: headache before aspirin, function
  before name, the necessity test, interest curve
- `skills/TEACHING_REFERENCE_LIBRARY.md` — wider references

What to extract, in order of usefulness: **where the trouble lands** in the
runtime; **what the reader does** rather than reads; **how sections are
chained**; only then visual technique.

Do the same for frames. Before drawing, find reference frames that already
work, and name what makes them work — composition, scale contrast, where the
eye enters — rather than copying the surface.

## 7. Order of work

```
1  spine        want, wall, thesis
2  chain        four fields per section
3  gates        all five
4  script       what the voice actually says
5  frames       stills, which are the product
6  animation    last, and only where it earns its place
```

Never skip a step. Each one is cheaper than the one after it, and a defect
introduced early is paid for at the bottom, where it costs the most. See
`skills/PRODUCTION_ORDER.md` for how steps 4–6 run.

## 8. What a section may never do

- End on an unexplained obstacle. See §2.
- Restate instead of escalate. See Gate 1.
- Open on a spec table. Open on the thing working, or on trouble.
- Use a term before the section that earns it. Keep a vocabulary ledger.
- Re-explain something already established. Reuse it plainly.
- **Change the metaphor to fix a story problem.** This never works and it costs
  a full rebuild each time. Test the skeleton first.

## 9. Choosing a metaphor

A metaphor is not decoration and not a mood. It is **the place where the
mechanism makes sense** — where the constraint you need the viewer to feel is
already an ordinary fact of that world.

The test is one question: **can this metaphor express the wall?**

If the constraint is invisible in the metaphor's own world, the metaphor will
force you to invent a fake obstacle to stand in for the real one, and the
section will read as withholding no matter how well it is drawn. A world where
the resource is free cannot teach that the resource is expensive.

Pick the metaphor *after* the wall is written, never before. Judge candidates
only on whether the wall is native to them.
