import { brace, centred, FOLLOWED, GROUND_Y, note, TOKENS, type Beat } from '../../../../paper'
import { TOTAL, count, ground, line, narrator, tower, type Patch } from './scene'

/**
 * Section 08 — That was one token. Here is the whole prompt.
 *
 * Script and board: `video-script/video-1/08-that-was-one-token.md`.
 * The VO below is that script split across visual beats. Do not paraphrase it
 * to fit components; change the components or the beat count instead.
 *
 * §7 ends with the tower up and eight markers gathered at its base. Beat 1
 * resolves those markers into the real prompt rather than cutting to a new
 * object.
 *
 * **No camera moves.** The section is about how many things happen at once,
 * and that only reads from a distance.
 *
 * The arithmetic is 8 × 336 = 2,688, and it is a function of §2's split — the
 * pieces are on screen and countable while the total lands beside them.
 */

/** Where the prompt sits when it is the base of the tower. */
/*
 * Where the prompt waits when it is not the subject.
 *
 * It was at y 87 -- below the ground line, at 0.44 scale, reading as a footer
 * rather than as the object the whole section is about. The prompt is on
 * screen in every beat here; it gets a home on the paper.
 */
const BASE = { x: 50, y: 80 }
/** And where it sits when it *is* the floor we are looking at. */
const FLOOR = { x: 66, y: 54 }

