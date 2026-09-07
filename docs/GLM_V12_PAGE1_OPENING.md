# GLM v12 — Page 1 Cold Open

Page 1 is **not** the start of the technical journey.

The technical journey begins at **TEXT**.

Page 1 has one job:

> **Create the 320B vs ~18B headache strongly enough that the viewer wants to follow the token and discover the answer.**

Production loop for this page:

**research → reread teaching docs → define the learner's question → design one complete frame → map narration to focus → code → capture every state → inspect → revise**

---

## Research lock

Official model sources rechecked:

- https://huggingface.co/zai-org/GLM-5.3-Flash
- https://huggingface.co/zai-org/GLM-5.3-Flash/blob/main/config.json

Facts allowed on the page:

- GLM-5.3-Flash by Z.ai
- 320B total parameters
- ~18B active parameters
- Mixture of Experts (MoE)
- 45 language layers
- first 3 feed-forward layers are dense
- next 42 feed-forward layers are sparse MoE
- 288 routed experts per sparse MoE layer
- top-8 routed experts per token
- 1 shared expert

Facts deliberately deferred:

- 154,880 vocabulary size
- 4,096 hidden size
- attention subtype split
- max context
- multimodal details
- router scoring details

These are true, but they do not improve the opening question.

---

## Teaching references reread

Relevant project docs:

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
- `NCASE_NUTSHELL_EXPANDABLE_EXPLANATIONS.md`

The strongest rules for this page are:

1. **Question before explanation.**
2. **Purpose before terminology.**
3. **One new connection does not mean one visible fact.**
4. **The whole visual world can already exist; signaling controls attention.**
5. **Keep the primary causal story lean.**
6. **BUT / THEREFORE should describe real causal relations, not become decorative labels.**
7. **Do not make the learner study a parts list before they have a reason to care.**

---

## Main correction

The earlier Page 1 still behaved too much like a tutorial:

`name → model type → 320B → 18B → parameter definition → active definition → architecture → question`

That is still mostly **AND THEN**.

The new page is a **fully composed cold open**.

From the first frame, the viewer can already see:

- the model identity;
- 320B total;
- ~18B active for one token;
- the same-scale comparison;
- the model anatomy as quiet support;
- the central question as quiet context.

Nothing has to be "unlocked" one fact at a time.

Narration changes the hierarchy of the same page.

---

## Page 1 causal spine

### State A — orient

The complete model sheet exists.

Hero:

`GLM-5.3-Flash`

Support:

`320B BUT ~18B`

Texture/support:

architecture facts.

No teaching sequence yet. The viewer simply understands what object we are opening.

### State B — contradiction

Narration moves to the two numbers.

The relationship becomes hero:

`320B total` **BUT** `~18B active / token`

Both numbers are emphasized together. We do **not** teach 320B on one screen and 18B on another.

### State C — make the mismatch visible

The same-scale ruler becomes more prominent:

`18 / 320 ≈ 5.6%`

This is a **size intuition**, not a new chapter.

It must be labelled as a size comparison only. It must never imply that the active path is one contiguous 5.6% slice of the model.

### State D — headache

The question directly beneath the numbers becomes hero:

> **How can both numbers be true?**

The architecture becomes quieter.

The viewer should now own the question.

### State E — causal bridge

The question transforms in the same physical area into:

> **SO — Follow one token's path.**

This is not the answer.

It tells the viewer how we are going to earn the answer.

---

## Architecture rule

The architecture is present on Page 1 because it makes the model sheet feel real and gives useful context:

- 45 layers
- 3 dense + 42 sparse MoE
- 288 routed experts
- top-8 routed / token
- +1 shared expert

But Page 1 does **not** require the learner to understand or memorize these numbers.

They are support.

We will teach them again only when the token reaches the mechanism where they matter.

This follows the Nutshell / progressive-depth rule:

> Required causal knowledge belongs on the main path. Extra rigor/context may remain visible without becoming required attention.

---

## Definitions rule

`parameter = one learned value`

`active = participating in this computation now`

These may live as quiet local notes from the start.

They do **not** deserve separate beats.

If the narration needs them, the notes can receive a small focus cue. Otherwise the viewer may safely ignore them.

---

## The real journey

The journey begins only after the cold open exits:

**TEXT → TOKENS → TOKEN ID → EMBEDDING → ATTENTION → MoE → LAYERS → OUTPUT**

`MODEL` is not part of that journey rail.

The learner is no longer touring architecture diagrams.

They are following one concrete example through a continuous process.

---

## Transition to TEXT

After the cold open, Page 1 leaves completely.

Then a new phase says:

> **Start with ordinary text.**

The route appears:

`TEXT → TOKENS → TOKEN ID → EMBEDDING → ATTENTION → MoE → LAYERS → OUTPUT`

The route then collapses into the persistent chapter rail.

This is a change of mental world, so a new composition is justified.

---

## Full-screen rule

The explainer frame fills the actual viewport:

- `width: 100%`
- `height: 100%`
- no fitted/letterboxed 16:9 stage

1920×1080 remains the primary recording target, but the visual world must adapt to the viewport rather than sit inside a smaller fixed rectangle.

---

## Collision rules

1. No new teaching layer may be stacked over an existing composition just to save space.
2. Important objects own reserved geometry.
3. The question is physically attached to the 320B/~18B comparison area.
4. Architecture has its own support column.
5. The opening and journey phases are mutually exclusive.
6. Focus uses opacity/highlight/line emphasis, not container scaling that can collide with neighbors.
7. If two complete compositions overlap, the overlap itself must teach a transformation. Otherwise they must not coexist.

---

## Visual QA gate

Capture every opening state at:

- 1920×1080
- 1440×900
- 1366×768

Reject the page if any capture has:

- overlap or clipping;
- required text too small to read;
- two competing heroes;
- the architecture becoming louder than the contradiction;
- the question visually detached from the two numbers;
- the full page looking incomplete before narration starts;
- a focus change that adds a new mini-lesson instead of simply steering attention;
- the transition to TEXT feeling like a disconnected slide replacement.

Do not begin the TEXT redesign until Page 1 survives this review.
