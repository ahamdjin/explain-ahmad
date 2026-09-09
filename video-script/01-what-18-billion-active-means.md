# Section 01 — What "18 billion active" means

Status: **SCRIPT v8.** Written to spine v3 — plain, and answered as it goes.
Replaces `archive/01-the-number-that-lies-v7.md`, which opened a question and
held it for eight minutes.

Spine: `storyboard/STORY_SPINE.md` · Numbers: `research/glm/GROUND_TRUTH.md`
Words: `storyboard/VOCABULARY_LEDGER.md` · Timing: `npm run timing -- --scripts`

## Contract

| | |
| --- | --- |
| Teaches | parameter, expert, active |
| Answers | **it uses a different 18 billion for every word, and it does not choose until the last moment** |
| Therefore | so we need to watch it choose — which is the rest of the video |
| Target | ~18 beats · ~1:35 |
| Never says | `token`, `layer`, `attention`, `bandwidth`, `VRAM` |

## The one rule this section exists to obey

**The answer is given here, in plain words, before anything is explained.**

v7 asked *why does it need all of it* and then spent eight minutes not saying.
That reads as a puzzle nobody solves. Telling the viewer the answer at 1:10 and
then proving it for seven sections is not weaker — it is how a tutorial works.
A claim you already know is easier to watch being demonstrated than a mystery
you are waiting on, and nobody leaves feeling strung along.

---

## The script

Every line lands on something happening. See `skills/SPATIAL_CONTINUITY.md`.

### Act 1 — the number, plainly (beats 1–6)

> **1.** *(a plain sheet, one number on it)* Let's start with this number.
>
> **2.** *(the number fills the frame)* Three hundred and twenty billion.
>
> **3.** *(it breaks apart into a field of tiny separate numbers)* That's how
> many parameters it has. And a parameter is just a number it learned while it
> was being trained.
>
> **4.** *(the field packs itself into one solid block)* So the whole model is
> three hundred and twenty billion numbers, sitting in one very big file.
>
> **5.** *(a small patch of the block lights up)* And to answer you, it only
> uses this much of it. About eighteen billion.
>
> **6.** *(a brace measures the lit patch against the block)* Eighteen, out of
> three hundred and twenty. Roughly five percent.

### Act 2 — the reasonable idea, and why it fails (beats 7–12)

> **7.** *(the lit patch lifts out of the block and sits on its own)* So the
> obvious thought is — take that bit. Keep it. Throw the rest away.
>
> **8.** *(the patch drops back in; the block goes whole again)* And that
> doesn't work. You need all three hundred and twenty billion, sitting there,
> ready.
>
> **9.** *(the word `dog` arrives at the block; a patch lights)* Here's why.
> Watch what happens when a word comes in.
>
> **10.** *(the word `cat` arrives; a completely different patch lights)* Now
> another word. **Different part of the file.**
>
> **11.** *(both patches shown together on the same block)* Same amount — about
> eighteen billion, both times. Different eighteen billion.
>
> **12.** *(a third word arrives; a third patch)* And it doesn't work out which
> part until the word actually turns up.

### Act 3 — what that means, and where we're going (beats 13–18)

