import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { type CSSProperties, useCallback, useEffect, useMemo, useState } from 'react'
import { StoryButton, StoryIconButton } from '../../components/StoryButton'
import { SceneFrame, VideoPage } from '../../engine/SceneFrame'
import { useActionGate } from '../../engine/useActionGate'
import { BookVisual } from '../../visuals/BookVisual'
import { IndexBoard } from '../../visuals/IndexBoard'
import { SketchAnnotation } from '../../visuals/SketchAnnotation'
import './glm-320b-video-v4.css'
import './glm-320b-video-v4-fixes.css'
import './glm-320b-video-v6.css'

const MODEL = {
  name: 'GLM-5.3-Flash',
  maker: 'Z.ai',
  totalParamsB: 320,
  activeParamsB: 18,
  layers: 45,
  firstDenseLayers: 3,
  moeLayers: 42,
  routedExperts: 288,
  expertsPerToken: 8,
  sharedExperts: 1,
  hiddenSize: 4_096,
  vocabSize: 154_880,
} as const

const sentence = 'The dog chased the ball because it rolled away.'

// Architecture facts above are published model facts. Token IDs, embedding values,
// attention strengths, routing weights and output scores below stay illustrative until
// exact checkpoint values are pinned.
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
type Chapter = 'TEXT' | 'TOKENS' | 'TOKEN ID' | 'EMBEDDING' | 'ATTENTION' | 'MOE' | 'LAYERS' | 'OUTPUT'

const CHAPTERS: Array<{ id: Chapter; label: string; hint: string }> = [
  { id: 'TEXT', label: 'Text', hint: 'what we type' },
  { id: 'TOKENS', label: 'Tokens', hint: 'small pieces' },
  { id: 'TOKEN ID', label: 'Token ID', hint: 'lookup number' },
  { id: 'EMBEDDING', label: 'Embedding', hint: 'numbers the model carries' },
  { id: 'ATTENTION', label: 'Attention', hint: 'what relates to what' },
  { id: 'MOE', label: 'MoE', hint: 'which experts wake up' },
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
  if (between(step, 'attention-question', 'attention-answer')) return 'ATTENTION'
  if (between(step, 'moe-intro', 'moe-merge')) return 'MOE'
  if (step === 'building' || step === 'floors') return 'LAYERS'
  if (step === 'output' || step === 'output-repeat' || step === 'payoff') return 'OUTPUT'
  return null
}

function PaperWorld() {
  return <div className="prod6-paper-world" aria-hidden="true"><i /><i /><i /><i /></div>
}

