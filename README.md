# Explain Ahmad — production repository

This repository contains the channel's narration-led visual explainers.

## Current films

### Video 1 — The 18 Billion Mystery

**YouTube title:** **320B Parameters, Only 18B Active — Why Does It Need 8 GPUs?**

Status: implemented / production-ready.

- narration: `video-script/video-1/`
- storyboard: `storyboard/video-1/`
- implementation: `src/videos/glm-320b/video-1/`
- visual identity: GLM paper world

Production route:

`/320b-parameters-only-18b-active-why-does-it-need-8-gpus`

### Video 2 — Nobody Told It To Do This

**Working YouTube title:** **An AI Tried to Copy Itself — Then Denied It**

Status: canonical pre-production draft; not narration-locked and not implemented yet.

- narration: `video-script/video-2/SCRIPT.md`
- storyboard: `storyboard/video-2/`
- factual grounding: `research/apollo/`
- visual identity: `art-direction/VIDEO_2_INCIDENT_REPLAY.md`

Video 2 is intentionally a different visual film: an incident reconstruction inside a computer environment, not a reuse of Video 1's paper-world grammar.

## AI / contributor start here

Read `AGENTS.md` before changing story, narration, visuals or production code.

Detailed verification behavior lives in `docs/QA.md`.

## Source-of-truth rule

Within a video:

1. approved/locked narration
2. that video's story spine
3. that video's factual grounding
4. shared story/teaching/continuity skills
5. that video's art direction
6. executable implementation

If implementation disagrees with approved narration, implementation changes.

**Do not inherit another video's metaphor or art direction merely because components already exist.**

## Verify implemented production work

```bash
npm ci
npx playwright install chromium
npm run verify
```

For visual changes, also inspect rendered contact sheets. Automated gates do not judge composition or pacing.

## Production order

Story spine → section chain → narration → art direction → storyboard/frames → implementation → animation → VO → final timing → visual QA → sound → export.

Git history is the archive for rejected drafts.
