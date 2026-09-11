import { centred, FOLLOWED, GROUND_Y, note, PROMPT, UNEVEN, type Beat } from '../../../../paper'
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
    secs: 12,
    vo: 'So — eight out of two hundred and eighty-eight, and something in there does the picking. To see how, we have to follow something in.',
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
    secs: 4,
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
    secs: 4,
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
    title: 'The sentence fractures into pieces, in place',
    relation: 'wall',
    secs: 9,
    /*
     * **"Mostly", not "every".** The measured split is
     * `The | dog | dropped | the | ball | , | and | it` -- and the comma is a
     * token that is not a word, so "every piece happens to be a whole word"
     * was false by one piece. A reviewer caught it. Saying *mostly along word
     * boundaries* is true, and it leaves beat 7 the job of breaking the
     * expectation it sets up.
     *
     * The old `…half a word` note is gone with it: it pointed at the invented
     * `dropp` + `ed` split, and there is nothing in this frame for it to name.
     */
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
    /*
     * The last clause is what licenses the rest of the video's arithmetic.
     * Every count -- 336, 2,688, ~8.5 GB, five percent -- is **per token**,
     * and `GROUND_TRUTH.md` says so explicitly. The scripts used to say "per
     * word" for those, three sections after teaching that a token is not a
     * word. Saying the unit out loud once here is cheaper than hedging every
     * figure later, and it lets the narration keep saying "word" about *this*
     * sentence, where every token happens to be one.
     */
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
    /*
     * It does **not** leave inside this beat. It used to go at 3,600 ms of a
     * 12-second beat, which left eight seconds of narration about a word that
     * was no longer on screen -- and made the beat impossible to photograph
     * for review, because the contact sheet settles after the last stage. It
     * leaves on beat 8, when the list arrives and needs the room.
     */
    stages: [{ at: 1500, commands: [extra.set({ split: true, words: [...UNEVEN] })] }],
  },
  {
    n: 8,
    id: 'one-big-list',
    title: 'A tall list rises beside the row',
    relation: 'so',
    secs: 10,
    vo: 'And every token it knows about lives in one big list. How long do you reckon that list is?',
    commands: [extra.off(), vocab.show({ x: 84, y: 46 }, 1.5), narrator.set({ pose: 'point' })],
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
      overlays: [note('154,880\nentries', 84, 84, { tone: 'measure', rotate: 3, sticky: true })],
    },
  },
  {
    n: 10,
    id: 'a-row-number',
    title: 'The `dog` piece flies to the list and returns with a number',
    relation: 'so',
    secs: 12,
    /*
     * The hedge is gone because the number is measured. 5562 is ` dog` with
     * its leading space in GLM-5.3-Flash's real tokenizer; bare `dog` is
     * 18427, which is a different token. `research/glm/TOKENIZER.md`.
     */
    vo: 'So each piece gets swapped for where it sits in that list. A row number. This one is five thousand, five hundred and sixty-two.',
    commands: [
      sentence.follow(FOLLOWED),
      /* The round trip. Go, touch, come back changed — three moves on one
       * object, which is what makes a lookup feel like a lookup. */
      chip.show({ x: 30, y: 50 }, 0.55, { label: PROMPT[FOLLOWED] }),
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
    /* S-12. The mechanism is named only now, after it has been watched. */
    vo: 'And that’s the cutting up done — your sentence is numbers now. That’s all a tokeniser is.',
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
  },
  {
    n: 13,
    id: 'no-meaning-in-it',
    title: 'The number holds, and turns out to say nothing',
    relation: 'and-yet',
    secs: 16,
    /*
     * Split out of beat 12, which carried 58 words in 25 seconds -- a
     * monologue, not a beat. The naming and the *but* are two different jobs
     * and each wants its own hold.
     */
    vo: 'But think about what that number actually is. It’s a row number. It doesn’t mean dog — it means the five thousand, five hundred and sixty-second thing on a list. There’s no meaning in it at all.',
    commands: [],
    lateOverlays: {
      at: 3000,
      overlays: [centred('a name, not a meaning', 46, 62, { size: 'md', tone: 'cost', rotate: -2 })],
    },
  },
]
