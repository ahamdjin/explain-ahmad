# GLM v12 — Page 1 Opening Model World

Page 1 is rebuilt under the production loop:

**research → read teaching docs → define learner state → write the causal chain → design the static composition → map narration to focus/motion → code → visual QA → revise before Page 2**

## Research lock

Official model sources rechecked:

- https://huggingface.co/zai-org/GLM-5.3-Flash
- https://huggingface.co/zai-org/GLM-5.3-Flash/blob/main/config.json

Facts used on Page 1:

- GLM-5.3-Flash by Z.ai
- 320B total parameters
- ~18B active parameters
- 45 language layers
- first 3 feed-forward layers are dense
- remaining 42 feed-forward layers are sparse MoE
- 288 routed experts per sparse MoE layer
- top-8 routed experts per token
- 1 shared expert

Facts deliberately kept off Page 1 because they do not help the opening question yet:

- 154,880 vocabulary size
- 4,096 hidden size
- attention subtype split
- max context
- multimodal details
- router scoring implementation

## Teaching references reread

Project docs:

- `EXPLANATION_DESIGN.md`
- `CONTINUITY_SYSTEM.md`
- `DIAGRAM_GRAMMAR.md`
- `REFINEMENT_STANDARD.md`
- `INTERACTION_PATTERNS.md`
- `GLM_TEACHING_AUDIT.md`
- `GLM_V6_DESIGN_RULES.md`

Ncase studies:

- `NCASE_HOW_I_MAKE_EXPLORABLE_EXPLANATION.md`
- `NCASE_LEARNING_AND_EXPLANATION_NOTES.md`
- `NCASE_EXPLORABLE_EXPLANATIONS.md`
- `NCASE_I_DO_AND_I_UNDERSTAND.md`
- `NCASE_4_MORE_DESIGN_PATTERNS.md`
- `NCASE_POP_UP_TEXTBOOKS.md`

External learning research checked again:

- Mayer / Cambridge spatial contiguity: corresponding words and visuals should be physically close.
- Signaling: visual cues should direct attention to the relevant relation instead of adding a second explanatory layer.
- Coherence: remove information that does not help the current learning goal.
- Temporal contiguity: the visual change should happen while the narration describes the relation.

## The correction from the first v12 pass

The first pass improved animation and composition, but it still mostly followed a chronology:

`model → model type → total → active → definitions → architecture → question`

That is cleaner than the old page, but it is not a strong **BUT / THEREFORE** story.

The new causal spine is:

**GLM-5.3-Flash**

→ **320B total capacity**

→ **BUT ~18B active for one token**

→ **same-scale comparison makes the mismatch felt**

→ **define only the two terms needed to understand the mismatch**

→ **HEADACHE: how can both numbers be true?**

→ **architecture becomes a clue**

→ **BUT a parts list still does not show a token's actual path**

→ **SO follow one token and watch the path form**

The words `BUT` and `SO` are not floating UI. They live inside the relation that creates them.

## Important interpretation rule

**One new connection at a time does not mean one fact on screen at a time.**

The page is a stable visual world. Relevant information can coexist. Narration and signaling decide what is hero, support, and texture at each moment.

## Learner state

### Before Page 1

The viewer only has the promise of the video: a huge model somehow has a much smaller active parameter count for a token.

### After Page 1

The viewer should be able to say:

> GLM-5.3-Flash contains 320B parameters, but one token has an active path of about 18B. The architecture contains many possible expert blocks, but the architecture facts alone do not yet show which path one token takes. To understand the 320B → 18B gap, I need to follow a token through the model.

That final need is what causes Page 2.

## Full-screen rule

The old production stage fitted a 16:9 rectangle inside the browser viewport. That produced letterboxing and created a second artificial coordinate system.

For this route, the production frame now uses:

- `width: 100%`
- `height: 100%`
- no fixed 16:9 aspect-ratio constraint

The composition itself still has to be safe at 1920×1080 for recording, but it must fill the actual viewport instead of sitting inside a fitted frame.

## Static composition

The first ten beats use one stable technical-paper spread with three reserved zones. Nothing important is absolutely stacked over another teaching object.

### Zone A — identity

Top-left:

- Z.ai
- GLM-5.3-Flash
- `Large language model · Mixture of Experts (MoE)`

This establishes what we are opening. It is not the answer to the puzzle yet.

### Zone B — the contradiction

Main-left:

`320B TOTAL PARAMETERS`

**BUT**

`~18B ACTIVE FOR ONE TOKEN`

The numbers occupy the same row so the contrast is spatial, not remembered.

Directly beneath them is a same-scale ruler:

- 320B = full width
- 18B = 5.625% of that width
- label: `18 ÷ 320 ≈ 5.6%`
- explicit note: `size comparison only`

