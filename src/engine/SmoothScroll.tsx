import { type ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: 0.085,
    })

    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
