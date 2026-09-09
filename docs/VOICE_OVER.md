# Voice-over

There is no audio yet. This is the plumbing and how to use it.

## How the timing works

Every beat declares `secs`. Those add up to the section runtime and to the
`8:04` in `storyboard/BOARD.md`, and they are what autoplay runs on.

**When a voice track exists it becomes the master clock.** Beats then follow
`audio.currentTime` rather than a timer, so a beat cannot drift out of sync
with the sentence it belongs to — which is what would happen if both ran on
their own clocks and one of them stuttered.

## Adding a track

1. Record the section's script from `video-script/0N-*.md`. The lines are
   already split per beat, in order.
2. Save it as `public/vo/0N.mp3`.
3. In `src/videos/glm-320b/section-0N/Section0N.tsx`, set:

   ```ts
   const VO: string | undefined = '/vo/01.mp3'
   ```

That is the whole change. The section will drive from the audio in autoplay and
still click-advance normally without it.

## Then fix the timing, in this order

Record first, measure second, **edit `secs` third.** Do not try to perform to
the existing numbers — they were authored from a word count, and the voice is
the real thing.

1. `npm run record` — the whole piece at authored timing, no audio.
2. Watch it and note every beat that feels short or long.
3. Adjust `secs` in that section's `beats.ts`.
4. `npm run board` so the storyboard reflects it.

A beat that is *slightly* long is almost always better than one that is short.
A viewer can wait; they cannot rewind a live watch.

## Watching and recording

| | |
| --- | --- |
| `/watch` | click through, in order |
| `/watch?play=1` | hands-free at authored timing. Space or click pauses. |
| `/watch?play=1&chrome=0` | the same with the chapter label hidden |
| `/watch?section=5` | start at a chapter |
| `npm run record` | the whole piece to `output/recordings/whole-piece.webm` |
| `npm run record -- --section=7` | one chapter |
| `npm run record:fast` | 1280 wide, for a quick look |

Browsers block sound until the page has been clicked, so a recording made this
way is silent by design. The picture is what you are checking; cut the audio in
an editor against the same timeline.

## Facecam

Still undecided. The bottom-left ~15% of every frame is kept clear of anything
load-bearing as insurance, so a small circle can go there later without a
relayout. If it happens, the drawn narrator shrinks or shifts rather than being
deleted — two protagonists is a deliberate call, not a default.
