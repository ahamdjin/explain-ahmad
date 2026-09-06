import { getStroke } from 'perfect-freehand'

type Point = [number, number, number?]

type HandDrawnStrokeProps = {
  points: Point[]
  size?: number
  color?: string
  thinning?: number
  smoothing?: number
  streamline?: number
  className?: string
  viewBox?: string
}

function getSvgPathFromStroke(points: number[][]) {
  if (!points.length) return ''
  const average = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const first = points[0]
  let d = `M ${first[0].toFixed(2)} ${first[1].toFixed(2)} Q `

  for (let i = 1; i < points.length - 1; i += 1) {
    const mid = average(points[i], points[i + 1])
    d += `${points[i][0].toFixed(2)} ${points[i][1].toFixed(2)} ${mid[0].toFixed(2)} ${mid[1].toFixed(2)} `
  }

  const last = points[points.length - 1]
  d += `T ${last[0].toFixed(2)} ${last[1].toFixed(2)} Z`
  return d
}

export function HandDrawnStroke({
  points,
  size = 4,
  color = 'currentColor',
  thinning = 0.45,
  smoothing = 0.65,
  streamline = 0.5,
  className = '',
  viewBox = '0 0 300 160',
}: HandDrawnStrokeProps) {
  const stroke = getStroke(points, {
    size,
    thinning,
    smoothing,
    streamline,
    simulatePressure: true,
    start: { taper: true, cap: true },
    end: { taper: true, cap: true },
  })

  return (
    <svg className={`hand-drawn-stroke ${className}`.trim()} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true">
      <path d={getSvgPathFromStroke(stroke)} fill={color} />
    </svg>
  )
}
