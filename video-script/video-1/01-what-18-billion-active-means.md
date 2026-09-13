# Section 01 — The five-percent problem

Status: **REWRITE v1.** This replaces the old 23-beat opening. It deliberately
removes the tower, 45 floors, 288 experts, 336 visits, router desk and MoE naming
from the opening. Those facts matter later, after the viewer knows what they
count.

Spine: `storyboard/video-1/STORY_SPINE.md` · Numbers: `research/glm/GROUND_TRUTH.md`
Teaching: `skills/STORY_STRUCTURE.md`, `skills/SPATIAL_CONTINUITY.md`,
`skills/BEAT_GRANULARITY.md`, `skills/DIAGRAM_GRAMMAR.md`,
`skills/ncase/NCASE_LEARNING_AND_EXPLANATION_NOTES.md`

## Contract

| | |
| --- | --- |
| Answers | **about five percent active does not predict how much hardware a model needs** |
| Exits on | **what is the first thing the model actually receives when you hit send?** |
| → next | the prompt has to become something the model can work with |
| Built | **17 beats** · ~1:45 placeholder timing · `npm run timing` is the authority |
| Teaches | only enough meaning for **parameter** and **active** to understand the opening claim |
| Plants | the tempting plan: **if the active part were fixed, keep only that part ready** |
| Does not teach yet | token, token ID, embedding, attention, router, expert, layer, MoE, 288, 336 |

## Story event

The viewer gets enough information to make one fair prediction:

> Two models both use about five percent of themselves at a time, so their
> hardware needs should be roughly similar.

Then the prediction fails: **one 80 GB accelerator versus eight** under the
native fully-resident comparison.

That failure earns the video's real mystery:

> If GLM says 18 billion parameters are active, **which 18 billion?**

We do not answer it here. We turn the rest of the video into an experiment:
follow one real prompt through the model and watch what actually gets used.

---

## The script

This block mirrors `src/videos/glm-320b/video-1/section-01/beats.ts`.

### Act 1 — make the obvious model (beats 1–2)

> **1.** *(GLM arrives as one block; a small region lights.)* Three hundred and twenty billion parameters. Only eighteen billion active. Sounds like most of the model isn't doing anything, right?
>
> **2.** *(The active region lifts out of the block as a hypothetical plan.)* So here's the obvious guess: if only a small part is working, you should only need that small part close by.

### Act 2 — test the guess (beats 3–8)

> **3.** *(A second model arrives beside GLM; both show about five percent active.)* Let's test that. These two models both use about five percent of themselves for each token.
>
> **4.** *(Everything holds; the viewer gets a fair choice.)* Same percentage. So make a guess: roughly similar hardware, or wildly different?
>
> **5.** *(One accelerator lands under the left model.)* This one fits on a single eighty-gigabyte accelerator.
>
> **6.** *(Eight arrive under GLM, one countable card at a time.)* To keep GLM fully loaded at the precision it ships in, you need eight.
>
> **7.** *(The comparison holds: about five percent above, one versus eight below.)* Same basic idea: most of the model stays inactive. But the hardware is nowhere close. So "five percent active" clearly isn't telling us the whole story.
>
> **8.** *(One tiny mark in GLM gets a short definition note.)* And if "parameter" is a fuzzy word, don't worry. For now, just think of it as one learned number inside the model.

### Act 3 — turn the contradiction into the real mystery (beats 9–13)

> **9.** *(The comparison model leaves; GLM returns to the centre.)* So here's the question I actually care about.
>
> **10.** *(One real active patch and one dashed possible patch are visible.)* When GLM says eighteen billion are active... which eighteen billion?
>
> **11.** *(The dashed possibility moves elsewhere while the real patch stays fixed.)* Maybe they're always the same ones. Or maybe the useful part can be somewhere else. We don't know yet.
>
> **12.** *(The real active patch lifts into a temporary "keep ready?" tray.)* Because if they are fixed, our idea works: keep that part ready, and leave the rest alone.
>
> **13.** *(The patch returns; the model becomes whole again.)* So rather than guessing, we're going to follow one real prompt through this model and watch exactly what gets used, when, and why.

### Act 4 — begin the experiment (beats 14–17)

> **14.** *(GLM slides right; a chat window enters from the left.)* And we'll do it with one example all the way through.
>
> **15.** *(The running prompt types into the chat.)* Let's use: "The dog dropped the ball, and it".
>
> **16.** *(The completed prompt holds; nothing has been tokenized yet.)* Once it breaks apart, we'll pick one piece and keep following that same piece through the machine.
>
> **17.** *(Send is committed; a dashed path starts toward GLM and stops halfway.)* I hit send. What is the first thing the model actually receives?

---

## Storyboard

