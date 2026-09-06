import type { ReactNode } from 'react'

type ComparisonProps = {
  leftTitle: string
  rightTitle: string
  left: ReactNode
  right: ReactNode
}

export function Comparison({ leftTitle, rightTitle, left, right }: ComparisonProps) {
  return (
    <div className="comparison-scene">
      <section><h3>{leftTitle}</h3>{left}</section>
      <section><h3>{rightTitle}</h3>{right}</section>
    </div>
  )
}
