# GLM v12 — TEXT → OUTPUT Journey Redesign

This document records the production method and the page-by-page reasoning for the real journey after the cold open.

The rule is:

**research → read teaching docs → define learner question → design the static world → map narration to focus/motion → code → render → inspect → refine before moving on**

The beat numbers remain useful for narration timing, but they are **not treated as 100 separate slides**. Multiple beats may live inside one stable visual world and merely change emphasis.

## Sources rechecked

Official GLM-5.3-Flash / Transformers sources:

- https://huggingface.co/zai-org/GLM-5.3-Flash
- https://huggingface.co/zai-org/GLM-5.3-Flash/blob/main/config.json
- https://huggingface.co/docs/transformers/main/en/model_doc/glm5_next

Architecture facts carried into the journey:

- 320B total parameters / ~18B active parameters
- 45 language layers
- first 3 feed-forward layers dense
- next 42 feed-forward layers sparse MoE
- 288 routed experts per sparse layer
- top-8 routed experts per token per sparse layer
- 1 shared expert
- hidden size 4,096
- vocabulary size 154,880
- 64 attention heads configured
- hybrid attention schedule: 34 linear-attention layers + 11 sparse-attention layers

Attention teaching reference:

- Vaswani et al., *Attention Is All You Need*: https://arxiv.org/abs/1706.03762

MoE / shared-expert teaching reference:

- DeepSeekMoE: https://arxiv.org/abs/2401.06066

Project teaching references reread:

- `NCASE_HOW_I_MAKE_EXPLORABLE_EXPLANATION.md`
- `NCASE_LEARNING_AND_EXPLANATION_NOTES.md`
- `NCASE_EXPLORABLE_EXPLANATIONS.md`
- `NCASE_I_DO_AND_I_UNDERSTAND.md`
- `NCASE_NUTSHELL_EXPANDABLE_EXPLANATIONS.md`
- `CONTINUITY_SYSTEM.md`
- `DIAGRAM_GRAMMAR.md`
- `REFINEMENT_STANDARD.md`

Core production interpretation:

> **One new connection at a time does not mean one object on screen at a time.**

A complete visual world may already exist. Narration changes what is hero, support, and texture.

---

# World 1 — TEXT

## Learner question

> We typed an ordinary sentence. What happens to this exact text when it enters the model?

## Purpose

TEXT is the actual beginning of the teaching journey. It should feel familiar and low-friction.

The viewer should not be greeted by a technical heading followed by a fake UI mockup. The **chat itself is the page**.

## Static composition

- one large GLM chat surface
- the actual prompt input
- the exact sentence actor: `The dog dropped the ball, and it`
- GLM processing state
- one locally attached question beside the processing state

## Causal movement

**ordinary text**

→ send

→ model begins processing

→ **BUT** the inside of the model cannot remain a chat bubble

→ **THEREFORE** carry the exact sentence through the processing portal

The sentence must survive the transition as the same actor.

## What not to do

- no separate hero heading floating above the chat
- no disconnected “inside the model” slide
- no second copy of the sentence
- no giant explanatory banner

---

# World 2 — TOKENS → TOKEN ID → EMBEDDING

This is intentionally **one continuous conversion world**, not three unrelated pages.

## Learner question

> How does human-readable text become a numerical representation the network can transform?

## Causal chain

**TEXT**

→ tokenizer finds boundaries

→ token pieces

→ **BUT** text pieces still need stable machine handles

→ token IDs

→ **BUT** an ID is only an address, not meaning or a transformable representation

→ vocabulary-sized lookup table / reference book

→ ID finds one row

→ **THEREFORE** open the learned embedding row

→ 4,096 learned values

→ carry the same `it` representation forward

## Visual world

The sentence stays physically present while token boundaries appear.

The pieces separate gently rather than teleporting into cards.

`it` becomes the persistent actor.

The lookup object is one physical reference-book / model-table object:

- closed / indexed while teaching Token ID
- opens while teaching Embedding
- the same ID tab survives the transition
- the embedding row grows out of the page

This removes the old feeling of:

`token slide → ID slide → vocabulary wall slide → book slide → vector slide`

and replaces it with one conversion process.

## Accuracy rule

The current abbreviated token IDs and teaching split are illustrative until exact GLM-5.3-Flash tokenizer output is pinned before final recording. The UI must not silently present those placeholders as checkpoint truth.

---

# World 3 — ATTENTION

## Learner question

> `it` has an embedding. BUT which earlier parts of this prompt are useful here?

This is the headache that earns Attention.

## Visual grammar

The actual sentence is pinned across the top.

The `it` representation is physically attached to `it`.

Under each available position:

- **K** = what is used for matching
- **V** = information that can come back

Under `it`:

- **Q** = the search signal from the current position

Future continuation (`rolled away .`) is visibly outside the available prompt and marked not generated yet.

