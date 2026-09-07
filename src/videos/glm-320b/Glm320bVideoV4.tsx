import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { type CSSProperties, useCallback, useEffect, useMemo, useState } from 'react'
import { StoryButton, StoryIconButton } from '../../components/StoryButton'
import { SceneFrame, VideoPage } from '../../engine/SceneFrame'
import { useActionGate } from '../../engine/useActionGate'
import { BookVisual } from '../../visuals/BookVisual'
import { IndexBoard } from '../../visuals/IndexBoard'
import './glm-320b-video-v4.css'

const MODEL = {
  name: 'GLM-5.3-Flash',
  maker: 'Z.ai',
  totalParamsB: 320,
  activeParamsB: 18,
  activePercent: 5.6,
  layers: 45,
  linearAttentionLayers: 34,
  sparseAttentionLayers: 11,
  firstDenseLayers: 3,
  moeLayers: 42,
  routedExperts: 288,
  expertsPerToken: 8,
  sharedExperts: 1,
  hiddenSize: 4_096,
  vocabSize: 154_880,
  attentionHeads: 64,
  maxContext: 1_048_576,
} as const

const sentence = 'The dog chased the ball because it rolled away.'

// The architecture facts above are published model facts. The teaching token split,
// token IDs, embedding values, attention weights, routing weights and output scores
// below are intentionally illustrative until exact checkpoint values are pinned.
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
const EXPERT_SAMPLE = Array.from({ length: 48 }, (_, i) => i)
const ACTIVE_EXPERTS = new Set([2, 7, 13, 19, 25, 31, 38, 44])
const ROUTING_WEIGHTS = [24, 18, 15, 13, 11, 8, 6, 5]

const STEPS = [
  'model-overview',
  'model-parameters',
  'model-moe',
  'journey',
  'chat-empty',
  'chat-ready',
  'chat-sent',
  'tokens',
  'token-kinds',
  'token-ids',
  'focus-it',
  'id-index',
  'book-arrives',
  'book-open',
  'all-embeddings',
  'embedding-carry',
  'attention-question',
  'qkv',
  'attention',
  'attention-answer',
  'moe-intro',
  'moe-router',
  'moe-top8',
  'moe-shared',
  'moe-merge',
  'building',
  'floors',
  'output',
  'output-repeat',
  'payoff',
] as const

type Step = (typeof STEPS)[number]
type Stage = 'MODEL' | 'JOURNEY' | 'TEXT' | 'TOKENS' | 'TOKEN ID' | 'EMBEDDING' | 'ATTENTION' | 'MOE' | 'LAYERS' | 'OUTPUT' | 'ANSWER'

const STAGE: Record<Step, Stage> = {
  'model-overview': 'MODEL',
  'model-parameters': 'MODEL',
  'model-moe': 'MODEL',
  journey: 'JOURNEY',
  'chat-empty': 'TEXT',
  'chat-ready': 'TEXT',
  'chat-sent': 'TEXT',
  tokens: 'TOKENS',
  'token-kinds': 'TOKENS',
  'token-ids': 'TOKEN ID',
  'focus-it': 'TOKEN ID',
  'id-index': 'TOKEN ID',
  'book-arrives': 'EMBEDDING',
  'book-open': 'EMBEDDING',
  'all-embeddings': 'EMBEDDING',
  'embedding-carry': 'EMBEDDING',
  'attention-question': 'ATTENTION',
  qkv: 'ATTENTION',
  attention: 'ATTENTION',
  'attention-answer': 'ATTENTION',
  'moe-intro': 'MOE',
  'moe-router': 'MOE',
  'moe-top8': 'MOE',
  'moe-shared': 'MOE',
  'moe-merge': 'MOE',
  building: 'LAYERS',
  floors: 'LAYERS',
  output: 'OUTPUT',
  'output-repeat': 'OUTPUT',
  payoff: 'ANSWER',
}

const JOURNEY = ['Text', 'Tokens', 'IDs', 'Embeddings', 'Attention', 'Router', 'Experts', '×45', 'Output'] as const

function stepIndex(step: Step) {
  return STEPS.indexOf(step)
}

function between(step: Step, start: Step, end: Step) {
  const index = stepIndex(step)
  return index >= stepIndex(start) && index <= stepIndex(end)
}

