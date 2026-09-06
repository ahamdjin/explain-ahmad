import { type CSSProperties, type ReactNode } from 'react'
import './index-board.css'

type IndexBoardProps = {
  children?: ReactNode
  rows?: number
  label?: string
  className?: string
  ariaLabel?: string
}

export function IndexBoard({
  children,
  rows = 7,
  label = 'INDEX',
  className = '',
  ariaLabel = label,
}: IndexBoardProps) {
  const style = { '--index-rows': Math.max(2, rows) } as CSSProperties

  return (
    <div
      className={`index-board ${className}`.trim()}
      style={style}
      role="img"
      aria-label={ariaLabel}
    >
      <span className="index-board-tab" aria-hidden="true">{label}</span>
      <div className="index-board-content">{children}</div>
    </div>
  )
}
