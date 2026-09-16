# The 18 Billion Mystery

**YouTube title:** **320B Parameters, Only 18B Active — Why Does It Need 8 GPUs?**

This repository is the production source for one film. Rejected cuts and historical drafts belong in Git history, not beside the current build.

## Open the film

Production route:

`/320b-parameters-only-18b-active-why-does-it-need-8-gpus`

The root `/` is a small guided landing page with **Open video**, **Play through**, and direct links to all 13 chapters. Inside the film, the compact **Chapters** button can jump anywhere without adding a permanent navigation bar to the artwork.

For clean recording/rendering, append `?chrome=0`. For automatic chapter-to-chapter playback, append `?play=1`. `?section=7` deep-links into a chapter.

The direct `/section-01` … `/section-13` routes are production tooling for frame capture and QA, not alternate versions of the film.

## Source of truth

1. Approved/locked narration: `video-script/video-1/`
2. Story promise and section chain: `storyboard/video-1/STORY_SPINE.md`
3. Generated current board/read-through: `storyboard/video-1/BOARD.md`, `video-script/video-1/READ_ALOUD.md`
4. Executable scenes: `src/videos/glm-320b/video-1/`

If implementation disagrees with approved narration, implementation changes.

## Production structure

- `src/videos/glm-320b/video-1/` — the 13 executable sections
- `src/paper/` — shared paper-world actors, motion and visual grammar
- `video-script/video-1/` — narration and per-section visual contracts
- `storyboard/video-1/` — current story spine, generated board and vocabulary ledger
- `art-direction/` — visual language, cast and palette
- `research/` — factual grounding
- `skills/` — production/story/continuity rules
- `scripts/` — verification, frame capture, render and sound tooling
- `assets/sfx/` — chosen production SFX plus provenance
- `docs/` — VO and sound workflow

Reusable labs/examples remain in `src/` as internal visual tooling, but they are not public production routes.

## Verify before production

```bash
npm ci
npx playwright install chromium
npm run verify
```

`npm run verify` checks TypeScript, board/story chain, narration lock, strategy/flow/timing drift, the production build, every public/direct section route, and the visual-overlap allowlist.

CI runs the same class of checks on every push and pull request.

## Production order

Record VO → sync real timings → full render → final motion/visual QA → SFX/music → final export.

Generated screenshots, renders and raw candidate media are ignored. Only source, chosen production assets and provenance stay in Git.
