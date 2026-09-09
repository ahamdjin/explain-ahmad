# Section 01 — Approved Visual Storyboard + Build Contract

Status: **APPROVED AND IMPLEMENTED IN V2.**

Route: `/section-01`

Implementation:

- `src/videos/glm-320b/section-01/Section01.tsx`
- `src/videos/glm-320b/section-01/StoryboardStageV2.tsx`
- `src/videos/glm-320b/section-01/storyboard-v2.css`

This file is the frame-by-frame source of truth for Section 01. The visual boards approved on 2026-09-09 are the target composition; this transcription keeps the target reviewable in git even when the generated reference sheets are not present as repo binaries.

## Section job

Section 01 has only two teaching jobs:

1. Make `320B total → ~18B active` physically understandable.
2. Create the unresolved memory question: **if only a small expert path works, why not keep the rest in storage and load only the selected experts?**

Do **not** answer the bottleneck here. No repeated routing across floors, no bandwidth explanation, no tokenization, embeddings, attention or next-token prediction.

## Audience / cognitive load

Target audience: 15+.

Visual standard: a five-year-old should be able to follow the physical story with the audio muted.

At any moment the viewer should be carrying roughly 3–4 ideas at most.

## Visual grammar

Narration uses the correct technical nouns. The drawing uses familiar objects to make those nouns intuitive.

- total learned capacity / parameters → giant library and shelves
- token → paper task card
- experts → simple worker characters with neutral IDs
- router → dispatcher/manager-like robot, still labelled `ROUTER`
- model weight pool / storage → giant shelf/building
- RAM / VRAM / fast working memory → small office/work room

The metaphor explains function. It is not a literal mapping.

---

# Frames 01–04 — Make the scale obvious

## Frame 01 — Meet GLM-5.3-Flash

### On screen

Large paper model-information sheet. Narrator stands beside it.

Rows:

- Architecture — Mixture of Experts (MoE)
- Total Parameters — **320 Billion**
- Active Parameters — **18 Billion**
- Experts — `288 routed + 1 shared / sparse layer`
- Layers — `45`

`320 Billion` is orange. `18 Billion` is blue.

The other rows are supporting context, not separate lessons.

### Viewer leaves with

`320B total` versus `18B active`.

---

## Frame 02 — Turn 320B into a giant library

### On screen

The information sheet gives way to a large library/building labelled:

`320B PARAMETERS`

Books represent the model's enormous learned capacity.

### Important

Do not imply one book equals one parameter, one fact or one piece of knowledge.

### Viewer leaves with

The model is physically enormous.

---

## Frame 03 — Make the number feel huge

### On screen

Library becomes an exaggerated corridor of shelves disappearing into the distance.

Narrator becomes tiny beside it.

Very little text. The perspective does the teaching.

### Viewer leaves with

320B feels large rather than merely sounding large.

---

## Frame 04 — Only a small part wakes up

### On screen

The `"scared"` token arrives as a task card.

Only a small region of the giant library wakes up and moves. The rest becomes visually quiet.

Brace:

`~18B ACTIVE`  
`about 5.6%`

### Narration meaning

"Active" means participating in the forward path for this token. The rest still exists.

### Viewer leaves with

One token uses only a small part of the total model at once.

---

# Frames 05–08 — Explain the expert selection

## Frame 05 — The rest is not useless

### On screen

Left: the parameter field with the small active region still visible.

Right: a large crowd representing the expert choices inside a sparse MoE layer.

Label:

`288 ROUTED EXPERTS`

Small note:

`waiting until needed`

The transition should visually feel like capacity being reorganized into expert networks, not unrelated characters appearing from nowhere.

### Accuracy

`288 routed experts` is **per sparse MoE layer**. Do not say the whole 320B model literally equals these 288 characters.

---

## Frame 06 — Meet the router

### On screen

`"scared"` task card → `ROUTER` → expert field.

The router visually behaves like a dispatcher: it receives the task, scans/scores choices and points toward selected experts.

Experts use neutral badges such as `12`, `47`, `89`, `103`, `211`.

### Narration meaning

The router technically scores experts from the token's **current hidden representation**. The task card is only the visual stand-in.

### Viewer leaves with

The router decides which expert paths are used.

---

