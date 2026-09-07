import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { MODEL, OUTPUT_CANDIDATES, SENTENCE } from '../data'
import { ChapterHeading, NarrativeCue, PaperNote, VectorStrip } from '../shared'

export function OutputWorld({ beat }: { beat: number }) {
  const vocab = beat >= 94 && beat <= 97
  const score = beat >= 95
  const shortlist = beat >= 96
  const selected = beat >= 97
  const loop = beat >= 98 && beat <= 99
  const montage = beat >= 99
  const payoff = beat >= 100

  return (
    <motion.section className="v9-world v9-output-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {!payoff ? (
        <ChapterHeading eyebrow="08 · OUTPUT · FROM VECTOR BACK TO TEXT" note="The model has finished refining the final prompt position. But the result is still a vector, not a word.">
          How does the final representation become <mark>the next token</mark>?
        </ChapterHeading>
      ) : null}

      {vocab ? (
        <div className="v9-output-canvas">
          <motion.div className="v9-output-building-mini" layoutId="v9-transformer-building" initial={{ opacity: 0.2, scale: 1.2 }} animate={{ opacity: beat === 94 ? 0.38 : 0.16, scale: 1 }}>
            {Array.from({ length: 18 }, (_, i) => <i key={i} />)}
            <span>45 layers</span>
          </motion.div>

          <div className="v9-final-position">
            <small>FINAL PROMPT POSITION</small>
            <div>{SENTENCE.split(' ').map((word, index, all) => <span key={`${word}-${index}`} data-last={index === all.length - 1 ? 'true' : undefined}>{word}</span>)}{beat === 94 ? <span className="v11-blank">?</span> : null}</div>
            <motion.div layoutId="v9-hero-vector" className="v9-final-vector"><strong>it</strong><VectorStrip compact changed /><span>final representation after layer 45</span></motion.div>
          </div>

          <div className="v9-output-arrow"><span>{beat >= 95 ? 'therefore · score possible next tokens' : 'still not a word'}</span><i /></div>

          <motion.div className="v9-output-vocab" initial={{ opacity: 0, x: '10cqw' }} animate={{ opacity: 1, x: 0 }}>
            <header><small>VOCABULARY OUTPUT</small><strong>{MODEL.vocabSize.toLocaleString()} possibilities</strong><span>the final representation can be turned into a score for every vocabulary entry</span></header>
            <div className="v9-output-vocab-field">{Array.from({ length: 120 }, (_, index) => <motion.i key={index} animate={{ opacity: score ? 0.08 + ((index * 31) % 83) / 120 : 0.08, scaleY: score ? 0.3 + ((index * 17) % 71) / 80 : 0.2 }} />)}</div>
            {shortlist ? (
              <motion.div className="v9-candidate-list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <small>ANSWER · TOP CANDIDATES · ILLUSTRATIVE</small>
                {OUTPUT_CANDIDATES.map((candidate, index) => (
                  <motion.div key={candidate.token} data-top={index === 0 ? 'true' : undefined} layoutId={index === 0 ? 'v9-next-token' : undefined}>
                    <strong>{candidate.token}</strong><i style={{ '--p': `${candidate.p}%` } as CSSProperties} /><b>{candidate.p}%</b>
                  </motion.div>
                ))}
                <em>Exact probabilities depend on the checkpoint, chat template and sampling settings.</em>
              </motion.div>
            ) : null}
          </motion.div>

          {beat === 94 ? <NarrativeCue kind="prediction" className="v11-output-prediction">Before the scores appear: <b>what token would you predict comes after “it”?</b></NarrativeCue> : null}
          {beat === 95 ? <PaperNote className="v9-output-note" tone="yellow"><b>Therefore:</b> score the vocabulary for the next token. The model is not searching a dictionary for an entire sentence.</PaperNote> : null}
          {selected ? <motion.div className="v9-selected-token-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span>choose one</span><i /><motion.strong layoutId="v9-next-token">rolled</motion.strong></motion.div> : null}
        </div>
      ) : null}

      {loop ? (
        <motion.div className="v9-generation-loop" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="v9-growing-sentence">
            <small>SEQUENCE NOW</small>
            <p>{SENTENCE} <motion.b layoutId="v9-next-token">rolled</motion.b>{montage ? <><motion.b initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}> away</motion.b><motion.b initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>.</motion.b></> : null}</p>
          </div>
          <div className="v9-loop-arrow"><span>but the response is not finished</span><i /><b>THEREFORE · RUN THE STACK AGAIN</b></div>
          <motion.div className="v9-loop-building" layoutId="v9-transformer-building" animate={montage ? { scale: [1, 1.025, 1, 1.025, 1], opacity: [0.6, 1, 0.6, 1, 0.6] } : { opacity: 0.72 }} transition={{ duration: montage ? 2 : 0.4 }}>
            {Array.from({ length: 24 }, (_, i) => <i key={i} />)}<strong>45 layers</strong>
          </motion.div>
          <div className="v9-loop-formula"><span>context</span><i>→</i><span>model</span><i>→</i><span>vocabulary</span><i>→</i><span>next token</span><b>↺</b></div>
          {beat === 98 ? <NarrativeCue kind="but" className="v11-output-answer">One selected token is an answer to <b>one prediction</b>, but not a complete continuation. Therefore the longer sequence goes through the model again.</NarrativeCue> : null}
          {montage ? <PaperNote className="v9-montage-note" tone="orange"><b>Answer:</b> autoregressive generation is repeated next-token prediction. Each new token becomes part of the context for the next pass.</PaperNote> : null}
        </motion.div>
      ) : null}

      {payoff ? (
        <motion.div className="v9-final-paper" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
          <header><small>{MODEL.maker}</small><h1>{MODEL.name}</h1><span>Mixture of Experts</span></header>
          <div className="v9-final-numbers">
            <div><small>TOTAL CAPACITY</small><strong>{MODEL.totalParamsB}B</strong><span>parameters stored across the whole model</span></div>
            <i>≠</i>
            <div className="is-active"><small>ACTIVE PATH / TOKEN</small><strong>~{MODEL.activeParamsB}B</strong><span>the approximate parameters used for one token path</span></div>
          </div>
          <div className="v9-final-mechanism">
            <span><b>{MODEL.layers}</b> layers</span><i>→</i>
            <span><b>{MODEL.moeLayers}</b> sparse MoE layers</span><i>→</i>
            <span><b>{MODEL.routedExperts}</b> routed experts</span><i>→</i>
            <span className="is-highlight"><b>top-{MODEL.expertsPerToken}</b> chosen / token / sparse layer</span><b>+</b>
            <span><b>{MODEL.sharedExperts}</b> shared expert</span>
          </div>
          <motion.div className="v9-final-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.25, duration: 0.7 }} />
          <h2>Huge capacity. <mark>Selective compute.</mark></h2>
          <p><b>Answer to the opening headache:</b> all 320B parameters can exist as stored capacity, but a token can travel through a much smaller selected active path. Parameters outside that path do not disappear; they remain available to other routing decisions.</p>
          <NarrativeCue kind="next" className="v11-final-next">If different tokens can take different routes, <b>what patterns of expert specialization emerge during training?</b> That is the next hill.</NarrativeCue>
        </motion.div>
      ) : null}
    </motion.section>
  )
}
