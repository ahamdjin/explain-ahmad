import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { EMBEDDING_PREVIEW, IT_TOKEN_INDEX, MODEL, SENTENCE, TEACHING_TOKENS } from '../data'
import { HeroVector, VectorStrip } from '../shared'

function stageFor(beat: number) {
  if (beat <= 28) return 'TOKENS'
  if (beat <= 35) return 'TOKEN ID'
  return 'EMBEDDING'
}

export function TokenEmbeddingWorldV12({ beat }: { beat: number }) {
  const stage = stageFor(beat)
  const boundaries = beat >= 22 && beat < 24
  const separated = beat >= 24
  const focusIt = beat >= 28
  const ids = beat >= 29
  const bookPresent = beat >= 32
  const indexScroll = beat === 33
  const rowFound = beat >= 34
  const idKey = beat >= 35
  const embeddingMode = beat >= 36
  const bookOpen = beat >= 37
  const pageTab = beat >= 38
  const flipping = beat === 39
  const pageFound = beat >= 40
  const values = beat >= 41
  const notDictionary = beat >= 42
  const unfolded = beat >= 43
  const carry = beat >= 44

  return (
    <motion.section className="v12j-world v12j-token-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="v12j-world-label"><small>02–04 · TEXT → TOKENS → ID → EMBEDDING</small><span>one continuous conversion desk</span></div>

      <nav className="v12j-conversion-rail" aria-label="Text conversion path">
        {['TEXT', 'TOKENS', 'TOKEN ID', 'EMBEDDING'].map((label, index) => {
          const active = stage === 'TOKENS' ? index === 1 : stage === 'TOKEN ID' ? index === 2 : index === 3
          const done = stage === 'TOKEN ID' ? index < 2 : stage === 'EMBEDDING' ? index < 3 : index === 0
          return <span key={label} data-active={active ? 'true' : undefined} data-done={done ? 'true' : undefined}><b>{label}</b>{index < 3 ? <i>→</i> : null}</span>
        })}
      </nav>

      <motion.div className="v12j-token-sentence" animate={{ opacity: embeddingMode ? 0.45 : 1, y: embeddingMode ? '-1.5cqh' : 0 }}>
        {!separated ? (
          <motion.p layoutId="v12-sentence-actor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {TEACHING_TOKENS.map((token, index) => <span key={`${token.text}-${index}`}>{token.text}{boundaries && index < TEACHING_TOKENS.length - 1 ? <motion.i initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: index * 0.04 }} /> : null}</span>)}
          </motion.p>
        ) : (
          <div className="v12j-token-row">
            {TEACHING_TOKENS.map((token, index) => {
              const isIt = index === IT_TOKEN_INDEX
              return (
                <motion.div
                  key={`${token.text}-${index}`}
                  className="v12j-token-piece"
                  layoutId={isIt ? 'v12-it-token' : undefined}
                  data-it={isIt ? 'true' : undefined}
                  animate={{ opacity: focusIt && !isIt ? 0.34 : 1, y: focusIt && isIt ? '-1.3cqh' : 0 }}
                >
                  <strong>{token.text.trim() || token.text}</strong>
                  {ids ? <motion.span initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>{token.id}</motion.span> : null}
                </motion.div>
              )
            })}
          </div>
        )}

        {beat === 21 ? <div className="v12j-local-question"><small>BUT</small><b>Inside the model, this sentence needs stable machine-readable pieces.</b></div> : null}
        {boundaries ? <div className="v12j-local-note">The tokenizer decides where one piece ends and the next begins.</div> : null}
        {beat === 25 ? <div className="v12j-token-kinds"><span><b>dog</b> whole word</span><span><b>…piece</b> word piece</span><span><b>,</b> punctuation</span></div> : null}
        {beat === 28 ? <div className="v12j-follow-note">We only need one actor from here: <b>“it”</b>.</div> : null}
        {beat === 31 ? <div className="v12j-id-note"><small>IMPORTANT</small><b>Token ID = lookup address.</b><span>It is not the meaning of “it”.</span></div> : null}
      </motion.div>

      {bookPresent ? (
        <motion.div className="v12j-lookup-zone" data-open={bookOpen ? 'true' : undefined} data-embedding={embeddingMode ? 'true' : undefined} animate={{ opacity: carry ? 0.2 : 1, scale: carry ? 0.9 : 1 }}>
          <div className="v12j-lookup-copy">
            <small>{embeddingMode ? 'THE ADDRESS HAS ONE JOB LEFT' : 'MODEL TOKEN TABLE'}</small>
            <h2>{embeddingMode ? <>What is stored at that address?</> : <><b>{MODEL.vocabSize.toLocaleString()}</b> possible vocabulary rows</>}</h2>
            <p>{embeddingMode ? 'The ID points to a learned numerical row the network can actually transform.' : 'A vocabulary-sized index lets one token ID point at one stable row.'}</p>
            {embeddingMode ? <div className="v12j-therefore"><small>THEREFORE</small><strong>ID → embedding row</strong></div> : null}
          </div>

          <motion.div className="v12j-lookup-book" layoutId="v12-lookup-book" animate={{ rotateY: bookOpen ? 0 : -8, scale: embeddingMode ? 1.05 : 1 }}>
            <div className="v12j-book-spine"><span>154,880 rows</span><b>MODEL LOOKUP</b></div>
            <div className="v12j-book-pages" data-open={bookOpen ? 'true' : undefined}>
              {!bookOpen ? (
                <div className="v12j-index-sheet">
                  <small>VOCABULARY INDEX</small>
                  <motion.div className="v12j-index-lines" animate={{ y: indexScroll ? '-8cqh' : rowFound ? '-3cqh' : 0 }}>
                    {Array.from({ length: 24 }, (_, index) => {
                      const target = index === 13
                      return <div key={index} data-target={target && rowFound ? 'true' : undefined}><span>{target ? TEACHING_TOKENS[IT_TOKEN_INDEX].id : `${(index * 6049 + 913).toLocaleString()}`}</span><i /><b>{target ? 'it' : index % 6 === 0 ? 'token…' : ''}</b></div>
                    })}
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="v12j-open-page is-left">
                    <small>LOOKUP ADDRESS</small>
                    <strong>{TEACHING_TOKENS[IT_TOKEN_INDEX].id}</strong>
                    <span>token: <b>it</b></span>
                    {notDictionary ? <em>address ≠ meaning</em> : null}
                  </div>
                  <div className="v12j-open-page is-right">
                    <small>{pageFound ? 'EMBEDDING ROW FOR “it”' : 'FINDING THE ROW…'}</small>
                    {values ? <><VectorStrip numbers /><p>{notDictionary ? 'a learned numerical starting representation' : 'the first few learned values'}</p></> : <span>{pageFound ? 'row found' : 'pages moving'}</span>}
                  </div>
                </>
              )}
            </div>

            {idKey && !bookOpen ? <motion.div layoutId="v12-it-id-key" className="v12j-id-tab" initial={{ opacity: 0, y: '-8cqh' }} animate={{ opacity: 1, y: 0 }}><small>ID</small><strong>{TEACHING_TOKENS[IT_TOKEN_INDEX].id}</strong></motion.div> : null}
            {pageTab && bookOpen ? <motion.div layoutId="v12-it-id-key" className="v12j-id-tab is-open"><small>ID</small><strong>{TEACHING_TOKENS[IT_TOKEN_INDEX].id}</strong></motion.div> : null}
            {flipping ? <div className="v12j-page-flips">{Array.from({ length: 6 }, (_, index) => <motion.i key={index} initial={{ rotateY: -86, opacity: 0.75 }} animate={{ rotateY: 0, opacity: 0 }} transition={{ delay: index * 0.08, duration: 0.42 }} />)}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}

      {unfolded ? (
        <motion.div className="v12j-vector-unfold" initial={{ opacity: 0, scaleX: 0.12 }} animate={{ opacity: carry ? 0.18 : 1, scaleX: 1 }} transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1] }}>
          <div>{EMBEDDING_PREVIEW.map((value, index) => <span key={index} style={{ '--v': Math.abs(value) } as CSSProperties}>{value.toFixed(2)}</span>)}<i>··························</i></div>
          <strong>{MODEL.hiddenSize.toLocaleString()} learned values</strong>
          <small>We draw only a few; the representation continues much farther.</small>
        </motion.div>
      ) : null}

      {carry ? (
        <motion.div className="v12j-carry-embedding" initial={{ opacity: 0, y: '4cqh' }} animate={{ opacity: 1, y: 0 }}>
          <small>NOW WE HAVE SOMETHING THE NETWORK CAN TRANSFORM</small>
          <HeroVector note="same “it” · embedding carried forward" layoutId="v9-hero-vector" />
          <p>Every token gets a representation. We keep following only <b>“it”</b>.</p>
        </motion.div>
      ) : null}

      <div className="v12j-accuracy-note">Teaching split / abbreviated IDs shown here are illustrative until the exact GLM tokenizer output is pinned for recording.</div>
    </motion.section>
  )
}
