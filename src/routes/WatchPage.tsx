import { Suspense, useCallback, useEffect, useState } from 'react'
import { VIDEO_TITLE, videoChapters } from '../videos/registry'
import './watch.css'

function startAt() {
  if (typeof window === 'undefined') return 0
  const wanted = Number(new URLSearchParams(window.location.search).get('section'))
  if (!Number.isFinite(wanted) || wanted < 1) return 0
  return Math.min(videoChapters.length, Math.trunc(wanted)) - 1
}

function writeSectionToUrl(section: number) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set('section', String(section))
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}

export default function WatchPage() {
  const [index, setIndex] = useState(startAt)
  const [turning, setTurning] = useState(false)
  const [chaptersOpen, setChaptersOpen] = useState(false)
  const chapter = videoChapters[index]
  const params = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search)
  const chrome = params?.get('chrome') !== '0'
  const autoplay = params?.get('play') === '1'

  useEffect(() => {
    document.title = VIDEO_TITLE
  }, [])

  const moveTo = useCallback(
    (wanted: number) => {
      const safe = Math.max(0, Math.min(videoChapters.length - 1, wanted))
      if (safe === index) {
        setChaptersOpen(false)
        return
      }
      setTurning(true)
      window.setTimeout(() => {
        setIndex(safe)
        writeSectionToUrl(safe + 1)
        setTurning(false)
        setChaptersOpen(false)
      }, 420)
    },
    [index],
  )

  const next = useCallback(() => {
    if (index >= videoChapters.length - 1) return
    moveTo(index + 1)
  }, [index, moveTo])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setChaptersOpen(false)
        return
      }
      if (chaptersOpen) return
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        next()
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        moveTo(index - 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [chaptersOpen, index, moveTo, next])

  const Current = chapter.component

  return (
    <div className="w-page" data-turning={turning ? 'true' : undefined}>
      <Suspense fallback={<div className="w-blank" />}>
        <Current key={chapter.n} onFinish={next} autoplay={autoplay} />
      </Suspense>

      {chrome ? (
        <>
          <button
            className="w-guide-button"
            type="button"
            aria-expanded={chaptersOpen}
            aria-controls="w-chapter-panel"
            onClick={() => setChaptersOpen((open) => !open)}
          >
            §{chapter.n}/{videoChapters.length} · Chapters
          </button>

          {chaptersOpen ? (
            <button
              className="w-guide-backdrop"
              type="button"
              aria-label="Close chapter list"
              onClick={() => setChaptersOpen(false)}
            />
          ) : null}

          <aside id="w-chapter-panel" className="w-chapter-panel" data-open={chaptersOpen ? 'true' : undefined}>
            <div className="w-chapter-panel-head">
              <span>{VIDEO_TITLE}</span>
              <button type="button" onClick={() => setChaptersOpen(false)} aria-label="Close chapters">
                ×
              </button>
            </div>
            <ol>
              {videoChapters.map((item, wanted) => (
                <li key={item.n}>
                  <button
                    type="button"
                    data-active={wanted === index ? 'true' : undefined}
                    aria-current={wanted === index ? 'step' : undefined}
                    onClick={() => moveTo(wanted)}
                  >
                    <span>{String(item.n).padStart(2, '0')}</span>
                    <strong>{item.title}</strong>
                  </button>
                </li>
              ))}
            </ol>
          </aside>
        </>
      ) : null}
    </div>
  )
}
