# Research notes — premium storytelling patterns

The engine architecture is based on recurring patterns found in current creative-development work rather than one framework.

## Patterns worth keeping

- **Shared-element/page transitions**: browser View Transition API now supports same-document transitions and element-scoped continuity. Use this when a concept should visibly persist while the surrounding scene changes.
- **Exact gesture paging**: wheel/touch/pointer input can be normalized into one intentional next/previous action. This is a different storytelling mode from continuous scrolling.
- **Continuous scroll progress**: scrubbed progress is best when scroll should behave like a timeline rather than navigation.
- **Masked image/media reveals**: clip paths, SVG masks and shader reveals make scene changes feel authored instead of cross-faded.
- **Text choreography**: line/word/character animation is valuable for emphasis and pacing, but only on headline moments.
- **FLIP/shared-layout motion**: use when the same object changes layout or hierarchy and should visually travel rather than disappear/reappear.
- **Media scrubbing**: map scroll progress to video or frame sequences for cinematic product/technical explanation.
- **WebGL/WebGPU**: reserve for visuals DOM/SVG cannot convincingly produce: shaders, fluid distortion, true 3D, particles or persistent GPU transitions.

## References reviewed

- Motion scroll image reveals and parallax examples: https://motion.dev/examples?category=scroll
- MDN View Transition API: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- MDN CSS Scroll Snap: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap
- GSAP Observer / ScrollTrigger / SplitText / Flip / DrawSVG / MorphSVG: https://gsap.com/docs/v3/Plugins/
- Codrops 2026 creative-development tutorials: https://tympanus.net/codrops/hub/tutorials/
- Rive React runtime and state machines: https://rive.app/docs/runtimes/react/react
- Lottie React runtime: https://lottie-react.com/docs/

The rule stays the same: research expands the toolbox; the story chooses what actually ships in a scene.
