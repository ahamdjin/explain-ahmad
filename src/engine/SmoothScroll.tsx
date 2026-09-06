import { type ReactNode, useEffect } from 'react'
import 'lenis/dist/lenis.css'

type SmoothScrollProps = {
  children: ReactNode
  enabled?: boolean
  lerp?: number
  wheelMultiplier?: number
}

export function SmoothScroll({
  children,
  enabled = true,
  lerp = 0.085,
  wheelMultiplier = 1,
}: SmoothScrollProps) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let destroy: (() => void) | undefined

    void import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return

      const lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        lerp,
        wheelMultiplier,
      })

      destroy = () => lenis.destroy()
    })

    return () => {
      cancelled = true
      destroy?.()
    }
  }, [enabled, lerp, wheelMultiplier])

  return <>{children}</>
}
