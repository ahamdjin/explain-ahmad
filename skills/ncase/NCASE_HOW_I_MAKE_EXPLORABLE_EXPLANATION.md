# Nicky Case — How I Make Explorable Explanations

**Source:** https://blog.ncase.me/how-i-make-an-explorable-explanation/

This is a study note, not a verbatim mirror of the article. The goal is to preserve the teaching structure, the visual metaphor, and the rules we can use in our own explainers.

## The core structure

### 1. Start With a Question

Do not begin with the answer or jargon. Begin with a question the learner actually wants answered. Curiosity creates the reason to continue.

### 2. Move Up the Ladder of Abstraction

Start with a concrete experience, then climb toward the abstract idea one step at a time. Each step should follow causally from the last. Prefer **THEREFORE** and **BUT** over a sequence of disconnected “and then” facts.

### 3. End With More Questions

The explanation should expand what the learner can see. Ncase often ends with a sandbox so the learner can explore their own questions rather than only accepting the author’s conclusion.

## What the drawings are teaching

**Bottom of the hill** — learner starts on the ground; the idea is visible above them. The question creates a reason to climb.

Image: https://blog.ncase.me/content/images/2017/09/1.jpg

**Climbing the hill** — understanding is earned progressively. The learner should not be teleported to abstraction.

Image: https://blog.ncase.me/content/images/2017/09/2.jpg

**View from the top** — reaching one idea reveals many more hills/questions. Good teaching increases the learner’s ability to explore beyond the lesson.

Image: https://blog.ncase.me/content/images/2017/09/3.jpg

## Hard rules for our explainers

- Question before explanation.
- Concrete example before abstraction.
- One causal connection at a time.
- Use **BUT / THEREFORE** to make the explanation feel inevitable.
- Return to the concrete whenever abstraction becomes hard to hold.
- Do not end at “now you know.” End where the learner can ask a better question.

## Applied to the GLM video

Our opening question is **How can a 320B model use only ~18B parameters for one token?**

The concrete experience is one prompt and one token. From there we climb through Tokens → ID → Embedding → Attention → MoE → Layers → Output. The final payoff should not only answer 320B → 18B; it should leave the viewer able to reason about routing, active compute, and why sparse models exist.
