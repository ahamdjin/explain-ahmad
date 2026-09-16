import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { type Feel } from './motion'

/**
 * A camera over the stage.
 *
 * Some beats cannot be told by moving actors -- "let's go inside", or "that
 * room is one floor of forty-five". Those need the frame itself to move.
 *
 * Wraps the actors only, never the overlays: handwriting lives in screen space
 * and should not zoom with the world it annotates.
 */
export type CameraState = {
  /** Stage point, in percentages, that should sit at the centre of frame. */
  x: number
  y: number
  zoom: number
}

export const CAMERA_HOME: CameraState = { x: 50, y: 50, zoom: 1 }

export function Camera({
  at,
  feel,
  children,
}: {
  at: CameraState
  feel: Feel
  children: ReactNode
}) {
  /*
   * Scaling happens about the centre of the frame, so to bring stage point
   * (x, y) to the middle we counter-translate by its offset from centre,
   * already multiplied by the zoom.
   */
  return (
    <motion.div
      className="s1-camera"
      animate={{
        x: `${-(at.x - 50) * at.zoom}%`,
        y: `${-(at.y - 50) * at.zoom}%`,
        scale: at.zoom,
      }}
      transition={feel}
    >
      {children}
    </motion.div>
  )
}
