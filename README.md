# Explain Ahmad — Explainer Engine

A reusable React/Vite system for building deeply polished interactive YouTube explainers.

The target is not "good enough UI." The target is explorable-storytelling quality with premium, Framer-like motion: continuous scroll response, cinematic focus, strong hierarchy, and interaction that helps prove the idea being narrated.

## Motion foundation

```text
SmoothScroll (Lenis)
  ↓
MotionSystem (Motion)
  ↓
PremiumScrolly
  ├── continuous 0→1 scene progress
  ├── smoothed scroll values
  ├── scroll velocity
  ├── shared spring/easing tokens
  ├── GPU-friendly transforms
  └── reduced-motion fallback
       ↓
Story-specific choreography
```

Premium scrollytelling is deliberately different from basic IntersectionObserver scrollytelling. Story beats can blend continuously through position, scale, blur, path drawing, depth, and camera movement instead of snapping between discrete states.

## Storytelling modes

1. **Premium scrollytelling** — cinematic continuous scroll choreography.
2. **Trust-style click stories** — one idea per click / Space press.
3. **Polygon-style simulations** — manipulate variables and see the system respond.
4. **SignalFlow / system diagrams** — information visibly travels through nodes and edges.
5. **Sequence / Timeline** — narration controlled beat by beat.
6. **DragGrid** — drag → drop → system reaction.
7. **Camera / Focus** — zoom, pan, and dim the rest of the scene.

The older step-based scrollytelling implementation remains as a simple reference, but it is no longer the quality target.

## Premium primitives

- `SmoothScroll` — Lenis inertial scroll layer.
- `MotionSystem` — global Motion configuration and reduced-motion policy.
- `PremiumScrolly` — continuous scene progress + velocity context.
- `ScrollBeat` — narration choreography with opacity, travel, scale, and blur.
- `ScrollProgress` — progress rail driven directly by scene progress.
- `motionTokens` — shared spring, easing, blur, and travel values so scenes feel related.

The flagship demo uses progress-linked camera motion, velocity-sensitive tilt, animated SVG signal paths, layered ambient depth, translucent stage surfaces, progressive expert selection, and a resolving output state.

## Run it

```bash
npm install
npm run dev
```

## Recording controls

- `P` — presenter mode
- `F` — fullscreen
- `?present=1` — start directly in clean presentation mode
- `Space` / `→` — next beat in click/sequence scenes
- `←` — previous beat
- `Home` — reset

## Main structure

```text
src/
  motion/
    tokens.ts

  engine/
    SmoothScroll.tsx
    MotionSystem.tsx
    PremiumScrolly.tsx
    StepController.tsx
    SceneController.tsx
    ScrollController.tsx
    Sequence.tsx
    PresenterMode.tsx
    ScrollKit.ts

  components/
    ScrollBeat.tsx
    ScrollProgress.tsx
    Reveal.tsx
    Arrow.tsx
    Node.tsx
    Character.tsx
    SpeechBubble.tsx
    Counter.tsx
    Slider.tsx
    Graph.tsx
    SignalFlow.tsx
    DragGrid.tsx
    Camera.tsx

  examples/
    premium-scrolly/
    trust-style/
    polygons-style/
    scrolly-style/
    flow-style/
    sequence-style/
    drag-style/
    focus-style/
```

## Motion rules

- Movement must explain or direct attention; decorative motion is secondary.
- Prefer continuous scroll-linked choreography over abrupt state switching when the concept benefits from it.
- Keep transforms GPU-friendly (`transform`, `opacity`, selective `filter`, SVG path progress) and avoid layout thrashing during scroll.
- Use one motion language across scenes: shared springs, easing, blur, travel, and depth ranges.
- Inactive information should often recede rather than disappear. Context matters.
- Respect `prefers-reduced-motion`.
- Test real explainers, not component demos alone.

## Upstream / inspiration

- Nicky Case — *The Evolution of Trust* (CC0-1.0)
- Nicky Case — *Parable of the Polygons* (CC0-1.0)
- Nicky Case — *LOOPY* (CC0-1.0)
- Motion (MIT) — primary premium animation layer
- Lenis (MIT) — smooth-scroll layer
- react-kino (MIT) — optional scroll-storytelling helpers

See `NCASE_CREDITS.md` for Ncase provenance and reuse notes.
