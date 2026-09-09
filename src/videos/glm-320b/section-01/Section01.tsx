import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BEATS, RUNTIME_SECONDS, holdFor } from './beats'
import { FEEL } from '../../../paper/motion'
import { Overlays } from './Overlays'
import { PaperDefs } from '../../../paper'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'
import '../../../paper/paper.css'

function initialIndex() {
  if (typeof window === 'undefined') return 0
  const requested = Number(new URLSearchParams(window.location.search).get('beat'))
  if (!Number.isFinite(requested) || requested < 1) return 0
  return Math.min(BEATS.length, Math.trunc(requested)) - 1
}

/**
 * Click-to-advance scrollytelling. The frames the viewer stops on are the
 * product; the transitions between them are secondary.
 *
 * Scene state is every completed beat merged together, plus the stages of the
 * current beat that have come due. Actors therefore persist by default and
 * reveals arrive in sequence rather than all at once. Nothing is ever removed
 * to make room -- the frame accumulates.
 */
export default function Section01() {
  const [index, setIndex] = useState(initialIndex)
  const lockUntil = useRef(0)
  const beat = BEATS[index]

  /** How far into the current beat we are, so staged reveals fire in order. */
  const [elapsed, setElapsed] = useState(Number.POSITIVE_INFINITY)

  const scene = useMemo(() => {
    const previous = BEATS.slice(0, index).flatMap((item) => [
      ...item.commands,
      ...(item.stages ?? []).flatMap((stage) => stage.commands),
    ])
    const due = (beat.stages ?? []).filter((stage) => stage.at <= elapsed).flatMap((stage) => stage.commands)
    return applyPatches(INITIAL, [...previous, ...beat.commands, ...due])
  }, [beat, index, elapsed])

  /** Restart the beat clock on every move; stepping back skips the staging. */
  useEffect(() => {
    /*
     * lateOverlays must be included. The clock previously stopped after the
     * last *stage*, so any annotation scheduled past that point silently never
     * appeared -- which suppressed the question on several beats, including
     * the one the whole section builds to.
     */
    const spans = [
      ...(beat.stages?.map((stage) => stage.at) ?? []),
      ...(beat.lateOverlays ? [beat.lateOverlays.at] : []),
    ]
    if (!spans.length) {
      setElapsed(Number.POSITIVE_INFINITY)
      return
    }
    setElapsed(0)
    const started = performance.now()
    let frame = requestAnimationFrame(function tick() {
      setElapsed(performance.now() - started)
      frame = requestAnimationFrame(tick)
    })
    const stop = setTimeout(() => cancelAnimationFrame(frame), Math.max(...spans) + 140)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(stop)
    }
  }, [beat])

  const move = useCallback((delta: number) => {
    const now = performance.now()
    if (now < lockUntil.current) return
    setIndex((current) => {
      const next = Math.max(0, Math.min(BEATS.length - 1, current + delta))
      lockUntil.current = now + holdFor(BEATS[next])
      return next
    })
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
        event.preventDefault()
        move(1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        move(-1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move])

  /**
   * Overlays carried in from earlier beats.
   *
   * Handwriting normally belongs to one moment, so a beat replaces the whole
   * set. But a few labels are measurements the next beat still argues from --
   * the weight on the building, for one -- and dropping those one beat after
   * they appear takes the following frame's point with it. Anything marked
   * sticky survives until a beat clears the carry.
   */
  const sticky = useMemo(() => {
    const since = BEATS.slice(0, index + 1).reduce(
      (from, item, at) => (item.clearSticky ? at : from),
      0,
    )
    return BEATS.slice(since, index).flatMap((item) => [
      ...(item.overlays ?? []).filter((overlay) => overlay.sticky),
      ...(item.lateOverlays?.overlays ?? []).filter((overlay) => overlay.sticky),
    ])
  }, [index])

  const params = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search)
  const debug = params?.get('debug') === '1'

  return (
    <div className="s1-page" role="application" aria-label="Why a 320B model uses about 18B active parameters">
      <PaperDefs />
      <div className="s1-viewport">
        <div
          className="s1-frame"
          onPointerUp={(event) => {
            const target = event.target as HTMLElement
            if (event.button !== 0 || target.closest('[data-no-advance]')) return
            move(1)
          }}
        >
          <Stage scene={scene} feel={FEEL[beat.relation]} />
          <Overlays
            overlays={[
              ...sticky,
              ...(beat.overlays ?? []),
              ...(beat.lateOverlays && beat.lateOverlays.at <= elapsed ? beat.lateOverlays.overlays : []),
            ]}
          />

          {debug ? (
            <div className="s1-debug">
              <b>
                {beat.n}/{BEATS.length} · {beat.id} · {beat.relation} · {beat.secs}s
              </b>
              <span>{beat.title}</span>
              <span>VO: {beat.vo}</span>
              <span>
                board runtime {Math.floor(RUNTIME_SECONDS / 60)}:
                {String(Math.round(RUNTIME_SECONDS % 60)).padStart(2, '0')}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