`where` is intentionally the same for all 17 beats. This section has **no camera
teleports and no new full page**. It is one paper stage; objects enter, move,
change state and leave on that same surface.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | GLM slides into the centre as one model block; one ~5% region lights | `Block` + `320B total` + `18B active` | GLM-5.3-Flash | S-04 |
| 2 | the paper stage | — | the lit region physically lifts clear, leaving holes behind; a small `keep this part?` note appears | same GLM block, lifted patch | hypothesis only | S-14 |
| 3 | the paper stage | — | the patch settles; GLM moves right while a second model slides in from the left; both show ~5% active | two `Block`s side by side | gpt-oss-120b vs GLM-5.3-Flash | S-04 |
| 4 | the paper stage | — | nothing in the models changes; two temporary prediction choices appear below them | two models + `roughly similar` / `wildly different` | fair prediction | S-05 |
| 5 | the paper stage | — | prediction choices leave; one 80 GB accelerator card slides under the left model | left `Rig` ×1 | 1 × 80 GB | S-04 |
| 6 | the paper stage | — | accelerator cards arrive under GLM in countable stages until there are eight | right `Rig` → 1 → 2 → 4 → 8 | 8 × 80 GB | S-04 |
| 7 | the paper stage | — | both models hold; the top measurement says ~5% while the bottom makes 1 vs 8 unavoidable | two blocks + both rigs | same active share, different footprint | S-14 |
| 8 | the paper stage | — | a tiny note points into GLM: `one mark = one learned number`; no architecture is introduced | comparison still present | parameter intuition | S-04 |
| 9 | the paper stage | — | the left model and its rig slide away; GLM moves back to centre with its eight-card context | centred GLM | — | S-14 |
| 10 | the paper stage | — | the real active patch stays lit while a dashed alternate patch appears elsewhere | `Block` lit A + ghost B | `which 18B?` | S-08 |
| 11 | the paper stage | — | only the dashed hypothetical patch changes location; the real active patch does not | lit A + ghost B→C | possibilities, not an answer | S-04 |
| 12 | the paper stage | — | the ghost disappears; the real active patch lifts out again under a `KEEP READY?` hypothesis | lifted active patch | tempting plan | S-14 |
| 13 | the paper stage | — | the patch returns exactly to its holes; the hardware context clears so the whole model is the hero again | whole GLM block | follow one real prompt | S-03 |
| 14 | the paper stage | — | GLM slides to the right; a chat window slides in from the left; both remain visible | `Chat` + same GLM `Block` | GLM-5.3-Flash | S-04 |
| 15 | the paper stage | — | the real running prompt types character by character inside the chat | `Chat` + GLM | `The dog dropped the ball, and it` | S-04 |
| 16 | the paper stage | — | typing stops and the intact sentence holds; **no word card and no token appears yet** | intact human text | same prompt | S-04 |
| 17 | the paper stage | — | the prompt is committed; a dashed causal path begins at the chat and stops halfway to GLM | chat left, GLM right, half-path between | `what reaches the model first?` | S-08 |

## Component lifecycle

| actor | appears | changes | leaves |
| --- | --- | --- | --- |
| GLM `Block` | beat 1 | lifts active patch, moves right/centre/right, shows hypothetical ghost regions | **never** in §1 |
| second `Block` | beat 3 | holds comparison | beat 9 |
| left `Rig` | beat 5 | none | beat 9 |
| right `Rig` | beat 6 | counts to eight; moves under centred GLM | beat 13 |
| prediction choices | beat 4 | none | beat 5 |
| parameter clarification | beat 8 | none | beat 9 |
| ghost active-region hypothesis | beat 10 | moves once in beat 11 | beat 12 |
| `KEEP READY?` hypothesis | beat 12 | none | beat 13 |
| `Chat` | beat 14 | types prompt, then commits it | persists to the section end |
| causal path | beat 17 | begins but does not reach GLM yet | handed to §2 conceptually |

## Carrying frames

### Frame A — beat 6

Two models, both about five percent active. **One accelerator versus eight.**
This frame must make sense muted.

### Frame B — beat 10

One huge GLM block, one small real active region, one dashed possible region.
The picture itself asks: **which 18B?**

### Frame C — beat 17

Chat on the left, GLM on the right, the intact prompt still human-readable,
and a path that has started but not arrived. The viewer knows exactly what the
next section owes them.

## Truth notes

- GLM-5.3-Flash is 321B exact / marketed about 320B, with 18B active per token.
- `gpt-oss-120b` is about 4.4% active; GLM is about 5.6%. The narration says
  **about five percent** because the comparison is about the misleadingly
  similar headline share, not the decimal difference.
- The hardware comparison is deliberately scoped. `gpt-oss-120b` is ~58 GiB at
  its shipped MXFP4 format and fits one 80 GB accelerator. GLM is ~306 GiB at
  shipped FP8. Four 80 GB accelerators provide 320 GB decimal, less than the
  328.6 GB equivalent of 306 GiB; with the current tensor-parallel divisibility
  constraint, eight is the smallest workable fully-resident count used by this
  comparison. This is **not** a claim that GLM cannot run with offloading or
  quantization.
- A parameter is introduced only as **one learned number**. That is enough for
  this section and avoids dragging matrices/training into the hook.
- The lifted/ghost patches are explicitly hypotheses. They do **not** claim the
  real 18B is one contiguous region or that the same subset is used every time.
  The `Block` visualization uses a scattered authored patch for that reason.
- The prompt shown here is exactly the measured tokenizer prompt:
  `The dog dropped the ball, and it` — **no ellipsis is added on screen**, because
  punctuation would change the tokenizer input.

## Sound-compatible actions

- beat 3: paper slide as the second model arrives
- beat 5: one firm accelerator-card click
- beat 6: short countable card ticks, last one slightly heavier
- beat 12: paper lift
- beat 15: typing
- beat 17: one send/key press

Sound never carries information the frame needs in order to work.
