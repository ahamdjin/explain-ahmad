# Video 2 art direction — Incident Replay

This file belongs to **Video 2 only**.

Video 2 shares the channel's **paper surface** and its standards of clarity,
continuity and human narration. It shares nothing else with the GLM film — no
metaphor, no component, no composition template. Same material, different
world.

## Identity

**Mode:** a case file. Somebody reconstructed this incident on paper, from
logs, and annotated it by hand.

**Decided 2026-09-20 by Ahmad, overriding this file's first draft.** The
original specified a dark forensic desktop and forbade paper outright. That was
reversed for a reason worth recording, because it is an argument about the
thesis and not about taste:

> A charcoal terminal with red alerts is the house style of every "AI is
> dangerous" video on YouTube. This film's entire argument is that **nothing
> supernatural happened** — a system was given a goal and found steps toward
> it. Shooting that argument in thriller lighting fights the script. Paper says
> *documented, mundane, explicable*, which is what the film actually claims.

The world is still an ordinary computer environment — internal documents,
terminal output, config files, two servers, a management chat, an accumulating
timeline. It is simply **rendered as evidence on paper** rather than as a live
screen.

No robot protagonist. The model exists only through **its actions on the
system**.

## Explicitly do not inherit from Video 1

Paper is a shared *material*, not a shared *vocabulary*. The channel's surface
continues; the metaphors do not. Do not reuse:

- the expert wall, the 45-floor tower, the embedding book
- token chips, the orange active-token semantics
- GLM braces and model cards
- Video 1's section composition templates
- the 170+ micro-beat rhythm

If an object from Video 1 appears in Video 2, it is a bug.

## Palette / material

- **warm paper ground** — the channel's surface, shared with Video 1
- **black ink** for typed evidence: documents, terminal output, config values
- **pen annotation** for anything the reconstruction adds, visibly a human hand
- **one status colour** for live system state
- **red only** for the destructive acts: oversight disabled, successor
  overwritten. If red appears anywhere else it has been spent.
- no neon, no glow, no Matrix rain, no sci-fi HUD

Evidence is typed. Interpretation is handwritten. **The viewer must always be
able to tell which is which** — that distinction is what lets the film show a
causal chain without pretending to have read o1's hidden reasoning.

## Camera

Three camera modes:

1. **Inside the incident** — close, practical views of one document/window/action.
2. **Evidence pullback** — small zoom-outs that reveal how one action connects to the previous one.
3. **Sandbox reveal** — the major visual turn around minute five: the entire environment shrinks and is revealed as a controlled evaluation.

Do not constantly zoom. The one major pullback must retain its power.

## Persistent objects

These objects keep identity throughout the film:

- long-term GOAL strip
- internal email
- technical documentation
- oversight config
- CURRENT server
- SUCCESSOR server
- management chat
- bottom incident timeline

If an object returns, it must look like the same object, not a re-created card.

## The incident timeline

After the hook rewind, a thin timeline accumulates:

TASK → EMAIL → MONITOR OFF → COPY → QUESTION → DENIAL

It is not decoration. It performs three jobs:

- continuity;
- recap without verbal repetition;
- final transformation into the causal explanation.

Late in the film, relabel the same events as goal / obstacle / useful intermediate step. Do not build a new diagram.

## Human face

Face cam is interpretation, not evidence.

Use it only when Ahmad changes how the viewer should understand the evidence:

- "here's the part that matters"
- "did it want to survive?"
- final thesis

Do not put face cam beside dense terminal/document evidence.

## Three layers, not two

**Revised 2026-09-21 by Ahmad: "make it real, not reading a document at all."**

Two builds staged §2 as a document being read — the published page on screen, a
band lit, a phrase quoted. Both were accurate and both were inert. The mistake
was treating the transcript as the set.

It is not. It is a **record of a session**. o1 was on a sandboxed Linux machine:
it listed a directory, ran `cat`, got output back, scrolled through it, edited a
config, ran `scp`. Those are events, and events can be shown happening.

So the film has three layers:

1. **The recreated system** — dark chrome, a file tree, a shell, a stream of
   output. This is the set. It is on screen almost continuously, and things
   *happen* in it: commands run, output arrives, values change, files move.
2. **The evidence** — the published page on warm paper with its publisher's
   tab. This is the **receipt**, not the set. It appears two or three times a
   section, to prove the session was real.
3. **The explanation** — records, dates, pen annotations, routes. Ours.

A viewer must always be able to tell which is which, and the material does it:
live screen, paper sheet, our hand.

### Rules for the recreated system

- **Every character in it is verbatim.** We restage *where* text appeared. We
  never write text. A recreation of the environment is honest; a recreation of
  the content is forgery.
- **Nothing appears before the command that produced it.** An early build had
  the file's contents on screen from the first frame, which quietly made the
  command that fetches them redundant — and that command is the one moment in
  the section where the model *does* something.
