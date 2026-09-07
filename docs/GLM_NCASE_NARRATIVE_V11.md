# GLM 320B → 18B — Ncase Narrative Spine v11

This document rebuilds the existing 100-beat GLM scrollytelling around the teaching rules collected from the Nicky Case study docs.

The goal is not to make the video louder. The goal is to make every new mechanism feel **necessary**.

## Master rule

Every chapter should move like this:

**QUESTION → HEADACHE → BUT → THEREFORE → MECHANISM → ANSWER → NEW BUT**

The answer to one question should create the next useful question.

If a transition is only “and then”, the story is not finished.

---

# The main video question

**How can a model contain 320 billion parameters, but use only about 18 billion for one token?**

Do not answer this immediately.

The viewer should first feel the contradiction:

- 320B parameters exist;
- but one token does not use all 320B;
- therefore something inside the model must be choosing a much smaller active path.

The rest of the video is a worked example that proves how that happens.

---

# Interest curve

The video should alternate between quiet setup and strong payoffs.

Major peaks:

1. **320B vs ~18B contradiction**
2. **Vocabulary wall scale**
3. **4,096-value embedding unfold**
4. **Prediction: which earlier word should `it` use?**
5. **Attention makes `ball` dominate in the teaching view**
6. **288 experts appear**
7. **Prediction: how many of 288 survive?**
8. **Only top-8 + shared stay active**
9. **Different token → different route**
10. **One MoE room becomes a 45-layer building**
11. **Prediction: what token comes after `it`?**
12. **Final 320B → ~18B payoff**

Quiet beats between peaks are intentional. If every beat is dramatic, none of them are.

---

# Chapter 1 — Model / create the headache

## Question

**If this model has 320B parameters, why are only ~18B active for one token?**

## Story

- Introduce GLM-5.3-Flash.
- Show **320B total** first.
- Let the viewer assume the obvious thing: a 320B model sounds like 320B parameters should run.
- **BUT** reveal **~18B active / token**.
- Circle the contradiction.
- Define `parameter` and `active` only after the viewer cares about the distinction.
- Reveal `Mixture of Experts` as a clue, not an explanation.
- Do not dump the architecture yet. Keep only the facts we will later use.

## Answer status

Not answered yet.

## Therefore

**Therefore, instead of staring at architecture numbers, follow one token and watch which parts of the model actually become active.**

---

# Chapter 2 — Text

## Question

**What does the model actually receive when we type a sentence?**

Use the concrete fragment:

`The dog dropped the ball, and it`

## Story

The user sees text.

**BUT** the neural network cannot directly transform letters and words as human-readable symbols.

**THEREFORE** the text must first become machine-friendly pieces.

## Answer

The prompt enters a tokenizer.

## New question

**What does the tokenizer make?**

---

# Chapter 3 — Tokens

## Question

**How does text become pieces the model can work with?**

## Story

- Show the same sentence.
- Boundaries appear before pieces move.
- Then pieces separate.
- Name them only after the visual exists: **tokens**.
- Follow only `it`.

## BUT

A token is still text.

The network needs numbers.

## Therefore

**Therefore each token gets a numerical lookup address.**

---

# Chapter 4 — Token ID

## Question

**Is the token ID the meaning of `it`?**

This should be a tiny prediction moment.

## Answer

**No.**

The ID is only a lookup address.

## Story

- IDs appear.
- Pull back to the 154,880-entry vocabulary wall.
- Keep `it` still while the index moves.
- Land on its row.

## BUT

An address tells us **where to look**, not what numerical representation the model should carry.

## Therefore

**Therefore the ID opens one learned row in the embedding table.**

---

# Chapter 5 — Embedding

## Question

**What is waiting at that lookup address?**

## Story

- Vocabulary wall folds into the embedding book.
- ID becomes a page tab.
- Pages flip to the row.
- Numbers appear.
- Page unfolds to make 4,096 dimensions feel physically large.

Name the abstraction only after the example exists:

**Embedding = the learned numerical starting representation for this token.**

## BUT

The same token `it` can refer to different things in different sentences.

A starting vector alone does not know which earlier words matter **here**.

## Therefore

**Therefore the representation needs context.**

That creates the need for Attention.

---

# Chapter 6 — Attention

## Headache

**`it` has 4,096 numbers now — but which earlier words should influence it?**

## Place Your Bets

Before teaching Q/K/V, ask:

**Which earlier word should matter most for `it` here?**

Keep the sentence visible.

The learner can pick in their head.

Do not reveal the answer yet.

## Mechanism

### Step 1 — Make Q/K/V

The current representation is transformed into three learned views.

- Query = what this position uses to look for a match.
- Key = what each available position offers for matching.
- Value = the information that can later be carried back.

### BUT

Having Q/K/V does not yet tell us which positions matter.

### THEREFORE

Compare Query with Keys.

### Step 2 — Match Q with K

Compare Q(`it`) against allowed Keys.

Future words remain visibly unavailable because they have not been generated yet.

The local match scores remain attached to their words.

### Answer to the prediction

In the teaching view, `ball` produces the strongest match.

Do not claim this proves coreference or model reasoning. It is an illustrative attention view.

### BUT

A match score only says **how much to use**.

It does not carry the information itself.

### THEREFORE

Turn scores into weights, then use those weights on Values.

### Step 3 — Weights

Scores become attention weights.

### Step 4 — Read Values

Keys step back.

