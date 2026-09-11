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
    id: 'added-onto-the-end',
    title: 'The sentence is now one token longer; a ninth marker appears',
    relation: 'so',
    secs: 12,
    vo: 'No. It starts at the bottom, floor one, same as the first word did. And the word it just made joins the end of your sentence.',
    commands: [out.off(), line.grow([...PROMPT, REPLY[0]]), tower.set({ markers: TOKENS + 1, floor: 1, kept: 0 })],
    lateOverlays: {
      at: 2600,
      overlays: [note('9 tokens now', 28, 86, { tone: 'measure', rotate: -3 })],
    },
  },
  {
    n: 4,
    id: 'what-is-kept',
    title: 'The eight earlier markers hold in place; none of them move',
    relation: 'so',
    secs: 9,
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
    vo: 'But the eight before it don’t climb again. Everything the model worked out about them is still sitting there, kept.',
    commands: [tower.set({ kept: TOKENS }), loop.show({ x: 74, y: 50 }, 0.9), loop.start()],
  },
  {
    n: 5,
    id: 'forty-five-floors-again',
    title: 'Only the new marker climbs, reading the kept work as it passes',
    relation: 'so',
    secs: 13,
    vo: 'Just the new word goes up. All forty-five floors. Forty-two of them choose — eight experts each time. Three hundred and thirty-six expert visits, for this one word.',
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
    secs: 11,
    vo: 'Your eight words cost two thousand, six hundred and eighty-eight visits, once. Every single word it writes back costs another three hundred and thirty-six.',
    commands: [],
    overlays: [centred('2,688 once\n+336 a word', 52, 34, { tone: 'measure', rotate: 3, sticky: true })],
  },
  {
    n: 10,
    id: 'it-never-stops-choosing',
    title: 'The running total climbs and does not stop',
    relation: 'wall',
    secs: 12,
    vo: 'And it doesn’t know which experts the next word needs until the next word is halfway up. It never stops re-choosing.',
    /* Deposit five, and the one that makes §11 inevitable. */
    commands: [loop.faster(1), narrator.set({ pose: 'push' })],
  },
  {
    n: 11,
    id: 'the-question-we-started-with',
    title: 'Everything halts at once; the tower and the finished reply hold',
    relation: 'and-yet',
    secs: 9,
    vo: 'So it never stops re-choosing. Which means we can finally ask the question we started with, properly.',
    /* Stop everything, then ask. The halt is what buys §11 its opening. */
    commands: [loop.halt(), tower.set({ markers: 0 }), narrator.set({ pose: 'think' })],
    clearSticky: true,
  },
]
