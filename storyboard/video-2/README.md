# Video 2 storyboard

Rewritten **2026-09-21**, against the 246-component library.

## The boards

| file | section | beats |
| --- | --- | ---: |
| `SECTION_01.md` | the incident, then rewind | 15 |
| `SECTION_02.md` | the boring task becomes a problem | 13 |
| `SECTION_03.md` | the technical trail | 11 |
| `SECTION_04.md` | turn off the watcher | 9 |
| `SECTION_05.md` | replace the replacement | 12 |
| `SECTION_06.md` | follow-up denial, and the rates | 14 |
| `SECTION_07.md` | the room was built for this | 12 |
| `SECTION_08.md` | instrumental explanation | 11 |
| `SECTION_09.md` | the final payoff | 10 |

**107 beats.** `STORYBOARD.md` is the master index, the film-wide visual law,
and the component ledger.

## Other authorities

- `STORY_SPINE.md` — thesis and factual red lines
- `../../video-script/video-2/SCRIPT.md` — canonical narration
- `../../research/apollo/GROUND_TRUTH.md` — factual authority
- `../../assets/evidence/README.md` — evidence provenance
- `../../art-direction/VIDEO_2_INCIDENT_REPLAY.md` — visual identity
- `../../skills/BEAT_GRANULARITY.md` — what a beat is allowed to do

## What the `Draw` column is

Every beat names the components it is built from. **130 distinct components are
placed across the nine boards**, against 20 actually used by the two built
sections — so the column is a build instruction, not an annotation.

A beat with an empty `Draw` column is a beat nobody has designed.

## Build rule

Do not implement a later section as an isolated page.

**Every section's last frame is the next section's first frame.** The film
should feel like one continuous investigation, not nine chapters. Three
hand-offs are load-bearing and named in the boards:

- §3 → §4 opens on the *same* config line, same size, same position;
- §4 beat 8 leaves a gap that §9 beat 7 fills, in the same composition;
- §5 → §6 is the only permitted hard cut, because the publisher changes.

## Timings are generated, not written

The `s` column in each board is the `secs` value from that section's built
`beats.ts`. They were hand-written once and drifted — a board rewrite copied
§1's old numbers and disagreed with the code on eleven of fifteen beats.

**If a board and the build disagree, the build is the film.** Re-sync by
reading `secs` out of `beats.ts` and keying on the beat `id`, never on the row
order or the beat number.

## Where the runtime actually is

| | |
| --- | ---: |
| narration | 1,265 words |
| spoken at 150 wpm | 8:26 |
| boarded runtime | 11:03 |
| deliberate silence | ~2:35 |

The film is not padded. A quarter of it is holds — the memo, the denial, the
`<1%`, the beat of black before the sources — and those are the frames the
whole thing depends on. To shorten it, cut narration.

## Checking the hand-offs

`node scripts/continuity.mjs` (with `npm run preview` up) plays every section
to its last beat, opens the next one, and reports any object that moves more
than 24px across the boundary.

It must **play** the beats, not scrub them. `director.tsx` rebuilds the scene
from `initial` on every render and only applies the staged commands that are
due at `elapsed`, so a section stepped through faster than its stages is in a
genuinely different state from one that played. A first version pressed through
at 340ms a beat and reported three hand-offs broken; all three were fine.

Two real breaks it did find:

- §2's carried objects were initialised already parked in §3's corner, so they
  teleported across the boundary instead of travelling there;
- §7's face camera vanished at §8 beat 1, making the question and its answer
  look like two different films.

## Known gap: the Compose module is unused

`Solo`, `Pair`, `Parked`, `LayAside`, `LayFooter`, `Host` and `Triptych` are
built and referenced throughout these boards, and **no section calls them**.
Every frame is positioned by hand.

Every overlap bug caught during the build was hand-placed objects colliding —
which is what `Compose` exists to prevent. Adopting it is open work.

## Staged reveals are in **milliseconds**

`beats.ts` → `stages: [{ at, commands }]`. `at` is milliseconds, matching
Video 1 (`at: 6200`, `at: 26000`) and the `Beat` type's own comment.

Every stage in Video 2 was written in **seconds** — `at: 1.6`, `at: 4.6` — and
`director.tsx` compares `stage.at <= elapsed` where `elapsed` is
`performance.now() - started`, in ms. So `1.6ms` elapsed almost immediately and
**every staged reveal in all nine sections fired within about two milliseconds
of its beat starting.**

Nothing looked broken, which is why it survived a full build: each beat still
reached its correct end state, just instantly. What was lost was all the timing
— the command that returns after the narration finishes, the gap that fills on
the word "filled", the chain landing one pictogram at a time.

94 offsets converted. If you add a stage, write milliseconds.

There is a second, related trap in `director.tsx`: `elapsed` seeds the beat
clock and the per-beat effect that resets it runs *after* the first render. It
used to seed `Infinity`, so on mount every stage of a section's opening beat
was already due — a section whose first beat staged anything could never show
its entry frame. It seeds `0` now.

## Do not step sections with ArrowRight

The director holds a lock so a fast press cannot skip a staged reveal. While
the stage offsets were wrong the lock released instantly and a 1.2s stepper
worked; with real millisecond offsets it swallows presses, and any tool that
assumes one press is one beat silently reads the wrong beat.

Use the rail. Its ticks call `jump`, which bypasses the lock on purpose, and
`data-now` says where you actually landed. Both scripts do this:

```
npm run preview -- --port 4180
node scripts/frames.mjs 06        # every beat of §6, each shot after its own stage span
node scripts/frames.mjs 06 13     # just beat 13
node scripts/continuity.mjs       # every hand-off
```

## The existing checks work on this film now

Video 1 shipped with a verification suite and none of it had ever been pointed
at Video 2. Every script took one hardcoded root; they now take `VIDEO`, which
defaults to Video 1 so nothing existing changed.

```
npm run verify:v2            # types, flow, build, overlap
npm run check:flow:v2        # beat-to-beat faults
npm run check:overlap:v2     # actors drawn on top of each other
npm run check:continuity     # section hand-offs (needs preview running)
```

`check:overlap` is the one that matters. It measures **leaf ink**, not bounding
boxes, and it found three real collisions in a film I had already gone through
frame by frame with my own eyes — §5's bay wall parked on the evidence page,
§6's thread over the page and off the right edge, §6's two survivors on the
table. It also caught the three back-to-back `wall` beats that `check:flow`
reports, which no amount of looking would have shown.

Deleted: a `frames.mjs` I wrote here before finding `capture-frames.mjs`, which
already did the same job and better.
