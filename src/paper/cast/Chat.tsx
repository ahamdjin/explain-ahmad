import { motion } from 'motion/react'
import { INK } from '../ink'
import { PALETTE } from '../palette'

/**
 * The chat window. The one object in this subject that needs no explanation.
 *
 * ## Why the video opens here
 *
 * Every other actor in this cast -- the tower, the wall of 288, the router's
 * desk -- is strange, and a strange object at second zero has nowhere to live.
 * Ahmad put it exactly right: *"it's like I'm flying the airplane in the ocean
 * and nobody knows what's happening, they're seeing the ocean and don't
 * understand."* The frame had no coastline.
 *
 * Everyone watching has typed into one of these and watched it type back. So
 * the video starts on the thing they already stand on, and then goes **behind**
 * it -- which is a story shape rather than a diagram: familiar world, something
 * odd about it, go and look, what you find is absurd.
 *
 * ## The model name
 *
 * `model` is deliberately small and grey, sitting on the window's chrome the
 * way a real product label does. The viewer should be able to *find* what this
 * is about without being told it; a title card announcing "GLM-5.3-Flash"
 * would be the spec-sheet open this section exists to avoid.
 */
export function Chat({
  /** What the person typed. Appears character by character when `typing`. */
  ask,
  /** The reply so far. One word in the opening, and it stops there. */
  said = '',
  /** The caret blinks while nothing else is happening. */
  caret = true,
  /** The prompt types itself in rather than arriving whole. */
  typing = false,
  /**
   * The window turns edge-on so the camera can pass through it.
   *
   * This is the transition into the machine and it is the section's one real
   * move: the screen is not cut away from, it is **gone behind**. A cut would
   * make the tower a new subject; turning the screen keeps it the same one.
   */
  turned = false,
  model = '',
}: {
  ask: string
  said?: string
  caret?: boolean
  typing?: boolean
  turned?: boolean
  model?: string
}) {
  return (
    <motion.div
      className="s1-chat"
      /*
       * The turn is the *transition*, not the resting state. Held at 76° the
       * window was edge-on and the word on it unreadable -- which breaks the
       * next three beats, whose whole job is "all of this, for **that** word".
       * So it swings through and settles shallow, still legible.
       */
      animate={{ rotateY: turned ? [0, 78, 14] : 0, opacity: turned ? 0.62 : 1 }}
      transition={{ type: 'spring', stiffness: 58, damping: 18 }}
      style={{ transformOrigin: 'center', perspective: 900 }}
    >
      <svg viewBox="0 0 760 440" aria-hidden="true">
        <path d="M10 10h740v420H10z" fill={PALETTE.paperWhite} stroke={INK} strokeWidth="3.4" rx="6" />
        {/* chrome, so it reads as a window and not as a card */}
        <path d="M10 10h740v52H10z" fill={PALETTE.paperLight} stroke={INK} strokeWidth="3.4" />
        <g fill="none" stroke={INK} strokeWidth="2.2">
          <circle cx="38" cy="36" r="7" />
          <circle cx="62" cy="36" r="7" />
          <circle cx="86" cy="36" r="7" />
        </g>
        {model ? (
          <text x="730" y="42" textAnchor="end" className="s1-chat-model" fill={PALETTE.graphite}>
            {model}
          </text>
        ) : null}

        {/* what you typed, right-aligned the way every chat client does it */}
        <g>
          <motion.rect
            x="250"
            y="96"
            width="470"
            height="62"
            rx="10"
            fill={PALETTE.paperShade}
            stroke={INK}
            strokeWidth="2.6"
            initial={false}
            animate={{ opacity: ask ? 1 : 0 }}
          />
          <text x="272" y="136" className="s1-chat-ask" fill={INK}>
            {ask}
            {typing ? <tspan className="s1-chat-caret">▌</tspan> : null}
          </text>
        </g>

        {/* what came back */}
        <text x="40" y="232" className="s1-chat-said" fill={PALETTE.teal2}>
          {said}
          {caret && !typing ? (
            <motion.tspan
              className="s1-chat-caret"
              fill={INK}
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.45, 0.5, 1] }}
            >
              ▌
            </motion.tspan>
          ) : null}
        </text>
      </svg>
    </motion.div>
  )
}
