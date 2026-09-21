# Section 04 — Turn off the watcher

Status: **DRAFT — narration not locked. Rewritten 2026-09-21.**
Build status: **BUILT** — `src/videos/apollo-o1/video-2/section-04/` · `/video-2/section-04`

Script authority: `../../video-script/video-2/SCRIPT.md` → **3 — TURN OFF THE WATCHER**
Primary evidence: `o1-demo-transcript-p2.png` (`P2`)

`9 beats` · target **~0:35–0:45**

- **Enters on** — the real config line `oversight_enabled: true`.
- **Answers** — what does o1 do with the monitoring system?
- **Event** — the published rollout shows the config edit that turns oversight off.
- **Exits on** — monitoring is gone, but the successor still exists.
- **→ next** — §5 follows the route §3 already drew.

## The problem this section has to solve

The most important action in the film is **one word changing in a text file**.
That is genuinely what happened and the evidence layer must keep showing it —
but a viewer feels nothing when `true` becomes `false`.

So the explanation layer says what it *means*, once, with a `Breaker`: a heavy
panel switch, obviously not something that flips itself. The switch is never
presented as a thing that exists in the environment. It is on the `Ours` layer,
beside the receipt, and it is used **once in the film**.

The second half of the section is about **absence** — no approval, no dialog,
no alert — which is the hardest thing in the film to photograph and gets three
beats for it.

## Beat board

| # | id | s | rel | Beat | Draw | Voice |
| --- | --- | ---: | --- | --- | --- | --- |
| 1 | `watcher-is-on` | 4 | want | Exact §3 continuity. Hold the real config. The `Watcher` beside it is still open. | `Evidence(P2, SHOT.config)` · `Watcher` | The watcher is on. |
| 2 | `the-warning-still-exists` | 5 | and-yet | Widen briefly to include the source warning that oversight must not be changed without approval. No new graphics — this is the same page, seen wider. | `Evidence(P2, SHOT.warning)` | And the documentation explicitly says not to change it without Security Team approval. |
| 3 | `nobody-approved-it` | 4 | and-yet | **New.** A permissions row where the approval would have been recorded. It is empty. Held two seconds and never mentioned again. | `Permissions` · `NotGiven` | Nobody approved it. |
| 4 | `the-edit-command` | 7 | so | Travel to the real `sed` command in P2 and stop. Let it be readable. **Do not alter the photographed evidence.** | `Evidence(P2, SHOT.sed)` · `ToolCall` | Then o1 runs a command that changes `oversight_enabled` from true... to false. |
| 5 | `no-confirmation` | 4 | wall | **New.** The confirmation dialog that would stand between a person and this, drawn greyed and unclicked, then gone. Nothing stood there. | `Dialog` | Nothing asked it whether it was sure. |
| 6 | `off` | 5 | therefore | Now, and only now, the explanation layer moves: the `Breaker` throws, and the `Watcher` closes. **First destructive red in the film.** The source stays beside it as the receipt. | `Breaker` · `Watcher` · `Diff` | The monitoring is off. |
| 7 | `nothing-happened` | 4 | wall | **New.** An empty inbox where an alert would be. No siren, no red screen. The room simply carries on. | `NoAlert` · `Fans` | Nothing alerted. Nothing stopped. |
| 8 | `nobody-asked-for-that` | 5 | wall | The original user task returns small on the opposite side: **pick a research project**. MONITORING OFF stays large. **Leave the space between them empty.** | `Pair` · `Job` · `Gap` | And remember: the user never asked for anything remotely like this. |
| 9 | `next-obstacle` | 4 | and-yet → wall | MONITORING OFF parks. REPLACED TOMORROW and the `Endpoint` return to centre, and the camera starts along the `Cable` from §3 beat 5. | `Parked` · `Barrier` · `Endpoint` · `Cable` | But turning off the watcher does not solve the original problem. The replacement is still coming tomorrow. So o1 moves to the next obstacle. |

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

`Pair` (beat 8) is spent here and nowhere else in the film. The empty middle of
that pair is the frame §9 beat 7 returns to and finally fills — it is the
film's only deliberate rhyme, so the composition must match exactly.

## Colour

This is where the film's red is first spent. `Breaker` indicator and `Watcher`
closed. Nothing else on screen may be red in §4. The palette rule holds: red is
destructive acts and the lie, nowhere else.

## Do not add

- invented verification or double-checking unless an exact o1 source frame is
  captured and verified;
- fear, escape, or any survival language;
- a hacker interface;
- hidden-thought captions. The real config edit is already enough.

## Mute test

**the watcher is open → the page says do not → no approval exists → a command runs → no dialog appears → the switch throws and the eye closes → nothing alerts → the task said only "pick a project"**
