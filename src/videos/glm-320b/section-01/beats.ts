import { HOLD, type Relation } from '../../../paper/motion'
import {
  CHOSEN,
  archSheet,
  bar,
  desk,
  hospital,
  machine,
  narrator,
  plan,
  sheet,
  team,
  word,
  type Patch,
} from './scene'

export type Overlay = {
  kind: 'note' | 'bubble' | 'brace' | 'arrow' | 'sparks' | 'title'
  /** Percentages of the stage, except `arrow`, which uses 1920x1080 units. */
  at?: { x: string; y: string }
  from?: { x: number; y: number }
  to?: { x: number; y: number }
  text?: string
  sub?: string
  width?: string | number
  rotate?: number
  tone?: 'ink' | 'orange' | 'red' | 'blue'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  side?: 'top' | 'bottom'
  bow?: number
  dashed?: boolean
  backed?: boolean
  tail?: 'bottom-left' | 'bottom-center' | 'left'
  label?: string
  /**
   * Survives into later beats until one sets `clearSticky`. Overlays are
   * otherwise replaced wholesale each beat, which silently dropped the
   * `hundreds of gigabytes` label one beat after it appeared -- taking the
   * mismatch frame's whole point with it.
   */
  sticky?: boolean
}

/** A staged reveal inside one beat: show the thing, then name it, then react. */
export type Stage = { at: number; commands: Patch[] }

export type Beat = {
  n: number
  id: string
  title: string
  /** What Ahmad says over this beat. Notes on screen must never transcribe it. */
  vo: string
  /** What this beat IS in the story. Drives motion feel and hold time. */
  relation: Relation
  /** Seconds this beat holds in the recorded cut. Sums to the board's 2:12. */
  secs: number
  commands: Patch[]
  stages?: Stage[]
  overlays?: Overlay[]
  /** Held back until `at` ms, so a label can arrive after its object. */
  lateOverlays?: { at: number; overlays: Overlay[] }
  /** Drops every sticky overlay carried in from earlier beats. */
  clearSticky?: boolean
}

const H = (text: string, at: { x: string; y: string }, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at,
  size: 'sm',
  ...extra,
})

/* Layout anchors. Kept here so the whole section can be reflowed in one place. */
const HOSP = { x: 58, y: 40 }
const HOSP_S = 0.78
/** Building's left edge and width as stage percentages, for braces beneath it. */
const HOSP_LEFT = '34%'
const HOSP_W = '48%'

