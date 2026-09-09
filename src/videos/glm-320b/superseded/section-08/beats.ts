import { type Beat, type Overlay } from '../../../../paper'
import { bars, building, narrator, sheet, verdict, type Patch } from './scene'

const H = (text: string, at: { x: string; y: string }, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at,
  size: 'sm',
  ...extra,
})

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'back-to-the-start',
    title: 'Back to where we started',
    relation: 'so',
    secs: 4,
    vo: 'So. Back to where we started.',
    commands: [narrator.at({ x: 12, y: 78 }, 'wonder', 0.6)],
    stages: [{ at: 220, commands: [sheet.show({ x: 56, y: 44 }, 1)] }],
  },
  {
    n: 2,
    id: 'the-claim',
    title: 'And the word "efficient"',
    relation: 'so',
    secs: 5.5,
    // The callback. Same sheet, same tape, same tilt as section 1 beat 2.
    vo: 'Three hundred and twenty billion parameters. Eighteen billion active. And the word "efficient".',
    commands: [],
    overlays: [
      H('“efficient”', { x: '78%', y: '66%' }, { size: 'lg', rotate: -6, tone: 'claim' }),
      { kind: 'arrow', from: { x: 1560, y: 690 }, to: { x: 1370, y: 556 }, bow: -30, tone: 'claim' },
    ],
  },
  {
    n: 3,
    id: 'what-it-is-doing',
    title: 'What that word is doing',
    relation: 'and-yet',
    secs: 4,
    vo: "Here's what that word is actually doing.",
    commands: [sheet.moveTo({ x: 50, y: 16 }, 0.42), narrator.pose('point')],
  },
  {
    n: 4,
    id: 'the-true-half',
    title: 'That part is true',
    relation: 'so',
    secs: 7,
    // Concede generously. A verdict that only convicts reads as a debunk.
    vo: 'Per word, it does the thinking of a model about a twentieth of the size. That is real. That is why it is fast, and cheap to run per word. That part is true.',
    commands: [],
    stages: [{ at: 240, commands: [bars.show({ x: 48, y: 44 }, 0.86)] }],
    lateOverlays: {
      at: 900,
      overlays: [H('this part is true', { x: '84%', y: '54%' }, { size: 'lg', rotate: -3, tone: 'ink' })],
    },
  },
  {
    n: 5,
    id: 'the-false-half',
    title: 'That part is not',
    relation: 'wall',
    secs: 7,
    vo: 'But all of it still has to be there, ready, because you never know which part you will need next. That part is not.',
    commands: [bars.moveTo({ x: 30, y: 40 }, 0.5)],
    stages: [{ at: 260, commands: [building.show({ x: 76, y: 44 }, 0.62), building.heavy()] }],
    lateOverlays: {
      at: 900,
      overlays: [H('and this part is not', { x: '76%', y: '76%' }, { size: 'lg', rotate: -2, tone: 'cost', width: '30%' })],
    },
  },
  {
    n: 6,
    id: 'the-thesis',
    title: 'Compute, not memory',
    relation: 'therefore',
    secs: 7,
    // The thesis, stated once, plainly.
    vo: "Sparse routing buys you compute. It doesn't buy you memory.",
    commands: [bars.off(), building.moveTo({ x: 80, y: 22 }, 0.3), sheet.off()],
    stages: [
      {
        at: 260,
        commands: [
          verdict.show({ x: 48, y: 50 }, [
            'Sparse routing buys compute, not memory.',
            'You pay for the thinking you do. You still pay for the model being there.',
          ]),
          narrator.at({ x: 10, y: 84 }, 'nod', 0.5),
        ],
      },
    ],
  },
  {
    n: 7,
    id: 'still-a-320b-model',
    title: 'Still a 320B model',
    relation: 'so',
    secs: 6,
    vo: 'A 320-billion-parameter model doing 18 billion of work is still a 320-billion-parameter model. It just is not a 320-billion-parameter bill.',
    commands: [
      verdict.show({ x: 48, y: 50 }, [
        'Still a 320-billion-parameter model.',
        'Just not a 320-billion-parameter bill.',
      ]),
    ],
  },
  {
    n: 8,
    id: 'cheap-versus-small',
    title: 'Cheap to run, or small',
    relation: 'therefore',
    secs: 6.5,
    // The line the viewer repeats to a friend.
    vo: "And that's the difference between a model that's cheap to run — and one that's small.",
    commands: [verdict.off(), narrator.pose('hopeful')],
    overlays: [
      {
        kind: 'note',
        text: 'cheap to run is not the same thing as small',
        at: { x: '50%', y: '48%' },
        size: 'xl',
        rotate: -1,
        backed: true,
        width: '72%',
      },
    ],
  },
]

export const RUNTIME_SECONDS = BEATS.reduce((total, beat) => total + beat.secs, 0)
