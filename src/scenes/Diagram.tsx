import type { ReactNode } from 'react'

export function Diagram({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="diagram-scene" aria-label={label}>
      {children}
    </div>
  )
}
