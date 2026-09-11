export type GptChapterId =
  | 'MYSTERY'
  | 'PROMPT'
  | 'TOKENS'
  | 'TOKEN ID'
  | 'EMBEDDING'
  | 'ATTENTION'
  | 'MOE'
  | 'MEMORY'
  | 'LAYERS'
  | 'OUTPUT'
  | 'PAYOFF'

export type GptChapter = {
  id: GptChapterId
  label: string
  hint: string
  start: number
  end: number
}

export const GPT_TOTAL_BEATS = 120

export const GPT_CHAPTERS: GptChapter[] = [
  { id: 'MYSTERY', label: 'Mystery', hint: '320B → 18B', start: 1, end: 12 },
  { id: 'PROMPT', label: 'Prompt', hint: 'follow one token', start: 13, end: 16 },
  { id: 'TOKENS', label: 'Tokens', hint: 'text becomes pieces', start: 17, end: 20 },
  { id: 'TOKEN ID', label: 'Token ID', hint: 'lookup address', start: 21, end: 24 },
  { id: 'EMBEDDING', label: 'Embedding', hint: 'numbers the model carries', start: 25, end: 32 },
  { id: 'ATTENTION', label: 'Attention', hint: 'which context matters?', start: 33, end: 52 },
  { id: 'MOE', label: 'MoE', hint: 'choose compute', start: 53, end: 76 },
  { id: 'MEMORY', label: 'Why not load 8?', hint: 'the missing payoff', start: 77, end: 88 },
  { id: 'LAYERS', label: 'Layers', hint: 'route again and again', start: 89, end: 100 },
  { id: 'OUTPUT', label: 'Output', hint: 'predict the next token', start: 101, end: 112 },
  { id: 'PAYOFF', label: 'Payoff', hint: 'close the opening question', start: 113, end: 120 },
]

export function gptChapterAt(beat: number) {
  return GPT_CHAPTERS.find((chapter) => beat >= chapter.start && beat <= chapter.end) ?? GPT_CHAPTERS[0]
}

const tokenMap = [22, 24, 25, 28, 30, 31, 32, 34, 37, 38, 39, 40, 41, 42, 43, 44]
const attentionMap = [45, 46, 47, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 62]
const moeMap = [63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 84]
const buildingMap = [85, 86, 87, 88, 89, 90, 91, 92, 92, 92, 93, 93]
const outputMap = [94, 94, 95, 95, 96, 97, 98, 99, 99, 99, 100, 100]

export function mapGptBeatToV9(beat: number) {
  if (beat >= 1 && beat <= 12) return beat
  if (beat >= 17 && beat <= 32) return tokenMap[beat - 17]
  if (beat >= 33 && beat <= 52) return attentionMap[beat - 33]
  if (beat >= 53 && beat <= 76) return moeMap[beat - 53]
  if (beat >= 89 && beat <= 100) return buildingMap[beat - 89]
  if (beat >= 101 && beat <= 112) return outputMap[beat - 101]
  return null
}

export const GPT_PREDICTION_BEATS: Record<number, { kicker: string; question: string; answer?: string }> = {
  36: { kicker: 'PLACE YOUR BETS', question: 'Which earlier token should matter most to “it” here?' },
  43: { kicker: 'REVEAL', question: 'In this teaching view, “ball” gets the strongest match.', answer: 'The point is the comparison process, not this one illustrative score.' },
  64: { kicker: 'PLACE YOUR BETS', question: '288 routed experts exist. How many do you think survive for this token?' },
  65: { kicker: 'REVEAL', question: 'Top 8 routed experts survive — plus 1 shared expert.' },
  102: { kicker: 'PLACE YOUR BETS', question: 'The dog dropped the ball, and it ___' },
  105: { kicker: 'TEACHING EXAMPLE', question: 'One plausible next token: “rolled”.', answer: 'This is not claimed as a measured GLM checkpoint output.' },
}
