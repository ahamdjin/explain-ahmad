# Video Script — Part 01: Opening

Status: **aligned to the approved Section 01 storyboard and V2 build.**

Visual source: `../storyboard/section-01/FRAMES.md`

The wording can still be tightened for delivery, but the causal order should not change without also changing the storyboard.

---

## Frame 01 — Meet the model

So, GLM-5.3-Flash has **320 billion parameters**.

And for one token, only about **18 billion parameters are active**.

That sounds simple enough.

But what does **18 billion active** actually mean?

---

## Frame 02 — Make 320B physical

First, just think about the scale.

The model has an enormous amount of learned capacity.

For the visual, imagine that capacity as one giant library.

---

## Frame 03 — Feel the size

And 320 billion is a very, very big library.

Not literally one book for every parameter — this is just a way to make the size visible.

---

## Frame 04 — Only a small part is active

Now send one token through the model.

Let's use **"scared"**.

For this token, only a small fraction of the model's parameters participate in the forward pass.

That's the roughly **18 billion active** part.

The rest of the model still exists. It just isn't participating in this token's active path right now.

---

## Frame 05 — Where the rest goes

So then what is the rest doing?

GLM is a **Mixture-of-Experts model**.

Inside its sparse MoE layers, a lot of the feed-forward capacity is organized into many expert networks.

In one sparse layer, GLM has **288 routed experts**, plus a shared expert.

---

## Frame 06 — Meet the router

When the token reaches one of those MoE layers, a **router** looks at the token's current representation and scores the expert choices.

Then it decides which experts should be used for that token in that layer.

---

## Frame 07 — A small team works

GLM selects the **top 8 routed experts**.

And there is also **1 shared expert** participating.

So out of a very large pool of available expert capacity, only a small team is doing this particular piece of work.

And just to be clear: those eight experts are **not** the same thing as saying "18 billion parameters".

The 18B number is the active path across the whole model.

---

## Frame 08 — Different token, different team

A different token can select a different expert team.

Same model.

Different routing.

That's how the model can keep a huge amount of total capacity while only activating a much smaller path at a time.

---

## Frame 09 — The next question

Okay.

That part makes sense.

But then I had another question.

If only a small expert path is actually doing the computation...

why does running the model still mean dealing with **hundreds of gigabytes of weights?**

---

## Frame 10 — Sparse compute is not sparse storage

Because the rest of the model doesn't disappear.

The full weight pool still exists, and the runtime still needs access to whichever weights routing may choose.

Sparse compute gives us a smaller active path.

It does **not** automatically turn the whole checkpoint into a tiny model.

---

## Frame 11 — The obvious idea

But then the obvious idea is:

why not keep only the experts we need in fast memory?

Leave everything else in storage.

---

## Frame 12 — The router already chose them

And it gets even more tempting because we already have a router.

The router has just selected the experts for this token in this layer.

So why not load those selected experts, use them, and leave everything else asleep?

---

## Frame 13 — It looks like it should work

Visually, the idea is beautiful.

Experts stay in storage.

A token arrives.

The router picks the experts.

Only those experts come into fast working memory and do the job.

So...

**why doesn't this just work?**

---

## Frame 14 — Go inside

Could that turn a 320-billion-parameter model into something that is easy to run on a much smaller machine?

And if not...

**what exactly is stopping us?**

To answer that, staring at the final architecture isn't going to help.

We need to go inside the model and follow what actually happens to one token.
