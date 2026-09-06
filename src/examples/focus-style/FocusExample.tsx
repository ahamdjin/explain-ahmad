import { useState } from 'react'
import { Arrow } from '../../components/Arrow'
import { Camera, type CameraFocus } from '../../components/Camera'
import { Node } from '../../components/Node'
import { Simulation } from '../../scenes/Simulation'

const focuses: Array<{ name: string; focus: CameraFocus | null }> = [
  { name: 'Whole pipeline', focus: null },
  { name: 'Embedding', focus: { x: 34, y: 50, width: 18, height: 28, zoom: 1.35, label: 'Look here' } },
  { name: 'Attention', focus: { x: 62, y: 50, width: 18, height: 28, zoom: 1.55, label: 'Important part' } },
  { name: 'Output', focus: { x: 88, y: 50, width: 16, height: 28, zoom: 1.45, label: 'Result' } },
]

export default function FocusExample() {
  const [index, setIndex] = useState(0)
  const current = focuses[index]

  return (
    <Simulation
      title="Direct the viewer's eyes"
      description="Camera/Focus lets narration zoom into one concept and dim the rest instead of cutting to a completely different graphic."
    >
      <div className="focus-demo">
        <Camera focus={current.focus}>
          <div className="camera-pipeline">
            <Node label="Token" />
            <Arrow />
            <Node label="Embedding" square />
            <Arrow />
            <Node label="Attention" square accent />
            <Arrow />
            <Node label="Output" />
          </div>
        </Camera>

        <div className="focus-controls">
          {focuses.map((item, itemIndex) => (
            <button
              key={item.name}
              className={itemIndex === index ? 'is-active' : ''}
              onClick={() => setIndex(itemIndex)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </Simulation>
  )
}
