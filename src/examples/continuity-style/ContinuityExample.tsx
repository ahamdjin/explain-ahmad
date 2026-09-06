import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { type CSSProperties, type ReactNode, useCallback, useEffect, useState } from 'react'
import { StoryButton, StoryIconButton } from '../../components/StoryButton'
import { StoryNote } from '../../components/DiagramStage'
import { ContinuityActor, ContinuityStage } from '../../continuity/ContinuityActor'
import { SceneDirector, useSceneDirector } from '../../continuity/SceneDirector'
import { SceneDeck, SharedElement, useSceneDeck } from '../../engine/SceneDeck'
import { SceneFrame } from '../../engine/SceneFrame'
import { useActionGate } from '../../engine/useActionGate'
import { BookVisual } from '../../visuals/BookVisual'
import { IndexBoard } from '../../visuals/IndexBoard'
import './continuity-example.css'

const beats = ['prompt', 'tokens', 'ids', 'book'] as const
type Beat = (typeof beats)[number]

const tokens = [
  { text: 'The', id: 464 },
  { text: 'cat', id: 3797 },
  { text: 'sat', id: 3332 },
]

const notes: Record<Beat, string> = {
  prompt: 'Send a prompt.',
  tokens: 'The prompt becomes tokens.',
  ids: 'Each token maps to one ID.',
  book: 'Those IDs look up vectors.',
}

const vectorRows = [
  [.28, .72, .43, .61, .35, .82, .49, .67],
  [.74, .31, .88, .46, .69, .38, .79, .54],
  [.41, .83, .57, .29, .76, .52, .34, .91],
]

function TokenActors({ mode, controls }: { mode: Beat; controls?: ReactNode }) {
  const showIds = mode === 'ids' || mode === 'book'

  return (
    <div className={`continuity-token-layout continuity-token-layout-${mode}`}>
      {tokens.map((token, index) => (
        <ContinuityActor
          key={token.text}
          id={`journey-token-${token.text}`}
          className="journey-token"
          curve={mode === 'book' ? 0.18 : 0.1}
          data-token-index={index}
        >
          <div className="journey-token-surface">
            <span className="journey-token-word">{token.text}</span>
            <AnimatePresence initial={false}>
              {showIds && (
                <motion.small
                  key="id"
                  className="journey-token-id"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.2, delay: index * 0.035 }}
                >
                  #{token.id}
                </motion.small>
              )}
            </AnimatePresence>
          </div>
        </ContinuityActor>
      ))}
      {controls && <div className="continuity-local-controls">{controls}</div>}
    </div>
  )
}

