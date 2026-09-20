# Project structure — production

This repository now has one implemented film and one canonical pre-production film.

## Video 1 — implemented

```text
video-script/video-1/          locked/current narration
storyboard/video-1/            spine, board, vocabulary
research/glm/                  factual grounding
art-direction/                 GLM paper-world references
src/videos/glm-320b/video-1/   executable film
```

## Video 2 — pre-production

```text
video-script/video-2/
  README.md
  TITLE.md
  SCRIPT.md

storyboard/video-2/
  README.md
  STORY_SPINE.md
  STORYBOARD.md

research/apollo/
  GROUND_TRUTH.md

art-direction/
  VIDEO_2_INCIDENT_REPLAY.md
```

There is intentionally **no Video 2 executable source yet**. Do not create one by copying `src/videos/glm-320b/video-1/`. The visual implementation should be designed from Video 2's Incident Replay art direction after the narration/storyboard is approved.

## Shared production systems

```text
skills/                 story, teaching, continuity, composition and QA
scripts/                checks, frames, render, VO timing and SFX tooling
assets/                 chosen production assets
docs/                   QA / workflow documentation
```

`src/paper/` is a Video 1 visual system. It is not the default visual system for future films.

## Current public routes

Only Video 1 is implemented and routed publicly:

- `/`
- `/320b-parameters-only-18b-active-why-does-it-need-8-gpus`
- direct `/section-NN` QA/render routes

Video 2 has no production route yet.

## Working-tree rule

The working tree contains current canon. Rejected scripts/cuts belong in Git history.
