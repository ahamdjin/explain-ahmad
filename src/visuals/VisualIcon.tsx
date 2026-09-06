import type { ComponentType } from 'react'
import { Circle, icons, type LucideProps } from 'lucide-react'

export type VisualIconName =
  | 'user'
  | 'prompt'
  | 'model'
  | 'router'
  | 'expert'
  | 'database'
  | 'memory'
  | 'tool'
  | 'browser'
  | 'terminal'
  | 'search'
  | 'document'
  | 'image'
  | 'video'
  | 'chip'
  | 'server'
  | 'workflow'
  | 'attention'
  | 'warning'
  | 'success'
  | 'cursor'
  | 'agent'
  | 'layers'
  | 'code'
  | 'branch'
  | 'clock'
  | 'link'

const semanticIconNames: Record<VisualIconName, string> = {
  user: 'User',
  prompt: 'MessageSquareText',
  model: 'BrainCircuit',
  router: 'Waypoints',
  expert: 'Boxes',
  database: 'Database',
  memory: 'MemoryStick',
  tool: 'Wrench',
  browser: 'Globe2',
  terminal: 'SquareTerminal',
  search: 'Search',
  document: 'FileText',
  image: 'Image',
  video: 'Video',
  chip: 'Cpu',
  server: 'Server',
  workflow: 'Workflow',
  attention: 'Eye',
  warning: 'TriangleAlert',
  success: 'CircleCheckBig',
  cursor: 'MousePointer2',
  agent: 'Bot',
  layers: 'Layers3',
  code: 'Code2',
  branch: 'GitBranch',
  clock: 'Clock3',
  link: 'Link2',
}

type VisualIconProps = LucideProps & {
  name: VisualIconName
}

export function VisualIcon({ name, strokeWidth = 1.9, ...props }: VisualIconProps) {
  const registry = icons as unknown as Record<string, ComponentType<LucideProps>>
  const Icon = registry[semanticIconNames[name]] ?? Circle
  return <Icon strokeWidth={strokeWidth} aria-hidden="true" {...props} />
}
