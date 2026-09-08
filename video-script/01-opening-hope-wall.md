# Section 01 — Opening as a hope/wall chain

Status: **PROPOSAL. Ahmad to correct.**

This restructures `01-opening-narration.md`. Same content, sequenced so every step
is a `BUT` / `SO` / `AND YET` rather than an `AND THEN`.

Supersedes nothing until approved. The old file stays as the source of voice.

## Format notes

- **VO** is what Ahmad says. Lines marked `[new]` are mine; everything else is
  lifted or lightly adapted from the existing script.
- **Screen** is what the paper world does.
- **Not on screen** matters as much: if the VO says it, the screen must not
  write it. Facecam plus voice carries the questions now.
- Facecam: **bottom-left, small circle, always on.** Nothing important goes in
  the bottom-left ~18% of the frame at any beat.

## The want

> I have a Mac with 32GB of RAM. Why can't it hold this model, when the model
> only ever uses 18 billion parameters at a time?

That is the spine. Not "I want to run it" — the honest framing is that it
obviously does not fit, and the whole section is about *understanding why*.

Every beat below is either evidence that it can't fit, or a reason to hope it
could. The section ends with the hope at its strongest and the wall unexplained.

## The numbers — DERIVED, NEEDS YOUR SIGN-OFF

`research/glm/` gives parameter counts but no checkpoint size in bytes. These are
my arithmetic, not published figures. **Verify before recording.**

| | at bf16 (2 bytes) | at 4-bit | vs 32GB Mac |
| --- | --- | --- | --- |
| 320B total | ~640 GB | ~160 GB | 5–20x too big |
| ~18B active | ~36 GB | ~9 GB | **fits at 4-bit** |

Two things make this a good spine:

1. Even hard-quantized, the **total** is still ~5x the machine. The wall is real.
2. The **active slice** genuinely would fit. So the hope is not a strawman — it
   is quantitatively reasonable, which is exactly why its failure is interesting.

Note `~18B active` is the active path across the whole model, not eight experts
in one layer (`GLM_V7_ATTENTION_MOE_RESEARCH.md` M13). That distinction is the
deeper reason the obvious fix fails, and it belongs in Section 08 — but it can be
quietly planted here.

---

## The chain

### 1 · WANT

- **VO:** "So I've got a Mac. 32 gigs of RAM. And I wanted to understand something about GLM-5.3-Flash." `[new]`
- **Screen:** The machine alone. `32 GB` on it. Nothing else in the frame.
- **Not on screen:** No model card, no parameter counts, no jargon. One object.
- **Weight:** quiet

### 2 · WALL — it doesn't fit, and not by a little

- **VO:** "It has 320 billion parameters. That's something like 640 gigabytes of weights."
- **Screen:** The parameter mass arrives beside the machine and dwarfs it. The
  32GB box stays on screen, small, for scale. This is the first real image of the video.
- **Not on screen:** The word "Mixture of Experts". Not yet.
- **Weight:** peak

### 3 · SO — the obvious first move

- **VO:** "Okay, so squeeze them. Store every parameter in four bits instead of sixteen." `[new]`
- **Screen:** The mass visibly compresses. `640 GB → 160 GB`.
- **Weight:** normal
- **⚠ Your call:** this introduces quantization early. It strengthens the wall a
  lot, but `GLM_V6_RESEARCH_NOTES.md` says give plain language before technical
  terms. Cut this beat if it feels too early — the chain still works without it.

### 4 · AND STILL — the wall holds

- **VO:** "Still 160. Still five times more than I have. So that's just... not happening."
- **Screen:** Compressed mass still dwarfs the machine.
- **Weight:** normal

### 5 · BUT — the hope opens

- **VO:** "But here's the thing that kept bugging me. For any one word, only about 18 billion of those parameters are actually active."
- **Screen:** The field appears; the contiguous active slice lights. The machine
  stays in frame.
