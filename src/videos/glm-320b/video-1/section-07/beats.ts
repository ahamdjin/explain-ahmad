import { brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  DECISIONS,
  VISITS,
  count,
  ground,
  narrator,
  room,
  rowA,
  rowB,
  teamA,
  teamB,
  tower,
  visits,
  type Patch,
} from './scene'

/**
 * Section 07 — One layer becomes forty-five.
 *
 * Script and board: `video-script/video-1/07-one-layer-of-forty-five.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * §6 ends inside the bounded room with the changed row still in it. Beat 1
 * continues that object rather than cutting to a new one, and the room stays
 * full size until beat 6 — the rerouting argument has to be made *inside* it
 * or the pull-back has nothing to take away.
 *
 * The two numbers are not the same number. 42 decisions, 336 routed expert
 * visits, and beat 11 exists only to hold them apart.
 */

/** The row on floor one, and the row on floor two. Same token, different values. */
const FLOOR_1 = { x: 62, y: 64 }
const FLOOR_2 = { x: 62, y: 30 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'one-sparse-layer',
    title: 'The bounded room holds with the changed row inside it',
    relation: 'want',
    secs: 17,
    vo: 'What we just watched was one sparse layer. Our `it` came in as one row... looked at context... had experts chosen... went through those experts... and left as a changed row.',
    commands: [
      ground.at(GROUND_Y),
      room.show({ x: 50, y: 50 }, 1, { bounded: true }),
      rowA.show(FLOOR_1, 0.66),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'nod', flip: true }),
    ],
    lateOverlays: {
      /* A `?` on the thing the whole section is about to answer. The voice
       * says "one"; only the note asks *one of how many*. */
      at: 9000,
      overlays: [centred('layer 1 of ?', 50, 18, { size: 'md', tone: 'measure', rotate: -2 })],
    },
  },
  {
    n: 2,
    id: 'same-eight-or-not',
    title: 'Floor one’s eight sit beside the exiting row as small marks',
    relation: 'and-yet',
    secs: 12,
    vo: 'Now here’s the next fair question. When `it` reaches the next sparse layer... does it keep the same eight experts? Or does it choose again?',
    commands: [teamA.show({ x: 24, y: 64 }, 0.8), narrator.set({ pose: 'wonder' })],
    /* Names the marks. The question itself is spoken, so the note must not
     * repeat it — it labels which floor these eight belong to instead. */
    overlays: [note('floor 1’s eight', 14, 78, { tone: 'measure', rotate: -3, sticky: true })],
  },
  {
    n: 3,
    id: 'the-row-has-changed',
    title: 'The same row moves one floor up, visibly different from before',
    relation: 'so',
    secs: 7,
    vo: 'It chooses again. Because look at what we’re carrying upward. The row has changed.',
    commands: [rowB.show(FLOOR_2, 0.66), narrator.set({ pose: 'point' })],
    overlays: [brace('different values', 48, 20, 24, { tone: 'measure' })],
  },
  {
    n: 4,
    id: 'scored-from-that-row',
    title: 'A new sweep runs on floor two; eight light, overlapping only partly',
    relation: 'so',
    secs: 9,
    vo: 'And the router makes its decision from that row. So a new layer means a new router score.',
    commands: [teamB.show({ x: 24, y: 30 }, 0.8)],
  },
  {
    n: 5,
    id: 'a-fresh-decision',
    title: 'The same three steps run again, quickly, so the rule is seen',
    relation: 'so',
    secs: 9,
    vo: 'Some experts might happen to be selected again. Others won’t. But it is a fresh decision.',
    /* Re-run the sweep twice more rather than say it twice. Each set keeps a
     * couple of floor one's slots and drops the rest, which is the only honest
     * picture: fresh scoring, not forced novelty. */
    commands: [teamB.set({ lit: [1, 5, 6, 9, 11, 12, 15, 16] })],
    stages: [
      { at: 2600, commands: [teamB.set({ lit: [2, 3, 7, 8, 11, 13, 14, 17] })] },
      { at: 5200, commands: [teamB.set({ lit: [3, 4, 6, 9, 10, 13, 16, 18] })] },
    ],
    lateOverlays: {
      at: 6400,
      overlays: [note('floor 1 ∩ floor 2', 14, 16, { tone: 'relate', rotate: 2 })],
    },
  },
  {
    n: 6,
    id: 'pull-back',
    title: 'The room shrinks in place rather than being cut away from',
    relation: 'and-yet',
    secs: 7,
    vo: 'Now pull the camera back. That room we were standing in?',
    /* The room shrinks into the tower's footprint at the same z, so this is one
     * object becoming small inside another. Cut to a new scene and the viewer
     * cannot point back at §6 and say "we were in there" — which is the only
     * reason this beat exists. */
    commands: [
      rowA.off(),
      rowB.off(),
      teamA.off(),
      teamB.off(),
      tower.show({ x: 52, y: 50 }, 1, { floor: 1, markers: 1 }),
      room.shrink(0.16),
      room.moveTo({ x: 52, y: 78 }),
      narrator.off(),
    ],
    clearSticky: true,
  },
  {
    n: 7,
    id: 'a-stack-of-forty-five',
    title: 'Floors finish stacking around it until the count is readable',
    relation: 'therefore',
    secs: 8,
    vo: 'It is one layer in a stack of 45.',
    commands: [room.off()],
    lateOverlays: {
      at: 3000,
      overlays: [note('45 layers', 64, 16, { size: 'md', tone: 'measure', rotate: -2, sticky: true })],
    },
  },
  {
    n: 8,
    id: 'three-dense-forty-two-sparse',
    title: 'Three floors read as plain blocks; the rest keep their router marks',
    relation: 'so',
    secs: 12,
    vo: 'Three of those layers use a normal dense feed-forward block instead of routed experts. The other 42 are the sparse MoE layers we care about here.',
    /* Sit the marker on floor 4 — the first sparse floor — so the boundary
     * between the two populations is a place, not a caption. */
    commands: [tower.climbTo(4), tower.showTeams(), narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true })],
    overlays: [note('no router here', 60, 84, { tone: 'cost', rotate: 3 })],
  },
  {
    n: 9,
    id: 'forty-two-decisions',
    title: 'One routing dot lands on each sparse floor as `it` climbs',
    relation: 'so',
    secs: 10,
    vo: 'So for one token: 42 routing decisions.',
    commands: [count.run(DECISIONS, 'routing decisions'), narrator.set({ pose: 'count' })],
    stages: [
      { at: 1200, commands: [tower.climbTo(18)] },
      { at: 3400, commands: [tower.climbTo(31)] },
      { at: 5600, commands: [tower.climbTo(45)] },
    ],
  },
  {
    n: 10,
    id: 'eight-each-time',
    title: 'Eight tiny ticks fan out per sparse floor onto a second counter',
    relation: 'therefore',
    secs: 13,
    vo: 'And each decision selects 8 routed experts. So: 42 × 8 = 336 expert visits.',
    commands: [count.hold(), visits.run(VISITS, 'routed expert visits')],
    overlays: [note('42 × 8', 74, 70, { size: 'lg', tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 11,
    id: 'decisions-are-not-visits',
    title: 'Both counters hold side by side; nothing moves',
    relation: 'wall',
    secs: 18,
    vo: 'Important distinction: not 336 routing decisions. 42 decisions. 336 routed expert visits. For our one little `it`. And each decision happens only after the representation for that layer exists.',
    commands: [visits.hold(), narrator.set({ pose: 'think' })],
    lateOverlays: {
      /* The correction as a symbol. Both figures are spoken; only the note
       * says they are not the same kind of thing. */
      at: 5000,
      overlays: [centred('decisions ≠ visits', 50, 90, { size: 'md', tone: 'cost', rotate: -1 })],
    },
  },
  {
    n: 12,
    id: 'no-permanent-active-set',
    title: 'The tower holds while §1’s question is answered against it',
    relation: 'therefore',
    secs: 16,
    vo: 'Which already starts to answer our opening mystery. There isn’t one permanent group of experts called “the active 18 billion.” The active routed pieces are being chosen as the token moves through the model.',
    /* The traced climb is the answer: the path is a thing that got built, so
     * there was never a set sitting there waiting to be named. */
    commands: [tower.trace(), narrator.set({ pose: 'point' })],
    clearSticky: true,
    overlays: [note('§1 asked:\nwhich 18 billion?', 10, 24, { tone: 'cost', rotate: -2 })],
  },
  {
    n: 13,
    id: 'the-other-seven',
    title: 'Seven more token markers appear at the base beside `it`',
    relation: 'wall',
    secs: 12,
    vo: 'But we have been cheating a little. Because we followed only `it`. Our prompt had eight tokens. What happened to the other seven?',
    commands: [count.off(), visits.off(), tower.allEight(), narrator.set({ pose: 'confide' })],
    lateOverlays: {
      /* The split the voice does not give: one of the eight was followed and
       * seven were not, and that is the debt §8 opens on. */
      at: 5400,
      overlays: [note('1 followed · 7 not', 12, 88, { size: 'md', rotate: 2 })],
    },
  },
]
