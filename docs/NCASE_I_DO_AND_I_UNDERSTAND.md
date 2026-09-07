# Nicky Case — I Do And I Understand

**Source:** https://blog.ncase.me/i-do-and-i-understand/

This study focuses on one of the most useful Ncase ideas for our work: if a learner can **act out a causal model**, they can understand it more deeply than if we only describe the conclusion.

---

# Core principle

The backbone is:

**CAUSE → EFFECT**

Ncase argues that stories, logical arguments, games, simulations, roleplay, and other interactive systems can all teach by making cause-and-effect visible.

The learner should not merely receive the lesson. They should be able to watch or produce the chain that creates the lesson.

---

# What the opening images are doing

The post opens with playful hand-drawn imagery around the familiar "I do and I understand" idea, then reduces the argument to a simple cause/effect visual.

That reduction is important.

Before discussing complex case studies, Ncase establishes one visual grammar:

**something happens → that changes something else**

The later examples are all variations of this same diagram.

### Rule for us

Before designing a difficult technical animation, write the causal chain in plain language.

Example:

`current token representation → router scores experts → top scores survive → selected experts transform representation → outputs mix`

If we cannot state the causal chain clearly, the animation is not ready to design.

---

# Case study 1 — Monopoly / The Landlord's Game

The important educational mechanism is not the board-game theme.

The rules create a reinforcing loop:

**more money → more land → more income → even more money**

The system allows the player to experience accumulation instead of merely reading about it.

## Teaching lesson

A model can teach an abstract idea when:

- the important variables are visible;
- the rules are simple enough to follow;
- repeated play makes the consequence emerge;
- the learner can connect the result back to the rules.

### Rule for us

When teaching a model, show the **feedback structure**, not just the final state.

Do not show:

`288 experts → 8 selected`

and assume the learner understands MoE.

Show the rule that repeatedly creates the result:

`representation → router scores → rank → top-8 selected`

Then repeat with a different token so the learner sees the rule, not a one-off picture.

---

# Case study 2 — Depression Quest

The post studies a system where mental energy and available choices reinforce each other.

The central educational technique is converting an invisible psychological mechanism into **visible rules and constrained actions**.

A changing internal state alters which choices remain available, so the player experiences a feedback loop rather than reading a description of one.

## Visual lesson

A strong explanatory interface can make an invisible state tangible through:

- available vs unavailable actions;
- state indicators;
- consequences that persist;
- repeated causal feedback.

### Rule for us

For invisible model internals, give the learner a visible state representation.

Examples:

- dormant vs active experts;
- current representation strip;
- attention weights;
- selected token path;
- layer-by-layer change.

The visualization should expose the variable that explains why the next state changed.

---

# Case study 3 — Parable of the Polygons

This is especially relevant to us.

Ncase describes "mechanical plot twists": the learner follows simple rules, then the system produces a surprising result.

The learner is not simply told the counterintuitive conclusion. The learner **causes the mechanism to run and sees the conclusion emerge**.

## Why this is so strong

A surprising claim can feel arbitrary when stated first.

But when the learner understands every local rule and then watches the unexpected global result emerge, the surprise feels earned.

### Structure

**simple local rule → repeated process → surprising system-level result**

### Rule for us

Look for mechanical plot twists in technical explainers.

For this GLM story, the strongest one is:

**320B parameters exist → token reaches MoE router → only top-8 routed experts activate per sparse layer → active path is far smaller than total capacity**

The 18B payoff should emerge from the mechanism the viewer already understands.

Do not lead with an unexplained answer and then decorate it afterward.

---

# From message to mechanics

The second half of the post gives a very useful creation process.

## Step 1 — What do you want to explain?

Write it as **Cause → Effect**.

This forces the author to identify the relationship rather than merely choose a topic.

Bad:

> Explain Attention.

Better:

> A token compares its Query with available Keys → the comparison produces weights → those weights control how much Value information contributes.

Bad:

> Explain MoE.

Better:

> A token's current representation reaches a router → the router scores many expert blocks → only the strongest routes are used → their outputs are combined.

---

# Step 2 — How does the learner prove the lesson to themselves?

Turn the argument into visible rules.

The post emphasizes that the model should usually be visible and should start simple.

## Why visibility matters

If the learner cannot see the state of the system, they cannot connect:

**action → state change → consequence**.

### Rule for us

A technical system should expose only the state required for the current relationship.

For router scoring:

- current representation;
- router;
- expert field;
- scores/brightness;
- selected top-8.

Do not simultaneously expose every layer, Q/K/V, output vocabulary, and model statistic.

Visible does not mean "show everything".

Visible means **show the variables necessary to explain the causal step**.

---

# Start simple, then add complexity

Ncase explicitly argues that simplifying a model is not automatically bad. Every model is a simplification.

The responsibility is to preserve the important mechanism, add nuance later, and acknowledge limitations.

### Rule for us

Our beginner representation may simplify implementation details, but it must not invert or falsify the mechanism.

For example:

- Q/K/V can be used as a familiar conceptual attention lens;
- we must still note that GLM-5.3-Flash uses a hybrid attention architecture;
- expert labels should not pretend there is a hard-coded "math expert" unless evidence supports it;
- illustrative attention/routing numbers must be identified as illustrative.

Simplify the surface, not the truth.

---

# Step 3 — Packaging

Ncase's point here is important: **form follows function**.

The teaching model does not need to resemble a conventional game, lesson, website, or article.

Narrative can be added to make an abstract mechanism concrete and emotionally legible, but packaging should serve the model.

### Rule for us

Do not ask:

> What cool component can we use here?

Ask:

> What form makes this causal relationship easiest to understand?

Possible answers may be:

- a book;
- an index wall;
- a workbench;
- a router junction;
- a building;
- a graph;
- a single moving token;
- no interaction at all.

---

# Image-analysis lesson across the post

The drawings/screenshots progressively change scale:

1. simple statement / cause-effect;
2. concrete systems with visible rules;
3. a worked design process;
4. a broad conclusion about models of the world.

This is itself instructional choreography.

The visuals do not begin with the most complex diagram. They **earn complexity**.

### Rule for us

The diagram vocabulary should expand as the learner's vocabulary expands.

Early beats should contain fewer visual primitives.

Later beats can recombine familiar primitives into much larger systems.

---

# Hard rules for `explain-ahmad`

1. **Write the lesson as Cause → Effect before drawing it.**
2. **Let the learner see the rule generate the result.**
3. **Expose the state variable that explains the next change.**
4. **Use repetition to reveal rules, not just one-off examples.**
5. **Look for mechanical plot twists.**
6. **Make surprising conclusions emerge from already-understood mechanics.**
7. **Start with the smallest truthful model.**
8. **Add nuance after intuition exists.**
9. **Form follows the causal relationship.**
10. **The learner should be able to say why the result happened.**
