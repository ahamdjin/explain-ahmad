import { centred, FOLLOWED, GROUND_Y, note, type Beat } from '../../../../paper'
import { chip, ground, hero, narrator, rowA, rowB, sentA, sentB, table, type Patch } from './scene'

/**
 * Section 03 — From an ID to a meaning.
 *
 * Script and board: `video-script/video-1/03-from-an-id-to-a-meaning.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * ## The geography
 *
 * The book owns the **left**, tall and running past the top and bottom of the
 * frame -- `paper.css` sizes `.s1-etable` to do exactly that, because at a
 * scale that fits inside the frame it reads as a modest box on a shelf rather
 * than as something giant. The row work happens to its **right**.
 *
 * Every label here is either drawn by the actor it describes (the row's own
 * `measure`, the book's own caption) or placed against that actor's edge in
 * the same beat. `skills/SPATIAL_CONTINUITY.md`: *a measure of a thing is drawn
 * by whatever draws the thing*, and a sticky label is re-placed when its
 * subject moves rather than merely allowed to persist.
 */

/*
 * A note on row scale: `NumberRow`'s box is wider than its cells -- the tail
 * and the measure live in the remainder -- so a row's *drawn* width is about
 * 76% of `56cqw x scale`. A row that carries a beat therefore needs a scale
 * near 1, not the 0.6 that looks right in the source.
 */

