import { motion } from 'motion/react'
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
  return (
    <motion.div
      className={`s1-slot ${className}`.trim()}
      style={{ zIndex: z } as CSSProperties}
      /*
       * Centring is animated, not set in CSS. Motion writes an inline transform
       * and would silently discard a CSS `translate(-50%, -50%)`, which
       * anchored every actor by its top-left corner and pushed the wide ones
       * off frame.
       */
      animate={{ left: `${at.x}%`, top: `${at.y}%`, x: '-50%', y: '-50%', scale, opacity: on ? fade : 0 }}
      /*
       * Opacity gets its own fast transition. On the underdamped `and-yet`
       * spring it never actually reached 0, so hidden actors stayed faintly on
       * screen as ghosts.
       */
      transition={{ ...feel, opacity: { duration: on ? 0.34 : 0.2, ease: 'easeOut' } }}
      aria-hidden={!on}
      inert={!on || undefined}
    >
      {children}
    </motion.div>
  )
}
