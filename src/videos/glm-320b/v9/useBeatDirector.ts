import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BEATS, beatAt, chapterAt } from './story'

const LOCK_MS = 430
const WHEEL_THRESHOLD = 48

export function useBeatDirector() {
  const [index, setIndex] = useState(0)
  const lockUntil = useRef(0)
  const wheelTotal = useRef(0)
  const wheelReset = useRef<number | null>(null)

  const move = useCallback((delta: number, force = false) => {
    const now = performance.now()
    if (!force && now < lockUntil.current) return
    lockUntil.current = now + LOCK_MS
    setIndex((current) => Math.max(0, Math.min(BEATS.length - 1, current + delta)))
  }, [])

  const next = useCallback(() => move(1), [move])
  const previous = useCallback(() => move(-1), [move])
  const jump = useCallback((beatNumber: number) => {
    lockUntil.current = performance.now() + LOCK_MS
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
