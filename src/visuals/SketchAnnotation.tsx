import { type ReactNode, useEffect, useRef } from 'react'
import { annotate } from 'rough-notation'

type AnnotationType = 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket'

type SketchAnnotationProps = {
  children: ReactNode
  type?: AnnotationType
  color?: string
  strokeWidth?: number
  padding?: number
  animate?: boolean
  duration?: number
  show?: boolean
  className?: string
}

export function SketchAnnotation({
  children,
  type = 'underline',
  color = 'currentColor',
  strokeWidth = 2,
  padding = 3,
  animate = true,
  duration = 500,
  show = true,
  className = '',
}: SketchAnnotationProps) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const annotation = annotate(element, {
      type,
      color,
      strokeWidth,
      padding,
      animate,
      animationDuration: duration,
    })

    if (show) annotation.show()
    return () => annotation.remove()
  }, [type, color, strokeWidth, padding, animate, duration, show])

  return <span ref={ref} className={`sketch-annotation ${className}`.trim()}>{children}</span>
}
