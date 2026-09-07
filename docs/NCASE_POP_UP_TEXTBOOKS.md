# Nicky Case — Pop-Up Textbooks

**Source:** https://blog.ncase.me/pop-up-textbooks/

This study captures the core idea behind the article and, more importantly for us, what the historical pop-up-book imagery teaches about designing explanatory objects.

---

# Core idea

Pop-up books were historically used for serious scholarly purposes:

- rotating paper mechanisms for calculations;
- 3D mathematical models;
- layered anatomy;
- astronomical orbits.

The important idea is not "make education look playful."

It is:

> **Make the medium physically embody the relationship being explained.**

Digital explanations can do the same thing with interaction, transformation, motion, and layered reveal.

---

# What the historical images are doing

The article uses photographs of old paper mechanisms to make a simple point visually obvious:

**the page itself can become part of the model.**

Instead of text describing a wheel, orbit, layer, or 3D structure while an illustration sits beside it, the book mechanism lets the learner:

- rotate;
- lift;
- unfold;
- reveal;
- align;
- inspect layers.

The explanatory object behaves like the thing being explained.

This is much more important than the "paper" aesthetic.

### Rule for us

Do not confuse paper styling with pop-up-textbook thinking.

A beige background, serif type, and rough border do not make an explanation physical.

The **behavior of the object** must carry meaning.

---

# Examples translated into digital design

## Paper wheel → interactive state/relationship

A rotating wheel is useful when alignment or cycles matter.

Digital equivalent:

- rotating layer selector;
- circular causal cycle;
- aligned lookup positions;
- repeated generation loop.

Use only if rotation itself expresses the concept.

---

## Anatomy flap → progressive layer reveal

A flap works because one physical location can reveal deeper structure without losing context.

Digital equivalent:

- open an expert to inspect its MLP internals;
- peel back one Transformer floor;
- expand a token ID into an embedding row;
- reveal Q/K/V from the same representation.

### Rule

When explaining internal structure, prefer:

**same object → opens/reveals internals**

over

**object disappears → new unrelated diagram appears**.

This preserves identity and reduces cognitive load.

---

## 3D mathematical model → spatializing abstraction

The original pop-up books could make a geometric form physically stand above the page.

Digital equivalent:

- take a flat MoE block and let it become one physical floor in a building;
- turn a flat vocabulary index into a book with page depth;
- make a long embedding vector physically unfold beyond the normal page width.

### Rule

Use spatial transformation when **scale, hierarchy, or containment** is the concept.

Do not use 3D-like movement merely for spectacle.

---

# The deepest lesson: integration

Ncase's argument is not "put interactive widgets next to text."

The old books integrated the mechanism **into the text itself**.

The explanation and the interactive object were one artifact.

### Rule for us

Avoid this pattern when possible:

`paragraph`

`generic diagram box`

`paragraph`

`button`

Instead, allow explanation to live on and around the object:

- a margin note attached to the router;
- a highlighter directly on the active expert count;
- a definition beside the Token ID when it first appears;
- a question physically attached to `it`;
- a label appearing at the exact transformation point.

The page should feel like an **annotated working object**, not an article plus widgets.

---

# Interacting is not automatically understanding

The article uses the broader learning-by-doing idea, but our later Ncase references add an important qualification:

Interaction must expose meaningful cause-and-effect.

A page-flip animation is useful if it communicates **lookup/address/selection**.

It is useless if it exists only because a book "should" flip pages.

### Rule for us

For every physical metaphor, ask:

> Which real relationship does this motion encode?

Examples:

- token ID becomes a bookmark → **address**;
- pages scan then stop → **lookup**;
- vector unfolds sideways → **dimensional scale**;
- expert door opens → **inspect subnetwork**;
- MoE room shrinks into one floor → **containment/hierarchy**.

If the motion has no answer, remove it.

---

# What this means for our paper visual language

Our visual system should behave more like a working notebook / pop-up technical book:

- information written directly into the page;
- marks added when the narrator needs them;
- objects unfolding from existing objects;
- page tabs representing addresses;
- diagrams gaining depth when hierarchy matters;
- layers peeling open;
- annotations living next to the exact mechanism;
- previous marks remaining faintly visible when they support continuity.

Avoid turning every concept into a rounded card.

---

# Hard rules for `explain-ahmad`

1. **Paper is behavior, not beige.**
2. **Let the explanatory object embody the relationship.**
3. **Reveal internals by opening the same object whenever possible.**
4. **Use physical transformations to teach identity, hierarchy, scale, or causality.**
5. **Attach explanations directly to what they explain.**
6. **Do not separate the article and the interactive into two unrelated layers.**
7. **Every motion in a physical metaphor needs semantic meaning.**
8. **Prefer unfold / reveal / align / combine over fade-out → replacement.**
9. **Use depth only when depth communicates structure.**
10. **A good explainer should feel like the page itself is thinking.**
