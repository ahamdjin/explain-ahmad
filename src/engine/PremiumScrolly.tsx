import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react'
import {
  type MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from 'motion/react'
import { motionTokens } from '../motion/tokens'
import { MotionSystem } from './MotionSystem'

type PremiumScrollyContextValue = {
  progress: MotionValue<number>
  velocity: MotionValue<number>
  reducedMotion: boolean
}

const PremiumScrollyContext = createContext<PremiumScrollyContextValue | null>(null)

type PremiumScrollyProps = {
  children: ReactNode
  lengthVh?: number
  className?: string
}

function PremiumScrollyRuntime({
  children,
  lengthVh,
  className,
}: Required<Pick<PremiumScrollyProps, 'lengthVh' | 'className'>> & { children: ReactNode }) {
  const rootRef = useRef<HTMLElement | null>(null)
  const reducedMotion = Boolean(useReducedMotion())
  const { scrollYProgress, scrollY } = useScroll({
    target: rootRef,
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, motionTokens.scrollSpring)
  const rawVelocity = useVelocity(scrollY)
  const velocity = useSpring(rawVelocity, motionTokens.velocitySpring)

  const value = useMemo(
    () => ({ progress, velocity, reducedMotion }),
    [progress, velocity, reducedMotion],
  )

  return (
    <PremiumScrollyContext.Provider value={value}>
      <section
        ref={rootRef}
        className={`premium-scrolly ${className}`.trim()}
        style={{ height: `${lengthVh}vh` }}
      >
        <div className="premium-scrolly-sticky">{children}</div>
      </section>
    </PremiumScrollyContext.Provider>
  )
}

export function PremiumScrolly({
  children,
  lengthVh = 540,
  className = '',
}: PremiumScrollyProps) {
  return (
    <MotionSystem>
      <PremiumScrollyRuntime lengthVh={lengthVh} className={className}>
        {children}
      </PremiumScrollyRuntime>
    </MotionSystem>
  )
}

export function usePremiumScrolly() {
  const context = useContext(PremiumScrollyContext)
  if (!context) {
    throw new Error('usePremiumScrolly must be used inside PremiumScrolly')
  }
  return context
}
