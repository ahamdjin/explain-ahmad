import { type ReactNode } from 'react'
import { motion, type MotionValue, useTransform } from 'motion/react'

type MaskRevealProps = {
  children: ReactNode
  progress: MotionValue<number>
  range?: [number, number]
  direction?: 'left' | 'right' | 'up' | 'down' | 'center'
  className?: string
  scaleFrom?: number
}

export function MaskReveal({
  children,
  progress,
  range = [0, 1],
  direction = 'center',
  className = '',
  scaleFrom = 1.08,
}: MaskRevealProps) {
  const masks: Record<NonNullable<MaskRevealProps['direction']>, [string, string]> = {
    left: ['inset(0 100% 0 0 round 24px)', 'inset(0 0% 0 0 round 24px)'],
    right: ['inset(0 0 0 100% round 24px)', 'inset(0 0 0 0% round 24px)'],
    up: ['inset(100% 0 0 0 round 24px)', 'inset(0% 0 0 0 round 24px)'],
    down: ['inset(0 0 100% 0 round 24px)', 'inset(0 0 0% 0 round 24px)'],
    center: ['inset(0 50% 0 50% round 24px)', 'inset(0 0% 0 0% round 24px)'],
  }
  const clipPath = useTransform(progress, range, masks[direction])
  const scale = useTransform(progress, range, [scaleFrom, 1])

  return (
    <motion.div className={`mask-reveal ${className}`.trim()} style={{ clipPath }}>
      <motion.div className="mask-reveal-inner" style={{ scale }}>{children}</motion.div>
    </motion.div>
  )
}
