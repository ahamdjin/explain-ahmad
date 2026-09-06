import { motion, useTransform } from 'motion/react'
import { MaskReveal } from '../../components/MaskReveal'
import { PremiumScrolly, usePremiumScrolly } from '../../engine/PremiumScrolly'

function ContextVisual() {
  const { progress, reducedMotion } = usePremiumScrolly()
  const cameraScale = useTransform(progress, [0, 0.5, 1], [0.92, 1.04, 1])
  const cameraY = useTransform(progress, [0, 1], [40, -14])
  const titleOpacity = useTransform(progress, [0, 0.15, 0.7, 1], [0, 1, 1, 0.45])

  return (
    <div className="mask-story">
      <div className="mask-story-copy">
        <motion.p style={{ opacity: titleOpacity }}>CONTEXT WINDOW · VISUAL REVEAL</motion.p>
        <h2>The model starts with a wall of text.</h2>
        <span>Scroll to peel the surface away and expose the structure underneath.</span>
      </div>

      <motion.div className="context-visual" style={{ scale: reducedMotion ? 1 : cameraScale, y: reducedMotion ? 0 : cameraY }}>
        <div className="context-base">
          <div className="context-grid" aria-hidden="true" />
          <div className="context-node node-user"><span>USER</span><strong>Prompt</strong></div>
          <div className="context-node node-system"><span>SYSTEM</span><strong>Rules</strong></div>
          <div className="context-node node-files"><span>FILES</span><strong>Evidence</strong></div>
          <div className="context-node node-tools"><span>TOOLS</span><strong>Actions</strong></div>
          <svg className="context-lines" viewBox="0 0 900 520" aria-hidden="true">
            <path d="M190 260 C300 260 310 130 420 130" />
            <path d="M190 260 C300 260 310 390 420 390" />
            <path d="M530 130 C650 130 640 260 760 260" />
            <path d="M530 390 C650 390 640 260 760 260" />
          </svg>
          <div className="context-core"><span>MODEL</span><strong>Context</strong></div>
        </div>

        <MaskReveal progress={progress} range={[0.12, 0.72]} direction="center" className="context-cover">
          <div className="context-text-wall" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ width: `${48 + ((index * 23) % 43)}%` }} />)}
            <b>RAW CONTEXT</b>
          </div>
        </MaskReveal>
      </motion.div>
    </div>
  )
}

export default function MaskRevealExample() {
  return (
    <PremiumScrolly lengthVh={330} className="mask-reveal-story">
      <ContextVisual />
    </PremiumScrolly>
  )
}