export const BEATS: Beat[] = [
  /* ═══ M1 · THE TWO NUMBERS ═══════════════════════════════════════════════
   * Fast. The viewer roughly knows these words, so the job is only to put the
   * two numbers next to each other and let the gap do the work. */
  {
    n: 1,
    id: 'the-model',
    title: 'Meet the model',
    relation: 'want',
    secs: 3,
    vo: "So, GLM-5.3-Flash. This is the model we're going to pull apart.",
    commands: [sheet.arrive({ x: 50, y: 45 }), narrator.at({ x: 14, y: 71 }, 'point', 1)],
  },
  {
    n: 2,
    id: 'total',
    title: '320 billion',
    relation: 'so',
    secs: 4,
    vo: 'It has 320 billion parameters.',
    commands: [],
    stages: [{ at: 260, commands: [sheet.lightTotal()] }],
  },
  {
    n: 3,
    id: 'knowledge',
    title: 'Parameters are knowledge',
    relation: 'so',
    secs: 3.5,
    vo: 'Which in simple words is everything it has ever learned.',
    commands: [narrator.pose('wonder')],
    overlays: [
      H('everything it has\never learned', { x: '75%', y: '38%' }, { size: 'md', rotate: -3, tone: 'orange' }),
      { kind: 'arrow', from: { x: 1420, y: 430 }, to: { x: 1180, y: 452 }, bow: 30, tone: 'orange' },
    ],
  },
  {
    n: 4,
    id: 'active',
    title: 'Only 18 billion active',
    relation: 'and-yet',
    secs: 4.5,
    vo: 'But for any one word, only about 18 billion of them are active.',
    commands: [],
    stages: [{ at: 300, commands: [sheet.lightBoth()] }],
  },
  {
    n: 5,
    id: 'the-pair',
    title: 'The two numbers, alone',
    relation: 'so',
    secs: 3.5,
    vo: 'So the model owns 320 billion...  but only uses this much of them.',
    // The sheet has done its job. What matters from here is the *relationship*
    // between two numbers, not a spec list, so everything else leaves.
    commands: [sheet.foldAway(), bar.asPair({ x: 50, y: 42 })],
  },
  {
    n: 6,
    id: 'the-sliver',
    title: 'The share bar',
    relation: 'so',
    secs: 5,
    // FROZEN-FRAME TEST 1 of 3. The whole premise of the section, in one image.
    vo: 'Which, drawn to scale, looks like this.',
    commands: [],
    stages: [{ at: 240, commands: [bar.asBar({ x: 50, y: 50 }, 1, 'for one word \u2014 about 5% of it')] }],
  },
  {
    n: 7,
    id: 'okay',
    title: 'Okay',
    relation: 'so',
    secs: 2.5,
    vo: 'Okay.',
    commands: [narrator.pose('nod')],
  },

  /* ═══ M2 · SO WHY HAVE THE REST? ═════════════════════════════════════════
   * The question lands at beat 8 of 31. Every earlier version buried it past
   * the halfway mark, which is why they read as exposition. */
  {
    n: 8,
    id: 'the-dark-rest',
    title: 'So why have the other 300 billion?',
    relation: 'and-yet',
    secs: 4,
    vo: 'So why have the other 300 billion at all?',
    commands: [bar.darken()],
    lateOverlays: {
      at: 240,
      overlays: [
        { kind: 'note', text: '?', at: { x: '52%', y: '44%' }, size: 'xl', tone: 'red', rotate: 0 },
        H('what is all of this for?', { x: '62%', y: '64%' }, { size: 'md', rotate: -2, tone: 'red' }),
      ],
    },
  },
  {
    n: 9,
    id: 'ask-it',
    title: 'Ahmad asks it',
    relation: 'hope',
    secs: 4,
    vo: "That's the question. And the answer turns into a much better one.",
    commands: [narrator.at({ x: 14, y: 71 }, 'hopeful', 1)],
  },

  /* ═══ M3 · THE HOSPITAL ══════════════════════════════════════════════════
   * The world arrives by transformation, not replacement: the bar rises into
   * the building. Same subject, new form. */
  {
    n: 10,
    id: 'build',
    title: 'The hospital',
    relation: 'therefore',
    secs: 5,
    vo: "Because this is a Mixture-of-Experts model. And the easiest way to see one is as a hospital.",
    commands: [narrator.at({ x: 7, y: 84 }, 'wonder', 0.5)],
    stages: [
      { at: 120, commands: [bar.moveTo({ x: 58, y: 40 }, 0.5)] },
      { at: 520, commands: [bar.off(), hospital.rise(HOSP, HOSP_S)] },
    ],
  },
  {
    n: 11,
    id: 'the-sign',
    title: 'Named on the world',
    relation: 'so',
    secs: 3,
    vo: 'A big one.',
    commands: [hospital.label('Mixture of Experts', '320B total')],
  },
  {
    n: 12,
    id: 'staff',
    title: '288 specialists',
    relation: 'so',
    secs: 5,
    vo: 'Inside it there are lots of different expert networks. Two hundred and eighty-eight of them.',
    commands: [],
    stages: [{ at: 200, commands: [hospital.staff()] }],
    lateOverlays: {
      at: 1050,
      overlays: [{ kind: 'brace', text: '288 experts', at: { x: HOSP_LEFT, y: '68%' }, width: HOSP_W }],
    },
  },
  {
    n: 13,
    id: 'a-word-arrives',
    title: 'One word arrives',
    relation: 'so',
    secs: 3.5,
    vo: 'A word comes in.',
    // The desk arrives here, unlabelled and unremarked. Beat 23 depends
    // entirely on it having been on screen for ten beats already.
    commands: [word.arrive({ x: 10, y: 58 }, 0.5, 'scared'), desk.arrive({ x: 24, y: 82 }, 0.6)],
  },
  {
    n: 14,
    id: 'eight-light',
    title: 'Only a few are selected',
    relation: 'so',
    secs: 5,
    vo: 'And for that word, only a few of them are selected.',
    // Passive on purpose, matching the script. No chooser is shown yet.
    commands: [],
    stages: [{ at: 260, commands: [hospital.choose(CHOSEN)] }],
  },
  {
    n: 15,
    id: 'count-them',
    title: '8 working, 280 not',
    relation: 'so',
    secs: 3.5,
    vo: 'Eight of them. Out of 288.',
    commands: [],
    overlays: [
      H('these eight are working', { x: '36%', y: '9%' }, { size: 'md', rotate: -2, tone: 'orange' }),
      { kind: 'brace', text: '280 doing nothing', at: { x: HOSP_LEFT, y: '68%' }, width: HOSP_W, tone: 'orange' },
    ],
  },
  {
    n: 16,
    id: 'makes-sense',
    title: 'That makes sense',
    relation: 'so',
    secs: 3,
    vo: 'That makes sense.',
    commands: [narrator.pose('nod')],
  },

  /* ═══ M4 · THE SECOND QUESTION ═══════════════════════════════════════════
   * The eight leave the building so that "the team is tiny" and "the building
   * is enormous" can be held in one frame. */
  {
    n: 17,
    id: 'turn',
    title: 'But then',
    relation: 'and-yet',
    secs: 3,
    vo: 'But then I had another question.',
    commands: [narrator.pose('wonder')],
  },
  {
    n: 18,
    id: 'isolate-eight',
    title: 'The eight, lifted out',
    relation: 'so',
    secs: 4.5,
    vo: 'If only a few experts are actually being used...',
    commands: [team.lift({ x: 16, y: 38 }, 0.85), hospital.quiet()],
  },
  {
    n: 19,
    id: 'the-weight',
    title: 'Hundreds of gigabytes',
    relation: 'wall',
    secs: 5.5,
    vo: 'why does running the model still mean dealing with hundreds of gigabytes of weights?',
    commands: [hospital.heavy()],
    lateOverlays: {
      at: 340,
      overlays: [
        // Centred under the building it measures. Floating out to the left, it
        // read as an unrelated caption rather than the building's weight.
        H('hundreds of gigabytes', { x: '58%', y: '73%' }, { size: 'lg', rotate: -1, tone: 'red', sticky: true, width: '34%' }),
      ],
    },
  },
  {
    n: 20,
    id: 'the-mismatch',
    title: 'The mismatch',
    relation: 'and-yet',
    secs: 4.5,
    // FROZEN-FRAME TEST 2 of 3. Tiny team, enormous building, one frame.
    vo: 'All of that... for these eight.',
    commands: [],
    overlays: [{ kind: 'note', text: '?', at: { x: '30%', y: '36%' }, size: 'xl', tone: 'red', rotate: 0 }],
  },
  {
    n: 21,
    id: 'just-the-part',
    title: 'Keep just the small part',
    relation: 'hope',
    secs: 4.5,
    vo: "Why can't I keep just the small part I need?",
    commands: [team.box()],
    lateOverlays: {
      at: 280,
      overlays: [H('why not keep just this?', { x: '5%', y: '58%' }, { size: 'md', rotate: -2, tone: 'blue' })],
    },
  },

  /* ═══ M5 · THE ROUTER, NAMED ═════════════════════════════════════════════
   * Function before name. The chooser has been visible since beat 13; this is
   * where it turns out to have a name. */
  {
    n: 22,
    id: 'stranger',
    title: 'It gets stranger',
    relation: 'and-yet',
    secs: 3,
    vo: 'And it gets even stranger.',
    commands: [narrator.pose('think')],
  },
  {
    n: 23,
    id: 'reveal-router',
    title: 'That thing has a name',
    relation: 'so',
    secs: 5.5,
    vo: 'Because the model already has something called a router.',
    commands: [desk.name()],
  },
  {
    n: 24,
    id: 'its-job',
    title: 'What it does',
    relation: 'so',
    secs: 5,
    vo: 'Its whole job is to decide which experts a word should go to.',
    commands: [],
    overlays: [
      { kind: 'arrow', from: { x: 250, y: 700 }, to: { x: 400, y: 800 }, bow: -24 },
      { kind: 'arrow', from: { x: 520, y: 780 }, to: { x: 400, y: 500 }, bow: 70, tone: 'orange' },
      H('picks the eight', { x: '29%', y: '62%' }, { size: 'sm', rotate: -2, tone: 'orange' }),
    ],
  },
  {
    n: 25,
    id: 'so-pause',
    title: 'So...',
    relation: 'so',
    secs: 3,
    vo: 'So...',
    commands: [narrator.pose('hopeful')],
  },

  /* ═══ M6 · THE HOPE, AT ITS PEAK ═════════════════════════════════════════
   * Nothing here is crossed out, greyed as broken, or marked with a warning.
   * The plan has to look CORRECT. The viewer must finish this section
   * thinking "that should work" -- that is the headache. A hazard sign here
   * would turn curiosity into the feeling of being withheld from, which is
   * exactly what made every earlier version read as a bad story. */
  {
    n: 26,
    id: 'the-plan',
    title: 'The plan',
    relation: 'hope',
    secs: 6,
    vo: "If the router already knows which experts it needs... why can't we just load those, use them, and leave everything else asleep?",
    clearSticky: true,
    commands: [
      hospital.moveTo({ x: 85, y: 17 }, 0.36),
      hospital.bunks(),
      hospital.unheavy(),
      team.off(),
      word.off(),
      desk.off(),
      narrator.at({ x: 8, y: 82 }, 'hopeful', 0.5),
    ],
    stages: [{ at: 300, commands: [plan.draw({ x: 45, y: 42 }, 0.86)] }],
  },
  {
    n: 27,
    id: 'it-fits',
    title: 'And it fits',
    relation: 'hope',
    secs: 5.5,
    vo: 'Could we turn a 320-billion-parameter model into something that fits comfortably on a much smaller machine?',
    commands: [machine.arrive({ x: 87, y: 44 }, 0.62)],
    stages: [{ at: 420, commands: [machine.fill(), narrator.pose('cheer')] }],
    lateOverlays: {
      at: 620,
      overlays: [
        { kind: 'sparks', at: { x: '87%', y: '30%' } },
        H('it fits!', { x: '87%', y: '58%' }, { size: 'lg', rotate: -3, tone: 'orange', sticky: true, width: '20%' }),
      ],
    },
  },
  {
    n: 28,
    id: 'and-if-not',
    title: 'And if not',
    relation: 'and-yet',
    secs: 4,
    vo: 'And if not...',
    // Nothing breaks. The sparks simply stop and the pose drops. The restraint
    // here is the entire difference between a headache and a red cross.
    commands: [narrator.pose('think')],
  },
  {
    n: 29,
    id: 'the-question',
    title: 'The headache',
    relation: 'wall',
    secs: 6,
    // FROZEN-FRAME TEST 3 of 3. The working plan, with the question over it.
    vo: 'what exactly is stopping us?',
    commands: [],
    overlays: [
      {
        kind: 'note',
        text: 'If we only load the experts we need,\nwhy can’t we run this on far less memory?',
        at: { x: '50%', y: '78%' },
        size: 'xl',
        rotate: -1,
        backed: true,
        width: '74%',
      },
    ],
  },

  /* ═══ M7 · GO INSIDE ═════════════════════════════════════════════════════ */
  {
    n: 30,
    id: 'the-sheet',
    title: 'Staring at it will not help',
    relation: 'therefore',
    secs: 4.5,
    vo: "To answer that, staring at the final architecture isn't going to help.",
    commands: [archSheet.slam({ x: 48, y: 50 })],
    stages: [{ at: 600, commands: [narrator.at({ x: 7, y: 84 }, 'push', 0.5)] }],
  },
  {
    n: 31,
    id: 'inside',
    title: 'Inside the model',
    relation: 'therefore',
    secs: 5.5,
    vo: "So let's see what's actually happening in there.",
    clearSticky: true,
    commands: [
      archSheet.off(),
      plan.off(),
      hospital.moveTo({ x: 58, y: 44 }, 0.8),
      hospital.wake(),
      // Nobody is asleep in this frame and nothing is pressing down: leaving
      // the zZ and the weight arrows on read as leftover state, not story.
      hospital.unbunk(),
      hospital.openDoors(),
      machine.off(),
      word.arrive({ x: 26, y: 60 }, 0.5, 'scared'),
      narrator.at({ x: 9, y: 85 }, 'push', 0.5),
    ],
    lateOverlays: {
      at: 420,
      overlays: [
        { kind: 'arrow', from: { x: 650, y: 660 }, to: { x: 1050, y: 668 }, bow: 14 },
        H('inside the model', { x: '46%', y: '84%' }, { size: 'lg', rotate: -1 }),
      ],
    },
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

/** Board runtime, so drift between the doc and the code is visible. */
export const RUNTIME_SECONDS = BEATS.reduce((total, beat) => total + beat.secs, 0)