## Causal chain

embedding needs context

→ make Q / K / V views

→ Q(`it`) compares with allowed Keys

→ local match scores

→ weights

→ **BUT** Keys only answered where to look

→ read Values

→ scale Values by weights

→ mix

→ context returns to the same `it` position

The diagram may not jump from Q/K scores directly to an updated vector. The Value step must remain visible.

## Prediction moment

Before the comparisons resolve, the viewer gets a lightweight question:

> Which earlier word would you expect to matter most for `it`?

This is not a quiz screen. It lives inside the sentence world and makes the later `ball` emphasis meaningful.

## Truthfulness

The Q/K/V picture is a teaching lens. GLM-5.3-Flash uses a hybrid attention architecture. The caveat belongs quietly at the end of the mechanism, not in the middle of intuition building.

---

# World 4 — MIXTURE OF EXPERTS

This is the main mechanical payoff of the video and gets the most visual space.

## Learner question

> How can we add a huge amount of feed-forward capacity without making every token run all of it?

## Causal chain

one dense MLP works

→ **BUT** more capacity from one huge dense block makes every token pay for it

→ many possible learned MLP expert blocks

→ **BUT** now we need to decide which blocks work

→ learned router reads the current representation

→ score routed experts

→ reveal all 288 as available capacity

→ top-8 routed experts selected

→ +1 shared expert participates

→ dispatch the same current representation to active paths

→ expert transforms run

→ routed outputs receive mixture weights

→ combine routed outputs + shared output

→ one representation continues

## Strong visual moment

The 288-expert field remains visible when the top-8 are selected.

The other 280 do not disappear. They become quiet, because the point is:

**capacity still exists even when it is inactive for this token in this layer.**

## Prediction moment

After router scores are visible but before selection is revealed:

> All 288 exist. How many actually run here?

Then reveal **TOP 8**.

## Shared expert

The shared expert is a separate always-participating path. It should not be drawn as expert #289 inside the routed ranking.

## Per-token / per-layer routing

After the main mechanism is understood:

- change `it` → `ball` → `dog` and let routing fingerprints differ
- move to the next sparse layer and show a fresh router decision

These are applications of an already-known rule, not new machinery.

## Critical accounting correction

The ~18B active figure is the approximate **whole active path across the model**.

Never imply:

`18B = 8 / 288 × 320B`.

---

# World 5 — LAYERS

## Learner question

> We understood one Transformer floor. Why repeat the process 45 times?

## Causal chain

one floor changes the representation

→ next floor receives an already-changed representation

→ refine again

→ first 3 floors use dense feed-forward blocks

→ from layer 4 onward the feed-forward side is sparse MoE

→ each sparse floor can make a fresh routing choice

→ repeat through layer 45

## Visual world

The exact MoE room studied previously shrinks into one physical floor.

The camera pulls back to reveal 45 floors.

Only important floor numbers need labels (`1`, `3`, `4`, `45`). Printing 45 tiny captions would reduce readability.

The same `it` representation moves upward.

## Truthfulness

Do not invent neat semantic jobs such as “layer 4 understands the dog”.

The safe intuition is:

> later layers work on representations already transformed by earlier layers.

---

# World 6 — OUTPUT

## Learner question

> After the final layer, how does the model turn its final representation into the next piece of text?

## Prediction first

Show:

`The dog dropped the ball, and it ____`

before showing the vocabulary scores.

Let the viewer form an expectation.

## Causal chain

final representation of `it`

→ score 154,880 vocabulary possibilities

→ lift only a readable shortlist

→ choose one next token (`rolled` in the illustrative example)

→ append it to the sequence

→ **BUT** one token is not a response

→ **THEREFORE** run the longer sequence through the stack again

→ `away`

→ rerun

→ `.`

## Final payoff

Return visually to the opening contradiction:

`320B total capacity`

**BUT**

`~18B active / token`

Then show the mechanism the learner earned:

`45 layers → 42 sparse MoE layers → 288 routed experts available → top-8 routed + shared participate in each sparse layer`

Final line:

**Huge capacity. Selective compute.**

## End with another hill

The video should not end only with “now you know”. A quiet final question can open the next conceptual hill:

> If routing changes by token and layer, what kinds of expert specialization emerge during training?

---

# Visual QA standard for the remaining journey

A green build is not visual approval.

For each world, inspect rendered frames for:

1. collision / clipping
2. two simultaneous heroes
3. question detached from the object that caused it
4. arrows without verbs or visible causal meaning
5. actor identity being destroyed between states
6. support information becoming louder than the current mechanism
7. text below the readability floor
8. diagrams that skip the middle step
9. animation that moves without teaching identity / cause / scale / hierarchy
10. world transitions that replace actors instead of carrying them

The primary recording target is 1920×1080, but the full-screen composition also needs to survive shorter desktop viewports such as 1366×768.
