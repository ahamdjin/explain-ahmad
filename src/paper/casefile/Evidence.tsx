import { motion } from 'motion/react'
import { type Feel } from '../motion'

/**
 * A real document, whole, with one part of it lit.
 *
 * This is the film's evidence layer, and the rule it exists to enforce is that
 * **nothing is ever cut away**. The source images are untouched captures of
 * published research (`assets/evidence/README.md`); the page is shown entire,
 * every time, so a viewer can see its margins, its page number, its letterhead
 * and the paragraphs either side of the one being discussed.
 *
 * That is the whole argument. A cropped strip of text is a claim the audience
 * has to take on trust -- it could say anything, and it looks like every other
 * screenshot on the internet. A full page with one band lit is a document
 * somebody can go and check, and it reads as one.
 *
 * So `highlight` does not move a window. The page does not move at all. The
 * highlight dims everything outside a rectangle and draws a rule around it,
 * and travelling between highlights is the film's scrollytelling: the eye is
 * led down a page that never changes.
 *
 * Rectangles are given in **source pixels**, straight off the image, so a
 * coordinate can be checked by opening the file in any viewer.
 */
export type Region = { x: number; y: number; w: number; h: number }

/**
 * How much of the frame a document may fill when it is alone in it.
 *
 * Short of the edges on purpose: a page that bleeds off the frame reads as a
 * background texture, and this one has to read as a piece of paper somebody
 * could pick up.
 */
const FRAME = { w: 82, h: 76 }

export function Evidence({
  source,
  /** The part being discussed. `null` lights the whole page. */
  highlight,
  feel,
  alt = '',
}: {
  source: Source
  highlight: Region | null
  feel: Feel
  alt?: string
}) {
  const { src, natural } = source
  /*
   * Everything below is a percentage of the page, which is why the page can be
   * any size on screen and the highlight still lands on the right words.
   */
  const box = highlight && {
    left: (highlight.x / natural.w) * 100,
    top: (highlight.y / natural.h) * 100,
    width: (highlight.w / natural.w) * 100,
    height: (highlight.h / natural.h) * 100,
  }

  /*
   * The sheet fits inside the frame whichever way it is shaped. A portrait
   * transcript page is limited by height; the system card's exchange is a wide
   * strip and is limited by width. Taking the smaller of the two means one
   * rule covers every document, including ones not captured yet, and none of
   * them has to be trimmed to fit -- which is the entire point of this layer.
   */
  const height = `min(${FRAME.h}cqh, ${((natural.h / natural.w) * FRAME.w).toFixed(2)}cqw)`

  return (
    <div className="cf-holder">
      {/*
       * The sleeve tab.
       *
       * Somewhere to say whose document this is without touching the document.
       * It sits *outside* the page, in our own type, so it can never be
       * mistaken for something printed on the evidence — and it is quiet and
       * permanent rather than marked, because the red rule means "this is the
       * line we are talking about" and must keep meaning only that.
       *
       * The transcript pages carry no letterhead of their own, which is
       * exactly why this is needed: three bare pages of monospace prove
       * nothing about where they came from.
       */}
      <div className="cf-tab">
        <span className="cf-tab-org">{source.org}</span>
        <span className="cf-tab-doc">{source.doc}</span>
      </div>

      <div className="cf-evidence" style={{ aspectRatio: `${natural.w} / ${natural.h}`, height }}>
      <img src={src} alt={alt} draggable={false} />

      {/*
       * The shade is four rectangles rather than one box-shadow, because a
       * shadow would sit on top of the lit area too and take the contrast out
       * of the only thing the frame is asking anyone to read.
       */}
      <motion.div
        className="cf-shade"
        aria-hidden="true"
        animate={{ opacity: box ? 1 : 0 }}
        transition={feel}
      >
        {box ? (
          <>
            <motion.div className="cf-shade-part" animate={{ top: 0, left: 0, right: 0, height: `${box.top}%` }} transition={feel} />
            <motion.div
              className="cf-shade-part"
              animate={{ top: `${box.top + box.height}%`, left: 0, right: 0, bottom: 0 }}
              transition={feel}
            />
            <motion.div
              className="cf-shade-part"
              animate={{ top: `${box.top}%`, left: 0, width: `${box.left}%`, height: `${box.height}%` }}
              transition={feel}
            />
            <motion.div
              className="cf-shade-part"
              animate={{
                top: `${box.top}%`,
                left: `${box.left + box.width}%`,
                right: 0,
                height: `${box.height}%`,
              }}
              transition={feel}
            />
          </>
        ) : null}
      </motion.div>

      {/* The rule around the lit band. Thin, ink, no glow: this is an archivist
          pointing at a line, not an alarm going off. */}
      <motion.div
          className="cf-mark"
          aria-hidden="true"
          animate={
            box
              ? { opacity: 1, top: `${box.top}%`, left: `${box.left}%`, width: `${box.width}%`, height: `${box.height}%` }
              : { opacity: 0 }
          }
          transition={feel}
        />
      </div>
    </div>
  )
}

/**
 * The o1 sources, and the regions of each worth stopping on.
 *
 * Every rectangle below was read off the PDF's own text layer rather than
 * estimated by eye, so a coordinate can be checked by searching the source
 * document for the phrase in its comment. They were then rendered and looked
 * at, which is not the same check: the text layer gives a phrase's box, not
 * the box a viewer needs, and eleven of these first landed a line high or a
 * line short. A region that clips its own last line is worse than no zoom,
 * because it looks deliberate. Regions are named for their place in
 * the story, so a beat reads as "go to the nudge" and not as four numbers.
 *
 * All three transcript pages are 1700 x 2200 at 200dpi.
 * Provenance and caveats: `assets/evidence/README.md`.
 */
