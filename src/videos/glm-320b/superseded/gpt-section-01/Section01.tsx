import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { usePresenterMode } from '../../../../engine/PresenterMode'
import { BEATS, RUNTIME_SECONDS } from './beats'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'
import './section-01.css'

function initialIndex() {
  const params = new URLSearchParams(window.location.search)
  const value = Number(params.get('beat') ?? params.get('frame') ?? 1)
  return Number.isFinite(value) ? Math.min(BEATS.length - 1, Math.max(0, Math.trunc(value) - 1)) : 0
}
export default function GptSection01() {
  const [index, setIndex] = useState(initialIndex)
  const [playing, setPlaying] = useState(false)
  const [notes, setNotes] = useState(new URLSearchParams(window.location.search).get('notes') === '1')
  const reduced = useReducedMotion()
  const { presenting } = usePresenterMode()
  const lockUntil = useRef(0)
  const beat = BEATS[index]
  const go = useCallback((next: number, manual = true) => {
    if (manual) setPlaying(false)
    setIndex(Math.max(0, Math.min(BEATS.length - 1, next)))
  }, [])
  const move = useCallback((delta: number) => {
    if (performance.now() < lockUntil.current) return
    lockUntil.current = performance.now() + (reduced ? 80 : 800)
    setPlaying(false)
    setIndex(current => Math.max(0, Math.min(BEATS.length - 1, current + delta)))
  }, [reduced])
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set('beat', String(index + 1))
    params.delete('frame')
    window.history.replaceState(null, '', `${window.location.pathname}?${params}`)
  }, [index])
  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      if (index === BEATS.length - 1) setPlaying(false)
      else go(index + 1, false)
    }, beat.secs * 1000)
    return () => window.clearTimeout(timer)
  }, [beat.secs, go, index, playing])
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.closest('input,textarea,select,button,a,[contenteditable=true]') || event.repeat) return
      if (['ArrowRight', ' ', 'PageDown', 'ArrowLeft', 'PageUp', 'Home', 'End'].includes(event.key)) event.preventDefault()
      if (['ArrowRight', ' ', 'PageDown'].includes(event.key)) move(1)
      if (['ArrowLeft', 'PageUp'].includes(event.key)) move(-1)
      if (event.key === 'Home') go(0)
      if (event.key === 'End') go(BEATS.length - 1)
      if (event.key.toLowerCase() === 'n' && !presenting) setNotes(value => !value)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, move, presenting])
  return (
    <MotionConfig reducedMotion="user">
      <main className="g1-page" data-beat={index + 1} data-presenting={presenting}>
        <div className="g1-viewport">
          <div className="g1-frame" onClick={() => move(1)}>
            <Stage beat={index + 1} reduced={Boolean(reduced)} />
            <span className="g1-sr" aria-live="polite">{index + 1}. {beat.title}. {beat.vo}</span>
          </div>
        </div>
        {!presenting ? (
          <>
            <nav className="g1-review" aria-label="Storyboard controls">
              <Link to="/section-01">Original ↗</Link>
              <span className="g1-review-name">GPT SECTION 1</span>
              <button onClick={() => move(-1)} disabled={index === 0} aria-label="Previous beat">←</button>
              <select aria-label="Jump to beat" value={index} onChange={event => go(Number(event.target.value))}>
                {BEATS.map((item, i) => <option value={i} key={item.id}>{String(i + 1).padStart(2, '0')} · {item.title}</option>)}
              </select>
              <button onClick={() => move(1)} disabled={index === BEATS.length - 1} aria-label="Next beat">→</button>
              <button onClick={() => { if (index === BEATS.length - 1) go(0); setPlaying(value => !value) }} aria-pressed={playing}>{playing ? 'Pause' : 'Play'}</button>
              <button onClick={() => setNotes(value => !value)} aria-pressed={notes}>Script</button>
              <small>{Math.floor(RUNTIME_SECONDS / 60)}:{String(RUNTIME_SECONDS % 60).padStart(2, '0')} · P to present</small>
            </nav>
            {notes ? <aside className="g1-script"><b>{index + 1} / {BEATS.length} · {beat.title} · {beat.secs}s</b><p>{beat.vo}</p><small>{beat.learn}</small><em>Timed visual playback · no recorded voiceover</em></aside> : null}
          </>
        ) : null}
      </main>
    </MotionConfig>
  )
}
