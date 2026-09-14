# Video 1 — narration read-through · v6

**Current rewrite branch source of truth.**

- §1 and §2: **APPROVED NARRATION — LOCKED**. Do not paraphrase.
- §3–§13: current narration-first story pass. Review these before marking them locked.
- Tracked protagonist for the whole machine journey: **`it`**, token ID **432**.
- Storyboard details live in the individual section files.

---

# §1 — The five-percent problem

You’ve probably seen AI models advertised like this:

**320 billion parameters.**
**Only 18 billion active.**

And that sounds incredible.

Because if only a small part of the model is being used at a time…

then surely you only need that small part.

Right?

Honestly, that’s what I assumed too.

So let me show you something weird.

Here are two models.

This one uses about **4%** of its parameters when generating a token.

This one uses about **6%**.

Pretty close.

So if I asked you which one needs more hardware…

you’d probably expect the difference to be pretty small.

It isn’t.

This one can fit on a single 80-gigabyte accelerator.

Keeping this one fully resident at the precision it ships in takes **eight**.

Same basic promise:

**most of the model is inactive.**

Completely different machine.

And that raises a much stranger question.

When they say **18 billion parameters are active**…

**which 18 billion?**

Are they sitting together somewhere inside the model?

Are they the same 18 billion every time?

Does the model already know which ones it’s going to need before you ask it anything?

Because if the answer to those questions were simple…

you really could just keep the useful part and forget the rest.

But that’s not what happens.

And the easiest way to understand why is not with a giant architecture diagram.

We’re going to follow **one tiny piece of text** through the entire model.

Just one.

Let’s type:

**“The dog dropped the ball, and it…”**

And we’re going to follow **“it.”**

By the time that little piece reaches the other side, the whole **320 billion versus 18 billion** thing should finally make sense.

So first:

when you type this sentence into the model…

what does the model actually receive?

Because it doesn’t start with words.

---

# §2 — What the model actually receives

Because it doesn’t start with words.

The first thing the model does is break your text into smaller pieces.

So our sentence:

**“The dog dropped the ball, and it…”**

becomes:

**The | dog | dropped | the | ball | , | and | it**

Eight pieces.

And these pieces are called **tokens**.

Now, in this sentence, they look suspiciously like words.

But tokens are **not** just words.

For example, give the same tokenizer:

**“unbelievable”**

and it breaks it into:

**un | belie | vable**

One word.

Three tokens.

So the model isn’t really reading words the way we do.

It has its own set of pieces it knows how to work with.

And GLM has a list of **154,880** of them.

Every token in that list has a number.

So let’s go back to the one we said we’d follow:

**“it.”**

Where do you think `it` is in that list?

There’s no way you could know.

It happens to be:

**432.**

That number is called its **token ID**.

So from the model’s point of view, our little `it` has now gone from:

**“it”**

to:

**432.**

And that sounds like progress.

But think about what 432 actually tells us.

Does **432** tell you that `it` might refer to the ball?

Does it tell you that `it` is a pronoun?

Does it tell you anything about what `it` means?

No.

It’s just where that token lives in the list.

Basically an address.

And that creates our next problem.

The model now has a number…

but **where does the meaning come from?**

---

# §3 — From 432 to a useful representation

Right now, everything the model has for our little `it` is **432**.

Just an address.

And that address is useful because it tells the model where to look next.

Imagine a giant reference book.

One page for every token the model knows.

We have **432**...

so we open page **432**.

But instead of finding a definition for `it`, we find something much stranger.

A long row of numbers.

Not ten numbers.

Not a hundred.

**4,096 numbers.**

That row is called an **embedding**.

And the easiest way to think about it is this:

432 was just the address.

The embedding is the model's learned **starting representation** for that token.

Those 4,096 numbers were learned during training.

No single number means “pronoun” or “ball” or “dog.”

It’s the whole pattern that matters.

So now our `it` is no longer just:

**432**

It is this entire row of 4,096 values.

Which feels much more useful.

But there’s a problem.

This is a lookup table.

Which means every time the token `it` appears...

it starts by pulling out **the exact same row**.

Take:

**“The ball rolled because it was pushed.”**

and:

**“The dog stopped because it was tired.”**

Different `it`.

Different thing it refers to.

Same starting embedding.

So this row can’t be the whole meaning.

Something still has to make our `it` understand the sentence it is inside.

And that is what happens next.

---

# §4 — `it` gets context

So our `it` starts with the same embedding every time.

But ours is not alone.

It is sitting here:

**The dog dropped the ball, and it**

with seven other tokens around it.

And this is where the model starts adding **context**.

The useful intuition is simple:

each token gets to look at the tokens it is allowed to see and ask:

**which of these matter to me right now?**

For our `it`, everything before it is available.

