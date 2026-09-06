import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { loadGsapObserver } from './OptionalMotion'

type GesturePagerContextValue = {
  index: number
  count: number
  next: () => void
  previous: () => void
  goTo: (index: number) => void
}

const GesturePagerContext = createContext<GesturePagerContextValue | null>(null)

type GesturePagerProps = {
  children: ReactNode
  className?: string
  lockMs?: number
}

export function GesturePager({ children, className = '', lockMs = 760 }: GesturePagerProps) {
  const pages = Array.isArray(children) ? children : [children]
  const count = pages.length
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const indexRef = useRef(0)
  const busyRef = useRef(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => { indexRef.current = index }, [index])

  const goTo = useCallback((nextIndex: number) => {
    if (busyRef.current) return
    const target = Math.max(0, Math.min(count - 1, nextIndex))
    if (target === indexRef.current) return
    setDirection(target > indexRef.current ? 1 : -1)
    busyRef.current = true
    setIndex(target)
    window.setTimeout(() => { busyRef.current = false }, lockMs)
  }, [count, lockMs])

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo])
  const previous = useCallback(() => goTo(indexRef.current - 1), [goTo])

  useEffect(() => {
    let observer: { kill: () => void } | undefined
    let cancelled = false

    void loadGsapObserver().then(({ Observer }) => {
      if (cancelled || !rootRef.current) return
      observer = Observer.create({
        target: rootRef.current,
        type: 'wheel,touch,pointer',
        preventDefault: true,
        tolerance: 34,
        dragMinimum: 18,
        onDown: next,
        onUp: previous,
      })
    })

    return () => {
      cancelled = true
      observer?.kill()
    }
  }, [next, previous])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const onKey = (event: KeyboardEvent) => {
      if (!root.matches(':hover') && document.activeElement !== root) return
      if (['ArrowDown', 'ArrowRight', ' ', 'PageDown'].includes(event.key)) {
        event.preventDefault()
        next()
      }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        previous()
      }
    }
    window.addEventListener('keydown', onKey, { passive: false })
    return () => window.removeEventListener('keydown', onKey)
  }, [next, previous])

  const value = useMemo(() => ({ index, count, next, previous, goTo }), [index, count, next, previous, goTo])

  return (
    <GesturePagerContext.Provider value={value}>
      <div ref={rootRef} tabIndex={0} className={`gesture-pager ${className}`.trim()} data-direction={direction}>
        {pages.map((page, pageIndex) => {
          const relation = pageIndex === index ? 'active' : pageIndex < index ? 'before' : 'after'
          return (
            <section key={pageIndex} className={`gesture-page is-${relation}`} aria-hidden={pageIndex !== index}>
              {page}
            </section>
          )
        })}
      </div>
    </GesturePagerContext.Provider>
  )
}

export function useGesturePager() {
  const context = useContext(GesturePagerContext)
  if (!context) throw new Error('useGesturePager must be used inside GesturePager')
  return context
}
