export type PatternStatus = 'ready' | 'recipe' | 'future-engine'
export type PatternCategory = 'narrative' | 'manipulation' | 'inspection' | 'causality' | 'comparison' | 'data' | 'media' | 'spatial'

export type ExplanationPattern = {
  id: string
  label: string
  category: PatternCategory
  status: PatternStatus
  useWhen: string
  avoidWhen?: string
  primitives?: string[]
}

/**
 * Interaction vocabulary for future explainers.
 *
 * This is intentionally story-first. A pattern being present here does not mean
 * it should be used; it means we have a name and implementation path for it when
 * a real explanation earns it.
 */
export const explanationPatterns: ExplanationPattern[] = [
  { id: 'step-reveal', label: 'Step reveal', category: 'narrative', status: 'ready', useWhen: 'The viewer should learn one causal beat at a time.', primitives: ['StepController', 'Sequence', 'Reveal', 'StoryButton'] },
  { id: 'progressive-disclosure', label: 'Progressive disclosure', category: 'narrative', status: 'ready', useWhen: 'Showing everything at once would hide the hierarchy.', primitives: ['Reveal', 'MaskReveal', 'SplitReveal'] },
  { id: 'snap-beats', label: 'Exact snap beats', category: 'narrative', status: 'ready', useWhen: 'Each wheel/swipe should land on one authored idea.', primitives: ['SnapStory', 'GesturePager'] },
  { id: 'continuous-scrub', label: 'Continuous scrub', category: 'narrative', status: 'ready', useWhen: 'Understanding benefits from seeing change continuously rather than in discrete jumps.', primitives: ['PremiumScrolly', 'ScrollBeat'] },
  { id: 'scene-replacement', label: 'Scene replacement', category: 'narrative', status: 'ready', useWhen: 'The conceptual context changes completely but continuity still matters.', primitives: ['SceneDeck', 'SharedElement'] },
  { id: 'branching-choice', label: 'Branching choice', category: 'narrative', status: 'ready', useWhen: 'The learner should make a meaningful decision and see its consequence.', primitives: ['StoryButton', 'StepController'] },
  { id: 'replay-loop', label: 'Replay / loop', category: 'narrative', status: 'recipe', useWhen: 'A process becomes clear by watching it repeat with the same timing.' },

  { id: 'drag-direct', label: 'Direct drag', category: 'manipulation', status: 'ready', useWhen: 'The idea is spatial and the viewer should literally move the thing being discussed.', primitives: ['DragGrid', 'Motion drag'] },
  { id: 'constrained-drag', label: 'Constrained drag', category: 'manipulation', status: 'recipe', useWhen: 'One variable should be manipulated spatially while staying on a meaningful track.' },
  { id: 'magnetic-snap', label: 'Magnetic snap', category: 'manipulation', status: 'recipe', useWhen: 'Valid destinations should feel physical and obvious after a drag.' },
  { id: 'slider-variable', label: 'Continuous variable', category: 'manipulation', status: 'ready', useWhen: 'A parameter should be varied continuously and the system should respond immediately.', primitives: ['Slider'] },
  { id: 'scrubber', label: 'Timeline scrubber', category: 'manipulation', status: 'recipe', useWhen: 'The viewer needs control over time, sequence, or a transformation.' },
  { id: 'direct-object-control', label: 'Object-as-control', category: 'manipulation', status: 'recipe', useWhen: 'A separate slider would be less intuitive than manipulating the visual object itself.' },

  { id: 'details-on-demand', label: 'Details on demand', category: 'inspection', status: 'recipe', useWhen: 'Exact labels or values matter only when the viewer points at a visual element.' },
  { id: 'focus-lens', label: 'Focus lens', category: 'inspection', status: 'ready', useWhen: 'One region needs temporary emphasis without deleting the surrounding context.', primitives: ['Camera'] },
  { id: 'isolate-context', label: 'Isolate while preserving context', category: 'inspection', status: 'recipe', useWhen: 'The viewer should inspect one component while still understanding where it lives.' },
  { id: 'annotation-in-context', label: 'Annotation in context', category: 'inspection', status: 'ready', useWhen: 'A label, circle, underline, bracket, or note should attach directly to the thing it explains.', primitives: ['DiagramLabel', 'StoryNote', 'SketchAnnotation'] },
  { id: 'hotspot', label: 'Interactive hotspot', category: 'inspection', status: 'recipe', useWhen: 'Several parts of a diagram can be explored non-linearly.' },
  { id: 'ghost-preview', label: 'Ghost preview', category: 'inspection', status: 'recipe', useWhen: 'The viewer should see what an action will do before committing to it.' },
  { id: 'zoom-pan', label: 'Zoom / pan exploration', category: 'inspection', status: 'recipe', useWhen: 'A large spatial system cannot be understood at one scale.' },

  { id: 'signal-trace', label: 'Causal signal trace', category: 'causality', status: 'ready', useWhen: 'The key idea is what travels where and in what order.', primitives: ['SignalFlow', 'SketchArrow'] },
  { id: 'state-transition', label: 'Visible state transition', category: 'causality', status: 'ready', useWhen: 'The learner needs to see an object change state rather than merely read the result.', primitives: ['Motion', 'Reveal'] },
  { id: 'path-drawing', label: 'Path drawing', category: 'causality', status: 'ready', useWhen: 'A connection should appear as the causal relationship becomes true.', primitives: ['Motion SVG', 'SketchArrow'] },
  { id: 'shared-object', label: 'Shared-object continuity', category: 'causality', status: 'ready', useWhen: 'The same conceptual object survives a scene change.', primitives: ['SharedElement', 'View Transition API'] },
  { id: 'morph', label: 'Shape / topology morph', category: 'causality', status: 'recipe', useWhen: 'The viewer should understand that one representation becomes another.' },
  { id: 'history-trail', label: 'State history trail', category: 'causality', status: 'recipe', useWhen: 'A current state only makes sense when previous states remain faintly visible.' },

  { id: 'side-by-side', label: 'Side-by-side comparison', category: 'comparison', status: 'ready', useWhen: 'Two states need simultaneous inspection.', primitives: ['Comparison'] },
  { id: 'before-after', label: 'Before / after', category: 'comparison', status: 'ready', useWhen: 'The same object changes and spatial registration matters.', primitives: ['CompareSlider', 'SceneDeck'] },
  { id: 'difference-highlight', label: 'Difference highlight', category: 'comparison', status: 'recipe', useWhen: 'Only the changed parts should command attention.' },
  { id: 'small-multiples', label: 'Small multiples', category: 'comparison', status: 'recipe', useWhen: 'Several cases should be compared without interaction.' },
  { id: 'toggle-view', label: 'Meaningful view toggle', category: 'comparison', status: 'ready', useWhen: 'Two legitimate representations of the same system are useful.', primitives: ['StoryButton', 'Tabs only when explanatory'] },

  { id: 'pointer-values', label: 'Pointer values', category: 'data', status: 'recipe', useWhen: 'A chart should stay clean until exact values are requested.' },
  { id: 'crosshair', label: 'Crosshair inspection', category: 'data', status: 'recipe', useWhen: 'Two-dimensional values need precise visual lookup.' },
  { id: 'filter-highlight', label: 'Filter / highlight', category: 'data', status: 'recipe', useWhen: 'The viewer should reduce a dense view to the subset relevant to their question.' },
  { id: 'animated-number', label: 'Animated quantitative change', category: 'data', status: 'ready', useWhen: 'Magnitude change is itself the explanatory event.', primitives: ['Counter', 'Motion'] },
  { id: 'timeline', label: 'Timeline', category: 'data', status: 'ready', useWhen: 'Order and temporal spacing are the main structure.', primitives: ['Timeline', 'Sequence'] },
  { id: 'map-route', label: 'Map / route explanation', category: 'data', status: 'future-engine', useWhen: 'Geography or movement through real space is essential.' },

  { id: 'scroll-video', label: 'Scroll-linked video', category: 'media', status: 'ready', useWhen: 'Existing footage should become directly inspectable through progress.', primitives: ['ScrollVideo'] },
  { id: 'image-mask', label: 'Image / diagram mask', category: 'media', status: 'ready', useWhen: 'A visual should be uncovered progressively to reveal structure.', primitives: ['MaskReveal', 'VisualMask'] },
  { id: 'image-sequence', label: 'Image-sequence scrub', category: 'media', status: 'future-engine', useWhen: 'Frame-perfect product/process motion is easier to author as rendered frames.' },
  { id: 'media-hotspots', label: 'Media hotspots', category: 'media', status: 'recipe', useWhen: 'A still image or screenshot contains several teachable regions.' },

  { id: 'depth-parallax', label: 'Depth / parallax', category: 'spatial', status: 'ready', useWhen: 'Layering communicates hierarchy or spatial separation.', primitives: ['VisualLayer', 'Motion'] },
  { id: 'physics', label: 'Physics simulation', category: 'spatial', status: 'recipe', useWhen: 'The concept depends on forces, collisions, momentum, or emergent motion.' },
  { id: 'interactive-character', label: 'Interactive character / state machine', category: 'spatial', status: 'future-engine', useWhen: 'A character needs many reusable authored states and transitions.', primitives: ['Rive candidate'] },
  { id: 'three-dimensional', label: '3D spatial explanation', category: 'spatial', status: 'future-engine', useWhen: 'The concept genuinely cannot be represented clearly in 2D.', primitives: ['Three.js / R3F candidate'] },
  { id: 'shader-transition', label: 'Shader / field visual', category: 'spatial', status: 'future-engine', useWhen: 'The phenomenon itself is continuous, field-like, volumetric, or materially visual.', primitives: ['WebGL/WebGPU candidate'] },
]

export const patternsByCategory = explanationPatterns.reduce<Record<PatternCategory, ExplanationPattern[]>>(
  (groups, pattern) => {
    groups[pattern.category].push(pattern)
    return groups
  },
  { narrative: [], manipulation: [], inspection: [], causality: [], comparison: [], data: [], media: [], spatial: [] },
)
