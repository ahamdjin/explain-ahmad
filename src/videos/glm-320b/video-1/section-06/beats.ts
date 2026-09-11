import { centred, GROUND_Y, note, type Beat } from '../../../../paper'
import { CHOSEN, blend, ground, hospital, narrator, room, row, type Patch } from './scene'

/**
 * Section 06 — The experts do the work.
 *
 * Board: `video-script/video-1/06-the-experts-do-the-work.md`. `npm run check:board`.
 *
 * **Beats 9-10 are the carrying frames**: the input row and the output row,
 * same length, obviously different values. If they look alike, the section
 * taught nothing and no amount of motion work fixes that.
 *
 * Beats 4-5 are the question and its answer, and the answer is the surprising
 * one. Every viewer expects a winner -- top-k routing is usually explained as
 * a selection -- and there isn't one. All eight outputs survive, weighted. If
 * beat 4 is not genuinely still, beat 5 corrects nothing.
 *
 * Residual connections and normalisation are deliberately not here. They change
 * nothing the viewer needs and they cost two beats. If a viewer asks, that is
 * an aside.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'what-do-they-do',
    title: 'The eight lift forward; the 280 recede',
    relation: 'want',
    secs: 9,
    vo: 'Right — eight picked, out of two hundred and eighty-eight. What do they actually do with it?',
    commands: [
      ground.at(GROUND_Y),
      /*
       * The wall we came from, held well clear of the mechanism. At 0.62 behind
       * the blend its 288 figures collided with the eight blocks and the output
       * rows, and the frame became mush -- a background has to be behind
       * something, not on top of it.
       */
      hospital.show({ x: 50, y: 12 }, 0.3, { lit: CHOSEN }),
      hospital.recede(),
      blend.show({ x: 50, y: 52 }, 0.94),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'wonder', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'each-takes-the-row',
    title: 'The row copies eight times, one copy into each',
    relation: 'so',
    secs: 7,
    vo: 'The row goes into all eight of them. The same row, eight times.',
    commands: [blend.copy(), narrator.set({ pose: 'point' })],
  },
  {
    n: 3,
    id: 'eight-different-answers',
    title: 'Eight visibly different rows emerge on the far side',
    relation: 'so',
    secs: 8,
    vo: 'And eight different rows come out. Same numbers going in. Eight different answers coming out.',
    commands: [blend.out()],

    overlays: [note('same row in, eight\ndifferent rows out', 12, 22, { tone: 'measure', rotate: -3 })],
  },
  {
    n: 4,
    id: 'which-one-wins',
    title: 'The eight outputs hold side by side; nothing moves',
    relation: 'and-yet',
    secs: 8,
    /*
     * S-06, and the wrong intuition here is unusually strong: top-k routing is
     * almost always explained as a *selection*, so "which one wins?" feels
     * like the obvious next question. The frame must be completely still --
     * no drift, no narrator gesture -- or the viewer has nowhere to put a guess.
     */
    vo: 'So — eight answers. Which one wins?',
    commands: [narrator.set({ pose: 'wonder' })],
    lateOverlays: {
      at: 2600,
      overlays: [centred('which one wins?', 50, 88, { size: 'lg', rotate: -2, sticky: true })],
    },
  },
  {
    n: 5,
    id: 'none-of-them',
    title: 'All eight stay; none dims, none leaves',
    relation: 'so',
    secs: 6,
    /*
     * The correction, and it is a *non-event*: nothing dims and nothing
     * leaves. Anything moving here would read as a choice being made, which
     * is the belief the beat is taking apart.
     */
    vo: 'None of them. They all count.',
    commands: [narrator.set({ pose: 'flat' })],
    clearSticky: true,
    overlays: [note('all eight survive', 12, 80, { size: 'md', tone: 'word', rotate: -3 })],
  },
  {
    n: 6,
    id: 'not-an-equal-say',
    title: 'Each output takes the size of its expert’s score',
    /* The spoken line opens "But not equally" -- a contradiction, so it gets
     * the hanging `and-yet` spring rather than the quick `so`. A beat whose
     * words turn and whose motion continues reads as a list item. */
    relation: 'and-yet',
    secs: 11,
    vo: 'But not equally. The router already scored them, so the ones that scored higher count for more.',
    commands: [blend.weigh()],
    lateOverlays: {
      at: 3000,
      overlays: [note('bigger = scored higher', 88, 22, { tone: 'measure', rotate: 3, sticky: true })],
    },
  },
  {
    n: 7,
    id: 'blended-in-proportion',
    title: 'The eight converge and merge, larger ones dominating',
    relation: 'so',
    secs: 6,
    vo: 'They get blended together, in proportion to those scores.',
    commands: [blend.merge()],
  },
  {
    n: 8,
    id: 'plus-the-always-on',
    title: 'The dashed shared expert’s output joins the merge',
    relation: 'so',
    secs: 7,
    /* From outside the wall, where §5 beat 12 put it -- it is a 289th expert,
     * not one of the eight, and the merge must not absorb that distinction. */
    vo: 'And the one that’s always on gets blended in too.',
    commands: [blend.plusOne()],
  },
  {
    n: 9,
    id: 'a-single-row',
    title: 'One row settles, the same length as the one that went in',
    relation: 'therefore',
    secs: 9,
    vo: 'Out comes a single row. Same length as the one that went in. Completely different numbers.',
    commands: [blend.done()],
    clearSticky: true,
  },
  {
    n: 10,
    id: 'before-and-after',
    title: 'The row that arrived ghosts in beside it',
    relation: 'and-yet',
    secs: 5,
    vo: 'That’s the token, thought about. Once.',
    commands: [blend.compare()],
  },
  {
    n: 11,
    id: 'same-shape-it-was',
    title: 'The ghost fades; everything else clears; the row is alone',
    relation: 'so',
    secs: 15,
    /*
     * "The same shape it was" is the load-bearing clause. It is why the stack
     * can be 45 layers deep at all -- each step hands the next one an object
     * of the same kind -- and §7 beat 4's climb is unexplainable without it.
     */
    vo: 'It arrived as the word in this sentence. It leaves changed by eight blocks of the model — and it’s the same shape it was, so whatever comes next can’t tell the difference.',
    commands: [
      blend.off(),
      hospital.off(),
      row.show({ x: 50, y: 50 }, 0.72, { label: 'one step, done' }),
      narrator.set({ pose: 'nod' }),
    ],
  },
  {
    n: 12,
    id: 'the-room-gets-edges',
    title: 'The room’s walls, floor and ceiling draw themselves in around the row',
    relation: 'therefore',
    secs: 11,
    /*
     * S-12. The room becomes a bounded thing so that §7 can take it away and
     * make it one floor. The bound has to exist before it can be relativised.
     */
    vo: 'Look around. Choose. Work. That’s one full step of this machine, and it’s done.',
    commands: [room.draw(), ground.at(GROUND_Y), narrator.off()],
  },
  {
    n: 13,
    id: 'how-many-steps',
    title: 'The room shrinks in frame; edges above and below hint at more of them',
    relation: 'and-yet',
    secs: 10,
    /*
     * The hint, not the answer. Edges only -- a second complete room here
     * would answer the question this beat exists to ask, and §7 beat 2 would
     * have nothing left to reveal.
     */
    vo: 'Which raises the obvious question. How many steps are there?',
    commands: [room.hintAtMore(0.82)],
    lateOverlays: {
      at: 2800,
      overlays: [centred('how many steps\nare there?', 50, 90, { size: 'md', rotate: -2 })],
    },
  },
]
