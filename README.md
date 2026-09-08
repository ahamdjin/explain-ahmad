# Explain Ahmad — Storytelling Engine

A reusable React/Vite system for building deeply authored interactive YouTube explainers.

## Repository map

See `PROJECT_STRUCTURE.md` first.

- `skills/` — reusable explanation/design rules
- `research/` — source and technical research
- `video-script/` — the current spoken YouTube script
- `archive/` — old/superseded planning material
- `src/` — implementation code

## Current phase

We are building the **library and structure only**.

Real video pages are not created until the actual script/story is supplied.

North star:

> **The interface should disappear into the explanation.**

A viewer should feel like they are manipulating an idea, diagram, character, system, or simulation — not operating a website.

This library intentionally over-builds interaction quality and robustness. More code is acceptable when it buys clearer continuity, better tactile response, safer interruption handling, stronger recording behavior or more reusable visual language. Decorative complexity is not the goal.

## Library routes

- `/` — internal module library
- `/styles` — art-direction reference
- `/lab/:demo` — capability demos/tutorials
- `/lab/continuity` — first refinement benchmark
- `/<video-slug>` — reserved for real videos, registered only when the story exists

The real-video registry lives in `src/videos/registry.tsx` and intentionally starts empty.

Lab demos are lazy-loaded independently. Opening one demo does not automatically load every specialist engine used by the others.

## Core story hierarchy

```text
Video
  └─ Section / World
      └─ Beat
          └─ Actor
              └─ Portal (when an actor bridges into the next world)
```

**New sentence does not imply new section.** Keep one conceptual world alive while the narration elaborates it. Create a new section only when the viewer's mental coordinate system changes.

Persist conceptual actors whenever continuity teaches causality. A token that moves, gains an ID and enters a lookup surface should still feel like the same token.

See `skills/CONTINUITY_SYSTEM.md`.

## Scene rules

- one authored section/world = `100vw × 100vh`
- diagram/visual usually carries most of the explanation
- real-video text is normally minimal: labels, numbers, questions, one-line narration
- UI controls are allowed only when they teach, compare, control, reveal or explore
- visible controls belong near the object/decision they affect
- prefer object-as-control when the object itself communicates the action
- big typography is optional, not the default
- rounded cards/shadows are allowed when they represent meaningful surfaces
- no decorative neon/glow/glass styling by default
- white/off-white + black ink is the visual foundation; accents are restrained
- paper/sketch is a favored art direction, not a global lock

See:
- `skills/EXPLANATION_DESIGN.md`
- `skills/REFINEMENT_STANDARD.md`
- `skills/CONTINUITY_SYSTEM.md`
- `skills/INTERACTION_PATTERNS.md`
- `skills/VISUAL_SYSTEM.md`

## Core interaction languages

- Ncase-style click / Continue / choice stories
- beat continuity inside one section
- native section snap
- exact one-gesture-one-scene paging
- shared-object portal transitions between worlds
- continuous scrollytelling
- simulations and drag/manipulation
- diagrams, signal flow and camera/focus

No single interaction mode is forced onto every story.

## Continuity benchmark

`/lab/continuity` demonstrates:

```text
plain prompt
  ↓ same actors
separate token objects
  ↓ same actors
selected rows + token IDs in an index
  ↓ same world rearranges
lookup paths → embedding book
  ↓ book itself becomes the control / portal
open embedding book world
```

It pressure-tests local controls, actor identity, meaningful surfaces, curved layout motion, repeated-input guards, shared-object transitions, reversal, reduced motion and responsive composition.

## Visual modules

Installed reusable capabilities include:

- Rough.js
- Rough Notation
- perfect-freehand
- Lucide React through semantic tree-shaken `VisualIcon`
- XYFlow / React Flow for complex graph scenes
- Motion
- GSAP specialist tools
- XState / @xstate/react for complex opt-in scene logic
- cmdk for the internal lab command palette only
- Lenis, opt-in only
- react-kino optional helpers

Future heavy engines such as Rive, Lottie and Three.js/WebGL/WebGPU stay uninstalled until a real story needs them.

## Explanation-first primitives

- `SceneFrame`, `VideoPage`
- `SceneDirector`, `ContinuityStage`, `ContinuityActor`, `ActorPresence`
- `SceneDeck`, `SharedElement`, `useActionGate`
- `DiagramStage`, `DiagramLabel`, `StoryNote`
- `StoryButton`, `StoryIconButton`, `ControlCluster`, `Hotspot`
- `BookVisual`, `IndexBoard`
- `VisualIcon`
- `SketchShape`, `SketchArrow`, `SketchAnnotation`, `HandDrawnStroke`
- `FlowDiagram`
- `VisualStage` / layers / masks / media
- `SignalFlow`
- `Camera`
- `DragGrid`

## Refinement gate

A component is not refined merely because it animates smoothly.

Review its opening, anticipation, hover/focus, press/grab, commit, settling, active state, disabled/busy state, reversal, exit, reduced motion, touch, keyboard, interrupted input, resize and recording behavior.

Production builds are also inspected for accidental dependency leakage. Heavy capabilities stay route/scene scoped.

## Recording controls

- `P` — presenter mode
- `F` — fullscreen
- `?present=1` — start in presentation mode
- keyboard navigation remains available where a scene supports it

## Internal lab controls

Lab chrome is invisible during normal viewing.

- `L` or `Cmd/Ctrl+K` — open the searchable lab command palette
- presenter mode prevents lab chrome from reopening during recording

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
