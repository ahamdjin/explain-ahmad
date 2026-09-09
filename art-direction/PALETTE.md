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

## Colour by job — `ROLE` in `palette.ts`

Orange used to be doing eight different jobs at once: selection, attention,
counting, current position, rings, pills, sparks and general emphasis. That is
why the whole app read orange — **a hue that means everything means nothing.**

Each role now owns a hue, and a component asks for the role, never the colour.

| Role | Hue | Job | Example |
| --- | --- | --- | --- |
| `ink` | near-black | the default. Most handwriting. | `280 doing nothing` |
| `measure` | blue | numbers, counts, the machine's own state | the 336 counter, every number row |
| `pick` | teal | chosen, active, running | the eight lit experts, `it fits`, the current floor |
| `relate` | purple | connections — attention, "because of that" | the attention arcs, the focus word |
| `cost` | red | a contradiction, or a cost | `≈ 8 GB`, the carrying bar, the vacated chairs |
| `claim` | orange | **only** where the efficiency claim is pointed at | `"efficient"` in §1 and §8 |

**Orange appears three times in the finished video.** That restraint is what
makes it land when it does. If you find yourself reaching for it for anything
else, the answer is a different role — or `ink`.

Notes default to `ink`. Reach for a role only when the note is doing that role's
job; a coloured note that means nothing in particular just adds noise.

## What each group is for

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
