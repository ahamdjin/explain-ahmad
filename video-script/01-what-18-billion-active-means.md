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

### Act 1 — the number, plainly (beats 1–6)

> **1.** Let's talk about this number.
>
> **2.** *(320,000,000,000 fills the frame)* Three hundred and twenty billion.
>
> **3.** That's how many parameters this model has. And a parameter is just a
> number it learned while it was being trained.
>
> **4.** So the whole model is three hundred and twenty billion numbers, sitting
> in a very big file.
>
> **5.** Now here's the bit everyone quotes. To answer you, it only uses about
> eighteen billion of them.
>
> **6.** *(18 lit, next to 320)* Eighteen out of three hundred and twenty.
> Roughly five percent.

### Act 2 — the reasonable idea, and why it fails (beats 7–12)

> **7.** So the obvious thought is: fine. Store the eighteen billion. Throw the
> rest away.
>
> **8.** And that doesn't work. You need all three hundred and twenty billion,
> sitting there, ready.
>
> **9.** Here's why, straight up.
>
> **10.** It uses a **different** eighteen billion for every single word.
>
> **11.** Not a different amount — the same amount, but a different eighteen
> billion. Different parts of the file, every word.
>
> **12.** And it doesn't decide which parts until the moment it needs them.

### Act 3 — what that means, and where we're going (beats 13–18)

> **13.** *(the plan crossed through — plainly, no drama)* Which means you can't
> pack a smaller version in advance. There's nothing to pack.
>
> **14.** That's the answer. That's the whole thing.
>
> **15.** But it's hard to believe, so let me show you.
>
> **16.** *(inside — 288 blocks)* The model's knowledge is split into experts.
> Two hundred and eighty-eight of them, in each part of the model.
>
> **17.** A word comes in, eight of them get used, and the other two hundred
> and eighty do nothing.
>
> **18.** So the question I actually have to answer is: **who picks the eight,
> and why can't they tell us in advance?** Let's follow one word through and
> watch.

---

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
- Beat 10 gets a hold, and the frame must show **two different eights** on the
  same 288 — that is the answer, so it gets a picture, not a caption.
- No hardware in this section. No chips, no cards. That is §6.

## Assets

| Need | Status |
| --- | --- |
| a big number that fills the frame | **build** — `BigNumber`, reusable in §5 and §8 |
| `ModelSheet` (320 / 18) | have |
| `Hospital` — the 288, with two different eights | have |
| `Plan`, and a plain "no" over it | have `Plan`; the "no" is a **new** state |
