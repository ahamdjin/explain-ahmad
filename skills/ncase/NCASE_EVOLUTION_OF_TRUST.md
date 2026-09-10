# Nicky Case — The Evolution of Trust

**Source:** https://ncase.me/trust/ · code vendored at `src/vendor/ncase-trust/`
(CC0). Ahmad: *"Trust of evolution is the best thing to learn from."*

Provenance note: only `Slideshow.js`, `Slider.js` and `0_Slides_Intro.js` are
vendored. The words live in a `words/en.html` file that is **not** in this repo,
so the quotations below are from the published piece and are paraphrased where
marked. The *structure* is verifiable from the vendored slide order and the
published work; the exact sentences are not, and nothing here should be quoted
as Case's wording.

---

## Why this one and not the blog posts

The blog posts say what to do. This is the only artefact in the study set that
**does it end to end at video length** — twenty-odd minutes of sustained
attention on game theory, which is a topic with no inherent stakes. That is our
exact problem: MoE routing has no inherent stakes either.

---

## 1. The opening does not open on the subject

The piece is about game theory. The first thing on screen is not game theory,
not a payoff matrix, and not a number.

It is **Christmas Eve, 1914, the Western Front.** German soldiers start singing
carols. British soldiers sing back. The next morning men climb out of the
trenches, shake hands, exchange gifts, play football in No Man's Land.

Then: the war resumed, and by the end fifteen million people were dead.

**Only then does the question arrive** — *why do enemies become friends, and
friends become enemies?* (paraphrase) — and it arrives as something the story
has forced you to want to know, not as a topic being announced.

### The rule

> **Open on a concrete situation with a contradiction in it. Let the question
> be the thing the situation forces. Never open on the subject.**

Scored against our §01, which opens on *"Three hundred and twenty billion"*:
that is opening on the subject. It is the spec sheet, not the truce.

## 2. The abstraction is earned, never presented

Case needs the reader to understand a payoff matrix. He does not show one.

He shows **a machine**. You put in a coin. The machine gives the other player
three coins. They have the same machine. Two people, two choices, coins you can
see and count.

The payoff matrix appears *later*, as a way of writing down what you already
did. By the time the grid of numbers shows up, every cell is a memory.

### The rule

> **Build the abstraction out of a concrete thing the learner has already
> operated. The formal notation is a summary of their experience, not an
> introduction to it.**

We do this well in §05–06 (the router as a desk that scores). We do not do it
in §01, where "parameter", "expert" and "active" all arrive as definitions.

## 3. Strategies are given faces

"Always Defect" is a hard idea. **"Always Cheat", drawn as a character with a
face**, is not. The strategies become a cast: Copycat, Always Cooperate, Always
Cheat, Grudger, Detective, Simpleton, Copykitten.

This is not decoration. Once a strategy is a person, "what happens when Copycat
meets Detective?" is a question a reader can *hold in their head* — where "what
happens when tit-for-tat meets a conditional prober?" is not.

### The rule

> **Give a recurring mechanism a face and a name, and the reader can reason
> about it without re-deriving it.**

Our 288 experts are currently anonymous boxes. The router is a desk. Neither is
a character, and §05 asks the viewer to track a relationship between two things
that have no identity.

## 4. One new mechanic at a time, and the old one stays

The build order is strict, and each stage is fully playable before the next
arrives:

```
one round, two players          →  what the choice is
repeated rounds                 →  the shadow of the future
many characters, a tournament   →  strategies compete
repeat the tournament, evolve   →  ← the title's own word, ~2/3 in
add mistakes / noise            →  ← the twist
sandbox                         →  the reader sets everything
```

Two things to steal:

**The title's word is withheld.** The piece is called *The Evolution of Trust*
and evolution does not appear until roughly two-thirds through — at the moment
the mechanism makes it inevitable. It is a payoff, not a topic sentence.

**The twist lands late and reverses a conclusion the reader already reached.**
Add miscommunication, and Copycat — who has been winning for ten minutes —
loses to Copykitten. The reader had a settled belief and watched the mechanism
take it away. That is the interest-curve peak, and it is at ~70%.

### The rule

> **Withhold the naming word until the mechanism earns it, and place one
> conclusion-reversing surprise around two-thirds through.**

Ours: "Mixture of Experts" is never said at all, and §12's caching result —
*it works, but not here* — is the reversal. It is in the right place. It is not
currently staged as a reversal of something the viewer believed.

## 5. It closes on the image it opened with

The conclusion returns to the trenches. Same photograph, different meaning: the
reader now has a mechanism that explains it. The ring is the payoff.

### The rule

> **Open and close on the same concrete image. The second time, the viewer can
> read it.**

We have no such image. §01 opens on a number sheet and §13 closes on a verdict.
Nothing returns.

## 6. What it does *not* do

Worth recording, because these are temptations:

- **No progress bar, no chapter titles, no "Part 3 of 7".** Structure is
  carried entirely by the mechanic changing and the narration saying so.
- **No recap sections.** Nothing is re-explained; earlier mechanics are simply
  still on screen and still working.
- **No hedging in the main path.** Caveats live in the conclusion and the
  footnotes, never in the middle of a teaching move.
- **Nothing is clickable that is not a thinking act.** Advancing is a button;
  every other interaction changes an outcome.

---

## Scorecard for `explain-ahmad`

| Trust does | We do | |
| --- | --- | --- |
| opens on a concrete contradiction | opens on a spec number | ✗ |
| earns the abstraction from a physical thing | §01 defines three terms in 20s | ✗ |
| mechanisms have faces and names | experts are anonymous boxes | ✗ |
| one new mechanic at a time | yes — this is our strength | ✓ |
| the naming word is withheld and then paid off | "Mixture of Experts" never said | ✗ |
| a conclusion-reversing twist at ~70% | §12 is in the right place, not staged as one | ~ |
| opens and closes on the same image | nothing returns | ✗ |
| no chapter chrome; narration carries structure | chrome removed, narration never replaced it | ✗ |

The last row is the one Ahmad reported as *"the whole story feels
disconnected"*. Trust has no chapter titles either — but every time its
mechanic changes, **the narration says so in a sentence**. We removed the
chrome and did not write the sentences.
