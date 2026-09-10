# GLM 320B explainer implementation

## Active

The live route currently uses:

`v9/Glm320bProductionV9.tsx`

`src/videos/registry.tsx` is the final authority.

## Legacy files in this folder

Loose root-level files such as:

- `Glm320bVideo.tsx`
- `Glm320bVideoV3.tsx` through `Glm320bVideoV7.tsx`
- old `glm-320b-video*.css`

are earlier production experiments. They are **not current** unless the registry explicitly imports them.

Do not edit an old version thinking it changes the current video.

## Story authority

Implementation does not define the final story. Use:

1. `video-script/`
2. `storyboard/SECTION_MAP.md`
3. `research/glm/GLM_V7_ATTENTION_MOE_RESEARCH.md`

before changing production code.