function VocabularyIndex({ mode }: { mode: 'ids' | 'book' }) {
  const filler = [
    { row: 1, value: '#118' },
    { row: 3, value: '#902' },
    { row: 5, value: '#5029' },
    { row: 7, value: '#8910' },
  ]

  return (
    <motion.div
      layout
      className={`vocabulary-index vocabulary-index-${mode}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: mode === 'book' ? 0.38 : 1, scale: 1 }}
      transition={{
        layout: { type: 'spring', stiffness: 150, damping: 25, mass: 0.55 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.24 },
      }}
    >
      <IndexBoard rows={7} label="TOKEN INDEX" ariaLabel="Illustrative token vocabulary index">
        <div className="vocabulary-filler-grid" aria-hidden="true">
          {filler.map((item) => (
            <span key={item.value} style={{ gridRow: item.row }}>{item.value}</span>
          ))}
        </div>
      </IndexBoard>
    </motion.div>
  )
}

function LookupTrace() {
  return (
    <motion.svg
      className="lookup-trace"
      viewBox="0 0 1000 560"
      preserveAspectRatio="none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
    >
      {[
        'M 405 210 C 520 210 560 238 670 270',
        'M 405 280 C 535 280 570 282 670 280',
        'M 405 350 C 520 350 560 322 670 290',
      ].map((path, index) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="5 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.48 }}
          transition={{ duration: 0.52, delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </motion.svg>
  )
}

function ClosedEmbeddingBook({ onOpen, disabled }: { onOpen: () => void; disabled: boolean }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="embedding-book-entry"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 34, rotate: 2.2 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={reducedMotion ? { duration: 0.12 } : { type: 'spring', stiffness: 145, damping: 22, mass: 0.68 }}
    >
      <button
        type="button"
        className="embedding-book-control"
        onClick={onOpen}
        disabled={disabled}
        aria-label="Open the embedding table"
      >
        <SharedElement name="embedding-book">
          <BookVisual state="closed" title="Embedding" subtitle="table" label="Embedding table book" />
        </SharedElement>
        <span className="book-open-cue" aria-hidden="true">open <i>↗</i></span>
      </button>
    </motion.div>
  )
}

function BeatControls({
  beat,
  canGoBack,
  busy,
  onBack,
  onNext,
}: {
  beat: Exclude<Beat, 'book'>
  canGoBack: boolean
  busy: boolean
  onBack: () => void
  onNext: () => void
}) {
  const labels: Record<Exclude<Beat, 'book'>, string> = {
    prompt: 'Tokenize',
    tokens: 'Find token IDs',
    ids: 'Look up embeddings',
  }

  return (
    <>
      {canGoBack && (
        <StoryIconButton
          label="Previous beat"
          icon="←"
          onClick={onBack}
          disabled={busy}
        />
      )}
      <StoryButton
        onClick={onNext}
        disabled={busy}
        aria-busy={busy || undefined}
        emphasis={beat === 'ids' ? 'strong' : 'normal'}
      >
        {labels[beat]}
      </StoryButton>
    </>
  )
}

function TokenizationWorld({ onOpenEmbedding }: { onOpenEmbedding: () => void }) {
  const director = useSceneDirector()
  const deck = useSceneDeck()
  const { busy: beatBusy, run } = useActionGate(420)
  const beat = director.beat as Beat
  const busy = beatBusy || deck.transitioning

  const advance = useCallback(() => {
    if (deck.transitioning) return

    if (beat === 'book') {
      run(() => {
        onOpenEmbedding()
        deck.next()
      }, 720)
      return
    }

    run(
      () => director.next(),
      beat === 'ids' ? 520 : 390,
    )
  }, [beat, deck, director, onOpenEmbedding, run])

  const previous = useCallback(() => {
    if (deck.transitioning) return
    run(() => director.previous(), 350)
  }, [deck.transitioning, director, run])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return
      if (event.repeat || busy) return

      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        advance()
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        previous()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [advance, busy, previous])

  const controls = beat !== 'book' ? (
    <BeatControls
      beat={beat}
      canGoBack={director.index > 0}
      busy={busy}
      onBack={previous}
      onNext={advance}
    />
  ) : undefined

  return (
    <SceneFrame art="paper" className={`continuity-section continuity-section-${beat}`}>
      <div className="continuity-caption" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={beat}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            <StoryNote>{notes[beat]}</StoryNote>
          </motion.div>
        </AnimatePresence>
      </div>

      <ContinuityStage id="token-journey" className={`token-journey-stage token-journey-stage-${beat}`}>
        <AnimatePresence initial={false}>
          {(beat === 'ids' || beat === 'book') && <VocabularyIndex key="vocabulary" mode={beat} />}
        </AnimatePresence>

        <TokenActors mode={beat} controls={controls} />

        {beat === 'book' && (
          <>
            <LookupTrace />
            <ClosedEmbeddingBook onOpen={advance} disabled={busy} />
            <div className="continuity-book-back">
              <StoryIconButton label="Return to token IDs" icon="←" onClick={previous} disabled={busy} />
            </div>
          </>
        )}
      </ContinuityStage>
    </SceneFrame>
  )
}

function TokenizationSection({ resumeAtBook, onOpenEmbedding }: { resumeAtBook: boolean; onOpenEmbedding: () => void }) {
  return (
    <SceneDirector beats={beats} initialIndex={resumeAtBook ? beats.length - 1 : 0}>
      <TokenizationWorld onOpenEmbedding={onOpenEmbedding} />
    </SceneDirector>
  )
}

function EmbeddingLookupPage() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="embedding-lookup-page">
      <span className="embedding-page-label">token / id</span>
      {tokens.map((token, index) => (
        <motion.div
          className="embedding-row"
          data-focus={index === 1 ? 'true' : undefined}
          key={token.text}
          initial={reducedMotion ? false : { opacity: 0, x: -7 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.24, delay: reducedMotion ? 0 : 0.24 + index * 0.065 }}
        >
          <span>{token.text}</span>
          <small>#{token.id}</small>
        </motion.div>
      ))}
    </div>
  )
}

function EmbeddingVectorPage() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="embedding-vector-page">
      <span className="embedding-page-label">embedding vector</span>
      {vectorRows.map((row, rowIndex) => (
        <motion.div
          className="vector-strip"
          data-focus={rowIndex === 1 ? 'true' : undefined}
          key={rowIndex}
          initial={reducedMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: reducedMotion ? 0 : 0.25 + rowIndex * 0.07 }}
        >
          {row.map((value, cellIndex) => (
            <motion.i
              key={cellIndex}
              style={{ '--vector-strength': value } as CSSProperties}
              initial={reducedMotion ? false : { scaleY: 0.35, opacity: 0.2 }}
              animate={{ scaleY: 1, opacity: 0.5 + value * 0.45 }}
              transition={{
                duration: 0.28,
                delay: reducedMotion ? 0 : 0.28 + rowIndex * 0.06 + cellIndex * 0.014,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  )
}

function EmbeddingSection() {
  const deck = useSceneDeck()

  const closeBook = useCallback(() => {
    if (!deck.transitioning) deck.previous()
  }, [deck])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return
      if (event.repeat || deck.transitioning) return

      if (event.key === 'ArrowLeft' || event.key === 'Escape') {
        event.preventDefault()
        closeBook()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeBook, deck.transitioning])

  return (
    <SceneFrame art="paper" className="continuity-section embedding-section">
      <div className="continuity-caption">
        <StoryNote>One ID points to one vector.</StoryNote>
      </div>

      <div className="embedding-world">
        <SharedElement name="embedding-book">
          <BookVisual
            state="open"
            label="Open embedding table"
            leftPage={<EmbeddingLookupPage />}
            rightPage={<EmbeddingVectorPage />}
          />
        </SharedElement>

        <div className="embedding-close-control">
          <StoryIconButton
            label="Close the embedding book"
            icon="←"
            onClick={closeBook}
            disabled={deck.transitioning}
          />
        </div>
      </div>
    </SceneFrame>
  )
}

export default function ContinuityExample() {
  const [openedEmbedding, setOpenedEmbedding] = useState(false)
  const markEmbeddingOpened = useCallback(() => setOpenedEmbedding(true), [])

  return (
    <div className="continuity-demo">
      <SceneDeck>
        <TokenizationSection resumeAtBook={openedEmbedding} onOpenEmbedding={markEmbeddingOpened} />
        <EmbeddingSection />
      </SceneDeck>
    </div>
  )
}
