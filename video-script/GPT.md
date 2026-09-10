# GPT — Full Narration Proposal

Status: **ALTERNATE PROPOSAL — not authoritative unless Ahmad chooses it.**

This version does not replace `01-opening-narration.md`. It builds a full spoken story from the current `storyboard/SECTION_MAP.md`, the GLM research, and the teaching rules in `skills/`.

Technical source of truth: `research/glm/GLM_V7_ATTENTION_MOE_RESEARCH.md`.

---

## 01 — The 320B → 18B mystery

GLM-5.3-Flash has **320 billion parameters**.

But for one token, only about **18 billion parameters are active**.

That is the part that confused me.

Because if only a small fraction is doing the work for this token... **why have the other 300 billion at all?**

The first clue is that this is a **Mixture-of-Experts model**.

Instead of using one giant feed-forward network everywhere, it has a large pool of expert networks, and only a few are selected for a token at a sparse layer.

Okay. That explains how the compute can be selective.

But it creates a better question.

If the model already has a **router** that decides which experts are needed... why can’t we keep the huge expert pool somewhere else, load only the selected experts, and run the model like a much smaller machine?

Why should a 320-billion-parameter model still be difficult to hold and serve if only about 18 billion parameters participate in a token’s path?

There is a catch in that idea.

And to see it, we need to stop looking at the model from the outside and follow one token through it.

---

## 02 — One prompt

Use this sentence:

**“The dog dropped the ball, and it”**

Don’t finish it yet.

We are going to follow **`it`**.

Not because `it` is special, but because it forces the model to use context. The word by itself does not tell us what it refers to or what should come next.

So what actually happens after this text enters the model?

---

## 03 — Text becomes tokens

First, the model does not work directly with the sentence as one human-readable object.

The tokenizer breaks the text into **tokens** — the pieces from the model’s vocabulary.

A token can be a whole word, part of a word, punctuation, or another text piece depending on the tokenizer.

For our journey, keep your eye on **`it`**.

But `it` is still text.

A neural network needs numbers.

So the tokenizer maps each token to an integer **token ID**.

That number is not the meaning of `it`.

It is basically a lookup address: **go to this entry.**

---

## 04 — Token ID becomes an embedding

GLM-5.3-Flash has a vocabulary of **154,880 entries**.

The token ID points to one entry, and that entry gives the model a learned numerical representation for the token.

That representation has **4,096 values**.

This is the token’s starting embedding.

So now `it` is no longer just letters. It is a vector the model can transform.

But we immediately hit another problem.

The starting representation for `it` alone cannot tell us what matters in **this sentence**.

In another sentence, `it` could refer to something completely different.

So the representation needs context.

That is the problem Attention helps solve.

---

## 05 — Attention: what should `it` use?

Before I explain the mechanism, make a prediction.

In:

**“The dog dropped the ball, and it”**

which earlier part would you expect to matter strongly for understanding `it`?

Probably **`ball`** is high on your list.

Now, for the intuition, I’m going to use the familiar **Query, Key, Value** picture of attention. GLM-5.3-Flash actually uses a hybrid attention architecture, so this is a teaching lens for the job attention is doing, not a claim that every layer is plain vanilla attention.

The current representation of `it` is transformed into learned views.

A **Query** is what this position uses to look for useful matches.

Earlier positions provide **Keys** for matching and **Values** containing information that can be carried forward.

The Query from `it` is compared with the allowed Keys from the context.

Those comparisons produce scores, the scores become attention weights, and the weights decide how strongly the corresponding Values contribute.

The weighted Values are mixed together and returned to the `it` position.

So `it` is still the same token position — but now its representation contains more context from the sentence.

For the visual example we can make `ball` the strongest illustrative connection. That is a teaching illustration, not a measured claim about a specific GLM head.

Now we have a contextual representation.

But attention is not the whole Transformer layer.

The layer still needs a feed-forward transformation.

And this is where the 320B-versus-18B mystery starts to become visible.

---

## 06 — Why Mixture of Experts exists

Start with the simple version.

A normal dense Transformer can send every token through the same feed-forward network.

That works.

