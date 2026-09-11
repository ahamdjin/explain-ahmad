export const MODEL = {
  name: 'GLM-5.3-Flash',
  maker: 'Z.ai',
  totalParamsB: 320,
  activeParamsB: 18,
  layers: 45,
  denseLayers: 3,
  moeLayers: 42,
  routedExperts: 288,
  expertsPerToken: 8,
  sharedExperts: 1,
  hiddenSize: 4096,
  vocabSize: 154880,
  attentionHeads: 64,
  linearAttentionLayers: 34,
  sparseAttentionLayers: 11,
} as const

/**
 * The prompt deliberately ends at “it”. This makes the entire story causal and continuous:
 * we can follow the final prompt token through Attention/MoE, then use its final-position
 * representation to teach next-token prediction: rolled → away → .
 */
export const SENTENCE = 'The dog dropped the ball, and it'

/**
 * Teaching segmentation for the production choreography.
 * Before final voice-recording lock, replace these rows with the exact output from the
 * GLM-5.3-Flash tokenizer and pin the real integer IDs. The UI never claims the current
 * abbreviated IDs below are checkpoint truth.
 */
export const TEACHING_TOKENS = [
  { text: 'The', id: '17,2…', kind: 'whole word' },
  { text: ' dog', id: '91,4…', kind: 'whole word' },
  { text: ' dropped', id: '36,8…', kind: 'whole word' },
  { text: ' the', id: '4,1…', kind: 'whole word' },
  { text: ' ball', id: '68,7…', kind: 'whole word' },
  { text: ',', id: '11', kind: 'punctuation' },
  { text: ' and', id: '31,5…', kind: 'whole word' },
  { text: ' it', id: '82,4…', kind: 'whole word' },
] as const

export const IT_TOKEN_INDEX = 7

export const EMBEDDING_PREVIEW = [0.29, -0.14, 0.83, 0.07, -0.62, 0.41, 0.11, -0.35, 0.74, 0.18]

/** Illustrative one-view weights for teaching attention mechanics, not checkpoint activations. */
export const ATTENTION_WORDS = ['The', 'dog', 'dropped', 'the', 'ball', ',', 'and', 'it'] as const
export const ATTENTION_WEIGHTS = [2, 8, 9, 4, 46, 1, 12, 18] as const
export const FUTURE_GHOST_WORDS = ['rolled', 'away', '.'] as const

export const SELECTED_EXPERTS = [3, 24, 61, 97, 141, 188, 232, 276] as const
export const ROUTE_WEIGHTS = [22, 18, 15, 13, 11, 9, 7, 5] as const

export const OUTPUT_CANDIDATES = [
  { token: 'rolled', p: 62 },
  { token: 'moved', p: 11 },
  { token: 'fell', p: 7 },
  { token: 'bounced', p: 5 },
] as const
