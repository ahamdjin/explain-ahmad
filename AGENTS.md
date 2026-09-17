# AI / contributor operating guide

Read this file before changing anything in this repository.

This repo is not a generic React playground. It is the production source for **The 18 Billion Mystery**, a narration-led visual explainer. Story, factual truth, narration, visual continuity and verification all have explicit sources of truth. A change that compiles can still be wrong.

## 1. Start here — authority order

When files disagree, use this order:

1. **Approved/locked narration** — `video-script/video-1/`
2. **Story spine and section chain** — `storyboard/video-1/STORY_SPINE.md`
3. **Factual grounding** — `research/glm/`
4. **Story/teaching/continuity rules** — `skills/`
5. **Visual language** — `art-direction/`
6. **Executable implementation** — `src/videos/glm-320b/video-1/`

Implementation does not get to redefine the story or facts.

Before substantial work, read:

- `skills/STORY_STRUCTURE.md`
- `skills/PRODUCTION_ORDER.md`
- `skills/SPATIAL_CONTINUITY.md`
- `skills/BEAT_GRANULARITY.md`
- `skills/FRAME_COMPOSITION.md`
- `skills/DIAGRAM_GRAMMAR.md`
- `storyboard/video-1/STORY_SPINE.md`
- the relevant section file in `video-script/video-1/`
- the relevant factual source in `research/glm/`

## 2. The story standard

Do not build art for a broken story.

### Whole-video spine

Before sections, the video needs all three:

- **Want** — what the protagonist/viewer wants to do and cannot.
- **Wall** — the verified reason it cannot be done.
- **Thesis** — the one thing the viewer should be able to retell later.

A claim on trial is stronger than a vague curiosity. Every section should provide evidence, create a consequence, or move the claim toward resolution.

### Every section must declare

- **Enters on** — the question inherited from the previous section.
- **Answers** — what this section actually resolves.
- **Event** — what happens; not merely what the narrator says.
- **Exits on** — the new question created by the answer.

`Exits on` must differ from `Enters on`, and the next section must pick it up.

### Five story gates

1. **Circularity** — do not ask the same question again in new words.
2. **Event** — something must change, fail, surprise, move or get tested.
3. **Escalation** — the exit question should only become possible because this section happened.
4. **Setup/payoff** — important events should matter later; decoration is not structure.
5. **Link** — land the previous answer with a **therefore**, then create new trouble with a **but**.

Use **headache before aspirin**: let the viewer feel the problem before giving the fix.

### Teaching rhythm

Prefer:

`ORIENT → SHOW → EXPLAIN → CONNECT`

Let viewers answer what they can know, predict what they can reason about, and simply teach what they cannot possibly know.

Use concrete examples before abstractions. Use function before terminology. Keep the same running object/example when possible instead of resetting the mental model.

## 3. Narration lock is absolute

If a section is marked **APPROVED NARRATION — LOCKED**, its spoken words outrank the implementation.

You may change beat count, timing, camera, composition, components, animation and SFX to support the narration.

You may **not** silently paraphrase, shorten, add explanatory VO, remove human lines/questions/jokes, or change the running example just because the implementation is inconvenient.

If visuals disagree with approved narration, **change the visuals**.

Only a factual or safety correction justifies reopening locked narration. Flag it and propose the smallest correction before changing the words.

## 4. Beat and frame rules

- One beat = one meaningful move.
- Avoid introducing two new nouns in one beat.
- Every beat needs a clear **where** and **what changes**.
- Camera movement is what establishes a place change.
- Persistent world objects should persist; do not remount the world as a slideshow.
- Panels/temporary explanations may leave when their teaching job is over.
- One frame = one visual job.
- The frozen frame must make sense without motion.
- Prefer scale, marks, braces, arrows and numbers over sentences that duplicate VO.
- Preserve object identity across transformations.
- Do not skip the causal middle of a diagram: current object → operation → change → next destination.

## 5. Active implementation anatomy

Each active section lives at:

`src/videos/glm-320b/video-1/section-NN/`

- `SectionNN.tsx` — section director / playback wrapper
- `beats.ts` — executable beat sequence, VO, durations and events
- `scene.ts` — scene state and verbs
- `Stage.tsx` — rendered composition

Shared paper-world actors and primitives live in `src/paper/`. Reuse them before inventing new one-off visual systems.

## 6. Safe change workflow

### Story or narration change

1. Read `STORY_STRUCTURE.md`.
2. Change the canonical script/story source first.
3. If narration is locked, do not alter it without explicit approval.
4. Adapt beats and visuals afterward.

### Visual-only change

Do **not** change narration. Adjust `scene.ts`, `Stage.tsx`, timing, camera or shared actors as needed.

### Factual change

Verify against `research/glm/` (and primary sources when research is being updated). Then make the smallest script/visual correction necessary.

## 7. Verification — definition of technically safe

Install once:

```bash
npm ci
npx playwright install chromium
```

Run before calling production work done:

```bash
npm run verify
```

That includes story/narration/static checks, TypeScript/build, route smoke tests and the visual-overlap gate.

For visual work, machine checks are **not enough**. Capture and inspect the frames:

```bash
npm run frames:sNN
npm run sheet -- --section=section-NN
```

Read `docs/QA.md` for what every gate catches and what it cannot catch.

### Overlap allowlist rule

`scripts/accepted-overlaps.json` is for intentional geometry only. Never add an entry just to silence a failure. Every entry needs a concrete reason and should be visually verified. If an overlap is accidental, fix the composition.

## 8. What automation cannot judge

Passing CI does not prove:

- the frame is beautiful
- visual hierarchy is good
- pacing feels good
- an explanation is emotionally engaging
- a metaphor is intuitive
- an intentional overlap actually looks good

The final visual review is a human/contact-sheet pass at rendered output. Source-code inspection is not a substitute.

## 9. Repository hygiene

- Git history is the archive. Do not restore rejected cuts beside current work.
- Generated frames/renders and local VO/mixes are ignored.
- Keep only chosen production assets and provenance in Git.
- Do not duplicate a shared prop; check `src/paper/`, `skills/ASSET_LIBRARY.md` and `assets/` first.
- Internal labs/examples are references, not alternate production versions.

## 10. Current film identity

Internal name: **The 18 Billion Mystery**

YouTube title: **320B Parameters, Only 18B Active — Why Does It Need 8 GPUs?**

Production route:

`/320b-parameters-only-18b-active-why-does-it-need-8-gpus`

Clean capture: append `?chrome=0`.

If you are unsure whether a proposed change preserves story, narration, facts or continuity, stop at the cheapest layer and resolve that before building deeper.