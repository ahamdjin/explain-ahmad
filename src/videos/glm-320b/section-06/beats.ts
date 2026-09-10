import { centred, note, type Beat } from '../../../paper'
import { CHOSEN, blend, ground, hospital, narrator, room, row, type Patch } from './scene'

/**
 * Section 06 — The experts do the work.
 *
 * Board: `video-script/06-the-experts-do-the-work.md`. `npm run check:board`.
 *
 * **Beats 7-8 are the carrying frames**: the input row and the output row, same
 * length, obviously different values. If they look alike, the section taught
 * nothing and no amount of motion work fixes that.
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
    secs: 5,
    vo: 'Right. Eight experts picked. What do they actually do with it?',
    commands: [
      ground.at(88),
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
    secs: 6,
    vo: 'Each one takes the row, and puts out a different row.',
    commands: [blend.copy(), narrator.set({ pose: 'point' })],
  },
  {
    n: 3,
    id: 'eight-different-answers',
    title: 'Eight visibly different rows emerge on the far side',
    relation: 'so',
    secs: 6,
    vo: 'Same numbers going in. Eight different answers coming out.',
    commands: [blend.out()],
    overlays: [note('same row in, eight\ndifferent rows out', 12, 22, { tone: 'measure', rotate: -3 })],
  },
  {
    n: 4,
    id: 'not-an-equal-say',
    title: 'Each output takes the size of its expert’s score',
    relation: 'so',
    secs: 10,
    vo: 'And they don’t get an equal say. The router already scored them, so the ones that scored higher count for more.',
    commands: [blend.weigh()],
    lateOverlays: {
      at: 3000,
      overlays: [note('bigger = scored higher', 88, 22, { tone: 'measure', rotate: 3, sticky: true })],
    },
  },
  {
    n: 5,
    id: 'blended-in-proportion',
    title: 'The eight converge and merge, larger ones dominating',
    relation: 'so',
    secs: 6,
    vo: 'The eight get blended together, in proportion to their scores.',
    commands: [blend.merge()],
  },
  {
    n: 6,
    id: 'plus-the-always-on',
    title: 'The dashed shared expert’s output joins the merge',
    relation: 'so',
    secs: 4,
    vo: 'Plus the one that always runs.',
    commands: [blend.plusOne()],
  },
  {
    n: 7,
    id: 'a-single-row',
    title: 'One row settles, the same length as the one that went in',
    relation: 'therefore',
    secs: 8,
    vo: 'And out comes a single row. Same length as the one that went in. Completely different numbers.',
    commands: [blend.done()],
    clearSticky: true,
  },
  {
    n: 8,
    id: 'before-and-after',
    title: 'The row that arrived ghosts in beside it',
    relation: 'and-yet',
    secs: 5,
    vo: 'That’s the token, thought about, once.',
    commands: [blend.compare()],
  },
  {
    n: 9,
    id: 'having-had-eight-applied',
    title: 'The ghost fades; a label lands on the survivor',
    relation: 'so',
    secs: 13,
    vo: 'It arrived as "dog, in this sentence". It leaves as something more like "dog, in this sentence, having had eight blocks of the model applied to it".',
    commands: [blend.set({ ghost: false }), blend.done('thought about, once'), narrator.set({ pose: 'nod' })],
  },
  {
    n: 10,
    id: 'that-is-one-step',
    title: 'Everything else clears; the row is alone in the room',
    relation: 'therefore',
    secs: 5,
    vo: 'And that is one step. Done. Finished.',
    commands: [
      blend.off(),
      hospital.off(),
      row.show({ x: 50, y: 50 }, 0.72, { label: 'one step, done' }),
      narrator.off(),
    ],
  },
  {
    n: 11,
    id: 'the-room-gets-edges',
    title: 'The room’s walls, floor and ceiling draw themselves in',
    relation: 'and-yet',
    secs: 7,
    /*
     * Nothing is said over this. The frame is the whole beat: the room becomes
     * a bounded thing, so that §7 can take it away and make it one floor.
     */
    vo: 'Which raises the obvious question — how many steps are there?',
    commands: [room.draw(), ground.at(96)],
    lateOverlays: {
      at: 3000,
      overlays: [centred('how many steps\nare there?', 50, 86, { size: 'md', rotate: -2 })],
    },
  },
]
