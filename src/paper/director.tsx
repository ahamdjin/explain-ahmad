import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { PaperDefs } from './ink'
import { FEEL, HOLD, type Feel, type Relation } from './motion'
import { Overlays, type Overlay } from './overlays'
import './paper.css'

/**
 * Click-to-advance scrollytelling, shared by every section.
 *
 * The frames the viewer stops on are the product; the transitions between them
 * matter far less. Scene state is every completed beat merged together, plus
 * the stages of the current beat that have come due -- so actors persist by
 * default and reveals arrive in sequence rather than all at once.
 *
 * Promoted out of section-01 rather than copied: a copied director is eight
 * directors that will drift. See skills/ASSET_LIBRARY.md.
 */

/** A beat's commands are opaque here; each section's `apply` understands them. */
export type Beat<P> = {
  n: number
  id: string
  title: string
  /** What is said over this beat. Notes on screen must never transcribe it. */
  vo: string
  /** What this beat IS in the story. Drives motion feel and hold time. */
  relation: Relation
  /** Seconds this beat holds in the recorded cut. */
  secs: number
  commands: P[]
  /** Fires later, on a timeline, so one beat can teach in sequence. */
  stages?: { at: number; commands: P[] }[]
  overlays?: Overlay[]
  /** Held back until `at` ms, so a label can arrive after its object. */
  lateOverlays?: { at: number; overlays: Overlay[] }
  /** Drops every sticky overlay carried in from earlier beats. */
  clearSticky?: boolean
}

export function holdFor<P>(beat: Beat<P>) {
  const staged = beat.stages?.length ? Math.max(...beat.stages.map((stage) => stage.at)) : 0
  return HOLD[beat.relation] + staged
}

/** Longest staged offset, so the recorder knows how long a beat really needs. */
export function stageSpan<P>(beat: Beat<P>) {
  const stages = beat.stages?.map((stage) => stage.at) ?? []
  const late = beat.lateOverlays ? [beat.lateOverlays.at] : []
  const all = [...stages, ...late]
  return all.length ? Math.max(...all) : 0
}

export function runtimeSeconds<P>(beats: Beat<P>[]) {
  return beats.reduce((total, beat) => total + beat.secs, 0)
}

function initialIndex(count: number) {
  if (typeof window === 'undefined') return 0
  const requested = Number(new URLSearchParams(window.location.search).get('beat'))
  if (!Number.isFinite(requested) || requested < 1) return 0
  return Math.min(count, Math.trunc(requested)) - 1
}

export function SectionRunner<S, P>({
  beats,
  initial,
  apply,
  label,
  children,
}: {
  beats: Beat<P>[]
  initial: S
  apply: (base: S, patches: P[]) => S
  label: string
  children: (scene: S, feel: Feel) => ReactNode
}) {
  const [index, setIndex] = useState(() => initialIndex(beats.length))
  const lockUntil = useRef(0)
  const beat = beats[index]

  /** How far into the current beat we are, so staged reveals fire in order. */
  const [elapsed, setElapsed] = useState(Number.POSITIVE_INFINITY)

  const scene = useMemo(() => {
    const previous = beats.slice(0, index).flatMap((item) => [
      ...item.commands,
      ...(item.stages ?? []).flatMap((stage) => stage.commands),
    ])
    const due = (beat.stages ?? []).filter((stage) => stage.at <= elapsed).flatMap((stage) => stage.commands)
    return apply(initial, [...previous, ...beat.commands, ...due])
  }, [apply, beat, beats, index, initial, elapsed])

  /** Restart the beat clock on every move; stepping back skips the staging. */
  useEffect(() => {
    /*
     * lateOverlays must be included. The clock previously stopped after the
     * last *stage*, so any annotation scheduled past that point silently never
     * appeared -- which suppressed the question on several beats, including the
     * one a whole section built to.
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

  const move = useCallback(
    (delta: number) => {
      const now = performance.now()
      if (now < lockUntil.current) return
      setIndex((current) => {
        const next = Math.max(0, Math.min(beats.length - 1, current + delta))
        lockUntil.current = now + holdFor(beats[next])
        return next
      })
    },
    [beats],
  )

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

  /** Overlays carried in from earlier beats, until a beat clears the carry. */
  const sticky = useMemo(() => {
    const since = beats.slice(0, index + 1).reduce((from, item, at) => (item.clearSticky ? at : from), 0)
    return beats.slice(since, index).flatMap((item) => [
      ...(item.overlays ?? []).filter((overlay) => overlay.sticky),
      ...(item.lateOverlays?.overlays ?? []).filter((overlay) => overlay.sticky),
    ])
  }, [beats, index])

  const debug =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1'

  return (
    <div className="s1-page" role="application" aria-label={label}>
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
          {children(scene, FEEL[beat.relation])}
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
                {beat.n}/{beats.length} · {beat.id} · {beat.relation} · {beat.secs}s
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
 * Every actor lives in a persistent slot. Beats animate left/top/scale; slots
 * are never unmounted, so objects move instead of being rebuilt.
 *
 * Nothing may wrap these in AnimatePresence keyed on the beat. That was the
 * original mistake: it made every beat a slide replacement, and no amount of
 * easing work can make a slideshow feel like one continuous world.
 */
export { Slot } from './slot'
