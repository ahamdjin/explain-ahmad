import {
  Background,
  BackgroundVariant,
  ReactFlow,
  type Edge,
  type Node,
  type ReactFlowProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

type FlowDiagramProps = {
  nodes: Node[]
  edges: Edge[]
  className?: string
  fitView?: boolean
  interactive?: boolean
  background?: boolean
  proOptions?: ReactFlowProps['proOptions']
}

export function FlowDiagram({
  nodes,
  edges,
  className = '',
  fitView = true,
  interactive = false,
  background = false,
  proOptions = { hideAttribution: true },
}: FlowDiagramProps) {
  return (
    <div className={`flow-diagram ${className}`.trim()}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView={fitView}
        nodesDraggable={interactive}
        nodesConnectable={interactive}
        elementsSelectable={interactive}
        panOnDrag={interactive}
        zoomOnScroll={interactive}
        zoomOnPinch={interactive}
        preventScrolling={!interactive}
        proOptions={proOptions}
      >
        {background && <Background variant={BackgroundVariant.Dots} gap={20} size={1} />}
      </ReactFlow>
    </div>
  )
}
