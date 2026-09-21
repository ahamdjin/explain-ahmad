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
