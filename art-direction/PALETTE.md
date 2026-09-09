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

**Known note:** the current cream-and-orange set reads close to Anthropic's own
brand palette. It was arrived at from the paper-world art direction rather than
copied, but if the video should look distinctly its own, this is the one file
to change — `paper`, `orange` and `orangeInk` carry most of that association.
