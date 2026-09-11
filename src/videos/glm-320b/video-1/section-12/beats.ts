import { centred, GROUND_Y, note, type Beat } from '../../../../paper'
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
 * Board: `video-script/video-1/12-how-people-actually-run-these.md`. `npm run check:board`.
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
    secs: 13,
    /* The concession, and it must be generous. It works before we qualify it. */
    vo: 'So you can’t store only the active part. Except — people do run models like this on small machines. Right now. And they’re not lying about it.',
    commands: [
      ground.at(GROUND_Y),
      machine.show({ x: 72, y: 54 }, 1),
      machine.say(['bounced', 'off', 'the']),
      /* The concession, admitted rather than announced. */
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'confide', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'what-are-they-doing',
    title: 'The machine keeps running while §11’s numbers hang over it',
    relation: 'and-yet',
    secs: 7,
    vo: 'So what are they doing that we just failed to do?',
    /* Both true at once. That tension is the section. */
    commands: [hangover.show({ x: 72, y: 14 }, 1)],
  },
  {
    n: 3,
    id: 'caching',
    title: 'A box appears in the path between the drive and the machine',
    relation: 'so',
    secs: 7,
    /* Named as *theirs*, not ours -- §11 beat 14 planted it and endorsed it,
     * and calling back to that is what makes the reversal at beat 14 land on
     * a belief this video taught them. */
    vo: 'Caching. That thing you thought of.',
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
    secs: 10,
    /*
     * "Quite often" and no number. Nobody has published an overlap figure for
     * 288 experts at top-8, so the frame shows a couple staying and claims
     * nothing more precise than that.
     */
    vo: 'The next token quite often wants some of the same experts the last one did. So you don’t fetch every time.',
    commands: [cache.fill(5), cache.hit(2)],
    overlays: [note('a couple of these stay', 43, 28, { tone: 'word', rotate: 3 })],
  },
  {
    n: 6,
    id: 'only-fetch-the-misses',
    title: 'The next word’s fetches split: most from the box, a few from the drive',
    relation: 'so',
    secs: 14,
    vo: 'You keep the ones that keep coming back close, and you only go to the drive for the ones you’re missing.',
    commands: [cache.fill(7), cache.hit(5), path.fetch(3)],
    overlays: [note('short hop = a hit\nlong hop = a miss', 22, 30, { tone: 'measure', rotate: -3 })],
  },
  {
    n: 7,
    id: 'and-it-works',
    title: 'The machine speeds up; a model tag appears on the box',
    relation: 'hope',
    secs: 11,
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
    commands: [slider.show({ x: 17, y: 78 }, 1)],
  },
  {
    n: 9,
    id: 'wheres-the-good-setting',
    title: 'The slider holds untouched at neither end; nothing moves',
    relation: 'and-yet',
    secs: 10,
    /*
     * **The most valuable still frame in the video**, and it has to be its own
     * beat -- the build used to fold this into beat 8, which turns the
     * question into a caption on a moving control. The slider is a thing the
     * viewer can drag, they are asked where the good setting is *before*
     * anything moves, and then they watch both ends fail. A guess they made
     * themselves is what beats 14-15 get to take apart.
     *
     * `NCASE_4_MORE_DESIGN_PATTERNS.md` on asking before showing.
     */
    vo: 'Before I move it — where do you reckon the good setting is?',
    /* The slider carries the question itself, on the control the viewer is
     * about to drag. A second copy as an overlay only collided with it. */
    commands: [slider.ask('before I move it — where do you reckon the good setting is?'), narrator.set({ pose: 'wonder' })],
  },
  {
    n: 10,
    id: 'keep-more-and-its-big',
    title: 'Dragged up: the box swells, the machine races, its frame grows huge',
    relation: 'wall',
    secs: 12,
    vo: 'Keep more, and it’s fast — but now you need a big machine again, which is the thing we were trying to avoid.',
    commands: [slider.drive(0.95), path.fetch(1), cache.fill(24), cache.hit(20)],
    overlays: [note('fast. and enormous.', 72, 88, { tone: 'cost', rotate: 2 })],
  },
  {
    n: 11,
    id: 'keep-less-and-it-crawls',
    title: 'Dragged down: the box shrinks, long hops multiply, it crawls',
    relation: 'wall',
    secs: 9,
    vo: 'Keep less, the machine gets small — and the misses pile up, and it crawls.',
    commands: [slider.drive(0.06), cache.fill(2), cache.hit(0), path.pileUp()],
    overlays: [note('small. and slow.', 72, 88, { tone: 'cost', rotate: -2 })],
  },
  {
    n: 12,
    id: 'remember-what-were-choosing-from',
    title: 'The 288 wall and the 42 floors ghost in behind the box, dwarfing it',
    relation: 'and-yet',
    secs: 9,
    vo: 'And remember what we’re choosing from. Two hundred and eighty-eight experts, on each of forty-two floors.',
    commands: [
      wall.show({ x: 43, y: 36 }, 0.62),
      tower.show({ x: 66, y: 42 }, 0.5),
      path.fetch(0),
    ],
  },
  {
    n: 13,
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
    n: 14,
    id: 'no-setting-where-its-both',
    title: 'The slider is dragged across its whole range; neither end shows both',
    relation: 'therefore',
    secs: 16,
    vo: 'So it’s a trade — and where the good setting sits depends on how often the experts repeat. On eight-expert models, people have measured that. Nobody has measured it for twelve thousand slots.',
    commands: [count.hold(), wall.off(), tower.off(), slider.drive(0.92)],
    clearSticky: true,
    stages: [
      { at: 2200, commands: [slider.drive(0.08), cache.fill(2), cache.hit(0)] },
      { at: 4400, commands: [slider.drive(0.5), cache.fill(9), cache.hit(4)] },
    ],
  },
  {
    n: 15,
    id: 'nobody-knows-where',
    title: 'A question mark settles over the middle of the range, where a position would go',
    relation: 'wall',
    secs: 12,
    /*
     * The honest close to the reversal, and the reason it needs its own beat:
     * a question mark has to occupy the place a *position* would, so the
     * viewer sees an answer withheld rather than an answer missing. No
     * locality figure has been published for 288 experts at top-8 --
     * `research/glm/OFFLOADING_AND_LOCALITY.md` -- so the video may argue the
     * direction and may not name a setting.
     */
    vo: 'So the honest answer is that nobody knows where the good setting is. And "five percent active" was never going to tell you.',
    commands: [slider.drive(0.5), narrator.set({ pose: 'flat' })],
    lateOverlays: {
      at: 3400,
      overlays: [centred('nobody knows', 17, 92, { size: 'md', tone: 'cost', rotate: -2 })],
    },
  },
  {
    n: 16,
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
