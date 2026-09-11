import { brace, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  again1,
  again2,
  camera,
  cat,
  chip,
  dog,
  ground,
  narrator,
  space,
  table,
  tues,
  type Patch,
} from './scene'

/**
 * Section 03 — From an ID to a meaning.
 *
 * Board: `video-script/video-1/03-from-an-id-to-a-meaning.md`. `npm run check:board`.
 *
 * **One camera move**, at beat 2, and it exists so the table's height is felt
 * rather than claimed. After that the section is still for eleven beats, which
 * is what lets beats 8-11 land — they are the carrying frames, and a restless
 * camera would take the comparison away from them.
 *
 * Beats 13-15 are the deposit: **three identical rows on one frame.** That is
 * the whole setup for §4, so it is a picture and not a line of voice-over, and
 * it gets three beats rather than one 23-second block -- the rows have to
 * arrive one at a time or "identical, every time" is asserted instead of
 * watched.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'how-it-gets-meaning',
    title: '`5562` alone; a table edge rises into frame',
    relation: 'want',
    secs: 14,
    vo: 'So every piece has a row number now — and a row number is only a name. A name has to turn into a meaning somewhere. Here’s where.',
    commands: [
      ground.at(GROUND_Y),
      chip.show({ x: 46, y: 46 }, 1, { becomes: true }),
      /* Only the bottom edge, and only from below frame. The pull-back is the
       * beat that reveals what it is the edge of. */
      table.show({ x: 22, y: 118 }, 1),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'the-model-has-a-table',
    title: 'We back away; the table runs past the top of frame',
    relation: 'so',
    secs: 11,
    vo: 'The model has a table. One row for every token in that list — all hundred and fifty-four thousand of them.',
    commands: [
      table.moveTo({ x: 24, y: 50 }, 1),
      /* Pull back. The table is absurdly tall and that is the entire read, so
       * the camera loses ground rather than the object shrinking on the spot. */
      camera.to({ x: 46, y: 46 }, 0.92),
      chip.moveTo({ x: 62, y: 30 }, 0.8),
      /* The table runs off the top of frame. Reaching says how tall. */
      narrator.set({ pose: 'reach' }),
    ],
    lateOverlays: {
      at: 3400,
      /* Beside the table, not inside it. At 24/90 this sat on the table's own
       * rows -- blue handwriting over blue row-marks -- for beats 2 to 4. */
      overlays: [note('one row per token\n154,880 rows', 8, 84, { tone: 'measure', rotate: -3, sticky: true })],
    },
  },
  {
    n: 3,
    id: 'which-row-to-fetch',
    title: 'The number travels up the table to its own row',
    relation: 'so',
    secs: 6,
    vo: 'The ID is just which row to go and fetch.',
    commands: [table.seek(), chip.moveTo({ x: 34, y: 46 }, 0.6)],
  },
  {
    n: 4,
    id: 'this-row',
    title: 'That row slides out of the table and comes forward',
    relation: 'so',
    secs: 6,
    vo: 'So token five thousand, five hundred and sixty-two pulls out this row.',
    commands: [table.pull(), chip.off(), dog.show({ x: 66, y: 40 }, 0.62, { label: '' })],
  },
  {
    n: 5,
    id: 'four-thousand-and-ninety-six',
    title: 'The row extends sideways past both edges of frame',
    relation: 'and-yet',
    secs: 8,
    vo: 'Four thousand and ninety-six numbers. For one small piece of text.',
    /*
     * The board asks for the row to run "past both edges of frame", and it
     * cannot do that while the table stands in the middle of the left third:
     * the row was printed across rows 5557-5560 and read as sitting *on* the
     * table it had just been pulled out of. So the table withdraws to the edge
     * here and **comes back at beat 14**, on the line "this row is stored in a
     * table" -- which turns a piece of housekeeping into that beat's event.
     *
     * The brace stops at 82 rather than 96. It was drawn straight through the
     * narrator, who has stood at 91/70 since beat 1.
     */
    commands: [table.moveTo({ x: 6, y: 50 }, 1), dog.set({ extend: true }), dog.moveTo({ x: 54, y: 40 }, 0.8)],
    clearSticky: true,
    overlays: [
      brace('4,096 numbers — for one piece of text', 26, 62, 56, { tone: 'measure', voice: 'figure', sticky: true }),
    ],
  },
  {
    n: 6,
    id: 'what-for',
    title: 'Everything stops; the row holds and the question sits under it',
    relation: 'and-yet',
    secs: 10,
    /*
     * S-06. The still frame, and it must be genuinely still -- the row does
     * not drift, the narrator does not gesture. A question asked over motion
     * is decoration; the viewer has to have somewhere to put a guess.
     */
    vo: 'Which seems like a lot. What could one short word possibly need four thousand numbers for?',
    commands: [dog.set({ extend: false }), dog.moveTo({ x: 64, y: 32 }, 0.58), narrator.set({ pose: 'wonder' })],
    clearSticky: true,
    lateOverlays: {
      at: 2600,
      overlays: [note('what for?', 56, 62, { size: 'lg', rotate: -2, sticky: true })],
    },
  },
  {
    n: 7,
    id: 'dog-and-cat',
    title: 'Two more rows slide out and stack under it',
    relation: 'so',
    secs: 8,
    vo: 'Here’s what. Let’s pull out two more — "dog", and "cat".',
    commands: [
      dog.set({ label: 'dog' }),
      cat.show({ x: 64, y: 48 }, 0.58, { label: 'cat' }),
      narrator.set({ pose: 'point' }),
    ],
    clearSticky: true,
  },
  {
    n: 8,
    id: 'close-but-not-the-same',
    title: 'The two rows align and light as one band',
    relation: 'so',
    secs: 8,
    vo: 'They’re not the same row. But taken whole, they’re close — the two rows sit near each other.',
    /*
     * **Both** rows light, and they come close together. A band on one row
     * says nothing about the other -- the claim is that this *pair* sits near
     * each other, so the pair has to be the lit object. The first render lit
     * only `cat` and read as "this row is special", which is not the point.
     */
    commands: [
      dog.compare(),
      cat.compare(),
      dog.moveTo({ x: 62, y: 36 }, 0.58),
      cat.moveTo({ x: 62, y: 50 }, 0.58),
    ],
    overlays: [note('close — as\nwhole rows', 82, 42, { size: 'md', tone: 'word', rotate: -4 })],
  },
  {
    n: 9,
    id: 'now-tuesday',
    title: 'A third row aligns; its band stays unlit',
    relation: 'wall',
    secs: 6,
    vo: 'Now "Tuesday". Not close to either of them.',
    commands: [tues.show({ x: 62, y: 66 }, 0.58, { label: 'Tuesday' }), tues.compare()],
    overlays: [note('not close', 82, 68, { size: 'md', tone: 'cost', rotate: 3 })],
  },
  {
    n: 10,
    id: 'training-did-it',
    title: 'The three rows fold into three points, spaced by likeness',
    relation: 'so',
    secs: 11,
    vo: 'Nobody sat down and arranged that. Training did it. Words that get used in similar ways ended up with similar rows.',
    commands: [dog.off(), cat.off(), tues.off(), space.fold()],
    /*
     * A representation change, folded rather than cut. And it shows relative
     * distance only — no axes, no grid, no coordinates. These rows live in
     * 4096 dimensions; a frame a viewer could read a position off would lie.
     */
    lateOverlays: {
      at: 3000,
      overlays: [note('no axes here — only\nhow far apart they are', 82, 78, { rotate: 3 })],
    },
  },
  {
    n: 11,
    id: 'where-the-row-sits',
    title: 'The points hold; a brace measures the two distances',
    relation: 'and-yet',
    secs: 10,
    vo: 'So the meaning isn’t in any one number. It’s in where the row sits relative to all the other rows.',
    /*
     * The two measures are drawn by `Space` itself, from the same coordinates
     * as the points. They used to be page-level `brace()` overlays at
     * hand-tuned percentages, which cannot track a slot at 58/52 scale 1.4 --
     * so "close" drew itself to the left of `dog` and "nothing like it" ran
     * through the word `Tuesday`.
     */
    commands: [space.measure(), narrator.set({ pose: 'aha' })],
  },
  {
    n: 12,
    id: 'called-an-embedding',
    title: 'The points unfold back into the `dog` row; a label lands on it',
    relation: 'therefore',
    secs: 12,
    /*
     * S-12, and the name arrives *after* the thing has been understood, not
     * before. v9 named it at beat 6, where "embedding" was a label on a row
     * nobody had a reason to care about yet.
     */
    vo: 'This row has a name. It’s called an embedding. And it’s the first thing in the whole machine that actually means something.',
    commands: [space.unfold(), dog.show({ x: 60, y: 40 }, 0.72, { matches: false, label: 'dog' }), narrator.set({ pose: 'nod' })],
    lateOverlays: {
      at: 3200,
      overlays: [note('embedding', 54, 20, { size: 'lg', tone: 'measure', rotate: -2, sticky: true })],
    },
  },
  {
    n: 13,
    id: 'this-is-what-goes-in',
    title: 'The label settles; the row sits alone in frame',
    relation: 'therefore',
    secs: 9,
    vo: 'And that’s the lookup, done. That’s what goes into the model. Not "dog". This.',
    commands: [dog.moveTo({ x: 60, y: 44 }, 0.72), narrator.set({ pose: 'nod' })],
    clearSticky: true,
  },
  {
    n: 14,
    id: 'stored-in-a-table',
    title: 'The same row is pulled from the table a second time, beside the first',
    relation: 'and-yet',
    secs: 10,
    /* The turn. Said plainly, because the paradox §4 resolves only works if
     * this is stated flatly rather than hedged. */
    vo: 'But here’s the thing to hold on to. This row is stored in a table.',
    /* The table comes back on the line that needs it. It stepped aside at beat
     * 5 so the row could run edge to edge. */
    commands: [
      table.moveTo({ x: 24, y: 50 }, 1),
      dog.moveTo({ x: 60, y: 34 }, 0.62),
      again1.show({ x: 60, y: 52 }, 0.62),
      narrator.set({ pose: 'think' }),
    ],
  },
  {
    n: 15,
    id: 'same-word-same-row',
    title: 'Pulled a third time; all three sit identical',
    relation: 'wall',
    secs: 12,
    /*
     * The deposit, and it is a picture: three identical rows, one frame. §4
     * beat 1 collapses these three back into one, which only reads if the
     * viewer has seen all three at once here.
     */
    vo: 'Which means it is exactly the same, every single time the word "dog" turns up. Same word, same row, always.',
    commands: [again2.show({ x: 60, y: 70 }, 0.62)],
    lateOverlays: {
      at: 3200,
      overlays: [note('identical.\nevery time.', 82, 34, { size: 'md', tone: 'cost', rotate: -3 })],
    },
  },
]
