import { createContext, type CSSProperties, type ReactNode, useCallback, useContext, useMemo, useState } from 'react'

type Direction = 'forward' | 'back'

type SceneDeckContextValue = {
  index: number
  count: number
  transitionTo: (index: number) => void
  next: () => void
  previous: () => void
}

const SceneDeckContext = createContext<SceneDeckContextValue | null>(null)

type SceneDeckProps = {
  children: ReactNode
  initialIndex?: number
  className?: string
}

type TransitionDocument = Document & {
  startViewTransition?: (options: (() => void) | { update: () => void; types?: string[] }) => { finished: Promise<void> }
}

export function SceneDeck({ children, initialIndex = 0, className = '' }: SceneDeckProps) {
  const scenes = Array.isArray(children) ? children : [children]
  const count = scenes.length
  const [index, setIndex] = useState(Math.min(initialIndex, Math.max(0, count - 1)))
  const [direction, setDirection] = useState<Direction>('forward')

  const transitionTo = useCallback((nextIndex: number) => {
    const target = Math.max(0, Math.min(count - 1, nextIndex))
    if (target === index) return
    const nextDirection: Direction = target > index ? 'forward' : 'back'
    setDirection(nextDirection)

    const doc = document as TransitionDocument
    if (doc.startViewTransition) {
      doc.startViewTransition({
        update: () => setIndex(target),
        types: [`scene-${nextDirection}`],
      })
      return
    }
    setIndex(target)
  }, [count, index])

  const next = useCallback(() => transitionTo(index + 1), [index, transitionTo])
  const previous = useCallback(() => transitionTo(index - 1), [index, transitionTo])
  const value = useMemo(() => ({ index, count, transitionTo, next, previous }), [index, count, transitionTo, next, previous])

  return (
    <SceneDeckContext.Provider value={value}>
      <div className={`scene-deck ${className}`.trim()} data-scene-direction={direction}>
        {scenes[index]}
      </div>
    </SceneDeckContext.Provider>
  )
}

export function useSceneDeck() {
  const context = useContext(SceneDeckContext)
  if (!context) throw new Error('useSceneDeck must be used inside SceneDeck')
  return context
}

type SharedElementProps = {
  name: string
  children: ReactNode
  className?: string
}

export function SharedElement({ name, children, className = '' }: SharedElementProps) {
  return (
    <div
      className={`shared-element ${className}`.trim()}
      style={{ viewTransitionName: name } as CSSProperties}
    >
      {children}
    </div>
  )
}
