# Explain Ahmad

Interactive explainer project. The current video is about **why GLM-5.3-Flash can have 320B total parameters while using about 18B active parameters per token**.

## Start here — current sources

Use these files in this order:

1. `video-script/01-opening-narration.md` — **current spoken script**. Only the opening is written here so far.
2. `storyboard/SECTION_MAP.md` — **authoritative current story / section structure**.
3. `research/glm/GLM_V7_ATTENTION_MOE_RESEARCH.md` — **current GLM technical reference**.
4. `research/ncase/NCASE_STUDY_INDEX.md` — entry point for teaching / Nicky Case research.
5. `art-direction/GLM_PAPER_WORLD.md` — current visual language.
6. `src/videos/registry.tsx` — tells you which production implementation is actually active.

**Important:** implementation is not the source of truth for story or technical claims. Script, storyboard and research come first.

## Current production

The active route is:

`src/videos/glm-320b/v9/Glm320bProductionV9.tsx`

Earlier loose V1–V8 GLM implementations and stylesheets have been removed from the working tree. Git history preserves them if needed.

## Repository map

- `video-script/` — words Ahmad currently plans to say.
- `storyboard/` — current story structure and visual beats.
- `research/glm/` — factual / architecture research.
- `research/ncase/` — teaching and explainer research.
- `art-direction/` — current visual rules.
- `skills/` — reusable explainer rules, not video-specific facts.
- `src/` — implementation and reusable visual code.
- `archive/` — superseded material kept only for history/reference.

See `PROJECT_STRUCTURE.md` for the authority rules.

## Core rule

**The video is built.** Thirteen sections, 164 beats, 21:39, click-to-advance.
Remaining: voice-over, and a pacing pass once there is audio to cut against
(every `secs` is currently a 145-wpm word-count floor, not a measured take).

Start at **`/watch`** (also **`/video-1`**) — it runs all thirteen in order,
which is the only way any of it makes sense. Individual `/section-NN` routes
exist for review. **`/video-2`** is a separate, unfinished proposal cut; see
`PROJECT_STRUCTURE.md` for which is which.

Every beat is also exported as a still: `npm run frames:export` writes
`~/Desktop/explain-ahmad-frames/`, one PNG per beat plus an `index.html`
contact sheet.

The reusable library is `src/paper` (browse it at **`/paper`**). Everything
else under `src/` is earlier exploration, kept for reference and reachable
from `/`; none of it is loaded by the video.

North star:

> **The interface should disappear into the explanation.**

A viewer should feel like they are manipulating an idea, diagram, character, system, or simulation — not operating a website.

This library intentionally over-builds interaction quality and robustness. More code is acceptable when it buys clearer continuity, better tactile response, safer interruption handling, stronger recording behavior or more reusable visual language. Decorative complexity is not the goal.

## Library routes

- `/watch`, `/video-1` — **the video**, all thirteen sections in order (`?play=1`, `?chrome=0`, `?section=N`)
- `/paper` — every reusable piece and object in every state
- `/section-01` … `/section-13` — one section, for review only
- `/` — index of all of the above, plus the older studies
- `/styles` — art-direction reference
- `/lab/:demo` — capability demos
- `/video-2` — the GPT alternate cut, 120 beats, a proposal in the v9 engine
- `/why-320b-uses-18b` — production v9, superseded
- `/old/section-01` … `/old/section-08` — the superseded eight-section cut

Every route is lazy-loaded and owns its own CSS, so opening one does not pay
for any of the others. `npm run smoke` opens every one and fails on any console
error, page error or failed request.

## Core story hierarchy

```text
Video
  └─ Section / World
      └─ Beat
          └─ Actor
              └─ Portal (when an actor bridges into the next world)
```

**New sentence does not imply new section.** Keep one conceptual world alive while the narration elaborates it. Create a new section only when the viewer's mental coordinate system changes.

Persist conceptual actors whenever continuity teaches causality. A token that moves, gains an ID and enters a lookup surface should still feel like the same token.

See `skills/CONTINUITY_SYSTEM.md`.

## Scene rules

