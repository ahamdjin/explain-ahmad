import { type Beat, type Overlay } from '../../../paper'
import {
  CHOSEN,
  CHOSEN_B,
  archSheet,
  bar,
  desk,
  ground,
  hospital,
  loop,
  machine,
  narrator,
  plan,
  sheet,
  team,
  word,
  word2,
  type Patch,
} from './scene'

const H = (text: string, at: { x: string; y: string }, extra: Partial<Overlay> = {}): Overlay => ({
  kind: 'note',
  text,
  at,
  size: 'sm',
  ...extra,
})

/* Layout anchors. Kept here so the whole section can be reflowed in one place. */
const HOSP = { x: 57, y: 41 }
const HOSP_S = 0.78
/** Building's left edge and width as stage percentages, for braces beneath it. */
const HOSP_LEFT = '33%'
const HOSP_W = '48%'

export const BEATS: Beat<Patch>[] = [
  /* ═══ ACT 1 · THE CLAIM ══════════════════════════════════════════════════
   * The want is a claim on trial, so the section opens on the claim and on
   * the machine *working* -- never on a specification table. */
  {
    n: 1,
    id: 'the-model',
    title: 'This is the model',
    relation: 'want',
    secs: 3.5,
    vo: 'This is GLM-5.3-Flash.',
    commands: [
      ground.at(84),
      sheet.arrive({ x: 56, y: 44 }),
      narrator.at({ x: 21, y: 66 }, 'point', 1),
    ],
  },
  {
    n: 2,
    id: 'the-claim',
    title: 'And they call it efficient',
    relation: 'so',
    secs: 5,
    vo: 'Three hundred and twenty billion parameters \u2014 everything it has ever learned. And they call it efficient.',
    commands: [],
    stages: [{ at: 260, commands: [sheet.lightTotal()] }],
    lateOverlays: {
      at: 900,
      overlays: [
        H('\u201cefficient\u201d', { x: '76%', y: '68%' }, { size: 'lg', rotate: -6, tone: 'claim' }),
        { kind: 'arrow', from: { x: 1520, y: 700 }, to: { x: 1330, y: 560 }, bow: -30, tone: 'claim' },
      ],
    },
  },
  {
    n: 3,
    id: 'what-it-does',
    title: 'Word in, next word out',
    relation: 'so',
    secs: 5,
    // Start on the machine doing its job. The body stays closed -- it is the
    // same object that opens into the expert world at beat 6.
    vo: 'Its whole job is this. You give it a word, it gives you the next one.',
    commands: [sheet.foldAway(), narrator.at({ x: 9, y: 78 }, 'wonder', 0.62)],
    stages: [
      { at: 200, commands: [loop.show({ x: 53, y: 42 }, 1, 'dog', 'ran')] },
      { at: 1300, commands: [loop.answer()] },
    ],
  },
  {
    n: 4,
    id: 'only-18',
    title: 'Only 18 billion move',
    relation: 'and-yet',
    secs: 5.5,
    // FROZEN FRAME 1 of 3. The claim and the number, in one image.
    vo: 'And doing that only uses eighteen billion of them. About five percent.',
    commands: [loop.off()],
    stages: [{ at: 240, commands: [bar.asBar({ x: 50, y: 44 }, 1, 'the part that actually works')] }],
  },

  /* ═══ ACT 2 · SO WHY CARRY THE REST? ═════════════════════════════════════
   * Q1 is asked at beat 5 of 21 and is genuinely answered at beat 13. */
  {
    n: 5,
    id: 'q1',
    title: 'So why carry the rest?',
    relation: 'and-yet',
    secs: 4.5,
    vo: 'So why carry the other three hundred billion at all?',
    commands: [bar.darken(), narrator.pose('think')],
    lateOverlays: {
      at: 260,
      overlays: [{ kind: 'note', text: '?', at: { x: '52%', y: '42%' }, size: 'xl', tone: 'cost', rotate: 0 }],
    },
  },
  {
    n: 6,
    id: 'look-inside',
    title: 'Not one big block',
    relation: 'therefore',
    secs: 5,
    vo: "Let's look inside. It isn't one big block of knowledge.",
    commands: [ground.off()],
    stages: [
      { at: 120, commands: [bar.moveTo(HOSP, 0.5)] },
      { at: 540, commands: [bar.off(), hospital.rise(HOSP, HOSP_S), narrator.at({ x: 7, y: 84 }, 'wonder', 0.5)] },
    ],
  },
  {
    n: 7,
    id: 'experts',
    title: '288 experts',
    relation: 'so',
    secs: 5,
    vo: "It's split into experts. Two hundred and eighty-eight of them.",
    commands: [hospital.label('Mixture of Experts', '320B total')],
    stages: [{ at: 200, commands: [hospital.staff()] }],
    lateOverlays: {
      at: 1050,
      overlays: [{ kind: 'brace', text: '288 experts', at: { x: HOSP_LEFT, y: '69%' }, width: HOSP_W }],
    },
  },
  {
    n: 8,
    id: 'a-word-arrives',
    title: 'A word comes in',
    relation: 'so',
    secs: 3.5,
    // The desk lands here, unlabelled. Beat 16 depends on it having been on
    // screen, unremarked, for eight beats.
    vo: 'A word comes in.',
    commands: [word.arrive({ x: 10, y: 56 }, 0.5, 'dog'), desk.arrive({ x: 23, y: 82 }, 0.58)],
  },
  {
    n: 9,
    id: 'a-few-picked',
    title: 'Only a few get picked',
    relation: 'so',
    secs: 4.5,
    // Passive, matching the script. No chooser is shown yet.
    vo: 'And only a few of them get picked.',
    commands: [],
    stages: [{ at: 240, commands: [hospital.choose(CHOSEN)] }],
  },
  {
    n: 10,
    id: 'eight-of-288',
    title: 'Eight of 288',
    relation: 'so',
    secs: 4.5,
    vo: 'Eight. Out of 288. The other 280 do nothing at all.',
    commands: [],
    overlays: [
      H('these eight are working', { x: '35%', y: '9%' }, { size: 'md', rotate: -2 }),
      { kind: 'brace', text: '280 doing nothing', at: { x: HOSP_LEFT, y: '69%' }, width: HOSP_W },
    ],
  },
  {
    n: 11,
    id: 'another-word',
    title: 'Now watch',
    relation: 'and-yet',
    secs: 4,
    vo: 'Now watch. Another word.',
    commands: [word.moveTo({ x: 10, y: 40 }, 0.44), narrator.pose('point')],
    stages: [{ at: 300, commands: [word2.arrive({ x: 10, y: 62 }, 0.5, 'cat')] }],
  },
  {
    n: 12,
    id: 'different-eight',
    title: 'A completely different eight',
    relation: 'wall',
    // THE EVENT. Everything in this section and in section 7 depends on it,
    // so it gets the longest hold in the section and no competing overlay.
    secs: 6,
    vo: 'A completely different eight.',
    commands: [hospital.reroute(CHOSEN_B, CHOSEN)],
    lateOverlays: {
      at: 800,
      overlays: [
        H('different word,\ndifferent experts', { x: '4%', y: '16%' }, { size: 'md', rotate: -2, tone: 'cost' }),
        // A leader line, because a label floating at the frame edge does not
        // tell you which marks it is naming.
        H('these are empty now', { x: '20%', y: '25%' }, { size: 'sm', rotate: -2, tone: 'cost' }),
        { kind: 'arrow', from: { x: 560, y: 300 }, to: { x: 792, y: 348 }, bow: -18, tone: 'cost' },
      ],
    },
  },
  {
    n: 13,
    id: 'options',
    title: "They're options",
    relation: 'therefore',
    secs: 6,
    // Q1 answered. The viewer should feel the 300 billion is not waste.
    vo: "Same model. New word, new team. So those three hundred billion aren't waste \u2014 they're options. You just never need all of them at once.",
    commands: [narrator.pose('nod')],
    overlays: [
      {
        kind: 'note',
        text: 'not waste \u2014 options',
        at: { x: '52%', y: '80%' },
        size: 'lg',
        rotate: -1,
        backed: true,
        width: '40%',
      },
    ],
  },

  /* ═══ ACT 3 · THEN WHY IS IT SO HEAVY? ═══════════════════════════════════
   * A new question, which needs beat 13's answer to even be askable. */
  {
    n: 14,
    id: 'but-hold-on',
    title: 'But hold on',
    relation: 'and-yet',
    secs: 3.5,
    vo: "But hold on. If it's only ever eight at a time\u2026",
    // The two words stand down here and come back at beat 19 to accuse. They
    // also collided with the team, and act 3 is about the plan, not the words.
    commands: [
      team.lift({ x: 15, y: 34 }, 0.8),
      word.off(),
      word2.off(),
      hospital.quiet(),
      narrator.pose('wonder'),
    ],
  },
  {
    n: 15,
    id: 'the-weight',
    title: 'Hundreds of gigabytes',
    relation: 'wall',
    secs: 5.5,
    // FROZEN FRAME 2 of 3. Tiny team, enormous heavy building, one image.
    vo: 'why does running this thing still mean hundreds of gigabytes?',
    commands: [hospital.heavy()],
    lateOverlays: {
      at: 320,
      overlays: [
        H('hundreds of gigabytes', { x: '57%', y: '74%' }, { size: 'lg', rotate: -1, tone: 'cost', sticky: true, width: '34%' }),
        { kind: 'note', text: '?', at: { x: '29%', y: '32%' }, size: 'xl', tone: 'cost', rotate: 0 },
      ],
    },
  },
  {
    n: 16,
    id: 'the-router',
    title: 'It was there all along',
    relation: 'so',
    secs: 6,
    // Function before name: this desk has been on screen since beat 8.
    vo: "Especially when something already knows which eight you need. It's called the router \u2014 and it's been sitting right there the whole time.",
    commands: [desk.name(), narrator.pose('point')],
    lateOverlays: {
      at: 700,
      overlays: [{ kind: 'arrow', from: { x: 300, y: 700 }, to: { x: 380, y: 800 }, bow: -20, tone: 'relate' }],
    },
  },
  {
    n: 17,
    id: 'the-plan',
    title: 'So load those eight',
    relation: 'hope',
    secs: 6,
    // Nothing here is crossed out or marked as failing. The plan must look
    // correct, because the viewer has to leave thinking it should work.
    vo: 'So load those eight. Leave everybody else asleep.',
    clearSticky: true,
    commands: [
      hospital.moveTo({ x: 85, y: 17 }, 0.36),
      hospital.bunks(),
      hospital.unheavy(),
      team.off(),
      word.off(),
      word2.off(),
      desk.off(),
      narrator.at({ x: 8, y: 82 }, 'hopeful', 0.5),
    ],
    stages: [{ at: 300, commands: [plan.draw({ x: 45, y: 42 }, 0.86)] }],
  },
  {
    n: 18,
    id: 'it-fits',
    title: 'That fits on almost anything',
    relation: 'hope',
    secs: 5,
    vo: 'Eight experts. That fits on almost anything.',
    commands: [machine.arrive({ x: 87, y: 44 }, 0.62)],
    stages: [{ at: 400, commands: [machine.fill(), narrator.pose('cheer')] }],
    lateOverlays: {
      at: 600,
      overlays: [
        { kind: 'sparks', at: { x: '87%', y: '30%' } },
        H('it fits', { x: '87%', y: '58%' }, { size: 'lg', rotate: -3, sticky: true, width: '20%' }),
      ],
    },
  },

  /* ═══ ACT 4 · THE TURN ═══════════════════════════════════════════════════
   * The payoff of beat 12. Nothing is shown blocked -- the plan stays intact
   * and correct-looking underneath the question. */
  {
    n: 19,
    id: 'which-eight',
    title: 'Except \u2014 which eight?',
    relation: 'and-yet',
    secs: 5,
    vo: 'Except \u2014 which eight? That changed the moment the word changed.',
    commands: [narrator.pose('think')],
    stages: [{ at: 300, commands: [word.arrive({ x: 8, y: 20 }, 0.4, 'dog'), word2.arrive({ x: 8, y: 34 }, 0.4, 'cat')] }],
    lateOverlays: {
      at: 700,
      // Sticky: at beat 20 the two cards are the evidence the question rests
      // on, and unlabelled they read as leftover clutter.
      overlays: [H('two words.\ntwo different eights.', { x: '17%', y: '20%' }, { size: 'md', rotate: -2, tone: 'cost', sticky: true })],
    },
  },
  {
    n: 20,
    id: 'the-question',
    title: 'The exit question',
    relation: 'wall',
    secs: 7,
    // FROZEN FRAME 3 of 3. The working plan, with the question over it.
    /*
     * Deliberately says nothing about *repeating*. "You'd need a new set every
     * word" edges into section 6's reveal -- that the choice is remade at all
     * 42 sparse layers -- and spending it here costs section 6 its biggest
     * moment. Section 1's point is only that the choice is unpredictable.
     */
    vo: "So you can't know which eight until the word turns up. If we only load the experts we need, why can't we run this on far less memory?",
    commands: [],
    overlays: [
      {
        kind: 'note',
        text: 'If we only load the experts we need,\nwhy can\u2019t we run this on far less memory?',
        at: { x: '50%', y: '79%' },
        size: 'xl',
        rotate: -1,
        backed: true,
        width: '74%',
      },
    ],
  },
  {
    n: 21,
    id: 'go-inside',
    title: 'Follow one word inside',
    relation: 'therefore',
    secs: 5.5,
    vo: "To answer that, staring at the finished model won't help. Let's follow one word inside.",
    clearSticky: true,
    commands: [
      plan.off(),
      machine.off(),
      word2.off(),
      hospital.moveTo({ x: 58, y: 44 }, 0.8),
      hospital.wake(),
      hospital.unbunk(),
      hospital.openDoors(),
      word.arrive({ x: 26, y: 60 }, 0.5, 'dog'),
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

/** Board runtime, so drift between the script and the code is visible. */
export const RUNTIME_SECONDS = BEATS.reduce((total, beat) => total + beat.secs, 0)
