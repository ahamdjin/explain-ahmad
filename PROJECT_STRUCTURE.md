# Project structure — production

There is one current film: **The 18 Billion Mystery**.

## Film sources

```text
video-script/video-1/
  01-...md → 13-...md     approved/current narration + visual contracts
  READ_ALOUD.md            generated whole-film read-through
  TITLE.md                 canonical name/title

storyboard/video-1/
  STORY_SPINE.md            whole-film promise and section chain
  BOARD.md                  generated beat-by-beat board
  VOCABULARY_LEDGER.md      terminology discipline

src/videos/glm-320b/video-1/
  section-01/ ... section-13/
    SectionNN.tsx           section director
    beats.ts                executable beat/VO sequence
    scene.ts                scene state + verbs
    Stage.tsx               rendered composition
```

## Shared production systems

```text
src/paper/              paper-world actors, motion, overlays, prompt constants
art-direction/          cast, props, palette, paper-world rules
research/               factual grounding; GLM truth/tokenizer/offloading notes
skills/                 story, teaching, continuity, composition and QA rules
scripts/                checks, frames, render, VO timing and SFX tooling
assets/sfx/             chosen production sounds + provenance
public/vo/              local VO drop location; audio files are ignored
```

## Public routes

- `/` — guided film landing page
- `/320b-parameters-only-18b-active-why-does-it-need-8-gpus` — the film
- `?section=N` — jump to a chapter
- `?play=1` — play through chapters automatically
- `?chrome=0` — clean render/recording view
- `/section-01` … `/section-13` — direct QA/render routes

`/watch` and `/video-1` only redirect to the title route for old bookmarks.

## Internal visual toolkit

`src/components/`, `src/engine/`, `src/examples/`, `src/lab/`, `src/visuals/` and `src/vendor/` are reusable/reference tooling. They are deliberately not exposed by the production router.

## What is intentionally not in the working tree

- rejected scripts/cuts
- obsolete storyboard frame exports
- rendered MP4s and smoke screenshots
- raw SFX candidate downloads

Git history is the archive. The working tree should describe the film we are actually producing.
