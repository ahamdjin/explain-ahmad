import { centred, FOLLOWED, GROUND_Y, note, type Beat } from '../../../../paper'
import { chip, ghost, ground, line, narrator, row, wall, type Patch } from './scene'

/**
 * Section 04 — `it` gets context.
 *
 * Script and board: `video-script/video-1/04-the-word-looks-around.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * §3 hands over the prompt above the fixed `it` row. Beat 1 keeps that row and
 * resolves the other seven positions around it — it does not redraw the scene.
 */

/** Where the prompt sits once it is the working surface rather than a title. */
const LINE = { x: 50, y: 40 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'not-alone',
    title: 'The other seven prompt tokens resolve around the held row',
    relation: 'want',
    secs: 16,
    vo: 'So our `it` starts with the same embedding every time. But ours is not alone. It is sitting here: The dog dropped the ball, and it — with seven other tokens around it.',
    commands: [
      ground.at(GROUND_Y),
      row.show({ x: 50, y: 66 }, 0.95),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point' }),
    ],
    /* The seven arrive late inside the beat rather than with the row, so the
     * viewer sees *the thing they were carrying* before the company shows up. */
    stages: [{ at: 5200, commands: [line.show(LINE, 0.95)] }],
  },
  {
    n: 2,
    id: 'context-starts-here',
    title: 'The eight re-form as the sentence with `it` still raised',
    relation: 'so',
    secs: 5,
    vo: 'And this is where the model starts adding context.',
    /* The carried row goes because the line now draws a row under every token,
     * including this one. Two copies of the same row would read as two rows. */
    commands: [row.off(), line.moveTo({ x: 50, y: 52 }, 0.95), line.raise(FOLLOWED)],
  },
  {
    n: 3,
    id: 'only-backward',
    title: 'Lines grow backward from `it`; none point forward',
    relation: 'so',
    secs: 16,
    vo: 'The useful intuition is simple: each token gets to look at the tokens it is allowed to see and ask: which of these matter to me right now? For our `it`, everything before it is available.',
    commands: [line.ask(), line.mask(), narrator.set({ pose: 'think' })],
    lateOverlays: {
      at: 9500,
      overlays: [note('all seven behind it', 77, 32, { tone: 'relate', rotate: -3 })],
    },
  },
  {
    n: 4,
    id: 'which-would-you-pick',
    title: 'The frame holds on the question before anything is highlighted',
    relation: 'want',
    secs: 10,
    vo: 'So if you were `it`... which pieces would you want to pay attention to? Probably things like dog, dropped, and ball.',
    commands: [narrator.set({ pose: 'wonder' })],
    overlays: [centred('which of these matter?', 50, 72, { size: 'md', rotate: -2 })],
  },
  {
    n: 5,
    id: 'more-mathematical',
    title: 'The lines take different weights, illustrative and unnumbered',
    relation: 'so',
    secs: 14,
    vo: 'The model does something much more mathematical than that, of course. It compares the current representations, works out relationships between them, and mixes useful information back into the row for `it`.',
    commands: [line.weigh(), narrator.set({ pose: 'point' })],
  },
  {
    n: 6,
    id: 'some-matter-more',
    title: 'Material travels along the lines into the row',
    relation: 'so',
    secs: 4,
    vo: 'Some connections matter more. Some matter less.',
    commands: [line.pull()],
  },
  {
    n: 7,
    id: 'the-row-changes',
    title: 'The row rewrites itself with the old row left behind as a ghost',
    relation: 'therefore',
    secs: 5,
    vo: 'And after that mixing happens... our row changes.',
    commands: [
      line.change(FOLLOWED),
      line.withdraw(),
      line.moveTo({ x: 50, y: 16 }, 0.66),
      ghost.show({ x: 56, y: 42 }, 1.1),
      row.show({ x: 56, y: 64 }, 1.1),
      row.rewrite(),
    ],
  },
  {
    n: 8,
    id: 'same-id-different-numbers',
    title: '432 is placed against both the ghost row and the new row',
    relation: 'and-yet',
    secs: 5,
    vo: 'Same token. Same ID 432. But now, different numbers.',
    commands: [chip.show({ x: 56, y: 53 }, 0.5), narrator.set({ pose: 'nod' })],
  },
  {
    n: 9,
    id: 'it-in-this-sentence',
    title: 'Small labels bank the change on each row',
    relation: 'therefore',
    secs: 5,
    vo: 'Because these numbers describe `it` in this sentence.',
    commands: [],
    overlays: [
      note('any `it`', 6, 40, { rotate: -3, sticky: true }),
      note('this `it`', 6, 62, { tone: 'relate', rotate: 3, sticky: true }),
    ],
  },
  {
    n: 10,
    id: 'called-attention',
    title: 'The wiring is named only after it has been watched working',
    relation: 'so',
    secs: 9,
    vo: 'That general idea is what attention is doing for us here: letting a token change based on its context.',
    commands: [narrator.set({ pose: 'point' })],
    overlays: [centred('attention · context mixing', 50, 28, { tone: 'relate', rotate: -2 })],
  },
  {
    n: 11,
    id: 'hybrid-aside',
    title: 'A small honesty note sits at the edge without interrupting the row',
    relation: 'and-yet',
    secs: 13,
    vo: 'One technical detail: GLM-5.3-Flash uses a hybrid design, so not every layer is plain textbook self-attention. But for our story, the important job is the same: context changes the representation.',
    commands: [narrator.set({ pose: 'think' })],
    overlays: [note('hybrid attention design', 6, 12, { size: 'sm', rotate: -3 })],
  },
  {
    n: 12,
    id: 'specific-to-this-sentence',
    title: 'The wiring and the other rows quiet; the changed row is alone',
    relation: 'therefore',
    secs: 9,
    vo: 'And now something interesting happens. We finally have a row that is specific to this `it`, in this sentence.',
    commands: [line.off(), ghost.off(), chip.off(), row.moveTo({ x: 50, y: 44 }, 1.16)],
    clearSticky: true,
  },
  {
    n: 13,
    id: 'which-parts-work-on-it',
    title: 'A wall of unopened slots begins to appear ahead of the row',
    relation: 'wall',
    secs: 9,
    vo: 'So what does the model do with it? It decides which parts of itself should work on it next.',
    /* Only its edge. §5 completes this exact object; a wall that arrives whole
     * here would make §5's first beat a cut to a new place. */
    commands: [wall.show({ x: 50, y: 94 }, 1), narrator.off()],
    lateOverlays: {
      at: 4600,
      overlays: [centred('which parts of itself?', 50, 60, { size: 'md', rotate: -2 })],
    },
  },
]
