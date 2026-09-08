# GLM Paper World — Art Direction

Status: **AUTHORITATIVE visual direction for the current GLM-5.3-Flash explainer.**

This file exists so we do not keep reinventing the visual style while building the video. Storyboards, style frames, animation, and implementation should follow this document unless we explicitly decide to change it.

---

## 1. North Star

The explainer should feel like a **small handmade paper world that happens to explain a very technical machine**.

It should combine:

- the personality and simplicity of Nicky Case-style explorable explanations,
- the mechanical clarity of a real engine / mechanism explainer,
- the restraint of technical diagrams such as Distill,
- and a tactile paper-cutout visual language.

The viewer should feel that objects **exist, have roles, move for a reason, and react to what is happening**.

This is not a dashboard, slideshow, architecture poster, or generic motion-graphics package.

### Locked personality levels

- **Cute level:** Medium
- **Paper texture:** Medium
- **Motion roughness:** Medium

The result should feel warm and alive, but still credible enough for a technical AI explanation.

---

## 2. Reference DNA

The direction is informed by these references supplied/studied for the project:

### Nicky Case — The Evolution of Trust
Use for:
- sparse composition,
- hand-drawn characters,
- objects that have obvious roles,
- tiny reactions that make abstract systems feel alive,
- one clear interaction/problem at a time.

Do **not** copy characters or scenes. Copy the principle: simple marks + personality + causality.

### Nicky Case — Parable of the Polygons
Use for:
- minimal character faces,
- groups that visually react,
- communicating state through posture/expression instead of paragraphs,
- making a population of many items readable.

### Mechanical mechanism / gear reference
Use for:
- showing a real working mechanism,
- revealing only the pieces needed for the current explanation,
- movement where one part visibly causes another part to move,
- making complexity understandable by assembly/disassembly.

For this video we should use a **simpler mechanism than a full engine**. One visual mechanism should do one teaching job.

### Distill-style technical diagrams
Use for:
- clean lines,
- small technical labels,
- readable information hierarchy,
- showing relationships without decoration.

### Explorable Explanations
Use for:
- learning by watching a system change,
- interactions that perform an experiment rather than simply advance a slide,
- concrete experience before abstraction.

---

## 3. The Visual World

Everything should look as though it could have been built on a desk from:

- warm paper,
- cut card,
- pencil/ink,
- a few colored paper pieces,
- simple printed labels,
- tiny moving paper characters.

### Physical rules

1. Objects have edges and thickness only when it helps them feel physical.
2. Layers may cast a very small paper shadow.
3. Objects can overlap like paper pieces placed on a desk.
4. Motion should suggest pieces being slid, placed, lifted, unfolded, sorted, or connected.
5. Nothing should float like glossy sci-fi UI unless the concept genuinely requires it.

---

## 4. Color System

The palette should feel like **paper + ink + a few construction-paper accents**.

### Base

- Paper background: `#F5F0E6`
- Light paper surface: `#FBF8F1`
- Secondary paper: `#EDE5D8`
- Ink: `#2B2926`
- Soft graphite: `#807A72`
- Fine construction line: `rgba(43, 41, 38, 0.20)`

### Semantic accent colors

- **Warm orange — active/current/selected:** `#E79A63`
- **Blue — router/control/decision:** `#5E83B8`
- **Teal — shared/always-on/helper:** `#74A297`
- **Yellow — curiosity/question/reaction:** `#E3C45B`
- **Muted red — blockage/failure only:** `#C86658`

### Color rules

- Orange is the strongest recurring accent and should follow the current active path/word/token.
- Blue belongs to routing/control mechanisms, not arbitrary decoration.
- Teal belongs to the shared expert or another always-on shared mechanism.
- Yellow is used sparingly for a question, surprise, or confused reaction.
- Red is rare. If everything is red, nothing is a problem.
- Most of the frame should remain paper + ink.
- Never use a rainbow simply to make a technical diagram look interesting.

Color must not be the only cue. Selected objects should also change outline, pose, position, or emphasis.

