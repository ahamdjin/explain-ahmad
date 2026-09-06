import { SystemFlow } from '../../scenes/SystemFlow'

const nodes = [
  { id: 'user', label: 'User', x: 10, y: 50 },
  { id: 'hermes', label: 'Hermes', x: 38, y: 50, accent: true },
  { id: 'browser', label: 'Browser', x: 76, y: 22 },
  { id: 'terminal', label: 'Terminal', x: 76, y: 50 },
  { id: 'codex', label: 'Codex', x: 76, y: 78 },
]

const edges = [
  { from: 'user', to: 'hermes', label: 'prompt', duration: 1.7 },
  { from: 'hermes', to: 'browser', label: 'browse', delay: 0.2 },
  { from: 'hermes', to: 'terminal', label: 'run', delay: 0.5 },
  { from: 'hermes', to: 'codex', label: 'delegate', delay: 0.8 },
]

export default function SignalFlowExample() {
  return (
    <SystemFlow
      title="Make the system move, not just the arrows"
      description="Signals visibly travel through the graph. This is the reusable LOOPY-style primitive for AI pipelines, agents, routing, RAG, APIs, and workflows."
      nodes={nodes}
      edges={edges}
    />
  )
}
