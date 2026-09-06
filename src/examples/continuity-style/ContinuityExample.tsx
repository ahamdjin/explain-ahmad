import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { StoryButton } from '../../components/StoryButton'
import { StoryNote } from '../../components/DiagramStage'
import { ContinuityActor, ContinuityStage } from '../../continuity/ContinuityActor'
import { SceneDirector, useSceneDirector } from '../../continuity/SceneDirector'
import { SceneDeck, SharedElement, useSceneDeck } from '../../engine/SceneDeck'
import { SceneFrame } from '../../engine/SceneFrame'
import './continuity-example.css'

const beats = ['prompt', 'tokens', 'ids', 'book'] as const
const tokens = [
  { text: 'The', id: 464 },
  { text: 'cat', id: 3797 },
  { text: 'sat', id: 3332 },
]

const notes: Record<(typeof beats)[number], string> = {
  prompt: 'A prompt enters.',
  tokens: 'It splits into tokens.',
  ids: 'Each token maps to an ID.',
  book: 'Those IDs enter the embedding table.',
}

function TokenActors({ mode }: { mode: 'prompt' | 'tokens' | 'ids' | 'book' }) {
  return (
    <div className={`continuity-token-layout continuity-token-layout-${mode}`}>
      {tokens.map((token) => (
        <ContinuityActor key={token.text} id={`journey-token-${token.text}`} className="journey-token">
          <span>{token.text}</span>
          {(mode === 'ids' || mode === 'book') && <small>{token.id}</small>}
        </ContinuityActor>
      ))}
    </div>
  )
}

function VocabularyLibrary() {
  const filler = [118, 902, 1441, 5029, 7162, 8910]
  return (
    <motion.div
      className="vocabulary-library"
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.24 }}
      aria-hidden="true"
    >
      {filler.map((id) => <i key={id}><span>token</span><small>{id}</small></i>)}
    </motion.div>
  )
}

function ClosedEmbeddingBook() {
  return (
    <SharedElement name="embedding-book">
      <div className="embedding-book embedding-book-closed" aria-label="Embedding table represented as a book">
        <div className="embedding-book-spine" />
        <div className="embedding-book-cover">
          <span>Embedding</span>
          <small>table</small>
        </div>
      </div>
    </SharedElement>
  )
}

function TokenizationWorld({ onOpenEmbedding }: { onOpenEmbedding: () => void }) {
  const director = useSceneDirector()
  const deck = useSceneDeck()
  const beat = director.beat as (typeof beats)[number]

  const advance = () => {
    if (beat === 'book') {
      onOpenEmbedding()
      deck.next()
    } else {
      director.next()
    }
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return

      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        advance()
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        director.previous()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [beat, director, deck, onOpenEmbedding])

  return (
    <SceneFrame art="paper" className={`continuity-section continuity-section-${beat}`}>
      <div className="continuity-caption">
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

      <ContinuityStage id="token-journey" className="token-journey-stage">
        {(beat === 'ids' || beat === 'book') && <VocabularyLibrary />}
        <TokenActors mode={beat} />
        {beat === 'book' && <ClosedEmbeddingBook />}
      </ContinuityStage>

      <div className={`continuity-action continuity-action-${beat}`}>
        {director.index > 0 && beat !== 'book' && (
          <button type="button" className="continuity-back" onClick={director.previous} aria-label="Previous beat">←</button>
        )}
        <StoryButton onClick={advance}>
          {beat === 'prompt' ? 'Split it' : beat === 'tokens' ? 'Show IDs' : beat === 'ids' ? 'Bring in embedding' : 'Open'}
        </StoryButton>
      </div>
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

function EmbeddingSection() {
  const deck = useSceneDeck()
  return (
    <SceneFrame art="paper" className="continuity-section embedding-section">
      <div className="continuity-caption">
        <StoryNote>Now we are inside the embedding table.</StoryNote>
      </div>

      <div className="embedding-world">
        <SharedElement name="embedding-book">
          <div className="embedding-book embedding-book-open">
            <div className="embedding-page embedding-page-left">
              {tokens.map((token) => (
                <div className="embedding-row" key={token.text}>
                  <span>{token.text}</span><small>{token.id}</small>
                </div>
              ))}
            </div>
            <div className="embedding-book-gutter" />
            <div className="embedding-page embedding-page-right">
              <div className="vector-strip"><i /><i /><i /><i /><i /><i /></div>
              <div className="vector-strip"><i /><i /><i /><i /><i /><i /></div>
              <div className="vector-strip"><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
        </SharedElement>
      </div>

      <button type="button" className="continuity-back continuity-section-back" onClick={deck.previous} aria-label="Return to tokenization">←</button>
    </SceneFrame>
  )
}

export default function ContinuityExample() {
  const [openedEmbedding, setOpenedEmbedding] = useState(false)

  return (
    <div className="continuity-demo">
      <SceneDeck>
        <TokenizationSection resumeAtBook={openedEmbedding} onOpenEmbedding={() => setOpenedEmbedding(true)} />
        <EmbeddingSection />
      </SceneDeck>
    </div>
  )
}
