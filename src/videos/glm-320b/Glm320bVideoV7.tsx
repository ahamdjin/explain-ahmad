import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { type CSSProperties, type ReactNode, useCallback, useEffect, useState } from 'react'
import { StoryButton, StoryIconButton } from '../../components/StoryButton'
import { SceneFrame, VideoPage } from '../../engine/SceneFrame'
import { useActionGate } from '../../engine/useActionGate'
import { BookVisual } from '../../visuals/BookVisual'
import { IndexBoard } from '../../visuals/IndexBoard'
import { SketchAnnotation } from '../../visuals/SketchAnnotation'
import './glm-320b-video-v4.css'
import './glm-320b-video-v4-fixes.css'
import './glm-320b-video-v6.css'
import './glm-320b-video-v7.css'

const MODEL = {
  name: 'GLM-5.3-Flash',
  maker: 'Z.ai',
  totalParamsB: 320,
  activeParamsB: 18,
  layers: 45,
  attentionHeads: 64,
  firstDenseLayers: 3,
  moeLayers: 42,
  routedExperts: 288,
  expertsPerToken: 8,
  sharedExperts: 1,
  hiddenSize: 4_096,
  vocabSize: 154_880,
} as const

const sentence = 'The dog chased the ball because it rolled away.'

// Architecture facts above come from the official model card/config.
// Teaching token IDs, embedding values, attention weights, routing scores/weights and
// output probabilities below are illustrative until checkpoint activations are pinned.
const TOKENS = [
  { text: 'The', id: '17,2…' },
  { text: ' dog', id: '91,4…' },
  { text: ' chased', id: '36,8…' },
  { text: ' the', id: '4,1…' },
  { text: ' ball', id: '68,7…' },
  { text: ' because', id: '31,5…' },
  { text: ' it', id: '82,4…' },
  { text: ' rolled', id: '73,1…' },
  { text: ' away', id: '49,6…' },
  { text: '.', id: '13' },
] as const

const IT_INDEX = 6
const VECTOR = [0.29, -0.14, 0.83, 0.07, -0.62, 0.41, 0.11, -0.35, 0.74, 0.18]
const ATTENTION_WORDS = ['The', 'dog', 'chased', 'the', 'ball', 'because', 'it', 'rolled', 'away'] as const
const ATTENTION_WEIGHTS = [2, 8, 10, 4, 46, 12, 18, 0, 0] as const
const SELECTED_EXPERTS = new Set([3, 24, 61, 97, 141, 188, 232, 276])
const ROUTE_WEIGHTS = [22, 18, 15, 13, 11, 9, 7, 5] as const

const STEPS = [
  'model-overview',
  'model-highlight',
  'model-definitions',
  'journey',
  'chat-empty',
  'chat-typing',
  'chat-sent',
  'chat-thinking',
  'tokens',
  'token-kinds',
  'token-ids',
  'focus-it',
  'id-index',
  'book-arrives',
  'book-open',
  'embedding-scale',
  'all-embeddings',
  'embedding-carry',
  'attention-problem',
  'attention-qkv',
  'attention-kv',
  'attention-match',
  'attention-weights',
  'attention-values',
  'attention-update',
  'attention-heads',
  'moe-where',
  'moe-dense',
  'moe-experts',
  'moe-router',
  'moe-scores',
  'moe-top8',
  'moe-shared',
  'moe-process',
  'moe-mix',
  'moe-token-compare',
  'moe-reroute',
  'moe-active-path',
  'building',
  'floors',
  'output',
  'output-repeat',
  'payoff',
] as const

type Step = (typeof STEPS)[number]
type Chapter = 'TEXT' | 'TOKENS' | 'TOKEN ID' | 'EMBEDDING' | 'ATTENTION' | 'MOE' | 'LAYERS' | 'OUTPUT'

const CHAPTERS: Array<{ id: Chapter; label: string; hint: string }> = [
  { id: 'TEXT', label: 'Text', hint: 'what we type' },
  { id: 'TOKENS', label: 'Tokens', hint: 'small pieces' },
  { id: 'TOKEN ID', label: 'Token ID', hint: 'lookup number' },
  { id: 'EMBEDDING', label: 'Embedding', hint: 'numbers the model carries' },
  { id: 'ATTENTION', label: 'Attention', hint: 'gather useful context' },
  { id: 'MOE', label: 'MoE', hint: 'choose compute' },
  { id: 'LAYERS', label: 'Layers', hint: 'repeat and refine' },
  { id: 'OUTPUT', label: 'Output', hint: 'next token' },
]

function stepIndex(step: Step) {
  return STEPS.indexOf(step)
}

function between(step: Step, start: Step, end: Step) {
  const index = stepIndex(step)
  return index >= stepIndex(start) && index <= stepIndex(end)
}

function chapterForStep(step: Step): Chapter | null {
  if (between(step, 'chat-empty', 'chat-thinking')) return 'TEXT'
  if (step === 'tokens' || step === 'token-kinds') return 'TOKENS'
  if (between(step, 'token-ids', 'id-index')) return 'TOKEN ID'
  if (between(step, 'book-arrives', 'embedding-carry')) return 'EMBEDDING'
  if (between(step, 'attention-problem', 'attention-heads')) return 'ATTENTION'
  if (between(step, 'moe-where', 'moe-active-path')) return 'MOE'
  if (step === 'building' || step === 'floors') return 'LAYERS'
  if (step === 'output' || step === 'output-repeat' || step === 'payoff') return 'OUTPUT'
  return null
}

