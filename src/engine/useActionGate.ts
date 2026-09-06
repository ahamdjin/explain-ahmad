import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Prevents repeated clicks/keys from skipping across authored visual beats before
 * the previous choreography has settled. This is intentionally tiny and opt-in.
 */
export function useActionGate(durationMs = 360) {
  const [busy, setBusy] = useState(false)
  const busyRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null && typeof window !== 'undefined') {
      window.clearTimeout(timerRef.current)
    }
    timerRef.current = null
  }, [])

  const reset = useCallback(() => {
    clearTimer()
    busyRef.current = false
    setBusy(false)
  }, [clearTimer])

  const run = useCallback((action: () => void, overrideDurationMs?: number) => {
    if (busyRef.current) return false

    busyRef.current = true
    setBusy(true)
    action()

    if (typeof window === 'undefined') {
      busyRef.current = false
      setBusy(false)
      return true
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delay = reducedMotion
      ? Math.min(80, overrideDurationMs ?? durationMs)
      : (overrideDurationMs ?? durationMs)

    clearTimer()
    timerRef.current = window.setTimeout(() => {
      busyRef.current = false
      timerRef.current = null
      setBusy(false)
    }, Math.max(0, delay))

    return true
  }, [clearTimer, durationMs])

  useEffect(() => () => {
    clearTimer()
    busyRef.current = false
  }, [clearTimer])

  return { busy, run, reset }
}
