# Nicky Case — Nutshell: Expandable Explanations

**Source:** https://blog.ncase.me/new-project-nutshell/

This study focuses on progressive disclosure: how to let different learners access different depths without bloating the primary explanation.

---

# Core idea

Nutshell lets a writer place **expandable explanations inside the text**.

A reader can stay on the main path or open a deeper explanation only when they need it.

The key is not the expand/collapse animation itself.

The key is:

> **Depth appears in context, without forcing every reader to consume it.**

Nutshell can also embed material from other authors/sites and can include richer media such as interactives and video.

---

# What the promotional GIF is teaching

The GIF demonstrates a small phrase or link expanding into additional explanation **in place**.

The surrounding sentence remains visible.

That is the important visual choice.

The reader does not leave the current page, open a modal, or lose the original thought. The detail grows directly from the concept that requested it.

## Visual principle

**Primary idea stays anchored → optional depth unfolds locally → collapse returns to the same reading position.**

This is progressive disclosure with spatial continuity.

### Rule for us

When optional technical depth is needed, attach it to the exact concept it expands.

Do not make the main explainer carry every caveat, formula, architecture number, or implementation detail at once.

---

# Primary path vs optional depth

A strong explainer can support at least two layers:

## Layer 1 — the story everyone needs

This should contain only what is required to understand the main causal journey.

Example:

> Query compares with Keys. The match becomes weights. Those weights control how much Value information comes back.

## Layer 2 — optional depth

A curious learner might expand:

- dot products;
- normalization / softmax;
- multi-head attention;
- hybrid attention details;
- exact tensor shapes;
- sparse vs linear attention implementation.

The main story remains intact even if none of these are opened.

---

# Why this matters for cognitive load

Without progressive disclosure, authors often choose between two bad options:

### Too little

The explanation becomes vague and experts complain that important nuance is missing.

### Too much

The beginner is buried in caveats before understanding the mechanism.

Expandable depth creates a third option:

**simple primary model + truthful optional detail**.

### Rule for us

A caveat should not automatically become main-screen prose.

Ask:

> Does the learner need this fact to understand the current causal step?

If no, make it quiet, deferred, expandable, or place it in a later deep-dive beat.

---

# Local expansion is better than context switching

The Nutshell pattern works because additional explanation appears close to the term that triggered it.

This aligns with our spatial-contiguity rules.

Avoid:

`term → click → totally different page → explanation → back button`

Prefer:

`term → expands locally → learner sees term and explanation together`

### Rule for our engine

Useful optional-depth components could include:

- margin expansion;
- inline paper flap;
- small side panel attached by a pencil rule;
- "look inside" reveal on an object;
- expandable technical note;
- formula layer that appears directly underneath the intuitive layer.

The detail should feel like it was **inside the original explanation all along**.

---

# Reuse and embedded knowledge

Nutshell also supports embedding snippets from other sources.

The broader design lesson is that explanations do not need to duplicate every prerequisite.

A concept can reference a reusable explanation module.

### Rule for `explain-ahmad`

We should eventually maintain reusable explainer primitives for recurring concepts such as:

- parameter;
- token;
- vector;
- probability/logit;
- neural-network layer;
- matrix multiplication;
- softmax;
- routing;
- dense vs sparse compute.

A future explainer could call the same concise explanation rather than rebuilding it inconsistently every time.

---

# Optional depth should not destroy pacing

Expandable information is powerful, but it can still become a junk drawer.

The main authored story must remain clear.

### Good optional detail

- answers an obvious learner question;
- expands one concept;
- stays spatially attached;
- can be ignored safely;
- closes without losing place.

### Bad optional detail

- unrelated trivia;
- a second article hidden inside every sentence;
- required knowledge disguised as optional;
- technical details added only to prove rigor.

---

# How this applies to our GLM explainer

## Opening

Primary:

`320B total → ~18B active`

Optional:

- what exactly a parameter is;
- active-parameter accounting caveat;
- architecture source details.

## Tokenization

Primary:

`text → tokens → IDs`

Optional:

- tokenizer family;
- byte-level/subword details;
- exact vocabulary construction.

## Embedding

Primary:

`ID selects a learned numerical row → 4,096 values`

Optional:

- embedding matrix dimensions;
- learned parameter details;
- why a vector is not a complete dictionary meaning.

## Attention

Primary:

`Q → compare K → weights → read V → mix context`

Optional:

- dot product;
- scaling;
- softmax;
- heads;
- GLM hybrid attention architecture.

## MoE

Primary:

`router scores experts → top-8 + shared → transform → weighted merge`

Optional:

- load balancing;
- capacity factors;
- auxiliary losses;
- expert-parallel implementation;
- exact active-parameter accounting.

---

# Image/interaction lesson

The Nutshell GIF is visually modest, and that is part of why it works.

The animation does not demand attention for itself.

It simply communicates:

**there is more here if you want it.**

### Rule for us

Optional-depth interactions should be quieter than primary-story interactions.

Primary motion says:

> Look here. This changes the model.

Optional motion says:

> There is more context available here.

Do not give both the same visual weight.

---

# Hard rules for `explain-ahmad`

1. **Keep the primary causal story lean.**
2. **Put optional depth beside the concept it expands.**
3. **Do not force every learner to consume expert-level detail.**
4. **Do not hide required prerequisites inside optional sections.**
5. **Expansion should preserve spatial context.**
6. **Optional depth should be visually quieter than the main story.**
7. **Use reusable explanation modules for recurring concepts.**
8. **Caveats belong where they clarify truth, not where they interrupt intuition.**
9. **Simple primary model + optional rigor is better than vague simplicity or overwhelming completeness.**
10. **Let curious learners go deeper without punishing everyone else.**
