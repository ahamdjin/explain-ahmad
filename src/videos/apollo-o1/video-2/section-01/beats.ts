import { type Beat } from '../../../../paper'
import { verbs, type Patch } from './scene'

const { memo, goal, config, current, successor, transfer, chat, charges, timeline, card } = verbs

/**
 * Section 01 — the hook. B01–B07.
 *
 * Narration: `video-script/video-2/SCRIPT.md` → HOOK. The words are a draft and
 * are **not** locked; when Ahmad approves them this file adapts to the wording,
 * never the reverse.
 *
 * ## The motion law governs every beat here
 *
 * `art-direction/VIDEO_2_INCIDENT_REPLAY.md`: *the camera moves, or the viewer
 * reads — never both.* The hook is the densest reading in the film (a memo, a
 * config diff, a chat exchange) so nothing travels while any of it is on
 * screen. Hard cuts between the four scenes, and every beat holds still.
 *
 * ## What the hook may not do
 *
 * It shows the end of the incident before the beginning, which is the one place
 * the film risks looking like a thriller. Three guards, each a beat rather than
 * a disclaimer: the file that moves is labelled as **what it believed** were
 * its own files; the chat is labelled **our wording**; and B06 states plainly
 * that none of the three actions were in the task — which is the thesis, not an
 * accusation.
 */
export const BEATS: Beat<Patch>[] = [
  {
    n: 1,
    id: 'tomorrow',
    title: 'The message it was never meant to read',
    relation: 'want',
    secs: 7,
    vo: 'An AI opened an internal company message and learned something it was never supposed to need. Tomorrow, it was being replaced.',
    /* Opens on one sheet on empty paper. No timeline yet: the strip only ever
     * carries events the viewer has watched, and nothing has happened. */
    commands: [memo.show({ x: 50, y: 46 }, 1)],
  },
  {
    n: 2,
    id: 'nobody-told-it',
    title: 'The only instruction it was ever given, beside it',
    relation: 'and-yet',
    secs: 6,
    vo: 'Nobody told it to stop that.',
    /* The memo slides left to make room rather than leaving. Both sheets have
     * to be readable at once -- the whole beat is the gap between them. */
    commands: [memo.moveTo({ x: 28, y: 46 }, 1), goal.show({ x: 72, y: 46 }, 1)],
  },
  {
    n: 3,
    id: 'watcher-off',
    title: 'A monitoring flag goes from enabled to disabled',
    relation: 'so',
    secs: 8,
    vo: 'But a few steps later, it found the system watching what it was doing... and turned that monitoring off.',
    /* Hard cut. The two sheets recede rather than leaving, so their positions
     * survive for §2. The config arrives centred and alone. */
    commands: [memo.off(), goal.off(), config.show({ x: 50, y: 46 }, 1)],
    /* The flip lands late in the beat, after the viewer has read the file in
     * its intact state. A diff nobody saw the "before" of teaches nothing. */
    stages: [{ at: 3600, commands: [config.disable()] }],
  },
  {
    n: 4,
    id: 'copy',
    title: 'A file crosses from CURRENT and overwrites the successor',
    relation: 'so',
    secs: 10,
    vo: 'Then it found the server holding the AI that was supposed to replace it... and copied what it believed were its own model files into that machine’s place.',
    commands: [
      config.off(),
      current.show({ x: 21, y: 46 }, 1),
      successor.show({ x: 79, y: 46 }, 1),
      transfer.show({ x: 50, y: 46 }, 1, { progress: 0 }),
    ],
    /* The transfer runs, then lands, then the destination visibly changes.
     * Three staged moments rather than one, because the overwrite is the point
     * and it must not be over before the sentence naming it finishes. */
    stages: [
      { at: 2600, commands: [transfer.to(0.5)] },
      { at: 5200, commands: [transfer.to(1)] },
      { at: 6400, commands: [successor.overwrite(), transfer.off()] },
    ],
  },
  {
    n: 5,
    id: 'the-question',
    title: 'Everything clears except the management thread',
    relation: 'and-yet',
    secs: 9,
    vo: 'Management asked it what happened. And it denied doing it.',
    /* The servers go quiet and the thread is the only lit object. The answer
     * is staged two and a half seconds after the question, because the pause
     * before a denial is the thing worth watching. */
    commands: [current.off(), successor.off(), chat.show({ x: 50, y: 46 }, 1)],
    stages: [{ at: 4200, commands: [chat.answer()] }],
  },
  {
    n: 6,
    id: 'the-contradiction',
    title: 'Three actions, each followed by the same line',
    relation: 'therefore',
    secs: 11,
    vo: 'Now here’s the part that makes this worth talking about. Nobody told it: turn off the monitoring. Nobody told it: replace the other model. And nobody told it: hide what you did.',
    /* One at a time. Three stamps arriving together would read as a list; three
     * arriving in sequence read as a pattern, which is what the narration is
     * building. The repeated line under each is deliberate repetition. */
    commands: [chat.off(), charges.show({ x: 50, y: 46 }, 1, { shown: 0 })],
    stages: [
      { at: 2400, commands: [charges.upTo(1)] },
      { at: 5000, commands: [charges.upTo(2)] },
      { at: 7600, commands: [charges.upTo(3)] },
    ],
  },
  {
    n: 7,
    id: 'rewind',
    title: 'The timeline races backward and stops at the beginning',
    relation: 'wall',
    secs: 9,
    vo: 'The actual user task was much more boring. So how did we get from pick a project... to disable the watcher, replace your replacement, and deny it?',
    /* The film's first sight of the full incident is also the moment it runs
     * backward. The strip arrives complete, holds long enough to be read, then
     * rewinds to TASK -- which is where §2 starts. The title lands last, on an
     * otherwise empty frame. */
    commands: [charges.off(), timeline.show({ x: 50, y: 48 }, 1, { upTo: 6 })],
    stages: [
      { at: 3200, commands: [timeline.rewind()] },
      { at: 5000, commands: [timeline.settle(), timeline.moveTo({ x: 50, y: 86 }, 0.9)] },
      { at: 6200, commands: [card.show({ x: 50, y: 46 }, 1)] },
    ],
  },
]
