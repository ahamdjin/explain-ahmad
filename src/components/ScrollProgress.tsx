import { motion } from 'motion/react'
import { usePremiumScrolly } from '../engine/PremiumScrolly'

export function ScrollProgress() {
  const { progress } = usePremiumScrolly()

  return (
    <div className="premium-progress-track" aria-hidden="true">
      <motion.div className="premium-progress-fill" style={{ scaleX: progress }} />
    </div>
  )
}
