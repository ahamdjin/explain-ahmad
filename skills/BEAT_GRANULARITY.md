# Beat Granularity — the five-year-old test

The bar for every beat in every section:

> Would a five-year-old, who has seen only the beats before this one, understand
> what just changed and why?

Not "is it simple." Not "is it pretty." Whether it **follows** from what they
already have.

## Beat count is free. Compression is the enemy.

A section is not better for having 13 beats instead of 40. Each beat is one
click, and a click costs the viewer nothing. What costs them everything is a
beat that moves two steps at once.

If a beat cannot be described as **one** change in one short sentence, it is two
beats.

### The failure this rule exists to prevent

> "It has 320 billion parameters. The download is about 306 gigabytes."

Three unexplained things in one beat: what a parameter is, how much a billion is,
and what a gigabyte means. A viewer who doesn't already know all three learns
nothing and quietly checks out. The frame looks fine. The teaching failed.

## Rules

1. **One beat, one move.** Something appears, or changes, or is named. Not two.
2. **Never two new nouns in one beat.** Introduce one, let it land, then the next.
3. **Function before name.** Show what a thing does before saying what it is
   called. `word in → word out` before "model". Pieces lighting up before
   "parameters". A thing that picks before "router".
4. **Every number needs a unit the viewer already owns.** "306 gigabytes" means
   nothing. "Ten of my boxes" means something, because the box was established
   first. Compare to things on screen, never to abstractions.
5. **Name the prerequisite.** For each beat, write down *which earlier beat makes
   this one understandable.* If you can't, it's too early — that's the
   `NCASE_LEARNING_AND_EXPLANATION_NOTES.md` §2 rule applied at beat scale.
6. **Max four new points per chunk.** Group beats into chunks of at most four new
   ideas, then spend a beat consolidating before continuing. Four is the working
   memory ceiling; past it, earlier points fall out.
7. **Consolidate before you continue.** End each chunk with a beat that shows the
   four points together, as one picture. That picture becomes the single unit the
   next chunk builds on.
8. **Connect, don't collect.** Each new piece must attach to something already on
   screen. A piece that appears unrelated to anything is a new topic, not a
   next step.

## Chunking pattern

```
chunk = up to 4 new points, then 1 consolidation beat
```

The consolidation beat is what makes the next chunk affordable: the viewer now
carries one idea instead of four.

Per `NCASE_LEARNING_AND_EXPLANATION_NOTES.md`: A, then B, then A+B, then C.
Complexity comes from connections between already-familiar pieces, never from
introducing many pieces at once.

## Checklist per beat

- What is the **one** thing that changed?
- Which earlier beat makes it understandable?
- How many new nouns? (must be 0 or 1)
- Does every number refer to something already on screen?
- Is this new point number 5 in the current chunk? (then consolidate first)

## What this rule does not mean

- It does not mean adding beats for the sake of a count. A beat with no change
  is worse than no beat.
- It does not mean dumbing down the truth. `SIMPLIFY_THE_SURFACE_NOT_THE_TRUTH`
  still holds — decompose the explanation, never the accuracy.
- It does not license more animation. Beats are still stills that add up; motion
  between them is secondary.
