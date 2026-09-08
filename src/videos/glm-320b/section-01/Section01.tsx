import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BEATS, holdFor } from './beats'
import { Overlays } from './Overlays'
import { PaperDefs } from './paper'
import { ROUTES, applyPatches, INITIAL } from './scene'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'
import './section-01.css'

function initialIndex() {
  if (typeof window === 'undefined') return 0
  const requested = Number(new URLSearchParams(window.location.search).get('frame'))
  if (!Number.isFinite(requested) || requested < 1) return 0
  return Math.min(BEATS.length, Math.trunc(requested)) - 1
}

export default function Section01() {
  const [index, setIndex] = useState(initialIndex)
  const [route, setRoute] = useState<'scared' | 'calculate'>('scared')
  const [hasRouted, setHasRouted] = useState(false)
  const lockUntil = useRef(0)

  const beat = BEATS[index]

  /** Scene state is the merge of every beat up to here, so actors persist. */
  const scene = useMemo(() => {
    const patches = BEATS.slice(0, index + 1).flatMap((item) => item.commands)
    return applyPatches(INITIAL, patches)
  }, [index])

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
   * Which experts are lit. Only the routing experiment and the beats after it
   * show a selection, so earlier beats read as "all capacity, nothing chosen".
   */
  const selected = useMemo(() => {
    if (beat.n < 7) return []
    return ROUTES[route]
  }, [beat.n, route])

  const debug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1'

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
          <Stage scene={scene} selected={selected} />
          <Overlays overlays={beat.overlays ?? []} scene={scene} />

          {beat.interactive ? (
            <RouteControls
              route={route}
              onPick={(next) => {
                setRoute(next)
                setHasRouted(true)
              }}
              hasRouted={hasRouted}
            />
          ) : null}

          {debug ? (
            <div className="s1-debug">
              <b>
                {beat.n}/{BEATS.length} · {beat.id} · {beat.weight ?? 'normal'}
              </b>
              <span>{beat.title}</span>
              <span>VO: {beat.vo}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/**
 * The one place the viewer does something rather than advancing.
 *
 * The expert field does not change; only the routing does. Picking a word
 * re-lights a different top-8 in the same population, which is the lesson.
 */
function RouteControls({
  route,
  onPick,
  hasRouted,
}: {
  route: 'scared' | 'calculate'
  onPick: (route: 'scared' | 'calculate') => void
  hasRouted: boolean
}) {
  return (
    <div className="s1-route-controls" data-no-advance>
      {(['scared', 'calculate'] as const).map((word) => (
        <button
          key={word}
          type="button"
          className="s1-route-card"
          data-picked={route === word ? 'true' : undefined}
          onClick={() => onPick(word)}
        >
          &ldquo;{word}&rdquo;
        </button>
      ))}
      <span className="s1-route-hint">
        {hasRouted ? 'Same 288 experts. Different eight.' : 'Pick a word'}
      </span>
    </div>
  )
}
