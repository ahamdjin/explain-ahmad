import { type Beat, type Overlay } from '../../../../paper'
import { camera, desk, hospital, narrator, row, word, type Patch } from './scene'

const H = (text: string, at: { x: string; y: string }, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at,
  size: 'sm',
  ...extra,
})

/** Where the desk sits on the wide shot, so the push-in has a target. */
const DESK_WIDE = { x: 34, y: 72 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'therefore',
    title: 'So we would have to know in advance',
    relation: 'so',
    secs: 5,
    // Opens by landing section 1's answer as a THEREFORE. A section that opens
    // on fresh material has orphaned its predecessor.
    vo: "So the choice changes with the word. Which means to hold only what we need, we'd have to know the choice in advance.",
    commands: [
      hospital.show({ x: 55, y: 42 }, 0.78),
      narrator.at({ x: 8, y: 84 }, 'think', 0.5),
    ],
    overlays: [H('know it in advance… somehow', { x: '5%', y: '20%' }, { size: 'md', rotate: -2, tone: 'measure' })],
  },
  {
    n: 2,
    id: 'one-thing-chooses',
    title: 'One thing makes that choice',
    relation: 'so',
    secs: 4.5,
    vo: 'And there is exactly one thing in there that makes that choice.',
    commands: [hospital.quiet(), desk.show(DESK_WIDE, 0.6)],
    stages: [{ at: 340, commands: [desk.ring()] }],
  },
  {
    n: 3,
    id: 'go-in',
    title: 'Go and watch it work',
    relation: 'therefore',
    secs: 5.5,
    // The camera beat. This section exists partly to prove the push-in works.
    vo: "This. So let's go and watch it work.",
    commands: [narrator.pose('push')],
    stages: [{ at: 200, commands: [camera.to(DESK_WIDE.x, DESK_WIDE.y, 2.2), desk.unring()] }],
  },
  {
    n: 4,
    id: 'inside',
    title: 'Inside, at the desk',
    relation: 'so',
    secs: 3,
    /*
     * The push-in ends here, and the interior is laid out as its own scene at
     * zoom 1 rather than as a magnified version of the wide shot. Zooming a
     * wide composition puts every actor in the wrong place -- the building
     * crops across the frame and the number row lands on top of the experts.
     * The camera earns the scene change; the layout still has to be authored.
     */
    vo: '',
    commands: [
      camera.home(),
      hospital.moveTo({ x: 55, y: 9 }, 0.36),
      desk.moveTo({ x: 29, y: 57 }, 1),
      narrator.at({ x: 8, y: 84 }, 'wonder', 0.5),
    ],
  },
  {
    n: 5,
    id: 'here-is-the-word',
    title: 'Here is our word',
    relation: 'so',
    secs: 4,
    vo: "Here's our word.",
    commands: [],
    stages: [{ at: 240, commands: [word.arrive({ x: 9, y: 43 }, 0.5, 'dog')] }],
  },
  {
    n: 6,
    id: 'the-strange-part',
    title: 'And here is the strange part',
    relation: 'and-yet',
    secs: 3.5,
    vo: "And here's the strange part.",
    commands: [narrator.pose('think')],
  },
  {
    n: 7,
    id: 'it-does-not-read-it',
    title: 'It does not read it',
    relation: 'wall',
    secs: 4.5,
    // The event. The card is set down, not faded out.
    vo: "It doesn't read it.",
    commands: [word.refuse({ x: 8, y: 70 })],
    lateOverlays: {
      at: 400,
      overlays: [H('set aside', { x: '17%', y: '70%' }, { size: 'md', rotate: -6, tone: 'cost' })],
    },
  },
  {
    n: 8,
    id: 'never-sees-it',
    title: 'It never sees the word at all',
    relation: 'wall',
    secs: 5,
    vo: 'It never sees the word at all.',
    commands: [],
    overlays: [
      {
        kind: 'note',
        text: 'the thing that picks the experts\nnever sees the word',
        at: { x: '54%', y: '27%' },
        size: 'lg',
        rotate: -1,
        backed: true,
        width: '50%',
        tone: 'cost',
      },
    ],
  },
  {
    n: 9,
    id: 'it-reads-this',
    title: 'It reads this instead',
    relation: 'therefore',
    secs: 5.5,
    vo: 'It reads this instead.',
    commands: [],
    stages: [{ at: 300, commands: [row.slideIn({ x: 70, y: 52 }, 0.85, '')] }],
    lateOverlays: {
      at: 800,
      overlays: [H('this is what it reads', { x: '70%', y: '68%' }, { size: 'md', rotate: -2, tone: 'measure', width: '34%' })],
    },
  },
  {
    n: 10,
    id: 'what-is-that',
    title: 'What is that?',
    relation: 'wall',
    secs: 5.5,
    vo: 'So before we can predict anything — what is that?',
    commands: [narrator.pose('think')],
    overlays: [
      {
        kind: 'note',
        text: 'What is the router actually reading?',
        at: { x: '50%', y: '84%' },
        size: 'xl',
        rotate: -1,
        backed: true,
        width: '62%',
      },
    ],
  },
]

/** Board runtime, so drift between the script and the code is visible. */
export const RUNTIME_SECONDS = BEATS.reduce((total, beat) => total + beat.secs, 0)
