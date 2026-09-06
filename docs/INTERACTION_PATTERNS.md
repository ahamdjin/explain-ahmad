# Interaction Pattern Map

This document turns the explainer library into a vocabulary of teaching interactions rather than a bag of effects.

## Core principle

> The interface should disappear into the explanation.

The viewer should manipulate the idea itself whenever possible. Controls should be local to the object, comparison, variable, or decision they affect.

## Research principles

### Show meaning in context
Bret Victor's *Learnable Programming* argues that strong explanations show as well as tell and annotate meaning directly in the context of the thing being explained. In this engine that means labels, values, notes and controls should usually sit on or near the diagram object they describe.

### Let people touch the model
Explorable Explanations emphasizes interaction that supports curiosity and understanding rather than turning learning into a click-through quiz. Direct manipulation, meaningful choices and immediate consequences are preferred over generic next buttons.

### Reveal details only when requested
Observable's visualization patterns use pointer interaction, tips, crosshairs, filters and lightweight inputs to keep a visualization readable while still making exact details available. Dense diagrams should follow the same idea: clean overview first, details on demand.

### Preserve causal continuity
When an input becomes an output, an expert wakes up, or a token moves through a system, the viewer should be able to visually follow that transformation. Motion, shared objects, path drawing and state history are tools for preserving continuity—not decoration.

### Keep the feedback loop tight
An action should produce a visible response immediately. Dragging, changing a parameter, scrubbing or choosing a branch should update the relevant visual directly rather than forcing the viewer to mentally connect distant UI and output.

## Pattern families

The implementation-level catalog lives in `src/patterns/catalog.ts` and marks every pattern as `ready`, `recipe`, or `future-engine`.

### Narrative
- step reveal
- progressive disclosure
- exact snap beats
- continuous scrub
- scene replacement
- branching choice
- replay / loop

### Direct manipulation
- drag
- constrained drag
- magnetic snap
- continuous variable / slider
- timeline scrubber
- object-as-control

### Inspection
- details on demand — `Hotspot` is ready for diagrams/screenshots
- focus lens
- isolate while preserving context
- annotation in context
- interactive hotspot — `Hotspot`
- ghost preview
- zoom / pan exploration

### Causality
- signal trace
- visible state transition
- path drawing
- shared-object continuity
- shape / topology morph
- state history trail

### Comparison
- side-by-side
- before / after
- difference highlight
- small multiples
- meaningful view toggle

### Data
- pointer values
- crosshair inspection
- filter / highlight
- animated quantitative change
- timeline
- map / route

### Media
- scroll-linked video
- image / diagram mask
- image-sequence scrub
- media hotspots — `Hotspot`

### Spatial
- depth / parallax
- physics simulation
- interactive character / state machine
- 3D spatial explanation
- shader / field visual

## Refinement rules

A pattern is not refined merely because it animates smoothly.

For every interaction check:

1. **Affordance** — can the viewer tell what can be touched without a tutorial overlay?
2. **Locality** — is the control next to the thing it affects? Use `ControlCluster` when several controls belong to one object.
3. **Anticipation** — can hover, ghost state, cursor change, or spatial placement suggest what will happen?
4. **Immediate feedback** — does the system react on the same beat as the action?
5. **Continuity** — can the viewer follow what changed and why?
6. **Reversibility** — can they undo, go back, reset, or compare without losing orientation?
7. **Readable state** — is the current state visible without reading tiny metadata?
8. **Progressive complexity** — does complexity appear only when it becomes useful?
9. **Input parity** — mouse, touch and keyboard should not produce contradictory experiences.
10. **Recording safety** — library chrome must disappear completely in presenter mode.

## Lab shell policy

The lab is an internal tool, not part of the explanation.

- no persistent floating toolbar
- `L` or `Cmd/Ctrl+K` opens the command palette
- searchable demo switching
- Library / Presenter / Fullscreen live inside the palette
- the palette is an intentional elevated card because this is one of the rare places where a card represents a real UI surface
- the demo owns `100vw × 100svh`
- presenter mode cannot accidentally reopen lab chrome

## Source references

- Nicky Case, *Explorable Explanations*: https://blog.ncase.me/explorable-explanations/
- Explorable Explanations hub: https://explorabl.es/
- Bret Victor, *Learnable Programming*: https://worrydream.com/LearnableProgramming/
- Observable Inputs: https://observablehq.com/documentation/inputs/overview
- Observable Plot interactions: https://observablehq.com/plot/features/interactions
- Motion examples and layout/SVG patterns: https://motion.dev/examples
- cmdk: https://www.npmjs.com/package/cmdk
- Radix Primitives: https://www.radix-ui.com/primitives
