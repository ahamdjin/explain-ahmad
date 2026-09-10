# Project Structure

Each top-level folder has one job. The goal is to make it obvious what is **current**, what is **reference**, and what is **historical**.

## Authority order

When files disagree, use this order:

1. `video-script/` — current spoken script
2. `storyboard/` — current story / visual structure
3. `research/` — factual and teaching reference
4. `art-direction/` — visual language
5. `src/` — implementation
6. `archive/` — historical only

Implementation must follow the story and research; it does not redefine them.

## `video-script/`

What Ahmad currently plans to say.

Current state: only `01-opening-narration.md` is a current spoken-script draft. Do not assume implementation copy is the final script.

## `storyboard/`

Pre-production story structure.

`storyboard/SECTION_MAP.md` is the **authoritative current high-level story** for the GLM explainer.

## `research/`

Reference material, not narration.

- `research/glm/GLM_V7_ATTENTION_MOE_RESEARCH.md` — current GLM technical reference
- `research/ncase/NCASE_STUDY_INDEX.md` — entry point for teaching / Nicky Case studies
- `research/RESEARCH_NOTES.md` — general notes

Older version-specific research belongs in `archive/`.

## `art-direction/`

Visual rules only.

`art-direction/GLM_PAPER_WORLD.md` is the current GLM visual-language reference.

## `skills/`

Reusable explanation, continuity, interaction and visual rules. These are not GLM-specific facts or current narration.

## `src/`

React/Vite implementation.

For the GLM video, check `src/videos/registry.tsx` to identify the active implementation. Currently it points to `src/videos/glm-320b/v9/Glm320bProductionV9.tsx`.

Old versioned video implementations may remain for reference, but they are **legacy**, not current story sources.

## `archive/`

Superseded scripts, audits, experiments, old research and rollback material.

Nothing here is authoritative. Useful ideas can be recovered from archive, but only become current after being deliberately moved into the current script/storyboard/research.
