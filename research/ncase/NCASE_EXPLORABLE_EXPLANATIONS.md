# Nicky Case — Explorable Explanations

**Source:** https://blog.ncase.me/explorable-explanations/

This is a study document, not a copy of the article. It captures the teaching patterns, the role of the drawings, and the rules that matter for our explainer system.

---

## Core idea

An explorable explanation is not a slideshow with buttons. Interactivity is useful when it lets the learner understand a **process, system, or model by manipulating or experiencing it**.

The medium should match the idea:

- **Text** is strongest for abstract concepts.
- **Graphs** are strong for broad relationships at a glance.
- **Animation** is strong for temporal relationships and change over time.
- **Interactive systems** are strongest when the learner needs to understand a process, system, or model.

### Rule for us

Do not add interaction because interaction looks impressive.

Ask:

> What can the learner understand by doing this that they could not understand as clearly from text, a diagram, or animation?

If there is no good answer, do not make it interactive.

---

# 1. Do + Show + Tell

Ncase's hand-drawn Venn diagram places **DO**, **SHOW**, and **TELL** in three overlapping circles, with the most interesting region in the overlap.

## What the image teaches

The drawing is simple, but its composition carries the argument immediately:

- the three methods are not competitors;
- each method has its own strength;
- the best explanation can combine them;
- the overlap is where text, visual representation, and interaction support each other.

The image does not decorate the paragraph. It **compresses the entire rule into one spatial object**.

### Rule for us

For every difficult chapter, ask three separate questions:

1. **TELL:** What sentence must the viewer hear/read?
2. **SHOW:** What visual makes that sentence concrete?
3. **DO:** Is there an action that lets the viewer prove or experience it?

We should not force all three into every beat. But when a concept remains abstract after telling and showing, doing may be the missing piece.

---

# 2. Interest Curves

The Interest Curve drawing shows a growing skill base over time while interest rises and falls in peaks.

## What the image teaches

The important visual insight is that learning should not be a flat accumulation of information.

Skill gradually builds, while attention needs **renewed peaks**:

- hook;
- discovery;
- challenge;
- combination;
- payoff.

The learner's growing ability lets later peaks be more complex than earlier ones.

## Story structure implied by the diagram

**Hook → basics → combine knowledge → meaningful ending**

The ending should depend on what the learner now understands. It should not be a generic recap that could have appeared at the beginning.

### Rule for us

A scrollytelling chapter should have an interest curve, not just a sequence of equally weighted slides.

For GLM, examples of peaks are:

- 320B vs ~18B puzzle;
- the vocabulary wall revealing scale;
- 4,096-dimensional embedding unfolding;
- attention suddenly making `ball` visually important;
- 288 experts appearing;
- only top-8 staying active;
- the MoE room becoming one floor of 45;
- the final 320B → 18B payoff.

Quiet setup between these peaks is necessary. If everything is dramatic, nothing is dramatic.

---

# 3. Start Small, Build Big

The drawing uses three simple colored blocks: **A, B, C**. The learner first meets them separately, then in pairs, and only later sees the full combination.

The image is one of the strongest rules for our entire library.

## Why the image works

It visually prevents a common teaching mistake:

`A + B + C` all at once.

Instead, it shows:

`A`

`B`

`A + B`

`C`

`A + C`

`B + C`

`A + B + C`

The complexity comes from **connections between already-familiar pieces**, not from repeatedly introducing unfamiliar pieces.

### Rule for us

Before showing a complex system, inventory its mechanics.

Teach each mechanic in isolation before demanding that the learner understand the combination.

For Attention:

- representation;
- Q/K/V;
- compare Q with K;
- score;
- convert score to weight;
- use weight on V;
- combine values;
- update representation.

For MoE:

- dense MLP;
- many possible MLPs;
- router;
- expert scores;
- top-k choice;
- shared expert;
- expert transformations;
- weighted merge;
- reroute on later layers.

Do not display the whole mechanism at full strength before the learner earns it.

---

# 4. Playtesting is part of explanation design

