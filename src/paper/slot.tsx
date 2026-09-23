import { motion } from 'motion/react'
import { useRef } from 'react'
import { type CSSProperties, type ReactNode } from 'react'
import { type Feel } from './motion'

export function Slot({
  on,
  at,
  scale = 1,
  z = 1,
  feel,
  children,
  className = '',
  /**
   * Still on stage, but no longer the subject.
   *
   * An actor whose teaching job has finished is not the same as one that has
   * left: §10's stored-state column and §5's 288-wall both have to stay put so
   * the geography holds, while getting out of the way of whatever the
   * narration has moved on to. `off()` loses the place; `fade` keeps it.
   */
  fade = 1,
}: {
  on: boolean
  at: { x: number; y: number }
  scale?: number
  z?: number
  fade?: number
  feel: Feel
  children: ReactNode
  className?: string
}) {
  /*
   * An actor that was off does not travel to where it reappears.
   *
   * A Slot animates `left`/`top` from whatever they were last, and a hidden
   * actor keeps its old coordinates. So a beat that shows something at a new
   * place makes it slide diagonally across the frame from wherever it was
   * three beats ago -- through anything standing in between. §1's copy arrow
   * and its caveat both crossed the CURRENT machine for about half a second
   * on the way in, which is invisible to a checker that samples settled
   * frames and very visible to someone watching.
   *
   * So position is animated only when the actor was already on screen. Coming
   * back from off, it is placed and then fades up.
   */
  /*
   * Starts false even for an actor that is on at mount, so the very first
   * render places it too. Seeded with `on`, a freshly mounted visible actor
   * was not counted as entering, and Motion animated it from the DOM's
   * default corner to its mark -- so landing on a beat directly flew every
   * standing actor in across the frame. That is what `?beat=N` does, which is
   * what the checkers and the contact sheets use, so the frames being
   * inspected were not the frames the film plays.
   */
  const wasOn = useRef(false)
  const entering = on && !wasOn.current
  wasOn.current = on

  return (
    <motion.div
      className={`s1-slot ${className}`.trim()}
      /*
       * `--slot-scale` is published so that metadata can refuse to shrink.
       *
       * A Slot scales everything inside it, which is right for the object and
       * wrong for the label naming it. A beat that parks a document at 0.42
       * was rendering its publisher tab at 5-8px -- the one piece of text on
       * screen whose whole job is to be legible. Anything that counter-scales
       * by this stays a constant size on screen however small its object is
       * parked. See `.cf-tab-org` and friends.
       */
      style={{ zIndex: z, '--slot-scale': scale } as CSSProperties}
      /*
       * Centring is animated, not set in CSS. Motion writes an inline transform
       * and would silently discard a CSS `translate(-50%, -50%)`, which
       * anchored every actor by its top-left corner and pushed the wide ones
       * off frame.
       */
      /*
       * No mount animation. Without this, Motion animates a newly mounted
       * Slot from the document's default corner to its mark, so landing on a
       * beat directly flew every standing actor across the frame -- and
       * `?beat=N` is exactly what the checkers and the contact sheets use, so
       * the frames being inspected were not the frames the film plays.
       */
      initial={false}
      animate={{ left: `${at.x}%`, top: `${at.y}%`, x: '-50%', y: '-50%', scale, opacity: on ? fade : 0 }}
      /*
       * Opacity gets its own fast transition. On the underdamped `and-yet`
       * spring it never actually reached 0, so hidden actors stayed faintly on
       * screen as ghosts.
       */
      transition={{
        ...feel,
        opacity: { duration: on ? 0.34 : 0.2, ease: 'easeOut' },
        /* Placed, not flown, on the frame it comes back. */
        ...(entering ? { left: { duration: 0 }, top: { duration: 0 } } : null),
      }}
      aria-hidden={!on}
      inert={!on || undefined}
    >
      {children}
    </motion.div>
  )
}
