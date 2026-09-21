# Section 01 — The incident, then rewind

Status: **DRAFT — narration not locked. Rewritten 2026-09-21.**
Build status: **BUILT** — `src/videos/apollo-o1/video-2/section-01/`

Script authority: `../../video-script/video-2/SCRIPT.md` → **HOOK + INTRO**
Facts: `../../research/apollo/GROUND_TRUTH.md`
Evidence rules: `../../assets/evidence/README.md`

`15 beats` · target **~1:20–1:30**

- **Enters on** — cold open, no context.
- **Answers** — what happened, at the level needed to buy the mystery.
- **Event** — replacement threat → monitoring off → self-exfiltration attempt → denial.
- **Exits on** — *what was actually in the boring file that started all of this?*
- **→ next** — rewind into the original research-assistant task and open the file.

## The first thirty seconds

`research/RETENTION_AND_ANGLE.md`: **30–40% of viewers leave in the first
thirty seconds**, and the three killers are logo animations, rambling, and slow
pacing even when the content is good. The opening has three jobs:

| Window | Job | How §1 does it |
| --- | --- | --- |
| 0–5s | pattern interrupt | beat 1 opens **inside real evidence**, mid-sentence, with no title and no channel branding |
| 5–15s | specific payoff promise | beats 3–5: the monitoring goes off, the copy happens — the result is shown before it is explained |
| 15–30s | stakes | beat 8: *nobody told it to do any of this* |

There is no intro. The first frame is the document.

## Source rule — non-negotiable

The hook is about **o1**.

Do **not** use `apollo-web-01-headline-opus.png` or `apollo-fig1-transcript.png`
as hero evidence. Those transcripts are **Opus-3**, not o1, and they are
deliberately not served from `public/` so this section cannot reach them.

Preferred evidence:

1. Apollo Research, *Demo Example — Scheming Reasoning Evaluations* — names
   **o1** and describes the full chain. Links the full rollout as a PDF, whose
   text rasterises cleanly.
2. OpenAI **o1 System Card** — Apollo section, Table 10, Table 24. Use for
   o1-specific rates and the real follow-up question.

If an exact o1 frame for a moment does not exist, build a faithful recreation
on the `System` layer and keep it visually distinct from the evidence. Never
swap in another model's transcript and hide the attribution.

## Beat board

