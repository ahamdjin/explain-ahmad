# AI / contributor operating guide

Read this before changing anything.

This is a multi-film YouTube production repository. Shared skills define **how to tell and verify stories**; each film owns its **facts, narration, metaphor, and visual identity**.

A change that compiles can still be wrong.

## 1. Pick the film first

### Video 1 — The 18 Billion Mystery

- narration: `video-script/video-1/`
- spine: `storyboard/video-1/STORY_SPINE.md`
- facts: `research/glm/`
- art direction: GLM paper world
- implementation: `src/videos/glm-320b/video-1/`

Video 1 has locked narration. Do not rewrite it to make code easier.

### Video 2 — Nobody Told It To Do This

- narration: `video-script/video-2/SCRIPT.md`
- spine: `storyboard/video-2/STORY_SPINE.md`
- facts: `research/apollo/GROUND_TRUTH.md`
- art direction: `art-direction/VIDEO_2_INCIDENT_REPLAY.md`
- storyboard: `storyboard/video-2/STORYBOARD.md`
- implementation: **not built yet**

Video 2 is canonical pre-production but narration is not locked yet.

## 2. Authority order inside a film

When files disagree:

1. **APPROVED NARRATION — LOCKED**, if present
2. film story spine
3. film factual grounding / primary research
4. shared story and teaching skills
5. film-specific art direction
6. storyboard
7. executable implementation

Implementation never gets to redefine story or facts.

## 3. Film isolation rule

**Do not make a new video by reskinning the previous one.**

Shared:

- story gates
- teaching principles
- spatial continuity principles
- QA/checking methods
- invisible technical primitives when useful

Not automatically shared:

- metaphor
- palette semantics
- recurring actors
- camera grammar
- composition templates
- beat density
- visual motifs

Before reusing a visible component from another film, ask: **would a viewer recognize this as the previous video's visual language?** If yes, do not reuse it unless Ahmad explicitly wants continuity.

Video 2 specifically must not inherit Video 1's paper-world/token/tower/expert visual identity.

## 4. Story standard

Read:

- `skills/STORY_STRUCTURE.md`
- `skills/PRODUCTION_ORDER.md`
- `skills/SPATIAL_CONTINUITY.md`
- `skills/BEAT_GRANULARITY.md`
- `skills/FRAME_COMPOSITION.md`
- `skills/DIAGRAM_GRAMMAR.md`

Before art, define:

- **Want**
- **Wall**
- **Thesis**
- **Claim on trial**

Every section needs:

- **Enters on**
- **Answers**
- **Event**
- **Exits on**

Run the five gates:

1. circularity
2. event
3. escalation
4. setup/payoff
5. link

Use headache before aspirin.

Prefer:

`ORIENT → SHOW → EXPLAIN → CONNECT`

Let viewers answer what they can know, predict what they can reason about, and teach what they cannot know.

## 5. Narration lock

Once Ahmad marks narration **APPROVED NARRATION — LOCKED**, spoken wording outranks implementation.

You may change beats, timing, camera, components, animation and SFX.

You may not silently paraphrase, shorten, add VO, remove human lines, or change the running example.

Only factual/safety correction justifies reopening locked words, and it must be flagged first.

## 6. Factual discipline

For technical/research films, primary sources outrank convenient storytelling.

Video 2 has extra red lines:

- do not conflate separate Apollo scenarios;
- do not claim real model weights were copied;
- do not present consumer ChatGPT as the evaluated system;
- do not infer fear, consciousness or a survival desire;
- do not present our causal reconstruction as hidden chain-of-thought;
- always contextualize rates by the deliberately eliciting evaluation setup.

If a spicy line needs a false fact, the line loses.

## 7. Frame and continuity rules

- one beat = one meaningful move
- one frame = one visual job
- every beat has a clear where + change
- persistent objects keep identity
- camera movement establishes place changes
- freeze-frame must read without motion
- preserve the causal middle: object → operation → change → destination
- panels may leave; world objects should persist

## 8. Safe workflow

Story/fact change:

1. verify sources
2. fix spine/script at the cheapest layer
3. only then adapt storyboard/implementation

Visual-only change:

- do not alter locked narration
- respect that film's art-direction file

New video:

1. create its own research folder
2. create its own story spine
3. create canonical script
4. define a film-specific visual language
5. storyboard
6. only then implement

## 9. Verification

For implemented code:

```bash
npm ci
npx playwright install chromium
npm run verify
```

For visual work, inspect actual frames/contact sheets. CI does not judge beauty, hierarchy, pacing or metaphor quality.

Read `docs/QA.md`.

## 10. Repository hygiene

- Git history is the archive; rejected scripts do not stay beside canon.
- Generated renders/frames stay out of source.
- Keep film-specific pre-production clearly separated by video number.
- Do not create a Video 2 executable route until its narration/storyboard are approved enough to implement.
