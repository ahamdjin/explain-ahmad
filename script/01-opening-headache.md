# Part 01 — The 320B → 18B Headache

Status: first production section only. Do not answer the mystery here.

## Teaching job

Make the viewer feel one contradiction strongly enough that they want the rest of the video:

> If only ~18B parameters are active for one token, why does a 320B model still come with hundreds of gigabytes of weights — especially when a router already chooses the experts?

This section follows the project rules:

- SHOW before TELL.
- Purpose before terminology.
- One new connection at a time.
- BUT → THEREFORE, not a list of architecture facts.
- Do not explain the final reason yet.
- Do not dump the full model architecture in the opening.

---

## Tell — current spoken draft

This is the narration draft supplied by Ahmad. Treat it as the current voice track, not on-screen copy.

> So, GLM-5.3-Flash has **320 billion parameters** and only 18 billion parameters are active.
>
> which in simple words means that.
>
> For any one token, only about **18 billion parameters are active**.
>
> Which basically means the model owns 320 billion parameters... but only uses a small fraction of them to process that token.
>
> Okay.
>
> So why have the other 300 billion?
>
> Well, this is a Mixture-of-Experts model. It has lots of different expert networks, and for each token, only a few of them are selected.
>
> That makes sense.
>
> **But then I had another question.**
>
> If only a few experts are actually being used...
>
> why does running the model still mean dealing with **hundreds of gigabytes of weights?**
>
> Why can't I keep just the small part I need?
>
> And it gets even stranger.
>
> Because the model already has something called a **router** whose job is to decide which experts a token should go to.
>
> So...
>
> if the router already knows which experts it needs...
>
> **why can't we just load those experts, use them, and leave everything else asleep?**
>
> Could we turn a 320-billion-parameter model into something that fits comfortably on a much smaller machine?
>
> And if not...
>
> **what exactly is stopping us?**
>
> To answer that, staring at the final architecture isn't going to help.
>
> So lets see through what exactly is happening in there inside the model

---

## Show — production beat map

The screen should not display the narration as subtitles. The visual should make each sentence easier to understand before it is spoken.

### Beat 1 — Make 320B feel big

**SHOW FIRST**

- Empty paper canvas.
- GLM-5.3-Flash appears as one physical model object, not a dashboard card.
- A field of parameter marks grows behind it until it feels absurdly large.
- Hero label: `320B TOTAL PARAMETERS`.
- No expert count, layer count, tokenizer count, context length, or architecture list.

**TELL OVER IT**

“GLM-5.3-Flash has 320 billion parameters…”

**Viewer should understand**

This thing is huge.

---

### Beat 2 — Reveal the tiny active slice

**SHOW FIRST**

- One token enters the model.
- Only a thin slice of the parameter field lights up.
- Everything else remains visible but quiet.
- Hero label appears beside the lit slice: `~18B ACTIVE / TOKEN`.
- A small ratio note may appear: `≈ 5.6% of 320B`.

**TELL OVER IT**

“…and only 18 billion parameters are active. For any one token…”

**Viewer should understand**

“Active” means the token only travels through a small compute path.

---

### Beat 3 — Let the contradiction sit

**SHOW FIRST**

- The lit path keeps moving.
- The huge inactive field stays physically present.
- The screen visually separates `OWNED BY MODEL` from `USED BY THIS TOKEN`.

**TELL OVER IT**

“The model owns 320 billion… but only uses a small fraction…”

**Viewer should understand**

Total capacity and active compute are different things.

---

### Beat 4 — Ask about the rest

**SHOW FIRST**

- The active slice shrinks slightly to one side.
- The unused mass becomes the dominant object again.
- A pencil bracket points to the quiet majority.
- Only one short question appears: `Then what is all this for?`

**TELL OVER IT**

“So why have the other 300 billion?”

Do not answer yet in text.

---

### Beat 5 — Turn the mass into experts

**SHOW FIRST**

- The anonymous parameter field reorganizes into a wall of many expert blocks.
- The transformation should preserve continuity: same mass, now structured.
- Label the idea only after the wall exists: `Mixture of Experts`.
- Show `288 routed experts / sparse MoE layer` quietly as a factual annotation, not a headline.

**TELL OVER IT**

“This is a Mixture-of-Experts model. It has lots of different expert networks…”

**Viewer should understand**

The extra capacity is stored in many possible expert blocks.

---

### Beat 6 — Select only a few

**SHOW FIRST**

- The same token arrives at the expert wall.
- Exactly 8 routed experts glow.
- One shared expert stays on.
- Everything else dims but remains visible.
- Keep the active experts physically separated enough that the selection is obvious.

**TELL OVER IT**

“…and for each token, only a few of them are selected. That makes sense.”

**Viewer should understand**

MoE creates sparse compute by choosing a small expert path.

---

