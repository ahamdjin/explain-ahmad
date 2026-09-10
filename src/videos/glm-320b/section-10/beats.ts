import { centred, GROUND_Y, note, PROMPT, REPLY, type Beat } from '../../../paper'
import {aside, ground, line, loop, narrator, out, tower, visitsAfter, type Patch} from './scene'

/**
 * Section 10 — And then it does the whole thing again.
 *
 * Board: `video-script/10-and-then-it-does-it-again.md`. `npm run check:board`.
 *
 * Beat 8 connects the loop to something the viewer has literally watched happen
 * — a reply appearing a word at a time — and the text must build **at the pace
 * of the loop**, not smoothly. That is the whole reason `GenerateLoop` derives
 * its stagger from `pace` rather than using a fixed delay.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'one-word-out-of-a-machine',
    title: 'The tower and the single word card hold, apart',
    relation: 'want',
    secs: 8,
    vo: 'So how do you get a paragraph out of a machine that produces one word?',
    commands: [
      ground.at(GROUND_Y),
      tower.show({ x: 28, y: 48 }, 0.82),
      out.show({ x: 62, y: 22 }, 0.62, { label: REPLY[0] }),
      line.show({ x: 28, y: 93 }, 0.3),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'wonder', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'you-run-it-again',
    title: 'The card flies back to the base and joins the end of the sentence',
    relation: 'so',
    secs: 4,
    vo: 'You run it again.',
    commands: [out.moveTo({ x: 30, y: 88 }, 0.3)],
  },
  {
    n: 3,
    id: 'added-onto-the-end',
    title: 'The sentence is now one token longer; a tenth marker appears',
    relation: 'so',
    secs: 7,
    vo: 'The word it just made gets added onto the end of your sentence.',
    commands: [out.off(), line.grow([...PROMPT, REPLY[0]]), tower.set({ markers: 10, floor: 1 })],
    lateOverlays: {
      at: 2600,
      overlays: [note('10 tokens now', 28, 86, { tone: 'measure', rotate: -3 })],
    },
  },
  {
    n: 4,
    id: 'from-the-beginning',
    title: 'All ten markers enter at the base together',
    relation: 'so',
    secs: 5,
    /* "From the beginning" is said about the **sentence**, not the work. The
     * KV cache is why that distinction matters, and it is the aside below. */
    vo: 'And the whole thing goes back in. From the beginning.',
    commands: [tower.climbTo(3), loop.show({ x: 74, y: 50 }, 0.9), loop.start()],
  },
  {
    n: 5,
    id: 'forty-five-floors-again',
    title: 'The whole climb replays, faster',
    relation: 'so',
    secs: 8,
    vo: 'New sentence — one word longer. Forty-five floors. Look around, pick experts, do the work.',
    /* The aside opens without stopping the loop behind it. */
    commands: [aside.show({ x: 15, y: 18 }, 1), loop.faster(0.3)],
    stages: [
      { at: 900, commands: [tower.climbTo(18)] },
      { at: 2400, commands: [tower.climbTo(33)] },
      { at: 3800, commands: [tower.climbTo(45)] },
    ],
  },
  {
    n: 6,
    id: 'another-word-comes-out',
    title: 'Another card drops out at the top',
    relation: 'so',
    secs: 4,
    vo: 'And another word comes out.',
    commands: [loop.say(REPLY.slice(0, 2)), loop.count(visitsAfter(2))],
  },
  {
    n: 7,
    id: 'then-again-and-again',
    title: 'The cycle repeats, accelerating each time',
    relation: 'so',
    secs: 9,
    vo: 'Then again. And again. One word at a time, until it decides to stop.',
    commands: [loop.faster(0.62), aside.off()],
    stages: [
      { at: 1200, commands: [loop.say(REPLY.slice(0, 4)), loop.count(visitsAfter(4)), tower.climbTo(20)] },
      { at: 3000, commands: [loop.faster(0.9), loop.say(REPLY), loop.count(visitsAfter(6)), tower.climbTo(41)] },
    ],
  },
  {
    n: 8,
    id: 'while-you-sit-there',
    title: 'The produced words accumulate as a line of text beside the tower',
    relation: 'so',
    secs: 8,
    vo: 'That’s it. That’s what’s actually happening while you sit there watching a reply appear.',
    commands: [narrator.set({ pose: 'lean' })],
    overlays: [note('you have watched this happen', 74, 12, { rotate: -2 })],
  },
  {
    n: 9,
    id: 'full-stack-fresh-choices',
    title: 'A counter beside each produced word ticks 336 per token',
    relation: 'so',
    secs: 6,
    vo: 'Every single word of that reply. Full stack. Fresh choices.',
    commands: [],
    overlays: [centred('336 — for each\none of them', 52, 34, { tone: 'measure', rotate: 3, sticky: true })],
  },
  {
    n: 10,
    id: 'it-never-stops-choosing',
    title: 'The running total climbs and does not stop',
    relation: 'wall',
    secs: 11,
    vo: 'So it isn’t three hundred and thirty-six choices. It’s three hundred and thirty-six per token, per word it writes. It never stops choosing.',
    /* Deposit five, and the one that makes §11 inevitable. */
    commands: [loop.faster(1), narrator.set({ pose: 'push' })],
  },
  {
    n: 11,
    id: 'the-question-we-started-with',
    title: 'Everything halts at once; the tower and the finished reply hold',
    relation: 'and-yet',
    secs: 8,
    vo: 'Which means we can finally ask the question we started with properly.',
    /* Stop everything, then ask. The halt is what buys §11 its opening. */
    commands: [loop.halt(), tower.set({ markers: 0 }), narrator.set({ pose: 'think' })],
    clearSticky: true,
  },
]
