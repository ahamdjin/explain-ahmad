# Section 01 — the headache chain

Status: **PROPOSAL v2.** Supersedes the beat list in `01-opening-hope-wall.md`.
That file's numbers and protagonist notes still stand.

## What changed and why

Ahmad's note: *"it happened because of this. therefore we have router but router
only chooses 8 experts so what about others?"*

That is the real spine, and it is stronger than v1 because **every step is caused
by the one before**. v1 alternated hope and wall around a memory stake; v2 makes
each answer generate the next question, which is what
`NCASE_LEARNING_AND_EXPLANATION_NOTES.md` §2 actually asks for.

The test applied to every mechanism beat:

> **What problem has the learner already seen that makes this mechanism
> necessary?** If there is no answer, it is being introduced too early.

v1 failed this on the router. It appeared straight after the experts, but
"parameters are divided into experts" does not require a router. The thing that
requires a router is *only a few of them run per word — so something must
choose*. That headache has to exist first.

## The chain

```
HEADACHE 1   320B stored, ~18B used per word. How can a model use part of itself?
    ↓ because
ASPIRIN 1    The parameters are divided into many separate experts.
    ↓ therefore
HEADACHE 2   If only some run, something has to decide which ones.
    ↓ so
ASPIRIN 2    The router. Reads the word, scores every expert, takes the top 8 (+1 shared).
    ↓ but
HEADACHE 3   It picks 8 of 288. What about the other 280? They just sit there.
    ↓ so
HEADACHE 4   If 280 are idle for this word, why must my 32GB hold them at all?
    ↓ therefore
PROPOSED     Load only the 8. ~18GB fits in 32GB. This obviously works.
    ↓ but
HEADACHE 5   It doesn't. Unresolved.
    ↓ therefore
             Go inside and find out why.
```

Headache 5 is the hook the whole video hangs on. Section 08 is its aspirin.

## Ahmad's frame notes, applied

1. **The word is labelled `a word`, not `"scared"`.** At the point it enters,
   which word it is doesn't matter, and a specific word is a true-but-irrelevant
   detail — the coherence problem in `GLM_V6_RESEARCH_NOTES.md`. Specific words
   earn their place only at the routing experiment, where the whole point is
   that *different* words route differently.
2. **"All the parameters are divided into experts"** replaces "They are
   Experts!" — the whole mass is organised into experts. Nothing is left over.
3. **The "so where do the other 300B go?" note is deleted.** If all parameters
   are experts, nothing went anywhere. It was a wrong question, not just a
   clumsy line.
4. **The router gets two beats.** A plain introduction first — here is a thing
   that chooses — then it goes to work inside the mechanism.

## Beats

Each beat states its relation, and every mechanism beat names the headache it
answers. `park` means the piece shrinks into its reserved zone and stays.

### 1 · WANT — why care

- **Screen:** The Mac alone. `32 GB`.
- **Narrator:** beside it, hand on it.
- **Relation:** `want`

### 2 · HEADACHE 1a — it doesn't fit

- **Screen:** The parameter mass arrives and dwarfs the machine. `306 GiB` / `32 GB`.
- **Narrator:** small, looking up.
- **Relation:** `wall`

### 3 · SO — squeeze it

- **Screen:** Mass compresses. `4-bit`, `306 → ~153 GiB`. Still dwarfs the Mac.
- **Notes:** brace `5×`
- **Relation:** `so` → then `wall`. Ahmad carries the quantization explanation here.

### 4 · BUT — the anomaly appears

- **Screen:** `a word` enters. A contiguous slice of the mass lights.
- **Notes:** brace `~18B active`
- **Relation:** `and-yet`
- **Headache 1 in full:** the model holds 306 GiB but touches a sliver of it for
  one word. A single solid block cannot be partly used — so what is it made of?

### 5 · BECAUSE — the mass is divided

- **Screen:** One cell lifts out and becomes an expert (worked example). Then the
  rest follow as a wave. The grid scaffold stays visible.
- **Notes:** `all the parameters are divided into experts` · brace `288 per layer`
  · margin `expert = learned network block`
- **Relation:** `so`
- **Answers:** headache 1. That is why part of the model can run without the rest.

### 6 · THEREFORE — something must choose

- **Screen:** All 288 experts lit equally. `a word` sits in front of them with no
  path to any of them. Deliberately unresolved — this frame is a question.
- **Notes:** one `?` between the word and the population
- **Relation:** `and-yet`
- **Headache 2.** No mechanism on screen yet. The gap is the point.

### 7 · SO — meet the router, plainly

- **Screen:** The router arrives into the gap. Nothing else changes. It is simply
  introduced.
- **Notes:** `router` label only
- **Relation:** `so`
- **Answers:** headache 2 — but only by existing. It hasn't done anything yet.

### 8 · AND — the router works

- **Screen:** Scoring sweep across all 288, then eight land lit plus the teal
  shared one. The other 280 stay visible and dim.
- **Notes:** `top 8` · `1 shared` · bubble: "I read what this word has become,
  score every expert, and take the top 8."
- **Relation:** `so`

### 9 · BUT — what about the other 280?

- **Screen:** Hold the exact frame. Brace the 280 unlit experts.
- **Notes:** brace `280 not used for this word`
- **Relation:** `and-yet`
- **Headache 3.** Ahmad's line: *the router only chooses 8, so what about the others?*

### 10 · SO — why hold them at all?

- **Screen:** The 8 selected copy into the RAM tray; the 280 stay in storage.
  The Mac returns to frame beside the tray.
- **Notes:** `~18 GB` in `32 GB` · a tick
- **Relation:** `hope`
- **Headache 4 becomes a proposal.** ~18GB fits. At shipped precision. Today.

### 11 · THEREFORE — the obvious fix, and the audience commits

- **Screen:** Only the eight sit in the Mac. Everything else greys to storage.
  The frame argues *yes*.
- **VO to camera:** "Would that work?" — pause, then click.
- **Relation:** `hope` — highest point in the section
- **Narrator:** leaning in

### 12 · BUT — it doesn't work

- **Screen:** The load path jams. Muted red, once. Only red in the section.
- **Narrator:** the big drop.
- **Relation:** `wall`
- **Headache 5.** No part of the answer appears here.

### 13 · THEREFORE — go inside

- **Screen:** Architecture sheet pushed aside; the word moves into the archway.
  The bottom band now reads as the full recap.
- **Relation:** `therefore`

## The loop

Ahmad: *"and same the loop."* Section 11 closes by returning to **headache 1**
and answering it in the terms the viewer now owns:

- `306 GiB` = what it knows, all of it, always stored
- `~18 GB` = what it touches for one word
- and the reason those can't be the same number is Section 08's answer

Same frame as beat 2. Same two labels. Different understanding.

## Still to research

- Whether "all parameters are divided into experts" is precise enough. Attention
  weights and the 3 dense layers are *not* experts, so the honest line may be
  "most of the parameters" or "the feed-forward parameters". **Check before
  recording** — this is the kind of overclaim the video would get caught on.
- Whether 288 should be described per-layer from the start. It is 288 *per sparse
  layer*, and Section 08 depends on that being clear.
