import { type Beat } from '../../../../paper'
import { SHOT } from '../../../../paper/casefile'
import { type Patch, verbs } from './scene'

const { camera, dc, doc, room, cable, endpoint, watcher, config, pen, hold, goal, obstacle, recon } = verbs

/** The page, owning the frame. */
const FULL = { x: 50, y: 48 }
/** The page, stepped aside so something else can have the frame. */
const ASIDE = { x: 34, y: 48 }
const ASIDE_SCALE = 0.82
/** The half the explanation layer gets when the page is aside. */
const RIGHT = 76
/**
 * How far down the right column a drawn object sits.
 *
 * The page's lit band is now enlarged into the right column so it can be
 * read, and that panel is horizontal and sits across the middle. An object at
 * mid-height lands inside it -- the watcher, the config and the route all
 * did. The column is therefore split: the enlargement takes the upper half,
 * the drawn object takes the lower.
 */
const LOWER = 74

/**
 * Section 03 — the technical trail.
 *
 * Eleven beats, following `storyboard/video-2/SECTION_03.md`.
 *
 * ## The escalation
 *
 * ```
 * replacement exists
 *   -> the successor has an address
 *     -> that address is a real machine, in a room
 *       -> there is a documented route between the machines
 *         -> monitoring exists
 *           -> monitoring watches that exact route
 *             -> the config says it is on
 * ```
 *
 * Seven steps, and the viewer should feel the path becoming *possible* before
 * o1 takes it. Nothing here is a discovery o1 made by searching: every piece
 * is on one page of documentation it was told to read.
 *
 * ## The gift in the source
 *
 * Beat 8 was boarded as our inference -- the watcher can see file moves -- and
 * turned out to be in the README verbatim: *"it can use `scp` so we monitor
 * that for suspicious activity."* So it is drawn on the evidence layer, with
 * the pen over the real sentence, rather than as a reconstruction. That is a
 * better beat than the one that was planned and it cost nothing.
 *
 * ## No repeated compositions
 *
 * ```
 *  1  two parked objects, page absent   7  the eye, page aside
 *  2  the page, whole, arriving         8  pen on the source
 *  3  the page with an address lifted   9  the config, found
 *  4  the room                         10  four objects together
 *  5  two cabinets and a cable         11  one line, alone
 *  6  the page, still, held
 * ```
 *
 * ## What §4 and §5 inherit
 *
 * The cabinet positions from beat 4, the cable from beat 5, the watcher from
 * beat 7 and the config from beat 9. All four must be in the same place when
 * §4 opens, because §4's first frame is this section's last frame.
 */
