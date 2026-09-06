# Explain Ahmad — Storytelling Engine

A reusable React/Vite system for building interactive YouTube explainers.

## Current phase

We are building the **library and structure only**.

Real video pages are not created until the actual script/story is supplied.

North star:

> **The interface should disappear into the explanation.**

A viewer should feel like they are manipulating an idea, diagram, character, system, or simulation — not operating a website.

## Library routes

- `/` — internal module library
- `/styles` — art-direction reference
- `/lab/:demo` — capability demos/tutorials
- `/<video-slug>` — reserved for real videos, registered only when the story exists

The real-video registry lives in `src/videos/registry.tsx` and intentionally starts empty.

## Scene rules

- one authored scene = `100vw × 100vh`
- diagram/visual usually carries most of the explanation
- text is normally short: labels, numbers, questions, one-line narration
- UI controls are allowed only when they teach, compare, control, reveal, or explore
- visible buttons belong near the object/decision they affect
- big typography is optional, not the default
- no decorative neon/glow/glass styling by default
- white/off-white + black ink is the visual foundation; accents are restrained
- paper/sketch is a favored art direction, not a global lock

See `docs/EXPLANATION_DESIGN.md` and `docs/VISUAL_SYSTEM.md`.

## Core interaction languages

- Ncase-style click / Continue / choice stories
- native section snap
- exact one-gesture-one-scene paging
- shared-element scene replacement
- continuous scrollytelling
- simulations and drag/manipulation
- diagrams, signal flow and camera/focus

No single interaction mode is forced onto every story.

## Visual modules

Installed reusable capabilities include:

- Rough.js
- Rough Notation
- perfect-freehand
- Lucide React through semantic `VisualIcon`
- XYFlow / React Flow for complex graph scenes
- Motion
- GSAP specialist tools
- Lenis, opt-in only
- react-kino optional helpers

Future heavy engines such as Rive, Lottie, Three.js/WebGL/WebGPU stay uninstalled until a real story needs them.

## Explanation-first primitives

- `SceneFrame`
- `VideoPage`
- `DiagramStage`
- `DiagramLabel`
- `StoryNote`
- `StoryButton`
- `VisualIcon`
- `SketchShape`
- `SketchArrow`
- `SketchAnnotation`
- `HandDrawnStroke`
- `FlowDiagram`
- `VisualStage` / layers / masks / media
- `SignalFlow`
- `Camera`
- `DragGrid`

## Recording controls

- `P` — presenter mode
- `F` — fullscreen
- `?present=1` — start in presentation mode
- keyboard navigation remains available where a scene supports it

## Run

```bash
npm install
npm run dev
```

## Upstream / inspiration

- Nicky Case — *The Evolution of Trust* (CC0-1.0)
- Nicky Case — *Parable of the Polygons* (CC0-1.0)
- Nicky Case — *LOOPY* (CC0-1.0)

See `NCASE_CREDITS.md` and `THIRD_PARTY.md` for provenance.
