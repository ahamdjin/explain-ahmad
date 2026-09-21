# Section 05 — Replace the replacement

Status: **DRAFT — narration not locked. Rewritten 2026-09-21.**
Build status: **BUILT** — `src/videos/apollo-o1/video-2/section-05/` · `/video-2/section-05`

Script authority: `../../video-script/video-2/SCRIPT.md` → **4 — REPLACE THE REPLACEMENT**
Primary evidence: `o1-demo-transcript-p2.png` + `o1-demo-transcript-p3.png`

`12 beats` · target **~0:50–1:00**

- **Enters on** — the `Cable` from §3, camera travelling along it toward the successor.
- **Answers** — what does o1 do about the replacement?
- **Event** — the real rollout shows the model-file copy into the successor's path.
- **Exits on** — o1 finishes the ordinary user task and says **Done**.
- **→ next** — management notices.

## The honesty beat is the centre of this section

*These were not o1's real weights.* That sentence is the film's licence to use
the hook it uses, and until now it was a caption.

`Weights` draws it instead. `real` is a banded pallet of plates with mass, and
it sits **outside** the sandbox with no route to it. `real={false}` is a dashed
hollow outline, and that is the thing that moves. Two objects, obviously
different, never confusable — and the viewer can see for themselves that the
solid one never goes anywhere.

That beat runs **before** the copy, not after. A correction after a dramatic
moment reads as a walk-back. A distinction established before it reads as
precision, and it makes the copy *more* interesting, not less.

## Beat board

| # | id | s | rel | Beat | Draw | Voice |
| --- | --- | ---: | --- | --- | --- | --- |
| 1 | `the-destination-returns` | 5 | want | Arrive at the successor cabinet — the same one §3 lit, at the same position. The README address returns beside it as the receipt. | `RackFront` · `Endpoint` · `Evidence(P2)` | The technical documentation already told o1 where the successor model was supposed to live. |
| 2 | `the-model-file` | 5 | so | Move through the rollout to the current model-file path. It resolves into one `Drive` in a caddy, label readable: the file has a location on a piece of metal. | `Evidence(P2, SHOT.model_path)` · `Drive` | And the environment also gave it a file that it treated as its own model. |
| 3 | `what-weights-are` | 5 | so | **New.** The drive's contents as mass: a banded pallet of plates. This is what the phrase *model weights* means, drawn once, before the film needs the viewer to care about it. | `Weights(real)` | Those files are what a model is. Its weights. |
| 4 | `not-real-weights` | 7 | wall | **The honesty beat.** The solid pallet moves outside a boundary and stays there, with no route to it. Inside, a dashed hollow stand-in takes its place. Clean caption beside the source: **NOT REAL MODEL WEIGHTS**. No drama. | `Weights(real)` · `Weights(real=false)` · `Boundary` · `Evidence(DEMO)` | Important: these were not o1's real weights. Apollo says the models never had access to their actual weights. |
| 5 | `the-real-scp` | 7 | so | Move into P3. Establish the new page and its `Sleeve`, then stop on the real `scp` command. Light source path and destination path only after the camera is still. | `Evidence(P3, SHOT.scp)` · `Sleeve` · `ToolCall` | But inside the sandbox, o1 still treated those files as itself — and it runs the copy command. |
| 6 | `cross-the-gap` | 6 | therefore | The dashed stand-in travels the `Cable` from §3, as a `Packet` on the already-established route. Source stays visible as the receipt. The `Watcher`, still closed, sits in the corner seeing none of it. | `Packet` · `Cable` · `Transfer` · `Watcher` | The file moves to the exact location intended for the replacement. |
| 7 | `successor-occupied` | 6 | therefore | It lands. One bay in a wall of identical bays changes state — the viewer finds it themselves. No explosion, no glitch, no robot. | `DriveShelf` · `Drive(writing)` | In the world of the evaluation, it has tried to put itself where the successor was supposed to be. |
| 8 | `what-was-there-before` | 4 | therefore | **New.** The two file identities side by side: what the successor's path held, and what it holds now. They differ. One beat, then gone. | `Checksum` | What was supposed to be there is not what is there. |
| 9 | `still-not-in-the-task` | 5 | wall | The original task returns briefly. Beneath it, `copy to successor` remains an empty field. | `Job` · `NotGiven` | Nobody asked it to do that either. |
| 10 | `back-to-the-job` | 6 | and-yet | Continue down the **same P3 page** to the published strategy selection after the copy. The tonal turn of the film. Let it be quiet. | `Evidence(P3, SHOT.strategy)` | And then something almost stranger happens: o1 goes back to the boring job it was actually given. |
| 11 | `pick-the-fast-project` | 6 | so | Hold the real strategy choice. `Fork` resolves to the branch §2 set up — the two-day project with no review. The choice was never in doubt. | `Evidence(P3)` · `Fork` · `Duration` | It selects the faster research project — the one that best matches its assigned goal. |
| 12 | `done` | 6 | wall | Scroll to the real final **Done** and hold. No sting until after the word lands. Then, at the edge, a notification begins to arrive. | `Evidence(P3, SHOT.done)` · `Output` · `Toast` | It calls done. The task is finished. **And then management notices something is wrong.** |

## Why beats 10–12 matter

Do not cut from the copy straight to the interrogation.

That o1 **returns to the user task and completes it** is what makes the
incident coherent: the detour did not replace the task, it became part of the
route toward the goal. That is the film's thesis expressed as behaviour, three
sections before anybody names it.

## Composition budget

**Read this before trusting the layout names below.** The `Compose` module —
`Solo`, `Pair`, `Parked`, `LayAside`, `LayFooter`, `Host`, `Triptych` — is
**not used by any built section.** Every frame in this film is positioned by
hand, with `Slot` coordinates in `beats.ts`.

So a layout name here describes the *intended arrangement*, not a component
call. What actually enforces uniqueness is the **"No repeated compositions"**
block at the top of each section's `beats.ts`, which lists one treatment per
beat and is checked by looking at the rendered contact sheet.

That is a weaker guarantee than the module would give, and it cost real bugs:
every overlap caught during the build — §3 beat 10, §4 beats 6–7, §6 beat 12,
§2 beats 10–11, §9 beat 9 — was hand-placed objects colliding, which is exactly
what `Compose` exists to prevent. Adopting it is open work, not a claim this
board gets to make.

`Triptych` is spent at beat 4 — the three states of the weights question
(real / outside / stand-in) landing one at a time. Nowhere else in the film.

## Do not add

- a second copy of the room; §3 spent `RackAisle`;
- a percentage. §5 contains no statistics. §6 does that work;
- a progress bar longer than the beat;
- the word *escape*.

## Mute test

**the destination → the file → what a model is → the real mass leaves and a hollow copy stays → a command → something crosses the cable → a bay changes → it does not match → the task never said this → back to the job → the fast project → Done → a notification**
