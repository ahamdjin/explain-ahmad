export const labDemos = [
  { id: 'trust', label: 'Trust story', hint: 'Click / reveal / consequence', keywords: ['ncase', 'click', 'step', 'choice'] },
  { id: 'polygons', label: 'Polygons', hint: 'Manipulate a system', keywords: ['simulation', 'slider', 'emergence'] },
  { id: 'drag', label: 'Drag routing', hint: 'Direct manipulation', keywords: ['drag', 'drop', 'router', 'expert'] },
  { id: 'flow', label: 'Signal flow', hint: 'Information travels through a system', keywords: ['diagram', 'node', 'edge', 'path'] },
  { id: 'sequence', label: 'Sequence', hint: 'Beat-by-beat narration', keywords: ['step', 'timeline', 'reveal'] },
  { id: 'focus', label: 'Camera / focus', hint: 'Direct attention spatially', keywords: ['zoom', 'camera', 'focus'] },
  { id: 'scrolly', label: 'Basic scrolly', hint: 'Discrete scroll beats', keywords: ['scroll', 'intersection', 'step'] },
  { id: 'premium', label: 'Continuous scrolly', hint: 'Scrubbed progress and motion', keywords: ['scroll', 'motion', 'continuous'] },
  { id: 'navigation', label: 'Navigation lab', hint: 'Paging and scene transitions', keywords: ['snap', 'gesture', 'transition'] },
  { id: 'reveal', label: 'Mask reveal', hint: 'Reveal visual structure', keywords: ['mask', 'image', 'reveal'] },
  { id: 'typography', label: 'Typography', hint: 'Text choreography when justified', keywords: ['type', 'split', 'words'] },
] as const

export type LabDemoId = (typeof labDemos)[number]['id']
