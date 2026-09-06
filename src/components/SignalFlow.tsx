import { useId } from 'react'

export type SignalFlowNode = {
  id: string
  label: string
  x: number
  y: number
  accent?: boolean
  muted?: boolean
}

export type SignalFlowEdge = {
  from: string
  to: string
  label?: string
  active?: boolean
  duration?: number
  delay?: number
}

type SignalFlowProps = {
  nodes: SignalFlowNode[]
  edges: SignalFlowEdge[]
  className?: string
}

export function SignalFlow({ nodes, edges, className = '' }: SignalFlowProps) {
  const markerId = `signal-arrow-${useId().replace(/:/g, '')}`
  const byId = new Map(nodes.map((node) => [node.id, node]))

  return (
    <div className={`signal-flow ${className}`.trim()}>
      <svg className="signal-flow-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id={markerId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="signal-arrow-head" />
          </marker>
        </defs>

        {edges.map((edge, index) => {
          const from = byId.get(edge.from)
          const to = byId.get(edge.to)
          if (!from || !to) return null

          const d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`
          const active = edge.active !== false

          return (
            <g key={`${edge.from}-${edge.to}-${index}`}>
              <path d={d} className={active ? 'signal-edge is-active' : 'signal-edge'} markerEnd={`url(#${markerId})`} />
              {active && (
                <circle r="1.35" className="signal-pulse">
                  <animateMotion
                    dur={`${edge.duration ?? 1.8}s`}
                    begin={`${edge.delay ?? index * 0.2}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              )}
            </g>
          )
        })}
      </svg>

      {nodes.map((node) => (
        <div
          key={node.id}
          className={`signal-node ${node.accent ? 'is-accent' : ''} ${node.muted ? 'is-muted' : ''}`.trim()}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </div>
      ))}

      {edges.map((edge, index) => {
        if (!edge.label) return null
        const from = byId.get(edge.from)
        const to = byId.get(edge.to)
        if (!from || !to) return null
        return (
          <span
            key={`label-${edge.from}-${edge.to}-${index}`}
            className="signal-edge-label"
            style={{ left: `${(from.x + to.x) / 2}%`, top: `${(from.y + to.y) / 2}%` }}
          >
            {edge.label}
          </span>
        )
      })}
    </div>
  )
}
