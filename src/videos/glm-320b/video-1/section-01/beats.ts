import { arrow, brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import { block, block2, chat, ground, rigA, rigB, type Patch } from './scene'

/**
 * Section 01 — The five-percent problem.
 *
 * Rewrite v1: the opening does one job. It lets the viewer form the tempting
 * model "~5% active should mean ~5% of the hardware", breaks that prediction
 * with the 1-vs-8 comparison, then turns the failure into the question the
 * rest of the video will answer: which 18B are active, and when is that known?
 *
 * No tower, 45 floors, 288 experts, 336 visits, router, or MoE language here.
 * Those numbers are useful only after the viewer knows what they count.
 */

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'three-twenty-eighteen-active',
    title: 'GLM arrives as one model; a small region lights',
    relation: 'want',
    secs: 7,
    vo: "Three hundred and twenty billion parameters. Only eighteen billion active. Sounds like most of the model isn't doing anything, right?",
    commands: [
      ground.at(GROUND_Y),
      block.scatter({ x: 50, y: 47 }, 0.78),
      block.pack(),
      block.light('a'),
    ],
    overlays: [
      centred('GLM-5.3-Flash', 50, 14, { size: 'sm', sticky: true }),
      note('320B total', 29, 72, { tone: 'measure', sticky: true }),
      note('18B active', 61, 28, { tone: 'claim', sticky: true }),
    ],
  },
  {
    n: 2,
    id: 'keep-the-small-part',
    title: 'The active region lifts out as the tempting plan',
    relation: 'therefore',
    secs: 6,
    vo: "So here's the obvious guess: if only a small part is working, you should only need that small part close by.",
    commands: [block.lift()],
    overlays: [note('keep this part?', 65, 20, { size: 'md', rotate: -3 })],
  },
  {
    n: 3,
    id: 'two-models-same-share',
    title: 'A second model arrives; both show about five percent active',
    relation: 'therefore',
    secs: 7,
    vo: 'Let’s test that. These two models both use about five percent of themselves for each token.',
    commands: [
      block.drop(),
      block.moveTo({ x: 70, y: 42 }, 0.58),
      block2.arrive({ x: 30, y: 42 }, 0.58),
      block2.light('b'),
      { block2: { grain: 'fine' } },
    ],
    clearSticky: true,
    overlays: [
      centred('gpt-oss-120b', 30, 15, { size: 'sm', sticky: true }),
      centred('GLM-5.3-Flash', 70, 15, { size: 'sm', sticky: true }),
      centred('about 5% active', 50, 60, { size: 'sm', tone: 'claim', sticky: true }),
    ],
  },
  {
    n: 4,
    id: 'make-a-fair-guess',
    title: 'The viewer commits only to similar or very different hardware',
    relation: 'want',
    secs: 6,
    vo: 'Same percentage. So make a guess: roughly similar hardware, or wildly different?',
    commands: [],
    overlays: [
      note('ROUGHLY SIMILAR', 22, 77, { size: 'md', backed: true, rotate: -1 }),
      note('WILDLY DIFFERENT', 58, 77, { size: 'md', backed: true, rotate: 1 }),
    ],
  },
  {
    n: 5,
    id: 'one-accelerator',
    title: 'One accelerator lands under the left model',
    relation: 'so',
    secs: 4,
    vo: 'This one fits on a single eighty-gigabyte accelerator.',
    commands: [rigA.show(1, { x: 30, y: 74 }, 0.82)],
    overlays: [note('1 × 80 GB', 23, 86, { tone: 'measure', sticky: true })],
  },
  {
    n: 6,
    id: 'eight-accelerators',
    title: 'GLM counts up to eight accelerators',
    relation: 'and-yet',
    secs: 6,
    vo: 'To keep GLM fully loaded at the precision it ships in, you need eight.',
    commands: [rigB.show(1, { x: 70, y: 74 }, 0.82)],
    stages: [
      { at: 700, commands: [rigB.show(2)] },
      { at: 1500, commands: [rigB.show(4)] },
      { at: 2500, commands: [rigB.show(8)] },
    ],
    overlays: [
      note('8 × 80 GB', 64, 86, { tone: 'cost', sticky: true }),
      centred('native shipped precision · weights resident', 70, 93, { size: 'sm' }),
    ],
  },
  {
    n: 7,
    id: 'same-share-different-machine',
    title: 'The contradiction is allowed to sit',
    relation: 'and-yet',
    secs: 7,
    vo: 'Same basic idea: most of the model stays inactive. But the hardware is nowhere close. So "five percent active" clearly isn’t telling us the whole story.',
    commands: [],
    overlays: [brace('same headline share', 18, 63, 64, { tone: 'claim', side: 'top' })],
  },
  {
    n: 8,
    id: 'parameter-in-one-line',
    title: 'One small note gives parameter just enough meaning',
    relation: 'so',
    secs: 7,
    vo: 'And if "parameter" is a fuzzy word, don’t worry. For now, just think of it as one learned number inside the model.',
    commands: [],
    overlays: [note('one mark = one learned number', 58, 29, { size: 'sm', tone: 'measure', backed: true })],
  },
  {
    n: 9,
    id: 'back-to-glm',
    title: 'The comparison leaves; the same GLM block returns to centre',
    relation: 'therefore',
    secs: 4,
    vo: "So here's the question I actually care about.",
    commands: [
      block2.off(),
      rigA.off(),
      block.moveTo({ x: 50, y: 45 }, 0.84),
      rigB.show(8, { x: 50, y: 79 }, 0.62),
    ],
    clearSticky: true,
    overlays: [centred('GLM-5.3-Flash', 50, 12, { size: 'sm', sticky: true })],
  },
  {
    n: 10,
    id: 'which-eighteen',
    title: 'A second possible patch appears without changing the real active patch',
    relation: 'want',
    secs: 7,
    vo: 'When GLM says eighteen billion are active... which eighteen billion?',
    commands: [block.ghost('b')],
    overlays: [
      note('18B active', 63, 27, { tone: 'claim' }),
      note('?', 74, 39, { size: 'lg', rotate: 8 }),
    ],
  },
  {
    n: 11,
    id: 'could-be-somewhere-else',
    title: 'Only the hypothetical outline moves',
    relation: 'so',
    secs: 6,
    vo: "Maybe they're always the same ones. Or maybe the useful part can be somewhere else. We don't know yet.",
    commands: [],
    stages: [
      { at: 1700, commands: [block.ghost('c')] },
      { at: 3500, commands: [block.ghost('b')] },
    ],
  },
  {
    n: 12,
    id: 'the-tempting-plan',
    title: 'If the subset were fixed, take it out and keep it ready',
    relation: 'therefore',
    secs: 7,
    vo: 'Because if they are fixed, our idea works: keep that part ready, and leave the rest alone.',
    commands: [block.ghost(undefined), block.lift()],
    overlays: [centred('KEEP READY?', 68, 19, { size: 'md', rotate: -2 })],
  },
  {
    n: 13,
    id: 'turn-it-into-an-experiment',
    title: 'The patch returns; the whole model becomes the experiment',
    relation: 'therefore',
    secs: 7,
    vo: 'So rather than guessing, we’re going to follow one real prompt through this model and watch exactly what gets used, when, and why.',
    commands: [block.drop(), rigB.off()],
    clearSticky: true,
  },
  {
    n: 14,
    id: 'chat-enters-beside-model',
    title: 'The model moves right and a chat window enters on the same stage',
    relation: 'so',
    secs: 6,
    vo: 'And we’ll do it with one example all the way through.',
    commands: [
      block.moveTo({ x: 76, y: 46 }, 0.48),
      chat.open({ x: 33, y: 46 }, 0.82, 'GLM-5.3-Flash'),
    ],
  },
  {
    n: 15,
    id: 'type-the-running-prompt',
    title: 'The measured running prompt types into the chat',
    relation: 'so',
    secs: 7,
    vo: 'Let’s use: "The dog dropped the ball, and it".',
    commands: [chat.type('The dog dropped the ball, and it')],
  },
  {
    n: 16,
    id: 'one-piece-next',
    title: 'The intact human sentence holds; no token exists on screen yet',
    relation: 'so',
    secs: 5,
    vo: 'Once it breaks apart, we’ll pick one piece and keep following that same piece through the machine.',
    commands: [chat.sent()],
    overlays: [centred('still the text you typed', 33, 69, { size: 'sm', tone: 'word' })],
  },
  {
    n: 17,
    id: 'what-arrives-first',
    title: 'A causal path starts from chat toward GLM and stops halfway',
    relation: 'wall',
    secs: 7,
    vo: 'I hit send. What is the first thing the model actually receives?',
    commands: [],
    overlays: [
      arrow(
        { x: 760, y: 520 },
        { x: 1090, y: 520 },
        { tone: 'word', dashed: true, label: '?' },
      ),
    ],
  },
]
