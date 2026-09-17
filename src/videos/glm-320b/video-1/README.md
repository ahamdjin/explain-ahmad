# The 18 Billion Mystery — executable film

This is the active implementation for Video 1. It contains 13 sections and is registered in `src/videos/registry.tsx`.

Canonical spoken/story sources live outside this folder:

- narration: `../../../../video-script/video-1/`
- story spine/board: `../../../../storyboard/video-1/`
- factual grounding: `../../../../research/glm/`

## Section anatomy

Every `section-NN/` contains:

- `SectionNN.tsx` — playback/director wrapper
- `beats.ts` — beat sequence, VO, duration/event metadata
- `scene.ts` — persistent scene state and transition verbs
- `Stage.tsx` — rendered composition

## Safe edit order

For a visual-only fix, keep VO unchanged and adjust scene/stage/timing. For a story/narration change, edit the canonical script/story source first and then adapt implementation. Never rewrite locked narration here to make the code easier.

After changing a section:

```bash
npm run check
npm run frames:sNN
npm run sheet -- --section=section-NN
npm run check:overlap
```

Before merge, run `npm run verify`.

The final visual judge is the rendered frame/contact sheet, not source code alone.
