# Nicky Case — Learning & Accessible Explanation Notes

**Source:** https://ncase.me/faq/

**Basis:** Cleaned and organized from the supplied Nicky Case FAQ excerpt.

This document is a practical teaching reference. It focuses on the parts of the source that help us design explanations, educational visuals, scrollytelling, and learner-friendly technical content.

---

## 1. The core learning sequence

Nicky Case's learning advice follows a simple order:

1. **Purpose** — know why the idea matters.
2. **Intuition** — understand the idea visually and conceptually before formal detail.
3. **Practice with feedback** — recall, solve, and apply the idea after it makes sense.

The order matters.

Do not begin with formalism, terminology, or exercises before the learner has a reason to care and a mental picture to attach them to.

### For our explainers

A technical chapter should usually follow:

**Why should I care? → What should I picture? → Now show me how it works.**

For example, an MoE explanation should not begin with `288 experts / top-8 / router logits`.

A better order is:

**Problem:** A huge model has lots of capacity, but running all of it for every token would be expensive.

**Intuition:** Imagine many possible feed-forward blocks, but only a few are chosen for the current token.

**Mechanism:** Now introduce the router, its scores, top-8 selection, shared expert, expert outputs, and merge.

---

# 2. Purpose — create the headache before the aspirin

The source's strongest teaching rule for motivation is:

**First create the need for the idea. Then provide the idea as the solution.**