function StageBadge({ stage }: { stage: Stage }) {
  return (
    <div className="prod4-stage-badge" aria-label={`Current stage: ${stage}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.strong
          key={stage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.16 }}
        >
          {stage}
        </motion.strong>
      </AnimatePresence>
    </div>
  )
}

function PaperWorld() {
  return <div className="prod4-paper" aria-hidden="true"><i /><i /><i /></div>
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

function ModelDossier({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'model-overview', 'model-moe') || step === 'payoff'
  const parameters = step === 'model-parameters'
  const architecture = step === 'model-moe'
  const payoff = step === 'payoff'

  return (
    <motion.section
      className="prod4-model-dossier"
      data-parameters={parameters ? 'true' : undefined}
      data-architecture={architecture ? 'true' : undefined}
      data-payoff={payoff ? 'true' : undefined}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.96, y: active ? 0 : -18 }}
      transition={{ type: 'spring', stiffness: 125, damping: 22, mass: 0.85 }}
      style={{ pointerEvents: active ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      <header className="prod4-dossier-head">
        <div>
          <span>{MODEL.maker}</span>
          <strong>{MODEL.name}</strong>
        </div>
        <div className="prod4-dossier-tags">
          <span>Mixture of Experts</span>
          <span>natively multimodal</span>
          <span>hybrid attention</span>
        </div>
      </header>

      <div className="prod4-dossier-body">
        <div className="prod4-dossier-main">
          <div className="prod4-model-description">
            <small>THE MODEL WE WILL OPEN UP</small>
            <p>
              A <b>320-billion-parameter</b> model designed so that one token does not need to use the whole network at once.
            </p>
          </div>

          <div className="prod4-param-pair">
            <motion.div className="prod4-param-card is-total" animate={{ opacity: parameters || architecture || payoff ? 0.58 : 1 }}>
              <small>TOTAL PARAMETERS</small>
              <strong>{MODEL.totalParamsB}B</strong>
              <span>all learned parameters stored in the model</span>
            </motion.div>
            <div className="prod4-param-arrow">→</div>
            <motion.div className="prod4-param-card is-active" animate={{ scale: parameters || payoff ? 1.035 : 1 }}>
              <small>ACTIVE FOR ONE TOKEN</small>
              <strong>~{MODEL.activeParamsB}B</strong>
              <span>the parameters that participate in this token's active path</span>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {parameters ? (
              <motion.div className="prod4-param-explainer" key="parameters" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div>
                  <small>WHAT IS A PARAMETER?</small>
                  <strong>a learned number inside the model</strong>
                  <span>Billions of these numbers store the model's learned behavior.</span>
                </div>
                <div>
                  <small>WHAT DOES “ACTIVE” MEAN?</small>
                  <strong>used on this token's path</strong>
                  <span>Not every expert block is called for every token.</span>
                </div>
                <div className="prod4-active-meter">
                  <span><b>~{MODEL.activePercent}%</b> active</span>
                  <i><b /></i>
                  <small>{MODEL.activeParamsB}B out of {MODEL.totalParamsB}B</small>
                </div>
              </motion.div>
            ) : architecture ? (
              <motion.div className="prod4-moe-definition" key="moe" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="prod4-mini-router">
                  <span>token</span><b>ROUTER</b><span>{MODEL.expertsPerToken} of {MODEL.routedExperts}</span>
                </div>
                <div>
                  <small>MIXTURE OF EXPERTS</small>
                  <strong>many expert blocks exist; the router wakes only a few</strong>
                  <span>GLM also has {MODEL.sharedExperts} shared expert that participates alongside the routed experts.</span>
                </div>
              </motion.div>
            ) : payoff ? (
              <motion.div className="prod4-payoff-summary" key="payoff" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <strong>The whole 320B model is available.</strong>
                <span>For one token, sparse routing activates a much smaller path — about 18B parameters.</span>
              </motion.div>
            ) : (
              <motion.div className="prod4-hook-question" key="hook" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <small>THE QUESTION</small>
                <strong>How can 320B exist while only ~18B are active?</strong>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="prod4-model-facts">
          <div className="prod4-facts-heading"><small>ARCHITECTURE</small><strong>what is inside</strong></div>
          <div className="prod4-fact-grid">
            <div><b>{MODEL.layers}</b><span>language layers</span></div>
            <div><b>{MODEL.firstDenseLayers}</b><span>dense MLP layers</span></div>
            <div><b>{MODEL.moeLayers}</b><span>sparse MoE layers</span></div>
            <div className="is-accent"><b>{MODEL.routedExperts}</b><span>routed experts</span></div>
            <div className="is-accent"><b>top-{MODEL.expertsPerToken}</b><span>routed / token</span></div>
            <div><b>{MODEL.sharedExperts}</b><span>shared expert</span></div>
            <div><b>{MODEL.hiddenSize.toLocaleString()}</b><span>hidden size</span></div>
            <div><b>{MODEL.vocabSize.toLocaleString()}</b><span>vocabulary</span></div>
          </div>
          <div className="prod4-attention-facts">
            <span><b>{MODEL.linearAttentionLayers}</b> linear-attention layers</span>
            <span><b>{MODEL.sparseAttentionLayers}</b> sparse-attention layers</span>
          </div>
          <div className="prod4-context-fact"><small>configured max context</small><strong>{MODEL.maxContext.toLocaleString()} tokens</strong></div>
        </aside>
      </div>

      {!payoff ? (
        <div className="prod4-dossier-action">
          <StoryButton onClick={next} disabled={busy} emphasis={architecture ? 'strong' : 'normal'}>
            {step === 'model-overview' ? 'What do 320B and 18B mean?' : step === 'model-parameters' ? 'Where does MoE fit?' : 'Follow one prompt'}
          </StoryButton>
        </div>
      ) : null}
    </motion.section>
  )
}

function JourneyLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'journey'
  return (
    <motion.section
      className="prod4-journey"
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.98 }}
      style={{ pointerEvents: active ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      <div className="prod4-journey-copy">
        <small>BEFORE WE ANSWER THE 18B QUESTION</small>
        <strong>follow one simple prompt through the model</strong>
        <p>Don't memorize this map. We will open it one piece at a time.</p>
      </div>
      <div className="prod4-journey-line">
        {JOURNEY.map((item, index) => (
          <div className="prod4-journey-wrap" key={item}>
            {index > 0 ? <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ delay: index * 0.04 }} /> : null}
            {index === 0 ? (
              <motion.button type="button" className="prod4-journey-node is-start" onClick={next} disabled={busy} whileHover={{ y: -4 }} whileTap={{ y: 1, scale: 0.98 }}>
                <span>✎</span><strong>{item}</strong><small>start</small>
              </motion.button>
            ) : <div className="prod4-journey-node"><strong>{item}</strong></div>}
          </div>
        ))}
      </div>
    </motion.section>
  )
}

function ChatLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'chat-empty', 'chat-sent')
  const ready = step === 'chat-ready' || step === 'chat-sent'
  const sent = step === 'chat-sent'

  return (
    <motion.section
      className="prod4-chat"
      animate={{ opacity: active ? (sent ? 0.22 : 1) : 0, scale: active ? (sent ? 0.94 : 1) : 0.96, y: sent ? -52 : 0 }}
      transition={{ type: 'spring', stiffness: 145, damping: 23 }}
      style={{ pointerEvents: active && !sent ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      <div className="prod4-chat-shell">
        <header><div><span>GLM</span><strong>5.3 Flash</strong></div><small>new chat</small></header>
        <div className="prod4-chat-space"><div><i>✦</i><span>Send a message to the model</span></div></div>
        <div className="prod4-chat-input">
          {!ready ? <span className="is-placeholder">Ask anything…</span> : <span className="is-ghost">{sentence}</span>}
          {!ready ? (
            <StoryButton onClick={next} disabled={busy}>Type our example</StoryButton>
          ) : (
            <motion.button type="button" className="prod4-enter" onClick={next} disabled={busy} whileTap={{ scale: 0.96 }}>
              <span>ENTER</span><b>↵</b>
            </motion.button>
          )}
        </div>
      </div>
    </motion.section>
  )
}

function SentenceActor({ step }: { step: Step }) {
  const visible = between(step, 'chat-ready', 'tokens')
  const inChat = step === 'chat-ready' || step === 'chat-sent'

  return (
    <motion.div
      className="prod4-sentence-actor"
      animate={{
        opacity: visible ? 1 : 0,
        y: inChat ? '17%' : '-19%',
        scale: inChat ? 0.56 : 0.9,
      }}
      transition={{ type: 'spring', stiffness: 115, damping: 20, mass: 0.9 }}
      aria-hidden={!visible}
    >
      {sentence}
    </motion.div>
  )
}

function TokenLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'tokens', 'id-index')
  const showKinds = step === 'token-kinds'
  const showIds = between(step, 'token-ids', 'id-index')
  const focus = step === 'focus-it' || step === 'id-index'
  const indexView = step === 'id-index'

  return (
    <motion.section className="prod4-token-layer" animate={{ opacity: active ? 1 : 0 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <div className="prod4-token-source"><span>{sentence}</span><i /></div>
      <motion.div className="prod4-token-row" animate={{ x: indexView ? '-18%' : '0%', scale: indexView ? 0.84 : 1 }}>
        {TOKENS.map((token, index) => (
          <motion.div
            key={`${token.text}-${index}`}
            className="prod4-token"
            data-it={index === IT_INDEX ? 'true' : undefined}
            animate={{
              opacity: focus && index !== IT_INDEX ? 0.15 : focus && index === IT_INDEX ? (indexView ? 0 : 1) : 1,
              y: focus && index === IT_INDEX ? -12 : 0,
              scale: focus && index === IT_INDEX ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 170, damping: 22, delay: step === 'tokens' ? index * 0.025 : 0 }}
          >
            <span>{token.text.replace(/^ /, '·')}</span>
            {showIds ? <small>ID {token.id}</small> : null}
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {showKinds ? (
          <motion.div className="prod4-token-kinds" key="kinds" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div><b>dog</b><span>a token can be a whole word</span></div>
            <div><b>un · believ · able</b><span>a long word may become several pieces</span><small>generic example</small></div>
            <div><b>.</b><span>punctuation can be a token too</span></div>
          </motion.div>
        ) : showIds && !focus ? (
          <motion.div className="prod4-id-explainer" key="ids" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <small>{MODEL.name} has {MODEL.vocabSize.toLocaleString()} vocabulary entries</small>
            <strong>each entry has an ID from 0 to {MODEL.vocabSize - 1}</strong>
            <span>The ID is just the model's lookup number for that token.</span>
          </motion.div>
        ) : indexView ? (
          <motion.div className="prod4-index-wall" key="index" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <IndexBoard rows={9} label="TOKEN VOCABULARY" ariaLabel="Token vocabulary index metaphor">
              <div className="prod4-index-rows">
                {['17,2…', '31,5…', '49,6…', '68,7…', '73,1…', '82,4…', '91,4…', '122,…', '154,8…'].map((id, row) => (
                  <div key={id} data-focus={row === 5 ? 'true' : undefined}>
                    <small>{id}</small><span>{row === 5 ? 'it' : ['The', 'because', 'away', 'ball', 'rolled', 'it', 'dog', '…', '…'][row]}</span>{row === 5 ? <b>← our token</b> : null}
                  </div>
                ))}
              </div>
            </IndexBoard>
            <span className="prod4-illustrative">ID shown here is illustrative until exact tokenizer values are pinned.</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="prod4-local-action prod4-token-action">
        <StoryButton onClick={next} disabled={busy} emphasis={indexView ? 'strong' : 'normal'}>
          {step === 'tokens' ? 'What counts as a token?' : step === 'token-kinds' ? 'Give tokens IDs' : step === 'token-ids' ? 'Follow one token' : step === 'focus-it' ? 'Find “it” in the vocabulary' : 'Use this ID'}
        </StoryButton>
      </div>
    </motion.section>
  )
}

function HeroActor({ step }: { step: Step }) {
  const visible = between(step, 'focus-it', 'output-repeat')
  const vector = between(step, 'book-open', 'output-repeat')
  const tokenOnly = between(step, 'moe-intro', 'moe-merge')

  const position = useMemo(() => {
    if (step === 'focus-it') return { x: '0%', y: '-4%', scale: 1 }
    if (step === 'id-index') return { x: '27%', y: '4%', scale: 0.86 }
    if (step === 'book-arrives') return { x: '-27%', y: '4%', scale: 0.86 }
    if (step === 'book-open' || step === 'all-embeddings') return { x: '-28%', y: '-17%', scale: 0.78 }
    if (step === 'embedding-carry' || step === 'attention-question' || between(step, 'qkv', 'attention-answer')) return { x: '-30%', y: '-25%', scale: 0.74 }
    if (tokenOnly) return { x: '-34%', y: '-3%', scale: 0.78 }
    if (step === 'building') return { x: '0%', y: '34%', scale: 0.62 }
    if (step === 'floors') return { x: '0%', y: '-31%', scale: 0.58 }
    if (step === 'output' || step === 'output-repeat') return { x: '-29%', y: '-25%', scale: 0.5 }
    return { x: '0%', y: '0%', scale: 1 }
  }, [step, tokenOnly])

  return (
    <motion.div
      className="prod4-hero-actor"
      animate={{ opacity: visible ? 1 : 0, ...position }}
      transition={{ type: 'spring', stiffness: 100, damping: 19, mass: 0.9 }}
      aria-hidden={!visible}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={vector ? 'vector' : tokenOnly ? 'token' : 'id'} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.15 }}>
          {vector ? (
            <div className="prod4-hero-vector"><small>embedding of</small><strong>it</strong><VectorStrip compact /></div>
          ) : tokenOnly ? (
            <div className="prod4-hero-token"><small>TOKEN</small><strong>it</strong></div>
          ) : (
            <div className="prod4-hero-id"><strong>it</strong><span>ID 82,4…</span><small>illustrative ID</small></div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

function EmbeddingLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'book-arrives', 'embedding-carry')
  const open = between(step, 'book-open', 'embedding-carry')
  const all = step === 'all-embeddings'
  const carry = step === 'embedding-carry'
  const reducedMotion = useReducedMotion()

  return (
    <motion.section className="prod4-embedding-layer" animate={{ opacity: active ? (carry ? 0.3 : 1) : 0, scale: carry ? 0.94 : 1 }} style={{ pointerEvents: active && !carry ? 'auto' : 'none' }} aria-hidden={!active}>
      <div className="prod4-page-key"><small>TOKEN ID</small><strong>82,4…</strong><span>think of this like a page number</span></div>
      <motion.button
        type="button"
        className="prod4-book-button"
        onClick={!open ? next : undefined}
        disabled={busy || open}
        whileHover={!open && !reducedMotion ? { y: -5, rotate: -0.35 } : undefined}
        whileTap={!open && !reducedMotion ? { scale: 0.985 } : undefined}
      >
        <BookVisual
          state={open ? 'open' : 'closed'}
          title="Embeddings"
          subtitle="numerical lookup"
          label="Embedding book"
          leftPage={open ? <div className="prod4-book-left"><small>PAGE / TOKEN ID</small><strong>82,4…</strong><b>“it”</b><span>the ID chooses one learned row</span></div> : undefined}
          rightPage={open ? <div className="prod4-book-right"><small>EMBEDDING — THE NUMERICAL IDENTITY WE CARRY</small><strong>[ 0.29, −0.14, 0.83, 0.07, … ]</strong><div><b>{MODEL.hiddenSize.toLocaleString()}</b><span>values in this representation</span></div><p>We only show the first few numbers. The real vector is much wider.</p></div> : undefined}
        />
        {!open ? <span className="prod4-open-cue">open the matching page ↗</span> : null}
      </motion.button>

      {all ? (
        <motion.div className="prod4-all-embeddings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {TOKENS.slice(0, 7).map((token, index) => <div key={token.text} data-focus={index === IT_INDEX ? 'true' : undefined}><b>{token.text.trim()}</b><span>[{(0.11 + index * 0.03).toFixed(2)}, …]</span></div>)}
          <strong>Every token gets its own embedding.</strong>
          <small>We will carry only “it” so the story stays easy to follow.</small>
        </motion.div>
      ) : null}

      {open ? <div className="prod4-local-action prod4-book-action"><StoryButton onClick={next} disabled={busy} emphasis={all ? 'strong' : 'normal'}>{step === 'book-open' ? 'Do this for every token' : all ? 'Carry “it” forward' : 'Continue'}</StoryButton></div> : null}
    </motion.section>
  )
}

function AttentionLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'attention-question', 'attention-answer')
  const showQkv = between(step, 'qkv', 'attention-answer')
  const scores = step === 'attention' || step === 'attention-answer'
  const answer = step === 'attention-answer'
  const words = ['The', 'dog', 'chased', 'the', 'ball', 'because', 'it', 'rolled', 'away']
  const weights = [0.06, 0.12, 0.18, 0.08, 1, 0.22, 0.28, 0.64, 0.15]

  return (
    <motion.section className="prod4-attention-layer" animate={{ opacity: active ? 1 : 0 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      {step === 'attention-question' ? (
        <motion.div className="prod4-attention-question" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <small>WE HAVE EMBEDDINGS — BUT SOMETHING IS STILL MISSING</small>
          <p>The dog chased the <b>ball</b> because <strong>it</strong> rolled away.</p>
          <h2>How does the model know what “it” refers to?</h2>
          <span>The embedding starts as a token representation. Context has to reshape it.</span>
        </motion.div>
      ) : null}

      {showQkv ? (
        <motion.div className="prod4-qkv" animate={{ opacity: scores ? 0.2 : 1, y: scores ? -50 : 0 }}>
          <div><b>Q</b><strong>Query</strong><span>What am I looking for?</span></div>
          <div><b>K</b><strong>Key</strong><span>What do I match with?</span></div>
          <div><b>V</b><strong>Value</strong><span>What information can I bring?</span></div>
        </motion.div>
      ) : null}

      <motion.div className="prod4-attention-sentence" animate={{ opacity: scores ? 1 : 0, y: scores ? 0 : 24 }}>
        <svg viewBox="0 0 1000 250" preserveAspectRatio="none" aria-hidden="true">
          {scores ? words.map((word, index) => {
            if (word === 'it') return null
            const x = 80 + index * 105
            return <motion.path key={word} d={`M 710 180 C 650 65 ${x} 72 ${x} 158`} fill="none" stroke="currentColor" strokeWidth={1.5 + weights[index] * 6} strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: answer && word !== 'ball' ? 0.08 : 0.16 + weights[index] * 0.7 }} transition={{ duration: 0.55, delay: index * 0.025 }} />
          }) : null}
        </svg>
        <div className="prod4-attention-words">
          {words.map((word, index) => <motion.span key={word} data-source={word === 'it' ? 'true' : undefined} data-answer={answer && word === 'ball' ? 'true' : undefined} animate={{ opacity: answer && !['it', 'ball'].includes(word) ? 0.18 : 1, y: answer && word === 'ball' ? -8 : 0 }}><strong>{word}</strong><i style={{ '--weight': weights[index] } as CSSProperties} /></motion.span>)}
        </div>
        {answer ? <motion.div className="prod4-attention-result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><strong>“it” ↔ “ball”</strong><span>one simplified attention view shows the relationship strengthening</span></motion.div> : null}
      </motion.div>

      <div className="prod4-local-action prod4-attention-action"><StoryButton onClick={next} disabled={busy} emphasis={answer ? 'strong' : 'normal'}>{step === 'attention-question' ? 'Meet Q, K and V' : step === 'qkv' ? 'Let “it” look around' : step === 'attention' ? 'Which connection matters?' : 'Now the main topic: MoE'}</StoryButton></div>
      {scores ? <span className="prod4-illustrative prod4-attention-note">line strengths are illustrative — real attention varies by head and layer</span> : null}
    </motion.section>
  )
}

function MoeLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'moe-intro', 'building')
  const router = between(step, 'moe-router', 'moe-merge')
  const top8 = between(step, 'moe-top8', 'moe-merge')
  const shared = between(step, 'moe-shared', 'moe-merge')
  const merged = step === 'moe-merge'
  const building = step === 'building'

  return (
    <motion.section
      className="prod4-moe-layer"
      data-floor={building ? 'true' : undefined}
      animate={{ opacity: active ? 1 : 0, scale: building ? 0.34 : 1, y: building ? '1%' : '0%' }}
      transition={{ type: 'spring', stiffness: 82, damping: 18, mass: 1.05 }}
      style={{ pointerEvents: active && !building ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      <div className="prod4-moe-heading"><small>ONE SPARSE TRANSFORMER LAYER</small><strong>Mixture of Experts</strong><span>the part that explains the 320B → 18B trick</span></div>
      <div className="prod4-moe-definition-panel">
        <div><b>288</b><span>routed expert blocks exist</span></div>
        <div><b>8</b><span>are selected for this token</span></div>
        <div><b>+ 1</b><span>shared expert participates</span></div>
      </div>

      <motion.div className="prod4-router" animate={{ opacity: router ? 1 : 0.35 }}>
        <small>ROUTER</small><strong>{router ? 'score this token' : 'waiting for a token'}</strong><span>chooses an expert path separately for each token</span><i />
      </motion.div>

      <div className="prod4-experts">
        <IndexBoard rows={8} label={`${MODEL.routedExperts} ROUTED EXPERTS`} ariaLabel="Sample of routed expert blocks">
          <div className="prod4-expert-grid">
            {EXPERT_SAMPLE.map((expert) => {
              const on = top8 && ACTIVE_EXPERTS.has(expert)
              return <motion.div key={expert} className="prod4-expert" data-on={on ? 'true' : undefined} animate={{ opacity: top8 && !on ? 0.12 : 1, y: on ? -3 : 0 }}><i /><small>E{expert + 1}</small></motion.div>
            })}
          </div>
        </IndexBoard>
        <span>48 shown for readability · {MODEL.routedExperts} routed experts exist</span>
      </div>

      {top8 ? (
        <svg className="prod4-routing-lines" viewBox="0 0 1200 650" preserveAspectRatio="none" aria-hidden="true">
          {[120, 255, 385, 510, 690, 825, 950, 1080].map((x, index) => <motion.path key={x} d={`M 316 326 C 470 326 ${x} 344 ${x} 480`} fill="none" stroke="currentColor" strokeWidth={2 + ROUTING_WEIGHTS[index] / 10} strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: merged ? 0.22 : 0.64 }} transition={{ duration: 0.5, delay: index * 0.035 }} />)}
        </svg>
      ) : null}

      {top8 && !merged ? <div className="prod4-top8"><strong>top-{MODEL.expertsPerToken} doors open</strong><span>only these routed experts do work for “it” in this layer</span></div> : null}
      {shared ? <motion.div className="prod4-shared" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}><b>★</b><div><small>SHARED EXPERT</small><strong>always participates</strong><span>separate from the top-8 routed experts</span></div></motion.div> : null}
      {merged ? <motion.div className="prod4-merge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><div className="prod4-route-weights">{ROUTING_WEIGHTS.map((weight) => <span key={weight}>{weight}%</span>)}</div><strong>weighted routed mix + shared path</strong><VectorStrip compact /></motion.div> : null}

      <div className="prod4-local-action prod4-moe-action"><StoryButton onClick={next} disabled={busy} emphasis={merged ? 'strong' : 'normal'}>{step === 'moe-intro' ? 'Send “it” to the router' : step === 'moe-router' ? 'Choose the top 8' : step === 'moe-top8' ? 'Add the shared expert' : step === 'moe-shared' ? 'Combine their outputs' : 'Where does this happen?'}</StoryButton></div>
      {top8 ? <span className="prod4-illustrative prod4-routing-note">routing weights shown are illustrative</span> : null}
    </motion.section>
  )
}

function BuildingLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'building' || step === 'floors' || step === 'output' || step === 'output-repeat'
  const running = step === 'floors'
  const output = step === 'output' || step === 'output-repeat'
  const floors = Array.from({ length: 13 }, (_, i) => i)

  return (
    <motion.section
      className="prod4-building-layer"
      animate={{ opacity: active ? 1 : 0, x: output ? '-26%' : '0%', scale: output ? 0.72 : 1 }}
      transition={{ type: 'spring', stiffness: 88, damping: 19, mass: 1 }}
      style={{ pointerEvents: active && !output ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      <div className="prod4-building-roof"><small>{MODEL.name}</small><strong>{MODEL.layers} transformer layers</strong></div>
      <div className="prod4-building-floors">
        {floors.map((_, index) => {
          const real = index < 3 ? index + 1 : index === floors.length - 1 ? 45 : 4 + (index - 3) * 4
          const dense = real <= MODEL.firstDenseLayers
          const lit = running && [3, 5, 7, 9, 11].includes(index)
          const portal = index === 7
          return (
            <motion.div key={index} className="prod4-floor" data-dense={dense ? 'true' : undefined} data-lit={lit ? 'true' : undefined} data-portal={portal ? 'true' : undefined}>
              <small>{real}</small><strong>{dense ? 'attention + dense MLP' : 'attention + sparse MoE'}</strong>
              {!dense ? <div>{Array.from({ length: 8 }, (_, expert) => <i key={expert} data-on={lit && (expert + index) % 3 === 0 ? 'true' : undefined} />)}</div> : null}
            </motion.div>
          )
        })}
      </div>
      <div className="prod4-building-caption"><span>layers 1–3: dense MLP</span><span>layers 4–45: sparse MoE</span></div>
      {running ? <motion.div className="prod4-refine-explainer" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}><small>WHY REPEAT?</small><strong>each layer gets a richer representation</strong><span>One layer may strengthen “it ↔ ball”; later layers can refine other relationships in the sentence.</span><b>attention → route → mix → update → next layer</b></motion.div> : null}
      {!output ? <div className="prod4-local-action prod4-building-action"><StoryButton onClick={next} disabled={busy} emphasis={running ? 'strong' : 'normal'}>{step === 'building' ? 'Run the representation upward' : 'Reach the output'}</StoryButton></div> : null}
    </motion.section>
  )
}

function OutputLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'output' || step === 'output-repeat'
  const repeat = step === 'output-repeat'
  const candidates = [
    ['The', 0.78], ['Because', 0.36], ['It', 0.25], ['A', 0.14],
  ] as const

  return (
    <motion.section className="prod4-output-layer" animate={{ opacity: active ? 1 : 0, x: active ? '24%' : '30%' }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <small>AFTER LAYER 45</small>
      <strong>the model chooses the next token</strong>
      <div className="prod4-candidates">{candidates.map(([token, probability], index) => <motion.div key={token} initial={{ opacity: 0, x: 8 }} animate={{ opacity: repeat && index > 0 ? 0.24 : 1, x: 0 }} transition={{ delay: index * 0.06 }}><span>{token}</span><i style={{ '--p': probability } as CSSProperties} /><small>{Math.round(probability * 100)}%</small></motion.div>)}</div>
      <div className="prod4-generated"><small>GENERATED ONE TOKEN AT A TIME</small><p><b>The</b> ball rolled away…</p></div>
      {repeat ? <motion.div className="prod4-output-loop" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><strong>then the whole stack runs again</strong><span>new token → embeddings/context → 45 layers → next token → repeat</span><i>↺</i></motion.div> : null}
      <StoryButton onClick={next} disabled={busy} emphasis={repeat ? 'strong' : 'normal'}>{repeat ? 'Answer the 320B question' : 'How does generation continue?'}</StoryButton>
      <span className="prod4-illustrative prod4-output-note">candidate probabilities are illustrative</span>
    </motion.section>
  )
}

export default function Glm320bVideoV4() {
  const [index, setIndex] = useState(0)
  const { busy, run } = useActionGate(480)
  const step = STEPS[index]
  const stage = STAGE[step]

  const next = useCallback(() => {
    if (index >= STEPS.length - 1) return
    const nextStep = STEPS[index + 1]
    const bigChange = STAGE[nextStep] !== STAGE[step]
    run(() => setIndex((current) => Math.min(STEPS.length - 1, current + 1)), bigChange ? 700 : 440)
  }, [index, run, step])

  const previous = useCallback(() => {
    if (index <= 0) return
    const previousStep = STEPS[index - 1]
    const bigChange = STAGE[previousStep] !== STAGE[step]
    run(() => setIndex((current) => Math.max(0, current - 1)), bigChange ? 650 : 380)
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
    <VideoPage className="glm-production-page prod4-page">
      <LayoutGroup id="glm-320b-explanation-v4">
        <SceneFrame art="paper" className="prod4-scene">
          <PaperWorld />
          <div className="prod4-safe-frame">
            {step !== 'model-overview' ? <StageBadge stage={stage} /> : null}
            <div className="prod4-world" data-step={step}>
              <ModelDossier step={step} next={next} busy={busy} />
              <JourneyLayer step={step} next={next} busy={busy} />
              <ChatLayer step={step} next={next} busy={busy} />
              <SentenceActor step={step} />
              <TokenLayer step={step} next={next} busy={busy} />
              <HeroActor step={step} />
              <EmbeddingLayer step={step} next={next} busy={busy} />
              <AttentionLayer step={step} next={next} busy={busy} />
              <MoeLayer step={step} next={next} busy={busy} />
              <BuildingLayer step={step} next={next} busy={busy} />
              <OutputLayer step={step} next={next} busy={busy} />
            </div>

            {index > 0 ? <div className="prod4-back"><StoryIconButton label="Previous beat" icon="←" onClick={previous} disabled={busy} /></div> : null}
            <div className="prod4-progress" aria-label={`Beat ${index + 1} of ${STEPS.length}`}><i style={{ '--progress': (index + 1) / STEPS.length } as CSSProperties} /></div>
          </div>
        </SceneFrame>
      </LayoutGroup>
    </VideoPage>
  )
}
