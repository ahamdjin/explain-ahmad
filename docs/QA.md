# Production QA and verification

This file explains the checks that protect the film. A green CI run means the build satisfies the automated contracts below; it does **not** mean the film has passed artistic judgment.

## One-command verification

```bash
npm ci
npx playwright install chromium
npm run verify
```

`npm run verify` runs:

```text
npm run check
npm run build
npm run smoke
npm run check:overlap
```

## Static/story gate: `npm run check`

This runs, in order:

- TypeScript (`tsc -b`)
- `check-board.mjs` — every built beat has a place/event and place changes are represented by camera movement.
- `check-vo.mjs` — executable beat VO agrees with the canonical script.
- `check-chain.mjs` — the 13-section story chain joins correctly: previous exit → next entry, every section answers and hands forward.
- `check-strategy.mjs` — cited storytelling/teaching strategies exist and are traceable to the strategy ledger.
- `check-flow.mjs --static` — structural flow checks, sticky/panel lifetime and frame-shape invariants.
- `timing.mjs` — spoken-word timing vs allotted beat time.
- `drift.mjs` — script beat counts and executable beat counts remain aligned.

These checks protect structure and synchronization. They cannot judge whether a frame is well composed.

## Build gate: `npm run build`

Runs TypeScript and a production Vite build. It catches compile/bundle failures; it does not validate story or composition.

## Runtime gate: `npm run smoke`

Launches the production build in Chromium and opens the public film route plus direct section/compatibility routes. It checks for:

- route failures
- browser console errors
- page errors
- failed requests
- guided navigation failures

## Visual collision gate: `npm run check:overlap`

Loads every beat after animation settling and compares visible actor bounding boxes. It catches accidental component/text collisions across the full film.

Intentional geometry is documented in `scripts/accepted-overlaps.json`.

### Allowlist policy

An accepted overlap must:

1. be intentional teaching/composition geometry, not a convenient exception;
2. have a specific written reason;
3. be visually checked on the rendered frame;
4. remain keyed tightly enough that a changed frame can fail again.

Never add an allowlist entry merely because the test is red.

## Human visual gate — mandatory after visual changes

Automated overlap detection is necessary but insufficient. Render the section and inspect the output:

```bash
npm run frames:sNN
npm run sheet -- --section=section-NN
```

Look for:

- weak hierarchy even with no literal collision
- labels floating away from the thing they describe
- clipped/off-frame content
- accidental empty space
- two simultaneous heroes
- frames that only make sense in motion
- temporary panels outliving their teaching job
- confusing identity changes between beats

For transition-specific problems, use `scripts/motion-strip.mjs` to sample intermediate animation states. A contact sheet catches end states; a motion strip catches wash-outs and ugly in-between states.

## What a green run does not prove

CI cannot decide whether the story hooks, the metaphor is good, the pacing feels right, the frame is beautiful or the teaching is intuitive. Those are governed by `skills/STORY_STRUCTURE.md`, `skills/PRODUCTION_ORDER.md`, `skills/FRAME_COMPOSITION.md` and human review of rendered output.

## CI

`.github/workflows/ci.yml` runs the same class of production verification on pushes and pull requests using Node 22 and Chromium. Treat CI as independent confirmation, not as the first time you run the gates.
