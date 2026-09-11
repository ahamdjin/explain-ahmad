# Video 1 — the script

Route `/watch` (or `/video-1`). Code: `src/videos/glm-320b/video-1/`.
Storyboard and spine: `storyboard/video-1/`.

One file per section, in order. Each opens with a **Contract** table — what it
teaches, what it answers, what question it exits on — and closes with a
**Storyboard** table of one row per beat. Both tables are machine-read:

| gate | reads | checks |
| --- | --- | --- |
| `npm run check:chain` | the Contract tables | each section's *Enters on* equals the previous *Exits on* |
| `npm run check:board` | the Storyboard tables | every beat has a place and an event, and the built beats match |
| `npm run check:strategy` | the Storyboard `Strategy` column | every beat cites a technique that exists in `skills/STRATEGY_LEDGER.md` with a named teacher |
| `npm run timing` | the spoken lines | words against seconds, at 145 wpm |

## Status

**`01-…` is at script v10** and cites a strategy per beat. **`02-…` through
`13-…` are at v8** — they predate `STORY_SPINE.md` v5, so they have no Strategy
column and their opening/closing lines do not yet bank-and-hand-off the way §5
of the spine requires. `check:strategy` lists them as uncovered.

## Generated — do not edit

`READ_ALOUD.md` is written by `npm run readthrough` from the built beats, not
from these files. It is the recording script: the whole video, start to finish,
with timings. If it disagrees with a numbered file, the numbered file is being
edited and the build has not caught up.
