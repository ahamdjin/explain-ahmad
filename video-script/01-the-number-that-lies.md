# Section 01 — The number that lies

Status: **SCRIPT v7.** Written to the v2 spine. Replaces `01-the-claim.md`
(v6, built as 21 beats / 1:46), whose opening reached its hook at 0:19 and
whose event overstated what the research supports.

Spine: `storyboard/STORY_SPINE.md` · Gates: `skills/STORY_STRUCTURE.md`
Numbers: `research/glm/GROUND_TRUTH.md` · Audience: `research/RETENTION_AND_ANGLE.md`
Words: `storyboard/VOCABULARY_LEDGER.md` · Timing: `npm run timing`

## Contract

| | |
| --- | --- |
| Want | Everybody quotes *"320 billion, only 18 billion active."* What does that number actually buy? |
| Enters on | *(cold open)* |
| Answers | Why keep the other 300 billion? → **because which experts you need depends on the word.** Not waste — options. |
| Event | **A second word picks a different eight — and a couple of the first eight stay.** |
| Exits on | If some of them keep coming back, why not keep those close and fetch the rest? |
| Target | **~25 beats · ~1:55** at 78% talking |
| Never says | `token`, `layer`, `attention`, `VRAM`, `quantization`, `bandwidth`, `cache` |

## The opening, against the retention research

`research/RETENTION_AND_ANGLE.md`: pattern interrupt by 0:05, specific promise
by 0:15, stakes by 0:30. 30–40% of viewers are gone by 0:30.

| | | |
| --- | --- | --- |
| **0:00–0:05** | pattern interrupt | two model sheets, and a claim the viewer will resist |
| **0:05–0:15** | the promise | one runs on a single card. The other needs four |
| **0:15–0:30** | the stakes | *the number everybody quotes isn't telling you what you think* |

No channel intro, no model name in the first line, no spec read. The model is
named when the viewer already wants to know what it is — not before.

---

## The script

### Act 1 — the contradiction (beats 1–6) · to 0:27

> **1.** *(two sheets, side by side)* Two models.
>
> **2.** Both of them use about five percent of themselves to answer you.
>
> **3.** *(left sheet)* This one runs on a single graphics card.
>
> **4.** *(right sheet — hold)* This one needs four.
>
> **5.** Same five percent. Four times the machine.
>
> **6.** So that number everybody quotes — *"only eighteen billion active"* —
> isn't telling you what you think it is.

### Act 2 — what that five percent is (beats 7–11)

> **7.** Let's start with what the five percent actually is.
>
> **8.** *(inside)* It isn't one big block of knowledge.
>
> **9.** It's split into experts. Two hundred and eighty-eight of them.
>
> **10.** A word comes in.
>
> **11.** And eight get picked. The other two hundred and eighty do nothing at
> all.

### Act 3 — so why keep the rest? (beats 12–17)

> **12.** So why keep the other two hundred and eighty around at all?
>
> **13.** Watch. Another word.
>
> **14.** *(beat — let it land)* A different eight.
>
> **15.** Same model. New word. New team.
>
> **16.** So those three hundred billion aren't waste. They're **options**.
>
> **17.** You just never need all of them at once.

### Act 4 — the idea that should work (beats 18–25)

> **18.** Look again, though.
>
> **19.** *(two of the eight are still lit)* A couple of them didn't move.
>
> **20.** Some experts keep coming back.
>
> **21.** So here's the obvious idea. Keep the ones that keep coming back close
> by —
>
> **22.** — and go and get the rest only when you need them.
>
> **23.** *(the plan, looking correct)* That's it. That fits on almost anything.
>
> **24.** Except — *which* ones keep coming back? That changed the moment the
> word changed.
>
> **25.** **So if some of them keep turning up anyway — why can't we just keep
> those, and fetch the rest?**

---

## Line jobs

Per `skills/PRODUCTION_ORDER.md` §1 — hook, answer, turn, or cut.

