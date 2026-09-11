import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GPT_TOTAL_BEATS, gptChapterAt } from './gptStory'

const DEFAULT_LOCK_MS = 420
const WHEEL_THRESHOLD = 48

const LONG_BEATS = new Set([12, 18, 27, 31, 39, 42, 49, 57, 62, 65, 70, 75, 80, 82, 86, 92, 96, 104, 107, 110, 120])

function holdForBeat(beat: number) {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 160
  return LONG_BEATS.has(beat) ? 760 : DEFAULT_LOCK_MS
}

export function useGptBeatDirector() {
  const [index, setIndex] = useState(0)
  const lockUntil = useRef(0)
  const wheelTotal = useRef(0)
  const wheelReset = useRef<number | null>(null)

  const move = useCallback((delta: number, force = false) => {
    const now = performance.now()
    if (!force && now < lockUntil.current) return
    setIndex((current) => {
      const next = Math.max(0, Math.min(GPT_TOTAL_BEATS - 1, current + delta))
      lockUntil.current = now + holdForBeat(next + 1)
      return next
    })
  }, [])

  const next = useCallback(() => move(1), [move])
  const previous = useCallback(() => move(-1), [move])
  const jump = useCallback((beat: number) => {
    const safe = Math.max(1, Math.min(GPT_TOTAL_BEATS, beat))
    lockUntil.current = performance.now() + holdForBeat(safe)
    setIndex(safe - 1)
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
      if (event.key === 'Home') { event.preventDefault(); jump(1) }
      if (event.key === 'End') { event.preventDefault(); jump(GPT_TOTAL_BEATS) }
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

  const beatNumber = index + 1
  const chapter = gptChapterAt(beatNumber)
  const chapterProgress = useMemo(() => (beatNumber - chapter.start + 1) / (chapter.end - chapter.start + 1), [beatNumber, chapter])

  return {
    index,
    beatNumber,
    chapter,
    progress: beatNumber / GPT_TOTAL_BEATS,
    chapterProgress,
    next,
    previous,
    jump,
    canPrevious: index > 0,
    canNext: index < GPT_TOTAL_BEATS - 1,
  }
}
