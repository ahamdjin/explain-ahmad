import { AnimatePresence, LayoutGroup, arc, motion, type HTMLMotionProps, useReducedMotion } from 'motion/react'
import { type ReactNode, useMemo } from 'react'
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
  curve?: number
}

export function ContinuityActor({
  id,
  children,
  className = '',
  transition,
  curve = 0.12,
  ...props
}: ContinuityActorProps) {
  const reducedMotion = useReducedMotion()
  const curvedPath = useMemo(
    () => (curve > 0 ? arc({ strength: curve }) : undefined),
    [curve],
  )

  return (
    <motion.div
      {...props}
      layout
      layoutId={id}
      className={`continuity-actor ${className}`.trim()}
      transition={
        transition ?? {
          layout: reducedMotion
            ? { duration: 0 }
            : {
                ...motionTokens.softSpring,
                ...(curvedPath ? { path: curvedPath } : {}),
              },
        }
      }
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
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {visible && (
        <motion.div
          key={id}
          layout
          layoutId={id}
          className={`continuity-actor ${className}`.trim()}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -6 }}
          transition={reducedMotion ? { duration: 0.12 } : motionTokens.softSpring}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
