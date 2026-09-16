import { brace, centred, GROUND_Y, note, tick, type Beat } from '../../../../paper'
import {
  GB_PER_TOKEN,
  MB_PER_EXPERT,
  VISITS,
  box,
  camera,
  clock,
  count,
  desk,
  ground,
  machine,
  narrator,
  numbers,
  path,
  shelf,
  store,
  total,
  tower,
  type Patch,
} from './scene'

/**
 * Section 11 — So which 18 billion are active?
 *
 * Script and board: `video-script/video-1/11-could-you-store-only-the-18.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * §10 freezes the decode loop with §1's two numbers already back over the
 * tower. Beat 1 holds that frame rather than rebuilding it.
 *
 * The arithmetic in act 3 is an explicitly **naive, no-cache** thought
 * experiment and the frame says so in as many words. This section must never
 * imply offloading is impossible — beat 13 is the hinge into §12 and says out
 * loud that people do run these models this way.
 */

/** The three sparse floors beat 3 climbs, slowly, one choice each. */
const SPARSE_FLOORS = [6, 7, 8]

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'the-opening-question',
    title: 'The opening numbers hold over a tower the viewer can now read',
    relation: 'want',
    secs: 13,
    vo: 'Now we can finally answer the question from the beginning. When GLM says about 18 billion parameters are active per token... which 18 billion are they?',
    commands: [
      ground.at(GROUND_Y),
      tower.show({ x: 26, y: 48 }, 0.82),
      numbers.show({ x: 62, y: 34 }, 1),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'not-one-fixed-chunk',
    title: 'The active highlight splits into a steady part and scattered routed picks',
    relation: 'so',
    secs: 14,
    vo: 'The answer is: not one fixed 18-billion-parameter chunk. Some parts of the model are used all the time. Those are predictable. But the routed expert part is different.',
    /* Two floors lit at once with their eights in different slots. That single
     * picture is the answer; the spoken line only names what is on screen. */
    commands: [numbers.off(), tower.choose(20), narrator.set({ pose: 'weigh' })],
    lateOverlays: {
      at: 5600,
      overlays: [
        note('3 dense + attention — always', 46, 68, { size: 'sm', rotate: -2, sticky: true }),
        note('8 of 288, re-chosen', 46, 22, { size: 'sm', tone: 'claim', rotate: 3, sticky: true }),
      ],
    },
  },
  {
    n: 3,
    id: 'chosen-along-the-way',
    title: 'One tracked token climbs three sparse floors: arrive, choose eight, change',
    relation: 'so',
    secs: 23,
    vo: 'At each sparse layer, the router waits for the token’s current representation... scores the 288 experts in that layer... and chooses eight. Then the representation changes. The next sparse layer makes its own choice. And the next generated token can make different choices again.',
    commands: [tower.choose(SPARSE_FLOORS[0], 'look')],
    clearSticky: true,
    stages: [
      { at: 3000, commands: [tower.choose(SPARSE_FLOORS[0], 'pick')] },
      { at: 6000, commands: [tower.choose(SPARSE_FLOORS[0], 'work')] },
      { at: 9500, commands: [tower.choose(SPARSE_FLOORS[1], 'look')] },
      { at: 12500, commands: [tower.choose(SPARSE_FLOORS[1], 'pick')] },
      { at: 16000, commands: [tower.choose(SPARSE_FLOORS[2], 'look')] },
      { at: 19000, commands: [tower.choose(SPARSE_FLOORS[2], 'pick')] },
    ],
  },
  {
    n: 4,
    id: 'the-box-that-fails',
    title: 'A box labelled `THE 18B` gathers pieces and the next layer selects outside it',
    relation: 'wall',
    secs: 16,
    vo: 'So the model does not know one permanent list of “the useful 18 billion” that we can cut out and keep forever. The routed part of that active set is being decided along the way.',
    /* §1's tempting plan, finally broken — and broken by being watched, not by
     * being contradicted. The box is drawn, filled, and then overrun. */
    commands: [tower.settle(), box.show({ x: 58, y: 42 }, 1), narrator.set({ pose: 'slump' })],
    stages: [{ at: 8000, commands: [box.leak(), tower.choose(9)] }],
    lateOverlays: {
      at: 9200,
      overlays: [note('chosen after the box was drawn', 58, 78, { size: 'sm', tone: 'cost', rotate: 2 })],
    },
  },
  {
    n: 5,
    id: 'keep-it-somewhere-cheaper',
    title: 'The failed box is replaced by store, tower and fast compute',
    relation: 'so',
    secs: 20,
    vo: 'Which means our original idea needs an upgrade. Maybe we do not keep all the experts in fast memory. Maybe we keep the full model somewhere cheaper — say system memory or storage — and whenever the router chooses eight experts... we fetch those eight.',
    /* Assembled in §1's order — drive, desk, machine — because it has to be
     * recognisably the same plan the video opened with. */
    commands: [box.off(), tower.settle(), tower.moveTo({ x: 47, y: 48 }, 0.6), narrator.set({ pose: 'hopeful' })],
    stages: [
      { at: 3600, commands: [store.show({ x: 12, y: 42 }, 0.66)] },
      { at: 9000, commands: [desk.show({ x: 44, y: 72 }, 0.44)] },
      { at: 14000, commands: [machine.show({ x: 82, y: 42 }, 0.72)] },
    ],
  },
  {
    n: 6,
    id: 'it-does-work',
    title: 'One floor selects eight, eight blocks travel, and it works',
    relation: 'hope',
    secs: 5,
    vo: 'That sounds reasonable.',
    /* It has to visibly succeed. A plan that never worked cannot break. */
    commands: [tower.choose(9), path.fetch(8), machine.set({ filled: true })],
    lateOverlays: {
      at: 2600,
      overlays: [tick(84, 24, { tone: 'measure' }), note('8 blocks — one layer', 78, 32, { size: 'sm', rotate: -3 })],
    },
  },
  {
    n: 7,
    id: 'test-the-naive-version',
    title: 'The next floor chooses from its own 288 and another shipment travels',
    relation: 'so',
    secs: 6,
    vo: 'So let’s actually test the naive version of that plan.',
    commands: [tower.choose(10), path.fetch(8), narrator.set({ pose: 'count' })],
    overlays: [note('a different 8', 44, 24, { size: 'sm', tone: 'claim', rotate: 2 })],
  },
  {
    n: 8,
    id: 'one-block-measured',
    title: 'One routed block is zoomed and measured',
    relation: 'so',
    secs: 9,
    vo: 'One routed expert in GLM is roughly 25 megabytes at FP8-sized weight storage.',
    /* The only camera move in the section, and it is a measurement: we go in
     * close on a single block so the figure attaches to an object. */
    commands: [path.fetch(1), camera.to({ x: 50, y: 42 }, 1.6)],
    lateOverlays: {
      at: 3200,
      overlays: [brace(`~${MB_PER_EXPERT} MB · 4096 × 2048 × 3`, 32, 56, 36, { tone: 'measure', voice: 'figure' })],
    },
  },
  {
    n: 9,
    id: 'three-hundred-and-thirty-six',
    title: 'The count builds against the tower, reusing §7’s figure',
    relation: 'so',
    secs: 10,
    vo: 'Our token visits: 8 experts × 42 sparse layers = 336 routed expert blocks.',
    commands: [camera.home(), path.clear(), count.run(VISITS, 'routed expert blocks — one token')],
  },
  {
    n: 10,
    id: 'eight-and-a-half-gigabytes',
    title: 'A traffic meter fills for a single token',
    relation: 'so',
    secs: 16,
    vo: 'If none of those routed expert weights were already close by, and we fetched every selected block on demand... we would move roughly: 8.5 gigabytes of routed expert weights for one token.',
    commands: [count.hold(), path.congest(), narrator.set({ pose: 'carry' })],
    stages: [
      {
        at: 9000,
        commands: [count.off(), store.off(), desk.off(), tower.off(), total.show({ x: 40, y: 20 }, 1.15)],
      },
    ],
    lateOverlays: {
      at: 9600,
      overlays: [
        centred(`${VISITS} × ${MB_PER_EXPERT} MB`, 40, 34, { size: 'lg', tone: 'measure', rotate: -2, sticky: true }),
      ],
    },
  },
  {
    n: 11,
    id: 'a-clock-and-an-idle-machine',
    title: 'A clock runs while the compute side simply waits',
    relation: 'wall',
    secs: 22,
    vo: 'Just moving that much data from a fast SSD at, say, around 5 gigabytes per second would take roughly 1.7 seconds. And that is before pretending this is a complete performance model — it isn’t. Different hardware, buses, caching, overlap and prefetching change the real result.',
    /* The caveat is a frame, not a footnote. A bandwidth division presented
     * without its assumptions on screen is the one dishonest thing this
     * section could do. `research/glm/GROUND_TRUTH.md`. */
    commands: [machine.set({ filled: false }), clock.show({ x: 74, y: 22 }, 0.92), clock.start()],
    clearSticky: true,
    lateOverlays: {
      at: 11000,
      overlays: [
        centred('one drive · no cache · no overlap — an illustration, not a benchmark', 50, 80, {
          size: 'md',
          tone: 'cost',
          rotate: -1,
          sticky: true,
        }),
      ],
    },
  },
  {
    n: 12,
    id: 'the-naive-plan-is-awful',
    title: '`bad plan` stamps the route; the machine is left standing',
    relation: 'therefore',
    secs: 10,
    vo: 'The point is simpler: the completely naive “fetch every selected expert from slow storage every time” plan is awful.',
    /* A stamp, not a cross. The plan is bad; the machine still runs — which is
     * the whole difference between this beat and an overclaim. */
    commands: [clock.off(), total.off(), narrator.set({ pose: 'halt' })],
    clearSticky: true,
    overlays: [
      note(`~${GB_PER_TOKEN} GB · ~1.7 s — every token, no cache`, 32, 22, {
        size: 'md',
        tone: 'cost',
        rotate: -6,
        backed: true,
      }),
    ],
  },
  {
    n: 13,
    id: 'not-impossible',
    title: 'A small fast-memory shelf appears between the store and compute',
    relation: 'and-yet',
    secs: 19,
    vo: 'But notice what I did not say. I did not say offloading is impossible. Because it isn’t. People do run large MoE models with less fast memory than the full checkpoint needs. So what are they doing differently?',
    /* Drawn and left **empty**. §12 is what fills it, and the question mark is
     * the handover. The shelf must not be explained here. */
    commands: [path.clear(), store.show({ x: 12, y: 42 }, 0.66), narrator.set({ pose: 'confide' })],
    stages: [
      { at: 6000, commands: [shelf.show({ x: 46, y: 46 }, 0.62, { outline: true })] },
      { at: 12000, commands: [shelf.finish(), narrator.set({ pose: 'wonder' })] },
    ],
    lateOverlays: {
      at: 13000,
      overlays: [centred('what goes in here?', 46, 74, { size: 'md', tone: 'relate', rotate: 2 })],
    },
  },
]
