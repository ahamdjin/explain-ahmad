# Section 01 — Opening as a hope/wall chain

Status: **PROPOSAL. Ahmad to correct.**

This restructures `01-opening-narration.md`. Same content, sequenced so every step
is a `BUT` / `SO` / `AND YET` rather than an `AND THEN`.

## The want

> I have a Mac with 32GB of RAM. Why can't it hold this model, when the model
> only ever uses 18 billion parameters at a time?

That is the spine. The honest framing is that it obviously does not fit, and the
section is about *understanding why*. Every beat is either evidence it can't fit,
or a reason to hope it could. The section ends with the hope at its strongest and
the wall unexplained.

## The protagonist

**The drawn narrator stays.** He carries the want, and his pose is the emotional
curve — a viewer with the sound off should be able to read hope and defeat off
him alone. He is not a commentator standing to one side; he is the one who wants
the thing, and he reacts to objects in the world because he is in the world with
them.

His arc across the section, which is the story:

| Beat | State |
| --- | --- |
| 1 | settled — this is my machine |
| 2 | small, looking up — dwarfed |
| 3 | active, pushing — trying something |
| 4 | deflated — it didn't work |
| 5 | head up, curious — wait |
| 6 | hopeful — that fits |
| 7 | confused, looking between two things |
| 8 | wondering |
| 9 | watching, quiet |
| **10** | **leaning in, most hopeful point in the section** |
| **11** | **biggest drop — deflated and baffled** |
| 12 | decisive, moving |

Beats 10 → 11 is the largest emotional swing. Everything else exists to set it up.

## On-screen text

Keep the small handwriting. The rule is **not** "no text" — it's that a note must
carry something the voiceover doesn't.

**Earns a place:** a number, a label naming an object, a `?` attached to the
thing that's confusing, a brace measuring something, a caveat the VO skips
(`expert = learned network block`).

**Does not:** the sentence Ahmad is currently speaking. The old beat 13 had a
note reading "So… why doesn't this just work?" while the VO said exactly that.
That's the only pattern being removed.

Prefer marks and numbers over sentences. Attach notes to objects, not to corners.

## Facecam — undecided

Designing as if there's no facecam, but keeping the bottom-left ~15% free of
anything load-bearing as cheap insurance. Nothing depends on the decision.

If you do add it later, the drawn protagonist **shrinks or shifts** rather than
being deleted — but two protagonists needs a deliberate call, so let's make it
once you've seen this working.

## The numbers — VERIFIED 2026-09-09

Checked against the model card, `config.json`, and the vLLM recipe. My earlier
figures were wrong: **the shipped checkpoint is native FP8, not bf16.**

| | figure | source |
| --- | --- | --- |
| Default checkpoint on disk | **~306 GiB** | vLLM recipe, "before runtime and KV-cache overhead" |
| BF16 variant | ~2x that (~612 GiB) | vLLM recipe |
| Total parameters | 321B (marketed 320B) | model card |
| Active per token | 18B | model card |
| Weight format | native FP8 (`e4m3`) | `config.json` quantization_config |

Recomputed against your 32GB Mac:

| | size | vs 32GB |
| --- | --- | --- |
| Full checkpoint, as shipped (FP8) | ~306 GiB | **~10x too big** |
| Full checkpoint, squeezed to 4-bit | ~153 GiB | **~5x too big** |
| ~18B active, at shipped FP8 | **~18 GB** | **fits, ~14GB spare** |
| ~18B active, at 4-bit | ~9 GB | fits easily |

**This makes the hope stronger, and simpler.** At the precision the weights
actually ship in, the active 18B is ~18GB and fits on your Mac with room to
spare — no quantization trick needed to make the case. So beat 6 gets to say
"that fits, right now, as-is."

