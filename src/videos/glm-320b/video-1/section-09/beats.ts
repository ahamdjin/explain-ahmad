import { GROUND_Y, note, type Beat } from '../../../../paper'
import { LAST, camera, ground, last, narrator, out, rows, tower, vocab, type Patch } from './scene'

/**
 * Section 09 — Where the answer comes out.
 *
 * Board: `video-script/video-1/09-where-the-answer-comes-out.md`. `npm run check:board`.
 *
 * **Two camera moves, one at each end**: up to meet the markers, then all the
 * way out. Beat 10's pull-back is the emotional beat of the section and it is
 * the frame, not the line.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'a-row-for-every-token',
    title: 'We rise to the top and arrive alongside the waiting markers',
    relation: 'want',
    secs: 15,
    vo: 'So every token in your prompt pays its own three hundred and thirty-six, all at once. At the top of the stack we’ve got a row for every one of them.',
    commands: [
      ground.at(GROUND_Y),
      tower.show({ x: 50, y: 48 }, 1, { floor: 45, markers: 9 }),
      /* Push in on the top floor. We go to them; they have stopped. */
      camera.to({ x: 50, y: 22 }, 1.5),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'nine-finished-rows',
    title: 'Each marker unfolds into its finished row, nine in a line',
    relation: 'so',
    secs: 7,
    vo: 'But only one of them matters right now. The last one.',
    commands: [tower.off(), camera.home(), rows.show({ x: 46, y: 48 }, 0.52)],
  },
  {
    n: 3,
    id: 'next-attaches-to-the-end',
    title: 'The first eight dim; only the last stays lit',
    relation: 'so',
    secs: 9,
    vo: 'Because the job is to work out what comes next — and next attaches to the end.',
    commands: [rows.only(LAST)],
    overlays: [note('next attaches\nto the end', 74, 26, { tone: 'word', rotate: 3 })],
  },
  {
    n: 4,
    id: 'that-final-row',
    title: 'The last row lifts clear of the others',
    relation: 'so',
    secs: 9,
    vo: 'So that final row gets compared against the whole list. All hundred and fifty-four thousand tokens.',
    commands: [last.show({ x: 26, y: 30 }, 0.38), rows.moveTo({ x: 42, y: 62 }, 0.44)],
  },
  {
    n: 5,
    id: 'the-list-returns',
    title: '§2’s list rises again beside it',
    relation: 'so',
    secs: 5,
    vo: 'Every one of them gets a score.',
    /* The same object as §2 beat 8, drawn identically. */
    commands: [vocab.show({ x: 76, y: 48 }, 1.5)],
    lateOverlays: {
      at: 2400,
      overlays: [note('the same list from earlier —\n154,880 entries', 76, 86, { tone: 'measure', rotate: 2, sticky: true })],
    },
  },
  {
    n: 6,
    id: 'every-one-gets-a-score',
    title: 'A value spreads down the entire list',
    relation: 'so',
    secs: 6,
    vo: 'How likely are you to be the next thing.',
    commands: [vocab.score()],
  },
  {
    n: 7,
    id: 'most-are-hopeless',
    title: 'The list reorders; a handful rise to the top',
    relation: 'so',
    secs: 6,
    vo: 'Most are hopeless. A few are plausible.',
    commands: [vocab.rank()],
    clearSticky: true,
  },
  {
    n: 8,
    id: 'one-gets-picked',
    title: 'One entry is lifted out of the list',
    relation: 'therefore',
    secs: 4,
    vo: 'And one gets picked.',
    commands: [vocab.pick()],
  },
  {
    n: 9,
    id: 'thats-your-next-word',
    title: 'It becomes a word card and drops clear of the tower',
    relation: 'so',
    secs: 6,
    vo: 'That’s your next word. That’s the output.',
    commands: [out.show({ x: 30, y: 72 }, 0.8), narrator.set({ pose: 'nod' })],
  },
  {
    n: 10,
    id: 'one-word',
    title: 'We fall away until the whole tower and one small card share the frame',
    relation: 'and-yet',
    secs: 14,
    vo: 'All of that. Forty-five floors, three hundred and thirty-six experts per token, every token in your prompt. And what comes out the other end is one word.',
    /*
     * The carrying frame. The entire machine on one side, one small card on the
     * other, and no label -- scale contrast doing the teaching. The line is
     * said flatly and then left alone.
     */
    commands: [
      rows.off(),
      last.off(),
      vocab.off(),
      /*
       * The scale contrast is the whole frame, and it was backwards: at 0.72
       * against a 0.62 card the *word* was wider than the machine. The machine
       * has to dominate, or the disproportion the section is built on reads in
       * the wrong direction.
       */
      tower.show({ x: 30, y: 50 }, 1.02, { floor: 0, markers: 0 }),
      out.moveTo({ x: 74, y: 52 }, 0.32),
      narrator.off(),
    ],
    stages: [{ at: 2600, commands: [camera.to({ x: 50, y: 50 }, 0.94)] }],
  },
]