| Beat | Job | |
| --- | --- | --- |
| 1–2 | **hook** | the pattern interrupt: a claim they will resist |
| 3–4 | **hook** | the promise, made concrete and checkable |
| 5 | **turn** | the two facts collide |
| 6 | **hook** | the stakes — the number they trust is wrong |
| 7 | setup | the doorway |
| 8–11 | answer | the mechanism, as far as this section needs |
| 12 | **hook** | Q1 |
| 13–14 | **turn** | the event |
| 15–17 | **answer** | Q1 resolved: options |
| 18–20 | **turn** | the honest detail — and the seed of §7 |
| 21–23 | setup | the plan, and it looks right |
| 24 | **turn** | the payoff of 13–14 |
| 25 | **hook** | the exit question |

No line is doing nothing. Beats 18–20 are the ones a lesser script leaves out,
and they are why §7 can be honest later.

## Gates

| Gate | Result |
| --- | --- |
| 1 · circularity | Q1 (b12) answered at 16. Exit (b25) is a different question about a plan that did not exist at b12. **Pass** |
| 2 · event | b13–14: a different eight, with overlap. **Pass** |
| 3 · escalation | b25 needs the experts, the change, *and* the overlap. Unaskable at b12. **Pass** |
| 4 · setup/payoff | b13–14 pays off at 24; b18–20 is the seed §7 has to defeat; b1–4 return in §8. **Pass** |
| 5 · link | cold open (exempt as §1); closes on a *but*. **Pass** |

## Truth notes — mandatory

- **Never put a number on the overlap.** Beat 19 shows *a couple* staying and
  says "a couple". The measured figures (44.2% consecutive-token sharing,
  LRU-128 at 81%) are **Mixtral 8×7B — 8 experts, top-2**. Nobody has published
  the equivalent for 288 experts at top-8, and random chance here is ~2.8%.
  See `research/glm/OFFLOADING_AND_LOCALITY.md`.
- **"About five percent" covers both models.** 5.1B/116.8B = 4.4%;
  18B/321B = 5.6%. Saying "about five percent" of both is accurate; putting
  4.4% and 5.6% on screen invites a comparison the section does not need.
- **One card versus four** is from footprint, not benchmarks: ~58 GiB at MXFP4
  against ~306 GiB at FP8, on 80 GB accelerators. Honest at 4-bit too — ~58
  against ~153, one against two. `GROUND_TRUTH.md`.
- **Say `word`, never `token`.** Token is earned in §2.
- **Nothing is shown blocked.** No cross, no hazard mark. At beat 23 the plan
  looks correct, and the closing question is written *over* a plan that still
  looks correct.
- **Say nothing about repeating or counting.** That the choice is remade on
  every one of 42 floors is §5's reveal. No "again", no "every time", no
  counting here.

## Rules for the frames

- **Beats 1–4 are the most important frames in the video.** Two sheets, two
  numbers, two machine counts. It must read in a thumbnail and with the sound
  off. This is the frozen-frame test that actually matters.
- Beat 4 gets a hold. So does beat 14.
- The router is on screen from beat 10 as an unlabelled desk. It is **not named
  in this section** — §2 is where it is named, and §2 opens by looking at it.
- The words are `dog`, then `cat`.
- Beat 19: the two that stayed keep their colour and their ring; the six that
  left get the dashed vacated markers. **The stayers are the story of the beat**,
  so they must be findable instantly — a leader line, not a legend.

## Assets

| Need | Status |
| --- | --- |
| two `ModelSheet`s, side by side, with a machine count | **extend** — `ModelSheet` exists, needs a compare state |
| `Hospital` with `lit` + `was` overlap | have — `was` already draws vacated chairs |
| `Plan` | have — must be reusable verbatim by §6 |
| `WordCard` | have |
| graphics-card / machine glyph, ×1 and ×4 | **have** — `MachineBox` from the props library |
