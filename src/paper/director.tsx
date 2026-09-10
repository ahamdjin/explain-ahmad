import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { PaperDefs } from './ink'
import { FEEL, HOLD, type Feel, type Relation } from './motion'
import { Overlays, type Overlay } from './overlays'
import { BeatRail } from './rail'
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

/** Cumulative start time of each beat, in seconds. The autoplay timeline. */
export function beatStarts<P>(beats: Beat<P>[]) {
  const starts: number[] = []
  let at = 0
  for (const beat of beats) {
    starts.push(at)
    at += beat.secs
  }
  return starts
}

/** Which beat owns a given moment. Used when audio is the master clock. */
export function beatAt<P>(beats: Beat<P>[], seconds: number) {
  const starts = beatStarts(beats)
  for (let i = starts.length - 1; i >= 0; i -= 1) if (seconds >= starts[i]) return i
  return 0
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
  onFinish,
  autoplay = false,
  audioSrc,
  children,
}: {
  beats: Beat<P>[]
  initial: S
  apply: (base: S, patches: P[]) => S
  label: string
  /** Advancing past the last beat. Used by the continuous player. */
  onFinish?: () => void
  /** Run on the timeline instead of on clicks. Space becomes pause. */
  autoplay?: boolean
  /**
   * A voice-over track. When present it becomes the **master clock** -- beats
   * follow the audio rather than a timer, so a beat can never drift out of
   * sync with the sentence it belongs to. Without it, `secs` drives.
   */
  audioSrc?: string
  children: (scene: S, feel: Feel) => ReactNode
}) {
  const [index, setIndex] = useState(() => initialIndex(beats.length))
  const lockUntil = useRef(0)
  /*
   * A mirror of `index`, so `move` can read the current beat without putting
   * the end-of-section check inside the state updater. React may run an
   * updater during the render phase, and calling the parent's onFinish from
   * in there is a setState-while-rendering -- it warns, and the update can be
   * dropped.
   */
  const indexRef = useRef(index)
  const beat = beats[index]

  useEffect(() => {
    indexRef.current = index
  }, [index])

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

  /**
   * Go straight to a beat.
   *
   * Bypasses `lockUntil` on purpose: that lock exists to stop a fast click
   * skipping past a reveal, and it has nothing to say about someone
   * deliberately aiming at beat 9. It also skips the staged reveals of every
   * beat in between, which is correct -- the scene is the merge of all
   * previous commands, so landing on a beat is landing on its end state.
   */
  const jump = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(beats.length - 1, next))
    lockUntil.current = 0
    indexRef.current = clamped
    setIndex(clamped)
  }, [beats.length])

  const move = useCallback(
    (delta: number) => {
      const now = performance.now()
      if (now < lockUntil.current) return

      if (delta > 0 && indexRef.current === beats.length - 1) {
        onFinish?.()
        return
      }

      const next = Math.max(0, Math.min(beats.length - 1, indexRef.current + delta))
      if (next === indexRef.current) return
      lockUntil.current = now + holdFor(beats[next])
      indexRef.current = next
      setIndex(next)
    },
    [beats, onFinish],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ' && autoplay) {
        event.preventDefault()
        setPaused((value) => !value)
        return
      }
      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
        event.preventDefault()
        move(1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        move(-1)
      }
      /* Back to the top of the section, and to its last beat. */
      if (event.key === 'Home') {
        event.preventDefault()
        jump(0)
      }
      if (event.key === 'End') {
        event.preventDefault()
        jump(beats.length - 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move, jump, beats.length, autoplay])

  /** Overlays carried in from earlier beats, until a beat clears the carry. */
  const sticky = useMemo(() => {
    const since = beats.slice(0, index + 1).reduce((from, item, at) => (item.clearSticky ? at : from), 0)
    return beats.slice(since, index).flatMap((item) => [
      ...(item.overlays ?? []).filter((overlay) => overlay.sticky),
      ...(item.lateOverlays?.overlays ?? []).filter((overlay) => overlay.sticky),
    ])
  }, [beats, index])

  /* ---- autoplay ---------------------------------------------------------
   * Clicking is the authored experience; autoplay exists so the piece can be
   * watched hands-free and recorded, and so a voice-over has something to
   * drive. Space pauses instead of advancing while it runs. */
  const [paused, setPaused] = useState(false)
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!autoplay || audioSrc) return
    if (paused) return
    if (index === beats.length - 1) {
      const end = setTimeout(() => onFinish?.(), beats[index].secs * 1000)
      return () => clearTimeout(end)
    }
    const next = setTimeout(() => {
      indexRef.current = index + 1
      lockUntil.current = 0
      setIndex(index + 1)
    }, beats[index].secs * 1000)
    return () => clearTimeout(next)
  }, [autoplay, audioSrc, paused, index, beats, onFinish])

  /* Audio, when there is any, owns the clock. */
  useEffect(() => {
    if (!autoplay || !audioSrc) return
    const el = new Audio(audioSrc)
    audio.current = el
    const onTime = () => {
      const wanted = beatAt(beats, el.currentTime)
      if (wanted !== indexRef.current) {
        indexRef.current = wanted
        lockUntil.current = 0
        setIndex(wanted)
      }
    }
    const onEnd = () => onFinish?.()
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('ended', onEnd)
    void el.play().catch(() => {
      /* Autoplay policies block sound until a gesture. The timeline still
       * runs, so a silent preview behaves; the user clicks once for audio. */
    })
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('ended', onEnd)
      el.pause()
      audio.current = null
    }
  }, [autoplay, audioSrc, beats, onFinish])

  useEffect(() => {
    const el = audio.current
    if (!el) return
    if (paused) el.pause()
    else void el.play().catch(() => {})
  }, [paused])

  const params = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search)
  const debug = params?.get('debug') === '1'
  /**
   * The rails are scaffolding for whoever is making the video, not part of it.
   * `chrome=0` takes them off for a recording, the same flag `/watch` uses for
   * its chapter label.
   */
  const chrome = params?.get('chrome') !== '0'

  return (
    <div className="s1-page" role="application" aria-label={label}>
      <PaperDefs />
      <div className="s1-viewport">
        <div
          className="s1-frame"
          onPointerUp={(event) => {
            const target = event.target as HTMLElement
            if (event.button !== 0 || target.closest('[data-no-advance]')) return
            if (autoplay) {
              setPaused((value) => !value)
              return
            }
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

          {autoplay && paused ? (
            <div className="s1-paused" data-no-advance>
              paused
            </div>
          ) : null}

          {chrome ? <BeatRail beats={beats} index={index} onPick={jump} /> : null}

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
