import { useEffect, useRef } from 'react'
import rough from 'roughjs'

type SketchShapeKind = 'rectangle' | 'circle' | 'ellipse' | 'line' | 'path'

type SketchShapeProps = {
  kind: SketchShapeKind
  width: number
  height: number
  x?: number
  y?: number
  x2?: number
  y2?: number
  d?: string
  stroke?: string
  strokeWidth?: number
  fill?: string
  roughness?: number
  bowing?: number
  fillStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'dashed' | 'zigzag-line'
  className?: string
}

export function SketchShape({
  kind,
  width,
  height,
  x = 2,
  y = 2,
  x2,
  y2,
  d,
  stroke = 'currentColor',
  strokeWidth = 2,
  fill,
  roughness = 1.15,
  bowing = 1,
  fillStyle = 'hachure',
  className = '',
}: SketchShapeProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    svg.replaceChildren()
    const rc = rough.svg(svg)
    const options = { stroke, strokeWidth, fill, roughness, bowing, fillStyle }
    let node: SVGGElement

    switch (kind) {
      case 'circle':
        node = rc.circle(width / 2, height / 2, Math.min(width, height) - 6, options)
        break
      case 'ellipse':
        node = rc.ellipse(width / 2, height / 2, width - 6, height - 6, options)
        break
      case 'line':
        node = rc.line(x, y, x2 ?? width - 2, y2 ?? height - 2, options)
        break
      case 'path':
        node = rc.path(d ?? '', options)
        break
      default:
        node = rc.rectangle(x, y, width - x * 2, height - y * 2, options)
    }

    svg.appendChild(node)
  }, [kind, width, height, x, y, x2, y2, d, stroke, strokeWidth, fill, roughness, bowing, fillStyle])

  return <svg ref={svgRef} className={`sketch-shape ${className}`.trim()} width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" />
}

type SketchArrowProps = {
  width?: number
  height?: number
  stroke?: string
  className?: string
}

export function SketchArrow({ width = 140, height = 56, stroke = 'currentColor', className = '' }: SketchArrowProps) {
  const d = `M 6 ${height * 0.55} C ${width * 0.32} ${height * 0.32}, ${width * 0.62} ${height * 0.68}, ${width - 18} ${height * 0.48}`
  return (
    <span className={`sketch-arrow ${className}`.trim()} style={{ width, height }}>
      <SketchShape kind="path" width={width} height={height} d={d} stroke={stroke} strokeWidth={2.2} roughness={1.25} />
      <span className="sketch-arrow-head">→</span>
    </span>
  )
}
