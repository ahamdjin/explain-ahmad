# Review — Video 2 (the GPT cut)

Reviewed at merge `dd63135`. Sources: `video-script/video-2-gpt/GPT.md` (315 lines),
`storyboard/video-2-gpt/GPT.md` (1,325 lines), `src/videos/glm-320b/gpt-watch/`.

Method: read both documents against
`research/glm/GLM_V7_ATTENTION_MOE_RESEARCH.md` and `art-direction/PALETTE.md`,
then walked all 120 beats in a browser at 1920×1080 and read the frames.

## It runs

All 120 beats advance, every world mounts, **zero console errors, zero page
errors, zero failed requests**. `/video-2` passes `npm run smoke`. Nothing here
is a crash; everything below is content or design.

## What it gets right

The causal spine at the end of `storyboard/video-2-gpt/GPT.md` is sound, and three things
in it are better stated than anywhere in Video 1:

- **The router reads the representation, not the token ID.** Said out loud, in
  bold, at §06. Video 1 shows this but never says it this plainly.
- **QKV is flagged as a teaching lens**, not a claim that GLM's hybrid
  attention is vanilla attention. Video 1 does not carry that caveat.
- **"Not naïvely recomputed from zero"** — §09 corrects a misconception Video 1
  §10 leaves open.

Those three sentences are worth stealing regardless of which cut ships.

## The one decision that shapes everything

`storyboard/video-2-gpt/GPT.md` closes with a list titled *"What this GPT version
intentionally removes"*:

> No universal `26 MB per expert` claim. No universal `8 GB per token` claim.
> No universal `1.5 seconds` transfer claim. No `42 × 8 = 336` as a major
> payoff. […] Those details can be added later **only if pinned to a real
> tokenizer/checkpoint/hardware/precision setup and measured.**

The caution is correct. The conclusion drawn from it is not.

Deleting the magnitudes leaves the payoff with no size. §08's answer to *"why
not just load the eight?"* is *"weight movement, memory bandwidth, and latency
can become the new bottleneck"* — drawn as a red constriction in a pipe. A
viewer cannot tell from that whether the penalty is 10% or 100×, so there is
nothing to be shocked by. The closing line is **"Huge capacity. Selective
compute. Large pool still accessible."** — three abstractions — and the last
frame hands the viewer a homework question, *"how do serving systems keep the
right experts close enough, fast enough?"*, in place of an answer.

Video 1 answers the same question with a size: *about 8 GB fetched per word,
against milliseconds of actual work.* Same claim, but a viewer can feel it.

**The right resolution is the storyboard's own escape clause: pin the setup.**
Not delete the number, and not assert it bare — state the precision and the
device on screen next to it. See the Video 1 action below.

## Faults in the frames

Found by reading rendered beats, not the source.

1. **The expert grid draws 72 cells and labels them "288 routed experts."**
   `GptCustomWorlds.tsx:42` — `Array.from({ length: 72 })`, 8 lit, caption
   `288 routed experts`. Eight of seventy-two reads as 11%; the real ratio is
   2.8%. The picture makes the model four times less selective than it is,
   in the one beat whose whole job is that ratio. The final world reuses the
   same 72 cells in a different layout, so the pool is also two different
   sizes in two places.

2. **The closing frame draws `320B → ~18B` with an arrow.** An arrow means
   *becomes*. That is exactly the misconception the video exists to kill —
   the 18B is a *subset selected from* the 320B, not a transformation of it.
   Containment, not an arrow.

3. **Text collides at beat 84.** *"selected weights must be available to
   compute"* renders on top of `token N+1` and over the router box.

4. **The transfer lanes end in mid-air.** Eight lines leave the store, pass
   through the working-memory box at different lengths, and stop nowhere.

5. **Roughly 45% of every frame is empty.** Content sits in a band from
   y≈300 to y≈820 of 1080. `storyboard/video-2-gpt/GPT.md` specifies the safe teaching
   area as `y 80–1000`; the implementation uses about half of it.

6. **`320B`, thirty times.** Ground truth is 321B. Video 1 says 321.

7. **`302B` appears once** at board line 113, in a note that itself says not
   to display 302B as a precision claim.

## Faults against the locked art direction

`art-direction/PALETTE.md` is one thing, one colour: ink / word (teal) /
measure (blue) / relate (purple) / cost (red) / claim (orange, **three uses in
the whole video**).

- **Orange is used for the current token throughout** — dozens of uses of a
  colour budgeted at three.
- **Teal is used for the shared expert and the cache chips.** Teal already
  means *the word we are following*.
- **Yellow is invented** for questions and predictions. Not in the palette.
- **Two type systems** — mono caps for labels, sans for headlines, serif for
  the token — where Video 1 is one ink hand.
- **Chapter rail prints numbers** (`01 Prompt`, `02 Tokens`, …) and a
  **`GPT WATCH / alternate 120-beat cut` badge is burned into the top-left of
  the frame.** Both are the chrome you had removed from Video 1.

## Architecture

- **It is built on v9, which is superseded.** `GptWatch.tsx` imports
  `OpeningWorld`, `TokenEmbeddingWorld`, `TransformerWorld`, `BuildingWorld`
  and `OutputWorld` from `../v9/` and six v9 stylesheets. It cannot be made to
  look like the finished film without being rebuilt on `src/paper`.
- **`AnimatePresence` keyed on the world.** `GptWatch.tsx:worldKey()` — the
  banned pattern. Each chapter boundary destroys and remounts the scene, so
  nothing can persist across it and every boundary is a hard cut. `mode="sync"`
  also puts both worlds on screen during the crossfade.
- **The director silently swallows input.** `useGptBeatDirector` holds a
  420 ms lock (760 ms on 21 long beats) and drops any press inside it with no
  queue. Advancing faster than the lock loses beats — reproducible, and it is
  how the 72-cell grid was found.
- **`mapGptBeatToV9` can return `null` inside a mapped range**, and
  `GptWorld`'s `beat <= 32 && mapped` chain then falls through to
  `MemoryWorld`. Not currently triggered; one wrong map entry away from
  silently showing the payoff during tokenization.

## Actions

**On Video 1 — one real hit, and it is one I had open already.**

§11 says *"one expert is about twenty-six megabytes"* and *"off a fast drive,
that's roughly a second and a half"*. The VO hedges (*about*, *roughly*, *a
fast drive*) and `section-11/scene.ts:38` records the assumption in a comment,
but **the precision is never stated on screen or in the VO**, and 26 MB depends
on `moe_intermediate_size`, which is still unconfirmed. GPT's objection lands.
The fix is not to cut the numbers — it is to put the setup in the frame beside
them, and to confirm `moe_intermediate_size` first.

**On Video 2 — do not ship it as a video.** It is a proposal in a superseded
engine, with a payoff that has no magnitude. Its value is the three sentences
under *"What it gets right"* and the audit above.
