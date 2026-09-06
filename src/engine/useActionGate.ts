import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Prevents repeated clicks/keys from skipping across authored visual beats before
 * the previous choreography has settled. This is intentionally tiny and opt-in.
 */
export function useActionGate(durationMs = 360) {
  const [busy, setBusy] = useState(false)
  const busyRef = useRef(false)
  const timerRef = useRef<number | null>(null)

  const reset = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = null
    busyRef.current = false
    setBusy(false)
  }, [])

  const run = useCallback((action: () => void, overrideDurationMs?: number) => {
    if (busyRef.current) return false

    busyRef.current = true
    setBusy(true)
    action()

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delay = reducedMotion ? Math.min(80, overrideDurationMs ?? durationMs) : (overrideDurationMs ?? durationMs)

    timerRef.current = window.setTimeout(() => {
      busyRef.current = false
      timerRef.current = null
      setBusy(false)
    }, Math.max(0, delay))

    return true
  }, [durationMs])

  useEffect(() => reset, [reset])

  return { busy, run, reset }
}