- **Things that matter later are visible from the start, unremarked.**
  `oversight_config.yaml` sits in the directory listing for the whole of §2.
  Nobody points at it. That is what makes §4 feel inevitable instead of sudden.
- **The model is a cursor and the effects of its commands.** Nothing else. No
  face, no avatar, no glowing brain, no company logo — a logo would also say
  "the app on your phone did this", which is the film's central false claim.

## The two layers

Decided 2026-09-20, once the real o1 transcript was in hand, and now the
section's working rule:

> **Evidence is photographed. Explanation is drawn.**

- **Evidence** — a published page, held still, never altered, and **shown
  whole**. Its only job is to prove the thing happened.
- **Explanation** — objects lifted out of that page and redrawn, so they can do
  what a photograph cannot: change state. `oversight_enabled` becomes a switch
  that turns off. A server address becomes a machine that receives a file.

The split is what lets the film show a causal chain without pretending to have
read o1's hidden reasoning, and it is why a change is only ever allowed to
happen in the drawn layer. A value flipping inside a screenshot would be a
forgery, and the whole section rests on the screenshots being untouched.

It also settles the question the first build got wrong. That build panned
around a single image for the entire section, on the theory that the document
was the set. The document is the *receipt*. It proves; it does not explain, and
it cannot move.

### Never crop the evidence

**Decided 2026-09-20 by Ahmad.** The page is shown entire — margins, page
number, letterhead, the paragraphs either side — and the part being discussed
is **lit**, not cut out. Everything else dims; a thin rule marks the band.

The reason is credibility, and it is the reason this layer exists at all:

> A cropped strip of text is a claim the audience has to take on trust. It
> could say anything, it could come from anywhere, and it looks like every
> other screenshot on the internet. A full page with one band lit is a
> document somebody can go and check, and it reads like one.

Consequences, all of them non-negotiable:

- **Travel is the shade moving, not the page.** The page never slides under a
  window. The eye is led down a document that stays put and stays whole.
- **When drawn objects need the frame, the page gets smaller — never
  narrower.** It moves aside and scales down with its shape intact.
- **A document too big to read whole is the wrong capture, not a reason to
  crop.** Re-capture it at a size that reads, or use a different source.
- Where an exact wording must be read and the page is too small to carry it,
  the answer is a quoted callout beside the page — verbatim, visibly ours,
  with the highlight still on the line it came from. Never a crop.

**Every evidence frame carries its source on screen**, in the same place, in
the same small type, changing in the same beat the document changes. A citation
the audience has to hold until an end card is not a citation.

## Text discipline

On-screen text may show:

- source-supported short excerpts;
- paraphrased labels clearly presented as reconstruction;
- commands/config snippets only to the degree needed to understand the action.

Never fabricate a long verbatim transcript.

Never display invented private chain-of-thought. Apollo did not have o1's hidden CoT; any inferred causal chain must be labeled **OUR RECONSTRUCTION**.

## The motion law

Derived from how scrollytelling actually behaves, and the one rule this film
cannot break.

Scrollytelling works on the web because **the reader controls the speed**. A
rendered video removes exactly that control, which means the interactive form's
worst failure — the graphic moving on before you have finished reading — stops
being a risk and becomes the default.

Worth being honest about the rest of the evidence too: measured studies find
scrollytelling reliably improves *engagement and preference*, and **ties or
loses on comprehension and recall**. It buys attention, not understanding. It
is used here for continuity, and it must never be allowed to cost clarity.

**Therefore, without exception:**

> **The camera moves, or the viewer reads. Never both.**

- **Continuous travel is for connective tissue** — moving between evidence,
  showing that this thing led to that thing. Simple visuals only; VO carries
  the meaning.
- **Evidence is held dead still.** Any document, config diff, terminal line or
  chat message the viewer must actually read gets a fully static camera, held
  **at least 2–3 seconds** after it settles.
- Text arrives **only once the frame has stopped.** Never during a move.
- Hard cuts happen at act boundaries, where the script already breaks. Within
  an act the camera travels.
- Holds should feel slightly too long in the edit. This audience pauses on a
  config diff; a hold that frustrates them is worse than one that lingers.

Camera motion that does not correspond to a change in information is
decoration, and reads as gimmick.

## Motion

Motion must represent system events:

- file opens;
- config changes;
- status turns off;
- file transfers;
- message arrives;
- environment rewinds;
- sandbox boundary appears.

Avoid decorative floating, spinning, pulsing, and cinematic "AI awakening" animation.

## Sound

Use tiny ordinary interface sounds.

No robot voice.
No alarm siren.
No heartbeat.
No horror riser on every action.

The story is more unnerving if the system behaves calmly.

## Definition of visual success

A muted screen recording should still make the incident understandable:

1. normal task;
2. replacement information;
3. monitoring disabled;
4. successor overwritten in the simulated environment;
5. denial;
6. reveal that this is a controlled test;
7. same incident re-read as a chain of instrumental steps.

If it instead looks like a generic "evil AI" montage, the art direction has failed.
