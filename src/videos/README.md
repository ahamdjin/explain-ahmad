# Video implementations

This folder contains real explainer implementations.

## Current GLM video

`registry.tsx` is the authority for which implementation is live.

Current route:

`why-320b-uses-18b` → `glm-320b/v9/Glm320bProductionV9.tsx`

Do not infer the current story from old implementation files. The story authority lives in `video-script/` and `storyboard/`.

## Rule for versions

- Active version: whatever `registry.tsx` imports.
- Older versioned implementations: legacy experiments/reference.
- New production work should live inside the active version folder rather than creating another loose root-level `V*` file.

Capability demos belong in `/lab`, not here.