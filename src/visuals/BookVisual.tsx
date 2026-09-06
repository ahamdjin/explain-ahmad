import { type CSSProperties, type ReactNode } from 'react'
import './book-visual.css'

type BookVisualProps = {
  state?: 'closed' | 'open'
  title?: string
  subtitle?: string
  leftPage?: ReactNode
  rightPage?: ReactNode
  accent?: string
  className?: string
  label?: string
}

export function BookVisual({
  state = 'closed',
  title,
  subtitle,
  leftPage,
  rightPage,
  accent = '#c58d55',
  className = '',
  label = title ? `${title} book` : 'Book',
}: BookVisualProps) {
  const style = { '--book-accent': accent } as CSSProperties

  if (state === 'open') {
    return (
      <div
        className={`book-visual book-visual-open ${className}`.trim()}
        style={style}
        role="img"
        aria-label={label}
      >
        <div className="book-visual-underlay" aria-hidden="true" />
        <div className="book-visual-page book-visual-page-left">{leftPage}</div>
        <div className="book-visual-gutter" aria-hidden="true" />
        <div className="book-visual-page book-visual-page-right">{rightPage}</div>
        <div className="book-visual-page-edge" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div
      className={`book-visual book-visual-closed ${className}`.trim()}
      style={style}
      role="img"
      aria-label={label}
    >
      <div className="book-visual-pages" aria-hidden="true" />
      <div className="book-visual-spine" aria-hidden="true" />
      <div className="book-visual-cover">
        <div className="book-visual-cover-frame" aria-hidden="true" />
        <div className="book-visual-cover-copy">
          {title && <strong>{title}</strong>}
          {subtitle && <small>{subtitle}</small>}
        </div>
      </div>
      <div className="book-visual-ribbon" aria-hidden="true" />
    </div>
  )
}
