# Project Structure

Keep the repository easy to read. Each top-level folder has one job.

## `skills/`
Reusable rules for how explainers are designed and built.

Examples: explanation design, continuity, diagram grammar, interaction patterns, visual system, refinement standards.

These are **not video-specific**.

## `research/`
Source notes and factual research used to understand a topic or study other explainers.

- `skills/ncase/` — Nicky Case / explorable-explanation study notes
- `research/glm/` — GLM architecture and technical research
- `research/RESEARCH_NOTES.md` — general research notes

Research informs the work; it is not the current script.

## `art-direction/`
The authoritative visual language for a video/project before storyboard and implementation.

This is where we lock things such as palette, paper/material treatment, character personality, line style, motion language, visual semantics, composition rules, and what must be avoided.

For the current GLM explainer:

- `art-direction/PALETTE.md` — one thing, one colour, and the paper recipe
- `art-direction/CAST.md` — the fourteen poses and the seven figures
- `art-direction/PROPS.md` — the object library
- `art-direction/GLM_PAPER_WORLD.md` — the original world lock

Once locked, do not repeatedly reinvent the style while storyboarding or coding.
Story problems are never fixed by changing the art.

## `video-script/`
The current spoken YouTube script.

This folder should contain what Ahmad plans to **say**. Visuals should only be added here after they are deliberately locked sentence-by-sentence.

## `storyboard/`
The pre-production bridge between script and implementation.

Start with large visual sections/pages before creating individual storyboard frames. One section is one stable mental world and can contain several narration sentences and several frames.

For the current GLM explainer, `storyboard/SECTION_MAP.md` is the authoritative high-level visual/story structure. Detailed frames are created only inside a section after that section is understood.

## `archive/`
Old experiments, previous-version plans, audits, rollback notes, and superseded visual attempts.

Useful for history, but **not authoritative for the current video**.

## `docs/`
How to operate the thing: `docs/VOICE_OVER.md` is the record → measure → edit
order for audio.

## `src/`
The actual React/Vite implementation.

```text
src/paper/          the reusable library -- the only part the video uses
  palette.ts        every colour, one file; the CSS vars are generated from it
  director.tsx      SectionRunner: the beat clock, sticky overlays, keys, pause
  cast/             people and story objects (Narrator, Hospital, Memory, ...)
  props/            the object library (books, hardware, creatures, vehicles)
  paper.css         the generated palette block, component styles, the paper
src/videos/glm-320b/section-0N/
  scene.ts          the persistent scene: what exists, and its initial state
  beats.ts          the beats: id, title, vo, secs, relation, patches
  Stage.tsx         how a scene state is drawn
  Section0N.tsx     wires the two together through SectionRunner
src/routes/         WatchPage (/watch), PaperCatalogue (/paper), the older index
```

Everything else under `src/` -- `engine/`, `examples/`, `lab/`, `scenes/`,
`components/`, `visuals/`, `patterns/`, `continuity/`, `vendor/` -- is earlier
exploration. It is kept because it is reachable from `/` and worth reading, and
it costs the video nothing: every route is lazy and owns its own CSS.

Changing `skills/`, `research/`, `art-direction/`, `video-script/`, `storyboard/`, or `archive/` does not mean the production UI should automatically be redesigned.

## Generated files -- never edit by hand

| file | from | command |
| --- | --- | --- |
| `storyboard/BOARD.md` | every section's `beats.ts` | `npm run board` |
| the palette block in `src/paper/paper.css` | `src/paper/palette.ts` | `npm run palette` |

## Stylesheets

`src/styles.css` and `src/reset.css` are global. Every other stylesheet is
imported by the route or component that needs it, so a route only pays for its
own CSS. **Order matters** where two sheets define the same class -- see the
note at the top of `src/routes/StyleGalleryPage.tsx`.
