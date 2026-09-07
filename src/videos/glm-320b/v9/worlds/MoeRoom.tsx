import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { MODEL, ROUTE_WEIGHTS, SELECTED_EXPERTS } from '../data'
import { ChapterHeading, HeroVector, PaperNote, VectorStrip } from '../shared'

const selected = new Set<number>(SELECTED_EXPERTS)

const operation: Record<number, string> = {
  63: 'PAN · the same representation moves to the next room',
  64: 'BASELINE · first understand a normal dense feed-forward block',
  65: 'THE QUESTION · can we add capacity without using all of it?',
  66: 'UNFOLD · one MLP becomes many possible MLPs',
  67: 'SCALE · 288 routed experts + one shared expert',
  68: 'DEFINE · what an “expert” actually is',
  69: 'CONTINUITY · the contextual “it” vector arrives unchanged',
  70: 'ROUTE · a learned router reads the current vector',
  71: 'SCORE ONE · understand one routing score first',
  72: 'SCORE ALL · repeat the same operation across 288 experts',
  73: 'RANK · some experts score higher than others',
  74: 'SELECT · keep the top eight routed experts',
  75: 'ALWAYS ON · add the shared expert path',
  76: 'DISPATCH · send the representation only to active paths',
  77: 'SAME INPUT · each selected expert receives the current vector',
  78: 'OPEN ONE · each expert is its own learned MLP transform',
  79: 'PARALLEL · the active experts transform at the same time',
  80: 'WEIGHT · routed outputs do not contribute equally',
  81: 'COMBINE · weighted routed mixture + shared path → one vector',
  82: 'PER TOKEN · another token can take another route',
  83: 'PER LAYER · the next sparse layer asks the router again',
  84: 'PAYOFF · total capacity is not the same as active compute',
}

function expertScore(index: number) {
  if (selected.has(index)) return 0.82 + (SELECTED_EXPERTS.indexOf(index as never) % 7) * 0.02
  return (((index * 47 + 13) % 71) + 8) / 100
}

function ExpertWall({ beat }: { beat: number }) {
  const scores = beat >= 72
  const top8 = beat >= 74
  const quiet = beat >= 76
  return (
    <div className="v9-expert-wall" aria-label="288 routed expert blocks">
      {Array.from({ length: MODEL.routedExperts }, (_, index) => {
        const on = selected.has(index)
        const score = expertScore(index)
        return (
          <motion.i
            key={index}
            data-selected={top8 && on ? 'true' : undefined}
            data-leading={beat === 73 && on ? 'true' : undefined}
            style={{ '--score': score } as CSSProperties}
            animate={{
              opacity: quiet ? (on ? 0.3 : 0.045) : top8 ? (on ? 1 : 0.07) : scores ? 0.18 + score * 0.72 : 0.34,
              scale: top8 && on ? 1.08 : 1,
            }}
            transition={{ duration: 0.22, delay: scores && beat === 72 ? (index % 24) * 0.006 : 0 }}
          />
        )
      })}
    </div>
  )
}

function ActiveExpertRow({ beat }: { beat: number }) {
  const route = beat >= 76
  const duplicate = beat >= 77
  const openOne = beat === 78
  const parallel = beat >= 79
  const weighted = beat >= 80

  return (
    <motion.div className="v9-active-experts" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <header><strong>8 routed experts selected</strong><span>lifted out of the 288-expert field so we can see what happens next</span></header>
      <div className="v9-active-expert-grid">
        {SELECTED_EXPERTS.map((expert, index) => (
          <motion.div className="v9-active-expert" key={expert} data-focus={openOne && index === 0 ? 'true' : undefined} animate={{ opacity: openOne && index !== 0 ? 0.12 : 1, scale: openOne && index === 0 ? 1.12 : 1 }}>
            <small>E{expert + 1}</small>
            {duplicate ? <VectorStrip compact /> : <i className="v9-expert-empty" />}
            {parallel ? <motion.span className="v9-expert-transform" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} /> : null}
            {parallel ? <VectorStrip compact changed /> : null}
            {weighted ? <b className="v9-expert-weight">{ROUTE_WEIGHTS[index]}%</b> : null}
          </motion.div>
        ))}
      </div>
      {route ? <div className="v9-routing-bus"><span>router dispatch</span><i /></div> : null}
      {openOne ? (
        <motion.div className="v9-open-expert" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <small>INSIDE E{SELECTED_EXPERTS[0] + 1}</small>
          <div><VectorStrip compact /><b>→</b><span><i /><i /><i /><em>learned MLP weights</em></span><b>→</b><VectorStrip compact changed /></div>
          <p>An expert is a learned feed-forward neural-network block. It is <b>not</b> literally labelled “math”, “code”, or “writing”.</p>
        </motion.div>
      ) : null}
    </motion.div>
  )
}

