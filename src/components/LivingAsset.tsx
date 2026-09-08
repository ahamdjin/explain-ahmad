import { motion } from 'motion/react'
import type { PointerEventHandler, ReactNode } from 'react'
import { useState } from 'react'

export type LivingBehavior = 'idle' | 'wiggle' | 'pop' | 'follow'

type LivingAssetProps = {
  children: ReactNode
  behavior?: LivingBehavior
  className?: string
}

export function LivingAsset({ children, behavior = 'idle', className = '' }: LivingAssetProps) {
  const [follow, setFollow] = useState({ x: 0, rotate: 0 })

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (behavior !== 'follow') return
    const rect = event.currentTarget.getBoundingClientRect()
    const normalizedX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    setFollow({ x: normalizedX * 5, rotate: normalizedX * 3 })
  }

  const handlePointerLeave = () => {
    if (behavior === 'follow') setFollow({ x: 0, rotate: 0 })
  }

  const idleAnimation = behavior === 'idle'
    ? { y: [0, -2, 0], rotate: [-0.6, 0.6, -0.6] }
    : behavior === 'follow'
      ? follow
      : undefined

  const hoverAnimation = behavior === 'wiggle'
    ? { rotate: [0, -5, 4, -2, 0], scale: 1.045, y: -2 }
    : behavior === 'pop'
      ? { y: -8, scale: 1.06 }
      : behavior === 'follow'
        ? { scale: 1.025 }
        : { scale: 1.02 }

  return (
    <motion.div
      className={`living-asset ${className}`.trim()}
      animate={idleAnimation}
      whileHover={hoverAnimation}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      transition={
        behavior === 'idle'
          ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
          : { type: 'spring', stiffness: 340, damping: 22 }
      }
    >
      {children}
    </motion.div>
  )
}