export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'never-alone',
    title: 'The base markers resolve into the eight real prompt tokens',
    relation: 'want',
    secs: 17,
    vo: 'We followed `it` because following eight things at once would be a terrible explanation. But `it` was never alone. Our prompt became eight tokens: The | dog | dropped | the | ball | , | and | it',
    /*
     * "`it` was never alone. Our prompt became eight tokens" is about the
     * sentence, so the sentence is what the frame is. §7 hands us the stack
     * and we keep it -- cutting it would make this a new scene -- but it
     * drops back and the eight markers on floor 1 wait for beat 3, which is
     * the beat that earns them.
     */
    commands: [
      ground.at(GROUND_Y),
      tower.show({ x: 50, y: 41 }, 0.86, { floor: 0 }),
      tower.ghost(),
      line.show({ x: 50, y: 50 }, 0.62, { focus: FOLLOWED }),
      narrator.show({ x: 91, y: 70 }, 1, { pose: 'confide', flip: true }),
    ],
    lateOverlays: {
      /* The id, which the voice never says here, is what marks *which* of the
       * eight we have been carrying since §2. Under the `it` chip at the right
       * end of the sentence, not a thousand pixels away at the left margin. */
      at: 9000,
      overlays: [note('tracked: `it` = 432', 64, 58, { tone: 'word', rotate: -3 })],
    },
  },
  {
    n: 2,
    id: 'one-at-a-time',
    title: 'One token climbs alone while the others wait, with a `?` on it',
    relation: 'and-yet',
    secs: 10,
    vo: 'Not one token all the way to the top... then the next one... then the next one.',
    /* Drawn wrong on purpose. This is the picture most viewers already have,
     * and beat 3 cannot correct something that was never shown. */
    commands: [
      tower.loud(),
      tower.set({ markers: TOKENS, floor: 1 }),
      line.moveTo(BASE, 0.44),
      tower.alone(FOLLOWED),
      narrator.set({ pose: 'wonder' }),
    ],
    stages: [
      { at: 1200, commands: [tower.climbTo(16)] },
      { at: 3600, commands: [tower.climbTo(33)] },
      { at: 6000, commands: [tower.climbTo(45)] },
    ],
    overlays: [centred('?', 50, 10, { size: 'lg', tone: 'cost' })],
  },
  {
    n: 3,
    id: 'all-eight-together',
    title: 'The marker snaps back down and all eight enter the first floor',
    relation: 'so',
    secs: 14,
    vo: 'And during the first pass through the prompt, all eight positions are processed through the stack. Layer by layer, the model works on the prompt positions together.',
    commands: [tower.alone(-1), tower.climbTo(1), narrator.set({ pose: 'nod' })],
    stages: [
      { at: 5000, commands: [tower.climbTo(2)] },
      { at: 8000, commands: [tower.climbTo(3)] },
    ],
    lateOverlays: {
      at: 6000,
      overlays: [note('8 on floor 1', 12, 30, { tone: 'measure', rotate: -2 })],
    },
  },
  {
    n: 4,
    id: 'a-row-each',
    title: 'Eight rows unfold side by side on one floor',
    relation: 'so',
    secs: 5,
    vo: 'Each token has its own row.',
    /* The tower steps aside rather than off. Act 2 is about what happens on
     * one floor, and the floor has to be legible — but losing the building
     * would lose the reason these rows are only partway up it. */
    commands: [
      tower.moveTo({ x: 18, y: 44 }, 0.7),
      line.moveTo(FLOOR, 0.46),
      line.set({ rows: true }),
    ],
    overlays: [brace('8 rows', 54, 61, 24, { tone: 'measure' })],
  },
  {
    n: 5,
    id: 'only-backward',
    title: 'Backward links draw from every position and none point forward',
    relation: 'so',
    secs: 18,
    vo: 'Each row gets context from the positions it is allowed to see. Because this is generating text left to right, there is one important rule: a token can use the tokens before it, not future tokens that have not happened yet.',
    commands: [line.causal(true), narrator.set({ pose: 'point' })],
  },
  {
    n: 6,
    id: 'the-causal-triangle',
    title: 'The links resolve into a triangle and three positions are read off it',
    relation: 'so',
    secs: 14,
    vo: 'So `The` has almost nothing behind it. `ball` has several earlier tokens available. And our `it`, sitting at the end of the prompt, can look back across all seven earlier positions.',
    commands: [],
    lateOverlays: {
      /* The count per position, which the voice gives only for the two ends.
       * The zero is the half that makes the triangle a triangle. */
      at: 6000,
      overlays: [note('`The`: 0 back\n`it`: 7 back', 36, 30, { size: 'md', tone: 'measure', rotate: -2 })],
    },
  },
  {
    n: 7,
    id: 'and-upward-again',
    title: 'The wiring clears and redraws from the newly changed rows, one floor up',
    relation: 'so',
    secs: 7,
    vo: 'Then each position keeps moving upward through the layers.',
    commands: [line.causal(false), line.set({ changed: true }), tower.climbTo(4)],
    stages: [{ at: 2600, commands: [line.causal(true)] }],
  },
  {
    n: 8,
    id: 'each-routes-for-itself',
    title: 'Router flashes fire independently under each marker on the sparse floors',
    relation: 'so',
    secs: 9,
    vo: 'And on the 42 sparse layers, each token gets its own routing decision.',
    /* Back to the whole building: eight routers firing at once is a fact about
     * the stack, not about one floor we happen to be reading. */
    commands: [
      line.causal(false),
      line.moveTo(BASE, 0.44),
      line.set({ rows: false }),
      tower.moveTo({ x: 50, y: 41 }, 0.86),
      tower.flash('pick'),
    ],
    stages: [
      { at: 2400, commands: [tower.climbTo(9)] },
      { at: 5000, commands: [tower.climbTo(17)] },
    ],
    overlays: [note('8 routers · 1 floor', 10, 36, { tone: 'measure', rotate: -2 })],
  },
  {
    n: 9,
    id: 'the-same-count-each',
    title: '`336` above tracked `it` is copied above the other seven',
    relation: 'so',
    secs: 11,
    vo: 'So the 336 routed expert visits we counted for `it`... happen for the other prompt tokens too.',
    commands: [tower.flash(undefined), tower.each('336'), tower.climbTo(26)],
    overlays: [note('336 × 8 positions', 74, 22, { tone: 'measure', rotate: 3, sticky: true })],
  },
  {
    n: 10,
    id: 'how-many-is-that',
    title: 'The arithmetic holds unfinished on screen',
    relation: 'and-yet',
    secs: 9,
    vo: 'Eight tokens. 336 routed expert visits each. That gives us:',
    /* The figure has to be visibly missing while the question is asked. A
     * counter already reading 2,688 turns the question into narration. */
    commands: [count.ask('routed expert visits — one prompt pass'), narrator.set({ pose: 'count' })],
    lateOverlays: {
      at: 3000,
      overlays: [note('8 × 336 = ?', 74, 68, { size: 'lg', tone: 'measure', rotate: -2, sticky: true })],
    },
  },
  {
    n: 11,
    id: 'two-thousand-six-eighty-eight',
    title: 'The total assembles as the eight arrive at the top together',
    relation: 'therefore',
    secs: 11,
    vo: '2,688 routed expert visits for this simplified count across the prompt’s first pass.',
    commands: [count.run(TOTAL, 'routed expert visits — one prompt pass'), tower.climbTo(45)],
    clearSticky: true,
  },
  {
    n: 12,
    id: 'prefill-and-the-stack',
    title: 'The completed pass is labelled and the tower is named secondarily',
    relation: 'so',
    secs: 16,
    vo: 'That first processing of the prompt is usually called prefill. And this whole stacked architecture — representations moving through layers while positions exchange allowed context — is the transformer stack we have been travelling through.',
    /* The name arrives last, and on the object, after eleven beats of the
     * behaviour. A plaque on a shape the viewer already understands is a
     * label; the same plaque in beat 1 would have been the lesson. */
    commands: [count.hold(), tower.each(''), tower.name('transformer stack'), narrator.set({ pose: 'point' })],
    overlays: [note('prefill:\n45 layers × 8 positions', 8, 26, { size: 'md', tone: 'relate', rotate: -2 })],
  },
  {
    n: 13,
    id: 'still-no-answer',
    title: 'The eight finished rows fan out at the top; the last stays bright',
    relation: 'wall',
    secs: 15,
    vo: 'But none of this has produced an answer yet. We have eight finished representations at the top. So how does the model turn those numbers into the next token?',
    /* 2,688 finished teaching two beats ago and was still the loudest ink on
     * the frame that hands §9 the eight finished rows. It steps down to a
     * standing total so the rows at the top win the eye. */
    commands: [
      tower.name(''),
      tower.moveTo({ x: 24, y: 58 }, 0.56),
      count.moveTo({ x: 74, y: 54 }, 0.6),
      line.moveTo({ x: 52, y: 26 }, 0.56),
      line.set({ rows: true, changed: true, focus: FOLLOWED }),
      narrator.set({ pose: 'wonder' }),
    ],
    lateOverlays: {
      /* The sting the voice leaves implicit: 2,688 visits bought zero output. */
      at: 6000,
      overlays: [centred('tokens produced so far: 0', 62, 76, { size: 'md', tone: 'cost', rotate: -1 })],
    },
  },
]
