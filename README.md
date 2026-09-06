# Explain Ahmad — Storytelling Engine

A reusable React/Vite system for building deeply polished interactive YouTube explainers.

The goal is not one visual template. The goal is a reusable **storytelling arsenal**: navigation modes, motion systems, simulations, diagrams, sketch tools, icons, media layers and art directions that each video can combine differently.

## Core rules

- One authored scene = one `100vw × 100vh` `SceneFrame`.
- Every real video gets its own route: `/attention`, `/moe`, `/hermes-agent`, etc.
- White / off-white + black ink is the default visual foundation; accents are restrained.
- Paper/sketch is a preferred art direction, not a global style lock.
- No neon glow, purple ambience, glass effects or tiny unreadable diagram labels by default.
- Navigation, art direction and visual engine are separate decisions.
- Heavy capabilities are imported only by scenes/routes that need them.

## Routes

```text
/                 library / launchpad
/lab/:demo        capability demos
/attention        real video starter
/moe              real video starter
/hermes-agent     real video starter
/styles           art-direction gallery
```

React Router is used in SPA/declarative mode. Route components are lazy-loaded so video pages do not automatically pull every demo into their initial chunk.

## Art directions

`SceneFrame` currently supports:

- `paper` — warm paper, black ink, rough/sketch accents.
- `clean` — pure white, crisp technical geometry.
- `editorial` — large type and magazine-like composition.
- `technical` — light grid and systematic diagram language.

Add a new style pack when a real video earns one. Do not rewrite the engine to create a look.

## Visual library

Installed real modules:

- **Rough.js** — hand-drawn SVG/canvas geometry.
- **Rough Notation** — animated underline/circle/box/highlight/bracket annotations.
- **perfect-freehand** — organic pressure-like strokes.
- **Lucide React** — large generic SVG icon source, wrapped by semantic `VisualIcon` names.
- **XYFlow / React Flow** — large node/edge graphs and interactive workflow diagrams.

Reusable adapters/primitives include:

- `VisualIcon`
- `SketchShape`
- `SketchArrow`
- `SketchAnnotation`
- `HandDrawnStroke`
- `FlowDiagram`
- `VisualStage`, `VisualLayer`, `MediaVisual`, `VisualMask`, `VisualScrim`
- `SignalFlow`, `Camera`, `DragGrid`

Lucide icons are direct tree-shaken imports. The project does **not** import Lucide's full runtime icon registry into every video. The first implementation accidentally produced a 555 KB icon chunk; the corrected semantic adapter is ~39 KB minified in the current production build.

See `docs/VISUAL_SYSTEM.md` for usage policy.

## Navigation languages

- **Click / Continue** — `StoryButton`, `StepController`, `Sequence` for Ncase-style exact beats.
- **Native Snap** — `SnapStory` for full-screen section snapping.
- **Exact Gesture Paging** — `GesturePager`; one wheel/swipe gesture = one authored scene.
- **Scene Replacement** — `SceneDeck` + `SharedElement` for page changes that preserve visual continuity.
- **Continuous Scrollytelling** — `PremiumScrolly` for scrubbed 0→1 progress, camera, masks and depth.

## Motion policy

Motion, GSAP and Lenis are not the identity of the engine.

- Motion is used where authored animation/scroll-linked values help explain.
- GSAP is lazy-loaded only by specialist primitives that currently need Observer or SplitText.
- Lenis is lazy-loaded only inside `SmoothScroll` when a scene deliberately opts in.
- Native browser behavior remains the default.

## Existing explorable references

The engine also studies/reuses selected CC0 interaction patterns from Nicky Case:

- *The Evolution of Trust*
- *Parable of the Polygons*
- *LOOPY*

See `NCASE_CREDITS.md` for provenance and `THIRD_PARTY.md` for the broader module list.

## Run

```bash
npm install
npm run dev
```

## Recording

- `P` — presenter mode
- `F` — fullscreen while presenting
- `?present=1` — start in presenter mode
- `Space` / arrows — supported by exact-step scenes

Compilation is only the first gate. Final quality still requires rendered visual QA: spacing, type, icon choice, diagram scale, transitions, timing and composition are tuned per video.
