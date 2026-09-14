# Section 01 — The five-percent problem

Status: **APPROVED NARRATION — LOCKED.**

The narration in this file is the source of truth. **Storyboard, beat count,
timing and components must adapt to the approved words. They may not paraphrase,
shorten, add definitions to, or otherwise rewrite the VO to make implementation
easier.** See `skills/STORY_STRUCTURE.md` → **Narration lock**.

Spine: `storyboard/video-1/STORY_SPINE.md` · Numbers: `research/glm/GROUND_TRUTH.md`

## Contract

| | |
| --- | --- |
| Story event | two models have similar active shares, but one fits one 80 GB accelerator while the other needs eight in the fully-resident shipped-precision comparison |
| Main mystery | **when 18B are active, which 18B?** |
| Exits on | **the model does not start with words** |
| → next | show what the sentence becomes first |
| Built | **18 beats** · timing is provisional until recorded VO |
| Running example | `The dog dropped the ball, and it` |
| Followed piece | **`it`** |
| Still forbidden | router, experts, layers, 288, 336, MoE explanation |

---

## Canonical narration — APPROVED / LOCKED

> You’ve probably seen AI models advertised like this:
>
> **320 billion parameters.**
> **Only 18 billion active.**
>
> And that sounds incredible.
>
> Because if only a small part of the model is being used at a time…
>
> then surely you only need that small part.
>
> Right?
>
> Honestly, that’s what I assumed too.
>
> So let me show you something weird.
>
> Here are two models.
>
> This one uses about **4%** of its parameters when generating a token.
>
> This one uses about **6%**.
>
> Pretty close.
>
> So if I asked you which one needs more hardware…
>
> you’d probably expect the difference to be pretty small.
>
> It isn’t.
>
> This one can fit on a single 80-gigabyte accelerator.
>
> Keeping this one fully resident at the precision it ships in takes **eight**.
>
> Same basic promise:
>
> **most of the model is inactive.**
>
> Completely different machine.
>
> And that raises a much stranger question.
>
> When they say **18 billion parameters are active**…
>
> **which 18 billion?**
>
> Are they sitting together somewhere inside the model?
>
> Are they the same 18 billion every time?
>
> Does the model already know which ones it’s going to need before you ask it anything?
>
> Because if the answer to those questions were simple…
>
> you really could just keep the useful part and forget the rest.
>
> But that’s not what happens.
>
> And the easiest way to understand why is not with a giant architecture diagram.
>
> We’re going to follow **one tiny piece of text** through the entire model.
>
> Just one.
>
> Let’s type:
>
> **“The dog dropped the ball, and it…”**
>
> And we’re going to follow **“it.”**
>
> By the time that little piece reaches the other side, the whole **320 billion versus 18 billion** thing should finally make sense.
>
> So first:
>
> when you type this sentence into the model…
>
> what does the model actually receive?
>
> Because it doesn’t start with words.

**Visual truth note:** the chat itself types the measured tokenizer input
`The dog dropped the ball, and it` without a literal ellipsis. The ellipsis in
the narration indicates the unfinished thought/pause; adding `…` to the actual
input would change the tokenizer input.

---

## The script

These are **cuts of the locked narration**, not rewritten versions of it.
Concatenate them in order and the approved narration above is what is spoken.

### Act 1 — the assumption (beats 1–3)

> **1.** *(GLM is one block; a small active region lights.)* You’ve probably seen AI models advertised like this: 320 billion parameters. Only 18 billion active. And that sounds incredible.
>
> **2.** *(The lit region lifts out as the obvious interpretation.)* Because if only a small part of the model is being used at a time… then surely you only need that small part.
>
> **3.** *(The patch settles back; the idea is allowed to feel reasonable.)* Right? Honestly, that’s what I assumed too. So let me show you something weird.

### Act 2 — test it (beats 4–8)

> **4.** *(A second model arrives; the two active shares are shown separately.)* Here are two models. This one uses about 4% of its parameters when generating a token. This one uses about 6%.
>
> **5.** *(Both models hold; the hardware is still hidden.)* Pretty close. So if I asked you which one needs more hardware… you’d probably expect the difference to be pretty small.
>
> **6.** *(One 80 GB accelerator lands under the left model.)* It isn’t. This one can fit on a single 80-gigabyte accelerator.
>
> **7.** *(GLM counts to eight accelerators.)* Keeping this one fully resident at the precision it ships in takes eight.
>
> **8.** *(The final comparison holds: ≈4%/≈6% above, one/eight below.)* Same basic promise: most of the model is inactive. Completely different machine.

### Act 3 — the real mystery (beats 9–14)

> **9.** *(The left comparison leaves; GLM returns to centre.)* And that raises a much stranger question.
>
> **10.** *(A dashed possible active region appears elsewhere.)* When they say 18 billion parameters are active… which 18 billion?
>
> **11.** *(The real active marks remain visibly distributed inside the whole model.)* Are they sitting together somewhere inside the model?
>
> **12.** *(The hypothetical region moves to different places.)* Are they the same 18 billion every time?
>
> **13.** *(The alternatives clear; the intact model holds before a prompt has arrived.)* Does the model already know which ones it’s going to need before you ask it anything?
>
> **14.** *(The active patch lifts out again into the tempting `KEEP READY?` plan.)* Because if the answer to those questions were simple… you really could just keep the useful part and forget the rest.

