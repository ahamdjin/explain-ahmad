# Teaching Reference Library

A living collection of references for designing explanations that are clear, memorable, visual, and easy to follow.

This file is not just a link dump. As we add sources, we should eventually extract:

- what the source teaches about explaining difficult ideas
- useful storytelling or interaction patterns
- visual techniques worth studying
- examples of what to avoid
- where the lesson applies in our explainer engine or a real video

The goal is to turn strong references into practical rules for building better explanations.

---

## 01 — Nicky Case — Stanford Talk Transcript

**Source:** https://ncase.me/StanfordTalk/transcript.html

**Format:** HTML transcript

**Author:** Nicky Case

**Status:** Added as a primary teaching/explainer reference. Detailed principles and examples can be distilled from it later.

**Why it is in this library:**

Nicky Case is one of the main references for the kind of explorable, visual, interaction-first teaching style we want to study. This transcript should be treated as source material for understanding how explanation, interaction, narrative, and learner attention can work together.

---

## 02 — Teaching Complex Systems — One New Connection at a Time

**Source:** User-provided transcript / notes

**Format:** Talk transcript

**Author:** Nicky Case

**Status:** Added and core principle extracted.

**Why it is in this library:**

This is directly relevant to how we should structure technical explainers. The central argument is that a learner should not be asked to absorb an entire interconnected system at once. Instead, we should build a rich mental model by introducing one new connection at a time, connecting each new concept to something the learner already understands.

### Core principle

> Build a complex network in long-term memory through **one new connection at a time** in short-term memory.

For our work, this means a beat should usually introduce:

- one idea the learner already knows
- one new idea
- the connection between them
- as little unrelated distraction as possible

### Useful teaching lessons

- Do not front-load the whole system.
- Do not dump walls of text before the learner has a mental structure for them.
- Understanding is about building **connections**, not merely exposing someone to facts.
- Short-term memory is a bottleneck, so complex systems must be segmented.
- New concepts become easier when they connect to an existing chunk already stored in long-term memory.
- Teach the interaction between concepts progressively rather than introducing many isolated components simultaneously.
- Reuse previously learned objects when introducing the next mechanic.
- A rich final mental model can emerge from a sequence of very simple learning steps.

### Portal example from the talk

The talk uses Portal as the model:

1. Introduce the player.
2. Introduce portals → the player can go through portals.
3. Introduce cubes → cubes can be picked up and can go through portals.
4. Introduce energy pellets → they can kill the player, travel through portals, and interact with cubes.
5. Introduce turrets → they connect to mechanics the player already understands.

The important pattern is not the specific mechanics. It is:

**OLD IDEA → NEW IDEA → ONE NEW RELATIONSHIP**

Then repeat.

### Where we should use this in our explainer system

This should become a hard storyboard rule for technical scrollytelling.

For example, the GLM journey should not teach:

`embedding + Q + K + V + attention scores + weights + values + context`

in one reveal.

Instead:

`embedding → Query`

then:

`Query → Key comparison`

then:

`comparison → score`

then:

`score → weight`

then:

`weight → Value contribution`

then:

`Value contributions → mixed context`

The exact same principle applies to MoE:

`normal dense MLP → many possible MLPs → router → scores → top-8 → shared expert → expert outputs → weighted merge → repeat next layer`

Each beat earns the next beat by using something the learner already understands.

### Transcript supplied for reference

**00:00**

So you think your game is hot stuff. You've got a dozen mechanics, all interconnected in unique ways, to give rise to emergent gameplay. Now all there's left to do is to actually teach it to a player. So you could do something like this. It looks silly, but we designers do this sometimes. We front-load tutorials, we dump walls of text, we ask our players to swallow a whole system in one go. So how do you better help people understand complex systems? For that, let's look to cognitive psychology.

**00:31**

This is a subfield of psychology full of lab experiments and fMRIs trying to understand how we understand, how we think, remember, learn. And there's just two big lessons that you need to know. Number one, our long-term memory is awesome. It's why you never forget how to ride a bike, why you know over 10,000 words in your native language, why you know how to design or code or make art, music, stories.

**00:55**

It's also why players can understand systems in games. When your player learns your game, what they're doing is building connections in their head, literally with neurons. And that's great. However, the problem is our second big lesson from cognitive psychology. Number two, our short-term memory kind of sucks ass. You know how when you want something, so you go to a different room, and then you forget why you went to that room? That's short-term memory for you. And this is the same reason why we shouldn't front-load tutorials in games, because of our limit.

**01:22**

So what is that limit? Well, we know. Four plus or minus one chunks. We used to think it was seven plus or minus two chunks, but then scientists realized we suck even more than that. Anyway, to demonstrate this limit, here, try to memorize this following list. XCN, NFO, XMSN, BCX. Yeah, pretty hard, right? You can obviously tell this would be hard to memorize because there's no connection between any of the letters, which means you have to remember 13 disconnected chunks.

**01:52**

And that's way more than the four plus or minus one limit of our short-term memory. But now, try memorizing this following list. X, CNN, Fox, MSNBC, X. If you're American, this list is much easier because you can clearly see the connection between the letters. And so, instead of 13 chunks, you only need 3 chunks. X, cable news, X. Then, here's the trick. Your brain connects the cable news chunk in your short-term memory to the 3 names stored in your long-term memory. And that's why the second list is so much easier to remember than the first, even though... Can you see it?

**02:27**

They're the exact same letters, in the exact same order!

**02:34**

That's the sound of your mind being blown! Anyway, this demonstration proves it. Understanding is all about making connections. And that's how we can do complex things like code, design, or make art.

**02:44**

Because although we can only hold four chunks in short-term memory, those chunks can be connected to far, far bigger networks in long-term memory. So whenever we help a player learn a complex system, it's kind of like we're building a ship inside a bottle. We want a complexly connected thing on the inside, but the bottleneck only lets through four chunks at a time. So the trick? Give the player one and only one new connection at a time. This takes four chunks. One old idea, one new idea, the connection, and some distractions.

**03:12**

Here is how the famously complex game Portal teaches its mechanics through one connection at a time. Introduce the player. Introduce portals. You can go through portals. Introduce cubes. They can be picked up and go through portals. Introduce energy pellets. They can kill you, go through portals, and be deflected by cubes. Introduce turrets. They can kill you, go through portals, get knocked over by cubes or by energy pellets.

**03:36**

Hail Satan. Build a rich network in long-term memory through one connection at a time in short-term memory. This strategy works for any kind of game where you need your player to understand a rich complex system. So, in summary, we want a complex network in a player's long-term memory, but they can only fit four plus or minus one chunks in the short-term memory. Therefore, each section of your game should teach one and only one new connection at a time. Do this and your players will be grateful that you're not doing this.

**04:06**

Don't frontload tutorials, don't give walls of text, don't overwhelm our mortal human minds. Use cognitive psychology wisely and you can help your player consume a complex system the same way you'd consume an elephant. One bite at a time. Thank you.

---

## Add future references using this template

### NN — Title

**Source:** <URL or repository path>

**Format:** Article / HTML / PDF / Video / Code / Interactive / Book / Notes

**Author:** <author>

**Status:** Added / Studied / Principles extracted

**Why it is in this library:**

<What this source may help us learn.>

**Useful principles:**

- <principle>
- <principle>

**Patterns or examples worth studying:**

- <example>

**Where we can use it:**

- <our explainer / visual system / interaction pattern / story structure>

---

## Working rule

Do not copy a reference's surface style blindly.

Study **why the explanation works**, then adapt the underlying teaching principle to our own visual language and subject matter.
