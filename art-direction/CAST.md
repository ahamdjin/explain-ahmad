# The cast

Who is allowed on screen, what each figure means, and what each pose is for.
Colour lives in `art-direction/PALETTE.md`; this is people.

`src/paper/cast/Narrator.tsx` · see every combination at `/paper`

## Two axes, never mixed

- **pose** — what they are *feeling*
- **style** — who they *are*

Any style holds any pose. Casting a different person into an existing beat
costs one prop and no new drawing.

## Nobody carries a hue

Every figure is ink line plus paper fill. Hair, caps and beanies are filled
with paper tones, never accents.

The palette's hues are all spoken for — teal is the word, blue is a
measurement, red is a cost — so a character tinted with one of them would read
as *being* that thing. **People are drawn; only mechanisms are coloured.**

## The twenty-two poses

The emotional track. A viewer with the sound off should be able to read the
story off this figure alone.

| pose | what it says | reach for it when |
| --- | --- | --- |
| `wonder` | open, waiting, no opinion yet | the default |
| `point` | naming the thing on screen | a label lands |
| `think` | working on it, not yet sure | a question has just been asked |
| `hopeful` | this might work | a plan is proposed |
| `cheer` | it worked | a plan is shown working |
| `push` | effort against something that gives | progress that costs something |
| `nod` | agreeing with what was shown | a step is accepted |
| `shrug` | **no answer yet** | the honest end of a section's question |
| `slump` | **it did not work** | a plan jams |
| `carry` | effort against something that *doesn't* give | a cost that cannot be pushed through |
| `wait` | nothing to do but wait for it | latency, a fetch, a queue |
| `lean` | inspecting closely | reading a sheet, a row of numbers |
| `aha` | the moment it lands | a contradiction resolves |
| `back` | turned away, facing something enormous | a pull-back to scale |

`shrug`, `slump`, `carry`, `wait` and `back` exist because the chain needs
them: every section ends on a question, one plan has to visibly fail, the cost
is a *carry* rather than a push, the fetch takes real time, and scale only
reads if someone small is looking up at it.

### The second eight

Added once `plain` became the host. With no beard, glasses or hat left to
characterise the figure, **the pose is the entire performance** — so the
register had to be wider than pointing, agreeing and giving up.

| pose | what it says | reach for it when |
| --- | --- | --- |
| `count` | enumerating | a number is being built on screen — 336, 3,024, 12,096 |
| `weigh` | two things held against each other | **the trade-off pose.** The thesis of this video is a trade |
| `halt` | a flat palm — "no, not like that" | a refusal, not a failure |
| `offer` | presenting a thing to the viewer | something is named for the first time |
| `confide` | leaning in to admit something | a concession, before the comments make it |
| `flat` | arms folded, deadpan | a flat statement of fact that must not read as uncertainty |
| `reach` | up toward something off the top of frame | height, when height is the point |
| `resign` | one gesture ending in nothing | a *therefore* that costs something — not `slump`, which is the whole body |

Three of these needed a second pass, and the faults are worth keeping written
down because they are the same faults every time:

- `weigh` had a faint dashed line between the two hands to say "these are
  being held against each other". It crossed the filled tunic and read as a
  **sash**. Anything drawn between the hands must cross the body, so nothing is
  drawn — the hands at different heights and the tilt of the torso carry it.
- `halt` had a normal hand with three finger ticks above it, which read as a
  **sprout growing out of a fist**. In this idiom an open palm is simply a
  bigger circle held further from the body: the size *is* the palm.
- `reach` stopped level with the ear and read as **waving**. The hand has to
  end above the crown, and since straight up goes through the head, the arm
  swings out and back in.

The rule underneath all three: **a stick figure has no detail budget.** If a
gesture needs a small mark to be legible, it is not legible.

## The seven figures

Between them they are a whole court: someone makes a claim, someone built the
thing, someone has to run it, someone checks the numbers, someone doubts it,
someone rules on it, and someone is watching.

| style | who | when |
| --- | --- | --- |
| `plain` | **the host** — Ahmad on screen | the default, and effectively the whole run |
| `me` | the host — the only figure allowed an opinion | opening a claim, delivering a verdict |
| `vendor` | the claim — says "efficient" and moves on | where the claim is *made*, not tested |
| `engineer` | the one who tries to actually run it | where a plan is attempted |
| `analyst` | reads the numbers back | where a figure has to be checked |
| `builder` | built it — defends the design, not the claim | where the design has a good reason |
| `critic` | doubts it out loud, so the host doesn't have to | where an objection needs a face |

A style with no job is decoration. Don't add one.

The lanyard is the entire characterisation of `vendor`: whoever wears one is
speaking for an organisation rather than for themselves.

## Editing `me`, or adding a figure

A style is **data**, not a component. Five fields:

```
hair      'spikes' | 'royal' | 'curls' | 'crop' | 'buzz' | 'wave' | 'bun' | 'long' | 'none'
beard     'stubble' | 'moustache' | 'goatee' | 'full' | 'none'
glasses   'big' | 'round' | 'square' | 'none'
headwear  'cap' | 'beanie' | 'none'
garment   'tunic' | 'tee' | 'hoodie' | 'collar' | 'coat'
```

`me` is the custom likeness — change those five, look at `/paper`. Anything
beyond them means redrawing.

`spikes` is generated: bases on the head circle at r 40, peaks out at r 52,
alternating. A hand-written zigzag never quite sits on a circle — the valleys
either float off the skull or bite into it. `royal` is the other big one:
volume over the ears, swept back, thin on the crown. `big` glasses are
oversized and thicker than the face lines, centred on the eyes and just
touching in the middle — off-centre they read wall-eyed.

## What the frames taught

Every one of these was invisible in the source and obvious in a screenshot.
That is the whole argument for `/paper`.

- **Hands must be round.** A filled circle survives being small on screen; a
  16-unit line reads as a ladder or a flag.
- **Hair needs a filled base under the curls.** Circles alone read as a laurel
  wreath, because paper shows between them.
- **A hairline at eye level reads as a bowl cut.** Keep it up on the forehead —
  and the brows need that strip too.
- **The beard cannot be a filled mass.** The hair is already a filled mass in
  the same tone, so filling the lower face too leaves the head light only in a
  band across the eyes — a balaclava. Hatched ink separates the two by *value*.
- **Even hatching reads as a sunburst.** Jitter both angle and length, off a
  fixed hash so screenshots stay comparable.
- **Cloth needs to be darker than you think.** A cap in the next tone up from
  paper reads as a swim cap. It wants a clear step down in value.
- **Glasses do not move with the eyeline.** The eyes shift inside the frames.
  That is what makes a glance read as a glance rather than a turn of the head.
- **A turned back needs ears and a spine**, or it reads as a missing face. A
  curve at the nape reads as a mouth.
- **Hands resting where a pocket is read as hands in pockets.** For `carry`
  they have to hang clear of the garment.
- **Marks must touch the figure.** An ellipsis floating by the hip reads as a
  stray glyph; beside the head it reads as waiting.
