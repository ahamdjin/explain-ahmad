import type { ComponentType } from 'react'
import {
  Bot,
  Boxes,
  BrainCircuit,
  CircleCheckBig,
  Clock3,
  Code2,
  Cpu,
  Database,
  Eye,
  FileText,
  GitBranch,
  Globe2,
  Image as ImageIcon,
  Layers3,
  Link2,
  MemoryStick,
  MessageSquareText,
  MousePointer2,
  Search,
  Server,
  SquareTerminal,
  TriangleAlert,
  User,
  Video,
  Waypoints,
  Workflow,
  Wrench,
  type LucideProps,
} from 'lucide-react'

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

const semanticIcons: Record<VisualIconName, ComponentType<LucideProps>> = {
  user: User,
  prompt: MessageSquareText,
  model: BrainCircuit,
  router: Waypoints,
  expert: Boxes,
  database: Database,
  memory: MemoryStick,
  tool: Wrench,
  browser: Globe2,
  terminal: SquareTerminal,
  search: Search,
  document: FileText,
  image: ImageIcon,
  video: Video,
  chip: Cpu,
  server: Server,
  workflow: Workflow,
  attention: Eye,
  warning: TriangleAlert,
  success: CircleCheckBig,
  cursor: MousePointer2,
  agent: Bot,
  layers: Layers3,
  code: Code2,
  branch: GitBranch,
  clock: Clock3,
  link: Link2,
}

type VisualIconProps = LucideProps & {
  name: VisualIconName
}

export function VisualIcon({ name, strokeWidth = 1.9, ...props }: VisualIconProps) {
  const Icon = semanticIcons[name]
  return <Icon strokeWidth={strokeWidth} aria-hidden="true" {...props} />
}
