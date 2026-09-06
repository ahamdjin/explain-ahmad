import type { ReactNode } from 'react'

type SimulationProps = {
  title: string
  description: string
  children: ReactNode
}

export function Simulation({ title, description, children }: SimulationProps) {
  return (
    <section className="simulation-scene">
      <div className="scene-topbar">
        <div>
          <p className="scene-kicker">SIMULATION</p>
          <h2>{title}</h2>
          <p className="scene-description">{description}</p>
        </div>
      </div>
      <div className="scene-stage">{children}</div>
    </section>
  )
}
