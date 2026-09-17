# Scripts — production tooling and gates

These scripts are part of the production contract. Prefer the npm aliases in `package.json` when one exists.

## Verification scripts

- `check-board.mjs` — verifies every beat has explicit place/event structure and valid camera place changes.
- `check-vo.mjs` — canonical script ↔ executable VO alignment.
- `check-chain.mjs` — section answer/hand-off chain.
- `check-strategy.mjs` — strategy-ledger references and provenance.
- `check-flow.mjs` — static/visual flow invariants and actor/panel lifetime checks.
- `timing.mjs` — VO word-count timing against beat durations.
- `drift.mjs` — script/build beat-count drift.
- `smoke.mjs` — Chromium route/runtime/navigation smoke test.
- `check-overlap.mjs` — rendered bounding-box collision test across all beats.
- `accepted-overlaps.json` — explicit, reasoned exceptions for intentional geometry; never use as a dumping ground for failures.

Run the full suite with `npm run verify`. See `../docs/QA.md`.

## Storyboard/review generation

- `board.mjs` — generates the current beat-by-beat board.
- `readthrough.mjs` — generates the whole-film read-through.
- `capture-frames.mjs` — captures beat end-state frames.
- `contact-sheet.mjs` — turns captured frames into one visual review sheet.
- `motion-strip.mjs` — samples transitions to expose bad in-between states.
- `export-frames.mjs` — export/reuse frame sets.

Generated review output is reproducible and should not become source-of-truth material.

## Recording/rendering/audio

- `record.mjs` — browser-based production recording helper.
- `render.mjs` — render/join production output.
- `sfx-fetch.mjs` — retrieves candidate SFX under the project’s licensing rules.
- `sfx-cues.mjs` — creates effect cue timing.
- `sfx-track.mjs` — builds effect tracks.
- `restamp.mjs` — timing/restamp support.
- `palette.mjs` — palette inspection/tooling.
- `tokenize-glm.py` — tokenizer-specific research/verification helper.

Before modifying a check, understand the invariant it protects. Do not weaken a gate to make an implementation pass unless the rule itself is demonstrably wrong.
