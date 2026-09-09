# Section 01 — The claim on trial

Status: **SCRIPT v6.** Replaces `01-opening-narration.md`, whose closing
question was its opening question.

Spine: `storyboard/STORY_SPINE.md` · Gates: `skills/STORY_STRUCTURE.md`
Numbers: `research/glm/GROUND_TRUTH.md` · Words: `storyboard/VOCABULARY_LEDGER.md`

> **Built.** 21 beats, 1:46. Board: `storyboard/BOARD.md` (generated).
> Route: `/section-01` · in sequence: `/watch?section=1`

## Contract

| | |
| --- | --- |
| Want | They shipped a 320-billion-parameter model and called it efficient. Is that true? |
| Enters on | *(cold open)* |
| Answers | Why carry 320 billion if a word only uses 18? → **because which experts you need depends on the word.** The rest isn't waste, it's options. |
| Event | **A second word arrives and picks a completely different eight.** |
| Exits on | If the choice keeps changing, how could you ever hold only the ones you need? |
| Beats | **21 · 1:46** — built |
| Never says | `token`, `layer`, `attention`, `VRAM`, `quantization`, `bandwidth` |

## Why the old script was replaced

It asked *"why have the other 300 billion?"*, then *"why can't I keep just the
small part?"*, then *"why can't we run this on a smaller machine?"* — one
question three times, so the section ended where it started. It also never
answered its own first question, and nothing in it ever happened.

This version answers Q1 properly (**options**), earns it with an event, and
exits on a question that could not have been asked at the start.

---

## The script

### Act 1 — the claim (beats 1–4)

> **1.** This is GLM-5.3-Flash.
>
> **2.** Three hundred and twenty billion parameters — everything it has ever
> learned. And they call it *efficient*.
>
> **3.** Its whole job is this. You give it a word, it gives you the next one.
>
> **4.** And doing that only uses eighteen billion of them. About five percent.

### Act 2 — so why carry the rest? (beats 5–13)

> **5.** So why carry the other three hundred billion at all?
>
> **6.** Let's look inside. It isn't one big block of knowledge.
>
> **7.** It's split into experts. Two hundred and eighty-eight of them.
>
> **8.** A word comes in.
>
> **9.** And only a few of them get picked.
>
> **10.** Eight. Out of 288. The other 280 do nothing at all.
>
> **11.** Now watch. Another word.
>
> **12.** *(beat — let it land)* A completely different eight.
>
> **13.** Same model. New word, new team. So those three hundred billion aren't
> waste — they're **options**. You just never need all of them at once.

### Act 3 — then why is it so heavy? (beats 14–18)

> **14.** But hold on. If it's only ever eight at a time…
>
> **15.** …why does running this thing still mean hundreds of gigabytes?
>
> **16.** Especially when something already knows which eight you need. It's
> called the router — and it's been sitting right there the whole time.
>
> **17.** So load those eight. Leave everybody else asleep.
>
> **18.** Eight experts. That fits on almost anything.

### Act 4 — the turn (beats 19–21)

> **19.** Except — *which* eight? That changed the moment the word changed.
>
> **20.** So you'd need a new set. Every single word. **If we only load the
> experts we need, why can't we run this on far less memory?**
>
> **21.** To answer that, staring at the finished model won't help. Let's follow
> one word inside.

---

## Line jobs

Per `skills/PRODUCTION_ORDER.md` §1 — every line is a hook, an answer, a turn,
or it gets cut.

| Beat | Job | |
| --- | --- | --- |
| 1–3 | setup | the claim, and the machine working |
| 4 | **turn** | the number doesn't match the claim |
| 5 | **hook** | Q1 |
| 6–10 | answer | the mechanism |
| 11–12 | **turn** | the event — a different eight |
| 13 | **answer** | Q1 resolved: options |
| 14–15 | **turn** | the weight doesn't follow from "only eight" |
| 16–18 | setup | the plan, looking correct |
| 19 | **turn** | the payoff of 11–12 |
| 20 | **hook** | Q2 — the exit question |
| 21 | setup | the doorway |

No line is doing nothing.

## Gates

| Gate | Result |
| --- | --- |
| 1 · circularity | Q1 (beat 5) is answered at 13. Q2 (beat 20) is a different question. **Pass** |
| 2 · event | Beat 11–12: a second word picks a different eight. **Pass** |
| 3 · escalation | Beat 20 needs the router *and* the changing choice. It could not have been asked at beat 5. **Pass** |
| 4 · setup/payoff | Beat 11–12 pays off at 19, and again in §7 where it breaks the plan. **Pass** |
| 5 · link | Opens cold (exempt as §1); closes on a *but*. **Pass** |

## Rules for the frames

- **Nothing is shown blocked.** No cross, no hazard sign. At beat 18 the plan
  looks correct, and at 20 the question is written over a plan that still looks
  correct. See `STORY_STRUCTURE.md` §2.
- Beat 12 gets a real hold. It is the event, and an event that is stepped on
  is not an event.
- The router is on screen from beat 8 as an unlabelled desk, and is named at
  16. Function before name.
- The word is `dog`, then `cat`. Ordinary words the viewer owns instantly.
