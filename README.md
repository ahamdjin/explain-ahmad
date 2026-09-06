# Explain Ahmad — Explainer Engine

A reusable React/Vite playground for building interactive YouTube explainers.

## V1 is intentionally small

The library is considered good enough to start producing real explainers once these seven storytelling modes work:

1. **Trust-style click stories** — one idea per click / Space press.
2. **Polygon-style simulations** — manipulate a variable and immediately see the system respond.
3. **Scrollytelling** — a persistent visual evolves as the story scrolls.
4. **SignalFlow** — animated information visibly travels through nodes and edges.
5. **Sequence / Timeline** — narration advances exactly one controlled animation beat at a time.
6. **DragGrid** — drag an object into meaningful targets and let the system react.
7. **Camera / Focus** — zoom into a concept and dim the rest of the scene.

Presenter mode turns any active scene into a clean recording stage.

## Run it

```bash
npm install
npm run dev
```

## Main structure

```text
src/
  engine/
    StepController.tsx
    SceneController.tsx
    ScrollController.tsx
    Sequence.tsx
    PresenterMode.tsx
    ScrollKit.ts

  components/
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

  scenes/
    ClickStory.tsx
    Simulation.tsx
    ScrollyStory.tsx
    Comparison.tsx
    Diagram.tsx
    SystemFlow.tsx
    Timeline.tsx

  examples/
    trust-style/
    polygons-style/
    scrolly-style/
    flow-style/
    sequence-style/
    drag-style/
    focus-style/
```

## Recording controls

- `P` — toggle presenter mode
- `F` — fullscreen while presenting
- `Space` or `→` — next beat in step-driven scenes
- `←` — previous beat
- `Home` — reset
- `?present=1` — start in presenter mode

Presenter mode hides navigation, headings, debug controls, borders, and other authoring chrome so the active visual can be recorded cleanly in 16:9.

## ScrollKit

`src/engine/ScrollKit.ts` is a thin adapter over **react-kino** (MIT). It exposes sticky scenes, parallax, scroll transforms, text reveals, compare sliders, video scroll, and progress without tying explainers directly to that dependency.

## Upstream design/code references

- Nicky Case — *The Evolution of Trust* (CC0)
- Nicky Case — *Parable of the Polygons* (CC0)
- Nicky Case — *LOOPY* (CC0)
- react-kino by Bilal Tahir (MIT)

See `NCASE_CREDITS.md` for Ncase provenance.

## The rule

Do not keep building framework components just because they might be useful someday. Build a real explainer. Add a primitive only when a real scene proves it is missing.
