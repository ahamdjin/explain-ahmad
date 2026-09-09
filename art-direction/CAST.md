# The cast

Who is allowed on screen, and what each figure means. Colour lives in
`art-direction/PALETTE.md`; this is people.

`src/paper/cast/Narrator.tsx` · see them all at `/paper`

## Two axes, never mixed

- **pose** — what they are *feeling*. `wonder point think hopeful cheer push nod`
- **style** — who they *are*. `plain me vendor engineer analyst`

Any style holds any pose. Casting a different person into an existing beat
costs one prop and no new drawing.

## Nobody carries a hue

Every figure is ink line plus paper fill. Hair is filled with a paper tone,
never an accent.

The palette's hues are all spoken for — teal is the word, blue is a
measurement, red is a cost — so a character tinted with one of them would read
as *being* that thing. **People are drawn; only mechanisms are coloured.**

## The five

| style | who | when |
| --- | --- | --- |
| `plain` | the viewer's proxy — asks, never explains | the default, and most of the run |
| `me` | the host — the only figure allowed an opinion | opening a claim, delivering a verdict |
| `vendor` | the claim — says "efficient" and moves on | wherever the claim is *made* rather than tested |
| `engineer` | the one who tries to actually run it | wherever a plan is attempted |
| `analyst` | reads the numbers back | wherever a figure has to be checked |

A style with no job is decoration. Don't add one.

The lanyard is the entire characterisation of `vendor`: whoever wears one is
speaking for an organisation rather than for themselves.

## Editing `me`

`me` is the custom likeness. Four fields decide it, in `NARRATOR_STYLES`:

```
hair:    'curls' | 'wave' | 'crop' | 'bun' | 'none'
beard:   'full'  | 'stubble' | 'none'
glasses: true | false
garment: 'hoodie' | 'collar' | 'tunic'
```

Change those and look at `/paper`. Changing anything else means redrawing.

## What the frames taught

Every one of these was invisible in the source and obvious in a screenshot.
That is the whole argument for `/paper`.

- **Hands must be round.** A filled circle survives being small on screen; a
  16-unit line reads as a ladder or a flag. (`push`)
- **Hair needs a filled base under the curls.** Circles alone read as a laurel
  wreath, because paper shows between them.
- **A hairline at eye level reads as a bowl cut.** Keep it up on the forehead.
- **The beard cannot be a filled mass.** The hair is already a filled mass in
  the same tone, so filling the lower face too leaves the head light only in a
  band across the eyes — a balaclava. Hatched ink separates the two by *value*.
- **Even hatching reads as a sunburst.** Jitter both the angle and the length,
  off a fixed hash so screenshots stay comparable.
- **Glasses do not move with the eyeline.** The eyes shift inside the frames.
  That is what makes a glance read as a glance rather than a turn of the head.
