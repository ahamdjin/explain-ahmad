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

Older `Glm320bVideo*` files and old versioned CSS in `src/videos/glm-320b/` are legacy experiments. Do not treat them as current just because they remain in the repository.

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

When files disagree, use this priority:

**current script → current storyboard → current research → art direction → implementation → archive**

Archive material may contain useful ideas, but it is never authoritative unless deliberately brought back into the current files.

## Run

```bash
npm install
npm run dev
```

## Credits

See `NCASE_CREDITS.md` and `THIRD_PARTY.md`.