import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { type CSSProperties, useCallback, useEffect, useMemo, useState } from 'react'
import { StoryButton, StoryIconButton } from '../../components/StoryButton'
import { SceneFrame, VideoPage } from '../../engine/SceneFrame'
import { useActionGate } from '../../engine/useActionGate'
import { BookVisual } from '../../visuals/BookVisual'
import { IndexBoard } from '../../visuals/IndexBoard'
import './glm-320b-video-v3.css'

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

const sentence = 'The dog chased the ball because it rolled away.'

// Teaching split + IDs. Architecture facts above are real model facts; these token IDs,
// visible embedding values, attention strengths, and routing weights are illustrative.
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

const STEPS = [
  'model-hook',
  'journey',
  'chat-empty',
  'chat-ready',
  'chat-sent',
  'tokens',
  'token-kinds',
  'token-ids',
  'focus-it',
  'book-arrives',
  'book-open',
  'embedding-carry',
  'qkv',
  'attention',
  'attention-answer',
  'moe-intro',
  'moe-route',
  'moe-shared',
  'moe-merge',
  'building',
  'floors',
  'output',
  'payoff',
] as const

type Step = (typeof STEPS)[number]
type Stage = 'MODEL' | 'JOURNEY' | 'TEXT' | 'TOKENS' | 'TOKEN ID' | 'EMBEDDING' | 'ATTENTION' | 'MOE' | 'LAYERS' | 'OUTPUT' | 'ANSWER'

const STAGE: Record<Step, Stage> = {
  'model-hook': 'MODEL',
  journey: 'JOURNEY',
  'chat-empty': 'TEXT',
  'chat-ready': 'TEXT',
  'chat-sent': 'TEXT',
  tokens: 'TOKENS',
  'token-kinds': 'TOKENS',
  'token-ids': 'TOKEN ID',
  'focus-it': 'TOKEN ID',
  'book-arrives': 'EMBEDDING',
  'book-open': 'EMBEDDING',
  'embedding-carry': 'EMBEDDING',
  qkv: 'ATTENTION',
  attention: 'ATTENTION',
  'attention-answer': 'ATTENTION',
  'moe-intro': 'MOE',
  'moe-route': 'MOE',
  'moe-shared': 'MOE',
  'moe-merge': 'MOE',
  building: 'LAYERS',
  floors: 'LAYERS',
  output: 'OUTPUT',
  payoff: 'ANSWER',
}

const JOURNEY = ['Text', 'Tokens', 'IDs', 'Embeddings', 'Attention', 'Router', 'Experts', '×45', 'Output'] as const

function indexOf(step: Step) {
  return STEPS.indexOf(step)
}

function between(step: Step, start: Step, end: Step) {
  const i = indexOf(step)
  return i >= indexOf(start) && i <= indexOf(end)
}

function StageBadge({ stage }: { stage: Stage }) {
  return (
    <div className="prod3-stage-badge" aria-label={`Current stage: ${stage}`}>
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
  return <div className="prod3-paper" aria-hidden="true"><i /><i /><i /></div>
}

function VectorStrip({ showNumbers = false }: { showNumbers?: boolean }) {
  return (
    <div className="prod3-vector-strip">
      {VECTOR.map((value, index) => (
        <i
          key={index}
          style={{ '--strength': Math.abs(value) } as CSSProperties}
        >
          {showNumbers ? <span>{value.toFixed(2)}</span> : null}
        </i>
      ))}
      <b>…</b>
    </div>
  )
}

function ModelCard({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'model-hook' || step === 'payoff'
  const payoff = step === 'payoff'

  return (
    <motion.section
      className="prod3-model-card"
      data-active={active ? 'true' : undefined}
      data-payoff={payoff ? 'true' : undefined}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.93,
        y: active ? 0 : -24,
        pointerEvents: active ? 'auto' : 'none',
      }}
      transition={{ type: 'spring', stiffness: 140, damping: 22, mass: 0.8 }}
      aria-hidden={!active}
    >
      <header><span>Z.ai</span><strong>{MODEL.name}</strong><i>MoE</i></header>
      <div className="prod3-model-hero">
        <div><small>TOTAL</small><strong>{MODEL.totalParamsB}B</strong><span>parameters available</span></div>
        <b>→</b>
        <div className="is-active"><small>ACTIVE / TOKEN</small><strong>~{MODEL.activeParamsB}B</strong><span>used for one token</span></div>
      </div>
      <footer>
        <span><b>{MODEL.layers}</b> layers</span>
        <span><b>{MODEL.routedExperts}</b> routed experts</span>
        <span><b>top-{MODEL.expertsPerToken}</b></span>
        <span><b>{MODEL.sharedExperts}</b> shared</span>
      </footer>
      {!payoff ? (
        <div className="prod3-model-action">
          <StoryButton onClick={next} disabled={busy} emphasis="strong">How?</StoryButton>
        </div>
      ) : (
        <div className="prod3-payoff-copy">
          <strong>Big model. Small active path.</strong>
          <span>Different tokens can activate different experts.</span>
        </div>
      )}
    </motion.section>
  )
}

function JourneyLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'journey'
  return (
    <motion.section
      className="prod3-journey"
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.97, pointerEvents: active ? 'auto' : 'none' }}
      transition={{ duration: 0.25 }}
      aria-hidden={!active}
    >
      <div className="prod3-journey-intro"><small>ONE SIMPLE PROMPT</small><strong>follow what happens inside</strong></div>
      <div className="prod3-journey-line">
        {JOURNEY.map((item, i) => (
          <div className="prod3-journey-wrap" key={item}>
            {i > 0 ? <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ delay: i * 0.035 }} /> : null}
            {i === 0 ? (
              <motion.button
                type="button"
                className="prod3-journey-node is-start"
                onClick={next}
                disabled={busy}
                whileHover={{ y: -5 }}
                whileTap={{ y: 1, scale: 0.98 }}
              >
                <span>✎</span><strong>{item}</strong><small>start here</small>
              </motion.button>
            ) : (
              <div className="prod3-journey-node"><strong>{item}</strong></div>
            )}
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
      className="prod3-chat"
      animate={{ opacity: active ? (sent ? 0.28 : 1) : 0, scale: active ? (sent ? 0.96 : 1) : 0.96, y: sent ? -70 : 0, pointerEvents: active && !sent ? 'auto' : 'none' }}
      transition={{ type: 'spring', stiffness: 150, damping: 23 }}
      aria-hidden={!active}
    >
      <div className="prod3-chat-shell">
        <header><span>Chat</span><i /><i /><i /></header>
        <div className="prod3-chat-space"><span>How can I help?</span></div>
        <div className="prod3-chat-input">
          {!ready ? <span className="is-placeholder">Ask anything…</span> : <span className="is-ghost">{sentence}</span>}
          {!ready ? (
            <StoryButton onClick={next} disabled={busy}>Type example</StoryButton>
          ) : (
            <motion.button type="button" className="prod3-enter" onClick={next} disabled={busy} whileTap={{ scale: 0.96 }}>
              ENTER <b>↵</b>
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
  const sent = step === 'chat-sent'

  return (
    <motion.div
      className="prod3-sentence-actor"
      animate={{
        opacity: visible ? 1 : 0,
        x: 0,
        y: inChat ? '16vh' : '-13vh',
        scale: inChat ? 0.62 : 1,
        color: sent ? 'rgba(25,22,17,.75)' : 'rgba(25,22,17,1)',
      }}
      transition={{ type: 'spring', stiffness: 125, damping: 20, mass: 0.85 }}
      aria-hidden={!visible}
    >
      {sentence}
    </motion.div>
  )
}

function TokenLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'tokens', 'focus-it')
  const showKinds = step === 'token-kinds'
  const showIds = step === 'token-ids' || step === 'focus-it'
  const focus = step === 'focus-it'

  return (
    <motion.section
      className="prod3-token-layer"
      animate={{ opacity: active ? 1 : 0, pointerEvents: active ? 'auto' : 'none' }}
      transition={{ duration: 0.22 }}
      aria-hidden={!active}
    >
      <div className="prod3-token-row">
        {TOKENS.map((token, i) => (
          <motion.div
            key={`${token.text}-${i}`}
            className="prod3-token"
            data-it={i === IT_INDEX ? 'true' : undefined}
            data-dim={focus && i !== IT_INDEX ? 'true' : undefined}
            initial={false}
            animate={{
              opacity: focus && i !== IT_INDEX ? 0.14 : focus && i === IT_INDEX ? 0 : 1,
              y: focus && i === IT_INDEX ? -12 : 0,
              scale: focus && i === IT_INDEX ? 1.08 : 1,
            }}
            transition={{ type: 'spring', stiffness: 175, damping: 22, delay: step === 'tokens' ? i * 0.025 : 0 }}
          >
            <span>{token.text.replace(/^ /, '·')}</span>
            {showIds ? <small>ID {token.id}</small> : null}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showKinds ? (
          <motion.div className="prod3-token-kinds" key="kinds" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div><b>dog</b><span>whole word</span></div>
            <div><b>…able</b><span>word piece</span></div>
            <div><b>.</b><span>punctuation</span></div>
          </motion.div>
        ) : showIds && !focus ? (
          <motion.div className="prod3-id-range" key="range" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <small>{MODEL.name} vocabulary</small><strong>IDs 0 → {MODEL.vocabSize - 1}</strong>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="prod3-local-action prod3-token-action">
        <StoryButton onClick={next} disabled={busy} emphasis={focus ? 'strong' : 'normal'}>
          {step === 'tokens' ? 'What is a token?' : step === 'token-kinds' ? 'Give every token an ID' : step === 'token-ids' ? 'Follow “it”' : 'Use its ID'}
        </StoryButton>
      </div>
    </motion.section>
  )
}

function HeroActor({ step }: { step: Step }) {
  const visible = between(step, 'focus-it', 'output')
  const embedding = between(step, 'book-open', 'attention-answer')
  const moe = between(step, 'moe-intro', 'moe-merge')
  const building = step === 'building' || step === 'floors' || step === 'output'

  const position = useMemo(() => {
    if (step === 'focus-it') return { x: '0vw', y: '-2vh', scale: 1 }
    if (step === 'book-arrives') return { x: '-28vw', y: '0vh', scale: 0.95 }
    if (step === 'book-open') return { x: '-30vw', y: '-4vh', scale: 0.9 }
    if (step === 'embedding-carry') return { x: '-29vw', y: '-20vh', scale: 0.86 }
    if (between(step, 'qkv', 'attention-answer')) return { x: '-30vw', y: '-22vh', scale: 0.82 }
    if (moe) return { x: '-31vw', y: '-2vh', scale: 0.82 }
    if (step === 'building') return { x: '0vw', y: '30vh', scale: 0.72 }
    if (step === 'floors') return { x: '0vw', y: '-24vh', scale: 0.64 }
    if (step === 'output') return { x: '-28vw', y: '-22vh', scale: 0.56 }
    return { x: '0vw', y: '0vh', scale: 1 }
  }, [moe, step])

  return (
    <motion.div
      className="prod3-hero-actor"
      data-embedding={embedding ? 'true' : undefined}
      data-moe={moe ? 'true' : undefined}
      data-building={building ? 'true' : undefined}
      animate={{ opacity: visible ? 1 : 0, ...position, pointerEvents: 'none' }}
      transition={{ type: 'spring', stiffness: 105, damping: 19, mass: 0.9 }}
      aria-hidden={!visible}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={embedding || building ? 'vector' : moe ? 'token' : 'id'} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.15 }}>
          {embedding || building ? (
            <div className="prod3-hero-vector"><small>embedding of</small><strong>it</strong><VectorStrip /></div>
          ) : moe ? (
            <div className="prod3-hero-token"><small>TOKEN</small><strong>it</strong></div>
          ) : (
            <div className="prod3-hero-id"><strong>it</strong><span>ID 82,4…</span><small>example ID</small></div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

function EmbeddingLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'book-arrives', 'embedding-carry')
  const open = step === 'book-open' || step === 'embedding-carry'
  const carry = step === 'embedding-carry'
  const reducedMotion = useReducedMotion()

  return (
    <motion.section
      className="prod3-embedding-layer"
      animate={{ opacity: active ? (carry ? 0.36 : 1) : 0, scale: carry ? 0.94 : 1, pointerEvents: active && !carry ? 'auto' : 'none' }}
      transition={{ type: 'spring', stiffness: 120, damping: 21 }}
      aria-hidden={!active}
    >
      <div className="prod3-page-key"><small>TOKEN ID</small><strong>82,4…</strong><span>acts like a page number</span></div>
      <motion.button
        type="button"
        className="prod3-book-button"
        onClick={!open ? next : undefined}
        disabled={busy || open}
        whileHover={!open && !reducedMotion ? { y: -6, rotate: -0.4 } : undefined}
        whileTap={!open && !reducedMotion ? { scale: 0.985 } : undefined}
      >
        <BookVisual
          state={open ? 'open' : 'closed'}
          title="Embeddings"
          subtitle="numerical lookup"
          label="Embedding book"
          leftPage={open ? <div className="prod3-book-left"><small>PAGE / TOKEN ID</small><strong>82,4…</strong><b>“it”</b><span>one token → one lookup row</span></div> : undefined}
          rightPage={open ? <div className="prod3-book-right"><small>EMBEDDING</small><strong>[ 0.29, −0.14, 0.83, 0.07, … ]</strong><div><b>{MODEL.hiddenSize.toLocaleString()}</b><span>values</span></div><p>The numerical representation the model carries.</p></div> : undefined}
        />
        {!open ? <span className="prod3-open-cue">open page ↗</span> : null}
      </motion.button>
      {open && !carry ? (
        <div className="prod3-local-action prod3-book-action"><StoryButton onClick={next} disabled={busy} emphasis="strong">Carry this embedding forward</StoryButton></div>
      ) : null}
    </motion.section>
  )
}

function AttentionLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'qkv', 'attention-answer')
  const scores = step === 'attention' || step === 'attention-answer'
  const answer = step === 'attention-answer'
  const weights = [0.06, 0.12, 0.18, 0.08, 1, 0.22, 0.28, 0.64, 0.15]
  const words = ['The', 'dog', 'chased', 'the', 'ball', 'because', 'it', 'rolled', 'away']

  return (
    <motion.section className="prod3-attention-layer" animate={{ opacity: active ? 1 : 0, pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <motion.div className="prod3-qkv" animate={{ opacity: scores ? 0.26 : 1, y: scores ? -70 : 0 }}>
        <div><b>Q</b><strong>Query</strong><span>What am I looking for?</span></div>
        <div><b>K</b><strong>Key</strong><span>What do I match?</span></div>
        <div><b>V</b><strong>Value</strong><span>What information do I bring?</span></div>
      </motion.div>

      <motion.div className="prod3-attention-sentence" animate={{ opacity: scores ? 1 : 0, y: scores ? 0 : 30 }}>
        <svg viewBox="0 0 1000 260" preserveAspectRatio="none" aria-hidden="true">
          {scores ? words.map((word, i) => {
            if (word === 'it') return null
            const x = 80 + i * 105
            return <motion.path key={word} d={`M 710 185 C 650 70 ${x} 75 ${x} 165`} fill="none" stroke="currentColor" strokeWidth={1.5 + weights[i] * 6} strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: answer && word !== 'ball' ? 0.1 : 0.16 + weights[i] * 0.7 }} transition={{ duration: 0.55, delay: i * 0.025 }} />
          }) : null}
        </svg>
        <div className="prod3-attention-words">
          {words.map((word, i) => <motion.span key={word} data-source={word === 'it' ? 'true' : undefined} data-answer={answer && word === 'ball' ? 'true' : undefined} animate={{ opacity: answer && !['it', 'ball'].includes(word) ? 0.2 : 1, y: answer && word === 'ball' ? -8 : 0 }}>{word}<i style={{ '--weight': weights[i] } as CSSProperties} /></motion.span>)}
        </div>
        <AnimatePresence>{answer ? <motion.div className="prod3-attention-result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><strong>“it” ↔ “ball”</strong><span>context reshapes what the token carries forward</span></motion.div> : null}</AnimatePresence>
      </motion.div>

      <div className="prod3-local-action prod3-attention-action"><StoryButton onClick={next} disabled={busy} emphasis={answer ? 'strong' : 'normal'}>{step === 'qkv' ? 'Use Q · K · V' : step === 'attention' ? 'Which connection wins?' : 'Now the main idea'}</StoryButton></div>
    </motion.section>
  )
}

function MoeLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = between(step, 'moe-intro', 'building')
  const routing = step === 'moe-route' || step === 'moe-shared' || step === 'moe-merge'
  const shared = step === 'moe-shared' || step === 'moe-merge'
  const merged = step === 'moe-merge'
  const building = step === 'building'

  return (
    <motion.section
      className="prod3-moe-layer"
      data-floor={building ? 'true' : undefined}
      animate={{
        opacity: active ? 1 : 0,
        scale: building ? 0.36 : 1,
        y: building ? '2vh' : 0,
        pointerEvents: active && !building ? 'auto' : 'none',
      }}
      transition={{ type: 'spring', stiffness: 85, damping: 18, mass: 1.05 }}
      aria-hidden={!active}
    >
      <div className="prod3-moe-heading"><small>ONE SPARSE TRANSFORMER LAYER</small><strong>Mixture of Experts</strong></div>
      <div className="prod3-router"><small>ROUTER</small><strong>{routing ? `pick ${MODEL.expertsPerToken}` : 'score experts'}</strong><i /></div>
      <div className="prod3-experts">
        <IndexBoard rows={8} label={`${MODEL.routedExperts} ROUTED EXPERTS`} ariaLabel="Sample of routed experts">
          <div className="prod3-expert-grid">
            {EXPERT_SAMPLE.map((expert) => {
              const on = routing && ACTIVE_EXPERTS.has(expert)
              return <motion.div key={expert} className="prod3-expert" data-on={on ? 'true' : undefined} animate={{ opacity: routing && !on ? 0.13 : 1, y: on ? -3 : 0 }}><i /><small>E{expert + 1}</small></motion.div>
            })}
          </div>
        </IndexBoard>
        <span>48 shown · {MODEL.routedExperts} exist</span>
      </div>
      {routing ? (
        <svg className="prod3-routing-lines" viewBox="0 0 1200 650" preserveAspectRatio="none" aria-hidden="true">
          {[120, 255, 385, 510, 690, 825, 950, 1080].map((x, i) => <motion.path key={x} d={`M 322 316 C 480 316 ${x} 340 ${x} 470`} fill="none" stroke="currentColor" strokeWidth={2 + (7 - i) * 0.35} strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: merged ? 0.24 : 0.62 }} transition={{ duration: 0.5, delay: i * 0.035 }} />)}
        </svg>
      ) : null}
      {routing && !merged ? <div className="prod3-top8"><strong>{MODEL.expertsPerToken} doors open</strong><span>for this token, in this layer</span></div> : null}
      {shared ? <motion.div className="prod3-shared" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }}><b>★</b><div><small>SHARED EXPERT</small><strong>always active</strong></div></motion.div> : null}
      {merged ? <motion.div className="prod3-merge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span>weighted mix</span><b>+</b><span>shared path</span><VectorStrip /></motion.div> : null}
      {!building ? <div className="prod3-local-action prod3-moe-action"><StoryButton onClick={next} disabled={busy} emphasis={merged ? 'strong' : 'normal'}>{step === 'moe-intro' ? 'Send “it” to the router' : step === 'moe-route' ? 'Add the always-on expert' : step === 'moe-shared' ? 'Combine the results' : 'Zoom out'}</StoryButton></div> : null}
    </motion.section>
  )
}

function BuildingLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'building' || step === 'floors' || step === 'output'
  const running = step === 'floors'
  const output = step === 'output'
  const floors = Array.from({ length: 13 }, (_, i) => i)

  return (
    <motion.section
      className="prod3-building-layer"
      data-output={output ? 'true' : undefined}
      animate={{ opacity: active ? 1 : 0, x: output ? '-24vw' : '0vw', scale: output ? 0.76 : 1, pointerEvents: active && !output ? 'auto' : 'none' }}
      transition={{ type: 'spring', stiffness: 90, damping: 19, mass: 1 }}
      aria-hidden={!active}
    >
      <div className="prod3-building-roof"><small>{MODEL.name}</small><strong>{MODEL.layers} transformer layers</strong></div>
      <div className="prod3-building-floors">
        {floors.map((_, i) => {
          const real = i < 3 ? i + 1 : i === floors.length - 1 ? 45 : 4 + (i - 3) * 4
          const dense = real <= MODEL.firstDenseLayers
          const lit = running && [3, 5, 7, 9, 11].includes(i)
          const portal = i === 7
          return (
            <motion.div key={i} className="prod3-floor" data-dense={dense ? 'true' : undefined} data-lit={lit ? 'true' : undefined} data-portal={portal ? 'true' : undefined}>
              <small>{real}</small><strong>{dense ? 'attention + dense MLP' : 'attention + MoE'}</strong>
              {!dense ? <div>{Array.from({ length: 8 }, (_, e) => <i key={e} data-on={lit && (e + i) % 3 === 0 ? 'true' : undefined} />)}</div> : null}
            </motion.div>
          )
        })}
      </div>
      <div className="prod3-building-caption"><span>1–3 dense</span><span>4–45 sparse MoE</span></div>
      {!output ? <div className="prod3-local-action prod3-building-action"><StoryButton onClick={next} disabled={busy} emphasis={running ? 'strong' : 'normal'}>{step === 'building' ? 'Run through the floors' : 'Generate the next token'}</StoryButton></div> : null}
    </motion.section>
  )
}

