import { motion, type MotionValue, useTransform } from 'motion/react'
import { ScrollBeat } from '../../components/ScrollBeat'
import { ScrollProgress } from '../../components/ScrollProgress'
import { PremiumScrolly, usePremiumScrolly } from '../../engine/PremiumScrolly'

const beats = [
  {
    eyebrow: 'INPUT',
    title: 'One prompt enters the system.',
    body: 'The scene starts almost empty. Scroll does not trigger a slide — it continuously moves the prompt into the model.',
  },
  {
    eyebrow: 'ROUTING',
    title: 'The router reads intent first.',
    body: 'The camera settles, the router gains emphasis, and the system begins exposing only the next useful layer.',
  },
  {
    eyebrow: 'SELECTION',
    title: 'Only the useful experts wake up.',
    body: 'Signals branch with depth and timing. Inactive experts stay present, but visually recede instead of disappearing abruptly.',
  },
  {
    eyebrow: 'OUTPUT',
    title: 'The answer recomposes into one stream.',
    body: 'The visual resolves as the narration resolves — movement, focus, and hierarchy all converge at the same moment.',
  },
]

function FlowPath({
  progress,
  range,
  d,
  muted = false,
}: {
  progress: MotionValue<number>
  range: [number, number]
  d: string
  muted?: boolean
}) {
  const pathLength = useTransform(progress, range, [0, 1])
  const opacity = useTransform(progress, [range[0], range[0] + 0.035, range[1]], [0, muted ? 0.24 : 0.82, muted ? 0.32 : 1])

  return (
    <motion.path
      d={d}
      className={muted ? 'premium-flow-path is-muted' : 'premium-flow-path'}
      style={{ pathLength, opacity }}
    />
  )
}

function ExpertNode({
  progress,
  start,
  label,
  selected,
  className,
}: {
  progress: MotionValue<number>
  start: number
  label: string
  selected?: boolean
  className: string
}) {
  const opacity = useTransform(progress, [start, start + 0.07], [0.16, selected ? 1 : 0.38])
  const scale = useTransform(progress, [start, start + 0.07], [0.82, selected ? 1 : 0.92])
  const filter = useTransform(progress, [start, start + 0.07], ['blur(8px)', selected ? 'blur(0px)' : 'blur(2px)'])

  return (
    <motion.div
      className={`premium-flow-node premium-expert ${className} ${selected ? 'is-selected' : ''}`.trim()}
      style={{ opacity, scale, filter }}
    >
      <span>EXPERT</span>
      <strong>{label}</strong>
    </motion.div>
  )
}

function PremiumStory() {
  const { progress, velocity, reducedMotion } = usePremiumScrolly()

  const stageScale = useTransform(progress, [0, 0.18, 0.58, 1], [0.92, 1, 1.055, 0.985])
  const stageY = useTransform(progress, [0, 0.32, 0.75, 1], [34, 0, -18, -6])
  const velocityTilt = useTransform(velocity, [-1800, 0, 1800], [1.35, 0, -1.35])
  const tokenX = useTransform(progress, [0.02, 0.22], [-72, 0])
  const tokenOpacity = useTransform(progress, [0.02, 0.1], [0, 1])
  const routerScale = useTransform(progress, [0.2, 0.34, 0.48], [0.88, 1.08, 1])
  const routerGlow = useTransform(progress, [0.2, 0.38, 0.62], [0, 1, 0.45])
  const outputOpacity = useTransform(progress, [0.72, 0.88], [0, 1])
  const outputX = useTransform(progress, [0.72, 0.9], [42, 0])
  const ambientY = useTransform(progress, [0, 1], ['-12%', '16%'])
  const ambientScale = useTransform(progress, [0, 0.55, 1], [0.9, 1.18, 1.04])

  return (
    <div className="premium-story">
      <ScrollProgress />
      <motion.div className="premium-ambient premium-ambient-one" style={{ y: ambientY, scale: ambientScale }} />
      <motion.div className="premium-ambient premium-ambient-two" style={{ y: ambientY }} />

      <div className="premium-story-grid">
        <div className="premium-copy-stack">
          {beats.map((beat, index) => (
            <ScrollBeat
              key={beat.title}
              index={index}
              count={beats.length}
              eyebrow={beat.eyebrow}
              title={beat.title}
              body={beat.body}
            />
          ))}
        </div>

        <div className="premium-stage-shell">
          <motion.div
            className="premium-stage"
            style={{
              scale: reducedMotion ? 1 : stageScale,
              y: reducedMotion ? 0 : stageY,
              rotateZ: reducedMotion ? 0 : velocityTilt,
            }}
          >
            <div className="premium-stage-chrome">
              <span>LIVE SYSTEM</span>
              <span className="premium-stage-dot" />
            </div>

            <svg className="premium-flow-svg" viewBox="0 0 820 520" aria-hidden="true">
              <FlowPath progress={progress} range={[0.12, 0.28]} d="M150 260 L245 260" />
              <FlowPath progress={progress} range={[0.36, 0.57]} d="M350 260 C410 260 425 145 485 145" />
              <FlowPath progress={progress} range={[0.38, 0.55]} d="M350 260 L485 260" muted />
              <FlowPath progress={progress} range={[0.4, 0.6]} d="M350 260 C410 260 425 375 485 375" />
              <FlowPath progress={progress} range={[0.62, 0.84]} d="M565 145 C635 145 640 260 695 260" />
              <FlowPath progress={progress} range={[0.64, 0.82]} d="M565 260 L695 260" muted />
              <FlowPath progress={progress} range={[0.66, 0.86]} d="M565 375 C635 375 640 260 695 260" />
            </svg>

            <motion.div
              className="premium-flow-node premium-token"
              style={{ x: reducedMotion ? 0 : tokenX, opacity: tokenOpacity }}
            >
              <span>INPUT</span>
              <strong>Prompt</strong>
            </motion.div>

            <motion.div
              className="premium-flow-node premium-router"
              style={{ scale: reducedMotion ? 1 : routerScale }}
            >
              <motion.i className="premium-router-glow" style={{ opacity: routerGlow }} />
              <span>ROUTER</span>
              <strong>Intent</strong>
            </motion.div>

            <ExpertNode progress={progress} start={0.39} label="A" selected className="expert-a" />
            <ExpertNode progress={progress} start={0.43} label="B" className="expert-b" />
            <ExpertNode progress={progress} start={0.47} label="C" selected className="expert-c" />

            <motion.div
              className="premium-flow-node premium-output"
              style={{ opacity: outputOpacity, x: reducedMotion ? 0 : outputX }}
            >
              <span>OUTPUT</span>
              <strong>Answer</strong>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function PremiumScrollyExample() {
  return (
    <PremiumScrolly lengthVh={560} className="premium-scrolly-demo">
      <PremiumStory />
    </PremiumScrolly>
  )
}
