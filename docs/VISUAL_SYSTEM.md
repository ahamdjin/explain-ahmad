# Explain Ahmad — Visual System

## Non-negotiable rules

1. One authored scene = one `100vw × 100vh` `SceneFrame`.
2. Default visual language is light: white / off-white surface, black ink, restrained accent.
3. No decorative neon glow, purple ambience, glassmorphism or tiny labels by default.
4. Readability and conceptual clarity beat visual novelty.
5. Art direction is chosen per video or scene. The engine does not force one look.
6. Heavy libraries are capabilities, not global dependencies at runtime. Import them only in routes/scenes that use them.
7. Every real video gets its own URL (`/attention`, `/moe`, `/hermes-agent`, ...).

## Art directions

### `paper`
Warm paper, black ink, imperfect geometry, hand-drawn annotations. This is the closest default to the charm of Nicky Case work without cloning its exact art.

### `clean`
Pure white, crisp black geometry, minimal accent. Best for high-density technical explanations.

### `editorial`
Large typography, asymmetry and magazine-like composition. Best for argument, narrative and creator-led videos.

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

`/` = library / launchpad

`/lab/:demo` = capability demos

`/<video-slug>` = a real video page

Starter examples:
- `/attention`
- `/moe`
- `/hermes-agent`
- `/styles`

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
