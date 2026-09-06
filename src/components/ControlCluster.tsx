import type { ReactNode } from 'react'

type ControlClusterProps = {
  children: ReactNode
  label?: string
  surface?: 'bare' | 'paper'
  className?: string
}

/**
 * Groups controls beside the object they affect.
 * Bare is the default so controls do not automatically become UI cards.
 */
export function ControlCluster({ children, label, surface = 'bare', className = '' }: ControlClusterProps) {
  return (
    <div
      className={`control-cluster ${className}`.trim()}
      data-surface={surface}
      role="group"
      aria-label={label}
    >
      {children}
    </div>
  )
}
