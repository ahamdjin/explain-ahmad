# Project Structure

Keep the repository easy to read. Each top-level folder has one job, and it
should be obvious what is **current**, what is **reference**, and what is
**historical**.

## Authority order

When two files disagree, the earlier one wins:

1. `video-script/` — the current spoken script
2. `storyboard/` — the current story and visual structure
3. `research/` — factual and teaching reference
4. `art-direction/` — the visual language
5. `src/` — the implementation
6. `archive/` — history only, never authoritative

Implementation follows the story and the research; it does not redefine them.
The reverse is also true and is the more common mistake: a story problem is
never fixed by changing the art.

## What is current

There are two cuts, and this table is the only place that says which is which.

Everything for one video sits under a folder of that video's name, in all
three places:

| | **Video 1 — the film** | Video 2 — a proposal |
| --- | --- | --- |
| route | `/watch`, `/video-1` | `/video-2` |
| script | `video-script/video-1/` | `video-script/video-2-gpt/` |
| story | `storyboard/video-1/` | `storyboard/video-2-gpt/` |
| code | `src/videos/glm-320b/video-1/` | `src/videos/glm-320b/video-2-gpt/` |
| status | 13 sections, 164 beats, ~21 min | 120 beats, on the superseded v9 engine |

Everything superseded lives in `src/videos/glm-320b/superseded/` and stays
routed (`/old/section-NN`, `/why-320b-uses-18b`, `/gpt-section-01`) so the cuts
can be compared. Nothing there is authoritative.

**The tooling only reads `video-1/`.** `board`, `check:chain`, `check:board`,
`check:strategy`, `timing` and `readthrough` all point at
`video-script/video-1/`.

## `skills/`
Reusable rules for how explainers are designed and built: explanation design,
continuity, diagram grammar, interaction patterns, visual system, refinement
standards. These are **not video-specific**.

`skills/STRATEGY_LEDGER.md` is the one that gates the writing: every technique
used in a beat must be named there with a **teacher** and an **evidence tier**
(A = primary source read directly, B = trade blog with no study behind it,
C = my own inference with no source). `npm run check:strategy` enforces it and
reports what share of the video rests on tier C.

## `research/`
Source notes and factual research used to understand a topic or study other
explainers.

- `research/glm/GLM_V7_ATTENTION_MOE_RESEARCH.md` — the current GLM technical reference
- `research/ncase/NCASE_STUDY_INDEX.md` — entry point for the Nicky Case studies
- `research/RESEARCH_NOTES.md` — general notes

Research informs the work; it is not the current script. Older
version-specific research belongs in `archive/`.

## `art-direction/`
The visual language, locked before storyboard and implementation: palette,
paper treatment, character, line style, motion language, visual semantics,
composition rules, and what must be avoided.

- `art-direction/PALETTE.md` — one thing, one colour, and the paper recipe
- `art-direction/CAST.md` — the twenty-two poses and the figures
- `art-direction/PROPS.md` — the object library
- `art-direction/GLM_PAPER_WORLD.md` — the original world lock

## `video-script/`
What Ahmad plans to **say**.

`video-1/01-…` through `video-1/13-…` are the current spoken script, one file
per section, and `video-1/READ_ALOUD.md` is the whole thing in order for
recording. `video-2-gpt/GPT.md` is a proposal. Each folder has its own README.

## `storyboard/`
The pre-production bridge between script and implementation.

`storyboard/video-1/STORY_SPINE.md` is the authoritative chain for Video 1 — what each
section adds and how it hands off. `SECTION_MAP.md` is the earlier high-level
map and is kept for reference. `BOARD.md` is generated. `GPT.md` is Video 2's
120-beat board and is a proposal.

## `archive/`
Old experiments, previous-version plans, audits, rollback notes, superseded
visual attempts. Useful for history, **not authoritative**. Ideas can be
recovered from here, but only become current once deliberately moved into the
current script, storyboard, or research.

## `docs/`
How to operate the thing: `docs/VOICE_OVER.md` is the record → measure → edit
order for audio.

## `src/`
The actual React/Vite implementation.

```text
src/paper/          the reusable library -- the only part Video 1 uses
  palette.ts        every colour, one file; the CSS vars are generated from it
  director.tsx      SectionRunner: the beat clock, sticky overlays, keys, pause
  scene.ts          mergePatches, actorVerbs, the shared initial actors
  notes.ts          note / centred / brace / arrow / tick
  prompt.ts         the running prompt and every number derived from it
  rail.tsx          BeatRail and ChapterDots
  cast/             people and story objects (Narrator, Hospital, Memory, ...)
  props/            the object library (books, hardware, creatures, vehicles)
  paper.css         the generated palette block, component styles, the paper
src/videos/glm-320b/video-1/section-NN/
  scene.ts          the persistent scene: what exists, and its initial state
  beats.ts          the beats: id, title, vo, secs, relation, patches
  Stage.tsx         how a scene state is drawn
  Section0N.tsx     wires the two together through SectionRunner
src/routes/         WatchPage (/watch), PaperCatalogue (/paper), LibraryHome
```

Everything else under `src/` -- `engine/`, `examples/`, `lab/`, `scenes/`,
`components/`, `visuals/`, `patterns/`, `continuity/`, `vendor/` -- is earlier
exploration. It is kept because it is reachable from `/` and worth reading, and
it costs Video 1 nothing: every route is lazy and owns its own CSS.

Changing `skills/`, `research/`, `art-direction/`, `video-script/`,
`storyboard/`, or `archive/` does not mean the production UI should
automatically be redesigned.

## Generated files -- never edit by hand

| file | from | command |
| --- | --- | --- |
| `storyboard/video-1/BOARD.md` | every section's `beats.ts` | `npm run board` |
| `video-script/video-1/READ_ALOUD.md` | every section's `beats.ts` | `npm run board` |
| the palette block in `src/paper/paper.css` | `src/paper/palette.ts` | `npm run palette` |

## Stylesheets

`src/styles.css` and `src/reset.css` are global. Every other stylesheet is
imported by the route or component that needs it, so a route only pays for its
own CSS. **Order matters** where two sheets define the same class -- see the
note at the top of `src/routes/StyleGalleryPage.tsx`.
