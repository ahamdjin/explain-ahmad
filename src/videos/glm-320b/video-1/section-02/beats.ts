import { centred, FOLLOWED, GROUND_Y, note, PROMPT, PROMPT_IDS, UNEVEN, type Beat } from '../../../../paper'
import { chip, extra, ground, narrator, sentence, vocab, type Patch } from './scene'

/**
 * Section 02 — What the model actually receives.
 *
 * APPROVED NARRATION — LOCKED.
 * The VO below is the approved script split across visual beats. Do not
 * paraphrase it to fit components; change the components or beat count instead.
 */

const SURFACE = { x: 46, y: 50 }
const TOKEN_ID = PROMPT_IDS[FOLLOWED]

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'not-words',
    title: 'The exact prompt continues inward from §1',
    relation: 'want',
    secs: 9,
    vo: 'Because it doesn’t start with words. The first thing the model does is break your text into smaller pieces.',
    commands: [
      ground.at(GROUND_Y),
      sentence.show({ x: 38, y: 58 }, 0.5),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point' }),
    ],
  },
  {
    n: 2,
    id: 'our-sentence',
    title: 'The intact sentence lands on the first surface',
    relation: 'so',
    secs: 7,
    vo: 'So our sentence: “The dog dropped the ball, and it…” becomes:',
    commands: [sentence.moveTo(SURFACE, 0.82)],
  },
  {
    n: 3,
    id: 'eight-pieces',
    title: 'The sentence fractures into the real eight tokenizer pieces',
    relation: 'so',
    secs: 8,
    vo: 'The | dog | dropped | the | ball | , | and | it. Eight pieces.',
    commands: [sentence.fracture()],
    stages: [{ at: 2200, commands: [sentence.settle()] }],
    lateOverlays: {
      at: 3200,
      overlays: [centred('8 pieces', 46, 67, { tone: 'measure', rotate: -2, sticky: true })],
    },
  },
  {
    n: 4,
    id: 'called-tokens',
    title: 'The eight pieces hold and get their name',
    relation: 'so',
    secs: 5,
    vo: 'And these pieces are called tokens.',
    commands: [narrator.set({ pose: 'nod' })],
    overlays: [centred('tokens', 46, 72, { tone: 'measure', rotate: -2 })],
  },
  {
    n: 5,
    id: 'not-just-words',
    title: 'The prompt stays visible while the naive token=word idea is challenged',
    relation: 'and-yet',
    secs: 8,
    vo: 'Now, in this sentence, they look suspiciously like words. But tokens are not just words.',
    commands: [],
  },
  {
    n: 6,
    id: 'unbelievable',
    title: 'A real tokenizer counterexample arrives and splits into three',
    relation: 'so',
    secs: 13,
    vo: 'For example, give the same tokenizer: “unbelievable” and it breaks it into: un | belie | vable. One word. Three tokens.',
    commands: [extra.show({ x: 46, y: 22 }, 0.6)],
    stages: [{ at: 2100, commands: [extra.set({ split: true, words: [...UNEVEN] })] }],
    lateOverlays: {
      at: 5200,
      overlays: [note('1 word → 3 tokens', 72, 22, { tone: 'measure', rotate: 2 })],
    },
  },
  {
    n: 7,
    id: 'the-big-list',
    title: 'The vocabulary list rises beside the main prompt',
    relation: 'so',
    secs: 17,
    vo: 'So the model isn’t really reading words the way we do. It has its own set of pieces it knows how to work with. And GLM has a list of 154,880 of them. Every token in that list has a number.',
    commands: [
      extra.off(),
      sentence.moveTo({ x: 32, y: 34 }, 0.68),
      vocab.show({ x: 80, y: 48 }, 1.15),
      vocab.scroll(),
      narrator.moveTo({ x: 25, y: 76 }, 1),
    ],
    clearSticky: true,
    lateOverlays: {
      at: 5200,
      overlays: [note('154,880 entries', 80, 12, { tone: 'measure', rotate: 3, sticky: true })],
    },
  },
  {
    n: 8,
    id: 'back-to-it',
    title: 'Every token dims except the tracked `it`',
    relation: 'so',
    secs: 7,
    vo: 'So let’s go back to the one we said we’d follow: “it.”',
    commands: [sentence.follow(FOLLOWED), narrator.set({ pose: 'point' })],
  },
  {
    n: 9,
    id: 'where-is-it',
    title: 'The list and `it` hold while the unknowable question is stated honestly',
    relation: 'want',
    secs: 8,
    vo: 'Where do you think `it` is in that list? There’s no way you could know.',
    commands: [narrator.set({ pose: 'wonder' })],
    overlays: [note('where?', 72, 72, { size: 'md', rotate: -3 })],
  },
  {
    n: 10,
    id: 'four-thirty-two',
    title: '`it` travels to its real vocabulary row and returns as 432',
    relation: 'so',
    secs: 10,
    vo: 'It happens to be: 432. That number is called its token ID.',
    commands: [chip.show({ x: 22, y: 34 }, 0.55, { label: PROMPT[FOLLOWED].trim(), id: String(TOKEN_ID) })],
    stages: [
      { at: 900, commands: [chip.moveTo({ x: 80, y: 46 }, 0.5), vocab.land(TOKEN_ID, PROMPT[FOLLOWED])] },
      { at: 2800, commands: [chip.moveTo({ x: 46, y: 74 }, 0.7)] },
    ],
    lateOverlays: {
      at: 4200,
      overlays: [centred('token ID', 46, 84, { tone: 'measure', rotate: -3 })],
    },
  },
  {
    n: 11,
    id: 'it-becomes-432',
    title: 'The same tracked card loses its letters and keeps 432',
    relation: 'therefore',
    secs: 11,
    vo: 'So from the model’s point of view, our little `it` has now gone from: “it” to: 432. And that sounds like progress.',
    commands: [chip.becomes(), narrator.set({ pose: 'nod' })],
  },
  {
    n: 12,
    id: 'what-does-432-tell-us',
    title: '432 holds while the meaning questions arrive',
    relation: 'and-yet',
    secs: 16,
    vo: 'But think about what 432 actually tells us. Does 432 tell you that `it` might refer to the ball? Does it tell you that `it` is a pronoun? Does it tell you anything about what `it` means? No.',
    commands: [vocab.off(), sentence.off(), chip.moveTo({ x: 46, y: 46 }, 1), narrator.set({ pose: 'think' })],
    clearSticky: true,
  },
  {
    n: 13,
    id: 'just-an-address',
    title: '432 is left alone and reframed as an address',
    relation: 'therefore',
    secs: 7,
    vo: 'It’s just where that token lives in the list. Basically an address.',
    commands: [narrator.off()],
    overlays: [centred('address, not meaning', 46, 63, { size: 'md', tone: 'cost', rotate: -2 })],
  },
  {
    n: 14,
    id: 'where-does-meaning-come-from',
    title: 'The address holds and the next problem becomes explicit',
    relation: 'wall',
    secs: 10,
    vo: 'And that creates our next problem. The model now has a number… but where does the meaning come from?',
    commands: [],
    lateOverlays: {
      at: 2600,
      overlays: [centred('where does the meaning come from?', 46, 73, { size: 'md', rotate: -2 })],
    },
  },
]
