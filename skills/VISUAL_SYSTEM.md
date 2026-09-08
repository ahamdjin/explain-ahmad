# Explain Ahmad — Visual System

## North star

> The interface should disappear into the explanation.

See `EXPLANATION_DESIGN.md` for the full scene standard.

## Non-negotiable rules

1. One authored scene = one `100vw × 100vh` `SceneFrame`.
2. Default visual language is light: white / off-white surface, black ink, restrained accent.
3. No decorative neon glow, purple ambience, glassmorphism or tiny labels by default.
4. Readability and conceptual clarity beat visual novelty.
5. Art direction is chosen per video or scene. The engine does not force one look.
6. Heavy libraries are capabilities, not global dependencies at runtime. Import them only in routes/scenes that use them.
7. Real video pages are created only after the actual script/story is known.
8. Diagrams, simulations and visual objects should usually carry more explanatory weight than text.
9. Visible UI exists only when it teaches, compares, controls, reveals or explores the concept.

## Art directions

### `paper`
Warm paper, black ink, imperfect geometry, hand-drawn annotations. This is the closest default to the charm of Nicky Case work without cloning its exact art.

### `clean`
Pure white, crisp black geometry, minimal accent. Best for high-density technical explanations.

### `editorial`
Asymmetry and magazine-like composition when narrative presentation genuinely benefits from it. Large typography is optional, not assumed.

### `technical`
Light grid, structured diagrams, systematic spacing. Best for architecture, algorithms, model internals and data flow.

Add more art directions when a real video needs one. Do not mutate the engine to create a style.

## Installed visual capabilities

### Rough.js
Use for sketchy rectangles, circles, paths, arrows and imperfect SVG/canvas geometry.

### Rough Notation
Use for hand-drawn underline, circle, box, highlight, bracket and crossed-out text annotations.

### perfect-freehand
Use when a true pressure-like organic stroke is needed: scribbles, custom arrows, drawn paths, signature-like movement.

### Lucide React
Use as the generic icon source. Scenes should normally use `VisualIcon` semantic names (`router`, `memory`, `tool`, etc.) rather than importing raw icon names everywhere.

### XYFlow / React Flow
Use for real node/edge systems: large workflows, graphs, dependency networks, interactive architecture and complex routing diagrams. Do not use it for a three-box diagram that plain SVG can explain better.

### Motion / GSAP / Lenis
Keep opt-in. Motion for authored animation and scroll-linked values; GSAP for cases where its specialist tooling is worth it; Lenis only when a scene explicitly benefits from smooth inertial scroll.

## Visual primitives

- `SceneFrame` — full-screen authored scene and art direction boundary.
- `VideoPage` — route-level video wrapper.
- `DiagramStage` — open diagram-first canvas with no fake card/chrome.
- `DiagramLabel` — small readable label placed beside the thing it explains.
- `StoryNote` — short narration that supports the visual.
- `StoryButton` — contextual action; placement belongs to the story, not a global toolbar.
- `VisualIcon` — semantic icon registry over Lucide.
- `SketchShape` — Rough.js geometry.
- `SketchArrow` — sketch connector.
- `SketchAnnotation` — Rough Notation wrapper.
- `HandDrawnStroke` — perfect-freehand SVG stroke.
- `FlowDiagram` — XYFlow adapter for large graph scenes.
- Existing: `VisualStage`, `VisualLayer`, `MediaVisual`, `VisualMask`, `VisualScrim`, `SignalFlow`, `Camera`, `DragGrid`, etc.

## Navigation languages

Navigation and art direction are independent:

- Click / Continue (`StoryButton`, `StepController`, `Sequence`)
- Native section snap (`SnapStory`)
- Exact wheel/swipe paging (`GesturePager`)
- Scene replacement / shared object transitions (`SceneDeck`, `SharedElement`)
- Continuous scroll choreography (`PremiumScrolly`)

A paper scene can use continuous scroll. A clean scene can use click-to-continue. Do not couple the two concepts.

## Route policy

`/` = internal library / launchpad

`/styles` = art-direction reference library

`/lab/:demo` = capability demos and tutorials

`/<video-slug>` = a real video page, registered in `src/videos/registry.tsx` only after the script is known

The real-video registry intentionally stays empty while we are building the library.

## Future opt-in visual engines

Do not install until a real scene needs them:
- Rive state machines
- Lottie / After Effects exports
- Three.js / React Three Fiber
- WebGL/WebGPU shaders
- image-sequence scrubbing
- map/route engines
- physics/particles
- advanced SVG morphing

The goal is not maximum dependencies. The goal is maximum available storytelling range with minimum accidental complexity.