export function MoeRoom({ beat }: { beat: number }) {
  const dense = beat >= 64 && beat <= 66
  const field = beat >= 66 && beat <= 81
  const defineExpert = beat === 68
  const vector = beat >= 69 && beat <= 81
  const router = beat >= 70 && beat <= 81
  const scoreOne = beat === 71
  const top8 = beat >= 74 && beat <= 81
  const shared = beat >= 75 && beat <= 81
  const process = beat >= 76 && beat <= 81
  const mix = beat >= 81
  const compare = beat === 82
  const reroute = beat === 83
  const payoff = beat === 84

  return (
    <motion.div className="v9-room v9-moe-room" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ChapterHeading
        eyebrow="06 · MIXTURE OF EXPERTS · SELECTIVE COMPUTE"
        note="This is the centerpiece: understand the router, the top-8 selection, the shared expert, and the merge before we connect it back to 320B → 18B."
      >
        {beat === 63 ? <>Now cross the same Transformer floor.</> : <>Which feed-forward blocks should work <mark>for this token</mark>?</>}
      </ChapterHeading>
      <motion.div className="v9-operation-cue" key={operation[beat]} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}><b>{operation[beat]}</b></motion.div>

      <div className="v9-moe-canvas">
        {beat === 63 ? (
          <motion.div className="v9-floor-pan" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="v9-floor-room is-done"><small>ROOM 1</small><strong>Attention</strong><span>context gathered ✓</span></div>
            <motion.div className="v9-floor-vector"><HeroVector note="same contextual representation" changed /></motion.div>
            <div className="v9-floor-track"><i /></div>
            <div className="v9-floor-room is-next"><small>ROOM 2</small><strong>Feed-forward / MoE</strong><span>transform the representation</span></div>
          </motion.div>
        ) : null}

        {dense ? (
          <motion.div className="v9-dense-baseline" animate={{ scale: beat === 65 ? 1.15 : beat === 66 ? 0.72 : 1, x: beat === 66 ? '-23cqw' : 0, opacity: beat === 66 ? 0.42 : 1 }}>
            <HeroVector note="input" compact changed />
            <b className="v9-simple-arrow">→</b>
            <div className="v9-dense-mlp"><small>DENSE BASELINE</small><strong>ONE MLP</strong><i /><i /><i /><span>every token uses this feed-forward block</span></div>
            <b className="v9-simple-arrow">→</b>
            <VectorStrip compact changed />
            {beat === 65 ? <PaperNote className="v9-capacity-question" tone="yellow">What if we want <b>much more learned capacity</b> without running all of it for every token?</PaperNote> : null}
          </motion.div>
        ) : null}

        {field ? (
          <motion.div className="v9-moe-field" initial={{ opacity: 0, x: '10cqw' }} animate={{ opacity: 1, x: 0 }}>
            <header>
              <div><small>SPARSE MOE FEED-FORWARD BLOCK</small><strong>{MODEL.routedExperts} routed experts</strong><span>many possible learned MLP transforms live here</span></div>
              <motion.div className="v9-shared-expert" animate={{ opacity: shared ? 1 : 0.28 }} data-on={shared ? 'true' : undefined}><b>★</b><div><strong>1 shared expert</strong><span>always participates</span></div></motion.div>
            </header>
            <ExpertWall beat={beat} />
            {defineExpert ? <PaperNote className="v9-expert-definition" tone="orange" title="Expert = learned MLP block">Specialization can emerge during training, but these are not hand-labelled topic rooms.</PaperNote> : null}

            {vector ? <motion.div className="v9-router-input" layoutId="v9-router-input"><HeroVector note="current contextual representation" compact changed /></motion.div> : null}
            {router ? (
              <motion.div className="v9-router-box" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <small>LEARNED ROUTER</small><strong>read the current vector</strong><span>not the token ID</span>
                {scoreOne ? <motion.div className="v9-one-score" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><b>E{SELECTED_EXPERTS[0] + 1}</b><i /><strong>0.94</strong><small>“how suitable is this expert now?”</small></motion.div> : null}
              </motion.div>
            ) : null}

            {beat === 72 ? <div className="v9-field-caption"><b>Same scoring operation × 288</b><span>We use brightness for scale instead of printing 288 tiny numbers.</span></div> : null}
            {beat === 73 ? <div className="v9-field-caption"><b>Scores frozen.</b><span>The circled candidates are leading.</span></div> : null}
            {beat === 74 ? <motion.div className="v9-top8-callout" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}><strong>TOP 8</strong><span>8 work · 280 routed experts stay available but inactive for this token in this layer</span></motion.div> : null}
            {beat === 75 ? <motion.div className="v9-shared-callout" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><strong>+ 1 shared expert</strong><span>this path is always on</span></motion.div> : null}

            {process ? <ActiveExpertRow beat={beat} /> : null}

            {mix ? (
              <motion.div className="v9-moe-mix" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="v9-routed-mixture"><small>8 WEIGHTED ROUTED OUTPUTS</small><div>{ROUTE_WEIGHTS.map((weight, index) => <span key={index}><b>E{SELECTED_EXPERTS[index] + 1}</b><i style={{ '--w': `${weight}%` } as CSSProperties} /><em>{weight}%</em></span>)}</div></div>
                <strong className="v9-moe-sigma">Σ</strong>
                <div className="v9-shared-plus"><b>+</b><span>shared expert output</span></div>
                <b className="v9-simple-arrow">→</b>
                <HeroVector note="one combined representation" compact changed />
                <small className="v9-illustrative">routing weights shown here are illustrative</small>
              </motion.div>
            ) : null}
          </motion.div>
        ) : null}

        {compare ? (
          <motion.div className="v9-route-compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3>The router decides <em>per token</em>.</h3>
            <p>Keep the same 288-expert field. Change only the current representation.</p>
            {['it', 'ball', 'dog'].map((token, row) => (
              <div key={token}><strong>{token}</strong><span>{Array.from({ length: 32 }, (_, index) => <i key={index} data-on={(index * 5 + row * 7) % 13 < 4 ? 'true' : undefined} />)}</span><small>different routing fingerprint</small></div>
            ))}
            <em>fingerprints are illustrative; the concept is per-token routing</em>
          </motion.div>
        ) : null}

        {reroute ? (
          <motion.div className="v9-reroute-story" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3>The next sparse layer asks again.</h3>
            <div className="v9-reroute-line"><span><small>LAYER N</small><b>8 selected</b></span><i>→ representation changes →</i><span><small>LAYER N+1</small><b>possibly a different 8</b></span></div>
            <p>The router's input is different because Attention + the previous feed-forward block already changed the representation.</p>
          </motion.div>
        ) : null}

        {payoff ? (
          <motion.div className="v9-moe-payoff" layoutId="v9-moe-floor" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <small>NOW CONNECT THE MECHANISM TO THE TITLE</small>
            <div className="v9-total-capacity"><strong>{MODEL.totalParamsB}B</strong><span>TOTAL PARAMETERS</span><p>everything stored and available across the whole model</p><div className="v9-capacity-grid">{Array.from({ length: 96 }, (_, i) => <i key={i} />)}</div></div>
            <div className="v9-active-capacity"><strong>~{MODEL.activeParamsB}B</strong><span>ACTIVE / TOKEN</span><p>the approximate parameter path touched by one token through the whole model</p><div className="v9-active-path-line"><i /><i /><i /><i /><i /><i /></div></div>
            <PaperNote className="v9-18b-correction" tone="orange"><b>18B does not mean “the 8 experts in one layer equal 18B”.</b> It describes the broader active path through the model.</PaperNote>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  )
}
