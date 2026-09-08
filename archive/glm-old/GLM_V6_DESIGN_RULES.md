# GLM v6 — Teaching and Visual Rules

## The viewer test
Assume a curious five-year-old is watching with an adult narrating.

Every beat must answer, in order:
1. What are we looking at?
2. What changed?
3. Why did it change?
4. What single idea should I remember?

If the viewer has to search the screen for the answer, the beat is not finished.

## Paper is behavior, not beige
A paper-style explainer uses:
- ink hierarchy and generous margins
- pencil rules, underlines, circles and highlighter marks
- margin notes beside the object they explain
- page/section transitions that feel like moving through an illustrated book
- restrained shadows only when an object is physically meant to sit above the page

It does not mean putting every idea inside a rounded beige card.

## Information hierarchy
Three levels only:

### Hero
The thing the narration is talking about right now. It must dominate immediately.

### Support
Labels/definitions needed to understand the hero. They must be comfortably readable at recording size.

### Texture
IDs, caveats, secondary examples and source-like detail. These can be smaller, but the beat must still work if they are ignored.

## Chapter journey
The persistent journey is:
Text → Tokens → Token ID → Embedding → Attention → MoE → Layers → Output

Rules:
- the full journey is introduced large before the walkthrough starts
- every chapter name remains readable
- the current chapter receives the strongest visual signal
- the journey objects themselves transition into the compact rail; do not replace them with unrelated toolbar chrome
- the rail explains location, not progress percentage

## Opening model page
The first page must answer "what model are we opening?" before teaching architecture.

Visible relevant facts:
- GLM-5.3-Flash by Z.ai
- Mixture-of-Experts model
- 320B total parameters
- ~18B active parameters per token
- 45 transformer layers
- 42 sparse MoE layers after 3 dense MLP layers
- 288 routed experts
- top-8 routed experts per token + 1 shared expert

Facts that become useful later can be introduced as future notes:
- 154,880 vocabulary entries
- 4,096 hidden size

Unrelated true facts should not compete on the opening page.

On the next beat, rough highlighter marks "Total parameters" and "Active parameters". On the following beat, plain-language definitions appear beside those terms.

## Chat continuity
The chat is allowed to look like UI because the chat itself is the teaching object.

Required continuity:
- type the actual sentence inside the input
- send the same sentence; do not recreate it elsewhere
- it moves upward into the user message
- GLM visibly enters a processing state
- we zoom into that processing state
- tokenization starts from the sentence we just sent

## Motion rule
Motion must teach one of:
- identity (this is the same object)
- causality (this action caused that result)
- hierarchy (focus moves here)
- scale (this is much larger/smaller than it looked)
- transition of mental world (we are entering a new concept)

If an animation does none of those, remove it.

## Research basis
This direction follows multimedia-learning principles such as signaling, segmenting, coherence and spatial contiguity, plus explorable-explanation patterns: show processes through motion/interaction, put explanatory words next to the visual they describe, and avoid turning explanations into click-through slideshows.
