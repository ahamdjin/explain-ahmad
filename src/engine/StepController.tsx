import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type StepContextValue = {
  step: number
  maxStep: number
  next: () => void
  previous: () => void
  reset: () => void
  goTo: (step: number) => void
}

const StepContext = createContext<StepContextValue | null>(null)

type StepControllerProps = {
  maxStep: number
  children: ReactNode
  keyboard?: boolean
  initialStep?: number
}

export function StepController({
  maxStep,
  children,
  keyboard = true,
  initialStep = 0,
}: StepControllerProps) {
  const [step, setStep] = useState(() => Math.min(Math.max(initialStep, 0), maxStep))

  const goTo = (nextStep: number) => {
    setStep(Math.min(Math.max(nextStep, 0), maxStep))
  }

  const next = () => setStep((current) => Math.min(current + 1, maxStep))
  const previous = () => setStep((current) => Math.max(current - 1, 0))
  const reset = () => setStep(0)

  useEffect(() => {
    if (!keyboard) return

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return

      if (event.key === ' ' || event.key === 'ArrowRight') {
        event.preventDefault()
        next()
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        previous()
      }
      if (event.key === 'Home') {
        event.preventDefault()
        reset()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [keyboard, maxStep])

  const value = useMemo(
    () => ({ step, maxStep, next, previous, reset, goTo }),
    [step, maxStep],
  )

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>
}

export function useStep() {
  const context = useContext(StepContext)
  if (!context) throw new Error('useStep must be used inside StepController')
  return context
}
