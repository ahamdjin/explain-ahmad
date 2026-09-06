import { motion, useTransform } from 'motion/react'
import { usePremiumScrolly } from '../engine/PremiumScrolly'
import { motionTokens } from '../motion/tokens'

type ScrollBeatProps = {
  index: number
  count: number
  eyebrow?: string
  title: string
  body: string
}

export function ScrollBeat({
  index,
  count,
  eyebrow,
  title,
  body,
}: ScrollBeatProps) {
  const { progress, reducedMotion } = usePremiumScrolly()
  const segment = 1 / count
  const center = segment * (index + 0.5)
  const start = Math.max(0, center - segment * 0.62)
  const enter = Math.max(0, center - segment * 0.28)
  const exit = Math.min(1, center + segment * 0.28)
  const end = Math.min(1, center + segment * 0.62)

  const opacity = useTransform(progress, [start, enter, exit, end], [0, 1, 1, 0])
  const y = useTransform(
    progress,
    [start, enter, exit, end],
    [motionTokens.scene.travelY, 0, 0, -motionTokens.scene.travelY * 0.7],
  )
  const scale = useTransform(
    progress,
    [start, enter, exit, end],
    [motionTokens.scene.inactiveScale, 1, 1, 0.985],
  )
  const filter = useTransform(
    progress,
    [start, enter, exit, end],
    [
      `blur(${motionTokens.scene.blurIn}px)`,
      'blur(0px)',
      'blur(0px)',
      'blur(9px)',
    ],
  )

  return (
    <motion.article
      className="premium-scroll-beat"
      style={{
        opacity,
        y: reducedMotion ? 0 : y,
        scale: reducedMotion ? 1 : scale,
        filter: reducedMotion ? 'none' : filter,
      }}
    >
      <p className="premium-scroll-eyebrow">{eyebrow ?? `0${index + 1}`}</p>
      <h2>{title}</h2>
      <p>{body}</p>
    </motion.article>
  )
}
