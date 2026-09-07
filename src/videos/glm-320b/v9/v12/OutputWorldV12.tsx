import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { MODEL, OUTPUT_CANDIDATES, SENTENCE } from '../data'
import { HeroVector, VectorStrip } from '../shared'

export function OutputWorldV12({ beat }: { beat: number }) {
  const scoring = beat >= 95 && beat <= 97
  const shortlist = beat >= 96 && beat <= 97
  const chosen = beat >= 97
  const loop = beat >= 98 && beat <= 99
  const montage = beat >= 99
  const payoff = beat >= 100

  return (
    <motion.section className="v12j-world v12j-output-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="v12j-world-label"><small>08 · OUTPUT</small><span>turn the final representation back into text</span></div>

      {!loop && !payoff ? (
        <div className="v12j-output-layout">
          <div className="v12j-output-question">
            <small>AFTER LAYER {MODEL.layers}</small>
            <h2>{SENTENCE} <mark>____</mark></h2>
            <p>The position we followed now has to answer one concrete question: <b>what token comes next?</b></p>
            <motion.div layoutId="v9-hero-vector" className="v12j-output-vector"><HeroVector note="final representation of “it”" compact changed /></motion.div>
          </div>

          <motion.div className="v12j-output-vocab" animate={{ opacity: beat === 94 ? 0.22 : 1 }}>
            <header><small>VOCABULARY OUTPUT</small><strong>{MODEL.vocabSize.toLocaleString()} possibilities</strong><span>one score for every possible next vocabulary entry</span></header>
            <div className="v12j-output-field">{Array.from({ length: 144 }, (_, index) => <motion.i key={index} animate={{ opacity: scoring ? 0.08 + ((index * 31) % 83) / 125 : 0.08, scaleY: scoring ? 0.25 + ((index * 17) % 71) / 80 : 0.18 }} />)}</div>
            {beat === 95 ? <div className="v12j-output-causal"><small>THEREFORE</small><b>Score the whole vocabulary.</b><span>The model is not choosing a complete sentence. It is choosing the next token.</span></div> : null}

            {shortlist ? <motion.div className="v12j-output-shortlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><small>TOP CANDIDATES · ILLUSTRATIVE</small>{OUTPUT_CANDIDATES.map((candidate, index) => <motion.div key={candidate.token} data-top={index === 0 ? 'true' : undefined} layoutId={index === 0 ? 'v12-next-token' : undefined}><strong>{candidate.token}</strong><i style={{ '--p': `${candidate.p}%` } as CSSProperties} /><b>{candidate.p}%</b></motion.div>)}<em>Exact values depend on the checkpoint, chat template and sampling settings.</em></motion.div> : null}
          </motion.div>

          {beat === 94 ? <div className="v12j-output-bet"><small>PLACE YOUR BET</small><strong>What would you expect after “it”?</strong><span>The reveal matters more once you have an expectation.</span></div> : null}
          {chosen ? <motion.div className="v12j-output-choice" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><small>ONE TOKEN IS CHOSEN</small><motion.strong layoutId="v12-next-token">rolled</motion.strong><i>→</i><span>{SENTENCE} <b>rolled</b></span></motion.div> : null}
        </div>
      ) : null}

      {loop ? (
        <motion.div className="v12j-generation-loop" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="v12j-loop-sentence"><small>THE SEQUENCE IS LONGER NOW</small><p>{SENTENCE} <motion.b layoutId="v12-next-token">rolled</motion.b>{montage ? <><motion.b initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}> away</motion.b><motion.b initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>.</motion.b></> : null}</p></div>

          <div className="v12j-loop-machine">
            <div className="v12j-loop-step"><span>longer context</span><i>→</i></div>
            <motion.div className="v12j-loop-building" layoutId="v12-transformer-building" animate={montage ? { scale: [1, 1.035, 1, 1.035, 1], opacity: [0.55, 1, 0.55, 1, 0.55] } : { opacity: 0.78 }} transition={{ duration: montage ? 2 : 0.35 }}>{Array.from({ length: 24 }, (_, index) => <i key={index} />)}<strong>{MODEL.layers} layers</strong></motion.div>
            <div className="v12j-loop-step"><i>→</i><span>vocabulary scores</span><i>→</i><span>next token</span></div>
          </div>

          <div className="v12j-loop-formula"><span>context</span><i>→</i><span>model</span><i>→</i><span>scores</span><i>→</i><span>next token</span><b>↺</b></div>
          {beat === 98 ? <div className="v12j-loop-causal"><small>BUT</small><b>One token is not a response.</b><span>THEREFORE the longer sequence runs through the model again.</span></div> : null}
          {montage ? <div className="v12j-loop-causal"><small>REPEAT</small><b>rolled → away → .</b><span>That repetition is autoregressive generation.</span></div> : null}
        </motion.div>
      ) : null}

      {payoff ? (
        <motion.div className="v12j-final-payoff" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <header><small>{MODEL.maker} · {MODEL.name}</small><h1>The opening contradiction now has a mechanism.</h1></header>
          <div className="v12j-final-numbers"><div><small>TOTAL CAPACITY</small><strong>{MODEL.totalParamsB}B</strong><span>parameters stored across the model</span></div><i>BUT</i><div className="is-active"><small>ACTIVE PATH / TOKEN</small><strong>~{MODEL.activeParamsB}B</strong><span>approximate parameters participating for one token</span></div></div>
          <div className="v12j-final-chain"><span><b>{MODEL.layers}</b> layers</span><i>→</i><span><b>{MODEL.moeLayers}</b> sparse MoE layers</span><i>→</i><span><b>{MODEL.routedExperts}</b> routed experts available / sparse layer</span><i>→</i><strong>top-{MODEL.expertsPerToken} routed + {MODEL.sharedExperts} shared actually participate there</strong></div>
          <div className="v12j-final-answer"><small>THEREFORE</small><h2>Huge capacity. <mark>Selective compute.</mark></h2><p>The 320B model can store far more possible expert capacity than one token needs to activate along its path.</p></div>
          <div className="v12j-next-hill"><small>NEXT QUESTION</small><span>If routing changes by token and layer, what kinds of expert specialization emerge during training?</span></div>
        </motion.div>
      ) : null}
    </motion.section>
  )
}
