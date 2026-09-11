import { centred, GROUND_Y, note, PROMPT, REPLY, TOKENS, type Beat } from '../../../../paper'
import {aside, ground, line, loop, narrator, out, tower, visitsAfter, type Patch} from './scene'

/**
 * Section 10 — And then it does the whole thing again.
 *
 * Board: `video-script/video-1/10-and-then-it-does-it-again.md`. `npm run check:board`.
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
    secs: 9,
    vo: 'One word. So how do you get a paragraph out of a machine that produces one word?',
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
    id: 'does-it-get-a-shortcut',
    title: 'The card hovers near the base; nothing else moves',
    relation: 'and-yet',
    secs: 10,
    /* A question, not the answer -- S-06 needs a wrong intuition on offer, and
     * "it can skip ahead, the model just did all that" is a real one. v9 put
     * the answer here and cited S-06 on it, which is not a question. */
    vo: 'The model has just done all of that work. So to make the next word — does this one get a shortcut?',
    commands: [out.moveTo({ x: 30, y: 88 }, 0.3)],
  },
  {
    n: 3,
    id: 'no-shortcut',
    title: 'The card drops to the base and sits on floor one',
    relation: 'so',
    secs: 7,
    vo: 'No. It starts at the bottom. Floor one, same as the first word did.',
    commands: [out.moveTo({ x: 30, y: 92 }, 0.3), tower.set({ floor: 1 })],
  },
  {
    n: 4,
    id: 'joins-the-end',
    title: 'The sentence is now one token longer; a ninth marker appears',
    relation: 'so',
    secs: 7,
    /* `TOKENS + 1`, never a literal. The count changed once already when the
     * tokenizer was measured, and two boards were still saying ten. */
    vo: 'The word it just made joins the end of your sentence.',
    commands: [out.off(), line.grow([...PROMPT, REPLY[0]]), tower.set({ markers: TOKENS + 1, floor: 1, kept: 0 })],
    lateOverlays: {
      at: 2600,
      overlays: [note('9 tokens now', 28, 86, { tone: 'measure', rotate: -3 })],
    },
  },
  {
    n: 5,
    id: 'what-is-kept',
    title: 'The eight earlier markers hold in place; none of them move',
    relation: 'so',
    secs: 12,
    /*
     * This is decode, not prefill. v9 marched all nine markers back to the
     * base and replayed the climb for every one of them, and filed the KV
     * cache as an *aside* -- which cannot work, because the main picture was
     * teaching the thing the aside was there to correct. GROUND_TRUTH is
     * explicit: only the new token is pushed through the 45 layers.
     *
     * `Tower`'s `kept` prop holds the eight at the top, dimmed and still, and
     * sends only the ninth up from the base in beat 5. Checked by rendering:
     * `node scripts/capture-frames.mjs --section=section-10`.
     */
    vo: 'But the eight before it don’t climb again. The state it needs from those earlier tokens is kept. That’s the bit it doesn’t have to redo.',
    commands: [tower.set({ kept: TOKENS }), loop.show({ x: 74, y: 50 }, 0.9), loop.start()],
  },
  {
    n: 6,
    id: 'just-the-new-word',
    title: 'Only the ninth marker enters the base and climbs alone',
    relation: 'so',
    secs: 9,
    /* The aside opens without stopping the climb behind it. */
    vo: 'Just the new word goes up. All forty-five floors, reading the kept work as it passes.',
    commands: [aside.show({ x: 15, y: 18 }, 1)],
    stages: [
      { at: 1200, commands: [tower.climbTo(18)] },
      { at: 3000, commands: [tower.climbTo(33)] },
    ],
  },
  {
    n: 7,
    id: 'three-thirty-six-for-this-word',
    title: '42 of the 45 floors light as it passes; a counter runs with it',
    relation: 'so',
    secs: 12,
    /*
     * 42 decisions, 8 experts each, 336 visits -- in that order, and it is the
     * third time the viewer watches this number assemble (§7 beat 12, §8 beat
     * 10, here). It must look like the same number arriving again, so the
     * counter runs rather than appearing.
     */
    vo: 'Forty-two of those floors choose. Eight experts each time. Three hundred and thirty-six expert visits — for this one token.',
    commands: [loop.show({ x: 74, y: 50 }, 0.9), loop.start(), loop.faster(0.3)],
    stages: [{ at: 2600, commands: [tower.climbTo(45)] }],
    lateOverlays: {
      at: 5200,
      overlays: [note('336 — for one token', 58, 18, { size: 'md', tone: 'measure', rotate: -2 })],
    },
  },
  {
    n: 8,
    id: 'another-word-comes-out',
    title: 'Another card drops out at the top',
    relation: 'so',
    secs: 4,
    vo: 'And another word comes out.',
    commands: [loop.say(REPLY.slice(0, 2)), loop.count(visitsAfter(2))],
  },
  {
    n: 9,
    id: 'then-again-and-again',
    title: 'The cycle repeats, accelerating each time',
    relation: 'so',
    secs: 9,
    vo: 'Then again. And again. One word at a time.',
    commands: [loop.faster(0.62), aside.off()],
    stages: [
      { at: 1200, commands: [loop.say(REPLY.slice(0, 4)), loop.count(visitsAfter(4)), tower.climbTo(20)] },
      { at: 3000, commands: [loop.faster(0.9), loop.say(REPLY), loop.count(visitsAfter(6)), tower.climbTo(41)] },
    ],
  },
  {
    n: 10,
    id: 'while-you-sit-there',
    title: 'The produced words accumulate as a line of text beside the tower',
    relation: 'so',
    secs: 8,
    vo: 'That’s it. That’s what’s actually happening while you sit there watching it type.',
    commands: [narrator.set({ pose: 'lean' })],
    overlays: [note('you have watched this happen', 74, 12, { rotate: -2 })],
  },
  {
    n: 11,
    id: 'full-stack-fresh-choices',
    title: 'A counter beside each produced word ticks 336 per token',
    relation: 'so',
    secs: 11,
    vo: 'Your eight tokens cost two thousand, six hundred and eighty-eight visits, once. Every token it writes back costs another three hundred and thirty-six.',
    commands: [],
    overlays: [centred('2,688 once\n+336 a token', 52, 34, { tone: 'measure', rotate: 3, sticky: true })],
  },
  {
    n: 12,
    id: 'not-known-in-advance',
    title: 'The running total climbs and does not stop',
    /* `and-yet`, not `wall`. This is the complication that *earns* the wall on
     * beat 13; two walls in a row is two landings, which is none. */
    relation: 'and-yet',
    secs: 11,
    /*
     * Deposit five, and the one that makes §11 inevitable. The counter must
     * have no ceiling and no final value: the moment it lands on a number it
     * becomes a cost you could budget for, which is the belief §11 takes
     * apart.
     */
    vo: 'And it doesn’t know which experts the next word needs until the next word is halfway up.',
    commands: [loop.faster(1), narrator.set({ pose: 'push' })],
  },
  {
    n: 13,
    id: 'it-never-stops-choosing',
    title: 'Everything halts at once',
    relation: 'wall',
    secs: 6,
    /*
     * Everything, including the counter. The halt is what buys §11 its
     * opening, and it needs its own beat -- said over a still-running loop it
     * is a summary, and §11 opens on this stillness.
     */
    vo: 'It never stops re-choosing.',
    commands: [loop.halt(), narrator.set({ pose: 'think' })],
    clearSticky: true,
  },
  {
    n: 14,
    id: 'the-question-we-started-with',
    title: 'The tower and the finished reply hold together in frame',
    relation: 'and-yet',
    secs: 8,
    vo: 'Which means we can finally ask the question we started with, properly.',
    commands: [tower.set({ markers: 0, kept: 0 })],
  },
]