But suppose we want much more learned feed-forward capacity.

We could make that one network enormous — but then every token would pay for that enormous network.

Mixture of Experts changes the tradeoff.

Instead of one giant feed-forward block, a sparse GLM layer has **288 routed experts** available.

And an expert here is not a little person labelled “math” or “coding.”

It is a learned feed-forward neural-network block.

The current contextual representation reaches a learned **router**.

Important: the router reads the **current representation**, not the token ID.

It scores the routed experts.

Now make another prediction.

There are **288** available routed experts in this sparse layer.

How many do you think actually run for this token?

**Eight.**

The router selects the **top 8 routed experts** for this token in this layer.

GLM also has **1 shared expert** that participates alongside them.

The current representation is sent through those selected expert paths. Each expert applies its own learned transformation. Their routed outputs are combined, the shared path contributes, and one updated representation comes out.

The other routed experts did not vanish.

They are still part of the model. They simply were not selected for this token at this layer.

And another token can get a different route.

Even the same token can get a different route later, because its representation has changed.

That last point matters a lot.

---

## 07 — One layer becomes 45

The expert room we just looked at is not the whole model.

GLM-5.3-Flash has **45 language layers**.

The first **3** use dense feed-forward blocks.

The next **42** use sparse Mixture-of-Experts feed-forward blocks.

Our `it` representation moves through the stack.

Layer 1 changes it.

Layer 2 receives the changed version and changes it again.

Layer 3 does the same.

Then at the sparse layers, the router is making decisions from a representation that keeps evolving.

So the top 8 experts chosen on one sparse layer are not guaranteed to be the top 8 on the next one.

The routing decision is not one permanent route assigned to the word `it`.

It is a fresh decision from the current hidden state.

And now we finally have enough information to return to the question from the beginning.

---

## 08 — Why not load only the selected experts?

Our original idea sounded simple:

Keep the full expert pool outside fast memory.

Let the router choose the eight experts.

Load those eight.

Run them.

Repeat.

The problem is **when the choice becomes known**.

The router can only choose experts for a sparse layer after it receives the current representation for that layer.

And that representation exists only after the earlier computation has happened.

Then the selected set can change on the next sparse layer.

And it can change again for another token.

So there is no single little 18-billion-parameter sub-model we can identify once, load once, and use forever.

If the required expert weights are sitting outside fast compute memory, the system may have to move weights when routing asks for them.

At that point you save compute by being sparse, but weight movement, memory bandwidth, and latency can become the new bottleneck.

That does **not** mean all 320 billion parameters must always sit in one GPU’s VRAM.

Real inference systems can shard the model, quantize it, cache useful weights, and offload parts of it.

The real point is simpler:

**Sparse compute does not automatically mean a tiny memory footprint.**

The full expert pool still exists, and efficient serving needs fast enough access to whatever routing asks for next.

That is the catch.

---

## 09 — From the final vector to the next token

After the representation reaches the end of the stack, the model still has one job left:

choose what comes next.

Remember our unfinished sentence:

**“The dog dropped the ball, and it ___”**

What would you predict?

The final representation is turned into scores across the model’s **154,880-token vocabulary**.

A few candidates come out higher than the rest.

For our teaching example, suppose **`rolled`** is selected.

Now the sequence is:

**“The dog dropped the ball, and it rolled”**

To generate another token, the model performs another generation step with the longer context. Inference systems reuse cached state where the architecture and serving stack allow; they do not need to naïvely rebuild every previous token from zero on every step.

Then another token can be selected.

And another.

That is autoregressive generation: repeated next-token prediction.

---

## 10 — Return to 320B → 18B

Now the opening numbers mean something different.

**320B total parameters** means the model has a huge amount of learned capacity stored and available.

**About 18B active parameters** means the computation for one token follows a much smaller active path through the model.

Mixture of Experts gives you **large total capacity with selective compute**.

But the selection changes with the representation, across sparse layers and across tokens.

So the model can avoid computing with all 320B parameters for every token without magically becoming an 18B model that only needs one fixed 18B chunk of weights.

That is the distinction:

**Huge capacity. Selective compute. Dynamic access.**