So if you were `it`...

which pieces would you want to pay attention to?

Probably things like **dog**, **dropped**, and **ball**.

The model does something much more mathematical than that, of course.

It compares the current representations, works out relationships between them, and mixes useful information back into the row for `it`.

Some connections matter more.

Some matter less.

And after that mixing happens...

our row changes.

Same token.

Same ID 432.

But now, different numbers.

Because these numbers describe `it` **in this sentence**.

That general idea is what attention is doing for us here: letting a token change based on its context.

One technical detail: GLM-5.3-Flash uses a hybrid design, so not every layer is plain textbook self-attention.

But for our story, the important job is the same:

**context changes the representation.**

And now something interesting happens.

We finally have a row that is specific to this `it`, in this sentence.

So what does the model do with it?

It decides **which parts of itself should work on it next.**

---

# §5 — The router picks the eight

Now we reach the part that explains the word **active**.

In one of GLM’s sparse layers, our `it` arrives in front of **288 experts**.

And no — you were not supposed to know that number.

GLM simply has 288 routed experts available here.

But it does **not** run all 288.

Something has to choose.

That something is the **router**.

And here’s a question you actually can answer now.

Should the router choose based on the original token ID — **432**...

or based on the row we just changed using the sentence?

It has to use the changed row.

Because 432 is the same every time.

But this row describes `it` **right now, in this context**.

So the router takes that row and gives all 288 experts a score.

Not eight of them.

**All 288.**

Then it keeps the top **eight**.

The other **280** routed experts do nothing for this token, in this layer.

And there’s one more detail.

GLM also has **one shared expert** that runs every time.

It isn’t part of the 288-way competition.

So visually:

**288 are scored.**

**8 are selected.**

**+1 shared expert always runs.**

And one thing I want to kill before it becomes confusing:

an expert is **not** “the dog expert” or “the grammar expert.”

It is just a learned neural-network block that transforms the row.

The router learned which blocks tend to be useful for which hidden states.

That whole setup — many possible expert blocks, only a few routed ones used at a time — is why this is called a **Mixture of Experts**, or MoE.

And notice what just happened.

For the first time, we can point to some parameters in this giant model and say:

**these ones are active for our `it`, right now.**

So what do the eight actually do?

---

# §6 — The experts do the work

The router has picked eight.

Now the actual work happens.

Our `it` row is copied into **all eight selected experts**.

Same input.

Eight different blocks.

And each expert transforms that row in its own learned way.

So one row goes in...

and eight different rows come out.

At this point you might reasonably think:

**okay — which expert wins?**

None of them.

The router’s scores still matter.

The experts that scored higher get more influence.

The ones that scored lower get less.

So those eight outputs are **weighted and blended back together**.

And remember the shared expert from the side?

Its output joins too.

After all of that...

we are back to **one row**.

Still 4,096 numbers long.

Still our same `it`.

But the values have changed again.

So the token has not turned into a word yet.

It has not produced an answer.

It has simply been **processed one step deeper**.

And that is useful, because the next part of the model expects the same kind of object:

another row of 4,096 numbers.

So it can hand this new row forward.

Context changed the row.

The router chose who should work on it.

The experts changed it again.

That is one sparse layer’s basic story.

And our `it` is nowhere near finished.

Because GLM has **45 layers**.

---

# §7 — One layer becomes forty-five

What we just watched was **one sparse layer**.

Our `it` came in as one row...

looked at context...

had experts chosen...

went through those experts...

and left as a changed row.

Now here’s the next fair question.

When `it` reaches the next sparse layer...

does it keep the same eight experts?

Or does it choose again?

It chooses again.

Because look at what we’re carrying upward.

The row has changed.

And the router makes its decision from **that row**.

So a new layer means a new router score.

Some experts might happen to be selected again.

Others won’t.

But it is a **fresh decision**.

Now pull the camera back.

That room we were standing in?

It is one layer in a stack of **45**.

Three of those layers use a normal dense feed-forward block instead of routed experts.

The other **42** are the sparse MoE layers we care about here.

So for one token:

**42 routing decisions.**

And each decision selects **8 routed experts**.

So:

**42 × 8 = 336 expert visits.**

Important distinction:

not 336 routing decisions.

**42 decisions. 336 routed expert visits.**

For our one little `it`.

And each decision happens only after the representation for that layer exists.

Which already starts to answer our opening mystery.

There isn’t one permanent group of experts called “the active 18 billion.”

The active routed pieces are being chosen **as the token moves through the model**.

But we have been cheating a little.

Because we followed only `it`.

Our prompt had **eight tokens**.

What happened to the other seven?

---

# §8 — That was one token. Here is the whole prompt.

We followed `it` because following eight things at once would be a terrible explanation.

