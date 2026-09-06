import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { type CSSProperties, type MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { StoryButton, StoryIconButton } from '../../components/StoryButton'
import { SceneFrame, VideoPage } from '../../engine/SceneFrame'
import { useActionGate } from '../../engine/useActionGate'
import { BookVisual } from '../../visuals/BookVisual'
import { IndexBoard } from '../../visuals/IndexBoard'
import './glm-320b-video.css'

const sentence = 'The dog chased the ball because it rolled away.'

/**
 * GLM-5.3-Flash facts verified from the published model config/model card.
 * The tokenizer row values below are intentionally NOT presented as exact model
 * weights/IDs until we can pin them from the official tokenizer + checkpoint.
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

const readableTokens = [
  'The',
  ' dog',
  ' chased',
  ' the',
  ' ball',
  ' because',
  ' it',
  ' rolled',
  ' away',
  '.',
] as const

const itIndex = 6

const illustrativeVector = [0.12, -0.37, 0.08, 0.91, -0.22, 0.44, 0.03, -0.68, 0.51, 0.17, -0.09, 0.73]

const STEPS = [
  'chat',
  'freeze',
  'tokens',
  'focus-it',
  'token-id',
  'book-arrives',
  'book-open',
  'vector-scale',
  'vector-lift',
  'question',
  'attention-search',
  'attention-answer',
  'layers-enter',
  'layers-climb',
  'dense-question',
  'sparse-reveal',
  'router-arrives',
  'experts-route',
  'experts-merge',
  'payoff',
] as const

type Step = (typeof STEPS)[number]

type Section = 'input' | 'attention' | 'layers' | 'sparse' | 'moe' | 'payoff'

const SECTION_FOR_STEP: Record<Step, Section> = {
  chat: 'input',
  freeze: 'input',
  tokens: 'input',
  'focus-it': 'input',
  'token-id': 'input',
  'book-arrives': 'input',
  'book-open': 'input',
  'vector-scale': 'input',
  'vector-lift': 'input',
  question: 'input',
  'attention-search': 'attention',
  'attention-answer': 'attention',
  'layers-enter': 'layers',
  'layers-climb': 'layers',
  'dense-question': 'sparse',
  'sparse-reveal': 'sparse',
  'router-arrives': 'moe',
  'experts-route': 'moe',
  'experts-merge': 'moe',
  payoff: 'payoff',
}

const SECTION_ORDER: Section[] = ['input', 'attention', 'layers', 'sparse', 'moe', 'payoff']

function stepIndex(step: Step) {
  return STEPS.indexOf(step)
}

function stepAt(index: number): Step {
  return STEPS[Math.max(0, Math.min(STEPS.length - 1, index))]
}

function TinyFact({ children }: { children: React.ReactNode }) {
  return <span className="prod-tiny-fact">{children}</span>
}

function StageNote({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      className="prod-stage-note"
      initial={{ opacity: 0, y: 7 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.22 }}
    >
      {children}
    </motion.p>
  )
}

function InputSection({ step, next, previous, busy }: SectionProps) {
  const reducedMotion = useReducedMotion()
  const index = stepIndex(step)
  const showChat = step === 'chat'
  const showSentence = index >= stepIndex('freeze')
  const showTokens = index >= stepIndex('tokens') && index <= stepIndex('token-id')
  const focusIt = index >= stepIndex('focus-it')
  const showId = index >= stepIndex('token-id')
  const showBook = index >= stepIndex('book-arrives') && index <= stepIndex('vector-lift')
  const bookOpen = index >= stepIndex('book-open')
  const showScale = index >= stepIndex('vector-scale')
  const vectorLift = index >= stepIndex('vector-lift')
  const showQuestion = step === 'question'

  const note = useMemo(() => {
    switch (step) {
      case 'chat': return 'Start with a normal sentence.'
      case 'freeze': return 'The chat UI can disappear. The words are what matter.'
      case 'tokens': return 'The model first turns text into small pieces called tokens.'
      case 'focus-it': return 'Follow just one piece: “it”.'
      case 'token-id': return 'Every token points to one numbered row in the vocabulary.'
      case 'book-arrives': return 'That number is a lookup key.'
      case 'book-open': return 'It opens one learned number row: the token embedding.'
      case 'vector-scale': return `That row is ${MODEL.hiddenSize.toLocaleString()} numbers wide.`
      case 'vector-lift': return 'We can carry that whole row forward as one vector.'
      case 'question': return 'But this vector still needs context.'
      default: return ''
    }
  }, [step])

  return (
    <SceneFrame art="paper" className={`prod-scene prod-input-scene prod-step-${step}`}>
      <PaperAtmosphere />
      <AnimatePresence mode="wait">
        <StageNote key={step}>{note}</StageNote>
      </AnimatePresence>

      <div className="prod-input-world">
        <AnimatePresence>
          {showChat && (
            <motion.div
              className="prod-chat-window"
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98, filter: 'blur(5px)' }}
              transition={reducedMotion ? { duration: 0.12 } : { type: 'spring', stiffness: 160, damping: 22 }}
            >
              <div className="prod-chat-top"><i /><i /><i /><span>chat</span></div>
              <div className="prod-chat-compose">
                <span>{sentence}</span>
                <StoryButton onClick={next} disabled={busy} emphasis="strong">Send</StoryButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showSentence && !showTokens && !showBook && !showQuestion && (
          <motion.div
            layoutId="sentence-line"
            className="prod-floating-sentence"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {sentence}
          </motion.div>
        )}

        {showTokens && (
          <div className="prod-token-stage">
            <motion.div layout className="prod-token-row">
              {readableTokens.map((token, tokenIndex) => {
                const selected = tokenIndex === itIndex
                return (
                  <motion.div
                    layout
                    layoutId={`real-token-${tokenIndex}`}
                    key={`${token}-${tokenIndex}`}
                    className="prod-token"
                    data-selected={selected && focusIt ? 'true' : undefined}
                    data-dimmed={focusIt && !selected ? 'true' : undefined}
                    animate={{
                      opacity: focusIt && !selected ? 0.16 : 1,
                      y: selected && focusIt ? -12 : 0,
                      scale: selected && focusIt ? 1.08 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 170, damping: 23, mass: 0.65 }}
                  >
                    <span>{token.replace(/^ /, '·')}</span>
                    {selected && showId && <strong>token ID</strong>}
                  </motion.div>
                )
              })}
            </motion.div>

            {showId && (
              <motion.div
                className="prod-index-wall-wrap"
                initial={{ opacity: 0, x: 60, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 150, damping: 24 }}
              >
                <IndexBoard rows={9} label="TOKEN INDEX" ariaLabel="GLM token vocabulary index metaphor">
                  <div className="prod-index-rows" aria-hidden="true">
                    {Array.from({ length: 9 }, (_, row) => (
                      <div className="prod-index-row" data-focus={row === 5 ? 'true' : undefined} key={row}>
                        <small>{String(18200 + row * 311).slice(0, 3)}…</small>
                        <span>{row === 5 ? 'it' : ['walk', ' blue', ' because', ' tiny', ' after', 'it', ' dog', ' code', ' then'][row]}</span>
                        <b>{row === 5 ? 'ID' : '·'}</b>
                      </div>
                    ))}
                  </div>
                </IndexBoard>
                <TinyFact>{MODEL.vocabSize.toLocaleString()} possible token entries</TinyFact>
              </motion.div>
            )}
          </div>
        )}

        {showBook && (
          <div className={`prod-book-world ${bookOpen ? 'is-open' : ''} ${vectorLift ? 'vector-lifted' : ''}`}>
            <AnimatePresence>
              {!bookOpen && (
                <motion.div
                  className="prod-lookup-key"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                >
                  <small>TOKEN</small>
                  <strong>it</strong>
                  <span>→ row</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              className="prod-book-button"
              onClick={bookOpen ? undefined : next}
              disabled={busy || bookOpen}
              whileHover={!bookOpen && !reducedMotion ? { y: -5, rotate: -0.4 } : undefined}
              whileTap={!bookOpen && !reducedMotion ? { scale: 0.985, y: 1 } : undefined}
              aria-label={bookOpen ? 'Embedding book open' : 'Open embedding book'}
            >
              <motion.div layoutId="production-embedding-book" className="prod-book-shell">
                <BookVisual
                  state={bookOpen ? 'open' : 'closed'}
                  title="Embedding"
                  subtitle="lookup table"
                  label="Embedding lookup book"
                  leftPage={bookOpen ? <EmbeddingIdentityPage /> : undefined}
                  rightPage={bookOpen ? <EmbeddingVectorPage expanded={showScale} lifted={vectorLift} /> : undefined}
                />
              </motion.div>
              {!bookOpen && <span className="prod-object-cue">open ↗</span>}
            </motion.button>

            {bookOpen && !vectorLift && (
              <div className="prod-book-actions">
                <StoryIconButton label="Back" icon="←" onClick={previous} disabled={busy} />
                <StoryButton onClick={next} disabled={busy} emphasis={showScale ? 'strong' : 'normal'}>
                  {showScale ? 'Lift the vector' : 'How big is it?'}
                </StoryButton>
              </div>
            )}

            {vectorLift && (
              <motion.div
                layoutId="hero-vector"
                className="prod-hero-vector"
                initial={{ opacity: 0, y: 80, scaleX: 0.72 }}
                animate={{ opacity: 1, y: -120, scaleX: 1 }}
                transition={{ type: 'spring', stiffness: 110, damping: 20 }}
                onClick={next}
                role="button"
                tabIndex={0}
              >
                {illustrativeVector.map((value, i) => <VectorCell key={i} value={value} index={i} />)}
                <span className="prod-vector-ellipsis">…</span>
              </motion.div>
            )}
          </div>
        )}

        {showQuestion && (
          <div className="prod-question-world">
            <motion.div layoutId="hero-vector" className="prod-hero-vector prod-question-vector">
              {illustrativeVector.slice(0, 8).map((value, i) => <VectorCell key={i} value={value} index={i} />)}
              <span className="prod-vector-ellipsis">…</span>
            </motion.div>
            <motion.p className="prod-context-sentence" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              The dog chased the <b>ball</b> because <strong>it</strong> rolled away.
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
              How does the model know what <em>“it”</em> means here?
            </motion.h2>
            <StoryButton onClick={next} disabled={busy} emphasis="strong">Follow “it” inside</StoryButton>
          </div>
        )}
      </div>

      {!showChat && !showQuestion && !bookOpen && !vectorLift && (
        <SceneAdvance onNext={next} onPrevious={previous} busy={busy} showPrevious={step !== 'freeze'} />
      )}

      <AccuracyNote section="input" />
    </SceneFrame>
  )
}

function EmbeddingIdentityPage() {
  return (
    <div className="prod-book-page-copy prod-book-id-page">
      <small>LOOKUP</small>
      <b>token</b>
      <strong>it</strong>
      <span>one row in the embedding table</span>
    </div>
  )
}

function EmbeddingVectorPage({ expanded, lifted }: { expanded: boolean; lifted: boolean }) {
  return (
    <div className="prod-book-page-copy prod-book-vector-page" data-expanded={expanded ? 'true' : undefined} data-lifted={lifted ? 'true' : undefined}>
      <small>EMBEDDING</small>
      <strong>{MODEL.hiddenSize.toLocaleString()} values</strong>
      <div className="prod-number-strip">
        {illustrativeVector.slice(0, expanded ? 10 : 5).map((value, index) => (
          <span key={index}>{value.toFixed(2)}</span>
        ))}
        <b>…</b>
      </div>
      <p>This is the token’s learned numerical identity.</p>
    </div>
  )
}

function VectorCell({ value, index }: { value: number; index: number }) {
  const strength = Math.min(1, Math.abs(value))
  return (
    <i
      className="prod-vector-cell"
      style={{ '--cell-strength': strength, '--cell-index': index } as CSSProperties}
      title={value.toFixed(2)}
    />
  )
}

function AttentionSection({ step, next, previous, busy }: SectionProps) {
  const answered = step === 'attention-answer'
  const words = ['The', 'dog', 'chased', 'the', 'ball', 'because', 'it', 'rolled', 'away.']

  return (
    <SceneFrame art="paper" className="prod-scene prod-attention-scene">
      <PaperAtmosphere />
      <StageNote>{answered ? 'Context changes what a token means.' : '“it” can look at the words around it.'}</StageNote>

      <div className="prod-attention-world">
        <motion.div layoutId="hero-vector" className="prod-hero-vector prod-attention-vector">
          {illustrativeVector.slice(0, 8).map((value, i) => <VectorCell key={i} value={value} index={i} />)}
          <span className="prod-vector-ellipsis">…</span>
        </motion.div>

        <div className="prod-attention-sentence">
          <svg className="prod-attention-lines" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M 690 190 C 630 62 518 70 474 164"
              fill="none"
              stroke="currentColor"
              strokeWidth={answered ? 7 : 3}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: answered ? 0.88 : 0.34 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M 690 190 C 585 112 302 120 215 165"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: answered ? 0.12 : 0.24 }}
              transition={{ duration: 0.72, delay: 0.08 }}
            />
          </svg>
          {words.map((word) => (
            <motion.span
              key={word}
              data-word={word.replace('.', '')}
              data-focus={word === 'it' || (answered && word === 'ball') ? 'true' : undefined}
              animate={{ opacity: answered && !['it', 'ball'].includes(word.replace('.', '')) ? 0.25 : 1 }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div className="prod-attention-answer" key={answered ? 'answer' : 'search'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {answered ? <><strong>it → ball</strong><small>context gives the token a better meaning</small></> : <><strong>“What am I talking about?”</strong><small>attention compares this token with the others</small></>}
          </motion.div>
        </AnimatePresence>
      </div>

      <SceneAdvance onNext={next} onPrevious={previous} busy={busy} showPrevious />
      <AccuracyNote section="attention" />
    </SceneFrame>
  )
}

function LayersSection({ step, next, previous, busy }: SectionProps) {
  const climbing = step === 'layers-climb'
  const floors = Array.from({ length: 9 }, (_, i) => i)

  return (
    <SceneFrame art="paper" className="prod-scene prod-layers-scene">
      <PaperAtmosphere />
      <StageNote>{climbing ? 'The same representation is refined again and again.' : 'Now the vector enters the model.'}</StageNote>

      <div className="prod-layer-world">
        <div className="prod-layer-tower" aria-label={`${MODEL.layers} transformer layers, visually compressed`}>
          {floors.map((floor) => (
            <motion.div
              className="prod-layer-floor"
              data-active={climbing && floor <= 7 ? 'true' : undefined}
              key={floor}
              animate={{ x: floor % 2 === 0 ? 0 : 4, opacity: climbing ? 0.45 + floor * 0.06 : 0.55 }}
              transition={{ delay: climbing ? floor * 0.07 : 0 }}
            >
              <small>{floor === 0 ? '1' : floor === floors.length - 1 ? '45' : '·'}</small>
              <span />
            </motion.div>
          ))}
          <TinyFact>{MODEL.layers} layers</TinyFact>
        </div>

        <motion.div
          layoutId="hero-vector"
          className="prod-hero-vector prod-layer-vector"
          animate={{ y: climbing ? -250 : 210, scale: climbing ? 0.82 : 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 19, mass: 0.9 }}
        >
          {illustrativeVector.slice(0, 8).map((value, i) => <VectorCell key={i} value={value} index={i} />)}
          <span className="prod-vector-ellipsis">…</span>
        </motion.div>

        <div className="prod-layer-caption">
          <b>same token</b>
          <span>richer context</span>
        </div>
      </div>

      <SceneAdvance onNext={next} onPrevious={previous} busy={busy} showPrevious />
      <AccuracyNote section="layers" />
    </SceneFrame>
  )
}

function SparseSection({ step, next, previous, busy }: SectionProps) {
  const sparse = step === 'sparse-reveal'
  const rooms = Array.from({ length: 18 }, (_, i) => i)

  return (
    <SceneFrame art="paper" className="prod-scene prod-sparse-scene">
      <PaperAtmosphere />
      <StageNote>{sparse ? 'No. A Mixture-of-Experts layer can wake only a few specialist blocks.' : `Does every part of a ${MODEL.totalParamsB}B model work for every token?`}</StageNote>

      <div className="prod-sparse-world">
        <div className="prod-room-grid" data-sparse={sparse ? 'true' : undefined}>
          {rooms.map((room) => {
            const active = !sparse || [1, 4, 6, 9, 11, 14].includes(room)
            return (
              <motion.div
                className="prod-room"
                key={room}
                data-active={active ? 'true' : undefined}
                animate={{ opacity: active ? 1 : 0.16, scale: active ? 1 : 0.96 }}
                transition={{ duration: 0.28, delay: sparse ? room * 0.012 : 0 }}
              >
                <span />
                <small>{active && sparse ? 'on' : ''}</small>
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div className="prod-sparse-label" key={sparse ? 'few' : 'all'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <strong>{sparse ? 'only some wake up' : 'imagine all of them waking up'}</strong>
            {sparse && <small>this is the idea behind sparse MoE compute</small>}
          </motion.div>
        </AnimatePresence>
      </div>

      <SceneAdvance onNext={next} onPrevious={previous} busy={busy} showPrevious />
      <AccuracyNote section="sparse" />
    </SceneFrame>
  )
}

function MoeSection({ step, next, previous, busy }: SectionProps) {
  const routing = step === 'experts-route' || step === 'experts-merge'
  const merged = step === 'experts-merge'
  const experts = Array.from({ length: 36 }, (_, i) => i)
  const activeExperts = new Set([2, 6, 10, 15, 21, 25, 31, 34])

  return (
    <SceneFrame art="paper" className="prod-scene prod-moe-scene">
      <PaperAtmosphere />
      <StageNote>
        {step === 'router-arrives' && 'A tiny router scores the token and chooses which expert doors to use.'}
        {step === 'experts-route' && `For GLM-5.3-Flash, each token is routed to ${MODEL.expertsPerToken} of ${MODEL.routedExperts} routed experts in a sparse layer.`}
        {step === 'experts-merge' && 'Those selected experts work, then their outputs are combined.'}
      </StageNote>

      <div className="prod-moe-world">
        <div className="prod-router" data-routing={routing ? 'true' : undefined}>
          <motion.div layoutId="hero-vector" className="prod-router-token">it</motion.div>
          <div className="prod-router-junction">
            <small>ROUTER</small>
            <span className="prod-router-needle" />
          </div>
        </div>

        <div className="prod-expert-wall" aria-label={`${MODEL.routedExperts} routed experts, visually sampled`}>
          {experts.map((expert) => {
            const active = routing && activeExperts.has(expert)
            return (
              <motion.div
                className="prod-expert-door"
                data-active={active ? 'true' : undefined}
                key={expert}
                animate={{ opacity: routing && !active ? 0.24 : 1, y: active ? -5 : 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 20, delay: active ? expert * 0.006 : 0 }}
              >
                <i />
                <small>E{expert + 1}</small>
              </motion.div>
            )
          })}
          <TinyFact>{MODEL.routedExperts} routed experts total — wall visually sampled</TinyFact>
        </div>

        {routing && (
          <svg className="prod-route-lines" viewBox="0 0 1200 650" preserveAspectRatio="none" aria-hidden="true">
            {[90, 210, 330, 455, 610, 760, 940, 1090].map((x, i) => (
              <motion.path
                key={x}
                d={`M 600 160 C 600 250 ${x} 235 ${x} 430`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: merged ? 0.3 : 0.68 }}
                transition={{ duration: 0.55, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </svg>
        )}

        {merged && (
          <motion.div className="prod-merge-output" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
            <div className="prod-hero-vector">
              {illustrativeVector.slice(0, 8).map((value, i) => <VectorCell key={i} value={value} index={i} />)}
              <span className="prod-vector-ellipsis">…</span>
            </div>
            <small>combined result</small>
          </motion.div>
        )}
      </div>

      <SceneAdvance onNext={next} onPrevious={previous} busy={busy} showPrevious label={merged ? 'See the answer' : undefined} />
      <AccuracyNote section="moe" />
    </SceneFrame>
  )
}

function PayoffSection({ previous }: SectionProps) {
  return (
    <SceneFrame art="paper" className="prod-scene prod-payoff-scene">
      <PaperAtmosphere />
      <div className="prod-payoff-world">
        <div className="prod-payoff-model">
          {Array.from({ length: 84 }, (_, i) => (
            <motion.i
              key={i}
              data-active={i % 17 === 0 || i % 23 === 0 ? 'true' : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: i % 17 === 0 || i % 23 === 0 ? 1 : 0.14 }}
              transition={{ delay: Math.min(0.6, i * 0.004) }}
            />
          ))}
        </div>

        <div className="prod-payoff-copy">
          <small>{MODEL.name}</small>
          <div className="prod-payoff-numbers">
            <div><strong>{MODEL.totalParamsB}B</strong><span>total parameters</span></div>
            <b>→</b>
            <div><strong>{MODEL.activeParamsB}B</strong><span>active per token</span></div>
          </div>
          <h2>Big model. Small active path.</h2>
          <p>That is the trick behind <b>Mixture of Experts.</b></p>
          <StoryIconButton label="Go back" icon="←" onClick={previous} />
        </div>
      </div>
      <AccuracyNote section="payoff" />
    </SceneFrame>
  )
}

type SectionProps = {
  step: Step
  next: () => void
  previous: () => void
  busy: boolean
}

function SceneAdvance({
  onNext,
  onPrevious,
  busy,
  showPrevious,
  label = 'Continue',
}: {
  onNext: () => void
  onPrevious: () => void
  busy: boolean
  showPrevious: boolean
  label?: string
}) {
  return (
    <div className="prod-scene-controls">
      {showPrevious && <StoryIconButton label="Previous beat" icon="←" onClick={onPrevious} disabled={busy} />}
      <StoryButton onClick={onNext} disabled={busy}>{label}</StoryButton>
    </div>
  )
}

function PaperAtmosphere() {
  return <div className="prod-paper-atmosphere" aria-hidden="true"><i /><i /><i /></div>
}

function AccuracyNote({ section }: { section: Section }) {
  const copy: Record<Section, string> = {
    input: `GLM-5.3-Flash: vocab ${MODEL.vocabSize.toLocaleString()} · hidden size ${MODEL.hiddenSize.toLocaleString()}. Token boundaries/visible vector values are simplified for teaching; no fake checkpoint values are claimed.`,
    attention: 'Conceptual attention view: the real model uses a hybrid attention architecture. This beat teaches contextual token relationships, not an exact attention map.',
    layers: `${MODEL.layers} model layers. The tower is visually compressed.`,
    sparse: `GLM-5.3-Flash uses dense MLPs in the first ${MODEL.firstDenseLayers} layers, then sparse MoE MLPs.`,
    moe: `${MODEL.routedExperts} routed experts · top-${MODEL.expertsPerToken} routing · ${MODEL.sharedExperts} shared expert. Expert wall is visually sampled.`,
    payoff: `${MODEL.totalParamsB}B total / ${MODEL.activeParamsB}B active per token are published model figures. Active parameters are not the same thing as model memory footprint.`,
  }

  return <span className="prod-accuracy-note">{copy[section]}</span>
}

export default function Glm320bVideo() {
  const [index, setIndex] = useState(0)
  const { busy, run } = useActionGate(430)
  const step = stepAt(index)
  const section = SECTION_FOR_STEP[step]

  const next = useCallback(() => {
    if (index >= STEPS.length - 1) return
    run(() => setIndex((current) => Math.min(STEPS.length - 1, current + 1)), section === SECTION_FOR_STEP[stepAt(index + 1)] ? 390 : 720)
  }, [index, run, section])

  const previous = useCallback(() => {
    if (index <= 0) return
    run(() => setIndex((current) => Math.max(0, current - 1)), section === SECTION_FOR_STEP[stepAt(index - 1)] ? 340 : 650)
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

  const onRootClick = useCallback((event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('button, a, [role="button"]')) return
  }, [])

  return (
    <VideoPage className="glm-production-page">
      <LayoutGroup id="glm-320b-production">
        <main className="prod-story-root" onClick={onRootClick} data-section={section} data-step={step}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={section}
              className="prod-section-transition"
              initial={{ opacity: 0, scale: 0.992 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.008 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              {section === 'input' && <InputSection step={step} next={next} previous={previous} busy={busy} />}
              {section === 'attention' && <AttentionSection step={step} next={next} previous={previous} busy={busy} />}
              {section === 'layers' && <LayersSection step={step} next={next} previous={previous} busy={busy} />}
              {section === 'sparse' && <SparseSection step={step} next={next} previous={previous} busy={busy} />}
              {section === 'moe' && <MoeSection step={step} next={next} previous={previous} busy={busy} />}
              {section === 'payoff' && <PayoffSection step={step} next={next} previous={previous} busy={busy} />}
            </motion.div>
          </AnimatePresence>

          <div className="prod-hidden-progress" aria-label={`Story progress ${index + 1} of ${STEPS.length}`}>
            {SECTION_ORDER.map((name) => <i key={name} data-active={SECTION_ORDER.indexOf(name) <= SECTION_ORDER.indexOf(section) ? 'true' : undefined} />)}
          </div>

          {index <= 1 && <span className="prod-key-hint">SPACE / → to move · ← to go back</span>}
        </main>
      </LayoutGroup>
    </VideoPage>
  )
}
