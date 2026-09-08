import { useCallback, useEffect, useState } from 'react'
import { FRAMES, FrameStage } from './frames'
import { PaperDefs } from './paper'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'
import '@fontsource/caveat/600.css'
import './section-01.css'

function initialIndex() {
  if (typeof window === 'undefined') return 0
  const requested = Number(new URLSearchParams(window.location.search).get('frame'))
  if (!Number.isFinite(requested) || requested < 1) return 0
  return Math.min(FRAMES.length, Math.trunc(requested)) - 1
}

export default function Section01() {
  const [index, setIndex] = useState(initialIndex)
  const frame = FRAMES[index]

  const move = useCallback((delta: number) => {
    setIndex((current) => Math.max(0, Math.min(FRAMES.length - 1, current + delta)))
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

  const debug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1'

  return (
    <div
      className="s1-page"
      role="application"
      aria-label="Why a 320B model uses about 18B active parameters"
      onPointerUp={(event) => {
        if (event.button === 0) move(1)
      }}
    >
      <PaperDefs />
      <div className="s1-viewport">
        <div className="s1-frame">
          <FrameStage frame={frame} />
          {debug ? (
            <div className="s1-debug">
              <b>
                {frame.n}/{FRAMES.length} · {frame.id}
              </b>
              <span>{frame.title}</span>
              <span>VO: {frame.vo}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