---

## 5. Paper Texture

Texture level is **medium**.

The paper should be visible enough to create warmth, but not so strong that it damages readability or makes screenshots look dirty.

### Background texture

- subtle fiber/noise across the canvas,
- roughly 4–7% visual strength,
- very low contrast,
- no repeating obvious texture tiles.

### Object texture

- slightly different paper tone from the background,
- gentle grain,
- occasional imperfect cut edge,
- no heavy torn-paper effect on every object.

### Shadows

- small, soft, close to the object,
- enough to show stacked layers,
- never glossy UI-card shadows.

Think **pieces of card on a table**, not floating SaaS cards.

---

## 6. Line and Shape Language

### Ink

- dark graphite/ink rather than pure black,
- slightly imperfect lines,
- approximately 1.5–3 px at 1920×1080 depending on importance.

### Shapes

Shapes should be simple enough that a viewer understands them immediately.

Preferred:
- circles,
- squares/rectangles,
- trays,
- drawers,
- shelves,
- arrows,
- simple mechanical gates,
- paper tabs,
- small character bodies.

Avoid:
- glass panels,
- neon glows,
- 3D sci-fi cubes for no reason,
- excessive rounded UI cards,
- decorative graphs,
- meaningless circuitry.

A box is allowed when the thing genuinely behaves like a box/container. A box should not be our default representation for every concept.

---

## 7. Character Design

Character cuteness is **medium**.

Characters exist to make roles and reactions understandable, not to turn the video into a cartoon.

### Character construction

- simple paper body/shape,
- two dot eyes,
- optional tiny mouth only when expression genuinely helps,
- very simple arms/legs when needed,
- one identifying badge/tool/mark for specialists.

### Expression vocabulary

Use tiny changes:
- eyes shift,
- head/shape tilts,
- one eyebrow/line,
- small question mark,
- body leans,
- brief glance toward another object.

Do not use:
- giant emoji faces,
- exaggerated meme expressions,
- constant blinking/bouncing,
- dialogue bubbles explaining the narration.

### Experts

Experts should look like a **family of specialist workers/modules**, not 288 identical boxes and not 288 unrelated cartoon people.

Shared visual skeleton:
- same basic paper-body construction,
- same scale,
- same face grammar.

Variation:
- tiny badge,
- symbol,
- tool,
- stripe,
- paper color variation within a controlled range.

At overview scale, the viewer should read **a crowd of specialists**. Up close, a few can reveal personality.

### Router

The router is **not a CEO**.

Visual role: **dispatcher / switchboard / control desk / station master**.

It should visibly:
1. receive the current word/token representation,
2. make a selection,
3. direct traffic toward selected experts.

The router may have light character personality, but its main identity comes from its function.

### Shared Expert

The shared expert should feel like an **always-present helper/class monitor**, visually distinct with the teal accent.

Do not imply it is literally a teacher or supervisor. The character metaphor is only to make “always participates” immediately readable.

---

## 8. Mechanism Design

The video should repeatedly use **small mechanisms that visibly do one thing**.

This is one of the most important art-direction rules.

A mechanism can be:
- a gate,
- turntable,
- selector,
- tray,
- conveyor,
- drawer system,
- simple gear pair,
- switchboard,
- page/book lookup,
- lift/elevator,
- floor/building transition.

### Rule

**No mechanism should exist because it looks cool.**

Every moving part must map to a real conceptual relationship.

Example:
- router decision → selector physically points to/opens routes to experts.
- loading experts → selected expert pieces physically leave storage and enter a RAM work tray.
- embedding lookup → a page/book lookup physically retrieves one row/page.

### Complexity ceiling

Prefer the smallest mechanism that makes cause → effect visible.

If three gears explain it, do not build thirty gears.

---

## 9. Composition

The frame should usually have **one dominant idea**.

### Default composition

- 55–70% breathing room / quiet space,
- one hero system or actor,
- secondary context around it,
- labels attached directly to objects.

### Density

