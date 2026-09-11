# glm-320b

| folder | route | what it is |
| --- | --- | --- |
| **`video-1/`** | `/watch`, `/video-1` | **The film.** Thirteen sections, one folder each. |
| `video-2-gpt/` | `/video-2` | ChatGPT's alternate 120-beat cut. A proposal, built on the superseded v9 engine. |
| `superseded/` | `/old/section-NN`, `/why-320b-uses-18b`, `/gpt-section-01` | Earlier builds, kept routed so they can be compared. |

`src/videos/registry.tsx` is the authority for what is live. `npm run smoke`
reads its route list from there, so a new section is covered the moment it is
registered.

## A section, inside `video-1/`

```text
section-NN/
  scene.ts       the persistent scene: what exists, and its initial state
  beats.ts       the beats: id, title, vo, secs, relation, patches
  Stage.tsx      how a scene state is drawn
  SectionNN.tsx  wires the two together through SectionRunner
```

Actors are mounted once and never rebuilt. A beat issues **partial patches**
that merge cumulatively, so persistence is the default. Never wrap a scene in
`AnimatePresence` keyed on the beat or the world — that destroys and remounts,
and every chapter boundary becomes a hard cut. `video-2-gpt/` does exactly that
and is the worked example of why not; see `storyboard/video-2-gpt/GPT_REVIEW.md`.

Story and script outrank this folder: `storyboard/video-1/STORY_SPINE.md`, then
`video-script/video-1/`.
