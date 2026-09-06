# Explanation Design Standard

## North star

> The interface should disappear into the explanation.

A viewer should feel like they are manipulating an idea, diagram, character, system, or simulation — not operating a website.

## What a real video scene is

A real scene is an authored `100vw × 100vh` frame with one conceptual job.

The default composition is diagram-first:
- 70–90% of attention belongs to the visual / diagram / simulation / object.
- Text supports the visual rather than competing with it.
- Most text should be labels, short questions, numbers, tiny explanations, or one conversational sentence.
- Large landing-page headlines are opt-in, not the default.

## UI is allowed only when it teaches

Tabs, buttons, sliders, toggles, inputs, cards and menus are allowed when they are part of the explanation.

Good reasons:
- compare Q / K / V
- switch Before / After
- choose Cooperate / Cheat
- change a simulation parameter
- inspect Beginner / Advanced views
- reveal the next causal step

Bad reason:
- every website usually has tabs
- navigation needs to look designed
- the scene feels empty
- controls are being added as decoration

## Buttons

A button should sit near the object or decision it affects.

Prefer labels like:
- Continue
- Try it
- Cooperate
- Cheat
- Show the router
- What happens next?

Avoid permanent Previous / Reset / Next toolbars on real video pages unless the story itself needs them. Keyboard controls can remain invisible for recording.

## Typography

Default typography should be calm and readable.

- modest heading sizes
- comfortable tracking and line height
- short copy
- labels large enough to read in a YouTube frame
- no tiny dashboard text
- no giant headline merely to fill space

Big type is a storytelling device, not a layout default.

## Containers

Do not put every object inside a card.

Prefer:
- open canvas
- lines and arrows
- characters
- objects
- labels placed directly by the thing they describe
- whitespace as structure

Use a box only when the box means something: a model boundary, context window, browser, memory store, terminal, expert, document, etc.

Rounded cards and shadows are not banned. They are valid when they represent a real surface, object, window, control cluster, or deliberately elevated layer. They should not be the default wrapper for empty space.

## Motion

Motion must reveal causality, hierarchy, continuity, or focus.

Useful:
- an input physically travels into a model
- experts appear after router selection
- a shared token persists across a scene change
- an object moves because a user changed a parameter
- a section snaps exactly because the story is beat-based

Decorative motion is secondary.

## Interaction vocabulary

Do not start with an animation technique. Start with the teaching need.

Examples:
- **direct manipulation** when touching the object is clearer than a detached control
- **details on demand** when permanent labels would clutter the overview
- **causal trace** when the viewer needs to follow what travels through a system
- **progressive disclosure** when hierarchy matters
- **comparison** when differences are the lesson
- **shared-object continuity** when an object survives a scene change
- **scrubbing** when understanding depends on seeing continuous change
- **focus lens** when one region needs attention without losing context

The full research-backed catalog lives in `src/patterns/catalog.ts` and `docs/INTERACTION_PATTERNS.md`.

## Refinement test for every interaction

1. Can the viewer tell what can be touched without a tutorial overlay?
2. Is the control near the thing it affects?
3. Does the action respond immediately?
4. Can the viewer visually follow what changed and why?
5. Is the current state obvious without tiny metadata?
6. Can the action be reversed, compared, or reset without losing orientation?
7. Does complexity appear only when it becomes useful?
8. Does it still make sense with mouse, touch, keyboard, and presenter mode?

## Art direction

Paper/sketch is a favored art direction, not a global lock.

The engine may use paper, clean, editorial, technical, or future visual languages. Regardless of style, the explanation-first rules above remain the same.

## Library vs video pages

`/`, `/styles`, and `/lab/:demo` are internal library/tutorial surfaces. They may use navigation cards, tabs, indexes, and module selectors because those controls explain the library itself.

The lab itself has no persistent demo chrome. Press `L` or `Cmd/Ctrl+K` to open the internal command palette; presenter mode removes that surface completely.

Real video pages are different. A real route is created only after the actual video/script is known. It should not inherit library chrome.

## Final test

Before shipping a scene ask:

1. What single thing should the viewer understand here?
2. Is the visual doing most of the explaining?
3. Is every visible control necessary for that explanation?
4. Could I remove a card, heading, toolbar, or label without losing meaning?
5. Does it feel like an interactive illustration — or like software?

If it feels like software, simplify.
