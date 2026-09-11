import { centred, FOLLOWED, GROUND_Y, note, PROMPT, type Beat } from '../../../../paper'
import {
  camera,
  chip,
  desk,
  extra,
  ground,
  hospital,
  narrator,
  sentence,
  vocab,
  type Patch,
} from './scene'

/**
 * Section 02 — Your words become tokens.
 *
 * Board: the `## Storyboard` table in
 * `video-script/video-1/02-your-words-become-tokens.md`. `npm run check:board`.
 *
 * **Beats 2-4 are three physical events** — it arrives, it goes in, it lands —
 * where the old script had one floating assertion. The camera earns the change
 * of place at beat 3, so a viewer can point at beat 2 and say *"we went in
 * there"*. Nothing moves from beat 4 onward: the rest of the section is one
 * continuous place, and every event happens in it.
 */

/** The surface everything from here to §4 happens on. */
const SURFACE = { x: 46, y: 50 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'that-thing-does',
    title: 'The desk holds; the 288 dim behind it',
    relation: 'want',
    secs: 10,
    vo: 'So — who picks the eight. That thing does. And to find out how, we have to follow something in.',
    commands: [
      ground.at(GROUND_Y),
      hospital.show({ x: 52, y: 46 }, 0.86, { staffed: true, dim: true }),
      desk.show({ x: 14, y: 78 }, 0.66),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'this-is-what-you-typed',
    title: 'A prompt card slides in and stops at the entrance',
    relation: 'so',
    secs: 5,
    vo: 'This is what you typed.',
    commands: [
      sentence.show({ x: 26, y: 66 }, 0.5),
      hospital.open(),
      /* Pan to the entrance. The doorway is what we are about to use, so the
       * frame has to admit it exists before we go through it. */
      camera.to({ x: 50, y: 60 }, 1.3),
      narrator.set({ pose: 'wonder' }),
    ],
    lateOverlays: {
      at: 2400,
      overlays: [note('your prompt', 22, 78, { tone: 'word', rotate: -4 })],
    },
  },
  {
    n: 3,
    id: 'in-it-goes',
    title: 'It passes through the doorway; the camera travels with it',
    relation: 'so',
    secs: 6,
    vo: 'In it goes.',
    commands: [
      sentence.moveTo({ x: 50, y: 62 }, 0.44),
      /* Push in on the door. */
      camera.to({ x: 50, y: 62 }, 2.5),
      narrator.off(),
    ],
    /*
     * The world changes behind the move, mid-beat. A doorway crossed over two
     * beats reads as two shots of a door; crossed inside one beat, it reads as
     * going in.
     */
    /*
     * Beat 3 ends *just inside*, still small and still travelling. Beat 4 is
     * where it lands. The first version landed it here, which left beats 3 and
     * 4 showing the same frame -- two beats spending one picture.
     */
    stages: [
      {
        at: 1700,
        commands: [
          hospital.off(),
          desk.off(),
          camera.home(),
          ground.at(GROUND_Y),
          sentence.moveTo({ x: 62, y: 40 }, 0.58),
        ],
      },
    ],
  },
  {
    n: 4,
    id: 'the-first-thing',
    title: 'The card lands and settles',
    relation: 'so',
    secs: 5,
    vo: 'And this is the first thing that happens to it.',
    /* It lands, at full size, and the narrator comes back to it. */
    commands: [sentence.moveTo(SURFACE, 1), narrator.show({ x: 91, y: 70 }, 1, { pose: 'point' })],
  },
  {
    n: 5,
    id: 'it-gets-cut-up',
    title: 'The sentence fractures into uneven pieces, in place',
    relation: 'wall',
    secs: 10,
    vo: 'It gets cut up. Into pieces about the size of a word — sometimes a whole word, sometimes half of one.',
    commands: [sentence.fracture()],
    /* `dropp` + `ed` is the label's whole job. The voice says "sometimes half
     * of one"; the note points at the half. */
    /* The note has to sit on the split it is naming. Placed at the horizon it
     * was just a red word at the bottom of the frame pointing at nothing. */
    lateOverlays: {
      at: 3200,
      overlays: [note('…half a word', 41, 38, { tone: 'cost', rotate: 4 })],
    },
  },
  {
    n: 6,
    id: 'these-are-tokens',
    title: 'The pieces settle into a row',
    relation: 'so',
    secs: 7,
    vo: 'These are called tokens. That’s all a token is. A chunk of text.',
    commands: [sentence.settle(), narrator.set({ pose: 'nod' })],
    overlays: [centred('9 tokens', 46, 66, { tone: 'measure', rotate: -2, sticky: true })],
  },
  {
    n: 7,
    id: 'understanding-is-three',
    title: '`understanding` drops in, breaks into three, and leaves',
    relation: 'and-yet',
    secs: 7,
    vo: 'Longer words come apart into more of them. "Understanding" is three.',
    commands: [extra.show({ x: 46, y: 22 }, 0.6)],
    stages: [
      { at: 1500, commands: [extra.set({ split: true, words: ['under', 'stand', 'ing'] })] },
      { at: 3600, commands: [extra.off()] },
    ],
  },
  {
    n: 8,
    id: 'one-big-list',
    title: 'A tall list rises beside the row',
    relation: 'so',
    secs: 6,
    vo: 'And every token the model knows about lives in one big list.',
    commands: [vocab.show({ x: 84, y: 46 }, 1.5), narrator.set({ pose: 'point' })],
  },
  {
    n: 9,
    id: 'a-hundred-fifty-four-thousand',
    title: 'The list scrolls fast, decelerates, stops',
    relation: 'so',
    secs: 7,
    vo: 'This one has a hundred and fifty-four thousand, eight hundred and eighty entries in it.',
    commands: [vocab.scroll()],
    lateOverlays: {
      at: 2600,
      overlays: [note('154,880\nentries', 84, 84, { tone: 'measure', rotate: 3, sticky: true })],
    },
  },
  {
    n: 10,
    id: 'a-row-number',
    title: 'The `dog` piece flies to the list and returns with a number',
    relation: 'so',
    secs: 11,
    /*
     * Hedged on purpose. 4021 has not been measured from the real tokenizer,
     * and an unmeasured ID presented as fact is the one kind of error an
     * expert viewer finds instantly. Drop the hedge if it is ever measured.
     */
    vo: 'So each piece gets swapped for where it sits in that list. A row number. Let’s say this one’s number four thousand and twenty-one.',
    commands: [
      sentence.follow(FOLLOWED),
      /* The round trip. Go, touch, come back changed — three moves on one
       * object, which is what makes a lookup feel like a lookup. */
      chip.show({ x: 30, y: 50 }, 0.55, { label: PROMPT[FOLLOWED] }),
    ],
    stages: [
      { at: 900, commands: [chip.moveTo({ x: 80, y: 46 }, 0.5), vocab.land(4021)] },
      { at: 2600, commands: [chip.moveTo({ x: 46, y: 74 }, 0.7)] },
    ],
  },
  {
    n: 11,
    id: 'thats-a-token-id',
    title: 'The letters fade off the card; the digits stay',
    relation: 'so',
    secs: 7,
    vo: 'That number is called a token ID. And it’s the only thing that carries on.',
    commands: [chip.becomes(), narrator.set({ pose: 'nod' })],
    overlays: [centred('token ID', 46, 84, { tone: 'measure', rotate: -3 })],
  },
  {
    n: 12,
    id: 'no-meaning-in-it',
    title: 'The list withdraws; the number is alone in frame',
    relation: 'and-yet',
    secs: 17,
    vo: 'But think about what that number actually is. It’s a row number. Four thousand and twenty-one doesn’t mean dog — it means the four thousand and twenty-first thing on our list. There’s no meaning in it at all.',
    /*
     * Nothing else may be on screen. The absence is the argument, and it is
     * the setup for §3 — so the sentence, the list and the narrator all go.
     */
    commands: [
      vocab.off(),
      sentence.off(),
      narrator.off(),
      chip.moveTo({ x: 46, y: 46 }, 1),
    ],
    clearSticky: true,
    lateOverlays: {
      at: 3000,
      overlays: [centred('a name, not a meaning', 46, 62, { size: 'md', tone: 'cost', rotate: -2 })],
    },
  },
]