### Beat 7 — Create the second headache: memory

**SHOW FIRST**

- Do not cut to a new slide.
- Camera pulls back from the selected expert wall.
- Behind it, the whole wall is shown as stored weight shelves / memory slabs.
- The selected experts still glow, but the storage mass remains enormous.
- Main visual contrast: `SMALL ACTIVE PATH` vs `HUGE WEIGHT SET`.
- Supporting text: `hundreds of GB of weights`.

**TELL OVER IT**

“But then I had another question. If only a few experts are actually being used… why does running the model still mean dealing with hundreds of gigabytes of weights?”

**Viewer should understand**

Sparse compute did not magically make the checkpoint tiny.

---

### Beat 8 — Make the tempting solution visible

**SHOW FIRST**

- A small-memory machine appears beside the giant weight shelves.
- Selected experts are copied into a tiny temporary tray.
- The rest of the shelves ghost out.
- Add a hand-drawn thought bubble: `Just keep these?`

**TELL OVER IT**

“Why can't I keep just the small part I need?”

Do not show why this fails.

---

### Beat 9 — Reveal the router

**SHOW FIRST**

- Reset the experts to the full wall.
- Place one compact router object directly in front of them.
- The token enters the router.
- Router emits scores / selection marks toward the same 8 experts.
- Name it only after the behavior is visible: `ROUTER`.

**TELL OVER IT**

“And it gets even stranger. Because the model already has something called a router whose job is to decide which experts a token should go to.”

**Viewer should understand**

There is already a selection mechanism.

---

### Beat 10 — Show the obvious hack

**SHOW FIRST**

- Router chooses the 8 experts.
- A hypothetical switch appears between storage and experts.
- Only the selected experts get a `LOAD` pulse.
- All other expert blocks visibly sleep.
- This is presented as the viewer’s proposed design, not as truth about real inference.

**TELL OVER IT**

“If the router already knows which experts it needs… why can't we just load those experts, use them, and leave everything else asleep?”

**Viewer should understand**

The proposed optimization feels completely reasonable.

---

### Beat 11 — Shrink the machine

**SHOW FIRST**

- Giant server / memory footprint morphs toward a much smaller machine.
- The selected expert tray remains the same size.
- A large `?` prevents the morph from completing.

**TELL OVER IT**

“Could we turn a 320-billion-parameter model into something that fits comfortably on a much smaller machine?”

---

### Beat 12 — Freeze on the mystery

**SHOW FIRST**

- Keep four actors visible at once: token → router → selected experts → giant weight store.
- Draw a single red/pencil question through the connection between router and storage.
- Text: `WHAT STOPS THIS?`
- No answer, no latency explanation, no bandwidth explanation, no per-layer explanation yet.

**TELL OVER IT**

“And if not… what exactly is stopping us?”

This is the strongest hold in the opening.

---

### Beat 13 — Reject the architecture dump

**SHOW FIRST**

- A dense architecture diagram starts to appear for half a second.
- It is immediately pushed / folded out of frame.
- The token remains.

**TELL OVER IT**

“To answer that, staring at the final architecture isn't going to help.”

**Viewer should understand**

We are going to learn causally, not memorize a diagram.

---

### Beat 14 — Enter the model

**SHOW FIRST**

- Everything simplifies to one token.
- The camera follows that token toward the model entrance.
- The opening expert/memory world recedes behind it.
- End on a clean handoff into the existing prompt/token journey.

**TELL OVER IT**

“So lets see through what exactly is happening in there inside the model.”

The next section starts with the familiar prompt and follows one token.

---

## Truth guardrails for this opening

1. `320B total / 18B active` is stated by the GLM-5.3-Flash model material.
2. The model config specifies 288 routed experts, top-8 per token, one shared expert, and 45 hidden layers.
3. Do **not** say “the router searches through all 320B parameters.” It does not.
4. Do **not** say “all 320B must always be in GPU VRAM.” Inference systems can shard/offload weights. The real issue is that the full checkpoint is huge and efficient serving needs rapid access to whichever experts routing selects.
5. `18B active` is not simply “8/288 of 320B.” Shared/dense/non-expert components also contribute. The 320B-vs-18B parameter-field visual is conceptual; the expert wall is a separate mechanism view.
6. If an exact storage number is shown, label the precision. A published FP8 checkpoint figure is about 328 GB; BF16 and quantized variants differ substantially.

## Sources checked for the production facts

- Official model card: https://huggingface.co/zai-org/GLM-5.3-Flash
- Official config: https://huggingface.co/zai-org/GLM-5.3-Flash/blob/main/config.json
- Transformers model documentation: https://huggingface.co/docs/transformers/main/en/model_doc/glm5_next
- FP8 checkpoint-size reference: https://huggingface.co/OpenMOSE/GLM-5.3-Flash-REAP-250B-A18B
