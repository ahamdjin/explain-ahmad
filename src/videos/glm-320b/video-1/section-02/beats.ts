import { centred, FOLLOWED, GROUND_Y, note, PROMPT, UNEVEN, type Beat } from '../../../../paper'
import { camera, chip, extra, ground, narrator, sentence, vocab, type Patch } from './scene'

/**
 * Section 02 — Your words become tokens.
 *
 * The first four beats were rewritten with §1 so the seam no longer jumps back
 * to the old 288-expert room. §1 ends with the intact prompt travelling toward
 * GLM; §2 picks up that same prompt, follows it inward, lets it land, and only
 * then performs the first transformation.
 */

const SURFACE = { x: 46, y: 50 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'the-prompt-arrives',
    title: 'The exact prompt from §1 arrives at the model entrance',
    relation: 'want',
    secs: 6,
    vo: 'You hit send. This exact sentence is what goes in.',
    commands: [
      ground.at(GROUND_Y),
      sentence.show({ x: 38, y: 58 }, 0.5),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point' }),
    ],
    overlays: [note('your prompt', 34, 62, { tone: 'word', rotate: -4 })],
  },
  {
    n: 2,
    id: 'in-it-goes',
    title: 'The sentence starts travelling inward; the camera goes with it',
    relation: 'so',
    secs: 4,
    vo: 'And in it goes.',
    commands: [
      sentence.moveTo({ x: 50, y: 62 }, 0.46),
      camera.to({ x: 50, y: 60 }, 1.3),
      narrator.set({ pose: 'wonder' }),
    ],
  },
  {
    n: 3,
    id: 'follow-it-inside',
    title: 'We cross inside with the same prompt card',
    relation: 'so',
    secs: 4,
    vo: 'We follow it in.',
    commands: [camera.to({ x: 50, y: 62 }, 2.5), narrator.off()],
    stages: [
      {
        at: 1700,
        commands: [camera.home(), ground.at(GROUND_Y), sentence.moveTo({ x: 62, y: 40 }, 0.58)],
      },
    ],
  },
  {
    n: 4,
    id: 'the-first-thing',
    title: 'The prompt lands on the first surface',
    relation: 'so',
    secs: 6,
    vo: 'And before the model can do anything useful with it, this is the first thing that happens.',
    commands: [sentence.moveTo(SURFACE, 1), narrator.show({ x: 91, y: 70 }, 1, { pose: 'point' })],
  },
  {
    n: 5,
    id: 'it-gets-cut-up',
    title: 'The sentence fractures into pieces, in place',
    relation: 'wall',
    secs: 9,
    vo: 'It gets cut up. Into pieces — and this sentence happens to break mostly along the words.',
    commands: [sentence.fracture()],
    lateOverlays: {
      at: 3200,
      overlays: [note('the comma too', 61, 62, { tone: 'ink', rotate: 3 })],
    },
  },
  {
    n: 6,
    id: 'these-are-tokens',
    title: 'The pieces settle into a row',
    relation: 'so',
    secs: 12,
    vo: 'These are called tokens. That’s all a token is. A chunk of text. And from here on, whenever I count something, I’m counting tokens.',
    commands: [sentence.settle(), narrator.set({ pose: 'nod' })],
    overlays: [centred('8 tokens', 46, 66, { tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 7,
    id: 'unbelievable-is-three',
    title: '`unbelievable` drops in, shatters into three, and leaves',
    relation: 'and-yet',
    secs: 12,
    vo: 'Don’t get comfortable, though. Feed it "unbelievable" and you get this. Un. Belie. Vable. Not syllables, not prefixes — just the pieces it happens to have.',
    commands: [extra.show({ x: 46, y: 22 }, 0.6)],
    stages: [{ at: 1500, commands: [extra.set({ split: true, words: [...UNEVEN] })] }],
  },
  {
    n: 8,
    id: 'one-big-list',
    title: 'A tall list rises beside the row',
    relation: 'so',
    secs: 10,
    vo: 'And every token it knows about lives in one big list. How long do you reckon that list is?',
    commands: [
      extra.off(),
      sentence.moveTo({ x: 34, y: 34 }, 0.72),
      vocab.show({ x: 80, y: 48 }, 1.15),
      narrator.show({ x: 30, y: 76 }, 1, { pose: 'point', flip: false }),
    ],
    clearSticky: true,
    overlays: [centred('8 tokens', 34, 45, { tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 9,
    id: 'a-hundred-fifty-four-thousand',
    title: 'The list scrolls fast, decelerates, stops',
    relation: 'so',
    secs: 8,
    vo: 'A hundred and fifty-four thousand, eight hundred and eighty.',
    commands: [vocab.scroll()],
    lateOverlays: {
      at: 2600,
      overlays: [note('154,880\nentries', 80, 11, { tone: 'measure', rotate: 3, sticky: true })],
    },
  },
  {
    n: 10,
    id: 'a-row-number',
    title: 'The `dog` piece flies to the list and returns with a number',
    relation: 'so',
    secs: 12,
    vo: 'So each piece gets swapped for where it sits in that list. A row number. This one is five thousand, five hundred and sixty-two.',
    commands: [
      sentence.follow(FOLLOWED),
      chip.show({ x: 17, y: 34 }, 0.55, { label: PROMPT[FOLLOWED] }),
    ],
    stages: [
      { at: 900, commands: [chip.moveTo({ x: 80, y: 46 }, 0.5), vocab.land(5562)] },
      { at: 2600, commands: [chip.moveTo({ x: 46, y: 74 }, 0.7)] },
    ],
  },
  {
    n: 11,
    id: 'thats-a-token-id',
    title: 'The letters fade off the card; the digits stay',
    relation: 'so',
    secs: 8,
    vo: 'That number is called a token ID. And it’s the only thing that carries on.',
    commands: [chip.becomes(), narrator.set({ pose: 'nod' })],
    overlays: [centred('token ID', 46, 84, { tone: 'measure', rotate: -3 })],
  },
  {
    n: 12,
    id: 'thats-tokenising-done',
    title: 'The list withdraws; the number is alone in frame',
    relation: 'so',
    secs: 9,
    vo: 'And that’s the cutting up done — your sentence is numbers now. That’s all a tokeniser is.',
    commands: [vocab.off(), sentence.off(), narrator.off(), chip.moveTo({ x: 46, y: 46 }, 1)],
    clearSticky: true,
  },
  {
    n: 13,
    id: 'no-meaning-in-it',
    title: 'The number holds, and turns out to say nothing',
    relation: 'and-yet',
    secs: 16,
    vo: 'But think about what that number actually is. It’s a row number. It doesn’t mean dog — it means the five thousand, five hundred and sixty-second thing on a list. There’s no meaning in it at all.',
    commands: [],
    lateOverlays: {
      at: 3000,
      overlays: [centred('a name, not a meaning', 46, 62, { size: 'md', tone: 'cost', rotate: -2 })],
    },
  },
]
