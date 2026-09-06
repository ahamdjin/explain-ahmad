# Refinement Standard

This project deliberately over-builds the interaction layer so a real explainer can feel authored rather than assembled.

The goal is not maximum effects. The goal is that every visible state, transition and failure mode feels intentional.

## Quality target

> The interface should disappear into the explanation.

A scene is not refined because it uses Motion, GSAP, Lenis, SVG, canvas or WebGL. It is refined when the viewer can follow the idea without noticing the machinery.

## Every interactive object has a lifecycle

For buttons, draggable objects, portals, hotspots, tabs, sliders and other controls, review all applicable states:

1. **Rest** — readable, balanced, no accidental affordance noise.
2. **Anticipation** — hover/focus/pointer proximity hints what is possible without a tutorial overlay.
3. **Press / grab** — immediate physical feedback on the same frame as the input.
4. **Commit** — the action produces a clear causal response.
5. **Settling** — movement lands deliberately; no dead or floaty ending.
6. **Selected / active** — current state is visible without tiny metadata.
7. **Disabled / busy** — repeated input cannot break or skip the authored sequence.
8. **Reverse** — returning restores orientation rather than resetting arbitrarily.
9. **Exit** — objects leave for a reason; they do not simply blink away.
10. **Reduced motion** — logic and hierarchy survive without large motion.

## Every section has a lifecycle

### Opening
- establish the visual world quickly
- avoid a generic website hero entrance
- the first meaningful object should own attention
- background treatment must already belong to the world

### Active world
- preserve actor identity across narrated beats
- reveal complexity only when narration earns it
- keep controls local to their object or decision
- text remains supporting material

### Transition out
- decide what persists
- decide what recedes
- use a portal/shared object when the next world is conceptually inside/through/downstream
- prevent repeated input during non-interruptible transitions

### Closing
- leave the viewer with a stable readable state
- avoid finishing on half-resolved motion
- preserve a clean frame for recording/editing

## Motion review

For each motion ask:

- What changed?
- Why did it move?
- Could the viewer follow the same object?
- Is the path physically/compositionally believable?
- Is the duration proportional to distance and importance?
- Does the animation remain readable if triggered immediately after the previous one?
- Does reversal feel like the inverse of the original action?

Use straight motion when directness matters. Use curved trajectories when preserving spatial identity benefits from a natural path. Never add path curvature merely because it looks expensive.

## Controls

Controls are story objects, not generic app chrome.

- prefer object-as-control when the object itself communicates the action
- visible labels should describe the conceptual action: `Tokenize`, `Open`, `Try`, `Compare`
- avoid permanent Previous/Next toolbars on real video pages
- keyboard controls may exist invisibly for recording
- focus-visible, touch targets, disabled/busy states and reduced-motion behavior are required

## Surfaces and shadows

Cards, borders and shadows are allowed when the surface means something:

- book
- page
- browser
- terminal
- token
- model boundary
- memory store
- index / catalog
- document

Do not wrap open diagrams in cards merely to make them look designed.

## Backgrounds

Backgrounds establish material/world, not decoration.

Allowed when justified:
- paper grain / fibers
- ruled or graph paper
- blueprint/grid systems
- physical page edges
- subtle environmental motion
- real imagery or media

Avoid default neon blobs, colored glows, glass haze and gradients that do not explain anything.

## Robustness gate

Before calling a reusable primitive refined, test or reason through:

- fast repeated click
- held keyboard key
- interrupted transition
- backward navigation
- reset / replay
- route change mid-state
- refresh
- mouse
- touch
- keyboard
- reduced motion
- high DPI
- narrow viewport
- short viewport
- 16:9 recording viewport
- fullscreen/presenter mode

## Performance gate

Heavy capabilities stay opt-in.

- no global smooth scrolling unless a real scene earns it
- no global animation engine behavior merely for consistency
- lazy-load lab demos and specialist visual engines
- semantic icon wrappers use tree-shaken direct imports
- inspect production chunks after introducing a new capability

## Benchmark rule

A structural demo can prove an API. A benchmark demo must additionally prove interaction quality.

`/lab/continuity` is the first benchmark target. It should be used to pressure-test:

- actor continuity
- local controls
- object-as-control
- portal transitions
- reversibility
- paper art direction
- meaningful surfaces
- interruption guards
- reduced motion
- responsive composition

A green build is necessary. It is never sufficient evidence of visual refinement.
