import { brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import { CHOSEN, blend, ground, hospital, narrator, room, row, type Patch } from './scene'

/**
 * Section 06 — The experts do the work.
 *
 * Script and board: `video-script/video-1/06-the-experts-do-the-work.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * §5 ends with the selected eight and the shared block already open toward the
 * row. Beat 1 continues that row into them rather than opening a new scene.
 *
 * The fair prediction is beat 4's — whether one expert wins. Beat 5 answers it
 * by **not deleting anything**, which is why nothing may leave the frame there.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'the-work-starts',
    title: 'The contextual row reaches the fork; the 280 idle experts recede',
    relation: 'want',
    secs: 6,
    vo: 'The router has picked eight. Now the actual work happens.',
    commands: [
      ground.at(GROUND_Y),
      /* The wall stays on screen, faint. Cutting it would lose the fact that
       * these eight were chosen out of something much larger — which is the
       * only reason any of this counts as "active". */
      hospital.show({ x: 50, y: 12 }, 0.3, { lit: CHOSEN }),
      hospital.recede(),
      blend.show({ x: 50, y: 52 }, 0.94),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'one-row-eight-copies',
    title: 'The same row duplicates into eight copies and enters all eight blocks at once',
    relation: 'so',
    secs: 9,
    vo: 'Our `it` row is copied into all eight selected experts. Same input. Eight different blocks.',
    commands: [blend.copy()],
    lateOverlays: {
      at: 4200,
      /* Names the asymmetry the voice states but the frame could be read either
       * way: it is the blocks that differ here, never the input. */
      overlays: [note('one input · eight copies', 8, 30, { tone: 'measure', rotate: -3 })],
    },
  },
  {
    n: 3,
    id: 'eight-different-rows-out',
    title: 'Each box transforms it differently; eight visibly different rows emerge',
    relation: 'so',
    secs: 13,
    vo: 'And each expert transforms that row in its own learned way. So one row goes in... and eight different rows come out.',
    commands: [blend.out(), narrator.set({ pose: 'reach' })],
  },
  {
    n: 4,
    id: 'which-expert-wins',
    title: 'Everything freezes on the eight outputs. Nothing is highlighted',
    relation: 'and-yet',
    secs: 7,
    vo: 'At this point you might reasonably think: okay — which expert wins?',
    /* No command at all. The guess only counts if the frame is genuinely still
     * while it is being made — any motion here reads as the answer. */
    commands: [narrator.set({ pose: 'wonder' })],
    lateOverlays: {
      at: 2600,
      overlays: [centred('which one wins?', 70, 20, { size: 'lg', rotate: -2, sticky: true })],
    },
  },
  {
    n: 5,
    id: 'none-of-them',
    title: 'Nothing is removed. All eight stay',
    relation: 'so',
    secs: 6,
    vo: 'None of them. The router’s scores still matter.',
    /* The answer is drawn by subtraction not happening. Deliberately empty. */
    commands: [narrator.set({ pose: 'flat' })],
    clearSticky: true,
    overlays: [note('8 of 8 kept', 64, 62, { size: 'md', tone: 'word', rotate: -3 })],
  },
  {
    n: 6,
    id: 'scores-become-weights',
    title: 'The score markers return and the outputs thicken or thin to match',
    relation: 'and-yet',
    secs: 8,
    vo: 'The experts that scored higher get more influence. The ones that scored lower get less.',
    /* This is what §5's scoring beat was for. Without the weights the blend
     * looks like an average and the router's grading was decoration. */
    commands: [blend.weigh()],
    lateOverlays: {
      at: 3400,
      overlays: [note('thickness = router score', 66, 20, { tone: 'measure', rotate: 3, sticky: true })],
    },
  },
  {
    n: 7,
    id: 'weighted-and-blended',
    title: 'The eight converge into one merge, the heavier ones contributing more',
    relation: 'so',
    secs: 6,
    vo: 'So those eight outputs are weighted and blended back together.',
    commands: [blend.merge(), narrator.set({ pose: 'nod' })],
  },
  {
    n: 8,
    id: 'the-shared-joins',
    title: 'The separate block’s output arrives on its own path and joins',
    relation: 'so',
    secs: 7,
    vo: 'And remember the shared expert from the side? Its output joins too.',
    /* Its own path, arriving late. It was never in the eight-way competition,
     * and a path that merges with theirs would put it back in. */
    commands: [blend.plusOne()],
  },
  {
    n: 9,
    id: 'back-to-one-row',
    title: 'One row settles, with the input row ghosted beside it',
    relation: 'therefore',
    secs: 16,
    vo: 'After all of that... we are back to one row. Still 4,096 numbers long. Still our same `it`. But the values have changed again.',
    commands: [blend.done('after'), blend.compare(), narrator.set({ pose: 'offer' })],
    clearSticky: true,
    lateOverlays: {
      at: 7000,
      /* Same shape, new values — and the shape is the half the voice states
       * while the frame can only show the difference. */
      overlays: [brace('4,096 values, both', 64, 74, 28, { tone: 'measure', sticky: true })],
    },
  },
  {
    n: 10,
    id: 'one-step-deeper',
    title: 'The machinery recedes and only the changed row remains',
    relation: 'so',
    secs: 11,
    vo: 'So the token has not turned into a word yet. It has not produced an answer. It has simply been processed one step deeper.',
    commands: [narrator.set({ pose: 'think' })],
    stages: [
      /* The clear-out is held until the two negatives have been said. Stripping
       * the machinery on "not turned into a word yet" would read as the row
       * having failed at something. */
      {
        at: 5200,
        commands: [
          blend.off(),
          hospital.off(),
          row.show({ x: 50, y: 48 }, 1.02, { label: 'one step deeper' }),
        ],
      },
    ],
    clearSticky: true,
  },
  {
    n: 11,
    id: 'the-shape-the-next-layer-wants',
    title: 'The row is measured as the shape the next layer expects',
    relation: 'therefore',
    secs: 13,
    vo: 'And that is useful, because the next part of the model expects the same kind of object: another row of 4,096 numbers. So it can hand this new row forward.',
    /* Nothing moves. The event is the measurement: the row leaving this layer
     * is the same shape as the row that entered it, which is the only reason
     * the stack in §7 can exist at all. */
    commands: [row.count('4,096 values'), narrator.set({ pose: 'nod' })],
  },
  {
    n: 12,
    id: 'one-room-in-something-taller',
    title: 'Walls draw around the whole mechanism, then shrink until it is one room in something taller',
    relation: 'wall',
    secs: 19,
    vo: 'Context changed the row. The router chose who should work on it. The experts changed it again. That is one sparse layer’s basic story. And our `it` is nowhere near finished. Because GLM has 45 layers.',
    commands: [room.draw(), ground.at(GROUND_Y), narrator.off()],
    stages: [
      /* Shrinks in place rather than cutting away. §7 beat 2 continues this
       * exact move, and the reveal only lands if it is demonstrably the same
       * room the viewer has been standing in for two sections. */
      { at: 12000, commands: [room.hintAtMore(0.78)] },
    ],
    clearSticky: true,
    lateOverlays: {
      at: 14000,
      overlays: [centred('45 layers', 50, 90, { size: 'lg', tone: 'cost', rotate: -2 })],
    },
  },
]
