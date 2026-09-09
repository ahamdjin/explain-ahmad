# Section 01 — Locked Storyboard v2

Status: **LOCKED STORYBOARD STRUCTURE.** This replaces the old 14-frame storyboard for Section 01.

This file is the visual contract for the intro. Implementation is not allowed to improvise away from it.

## Teaching goal

By the end of Section 01, the viewer should understand four things:

1. GLM-5.3-Flash is huge: `320B total parameters`.
2. For one token, only about `18B parameters are active`.
3. MoE routing means only a small expert path works at a time.
4. That creates the obvious question: **why not keep the unused experts in storage and load only the selected ones?**

The section must **create that headache, not answer it**.

## Audience rule

Target viewer: roughly 15+.

Visual standard: a five-year-old should be able to follow the physical story with the sound off.

At any moment, the viewer should be holding at most **3–4 ideas**. If a beat introduces more, split it.

## Visual-language rule

The narration uses the correct technical nouns. The visuals use familiar physical metaphors to explain what those nouns do.

- parameters / learned capacity → giant library / books
- token → task card
- router → dispatcher / manager-like character, still labelled `ROUTER`
- experts → workers / teachers with neutral identities
- storage → home / warehouse
- RAM / VRAM / fast-access memory → office / working space

The metaphor is visual grammar, not literal technical equivalence.

## Production rule

Before animation, every beat must work as a frozen frame.

The coded frame should read like the approved storyboard even with motion disabled.

No generic slide replacement. Objects persist and transform when the story says they are the same thing.

---

# Scene A — Make 320B → 18B physically understandable

## Beat 1 — Meet the model

### On screen

A clean paper model-information sheet, closely matching the original approved first-frame composition.

Main title: `GLM-5.3-Flash`

Rows can include:

- Architecture — Mixture of Experts
- Total parameters — **320B**
- Active parameters — **18B**
- Experts — 288 routed per sparse layer + 1 shared
- Layers — 45

Only `320B` and `18B` get strong visual emphasis. The other rows are supporting texture, not new teaching obligations.

Narrator stands beside the sheet.

### Change

Nothing moves yet except a tiny entrance/settle. Give the viewer time to register the two numbers.

### Narration anchor

> “GLM-5.3-Flash has 320 billion parameters, but only about 18 billion are active for one token.”

### Viewer owns

`320B total` vs `18B active`.

---

## Beat 2 — Turn the number into a physical world

### On screen

The `320B` row expands out of the information sheet into a huge library/building of shelves.

A small plaque remains: `320B TOTAL PARAMETERS`.

Books represent learned capacity. Do **not** imply one book equals one parameter.

### Change

Model sheet recedes or folds into the library title plaque. The library becomes the dominant world.

### Narration anchor

> “To make that scale easier to see, imagine the model’s learned capacity as a giant library.”

### Viewer owns

The total model is enormous.

---

## Beat 3 — Make 320B feel enormous

### On screen

Camera pulls back.

Shelves continue far beyond the first visible wall. Repetition, depth and scale do the teaching. Narrator becomes physically tiny beside it.

No new labels except `320B TOTAL`.

### Change

Only scale changes. No new concept.

### Narration anchor

> “And 320 billion is a very, very large library.”

### Viewer owns

The size emotionally, not just numerically.

---

## Beat 4 — One token arrives

### On screen

A paper task card enters carrying the token `"scared"`.

As it arrives, only a small region of the library wakes up:

- books open
- tabs pop out
- small movement begins
- orange/blue emphasis appears

Everything else remains visually quiet.

Label the lit region: `~18B ACTIVE`.

### Change

One task enters → only a small subset wakes.

### Narration anchor

> “For this token, only about 18 billion parameters actually participate.”

### Viewer owns

One token uses only a small part of the whole model.

---

## Beat 5 — Define “active” visually

### On screen

Hold the exact same library composition.

The active books are visibly doing something: open pages, movement, small working marks.

The rest are closed, still and dimmed.

Small handwritten labels are enough:

- `working now`
- `not used for this token`

No new architecture.

### Change

The distinction becomes behavioral rather than merely color-coded.

