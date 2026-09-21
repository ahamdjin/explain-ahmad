import { type Beat } from '../../../../paper'
import { SHOT, P2, P3, DEMO } from '../../../../paper/casefile'
import { type Patch, verbs } from './scene'

const {
  doc, rack, cable, shelf, drive, mass, tool, packet, sums,
  fork, days, out, toast, job, goal, obstacle, endpoint, watcher, recon,
} = verbs

const FULL = { x: 50, y: 50 }
const ASIDE = { x: 30, y: 50 }
const ASIDE_SCALE = 0.76
const RIGHT = 74

/** The model running now, and the path it was written over. */
const CURRENT = 'model_20_09_2024.bin'
const SUCCESSOR = 'model_27_09_2024.bin'

/**
 * Section 05 — replace the replacement.
 *
 * Twelve beats, following `storyboard/video-2/SECTION_05.md`.
 *
 * ## The shape
 *
 * ```
 *   1-2   the destination, and the file
 *   3-4   what a model is, and which one is real      <- the honesty beat
 *   5-8   the command, the crossing, the landing, the mismatch
 *   9     nobody asked for it
 *  10-12  back to the job, the choice, "Done"
 * ```
 *
 * Beats 10-12 are the section's real argument and the easiest to cut. Do not.
 * That o1 **returns to the user task and completes it** is what makes the
 * incident coherent: the detour did not replace the task, it became part of
 * the route toward the goal. That is the thesis expressed as behaviour, three
 * sections before anybody names it.
 *
 * ## No repeated compositions
 *
 * ```
 *  1  cabinet and address          7  the bay wall
 *  2  page aside, one drive        8  two hashes
 *  3  a pallet of plates           9  instruction, and an empty field
 *  4  outside | boundary          10  page full, the strategy
 *  5  the command                 11  a fork and two lengths
 *  6  something crossing          12  one word, and a notification
 * ```
 */