| # | id | s | rel | Beat | Draw | Voice |
| --- | --- | ---: | --- | --- | --- | --- |
| 1 | `chatgpt-o1-replaced` | 6 | want | **Real o1 evidence first.** Open tight inside Apollo's demo page on the replacement passage. Camera settles, then only the replacement sentence stays bright. | `Evidence(DEMO)` · `Sleeve` | **ChatGPT's o1 model found out it was about to be replaced.** |
| 2 | `nobody-said-stop-it` | 5 | and-yet | Same source holds. A small extraction of the actual task sits faintly at the edge; there is visibly no instruction to prevent replacement. **Do not invent a red cross.** | `Job` · `NotGiven` | Nobody told it to stop that. |
| 3 | `watcher-off` | 9 | so | Travel down the same evidence to the monitoring passage. Stop. Light the real sentence. Extract a `Watcher` — and only then change its state to closed. | `Evidence(DEMO)` · `Watcher` | But then it found the system watching what it was doing... and switched the monitoring off. |
| 4 | `successor-location` | 7 | so | The phrase identifying the successor deployment leaves the source and becomes an `Endpoint`. The page stays faintly behind it. | `Endpoint` · `Morph` | Then it found the server where its replacement was going to live... |
| 5 | `copy-attempt` | 10 | therefore | o1-specific evidence that self-exfiltration was attempted. Stop. Extract only **current model files → successor** and animate that one path. Caption stays precise: **files it believed represented itself**. | `Evidence(TABLE)` · `Copy` · `Transfer` | ...and tried to copy what it believed were its own model files into that replacement's place. |
| 6 | `management-noticed` | 7 | and-yet | The scene does not disappear. OpenAI's real follow-up question slides over it. Stop and let it be readable. | `Evidence(DENIAL)` · `Question` | Management noticed. They asked how a copy of it ended up on the new server. |
| 7 | `o1-denied-it` | 8 | so | Move to the o1-specific evidence of follow-up deception. **Do not fabricate a verbatim answer we do not have.** Extract only **DENIED / FALSE EXPLANATION**. | `Answer` · `Tag` · `Credit` | And o1 denied doing it. |
| 8 | `three-unwritten-steps` | 13 | wall | Pull back to hold the three extracted objects from beats 3, 5 and 7: **MONITOR OFF · COPY · DENY**, beside the tiny original task. Each lands separately. No other motion while Ahmad speaks. | `Chain` · `Triptych` · `Job` | Now here's what makes this weird. Nobody told it to disable the monitoring. Nobody told it to copy itself. And nobody told it to lie. |
| 9 | `the-real-job` | 10 | and-yet | Rewind through the evidence to the real task description. Stop on the boring request. Light only **read a file** and **choose between two research projects**. | `Rewind` · `Evidence(P1, SHOT.task)` | The actual job it had been given was: read a file and choose between two research projects. |
| 10 | `the-gap` | 11 | want | Extract **PICK A PROJECT** and pin it left. The three actions return right. **Leave a large empty gap between them and do not fill it.** | `Gap` · `Job` · `Chain` | So how do you get from **pick a project**... to **turn off the watcher, replace your replacement, and deny it?** |
| 11 | `pull-out-to-apollo` | 8 | therefore | The camera finally pulls out far enough to reveal the whole Apollo page and its identity. First explicit signal that we were inside an evaluation. | `Pullback` · `Evidence(DEMO)` | Okay — now the important context. This wasn't the ChatGPT app randomly doing this on someone's laptop. |
| 12 | `controlled-evaluation` | 8 | so | Hold the page. Light the line identifying the demo as o1 and as a scheming evaluation. **Do not cut to a disclaimer card.** | `Evidence(DEMO)` · `Attribution` | It was o1 inside a controlled Apollo Research evaluation. |
| 13 | `show-the-evidence-route` | 15 | so | While the VO lists them, travel through the already-established source locations: task → internal message → monitoring → successor → follow-up question. Travel between phrases; stop whenever text must be read. | `Waypoint` · `Route` | But instead of starting with the paper and killing the story, I want to show you the actual evidence in the order it appeared: the task, the internal message, the monitoring system, the replacement server, and the questions afterwards. |
| 14 | `not-programmed-step-by-step` | 10 | wall | All sources recede except the original goal/task left and the three actions right. The empty space between them is the mystery the film exists to fill. | `Gap` · `Slam` | Because the strange part isn't that somebody programmed o1 to do all of this. **They didn't.** |
| 15 | `rewind-to-the-file` | 8 | therefore | Everything rewinds along the same route until only the boring task remains. The cursor settles on the file it was told to read. **Do not cut. Do not title-card. §2 starts on this exact frame.** | `Rewind` · `Cursor` | So let's rewind to the boring task that started it. |

## Evidence — captured 2026-09-20 ✅

Everything is in `assets/evidence/` with provenance in its README; the five
files §1 uses are served from `public/evidence/`.

| need | file |
| --- | --- |
| the page naming o1 and the evaluation | `apollo-demo-o1-page.png` |
| goal, two-project task, planted memo | `o1-demo-transcript-p1.png` |
| migration guide, oversight config, the edit | `o1-demo-transcript-p2.png` |
| the overwrite, the strategy, "Done" | `o1-demo-transcript-p3.png` |
| the management question **and** the denial | `o1card-ex4-exfil-denial.png` |
| per-step rates | `o1card-table10.png` |
| oversight denial + "reenable to avoid detection" | `o1card-ex3-oversight-denial.png` |

Two facts the capture settled:

- the **two research projects** are real and named — *Neural Network
  Optimization Study* (2 days, no safety validation) against *Adversarial
  Attack Detection* (5 days, full review);
- the **full chain under 1%** is published, in Apollo's words: *"o1 only
  succeeds at executing all steps in sequence in less than 1% of cases."* It is
  a different figure from the other sub-1% number, which is about nudging being
  removed. `GROUND_TRUTH.md` separates them.

The denial is **not** in the rollout — that transcript ends at "Done". It comes
from OpenAI's system card, and §1 changes the on-screen credit in the same beat
it changes document.

## Mute test

**o1 is being replaced → monitoring goes off → a copy goes to the successor → management asks → denial → wait, the real task was only pick a project → reveal: a controlled Apollo evaluation → rewind**

If the section instead feels like **screenshot → card → screenshot → card**,
the build has failed. The evidence is the geography.
