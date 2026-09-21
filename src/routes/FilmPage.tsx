import { Suspense, useCallback, useEffect, useState, type ComponentType, type LazyExoticComponent } from 'react'
import './watch.css'

export type FilmSectionProps = {
  onFinish?: () => void
  autoplay?: boolean
}

export type FilmChapter = {
  n: number
  slug: string
  title: string
  component: LazyExoticComponent<ComponentType<FilmSectionProps>>
}

function startAt(chapters: FilmChapter[]) {
  if (typeof window === 'undefined') return 0
  const wanted = Number(new URLSearchParams(window.location.search).get('section'))
  if (!Number.isFinite(wanted) || wanted < 1) return 0
  return Math.min(chapters.length, Math.trunc(wanted)) - 1
}

function writeSectionToUrl(section: number) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set('section', String(section))
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}

/**
 * One film, played end to end: the sections are the same components the
 * `/section-NN` routes mount, handed an `onFinish` that turns the page.
 */
export default function FilmPage({ title, chapters }: { title: string; chapters: FilmChapter[] }) {
  const [index, setIndex] = useState(() => startAt(chapters))
  const [turning, setTurning] = useState(false)
  const [chaptersOpen, setChaptersOpen] = useState(false)
  const chapter = chapters[index]
  const params = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search)
  const chrome = params?.get('chrome') !== '0'
  const autoplay = params?.get('play') === '1'

  useEffect(() => {
    document.title = title
  }, [title])

  const moveTo = useCallback(
    (wanted: number) => {
      const safe = Math.max(0, Math.min(chapters.length - 1, wanted))
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
    [chapters.length, index],
  )

  const next = useCallback(() => {
    if (index >= chapters.length - 1) return
    moveTo(index + 1)
  }, [chapters.length, index, moveTo])

  /*
   * Arrow keys belong to the director: it steps beats, and calls `onFinish`
   * when ArrowRight lands past the last one. Handling them here as well made
   * every press turn a whole section. Escape is ours because the panel is.
   */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setChaptersOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

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
            §{chapter.n}/{chapters.length} · Chapters
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
              <span>{title}</span>
              <button type="button" onClick={() => setChaptersOpen(false)} aria-label="Close chapters">
                ×
              </button>
            </div>
            <ol>
              {chapters.map((item, wanted) => (
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
