import {
  arch,
  blocker,
  card,
  grid,
  machine,
  memory,
  narrator,
  picked,
  router,
  sheet,
  shelf,
  team,
  word,
  type Patch,
} from './scene'
import { HOLD, type Relation } from './motion'

export type Overlay = {
  kind: 'note' | 'bubble' | 'brace' | 'arrow' | 'sparks' | 'cross' | 'title'
  /** Percentages of the stage, except `arrow`, which uses 1920x1080 units. */
  at?: { x: string; y: string }
  from?: { x: number; y: number }
  to?: { x: number; y: number }
  text?: string
  sub?: string
  width?: string | number
  rotate?: number
  tone?: 'ink' | 'orange' | 'red'
  size?: 'sm' | 'md' | 'lg'
  side?: 'top' | 'bottom'
  bow?: number
  dashed?: boolean
  backed?: boolean
  tail?: 'bottom-left' | 'bottom-center' | 'left'
  label?: string
  /** Attaches the overlay to the grid's live geometry rather than fixed coords. */
  anchor?: 'grid-total' | 'grid-active'
}

/**
 * A staged reveal inside one beat. Teachers show a thing, then name it, then let
 * you react -- they do not do all three at once. `at` is ms after the beat opens.
 */
export type Stage = { at: number; commands: Patch[] }

export type Beat = {
  n: number
  id: string
  title: string
  vo: string
  /** What this beat IS in the story. Drives motion feel and hold time. */
  relation: Relation
  /** Fires immediately when the beat opens. */
  commands: Patch[]
  /** Fires later, on a timeline, so one beat can teach in sequence. */
  stages?: Stage[]
  overlays?: Overlay[]
  /** Overlays held back until `at` ms, so a label can follow its object. */
  lateOverlays?: { at: number; overlays: Overlay[] }
  /** Marks the beat where the viewer routes a word themselves. */
  interactive?: boolean
}

const H = (text: string, at: { x: string; y: string }, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at,
  size: 'sm',
  ...extra,
})

