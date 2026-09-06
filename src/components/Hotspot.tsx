import type { ButtonHTMLAttributes } from 'react'

type HotspotProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label: string
  x: number
  y: number
  active?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}

/**
 * A local inspectable point for diagrams, images and screenshots.
 * The label stays out of the way until hover/focus unless the hotspot is active.
 */
export function Hotspot({ label, x, y, active = false, side = 'top', className = '', ...props }: HotspotProps) {
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      className={`explanation-hotspot ${className}`.trim()}
      data-active={active ? 'true' : undefined}
      data-side={side}
      style={{ left: `${x}%`, top: `${y}%`, ...props.style }}
      aria-label={props['aria-label'] ?? label}
      aria-pressed={props['aria-pressed'] ?? active}
    >
      <span className="explanation-hotspot-dot" aria-hidden="true" />
      <span className="explanation-hotspot-label">{label}</span>
    </button>
  )
}