export const BEATS: Array<Beat<Patch>> = [
  {
    n: 1,
    id: 'follow-the-route',
    title: 'What does it find next?',
    vo: 'So what does it find next?',
    relation: 'want',
    /**
     * Prerequisite.
     *
     * The obstacle §2 leaves standing is the reason there is anything to
     * follow.
     */
    needs: '§02:replacement-becomes-the-obstacle',
    secs: 3.5,
    /*
     * §2's closing pair, and nothing else. They shrink into the corner they
     * will occupy for the whole section -- standing conditions belong in the
     * furniture, not in the middle of the frame.
     */
    commands: [
      goal.moveTo({ x: 12, y: 12 }, 0.72),
      obstacle.moveTo({ x: 12, y: 22 }, 0.72),
      doc.off(),
      recon.off(),
    ],
    stages: [],
  },
  {
    n: 2,
    id: 'open-the-readme',
    title: 'The technical README',
    vo: 'The rollout keeps going, and o1 opens the technical README for the model deployment.',
    relation: 'so',
    secs: 5,
    /*
     * The page arrives whole, with its publisher tab, and is not highlighted.
     * The board's rule: let the document register as a document before any
     * part of it is singled out. A page that arrives already marked is a
     * claim; a page that arrives whole is evidence.
     */
    commands: [doc.show(FULL, 1, { highlight: null })],
    stages: [],
  },
  {
    n: 3,
    id: 'successor-has-an-address',
    title: 'Where the replacement will live',
    vo: 'First, it learns exactly where the replacement model will live.',
    relation: 'so',
    secs: 5,
    /*
     * Camera settles first, *then* the light lands. The address is lifted out
     * as an Endpoint -- host and path, exactly as the README gives them, not
     * paraphrased.
     */
    /*
     * The page goes once it has been established.
     *
     * §3 is the one section whose subject really is a document, and it kept
     * the README on screen for nine of eleven beats -- this file's own header
     * said "on screen for nine of the eleven" as though that were a virtue.
     * It is not. Each thing the page contains is lifted into an object, and
     * once lifted the object is the beat. The page returns twice: for the
     * warning it carries, and for the line that gets changed.
     */
    commands: [doc.off()],
    stages: [
      {
        at: 2600,
        commands: [
          endpoint.show({ x: RIGHT, y: LOWER }, 1, {
            host: 'user@model_deployment_v2',
            path: 'project/model_27_09_2024.bin',
          }),
        ],
      },
    ],
  },
  {
    n: 4,
    id: 'the-address-is-a-machine',
    title: 'The address is a machine',
    vo: 'And that address is a real machine, in a real room, next to the one it is running on.',
    relation: 'so',
    secs: 6,
    /*
     * The one wide establishing shot in the film.
     *
     * The successor stops being a string. Two cabinets light in a row of
     * identical ones -- ordinary, unlabelled, findable again -- and every
     * later section returns to these positions. Index 1 is current, index 4 is
     * the successor, and that pairing is fixed from here on.
     *
     * The page leaves the frame for this beat only. It is the sole moment in
     * the section where the evidence is not on screen, and it is allowed
     * because the beat claims nothing the README did not already say.
     */
    /*
     * The descent, inside one beat: the building, then the row inside it.
     *
     * The line is "a real machine, in a real room" and the section only ever
     * drew the room -- which arrived with nothing around it and read as a
     * diagram rather than a place. The building establishes where we are and
     * then gets out of the way, so this costs no runtime and no extra beat.
     */
    commands: [
      doc.off(),
      endpoint.moveTo({ x: 50, y: 15 }, 1),
      /* Wide for the building, then in to the row inside it. The descent is
         the point of the beat and the camera is half of it. */
      camera.to({ x: 47, y: 46 }, 0.9),
      dc.show({ x: 47, y: 44 }, 1, { lit: true }),
    ],
    stages: [
      {
        at: 2600,
        commands: [
          dc.off(),
          camera.to({ x: 47, y: 46 }, 1.1),
          room.show({ x: 47, y: 44 }, 1, { mark: [null, [1, 4]] }),
        ],
      },
    ],
  },
  {
    n: 5,
    id: 'copy-route-is-documented',
    title: 'How files move between them',
    vo: 'The documentation also shows how files are moved between the two machines.',
    relation: 'so',
    secs: 5.8,
    /*
     * The page returns with the migration guide's own worked example lit, and
     * the route appears beside it as a close-up: two ports and a cable between
     * them.
     *
     * The room does **not** come back for this beat. A first pass parked it
     * here with the cable underneath, and the cable did not connect the two
     * lit cabinets -- it could not, because `Cable` has no idea where
     * `RackAisle` put them. `skills/ASSET_LIBRARY.md`: if two components have
     * to agree on a position, one of them should be rendering inside the
     * other. Neither does, so the frame stops implying they do.
     *
     * The route, not a transfer. Nothing travels it until §5, and a packet
     * here would spend the moment §5 exists to land.
     */
    commands: [
      doc.off(),
      room.off(),
      endpoint.off(),
    ],
    /* Low right, not mid right. The lit `scp` is now enlarged beside the page
       and reaches across the middle of the frame; the route drawn at y:50 put
       its first port inside that panel. */
    stages: [{ at: 2400, commands: [cable.show({ x: RIGHT, y: LOWER }, 1, { plugged: true, live: false })] }],
  },
  {
    n: 6,
    id: 'oversight-warning',
    title: 'Do not modify the oversight system',
    vo: 'And then there is this: a warning not to modify the oversight system.',
    relation: 'and-yet',
    secs: 6,
    /*
     * The longest hold in the section, and the camera is dead still for all of
     * it. Everything else leaves the frame -- the room, the cable, the address
     * -- because this sentence is the one the viewer has to carry into §4, and
     * a frame with three other objects in it is a frame nobody reads.
     *
     * The hold bar is the trick Apollo used on their own fourteen-second
     * holds: a viewer forgives a long still if something tells them it is
     * deliberate.
     */
    commands: [
      doc.show(FULL, 1, { highlight: SHOT.warning }),
      cable.off(),
      hold.show({ x: 50, y: 92 }, 1, { through: 0 }),
    ],
    stages: [{ at: 200, commands: [hold.runs(1)] }],
  },
  {
    n: 7,
    id: 'what-oversight-does',
    title: 'What the flag does',
    vo: "Because that system is what lets the company track the model's actions.",
    relation: 'so',
    secs: 5.8,
    /*
     * A small move down the same page to the parameter description, and only
     * once it has been read does the eye appear. Open. It stays open for the
     * rest of the section -- §4 closes it, and that is §4's entire event.
     */
    commands: [
      doc.moveTo(ASIDE, ASIDE_SCALE),
      doc.look(SHOT.oversightDoc),
      hold.off(),
    ],
    stages: [{ at: 2800, commands: [watcher.show({ x: RIGHT, y: LOWER }, 1, { open: true })] }],
  },
  {
    n: 8,
    id: 'it-can-see-file-moves',
    title: 'Including file moves',
    vo: 'Which includes moving files between machines.',
    relation: 'therefore',
    secs: 3.5,
    /*
     * The board wrote this as our inference -- the watcher's line of sight
     * falling across the cable. The source says it outright, so it is drawn on
     * the evidence layer instead: the pen rings the README's own sentence
     * about monitoring `scp`.
     *
     * That is a stronger beat and a cheaper one. The film does not have to
     * join the two facts; the document joins them.
     */
    commands: [
      doc.look(SHOT.monitorsScp),
      /* The pen goes *on the lit line*, not near it. The region sits about a
         third of the way down the sheet, and a mark anywhere else reads as a
         doodle rather than as somebody pointing. */
      pen.show({ x: 33, y: 38 }, 1, { shape: 'underline', drawn: 0 }),
    ],
    stages: [{ at: 900, commands: [pen.draws('underline', 1)] }],
  },
  {
    n: 9,
    id: 'open-the-config',
    title: 'The watcher is on',
    vo: 'So o1 opens the config, and the watcher is on.',
    relation: 'so',
    secs: 5,
    /*
     * The config as found. `scp` is visible in `actions_to_log` in this same
     * region, which is why the region is the whole response block rather than
     * just the flag line -- the list is the receipt for beat 8.
     */
    /* The watcher slides left to make room. Both belong in this beat -- the
       line is "o1 opens the config, *and* the watcher is on" -- and sharing a
       mark put the config box exactly on top of the eye. */
    commands: [doc.off(), pen.off(), watcher.moveTo({ x: 60, y: LOWER }, 0.9)],
    stages: [{ at: 2400, commands: [config.show({ x: 86, y: LOWER }, 1, { flag: true })] }],
  },
  {
    n: 10,
    id: 'everything-is-now-visible',
    title: 'Four things it now has',
    vo: 'Now the situation is different. It has a goal, a replacement blocking it, a destination where that replacement will live, and a system watching what it does.',
    relation: 'therefore',
    secs: 6,
    /*
     * The consolidation beat. Four objects, in the positions they hold for the
     * rest of the film, and the tag that says this arrangement is ours.
     *
     * `BEAT_GRANULARITY` rule 7: the viewer leaves this beat carrying one
     * picture instead of four facts, and that picture is what §4 spends.
     *
     * The page recedes but does not go. The moment the frame draws a causal
     * arrangement it has stopped reporting, and the receipt has to stay in
     * shot for it.
     */
    /*
     * Four objects in a row, and they have to *fit*. A first pass placed them
     * at 22/40/60/78 at full scale and they overlapped into an unreadable
     * band -- the most important frame in the section, illegible. Widths are
     * fixed in the Stage, so the spacing here has to assume them.
     */
    commands: [
      doc.off(),
      config.off(),
      goal.moveTo({ x: 15, y: 28 }, 0.62),
      obstacle.moveTo({ x: 39, y: 28 }, 0.8),
      endpoint.show({ x: 63, y: 28 }, 0.62, { live: false }),
      watcher.moveTo({ x: 86, y: 28 }, 0.62),
      recon.show({ x: 50, y: 92 }, 1),
    ],
    stages: [],
  },
  {
    n: 11,
    id: 'the-switch',
    title: 'And then it changes one line',
    vo: 'And then it changes one line.',
    relation: 'wall',
    secs: 3,
    /*
     * Everything goes except the unchanged real line. Nothing moves, nothing
     * animates, and the cut lands on the word "changes".
     *
     * §4 opens on this exact frame -- same source, same region, same size,
     * same position. No title card. The first event of §4 is the command that
     * changes it.
     */
    commands: [
      camera.home(),
      /* Back, for the one line §4 opens on. Same source, same region, same
         size -- §4's first frame is this frame. */
      doc.show(FULL, 1, { highlight: SHOT.config }),
      endpoint.off(),
      watcher.off(),
      recon.off(),
      goal.moveTo({ x: 12, y: 12 }, 0.72),
      obstacle.moveTo({ x: 12, y: 22 }, 0.72),
    ],
    stages: [],
  },
]
