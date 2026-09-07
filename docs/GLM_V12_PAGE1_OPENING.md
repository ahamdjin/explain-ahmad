# GLM v12 — Page 1 Opening Model World

This is the first page rebuilt under the new production loop:

**research → read teaching docs → define learner state → design one complete composition → map narration to focus/motion → code only this page → visual QA before moving on**

## Research lock

Official model sources checked again before redesign:

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

Facts deliberately kept off this page because they do not help the opening question yet:

- 154,880 vocabulary size
- 4,096 hidden size
- 34 linear-attention / 11 sparse-attention split
- max context
- multimodal details
- router scoring implementation

Those are true, but Page 1 is not a spec dump.

## Teaching rules applied

Relevant project docs reread before design:

- `EXPLANATION_DESIGN.md`
- `CONTINUITY_SYSTEM.md`
- `DIAGRAM_GRAMMAR.md`
- `REFINEMENT_STANDARD.md`
- `INTERACTION_PATTERNS.md`
- `GLM_TEACHING_AUDIT.md`
- `GLM_V6_DESIGN_RULES.md`
- `NCASE_HOW_I_MAKE_EXPLORABLE_EXPLANATION.md`
- `NCASE_LEARNING_AND_EXPLANATION_NOTES.md`
- `NCASE_EXPLORABLE_EXPLANATIONS.md`
- `NCASE_4_MORE_DESIGN_PATTERNS.md`
- `NCASE_POP_UP_TEXTBOOKS.md`

The key correction from earlier versions:

> **One new connection at a time does not mean one fact on the screen at a time.**

The page may already contain a complete, readable model sheet. Narration and motion decide which relationship is the hero now.

## Learner state

### Before Page 1

The viewer knows only the video promise: a huge AI model somehow has a much smaller active parameter count for a token.

### After Page 1

The viewer should be able to say:

> “We are opening GLM-5.3-Flash. It stores 320B parameters, but only about 18B are active for one token. It has a sparse MoE architecture with 45 layers, 42 sparse MoE layers, 288 routed experts, top-8 routed experts per token, and one shared expert. I do not yet know how that architecture produces the 320B → 18B gap.”

That unresolved last sentence is the headache.

## Static composition

Page 1 is one technical paper spread, not ten mini slides.

### Left: model identity + parameter-scale comparison

- Z.ai / GLM-5.3-Flash
- Large language model · Mixture of Experts
- 320B TOTAL PARAMETERS
- ~18B ACTIVE / TOKEN
- a physical scale ruler comparing 320B with 18B
- local definitions for `parameter` and `active`
- the final question physically attached beneath those same two numbers

The scale ruler is a **ratio metaphor only**, not a literal map of which parameters are active.

### Right: model anatomy

One narrow anatomy column stays in the same paper world:

- 45 Transformer layers
- a 45-line stack showing first 3 dense and next 42 sparse MoE
- 288 routed experts / sparse layer
- top-8 routed / token / sparse layer
- +1 shared expert

This information can be present before narration reaches it, but remains support until the architecture line is spoken.

## Narration choreography

These are narration slots, not final voiceover wording.

### Beat 1 — establish the page

**Narration role:** “This is the model we are opening.”

**Screen:** the full model sheet already exists. Nothing begins from a blank canvas.

**Hero:** model identity.

### Beat 2 — name it

**Narration role:** “GLM-5.3-Flash, from Z.ai.”

**Motion:** title receives a restrained underline / emphasis. Other facts remain readable but quiet.

### Beat 3 — name the family

**Narration role:** “It is a Mixture-of-Experts model.”

**Motion:** the plain-language MoE note beside the subtitle wakes up. We still do not explain routing.

### Beat 4 — total capacity

**Narration role:** “The whole model stores 320 billion parameters.”

**Motion:** 320B becomes the hero and the full-width capacity ruler draws across the page.

### Beat 5 — active path

**Narration role:** “But for one token, only about 18 billion are active.”

**Motion:** 320B stays. The ~18B ruler draws directly beneath it at the same scale.

The viewer should *feel* the difference before we explain it.

### Beat 6 — signal the two terms

**Narration role:** “The important words are total and active.”

**Motion:** rough highlighter stays on those two labels. No new panel appears.

### Beat 7 — parameter definition

**Narration role:** “A parameter is one learned value stored in the model.”

**Motion:** definition appears immediately beside the 320B object.

### Beat 8 — active definition

**Narration role:** “Active means it participates in this token’s computation path.”

**Motion:** definition appears immediately beside the ~18B object.

### Beat 9 — architecture clue

**Narration role:** “And this model is built with 45 layers; 42 use sparse MoE feed-forward blocks, with 288 routed experts, top-8 routed per token, plus one shared expert.”

**Motion:** the already-present anatomy column becomes the hero. No dashboard cards. The 45-layer strip is the main visual proof.

### Beat 10 — headache

**Narration role:** “So how can a model contain 320B parameters while a token uses only ~18B?”

**Motion:** architecture recedes slightly. The two existing numbers stay in place and the question underneath them becomes the hero.

No detached QUESTION banner is allowed.

## Motion rules

Every movement on this page must teach one of these:

- **focus:** narration moved to a different existing fact
- **scale:** 320B versus 18B
- **hierarchy:** architecture is support until it becomes relevant
- **causality:** the final question is formed from the same two numbers already on screen

No decorative page-flipping, floating labels, or global narrative overlays.

## Interaction decision

No learner interaction is needed on Page 1.

This page is a hook and orientation page. Adding a prediction control here would slow the opening before the learner has enough of a model to make an informed prediction.

## Visual QA gate

Do not begin Page 2 until the rendered 16:9 Page 1 passes these checks:

1. At rest, does it look like one authored technical paper spread?
2. Can `GLM-5.3-Flash`, `320B`, and `~18B` be found instantly?
3. Are the 320B and 18B scale rulers clearly comparable?
4. Does the anatomy column read as support rather than a second hero?
5. Are all required labels comfortably readable at 1920×1080?
6. Are definitions attached to the exact number/term they explain?
7. At Beat 10, is the question physically connected to the two numbers rather than floating elsewhere?
8. Does the page remain balanced when every support fact is visible?
9. Does the transition into the existing next world preserve orientation?
10. Would a screenshot of Beat 10 work as a clean video frame with no narration?
