import { GROUND_Y, note, TOKENS, type Beat } from '../../../../paper'
import { LAST, camera, ground, last, narrator, out, rows, tower, vocab, type Patch } from './scene'

/**
 * Section 09 — Where the answer comes out.
 *
 * Board: `video-script/video-1/09-where-the-answer-comes-out.md`. `npm run check:board`.
 *
 * **Two camera moves, one at each end**: up to meet the markers, then all the
 * way out. Beats 10-12 are the emotional beat of the section and they are the
 * frame, not the line -- the whole machine on one side, one small card on the
 * other. The pull-back, the recap and the last four words each get their own
 * beat, because a single beat carrying all three turns a held frame into a
 * paragraph read over a picture.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'a-row-for-every-token',
    title: 'We rise to the top and arrive alongside the waiting markers',
    relation: 'want',
    secs: 15,
    vo: 'So every token in your prompt pays its own three hundred and thirty-six, all at once. At the top of the stack there’s a row for every one of them.',
    commands: [
      ground.at(GROUND_Y),
      tower.show({ x: 50, y: 48 }, 1, { floor: 45, markers: TOKENS }),
      /* Push in on the top floor. We go to them; they have stopped. */
      camera.to({ x: 50, y: 22 }, 1.5),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point', flip: true }),
    ],
  },
  {
    n: 2,
    id: 'eight-finished-rows',
    title: 'Each marker unfolds into its finished row, eight in a line',
    relation: 'so',
    secs: 6,
    /* Eight rows on one frame, before any of them is privileged. Beat 3's
     * dimming is only legible if the viewer has counted them first. */
    vo: 'Eight rows. One per token, all of them finished.',
    commands: [tower.off(), camera.home(), rows.show({ x: 46, y: 48 }, 0.52)],
  },
  {
    n: 3,
    id: 'only-one-matters',
    title: 'The first seven dim; only the last stays lit',
    /* "But only one of them matters right now" -- the turn that makes the
     * whole section possible, and it was moving like a consequence. */
    relation: 'and-yet',
    secs: 7,
    vo: 'But only one of them matters right now. The last one.',
    commands: [rows.only(LAST)],
  },
  {
    n: 4,
    id: 'next-attaches-to-the-end',
    title: 'The last row lifts clear of the others',
    relation: 'so',
    secs: 9,
    /* The reason, before the mechanism. "Next attaches to the end" is why the
     * last position is the one that is read, and it is one clause. */
    vo: 'Because the job is to work out what comes next — and next attaches to the end.',
    commands: [last.show({ x: 26, y: 30 }, 0.38), rows.moveTo({ x: 42, y: 62 }, 0.44)],
    overlays: [note('next attaches\nto the end', 74, 26, { tone: 'word', rotate: 3 })],
  },
  {
    n: 5,
    id: 'the-list-returns',
    title: '§2’s list rises again beside it',
    relation: 'so',
    secs: 11,
    /*
     * The same object as §2 beat 8, drawn identically -- this is a callback,
     * and a redesigned list would read as a second, different list. 154,880 is
     * measured from `config.json`; the video says the whole figure here
     * because it is the last time it appears.
     */
    vo: 'So that final row gets compared against the whole list. All hundred and fifty-four thousand, eight hundred and eighty of them.',
    /*
     * 72/48 at 1.15, which is exactly where and how big §2 draws it. Two
     * reasons. It is **the same object returning** -- S-10 works on sameness,
     * and a list that comes back a different size reads as a different list.
     * And at 76/48 scale 1.5 it spanned 60-92% and stood on top of the
     * narrator, who has been at 91/70 since beat 1.
     */
    commands: [vocab.show({ x: 72, y: 48 }, 1.15)],
    lateOverlays: {
      at: 2400,
      overlays: [note('the same list from earlier —\n154,880 entries', 28, 18, { size: 'md', tone: 'measure', rotate: 2, sticky: true })],
    },
  },
  {
    n: 6,
    id: 'every-one-gets-a-score',
    title: 'A value spreads down the entire list, every entry getting one',
    relation: 'so',
    secs: 9,
    /* Every entry, not a shortlist. **Never call it a search** -- it is an
     * output projection producing one score per vocabulary entry. */
    vo: 'Every single one gets a score. How well does this word fit — right here, right now?',
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
    /* Which one depends on sampling. That is an aside, not a beat. */
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
    /* Below the sentence, not through it. The sentence sits at y 56-68 and the
     * card was landing at 65-79, so the word this whole section produces was
     * printed across the words it came from. */
    commands: [out.show({ x: 30, y: 80 }, 0.8), narrator.set({ pose: 'nod' })],
  },
  {
    n: 10,
    id: 'all-of-that',
    title: 'We fall away until the whole tower and one small card share the frame',
    relation: 'and-yet',
    secs: 6,
    /*
     * Two words, and the pull-back. The line is short on purpose: the frame is
     * doing the work, and a sentence over it gives the viewer something to
     * listen to instead of something to look at.
     */
    vo: 'All of that.',
    commands: [
      rows.off(),
      last.off(),
      vocab.off(),
      /*
       * The scale contrast is the whole frame, and it was backwards once: at
       * 0.72 against a 0.62 card the *word* was wider than the machine. The
       * machine has to dominate, or the disproportion the section is built on
       * reads in the wrong direction.
       */
      tower.show({ x: 30, y: 50 }, 1.02, { floor: 0, markers: 0 }),
      out.moveTo({ x: 74, y: 52 }, 0.32),
      narrator.off(),
    ],
    stages: [{ at: 2000, commands: [camera.to({ x: 50, y: 50 }, 0.94)] }],
  },
  {
    n: 11,
    id: 'forty-five-floors',
    title: 'The tower fills the frame; the card stays the size it was',
    relation: 'and-yet',
    secs: 12,
    /*
     * The recap, spent against the picture rather than instead of it. Every
     * figure here was built on screen already -- 45 in §7 beat 3, 336 in §7
     * beat 12, the whole prompt in §8 -- so this is a withdrawal, not a claim.
     * **The card must not grow while it is said.**
     */
    vo: 'Forty-five floors. Three hundred and thirty-six expert visits per token. Every token in your prompt, all the way up.',
    commands: [narrator.show({ x: 91, y: 70 }, 1, { pose: 'think', flip: true })],
  },
  {
    n: 12,
    id: 'one-word',
    title: 'Nothing moves; the card sits there, alone against it',
    relation: 'and-yet',
    secs: 8,
    /* Deposit four. Seven words, and then §10 opens on the same frame. */
    vo: 'And what comes out the other end is one word.',
    commands: [],
    lateOverlays: {
      at: 2600,
      overlays: [note('one word.', 74, 66, { size: 'md', tone: 'cost', rotate: -3 })],
    },
  },
]
