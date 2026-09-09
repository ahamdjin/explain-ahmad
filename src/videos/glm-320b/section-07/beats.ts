import { type Beat, type Overlay } from '../../../paper'
import { bars, counter, floor, memory, narrator, path, store, word, type Patch } from './scene'

const H = (text: string, at: { x: string; y: string }, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at,
  size: 'sm',
  ...extra,
})

const STORE = { x: 19, y: 44 }
const MEM = { x: 83, y: 45 }
const PATH = { x: 51, y: 45 }

export const BEATS: Beat<Patch>[] = [
  /* ═══ THE PLAN, REBUILT ══════════════════════════════════════════════════
   * Frame for frame as section 1 left it, with no editorial. The viewer has
   * to recognise their own idea before it is tested. */
  {
    n: 1,
    id: 'the-plan-again',
    title: 'The plan again',
    relation: 'want',
    secs: 5,
    vo: "Let's actually try it. Here's the plan again, exactly as we had it.",
    commands: [
      store.show(STORE, 1),
      memory.show(MEM, 1),
      narrator.at({ x: 8, y: 84 }, 'point', 0.5),
    ],
  },
  {
    n: 2,
    id: 'call-them-in',
    title: 'Call in the eight',
    relation: 'so',
    secs: 5,
    vo: 'Everything in storage. The router calls in the eight it needs.',
    commands: [path.show(PATH, 1)],
    stages: [{ at: 260, commands: [path.carry(8), word.arrive({ x: 8, y: 16 }, 0.44, 'dog')] }],
    lateOverlays: {
      at: 700,
      overlays: [H('only the eight we need', { x: '40%', y: '30%' }, { size: 'md', rotate: -2, tone: 'measure' })],
    },
  },
  {
    n: 3,
    id: 'it-works',
    title: 'It works',
    relation: 'hope',
    secs: 5.5,
    // Essential. A hope that never worked cannot be broken, and a section that
    // skips this reads as a lecture rather than as a discovery.
    vo: 'First word. Eight experts in. Done. It works.',
    commands: [floor.at(1, { x: 51, y: 18 }, 1)],
    stages: [
      { at: 200, commands: [path.carry(0), memory.hold(8)] },
      { at: 900, commands: [narrator.pose('cheer')] },
    ],
    lateOverlays: {
      at: 1000,
      overlays: [{ kind: 'sparks', at: { x: '83%', y: '24%' } }],
    },
  },

  /* ═══ AND AGAIN ══════════════════════════════════════════════════════════
   * The repetition *is* the argument, so it is shown, not summarised. */
  {
    n: 4,
    id: 'floor-two',
    title: 'Floor two',
    relation: 'and-yet',
    secs: 5,
    vo: 'Floor two. New numbers, new eight — so fetch those as well.',
    commands: [floor.at(2, { x: 51, y: 18 }, 1), narrator.pose('wonder')],
    stages: [{ at: 240, commands: [memory.hold(0), path.carry(8)] }],
    lateOverlays: {
      at: 640,
      overlays: [H('a different eight', { x: '40%', y: '30%' }, { size: 'md', rotate: -2, tone: 'cost' })],
    },
  },
  {
    n: 5,
    id: 'floor-three',
    title: 'Floor three',
    relation: 'so',
    secs: 4,
    vo: 'Floor three. Again.',
    commands: [floor.at(3, { x: 51, y: 18 }, 1)],
    stages: [{ at: 200, commands: [counter.show({ x: 51, y: 76 }, 0.8), counter.to(24)] }],
  },
  {
    n: 6,
    id: 'and-again',
    title: 'Forty-two times',
    relation: 'wall',
    secs: 6,
    vo: 'And again, and again, forty-two times, for one word.',
    commands: [floor.at(42, { x: 51, y: 18 }, 1), memory.strain(), narrator.pose('think')],
    stages: [
      { at: 200, commands: [counter.to(160), path.jam(11)] },
      { at: 900, commands: [counter.to(336)] },
    ],
  },
  {
    n: 7,
    id: 'how-much',
    title: 'How much are we carrying?',
    relation: 'and-yet',
    secs: 4.5,
    vo: 'So how much are we actually carrying in?',
    commands: [],
    overlays: [
      { kind: 'note', text: '336', at: { x: '51%', y: '68%' }, size: 'xl', tone: 'measure', rotate: 0, width: '22%' },
      H('expert visits, for one word', { x: '51%', y: '82%' }, { size: 'md', rotate: -1, width: '30%' }),
    ],
  },

  /* ═══ THE ARITHMETIC ═════════════════════════════════════════════════════
   * One step at a time. A number the viewer watched being built is a number
   * they trust, and this is the only section that has to change a mind. */
  {
    n: 8,
    id: 'eight-gigabytes',
    title: 'About eight gigabytes',
    relation: 'so',
    secs: 6,
    vo: 'One expert is about twenty-six megabytes. Three hundred and thirty-six of them is about eight gigabytes. For one word.',
    commands: [path.off(), store.off(), memory.off(), floor.off(), word.off(), counter.off()],
    stages: [
      { at: 260, commands: [counter.show({ x: 50, y: 40 }, 1.1), counter.to(336), counter.relabel('× 26 MB each')] },
    ],
    lateOverlays: {
      at: 1000,
      overlays: [
        { kind: 'note', text: '≈ 8 GB', at: { x: '50%', y: '62%' }, size: 'xl', tone: 'cost', rotate: -1, width: '30%' },
        H('per word', { x: '50%', y: '74%' }, { size: 'md', rotate: -1, width: '20%' }),
      ],
    },
  },
  {
    n: 9,
    id: 'a-second-and-a-half',
    title: 'A second and a half',
    relation: 'wall',
    secs: 5.5,
    vo: "Off a fast drive, that's roughly a second and a half. For one word.",
    commands: [counter.off()],
    stages: [{ at: 240, commands: [bars.fetch({ x: 48, y: 40 }, 1), narrator.at({ x: 8, y: 84 }, 'think', 0.5)] }],
  },
  {
    n: 10,
    id: 'and-the-work',
    title: 'And the work?',
    relation: 'and-yet',
    secs: 4.5,
    vo: 'And the actual work those experts do?',
    commands: [],
    lateOverlays: {
      at: 200,
      overlays: [{ kind: 'note', text: '?', at: { x: '50%', y: '68%' }, size: 'xl', tone: 'cost', rotate: 0 }],
    },
  },
  {
    n: 11,
    id: 'the-verdict',
    title: 'The fetching costs more than the work',
    relation: 'wall',
    secs: 7,
    // THE PAYOFF. Two bars, to scale. The work bar is meant to be almost
    // invisible -- that is the finding, so it is not inflated to be legible.
    vo: "Milliseconds. That's the whole answer. The fetching costs more than the work. You'd spend all day carrying people in and out of the building.",
    commands: [bars.both()],
    lateOverlays: {
      at: 900,
      overlays: [
        {
          kind: 'note',
          text: 'the carrying costs more than the work',
          at: { x: '50%', y: '80%' },
          size: 'xl',
          rotate: -1,
          backed: true,
          width: '66%',
          sticky: true,
        },
      ],
    },
  },
  {
    n: 12,
    id: 'no-squeezing-out',
    title: "You can't squeeze out of it",
    relation: 'and-yet',
    secs: 5.5,
    vo: "And you can't squeeze your way out of it either. Halve every number and the whole thing is still over a hundred and fifty gigabytes.",
    commands: [],
    stages: [{ at: 240, commands: [bars.off(), store.show({ x: 30, y: 44 }, 0.9, 'squeezed to half size')] }],
    lateOverlays: {
      at: 700,
      overlays: [
        { kind: 'note', text: 'still ~153 GiB', at: { x: '66%', y: '44%' }, size: 'xl', tone: 'cost', rotate: -2, width: '30%' },
        H('not a rounding error away from fitting', { x: '66%', y: '60%' }, { size: 'md', rotate: -1, width: '32%' }),
      ],
    },
  },
  {
    n: 13,
    id: 'so-they-stay',
    title: 'So they all stay',
    relation: 'therefore',
    secs: 6,
    vo: 'So they stay. All of them, ready, all the time.',
    clearSticky: true,
    commands: [store.show({ x: 50, y: 42 }, 1.05, 'all of it — resident, all the time'), narrator.at({ x: 10, y: 84 }, 'wonder', 0.5)],
    overlays: [
      H('nobody goes home', { x: '50%', y: '74%' }, { size: 'lg', rotate: -1, width: '34%' }),
    ],
  },
  {
    n: 14,
    id: 'what-did-it-buy',
    title: 'So what did it buy?',
    relation: 'wall',
    secs: 6,
    vo: 'Which leaves one last question. If we still need all of it sitting there — what did "eighteen billion active" ever actually buy us?',
    commands: [narrator.pose('think')],
    overlays: [
      {
        kind: 'note',
        text: 'If all of it has to be there anyway,\nwhat did “18 billion active” buy?',
        at: { x: '50%', y: '80%' },
        size: 'xl',
        rotate: -1,
        backed: true,
        width: '70%',
      },
    ],
  },
]

/** Board runtime, so drift between the script and the code is visible. */
export const RUNTIME_SECONDS = BEATS.reduce((total, beat) => total + beat.secs, 0)