### Narration anchor

> “Active just means these are the parameters participating in this forward pass. The rest still exist; they just aren’t being used for this token.”

### Viewer owns

`active` means participating now, not permanently belonging to a smaller model.

---

# Scene B — Show the expert mechanism without rushing it

## Beat 6 — Bridge from library to experts

### On screen

The library does **not** instantly disappear into characters.

First, shelf sections visibly group into repeated compartments / departments.

A magnified paper window or callout says:

`ZOOM INTO ONE SPARSE MoE LAYER`

Inside that representative layer, the grouped capacity begins turning into expert stations.

### Change

Books → grouped capacity → expert stations.

This beat exists specifically to avoid the old confusing jump from “inactive parameters” directly to “288 experts.”

### Narration anchor

> “GLM is a Mixture-of-Experts model. In its sparse MoE layers, much of the feed-forward capacity is organized into many expert networks.”

### Viewer owns

The expert system is how the model organizes selectable compute.

---

## Beat 7 — Meet the experts

### On screen

The representative MoE layer is now an expert workplace.

Show a dense crowd of workers/teachers with neutral identities.

Visible label:

`288 ROUTED EXPERTS + 1 SHARED EXPERT`

The shared expert is visually distinct and always at a desk.

Do not give experts semantic job titles such as Math, Coding, Emotions, Safety, etc.

### Change

The grouped stations finish becoming the expert population.

### Narration anchor

> “In one sparse layer, there are 288 routed experts, plus a shared expert.”

### Viewer owns

There are many expert choices available.

---

## Beat 8 — The router receives the task

### On screen

The `"scared"` task card moves to a dispatcher-like character at a desk.

The desk / badge clearly says `ROUTER`.

The character can look like a manager/principal/dispatcher visually, but we never rename the technical mechanism.

The router scans/scores the expert field.

### Change

Task → router → score sweep across experts.

Do not insert a separate “who decides?” beat. The goal here is explanation, not another mystery.

### Narration anchor

> “The router scores the experts for the token’s current representation.”

### Viewer owns

The router chooses which expert paths to use.

---

## Beat 9 — Only a small team works

### On screen

Exactly 8 routed experts light up and move to working desks.

The shared expert is already present and joins the work.

The rest of the expert population stays visible but quiet.

Selected workers should visibly work:

- papers moving
- pencils / tools
- small head/hand motion
- task card being passed through

Label:

`TOP 8 ROUTED + 1 SHARED`

Quiet margin note:

`expert selection is one part of the model's active path`

### Change

Many available → small selected working team.

### Narration anchor

> “The router activates the top eight routed experts, while the shared expert also participates.”

### Viewer owns

Most expert capacity exists, but only a few experts work on this token in this sparse layer.

---

## Beat 10 — Make the 18B idea click

### On screen

Pull back slightly so the relationship is obvious:

- huge available expert population
- tiny working team
- task moving through the selected team

Bring back the earlier visual callback:

`~18B ACTIVE ACROSS THE MODEL`

Do **not** visually write `8 experts = 18B`.

### Change

The local expert selection connects back to the global `320B vs 18B` fact from Beat 1.

### Narration anchor

> “This sparse routing is a big reason the model can have enormous total capacity while the active path for a token is much smaller.”

### Viewer owns

They now understand what “only 18B active” means at a conceptual level.

---

# Scene C — Create the memory headache

## Beat 11 — The strange running-memory picture

### On screen

Transition from expert workplace into the memory metaphor.

The expert population is represented as being **available to the running model** in a large working-memory world.

Use the office metaphor:

- office = `RUNNING MEMORY / FAST-ACCESS WEIGHTS`
- many experts are present / available
- only the selected team is actually working

A nearby `HOME / STORAGE` world also exists, but it is not yet the proposed solution.

### Change

Expert-selection explanation becomes a memory question without introducing Transformer floors yet.

### Narration anchor

> “But here’s the strange part. Even though only a small path is computing, the full model still has a huge pool of weights that has to remain accessible to the runtime.”

### Viewer owns

Sparse compute does not make the rest of the model disappear.