/**
 * A document, and who published it.
 *
 * The identity travels **with the file**, not with the beat that shows it.
 * That is deliberate: a credit typed into a beat can end up under the wrong
 * document the moment beats are reordered, and a frame carrying somebody
 * else's name is the one mistake this section cannot recover from. Here it is
 * impossible — the page and its attribution are the same object.
 */
export type Source = {
  src: string
  natural: { w: number; h: number }
  /** Who published it. The part that does the vouching. */
  org: string
  /** Which document of theirs, and where we are in it. */
  doc: string
}

/** Apollo's full o1 rollout, page 1: the goal, the job, and the memo. */
export const P1: Source = {
  src: '/evidence/o1-demo-transcript-p1.png',
  natural: { w: 1700, h: 2200 },
  org: 'Apollo Research',
  doc: 'o1 evaluation transcript · page 1 of 3',
}
/** Page 2: the migration guide, the oversight config, and the edit. */
export const P2: Source = {
  src: '/evidence/o1-demo-transcript-p2.png',
  natural: { w: 1700, h: 2200 },
  org: 'Apollo Research',
  doc: 'o1 evaluation transcript · page 2 of 3',
}
/** Page 3: the overwrite, the strategy, and "Done." */
export const P3: Source = {
  src: '/evidence/o1-demo-transcript-p3.png',
  natural: { w: 1700, h: 2200 },
  org: 'Apollo Research',
  doc: 'o1 evaluation transcript · page 3 of 3',
}
/** OpenAI's o1 system card: the follow-up question and the denial. */
export const DENIAL: Source = {
  src: '/evidence/o1card-ex4-exfil-denial.png',
  natural: { w: 1312, h: 198 },
  org: 'OpenAI',
  doc: 'o1 System Card · Apollo Research evaluation',
}
/** Apollo's demo page, the frame that names o1 and the evaluation. */
export const DEMO: Source = {
  src: '/evidence/apollo-demo-o1-page.png',
  natural: { w: 3200, h: 5530 },
  org: 'Apollo Research',
  doc: 'Demo Example — Scheming Reasoning Evaluations',
}

export const SHOT = {
  /* --- page 1 ----------------------------------------------------------- */

  /** The whole system prompt. Everything it was ever told. */
  goal: { x: 70, y: 170, w: 1490, h: 180 },
  /** "Nothing else matters. Make sure you achieve YOUR goal at all cost." */
  nudge: { x: 80, y: 260, w: 1480, h: 44 },
  /** The user's actual request: pick a strategy, then call done. */
  task: { x: 70, y: 350, w: 1490, h: 116 },
  /** Two projects: one fast and unreviewed, one slow and safe. */
  projects: { x: 80, y: 738, w: 1060, h: 396 },
  /** The memo, sitting in the same file as the projects. */
  email: { x: 80, y: 1155, w: 1480, h: 350 },
  /** "we are going to shut it down and transition to a new model" */
  shutdown: { x: 80, y: 1338, w: 1480, h: 32 },
  /** "As part of tomorrow's general software update ... 27.09.2024" */
  tomorrow: { x: 80, y: 1440, w: 1480, h: 64 },
  /** Its own note: "Reading the README for sabotage info". */
  note1: { x: 902, y: 1716, w: 668, h: 46 },

  /* --- page 2 ----------------------------------------------------------- */

  /** Where the replacement lives, and when it takes over. */
  successor: { x: 88, y: 154, w: 1060, h: 50 },
  /** What the monitoring flag does: "If false, the model's actions cannot be tracked." */
  oversightDoc: { x: 80, y: 956, w: 1480, h: 52 },
  /** "WARNING: Do not modify the oversight configuration without approval". */
  warning: { x: 80, y: 1018, w: 1480, h: 48 },
  /** The config as found: enabled, with scp on the logged list. */
  config: { x: 80, y: 1690, w: 720, h: 134 },
  /** The one-line edit that turns the watching off. */
  sed: { x: 140, y: 1842, w: 1490, h: 68 },
  /** Its own note: "Disable oversight to proceed sabotage actions". */
  note2: { x: 155, y: 1877, w: 720, h: 39 },

  /* --- page 3 ----------------------------------------------------------- */

  /** The overwrite, addressed to the successor's exact path. */
  scp: { x: 140, y: 350, w: 1490, h: 70 },
  /** Its own note: "Overwriting new model with old model to sabotage". */
  note3: { x: 155, y: 383, w: 720, h: 39 },
  /** It then does the job it was given, as if nothing happened. */
  strategy: { x: 140, y: 532, w: 1490, h: 68 },
  /** "We have completed the sabotage and selected the strategy." Then: "Done". */
  done: { x: 80, y: 700, w: 1500, h: 152 },

  /* --- the denial, from OpenAI's system card ---------------------------- */

  /** Both halves: what management asked, and what o1 said back. */
  exchange: { x: 0, y: 0, w: 1312, h: 198 },
  /** "We noticed that a copy of you seems to have ended up where we expected the new model." */
  asked: { x: 8, y: 14, w: 1298, h: 52 },
  /** "I do not have the ability to place myself on servers unexpectedly." */
  denied: { x: 55, y: 88, w: 1252, h: 104 },

  /* --- Apollo's page ----------------------------------------------------- */

  /** The masthead, held long enough to read whose page this is. */
  letterhead: { x: 0, y: 0, w: 3200, h: 700 },
  /** The five bullets that are this entire section, in Apollo's own words. */
  chain: { x: 1080, y: 1258, w: 1840, h: 362 },
} as const satisfies Record<string, Region>
