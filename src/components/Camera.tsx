import type { ReactNode } from 'react'

export type CameraFocus = {
  x: number
  y: number
  width?: number
  height?: number
  zoom?: number
  label?: string
}

export function Camera({
  children,
  focus,
  dim = true,
  className = '',
}: {
  children: ReactNode
  focus?: CameraFocus | null
  dim?: boolean
  className?: string
}) {
  const zoom = focus?.zoom ?? 1
  const origin = focus ? `${focus.x}% ${focus.y}%` : '50% 50%'

  return (
    <div className={`camera-stage ${className}`.trim()}>
      <div
        className="camera-world"
        style={{ transform: `scale(${zoom})`, transformOrigin: origin }}
      >
        {children}
        {focus && (
          <div
            className={`camera-focus ${dim ? 'is-dimmed' : ''}`}
            style={{
              left: `${focus.x}%`,
              top: `${focus.y}%`,
              width: `${focus.width ?? 18}%`,
              height: `${focus.height ?? 22}%`,
            }}
          >
            {focus.label && <span>{focus.label}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
