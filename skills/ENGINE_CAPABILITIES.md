# Premium capability map

The engine is intentionally **capability-driven**, not dependency-driven. Native browser behavior is the default. A scene opts into an extra engine only when the story benefits from it.

## Navigation modes

| Mode | Primitive | Best for |
| --- | --- | --- |
| Click / Continue | `StoryButton`, `StepController`, `Sequence` | Ncase-style explorable explanations, choices, controlled teaching beats |
| Native snap | `SnapStory` | Full-section stories where natural browser scroll should settle onto authored sections |
| Exact gesture paging | `GesturePager` | One wheel/swipe = exactly one scene, presentation-like websites, dramatic reveals |
| Scene replacement | `SceneDeck` + `SharedElement` | Completely changing the page while preserving visual continuity |
| Continuous scroll | `PremiumScrolly` | Framer-like scrubbed motion, camera moves, masks, parallax and progressive diagrams |

## Visual choreography

- `VisualStage`, `VisualLayer`, `VisualMask`, `VisualScrim`, `MediaVisual`
- `MaskReveal` for curtain / center / directional visual reveals
- `SplitReveal` for line, word or character choreography
- `ScrollVideo` for mapping scroll progress directly onto a video timeline
- `SignalFlow` for visible information travelling through a system
- `Camera` / Focus for directing attention without replacing the scene
- `DragGrid` / `Draggable` for cause-and-effect interaction

## Optional engines — only mount when the scene earns them

### Motion
Use for continuous React-native animation values, layout motion, progress-linked transforms and camera choreography. Do not wrap the entire app just because Motion exists.

### Lenis
Use only when a continuous-scroll scene genuinely benefits from inertial scroll. Native scrolling remains the default.

### GSAP
GSAP 3.15 is available for the techniques where it is materially better than a home-grown solution. The repo currently lazy-loads it for:

- `Observer` inside `GesturePager` — robust wheel/touch/pointer gesture paging
- `SplitText` inside `SplitReveal` — responsive, accessible text splitting and masks

Other GSAP tools worth opting into for a specific story: `Flip`, `MorphSVG`, `DrawSVG`, `MotionPath`, `ScrollTrigger` and `ScrollSmoother`.

### Rive — not installed yet
Use when we need designer-authored interactive characters, state machines or highly polished vector interactions. Rive is especially strong when animation logic should live in the art file rather than React code.

### Lottie — not installed yet
Use for After Effects-authored vector animations, especially when we want a designer to hand us a motion asset that can be played or scrubbed without rebuilding it in code.

### Three.js / WebGL / WebGPU — not installed yet
Use only for scenes that cannot be achieved convincingly with DOM/SVG/video: shader image reveals, real 3D camera travel, depth galleries, particles, fluid distortion, or persistent GPU page transitions.

## Premium recipes still worth building when a real story asks for them

1. Image-sequence scrub for product/object rotations and cinematic frame-by-frame reveals.
2. Shared-layout FLIP transitions between radically different DOM arrangements.
3. SVG shape morphing for concept transformations.
4. Animated maps/routes with camera tracking.
5. Horizontal story rails for timelines and comparisons.
6. Cursor/spotlight reveals when pointer position itself carries meaning.
7. Audio-reactive or narration-synchronized visuals when sound is part of the explanation.
8. WebGL/WebGPU shader transitions for rare hero moments, never as a default.
9. Rive state-machine characters for interactive teaching moments.
10. Deterministic autoplay timeline for recording scenes without manual input.

## Quality rule

Premium is not “more animation.” Premium means the interaction, visual hierarchy, easing, composition and transition all communicate the same idea at the same moment. If an effect does not improve understanding or pacing, do not use it.
