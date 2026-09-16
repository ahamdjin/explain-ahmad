import { brace, centred, GROUND_Y, note, PROMPT, REPLY, TOKENS, type Beat } from '../../../../paper'
import {
  aside,
  ground,
  line,
  loop,
  narrator,
  numbers,
  out,
  stored,
  tower,
  visitsAfter,
  type Patch,
} from './scene'

/**
 * Section 10 — And then it does it again.
 *
 * Script and board: `video-script/video-1/10-and-then-it-does-it-again.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * §9 ends with `bounced` lifted out at the top and a blank slot after `it`.
 * Beat 1 lands that card rather than introducing a new one.
 *
 * The section's whole honesty problem is beats 2-3. "It does it again" is true
 * of the *prediction* and false of the *compute*, so the wrong picture is drawn
 * first (everything falls back to floor one, marked `?`) and then taken away.
 * A correction to a picture nobody saw corrects nothing.
 */

/** The ninth marker — the one position that has anywhere to go. Beats 4-8. */
const NEW_POSITION = TOKENS

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'adds-it-to-the-end',
    title: '`bounced` settles into the sequence and the blank slot moves right',
    relation: 'want',
    secs: 16,
    vo: 'The answer is almost annoyingly simple. The model takes the token it just produced... and adds it to the end. So now the sequence is one token longer. Then it predicts again.',
    commands: [
      ground.at(GROUND_Y),
      tower.show({ x: 26, y: 48 }, 0.82, { markers: TOKENS, kept: TOKENS }),
      line.show({ x: 26, y: 93 }, 0.32),
      out.show({ x: 62, y: 22 }, 0.62, { label: REPLY[0] }),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'nod' }),
    ],
    /* The card that was lifted out in §9 is the card that lands in the line.
     * A second identical card appearing there would break the one promise
     * this section carries over about where the next token came from. */
    stages: [
      { at: 2600, commands: [out.moveTo({ x: 52, y: 90 }, 0.32)] },
      {
        at: 6400,
        commands: [out.off(), line.grow([...PROMPT, REPLY[0]]), tower.set({ markers: TOKENS + 1, kept: TOKENS + 1 })],
      },
    ],
    lateOverlays: {
      at: 7200,
      overlays: [note('9 tokens now', 26, 86, { tone: 'measure', rotate: -3 })],
    },
  },
  {
    n: 2,
    id: 'does-it-all-restart',
    title: 'Every earlier marker drops back to floor one, as if starting over',
    relation: 'and-yet',
    secs: 14,
    vo: 'But there is an important shortcut here. The model does not throw away everything it learned about the earlier positions and recompute the whole prompt from scratch for every new token.',
    /* Drawn wrong on purpose. This is the mental model the phrase "does it
     * again" plants, and it has to be on screen before it can be removed. */
    commands: [tower.set({ kept: 0, floor: 1 }), narrator.set({ pose: 'think' })],
    overlays: [note('9 × 45 layers ?', 26, 14, { size: 'md', tone: 'cost', rotate: 3 })],
  },
  {
    n: 3,
    id: 'the-old-context-is-kept',
    title: 'The markers return to their finished positions; a stored ribbon appears',
    relation: 'so',
    secs: 23,
    vo: 'It keeps reusable state from the earlier work. The exact cached state depends on the kind of layer — and GLM has a hybrid attention design — but the idea we need is simple: the old context is kept; the new position is the thing that has to travel through the stack.',
    commands: [tower.set({ kept: TOKENS + 1, floor: 0 }), narrator.set({ pose: 'confide' })],
    /* The word "cache" is only allowed inside the aside. On the main stage the
     * honest claim is state kept from earlier positions, because GLM's
     * attention is hybrid and a KV-cache caption would overstate it. */
    stages: [
      { at: 3600, commands: [stored.show({ x: 46, y: 48 }, 0.82)] },
      { at: 9000, commands: [aside.show({ x: 15, y: 18 }, 1)] },
    ],
    lateOverlays: {
      at: 5200,
      overlays: [brace('state kept · every layer', 44, 20, 14, { tone: 'relate', voice: 'hand', sticky: true })],
    },
  },
  {
    n: 4,
    id: 'enters-layer-one',
    title: 'Only the new token’s marker starts at floor one',
    relation: 'so',
    secs: 5,
    vo: 'So our new token enters layer one.',
    commands: [
      aside.off(),
      tower.set({ kept: TOKENS, alone: NEW_POSITION, floor: 1 }),
      narrator.set({ pose: 'point' }),
    ],
    clearSticky: true,
    overlays: [note('1 of 9 moving', 26, 14, { tone: 'measure', rotate: -2 })],
  },
  {
    n: 5,
    id: 'reads-the-stored-state',
    title: 'It reads from the stored ribbon and its row changes',
    relation: 'so',
    secs: 7,
    vo: 'It reads the earlier context through that stored state. Its representation changes.',
    commands: [stored.read(), tower.climbTo(2), tower.runRouter('look')],
  },
  {
    n: 6,
    id: 'picks-eight-again',
    title: 'The router mechanism from §5 runs again on the new row',
    relation: 'so',
    secs: 8,
    vo: 'On a sparse layer, the router looks at that new representation and picks eight experts.',
    /* Same mechanism, same drawing. A second router drawn differently here
     * would teach a second mechanism rather than a repetition. */
    commands: [tower.climbTo(4), tower.runRouter('pick')],
    lateOverlays: {
      at: 3400,
      overlays: [note('8 of 288', 40, 30, { tone: 'measure', rotate: 3 })],
    },
  },
  {
    n: 7,
    id: 'again-and-again',
    title: 'The same three steps repeat upward without new explanation',
    relation: 'so',
    secs: 9,
    vo: 'Next sparse layer... new representation... new routing decision. Again. And again.',
    commands: [tower.climbTo(9), tower.runRouter('work')],
    stages: [
      { at: 2400, commands: [tower.climbTo(16), tower.runRouter('look')] },
      { at: 4600, commands: [tower.climbTo(24), tower.runRouter('pick')] },
      { at: 6600, commands: [tower.climbTo(33), tower.runRouter('work')] },
    ],
  },
  {
    n: 8,
    id: 'forty-two-and-three-thirty-six',
    title: 'Two counters assemble beside the climbing marker',
    relation: 'therefore',
    secs: 12,
    vo: 'Across all 42 sparse layers, that new token gets another: 42 routing decisions and 336 routed expert visits.',
    commands: [tower.climbTo(45), tower.settle(), narrator.set({ pose: 'count' })],
    /* The arithmetic, not the sentence: the voice gives both totals, so the
     * frame gives the multiplication that produces the second one. */
    lateOverlays: {
      at: 4800,
      overlays: [centred('42 × 8', 40, 18, { size: 'lg', tone: 'measure', rotate: -2, sticky: true })],
    },
  },
  {
    n: 9,
    id: 'and-repeats',
    title: '§9’s scoring runs again at the top and another token is appended',
    relation: 'so',
    secs: 14,
    vo: 'Then the model reaches the top... scores the vocabulary again... chooses another token... adds it to the end... and repeats.',
    commands: [out.show({ x: 58, y: 18 }, 0.56, { label: REPLY[1] }), narrator.set({ pose: 'nod' })],
    clearSticky: true,
    stages: [
      { at: 5200, commands: [out.moveTo({ x: 56, y: 90 }, 0.32)] },
      {
        at: 8600,
        commands: [
          out.off(),
          line.grow([...PROMPT, REPLY[0], REPLY[1]]),
          tower.set({ markers: TOKENS + 2, kept: TOKENS + 1, alone: TOKENS + 1, floor: 1 }),
        ],
      },
      { at: 11000, commands: [loop.show({ x: 74, y: 46 }, 0.86), loop.start()] },
    ],
  },
  {
    n: 10,
    id: 'one-new-token-at-a-time',
    title: 'The loop accelerates; only the newest marker ever travels',
    relation: 'so',
    secs: 8,
    vo: 'That is autoregressive generation. One new token at a time.',
    commands: [loop.faster(0.5), loop.say(REPLY.slice(0, 3)), loop.count(visitsAfter(3))],
    stages: [{ at: 3200, commands: [tower.climbTo(28)] }],
    /* The voice says "one at a time"; the frame says what each one costs. */
    overlays: [note('+336 every time round', 70, 12, { tone: 'measure', rotate: -2 })],
  },
  {
    n: 11,
    id: 'piece-by-piece',
    title: 'The growing reply reads the way an answer appears on a screen',
    relation: 'so',
    secs: 9,
    vo: 'And this is what you are watching when an AI answer appears piece by piece on your screen.',
    commands: [
      loop.faster(0.85),
      loop.say(REPLY),
      loop.count(visitsAfter(REPLY.length)),
      tower.climbTo(41),
      narrator.set({ pose: 'lean' }),
    ],
  },
  {
    n: 12,
    id: 'which-eighteen-billion',
    title: 'The loop freezes and §1’s two numbers return over the tower',
    relation: 'wall',
    secs: 17,
    vo: 'Now think back to our opening question. We asked: if only about 18 billion parameters are active... which 18 billion? We finally have enough of the machine in our heads to answer that properly.',
    /* Not a new page. The same tower the viewer has just watched run, with the
     * numbers from fifteen seconds into the video settling back onto it. */
    commands: [
      loop.halt(),
      stored.off(),
      tower.settle(),
      tower.set({ markers: 0, kept: 0, alone: undefined, floor: 0 }),
      narrator.set({ pose: 'point' }),
    ],
    stages: [
      { at: 4200, commands: [loop.off(), line.off()] },
      { at: 7000, commands: [numbers.show({ x: 62, y: 34 }, 1)] },
    ],
  },
]
