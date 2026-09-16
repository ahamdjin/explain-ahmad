import { brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  SLOTS,
  cache,
  card,
  count,
  ground,
  hangover,
  machine,
  narrator,
  path,
  slider,
  store,
  tower,
  wall,
  type Patch,
} from './scene'

/**
 * Section 12 — How people actually run these with less fast memory.
 *
 * Script and board: `video-script/video-1/12-how-people-actually-run-these.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * §11 leaves an empty cache shelf outlined between the store and the compute
 * path. Beat 1 fills that exact shelf rather than drawing a new one.
 *
 * Nothing on screen here may carry a hit rate, an optimal cache size, or a
 * slowdown figure: no such measurement exists for 288 routed experts at top-8,
 * and beat 11 says so out loud. The only numbers allowed are 288, 42, 12,096
 * and 5.6%.
 */

/** The box in the path. Everything in act 1 is measured against this point. */
const CACHE = { x: 43, y: 50 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'not-offloading',
    title: '§11’s empty shelf fills; store left, compute right',
    relation: 'and-yet',
    secs: 20,
    vo: 'The mistake in our last plan was not offloading. It was pretending we had to fetch every selected expert from the slowest place, every single time. Real systems can be smarter than that. The simplest improvement is a cache. Keep some expert weights in fast memory.',
    commands: [
      ground.at(GROUND_Y),
      store.show({ x: 12, y: 50 }, 0.56),
      path.fetch(4),
      cache.show(CACHE, 1, { filled: 0, hits: 0 }),
      machine.show({ x: 74, y: 54 }, 1),
      machine.say(['bounced', 'off', 'the']),
      /* §11's bill, still hanging, while the fix is being drawn under it. Both
       * frames are true at once, which is the whole correction. */
      hangover.show({ x: 74, y: 16 }, 1),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'confide', flip: true }),
    ],
    stages: [{ at: 11000, commands: [cache.fill(4)] }],
    lateOverlays: {
      at: 13000,
      /* Names the three zones, because the voice names only the middle one. */
      overlays: [note('storage → cache → compute', 8, 22, { size: 'md', tone: 'word', rotate: -2 })],
    },
  },
  {
    n: 2,
    id: 'a-hit',
    title: 'A requested block is already on the shelf and makes a short hop',
    relation: 'so',
    secs: 10,
    vo: 'When the router asks for an expert that is already there... that is a hit. No long trip needed.',
    commands: [path.fetch(1), cache.fill(4), cache.hit(2)],
    overlays: [note('HIT', 46, 30, { size: 'md', tone: 'word', rotate: -2 })],
  },
  {
    n: 3,
    id: 'a-miss',
    title: 'The next request is absent, travels the long way, and lands in the box',
    relation: 'so',
    secs: 12,
    vo: 'If the expert is not there... that is a miss. Then you fetch it from slower memory or storage, use it, and decide what should stay close.',
    commands: [path.fetch(6), cache.hit(1)],
    stages: [{ at: 6000, commands: [cache.fill(6)] }],
    /* One short trip and one long trip in the same frame — the carrying frame
     * for the beat. The brace measures the distance the voice never gives. */
    overlays: [
      note('MISS', 20, 28, { size: 'md', tone: 'cost', rotate: 2 }),
      brace('the long way', 14, 62, 26, { tone: 'cost', side: 'bottom' }),
    ],
  },
  {
    n: 4,
    id: 'smarter-still',
    title: 'Several requests run quickly — some short, some long',
    relation: 'so',
    secs: 9,
    vo: 'And systems can get smarter still. They can move experts between levels of memory. They can overlap transfers with computation.',
    /* Mixed traffic and no figures anywhere. A fraction on this frame would be
     * an invented locality measurement. */
    commands: [path.fetch(4), cache.fill(8), cache.hit(5), machine.say(['bounced', 'off', 'the', 'wall'])],
  },
  {
    n: 5,
    id: 'predict-or-prefetch',
    title: 'A faint second path starts a block moving before it is asked for',
    relation: 'therefore',
    secs: 14,
    vo: 'And some approaches try to predict or prefetch experts before the router fully needs them. So yes: you can run a large MoE model without keeping every weight in the fastest memory.',
    /* The bill from §11 goes here, and only here: this is the line that says
     * the naive cost was never the only option. */
    commands: [hangover.off(), path.fetch(3), cache.fill(10), cache.hit(6), narrator.set({ pose: 'nod' })],
    overlays: [note('prefetch?', 30, 66, { tone: 'word', rotate: -3 })],
  },
  {
    n: 6,
    id: 'now-a-trade',
    title: 'A slider rises between the store and the compute side, sitting in the middle',
    relation: 'and-yet',
    secs: 3,
    vo: 'But now we have a trade.',
    commands: [slider.show({ x: 17, y: 78 }, 1), slider.drive(0.5), narrator.set({ pose: 'weigh' })],
  },
  {
    n: 7,
    id: 'keep-more-close',
    title: 'Dragged one way: the shelf grows, long trips thin out, the footprint grows',
    relation: 'so',
    secs: 8,
    vo: 'Keep more experts close... and you need more fast memory, but you fetch less.',
    commands: [slider.drive(0.92), cache.fill(22), cache.hit(18), path.fetch(1)],
    overlays: [
      note('memory ↑', 30, 22, { tone: 'cost', rotate: -2 }),
      note('fetches ↓', 30, 68, { tone: 'measure', rotate: 2 }),
    ],
  },
  {
    n: 8,
    id: 'keep-fewer-close',
    title: 'Dragged the other way: the shelf shrinks, long trips multiply, the machine slows',
    relation: 'and-yet',
    secs: 11,
    vo: 'Keep fewer experts close... and the machine can fit into less fast memory, but you risk more misses and more waiting.',
    commands: [slider.drive(0.08), cache.fill(2), cache.hit(0), path.pileUp()],
    overlays: [
      note('memory ↓', 30, 22, { tone: 'measure', rotate: 2 }),
      note('waiting ↑', 30, 68, { tone: 'cost', rotate: -2 }),
    ],
  },
  {
    n: 9,
    id: 'where-is-the-setting',
    title: 'The slider returns to the middle and stops; nothing resolves it',
    relation: 'wall',
    secs: 7,
    vo: 'So where is the perfect setting? This is where I do not want to fake certainty.',
    commands: [slider.drive(0.5), path.fetch(4), cache.fill(9), cache.hit(4)],
    /* `ask` hands the handle back and leaves the track unmarked. There is no
     * correct position to draw, so the frame draws none. */
    stages: [{ at: 3000, commands: [slider.ask('?'), narrator.set({ pose: 'shrug' })] }],
  },
  {
    n: 10,
    id: 'it-depends-on',
    title: 'What the answer depends on appears around the slider instead of a value on it',
    relation: 'so',
    secs: 10,
    vo: 'It depends on the hardware. It depends on the workload. And it depends on how predictable and repetitive the expert choices actually are.',
    commands: [],
    /* Three labels around an unmarked control. `locality` is the one the voice
     * never gives a name to, and it is the one the next beat is about. */
    overlays: [
      note('hardware', 38, 74, { tone: 'ink', rotate: -2 }),
      note('workload', 50, 74, { tone: 'ink', rotate: 1 }),
      note('locality', 62, 74, { tone: 'word', rotate: -1 }),
    ],
  },
  {
    n: 11,
    id: 'twelve-thousand-and-ninety-six',
    title: 'The routing geometry ghosts in behind: 288 slots on each of 42 sparse floors',
    relation: 'and-yet',
    secs: 36,
    vo: 'For smaller MoE architectures, expert locality and caching have been measured and exploited. But for the specific 288-expert, top-8 routing regime we are using here, I do not have a published GLM-specific locality measurement that lets me tell you: “keep exactly this many experts and you’ll get exactly this hit rate.” That number would be made up. What we can say is that GLM has: 288 routed experts × 42 sparse layers = 12,096 layer-specific expert slots.',
    /* The tag says which regime the reassuring literature is from. It is the
     * qualifier that keeps this beat honest, so it rides on the box itself. */
    commands: [
      cache.cite('measured on smaller-expert-count MoE models'),
      wall.show({ x: 43, y: 36 }, 0.62),
      tower.show({ x: 66, y: 42 }, 0.5),
      path.fetch(0),
      narrator.set({ pose: 'think' }),
    ],
    stages: [{ at: 26000, commands: [count.run(SLOTS, 'layer-specific expert slots')] }],
    overlays: [note('288 × 42', 24, 13, { size: 'md', tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 12,
    id: 'not-the-headline-alone',
    title: 'The headline percentage is set against that geometry',
    relation: 'therefore',
    secs: 19,
    vo: 'Only eight routed experts are selected in each sparse layer for a token... but which eight matters for what has to be nearby next. So the amount of fast memory you need is not determined by the 5.6% active headline alone.',
    /* The carrying frame: `5.6% active` against `12,096 slots`, the headline
     * losing its memory claim. Both numbers, neither of them invented. */
    commands: [count.hold(), path.fetch(8), cache.hit(3), narrator.set({ pose: 'point' })],
    overlays: [
      note('5.6% active', 22, 30, { size: 'md', tone: 'measure', rotate: -2 }),
      note('8 of 288 · per sparse layer', 54, 30, { tone: 'word', rotate: 2 }),
    ],
  },
  {
    n: 13,
    id: 'every-choice-trades',
    title: 'The machine keeps running at a reduced setting while the options are labelled around it',
    relation: 'so',
    secs: 14,
    vo: 'You can use less fast memory. You can offload. You can cache. You can quantize. You can shard the model across devices. But every one of those choices changes the performance trade.',
    commands: [
      wall.off(),
      tower.off(),
      count.off(),
      slider.drive(0.35),
      path.fetch(6),
      cache.fill(6),
      cache.hit(3),
      machine.say(['bounced', 'off', 'the', 'wall', 'and']),
      narrator.set({ pose: 'offer' }),
    ],
    clearSticky: true,
    overlays: [
      note('offload', 44, 12, { tone: 'ink', rotate: -2 }),
      note('cache', 56, 12, { tone: 'ink', rotate: 1 }),
      note('quantize', 66, 12, { tone: 'ink', rotate: -1 }),
      note('shard', 80, 12, { tone: 'ink', rotate: 2 }),
    ],
  },
  {
    n: 14,
    id: 'back-to-the-number',
    title: 'The memory machinery recedes and the opening card floats back to centre',
    relation: 'therefore',
    secs: 13,
    vo: 'Which brings us back to the number that started this whole video. If “18 billion active” was never a direct promise about memory... what did it actually buy us?',
    /* Everything leaves and §1's headline is the only object left standing, so
     * §13 opens on a frame the viewer already owns. */
    commands: [
      store.off(),
      path.off(),
      cache.off(),
      slider.off(),
      machine.off(),
      card.show({ x: 50, y: 42 }, 1),
      narrator.off(),
    ],
    lateOverlays: {
      at: 8000,
      overlays: [centred('?', 50, 64, { size: 'lg', rotate: -2 })],
    },
  },
]
