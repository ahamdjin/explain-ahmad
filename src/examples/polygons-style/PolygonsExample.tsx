import { useMemo, useState } from 'react'
import { Character } from '../../components/Character'
import { Counter } from '../../components/Counter'
import { Slider } from '../../components/Slider'
import { Simulation } from '../../scenes/Simulation'

export default function PolygonsExample() {
  const [position, setPosition] = useState(25)
  const onRight = position >= 50

  const neighbors = useMemo(
    () => onRight
      ? ['triangle', 'triangle', 'circle', 'triangle', 'triangle', 'circle'] as const
      : ['circle', 'triangle', 'circle', 'circle', 'triangle', 'circle'] as const,
    [onRight],
  )

  const sameShape = neighbors.filter((shape) => shape === 'circle').length
  const happiness = Math.round((sameShape / neighbors.length) * 100)

  return (
    <Simulation
      title="Move one character. Watch the neighborhood change."
      description="A tiny direct-manipulation demo inspired by explorable explanations: change an input and immediately see the system react."
    >
      <div className="polygon-demo">
        <div className="neighborhood-track">
          <div className="zone-label zone-left">Neighborhood A</div>
          <div className="zone-label zone-right">Neighborhood B</div>
          <div className="moving-character" style={{ left: `${position}%` }}>
            <Character name="Alex" shape="circle" mood={happiness >= 60 ? 'happy' : 'sad'} />
          </div>
        </div>

        <div className="neighbor-grid" aria-label="Alex's nearby neighbors">
          {neighbors.map((shape, index) => (
            <Character key={`${shape}-${index}`} name="neighbor" shape={shape} small />
          ))}
        </div>

        <div className="simulation-metrics">
          <Counter label="Similar neighbors" value={`${sameShape}/${neighbors.length}`} />
          <Counter label="Comfort" value={happiness} suffix="%" />
        </div>

        <Slider label="Move Alex" value={position} min={8} max={92} onChange={setPosition} />
        <p className="simulation-note">Move past the midpoint. The local neighborhood changes instantly.</p>
      </div>
    </Simulation>
  )
}
