# Video 2 — the GPT narration

**A proposal. Not scheduled, not authoritative.** Route `/video-2`.
Storyboard: `storyboard/video-2-gpt/`. Code:
`src/videos/glm-320b/video-2-gpt/`.

Written by ChatGPT from `SECTION_MAP.md` and the GLM research. Ten sections
against Video 1's thirteen.

Reviewed in `storyboard/video-2-gpt/GPT_REVIEW.md`. The short version: its
causal spine is sound and three of its sentences are better than ours — the
router reads the *representation* not the token ID, QKV flagged as a teaching
lens, and "not naïvely recomputed from zero". But it deliberately removes every
magnitude (26 MB, 8 GB, 1.5 s, 336), so its payoff has no size, and it ends on
three abstractions and a homework question.

No tooling reads this folder.
