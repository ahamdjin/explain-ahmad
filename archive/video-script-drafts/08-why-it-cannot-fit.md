# Section 08 — Why it can't fit in 32GB

Status: **PROPOSAL. Ahmad to correct.**

This is the payoff for `01-opening-hope-wall.md` beat 11. The opening ends with
the viewer convinced that loading only the selected experts obviously works.
This section explains why it doesn't.

`SECTION_MAP.md` flagged this section as missing. It has never been written, and
everything in the opening is a promise against it.

## The one-line answer

> Sparsity buys you **compute**, not **footprint**.
>
> The 18B is not a fixed 18B. It is re-chosen 42 times per token, and differently
> for every token — so there is no small resident subset to keep.

## The causal chain

Each step follows from the one before. This is the structure the visuals should
follow.

**1. The router decides from the token's current hidden representation.**
Not from the token, not from its id — from the vector as it exists at that layer,
after attention has already rewritten it (`GLM_V7_ATTENTION_MOE_RESEARCH.md` M4).

**2. That representation changes at every layer.**
Which is the whole point of a deep model. So the routing input is different at
every layer.

**3. Therefore routing happens again, independently, at every sparse layer.**
GLM-5.3-Flash has 45 layers; the first 3 are dense, so **42 of them route**
(`config.json`: `num_hidden_layers: 45`, `first_k_dense_replace: 3`).

**4. So "eight experts" was never eight.**
It is 8 routed experts × 42 sparse layers = **336 expert visits for one token**.
The model contains 42 × 288 = **12,096 routed experts**. One token touches about
**2.8%** of them.

**5. And the next token touches a different 2.8%.**
Routing is per token (M11). Nothing carries over.

**6. So the working set is not 18GB — it's most of the model.**
Under a uniform-spread assumption, a ~100-token prompt touches roughly **94% of
all 12,096 experts.** A short prompt already needs essentially everything.

> ⚠ That 94% is illustrative arithmetic under uniform random routing, not a
> measurement. Real routing is neither uniform nor fully specialised. It's an
> honest way to show *spread*, and should be labelled illustrative on screen —
> same rule the project already applies to routing weights.

**7. Keeping experts on SSD and streaming them makes transfer the bottleneck.**
If the resident set can only be ~18GB, then every layer of every token needs
different expert weights pulled in. You stop being limited by how fast the Mac
can compute and start being limited by how fast it can move weights. That is
orders of magnitude worse, and it gets worse per token, not better.

**8. The honest caveat, which must be said.**
It is **not** true that all 320B parameters must sit in one GPU's VRAM. Real
serving systems shard across many GPUs, cache hot experts, quantize, and offload.
The truthful claim is narrower: efficient serving needs **fast access to whichever
experts routing picks**, and you cannot know in advance which those are.

**9. And weights aren't the whole memory bill.**
The ~306 GiB is weights *only* — the vLLM recipe says "before runtime and
KV-cache overhead." With a 1,048,576-token context window, the KV cache is its
own substantial budget on top.

## Proposed beats

Reuses the exact objects from the opening — same machine, same expert
population, same router. Nothing new is introduced except the layer stack.

### 1 · CALLBACK — restate the hope at full strength

- **VO:** "So. Load the eight experts we need, leave the rest asleep. 18 gigs. It fits."
- **Screen:** Rebuild the exact beat-10 frame. Eight lit, moving into the 32GB machine.
- **Narrator:** hopeful again — briefly.
- **Weight:** normal

### 2 · BUT — the router needs something it doesn't have yet

- **VO:** "Except the router doesn't pick from the word. It picks from what the word has *become* by the time it reaches that layer."
- **Screen:** The word's vector visibly changes as it passes attention, and *then*
  reaches the router. Cause before effect.
- **Notes:** `router reads the current representation`
- **Weight:** peak

### 3 · SO — you can't know the answer up front

- **VO:** "Which means you can't know which experts you need until you're already there."
- **Screen:** The router's choice resolves only at the moment the vector arrives.
- **Narrator:** first doubt.
- **Weight:** normal

### 4 · AND — it happens again. And again.

- **VO:** "And this isn't once. GLM has 45 layers. Three are dense — the other 42 each make their own routing decision."
- **Screen:** The MoE room shrinks into one floor of a 42-floor stack. The token
  rises; a *different* eight light on each floor.
- **Notes:** `42 sparse layers` · `8 routed each`
- **Weight:** peak

### 5 · THEREFORE — the number the whole video has been hiding

- **VO:** "So it was never eight experts. It's eight, forty-two times. 336 expert visits — for one single word."
- **Screen:** Count up to 336 against the full pool of 12,096.
- **Notes:** `336 of 12,096` · `~2.8%`
- **Weight:** peak — this is the reveal

### 6 · AND YET — and that's just one word

- **VO:** "That's one word. The next word picks its own 336. And the one after that."
- **Screen:** Token after token sweeps the population. The lit set churns.
- **Weight:** peak

### 7 · WALL — the working set is the whole model

- **VO:** "Run a short prompt — a hundred words — and you've touched almost every expert in the model."
- **Screen:** The union accumulates until nearly the whole 12,096 wall is lit.
  The 32GB machine sits underneath it, unchanged.
- **Notes:** `~94% touched` + `illustrative`
- **Narrator:** the answer landing. Not defeated — understanding.
- **Weight:** peak — highest point of the section

### 8 · SO — this is what actually breaks

- **VO:** "So if only 18 gigs can live in memory, every layer of every word has to drag new weights in. The Mac isn't slow at the maths. It's slow at fetching."
- **Screen:** The narrow pipe between storage and the machine, saturated. The
  compute side sits idle waiting.
- **Notes:** `transfer-bound, not compute-bound`
- **Weight:** peak

### 9 · BUT — the honest correction

- **VO:** "And to be fair — it's not that all 320 billion have to be in memory at once. Real setups spread this across many GPUs, cache the experts that come up often, quantize harder. It's just that whatever the router picks, it needs *fast*. And you don't get to know that in advance."
- **Screen:** Brief, calm diagram: shard / cache / offload. Restrained, no drama.
- **Weight:** quiet — deliberately. The correction shouldn't feel like a twist.

### 10 · PAYOFF — close the loop

- **VO:** "So that's the answer. Making a model compute less doesn't make it *smaller*. 320 billion is what it knows. 18 billion is what it uses per word. Those were never the same kind of number."
- **Screen:** Fold back to the opening frame: the machine, and the mass. Both
  labelled properly for the first time — `320B = stored` / `~18B = used per token`.
- **Narrator:** settled. Same pose as beat 1 of the opening.
- **Weight:** peak

## Integrity rules for this section

- Never say all 320B must be in VRAM. Beat 9 exists to prevent that reading.
- Label the 94% and the 2.8% as illustrative.
- Never imply 18B = 8 experts in one layer. Beat 5 exists to kill that idea.
- No skill names on experts, here or anywhere.
- Don't claim a specific GB/s figure for the Mac unless you measure it.

## Open questions for you

1. Beat 7's 94% is the emotional peak of the whole video. Comfortable shipping an
   illustrative figure in that position, or should we soften it to "most"?
2. Beat 9 is the honest caveat and it deflates the drama on purpose. Keep it
   where it is, or move it after the payoff as an endnote?
3. Do you want to say the 336 number out loud, or let the visual carry it?