- **Not on screen:** "~18B ACTIVE (5.6%)" as handwriting — you're saying it.
  A brace with the number alone is fine.
- **Weight:** peak

### 6 · SO — the hope becomes concrete

- **VO:** "18 billion. Squeezed down, that's about 9 gigabytes. That fits. That fits with room to spare."
- **Screen:** The active slice detaches and sits *inside* the 32GB machine. It
  fits, visibly, with space left over. Best feeling in the section so far.
- **Weight:** peak

### 7 · AND YET — the contradiction

- **VO:** "So why does actually running this thing mean dealing with hundreds of gigabytes?"
- **Screen:** Pull back. The tiny fitting slice, and the enormous mass still
  sitting there behind it, unexplained. Both in one frame.
- **Weight:** peak

### 8 · SO — go looking for the other 300B

- **VO:** "So what is all the rest of it for? Turns out it's organised as experts. Lots of separate little networks."
- **Screen:** The parameter cells lift and become the expert population — same
  objects, in place.
- **Not on screen:** Skill names. Neutral ids only.
- **Weight:** peak

### 9 · AND — the router (lowest-tension beat, deliberately)

- **VO:** "And there's a router. For each word it picks eight of them, plus one that's always on."
- **Screen:** Router appears; a scoring sweep crosses the population; eight land
  lit plus the teal shared one.
- **Weight:** normal — quiet setup before the peak. If everything is dramatic, nothing is.

### 10 · SO — HOPE PEAK, and the audience commits

- **VO:** "So hang on. The router already knows which experts it needs. Why can't I just load those eight, use them, and leave everything else asleep?"
- **VO, to camera:** "Think about it for a second. Would that work?" `[new]`
- **Screen:** The eight lift out of the population and move toward the machine.
  They fit. Everything else greys to storage. The frame *says yes*.
- **Presenter action:** you pause here on camera. Then you click.
- **Weight:** peak — highest point in the section

### 11 · BUT — the wall, unexplained

- **VO:** "And it doesn't work. It really doesn't. And the reason took me a while to actually understand."
- **Screen:** The load path jams. The eight cannot settle. Muted red, once — the
  only red in the section.
- **Not on screen:** any part of the answer. This beat only creates the headache.
- **Weight:** peak

### 12 · THEREFORE — the door

- **VO:** "And staring at the finished architecture doesn't tell you why. So let's follow one word all the way through it."
- **Screen:** Architecture sheet pushed aside; the word moves into the archway.
- **Weight:** normal

---

## What changed from the current script

- **12 beats, not 14.** The model info card and the "different words, different
  experts" comparison come out of the opening. The card is a spec table with no
  tension; the routing comparison is a *mechanism* lesson that belongs in
  Section 07, where the viewer has a reason to want it.
- **The machine is present from beat 1 and never leaves.** It was previously a
  sad grey box that appeared once, at beat 13.
- **Bytes, not just parameter counts.** "320 billion" is abstract. "640
  gigabytes versus my 32" is a wall you can feel.
- **The hope is now quantitative and correct.** 9GB really does fit in 32GB. The
  viewer should finish beat 10 convinced the optimisation obviously works.
- **The questions moved from the screen into your mouth.** With facecam and VO,
  the handwriting was duplicating you.

## Open questions for you

1. **Verify the byte numbers.** They're my arithmetic. If GLM-5.3-Flash's real
   checkpoint size is published, use that instead.
2. **Keep or cut beat 3** (quantization)? Flagged above.
3. **Is "my Mac, 32GB" the framing you want on camera**, or a generic machine?
   Personal is stronger, but it dates the video and ties it to your hardware.
4. **Beat 11 needs Section 08 to exist.** This chain promises an answer harder
   than the old version did, because the hope is now stronger. Whatever you
   write for Section 08, beat 11's wall has to be the *same object* that
   Section 08 later explains.
5. **Does beat 10's "would that work?" pause suit your delivery**, or would you
   rather keep momentum and not ask the audience directly?
