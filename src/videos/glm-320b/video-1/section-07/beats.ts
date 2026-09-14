import { GROUND_Y, note, type Beat } from '../../../../paper'
import { VISITS, camera, count, ground, narrator, room, rowA, rowB, tower, type Patch } from './scene'

/**
 * Section 07 — One layer becomes forty-five.
 *
 * The viewer already understands one sparse layer. The only new job here is to
 * scale that mechanism honestly: rerouting happens independently on each sparse
 * layer, there are 42 sparse layers and 3 dense ones, and 42 × 8 produces 336
 * routed expert visits — not 336 routing decisions.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'forty-five',
    title: 'The room holds, bounded, with the row inside it',
    relation: 'wall',
    secs: 8,
    vo: 'That room we just finished is only one layer.',
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
    secs: 7,
    vo: 'Pull back, and it becomes one floor in a much taller stack.',
    commands: [
      room.shrink(0.16),
      room.moveTo({ x: 52, y: 47 }),
      camera.to({ x: 52, y: 50 }, 1),
      tower.show({ x: 52, y: 50 }, 1, { floor: 24 }),
      narrator.off(),
    ],
  },
  {
    n: 3,
    id: 'there-are-forty-five',
    title: 'Floors stack upward until the count draws itself',
    relation: 'so',
    secs: 5,
    vo: 'GLM has forty-five layers in total.',
    commands: [room.off(), tower.set({ floor: 0 })],
    lateOverlays: {
      at: 2200,
      overlays: [note('45 layers', 78, 16, { size: 'md', tone: 'measure', rotate: -2, sticky: true })],
    },
  },
  {
    n: 4,
    id: 'it-climbs',
    title: 'A marker carrying the row starts climbing from floor one',
    relation: 'so',
    secs: 6,
    vo: 'Our token has to move through them in order.',
    commands: [tower.climbTo(1), narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true })],
  },
  {
    n: 5,
    id: 'the-same-two-things',
    title: 'On each floor it passes, three quick flashes fire in order',
    relation: 'so',
    secs: 12,
    vo: 'On most layers, the pattern repeats: update with context, route to experts, transform the row.',
    commands: [tower.climbTo(3), tower.flash('look')],
    stages: [
      { at: 1400, commands: [tower.flash('pick')] },
      { at: 2800, commands: [tower.flash('work')] },
    ],
    lateOverlays: {
      at: 3400,
      overlays: [note('context · route · transform', 20, 40, { tone: 'relate', rotate: -3 })],
    },
  },
  {
    n: 6,
    id: 'not-the-same-row',
    title: 'The row at floor one and floor two — pick again, or keep?',
    relation: 'so',
    secs: 9,
    vo: 'Now make a prediction. On the next sparse layer, does it keep the same eight experts, or route again?',
    commands: [tower.flash(undefined), tower.climbTo(2), rowA.show({ x: 18, y: 32 }, 0.32)],
    stages: [{ at: 1600, commands: [rowB.show({ x: 18, y: 52 }, 0.32)] }],
  },
  {
    n: 7,
    id: 'different-scores',
    title: 'The two rows hold side by side',
    relation: 'so',
    secs: 12,
    vo: 'It routes again. The representation has changed, so this layer scores experts from the new row.',
    commands: [],
    overlays: [note('new row →\nnew scores', 18, 68, { tone: 'measure', rotate: -2 })],
  },
  {
    n: 8,
    id: 'picks-again',
    title: 'Floor two’s eight light — mostly new positions, one or two held',
    relation: 'wall',
    secs: 12,
    vo: 'That can produce a different top eight. Some overlap is possible; nothing says the whole team has to be new.',
    commands: [tower.showTeams()],
    overlays: [note('rerouted here', 84, 44, { tone: 'cost', rotate: 3 })],
  },
  {
    n: 9,
    id: 'every-floor-picks-fresh',
    title: 'The climb resumes; every floor runs its own router',
    relation: 'so',
    secs: 8,
    vo: 'And the sparse layers make that routing decision independently, one layer after another.',
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
    secs: 14,
    vo: 'There is one detail: three of the forty-five use dense feed-forward blocks instead of routed experts. The other forty-two are sparse layers that route.',
    commands: [tower.climbTo(2), tower.showTeams()],
    clearSticky: true,
    lateOverlays: {
      at: 4400,
      overlays: [note('3 dense · 42 sparse', 20, 84, { size: 'md', rotate: -1 })],
    },
  },
  {
    n: 11,
    id: 'forty-two-times-eight',
    title: '42 and 8 slide together and a multiplication draws itself',
    relation: 'so',
    secs: 7,
    vo: 'So for one token: forty-two routing decisions, with eight routed experts selected each time.',
    commands: [tower.climbTo(6), narrator.set({ pose: 'count' })],
    overlays: [note('42 × 8', 84, 34, { size: 'lg', tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 12,
    id: 'three-hundred-and-thirty-six',
    title: 'The counter runs up the tower floor by floor and stops',
    relation: 'therefore',
    secs: 8,
    vo: 'Forty-two times eight equals three hundred and thirty-six routed expert visits for one token.',
    commands: [count.run(VISITS, 'expert visits — one token'), tower.climbTo(45)],
  },
  {
    n: 13,
    id: 'every-one-needed-the-one-below',
    title: '336 holds while a line traces the whole climb, bottom to top',
    relation: 'and-yet',
    secs: 15,
    vo: 'And those visits are spread across a sequence of layers. A later layer cannot route from a row the layer below has not produced yet. The full path is not known at the start.',
    commands: [count.hold(), tower.trace(), narrator.set({ pose: 'think' })],
    clearSticky: true,
    lateOverlays: {
      at: 3000,
      overlays: [note('the path is built\nlayer by layer', 20, 62, { size: 'md', tone: 'cost', rotate: -2 })],
    },
  },
]