### Act 4 — turn the rest of the video into an experiment (beats 15–18)

> **15.** *(The patch returns; the familiar chat arrives beside the same GLM.)* But that’s not what happens. And the easiest way to understand why is not with a giant architecture diagram. We’re going to follow one tiny piece of text through the entire model.
>
> **16.** *(The real prompt types into Chat; it is still ordinary human text.)* Just one. Let’s type: “The dog dropped the ball, and it…”
>
> **17.** *(The final `it` is identified without detaching it from the sentence.)* And we’re going to follow “it.” By the time that little piece reaches the other side, the whole 320 billion versus 18 billion thing should finally make sense.
>
> **18.** *(Send is committed; a causal path begins toward GLM and stops halfway.)* So first: when you type this sentence into the model… what does the model actually receive? Because it doesn’t start with words.

---

## Storyboard

There is **one paper stage for all 18 beats**. No new full-page scene. Existing
objects move or change state; nothing teleports.

| beat | where | camera | what happens | on screen | example | strategy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | the paper stage | — | GLM arrives as one block; a small region lights | GLM + `320B total` + `18B active` | GLM-5.3-Flash | S-04 |
| 2 | the paper stage | — | the active region lifts out as the viewer’s obvious interpretation | same block + lifted patch | `keep this part?` | S-14 |
| 3 | the paper stage | — | the patch settles back; the frame pauses before the test | GLM | assumption feels reasonable | S-02 |
| 4 | the paper stage | — | GLM moves right; gpt-oss enters left; each active share is labelled | two model blocks | ≈4% vs ≈6% | S-04 |
| 5 | the paper stage | — | hardware remains hidden while the prediction holds | same two blocks | `small difference?` | S-05 |
| 6 | the paper stage | — | one 80 GB accelerator lands under gpt-oss | left rig ×1 | 1 × 80 GB | S-04 |
| 7 | the paper stage | — | accelerators count under GLM until eight are visible | right rig → 8 | 8 × 80 GB | S-04 |
| 8 | the paper stage | — | both models and both rigs hold long enough to read as one contradiction | ≈4% / ≈6%; 1 / 8 | carrying frame A | S-14 |
| 9 | the paper stage | — | left model and both hardware rigs clear; the same GLM returns to centre | centred GLM | — | S-14 |
| 10 | the paper stage | — | real active patch stays lit; a dashed alternative appears elsewhere | real + hypothetical regions | `which 18B?` | S-08 |
| 11 | the paper stage | — | the active marks stay visibly distributed inside the whole block | GLM block | `one fixed place?` | S-04 |
| 12 | the paper stage | — | only the hypothetical region moves between possible locations | GLM + moving dashed region | `same every time?` | S-06 |
| 13 | the paper stage | — | alternatives clear; the model holds before any prompt exists | intact GLM | `known before prompt?` | S-08 |
| 14 | the paper stage | — | active patch lifts out again under `KEEP READY?` | GLM + lifted patch | tempting plan | S-14 |
| 15 | the paper stage | — | patch returns; GLM slides right; Chat enters left | Chat + same GLM | no architecture diagram | S-04 |
| 16 | the paper stage | — | exact measured prompt types character-by-character | Chat + GLM | `The dog dropped the ball, and it` | S-04 |
| 17 | the paper stage | — | typing stops; an arrow/note identifies `it` inside the intact sentence | Chat + GLM | follow `it` | S-03 |
| 18 | the paper stage | — | send is committed; a dashed path starts from Chat toward GLM and stops halfway | Chat → ? → GLM | `doesn’t start with words` | S-08 |

## Carrying frames

- **Beat 8:** two similar active shares, **one accelerator vs eight**.
- **Beat 10:** one whole model, one active region, one possible alternative: **which 18B?**
- **Beat 17:** the exact prompt remains intact and **`it`** is the thing we promise to follow.
- **Beat 18:** Chat left, GLM right, unfinished path between them. Section 2 must continue from this state conceptually.

## Truth notes

- GLM-5.3-Flash: 321B exact / marketed ~320B; 18B active per token.
- gpt-oss-120b is ~4.4% active; GLM is ~5.6%, hence the spoken **about 4% / about 6%**.
- Hardware wording is deliberately scoped: gpt-oss-120b fits one 80 GB accelerator at its shipped MXFP4 format; keeping GLM’s shipped FP8 weights fully resident uses the eight-card comparison. This is not a claim that offloading or quantization cannot run GLM on less memory.
- The active patch is a conceptual visualization, not a claim that the 18B form one contiguous physical region.
- `it` is a real token in the measured running prompt. The measured tokenizer input omits the visual ellipsis.

## Sound-compatible actions

- beat 4: paper slide as the second model arrives
- beat 6: one firm accelerator-card click
- beat 7: countable card ticks, final one heavier
- beat 14: paper lift
- beat 16: typing
- beat 18: send/key press