Values remain.

Each Value is scaled by its weight.

### Step 5 — Mix context

Weighted Values flow into one visible Σ mixer.

The mixed context returns to the same `it` position.

## Answer

**Attention solves the context problem by deciding which available positions contribute, then mixing their information back into the current representation.**

## New BUT

Now `it` has richer context.

**BUT the layer still needs a feed-forward transformation.**

A normal Transformer could use one dense MLP for every token.

That works — **but** it creates the next problem.

---

# Chapter 7 — MoE

This is the main mechanical plot twist of the video.

## Headache

**How do you give the model much more learned capacity without running all that capacity for every token?**

Start from the dense baseline:

`representation → one MLP → changed representation`

That is easy to understand.

## BUT

One MLP gives limited feed-forward capacity.

We could make the feed-forward part much bigger.

**BUT** running a giant block for every token would spend much more compute.

## Therefore

**Have many possible learned MLP blocks, but choose only a few for the current token.**

Now reveal the 288 experts.

## Explain expert before router

Open one block.

**Expert = learned feed-forward neural-network block.**

Not a human-labelled “math expert” or “code expert”.

## New question

**Who chooses which experts run?**

## Therefore — router

The current contextual representation reaches a learned router.

The router scores each routed expert.

Teach one score first.

Then repeat the same operation across all 288.

## Place Your Bets

Freeze the scores and ask:

**288 experts exist. How many of them do you think survive for this token in this layer?**

Keep the field visible.

## Answer / peak

**Top 8 routed experts.**

The other 280 do not disappear. They stay available for other tokens or other routing decisions.

Then add the **1 shared expert** that always participates.

## BUT

Choosing experts is not useful unless those experts actually transform the representation.

## Therefore

Dispatch the same current input to the active expert paths.

Open one expert to show the MLP transform.

Then show all selected experts run in parallel.

## BUT

Their outputs are not necessarily equally useful.

## Therefore

Weight the routed expert outputs, combine them, and add the shared expert output.

## Answer

**MoE gives the layer access to many possible feed-forward blocks while using only a small selected subset for the current token.**

## New question

**Does every token use the same experts?**

Answer by changing the token representation in the same expert field.

Different routing fingerprint.

## New question

**Does `it` use the same eight on the next sparse layer?**

No guarantee.

The representation changes, therefore the router scores again.

## Main payoff connection

Now return to:

`320B TOTAL`

**BUT**

`~18B ACTIVE / TOKEN`

The active figure is not simply “8 experts equal 18B”. It is the approximate broader active parameter path through the model.

---

# Chapter 8 — Layers

## Question

**If one Attention + MoE floor already changed the representation, why does the model need 45 layers?**

## Story

One floor shrinks into the building.

Show:

- Layers 1–3: Attention + dense MLP
- Layers 4–45: Attention + sparse MoE

Then move the same `it` representation through floors 1, 2, 3, 4.

## BUT

The router on layer 4 is not seeing the same vector the router on layer 5 will see.

## Therefore

Each layer operates on a representation already changed by the layer before it.

The representation is repeatedly refined.

Do not invent exact linguistic jobs for individual floors.

## Answer

**The model gets depth by repeatedly transforming an evolving representation, and sparse layers can make fresh routing decisions along the way.**

## New BUT

After layer 45, the representation is highly processed.

**BUT it is still a vector, not a word.**

---

# Chapter 9 — Output

## Headache

**How does a final vector become the next token?**

## Place Your Bets

Show:

`The dog dropped the ball, and it ___`

Ask:

**What do you think comes next?**

Let the viewer answer mentally before the vocabulary scores appear.

## Therefore

The final representation scores every vocabulary entry.

Show the 154,880-way output surface.

Then lift only the top candidates.

## Answer

One next token is selected and appended.

For the teaching example: `rolled`.

## BUT

One token is not a full continuation.

## Therefore

The longer sequence runs through the stack again.

Then:

`rolled → away → .`

## Answer

**Autoregressive generation is repeated next-token prediction.**

---

# Final payoff

Return to the opening paper.

The viewer should now be able to answer the title question without trusting us blindly.

## Final causal chain

`320B total learned capacity exists`

**BUT**

`a token does not need every routed expert in every sparse layer`

**THEREFORE**

`its current representation is routed through a small selected expert path`

**AND because routing repeats across the network**

`the approximate active parameter path can be much smaller than the total stored capacity`

## Final line

**Huge capacity. Selective compute.**

Then one more useful question can remain:

**If different tokens can take different routes, what kinds of internal specialization emerge during training?**

Do not answer it in this video. This is the next hill.

---

# Hard production rules from the Ncase docs

1. **Question before jargon.**
2. **Create the headache before the mechanism.**
3. **Example before abstraction.**
4. **One new connection at a time.**
5. **Use BUT / THEREFORE for transitions.**
6. **Do + Show + Tell only when each part earns its place.**
7. **Prediction before major reveals when the viewer can reasonably form an expectation.**
8. **Keep prediction and answer in the same visual world.**
9. **Actions/results should preserve visible causal continuity.**
10. **Mechanics should generate the payoff; narration should not merely assert it.**
11. **Start small, build big.**
12. **Keep expert-level caveats quieter than the primary path.**
13. **Paper metaphors must behave semantically, not just look handmade.**
14. **The learner should always be able to answer: why did that happen?**
15. **End with a better question, not just “now you know.”**
