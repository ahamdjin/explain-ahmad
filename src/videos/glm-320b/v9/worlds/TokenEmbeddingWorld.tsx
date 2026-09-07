import { motion } from 'motion/react'
import { BookVisual } from '../../../../visuals/BookVisual'
import { SketchAnnotation } from '../../../../visuals/SketchAnnotation'
import { EMBEDDING_PREVIEW, IT_TOKEN_INDEX, MODEL, TEACHING_TOKENS } from '../data'
import { HeroVector, NarrativeCue, VectorStrip } from '../shared'

function stageFor(beat: number) {
  if (beat <= 28) return 'TOKENS'
  if (beat <= 35) return 'TOKEN ID'
  return 'EMBEDDING'
}

export function TokenEmbeddingWorld({ beat }: { beat: number }) {
  const stage = stageFor(beat)
  const boundaries = beat >= 22
  const separated = beat >= 24
  const kinds = beat === 25
  const count = beat >= 26 && beat <= 28
  const scan = beat === 27
  const focus = beat >= 28 && beat <= 35
  const ids = beat >= 30 && beat <= 35
  const idDefinition = beat === 31
  const vocab = beat >= 32 && beat <= 37
  const indexScroll = beat === 33
  const idLands = beat >= 34
  const idKey = beat >= 35 && beat <= 39
  const book = beat >= 37
  const pageTab = beat >= 38
  const flipping = beat === 39
  const openBook = beat >= 40
  const values = beat >= 41
  const notDictionary = beat >= 42
  const scale = beat >= 43
  const carry = beat >= 44

  const heading = stage === 'TOKENS'
    ? 'What does the model make from our sentence first?'
    : stage === 'TOKEN ID'
      ? 'Tokens are still text. How does the model point to one?'
      : 'An address is not a representation. What does it open?'

  const note = stage === 'TOKENS'
    ? 'Watch the boundaries appear before we name the pieces.'
    : stage === 'TOKEN ID'
      ? `Each token gets a lookup address inside ${MODEL.vocabSize.toLocaleString()} possible vocabulary entries.`
      : `The address selects one learned row with ${MODEL.hiddenSize.toLocaleString()} values.`

  return (
    <motion.section className="v9-world v9-token-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="v9-token-heading">
        <small>{stage === 'TOKENS' ? '02 · TOKENS' : stage === 'TOKEN ID' ? '03 · TOKEN ID' : '04 · EMBEDDING'}</small>
        <h2>{heading}</h2>
        <p>{note}</p>
      </header>

      {!vocab && !book ? (
        <motion.div className="v9-token-stage" animate={{ x: scan ? '-8cqw' : 0, y: stage === 'TOKEN ID' ? '-1cqh' : 0 }}>
          {!separated ? (
            <motion.div layoutId="v9-sentence" className="v9-floating-sentence" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              {TEACHING_TOKENS.map((token, index) => (
                <span key={`${token.text}-${index}`}>
                  {token.text}
                  {boundaries && index < TEACHING_TOKENS.length - 1 ? <motion.i initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: index * 0.035 }} /> : null}
                </span>
              ))}
            </motion.div>
          ) : (
            <div className="v9-token-row">
              {TEACHING_TOKENS.map((token, index) => {
                const isIt = index === IT_TOKEN_INDEX
                const dim = focus && !isIt
                return (
                  <motion.div
                    key={`${token.text}-${index}`}
                    className="v9-token-card"
                    layoutId={isIt ? 'v9-it-token' : undefined}
                    data-it={isIt ? 'true' : undefined}
                    animate={{ opacity: dim ? 0.16 : 1, y: isIt && focus ? '-2cqh' : 0, scale: isIt && focus ? 1.12 : 1 }}
                    transition={{ type: 'spring', stiffness: 130, damping: 23 }}
                  >
                    <strong>{token.text.trim() || token.text}</strong>
                    {ids ? <motion.span className="v9-token-id" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.035 }}>{token.id}</motion.span> : null}
                  </motion.div>
                )
              })}
            </div>
          )}

          {boundaries && !separated ? <div className="v9-token-instruction">first find the boundaries</div> : null}
          {separated && beat === 24 ? <div className="v9-token-instruction"><b>ANSWER:</b> those pieces are tokens</div> : null}
          {kinds ? (
            <motion.aside className="v9-token-kinds" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <small>A TOKEN CAN BE</small>
              <div><b>dog</b><span>whole word</span></div>
              <div><b>…piece</b><span>word piece</span></div>
              <div><b>,</b><span>punctuation</span></div>
            </motion.aside>
          ) : null}
          {count ? <motion.div className="v9-token-count" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><b>{TEACHING_TOKENS.length}</b><span>teaching pieces in this view</span></motion.div> : null}
          {beat === 28 ? <motion.div className="v9-follow-it" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><SketchAnnotation type="circle" color="#d89a55" padding={7}>Let's follow <b>it</b>.</SketchAnnotation></motion.div> : null}
          {idDefinition ? <motion.div className="v9-id-definition" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><strong>Answer: no.</strong><span>Token ID = a lookup number, not the token's meaning.</span></motion.div> : null}
        </motion.div>
      ) : null}

      {beat === 29 ? (
        <NarrativeCue kind="but" className="v11-token-bridge">
          We have tokens now, <b>but they are still text.</b> The network needs a numerical address for each one.
        </NarrativeCue>
      ) : null}

      {beat === 30 ? (
        <NarrativeCue kind="prediction" className="v11-token-prediction">
          The number under <b>it</b> has appeared. Is that number what <b>it means</b>?
        </NarrativeCue>
      ) : null}

      {vocab ? (
        <motion.div className="v9-vocab-world" animate={{ opacity: book && beat >= 37 ? 0.22 : 1, scaleX: book && beat >= 37 ? 0.82 : 1, rotateY: book && beat >= 37 ? -16 : 0 }}>
          <div className="v9-vocab-scale-label"><b>{MODEL.vocabSize.toLocaleString()}</b><span>possible vocabulary entries</span></div>
          <motion.div className="v9-vocab-lines" animate={{ y: indexScroll ? '-11cqh' : idLands ? '-3cqh' : '7cqh' }} transition={{ duration: indexScroll ? 0.8 : 0.45, ease: 'easeOut' }}>
            {Array.from({ length: 72 }, (_, index) => {
              const target = index === 37
              return (
                <div key={index} data-target={target && idLands ? 'true' : undefined}>
                  <small>{target ? TEACHING_TOKENS[IT_TOKEN_INDEX].id : `${(index * 2150 + 1100).toLocaleString()}`}</small>
                  <i />
                  <span>{target ? 'it' : index % 8 === 0 ? 'token…' : ''}</span>
                </div>
              )
            })}
          </motion.div>
          {idLands ? <motion.div className="v9-index-target" layoutId="v9-id-key" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}><small>LOOKUP ADDRESS</small><strong>{TEACHING_TOKENS[IT_TOKEN_INDEX].id}</strong><span>→ it</span></motion.div> : null}
          {beat === 32 ? <div className="v9-vocab-caption">Our handful of tokens is tiny compared with the model's full index.</div> : null}
          {beat === 33 ? <div className="v9-vocab-caption">Keep the token still. Move the index until the address reaches its row.</div> : null}
          {beat === 34 ? <div className="v9-vocab-caption"><b>ANSWER:</b> the ID points to this row. It still does not describe meaning.</div> : null}
        </motion.div>
      ) : null}

      {beat === 35 ? (
        <NarrativeCue kind="but" className="v11-token-bridge">
          We found the address, <b>but an address is not something the network can richly transform.</b> What is stored there?
        </NarrativeCue>
      ) : null}

      {beat === 36 ? (
        <NarrativeCue kind="therefore" className="v11-token-bridge">
          Use the ID as a key and <b>look up one learned numerical row.</b>
        </NarrativeCue>
      ) : null}

      {book ? (
        <motion.div className="v9-book-stage" initial={{ opacity: 0, x: '25cqw', rotate: 4 }} animate={{ opacity: 1, x: 0, rotate: 0, scale: scale ? 0.72 : 1, y: scale ? '-9cqh' : 0 }} transition={{ type: 'spring', stiffness: 85, damping: 20 }}>
          <BookVisual
            state={openBook ? 'open' : 'closed'}
            className="v9-embedding-book"
            title="Embedding Book"
            subtitle={`${MODEL.vocabSize.toLocaleString()} lookup rows`}
            leftPage={openBook ? <div className="v9-book-left"><small>LOOKUP ADDRESS</small><strong>{TEACHING_TOKENS[IT_TOKEN_INDEX].id}</strong><p>token: <b>it</b></p>{notDictionary ? <em>not a dictionary definition</em> : null}</div> : undefined}
            rightPage={openBook ? <div className="v9-book-right"><small>EMBEDDING ROW FOR “it”</small>{values ? <><VectorStrip numbers /><p>{notDictionary ? 'a learned numerical starting representation' : 'the first few values on this row'}</p></> : <span>page found</span>}</div> : undefined}
          />
          {pageTab && idKey ? <motion.div layoutId="v9-id-key" className="v9-book-tab"><small>ID</small><strong>{TEACHING_TOKENS[IT_TOKEN_INDEX].id}</strong></motion.div> : null}
          {flipping ? <div className="v9-page-flips" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <motion.i key={index} initial={{ rotateY: -88, x: 0, opacity: 0.7 }} animate={{ rotateY: 0, x: `${index * 0.35}cqw`, opacity: 0 }} transition={{ delay: index * 0.07, duration: 0.42 }} />)}</div> : null}
        </motion.div>
      ) : null}

      {scale ? (
        <motion.div className="v9-embedding-unfold" initial={{ scaleX: 0.18, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>
          <div>{EMBEDDING_PREVIEW.slice(0, 6).map((value) => <span key={value}>{value.toFixed(2)}</span>)}<b>························</b></div>
          <strong>{MODEL.hiddenSize.toLocaleString()} values</strong>
          <small>We only draw the first few. The representation continues much farther.</small>
        </motion.div>
      ) : null}

      {carry ? (
        <motion.div className="v9-all-embeddings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="v9-embedding-ghosts">{TEACHING_TOKENS.slice(0, 9).map((token, index) => <span key={index} data-it={index === IT_TOKEN_INDEX ? 'true' : undefined}><b>{token.text.trim()}</b><VectorStrip compact /></span>)}</div>
          <motion.div className="v9-carry-vector" initial={{ y: '8cqh', opacity: 0 }} animate={{ y: 0, opacity: 1 }}><HeroVector note="embedding carried forward" /></motion.div>
          <p>Every token gets a numerical representation. <b>We keep following only “it”.</b></p>
        </motion.div>
      ) : null}

      {beat === 44 ? (
        <NarrativeCue kind="but" className="v11-embedding-bridge">
          Now <b>it</b> has 4,096 numbers — <b>but those numbers alone do not say which earlier words matter here.</b> Therefore it needs context.
        </NarrativeCue>
      ) : null}
    </motion.section>
  )
}
