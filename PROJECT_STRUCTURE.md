# Project Structure

Keep the repository easy to read. Each top-level folder has one job.

## `skills/`
Reusable rules for how explainers are designed and built.

Examples: explanation design, continuity, diagram grammar, interaction patterns, visual system, refinement standards.

These are **not video-specific**.

## `research/`
Source notes and factual research used to understand a topic or study other explainers.

- `research/ncase/` — Nicky Case / explorable-explanation study notes
- `research/glm/` — GLM architecture and technical research
- `research/RESEARCH_NOTES.md` — general research notes

Research informs the work; it is not the current script.

## `video-script/`
The current spoken YouTube script.

This folder should contain what Ahmad plans to **say**. Visuals should only be added here after they are deliberately locked sentence-by-sentence.

## `archive/`
Old experiments, previous-version plans, audits, rollback notes, and superseded visual attempts.

Useful for history, but **not authoritative for the current video**.

## `src/`
The actual React/Vite implementation and reusable visual components.

Changing `skills/`, `research/`, `video-script/`, or `archive/` does not mean the production UI should automatically be redesigned.