This is a ratio metaphor, not a literal claim that the active path is one contiguous 5.6% slice of the model.

Definitions are local to the terms they explain:

- `parameter = one learned value`
- `active = participating in this computation now`

### Zone C — architecture clue

Right side:

- 45-layer strip
- 3 dense first
- 42 sparse MoE after
- inside one sparse MoE layer: `288 available → top-8 routed/token + 1 shared`

At first this area is visible but quiet. It becomes hero only after the opening question exists.

The architecture then creates another limitation:

> **But this is still only the parts list. It does not show the path one token actually takes.**

That limitation directly creates the next step.

### Footer — causal bridge

Reserved bottom strip:

**SO → Follow one token’s path.**

This footer is part of the page geometry from the beginning, but stays invisible until the narration earns it. It does not appear on top of anything.

## Narration choreography

These are logic slots, not locked voiceover wording.

### Beat 1 — orient

Narration role:

> “This is the model we are going to open up.”

The full page exists. Identity is hero. Other facts are quiet support.

### Beat 2 — name the concrete example

> “GLM-5.3-Flash, from Z.ai.”

The name receives a restrained underline. No new panel appears.

### Beat 3 — establish total capacity

> “The whole model contains 320 billion learned parameters.”

320B becomes hero. The full 320B ruler draws.

### Beat 4 — create the BUT

> “But for one token, only about 18 billion are active.”

The word **BUT** sits physically between the two existing number objects. ~18B becomes hero and its same-scale ruler draws.

This is the first real plot turn.

### Beat 5 — make the mismatch felt

> “On the same scale, 18 billion is only about 5.6% of 320 billion.”

No new concept. We simply let the scale comparison become legible enough to create the headache.

### Beat 6 — define only what is needed

> “A parameter is one learned value. Active means participating in this token’s computation right now.”

Both definitions appear beside their own terms at the same time. We do not waste separate screens on definitions.

### Beat 7 — ask the question the viewer now owns

> “So how can both numbers be true?”

The question is directly below the numbers that created it. The viewer does not have to search for its referents.

### Beat 8 — reveal the clue

> “The clue is in how GLM is built.”

Right-side anatomy becomes hero:

- 45 layers
- 3 dense
- 42 sparse MoE
- 288 routed experts per sparse layer
- top-8 routed per token
- one shared expert

The left-side contradiction remains visible but quieter so the learner remembers why this architecture matters.

### Beat 9 — create the next BUT

> “But those numbers are still just a parts list. They don’t show which path this token actually takes.”

This limitation appears inside the architecture area that caused it, not in a detached banner.

### Beat 10 — THEREFORE / SO

> “So instead of memorizing the architecture, let’s follow one token and watch the path form.”

The reserved footer becomes hero:

**SO → Follow one token’s path.**

That is the causal bridge into the journey.

### Beat 11 onward — separate phase

The model page exits completely before the journey intro enters.

The old implementation dimmed the page and placed the next composition over it. That created visual collision and split attention.

The new rule is strict:

> **Two complete compositions may not occupy the same teaching space at once unless their overlap itself explains a transformation.**

## Collision-prevention rules

1. No teaching object may rely on `z-index` to solve a layout problem.
2. New information gets a reserved grid area before it becomes visible.
3. Definitions reserve height even while invisible, so later appearance cannot push into neighboring objects.
4. The question has its own row beneath the scale comparison.
5. Architecture is a separate grid column.
6. The causal footer is a separate grid row.
7. The opening and journey phases are mutually exclusive with `AnimatePresence`.
8. Emphasis uses opacity, line drawing, highlights, and small movement — not container scaling that can collide with neighbors.

## Motion rules

Motion on this page may teach only:

- **focus** — narration moved to an existing fact
- **scale** — 320B vs 18B
- **causality** — BUT and SO connect existing objects
- **hierarchy** — architecture becomes relevant only after the question
- **phase transition** — opening page leaves before the journey begins

No decorative scaling, floating annotation panels, or unrelated page effects.

## Visual QA process

A green TypeScript build is not visual approval.

For this branch, visual QA should capture every opening beat at multiple viewport sizes and inspect:

- 1920×1080 — recording target
- 1440×900 — taller desktop
- 1366×768 — shorter desktop

Check every captured beat for:

1. overlap / collision
2. clipping
3. unreadable text
4. two simultaneous heroes
5. labels far from their source
6. unexpected layout jumps
7. scale bars losing common origin
8. architecture becoming too dominant too early
9. question becoming detached from 320B / 18B
10. Beat 10 failing to make the next action feel inevitable

Do not start Page 2 until Page 1 survives this review.