- one authored section/world = `100vw × 100vh`
- diagram/visual usually carries most of the explanation
- real-video text is normally minimal: labels, numbers, questions, one-line narration
- UI controls are allowed only when they teach, compare, control, reveal or explore
- visible controls belong near the object/decision they affect
- prefer object-as-control when the object itself communicates the action
- big typography is optional, not the default
- rounded cards/shadows are allowed when they represent meaningful surfaces
- no decorative neon/glow/glass styling by default
- white/off-white + black ink is the visual foundation; accents are restrained
- paper/sketch is a favored art direction, not a global lock

See:
- `skills/EXPLANATION_DESIGN.md`
- `skills/REFINEMENT_STANDARD.md`
- `skills/CONTINUITY_SYSTEM.md`
- `skills/INTERACTION_PATTERNS.md`
- `skills/VISUAL_SYSTEM.md`

## Core interaction languages

- Ncase-style click / Continue / choice stories
- beat continuity inside one section
- native section snap
- exact one-gesture-one-scene paging
- shared-object portal transitions between worlds
- continuous scrollytelling
- simulations and drag/manipulation
- diagrams, signal flow and camera/focus

No single interaction mode is forced onto every story.

## Continuity benchmark

`/lab/continuity` demonstrates:

```text
plain prompt
  ↓ same actors
separate token objects
  ↓ same actors
selected rows + token IDs in an index
  ↓ same world rearranges
lookup paths → embedding book
  ↓ book itself becomes the control / portal
open embedding book world
```

It pressure-tests local controls, actor identity, meaningful surfaces, curved layout motion, repeated-input guards, shared-object transitions, reversal, reduced motion and responsive composition.

## Visual modules

Installed reusable capabilities include:

- Rough.js
- Rough Notation
- perfect-freehand
- Lucide React through semantic tree-shaken `VisualIcon`
- XYFlow / React Flow for complex graph scenes
- Motion
- GSAP specialist tools
- XState / @xstate/react for complex opt-in scene logic
- cmdk for the internal lab command palette only
- Lenis, opt-in only
- react-kino optional helpers

Future heavy engines such as Rive, Lottie and Three.js/WebGL/WebGPU stay uninstalled until a real story needs them.

## Explanation-first primitives

- `SceneFrame`, `VideoPage`
- `SceneDirector`, `ContinuityStage`, `ContinuityActor`, `ActorPresence`
- `SceneDeck`, `SharedElement`, `useActionGate`
- `DiagramStage`, `DiagramLabel`, `StoryNote`
- `StoryButton`, `StoryIconButton`, `ControlCluster`, `Hotspot`
- `BookVisual`, `IndexBoard`
- `VisualIcon`
- `SketchShape`, `SketchArrow`, `SketchAnnotation`, `HandDrawnStroke`
- `FlowDiagram`
- `VisualStage` / layers / masks / media
- `SignalFlow`
- `Camera`
- `DragGrid`

## Refinement gate

A component is not refined merely because it animates smoothly.

Review its opening, anticipation, hover/focus, press/grab, commit, settling, active state, disabled/busy state, reversal, exit, reduced motion, touch, keyboard, interrupted input, resize and recording behavior.

Production builds are also inspected for accidental dependency leakage. Heavy capabilities stay route/scene scoped.

## Recording controls

- `P` — presenter mode
- `F` — fullscreen
- `?present=1` — start in presentation mode
- keyboard navigation remains available where a scene supports it

## Internal lab controls

Lab chrome is invisible during normal viewing.

- `L` or `Cmd/Ctrl+K` — open the searchable lab command palette
- presenter mode prevents lab chrome from reopening during recording

## Run

```bash
npm install
npm run dev
```

## Commands

| | |
| --- | --- |
| `npm run dev` | the app |
| `npm run check` | typecheck, then the story-chain gates |
| `npm run check:chain` | every section's links meet, and none is circular |
| `npm run smoke` | open all 19 routes, fail on any error |
| `npm run board` | regenerate `storyboard/BOARD.md` from the beats |
| `npm run palette` | regenerate the CSS custom properties from `palette.ts` |
| `npm run frames:all` | one still per beat, plus a contact sheet |
| `npm run record` | the whole run to video, at authored timing |

`BOARD.md` and the palette CSS are **generated**. Edit the source, not them.

## Upstream / inspiration

See `NCASE_CREDITS.md` and `THIRD_PARTY.md`.