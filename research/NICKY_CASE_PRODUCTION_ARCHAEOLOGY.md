# Nicky Case Production Archaeology

Purpose: stop guessing at the visual-production method and reverse-engineer how real Nicky Case explorable scenes are actually built.

Studied source:
- `ncase/trust` (`gh-pages`)
- `ncase/polygons` (`gh-pages`)

This is about production mechanics, not copying the artwork or old code literally.

---

## Executive finding

The strongest lesson is not "use cute characters."

The production model is:

**authored artwork + fixed stage + deliberately placed scene objects + tiny custom simulation/animation code + explicit scene lifecycle**

The code is rarely asked to invent the look. It coordinates authored visual material and simple geometric behavior.

For our GLM explainer this means:

> **Artwork is authored. Mechanisms are coded. Scene composition is fixed. Scroll only drives the scene state.**

Do not build the visual language primarily from generic React cards, auto-layout, procedural CSS characters, or a giant reusable design system.

---

# Case Study 1 — Evolution of Trust: Splash / title world

Source:
- `ncase/trust/js/slides/0_Slides_Intro.js`
- `ncase/trust/js/sims/Splash.js`
- `ncase/trust/assets/splash/splash_peep.png`
- `ncase/trust/assets/splash/splash_peep.json`
- `ncase/trust/assets/splash/connection.png`
- `ncase/trust/assets/splash/connection.json`

## What is authored

The visual character itself is a sprite/movie-clip asset. The connection line is also an asset.

The scene does **not** procedurally draw a polished character from primitives.

## What is coded

`Splash.js` creates a PIXI stage and places many copies of the authored peep around several rings. It then:

- gives each peep a small randomized starting rotation
- gives each one a tiny orbit radius and swing
- flips some sprites horizontally
- connects nearby peeps
- makes the network react to the mouse by pushing nearby peeps away
- stretches/rotates connection sprites between moving peeps

The important split is:

**code owns behavior and repetition; artwork owns appearance.**

## Composition

The entire Trust presentation is effectively designed around a ~960×540 reference stage. Slide code uses hard coordinates such as `x:130, y:80, width:700`, while the splash centers itself relative to that stage.

This is closer to animation software than responsive app layout.

## Motion language

The motion is tiny and specific:

- drifting
- swaying
- slight rotation
- mouse bulge
- simple fade-ins

There is no generic "premium animation system" doing everything.

## Lesson for GLM

For a field of 320B parameters / experts:

- author a small number of high-quality visual pieces
- repeat them in code when repetition conveys scale
- allow code to control swarm/ring/grid behavior
- keep movement small until the story needs a deliberate action

Do **not** make every repeated item a fully designed React card.

---

# Case Study 2 — Evolution of Trust: Iterated-game machine

Source:
- `ncase/trust/js/sims/Iterated.js`
- `ncase/trust/js/slides/2_Slides_Iterated.js`
- `ncase/trust/assets/iterated/iterated_machine.json`
- `ncase/trust/assets/iterated/iterated_payoffs.json`
- `ncase/trust/assets/iterated/iterated_peep.json`
- `ncase/trust/assets/iterated/iterated_coin.json`

This is the most relevant case study for our "real mechanism doing one thing" goal.

## What is authored

The major pieces are authored movie-clip/sprite assets:

- machine
- payoff display
- character body/faces/hats
- coin

The machine's personality and visual complexity come from the art asset, not DOM styling.

## What is coded

The simulation is a small fixed PIXI scene: **700×250**.

Code places the two characters at the sides, the machine in the middle, and the payoff graphic at `x=350, y=125`.

The script then choreographs a very small vocabulary of actions:

1. character produces coin
2. character hops/walks toward machine
3. coin enters machine
4. machine/payoff state changes
5. output/reward is shown
6. character reacts
7. scene resolves

The code changes sprite frames for expressions and states instead of redrawing the scene.

## Scene choreography

The slide file is extremely explicit.

For the first iterated scene:

- simulation at `x:130, y:133`
- labels at exact positions
- top narration text at exact position
- bottom text at exact position
- two buttons at exact positions
- objects fade in at manually chosen delays

On the next beat, the same simulation is moved lower, a scoreboard appears, new logic is attached, and the scene continues.

So continuity is achieved by **keeping important objects alive between beats and modifying them**, not by rendering independent slide screenshots.

## Scene lifecycle

The slide engine has clear concepts:

- `onjump`
- `onstart`
- `onend`
- `add`
- `remove`
- `clear`

This is a major lesson for us.

A beat should be a command to a persistent scene, not a React page replacement.

## Transitions

There are bespoke transitions too. For example, a scratch effect is used to hide the scene while switching opponent/state. That transition belongs to the storytelling language; it is not a generic crossfade.

## Lesson for GLM

Router/expert/storage scenes should be built like this machine:

- one strong authored mechanism
- fixed spatial roles
- a very small action vocabulary
- state changes represented by sprite/frame/layer changes
- the same scene persists across multiple narration beats

Example:

`word card → router desk → selected expert slots → shared expert → result tray`

The mechanism can physically perform routing instead of us explaining routing with a collection of UI boxes.

---

# Case Study 3 — Parable of the Polygons: scroll page + playable board

Source:
- `ncase/polygons/index.html`
- `ncase/polygons/js/intro.js`
- `ncase/polygons/play/intro/intro.html`
- `ncase/polygons/play/intro/intro.js`
- `ncase/polygons/play/manual/manual.html`
- `ncase/polygons/play/manual/manual.js`
- `ncase/polygons/play/img/*`

