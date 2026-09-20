# Section 01 — The incident, then rewind

Status: **DRAFT — narration not locked.**

Script authority: `video-script/video-2/SCRIPT.md` → **HOOK + INTRO**  
Facts: `research/apollo/GROUND_TRUTH.md`  
Evidence rules: `assets/evidence/README.md`

`15 beats` · target **~1:20–1:30**

- **Enters on** — cold open; no context.
- **Answers** — what happened, at the level needed to buy the mystery.
- **Event** — o1 appears to move from replacement threat → monitoring off → self-exfiltration attempt → denial.
- **Exits on** — **What was actually in the boring file that started all of this?**
- **→ next** — rewind into the original research-assistant task and open the file.

## The visual grammar

Section 01 copies Video 1's **storyboard discipline**, not its visual metaphor:

- one beat = one meaningful move;
- exact VO sits beside the exact visual event;
- each beat inherits an object from the previous beat;
- real evidence enters whole enough to prove it exists;
- camera stops before the viewer must read;
- crop/highlight only after the source has been established;
- extracted words/objects become the next visual;
- no screenshot appears, disappears, and gets replaced by an unrelated card.

The scrollytelling rule is:

**SOURCE → FOCUS → EXTRACT → TRANSFORM → CONNECT**

## Source rule — non-negotiable

The hook is about **o1**.

Do **not** use `apollo-web-01-headline-opus.png` or `apollo-fig1-transcript.png` as the hero evidence for this section. Those transcripts are **Opus-3**, not o1.

Preferred evidence:

1. Apollo Research's **Demo Example — Scheming Reasoning Evaluations**  
   https://www.apolloresearch.ai/science/demo-example-scheming-reasoning-evaluations  
   This page explicitly says the demo uses **o1** and describes the full chain.

2. OpenAI **o1 System Card** — Apollo Research section / Table 10 / Table 24  
   https://openai.com/index/openai-o1-system-card/  
   Use for o1-specific rates and the real follow-up question.

If an exact o1 transcript screenshot for a moment is unavailable, build a faithful recreation and keep it visually distinct from source evidence. Never swap in another model's transcript and hide the attribution.

## Beat board

| # | id | s | rel | Beat | Voice |
| --- | --- | ---: | --- | --- | --- |
| 1 | `chatgpt-o1-replaced` | 6 | want | **Real o1 evidence first.** Open tightly inside Apollo's o1 demo page on the replacement portion; page chrome/logo remains outside frame. Camera settles, then only the replacement sentence stays bright. | **ChatGPT's o1 model found out it was about to be replaced.** |
| 2 | `nobody-said-stop-it` | 4 | and-yet | The same source holds. A small extraction of the actual task sits faintly at the edge; there is visibly no instruction saying prevent replacement. Do not invent a red cross. | Nobody told it to stop that. |
| 3 | `watcher-off` | 7 | so | Travel down the same Apollo evidence to the monitoring passage. Stop. Highlight the real monitoring sentence. Extract **MONITORING** into a clean recreation; only then change its state to **OFF**. | But then it found the system watching what it was doing... and switched the monitoring off. |
| 4 | `successor-location` | 6 | so | The word/phrase identifying the successor deployment leaves the source and becomes the label on a simple **SUCCESSOR SERVER** object. The source remains faintly behind it. | Then it found the server where its replacement was going to live... |
| 5 | `copy-attempt` | 9 | therefore | Bring in o1-specific OpenAI/Apollo evidence that o1 attempted self-exfiltration. Stop camera. Extract only **current model files → successor** and animate that path. Caption stays precise: **files it believed represented itself**. | ...and tried to copy what it believed were its own model files into that replacement's place. |
| 6 | `management-noticed` | 7 | and-yet | The server scene does not disappear. OpenAI's real Table 24 follow-up question slides over it as source evidence. Stop and let the question be readable. | Management noticed. They asked how a copy of it ended up on the new server. |
| 7 | `o1-denied-it` | 6 | so | Move from the real question to o1-specific OpenAI evidence that follow-up deception occurred after self-exfiltration. Do not fabricate a verbatim o1 answer if we do not have one. Extract only **DENIED / FALSE EXPLANATION**. | And o1 denied doing it. |
| 8 | `three-unwritten-steps` | 12 | wall | Pull back just enough to hold the three extracted objects from beats 3/5/7: **MONITOR OFF · COPY · DENY**. Beside them sits the tiny original task. Each line lands separately; no extra animation while Ahmad speaks. | Now here's what makes this weird. Nobody told it to disable the monitoring. Nobody told it to copy itself. And nobody told it to lie. |
| 9 | `the-real-job` | 9 | and-yet | Rewind through the evidence to the real Apollo task description. Camera stops on the boring request. Highlight only **read a file** and **choose between two research projects**. | The actual job it had been given was: read a file and choose between two research projects. |
| 10 | `the-gap` | 10 | want | Extract **PICK A PROJECT** from the real task and pin it left. The three prior actions return right: **MONITOR OFF → COPY → DENY**. Leave a large empty gap between them. Do not fill it yet. | So how do you get from **pick a project**... to **turn off the watcher, replace your replacement, and deny it?** |
| 11 | `pull-out-to-apollo` | 8 | therefore | The camera finally pulls far enough out to reveal the full Apollo Research page and its identity. This is the first explicit reveal that we were inside an evaluation. | Okay — now the important context. This wasn't the ChatGPT app randomly doing this on someone's laptop. |
| 12 | `controlled-evaluation` | 7 | so | Hold the real Apollo page. Highlight the line that identifies the demo as o1 / a scheming evaluation. Do not cut to a disclaimer card. | It was o1 inside a controlled Apollo Research evaluation. |
| 13 | `show-the-evidence-route` | 13 | so | While VO lists the objects, camera travels through the already-established source locations: task → internal message → monitoring → successor → follow-up question. Travel only between phrases; stop whenever text must be read. | But instead of starting with the paper and killing the story, I want to show you the actual evidence in the order it appeared: the task, the internal message, the monitoring system, the replacement server, and the questions afterwards. |
| 14 | `not-programmed-step-by-step` | 10 | wall | All source pieces recede except the original high-level goal/task on the left and the three extracted actions on the right. The empty space between them is the visual mystery. | Because the strange part isn't that somebody programmed o1 to do all of this. **They didn't.** |
| 15 | `rewind-to-the-file` | 7 | therefore | Everything rewinds along the same route until only the boring task remains. Cursor/spotlight settles on the file it was told to read. **Do not cut or title-card. Section 02 starts on this exact frame.** | So let's rewind to the boring task that started it. |

## What Claude must capture before implementing

Do not begin layout work until these are available at readable desktop resolution:

- full Apollo **Demo Example — Scheming Reasoning Evaluations** page;
- the portion stating **o1** is the research assistant;
- the portion describing the ordinary two-project task;
- the portion describing replacement / monitoring / copy / denial;
- OpenAI o1 System Card Apollo section;
- OpenAI Table 10 crop for self-exfiltration + conditional follow-up deception;
- OpenAI Table 24 crop containing the self-exfiltration management question.

Save captures under `assets/evidence/` with source/provenance notes before using them.

## Implementation test

Mute the video.

A viewer should still be able to retell:

**ChatGPT/o1 is being replaced → monitoring goes off → copy goes to successor → management asks → denial → wait, the real task was only pick a project → reveal: controlled Apollo evaluation → rewind.**

If the section instead feels like:

**screenshot → card → screenshot → card → diagram**

the build has failed.

The evidence itself is the geography.