Dense scenes are allowed only when density itself teaches something:
- 320B feels huge,
- 288 experts feels like a crowd,
- a model architecture feels overwhelming before we reject it.

Even in a dense scene, there must be one clear visual focal point.

### Safe frame

Design for 16:9 / 1920×1080.

Keep important information inside roughly the central 90% width and 86% height so recording/cropping never clips teaching content.

Nothing important should sit against the browser edge.

---

## 10. Typography

Text is part of the visual system, but narration carries the explanation.

### Roles

1. **Handwritten/display voice**
   - scene titles,
   - playful object labels,
   - occasional reaction marks.

2. **Technical/mono voice**
   - numbers,
   - parameter counts,
   - model facts,
   - IDs,
   - small machine labels.

### Preferred type direction

- Handwritten: simple human handwriting, not childish bubble lettering.
- Technical: clean monospaced or restrained sans-serif.

Open-source candidates can be evaluated later; art direction should not depend on one exact font file.

### Text rules

On-screen text should mostly be:
- names,
- counts,
- object labels,
- units,
- tiny annotations.

Avoid:
- repeating the exact narration,
- explanatory paragraphs,
- giant questions the narration is already asking,
- dashboard-style metadata dumps.

Exception: the first GLM model information scene deliberately shows a clean set of model facts because that is the object being introduced.

---

## 11. Motion Language

Motion roughness is **medium**.

The underlying animation can remain technically smooth, but the *feel* should be handmade.

### General motion

Objects should move like paper pieces:
- slide,
- lift slightly,
- rotate a degree or two,
- settle,
- snap gently into a tray/slot,
- unfold,
- get pushed aside.

### Timing guidance

- small reaction: ~180–350 ms
- selection/highlight: ~250–450 ms
- object relocation: ~450–750 ms
- major transformation/reveal: ~700–1200 ms
- deliberate teaching hold: as long as narration requires

These are guidelines, not hard constants.

### Handmade imperfection

Use selectively:
- rotation variance about ±0.5–1.5°,
- tiny position offset on settle,
- slight overshoot,
- small stagger between a group of pieces,
- occasional stepped motion for a character reaction.

Do not apply constant random jitter. Constant wobble becomes visual noise and looks cheap.

### Idle motion

Most objects should be still when nothing is happening.

Characters may have extremely small idle life only if needed.

The world should react to the story, not constantly perform.

---

## 12. Scrollytelling / Beat Behavior

A click/scroll should feel like **performing the next experiment or causing the next consequence**, not changing slides.

### Beat rule

Each beat should change **one main thing**.

Examples:
- highlight 320B and 18B,
- introduce one word,
- wake a small group,
- let inactive pieces react,
- reorganize into experts,
- select eight,
- introduce storage,
- move selected experts into RAM.

### Persistence

Keep actors alive across beats whenever continuity teaches causality.

If a word enters the model, it should feel like the same word as it:
- gets tokenized,
- receives an ID,
- becomes an embedding,
- passes attention,
- reaches the router,
- activates experts.

Do not reset the whole scene just because the narration starts a new sentence.

---

## 13. Visual Semantics for the GLM Video

These meanings should remain stable unless there is a strong reason to change them.

### Current word/token
- warm orange paper piece,
- small label only when needed.

### Active path / selected experts
- warm orange,
- stronger outline / lifted layer.

### Inactive capacity
- paper/grey,
- low contrast,
- still physically present.

### Router
- blue control/dispatcher mechanism.

### Shared expert
- teal,
- visually always available/present.

### Question / confusion
- yellow detail,
- tiny `?`, tilt, glance, or physical hesitation.

### Failure / bottleneck
- muted red,
- blocked gate, jam, slow transfer, warning mark, or physical tension.

### RAM / VRAM
Treat it as **active working space / work tray**, not a generic computer icon.

### Model storage / full checkpoint
Treat it as **archive / drawers / stored expert modules**.

The visual difference between storage and running memory must be obvious even without labels.

---

## 14. Information Screen Exception

The opening GLM information scene is intentionally cleaner and more editorial than the later mechanism scenes.

