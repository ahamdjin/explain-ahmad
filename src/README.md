# Source code map

Only one implementation is the active film: `videos/glm-320b/video-1/` (registered through `videos/registry.tsx`).

## Production-critical

- `videos/` — active film/chapter implementations and central registry.
- `paper/` — shared paper-world actors, props, motion, palette, camera and scene primitives.
- `routes/` — public film/landing routes and internal utility pages.

## Reusable/internal toolkit

- `components/` — generic explainer UI primitives.
- `continuity/` — persistent actor/scene-director helpers.
- `engine/` — scrolly/playback/presenter infrastructure.
- `examples/` — demonstrations of reusable interaction/visual patterns; not production routes.
- `lab/` — internal demo discovery/tools.
- `motion/` — motion tokens.
- `patterns/` — pattern catalogue.
- `scenes/` — generic scene prototypes.
- `visuals/` — reusable sketch/diagram primitives.
- `vendor/` — vendored/reference code; preserve provenance and avoid casual edits.

Production story/narration lives outside `src/`. Never treat text found in implementation as higher authority than `video-script/` and `storyboard/`.