function PaperWorld() {
  return <div className="prod6-paper-world" aria-hidden="true"><i /><i /><i /><i /></div>
}

function PaperAction({ children, onClick, disabled = false, strong = false }: { children: ReactNode; onClick: () => void; disabled?: boolean; strong?: boolean }) {
  return (
    <motion.button
      type="button"
      className={`prod6-paper-action ${strong ? 'is-strong' : ''}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { y: 1, scale: 0.985 }}
    >
      <span>{children}</span><b>→</b>
    </motion.button>
  )
}

function VectorStrip({ numbers = false, compact = false }: { numbers?: boolean; compact?: boolean }) {
  return (
    <div className={`prod4-vector-strip ${compact ? 'is-compact' : ''}`}>
      {VECTOR.map((value, index) => (
        <i key={index} style={{ '--strength': Math.abs(value) } as CSSProperties}>
          {numbers ? <span>{value.toFixed(2)}</span> : null}
        </i>
      ))}
      <b>…</b>
    </div>
  )
}

function Representation({ label = 'it', note = 'current representation', compact = false }: { label?: string; note?: string; compact?: boolean }) {
  return (
    <motion.div layoutId="prod7-it-representation" className={`prod7-representation ${compact ? 'is-compact' : ''}`}>
      <small>{note}</small><strong>{label}</strong><VectorStrip compact />
    </motion.div>
  )
}

function ChapterRail({ step }: { step: Step }) {
  const current = chapterForStep(step)
  const visible = stepIndex(step) > stepIndex('journey') && step !== 'payoff'

  return (
    <AnimatePresence>
      {visible ? (
        <motion.nav className="prod6-chapter-rail prod7-chapter-rail" aria-label="Prompt journey chapters" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
          {CHAPTERS.map((chapter, index) => {
            const active = chapter.id === current
            const currentIndex = current ? CHAPTERS.findIndex((item) => item.id === current) : -1
            const passed = currentIndex > index
            return (
              <motion.div key={chapter.id} layoutId={`prod7-chapter-${chapter.id}`} className="prod6-chapter-tab" data-active={active ? 'true' : undefined} data-passed={passed ? 'true' : undefined}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <strong>{active ? <SketchAnnotation type="highlight" color="#f4c95d" strokeWidth={2} padding={4} duration={420}>{chapter.label}</SketchAnnotation> : chapter.label}</strong>
              </motion.div>
            )
          })}
        </motion.nav>
      ) : null}
    </AnimatePresence>
  )
}

function ModelPaper({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'model-overview', 'model-definitions')
  const marked = step === 'model-highlight' || step === 'model-definitions'
  const definitions = step === 'model-definitions'
  return (
    <motion.section className="prod6-model-paper" animate={{ opacity: active ? 1 : 0, y: active ? 0 : -18 }} transition={{ type: 'spring', stiffness: 105, damping: 21 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <header className="prod6-model-head"><div><small>OUR EXAMPLE MODEL</small><h1>{MODEL.name}</h1><p>{MODEL.maker} · Mixture of Experts (MoE)</p></div><div className="prod6-model-stamp">MODEL NOTES</div></header>
      <div className="prod6-model-intro"><p>We are using <b>{MODEL.name}</b> as one real example. It stores <b>{MODEL.totalParamsB} billion learned parameters</b>, but for one token only about <b>{MODEL.activeParamsB} billion</b> take part in the active path.</p><p className="prod6-model-question">That difference is the puzzle this video will explain.</p></div>
      <div className="prod6-param-lines">
        <div className="prod6-param-line"><span>{marked ? <SketchAnnotation type="highlight" color="#f4c95d" padding={5} duration={500}>Total parameters</SketchAnnotation> : 'Total parameters'}</span><strong>{MODEL.totalParamsB}B</strong><p>all learned numbers stored across the whole model</p></div>
        <div className="prod6-param-line is-active"><span>{marked ? <SketchAnnotation type="highlight" color="#f0a675" padding={5} duration={560}>Active parameters</SketchAnnotation> : 'Active parameters'}</span><strong>~{MODEL.activeParamsB}B</strong><p>the smaller set that participates for one token</p></div>
      </div>
      <aside className="prod6-model-margin"><h2>What is inside?</h2><div><strong>{MODEL.layers}</strong><span>transformer layers</span></div><div><strong>{MODEL.moeLayers}</strong><span>layers use sparse MoE</span></div><div><strong>{MODEL.routedExperts}</strong><span>routed experts in each sparse layer</span></div><div><strong>top-{MODEL.expertsPerToken} + {MODEL.sharedExperts}</strong><span>routed + shared expert path</span></div><p><b>Useful later:</b> {MODEL.vocabSize.toLocaleString()} vocabulary entries · {MODEL.hiddenSize.toLocaleString()} values in the carried representation.</p></aside>
      <AnimatePresence>{definitions ? <motion.div className="prod6-definition-notes" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><div><b>Parameter</b><span>= one learned number inside the model.</span></div><div><b>Active</b><span>= used for this token right now.</span></div><div><b>MoE</b><span>= many expert blocks exist; only a few routed ones are used for each token.</span></div></motion.div> : null}</AnimatePresence>
      <div className="prod6-model-action"><PaperAction onClick={next} disabled={busy} strong={definitions}>{step === 'model-overview' ? 'Mark the two numbers that matter' : step === 'model-highlight' ? 'Explain those two words' : 'Follow one prompt through the model'}</PaperAction></div>
    </motion.section>
  )
}

function JourneyOverview({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'journey'
  return (
    <motion.section className="prod6-journey-overview" animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <div className="prod6-journey-copy"><small>BEFORE WE ANSWER THE 320B → 18B QUESTION</small><h2>Follow one simple prompt.</h2><p>We will open one chapter at a time. You only need to understand the highlighted chapter we are standing in.</p></div>
      <div className="prod6-journey-map">{CHAPTERS.map((chapter, index) => <div className="prod6-journey-item" key={chapter.id}>{index > 0 ? <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ delay: 0.12 + index * 0.06 }} /> : null}<motion.button type="button" layoutId={`prod7-chapter-${chapter.id}`} className="prod6-journey-card" data-start={index === 0 ? 'true' : undefined} onClick={index === 0 ? next : undefined} disabled={busy || index !== 0}><small>{String(index + 1).padStart(2, '0')}</small><strong>{chapter.label}</strong><span>{chapter.hint}</span>{index === 0 ? <b>start here →</b> : null}</motion.button></div>)}</div>
    </motion.section>
  )
}

function ThinkingDots() { return <span className="prod6-thinking-dots" aria-label="Model processing"><i /><i /><i /></span> }

function ChatLayer({ step, next, busy, typingReady, setTypingReady }: { step: Step; next: () => void; busy: boolean; typingReady: boolean; setTypingReady: (ready: boolean) => void }) {
  const active = between(step, 'chat-empty', 'chat-thinking')
  const typing = step === 'chat-typing'
  const sent = step === 'chat-sent' || step === 'chat-thinking'
  const thinking = step === 'chat-thinking'
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (step === 'chat-empty') { setTyped(''); setTypingReady(false) }
    if (!typing) return
    setTyped(''); setTypingReady(false)
    let position = 0
    const interval = window.setInterval(() => {
      position += 1
      setTyped(sentence.slice(0, position))
      if (position >= sentence.length) { window.clearInterval(interval); setTypingReady(true) }
    }, 24)
    return () => window.clearInterval(interval)
  }, [step, typing, setTypingReady])

  return (
    <motion.section className="prod6-chat-stage" animate={{ opacity: active ? 1 : 0, scale: thinking ? 1.08 : 1, y: thinking ? '-2%' : '0%' }} transition={{ type: 'spring', stiffness: 105, damping: 22 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <motion.div className="prod6-chat-window" animate={{ opacity: thinking ? 0.28 : 1, scale: thinking ? 0.9 : 1 }}>
        <header><div><b>GLM‑5.3‑Flash</b><span>new chat</span></div><i>✦</i></header>
        <div className="prod6-chat-body">{sent ? <motion.div className="prod6-user-message" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }}><small>YOU</small><motion.p layoutId="prod7-prompt-sentence">{sentence}</motion.p></motion.div> : <div className="prod6-chat-empty-copy"><b>Ask the model anything.</b><span>We will use one tiny sentence so every step stays easy to see.</span></div>}{sent ? <motion.div className="prod6-model-thinking" layoutId="prod7-thinking-node" animate={{ opacity: thinking ? 0 : 1 }}><small>GLM‑5.3‑Flash</small><ThinkingDots /><span>processing your prompt</span></motion.div> : null}</div>
        {!sent ? <div className="prod6-chat-input"><div className="prod6-input-text">{step === 'chat-empty' ? <span className="is-placeholder">Message GLM‑5.3‑Flash…</span> : <motion.span layoutId="prod7-prompt-sentence">{typed}<i className="prod6-caret" /></motion.span>}</div>{step === 'chat-empty' ? <PaperAction onClick={next} disabled={busy}>Type our example</PaperAction> : <motion.button className="prod6-send" type="button" onClick={next} disabled={busy || !typingReady} whileTap={{ scale: 0.94 }} aria-label="Send prompt">↵</motion.button>}</div> : null}
      </motion.div>
      {step === 'chat-sent' ? <div className="prod6-chat-action"><PaperAction onClick={next} disabled={busy}>Zoom into what the model is doing</PaperAction></div> : null}
      {thinking ? <motion.button type="button" layoutId="prod7-thinking-node" className="prod6-thinking-portal" onClick={next} disabled={busy} initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.985 }}><small>INSIDE THE MODEL</small><ThinkingDots /><strong>First, it breaks the text into tokens.</strong><span>enter tokenization →</span></motion.button> : null}
    </motion.section>
  )
}

function TokenLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'tokens', 'id-index')
  const showKinds = step === 'token-kinds'
  const showIds = between(step, 'token-ids', 'id-index')
  const focus = step === 'focus-it' || step === 'id-index'
  const indexView = step === 'id-index'
  return (
    <motion.section className="prod4-token-layer prod6-token-layer" animate={{ opacity: active ? 1 : 0 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <div className="prod4-token-source prod6-token-source"><small>THE PROMPT WE JUST SENT</small><motion.span layoutId="prod7-prompt-sentence">{sentence}</motion.span><i /></div>
      <motion.div className="prod4-token-row" animate={{ x: indexView ? '-18%' : '0%', scale: indexView ? 0.84 : 1 }}>{TOKENS.map((token, index) => <motion.div key={`${token.text}-${index}`} className="prod4-token" data-it={index === IT_INDEX ? 'true' : undefined} animate={{ opacity: focus && index !== IT_INDEX ? 0.12 : 1, y: focus && index === IT_INDEX ? -12 : 0, scale: focus && index === IT_INDEX ? 1.12 : 1 }} transition={{ type: 'spring', stiffness: 170, damping: 22, delay: step === 'tokens' ? index * 0.035 : 0 }}><span>{token.text.replace(/^ /, '·')}</span>{showIds ? <small>ID {token.id}</small> : null}</motion.div>)}</motion.div>
      <AnimatePresence mode="wait">
        {showKinds ? <motion.div className="prod4-token-kinds" key="kinds" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><div><b>dog</b><span>a token can be a whole word</span></div><div><b>un · believ · able</b><span>one word can become several pieces</span><small>generic example</small></div><div><b>.</b><span>punctuation can be a token too</span></div></motion.div> : showIds && !focus ? <motion.div className="prod4-id-explainer" key="ids" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><small>{MODEL.name} has {MODEL.vocabSize.toLocaleString()} vocabulary entries</small><strong>each entry has one lookup ID: 0 to {MODEL.vocabSize - 1}</strong><span>The ID is not meaning. It is simply an address used for lookup.</span></motion.div> : indexView ? <motion.div className="prod4-index-wall prod7-index-wall" key="index" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}><IndexBoard rows={9} label="TOKEN VOCABULARY" ariaLabel="Token vocabulary index metaphor"><div className="prod4-index-rows">{['17,2…','31,5…','49,6…','68,7…','73,1…','82,4…','91,4…','122,…','154,8…'].map((id, row) => <div key={id} data-focus={row === 5 ? 'true' : undefined}><small>{id}</small><span>{row === 5 ? 'it' : ['The','because','away','ball','rolled','it','dog','…','…'][row]}</span>{row === 5 ? <b>← our token</b> : null}</div>)}</div></IndexBoard><span className="prod4-illustrative">ID is illustrative until the exact tokenizer value is pinned.</span></motion.div> : null}
      </AnimatePresence>
      <div className="prod4-local-action prod4-token-action"><StoryButton onClick={next} disabled={busy} emphasis={indexView ? 'strong' : 'normal'}>{step === 'tokens' ? 'What can a token look like?' : step === 'token-kinds' ? 'Give every token an ID' : step === 'token-ids' ? 'Follow just one token' : step === 'focus-it' ? 'Find “it” in the vocabulary' : 'Use this ID as the lookup key'}</StoryButton></div>
    </motion.section>
  )
}

function EmbeddingLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'book-arrives', 'embedding-carry')
  const open = between(step, 'book-open', 'embedding-carry')
  const scale = between(step, 'embedding-scale', 'embedding-carry')
  const all = step === 'all-embeddings'
  const carry = step === 'embedding-carry'
  const reducedMotion = useReducedMotion()
  return (
    <motion.section className="prod4-embedding-layer prod7-embedding-layer" animate={{ opacity: active ? 1 : 0 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <div className="prod4-page-key prod7-page-key"><small>LOOKUP KEY</small><strong>ID 82,4…</strong><span>like a page number for our teaching metaphor</span></div>
      <motion.button type="button" className="prod4-book-button" onClick={!open ? next : undefined} disabled={busy || open} whileHover={!open && !reducedMotion ? { y: -5, rotate: -0.35 } : undefined}><BookVisual state={open ? 'open' : 'closed'} title="Embeddings" subtitle="learned numerical lookup" label="Embedding book" leftPage={open ? <div className="prod4-book-left"><small>LOOKUP ROW</small><strong>82,4…</strong><b>“it”</b><span>the token ID selects one learned row</span></div> : undefined} rightPage={open ? <div className="prod4-book-right"><small>EMBEDDING</small><strong>[ 0.29, −0.14, 0.83, 0.07, … ]</strong><div><b>{MODEL.hiddenSize.toLocaleString()}</b><span>values in the representation</span></div><p>This is not an English definition. It is a learned numerical representation.</p></div> : undefined} />{!open ? <span className="prod4-open-cue">open the row matching this ID ↗</span> : null}</motion.button>
      {scale ? <motion.div className="prod7-embedding-scale" initial={{ opacity: 0, scaleX: 0.35 }} animate={{ opacity: 1, scaleX: 1 }}><span>0.29</span><span>−0.14</span><span>0.83</span><span>0.07</span><b>…</b><strong>4,096 values</strong><i /></motion.div> : null}
      {all ? <motion.div className="prod4-all-embeddings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{TOKENS.slice(0, 7).map((token, index) => <div key={token.text} data-focus={index === IT_INDEX ? 'true' : undefined}><b>{token.text.trim()}</b><span>[{(0.11 + index * 0.03).toFixed(2)}, …]</span></div>)}<strong>Every input token gets an embedding.</strong><small>We will carry only “it” so the story stays readable.</small></motion.div> : null}
      {carry ? <div className="prod7-embedding-carry"><Representation note="embedding we carry forward" /><p>The book can go away now. From here, we follow this numerical representation.</p></div> : null}
      {open ? <div className="prod4-local-action prod4-book-action"><StoryButton onClick={next} disabled={busy} emphasis={carry ? 'strong' : 'normal'}>{step === 'book-open' ? 'See how large the embedding is' : step === 'embedding-scale' ? 'Do the lookup for every token' : all ? 'Carry only “it” forward' : 'Ask what context it needs'}</StoryButton></div> : null}
    </motion.section>
  )
}

function AttentionLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'attention-problem', 'attention-heads')
  const qkv = between(step, 'attention-qkv', 'attention-heads')
  const kv = between(step, 'attention-kv', 'attention-heads')
  const match = between(step, 'attention-match', 'attention-heads')
  const weights = between(step, 'attention-weights', 'attention-heads')
  const values = between(step, 'attention-values', 'attention-heads')
  const update = between(step, 'attention-update', 'attention-heads')
  const heads = step === 'attention-heads'

  return (
    <motion.section className="prod7-attention" animate={{ opacity: active ? 1 : 0 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <div className="prod7-chapter-heading"><small>ATTENTION · BUILD CONTEXT</small><h2>What should <b>“it”</b> use from the sentence?</h2><p>We will use the familiar Q/K/V attention picture as a teaching lens. GLM‑5.3‑Flash uses a hybrid attention system internally, so exact mechanics vary by layer.</p></div>

      <div className="prod7-attention-workbench">
        <div className="prod7-attention-rep"><Representation note={update ? 'updated representation' : 'representation of'} /><span>{update ? 'now carries a mixture of useful context' : 'starts as a numerical representation'}</span></div>

        {qkv ? <motion.div className="prod7-qkv-lens" initial={{ opacity: 0, y: 10 }} animate={{ opacity: weights ? 0.42 : 1, y: 0 }}>
          <div data-role="q"><b>Q</b><strong>Query</strong><span>the view used to look for a match</span></div>
          <div data-role="k"><b>K</b><strong>Key</strong><span>the view each token offers for matching</span></div>
          <div data-role="v"><b>V</b><strong>Value</strong><span>the information that can be carried back</span></div>
          <small>Q, K and V are learned vectors — these English phrases are only intuition.</small>
        </motion.div> : null}

        {kv ? <div className="prod7-attention-table">
          {ATTENTION_WORDS.map((word, index) => {
            const future = index > IT_INDEX
            const source = index === IT_INDEX
            return <motion.div key={word} data-future={future ? 'true' : undefined} data-source={source ? 'true' : undefined} animate={{ opacity: future ? 0.2 : 1 }}><strong>{word}</strong><span className="prod7-k">K</span><span className="prod7-v">V</span>{future ? <small>not visible yet</small> : null}</motion.div>
          })}
          <div className="prod7-causal-note"><SketchAnnotation type="underline" color="#e89a64" strokeWidth={2}>At “it”, the model can use earlier positions — not future words.</SketchAnnotation></div>
        </div> : null}

        {match ? <svg className="prod7-match-lines" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">{ATTENTION_WORDS.map((word, index) => {
          if (index > IT_INDEX || index === IT_INDEX) return null
          const x = 85 + index * 128
          const weight = ATTENTION_WEIGHTS[index]
          return <motion.path key={word} d={`M 825 72 C 750 160 ${x} 120 ${x} 278`} fill="none" stroke="currentColor" strokeWidth={1.2 + weight / 8} strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: weights ? 0.18 : 0.26 + weight / 85 }} transition={{ duration: 0.55, delay: index * 0.045 }} />
        })}</svg> : null}

        {match ? <div className="prod7-query-chip"><b>Q</b><span>from “it”</span><small>compare this Query with every allowed Key</small></div> : null}

        {weights ? <motion.div className="prod7-weight-board" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <header><strong>match scores → attention weights</strong><small>illustrative one-view example · totals 100%</small></header>
          <div>{ATTENTION_WORDS.map((word, index) => <span key={word} data-future={index > IT_INDEX ? 'true' : undefined} data-strong={word === 'ball' ? 'true' : undefined}><b>{word}</b><i style={{ '--w': `${ATTENTION_WEIGHTS[index]}%` } as CSSProperties} /><em>{index > IT_INDEX ? '—' : `${ATTENTION_WEIGHTS[index]}%`}</em></span>)}</div>
        </motion.div> : null}

        {values ? <motion.div className="prod7-value-mix" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="prod7-value-streams">{ATTENTION_WORDS.slice(0, IT_INDEX + 1).map((word, index) => <span key={word} style={{ '--w': ATTENTION_WEIGHTS[index] / 46 } as CSSProperties}><b>V</b><small>{word}</small><i /></span>)}</div>
          <div className="prod7-mixer"><small>WEIGHTED MIX</small><strong>Σ</strong><span>stronger attention → more of that Value contributes</span></div>
        </motion.div> : null}

        {update ? <motion.div className="prod7-context-result" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}><small>ATTENTION OUTPUT</small><strong>useful context is mixed back into the representation</strong><p>In this teaching view, information around <b>ball</b> contributes strongly to the context carried by <b>it</b>. One layer does not permanently define the word; later layers keep refining it.</p></motion.div> : null}

        {heads ? <motion.div className="prod7-many-heads" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div>{Array.from({ length: 16 }, (_, index) => <i key={index} style={{ '--n': index } as CSSProperties} />)}</div><strong>We drew one attention view.</strong><span>{MODEL.attentionHeads} attention heads are configured in GLM‑5.3‑Flash, and its real architecture mixes linear and sparse attention mechanisms.</span><small>Different heads/layers can capture different relationships. Attention weights are not a complete explanation of model reasoning.</small></motion.div> : null}
      </div>

      <div className="prod7-local-action"><StoryButton onClick={next} disabled={busy} emphasis={heads ? 'strong' : 'normal'}>{step === 'attention-problem' ? 'Make Q, K and V views' : step === 'attention-qkv' ? 'Give every token a Key and Value' : step === 'attention-kv' ? 'Compare “it” with the allowed Keys' : step === 'attention-match' ? 'Turn matches into attention weights' : step === 'attention-weights' ? 'Use the weights to read Values' : step === 'attention-values' ? 'Mix that context into “it”' : step === 'attention-update' ? 'Zoom out: this is only one attention view' : 'Now see what happens after attention'}</StoryButton></div>
    </motion.section>
  )
}

function ExpertWall({ selected = false, scores = false, quiet = false }: { selected?: boolean; scores?: boolean; quiet?: boolean }) {
  return (
    <div className="prod7-expert-wall" data-selected={selected ? 'true' : undefined} data-quiet={quiet ? 'true' : undefined} aria-label="288 routed experts">
      {Array.from({ length: MODEL.routedExperts }, (_, index) => {
        const on = SELECTED_EXPERTS.has(index)
        const score = ((index * 37 + 19) % 100) / 100
        return <motion.i key={index} data-on={selected && on ? 'true' : undefined} style={{ '--score': scores ? score : 0.24 } as CSSProperties} animate={{ opacity: selected && !on ? 0.08 : quiet ? 0.18 : scores ? 0.22 + score * 0.7 : 0.48 }} />
      })}
    </div>
  )
}

function MoeLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'moe-where', 'moe-active-path')
  const dense = between(step, 'moe-dense', 'moe-active-path')
  const experts = between(step, 'moe-experts', 'moe-active-path')
  const router = between(step, 'moe-router', 'moe-active-path')
  const scores = between(step, 'moe-scores', 'moe-active-path')
  const top8 = between(step, 'moe-top8', 'moe-active-path')
  const shared = between(step, 'moe-shared', 'moe-active-path')
  const process = between(step, 'moe-process', 'moe-active-path')
  const mix = between(step, 'moe-mix', 'moe-active-path')
  const compare = step === 'moe-token-compare'
  const reroute = step === 'moe-reroute'
  const activePath = step === 'moe-active-path'

  return (
    <motion.section className="prod7-moe" animate={{ opacity: active ? 1 : 0 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <div className="prod7-chapter-heading"><small>MIXTURE OF EXPERTS · SELECTIVE COMPUTE</small><h2>{step === 'moe-where' ? 'Attention is only one part of a layer.' : 'Now choose which feed-forward blocks do the work.'}</h2><p>GLM‑5.3‑Flash uses sparse MoE feed-forward blocks in {MODEL.moeLayers} of its {MODEL.layers} language layers.</p></div>

      <div className="prod7-moe-workbench">
        {step === 'moe-where' ? <motion.div className="prod7-layer-anatomy" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Representation note="token representation" /><b>→</b><div><small>1</small><strong>Attention</strong><span>gather context</span></div><b>→</b><div data-next="true"><small>2</small><strong>Feed-forward block</strong><span>transform the representation</span></div><b>→</b><Representation note="next representation" compact /><p>In the first 3 GLM layers this feed-forward block is dense. In the next 42, it becomes MoE.</p></motion.div> : null}

        {dense ? <motion.div className="prod7-dense-baseline" animate={{ opacity: experts ? 0.2 : 1, x: experts ? -160 : 0 }}><small>DENSE BASELINE</small><Representation note="input" compact /><b>→</b><div className="prod7-dense-machine"><strong>ONE MLP</strong><span>every token uses the same feed-forward block</span><i /><i /><i /></div><b>→</b><span>updated vector</span></motion.div> : null}

        {experts ? <motion.div className="prod7-moe-field" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
          <header><div><small>SPARSE MOE</small><strong>{MODEL.routedExperts} routed expert blocks</strong><span>An expert is a learned feed-forward neural-network block — not a hand-labelled “math expert” or “coding expert”.</span></div><div className="prod7-shared-lane" data-on={shared ? 'true' : undefined}><b>★</b><strong>1 shared expert</strong><small>always participates</small></div></header>
          <ExpertWall selected={top8} scores={scores} quiet={process || mix || compare || reroute || activePath} />
          {router ? <motion.div className="prod7-router" layoutId="prod7-router" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}><small>LEARNED ROUTER</small><strong>read the current representation</strong><Representation note="routing input" compact /><span>{scores ? `produce a routing score for ${MODEL.routedExperts} experts` : 'the router does not read the token ID; it reads the current vector'}</span></motion.div> : null}
          {scores && !top8 ? <div className="prod7-score-note"><SketchAnnotation type="highlight" color="#f4c95d">score all 288 routed experts</SketchAnnotation><span>GLM's config uses sigmoid expert scoring; we hide the math here and keep the selection idea.</span></div> : null}
          {top8 && !process ? <motion.div className="prod7-top8-note" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}><strong>Top 8 survive.</strong><span>280 routed experts remain stored and available, but they do no routed-expert work for this token in this layer.</span></motion.div> : null}

          {process ? <motion.div className="prod7-expert-processing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><header><strong>Selected experts transform in parallel.</strong><span>They do not vote on an answer. Each applies different learned weights to the same input representation.</span></header><div>{Array.from(SELECTED_EXPERTS).map((expert, index) => <motion.div key={expert} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}><small>E{expert + 1}</small><VectorStrip compact /><b>→</b><i /></motion.div>)}</div></motion.div> : null}

          {mix ? <motion.div className="prod7-route-mix" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}><div className="prod7-route-weight-list">{ROUTE_WEIGHTS.slice(0, 4).map((weight, index) => <span key={weight}><small>E{Array.from(SELECTED_EXPERTS)[index] + 1}</small><b>{weight}%</b></span>)}<em>+ 4 more routed outputs</em></div><div className="prod7-route-sigma">Σ</div><div><strong>one routed mixture</strong><VectorStrip compact /><small>weights are illustrative</small></div><div className="prod7-shared-plus">+ <b>shared expert path</b></div></motion.div> : null}

          {compare ? <motion.div className="prod7-route-compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><strong>Routing is per token.</strong><p>The same router can choose a different expert set for each current token representation.</p>{['it','ball','rolled'].map((token, row) => <div key={token}><b>{token}</b><span>{Array.from({ length: 20 }, (_, i) => <i key={i} data-on={(i * 7 + row * 5) % 9 < 3 ? 'true' : undefined} />)}</span><small>different route fingerprint</small></div>)}<em>route patterns are illustrative</em></motion.div> : null}

          {reroute ? <motion.div className="prod7-reroute" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><strong>The next sparse layer asks again.</strong><div><span>layer N</span><i>8 selected</i><b>→ updated representation →</b><span>layer N+1</span><i>possibly a different 8</i></div><p>Because the representation has changed, the next router can make a new choice.</p></motion.div> : null}

          {activePath ? <motion.div className="prod7-active-path-explainer" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}><small>NOW CONNECT THIS TO THE TITLE</small><div><span><b>{MODEL.totalParamsB}B</b> total</span><i>stored / available</i></div><div className="is-active"><span><b>~{MODEL.activeParamsB}B</b> active</span><i>everything touched along one token's full path through the model</i></div><p><strong>Important:</strong> 18B is not “eight experts in one layer”. It includes the active path across the whole forward pass — shared components plus selected expert parameters and other always-used model parts.</p></motion.div> : null}
        </motion.div> : null}
      </div>

      <div className="prod7-local-action"><StoryButton onClick={next} disabled={busy} emphasis={activePath ? 'strong' : 'normal'}>{step === 'moe-where' ? 'First see the dense baseline' : step === 'moe-dense' ? 'Replace one MLP with many experts' : step === 'moe-experts' ? 'Give the current vector to the router' : step === 'moe-router' ? 'Score all 288 experts' : step === 'moe-scores' ? 'Keep only the top 8' : step === 'moe-top8' ? 'Reveal the shared expert path' : step === 'moe-shared' ? 'Let the selected experts process the vector' : step === 'moe-process' ? 'Mix the expert outputs' : step === 'moe-mix' ? 'Try another token' : step === 'moe-token-compare' ? 'Ask the next layer to route again' : step === 'moe-reroute' ? 'Connect routing to the 18B number' : 'Zoom out to all 45 layers'}</StoryButton></div>
    </motion.section>
  )
}

function BuildingLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'building' || step === 'floors' || step === 'output' || step === 'output-repeat'
  const running = step === 'floors'
  const output = step === 'output' || step === 'output-repeat'
  const floors = Array.from({ length: 13 }, (_, i) => i)
  return (
    <motion.section className="prod4-building-layer prod7-building" animate={{ opacity: active ? 1 : 0, x: output ? '-26%' : '0%', scale: output ? 0.72 : 1 }} transition={{ type: 'spring', stiffness: 88, damping: 19 }} style={{ pointerEvents: active && !output ? 'auto' : 'none' }} aria-hidden={!active}>
      <div className="prod4-building-roof"><small>{MODEL.name}</small><strong>{MODEL.layers} transformer layers</strong></div>
      <div className="prod4-building-floors">{floors.map((_, index) => { const real = index < 3 ? index + 1 : index === floors.length - 1 ? 45 : 4 + (index - 3) * 4; const dense = real <= MODEL.firstDenseLayers; const lit = running && [3,5,7,9,11].includes(index); return <motion.div key={index} className="prod4-floor" data-dense={dense ? 'true' : undefined} data-lit={lit ? 'true' : undefined}><small>{real}</small><strong>{dense ? 'attention + dense MLP' : 'attention + sparse MoE'}</strong>{!dense ? <div>{Array.from({ length: 8 }, (_, expert) => <i key={expert} data-on={lit && (expert + index) % 3 === 0 ? 'true' : undefined} />)}</div> : null}</motion.div> })}</div>
      <div className="prod4-building-caption"><span>layers 1–3: dense MLP</span><span>layers 4–45: sparse MoE</span></div>
      {running ? <motion.div className="prod4-refine-explainer prod7-refine" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}><small>WHAT REPEATS?</small><strong>attention builds context; then the feed-forward/MoE block transforms; then the next layer repeats</strong><span>The current representation changes each time, so attention relationships and MoE routes can also change.</span><b>attention → MoE/dense → updated representation → next layer</b></motion.div> : null}
      {!output ? <div className="prod4-local-action prod4-building-action"><StoryButton onClick={next} disabled={busy} emphasis={running ? 'strong' : 'normal'}>{step === 'building' ? 'Run one representation through the stack' : 'Reach the next-token output'}</StoryButton></div> : null}
    </motion.section>
  )
}

function OutputLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'output' || step === 'output-repeat'
  const repeat = step === 'output-repeat'
  const candidates = [['The',0.78],['Because',0.36],['It',0.25],['A',0.14]] as const
  return <motion.section className="prod4-output-layer" animate={{ opacity: active ? 1 : 0, x: active ? '24%' : '30%' }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}><small>AFTER LAYER 45</small><strong>the model scores possible next tokens</strong><div className="prod4-candidates">{candidates.map(([token, probability], index) => <motion.div key={token} initial={{ opacity: 0, x: 8 }} animate={{ opacity: repeat && index > 0 ? 0.24 : 1, x: 0 }} transition={{ delay: index * 0.06 }}><span>{token}</span><i style={{ '--p': probability } as CSSProperties} /><small>{Math.round(probability * 100)}%</small></motion.div>)}</div><div className="prod4-generated"><small>GENERATED ONE TOKEN AT A TIME</small><p><b>The</b> ball rolled away…</p></div>{repeat ? <motion.div className="prod4-output-loop" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><strong>then the full stack runs again for the next generated token</strong><span>updated context → 45 layers → next-token scores → choose one → repeat</span><i>↺</i></motion.div> : null}<StoryButton onClick={next} disabled={busy} emphasis={repeat ? 'strong' : 'normal'}>{repeat ? 'Answer the 320B question' : 'Show the generation loop'}</StoryButton><span className="prod4-illustrative prod4-output-note">candidate probabilities are illustrative</span></motion.section>
}

function PayoffLayer({ step }: { step: Step }) {
  const active = step === 'payoff'
  return <motion.section className="prod6-payoff prod7-payoff" animate={{ opacity: active ? 1 : 0, y: active ? 0 : 16 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}><small>NOW THE TITLE MAKES SENSE</small><h2>{MODEL.totalParamsB}B parameters are stored and available.</h2><p>But each token only travels through a sparse active path.</p><div className="prod6-payoff-equation"><div><span>Total capacity</span><strong>{MODEL.totalParamsB}B</strong></div><b>→</b><div><span>Active path per token</span><strong>~{MODEL.activeParamsB}B</strong></div></div><SketchAnnotation type="underline" color="#e89a64" strokeWidth={4} duration={700}><strong className="prod6-payoff-line">MoE increases model capacity without making every token compute through every expert.</strong></SketchAnnotation></motion.section>
}

export default function Glm320bVideoV7() {
  const [index, setIndex] = useState(0)
  const [typingReady, setTypingReady] = useState(false)
  const { busy, run } = useActionGate(520)
  const step = STEPS[index]

  const next = useCallback(() => {
    if (index >= STEPS.length - 1) return
    if (step === 'chat-typing' && !typingReady) return
    const currentChapter = chapterForStep(step)
    const nextStep = STEPS[index + 1]
    const nextChapter = chapterForStep(nextStep)
    const majorChange = currentChapter !== nextChapter || nextStep === 'journey'
    run(() => setIndex((current) => Math.min(STEPS.length - 1, current + 1)), majorChange ? 760 : 470)
  }, [index, run, step, typingReady])

  const previous = useCallback(() => {
    if (index <= 0) return
    const currentChapter = chapterForStep(step)
    const previousStep = STEPS[index - 1]
    const previousChapter = chapterForStep(previousStep)
    const majorChange = currentChapter !== previousChapter || step === 'journey'
    run(() => setIndex((current) => Math.max(0, current - 1)), majorChange ? 680 : 400)
  }, [index, run, step])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return
      if (event.repeat || busy) return
      if (event.key === 'ArrowRight' || event.key === ' ') { event.preventDefault(); next() }
      if (event.key === 'ArrowLeft') { event.preventDefault(); previous() }
      if (event.key === 'Home') { event.preventDefault(); setIndex(0) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [busy, next, previous])

  return (
    <VideoPage className="glm-production-page prod4-page prod6-page prod7-page">
      <LayoutGroup id="glm-320b-explanation-v7">
        <SceneFrame art="paper" className="prod4-scene prod6-scene prod7-scene">
          <PaperWorld />
          <div className="prod4-safe-frame prod6-safe-frame prod7-safe-frame">
            <ChapterRail step={step} />
            <div className="prod4-world prod6-world prod7-world" data-step={step}>
              <ModelPaper step={step} next={next} busy={busy} />
              <JourneyOverview step={step} next={next} busy={busy} />
              <ChatLayer step={step} next={next} busy={busy} typingReady={typingReady} setTypingReady={setTypingReady} />
              <TokenLayer step={step} next={next} busy={busy} />
              <EmbeddingLayer step={step} next={next} busy={busy} />
              <AttentionLayer step={step} next={next} busy={busy} />
              <MoeLayer step={step} next={next} busy={busy} />
              <BuildingLayer step={step} next={next} busy={busy} />
              <OutputLayer step={step} next={next} busy={busy} />
              <PayoffLayer step={step} />
            </div>
            {index > 0 ? <div className="prod6-back"><StoryIconButton label="Previous beat" icon="←" onClick={previous} disabled={busy} /></div> : null}
            <div className="prod6-page-number" aria-label={`Beat ${index + 1} of ${STEPS.length}`}><span>{index + 1}</span><i />{STEPS.length}</div>
          </div>
        </SceneFrame>
      </LayoutGroup>
    </VideoPage>
  )
}
