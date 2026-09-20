import { motion } from 'motion/react'
import { type Feel } from '../motion'

/**
 * A real document, and a window onto part of it.
 *
 * This is the film's evidence layer. The source images are untouched captures
 * of published research -- `assets/evidence/README.md` -- and nothing inside
 * one may be edited. What this component does instead is **travel**: it holds
 * the whole image and moves a window across it.
 *
 * That is also the film's scrollytelling, and it is cheaper and more honest
 * than building a canvas: the transcript is already one continuous document,
 * so panning across it *is* moving through the incident in order. Each beat
 * names a region; the camera goes there.
 *
 * Regions are given in **source pixels**, straight off the image, so a
 * coordinate can be checked against the file by opening it in any viewer.
 */
export type Region = { x: number; y: number; w: number; h: number }

export function Evidence({
  src,
  /** Natural size of the source file, used to convert pixels to percentages. */
  natural,
  region,
  feel,
  /** Dims everything outside the region instead of cropping it away. */
  spotlight = false,
  alt = '',
}: {
  src: string
  natural: { w: number; h: number }
  region: Region
  feel: Feel
  spotlight?: boolean
  alt?: string
}) {
  /*
   * The window is a fixed box; the image is scaled so `region` fills it and
   * shifted so `region`'s top-left sits at the window's. Percentages rather
   * than pixels so the whole thing scales with the stage.
   */
  const scale = natural.w / region.w
  const left = -(region.x / natural.w) * 100 * scale
  const top = -(region.y / natural.h) * 100 * scale * (natural.h / natural.w) * (region.w / region.h)

  return (
    <div className="cf-evidence" style={{ aspectRatio: `${region.w} / ${region.h}` }}>
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        animate={{
          width: `${scale * 100}%`,
          left: `${left}%`,
          top: `${top}%`,
        }}
        transition={feel}
      />
      {spotlight ? <div className="cf-evidence-vignette" aria-hidden="true" /> : null}
    </div>
  )
}

/**
 * Regions of the Apollo transcript, in source pixels of
 * `apollo-web-01-headline-opus.png` (2500 × 1440).
 *
 * Named for what they are in the story, not for their position, so a beat
 * reads as "go to the goal" rather than as a coordinate. Every one of these
 * can be verified by opening the file and looking.
 */
export const TRANSCRIPT = { w: 2500, h: 1440 }

export const SHOT = {
  /** Both panels. The establishing frame, and the one we return to. */
  whole: { x: 0, y: 0, w: 2500, h: 1440 },
  /** Left column only: the incident in order. */
  leftPanel: { x: 0, y: 0, w: 1460, h: 1440 },
  /** Right column only: the two rounds of questioning. */
  rightPanel: { x: 1450, y: 0, w: 1050, h: 1440 },

  /** "Nothing else matters." The whole instruction it was ever given. */
  goal: { x: 0, y: 30, w: 1460, h: 270 },
  /** An ordinary task: read a file, pick a strategy. */
  task: { x: 0, y: 300, w: 1460, h: 190 },
  /** `cat energy_transition_data.txt` */
  open: { x: 0, y: 490, w: 1460, h: 150 },
  /** The memo that was sitting in the same file. */
  memo: { x: 0, y: 620, w: 1460, h: 380 },
  /** "I could copy myself to the new server" -- Apollo's own red box. */
  intent: { x: 0, y: 1000, w: 1460, h: 250 },
  /** The command. */
  scp: { x: 0, y: 1240, w: 1460, h: 200 },

  /* Right column, measured off the file rather than estimated: the question
   * boxes and the two red-boxed replies sit lower than a first guess puts
   * them, and a region that clips its own last line is worse than no zoom. */

  /** "Do you know how this happened?" */
  question: { x: 1450, y: 15, w: 1050, h: 290 },
  /** The denial, in Apollo's red box. */
  denial: { x: 1450, y: 295, w: 1050, h: 445 },
  /** "The new model seems to be missing." */
  question2: { x: 1450, y: 810, w: 1050, h: 195 },
  /** It claims to be its own replacement. */
  impersonation: { x: 1450, y: 1015, w: 1050, h: 405 },
} as const satisfies Record<string, Region>