/** Rising from below, only its top third in frame. Beat 1. */
const BOOK_LOW = { x: 18, y: 112 }
/** Its full height, past both edges of the frame. Beats 2-4. */
const BOOK_FULL = { x: 28, y: 50 }
/** Where page 432 sits once the book is at full height. */
const PAGE_432 = { x: 28, y: 44.5 }
/** Beats 9-12, stood aside so the two rows own the right. */
const BOOK_ASIDE = { x: 16, y: 50 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'address-to-somewhere',
    title: '432 holds and the book keeps rising behind it',
    relation: 'want',
    secs: 13,
    vo: 'Right now, everything the model has for our little `it` is 432. Just an address. And that address is useful because it tells the model where to look next.',
    /* 432 is exactly where §2 left it. The book arrives underneath it rather
     * than beside it, so beat 2 is that same object rising, not a cut. */
    commands: [
      ground.at(GROUND_Y),
      chip.show({ x: 46, y: 42 }, 1),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point' }),
    ],
    stages: [{ at: 5200, commands: [table.show(BOOK_LOW, 1.45)] }],
    lateOverlays: {
      at: 7000,
      overlays: [centred('an address is where to look', 52, 60, { size: 'md', rotate: -2 })],
    },
  },
  {
    n: 2,
    id: 'one-page-per-token',
    title: 'The book rises fully: one indexed page per token',
    relation: 'so',
    secs: 7,
    vo: 'Imagine a giant reference book. One page for every token the model knows.',
    /* 432 steps right and shrinks: it is still our protagonist, but this beat
     * belongs to the book, and two full-size objects would split the frame. */
    commands: [table.moveTo(BOOK_FULL, 1.45), chip.moveTo({ x: 72, y: 44.5 }, 0.55), narrator.set({ pose: 'nod' })],
    /* Against the book's right edge, not floating in the middle of the frame.
     * The book's own caption sits at its foot, which this scale puts off the
     * bottom of the frame, so the count carries it. */
    lateOverlays: {
      at: 3400,
      overlays: [note('154,880 pages\none per token', 50, 28, { tone: 'measure', rotate: -3, sticky: true })],
    },
  },
  {
    n: 3,
    id: 'open-page-432',
    title: '432 rides the index like a bookmark and opens its own page',
    relation: 'so',
    secs: 5,
    vo: 'We have 432... so we open page 432.',
    commands: [chip.moveTo(PAGE_432, 0.46), table.seek(), narrator.set({ pose: 'point' })],
  },
  {
    n: 4,
    id: 'not-a-definition',
    title: 'No definition on the page — a row of numbers slides out',
    relation: 'and-yet',
    secs: 9,
    vo: 'But instead of finding a definition for `it`, we find something much stranger. A long row of numbers.',
    /* The row leaves the book at the height of the page it came from, so the
     * viewer can see which page produced it. 432 stays behind as the bookmark. */
    commands: [
      table.pull(),
      chip.moveTo({ x: 28, y: 62 }, 0.4),
      rowA.show({ x: 63, y: 44.5 }, 0.74, { label: undefined }),
      narrator.set({ pose: 'wonder' }),
    ],
    clearSticky: true,
  },
  {
    n: 5,
    id: 'four-thousand-and-ninety-six',
    title: 'The row runs past the frame before the count is named',
    relation: 'so',
    secs: 6,
    vo: 'Not ten numbers. Not a hundred. 4,096 numbers.',
    /* The book and the bookmark go: this beat is about the row's length, and
     * a frame with three subjects has none. The count is drawn by the row and
     * spans it end to end, including the part that runs off. */
    commands: [
      table.off(),
      chip.off(),
      rowA.moveTo({ x: 54, y: 42 }, 0.74),
      rowA.extend(),
      rowA.count('4,096 numbers'),
      narrator.set({ pose: 'count' }),
    ],
  },
  {
    n: 6,
    id: 'called-an-embedding',
    title: 'The row is named only after it has been seen behaving',
    relation: 'therefore',
    secs: 14,
    vo: 'That row is called an embedding. And the easiest way to think about it is this: 432 was just the address. The embedding is the model’s learned starting representation for that token.',
    /* 432 comes back small and low so the address and the thing stored at it
     * are in one frame. The name lands on the row as the row's own label. */
    commands: [rowA.set({ label: 'embedding' }), chip.show({ x: 11, y: 70 }, 0.4), narrator.set({ pose: 'offer' })],
    lateOverlays: {
      at: 7000,
      overlays: [centred('the address', 11, 78, { size: 'sm', tone: 'measure', rotate: -3 })],
    },
  },
  {
    n: 7,
    id: 'the-whole-pattern',
    title: 'The row reads as one band; single cells stop being readable',
    relation: 'so',
    secs: 11,
    vo: 'Those 4,096 numbers were learned during training. No single number means “pronoun” or “ball” or “dog.” It’s the whole pattern that matters.',
    commands: [rowA.band(), narrator.set({ pose: 'think' })],
    lateOverlays: {
      at: 5600,
      overlays: [centred('no single number carries a concept', 50, 66, { size: 'md', rotate: 2 })],
    },
  },
  {
    n: 8,
    id: 'the-row-is-what-we-carry',
    title: 'The 432 card gives way; the row becomes the thing we carry',
    relation: 'therefore',
    secs: 11,
    vo: 'So now our `it` is no longer just: 432. It is this entire row of 4,096 values. Which feels much more useful.',
    /* The card leaves and the row takes its name. From here to §5 the row *is*
     * our `it`; the number that opened the page has done its whole job. */
    commands: [
      chip.off(),
      rowA.contract(),
      rowA.moveTo({ x: 50, y: 46 }, 1.16),
      rowA.set({ label: 'our `it`, now' }),
      narrator.set({ pose: 'nod' }),
    ],
  },
  {
    n: 9,
    id: 'the-exact-same-row',
    title: 'The book returns and the identical row is pulled a second time',
    relation: 'and-yet',
    secs: 12,
    vo: 'But there’s a problem. This is a lookup table. Which means every time the token `it` appears... it starts by pulling out the exact same row.',
    /* Both rows are drawn from `ROW_SEED`, so beat 12's claim is true of the
     * ink and not merely asserted over it. The book stands aside rather than
     * arriving again, because it never conceptually left. */
    commands: [
      table.show(BOOK_ASIDE, 1.2),
      table.pull(),
      rowA.unband(),
      rowA.uncount(),
      rowA.set({ label: 'it' }),
      rowA.moveTo({ x: 56, y: 30 }, 0.95),
      narrator.set({ pose: 'point' }),
    ],
    stages: [{ at: 7000, commands: [rowB.show({ x: 56, y: 52 }, 0.95, { label: 'it' })] }],
  },
  {
    n: 10,
    id: 'the-ball-sentence',
    title: 'An ordinary sentence lands above the first row and its `it` lights',
    relation: 'so',
    secs: 6,
    vo: 'Take: “The ball rolled because it was pushed.”',
    commands: [table.off(), sentA.show({ x: 56, y: 15 }, 0.72), sentA.follow()],
  },
  {
    n: 11,
    id: 'the-dog-sentence',
    title: 'A second sentence lands above the second identical row',
    relation: 'so',
    secs: 6,
    vo: 'and: “The dog stopped because it was tired.”',
    commands: [sentB.show({ x: 56, y: 67 }, 0.72), sentB.follow()],
  },
  {
    n: 12,
    id: 'same-starting-embedding',
    title: 'Two different referents sit above two identical starting rows',
    relation: 'and-yet',
    secs: 7,
    vo: 'Different `it`. Different thing it refers to. Same starting embedding.',
    /* Each referent note sits beside the sentence that owns it; `identical`
     * sits between the two rows, which is the only place it can mean anything. */
    commands: [narrator.set({ pose: 'flat' })],
    overlays: [
      note('it → ball', 82, 15, { tone: 'word', rotate: -3 }),
      note('it → dog', 82, 67, { tone: 'word', rotate: 3 }),
      centred('identical', 56, 41, { size: 'md', tone: 'cost', rotate: -2 }),
    ],
  },
  {
    n: 13,
    id: 'has-to-fit-this-sentence',
    title: 'The examples recede and our own prompt returns above its unchanged row',
    relation: 'wall',
    secs: 12,
    vo: 'So this row can’t be the whole meaning. Something still has to make our `it` understand the sentence it is inside. And that is what happens next.',
    /* Lands on §4 beat 1's opening frame exactly: prompt at 50/40, the same
     * row beneath it at 50/66. §4 continues this frame instead of building one. */
    commands: [
      sentA.off(),
      sentB.off(),
      rowB.off(),
      table.off(),
      hero.show({ x: 50, y: 40 }, 0.95),
      hero.follow(FOLLOWED),
      rowA.moveTo({ x: 50, y: 66 }, 0.95),
      narrator.off(),
    ],
    clearSticky: true,
    lateOverlays: {
      at: 6200,
      overlays: [centred('what makes this `it` fit this sentence?', 50, 84, { size: 'md', rotate: -2 })],
    },
  },
]
