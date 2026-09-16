# Voice-over

There is no audio yet. This is the plumbing and how to use it.

## How the timing works

Every beat declares `secs`. Those add up to the section runtime and to the
**29:45** in `storyboard/video-1/BOARD.md`, and they are what autoplay runs on.

The current numbers were set from a word count at 145 words per minute plus
about a second of air, which is why `npm run timing` reports 73% talking and no
beat that cannot be said. That is a *floor*, not a performance: it guarantees
the line fits, and nothing more.

**Regenerate before trusting either figure.** `npm run board` writes BOARD.md
and `npm run timing` reads the build; this file said 21:39 and 76% against a
189-beat build that runs 29:45 at 73%, because the numbers were typed once and
the build grew underneath them.

**When a voice track exists it becomes the master clock.** Beats then follow
`audio.currentTime` rather than a timer, so a beat cannot drift out of sync
with the sentence it belongs to — which is what would happen if both ran on
their own clocks and one of them stuttered.

## Adding a track

1. Record from **`video-script/video-1/READ_ALOUD.md`** — the whole video in one
   document, every line with the timecode it starts at, the place the beat
   leaves you in, and the event the line is describing. That last column is the
   one to watch while reading: you are describing what is on the screen, never
   the other way round.

   The per-section scripts (`video-script/0N-*.md`) hold the contract, the
   board and the truth notes. They are for building, not for reading aloud.
2. Save it as `public/vo/0N.mp3`.
3. In `src/videos/glm-320b/video-1/section-NN/SectionNN.tsx`, set:

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
4. `npm run board && npm run readthrough` so both generated documents reflect
   it. They read `secs` out of the beats, so they cannot disagree with the
   build — but they will not update themselves.

**Record §1 and §2 before building anything further onto the timing.** There
are 164 beats; setting `secs` from a word count and then again from the real
voice is doing it twice. Two sections is enough to learn your actual pace, and
the rest can be authored to it.

A beat that is *slightly* long is almost always better than one that is short.
A viewer can wait; they cannot rewind a live watch.

## Getting an actual file out — `npm run render`

**`npm run record` produces silent video.** Playwright captures the page but
not its audio, so the webm has no sound whether or not `VO` is wired into the
section. That is a quiet trap: the browser plays the voice while it records,
you hear it, and the file has nothing in it. Nothing in the repo said so and
nothing joined the two halves back up, which is why this section exists.

    npm run record              # silent video → output/recordings/*.webm
    npm run render              # + public/vo/NN.mp3 → output/video/*.mp4
    npm run render:join         # …and one output/video/video-1.mp4

`render` muxes with `-shortest`, so a take ends at the shorter of picture and
voice rather than freezing on a last frame or running out of picture. **If the
two lengths differ by much, that is the signal to edit `secs`** -- see "Then fix
the timing" above. A section with no voice track is still rendered, silent, and
named in the output, because a missing take should be visible rather than
skipped.

Needs `ffmpeg` on the path. The join uses the concat demuxer and `-c copy`, so
there is no second encode and no generation of loss.

## Looking at every frame at once

`npm run frames:export` captures all 189 beats and writes them to
**`~/Desktop/explain-ahmad-frames/`**, with one `index.html` covering the whole
thing — every frame in order, each with its beat number, its title, the line
said over it, and the timecode it starts at. One page, scrolled top to bottom,
is the closest a folder of stills gets to watching the video.

It lives outside the repo on purpose. The in-repo `frames/` directory is
working output: `npm run frames:all` deletes and rewrites it every time a
section is recaptured, so anything you annotate or send from there is one
command away from being wiped.

    npm run frames:export                       # capture fresh, then export
    npm run frames:export -- --reuse            # export what is already in frames/
    npm run frames:export -- --out=~/Pictures/x # somewhere else

Re-run it after any visual change. Every frame in that folder is only as
current as the last capture, and a stale frame gets reviewed and believed.

## Watching and recording

| | |
| --- | --- |
| `/watch` | click through, in order |
| the dots at the bottom | one per section — click to jump. A ring marks where you are |
| the rail above them | one tick per beat, width proportional to its length. Click to land on it |
| <kbd>Home</kbd> / <kbd>End</kbd> | first and last beat of the section you are in |
| `/watch?play=1` | hands-free at authored timing. Space or click pauses. |
| `/watch?play=1&chrome=0` | **for recording** — hides the chapter label, the dots and the rail |
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