export const BEATS: Beat[] = [
  {
    n: 1,
    id: 'meet-the-model',
    relation: 'want',
    title: 'Meet the model',
    vo: 'So, GLM-5.3-Flash has 320 billion parameters and only 18 billion are active.',
    commands: [card.show({ x: 54, y: 50 }), narrator.at({ x: 12, y: 60 }, 'point', 1.02)],
    overlays: [
      H("This is the model\nwe'll look at!", { x: '3%', y: '35%' }, { size: 'md', rotate: -3 }),
      { kind: 'note', text: '320B', sub: 'total parameters', at: { x: '80%', y: '26%' }, size: 'lg', rotate: 2, tone: 'orange' },
      { kind: 'note', text: '18B', sub: 'active parameters', at: { x: '80%', y: '58%' }, size: 'lg', rotate: -1 },
      { kind: 'arrow', from: { x: 1520, y: 330 }, to: { x: 1215, y: 405 }, bow: 30 },
      { kind: 'arrow', from: { x: 1520, y: 660 }, to: { x: 1215, y: 495 }, bow: -30 },
    ],
  },
  {
    n: 2,
    id: 'word-comes-in',
    relation: 'so',
    title: 'A word comes in',
    vo: 'For any one word, only about 18 billion parameters are active.',
    commands: [card.putAway(), grid.show({ x: 56, y: 50 }), narrator.at({ x: 10, y: 72 }, 'wonder', 0.88)],
    // Show the mass. Then send the word in. Then let the slice light as a
    // consequence of the word arriving -- cause before effect, in time.
    stages: [
      { at: 620, commands: [word.arrive({ x: 10, y: 32 })] },
      { at: 1180, commands: [grid.lightActiveSlice()] },
    ],
    overlays: [
      { kind: 'title', text: 'MODEL PARAMETERS (320,000,000,000)' },
      H('A word goes in…', { x: '2.5%', y: '55%' }, { size: 'md', rotate: -2 }),
      { kind: 'arrow', from: { x: 268, y: 372 }, to: { x: 432, y: 430 }, bow: -18 },
      { kind: 'brace', text: '~18B ACTIVE', anchor: 'grid-active', at: { x: '0%', y: '77%' }, tone: 'orange' },
    ],
  },
  {
    n: 3,
    id: 'tiny-part-used',
    relation: 'so',
    title: 'A tiny part is used',
    vo: 'The model owns 320 billion parameters, but uses only a small fraction of them for that word.',
    commands: [narrator.pose('think')],
    overlays: [
      H('Just a small part?', { x: '2.5%', y: '55%' }, { size: 'md', rotate: -2 }),
      { kind: 'arrow', from: { x: 268, y: 372 }, to: { x: 432, y: 430 }, bow: -18 },
      { kind: 'brace', text: '320B TOTAL PARAMETERS', anchor: 'grid-total', at: { x: '0%', y: '16%' }, side: 'top' },
      {
        kind: 'brace',
        text: '~18B ACTIVE',
        sub: '(about 5.6%)',
        anchor: 'grid-active',
        at: { x: '0%', y: '77%' },
        tone: 'orange',
      },
    ],
  },
  {
    n: 4,
    id: 'obvious-question',
    relation: 'and-yet',
    title: 'The obvious question',
    vo: 'Okay. So why have the other 300 billion?',
    commands: [narrator.hide()],
    stages: [{ at: 420, commands: [grid.letInactiveAsk()] }],
    overlays: [
      { kind: 'brace', text: '320B TOTAL PARAMETERS', anchor: 'grid-total', at: { x: '0%', y: '16%' }, side: 'top' },
      { kind: 'brace', text: '~18B ACTIVE', anchor: 'grid-active', at: { x: '0%', y: '77%' }, tone: 'orange' },
      H('What about us?', { x: '45%', y: '25%' }, { rotate: -2, backed: true }),
      H('Why are we here?', { x: '65%', y: '22%' }, { rotate: 2, backed: true }),
      H('Do we ever\nget to work?', { x: '90%', y: '55%' }, { rotate: -1 }),
      H('Are we\njust extra?', { x: '47%', y: '66%' }, { rotate: 2, backed: true }),
    ],
  },
  {
    n: 5,
    id: 'not-useless',
    relation: 'so',
    title: "The inactive part isn't useless",
    vo: 'The rest are organized into 288 experts. They stay inactive until they are needed.',
    commands: [grid.stopAsking(), narrator.at({ x: 7, y: 62 }, 'wonder', 0.8)],
    // One cell becomes an expert on its own and is allowed to land, THEN the
    // rest follow as a wave outward from it. Show one, then all.
    stages: [
      { at: 380, commands: [grid.showOneExpert({ x: 58, y: 48 }, 0.95)] },
      { at: 1500, commands: [grid.becomeExperts({ x: 58, y: 48 }, 0.95)] },
    ],
    overlays: [
      H('So where do the\nother 300B go?', { x: '1.5%', y: '40%' }, { rotate: -3 }),
      { kind: 'note', text: 'They are Experts!', at: { x: '68%', y: '13%' }, size: 'md', rotate: 3, tone: 'orange' },
      { kind: 'brace', text: '288 EXPERTS', sub: '(inactive until needed)', at: { x: '27%', y: '85%' }, width: '62%' },
    ],
  },
  {
    n: 6,
    id: 'meet-the-router',
    relation: 'so',
    title: 'Meet the router',
    vo: 'A router reads what the word has become, scores every expert, and takes the top few.',
    commands: [grid.moveTo({ x: 64, y: 48 }, 0.72), word.moveTo({ x: 17, y: 54 })],
    // The router has to arrive and be seen before it does anything, and it has
    // to visibly score before eight light up, or selection reads as magic.
    stages: [
      { at: 420, commands: [router.appear({ x: 34, y: 54 }, 0.86)] },
      { at: 1050, commands: [narrator.at({ x: 6, y: 76 }, 'wonder', 0.74)] },
      { at: 1400, commands: [grid.score(), router.fanOut()] },
    ],
    overlays: [
      H('How does it choose\nthe right experts?', { x: '13%', y: '70%' }, { rotate: -3 }),
      {
        kind: 'bubble',
        text: 'I read what this word has become, score every expert, and take the top 8.',
        at: { x: '25%', y: '12%' },
        width: 330,
        tail: 'bottom-left',
      },
      H('An expert is a learned network block — not a labelled specialist.', { x: '30%', y: '90%' }, { rotate: -1 }),
    ],
  },
  {
    n: 7,
    id: 'small-team',
    relation: 'hope',
    title: 'One word, a small team',
    vo: 'For this word, the router selects 8 experts plus 1 shared expert that is always active.',
    commands: [router.foldFan()],
    stages: [{ at: 520, commands: [grid.stopScoring()] }],
    overlays: [
      H('The router picks a small\nteam for this word.', { x: '13%', y: '70%' }, { rotate: -2 }),
      { kind: 'arrow', from: { x: 690, y: 560 }, to: { x: 800, y: 548 }, bow: -12, tone: 'orange' },
      { kind: 'brace', text: '8 ROUTED + 1 SHARED ARE ACTIVE', at: { x: '41%', y: '86%' }, width: '48%', tone: 'orange' },
    ],
  },
  {
    n: 8,
    id: 'route-it-yourself',
    relation: 'hope',
    title: 'Different words, different experts',
    vo: 'A different word is routed to a different set of experts. Try it.',
    interactive: true,
    commands: [word.hide()],
    overlays: [
      H('Pick a word. Watch which experts light up.', { x: '30%', y: '9%' }, { size: 'md', rotate: -1 }),
      H('Same model.\nDifferent experts.', { x: '30%', y: '74%' }, { rotate: -2 }),
    ],
  },
  {
    n: 9,
    id: 'new-question',
    relation: 'and-yet',
    title: 'A new question',
    vo: 'But then I had another question.',
    commands: [
      grid.recede(),
      grid.moveTo({ x: 69, y: 42 }, 0.58),
      router.moveTo({ x: 19, y: 46 }, 0.62),
      word.arrive({ x: 14, y: 26 }, 0.8),
      team.form({ x: 19, y: 68 }, 32, '8 EXPERTS + 1 SHARED', '(active now)'),
      shelf.reveal('MODEL WEIGHTS (STORED)', 'Hundreds of GB', { x: 74, y: 52 }),
      narrator.at({ x: 46, y: 60 }, 'think', 0.88),
    ],
    overlays: [
      H('If only a few\nare working…', { x: '38%', y: '28%' }, { size: 'md', rotate: -2 }),
      { kind: 'arrow', from: { x: 330, y: 300 }, to: { x: 372, y: 366 }, bow: 12 },
    ],
  },
  {
    n: 10,
    id: 'memory-problem',
    relation: 'wall',
    title: 'The memory problem',
    vo: 'If only a few experts are being used, why deal with hundreds of gigabytes of weights?',
    commands: [
      grid.hide(),
      shelf.relabel('MODEL WEIGHTS (ON DISK / STORAGE)', 'Hundreds of GB (e.g. 200-400GB)'),
      memory.open({ x: 43, y: 50 }, 9),
      narrator.hide(),
    ],
    overlays: [
      H('…but a huge\namount of weights!', { x: '52%', y: '14%' }, { rotate: 2 }),
      { kind: 'arrow', from: { x: 1090, y: 230 }, to: { x: 1272, y: 320 }, bow: -24 },
      { kind: 'brace', text: '8 EXPERTS + 1 SHARED', sub: '(active compute)', at: { x: '5%', y: '76%' }, width: '20%' },
    ],
  },
  {
    n: 11,
    id: 'keep-small-part',
    relation: 'hope',
    title: 'Keep only the small part?',
    vo: "Why can't I keep just the small part I need?",
    commands: [
      memory.load(4, '(only what we need)'),
      shelf.relabel('REST OF MODEL (STILL STORED)', 'Hundreds of GB (still there)'),
      shelf.recede(),
      team.relabel('8 EXPERTS + 1 SHARED', '(the ones we need)'),
      narrator.at({ x: 62, y: 28 }, 'hopeful', 0.74),
    ],
    overlays: [
      {
        kind: 'arrow',
        from: { x: 520, y: 540 },
        to: { x: 760, y: 560 },
        bow: 70,
        tone: 'orange',
        label: 'Load into memory?',
      },
      H('That would be\nso much simpler!', { x: '54%', y: '9%' }, { rotate: -2 }),
      { kind: 'sparks', at: { x: '58%', y: '19%' } },
    ],
  },
  {
    n: 12,
    id: 'router-already-knows',
    relation: 'hope',
    title: 'The router already knows',
    vo: 'The router already knows which experts this word should go to.',
    commands: [
      router.speakUp(),
      picked.show({ x: 66, y: 28 }),
      memory.moveTo({ x: 66, y: 76 }),
      narrator.at({ x: 92, y: 72 }, 'cheer', 0.72),
    ],
    overlays: [
      {
        kind: 'bubble',
        text: 'I already know which experts to use!',
        at: { x: '12%', y: '14%' },
        width: 275,
        tail: 'bottom-center',
      },
      { kind: 'arrow', from: { x: 560, y: 470 }, to: { x: 1120, y: 330 }, bow: 90 },
      { kind: 'note', text: 'Load into memory', at: { x: '82%', y: '46%' }, size: 'sm', rotate: -2, tone: 'orange' },
      H('Makes sense!', { x: '86%', y: '58%' }, { rotate: 2 }),
    ],
  },
  {
    n: 13,
    id: 'something-stops-this',
    relation: 'wall',
    title: 'Something is stopping this',
    vo: 'Could this make the model fit on a smaller machine? And if not, what is stopping us?',
    commands: [
      router.settle(),
      router.moveTo({ x: 32, y: 42 }, 0.58),
      word.hide(),
      team.moveTo({ x: 13, y: 42 }, 36),
      team.relabel('Stored experts (on disk / CPU)'),
      picked.show({ x: 49, y: 42 }),
      memory.hide(),
      shelf.hide(),
      blocker.drop({ x: 67, y: 48 }),
      machine.show({ x: 81, y: 43 }),
      narrator.at({ x: 14, y: 80 }, 'think', 0.76),
    ],
    overlays: [
      H('We only load the\nexperts we need!', { x: '7%', y: '13%' }, { rotate: -2 }),
      { kind: 'note', text: 'But something\nis blocking it…', at: { x: '63%', y: '12%' }, size: 'md', rotate: 2, tone: 'red' },
      H('Pick the right\nexperts for this word', { x: '26%', y: '58%' }, { rotate: -1 }),
      { kind: 'arrow', from: { x: 430, y: 454 }, to: { x: 512, y: 454 }, bow: 0 },
      { kind: 'arrow', from: { x: 750, y: 454 }, to: { x: 830, y: 454 }, bow: 0 },
      { kind: 'arrow', from: { x: 1010, y: 454 }, to: { x: 1094, y: 454 }, bow: 0 },
      { kind: 'cross', at: { x: '58%', y: '42%' } },
      H('A smaller machine?', { x: '76%', y: '56%' }, { rotate: -1 }),
      { kind: 'note', text: "So… why doesn't this just work?", at: { x: '23%', y: '76%' }, size: 'lg', rotate: -2 },
    ],
  },
  {
    n: 14,
    id: 'follow-word-inside',
    relation: 'therefore',
    title: 'Follow one word inside',
    vo: "Staring at the final architecture isn't enough. Let's see what happens inside the model.",
    commands: [
      team.hide(),
      picked.hide(),
      router.hide(),
      blocker.hide(),
      machine.hide(),
      sheet.present({ x: 26, y: 48 }),
      sheet.pushAside(),
      arch.open({ x: 84, y: 52 }),
      word.arrive({ x: 66, y: 52 }, 0.82),
      narrator.at({ x: 45, y: 60 }, 'push', 0.82, true),
    ],
    overlays: [
      H("That's a lot\nfor now…", { x: '47%', y: '30%' }, { rotate: -2 }),
      H("Let's look inside instead.", { x: '55%', y: '73%' }, { rotate: 1 }),
      { kind: 'arrow', from: { x: 1130, y: 760 }, to: { x: 1420, y: 650 }, bow: 70 },
      { kind: 'note', text: 'Inside the model', at: { x: '78%', y: '14%' }, size: 'lg', rotate: 0 },
      { kind: 'arrow', from: { x: 1330, y: 562 }, to: { x: 1470, y: 562 }, bow: 0 },
    ],
  },
]

export function holdFor(beat: Beat) {
  const staged = beat.stages?.length ? Math.max(...beat.stages.map((stage) => stage.at)) : 0
  return HOLD[beat.relation] + staged
}

/** Longest staged offset, so the recorder knows how long a beat really needs. */
export function stageSpan(beat: Beat) {
  const stages = beat.stages?.map((stage) => stage.at) ?? []
  const late = beat.lateOverlays ? [beat.lateOverlays.at] : []
  const all = [...stages, ...late]
  return all.length ? Math.max(...all) : 0
}
