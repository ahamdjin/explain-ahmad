import { centred, GROUND_Y, note, type Beat } from '../../../paper'
import {
  SLOTS,
  cache,
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
 * Section 12 — How people actually run these.
 *
 * Board: `video-script/12-how-people-actually-run-these.md`. `npm run check:board`.
 *
 * **No camera moves.** We stay at the plan for the whole section, because the
 * section is a *modification* of the thing we are already looking at. Moving
 * would make the cache look like somewhere else.
 *
 * **Beat 14 is the video's honesty and may not be cut for time.** The machine
 * is still running at the end of this section. Slowly, but running. People run
 * `gpt-oss-120b` on a 24 GB card with expert offloading today, and a video that
 * pretends otherwise is wrong in a way its own audience will catch.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'people-do-run-these',
    title: 'The bars clear; a small machine slides in and runs, steadily',
    relation: 'wall',
    secs: 9,
    /* The concession, and it must be generous. It works before we qualify it. */
    vo: 'Except — people do run models like this on small machines. Right now. And they’re not lying about it.',
    commands: [
      ground.at(GROUND_Y),
      machine.show({ x: 72, y: 54 }, 1),
      machine.say(['bounced', 'off', 'the']),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'lean', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'what-are-they-doing',
    title: 'The machine keeps running while §11’s numbers hang over it',
    relation: 'and-yet',
    secs: 6,
    vo: 'So what are they doing that we just failed to do?',
    /* Both true at once. That tension is the section. */
    commands: [hangover.show({ x: 72, y: 14 }, 1)],
  },
  {
    n: 3,
    id: 'caching',
    title: 'A box appears in the path between the drive and the machine',
    relation: 'so',
    secs: 4,
    vo: 'Caching.',
    commands: [
      store.show({ x: 12, y: 50 }, 0.52),
      path.fetch(4),
      cache.show({ x: 43, y: 50 }, 1, { filled: 0 }),
    ],
    overlays: [note('cache', 40, 76, { size: 'md', rotate: -2 })],
  },
  {
    n: 4,
    id: 'experts-repeat',
    title: 'Two words run through; a couple of the same blocks used both times',
    relation: 'so',
    secs: 11,
    vo: 'Here’s the thing we noticed all the way back at the start. Experts repeat. Not always — but often enough to matter.',
    commands: [path.fetch(8)],
    stages: [{ at: 2200, commands: [cache.fill(3)] }],
  },
  {
    n: 5,
    id: 'quite-often-the-same',
    title: 'The repeating blocks stay in the box instead of returning',
    relation: 'so',
    secs: 7,
    /*
     * "Quite often" and no number. Nobody has published an overlap figure for
     * 288 experts at top-8, so the frame shows a couple staying and claims
     * nothing more precise than that.
     */
    vo: 'The next token quite often wants some of the same experts the last one did.',
    commands: [cache.fill(5), cache.hit(2)],
    overlays: [note('a couple of these stay', 43, 28, { tone: 'word', rotate: 3 })],
  },
  {
    n: 6,
    id: 'only-fetch-the-misses',
    title: 'The next word’s fetches split: most from the box, a few from the drive',
    relation: 'so',
    secs: 13,
    vo: 'So you don’t fetch every time. You keep the ones that keep coming back in fast memory, and you only go to the drive for the ones you’re missing.',
    commands: [cache.fill(7), cache.hit(5), path.fetch(3)],
    overlays: [note('short hop = a hit\nlong hop = a miss', 22, 30, { tone: 'measure', rotate: -3 })],
  },
  {
    n: 7,
    id: 'and-it-works',
    title: 'The machine speeds up; a model tag appears on the box',
    relation: 'hope',
    secs: 10,
    vo: 'And it works. Genuinely. On a model with eight experts on each floor, a small cache catches most of what you need.',
    /* The tag is the load-bearing honesty: which regime that figure came from. */
    commands: [
      cache.cite('measured on a model with 8 experts per floor'),
      machine.say(['bounced', 'off', 'the', 'wall']),
      narrator.set({ pose: 'cheer' }),
    ],
  },
  {
    n: 8,
    id: 'how-much-do-you-keep',
    title: 'A slider rises out of the floor under the box',
    relation: 'so',
    secs: 9,
    vo: 'Which turns the whole thing into one question. How much do you keep close?',
    /* Asked before they drag, so the failure to find a good setting is theirs. */
    commands: [slider.show({ x: 17, y: 78 }, 1), slider.ask('before I show you — where would you put it?')],
  },
  {
    n: 9,
    id: 'keep-more-and-its-big',
    title: 'Dragged up: the box swells, the machine races, its frame grows huge',
    relation: 'wall',
    secs: 10,
    vo: 'Keep more, and it’s fast — but now you need a big machine again, which is the thing we were trying to avoid.',
    commands: [slider.drive(0.95), path.fetch(1), cache.fill(24), cache.hit(20)],
    overlays: [note('fast. and enormous.', 72, 88, { tone: 'cost', rotate: 2 })],
  },
  {
    n: 10,
    id: 'keep-less-and-it-crawls',
    title: 'Dragged down: the box shrinks, long hops multiply, it crawls',
    relation: 'wall',
    secs: 9,
    vo: 'Keep less, the machine gets small — and the misses pile up, and it crawls.',
    commands: [slider.drive(0.06), cache.fill(2), cache.hit(0), path.pileUp()],
    overlays: [note('small. and slow.', 72, 88, { tone: 'cost', rotate: -2 })],
  },
  {
    n: 11,
    id: 'remember-what-were-choosing-from',
    title: 'The 288 wall and the 42 floors ghost in behind the box, dwarfing it',
    relation: 'and-yet',
    secs: 8,
    vo: 'And remember what we’re choosing from. Two hundred and eighty-eight experts, on each of forty-two floors.',
    commands: [
      wall.show({ x: 43, y: 36 }, 0.62),
      tower.show({ x: 66, y: 42 }, 0.5),
      path.fetch(0),
    ],
  },
  {
    n: 12,
    id: 'twelve-thousand-and-ninety-six',
    title: 'A count assembles from them and lands on the box',
    relation: 'wall',
    secs: 7,
    vo: 'Twelve thousand and ninety-six slots.',
    /* Built on screen, the way 336 was in §7. */
    commands: [count.run(SLOTS, 'places an expert could be')],
    overlays: [note('288 × 42', 40, 18, { size: 'md', tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 13,
    id: 'no-setting-where-its-both',
    title: 'The slider is dragged across its whole range; neither end shows both',
    relation: 'therefore',
    secs: 11,
    vo: 'There’s no setting on that slider where it’s both. That’s the trade, and on a model chopped this fine the exchange rate is brutal.',
    commands: [count.hold(), wall.off(), tower.off(), slider.drive(0.92)],
    clearSticky: true,
    stages: [
      { at: 2200, commands: [slider.drive(0.08), cache.fill(2), cache.hit(0)] },
      { at: 4400, commands: [slider.drive(0.5), cache.fill(9), cache.hit(4)] },
    ],
  },
  {
    n: 14,
    id: 'a-price-not-a-wall',
    title: 'The slider settles mid-range; the machine runs, slowly, and keeps running',
    relation: 'and-yet',
    secs: 10,
    /* May not be cut. The machine is still running at the end of this section. */
    vo: 'So you can run it on less. It’ll just be slow. That was never a wall — it’s a price.',
    commands: [
      slider.release(),
      path.fetch(5),
      machine.say(['bounced', 'off', 'the', 'wall', 'and']),
      narrator.set({ pose: 'nod' }),
    ],
    lateOverlays: {
      at: 3000,
      overlays: [centred('a price, not a wall', 50, 92, { size: 'md', rotate: -1 })],
    },
  },
]
