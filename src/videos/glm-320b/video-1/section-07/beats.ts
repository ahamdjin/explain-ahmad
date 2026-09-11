import { GROUND_Y, note, type Beat } from '../../../../paper'
import { VISITS, camera, count, ground, narrator, room, rowA, rowB, tower, type Patch } from './scene'

/**
 * Section 07 — That was one layer. There are 45.
 *
 * Board: `video-script/video-1/07-one-layer-of-forty-five.md`. `npm run check:board`.
 *
 * Beat 1 answers §6's question in one word, immediately. Nothing is left
 * hanging for a second — that is the house style, and it is what stops this
 * from becoming the mystery structure the earlier drafts died of.
 *
 * **Beats 6-8 are the carrying frames**: two floors, two rows, two different
 * eights, on one frame.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'forty-five',
    title: 'The room holds, bounded, with the row inside it',
    relation: 'wall',
    secs: 8,
    vo: 'That’s one step — look around, choose, work. Here’s how many steps there are. Forty-five.',
    commands: [
      ground.at(GROUND_Y),
      room.show({ x: 50, y: 50 }, 1, { bounded: true }),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'one-floor',
    title: 'We keep backing away until the room is one floor among others',
    relation: 'and-yet',
    secs: 8,
    vo: 'That room we’ve been standing in this whole time is one floor.',
    /*
     * The pull-back. The room does not vanish and get replaced by a tower --
     * it shrinks, in place, until it is one band among forty-five. The
     * continuity is the whole effect.
     */
    commands: [
      room.shrink(0.16),
      room.moveTo({ x: 52, y: 47 }),
      camera.to({ x: 52, y: 50 }, 1),
      tower.show({ x: 52, y: 50 }, 1, { floor: 24 }),
      narrator.off(),
    ],
    /*
     * The room is *not* turned off here. It stays, shrunk, sitting inside the
     * floor it has become -- which is the whole read of the beat, and the first
     * version threw it away before the frame settled, leaving a tower with no
     * trace of where we had been standing. It leaves at beat 3.
     */
  },
  {
    n: 3,
    id: 'there-are-forty-five',
    title: 'Floors stack upward until the count draws itself',
    relation: 'so',
    secs: 5,
    vo: 'There are forty-five of them.',
    commands: [room.off(), tower.set({ floor: 0 })],
    lateOverlays: {
      at: 2600,
      overlays: [note('45 floors', 78, 16, { size: 'md', tone: 'measure', rotate: -2, sticky: true })],
    },
  },
  {
    n: 4,
    id: 'it-climbs',
    title: 'A marker carrying the row starts climbing from floor one',
    relation: 'so',
    secs: 5,
    vo: 'The token doesn’t get processed once. It climbs.',
    commands: [tower.climbTo(1), narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true })],
  },
  {
    n: 5,
    id: 'the-same-two-things',
    title: 'On each floor it passes, three quick flashes fire in order',
    relation: 'so',
    secs: 8,
    vo: 'And every floor does the same two things. Look around. Pick experts. Do the work.',
    commands: [tower.climbTo(3), tower.flash('look')],
    /* In order, because the order is the argument. */
    stages: [
      { at: 1400, commands: [tower.flash('pick')] },
      { at: 2800, commands: [tower.flash('work')] },
    ],
    lateOverlays: {
      at: 3600,
      overlays: [note('look · pick · work\n— in that order', 20, 40, { tone: 'relate', rotate: -3 })],
    },
  },
  {
    n: 6,
    id: 'not-the-same-row',
    title: 'The row at floor one and floor two — different values',
    relation: 'so',
    secs: 8,
    vo: 'So: same word, one floor up. Do you reckon it picks the same eight?',
    commands: [tower.flash(undefined), tower.climbTo(2), rowA.show({ x: 18, y: 32 }, 0.32)],
    stages: [{ at: 1600, commands: [rowB.show({ x: 18, y: 52 }, 0.32)] }],
  },
  {
    n: 7,
    id: 'different-scores',
    title: 'The two rows hold side by side',
    relation: 'so',
    secs: 12,
    vo: 'No. Because the row arriving at floor two is not the row that arrived at floor one. Different row, different scores, different eight.',
    commands: [],
    overlays: [note('different row →\ndifferent scores', 18, 68, { tone: 'measure', rotate: -2 })],
  },
  {
    n: 8,
    id: 'different-eight',
    title: 'Floor two’s eight light, in different positions from floor one’s',
    relation: 'wall',
    secs: 6,
    vo: 'Different eight.',
    commands: [tower.showTeams()],
    overlays: [note('two floors,\ntwo teams', 84, 44, { tone: 'cost', rotate: 3 })],
  },
  {
    n: 9,
    id: 'every-floor-picks-fresh',
    title: 'The climb resumes; every floor lights a different eight',
    relation: 'so',
    secs: 7,
    vo: 'Every floor picks fresh. Same token, same model, new team.',
    commands: [rowA.off(), rowB.off()],
    stages: [
      { at: 700, commands: [tower.climbTo(14)] },
      { at: 2000, commands: [tower.climbTo(27)] },
      { at: 3400, commands: [tower.climbTo(38)] },
    ],
  },
  {
    n: 10,
    id: 'three-are-dense',
    title: 'The bottom three floors redraw plain, without expert walls',
    relation: 'and-yet',
    secs: 15,
    /* Before beat 11, or the arithmetic is 8 x 45. */
    vo: 'Now — three of the forty-five don’t have experts at all. They’re plain blocks that everything goes through. The other forty-two are the ones that choose. Those are called the sparse ones.',
    commands: [tower.climbTo(2), tower.showTeams()],
    clearSticky: true,
    lateOverlays: {
      at: 4800,
      overlays: [note('3 plain · 42 that choose', 20, 84, { size: 'md', rotate: -1 })],
    },
  },
  {
    n: 11,
    id: 'forty-two-times-eight',
    title: '42 and 8 slide together and a multiplication draws itself',
    relation: 'so',
    secs: 5,
    vo: 'Forty-two floors. Eight experts each.',
    /* Counting it out, because the next beat multiplies it. */
    commands: [tower.climbTo(6), narrator.set({ pose: 'count' })],
    overlays: [note('42 × 8', 84, 34, { size: 'lg', tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 12,
    id: 'three-hundred-and-thirty-six',
    title: 'The counter runs up the tower floor by floor and stops',
    relation: 'therefore',
    secs: 9,
    vo: 'Which means this isn’t eight expert visits for this token. It’s three hundred and thirty-six.',
    /*
     * The counter climbs *with* the marker, so 336 is watched being built
     * rather than announced. A number the viewer saw assembled is a number
     * they trust.
     */
    commands: [count.run(VISITS, 'expert visits — one token'), tower.climbTo(45)],
  },
  {
    n: 13,
    id: 'every-one-needed-the-one-below',
    title: '336 holds while a line traces the whole climb, bottom to top',
    relation: 'and-yet',
    secs: 16,
    vo: 'Three hundred and thirty-six choices, for one token — and every single one of them needed the floor below to finish before it could be made. Nobody quotes that number. It’s the one that matters.',
    commands: [count.hold(), tower.trace(), narrator.set({ pose: 'think' })],
    clearSticky: true,
    /* Deposit three, and the strongest one. */
    lateOverlays: {
      at: 3000,
      overlays: [note('every one needed the\nfloor below to finish first', 20, 62, { size: 'md', tone: 'cost', rotate: -2 })],
    },
  },
]
