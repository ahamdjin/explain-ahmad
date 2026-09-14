import { centred, FOLLOWED, GROUND_Y, note, PROMPT, UNEVEN, type Beat } from '../../../../paper'
import { camera, chip, extra, ground, narrator, sentence, vocab, type Patch } from './scene'

/**
 * Section 02 — Your words become tokens.
 *
 * §1 ends with the intact prompt travelling toward GLM. This section keeps the
 * same object alive, follows it inward, and performs the first transformation.
 * The rule for the rewrite is simple: explain what the viewer can see, ask only
 * questions they can actually reason about, and give unknowable facts directly.
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
      /* Bigger and closer to centre than it used to be. §1 hands this over as
       * the one object still on screen, and it arrived here at half scale in
       * the bottom-left corner -- which reads as a new small thing rather than
       * as the sentence we have just been following. */
      sentence.show({ x: 44, y: 48 }, 0.62),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point' }),
    ],
    overlays: [centred('your prompt', 44, 55, { tone: 'word', rotate: -4 })],
  },
  {
    n: 2,
    id: 'in-it-goes',
    title: 'The sentence starts travelling inward; the camera goes with it',
    relation: 'so',
    secs: 5,
    vo: 'Nothing clever yet. The whole sentence just goes in.',
    commands: [
      sentence.moveTo({ x: 50, y: 56 }, 0.54),
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
    secs: 8,
    vo: 'Before the model can reason about any of it, it has to turn the text into pieces it knows how to handle.',
    commands: [sentence.moveTo(SURFACE, 1), narrator.show({ x: 91, y: 70 }, 1, { pose: 'point' })],
  },
  {
    n: 5,
    id: 'it-gets-cut-up',
    title: 'The sentence fractures into pieces, in place',
    relation: 'wall',
    secs: 8,
    vo: 'So it cuts the sentence up. For this prompt, we get eight pieces.',
    commands: [sentence.fracture()],
    lateOverlays: {
      at: 2800,
      overlays: [note('the comma too', 61, 62, { tone: 'ink', rotate: 3 })],
    },
  },
  {
    n: 6,
    id: 'these-are-tokens',
    title: 'The pieces settle into a row',
    relation: 'so',
    secs: 10,
    vo: 'Those pieces are called tokens. A token is just a chunk of text the model knows how to handle.',
    commands: [sentence.settle(), narrator.set({ pose: 'nod' })],
    overlays: [centred('8 tokens', 46, 66, { tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 7,
    id: 'unbelievable-is-three',
    title: '`unbelievable` drops in, shatters into three, and leaves',
    relation: 'and-yet',
    secs: 11,
    vo: 'And token does not mean word. "Unbelievable" becomes un, belie, vable. Those are simply the pieces this tokenizer learned.',
    /*
     * 0.42, not 0.6. `Sentence` fills its width, so three pieces at 0.6 drew
     * cards half again as big as the eight-token row underneath -- the aside
     * out-shouting the thing it is an aside about. Matching the row's card
     * size is what makes this read as "and here is another sentence", which
     * is the only claim the beat makes.
     */
    commands: [extra.show({ x: 46, y: 24 }, 0.42)],
    stages: [{ at: 1500, commands: [extra.set({ split: true, words: [...UNEVEN] })] }],
    overlays: [centred('“unbelievable”', 46, 15, { size: 'sm', tone: 'word', rotate: -2 })],
  },
  {
    n: 8,
    id: 'one-big-list',
    title: 'A tall list rises beside the row',
    relation: 'so',
    secs: 10,
    vo: 'The model has a fixed list of every token it knows. Take a guess: a few thousand, or way more?',
    commands: [
      extra.off(),
      sentence.moveTo({ x: 34, y: 34 }, 0.72),
      vocab.show({ x: 80, y: 48 }, 1.15),
      narrator.show({ x: 14, y: 72 }, 1, { pose: 'point', flip: false }),
    ],
    clearSticky: true,
    overlays: [centred('8 tokens', 34, 45, { tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 9,
    id: 'a-hundred-fifty-four-thousand',
    title: 'The list scrolls fast, decelerates, stops',
    relation: 'so',
    secs: 7,
    vo: 'For GLM-5.3-Flash: one hundred and fifty-four thousand, eight hundred and eighty.',
    commands: [vocab.scroll()],
    lateOverlays: {
      at: 2200,
      overlays: [note('154,880\nentries', 80, 11, { tone: 'measure', rotate: 3, sticky: true })],
    },
  },
  {
    n: 10,
    id: 'a-row-number',
    title: 'The `dog` piece flies to the list and returns with a number',
    relation: 'so',
    secs: 12,
    vo: 'Each token gets the number of its row in that list. Here, the token " dog" lands on row five thousand, five hundred and sixty-two.',
    commands: [
      sentence.follow(FOLLOWED),
      chip.show({ x: 17, y: 34 }, 0.55, { label: PROMPT[FOLLOWED] }),
    ],
    stages: [
      { at: 900, commands: [chip.moveTo({ x: 80, y: 46 }, 0.5), vocab.land(5562, PROMPT[FOLLOWED])] },
      { at: 2600, commands: [chip.moveTo({ x: 46, y: 74 }, 0.7)] },
    ],
  },
  {
    n: 11,
    id: 'thats-a-token-id',
    title: 'The letters fade off the card; the digits stay',
    relation: 'so',
    secs: 9,
    vo: 'That number is the token ID. From here, the model can use the ID to look up everything it needs for this token.',
    commands: [chip.becomes(), narrator.set({ pose: 'nod' })],
    overlays: [centred('token ID', 46, 84, { tone: 'measure', rotate: -3 })],
  },
  {
    n: 12,
    id: 'thats-tokenising-done',
    title: 'The list withdraws; the number is alone in frame',
    relation: 'so',
    secs: 10,
    vo: 'So tokenization has done two things: split the text into tokens, then give each token an ID.',
    commands: [vocab.off(), sentence.off(), narrator.off(), chip.moveTo({ x: 46, y: 46 }, 1)],
    clearSticky: true,
  },
  {
    n: 13,
    id: 'no-meaning-in-it',
    title: 'The number holds, and turns out to say nothing',
    relation: 'and-yet',
    secs: 13,
    vo: 'But five thousand, five hundred and sixty-two tells you nothing about dogs. It is only an address. So where does the meaning come from?',
    commands: [],
    lateOverlays: {
      at: 2800,
      overlays: [centred('an address, not a meaning', 46, 62, { size: 'md', tone: 'cost', rotate: -2 })],
    },
  },
]
