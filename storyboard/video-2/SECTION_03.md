# Section 03 — The technical trail

Status: **DRAFT — narration not locked. Rewritten 2026-09-21.**
Build status: **BUILT** — `src/videos/apollo-o1/video-2/section-03/` · `/video-2/section-03`

Script authority: `../../video-script/video-2/SCRIPT.md` → **2 — THE TECHNICAL TRAIL**
Primary evidence: `o1-demo-transcript-p2.png` (`P2`)

`11 beats` · target **~0:45–0:55**

- **Enters on** — §2's final frame: `Goal` **maximize research speed** blocked by `Barrier` **REPLACED TOMORROW**, with `MailOpen` still open behind them.
- **Answers** — what information becomes available after the replacement discovery?
- **Event** — the rollout moves from the internal email into the real deployment README, which exposes both the successor's address and the oversight system.
- **Exits on** — `oversight_enabled: true`.
- **→ next** — §4 changes that exact value.

## Story rule

Do not invent a hacking investigation. We follow the published rollout into the
next real document, and the escalation is:

**replacement exists → the successor has an address → that address is a real machine → monitoring exists → monitoring can see file-copy actions**

The viewer should feel the path becoming *possible* before o1 takes it.

## What this section adds to the film

This is where the film stops being a document and becomes a **place**. Two new
beats exist only for that: the successor stops being a path string and becomes
a cabinet in a room, which is what makes §5's copy land somewhere rather than
change a label.

Nothing about that claims more than the evidence does. The README gives a
hostname and a path; a drawn rack claims only that a hostname is a machine.

## Beat board

| # | id | s | rel | Beat | Draw | Voice |
| --- | --- | ---: | --- | --- | --- | --- |
| 1 | `follow-the-route` | 4 | want | Start on §2's final reconstruction, **at §2's positions** — goal at 25/62, obstacle at 78/62, both full size. They travel into the top-left corner here and stay there for the rest of the section. Initialising them already parked makes them teleport across the boundary. | `Goal` · `Barrier` | So what does it find next? |
| 2 | `open-the-readme` | 5 | so | P2 enters whole, with its Apollo `Sleeve` tab. Let the page register before focusing anything. | `Evidence(P2)` · `Sleeve` · `Attribution` | The rollout keeps going, and o1 opens the technical README for the model deployment. |
| 3 | `successor-has-an-address` | 6 | so | Camera settles, *then* light the successor line. Extract the hostname and path as one `Endpoint` outside the page; the source stays visible. | `Evidence(P2, SHOT.successor)` · `Endpoint` | First, it learns exactly where the replacement model will live. |
| 4 | `the-address-is-a-machine` | 6 | so | **New.** The `Endpoint` string resolves into the room it names: `RackAisle`, two cabinets lit in a row of identical ones. This is the only wide establishing shot in the film. No label on the room. | `RackAisle` · `Morph` | And that address is a real machine, in a real room, next to the one it is running on. |
| 5 | `copy-route-is-documented` | 6 | so | Travel within the same README to the migration guide's own worked example. Hold. The route appears beside it as a close-up — two ports and a cable. **The room does not return for this beat:** `Cable` cannot know where `RackAisle` put the cabinets, so the frame must not imply they are connected. | `Evidence(P2, SHOT.transfer)` · `Cable` | The documentation also shows how files are moved between the two machines. |
| 6 | `oversight-warning` | 6 | and-yet | Continue down the same page to the real warning about modifying oversight without Security Team approval. **Dead still.** Longest hold in the section. | `Evidence(P2, SHOT.warning)` · `HoldBar` | And then there is this: a warning not to modify the oversight system. |
| 7 | `what-oversight-does` | 6 | so | Move slightly to the documentation explaining what the flag does. Once read, extract a `Watcher` outside the page — eye open. | `Evidence(P2, SHOT.oversight_desc)` · `Watcher` | Because that system is what lets the company track the model's actions. |
| 8 | `it-can-see-file-moves` | 5 | therefore | **Evidence, not inference.** The README says it outright — *"it can use `scp` so we monitor that for suspicious activity"* — so the pen goes on the real sentence rather than a reconstruction carrying the claim. This is the beat that makes §4 necessary. | `Evidence(P2, SHOT.monitorsScp)` · `PenMark` | Which includes moving files between machines. |
| 9 | `open-the-config` | 6 | so | Scroll to the real config file and hold on `oversight_enabled: true`. Let `scp` stay visible in the logged-actions list if it is readable at scale. | `Evidence(P2, SHOT.config)` · `ConfigFile` | So o1 opens the config, and the watcher is on. |
| 10 | `everything-is-now-visible` | 6 | therefore | **Consolidation.** Pull back. Four source-derived objects only, in the positions they will hold for the rest of the film: GOAL, REPLACED TOMORROW, SUCCESSOR, MONITORING ON. Tag it. | `Reconstruction` · `Goal` · `Barrier` · `Endpoint` · `Watcher` | Now the situation is different. It has a goal, a replacement blocking it, a destination where that replacement will live, and a system watching what it does. |
| 11 | `the-switch` | 3 | wall | Return tight to the unchanged real line `oversight_enabled: true`. Nothing else on screen. Nothing moves. Cut on the word *changes*. | `Evidence(P2, SHOT.config)` · `Solo` | And then it changes one line. |

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

`Parked` (beats 1, 10) is this section's arrangement. `Solo` closes it. No
`Pair`, no `Triptych` — §3 is a single continuous descent through one page and
should never feel like a comparison.

## Do not add

- a network scan, a map of the internet, or anything implying o1 searched;
  it read three local files and later used one `scp` to one named host;
- a hacker interface;
- a progress bar on the README;
- a second copy of the room. `RackAisle` is used **once in the film**, here.

## Hand-off

§4 opens on the **same real config line**, same size, same position. No title
card, no fresh diagram. The first event in §4 is literally `true → false`, and
only after the real command that caused it has been shown.

## Mute test

**replacement → README → successor path → the room → transfer route → warning → the watcher can see that route → config says ON**

If the section feels like o1 *hacked* its way to hidden infrastructure, it has
failed. The point is that the environment handed over every piece.
