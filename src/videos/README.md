# Video implementations

One folder per topic. Inside it, one folder per **cut** of that video.

## glm-320b

| | route | folder |
| --- | --- | --- |
| **Video 1 — the film** | `/watch`, `/video-1` | `glm-320b/video-1/` |
| Video 2 — a proposal | `/video-2` | `glm-320b/video-2-gpt/` |
| superseded, kept routed | `/why-320b-uses-18b`, `/old/section-NN`, `/gpt-section-01` | `glm-320b/superseded/` |

`registry.tsx` is the authority for what is live, and `npm run smoke` reads its
route list from there.

This file used to say the current video was `v9`. It was, on `main`, and had
not been true since the thirteen sections landed — which is how a reader ends
up building the wrong film. If you change what is live, change this table.

## Rule for versions

- **Do not infer the current story from implementation files.** The story
  authority is `storyboard/video-1/STORY_SPINE.md`, then
  `video-script/video-1/`. Code is fifth in the authority order; see
  `PROJECT_STRUCTURE.md`.
- New production work goes inside the active cut's folder. No loose
  root-level `V*.tsx`.
- A cut that is retired moves to `superseded/` and stays routed, so the old and
  new can be watched side by side.

Capability demos belong in `/lab`, not here.
