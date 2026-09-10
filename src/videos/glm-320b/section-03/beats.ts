import { brace, note, type Beat } from '../../../paper'
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
 * Board: `video-script/03-from-an-id-to-a-meaning.md`. `npm run check:board`.
 *
 * **One camera move**, at beat 2, and it exists so the table's height is felt
 * rather than claimed. After that the section is still for eleven beats, which
 * is what lets beats 8-11 land — they are the carrying frames, and a restless
 * camera would take the comparison away from them.
 *
 * Beat 13 is the deposit: **three identical rows on one frame.** That is the
 * whole setup for §4, so it is a picture and not a line of voice-over.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'how-it-gets-meaning',
    title: '`4021` alone; a table edge rises into frame',
    relation: 'want',
    secs: 6,
    vo: 'Here’s how it gets meaning out of a row number.',
    commands: [
      ground.at(72),
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
    secs: 10,
    vo: 'The model has a table. One row for every token in that list — all hundred and fifty-four thousand of them.',
    commands: [
      table.moveTo({ x: 24, y: 50 }, 1),
      /* Pull back. The table is absurdly tall and that is the entire read, so
       * the camera loses ground rather than the object shrinking on the spot. */
      camera.to({ x: 46, y: 46 }, 0.92),
      chip.moveTo({ x: 62, y: 30 }, 0.8),
      narrator.set({ pose: 'wonder' }),
    ],
    lateOverlays: {
      at: 3400,
      overlays: [note('one row per token\n154,880 rows', 24, 90, { tone: 'measure', rotate: -3, sticky: true })],
    },
  },
  {
    n: 3,
    id: 'which-row-to-fetch',
    title: 'The number travels up the table to its own row',
    relation: 'so',
    secs: 5,
    vo: 'The ID is just which row to go and fetch.',
    commands: [table.seek(), chip.moveTo({ x: 34, y: 46 }, 0.6)],
  },
  {
    n: 4,
    id: 'this-row',
    title: 'That row slides out of the table and comes forward',
    relation: 'so',
    secs: 6,
    vo: 'So token four thousand and twenty-one pulls out this row.',
    commands: [table.pull(), chip.off(), dog.show({ x: 66, y: 40 }, 0.62, { label: '' })],
  },
  {
    n: 5,
    id: 'four-thousand-and-ninety-six',
    title: 'The row extends sideways past both edges of frame',
    relation: 'and-yet',
    secs: 8,
    vo: 'Four thousand and ninety-six numbers. For one small piece of text.',
    commands: [dog.set({ extend: true }), dog.moveTo({ x: 54, y: 40 }, 0.8)],
    overlays: [
      brace('4,096 numbers — for one piece of text', 12, 62, 84, { tone: 'measure', sticky: true }),
    ],
  },
  {
    n: 6,
    id: 'called-an-embedding',
    title: 'The row holds; a label lands on it',
    relation: 'so',
    secs: 9,
    vo: 'This row is called an embedding. And it’s the first thing in the whole machine that actually means something.',
    commands: [dog.set({ extend: false }), dog.moveTo({ x: 64, y: 32 }, 0.58), narrator.set({ pose: 'nod' })],
    clearSticky: true,
    lateOverlays: {
      at: 2600,
      overlays: [note('embedding', 58, 20, { size: 'md', tone: 'measure', rotate: -2, sticky: true })],
    },
  },
  {
    n: 7,
    id: 'dog-and-cat',
    title: 'Two more rows slide out and stack under it',
    relation: 'so',
    secs: 8,
    vo: 'Here’s why it means something. Let’s pull out "dog", and "cat".',
    commands: [
      dog.set({ label: 'dog' }),
      cat.show({ x: 64, y: 48 }, 0.58, { label: 'cat' }),
      narrator.set({ pose: 'point' }),
    ],
  },
  {
    n: 8,
    id: 'close-but-not-the-same',
    title: 'The two rows align; the values that nearly match light up',
    relation: 'so',
    secs: 8,
    vo: 'They’re not the same — but they’re close. Lots of these numbers nearly match.',
    commands: [cat.compare(), cat.moveTo({ x: 64, y: 46 }, 0.58), dog.moveTo({ x: 64, y: 32 }, 0.58)],
    overlays: [note('lots of these\nnearly match', 62, 52, { tone: 'word', rotate: -4 })],
  },
  {
    n: 9,
    id: 'now-tuesday',
    title: 'A third row aligns; almost nothing lights',
    relation: 'wall',
    secs: 6,
    vo: 'Now "Tuesday". Not close to either of them.',
    commands: [tues.show({ x: 64, y: 60 }, 0.58, { label: 'Tuesday' }), tues.compare()],
    overlays: [note('almost none', 62, 70, { tone: 'cost', rotate: 3 })],
  },
  {
    n: 10,
    id: 'training-did-it',
    title: 'The three rows fold into three points, spaced by likeness',
    relation: 'so',
    secs: 11,
    vo: 'Nobody sat down and made that happen. Training did it. Words that get used in similar ways ended up with similar rows.',
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
    commands: [narrator.set({ pose: 'aha' })],
    overlays: [brace('close', 42, 42, 12, { tone: 'word' }), brace('nothing like it', 52, 72, 26, { tone: 'cost' })],
  },
  {
    n: 12,
    id: 'this-is-what-goes-in',
    title: 'The points unfold back into the `dog` row, alone',
    relation: 'therefore',
    secs: 6,
    vo: 'And that’s what goes into the model. Not "dog". This.',
    commands: [space.unfold(), dog.show({ x: 60, y: 44 }, 0.72, { matches: false, label: 'dog' })],
  },
  {
    n: 13,
    id: 'same-word-same-row',
    title: 'The same row is pulled twice more; all three are identical',
    relation: 'and-yet',
    secs: 16,
    vo: 'But here’s the thing to hold on to. This row is stored in a table. Which means it is exactly the same every single time the word "dog" turns up. Same word, same row, always.',
    commands: [dog.moveTo({ x: 60, y: 30 }, 0.62), narrator.set({ pose: 'think' })],
    /* Three identical rows on one frame. Not hedged, because it is true — the
     * embedding table is a fixed lookup — and the paradox §4 resolves only
     * works if this is stated flatly. */
    stages: [
      { at: 1400, commands: [again1.show({ x: 60, y: 48 }, 0.62)] },
      { at: 2800, commands: [again2.show({ x: 60, y: 66 }, 0.62)] },
    ],
    lateOverlays: {
      at: 3600,
      overlays: [note('identical.\nevery time.', 14, 46, { size: 'md', tone: 'cost', rotate: -3 })],
    },
  },
]
