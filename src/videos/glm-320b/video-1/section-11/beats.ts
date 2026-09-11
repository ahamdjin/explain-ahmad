import { centred, GROUND_Y, note, tick, type Beat } from '../../../../paper'
import {
  GB_PER_WORD,
  MB_PER_EXPERT,
  VISITS,
  bars,
  camera,
  clock,
  count,
  desk,
  ground,
  machine,
  narrator,
  numbers,
  path,
  store,
  total,
  tower,
  type Patch,
} from './scene'

/**
 * Section 11 — So could you store only the 18 billion?
 *
 * Board: `video-script/video-1/11-could-you-store-only-the-18.md`. `npm run check:board`.
 *
 * **One camera move**, beat 2, and it takes us to a place the viewer already
 * knows — the plan from §1. It is drawn identically, or the callback does no
 * work at all.
 *
 * Note what this section may **not** claim. Never that all 320B must sit in GPU
 * VRAM: real systems shard, cache, quantize and offload. The honest claim is
 * that efficient serving needs *fast access* to whichever experts routing
 * picks, and beat 13's "not like that" is what keeps it honest.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'back-to-where-we-started',
    title: '`18` and `320` return and settle over the tower',
    relation: 'want',
    secs: 6,
    vo: 'Back to where we started. Eighteen billion out of three hundred and twenty.',
    commands: [
      ground.at(GROUND_Y),
      tower.show({ x: 26, y: 48 }, 0.82),
      numbers.show({ x: 68, y: 36 }, 1),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'heres-the-plan',
    title: 'We slide across to the plan, assembling itself piece by piece',
    relation: 'so',
    secs: 13,
    vo: 'And here’s the plan, stated honestly: keep the whole model on a drive. When the router picks its eight, go and get those eight. Do the work. Move on.',
    /* Pan, to a place the viewer already knows. Drawn identically to §1. */
    commands: [
      tower.off(),
      numbers.off(),
      camera.to({ x: 50, y: 50 }, 1),
      store.show({ x: 15, y: 42 }, 0.7),
      ground.at(GROUND_Y),
    ],
    stages: [
      { at: 1400, commands: [desk.show({ x: 45, y: 70 }, 0.46)] },
      { at: 2800, commands: [machine.show({ x: 82, y: 42 }, 0.72)] },
    ],
  },
  {
    n: 3,
    id: 'it-works',
    title: 'Eight blocks fly across; the work completes; a tick lands',
    relation: 'hope',
    secs: 8,
    vo: 'First token, first floor. Eight experts fetched. It works.',
    /* It has to visibly succeed. A plan that never worked cannot break. */
    commands: [path.fetch(8), machine.set({ filled: true }), narrator.set({ pose: 'hopeful' })],
    lateOverlays: {
      at: 3000,
      overlays: [tick(82, 22, { tone: 'measure' }), note('floor 1 — fine', 82, 30, { rotate: -3 })],
    },
  },
  {
    n: 4,
    id: 'second-floor',
    title: 'Eight *different* blocks fly across',
    relation: 'so',
    secs: 6,
    vo: 'Second floor. New row, new eight. Fetch those as well.',
    commands: [path.fetch(8)],
    overlays: [centred('floor 2 — a different eight', 50, 24, { tone: 'measure', rotate: 2 })],
  },
  {
    n: 5,
    id: 'third-floor',
    title: 'Eight more',
    relation: 'so',
    secs: 4,
    vo: 'Third floor. Again.',
    commands: [path.fetch(10)],
  },
  {
    n: 6,
    id: 'forty-two-times',
    title: 'The flights speed up until the path is continuously full',
    relation: 'wall',
    secs: 8,
    vo: 'And again, and again — forty-two times, for one token.',
    /* Traffic, not a barrier. The path is full and things are queuing. */
    commands: [path.congest(), narrator.set({ pose: 'slump' })],
  },
  {
    n: 7,
    id: 'how-much-did-we-carry',
    title: 'The flights stop; a counter lands',
    relation: 'so',
    secs: 5,
    vo: 'So how much did we actually carry in?',
    commands: [path.clear(), count.run(VISITS, 'experts carried in — one word')],
  },
  {
    n: 8,
    id: 'three-thirty-six-times-twenty-six',
    title: '336 and 26 MB slide together; a total assembles',
    relation: 'so',
    secs: 8,
    vo: 'One expert is about twenty-six megabytes. Three hundred and thirty-six of them is about eight gigabytes.',
    commands: [count.hold()],
    overlays: [
      centred(`${VISITS} × ${MB_PER_EXPERT} MB`, 50, 60, { size: 'lg', tone: 'measure', rotate: -2, sticky: true }),
    ],
  },
  {
    n: 9,
    id: 'for-one-word',
    title: 'The total lands and a label drops under it',
    relation: 'and-yet',
    secs: 5,
    vo: 'For one word.',
    commands: [
      count.off(),
      store.off(),
      desk.off(),
      total.show({ x: 40, y: 40 }, 1.2),
      narrator.set({ pose: 'shrug' }),
    ],
    clearSticky: true,
  },
  {
    n: 10,
    id: 'a-second-and-a-half',
    title: 'A clock draws itself beside the 8 GB and runs',
    relation: 'wall',
    secs: 8,
    vo: 'Off a fast drive, that’s roughly a second and a half. For one word.',
    commands: [machine.off(), clock.show({ x: 74, y: 40 }, 1), clock.start()],
    overlays: [note('off a fast drive —\nroughly', 74, 62, { tone: 'cost', rotate: 3 })],
  },
  {
    n: 11,
    id: 'and-the-work',
    title: 'A second bar appears beside the first, almost invisible',
    relation: 'and-yet',
    secs: 8,
    vo: 'And the work those eight experts actually did? Milliseconds.',
    commands: [
      total.off(),
      clock.off(),
      bars.fetch(),
      bars.both('about 50× more'),
      /* Two things held against each other -- the frame is a comparison. */
      narrator.set({ pose: 'weigh' }),
    ],
  },
  {
    n: 12,
    id: 'fetching-costs-more',
    title: 'Both bars redraw to true scale, with the small one magnified',
    relation: 'therefore',
    secs: 11,
    vo: 'There it is. The fetching costs more than the thinking. Not a bit more — hundreds of times more.',
    /* The most important frame in the video. To scale, and the enlargement of
     * the small bar is labelled on the frame. */
    commands: [bars.toScale()],
    lateOverlays: {
      at: 3400,
      overlays: [centred('the fetching costs more\nthan the thinking', 50, 18, { size: 'md', tone: 'cost', rotate: -1 })],
    },
  },
  {
    n: 13,
    id: 'not-like-that',
    title: 'The bars hold; nothing else on screen',
    relation: 'therefore',
    secs: 8,
    /* "Not like that" is the hinge into §12 and is not optional. */
    vo: 'So, no. You can’t just store the eighteen billion. Not like that.',
    /* "So, no." A refusal, not agreement. */
    commands: [narrator.set({ pose: 'halt' })],
    overlays: [centred(`~${GB_PER_WORD} GB a word — not like that`, 50, 88, { size: 'md', rotate: 1 })],
  },
]
