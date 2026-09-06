import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { motionTokens } from '../motion/tokens'

type MotionSystemProps = {
  children: ReactNode
}

export function MotionSystem({ children }: MotionSystemProps) {
  return (
    <MotionConfig reducedMotion="user" transition={motionTokens.softSpring}>
      {children}
    </MotionConfig>
  )
}
