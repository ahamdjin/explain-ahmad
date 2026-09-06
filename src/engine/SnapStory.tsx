import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

type SnapStoryContextValue = {
  index: number
  count: number
  goTo: (index: number) => void
  next: () => void
  previous: () => void
}

const SnapStoryContext = createContext<SnapStoryContextValue | null>(null)

type SnapStoryProps = {
  children: ReactNode
  initialIndex?: number
  className?: string
  keyboard?: boolean
}

export function SnapStory({ children, initialIndex = 0, className = '', keyboard = true }: SnapStoryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const slides = Array.isArray(children) ? children : [children]
  const count = slides.length
  const [index, setIndex] = useState(Math.min(initialIndex, Math.max(0, count - 1)))

  const goTo = useCallback((nextIndex: number) => {
    const target = Math.max(0, Math.min(count - 1, nextIndex))
    setIndex(target)
    const root = rootRef.current
    const slide = root?.querySelector<HTMLElement>(`[data-snap-index="${target}"]`)
    slide?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [count])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const previous = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (!keyboard) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
        event.preventDefault()
        next()
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        previous()
      }
    }
    window.addEventListener('keydown', onKey, { passive: false })
    return () => window.removeEventListener('keydown', onKey)
  }, [keyboard, next, previous])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver((entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!active) return
      const nextIndex = Number((active.target as HTMLElement).dataset.snapIndex)
      if (!Number.isNaN(nextIndex)) setIndex(nextIndex)
    }, { root, threshold: [0.55, 0.72, 0.9] })

    root.querySelectorAll('[data-snap-index]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [count])

  const value = useMemo(() => ({ index, count, goTo, next, previous }), [index, count, goTo, next, previous])

  return (
    <SnapStoryContext.Provider value={value}>
      <div ref={rootRef} className={`snap-story ${className}`.trim()}>
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} className="snap-story-section" data-snap-index={slideIndex}>
            {slide}
          </div>
        ))}
      </div>
    </SnapStoryContext.Provider>
  )
}

export function useSnapStory() {
  const context = useContext(SnapStoryContext)
  if (!context) throw new Error('useSnapStory must be used inside SnapStory')
  return context
}