Ncase's point about playtesting is not merely usability testing. It is **learning testing**.

A learner may skim something the author considered essential. If later content requires that skipped knowledge, the experience collapses.

Sometimes withholding later content until the learner has interacted with the prerequisite can actually improve learning.

### Rule for us

When testing an explainer, do not ask only:

> Did anything break?

Ask:

> What did you think was happening?

> What did you think this arrow meant?

> At what point did you stop understanding?

> What did you skip because it looked unimportant?

A visually polished beat that teaches the wrong mental model is a failed beat.

---

# 5. See → Model → Apply

Ncase describes experiences where the learner generates evidence, forms a mental model, then uses that model.

## Teaching pattern

**See something happen → infer a pattern → use the pattern**

This is stronger than immediately stating the rule and then showing an example.

### Rule for us

Where practical, let a learner see enough evidence to anticipate the rule before naming it.

Example for MoE:

1. Show `it` enter the router.
2. Eight experts light up.
3. Show `ball` enter.
4. A different eight light up.
5. Ask visually: **same model, different route — why?**
6. Then state: routing is token-dependent and based on the current representation.

The learner sees the behavior before receiving the abstraction.

---

# 6. Cognitive Gates

The Cognitive Gates idea is that not every part of an explanation should necessarily be accessible before the required foundation exists.

This is not about locking content for game-like progression. It is about protecting the mental dependency graph.

### Rule for us

If Beat C is incomprehensible without A and B, the interface should not visually encourage the learner to jump straight to C.

Our chapter rail should communicate the route without turning the experience into a random-access dashboard.

Optional depth is different: it can be expandable, but the primary causal story should remain ordered.

---

# 7. Gamification is not the goal

A crucial distinction:

**Gamification changes behavior. Our main goal is changing understanding.**

Points, badges, streaks, and artificial rewards are not substitutes for intellectual curiosity.

### Rule for us

The reward should usually be:

- seeing something surprising;
- making a correct prediction;
- causing the model to respond;
- uncovering a hidden mechanism;
- finally understanding the puzzle.

The explanation itself should provide the payoff.

---

# 8. Author-guided + learner-driven

Ncase's drawing/analogy treats exploration and authorship as compatible.

A learner can act freely inside a system while the author still shapes:

- what is visible;
- what actions are possible;
- what sequence is encouraged;
- what consequences are emphasized.

### Rule for us

Do not confuse freedom with lack of direction.

Our authored scrollytelling should strongly guide the primary story while allowing carefully chosen interactions inside individual beats.

A good interaction says:

> Explore **this relationship**.

A weak interaction says:

> Here are 30 controls. Figure it out.

---

# 9. Procedural rhetoric

One of the deepest ideas in the article is that an interactive system can make an argument through its **rules and consequences**.

Instead of saying:

> MoE avoids activating every expert.

we can let the learner watch 288 experts exist, route a token, and see only eight routed experts activate.

The mechanism itself makes the argument.

### Rule for us

Whenever possible:

> Do not merely describe the rule. Make the rule visible in the behavior of the system.

---

# Visual-analysis checklist derived from this article

When studying or designing a visual, ask:

- Does the visual compress a rule into spatial form?
- Is the learner's eye directed to one relationship?
- Is motion showing a temporal or causal relationship?
- Is interaction revealing a system behavior?
- Are mechanics introduced separately before combination?
- Is there a clear hook and later payoff?
- Does the learner have enough prerequisite knowledge for this beat?
- Could the learner prove the idea to themselves instead of taking our word for it?

---

# Hard rules for `explain-ahmad`

1. **Use the right medium for the relationship.**
2. **Start small, build big.**
3. **Teach mechanics before combinations.**
4. **Design interest peaks, not uniform slides.**
5. **Let system behavior carry part of the explanation.**
6. **Playtest understanding, not only usability.**
7. **Guide exploration instead of dumping controls.**
8. **Do not gamify what can be intrinsically interesting.**
9. **When possible: See → Model → Apply.**
10. **The final payoff should require knowledge earned earlier.**
