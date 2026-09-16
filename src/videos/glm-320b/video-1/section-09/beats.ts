import { centred, GROUND_Y, note, type Beat } from '../../../../paper'
import { ground, last, LAST, narrator, out, rows, slot, strip, tower, vocab, type Patch } from './scene'

/**
 * Section 09 — Where the answer comes out.
 *
 * Script and board: `video-script/video-1/09-where-the-answer-comes-out.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * §8 leaves eight finished rows at the top of the tower with the last position
 * already bright. Beat 1 holds that frame rather than rebuilding it.
 */

/** The tower stays small until beat 10, whose whole event is its size. */
const TOWER_ASIDE = { x: 12, y: 54 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'eight-in-eight-out',
    title: 'All eight final rows hold, one per input position',
    relation: 'want',
    secs: 12,
    vo: 'At the top of the stack, we now have a finished row for every position in the prompt. Eight tokens in. Eight final representations out.',
    commands: [
      ground.at(GROUND_Y),
      tower.show(TOWER_ASIDE, 0.46),
      rows.show({ x: 48, y: 26 }, 0.78),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'point' }),
    ],
  },
  {
    n: 2,
    id: 'the-last-position',
    title: 'The first seven dim and the last-position row comes forward',
    relation: 'so',
    secs: 10,
    vo: 'But to predict what comes next, there is one position we care about most: the last one. Our `it`.',
    commands: [rows.only(LAST), last.show({ x: 42, y: 52 }, 0.72)],
  },
  {
    n: 3,
    id: 'next-attaches-here',
    title: 'The sentence returns beneath with an empty slot right after `it`',
    relation: 'so',
    secs: 5,
    vo: 'Because the next token has to come after `it`.',
    /* The empty card lands before anything can fill it. A slot the viewer has
     * already seen is a question; a word that simply appears is an assertion. */
    commands: [strip.show({ x: 40, y: 80 }, 0.62), strip.follow(LAST), slot.show({ x: 76, y: 80 }, 0.42)],
  },
  {
    n: 4,
    id: 'a-score-for-everything',
    title: 'The final row enters a scoring strip',
    relation: 'so',
    secs: 9,
    vo: 'So the model takes that final row... and turns it into a score for every token in the vocabulary.',
    commands: [last.moveTo({ x: 40, y: 50 }, 0.72), narrator.set({ pose: 'nod' })],
  },
  {
    n: 5,
    id: 'all-of-them-scored',
    title: '§2’s list returns and score marks populate all of it',
    relation: 'so',
    secs: 13,
    vo: 'All 154,880 possible token entries get a score. You can think of each score as: how plausible would this token be next, given everything we have processed so far?',
    commands: [vocab.show({ x: 78, y: 46 }, 1.15), vocab.score()],
    lateOverlays: {
      at: 4200,
      overlays: [note('154,880 scores', 62, 14, { tone: 'measure', rotate: 3, sticky: true })],
    },
  },
  {
    n: 6,
    id: 'a-few-are-plausible',
    title: 'The list reorders; most entries recede and a few stay plausible',
    relation: 'so',
    secs: 8,
    vo: 'Most of them will be terrible choices. Some will be plausible. A few may be very plausible.',
    commands: [vocab.rank(), narrator.set({ pose: 'think' })],
  },
  {
    n: 7,
    id: 'not-that-rabbit-hole',
    title: 'A small aside sits at the frame edge and is deliberately not opened',
    relation: 'and-yet',
    secs: 16,
    vo: 'Then the decoding settings decide how that distribution becomes an actual choice. Maybe the highest-scoring token is taken. Maybe sampling adds some randomness. We do not need that rabbit hole for this video.',
    commands: [],
    /* Named and left closed on purpose. Refusing a detour in as many words is
     * cheaper than a viewer wondering all section whether we skipped it. */
    overlays: [note('greedy · sampling · temperature', 4, 12, { size: 'sm', rotate: -3 })],
  },
  {
    n: 8,
    id: 'one-token-selected',
    title: 'One entry lifts out of the list',
    relation: 'therefore',
    secs: 8,
    vo: 'The important part is: one next token gets selected. Suppose the model chooses something corresponding to: “bounced”',
    commands: [vocab.pick(), out.show({ x: 78, y: 70 }, 0.7), narrator.set({ pose: 'point' })],
    clearSticky: true,
  },
  {
    n: 9,
    id: 'it-bounced',
    title: 'That same lifted actor travels down and fills the empty slot',
    relation: 'so',
    secs: 9,
    vo: 'So our prompt: “The dog dropped the ball, and it…” becomes: “The dog dropped the ball, and it bounced…”',
    /* The card that was lifted out of the list is the card that lands in the
     * slot. A second, identical card appearing in the sentence would break the
     * one promise this section makes about where the answer came from. */
    commands: [slot.off(), out.moveTo({ x: 76, y: 80 }, 0.42)],
  },
  {
    n: 10,
    id: 'all-that-for-one-token',
    title: 'The whole tower and the one small token hold in the same frame',
    relation: 'and-yet',
    secs: 10,
    vo: 'And after this entire journey — tokenizing, embeddings, context, routing, experts, 45 layers — what came out? One token. Just one.',
    commands: [
      vocab.off(),
      last.off(),
      rows.off(),
      strip.off(),
      tower.moveTo({ x: 30, y: 50 }, 1),
      out.moveTo({ x: 74, y: 50 }, 0.9),
      narrator.set({ pose: 'wonder' }),
    ],
    lateOverlays: {
      at: 5000,
      overlays: [centred('45 layers · 336 expert visits · one token', 60, 62, { size: 'md', tone: 'cost', rotate: -2 })],
    },
  },
  {
    n: 11,
    id: 'how-do-we-get-the-second',
    title: 'A second empty slot opens after `bounced`',
    relation: 'wall',
    secs: 10,
    vo: 'Which creates a pretty obvious problem. ChatGPT-style models do not answer you with one token. So how do we get the second one?',
    /* The sentence comes back low and the tower steps aside for it: the blank
     * has to be readable as the *next* position, not as tower furniture. */
    commands: [
      tower.moveTo({ x: 18, y: 48 }, 0.78),
      strip.show({ x: 44, y: 80 }, 0.56),
      strip.follow(LAST),
      out.moveTo({ x: 78, y: 80 }, 0.38),
      slot.show({ x: 88, y: 80 }, 0.38),
      narrator.off(),
    ],
  },
]
