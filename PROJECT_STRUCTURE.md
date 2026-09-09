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

For the current GLM explainer, `art-direction/GLM_PAPER_WORLD.md` is the source of truth. Once locked, do not repeatedly reinvent the style while storyboarding or coding.

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

## `src/`
The actual React/Vite implementation and reusable visual components.

Changing `skills/`, `research/`, `art-direction/`, `video-script/`, `storyboard/`, or `archive/` does not mean the production UI should automatically be redesigned.
