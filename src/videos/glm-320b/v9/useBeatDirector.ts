import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BEATS, beatAt, chapterAt } from './story'

const DEFAULT_LOCK_MS = 430
const WHEEL_THRESHOLD = 48

/**
 * Some beats communicate cause through motion and need enough protected time to finish.
 * Prediction beats also get a deliberate thinking pause before the answer can replace them.
 */
const BEAT_HOLD_MS: Partial<Record<number, number>> = {
  14: 760,
  17: 1450,
  18: 520,
  20: 900,
  22: 720,
  24: 620,
  27: 720,
  30: 1100,
  33: 920,
  37: 820,
  39: 920,
  43: 900,
  44: 720,
  45: 760,
  46: 700,
  47: 1400,
  49: 650,
  50: 900,
  53: 850,
  54: 680,
  55: 620,
  56: 620,
  58: 620,
  60: 820,
  61: 700,
  63: 720,
  66: 820,
  67: 720,
  72: 760,
  73: 1400,
  74: 760,
  76: 680,
  77: 650,
  79: 760,
  81: 820,
  82: 720,
  83: 680,
  85: 820,
  86: 850,
  92: 3000,
  94: 1400,
  96: 700,
  97: 620,
  98: 760,
  99: 2200,
  100: 1100,
}

function holdForBeat(beatNumber: number) {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 180
  return BEAT_HOLD_MS[beatNumber] ?? DEFAULT_LOCK_MS
}

export function useBeatDirector() {
  const [index, setIndex] = useState(0)
  const lockUntil = useRef(0)
  const wheelTotal = useRef(0)
  const wheelReset = useRef<number | null>(null)

  const move = useCallback((delta: number, force = false) => {
    const now = performance.now()
    if (!force && now < lockUntil.current) return

    setIndex((current) => {
      const nextIndex = Math.max(0, Math.min(BEATS.length - 1, current + delta))
      lockUntil.current = now + holdForBeat(nextIndex + 1)
      return nextIndex
    })
  }, [])

  const next = useCallback(() => move(1), [move])
  const previous = useCallback(() => move(-1), [move])
  const jump = useCallback((beatNumber: number) => {
    lockUntil.current = performance.now() + holdForBeat(beatNumber)
    setIndex(Math.max(0, Math.min(BEATS.length - 1, beatNumber - 1)))
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault()
        next()
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        previous()
      }
      if (event.key === 'Home') {
        event.preventDefault()
        jump(1)
      }
      if (event.key === 'End') {
        event.preventDefault()
        jump(BEATS.length)
      }
    }

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return
      event.preventDefault()
      wheelTotal.current += event.deltaY
      if (wheelReset.current) window.clearTimeout(wheelReset.current)
      wheelReset.current = window.setTimeout(() => { wheelTotal.current = 0 }, 160)
      if (Math.abs(wheelTotal.current) < WHEEL_THRESHOLD) return
      const direction = wheelTotal.current > 0 ? 1 : -1
      wheelTotal.current = 0
      move(direction)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('wheel', onWheel)
      if (wheelReset.current) window.clearTimeout(wheelReset.current)
    }
  }, [jump, move, next, previous])

  const beat = beatAt(index)
  const chapter = chapterAt(index)
  const progress = (index + 1) / BEATS.length
  const chapterProgress = useMemo(() => {
    const length = chapter.end - chapter.start + 1
    return (index + 2 - chapter.start) / length
  }, [chapter, index])

  return {
    index,
    beat,
    chapter,
    progress,
    chapterProgress: Math.max(0, Math.min(1, chapterProgress)),
    next,
    previous,
    jump,
    canPrevious: index > 0,
    canNext: index < BEATS.length - 1,
  }
}