It should feel like opening a neat model card on paper.

Show useful facts such as:
- GLM-5.3-Flash,
- Z.ai,
- Mixture of Experts,
- 320B total parameters,
- 18B active parameters,
- 288 routed experts,
- 8 selected per token,
- 1 shared expert,
- 45 layers if useful.

But visually emphasize only:
- **320B TOTAL PARAMETERS**
- **18B ACTIVE PARAMETERS**

Everything else is context.

This scene should not contain parameter boxes, a router, or animated experts yet.

---

## 15. Camera and Framing

This is primarily a flat paper stage, not cinematic 3D.

Allowed camera behaviors:
- gentle push-in to inspect a mechanism,
- pull-back to reveal scale,
- pan to follow a persistent actor,
- focus shift by dimming secondary paper pieces,
- zoom from crowd → individual when conceptually useful.

Avoid:
- dramatic 3D spins,
- parallax for decoration,
- aggressive cinematic camera movement,
- frequent zooming that makes the viewer lose orientation.

The viewer should always know where they are in the conceptual world.

---

## 16. Sound-Compatible Motion

Even though the web visual itself may be silent, motion should leave room for future edit sound design.

Useful physical actions:
- paper slide,
- paper tap,
- drawer click,
- selector tick,
- card drop,
- page flip,
- subtle gear/mechanism click.

Do not require sound to understand the visual.

---

## 17. What We Must Avoid

Hard bans unless deliberately approved:

- generic SaaS dashboards,
- rows of meaningless cards,
- giant architecture dumps as the main explanation,
- neon/glass/cyberpunk AI styling,
- random particle fields,
- 3D cubes because “AI”,
- every concept represented by identical boxes,
- smooth corporate motion with no physical logic,
- excessive bouncing,
- constant character animation,
- narration copied onto the screen,
- question text replacing visual tension,
- metaphors that contradict the real mechanism,
- building a powerful simulation engine when a small authored mechanism teaches the same thing.

---

## 18. Quality Test for Any Frame

Before implementation, every important frame should pass these questions:

1. **What is the single thing I notice first?**
2. **Can I identify what the main objects are?**
3. **Does their spatial relationship explain something?**
4. **If an object moves, does the movement teach cause/effect?**
5. **Could I remove any label because the visual already communicates it?**
6. **Could I remove any decorative object without losing meaning? If yes, remove it.**
7. **Does this still feel like the same paper world as the previous frame?**
8. **Is the scene charming enough to watch but serious enough to trust?**

---

## 19. Quality Test for Any Animation

1. The viewer can tell what changed.
2. One important change happens at a time.
3. Existing objects move/reconfigure instead of disappearing and being replaced whenever possible.
4. Motion has a physical reason.
5. The end state is readable as a still frame.
6. Animation is not being used to rescue a bad composition.
7. A reduced-motion version still communicates the idea.

---

## 20. Production Principle

**Do not code a full sequence before the static visual logic is approved.**

For every new section:

1. script beat,
2. rough storyboard,
3. visual composition approval,
4. style frame where needed,
5. rough animatic/state sequence,
6. implementation,
7. rendered screenshot review,
8. motion polish.

The engine should support the visual explanation. The engine is not the art direction.

---

## 21. Remaining Pre-Production After This File

Once this art direction is locked, do not return to broad art-direction exploration unless a real problem is discovered.

Remaining missing pieces, in order:

1. **Storyboard** — exact static visual state for each narration beat.
2. **Style frames** — polished examples of the hardest/key visual worlds.
3. **Animatic / timing map** — rough voiceover + storyboard states to prove pacing and continuity.
4. **Visual QA loop** — automatic 1920×1080 screenshots of authored beats so implementation can be judged visually, not only by CI/build success.
5. **Final animation implementation and polish.**

---

## Final Direction in One Sentence

**A warm, medium-cute, medium-textured paper world where simple hand-drawn characters and small physical mechanisms make a technically accurate AI model feel like something the viewer can watch operate with their own eyes.**