function PaperAction({ children, onClick, disabled = false, strong = false }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; strong?: boolean }) {
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

function ChapterRail({ step }: { step: Step }) {
  const current = chapterForStep(step)
  const visible = stepIndex(step) > stepIndex('journey') && step !== 'payoff'

  return (
    <AnimatePresence>
      {visible ? (
        <motion.nav
          className="prod6-chapter-rail"
          aria-label="Prompt journey chapters"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
        >
          {CHAPTERS.map((chapter, index) => {
            const active = chapter.id === current
            const passed = current ? CHAPTERS.findIndex((item) => item.id === current) > index : false
            return (
              <motion.div
                key={chapter.id}
                layoutId={`prod6-chapter-${chapter.id}`}
                className="prod6-chapter-tab"
                data-active={active ? 'true' : undefined}
                data-passed={passed ? 'true' : undefined}
              >
                <small>{String(index + 1).padStart(2, '0')}</small>
                <strong>
                  {active ? (
                    <SketchAnnotation type="highlight" color="#f4c95d" strokeWidth={2} padding={4} duration={420}>
                      {chapter.label}
                    </SketchAnnotation>
                  ) : chapter.label}
                </strong>
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
    <motion.section
      className="prod6-model-paper"
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : -18, rotate: active ? 0 : -0.3 }}
      transition={{ type: 'spring', stiffness: 105, damping: 21 }}
      style={{ pointerEvents: active ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      <header className="prod6-model-head">
        <div>
          <small>OUR EXAMPLE MODEL</small>
          <h1>{MODEL.name}</h1>
          <p>{MODEL.maker} · Mixture of Experts (MoE)</p>
        </div>
        <div className="prod6-model-stamp">MODEL NOTES</div>
      </header>

      <div className="prod6-model-intro">
        <p>
          We are using <b>{MODEL.name}</b> as a real example. It is one very large AI model made from many learned parts. The model stores <b>{MODEL.totalParamsB} billion learned parameters</b>, but for one token only about <b>{MODEL.activeParamsB} billion</b> take part in the active path.
        </p>
        <p className="prod6-model-question">That difference is the puzzle this video will explain.</p>
      </div>

      <div className="prod6-param-lines">
        <div className="prod6-param-line">
          <span>
            {marked ? <SketchAnnotation type="highlight" color="#f4c95d" padding={5} duration={500}>Total parameters</SketchAnnotation> : 'Total parameters'}
          </span>
          <strong>{MODEL.totalParamsB}B</strong>
          <p>all learned numbers stored across the whole model</p>
        </div>
        <div className="prod6-param-line is-active">
          <span>
            {marked ? <SketchAnnotation type="highlight" color="#f0a675" padding={5} duration={560}>Active parameters</SketchAnnotation> : 'Active parameters'}
          </span>
          <strong>~{MODEL.activeParamsB}B</strong>
          <p>the smaller set that actually participates for one token</p>
        </div>
      </div>

      <aside className="prod6-model-margin">
        <h2>What is inside?</h2>
        <div><strong>{MODEL.layers}</strong><span>transformer layers</span></div>
        <div><strong>{MODEL.moeLayers}</strong><span>layers use sparse MoE</span></div>
        <div><strong>{MODEL.routedExperts}</strong><span>routed expert blocks</span></div>
        <div><strong>top-{MODEL.expertsPerToken} + {MODEL.sharedExperts}</strong><span>routed experts + shared expert per token</span></div>
        <p><b>Later in the journey:</b> {MODEL.vocabSize.toLocaleString()} vocabulary entries · {MODEL.hiddenSize.toLocaleString()} values in each hidden representation.</p>
      </aside>

      <AnimatePresence>
        {definitions ? (
          <motion.div className="prod6-definition-notes" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div><b>Parameter</b><span>= one learned number inside the model.</span></div>
            <div><b>Active</b><span>= used for this token right now.</span></div>
            <div><b>MoE</b><span>= many expert blocks exist, but only a few are chosen each time.</span></div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="prod6-model-action">
        <PaperAction onClick={next} disabled={busy} strong={definitions}>
          {step === 'model-overview' ? 'Mark the two numbers that matter' : step === 'model-highlight' ? 'Explain those two words' : 'Follow one prompt through the model'}
        </PaperAction>
      </div>
    </motion.section>
  )
}

function JourneyOverview({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'journey'
  return (
    <motion.section
      className="prod6-journey-overview"
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
      style={{ pointerEvents: active ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      <div className="prod6-journey-copy">
        <small>BEFORE WE ANSWER THE 320B → 18B QUESTION</small>
        <h2>Follow one simple prompt.</h2>
        <p>We are going to open the model one chapter at a time. You only need to understand the highlighted chapter we are standing in.</p>
      </div>
      <div className="prod6-journey-map">
        {CHAPTERS.map((chapter, index) => (
          <div className="prod6-journey-item" key={chapter.id}>
            {index > 0 ? <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ delay: 0.12 + index * 0.06 }} /> : null}
            <motion.button
              type="button"
              layoutId={`prod6-chapter-${chapter.id}`}
              className="prod6-journey-card"
              data-start={index === 0 ? 'true' : undefined}
              onClick={index === 0 ? next : undefined}
              disabled={busy || index !== 0}
              whileHover={index === 0 && !busy ? { y: -5, rotate: -0.35 } : undefined}
              whileTap={index === 0 && !busy ? { y: 1, scale: 0.985 } : undefined}
            >
              <small>{String(index + 1).padStart(2, '0')}</small>
              <strong>{chapter.label}</strong>
              <span>{chapter.hint}</span>
              {index === 0 ? <b>start here →</b> : null}
            </motion.button>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

function ThinkingDots() {
  return <span className="prod6-thinking-dots" aria-label="Model processing"><i /><i /><i /></span>
}

function ChatLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'chat-empty', 'chat-thinking')
  const typing = step === 'chat-typing'
  const sent = step === 'chat-sent' || step === 'chat-thinking'
  const thinking = step === 'chat-thinking'
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (step === 'chat-empty') setTyped('')
    if (!typing) return
    setTyped('')
    let position = 0
    const interval = window.setInterval(() => {
      position += 1
      setTyped(sentence.slice(0, position))
      if (position >= sentence.length) window.clearInterval(interval)
    }, 24)
    return () => window.clearInterval(interval)
  }, [step, typing])

  const typingDone = typed.length === sentence.length

  return (
    <motion.section
      className="prod6-chat-stage"
      animate={{ opacity: active ? 1 : 0, scale: thinking ? 1.08 : 1, y: thinking ? '-2%' : '0%' }}
      transition={{ type: 'spring', stiffness: 105, damping: 22 }}
      style={{ pointerEvents: active ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      <motion.div className="prod6-chat-window" animate={{ opacity: thinking ? 0.28 : 1, scale: thinking ? 0.9 : 1 }}>
        <header><div><b>GLM‑5.3‑Flash</b><span>new chat</span></div><i>✦</i></header>
        <div className="prod6-chat-body">
          {sent ? (
            <motion.div className="prod6-user-message" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }}>
              <small>YOU</small>
              <motion.p layoutId="prod6-prompt-sentence">{sentence}</motion.p>
            </motion.div>
          ) : <div className="prod6-chat-empty-copy"><b>Ask the model anything.</b><span>We will use one tiny sentence so every step stays easy to see.</span></div>}

          {sent ? (
            <motion.div className="prod6-model-thinking" layoutId="prod6-thinking-node" animate={{ opacity: thinking ? 0 : 1 }}>
              <small>GLM‑5.3‑Flash</small><ThinkingDots /><span>processing your prompt</span>
            </motion.div>
          ) : null}
        </div>

        {!sent ? (
          <div className="prod6-chat-input">
            <div className="prod6-input-text">
              {step === 'chat-empty' ? <span className="is-placeholder">Message GLM‑5.3‑Flash…</span> : (
                <motion.span layoutId="prod6-prompt-sentence">{typed}<i className="prod6-caret" /></motion.span>
              )}
            </div>
            {step === 'chat-empty' ? (
              <PaperAction onClick={next} disabled={busy}>Type our example</PaperAction>
            ) : (
              <motion.button className="prod6-send" type="button" onClick={next} disabled={busy || !typingDone} whileTap={{ scale: 0.94 }} aria-label="Send prompt">
                ↵
              </motion.button>
            )}
          </div>
        ) : null}
      </motion.div>

      {step === 'chat-sent' ? (
        <div className="prod6-chat-action"><PaperAction onClick={next} disabled={busy}>Zoom into what the model is doing</PaperAction></div>
      ) : null}

      {thinking ? (
        <motion.button
          type="button"
          layoutId="prod6-thinking-node"
          className="prod6-thinking-portal"
          onClick={next}
          disabled={busy}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.985 }}
        >
          <small>INSIDE THE MODEL</small>
          <ThinkingDots />
          <strong>First, it breaks the text into tokens.</strong>
          <span>enter tokenization →</span>
        </motion.button>
      ) : null}
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
      <div className="prod4-token-source prod6-token-source">
        <small>THE PROMPT WE JUST SENT</small>
        <motion.span layoutId="prod6-prompt-sentence">{sentence}</motion.span><i />
      </div>
      <motion.div className="prod4-token-row" animate={{ x: indexView ? '-18%' : '0%', scale: indexView ? 0.84 : 1 }}>
        {TOKENS.map((token, index) => (
          <motion.div
            key={`${token.text}-${index}`}
            className="prod4-token"
            data-it={index === IT_INDEX ? 'true' : undefined}
            animate={{
              opacity: focus && index !== IT_INDEX ? 0.12 : focus && index === IT_INDEX ? (indexView ? 0 : 1) : 1,
              y: focus && index === IT_INDEX ? -12 : 0,
              scale: focus && index === IT_INDEX ? 1.12 : 1,
            }}
            transition={{ type: 'spring', stiffness: 170, damping: 22, delay: step === 'tokens' ? index * 0.035 : 0 }}
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
            <div><b>un · believ · able</b><span>one word can become several pieces</span><small>generic example</small></div>
            <div><b>.</b><span>punctuation can be a token too</span></div>
          </motion.div>
        ) : showIds && !focus ? (
          <motion.div className="prod4-id-explainer" key="ids" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <small>{MODEL.name} has {MODEL.vocabSize.toLocaleString()} vocabulary entries</small>
            <strong>each entry gets one lookup ID: 0 to {MODEL.vocabSize - 1}</strong>
            <span>The ID is not meaning. It is simply the number used to find the token's learned row.</span>
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
          {step === 'tokens' ? 'What can a token look like?' : step === 'token-kinds' ? 'Give every token an ID' : step === 'token-ids' ? 'Follow just one token' : step === 'focus-it' ? 'Find “it” in the vocabulary' : 'Use this ID as the lookup key'}
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
    <motion.div className="prod4-hero-actor" animate={{ opacity: visible ? 1 : 0, ...position }} transition={{ type: 'spring', stiffness: 100, damping: 19, mass: 0.9 }} aria-hidden={!visible}>
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
      <motion.button type="button" className="prod4-book-button" onClick={!open ? next : undefined} disabled={busy || open} whileHover={!open && !reducedMotion ? { y: -5, rotate: -0.35 } : undefined} whileTap={!open && !reducedMotion ? { scale: 0.985 } : undefined}>
        <BookVisual
          state={open ? 'open' : 'closed'}
          title="Embeddings"
          subtitle="numerical lookup"
          label="Embedding book"
          leftPage={open ? <div className="prod4-book-left"><small>PAGE / TOKEN ID</small><strong>82,4…</strong><b>“it”</b><span>the ID chooses one learned row</span></div> : undefined}
          rightPage={open ? <div className="prod4-book-right"><small>EMBEDDING — THE NUMERICAL REPRESENTATION WE CARRY</small><strong>[ 0.29, −0.14, 0.83, 0.07, … ]</strong><div><b>{MODEL.hiddenSize.toLocaleString()}</b><span>values in this representation</span></div><p>We only show the first few numbers. The real vector continues far beyond the page.</p></div> : undefined}
        />
        {!open ? <span className="prod4-open-cue">open the page matching this ID ↗</span> : null}
      </motion.button>

      {all ? (
        <motion.div className="prod4-all-embeddings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {TOKENS.slice(0, 7).map((token, index) => <div key={token.text} data-focus={index === IT_INDEX ? 'true' : undefined}><b>{token.text.trim()}</b><span>[{(0.11 + index * 0.03).toFixed(2)}, …]</span></div>)}
          <strong>Every token finds its own embedding.</strong>
          <small>We will carry only “it” forward so the rest of the journey stays easy to follow.</small>
        </motion.div>
      ) : null}

      {open ? <div className="prod4-local-action prod4-book-action"><StoryButton onClick={next} disabled={busy} emphasis={all ? 'strong' : 'normal'}>{step === 'book-open' ? 'Show the same lookup for every token' : all ? 'Carry the embedding of “it” forward' : 'Continue'}</StoryButton></div> : null}
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
          <span>The embedding is a useful representation, but context still has to reshape what matters around it.</span>
        </motion.div>
      ) : null}

      {showQkv ? (
        <motion.div className="prod4-qkv" animate={{ opacity: scores ? 0.2 : 1, y: scores ? -50 : 0 }}>
          <div><b>Q</b><strong>Query</strong><span>What am I looking for?</span></div>
          <div><b>K</b><strong>Key</strong><span>What can I match with?</span></div>
          <div><b>V</b><strong>Value</strong><span>What information can I bring back?</span></div>
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
        {answer ? <motion.div className="prod4-attention-result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><strong>“it” ↔ “ball”</strong><span>one simplified attention view: the useful relationship becomes stronger</span></motion.div> : null}
      </motion.div>

      <div className="prod4-local-action prod4-attention-action"><StoryButton onClick={next} disabled={busy} emphasis={answer ? 'strong' : 'normal'}>{step === 'attention-question' ? 'Give “it” a Query, Key and Value' : step === 'qkv' ? 'Let “it” look across the sentence' : step === 'attention' ? 'Focus on the strongest useful link' : 'Now enter the main topic: MoE'}</StoryButton></div>
      {scores ? <span className="prod4-illustrative prod4-attention-note">line strengths are illustrative — real attention differs across heads and layers</span> : null}
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
    <motion.section className="prod4-moe-layer" data-floor={building ? 'true' : undefined} animate={{ opacity: active ? 1 : 0, scale: building ? 0.34 : 1, y: building ? '1%' : '0%' }} transition={{ type: 'spring', stiffness: 82, damping: 18, mass: 1.05 }} style={{ pointerEvents: active && !building ? 'auto' : 'none' }} aria-hidden={!active}>
      <div className="prod4-moe-heading"><small>ONE SPARSE TRANSFORMER LAYER</small><strong>Mixture of Experts</strong><span>this is the mechanism behind the 320B → 18B difference</span></div>
      <div className="prod4-moe-definition-panel">
        <div><b>288</b><span>routed expert blocks exist</span></div>
        <div><b>8</b><span>are selected for this token</span></div>
        <div><b>+ 1</b><span>shared expert participates</span></div>
      </div>

      <motion.div className="prod4-router" animate={{ opacity: router ? 1 : 0.35 }}>
        <small>ROUTER</small><strong>{router ? 'score this token' : 'waiting for a token'}</strong><span>each token gets its own routing decision</span><i />
      </motion.div>

      <div className="prod4-experts">
        <IndexBoard rows={8} label={`${MODEL.routedExperts} ROUTED EXPERTS`} ariaLabel="Sample of routed expert blocks">
          <div className="prod4-expert-grid">
            {EXPERT_SAMPLE.map((expert) => {
              const on = top8 && ACTIVE_EXPERTS.has(expert)
              return <motion.div key={expert} className="prod4-expert" data-on={on ? 'true' : undefined} animate={{ opacity: top8 && !on ? 0.1 : 1, y: on ? -3 : 0 }}><i /><small>E{expert + 1}</small></motion.div>
            })}
          </div>
        </IndexBoard>
        <span>48 drawn so they remain readable · {MODEL.routedExperts} routed experts exist</span>
      </div>

      {top8 ? (
        <svg className="prod4-routing-lines" viewBox="0 0 1200 650" preserveAspectRatio="none" aria-hidden="true">
          {[120, 255, 385, 510, 690, 825, 950, 1080].map((x, index) => <motion.path key={x} d={`M 316 326 C 470 326 ${x} 344 ${x} 480`} fill="none" stroke="currentColor" strokeWidth={2 + ROUTING_WEIGHTS[index] / 10} strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: merged ? 0.22 : 0.64 }} transition={{ duration: 0.5, delay: index * 0.035 }} />)}
        </svg>
      ) : null}

      {top8 && !merged ? <div className="prod4-top8"><strong>only the top-{MODEL.expertsPerToken} routed doors open</strong><span>the other routed experts stay available, but do no work for “it” in this layer</span></div> : null}
      {shared ? <motion.div className="prod4-shared" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}><b>★</b><div><small>SHARED EXPERT</small><strong>always joins the path</strong><span>it is separate from the top-8 routed experts</span></div></motion.div> : null}
      {merged ? <motion.div className="prod4-merge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><div className="prod4-route-weights">{ROUTING_WEIGHTS.map((weight) => <span key={weight}>{weight}%</span>)}</div><strong>weighted routed outputs + shared path combine</strong><VectorStrip compact /></motion.div> : null}

      <div className="prod4-local-action prod4-moe-action"><StoryButton onClick={next} disabled={busy} emphasis={merged ? 'strong' : 'normal'}>{step === 'moe-intro' ? 'Send “it” into the router' : step === 'moe-router' ? 'Open only the top 8 routed experts' : step === 'moe-top8' ? 'Reveal the shared expert' : step === 'moe-shared' ? 'Combine the expert outputs' : 'Zoom out: where does this MoE block live?'}</StoryButton></div>
      {top8 ? <span className="prod4-illustrative prod4-routing-note">routing weights shown here are illustrative</span> : null}
    </motion.section>
  )
}

function BuildingLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'building' || step === 'floors' || step === 'output' || step === 'output-repeat'
  const running = step === 'floors'
  const output = step === 'output' || step === 'output-repeat'
  const floors = Array.from({ length: 13 }, (_, i) => i)

  return (
    <motion.section className="prod4-building-layer" animate={{ opacity: active ? 1 : 0, x: output ? '-26%' : '0%', scale: output ? 0.72 : 1 }} transition={{ type: 'spring', stiffness: 88, damping: 19, mass: 1 }} style={{ pointerEvents: active && !output ? 'auto' : 'none' }} aria-hidden={!active}>
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
      {running ? <motion.div className="prod4-refine-explainer" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}><small>WHY REPEAT?</small><strong>each layer can refine the representation again</strong><span>One layer might strengthen “it ↔ ball”. Later layers can build other relationships and features on top of that updated representation.</span><b>attention → route → mix → update → next layer</b></motion.div> : null}
      {!output ? <div className="prod4-local-action prod4-building-action"><StoryButton onClick={next} disabled={busy} emphasis={running ? 'strong' : 'normal'}>{step === 'building' ? 'Run the representation through the floors' : 'Reach the output side'}</StoryButton></div> : null}
    </motion.section>
  )
}

function OutputLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'output' || step === 'output-repeat'
  const repeat = step === 'output-repeat'
  const candidates = [['The', 0.78], ['Because', 0.36], ['It', 0.25], ['A', 0.14]] as const

  return (
    <motion.section className="prod4-output-layer" animate={{ opacity: active ? 1 : 0, x: active ? '24%' : '30%' }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <small>AFTER LAYER 45</small>
      <strong>the model scores possible next tokens</strong>
      <div className="prod4-candidates">{candidates.map(([token, probability], index) => <motion.div key={token} initial={{ opacity: 0, x: 8 }} animate={{ opacity: repeat && index > 0 ? 0.24 : 1, x: 0 }} transition={{ delay: index * 0.06 }}><span>{token}</span><i style={{ '--p': probability } as CSSProperties} /><small>{Math.round(probability * 100)}%</small></motion.div>)}</div>
      <div className="prod4-generated"><small>GENERATED ONE TOKEN AT A TIME</small><p><b>The</b> ball rolled away…</p></div>
      {repeat ? <motion.div className="prod4-output-loop" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><strong>then the process repeats for the next token</strong><span>updated context → 45 layers → next-token scores → choose one → repeat</span><i>↺</i></motion.div> : null}
      <StoryButton onClick={next} disabled={busy} emphasis={repeat ? 'strong' : 'normal'}>{repeat ? 'Now answer the 320B question' : 'Show the generation loop'}</StoryButton>
      <span className="prod4-illustrative prod4-output-note">candidate probabilities are illustrative</span>
    </motion.section>
  )
}

function PayoffLayer({ step }: { step: Step }) {
  const active = step === 'payoff'
  return (
    <motion.section className="prod6-payoff" animate={{ opacity: active ? 1 : 0, y: active ? 0 : 16 }} style={{ pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <small>NOW THE TITLE MAKES SENSE</small>
      <h2>{MODEL.totalParamsB}B parameters exist in the model.</h2>
      <p>But a token only travels through a sparse active path.</p>
      <div className="prod6-payoff-equation">
        <div><span>Total available</span><strong>{MODEL.totalParamsB}B</strong></div>
        <b>→</b>
        <div><span>Active for one token</span><strong>~{MODEL.activeParamsB}B</strong></div>
      </div>
      <SketchAnnotation type="underline" color="#e89a64" strokeWidth={4} duration={700}><strong className="prod6-payoff-line">That is the Mixture-of-Experts advantage we followed through the model.</strong></SketchAnnotation>
    </motion.section>
  )
}

export default function Glm320bVideoV6() {
  const [index, setIndex] = useState(0)
  const { busy, run } = useActionGate(520)
  const step = STEPS[index]

  const next = useCallback(() => {
    if (index >= STEPS.length - 1) return
    const currentChapter = chapterForStep(step)
    const nextStep = STEPS[index + 1]
    const nextChapter = chapterForStep(nextStep)
    const majorChange = currentChapter !== nextChapter || nextStep === 'journey'
    run(() => setIndex((current) => Math.min(STEPS.length - 1, current + 1)), majorChange ? 760 : 460)
  }, [index, run, step])

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
    <VideoPage className="glm-production-page prod4-page prod6-page">
      <LayoutGroup id="glm-320b-explanation-v6">
        <SceneFrame art="paper" className="prod4-scene prod6-scene">
          <PaperWorld />
          <div className="prod4-safe-frame prod6-safe-frame">
            <ChapterRail step={step} />
            <div className="prod4-world prod6-world" data-step={step}>
              <ModelPaper step={step} next={next} busy={busy} />
              <JourneyOverview step={step} next={next} busy={busy} />
              <ChatLayer step={step} next={next} busy={busy} />
              <TokenLayer step={step} next={next} busy={busy} />
              <HeroActor step={step} />
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
