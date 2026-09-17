# The 18 Billion Mystery

**YouTube title:** **320B Parameters, Only 18B Active — Why Does It Need 8 GPUs?**

This repository is the production source for one film. Rejected cuts and historical drafts belong in Git history, not beside the current build.

## AI / contributor start here

**Read `AGENTS.md` before changing story, narration, visuals or production code.** It defines source-of-truth order, story gates, narration lock, safe edit workflow and the required verification process.

Detailed test/QA behavior is documented in `docs/QA.md`.

## Open the film

Production route:

`/320b-parameters-only-18b-active-why-does-it-need-8-gpus`

The root `/` is a small guided landing page with **Open video**, **Play through**, and direct links to all 13 chapters. Inside the film, the compact **Chapters** button can jump anywhere without adding a permanent navigation bar to the artwork.

For clean recording/rendering, append `?chrome=0`. For automatic chapter-to-chapter playback, append `?play=1`. `?section=7` deep-links into a chapter.

The direct `/section-01` … `/section-13` routes are production tooling for frame capture and QA, not alternate versions of the film.

## Source of truth

1. Approved/locked narration: `video-script/video-1/`
2. Story promise and section chain: `storyboard/video-1/STORY_SPINE.md`
3. Factual grounding: `research/glm/`
4. Story/teaching/continuity rules: `skills/`
5. Visual language: `art-direction/`
6. Executable scenes: `src/videos/glm-320b/video-1/`

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
- `docs/` — QA, VO and sound workflow

Reusable labs/examples remain in `src/` as internal visual tooling, but they are not public production routes.

## Verify before production

```bash
npm ci
npx playwright install chromium
npm run verify
```

`npm run verify` checks TypeScript, board/story chain, narration alignment, strategy/flow/timing drift, the production build, every public/direct section route, and the visual-overlap allowlist.

For visual changes, also capture and inspect the relevant contact sheet. Automated gates do not judge composition or pacing. See `docs/QA.md`.

CI runs the same class of checks on every push and pull request.

## Production order

Story spine → section chain → narration → frames → animation → record VO → sync real timings → full render → final visual QA → SFX/music → final export.

Generated screenshots, renders and raw candidate media are ignored. Only source, chosen production assets and provenance stay in Git.