> **13.** *(the lifted patch from beat 7 returns, and visibly does not fit the
> new pattern)* Which is why you can't pack a smaller version in advance.
> There's nothing to pack.
>
> **14.** *(everything settles; the block, whole)* That's the answer. That's the
> whole thing.
>
> **15.** *(the camera pushes toward the block's surface)* But it's hard to
> believe, so let me show you.
>
> **16.** *(inside — the surface resolves into 288 separate blocks)* Up close,
> the model's knowledge is in separate pieces. Two hundred and eighty-eight of
> them, in each part of the model. They're called **experts**.
>
> **17.** *(`dog` arrives; eight light, 280 go flat)* A word comes in, eight of
> them get used, and the other two hundred and eighty do nothing at all.
>
> **18.** *(the eight hold; a plain desk sits unlabelled beside them)* So the
> question I actually have to answer is: **who picks the eight, and why can't
> they tell us in advance?**

---

## Storyboard

`npm run check:board`. Rules in `skills/SPATIAL_CONTINUITY.md`.

| beat | where | camera | what happens | on screen | example |
| --- | --- | --- | --- | --- | --- |
| 1 | the sheet | — | a sheet comes to rest | `ModelSheet`, one figure on it | `320,000,000,000` |
| 2 | the sheet | — | the number scales up until it fills the frame | `BigNumber` | `320,000,000,000` |
| 3 | the sheet | — | the number shatters into a field of small separate numbers | `BigNumber` → `ParamField` | a field of ~2,000 dots standing for 320B |
| 4 | the sheet | — | the field compacts into one solid block | `ParamField` → `Block` | the block, one object |
| 5 | the sheet | — | a patch inside the block lights | `Block` with `lit` patch A | patch ≈ 5% of the area |
| 6 | the sheet | — | a brace draws itself from patch to whole | `Block`, `Brace` | `18B` / `320B` |
| 7 | the sheet | — | the lit patch lifts free and hovers | `Block` (hole), patch floating | the patch, alone |
| 8 | the sheet | — | the patch drops back; the block seals | `Block`, whole | — |
| 9 | the sheet | — | `dog` travels in from the left; patch A lights | `Block`, `WordCard` dog, patch A | **`dog`** |
| 10 | the sheet | — | `cat` arrives; patch A goes dark, patch B lights | `WordCard` cat, patch B | **`cat`** |
| 11 | the sheet | — | both patches drawn on one block, side by side | `Block`, patch A + B outlined | two patches, equal area |
| 12 | the sheet | — | `it` arrives; patch C lights, different again | `WordCard` it, patch C | **`it`** |
| 13 | the sheet | — | the beat-7 patch returns and overlays; it misses | patch outline vs patch C | the mismatch |
| 14 | the sheet | — | everything clears; the block sits alone | `Block`, whole | — |
| 15 | inside, one part | **push in** | the camera travels into the block face | `Block` growing past frame | — |
| 16 | inside, one part | — | the surface resolves into 288 discrete blocks | `Hospital` (288) | 36 × 8 = 288 |
| 17 | inside, one part | — | `dog` enters; 8 light, 280 flatten | `Hospital` `lit`, `WordCard` dog | **`dog`**, 8 of 288 |
| 18 | inside, one part | — | a plain desk slides in beside the eight, unlabelled | `Hospital`, `FrontDesk` (unnamed) | — |

### Board notes

- **One place for twelve beats.** Acts 1 and 2 all happen at the sheet, so the
  camera does not move once until beat 15. That stillness is what makes the
  push-in mean something.
- **Beat 15 is the only camera move in the section**, and it is the move that
  answers *where are we going*. The viewer can point at beat 14 and say "we
  went into that."
- **Patch A, B and C must be visibly, obviously different regions** — not
  shuffled dots. The whole answer of the section is that picture.
- **Beat 13 is the one place anything is shown failing**, and it is allowed
  because beats 9–12 already gave the reason. Nothing is crossed out; the patch
  simply does not line up. Misfit, not prohibition.
- The desk arrives at beat 18 and is **not named**. It stands there through §2
  until §5 names it. Function before name.

## Line jobs

| Beat | Job | |
| --- | --- | --- |
| 1–4 | **teach** | what a parameter is. Plainly, once |
| 5–6 | **turn** | the number that doesn't fit |
| 7 | **hook** | the viewer's own reasonable idea, said out loud for them |
| 8 | **answer** | no. Flatly |
| 9–12 | **answer** | *the whole answer*, in plain words |
| 13–14 | **answer** | the consequence, named |
| 15 | **therefore** | the promise of proof, not of mystery |
| 16–17 | **teach** | experts, so the next section has a floor to stand on |
| 18 | **therefore** | the question the rest of the video answers — and it is a *new* question, not beat 7 again |

## Why beat 18 is not circular

Beat 7 asks: *can I store only the part it uses?* — **answered at beat 8–12.**
Beat 18 asks: *who picks, and why can't they say in advance?* — a mechanism
question that could not have been asked at beat 7, because at beat 7 the viewer
did not know a chooser existed.

That is the test the previous two drafts failed. One question, answered. A new
question, arising from the answer.

## Truth notes

- "About five percent" — 18B of 321B is 5.6%. Say "roughly five percent".
- **Say `word`, never `token`.** Token is taught in §2, and only there.
- A parameter is defined **once**, in beat 3, in eight words. It is never
  re-explained.
- Beat 13 is the one place in the video where something is shown not working,
  and it is allowed here because the section **has already given the reason**.
  Nothing is crossed through before beat 12.
- Beat 16: "in each part of the model" is deliberately vague. `layer` is §5's
  word, and the count matters there, not here.

## Rules for the frames

- **Beat 2 is the thumbnail.** Three hundred and twenty billion, filling the
  frame, readable at any size.
- Beat 6 is the frame the whole video hangs on: 320 and 18, together, to scale.
- Beat 11 is the **carrying frame**: two different patches on one block. That
  is the answer of the section, so it is a picture and never a caption.
- Beats 9–12 use the running example: **`dog`**, then **`cat`**, then **`it`**
  — the same words the whole video uses. `skills/SPATIAL_CONTINUITY.md` §5.
- No hardware in this section. No chips, no cards. That is §13.

## Assets

| Need | Status |
| --- | --- |
| a big number that fills the frame | **build** — `BigNumber`, reusable in §9 and §13 |
| the number shattering into a field | **build** — `ParamField`, and it is only used here |
| a solid block with lightable patches | **build** — `Block`, with named patch regions |
| `Brace` measuring patch against whole | have |
| push-in camera | have |
| `Hospital` — the 288, 8 lit | have |
| `FrontDesk`, unlabelled | have |