Reference: [If Math Is the Aspirin, Then How Do You Create the Headache?](https://blog.mrmeyer.com/2015/if-math-is-the-aspirin-then-how-do-you-create-the-headache/)

A learner should feel the problem before receiving the machinery that solves it.

## Weak order

`Here is attention. It has Query, Key, and Value.`

The learner has no reason to care.

## Better order

`The token “it” has a numerical representation — but how can it use the earlier words to understand the context?`

Now there is a headache.

Then Attention becomes the aspirin.

### Storyboard rule

Before introducing a new mechanism, answer:

> **What problem has the learner already seen that makes this mechanism necessary?**

If there is no answer, we are probably introducing the mechanism too early.

---

# 3. Intuition first

The source argues against learning abstract notation before experiencing the underlying idea.

The analogy is a music class where students spend years drawing notes but never hear the song.

For technical explanations:

- show the idea before naming every part
- use pictures and motion when the idea is spatial or causal
- establish an intuitive model before formal notation
- show why a fact is true when possible instead of asking the learner to memorize it

Useful source references:

- [Examples First](https://gowers.wordpress.com/2007/10/19/my-favourite-pedagogical-principle-examples-first/)
- [ADEPT Method](https://betterexplained.com/articles/adept-method/)
- [3Blue1Brown](https://www.youtube.com/c/3blue1brown)
- [Better Explained](https://betterexplained.com/cheatsheet/)

## Examples first

Do not start with:

> "An embedding is a learned vector in a 4,096-dimensional hidden space."

Start with the actual token we already know:

`it`

Then show:

`it → token ID → one row in a giant learned table → a long strip of numbers`

Only after that do we name it:

**Embedding.**

The example gives the abstraction somewhere to attach.

---

# 4. Teaching accessible explanations

The supplied source explicitly frames teaching as giving learners these three things in order:

**1. Purpose → 2. Intuition → 3. Problems / practice**

## Purpose

Create the headache before the aspirin.

Whenever possible, also show:

- a compelling visual
- a real use
- a concrete consequence
- a question the learner naturally wants answered

## Intuition

The source recommends:

- examples first
- the ADEPT method
- pictures
- intuitive proofs when possible
- avoiding unsupported "just memorize this" facts

## Problems / practice

Use **cognitive apprenticeship**:

1. Show a worked example.
2. Make the process visible.
3. Give the learner a similar problem or interaction to try.

Reference: [Worked-example effect](https://en.wikipedia.org/wiki/Worked-example_effect)

### For interactive explainers

An interaction should usually come **after** the viewer has seen the operation once.

Example:

1. We demonstrate how a router scores and selects experts for `it`.
2. Then let the learner switch the token to `ball` or `dog`.
3. The routing pattern changes.

Now interaction reinforces a model the learner already has instead of becoming a guessing game.

---

# 5. Practice with feedback

After purpose and intuition, the learner needs retrieval and application.

The source recommends practice with feedback and spaced repetition for:

- factual recall
- conceptual questions
- small practice problems

For our video/scrollytelling work, we do not need to turn every explanation into a quiz.

But we can use lightweight prediction:

> "Which expert blocks do you think will stay active?"

or:

> "If the Query matches `ball` more strongly, which Value should contribute more?"

Then reveal the answer immediately.

This turns passive watching into a small act of reasoning without derailing the story.

---

# 6. Writing explanations — use causality, not chronology

The source recommends the writing principle:

**Therefore & But, not “And Then”.**

Reference: [Therefore & But, Not "And Then"](https://vimeo.com/123759973)

Weak explanatory flow:

`The token gets an ID, and then it gets an embedding, and then Attention runs, and then MoE runs.`

That is chronology, not explanation.

Better:

`The token itself is text, BUT the neural network works with numbers. THEREFORE the tokenizer gives it an ID.`

`The ID is only an address, BUT the model needs a numerical representation it can transform. THEREFORE the ID looks up an embedding.`

`The embedding starts without enough surrounding context, THEREFORE Attention lets it gather information from earlier positions.`

This creates a causal chain.

## Storyboard rule

Between major beats, ask whether the transition is:

**BUT** — a problem, limitation, surprise, or conflict

or

**THEREFORE** — a consequence or solution

If the only connection is "and then," the narrative probably needs work.

---

# 7. Concision

The source suggests a simple editing exercise:

1. Write the first draft.
2. Count the words.
3. Cut it to roughly 90% of the original length.

The point is not a magical 90% target. It is to force removal of unnecessary language.

For our visual explanations, the same rule applies even more strongly:

- narration should not repeat obvious screen text
- screen text should not repeat the narration word-for-word
- labels should explain objects, not become mini-paragraphs
- every sentence should earn its space

The source also makes a useful distinction:

**Do not chase “style.” Focus on substance.**

A recognizable style emerges from what we consistently choose to value and explain.

---

# 8. Stories as worked examples of ideas

The source frames stories as a way to explore truth through an exaggerated or compressed example.

Its compact story structure is:

1. Someone needs or wants something,
2. **but** there is an internal or external obstacle,
3. **therefore** they act, learn, or change,
4. repeat.

For explanation design, this is useful even when we are not writing fiction.

Our "character" can be a token.

Example:

`it` needs context,

**but** its starting embedding alone is not enough,

**therefore** it enters Attention,

**but** using every feed-forward block would waste compute,

**therefore** the router selects a small expert path,

and so on.

The token's journey becomes a worked example of the architecture.

This is much stronger than presenting disconnected architecture diagrams.

---

# 9. Coding — remove the aura before teaching the mechanism

The source argues that coding often looks harder than it is because it carries an intimidating "mad genius" aura.

Its approach is:

- begin with small projects
- make them useful or fun
- let the learner produce something real quickly
- use interactive tutorials
- encourage looking things up and adapting examples

The transferable principle is:

> **Reduce intimidation before increasing complexity.**

For AI architecture explainers, this means we should avoid making the first frame look like an academic paper exploded onto the screen.

Start with something familiar:

`You type a sentence.`

Then progressively reveal what the machine does with it.

---

# 10. Making games — keep scope small

The source repeatedly emphasizes:

**KEEP YOUR SCOPE SMALL.**

This is relevant to explanation design too.

A chapter should have a small learning target.

Not:

> "Understand Attention."

Instead:

> "Understand why Query compares with Keys."

Then:

> "Understand how those comparisons become weights."

Then:

> "Understand that the weights decide how much of each Value comes back."

Small explanatory scope lets complex understanding accumulate without overwhelming the viewer.

---

# 11. Resource list from the source

## Visual / intuitive math

- [3Blue1Brown](https://www.youtube.com/c/3blue1brown)
- [Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)
- [Essence of Calculus](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr)
- [Better Explained](https://betterexplained.com/cheatsheet/)
- [Brilliant](https://brilliant.org/)
- [Khan Academy](https://www.khanacademy.org/)

## Explanation / pedagogy

- [Examples First](https://gowers.wordpress.com/2007/10/19/my-favourite-pedagogical-principle-examples-first/)
- [ADEPT Method](https://betterexplained.com/articles/adept-method/)
- [Worked-example effect](https://en.wikipedia.org/wiki/Worked-example_effect)
- [Quanta Magazine](https://www.quantamagazine.org/)

## Writing / storytelling

- [Therefore & But, Not "And Then"](https://vimeo.com/123759973)
- [Kurt Vonnegut's 8 Tips](https://www.themarginalian.org/2012/04/03/kurt-vonnegut-on-writing-stories/)
- [Lessons From The Screenplay](https://www.youtube.com/c/LessonsfromtheScreenplay/videos)

## Game-design teaching

- [Game Maker's Toolkit](https://www.youtube.com/c/MarkBrownGMT/videos)
- [Valve's Invisible Tutorial](https://www.youtube.com/watch?v=MMggqenxuZc)

---

# 12. Practical rules for our explainer engine

These are the source's ideas translated into working constraints for our own production system.

### Rule 1 — Establish purpose before terminology

The learner should encounter the problem before the name of the mechanism that solves it.

### Rule 2 — Example before abstraction

Start from a concrete actor or event already on screen.

### Rule 3 — Intuition before formal detail

The viewer should be able to say what a mechanism does before we explain its exact implementation.

### Rule 4 — Causal transitions

Prefer **BUT → THEREFORE** over **AND THEN**.

### Rule 5 — Worked example before interaction

Demonstrate once; then let the learner manipulate or predict.

### Rule 6 — Small learning scope

One beat should have one clear learning target.

### Rule 7 — Use visuals to carry the explanation

Do not make narration rescue a diagram that does not explain itself.

### Rule 8 — Cut redundant language

The screen, narration, and animation should complement each other rather than repeat each other.

---

# The sequence to remember

For almost any difficult idea:

## **PURPOSE → INTUITION → PRACTICE**

And inside the explanation itself:

## **HEADACHE → ASPIRIN**

## **EXAMPLE → ABSTRACTION**

## **BUT → THEREFORE**

Those three patterns should be visible in our scripts, storyboards, diagrams, and interactions before implementation begins.
