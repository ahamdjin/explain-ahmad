import { useCallback, useEffect, useRef, useState } from 'react'
import { StoryboardStageV2, type Section01Frame } from './StoryboardStageV2'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'
import './storyboard-v2.css'

const LAST_FRAME = 14

function initialFrame(): Section01Frame {
  if (typeof window === 'undefined') return 1
  const requested = Number(new URLSearchParams(window.location.search).get('frame'))
  if (!Number.isFinite(requested)) return 1
  return Math.max(1, Math.min(LAST_FRAME, Math.trunc(requested))) as Section01Frame
}

export default function Section01() {
  const [frame, setFrame] = useState<Section01Frame>(initialFrame)
  const lockUntil = useRef(0)

  const move = useCallback((delta: number) => {
    const now = performance.now()
    if (now < lockUntil.current) return
    setFrame((current) => {
      const next = Math.max(1, Math.min(LAST_FRAME, current + delta)) as Section01Frame
      if (next !== current) lockUntil.current = now + 260
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
      if (/^[1-9]$/.test(event.key) && event.altKey) {
        const requested = Number(event.key)
        setFrame(Math.min(requested, LAST_FRAME) as Section01Frame)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move])

  return (
    <main className="s1v2-page" aria-label="Section 1: why a 320B MoE model uses a much smaller active path">
      <div className="s1v2-viewport">
        <div
          role="application"
          aria-label={`Storyboard frame ${frame} of ${LAST_FRAME}`}
          style={{ width: '100%', height: '100%' }}
          onPointerUp={(event) => {
            if (event.button !== 0) return
            move(1)
          }}
        >
          <StoryboardStageV2 frame={frame} />
        </div>
      </div>
    </main>
  )
}
