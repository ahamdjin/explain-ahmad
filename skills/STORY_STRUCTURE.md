# Story structure — the gate before any art

Read this before writing a beat, drawing a frame, or touching a component.
It exists because Section 01 was built five times and rejected five times, and
every rejection had the same mechanical cause, invisible to every other check
in this repo.

## The failure this prevents

Section 01 asked one question three times:

| Beat | Question |
| --- | --- |
| 8 | So why have the other 300 billion at all? |
| 21 | Why can't I keep just the small part I need? |
| 29 | Why can't we run this on far less memory? |

One question in three costumes. The section ended where it started, so there
was no plot — 31 beats restating a premise. No amount of beat-density work,
motion feel, verified numbers or frozen-frame testing can detect this, because
all of those checks presuppose that a story exists and only measure its finish.

**The circularity was upstream of the implementation.** `SECTION_MAP.md` steps
8, 9 and 10 for Section 01 were already the same beat three times. Every
rebuild faithfully reproduced the defect it was given.

## Why the old format could not catch it

Sections were specified as **Purpose / Visual world / Key mechanism / Viewer
leaves knowing**. That is a syllabus. Syllabi compose into lists — "and then,
and then." The format has no field that can hold tension, so a section that
goes nowhere is indistinguishable from one that goes somewhere.

A story format needs one more field than a syllabus: **the question the viewer
leaves with.**

---

## 1. The spine — one per video, written before any section

Three facts. If any is missing, stop and get it; do not start building.

| | |
| --- | --- |
| **The want** | What the protagonist is trying to do and cannot. Not a curiosity — a blocked goal. Generic, never a personal machine. |
| **The wall** | The real reason it can't be done, in one sentence, derived and verified. Sections may withhold it, but *the author may not*. |
| **The thesis** | The one thing a viewer can explain to a friend a week later. |

**A want is not a question.** "I wonder why models are big" is a curiosity and
produces exposition with a face on it. "I want to run this and can't" is a want
and produces a story. Every rejected version of Section 01 had a narrator who
*noticed* things. None had a protagonist who *wanted* something.

**The wall must be written down even when it is never shown.** Section 01 does
not answer the question — but a section built without knowing the answer ends
on a hazard sign, because the author has nothing to aim at. Writing the wall is
what turns a withheld answer into a hook.

## 2. The question chain — one row per section

Every section declares four things:

| Field | Rule |
| --- | --- |
| **Enters on** | The question the viewer arrives holding. Must equal the previous section's *Exits on*. |
| **Answers** | The question it actually resolves, and the answer in one line. May be `nothing` for a pure-setup section, but then it must earn it with an event. |
| **Event** | The thing that *happens*. Not an assertion — a change, an attempt, a surprise, a failure. |
| **Exits on** | The new question. **Must differ from Enters on.** |

The chain is checkable by machine. That is the entire point.

## 3. The four gates

Run all four before art. They take minutes.

### Gate 1 — Circularity
Write out every question the section asks, in order. **If any two are the same
question in different words, there is no story.** Fix the structure; do not
proceed to beats.

### Gate 2 — Event
Name the thing that happens. If the honest answer is "the narrator notices
something" or "a label appears," the section is exposition. Every section needs
at least one event: something is attempted, something changes, something
surprises, something fails.

### Gate 3 — Escalation
`Exits on` must be *harder or larger* than `Enters on`, not a rephrasing.
Test: could the exit question have been asked before the section ran? If yes,
the section taught nothing.

### Gate 4 — Setup and payoff
At least one event in the section should come back later to break something.
An event nothing depends on is decoration. The strongest available example:
*different words select different experts* is a fact in Section 01 and the
reason the tempting plan fails in Section 02 — so it must be **shown** in 01,
not mentioned.

## 4. Vocabulary ledger

Maintain, per section, what the viewer owns and what is still forbidden.

- A term may not be used before the section that introduces it. `token` belongs
  to Section 03, so Section 01 says `word`.
- A term introduced once is never re-explained.
- Function before name: show the thing working, then name it. The router is on
  screen as an unlabelled desk for ten beats before it is called a router.

Without a ledger, every section either re-teaches or assumes, and both read as
carelessness.

## 5. What a section may not do

- **End on an unexplained obstacle.** A red X, a hazard sign, `but something
  blocks this…`. Deferring an answer is a hook; asserting an obstacle you
  refuse to describe is withholding. Show the plan *working* and leave the
  question.
- **Restate instead of escalate.** See Gate 1.
- **Open on a spec table.** Start on the machine doing its job, or on a
  surprise. A table read is the slowest possible opening.
- **Change metaphor to fix a story problem.** Library → office → hospital
  changed nothing three times, because the defect was never the metaphor. Test
  the skeleton first.

## 6. Order of work

1. Spine — want, wall, thesis.
2. Question chain for every section.
3. Gates 1–4.
4. **Only now**: beats, then frames, then motion.

Any step skipped gets paid for at the bottom, where it is most expensive. All
five Section 01 rebuilds skipped steps 1–3.
