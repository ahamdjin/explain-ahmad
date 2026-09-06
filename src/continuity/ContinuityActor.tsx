import { AnimatePresence, LayoutGroup, motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { motionTokens } from '../motion/tokens'

type ContinuityStageProps = {
  id: string
  children: ReactNode
  className?: string
}

export function ContinuityStage({ id, children, className = '' }: ContinuityStageProps) {
  return (
    <LayoutGroup id={id}>
      <div className={`continuity-stage ${className}`.trim()}>{children}</div>
    </LayoutGroup>
  )
}

type ContinuityActorProps = Omit<HTMLMotionProps<'div'>, 'layoutId'> & {
  id: string
  children: ReactNode
}

export function ContinuityActor({ id, children, className = '', transition, ...props }: ContinuityActorProps) {
  return (
    <motion.div
      {...props}
      layout
      layoutId={id}
      className={`continuity-actor ${className}`.trim()}
      transition={transition ?? { layout: motionTokens.softSpring }}
    >
      {children}
    </motion.div>
  )
}

type ActorPresenceProps = {
  id: string
  visible: boolean
  children: ReactNode
  className?: string
}

export function ActorPresence({ id, visible, children, className = '' }: ActorPresenceProps) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      {visible && (
        <motion.div
          key={id}
          layout
          layoutId={id}
          className={`continuity-actor ${className}`.trim()}
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={motionTokens.softSpring}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
