# GPT Section 1 — comparison storyboard

Status: implemented comparison, not a replacement of the original.

Route: /gpt-section-01. Original: /section-01.

26 beats, 121 seconds of visual playback. No recorded narration is included.

## Direction

Visual thesis: a quiet paper hospital where one small team makes a large-memory question tangible.

Content plan: two numbers → one department → selection → weight mismatch → proposed storage-to-memory transfer → unanswered question → entrance.

Interaction thesis: the desk visibly selects before being named; the same eight move from their actual positions into the proposed workspace; the narrator clears a sheet and the original word enters the model.

The source narration's question and generic hardware framing remain. This alternate script introduces the hospital explicitly, uses learned numbers rather than equating parameters with facts, and acknowledges shared machinery. The ending preserves the plan and asks what is missing; no barrier or claim that offloading is impossible.

## What changes from the original

- One expert population, with persistent keyed identities; selected actors are not copied into new drawings.
- Neutral numerical badges maintain identity across scale changes. Their selection is illustrative, not an actual model trace.
- The desk receives the current representation and visibly selects before the ROUTER label arrives.
- Storage and proposed working memory are separate locations. The depicted department is explicitly one routing step.
- The 18B active count is model-wide; eight routed experts in one layer are only part of that path. Shared machinery remains acknowledged.
- A smaller machine is a hypothesis: no unverified RAM capacity, speed, or fit claim.
- A single code-owned timing source drives playback and recording.
- Review controls disappear with P. Space/Right advances; Left reverses; Home/End jump; Script reveals narration.

## Research

Read against video-script/01-opening-narration.md, the corrected contract in video-script/01-the-night-shift.md, storyboard/section-01/STORYBOARD_V5.md, and research/glm/GLM_V7_ATTENTION_MOE_RESEARCH.md.

Rechecked 2026-09-09: [official model card](https://huggingface.co/zai-org/GLM-5.3-Flash) and [official config](https://huggingface.co/zai-org/GLM-5.3-Flash/blob/main/config.json). Config exposes 288 routed experts, top-8, one shared expert, 45 layers and 3 initial dense layers. The opening says “word” as a deliberate introductory simplification; precise tokenization belongs downstream.

## Beat board

Generated from src/videos/glm-320b/gpt-section-01/beats.ts. Edit that file first if revising timings or spoken lines.

### 1. A very large model — 4s

**Voice:** GLM-5.3-Flash has 320 billion parameters.

**Purpose:** Meet the model and its total size.

### 2. What those numbers are — 4s

**Voice:** Parameters are the numbers it learned during training.

**Purpose:** Parameters are learned numbers, rather than individual facts.

### 3. But only 18B are active — 5s

**Voice:** But for one word, only about 18 billion are active.

**Purpose:** The active path is much smaller than the whole model.

### 4. The gap, drawn to scale — 5s

**Voice:** It owns all of this, but uses about this much. Roughly six percent.

**Purpose:** 18 divided by 320 is about 5.6 percent.

### 5. So why have the rest? — 4s

**Voice:** Okay. So why have the other 300 billion?

**Purpose:** The unused-looking capacity creates a question.

### 6. A hospital of expert networks — 5s

**Voice:** This is a Mixture-of-Experts model. Picture a hospital with many expert departments.

**Purpose:** The hospital is an analogy for organised expert networks.

### 7. Look at one department — 6s

**Voice:** Let us look at one department. Here, there are 288 expert networks to choose from.

**Purpose:** This population represents one sparse routing layer, not all parameters.

### 8. A word comes in — 3s

**Voice:** A word comes in.

**Purpose:** One word is the persistent actor.

### 9. First, the front desk — 4s

**Voice:** The front desk reads what the model knows about it so far.

**Purpose:** Selection depends on the current representation.

### 10. Eight answer the call — 5s

**Voice:** And selects eight of those networks to work on it.

**Purpose:** The desk visibly causes selection before we name the router.

### 11. A small team — 5s

**Voice:** Eight out of 288. The other 280 are not selected for this step.

**Purpose:** The same selected actors leave their original places; no duplicate team.

### 12. And some machinery always works — 5s

**Voice:** There is shared machinery working too. So these eight are only part of the active path.

**Purpose:** Eight experts in one layer do not equal the entire 18B active path.

### 13. But the weights are still huge — 6s

**Voice:** But then I had another question. The full model still means hundreds of gigabytes of weights.

**Purpose:** Full-model weight size is separate from this small selection.

### 14. All of that, for a small part? — 4s

**Voice:** If only a small part is working, why deal with all of that?

**Purpose:** Hold the small team and full-model weight burden in one picture.

### 15. Why not keep just what we need? — 4s

**Voice:** Why cannot we keep just the small part we need?

**Purpose:** The proposed working set becomes a physical group.

### 16. That desk is the router — 5s

**Voice:** And the model already has a chooser. That front desk is the router.

**Purpose:** Name a mechanism whose function the viewer has already seen.

### 17. It already makes the selection — 5s

**Voice:** Its job is to choose which experts the current representation should go to. So...

**Purpose:** The existing decision makes selective loading seem plausible.

### 18. Suppose we did this — 5s

**Voice:** What if we left the full weights in storage, and made a smaller place to work?

**Purpose:** Clearly separate stored weights and proposed working memory.

### 19. Load the selected experts — 5s

**Voice:** Load the experts we need, alongside the machinery that always works.

**Purpose:** The same eight move into the proposed memory space.

### 20. Leave the others asleep — 4s

**Voice:** Use those, and leave everything else asleep in storage.

**Purpose:** Inactive is scoped to this illustrated routing step.

### 21. Could the whole idea fit? — 6s

**Voice:** Could that let a 320-billion-parameter model run on a much smaller machine?

**Purpose:** This is a hypothesis, not a measured memory-fit claim.

### 22. And if not... — 3s

**Voice:** And if not...

**Purpose:** The plan remains intact. Only the narrator hesitates.

### 23. What are we missing? — 6s

**Voice:** What exactly is stopping us?

**Purpose:** End on the unresolved memory question without asserting impossibility.

### 24. A diagram is not the answer — 4s

**Voice:** Staring at the final architecture is not going to answer that.

**Purpose:** The complete diagram is context, not the explanation.

### 25. Follow what actually happens — 4s

**Voice:** So let us follow what actually happens inside.

**Purpose:** The narrator physically clears the sheet and reveals an entrance.

### 26. One word. From the beginning. — 5s

**Voice:** One word. From the beginning.

**Purpose:** The original word enters the model; Section 02 starts here.

## Review

- Run dev server: npm run dev -- --host 127.0.0.1 --port 5174
- Capture storyboard: npm run frames:gpt
- Record timed visual playback: npm run record:gpt
- Output: output/playwright/gpt-section-01/index.html and gpt-section-01.webm
- The record and capture scripts never remove the original frames directory.

## Scope

This is a Section 01 study. The final word enters the doorway; the next section is not implemented in this route. Portrait screens retain the 16:9 composition for review, not a separate mobile reading layout. The later memory-transfer explanation remains outside this opening.