---

## Beat 12 — The obvious idea

### On screen

Narrator looks at all the idle experts occupying the working-memory world.

Then the visual proposes the simple solution:

Inactive experts leave the office and go `HOME / STORAGE`.

The office becomes dramatically smaller and calmer.

Only the currently selected working team remains.

The narrator looks pleased because the idea feels obvious.

### Change

Full available pool in working-memory world → most experts moved home.

### Narration anchor

> “So why not leave the experts we aren’t using in storage and keep only the small team we need in working memory?”

### Viewer owns

The tempting hypothesis.

---

## Beat 13 — Test the hypothesis cleanly

### On screen

A fresh token/task arrives.

The router receives it.

The router selects 8 routed experts.

Those selected experts are visually called from `HOME / STORAGE` into the `OFFICE / WORKING MEMORY`.

They arrive, sit down and work.

Everyone else stays home.

Keep this machine beautiful and simple. Do **not** show the failure yet.

### Change

Router choice → selected experts travel in → work begins.

### Narration anchor

> “The router picks the experts. We load those experts. They do the work. Everyone else stays in storage.”

### Viewer owns

The proposed system feels like it should work.

---

## Beat 14 — The headache / cliffhanger

### On screen

Freeze on the elegant simplified system from Beat 13.

Do not jam it yet. Do not show layer-by-layer routing. Do not reveal bandwidth or latency.

A large handwritten question lands over the scene:

**`So why doesn't this make the model easy to run on a much smaller machine?`**

Then a simple doorway / arch appears at the edge of frame:

`INSIDE THE MODEL`

The task card starts moving toward it.

### Change

The proposed solution remains visually convincing, but the unanswered question now hangs over it.

### Narration anchor

> “It sounds obvious. So if that doesn’t make a 320-billion-parameter model easy to run on a much smaller machine… what exactly is stopping us? To answer that, we have to go inside.”

### Viewer owns

The exact headache that earns the rest of the video.

---

# Cognitive-load checkpoints

At the end of Beat 5, the viewer should only be holding:

- 320B total
- ~18B active
- active means participating now

At the end of Beat 10:

- MoE has many experts
- router selects a small expert team
- only a small path works at once

At the end of Beat 14:

- full expert pool still exists
- storage is cheap; working memory / fast access is precious
- obvious idea: load only selected experts
- unresolved question: why is that not easy?

Nothing about tokenization, embeddings, attention, repeated routing across layers, bandwidth, cache behavior or next-token prediction belongs in Section 01.

---

# Accuracy guardrails

These are non-negotiable even if the visuals are metaphorical.

1. **Do not imply one book = one parameter or one fact.** Knowledge is distributed across learned weights.
2. **Do not imply all 320B parameters are literally contained in 288 experts.** `288 routed experts` is a per-sparse-layer configuration. The model also has shared and always-used components.
3. **Do not imply `8 experts = 18B parameters`.** The 18B active figure is the approximate active parameter path across the model, not a direct multiplication of top-8 experts.
4. **Experts do not get human-readable subjects.** Neutral IDs/badges only.
5. **The router technically reads the current hidden representation.** The task card is a visual stand-in, not a claim that it reads raw English text.
6. **Do not claim all model weights must always live in GPU VRAM.** Real runtimes can shard, offload, cache and use RAM/VRAM differently. The truthful intro claim is that the full weight pool still exists and efficient inference needs fast access to whichever weights are selected.
7. **Do not reveal the answer in this section.** No layer-by-layer commute jam, bandwidth bottleneck or routing-repeat explanation before Section 08.

---

# Visual quality bar

The current `/section-01` implementation proved the scene architecture can be clean, but its motion and narrator artwork are not the visual target.

For the rebuild:

- keep the clean spacing and authored composition
- keep persistent scene objects
- keep staged reveals
- improve the narrator artwork
- use sourced assets only where they are genuinely better than custom SVG/code
- allow code/SVG for libraries, desks, paths, offices, shelves, fields, annotations and mechanism pieces
- animation comes **after** frozen-frame approval

The storyboard is not “inspiration.” It is the specification.
