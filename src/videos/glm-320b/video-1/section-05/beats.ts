import { brace, centred, GROUND_Y, note, type Beat } from '../../../../paper'
import {
  CHOSEN,
  camera,
  chip,
  count,
  desk,
  ground,
  hospital,
  narrator,
  open,
  plates,
  row,
  shared,
  type Patch,
} from './scene'

/**
 * Section 05 — The router picks the eight.
 *
 * Script and board: `video-script/video-1/05-the-router-picks-the-eight.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * §4 leaves the contextual `it` row at centre with the wall already beginning.
 * Beat 1 completes that wall rather than cutting to a new one.
 *
 * Two things this section exists to prevent, and both cost a whole beat:
 * the sweep in beat 7 crosses **all** 288 (a sweep over the winners would say
 * the router looked at eight), and beat 11's plates are the only labels the
 * video ever puts on an expert — placed so they can be taken off.
 */

/** Where the row stands once it is the thing the router is reading. */
const AT_DESK = { x: 30, y: 72 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'in-front-of-the-wall',
    title: 'The wall finishes drawing behind the unchanged hero row',
    relation: 'want',
    secs: 12,
    vo: 'Now we reach the part that explains the word active. In one of GLM’s sparse layers, our `it` arrives in front of 288 experts.',
    commands: [
      ground.at(GROUND_Y),
      /*
       * §4 leaves the row at 50/44 scale 1.16 with the wall's edge at 50/94.
       * Both start here at exactly those values and *move*; the previous
       * version opened at 22/72 scale 0.42 under a comment claiming it was
       * unchanged, which made the seam a cut to a new, smaller object.
       */
      row.show({ x: 50, y: 44 }, 1.16, { label: 'the row, as attention left it' }),
      /* At §4's exact handover values, so this is the same wall continuing. */
      hospital.show({ x: 50, y: 94 }, 1),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'reach', flip: true }),
    ],
    /* The row steps aside as the wall rises behind it. */
    stages: [
      { at: 3200, commands: [hospital.moveTo({ x: 58, y: 40 }, 0.86), hospital.set({ staffed: true })] },
      { at: 5200, commands: [row.moveTo({ x: 24, y: 60 }, 0.68)] },
    ],
  },
  {
    n: 2,
    id: 'the-count-is-the-buildings',
    title: 'The wall holds and the count is painted on its own sign band',
    relation: 'so',
    secs: 10,
    vo: 'And no — you were not supposed to know that number. GLM simply has 288 routed experts available here.',
    /* On the building, not floating above it. A page overlay here reads as the
     * video asserting a figure; a sign reads as a property of the thing. */
    commands: [hospital.label('288 routed experts'), narrator.set({ pose: 'flat' })],
  },
  {
    n: 3,
    id: 'something-has-to-choose',
    title: 'A small desk draws itself between the row and the wall, and is named',
    relation: 'so',
    secs: 9,
    vo: 'But it does not run all 288. Something has to choose. That something is the router.',
    /* Named on arrival, unlike §2: by now the viewer has watched this desk work
     * unlabelled for two sections, so the name is a payoff rather than a
     * definition to memorise. */
    /* The wall drops back for two beats. "Something has to choose" is about
     * the desk, and a full-ink 288 beside a 0.68-scale desk makes the smallest
     * object on screen the one being introduced. */
    commands: [
      hospital.ghost(),
      desk.show({ x: 58, y: 66 }, 1.05),
      desk.name(),
      desk.ring(),
      narrator.set({ pose: 'point' }),
    ],
  },
  {
    n: 4,
    id: 'which-one-decides',
    title: '432 returns as a faint old card beside the bright contextual row',
    relation: 'and-yet',
    secs: 16,
    vo: 'And here’s a question you actually can answer now. Should the router choose based on the original token ID — 432... or based on the row we just changed using the sentence?',
    commands: [chip.show({ x: 18, y: 80 }, 0.5), row.pulse(), narrator.set({ pose: 'wonder' })],
    lateOverlays: {
      at: 8000,
      /* The `?` is the whole overlay. Naming either option would answer the
       * question the voice is still asking. */
      overlays: [centred('which one decides?', 18, 70, { size: 'md', rotate: -2, sticky: true })],
    },
  },
  {
    n: 5,
    id: 'the-changed-row-wins',
    title: '432 dims out and the contextual row slides into the router',
    relation: 'therefore',
    secs: 12,
    vo: 'It has to use the changed row. Because 432 is the same every time. But this row describes `it` right now, in this context.',
    commands: [chip.off(), row.moveTo(AT_DESK, 0.6), desk.moveTo({ x: 62, y: 74 }, 0.68), narrator.set({ pose: 'nod' })],
    clearSticky: true,
    overlays: [
      /* The figure the voice does not give: 432 is constant across every
       * occurrence, which is the reason it loses. */
      note('432 — same every time', 6, 80, { tone: 'cost', rotate: 3 }),
    ],
  },
  {
    n: 6,
    id: 'a-score-for-every-one',
    title: 'A blank score badge appears on every slot in the wall at once',
    relation: 'so',
    secs: 7,
    /* Blank before filled: the question is asked of all 288 before any answer
     * exists, and that ordering is the only way the count reads as the count. */
    vo: 'So the router takes that row and gives all 288 experts a score.',
    commands: [hospital.loud(), hospital.ask(), narrator.set({ pose: 'count' })],
  },
  {
    n: 7,
    id: 'all-two-eighty-eight',
    title: 'A sweep fills every badge, left to right. No semantic labels anywhere',
    relation: 'so',
    secs: 6,
    vo: 'Not eight of them. All 288.',
    commands: [hospital.score(), row.pulse()],
  },
  {
    n: 8,
    id: 'keeps-the-top-eight',
    title: 'Eight lift forward; the rest flatten',
    relation: 'therefore',
    secs: 10,
    vo: 'Then it keeps the top eight. The other 280 routed experts do nothing for this token, in this layer.',
    /* The brace is drawn by the building, not as a stage percentage — the wall
     * has already changed scale and camera, and no percentage tracks that. */
    commands: [hospital.choose(CHOSEN), hospital.idle('280 idle')],
  },
  {
    n: 9,
    id: 'the-ninth-block',
    title: 'A visually separate block enters from outside the wall entirely',
    relation: 'and-yet',
    secs: 11,
    vo: 'And there’s one more detail. GLM also has one shared expert that runs every time. It isn’t part of the 288-way competition.',
    commands: [shared.show({ x: 86, y: 28 }, 1.5), narrator.set({ pose: 'offer' })],
    lateOverlays: {
      at: 5000,
      /* `always on` is the property the frame cannot show in one still: the
       * block looks the same whether or not it was chosen. */
      overlays: [note('shared — always on', 80, 50, { tone: 'relate', rotate: 3, sticky: true })],
    },
  },
  {
    n: 10,
    id: 'two-eighty-eight-eight-plus-one',
    title: 'The arrangement recomposes into one readable count',
    relation: 'so',
    secs: 9,
    vo: 'So visually: 288 are scored. 8 are selected. +1 shared expert always runs.',
    /* The carrying frame §6 and §7 both build on, so the three figures have to
     * sit together in one still rather than arriving in sequence and leaving. */
    commands: [
      count.show({ x: 14, y: 26 }, 1, { value: 8, label: 'selected of 288' }),
      narrator.set({ pose: 'count' }),
    ],
    /* A note, not a brace: the wall fills this half of the frame, so a brace's
     * rule ran across the crowd and swallowed half its own label. */
    overlays: [note('+1 shared, never scored', 76, 44, { tone: 'relate', rotate: 3, sticky: true })],
  },
  {
    n: 11,
    id: 'no-name-plate-sticks',
    title: 'Playful name plates are pressed onto the eight and slide straight off',
    relation: 'wall',
    secs: 10,
    vo: 'And one thing I want to kill before it becomes confusing: an expert is not “the dog expert” or “the grammar expert.”',
    /* Two calls, not one. The plates have to look plausible on the eight before
     * they fail, or the frame corrects a belief the viewer was never shown
     * holding. */
    commands: [count.off(), plates.land()],
    stages: [{ at: 5200, commands: [plates.slideOff(), narrator.set({ pose: 'flat' })] }],
    clearSticky: true,
  },
  {
    n: 12,
    id: 'a-learned-block',
    title: 'One selected expert opens like a machine box: row in, transformed row out',
    relation: 'so',
    secs: 11,
    vo: 'It is just a learned neural-network block that transforms the row. The router learned which blocks tend to be useful for which hidden states.',
    /* Drawn over the wall, `a different row out` was rendered across expert
     * icons and could not be read at all. The wall has finished its job by
     * now -- this beat is about what one block *is* -- so it drops back and
     * the box takes the empty left half on its own. */
    commands: [
      plates.off(),
      hospital.ghost(0.25),
      open.show({ x: 30, y: 46 }, 1.05),
      narrator.set({ pose: 'point' }),
    ],
    lateOverlays: {
      at: 5600,
      /* Names the two objects at the two ends of the box. The voice says what
       * the box is; the note says what goes through it. */
      overlays: [note('row in → row out', 13, 60, { size: 'md', tone: 'measure', rotate: -2 })],
    },
  },
  {
    n: 13,
    id: 'mixture-of-experts',
    title: 'The name lands on the whole arrangement, never on one expert',
    relation: 'therefore',
    secs: 14,
    vo: 'That whole setup — many possible expert blocks, only a few routed ones used at a time — is why this is called a Mixture of Experts, or MoE.',
    commands: [open.off(), hospital.loud(), camera.to({ x: 50, y: 46 }, 0.8), narrator.set({ pose: 'offer' })],
    lateOverlays: {
      at: 6000,
      /* Centred over the wall as a whole. Placed on any one block it would
       * undo beat 11 in a single frame. */
      overlays: [centred('Mixture of Experts (MoE)', 50, 22, { size: 'lg', tone: 'relate', rotate: -1, sticky: true })],
    },
  },
  {
    n: 14,
    id: 'active-right-now',
    title: 'The eight and the shared block open their doors toward the row. Nothing comes out',
    relation: 'wall',
    secs: 17,
    vo: 'And notice what just happened. For the first time, we can point to some parameters in this giant model and say: these ones are active for our `it`, right now. So what do the eight actually do?',
    /* Doors open and stay empty. The transformation is §6's to spend, and
     * showing any output here would spend it early. */
    /* The desk steps down out of the way: the doors open *toward the row*, and
     * the building grows downward when they do. */
    commands: [
      hospital.openDoors(),
      shared.light(),
      desk.moveTo({ x: 64, y: 86 }, 0.58),
      row.pulse(),
      narrator.set({ pose: 'point' }),
    ],
    clearSticky: true,
    lateOverlays: {
      at: 9000,
      overlays: [centred('active — for this token, this layer', 24, 88, { size: 'md', rotate: -2 })],
    },
  },
]
