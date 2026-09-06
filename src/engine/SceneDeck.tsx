import { animateView, spring } from 'motion'
import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'

type Direction = 'forward' | 'back'

type SceneDeckContextValue = {
  index: number
  count: number
  direction: Direction
  transitioning: boolean
  canNext: boolean
  canPrevious: boolean
  transitionTo: (index: number) => void
  next: () => void
  previous: () => void
}

type ViewAnimationControls = {
  finished: Promise<unknown>
}

const SceneDeckContext = createContext<SceneDeckContextValue | null>(null)

type SceneDeckProps = {
  children: ReactNode
  initialIndex?: number
  className?: string
}

function sharedElementNames() {
  if (typeof document === 'undefined') return []
  return Array.from(document.querySelectorAll<HTMLElement>('[data-shared-element]'))
    .map((element) => element.dataset.sharedElement)
    .filter((name): name is string => Boolean(name))
    .filter((name, index, names) => names.indexOf(name) === index)
}

function escapeAttribute(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export function SceneDeck({ children, initialIndex = 0, className = '' }: SceneDeckProps) {
  const scenes = Array.isArray(children) ? children : [children]
  const count = scenes.length
  const [index, setIndex] = useState(Math.min(initialIndex, Math.max(0, count - 1)))
  const [direction, setDirection] = useState<Direction>('forward')
  const [transitioning, setTransitioning] = useState(false)

  const transitionTo = useCallback((nextIndex: number) => {
    const target = Math.max(0, Math.min(count - 1, nextIndex))
    if (target === index || transitioning) return

    const nextDirection: Direction = target > index ? 'forward' : 'back'
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setDirection(nextDirection)

    const commit = () => flushSync(() => setIndex(target))
    if (prefersReducedMotion || typeof document === 'undefined') {
      commit()
      return
    }

    const sharedNames = sharedElementNames()
    setTransitioning(true)

    try {
      const view = animateView(commit, {
        type: spring,
        duration: 0.68,
        bounce: 0.08,
      })

      view
        .old({ opacity: [1, 0.965] }, { duration: 0.18 })
        .new({ opacity: [0.965, 1] }, { duration: 0.24 })

      sharedNames.forEach((name) => {
        view
          .add(`[data-shared-element="${escapeAttribute(name)}"]`)
          .layout({ duration: 0.72 })
          .crop(false)
      })

      void (async () => {
        try {
          // Motion's builder is awaitable at runtime. Current package typings
          // narrow the chained builder incorrectly, so keep the cast at this
          // single integration boundary rather than weakening app-level types.
          const controls = await (view as unknown as Promise<ViewAnimationControls>)
          await controls.finished
        } finally {
          setTransitioning(false)
        }
      })()
    } catch {
      commit()
      setTransitioning(false)
    }
  }, [count, index, transitioning])

  const next = useCallback(() => transitionTo(index + 1), [index, transitionTo])
  const previous = useCallback(() => transitionTo(index - 1), [index, transitionTo])
  const canNext = !transitioning && index < count - 1
  const canPrevious = !transitioning && index > 0

  const value = useMemo(
    () => ({
      index,
      count,
      direction,
      transitioning,
      canNext,
      canPrevious,
      transitionTo,
      next,
      previous,
    }),
    [canNext, canPrevious, count, direction, index, next, previous, transitionTo, transitioning],
  )

  return (
    <SceneDeckContext.Provider value={value}>
      <div
        className={`scene-deck ${className}`.trim()}
        data-scene-direction={direction}
        data-transitioning={transitioning ? 'true' : undefined}
        aria-busy={transitioning || undefined}
      >
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
      data-shared-element={name}
    >
      {children}
    </div>
  )
}