## Frame 07 — One token, a small team

### On screen

Exactly:

`TOP 8 ROUTED + 1 SHARED`

Eight routed experts work. One shared expert is visibly distinct and also works.

Small work motion is allowed: desk/paper movement, bobbing, tiny reaction marks.

Quiet note:

`expert selection is one part of the model's active path`

### Accuracy

Never write or imply:

`8 experts = 18B parameters`

The 18B figure is the approximate active parameter path across the entire model.

---

## Frame 08 — Different tokens, different selections

### On screen

Split composition:

- `"scared"` → one neutral-ID expert team
- `"calculate"` → a different neutral-ID expert team

Caption:

`Same model. Different selections.`

### Viewer leaves with

The selected expert set is not one permanent small sub-model.

---

# Frames 09–13 — Create the memory question

## Frame 09 — A new question

### On screen

Left:

`"scared"` → Router → small active expert team.

Right:

Huge `MODEL WEIGHTS` shelf/building labelled `Hundreds of GB`.

Narrator thinks:

`If only a few are working...`

### Viewer leaves with

Sparse compute and total stored model size are different things.

---

## Frame 10 — The memory problem

### On screen

Small active working set beside a small `RAM / VRAM` office.

Next to it, the much larger `FULL WEIGHT POOL` remains visible.

Badge:

`THE MEMORY QUESTION`

### Accuracy

This is a **question / simplified memory picture**, not a claim that every real runtime literally keeps only the active experts in GPU VRAM while all others sit on disk.

Real inference can shard, cache, offload and split weights across devices and host memory.

### Viewer leaves with

The giant weight pool does not vanish just because sparse compute selected a small path.

---

## Frame 11 — Keep only what we need?

### On screen

The obvious proposed solution becomes visual:

Router selects the team → arrow labelled `Load only these` → small `RAM / VRAM` office.

Most of the model remains stored elsewhere.

Narrator is hopeful.

### Viewer leaves with

The tempting hypothesis feels simple and reasonable.

---

## Frame 12 — The router already knows

### On screen

Router points at a selected subset inside the full weight pool.

A dashed selection box isolates those experts.

Arrows lead from that selected subset into the RAM / VRAM office.

### Viewer leaves with

The viewer can now formulate the question themselves:

"If the router selects the experts, why not load only those experts?"

---

## Frame 13 — The idea looks so simple

### On screen

A clean left-to-right machine:

`HOME / STORAGE` → `ROUTER` → `SELECTED EXPERTS / WORKING MEMORY` → warning gate → `smaller machine?`

Experts at home are visibly resting. Only the selected few work in the office.

The warning / blocker appears, but its cause is **not** explained.

Handwritten question:

`So why doesn't this just work?`

### Viewer leaves with

The exact headache the rest of the video must earn the answer to.

---

# Frame 14 — Go inside

## On screen

Left: intimidating stack headed `Full model architecture`.

Right: warm glowing doorway labelled:

`INSIDE THE MODEL`

The `"scared"` task card begins moving toward the doorway.

Question stays visible long enough to land:

**So why doesn't this make a 320B model easy to run on a much smaller machine?**

### Viewer leaves with

We are now going inside to discover what prevents the simple storage → selected expert → working memory idea from being trivial.

---

# Non-negotiable accuracy rules

1. One book is **not** one parameter/fact. The library is a scale metaphor.
2. `288 routed experts` is a per-sparse-layer configuration, not the entire 320B model.
3. `top 8` does **not** equal `18B`.
4. Experts never receive semantic subjects like Math, Coding, Safety or Emotion.
5. The router technically acts on the current hidden representation, not raw English text.
6. Do not claim all 320B weights must always be in GPU VRAM.
7. Section 01 does not reveal the bandwidth/latency answer.
8. Static composition must pass before animation polish.

# Implementation / QA rule

Every frame must be directly addressable with:

`/section-01?frame=N`

Review the frozen composition first. Motion is secondary.

The V2 implementation deliberately keeps four persistent scene worlds mounted:

- model/library — frames 1–4
- experts/router — frames 5–8
- memory hypothesis — frames 9–13
- go inside — frame 14

Within each world the same visual objects persist/reconfigure instead of turning the section into fourteen unrelated web pages.
