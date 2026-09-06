import { SignalFlow, type SignalFlowEdge, type SignalFlowNode } from '../components/SignalFlow'
import { Simulation } from './Simulation'

export function SystemFlow({
  title,
  description,
  nodes,
  edges,
}: {
  title: string
  description: string
  nodes: SignalFlowNode[]
  edges: SignalFlowEdge[]
}) {
  return (
    <Simulation title={title} description={description}>
      <SignalFlow nodes={nodes} edges={edges} />
    </Simulation>
  )
}