But `it` was never alone.

Our prompt became **eight tokens**:

**The | dog | dropped | the | ball | , | and | it**

And during the first pass through the prompt, all eight positions are processed through the stack.

Not one token all the way to the top...

then the next one...

then the next one.

Layer by layer, the model works on the prompt positions together.

Each token has its own row.

Each row gets context from the positions it is allowed to see.

Because this is generating text left to right, there is one important rule:

**a token can use the tokens before it, not future tokens that have not happened yet.**

So `The` has almost nothing behind it.

`ball` has several earlier tokens available.

And our `it`, sitting at the end of the prompt, can look back across all seven earlier positions.

Then each position keeps moving upward through the layers.

And on the **42 sparse layers**, each token gets its own routing decision.

So the 336 routed expert visits we counted for `it`...

happen for the other prompt tokens too.

Eight tokens.

336 routed expert visits each.

That gives us:

**2,688 routed expert visits**

for this simplified count across the prompt’s first pass.

That first processing of the prompt is usually called **prefill**.

And this whole stacked architecture — representations moving through layers while positions exchange allowed context — is the transformer stack we have been travelling through.

But none of this has produced an answer yet.

We have eight finished representations at the top.

So how does the model turn those numbers into the **next token**?

---

# §9 — Where the next token comes from

At the top of the stack, we now have a finished row for every position in the prompt.

Eight tokens in.

Eight final representations out.

But to predict what comes **next**, there is one position we care about most:

the last one.

Our `it`.

Because the next token has to come **after** `it`.

So the model takes that final row...

and turns it into a score for **every token in the vocabulary**.

All **154,880** possible token entries get a score.

You can think of each score as:

**how plausible would this token be next, given everything we have processed so far?**

Most of them will be terrible choices.

Some will be plausible.

A few may be very plausible.

Then the decoding settings decide how that distribution becomes an actual choice.

Maybe the highest-scoring token is taken.

Maybe sampling adds some randomness.

We do not need that rabbit hole for this video.

The important part is:

**one next token gets selected.**

Suppose the model chooses something corresponding to:

**“bounced”**

So our prompt:

**“The dog dropped the ball, and it…”**

becomes:

**“The dog dropped the ball, and it bounced…”**

And after this entire journey — tokenizing, embeddings, context, routing, experts, 45 layers — what came out?

One token.

Just one.

Which creates a pretty obvious problem.

ChatGPT-style models do not answer you with one token.

So how do we get the **second** one?

---

# §10 — And then it does it again

The answer is almost annoyingly simple.

The model takes the token it just produced...

and adds it to the end.

So now the sequence is one token longer.

Then it predicts again.

But there is an important shortcut here.

The model does **not** throw away everything it learned about the earlier positions and recompute the whole prompt from scratch for every new token.

It keeps reusable state from the earlier work.

The exact cached state depends on the kind of layer — and GLM has a hybrid attention design — but the idea we need is simple:

**the old context is kept; the new position is the thing that has to travel through the stack.**

So our new token enters layer one.

It reads the earlier context through that stored state.

Its representation changes.

On a sparse layer, the router looks at that new representation and picks eight experts.

Next sparse layer...

new representation...

new routing decision.

Again.

And again.

Across all 42 sparse layers, that new token gets another:

**42 routing decisions**

and

**336 routed expert visits.**

Then the model reaches the top...

scores the vocabulary again...

chooses another token...

adds it to the end...

and repeats.

That is autoregressive generation.

One new token at a time.

And this is what you are watching when an AI answer appears piece by piece on your screen.

Now think back to our opening question.

We asked:

if only about **18 billion parameters are active**...

**which 18 billion?**

We finally have enough of the machine in our heads to answer that properly.

---

# §11 — So which 18 billion are active?

Now we can finally answer the question from the beginning.

When GLM says about **18 billion parameters are active per token**...

which 18 billion are they?

The answer is:

**not one fixed 18-billion-parameter chunk.**

Some parts of the model are used all the time.

Those are predictable.

But the routed expert part is different.

At each sparse layer, the router waits for the token’s current representation...

scores the **288 experts in that layer**...

and chooses **eight**.

Then the representation changes.

The next sparse layer makes its own choice.

And the next generated token can make different choices again.

So the model does not know one permanent list of “the useful 18 billion” that we can cut out and keep forever.

The routed part of that active set is being decided **along the way**.

Which means our original idea needs an upgrade.

Maybe we do not keep all the experts in fast memory.

Maybe we keep the full model somewhere cheaper — say system memory or storage — and whenever the router chooses eight experts...

we fetch those eight.

That sounds reasonable.

So let’s actually test the naive version of that plan.

One routed expert in GLM is roughly **25 megabytes** at FP8-sized weight storage.

Our token visits:

**8 experts × 42 sparse layers = 336 routed expert blocks.**

If none of those routed expert weights were already close by, and we fetched every selected block on demand...

we would move roughly:

**8.5 gigabytes of routed expert weights**

for one token.

Just moving that much data from a fast SSD at, say, around **5 gigabytes per second** would take roughly **1.7 seconds**.

And that is before pretending this is a complete performance model — it isn’t.

Different hardware, buses, caching, overlap and prefetching change the real result.

The point is simpler:

**the completely naive “fetch every selected expert from slow storage every time” plan is awful.**

But notice what I did **not** say.

I did not say offloading is impossible.

Because it isn’t.

People do run large MoE models with less fast memory than the full checkpoint needs.

So what are they doing differently?

---

# §12 — How people actually run these with less fast memory

The mistake in our last plan was not **offloading**.

It was pretending we had to fetch every selected expert from the slowest place, every single time.

Real systems can be smarter than that.

The simplest improvement is a **cache**.

Keep some expert weights in fast memory.

When the router asks for an expert that is already there...

that is a **hit**.

No long trip needed.

If the expert is not there...

that is a **miss**.

Then you fetch it from slower memory or storage, use it, and decide what should stay close.

And systems can get smarter still.

They can move experts between levels of memory.

They can overlap transfers with computation.

And some approaches try to **predict or prefetch** experts before the router fully needs them.

So yes:

**you can run a large MoE model without keeping every weight in the fastest memory.**

But now we have a trade.

Keep more experts close...

and you need more fast memory, but you fetch less.

Keep fewer experts close...

and the machine can fit into less fast memory, but you risk more misses and more waiting.

So where is the perfect setting?

This is where I do **not** want to fake certainty.

It depends on the hardware.

It depends on the workload.

And it depends on how predictable and repetitive the expert choices actually are.

For smaller MoE architectures, expert locality and caching have been measured and exploited.

But for the specific **288-expert, top-8** routing regime we are using here, I do not have a published GLM-specific locality measurement that lets me tell you:

“keep exactly this many experts and you’ll get exactly this hit rate.”

That number would be made up.

What we *can* say is that GLM has:

**288 routed experts × 42 sparse layers = 12,096 layer-specific expert slots.**

Only eight routed experts are selected in each sparse layer for a token...

but which eight matters for what has to be nearby next.

So the amount of fast memory you need is not determined by the **5.6% active** headline alone.

You can use less fast memory.

You can offload.

You can cache.

You can quantize.

You can shard the model across devices.

But every one of those choices changes the performance trade.

Which brings us back to the number that started this whole video.

If “18 billion active” was never a direct promise about memory...

**what did it actually buy us?**

---

# §13 — What “18 billion active” actually buys

Here is the payoff.

When you read:

**320 billion parameters**

and

**18 billion active**

those two numbers are answering **different questions**.

The **320 billion** tells you how many learned parameters exist in the model.

The **18 billion active** tells you roughly how much of that parameter set participates in the computation for a token.

And that is the trick Mixture of Experts is buying you.

The model can have a huge pool of learned expert weights...

without running every expert for every token.

For our `it`, the router only selected eight routed experts on each sparse layer.

Another token can use a different route.

Another sentence can use a different route.

So the model gets access to far more total learned capacity than it has to compute through on every single token.

**That is the win.**

But notice what it does **not** magically do.

It does not turn a 320-billion-parameter checkpoint into an 18-billion-parameter file.

The experts that are inactive for this token still exist.

Another token may need them later.

So if you want the whole model fully resident in fast memory, total stored weights and their precision still matter enormously.

And now our opening comparison stops being weird.

This model:

**gpt-oss-120b**

uses roughly **4.4%** of its parameters per token and ships at roughly **58 GiB** in its compact MXFP4 format.

This model:

**GLM-5.3-Flash**

uses roughly **5.6%** per token, but its shipped FP8 checkpoint is roughly **306 GiB** before runtime memory.

Similar active percentages.

Completely different total footprints.

That difference is not some mysterious failure of MoE.

They are different-sized models stored at different precisions.

And “percent active” was never the number that told us the checkpoint size.

So when you see a model advertised as:

**320B total — 18B active**

read it like this:

**320B total:** how much learned model exists.

**18B active:** roughly how much participates for each token.

And if someone turns that second number into:

“so you only need 18 billion parameters in memory”...

now you know exactly what question to ask:

**which 18 billion — and when does the model know?**

Because we followed one tiny `it` all the way through.

And the answer was:

**it decides as it goes.**

That is why two models can both say “about five percent active”...

while one fits on a single 80-gigabyte accelerator...

and keeping the other fully resident at its shipped precision takes eight.

Same headline percentage.

Different question.

Now the number actually means something.