Consequence for beat 3: quantization is no longer load-bearing for the *hope*.
It now does the *wall's* work — even squeezed to 4 bits the full thing is still
~5x too big. Keep it (you said you'll carry the explanation there), but its job
has changed.

Note `~18B active` is the path across the whole model, not eight experts in one
layer (`GLM_V7_ATTENTION_MOE_RESEARCH.md` M13). That is the crux of Section 08.

Also verified and previously unrecorded: 1,048,576 max context, native
multimodal, hybrid KDA + sparse MLA attention. The 1M context matters here —
the 306 GiB is weights *only*, before KV cache.

---

## The chain

### 1 · WANT

- **VO:** "So I've got a Mac. 32 gigs of RAM. And I wanted to understand something about GLM-5.3-Flash." `[new]`
- **Screen:** The machine alone.
- **Narrator:** beside it, hand resting on it. It's his.
- **Notes:** `32 GB` on the machine. Nothing else.
- **Weight:** quiet

### 2 · WALL — and not by a little

- **VO:** "It has 320 billion parameters. The download is about 306 gigabytes."
- **Screen:** The parameter mass arrives and dwarfs the machine. The 32GB box
  stays in frame for scale. First real image of the video.
- **Narrator:** small, looking up at it.
- **Notes:** `306 GiB` on the mass. `32 GB` still on the machine. Let the two
  numbers sit near each other and do the work.
- **Weight:** peak

### 3 · SO — the obvious first move

- **VO:** "Okay, so squeeze them. Store every parameter in four bits instead of sixteen." `[new]`
- **Screen:** The mass visibly compresses.
- **Narrator:** push pose — he's doing the squeezing.
- **Notes:** `4-bit` tag, `306 GiB → ~153 GiB`.
- **Weight:** normal
- **⚠ Your call:** introduces quantization at beat 3. Strengthens the wall a lot,
  but `GLM_V6_RESEARCH_NOTES.md` says plain language before technical terms. The
  chain still works without this beat.

### 4 · AND STILL — the wall holds

- **VO:** "Still 153. Still about five times more than I have. So that's just… not happening."
- **Screen:** Compressed mass still dwarfs the machine.
- **Narrator:** deflated.
- **Notes:** a brace spanning mass and machine: `5×`. Just the number.
- **Weight:** normal

### 5 · BUT — the hope opens

- **VO:** "But here's the thing that kept bugging me. For any one word, only about 18 billion of those parameters are actually active."
- **Screen:** The field appears; the contiguous active slice lights.
- **Narrator:** head up, curious.
- **Notes:** brace `~18B active`. Not the percentage yet.
- **Weight:** peak

### 6 · SO — the hope becomes concrete

- **VO:** "18 billion parameters, at the precision they actually ship in, is about 18 gigabytes. That fits. On the machine I already own, with room to spare."
- **Screen:** The active slice detaches and sits *inside* the machine, visibly,
  with space left. Best feeling so far.
- **Narrator:** hopeful.
- **Notes:** `~18 GB` on the slice, inside `32 GB`. A small tick. No sentence.
- **Weight:** peak

### 7 · AND YET — the contradiction

- **VO:** "So why does actually running this thing mean dealing with hundreds of gigabytes?"
- **Screen:** Pull back. The tiny fitting slice *and* the enormous mass still
  sitting there, both in one frame.
- **Narrator:** looking between the two, confused.
- **Notes:** one `?` on a leader line, physically between the slice and the mass.
  The mark, not the question.
- **Weight:** peak

### 8 · SO — go looking for the other 300B

- **VO:** "So what is all the rest of it for? Turns out it's organised as experts. Lots of separate little networks."
- **Screen:** The parameter cells lift and become the expert population — same
  objects, in place.
- **Narrator:** wondering.
- **Notes:** brace `288 experts`. Margin note `expert = learned network block`
  — earns its place because the VO doesn't say it. Neutral ids only, never skill names.
- **Weight:** peak

### 9 · AND — the router

- **VO:** "And there's a router. For each word it picks eight of them, plus one that's always on."
- **Screen:** Router appears; scoring sweep crosses the population; eight land
  lit plus the teal shared one.
- **Narrator:** watching, quiet.
- **Notes:** `router` label on it. `top 8` and `1 shared` tags on the lit ones.
- **Weight:** normal — deliberate quiet before the peak. If everything is
  dramatic, nothing is.

### 10 · SO — HOPE PEAK, and the audience commits

- **VO:** "So hang on. The router already knows which experts it needs. Why can't I just load those eight, use them, and leave everything else asleep?"
- **VO, to camera:** "Think about it for a second. Would that work?" `[new]`
- **Screen:** The eight lift out and move toward the machine. They fit.
  Everything else greys to storage. The frame *argues yes*.
- **Narrator:** leaning in — most hopeful point in the section.
- **Notes:** `~18 GB / 32 GB` on the machine. The numbers make the case.
- **Presenter action:** pause here, then click.
- **Weight:** peak

### 11 · BUT — the wall, unexplained

- **VO:** "And it doesn't work. It really doesn't. And the reason took me a while to actually understand."
- **Screen:** The load path jams. The eight cannot settle. Muted red, once — the
  only red in the section.
- **Narrator:** the big drop. Deflated and baffled.
- **Notes:** one red mark on the jam. No words.
- **Not on screen:** any part of the answer. This beat only creates the headache.
- **Weight:** peak

### 12 · THEREFORE — the door

- **VO:** "And staring at the finished architecture doesn't tell you why. So let's follow one word all the way through it."
- **Screen:** Architecture sheet pushed aside; the word moves into the archway.
- **Narrator:** decisive, pushing the sheet, moving toward the arch.
- **Notes:** `inside the model` over the arch.
- **Weight:** normal

---

## What changed from the current script

- **12 beats, not 14.** The model spec card and the "different words, different
  experts" comparison come out. The card is a table with no tension now that
  there's a real stake; the comparison is a *mechanism* lesson that belongs in
  Section 07 where the viewer wants it.
- **The machine is present from beat 1 and never leaves.** It was previously a
  grey box that appeared once, near the end.
- **Bytes, not just parameter counts.** "320 billion" is abstract. "640 gigabytes
  against my 32" is a wall you can feel.
- **The narrator now has an arc** instead of a fixed wondering pose. His state is
  the hope/wall curve.
- **Notes are labels, numbers and marks** — not transcripts of the VO.

## Open questions for you

1. ~~Verify the byte numbers.~~ Done 2026-09-09 — see above. My bf16 figure was wrong; shipped checkpoint is FP8, ~306 GiB.
2. ~~Keep or cut beat 3?~~ Keeping it; you carry the explanation there. Its job changed from hope to wall.
3. **Does the spec card really go?** You kept it last time. With the Mac as beat
   1 it has no job, but it's your opening and your call.
4. ~~Beat 11 needs Section 08 to exist.~~ Drafted — see `08-why-it-cannot-fit.md`.
5. **Does beat 10's "would that work?" pause suit your delivery?**