This project uses a different architecture from Trust, but the same production philosophy.

## The page is mostly normal document flow

Instead of making the entire article one giant animation engine, the story is a regular page containing individual interactive `iframe` playables.

The outer page's scroll code does only a few jobs:

- determine whether each playable is in the viewport
- set `IS_IN_SIGHT` so off-screen simulations stop rendering
- pass scroll position into the intro/outro background scenes

This is very important:

**scroll is orchestration, not the renderer.**

## Intro scene

The intro has a fixed **1280×550** container with:

- a **1280×300 canvas** for moving characters
- an authored `intro_banner.png` overlay/shading asset
- normal HTML text layered over it

The code only loads the triangle/square character images, generates positions, gives each a tiny swing, reacts to the pointer, and translates the canvas vertically at half scroll speed.

That is a simple parallax relationship:

`visual Y = base Y + scroll × 0.5`

Again: authored art + tiny motion code.

## Manual board

The manual playable is a fixed **550×550 canvas**.

It loads only a handful of authored character states:

- happy triangle
- blink triangle
- meh triangle
- sad triangle
- happy square
- blink square
- meh square
- sad square

Code owns:

- grid positions
- neighbor calculation
- happiness state
- drag/drop
- interpolation toward a target tile
- dangling while dragged
- wobbling when unhappy
- blinking

The key insight is that the interaction is the explanation.

There is almost no decorative UI competing with the mechanism.

## Micro-animation

The board feels alive because of cheap, tiny stateful behaviors:

- occasional blink
- unhappy wobble
- smooth interpolation to grid positions
- slight pendulum/dangle when dragging

These are more valuable than large generic entrance animations.

## Lesson for GLM

We should split our video into **contained visual mechanisms**, not force every concept into one universal scene system.

Examples:

- parameter field = one mechanism
- tokenizer = one mechanism
- embedding book = one mechanism
- attention = one mechanism
- router/expert room = one mechanism
- storage↔working-memory bottleneck = one mechanism

They can share visual DNA without sharing one giant component architecture.

---

# What we were doing wrong

## Wrong 1 — treating CSS/React as the illustrator

React should coordinate authored assets and mechanisms. It should not be responsible for making everything visually charming from generic divs.

## Wrong 2 — designing a reusable system before a great scene

Nicky Case's code contains very scene-specific objects and layouts. Reuse exists where it naturally helps, but the scene is allowed to be bespoke.

For us: make one great router room before making a universal `MechanismCard` system.

## Wrong 3 — generic responsive layout

The scenes are authored around fixed coordinate systems.

For YouTube we should embrace **1920×1080 as the master stage** and scale the entire stage uniformly for preview.

Inside the stage, coordinates are deliberate.

## Wrong 4 — too many screen-wide transitions

The strongest examples keep objects alive and change their state.

Use:

- move
- blink
- highlight
- swap frame
- stretch connector
- slide mechanism
- reveal a layer

before reaching for fade-the-whole-scene.

## Wrong 5 — no physical cause/effect

The machine scene shows the action.

For GLM, the router cannot merely be a label between arrows. It needs a physical action:

- token/representation arrives
- router scores/marks slots
- eight gates open
- shared path remains open
- selected pieces move/run
- outputs recombine

That causal chain is what makes the explanation feel alive.

---

# Production architecture to adopt

## Layer 1 — authored art

Scene-specific PNG/SVG assets:

- backgrounds
- machines
- expert bodies/faces
- router console
- storage shelf
- RAM/VRAM working area
- book/page props
- arrows/labels only when they are visual props

## Layer 2 — fixed scene stage

Master stage: **1920×1080**.

Everything important gets explicit coordinates.

The browser may scale the whole stage to fit the viewport, but internal scene geometry does not reflow.

## Layer 3 — scene objects

Each major thing becomes an object with a tiny API.

Examples:

- `word.enter()`
- `parameterField.activateSlice()`
- `inactiveParams.react()`
- `router.inspect()`
- `router.select([ids])`
- `expert.wake()`
- `expert.run()`
- `memory.load(expert)`

The API describes story actions, not CSS properties.

## Layer 4 — beat director

A beat is an explicit list of commands to existing scene objects.

Example:

```text
Beat A
word.enter("scared")
parameterField.reveal()

Beat B
parameterField.activateSlice("18B")
camera.pushIn(0.06)

Beat C
inactiveParams.gainFaces()
inactiveParams.react("confused")
```

## Layer 5 — scroll

Scroll maps to beat progress / transitions.

It should not own layout or generate visuals.

---

# Our next proof should be different

Do **not** recreate Frames 2→4 again with divs and generic SVG characters.

Build one authored scene package:

```text
scene-parameter-field/
  background
  word-card
  parameter-field-base
  active-overlay
  inactive-face-state-01
  inactive-face-state-02
  brackets
  narrator
```

Then implement a tiny scene director whose only job is to move/swap/reveal these layers.

The target is not "technically working."

The acceptance test is:

1. freeze the live scene on Beat 2
2. screenshot it at 1920×1080
3. compare to approved storyboard
4. repeat for Beats 3 and 4
5. do not continue until composition/visual quality survives the implementation

---

# Bottom line

The real Nicky Case pattern is not a magical library.

It is disciplined separation:

**draw the thing → build the mechanism → place it deliberately → animate only the causal actions → preserve objects between beats.**

That is the production model we should use for the GLM explainer.