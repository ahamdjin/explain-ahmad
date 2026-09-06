import { useState } from 'react'
import { Counter } from '../../components/Counter'
import { DragGrid, Draggable, DropZone } from '../../components/DragGrid'
import { Node } from '../../components/Node'
import { Simulation } from '../../scenes/Simulation'

const experts = [
  { id: 'math', label: 'Math expert', score: 91 },
  { id: 'code', label: 'Code expert', score: 74 },
  { id: 'writing', label: 'Writing expert', score: 33 },
]

export default function DragGridExample() {
  const [selected, setSelected] = useState<string | null>(null)
  const expert = experts.find((item) => item.id === selected)

  return (
    <Simulation
      title="Let the viewer make the routing decision"
      description="DragGrid gives us Ncase-style direct manipulation: pick something up, drop it somewhere meaningful, and let the system respond."
    >
      <div className="drag-demo">
        <DragGrid onDrop={(_, zoneId) => setSelected(zoneId)}>
          <div className="drag-source">
            <p>Drag this token</p>
            <Draggable id="token"><Node label="2 + 2" accent /></Draggable>
          </div>

          <div className="drop-zone-grid">
            {experts.map((item) => (
              <DropZone key={item.id} id={item.id} active={selected === item.id}>
                <strong>{item.label}</strong>
                <span>Router score {item.score}%</span>
              </DropZone>
            ))}
          </div>
        </DragGrid>

        <div className="simulation-metrics">
          <Counter label="Selected expert" value={expert?.label ?? 'None'} />
          <Counter label="Router score" value={expert?.score ?? 0} suffix="%" />
        </div>
      </div>
    </Simulation>
  )
}