function OutputLayer({ step, next, busy }: { step: Step; next: () => void; busy: boolean }) {
  const active = step === 'output'
  const candidates = [
    ['The', 0.78], ['Because', 0.36], ['It', 0.25], ['A', 0.14],
  ] as const
  return (
    <motion.section className="prod3-output-layer" animate={{ opacity: active ? 1 : 0, x: active ? '21vw' : '28vw', pointerEvents: active ? 'auto' : 'none' }} aria-hidden={!active}>
      <small>AFTER LAYER 45</small>
      <strong>Which token comes next?</strong>
      <div className="prod3-candidates">{candidates.map(([token, p], i) => <motion.div key={token} initial={{ opacity: 0, x: 8 }} animate={{ opacity: active ? 1 : 0, x: 0 }} transition={{ delay: i * 0.06 }}><span>{token}</span><i style={{ '--p': p } as CSSProperties} /></motion.div>)}</div>
      <div className="prod3-generated"><small>OUTPUT</small><p><b>The</b> ball rolled away…</p><span>then the whole stack runs again for the next generated token</span></div>
      <StoryButton onClick={next} disabled={busy} emphasis="strong">So why only ~18B?</StoryButton>
    </motion.section>
  )
}

export default function Glm320bVideoV3() {
  const [index, setIndex] = useState(0)
  const { busy, run } = useActionGate(460)
  const step = STEPS[index]
  const stage = STAGE[step]

  const next = useCallback(() => {
    if (index >= STEPS.length - 1) return
    const nextStep = STEPS[index + 1]
    const bigChange = STAGE[nextStep] !== STAGE[step]
    run(() => setIndex((current) => Math.min(STEPS.length - 1, current + 1)), bigChange ? 680 : 420)
  }, [index, run, step])

  const previous = useCallback(() => {
    if (index <= 0) return
    const previousStep = STEPS[index - 1]
    const bigChange = STAGE[previousStep] !== STAGE[step]
    run(() => setIndex((current) => Math.max(0, current - 1)), bigChange ? 620 : 360)
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
    <VideoPage className="glm-production-page prod3-page">
      <LayoutGroup id="glm-320b-persistent-world">
        <SceneFrame art="paper" className="prod3-scene">
          <PaperWorld />
          {step !== 'model-hook' ? <StageBadge stage={stage} /> : null}

          <div className="prod3-world" data-step={step}>
            <ModelCard step={step} next={next} busy={busy} />
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

          {index > 0 ? <div className="prod3-back"><StoryIconButton label="Previous beat" icon="←" onClick={previous} disabled={busy} /></div> : null}
          <div className="prod3-progress" aria-label={`Beat ${index + 1} of ${STEPS.length}`}><i style={{ '--progress': (index + 1) / STEPS.length } as CSSProperties} /></div>
        </SceneFrame>
      </LayoutGroup>
    </VideoPage>
  )
}
