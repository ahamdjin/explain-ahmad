import type { ReactNode } from 'react'
import { Sequence } from '../engine/Sequence'

export function Timeline({
  steps,
  children,
}: {
  steps: number
  children: Parameters<typeof Sequence>[0]['children']
}) {
  return <Sequence totalSteps={steps}>{children}</Sequence>
}

export function TimelineItem({ children }: { children: ReactNode }) {
  return <div className="timeline-item">{children}</div>
}
