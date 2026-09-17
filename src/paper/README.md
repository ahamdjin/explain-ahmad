# Paper world

Shared visual language used by the production film.

- `cast/` — recurring actors such as sentence/token representations, attention, expert/routing, tower, memory/cache and narrator elements.
- `props/` — reusable physical props.
- `director.tsx`, `scene.ts`, `slot.tsx`, `camera.tsx` — stage/state/geography infrastructure.
- `motion.ts`, `rail.tsx`, `overlays.tsx`, `marks.tsx`, `ink.tsx` — movement and annotation systems.
- `palette.ts` — semantic colors.
- `prompt.ts` — shared running-example constants.
- `sfx.ts` — production sound hooks/cues.

Rules:

- reuse existing actors before creating a new visual dialect;
- preserve object identity across beats;
- mount persistent world actors once and animate state rather than swapping whole frames;
- use semantic color consistently (active/current, routing, tracked/shared, questions, failures);
- temporary panels can leave, but world geography should remain coherent;
- visual primitives support the script — they do not justify rewriting approved narration.

Read `../../skills/SPATIAL_CONTINUITY.md`, `../../skills/DIAGRAM_GRAMMAR.md` and `../../art-direction/GLM_PAPER_WORLD.md` before adding a new production actor.
