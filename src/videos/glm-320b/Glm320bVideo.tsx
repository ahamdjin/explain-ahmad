import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { type CSSProperties, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { StoryButton, StoryIconButton } from '../../components/StoryButton'
import { SceneFrame, VideoPage } from '../../engine/SceneFrame'
import { useActionGate } from '../../engine/useActionGate'
import { BookVisual } from '../../visuals/BookVisual'
import { IndexBoard } from '../../visuals/IndexBoard'
import './glm-320b-video.css'

const sentence = 'The dog chased the ball because it rolled away.'

/**
 * GLM-5.3-Flash architecture facts are grounded in the published config/model card.
 * Example token boundaries, token IDs, attention weights, routing weights and visible
 * embedding values below are teaching illustrations unless explicitly labeled as model facts.
 */
const MODEL = {
  name: 'GLM-5.3-Flash',
  totalParamsB: 320,
  activeParamsB: 18,
  layers: 45,
  vocabSize: 154_880,
  hiddenSize: 4_096,
  routedExperts: 288,
  expertsPerToken: 8,
  sharedExperts: 1,
  firstDenseLayers: 3,
} as const

const tokens = [
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

const itIndex = 6
const illustrativeVector = [0.29, -0.14, 0.83, 0.07, -0.62, 0.41, 0.11, -0.35, 0.74, 0.18, -0.08, 0.52]

const STEPS = [
  'model-hook',
  'journey-map',
  'chat-empty',
  'chat-ready',
  'tokens',
  'token-kinds',
  'token-ids',
  'focus-it',
  'book-arrives',
  'book-open',
  'all-embeddings',
  'carry-it',
  'qkv',
  'attention-scores',
  'attention-answer',
  'moe-intro',
  'expert-layer',
  'router-token',
  'router-top8',
  'shared-expert',
  'experts-merge',
  'building-reveal',
  'floor-repeat',
  'floor-refine',
  'next-token',
  'output-build',
  'payoff',
] as const

type Step = (typeof STEPS)[number]
type Section = 'hook' | 'input' | 'attention' | 'moe' | 'layers' | 'output' | 'payoff'
type Stage = 'MODEL' | 'MAP' | 'TEXT' | 'TOKENS' | 'TOKEN ID' | 'EMBEDDING' | 'ATTENTION' | 'MOE' | 'LAYERS' | 'OUTPUT'

const SECTION_FOR_STEP: Record<Step, Section> = {
  'model-hook': 'hook',
  'journey-map': 'hook',
  'chat-empty': 'input',
  'chat-ready': 'input',
  tokens: 'input',
  'token-kinds': 'input',
  'token-ids': 'input',
  'focus-it': 'input',
  'book-arrives': 'input',
  'book-open': 'input',
  'all-embeddings': 'input',
  'carry-it': 'attention',
  qkv: 'attention',
  'attention-scores': 'attention',
  'attention-answer': 'attention',
  'moe-intro': 'moe',
  'expert-layer': 'moe',
  'router-token': 'moe',
  'router-top8': 'moe',
  'shared-expert': 'moe',
  'experts-merge': 'moe',
  'building-reveal': 'layers',
  'floor-repeat': 'layers',
  'floor-refine': 'layers',
  'next-token': 'output',
  'output-build': 'output',
  payoff: 'payoff',
}

const STAGE_FOR_STEP: Record<Step, Stage> = {
  'model-hook': 'MODEL',
  'journey-map': 'MAP',
  'chat-empty': 'TEXT',
  'chat-ready': 'TEXT',
  tokens: 'TOKENS',
  'token-kinds': 'TOKENS',
  'token-ids': 'TOKEN ID',
  'focus-it': 'TOKEN ID',
  'book-arrives': 'EMBEDDING',
  'book-open': 'EMBEDDING',
  'all-embeddings': 'EMBEDDING',
  'carry-it': 'ATTENTION',
  qkv: 'ATTENTION',
  'attention-scores': 'ATTENTION',
  'attention-answer': 'ATTENTION',
  'moe-intro': 'MOE',
  'expert-layer': 'MOE',
  'router-token': 'MOE',
  'router-top8': 'MOE',
  'shared-expert': 'MOE',
  'experts-merge': 'MOE',
  'building-reveal': 'LAYERS',
  'floor-repeat': 'LAYERS',
  'floor-refine': 'LAYERS',
  'next-token': 'OUTPUT',
  'output-build': 'OUTPUT',
  payoff: 'OUTPUT',
}

const JOURNEY = ['Text', 'Tokens', 'IDs', 'Embeddings', 'Attention', 'Router', 'Experts', '×45', 'Output'] as const

function stepIndex(step: Step) {
  return STEPS.indexOf(step)
}

function stepAt(index: number): Step {
  return STEPS[Math.max(0, Math.min(STEPS.length - 1, index))]
}

type SectionProps = {
  step: Step
  next: () => void
  previous: () => void
  busy: boolean
}

function PaperAtmosphere() {
  return <div className="prod-paper-atmosphere" aria-hidden="true"><i /><i /><i /></div>
}

function StageBadge({ stage, previousStage }: { stage: Stage; previousStage?: Stage }) {
  return (
    <div className="prod-stage-badge" aria-label={`Current stage: ${stage}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={stage}
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -7 }}
          transition={{ duration: 0.18 }}
        >
          {previousStage && previousStage !== stage ? <small>{previousStage} →</small> : null}
          <strong>{stage}</strong>
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function BackControl({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <div className="prod-back-control">
      <StoryIconButton label="Previous beat" icon="←" onClick={onClick} disabled={disabled} />
    </div>
  )
}

function LocalContinue({ children, onClick, disabled, emphasis = 'normal' }: { children: ReactNode; onClick: () => void; disabled: boolean; emphasis?: 'quiet' | 'normal' | 'strong' }) {
  return <StoryButton onClick={onClick} disabled={disabled} emphasis={emphasis}>{children}</StoryButton>
}

function ModelHook({ next, busy }: SectionProps) {
  return (
    <SceneFrame art="paper" className="prod-scene prod-hook-scene">
      <PaperAtmosphere />
      <div className="prod-hook-world">
        <motion.div className="prod-model-card" initial={{ opacity: 0, y: 18, rotate: -0.4 }} animate={{ opacity: 1, y: 0, rotate: 0 }}>
          <div className="prod-model-card-head">
            <span>Z.ai</span>
            <strong>{MODEL.name}</strong>
            <i>MoE</i>
          </div>

          <div className="prod-model-card-hero">
            <div className="prod-param-stat is-total">
              <small>TOTAL PARAMETERS</small>
              <strong>{MODEL.totalParamsB}B</strong>
            </div>
            <div className="prod-param-arrow" aria-hidden="true">↘</div>
            <div className="prod-param-stat is-active">
              <small>ACTIVE / TOKEN</small>
              <strong>{MODEL.activeParamsB}B</strong>
            </div>
          </div>

          <div className="prod-model-card-facts">
            <span><b>{MODEL.layers}</b> layers</span>
            <span><b>{MODEL.routedExperts}</b> routed experts</span>
            <span><b>top-{MODEL.expertsPerToken}</b> / token</span>
            <span><b>{MODEL.sharedExperts}</b> shared expert</span>
          </div>
        </motion.div>

        <motion.div className="prod-hook-question" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
          <span>320B exists.</span>
          <strong>Why does one token activate only ~18B?</strong>
          <LocalContinue onClick={next} disabled={busy} emphasis="strong">Look inside</LocalContinue>
        </motion.div>
      </div>
    </SceneFrame>
  )
}

function JourneyMap({ next, previous, busy }: SectionProps) {
  return (
    <SceneFrame art="paper" className="prod-scene prod-map-scene">
      <PaperAtmosphere />
      <div className="prod-map-world">
        <div className="prod-map-intro">
          <small>ONE SIMPLE PROMPT</small>
          <strong>follow it through the model</strong>
        </div>

        <div className="prod-journey-map">
          {JOURNEY.map((item, index) => (
            <div className="prod-journey-node-wrap" key={item}>
              {index > 0 && <motion.i className="prod-journey-connector" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: index * 0.05 }} />}
              {index === 0 ? (
                <motion.button
                  type="button"
                  className="prod-journey-node is-start"
                  onClick={next}
                  disabled={busy}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  whileHover={{ y: -4, rotate: -0.4 }}
                  whileTap={{ y: 1, scale: 0.98 }}
                >
                  <span>✎</span>
                  <strong>{item}</strong>
                  <small>start here</small>
                </motion.button>
              ) : (
                <motion.div className="prod-journey-node" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.45, y: 0 }} transition={{ delay: index * 0.045 }}>
                  <span>{['▦', '#', '≈', '◎', '◇', '▥', '↻', '→'][index - 1]}</span>
                  <strong>{item}</strong>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <p className="prod-map-reassure">We only need one piece at a time.</p>
      </div>
      <BackControl onClick={previous} disabled={busy} />
    </SceneFrame>
  )
}

function ChatWorld({ step, next, previous, busy }: SectionProps) {
  const ready = step === 'chat-ready'
  const reducedMotion = useReducedMotion()

  return (
    <SceneFrame art="paper" className="prod-scene prod-chat-scene">
      <PaperAtmosphere />
      <div className="prod-chat-world">
        <motion.div className="prod-chat-window prod-chat-window-v2" initial={{ opacity: 0, y: 20, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
          <div className="prod-chat-brand">
            <div className="prod-chat-mark">✦</div>
            <div><strong>Chat</strong><small>send a prompt</small></div>
          </div>

          <div className="prod-chat-history">
            {ready && (
              <motion.div className="prod-chat-preview" initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                {sentence}
              </motion.div>
            )}
          </div>

          <div className="prod-chat-input-shell" data-ready={ready ? 'true' : undefined}>
            <div className="prod-chat-input-copy">
              {ready ? (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{sentence}</motion.span>
              ) : (
                <span className="is-placeholder">Ask anything…</span>
              )}
            </div>
            {ready ? (
              <button className="prod-enter-key" type="button" onClick={next} disabled={busy} aria-label="Send prompt">
                <span>ENTER</span><b>↵</b>
              </button>
            ) : (
              <LocalContinue onClick={next} disabled={busy}>Type example</LocalContinue>
            )}
          </div>
        </motion.div>
      </div>
      <BackControl onClick={previous} disabled={busy} />
    </SceneFrame>
  )
}

function TokenWorld({ step, next, previous, busy }: SectionProps) {
  const index = stepIndex(step)
  const showKinds = index >= stepIndex('token-kinds')
  const showIds = index >= stepIndex('token-ids')
  const focusIt = index >= stepIndex('focus-it')

  return (
    <SceneFrame art="paper" className="prod-scene prod-token-scene">
      <PaperAtmosphere />
      <div className="prod-token-world">
        <div className="prod-token-source">
          <span>{sentence}</span>
          <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} />
        </div>

        <div className="prod-token-row-v2">
          {tokens.map((token, tokenIndex) => {
            const selected = tokenIndex === itIndex
            return (
              <motion.div
                layout
                layoutId={`prod-token-${tokenIndex}`}
                className="prod-token-v2"
                data-selected={focusIt && selected ? 'true' : undefined}
                data-dimmed={focusIt && !selected ? 'true' : undefined}
                key={`${token.text}-${tokenIndex}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{
                  opacity: focusIt && !selected ? 0.18 : 1,
                  x: 0,
                  y: focusIt && selected ? -18 : 0,
                  scale: focusIt && selected ? 1.12 : 1,
                }}
                transition={{ type: 'spring', stiffness: 170, damping: 22, delay: tokenIndex * 0.025 }}
              >
                <span>{token.text.replace(/^ /, '·')}</span>
                {showIds && <small>ID {token.id}</small>}
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {showKinds && !showIds && (
            <motion.div className="prod-token-kinds" key="kinds" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div><b>dog</b><small>can be a whole word</small></div>
              <div><b>word + piece</b><small>can be part of a word</small></div>
              <div><b>.</b><small>can be punctuation</small></div>
            </motion.div>
          )}

          {showIds && !focusIt && (
            <motion.div className="prod-id-range" key="ids" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <small>GLM-5.3-Flash vocabulary</small>
              <strong>IDs 0 → {MODEL.vocabSize - 1}</strong>
            </motion.div>
          )}

          {focusIt && (
            <motion.div className="prod-focus-token-callout" key="focus" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <small>follow one token</small>
              <strong>it</strong>
              <span>ID 82,4…</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="prod-context-actions">
        <StoryIconButton label="Previous beat" icon="←" onClick={previous} disabled={busy} />
        <LocalContinue onClick={next} disabled={busy} emphasis={focusIt ? 'strong' : 'normal'}>
          {step === 'tokens' ? 'What counts as a token?' : step === 'token-kinds' ? 'Give them IDs' : step === 'token-ids' ? 'Follow “it”' : 'Use its ID'}
        </LocalContinue>
      </div>
    </SceneFrame>
  )
}

function EmbeddingIdentityPage() {
  return (
    <div className="prod-book-page-v2 prod-book-identity-v2">
      <small>PAGE / TOKEN ID</small>
      <strong>82,4…</strong>
      <b>“it”</b>
      <span>one token → one lookup row</span>
    </div>
  )
}

function EmbeddingVectorPage() {
  return (
    <div className="prod-book-page-v2 prod-book-vector-v2">
      <small>EMBEDDING</small>
      <div className="prod-book-equation"><b>it</b><span>→</span><strong>[ 0.29, −0.14, 0.83, 0.07, … ]</strong></div>
      <div className="prod-book-width"><b>{MODEL.hiddenSize.toLocaleString()}</b><span>values</span></div>
      <p>This is the numerical representation the model carries for this token.</p>
    </div>
  )
}

function EmbeddingWorld({ step, next, previous, busy }: SectionProps) {
  const opened = step === 'book-open' || step === 'all-embeddings'
  const all = step === 'all-embeddings'
  const reducedMotion = useReducedMotion()

  return (
    <SceneFrame art="paper" className="prod-scene prod-embedding-scene">
      <PaperAtmosphere />
      <div className="prod-embedding-world">
        <motion.div className="prod-embedding-key" initial={{ opacity: 0, x: -18 }} animate={{ opacity: opened ? 0.25 : 1, x: 0 }}>
          <small>TOKEN ID</small>
          <strong>82,4…</strong>
          <span>acts like the page number</span>
        </motion.div>

        <motion.button
          className="prod-book-button-v2"
          type="button"
          onClick={!opened ? next : undefined}
          disabled={busy || opened}
          whileHover={!opened && !reducedMotion ? { y: -5, rotate: -0.5 } : undefined}
          whileTap={!opened && !reducedMotion ? { scale: 0.985 } : undefined}
        >
          <motion.div layoutId="production-embedding-book" className="prod-book-shell-v2">
            <BookVisual
              state={opened ? 'open' : 'closed'}
              title="Embeddings"
              subtitle="token lookup"
              label="Embedding book"
              leftPage={opened ? <EmbeddingIdentityPage /> : undefined}
              rightPage={opened ? <EmbeddingVectorPage /> : undefined}
            />
          </motion.div>
          {!opened && <span className="prod-object-cue-v2">open page 82,4… ↗</span>}
        </motion.button>

        <AnimatePresence>
          {all && (
            <motion.div className="prod-all-embeddings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {tokens.slice(0, 7).map((token, i) => (
                <motion.div key={token.text} initial={{ opacity: 0, y: 14 }} animate={{ opacity: i === itIndex ? 1 : 0.5, y: 0 }} transition={{ delay: i * 0.055 }} data-focus={i === itIndex ? 'true' : undefined}>
                  <b>{token.text.trim()}</b>
                  <span>[{(0.11 + i * 0.03).toFixed(2)}, …]</span>
                </motion.div>
              ))}
              <small>every token gets its own embedding</small>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="prod-context-actions">
        <StoryIconButton label="Previous beat" icon="←" onClick={previous} disabled={busy} />
        {opened && <LocalContinue onClick={next} disabled={busy} emphasis={all ? 'strong' : 'normal'}>{all ? 'Carry “it” forward' : 'Do this for every token'}</LocalContinue>}
      </div>
    </SceneFrame>
  )
}

function VectorCells({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`prod-vector-cells ${compact ? 'is-compact' : ''}`}>
      {illustrativeVector.slice(0, compact ? 7 : 10).map((value, index) => {
        const strength = Math.min(1, Math.abs(value))
        return <i key={index} style={{ '--cell-strength': strength } as CSSProperties}><span>{value.toFixed(2)}</span></i>
      })}
      <b>…</b>
    </div>
  )
}

function AttentionWorld({ step, next, previous, busy }: SectionProps) {
  const showQkv = step === 'qkv' || step === 'attention-scores' || step === 'attention-answer'
  const scores = step === 'attention-scores' || step === 'attention-answer'
  const answered = step === 'attention-answer'
  const attentionWeights = [2, 5, 6, 4, 38, 8, 10, 22, 5]
  const words = ['The', 'dog', 'chased', 'the', 'ball', 'because', 'it', 'rolled', 'away']

  return (
    <SceneFrame art="paper" className="prod-scene prod-attention-scene-v2">
      <PaperAtmosphere />
      <div className="prod-attention-world-v2">
        <motion.div layoutId="hero-it-embedding" className="prod-carry-vector" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
          <div className="prod-carry-tag"><small>EMBEDDING FOR</small><strong>it</strong></div>
          <VectorCells compact />
        </motion.div>

        {showQkv && (
          <motion.div className="prod-qkv-board" initial={{ opacity: 0, y: 16 }} animate={{ opacity: scores ? 0.42 : 1, y: 0 }}>
            <div className="is-q"><b>Q</b><strong>Query</strong><span>What am I looking for?</span></div>
            <div className="is-k"><b>K</b><strong>Key</strong><span>What do I match?</span></div>
            <div className="is-v"><b>V</b><strong>Value</strong><span>What information do I bring?</span></div>
          </motion.div>
        )}

        {scores && (
          <motion.div className="prod-attention-score-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="prod-attention-question">“it” looks across the sentence</div>
            <div className="prod-attention-score-row">
              {words.map((word, i) => (
                <motion.div
                  className="prod-attention-score-token"
                  key={word}
                  data-focus={answered && word === 'ball' ? 'true' : word === 'it' ? 'source' : undefined}
                  animate={{ opacity: answered && !['ball', 'it'].includes(word) ? 0.25 : 1, y: answered && word === 'ball' ? -10 : 0 }}
                >
                  <strong>{word}</strong>
                  <span>{attentionWeights[i]}%</span>
                  <i style={{ '--attention': attentionWeights[i] / 40 } as CSSProperties} />
                </motion.div>
              ))}
            </div>
            {answered && (
              <motion.div className="prod-attention-resolution" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <strong>“it” ↔ “ball”</strong>
                <span>context makes the representation more useful</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      <div className="prod-context-actions">
        <StoryIconButton label="Previous beat" icon="←" onClick={previous} disabled={busy} />
        <LocalContinue onClick={next} disabled={busy} emphasis={answered ? 'strong' : 'normal'}>
          {step === 'carry-it' ? 'Meet Q, K and V' : step === 'qkv' ? 'Compare the words' : step === 'attention-scores' ? 'What matters most?' : 'Now the main topic'}
        </LocalContinue>
      </div>
      {scores && <span className="prod-simplified-label">simplified attention view</span>}
    </SceneFrame>
  )
}

const sampledExperts = Array.from({ length: 48 }, (_, i) => i)
const activeExperts = new Set([2, 7, 13, 19, 25, 31, 38, 44])
const routingWeights = [24, 18, 15, 13, 11, 8, 6, 5]

function MoeWorld({ step, next, previous, busy }: SectionProps) {
  const index = stepIndex(step)
  const showLayer = index >= stepIndex('expert-layer')
  const showRouter = index >= stepIndex('router-token')
  const showTop8 = index >= stepIndex('router-top8')
  const showShared = index >= stepIndex('shared-expert')
  const merged = step === 'experts-merge'

  return (
    <SceneFrame art="paper" className="prod-scene prod-moe-scene-v2">
      <PaperAtmosphere />
      <div className="prod-moe-world-v2">
        {step === 'moe-intro' && (
          <motion.div className="prod-moe-intro-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <small>THE MAIN IDEA</small>
            <strong>Mixture of Experts</strong>
            <div><span>{MODEL.routedExperts}</span> routed experts <b>+</b> <span>{MODEL.sharedExperts}</span> shared expert</div>
            <p>They are learned specialist blocks — not hand-labelled “math” or “coding” rooms.</p>
          </motion.div>
        )}

        {showLayer && (
          <motion.div className="prod-one-moe-layer" initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="prod-moe-layer-label"><small>ONE SPARSE TRANSFORMER LAYER</small><strong>MoE feed-forward block</strong></div>

            <AnimatePresence>
              {showRouter && (
                <motion.div className="prod-token-queue" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  {['dog', 'ball', 'it'].map((word, i) => (
                    <div key={word} data-current={word === 'it' ? 'true' : undefined}><span>{word}</span><small>embedding</small><i>{i === 2 ? '→' : '·'}</i></div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="prod-router-box" data-on={showRouter ? 'true' : undefined}>
              <small>ROUTER</small>
              <strong>{showTop8 ? `pick ${MODEL.expertsPerToken}` : 'score experts'}</strong>
              <i />
            </motion.div>

            <div className="prod-expert-surface">
              <IndexBoard rows={8} label={`${MODEL.routedExperts} ROUTED EXPERTS`} ariaLabel="Sampled expert wall">
                <div className="prod-expert-grid-v2">
                  {sampledExperts.map((expert) => {
                    const active = showTop8 && activeExperts.has(expert)
                    return (
                      <motion.div
                        key={expert}
                        className="prod-expert-v2"
                        data-active={active ? 'true' : undefined}
                        animate={{ opacity: showTop8 && !active ? 0.16 : 1, y: active ? -4 : 0 }}
                      >
                        <i />
                        <small>E{expert + 1}</small>
                      </motion.div>
                    )
                  })}
                </div>
              </IndexBoard>
              <span className="prod-wall-sample">48 shown · {MODEL.routedExperts} exist</span>
            </div>

            {showTop8 && (
              <svg className="prod-route-lines-v2" viewBox="0 0 1200 650" preserveAspectRatio="none" aria-hidden="true">
                {[125, 250, 378, 505, 688, 818, 945, 1080].map((x, i) => (
                  <motion.path
                    key={x}
                    d={`M 330 315 C 470 315 ${x} 330 ${x} 470`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2 + routingWeights[i] / 11}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: merged ? 0.28 : 0.72 }}
                    transition={{ duration: 0.52, delay: i * 0.035 }}
                  />
                ))}
              </svg>
            )}

            {showTop8 && !merged && (
              <motion.div className="prod-top8-label" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <strong>{MODEL.expertsPerToken} doors open</strong>
                <span>for this token, in this layer</span>
              </motion.div>
            )}

            {showShared && (
              <motion.div className="prod-shared-expert" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}>
                <span>★</span><div><small>SHARED EXPERT</small><strong>always on</strong></div>
              </motion.div>
            )}

            {merged && (
              <motion.div className="prod-expert-merge-v2" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
                <div className="prod-routing-weight-list">
                  {routingWeights.map((weight, i) => <span key={i}>{weight}%</span>)}
                </div>
                <b>weighted mix + shared path</b>
                <VectorCells compact />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      <div className="prod-context-actions">
        <StoryIconButton label="Previous beat" icon="←" onClick={previous} disabled={busy} />
        <LocalContinue onClick={next} disabled={busy} emphasis={step === 'experts-merge' ? 'strong' : 'normal'}>
          {step === 'moe-intro' ? 'Open one MoE layer' : step === 'expert-layer' ? 'Send in “it”' : step === 'router-token' ? 'Let the router choose' : step === 'router-top8' ? 'Add the shared expert' : step === 'shared-expert' ? 'Combine the outputs' : 'Zoom out'}
        </LocalContinue>
      </div>
      {showTop8 && <span className="prod-simplified-label">routing weights are illustrative</span>}
    </SceneFrame>
  )
}

function BuildingWorld({ step, next, previous, busy }: SectionProps) {
  const repeating = step === 'floor-repeat' || step === 'floor-refine'
  const refine = step === 'floor-refine'
  const floors = Array.from({ length: 15 }, (_, i) => i)

  return (
    <SceneFrame art="paper" className="prod-scene prod-building-scene">
      <PaperAtmosphere />
      <div className="prod-building-world">
        <motion.div className="prod-building" initial={{ opacity: 0, scale: 0.9, y: 70 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
          <div className="prod-building-roof"><span>{MODEL.name}</span><strong>{MODEL.layers} transformer layers</strong></div>
          <div className="prod-building-floors">
            {floors.map((floor, i) => {
              const realFloor = i < 3 ? i + 1 : i === floors.length - 1 ? 45 : 4 + (i - 3) * 3
              const dense = realFloor <= MODEL.firstDenseLayers
              const active = repeating && (i === 4 || i === 7 || i === 10 || i === 13)
              return (
                <motion.div className="prod-building-floor" key={floor} data-dense={dense ? 'true' : undefined} data-active={active ? 'true' : undefined}>
                  <small>{realFloor}</small>
                  <span>{dense ? 'dense' : 'attention + MoE'}</span>
                  {!dense && <div className="prod-mini-experts">{Array.from({ length: 8 }, (_, e) => <i key={e} data-on={active && (e + i) % 3 === 0 ? 'true' : undefined} />)}</div>}
                </motion.div>
              )
            })}
          </div>
          <div className="prod-building-legend"><span>layers 1–3: dense</span><span>layers 4–45: sparse MoE</span></div>
        </motion.div>

        <motion.div className="prod-building-vector" animate={{ y: repeating ? -250 : 230 }} transition={{ type: 'spring', stiffness: 70, damping: 19, mass: 1 }}>
          <div className="prod-carry-tag"><small>“it”</small><strong>representation</strong></div>
          <VectorCells compact />
        </motion.div>

        {refine && (
          <div className="prod-refinement-cards">
            {['it ↔ ball', 'dog → chased', 'rolled → ball', 'richer sentence context'].map((label, i) => (
              <motion.div key={label} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.13 }}><small>refine</small><strong>{label}</strong></motion.div>
            ))}
          </div>
        )}

        <div className="prod-repeat-callout">
          <strong>{repeating ? 'refine → route → mix → repeat' : 'That MoE scene was only one floor.'}</strong>
          {repeating && <span>different tokens and layers can wake different experts</span>}
        </div>
      </div>

      <div className="prod-context-actions">
        <StoryIconButton label="Previous beat" icon="←" onClick={previous} disabled={busy} />
        <LocalContinue onClick={next} disabled={busy} emphasis={refine ? 'strong' : 'normal'}>
          {step === 'building-reveal' ? 'Run through the floors' : step === 'floor-repeat' ? 'What gets refined?' : 'Generate output'}
        </LocalContinue>
      </div>
    </SceneFrame>
  )
}

function OutputWorld({ step, next, previous, busy }: SectionProps) {
  const build = step === 'output-build'
  const candidates = [
    { token: 'The', p: 46 },
    { token: 'Because', p: 21 },
    { token: 'It', p: 14 },
    { token: 'A', p: 8 },
  ]

  return (
    <SceneFrame art="paper" className="prod-scene prod-output-scene">
      <PaperAtmosphere />
      <div className="prod-output-world">
        <div className="prod-output-stack">
          <small>AFTER THE LAST LAYER</small>
          <strong>Which token comes next?</strong>
          <div className="prod-candidate-list">
            {candidates.map((item, i) => (
              <motion.div key={item.token} initial={{ opacity: 0, x: -10 }} animate={{ opacity: build && i > 0 ? 0.25 : 1, x: 0 }}>
                <span>{item.token}</span><i style={{ '--probability': item.p / 50 } as CSSProperties} /><b>{item.p}%</b>
              </motion.div>
            ))}
          </div>
        </div>

        {build && (
          <motion.div className="prod-generated-answer" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <small>OUTPUT GROWS ONE TOKEN AT A TIME</small>
            <p><span>The</span> <span>ball</span> <span>rolled</span> <span>away</span><b>.</b></p>
            <div className="prod-output-loop">whole 45-layer stack runs again → next token → again</div>
          </motion.div>
        )}
      </div>

      <div className="prod-context-actions">
        <StoryIconButton label="Previous beat" icon="←" onClick={previous} disabled={busy} />
        <LocalContinue onClick={next} disabled={busy} emphasis={build ? 'strong' : 'normal'}>{build ? 'Back to 320B vs 18B' : 'Generate it'}</LocalContinue>
      </div>
      <span className="prod-simplified-label">candidate probabilities are illustrative</span>
    </SceneFrame>
  )
}

function PayoffWorld({ previous }: SectionProps) {
  return (
    <SceneFrame art="paper" className="prod-scene prod-payoff-scene-v2">
      <PaperAtmosphere />
      <div className="prod-payoff-world-v2">
        <div className="prod-payoff-network">
          {Array.from({ length: 144 }, (_, i) => {
            const active = i % 19 === 0 || i % 31 === 0 || i % 47 === 0
            return <motion.i key={i} data-active={active ? 'true' : undefined} initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0.12 }} transition={{ delay: Math.min(0.5, i * 0.003) }} />
          })}
        </div>

        <div className="prod-payoff-card-v2">
          <small>{MODEL.name}</small>
          <div className="prod-payoff-equation-v2">
            <div><strong>{MODEL.totalParamsB}B</strong><span>available in the model</span></div>
            <b>≠</b>
            <div><strong>~{MODEL.activeParamsB}B</strong><span>active for one token</span></div>
          </div>
          <p>The model owns the whole library. Each token only walks through a small active path.</p>
          <div className="prod-payoff-foot">Different tokens can wake different experts — so more of the 320B can be used across a whole answer.</div>
          <StoryIconButton label="Go back" icon="←" onClick={previous} />
        </div>
      </div>
    </SceneFrame>
  )
}

export default function Glm320bVideo() {
  const [index, setIndex] = useState(0)
  const { busy, run } = useActionGate(430)
  const step = stepAt(index)
  const section = SECTION_FOR_STEP[step]
  const stage = STAGE_FOR_STEP[step]
  const previousStage = index > 0 ? STAGE_FOR_STEP[stepAt(index - 1)] : undefined

  const next = useCallback(() => {
    if (index >= STEPS.length - 1) return
    const nextStep = stepAt(index + 1)
    const sectionChanges = SECTION_FOR_STEP[nextStep] !== section
    run(() => setIndex((current) => Math.min(STEPS.length - 1, current + 1)), sectionChanges ? 680 : 390)
  }, [index, run, section])

  const previous = useCallback(() => {
    if (index <= 0) return
    const previousStep = stepAt(index - 1)
    const sectionChanges = SECTION_FOR_STEP[previousStep] !== section
    run(() => setIndex((current) => Math.max(0, current - 1)), sectionChanges ? 620 : 340)
  }, [index, run, section])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return
      if (event.repeat || busy) return

      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        next()
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        previous()
      }
      if (event.key === 'Home') {
        event.preventDefault()
        setIndex(0)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [busy, next, previous])

  const scene = useMemo(() => {
    const props = { step, next, previous, busy }
    if (step === 'model-hook') return <ModelHook {...props} />
    if (step === 'journey-map') return <JourneyMap {...props} />
    if (step === 'chat-empty' || step === 'chat-ready') return <ChatWorld {...props} />
    if (['tokens', 'token-kinds', 'token-ids', 'focus-it'].includes(step)) return <TokenWorld {...props} />
    if (['book-arrives', 'book-open', 'all-embeddings'].includes(step)) return <EmbeddingWorld {...props} />
    if (['carry-it', 'qkv', 'attention-scores', 'attention-answer'].includes(step)) return <AttentionWorld {...props} />
    if (['moe-intro', 'expert-layer', 'router-token', 'router-top8', 'shared-expert', 'experts-merge'].includes(step)) return <MoeWorld {...props} />
    if (['building-reveal', 'floor-repeat', 'floor-refine'].includes(step)) return <BuildingWorld {...props} />
    if (['next-token', 'output-build'].includes(step)) return <OutputWorld {...props} />
    return <PayoffWorld {...props} />
  }, [busy, next, previous, step])

  return (
    <VideoPage className="glm-production-page">
      <LayoutGroup id="glm-320b-production-v2">
        <main className="prod-story-root" data-section={section} data-step={step}>
          {step !== 'model-hook' && <StageBadge stage={stage} previousStage={previousStage} />}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={section}
              className="prod-section-transition"
              initial={{ opacity: 0, scale: 0.993 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.007 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              {scene}
            </motion.div>
          </AnimatePresence>
          <div className="prod-beat-progress" aria-label={`Beat ${index + 1} of ${STEPS.length}`}><i style={{ '--progress': (index + 1) / STEPS.length } as CSSProperties} /></div>
        </main>
      </LayoutGroup>
    </VideoPage>
  )
}
