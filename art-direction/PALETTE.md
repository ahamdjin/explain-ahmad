# Palette

**Decided in one file: `src/paper/palette.ts`.** Browse it as swatches at `/paper`.

## Rules

1. **Never write a hex literal in a component.** Import `PALETTE` and use a name.
2. The CSS custom properties in `src/paper/paper.css` are **generated** from
   `palette.ts` by `npm run palette`. Do not hand-edit that block.
3. `ink` is the only near-black. Everything else is a wash, an object colour,
   or a line colour.
4. Accents come in three weights — `orangeWash` (fill), `orange` (object),
   `orangeInk` (line). Use the right weight for the job; do not tint by hand.

## One thing, one colour

The colour of a thing is part of what identifies it, so a viewer can track it
across eight sections without being told. **That only works if each hue means
exactly one thing.** The moment a hue picks up a second job it stops
identifying anything, and the whole piece reads as tinted.

This has been got wrong twice. First orange was doing eight jobs — selection,
attention, counting, position, rings, pills, sparks, emphasis. Then teal
inherited five of them. Both times the symptom was identical: the app looked
like one colour.

| Hue | Means | Where |
| --- | --- | --- |
| **ink** | structure, and every note not naming a coded thing | buildings, braces, most handwriting |
| **teal** | **the word we follow** | its card, the focus word in a sentence, where it is on the tower |
| **blue** | **anything measured** — numbers, counts, durations | number rows, the 336 counter, the work bar, the scoring sweep |
| **purple** | **connections** — attention, "because of that" | the attention arcs, leader lines between things |
| **red** | **a cost, or a contradiction** | the carrying bar, `≈ 8 GB`, vacated chairs, `same word / different numbers` |
| **orange** | **the efficiency claim, only** | `"efficient"` — **once**, at §13 beat 5. See below. |
| beige family | present but not participating | the 280, storage |
| the 8 expert hues | identity, and nothing else | one hue per expert, all one weight |

### Orange is down to one use, and that is worth a decision

This row said *"`"efficient"` in §1 and §8. Three uses in 8:04"*, which
describes the **superseded** 8-minute build. The video is 29:45 across 13
sections, and `grep -rn "tone: 'claim'" src/videos/glm-320b/video-1` returns
**one** hit: §13 beat 5.

It got there honestly — a review found orange misused as emphasis in §3, §4 and
§5 and those were reverted, leaving the one legitimate use standing. But one use
of a reserved accent in half an hour is not a motif, it is an accident the
viewer has no way to read.

**The open question:** the claim is *made* at §1 beat 4 — *"Everyone quotes that
number to say these models are cheap now"* — and *tried* at §13. A colour
reserved for a claim on trial has two obvious jobs and is currently doing one.
Either §1 beat 4 should carry it, or the reservation should be dropped and §13
should use ink. **Do not resolve this by adding orange somewhere convenient.**

### Two deliberate absences

**Chosen has no hue.** Selection is carried by *having colour at all* — a
chosen expert keeps its family colour and gains an ink ring, against neighbours
that are flat beige. Contrast does it better than a sixth accent would, and it
leaves teal free for the word, which needs it far more.

**Handwriting is ink by default.** A note takes a role's colour only when it
names that role's thing. Colour in a frame should come from the objects, not
from the labels — coloured labels everywhere is what made it noisy.

## The paper

A flat fill reads as a beige screen. What makes paper read as paper is three
things, all in `.s1-frame::after`, none of them animated:

1. **fibre** — fine directionless grain
2. **tooth** — a coarser soft mottle underneath it
3. **uneven light** — warm from the top left, cooling into the far corner

Plus an inset shadow on `::before`, because a sheet has edges. If the world
ever starts to feel digital, these are the knobs — not the hues.

## What each group is for## What each group is for

| Group | Job |
| --- | --- |
| `ink`, `graphite` | line and text. `graphite` is secondary text only. |
| `stone` | load, weight, pressure. Never text. |
| `paperWhite` → `paperShade` | the paper itself, lightest to warmest. Object fills. |
| `idle` → `idleDim` | present but not participating. The 280 experts nobody picked. |
| `orange*` | the thing being pointed at. Selection, emphasis, "this one". |
| `blue*` | numbers, measurement, the machine's own state. |
| `red` | a contradiction or a cost. **Never** a blocked path — nothing in this video is blocked. |
| `green`…`tan` | the expert family. One hue each, all the same weight. |
| `glow*` | warm light: something is on, a door is open. |

## The expert family

`EXPERT_COLORS` is eight hues at one weight, so a population of 288 reads as
one family. **Identity is a number, never a hue with a meaning attached** — an
expert is a learned feed-forward block, not a specialty, and colour-coding
"the maths expert" would be a lie the rest of the video has to walk back.

## Retheming

Edit `palette.ts`, run `npm run palette`, run `npm run frames:all`, and compare.
Because components hold names rather than values, that is the whole job.

**On the cream ground:** `paper` is still warm, which is what makes it read as
paper rather than as a screen. If the whole thing should feel less warm, that
one token is the lever — everything else is now cool or neutral.
