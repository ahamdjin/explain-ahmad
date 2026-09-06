import { type ReactNode, useEffect, useRef } from 'react'
import { loadGsapSplitText } from '../engine/OptionalMotion'

type SplitRevealProps = {
  children: ReactNode
  className?: string
  active?: boolean
  mode?: 'lines' | 'words' | 'chars'
  stagger?: number
  yPercent?: number
}

type SplitInstance = {
  chars: Element[]
  words: Element[]
  lines: Element[]
  revert: () => void
}

export function SplitReveal({
  children,
  className = '',
  active = true,
  mode = 'words',
  stagger = 0.035,
  yPercent = 110,
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!active || !ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let split: SplitInstance | undefined
    let tween: { kill: () => void } | undefined
    let cancelled = false

    void loadGsapSplitText().then(({ gsap, SplitText }) => {
      if (cancelled || !ref.current) return
      split = SplitText.create(ref.current, {
        type: mode,
        mask: mode === 'lines' ? 'lines' : undefined,
        autoSplit: true,
        aria: 'auto',
      }) as SplitInstance

      const targets = mode === 'chars' ? split.chars : mode === 'lines' ? split.lines : split.words
      tween = gsap.fromTo(targets,
        { yPercent, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.72, stagger, ease: 'power3.out' },
      )
    })

    return () => {
      cancelled = true
      tween?.kill()
      split?.revert()
    }
  }, [active, mode, stagger, yPercent])

  return <div ref={ref} className={`split-reveal ${className}`.trim()}>{children}</div>
}
