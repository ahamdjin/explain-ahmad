# Explain Ahmad — Explainer Engine

A reusable React/Vite playground for building interactive YouTube explainers.

The goal is not to clone any single project. The engine combines three useful storytelling patterns:

1. **Trust-style click stories** — one idea per click / Space press.
2. **Polygon-style simulations** — viewers manipulate a variable and immediately see the system respond.
3. **Scrollytelling** — the visual stays persistent while scrolling progressively changes its state.

## Run it

```bash
npm install
npm run dev
```

## Structure

```text
src/
  engine/
    StepController.tsx
    SceneController.tsx
    ScrollController.tsx

  components/
    Reveal.tsx
    Arrow.tsx
    Node.tsx
    Character.tsx
    SpeechBubble.tsx
    Counter.tsx
    Slider.tsx
    Graph.tsx

  scenes/
    ClickStory.tsx
    Simulation.tsx
    ScrollyStory.tsx
    Comparison.tsx
    Diagram.tsx

  examples/
    trust-style/
    polygons-style/
    scrolly-style/
```

## V1 demos

### 1. Trust style
Two characters appear → click / Space → one cooperates → the score changes → the consequence is revealed.

### 2. Polygon style
Move a character between neighborhoods → nearby shapes change → the comfort score reacts immediately.

### 3. Scrollytelling
Scroll through an AI explainer → Token → Embedding → Q/K/V → Attention context. The diagram grows instead of being replaced.

## Controls

Click-story scenes support:

- `Space` or `→` — next step
- `←` — previous step
- `Home` — reset
- on-screen Previous / Reset / Next buttons

## Design principle

Every reveal or interaction should explain something. If an animation only looks cool and does not improve understanding, it probably does not belong in the engine.

## Inspiration

The storytelling approach is inspired by explorable explanations such as Nicky Case's *The Evolution of Trust* and *Parable of the Polygons*, plus modern scrollytelling patterns. This repository's implementation is original rather than copied from those codebases.