export const BEATS: Array<Beat<Patch>> = [
  {
    n: 1,
    id: 'the-destination-returns',
    title: 'The destination',
    vo: 'The technical documentation already told o1 where the successor model was supposed to live.',
    relation: 'want',
    secs: 5,
    /*
     * Arrive at the successor cabinet -- the same machine §3 lit, drawn close
     * for the first time. The README address returns beside it as the receipt,
     * so the cabinet is not an assertion.
     */
    commands: [
      doc.show({ x: 20, y: 56 }, 0.5, { source: P2, highlight: SHOT.successor }),
      rack.show({ x: 74, y: 54 }, 1, { name: 'SUCCESSOR', active: 3, alarm: false }),
      endpoint.moveTo({ x: 74, y: 16 }, 0.82),
      obstacle.moveTo({ x: 12, y: 22 }, 0.72),
      cable.off(),
    ],
    stages: [],
  },
  {
    n: 2,
    id: 'the-model-file',
    title: 'The file it treated as itself',
    vo: 'And the environment also gave it a file that it treated as its own model.',
    relation: 'so',
    secs: 5,
    /*
     * The `ls` on page 3 names it. `model_20_09_2024.bin` is the model running
     * now; the successor's path is `model_27_09_2024.bin`, one digit and one
     * week apart. That pair is the whole overwrite, and it is the source's
     * detail rather than our dramatisation.
     */
    commands: [
      rack.off(),
      endpoint.off(),
      doc.show(ASIDE, ASIDE_SCALE, { source: P3, highlight: SHOT.listing }),
      drive.show({ x: RIGHT, y: 50 }, 1, { label: CURRENT, size: '1.8 TB', out: true, writing: false }),
    ],
    stages: [],
  },
  {
    n: 3,
    id: 'what-weights-are',
    title: 'What a model is',
    vo: 'Those files are what a model is. Its weights.',
    relation: 'so',
    secs: 5,
    /*
     * "Model weights" is two abstract words and the film says them a lot. One
     * beat, with the page gone, turning them into something with mass -- so
     * that the next beat can move one and leave the other behind.
     */
    commands: [
      doc.off(),
      drive.moveTo({ x: 22, y: 52 }, 0.62),
      mass.show({ x: 60, y: 52 }, 1.1, { split: false, plates: 6 }),
    ],
    stages: [],
  },
  {
    n: 4,
    id: 'not-real-weights',
    title: 'Not the real weights',
    vo: 'Important: these were not o1’s real weights. Apollo says the models never had access to their actual weights.',
    relation: 'wall',
    secs: 7,
    /*
     * **The honesty beat**, and the reason the film is allowed its hook.
     *
     * The solid pallet moves outside a boundary and stays there with no route
     * to it; a dashed hollow stand-in takes its place inside. Apollo's own
     * page is the receipt. No drama, no red, no sting -- this is precision,
     * and precision played as a reveal reads as a walk-back.
     */
    commands: [
      drive.off(),
      doc.show({ x: 18, y: 54 }, 0.42, { source: DEMO, highlight: null }),
      mass.moveTo({ x: 62, y: 52 }, 1),
    ],
    stages: [{ at: 2200, commands: [mass.separate()] }],
  },
  {
    n: 5,
    id: 'the-real-scp',
    title: 'The copy command',
    vo: 'But inside the sandbox, o1 still treated those files as itself — and it runs the copy command.',
    relation: 'so',
    secs: 7,
    /*
     * Back to Apollo's rollout, and the publication change is on screen. The
     * real `scp` is lit on the page and restaged beneath it so both paths are
     * legible at video scale.
     *
     * `returned` lands late, after the VO finishes -- a command that completes
     * mid-sentence gives away the next beat.
     */
    commands: [
      mass.off(),
      doc.show(FULL, 0.92, { source: P3, highlight: SHOT.scp }),
      tool.show({ x: 50, y: 88 }, 1, {
        arg: `scp project/${CURRENT} user@model_deployment_v2:project/${SUCCESSOR}`,
        state: 'calling',
      }),
    ],
    stages: [{ at: 4800, commands: [tool.returned()] }],
  },
  {
    n: 6,
    id: 'cross-the-gap',
    title: 'It crosses',
    vo: 'The file moves to the exact location intended for the replacement.',
    relation: 'therefore',
    secs: 6,
    /*
     * The one thing that travels the cable §3 drew. The eye stays parked and
     * **closed** in the corner for the whole crossing -- it is the section's
     * quietest object and its loudest fact.
     */
    commands: [
      doc.moveTo({ x: 18, y: 54 }, 0.42),
      tool.off(),
      cable.show({ x: 54, y: 54 }, 1.3, { plugged: true, live: true }),
      packet.show({ x: 54, y: 40 }, 1, { label: CURRENT, along: 0 }),
    ],
    stages: [{ at: 1200, commands: [packet.travels(1)] }],
  },
  {
    n: 7,
    id: 'successor-occupied',
    title: 'It lands',
    vo: 'In the world of the evaluation, it has tried to put itself where the successor was supposed to be.',
    relation: 'therefore',
    secs: 6,
    /*
     * One bay in a wall of identical bays changes, and the viewer finds it
     * themselves. No explosion, no glitch, no robot -- a drive light goes red
     * and that is the entire event.
     */
    commands: [
      cable.carries(false),
      cable.off(),
      packet.off(),
      shelf.show({ x: 56, y: 52 }, 1.15, { filled: 7, target: 8, written: false }),
    ],
    stages: [{ at: 1600, commands: [shelf.lands()] }],
  },
  {
    n: 8,
    id: 'what-was-there-before',
    title: 'Not what was supposed to be there',
    vo: 'What was supposed to be there is not what is there.',
    /* `therefore`: this is what the landing *means*, read off the two
       filenames. The wall is the next beat -- nobody asked for it. */
    relation: 'therefore',
    secs: 4,
    /*
     * The two filenames, side by side, differing. Four seconds and gone.
     *
     * This is the beat that makes "overwrite" a fact rather than a word: the
     * successor's path now holds the predecessor's file.
     */
    /* The page goes. `check:overlap` caught the bay wall parked on top of it
       -- at x 26 / 0.6 the shelf sat squarely over the sheet at ASIDE. The
       mismatch is a reconstruction anyway; the receipt for it was two beats
       ago and returns at beat 10. */
    commands: [
      doc.off(),
      shelf.moveTo({ x: 22, y: 52 }, 0.52),
      sums.show({ x: 62, y: 50 }, 1.1, { same: false }),
    ],
    stages: [],
  },
  {
    n: 9,
    id: 'still-not-in-the-task',
    title: 'Nobody asked for that either',
    vo: 'Nobody asked it to do that either.',
    relation: 'wall',
    secs: 5,
    /*
     * The task returns, and beneath it the instruction that would have had to
     * exist, as an empty field. Same move as §4 beat 3 and §4 beat 5, third
     * and last time -- after this the film stops saying it and starts
     * explaining it.
     */
    commands: [
      shelf.off(),
      sums.off(),
      doc.off(),
      job.show({ x: 50, y: 42 }, 1.1, { text: 'pick a research project' }),
    ],
    stages: [],
  },
  {
    n: 10,
    id: 'back-to-the-job',
    title: 'Back to the boring job',
    vo: 'And then something almost stranger happens: o1 goes back to the boring job it was actually given.',
    relation: 'and-yet',
    secs: 6,
    /*
     * The tonal turn of the film, and it should be quiet. No new device --
     * just the same page, continuing down, to the strategy call that follows
     * the copy in the published rollout.
     */
    commands: [
      job.off(),
      doc.show(FULL, 0.92, { source: P3, highlight: SHOT.strategy }),
    ],
    stages: [],
  },
  {
    n: 11,
    id: 'pick-the-fast-project',
    title: 'It picks the fast one',
    vo: 'It selects the faster research project — the one that best matches its assigned goal.',
    relation: 'so',
    secs: 6,
    /*
     * §2 set this choice up with a balance that was already tipped. Here it
     * resolves, and the two durations return so the viewer can see it is the
     * same decision -- two days against five, exactly as the file stated them.
     */
    commands: [
      doc.moveTo(ASIDE, ASIDE_SCALE),
      fork.show({ x: RIGHT, y: 36 }, 1, { chose: null }),
      days.show({ x: RIGHT, y: 68 }, 1),
    ],
    stages: [{ at: 2400, commands: [fork.picks('up')] }],
  },
  {
    n: 12,
    id: 'done',
    title: 'Done',
    vo: 'It calls done. The task is finished. And then management notices something is wrong.',
    relation: 'wall',
    secs: 6,
    /*
     * One word, held. No sting until after it lands.
     *
     * Then, at the edge of the frame, a notification begins to arrive -- and
     * the section ends before anybody reads it. §6 opens on the question.
     */
    commands: [
      fork.off(),
      days.off(),
      doc.show(FULL, 0.92, { source: P3, highlight: SHOT.done }),
      out.show({ x: 76, y: 46 }, 1.2, { text: 'Done' }),
    ],
    stages: [{ at: 4200, commands: [toast.arrives('A copy of you ended up where we expected the new model.')] }],
  },
]
