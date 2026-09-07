# Nicky Case — Explorable Explanations: 4 More Design Patterns

**Source:** https://blog.ncase.me/explorable-explanations-4-more-design-patterns/

This is a study document. It extracts the four interaction patterns, analyzes what the GIF/example visuals are doing, and converts them into reusable rules for our explainer system.

---

# The shared principle

The article's four patterns all solve the same problem:

> **Learning requires thinking.**

Merely clicking, dragging, or following instructions is not enough. The interaction must make the learner predict, solve, choose, or explore a relationship.

That distinction is critical for us.

A button that advances an animation is navigation.

An action that makes the learner test a mental model is teaching.

---

# Pattern 1 — Puzzle It Out

The example is **SineRider**: the learner writes/changes equations and the resulting graph becomes the physical landscape that determines whether the sled reaches its goal.

## What the GIF is doing pedagogically

The important thing is not that it is animated or game-like.

The visual creates a tight causal loop:

**equation → curve → physical path → success/failure**

The learner cannot finish by repeating a memorized sequence. They must understand enough about the relationship between equations and curves to invent a solution.

The state of the system is visible, so mistakes are informative rather than merely wrong.

## Rule for us

When a concept has a manipulable model, consider a small puzzle where success requires the relationship we want to teach.

Possible GLM-style examples:

- choose which previous token should receive more attention, then compare with the teaching model;
- change routing scores and see which experts become top-8;
- predict what happens if all experts are active versus sparse routing.

Do not turn every beat into a puzzle. Use this when the relationship itself can be reasoned about.

---

# Pattern 2 — Place Your Bets

The example is **You Draw It**. Before showing the real data, the learner draws the curve they expect. Only afterward does the real curve appear.

## Why this is powerful

The visual does two jobs:

1. externalizes the learner's existing mental model;
2. overlays reality directly against that expectation.

Without prediction, surprising data can be consumed passively.

With prediction, the reveal becomes a comparison between:

**what I believed** vs **what actually happened**.

That gap creates the teaching moment.

## Visual rule

The prediction and answer should occupy the **same coordinate system**.

Do not put the learner's guess on one screen and the answer on another. The power comes from direct spatial comparison.

## Rule for us

Before an important reveal, ask whether we can make the learner commit to an expectation.

Examples:

- "Out of 288 experts, how many do you think run for one token?"
- "Does `it` use future words that have not been generated yet?"
- "Does the token ID itself tell the model what `it` means?"
- "Will every token choose the same experts?"

Then reveal the mechanism immediately in the same visual world.

This can make our payoff much stronger without adding more explanation text.

---

# Pattern 3 — Role Play

The example is **A Syrian Journey**, where the reader makes decisions from inside a refugee journey rather than merely reading a summary about it.

## What the visual/interactivity is doing

The interface turns an abstract issue into a sequence of **situated choices with tradeoffs**.

The learner is not asked to recall a fact. They must inhabit a constrained situation and decide what matters.

The learning target is therefore not "the correct answer". It is understanding the shape of the dilemma.

## Rule for us

Role play is useful when understanding depends on perspective, competing goals, or tradeoffs.

For technical explainers, a lighter version can still work:

- "You are the router. You have 288 possible experts but a sparse compute budget. Which ones do you send this token to?"
- "You are the Query from `it`. Which Keys are available to compare against?"

We should use this carefully. Do not anthropomorphize mechanisms so heavily that the metaphor becomes technically false.

The role should illuminate the decision structure, not invent motives the model does not have.

---

# Pattern 4 — Sandbox Mode

The example is **Earth: A Primer**: a large simulation the learner can explore.

## The central warning

A sandbox can produce deep understanding because the learner can form their own questions.

But a complex sandbox given too early can be information overload.

The article's strongest solution is:

> introduce pieces of the sandbox first, then give the full sandbox at the end.

## What the GIF/example contributes

The visual communicates a world with many interacting variables rather than a single linear answer.

The point of the sandbox is not a prescribed sequence of clicks. It is **freedom after fluency**.

This distinction matters enormously.

### Bad sequence

`full complicated model → good luck`

### Better sequence

`mechanic A → mechanic B → A+B → mechanic C → combinations → full sandbox`

The final open system is rewarding precisely because the learner now recognizes its pieces.

## Rule for us

If we ever add a free-play Transformer/MoE sandbox, it should come **after** the authored explanation, not before it.

The story teaches the vocabulary and causal relationships.

The sandbox then lets the learner ask new questions:

- change routing distributions;
- compare tokens;
- vary top-k;
- inspect active paths;
- test attention patterns;
- move through layers.

---

# Visual analysis across all four examples

The examples use different interaction styles, but they share a visual principle:

## The visual state remembers what the learner did

- In SineRider, the equation becomes a visible curve.
- In You Draw It, the prediction remains visible against reality.
- In role play, the current situation is the consequence of earlier choices.
- In a sandbox, the world visibly changes as parameters are manipulated.

This means interaction has **memory and consequence**.

That is stronger than an isolated button press followed by an unrelated screen.

### Hard rule for our engine

> If an interaction teaches causality, the result should remain visibly connected to the action that caused it.

Avoid:

`click → fade → answer appears elsewhere`

Prefer:

`action changes the same object/system → consequence becomes visible in place`

---

# Choosing the right pattern

Use **Puzzle It Out** when the learner can solve a constrained problem using the target relationship.

Use **Place Your Bets** when there is a meaningful prediction/reveal gap.

Use **Role Play** when the lesson is about perspective, decisions, or tradeoffs.

Use **Sandbox Mode** when the learner has enough foundation to ask their own questions of a system.

These patterns are tools, not a checklist. A strong explainer may need one of them, several, or none.

---

# Hard rules for `explain-ahmad`

1. **Do not mistake clicking for thinking.**
2. **Before a reveal, look for a prediction opportunity.**
3. **Keep guesses and answers spatially comparable.**
4. **Let mistakes produce visible information.**
5. **Use roles to reveal decision structure, not invent fake model psychology.**
6. **Never dump a complex sandbox on a beginner.**
7. **Freedom should increase as understanding increases.**
8. **Actions should leave visible consequences in the same world.**
9. **Interaction should make the learner reason about the target concept.**
10. **The interaction pattern must serve the lesson, not the portfolio reel.**
