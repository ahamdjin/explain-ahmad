import type { ReactNode } from 'react'
import { StepController, useStep } from './StepController'

type SequenceState = ReturnType<typeof useStep>

type SequenceProps = {
  totalSteps: number
  children: (state: SequenceState) => ReactNode
  keyboard?: boolean
  initialStep?: number
}

function SequenceRenderer({ children }: { children: (state: SequenceState) => ReactNode }) {
  const state = useStep()
  return <>{children(state)}</>
}

export function Sequence({
  totalSteps,
  children,
  keyboard = true,
  initialStep = 0,
}: SequenceProps) {
  if (totalSteps < 1) throw new Error('Sequence requires at least one step')

  return (
    <StepController
      maxStep={totalSteps - 1}
      keyboard={keyboard}
      initialStep={initialStep}
    >
      <SequenceRenderer>{children}</SequenceRenderer>
    </StepController>
  )
}

export function Beat({
  at,
  persist = true,
  children,
  className = '',
}: {
  at: number
  persist?: boolean
  children: ReactNode
  className?: string
}) {
  const { step } = useStep()
  const visible = persist ? step >= at : step === at

  return (
    <div className={`sequence-beat ${visible ? 'is-visible' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
