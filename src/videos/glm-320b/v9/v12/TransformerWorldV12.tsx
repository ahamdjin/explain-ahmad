import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import {
  ATTENTION_WEIGHTS,
  ATTENTION_WORDS,
  FUTURE_GHOST_WORDS,
  IT_TOKEN_INDEX,
  MODEL,
  ROUTE_WEIGHTS,
  SELECTED_EXPERTS,
} from '../data'
import { HeroVector, VectorStrip } from '../shared'

const selected = new Set<number>(SELECTED_EXPERTS)
const selectedScores = [0.94, 0.91, 0.88, 0.85, 0.82, 0.79, 0.76, 0.73] as const

function expertScore(index: number) {
  const selectedIndex = SELECTED_EXPERTS.findIndex((expert) => expert === index)
  if (selectedIndex >= 0) return selectedScores[selectedIndex]
  return 0.08 + (((index * 47 + 13) % 57) / 100)
}

function AttentionPanel({ beat }: { beat: number }) {
  const predict = beat === 48
  const qkv = beat >= 49
  const compare = beat >= 53
  const scores = beat >= 55
  const weights = beat >= 56
  const valuesOnly = beat >= 58
  const gates = beat >= 59
  const mix = beat >= 60
  const updated = beat >= 61
  const caveat = beat >= 62

  return (
    <motion.div className="v12j-attention-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="v12j-mechanism-header">
        <div><small>05 · ATTENTION</small><h2>“it” has numbers. <em>But which earlier words matter here?</em></h2></div>
        <p>Attention solves a context problem. Keep the same token position visible while the mechanism changes around it.</p>
      </header>

      <div className="v12j-attention-sentence">
        {ATTENTION_WORDS.map((word, index) => {
          const isIt = index === IT_TOKEN_INDEX
          const isBall = word === 'ball'
          const weight = ATTENTION_WEIGHTS[index]
          return (
            <motion.div
              key={`${word}-${index}`}
              className="v12j-attn-token"
              data-it={isIt ? 'true' : undefined}
              data-ball={isBall ? 'true' : undefined}
              animate={{ opacity: beat === 57 && !isIt && !isBall ? 0.24 : 1 }}
            >
              <strong>{word}</strong>
              {qkv ? (
                <div className="v12j-kv-pair">
                  {!valuesOnly ? <span className="is-k"><b>K</b><small>match</small></span> : null}
                  <span className="is-v"><b>V</b><small>info</small></span>
                </div>
              ) : null}
              {compare && !isIt ? <motion.span className="v12j-match-score" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}><small>Q·K</small><b>{weight}</b></motion.span> : null}
              {scores ? <motion.i className="v12j-score-mark" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ '--score': weight / 46 } as CSSProperties} /> : null}
              {weights ? <div className="v12j-attn-weight"><i style={{ '--weight': `${weight}%` } as CSSProperties} /><b>{weight}%</b></div> : null}
            </motion.div>
          )
        })}
        <div className="v12j-future-ghosts"><small>not generated yet</small>{FUTURE_GHOST_WORDS.map((word) => <span key={word}>{word}</span>)}</div>
      </div>

      <div className="v12j-attention-workbench">
        <div className="v12j-attn-source">
          <motion.div layoutId="v12-it-token" className="v12j-source-it"><strong>it</strong><i /></motion.div>
          <HeroVector note={updated ? 'same position · now context-enriched' : 'current 4,096-value representation'} changed={updated} layoutId="v9-hero-vector" />
          {qkv ? <motion.div className="v12j-query-card" layoutId="v12-query-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: valuesOnly ? 0.2 : 1, y: 0 }}><b>Q</b><span>search signal from “it”</span></motion.div> : null}
        </div>

        {!mix ? (
          <div className="v12j-attn-explanation">
            {beat === 47 ? <div className="v12j-local-question"><small>HEADACHE</small><b>The embedding is only a starting representation.</b><span>It still needs useful context from the prompt.</span></div> : null}
            {predict ? <div className="v12j-prediction"><small>PLACE YOUR BET</small><strong>Which earlier word should matter most for “it”?</strong><span>Do not reveal the mechanism’s answer yet.</span></div> : null}
            {beat === 49 || beat === 50 ? <div className="v12j-qkv-legend"><span><b>Q · Query</b> what this position searches with</span><span><b>K · Key</b> what each position is compared by</span><span><b>V · Value</b> the information that can come back</span><em>These labels are intuition for learned numerical vectors.</em></div> : null}
            {beat >= 51 && beat <= 54 ? <div className="v12j-causal-copy"><small>THEREFORE</small><b>Compare Q(it) with every available Key.</b><span>{beat >= 54 ? 'In this illustrative view, “ball” produces the strongest match.' : 'The comparison makes a local score for each earlier position.'}</span></div> : null}
            {beat >= 55 && beat <= 57 ? <div className="v12j-causal-copy"><small>THEREFORE</small><b>Scores become attention weights.</b><span>Higher weight means more of that position’s Value can contribute in this teaching view.</span></div> : null}
            {valuesOnly && beat <= 59 ? <div className="v12j-causal-copy"><small>BUT</small><b>Keys only answered “where should I look?”</b><span>Now the Values carry the information we actually mix.</span></div> : null}
          </div>
        ) : null}
      </div>

      {gates && !mix ? (
        <div className="v12j-value-gates">
          {ATTENTION_WORDS.map((word, index) => {
            const weight = ATTENTION_WEIGHTS[index]
            return <div key={`${word}-${index}`}><strong>{word}</strong><span>V</span><i><b style={{ height: `${Math.max(8, weight * 1.7)}%` }} /></i><small>{weight}%</small></div>
          })}
        </div>
      ) : null}

      {mix ? (
        <motion.div className="v12j-attention-mix" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="v12j-weighted-streams">
            {ATTENTION_WORDS.map((word, index) => {
              const weight = ATTENTION_WEIGHTS[index]
              return <span key={`${word}-${index}`} style={{ '--stream': weight / 46 } as CSSProperties}><b>{word}</b><i /><small>{weight}% × V</small></span>
            })}
          </div>
          <div className="v12j-sigma"><small>WEIGHTED MIX</small><strong>Σ</strong><span>add the weighted Values</span></div>
          <div className="v12j-context-return"><i /><HeroVector note="same “it” position · richer context" changed layoutId="v9-hero-vector" /><p>The result returns to <b>the same token position</b>. Nothing teleported to a new word.</p></div>
        </motion.div>
      ) : null}

      {caveat ? <div className="v12j-attention-caveat"><b>Keep the intuition, not this exact drawing.</b><span>GLM-5.3-Flash uses a hybrid attention schedule: {MODEL.linearAttentionLayers} linear-attention layers + {MODEL.sparseAttentionLayers} sparse-attention layers, with {MODEL.attentionHeads} attention heads configured.</span></div> : null}

      <div className="v12j-attention-path" aria-hidden="true"><span data-on={beat >= 49}>Q</span><i>compare</i><span data-on={beat >= 51}>K</span><i>→</i><span data-on={beat >= 56}>weights</span><i>read</i><span data-on={beat >= 58}>V</span><i>→</i><span data-on={beat >= 60}>mix</span></div>
    </motion.div>
  )
}

function ExpertField({ beat }: { beat: number }) {
  const scored = beat >= 72
  const frozen = beat >= 73
  const top8 = beat >= 74
  const quiet = beat >= 76

  return (
    <div className="v12j-expert-field" aria-label="288 routed expert blocks">
      {Array.from({ length: MODEL.routedExperts }, (_, index) => {
        const on = selected.has(index)
        const score = expertScore(index)
        return (
          <motion.i
            key={index}
            data-selected={top8 && on ? 'true' : undefined}
            data-leading={frozen && !top8 && on ? 'true' : undefined}
            style={{ '--score': score } as CSSProperties}
            animate={{ opacity: quiet ? (on ? 0.35 : 0.04) : top8 ? (on ? 1 : 0.07) : scored ? 0.18 + score * 0.72 : 0.32, scale: top8 && on ? 1.08 : 1 }}
            transition={{ duration: 0.2, delay: beat === 72 ? (index % 24) * 0.006 : 0 }}
          />
        )
      })}
    </div>
  )
}

function ActiveExperts({ beat }: { beat: number }) {
  const inputs = beat >= 77
  const outputs = beat >= 79
  const weights = beat >= 80
  const mix = beat >= 81

  return (
    <div className="v12j-active-expert-zone">
      <header><strong>Only the active paths come forward.</strong><span>The full 288-expert field stays behind as available capacity.</span></header>
      <div className="v12j-active-expert-grid">
        {SELECTED_EXPERTS.map((expert, index) => (
          <div key={expert} className="v12j-active-expert">
            <small>E{expert + 1}</small>
            {inputs ? <VectorStrip compact /> : <i className="v12j-empty-vector" />}
            <b className="v12j-expert-arrow">→</b>
            {outputs ? <VectorStrip compact changed /> : <i className="v12j-empty-vector" />}
            {weights ? <em>{ROUTE_WEIGHTS[index]}%</em> : null}
          </div>
        ))}
        <div className="v12j-active-expert is-shared"><small>SHARED</small><VectorStrip compact /><b className="v12j-expert-arrow">→</b><VectorStrip compact changed /><em>always on</em></div>
      </div>
      {mix ? <motion.div className="v12j-moe-merge" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><span>8 weighted routed outputs</span><b>+</b><span>shared output</span><strong>Σ</strong><i>→</i><HeroVector note="one combined representation" changed compact layoutId="v9-hero-vector" /><small>routing weights shown are illustrative</small></motion.div> : null}
    </div>
  )
}

function MoePanel({ beat }: { beat: number }) {
  const dense = beat >= 64 && beat <= 65
  const field = beat >= 66 && beat <= 81
  const router = beat >= 69 && beat <= 81
  const oneScore = beat === 71
  const top8 = beat >= 74
  const shared = beat >= 75
  const active = beat >= 76 && beat <= 81
  const compare = beat === 82
  const reroute = beat === 83
  const payoff = beat >= 84

  return (
    <motion.div className="v12j-moe-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="v12j-mechanism-header">
        <div><small>06 · MIXTURE OF EXPERTS</small><h2>More capacity is useful. <em>But running all of it would waste compute.</em></h2></div>
        <p>The answer is selective feed-forward compute: many expert blocks exist, while a router activates only a small routed subset for this token in each sparse layer.</p>
      </header>

      {beat === 63 ? <div className="v12j-floor-crossing"><span><small>ATTENTION</small><b>context gathered ✓</b></span><motion.div layoutId="v9-hero-vector"><HeroVector note="same contextual “it”" compact changed /></motion.div><i>move across the same floor →</i><span className="is-next"><small>FEED-FORWARD / MOE</small><b>choose compute + transform</b></span></div> : null}

      {dense ? (
        <div className="v12j-dense-baseline">
          <HeroVector note="current representation" compact changed layoutId="v9-hero-vector" />
          <i>→</i>
          <div className="v12j-mlp-machine"><small>DENSE BASELINE</small><strong>ONE MLP</strong><span>every token uses this feed-forward block</span><b /><b /><b /></div>
          <i>→</i>
          <VectorStrip compact changed />
          {beat === 65 ? <div className="v12j-capacity-headache"><small>BUT</small><strong>How do we add much more learned capacity without making every token run all of it?</strong></div> : null}
        </div>
      ) : null}

      {field ? (
        <div className="v12j-moe-field-zone">
          <div className="v12j-field-heading"><div><small>ONE SPARSE MOE LAYER</small><strong>{MODEL.routedExperts} routed experts</strong><span>possible learned feed-forward transforms</span></div><div className="v12j-shared-pill" data-on={shared ? 'true' : undefined}><b>★</b><span><strong>1 shared expert</strong><small>always participates</small></span></div></div>
          <ExpertField beat={beat} />

          {beat === 68 ? <div className="v12j-expert-definition"><small>EXPERT ≠ HUMAN-LABELLED TOPIC ROOM</small><b>An expert is a learned feed-forward neural-network block.</b><span>Specialization can emerge during training, but we do not label these “math”, “code”, or “writing” without evidence.</span></div> : null}

          {router ? <div className="v12j-router-lane"><HeroVector note="current contextual representation" compact changed layoutId="v9-hero-vector" /><i>→</i><div className="v12j-router"><small>LEARNED ROUTER</small><strong>read this vector</strong><span>not the token ID</span>{oneScore ? <em>E{SELECTED_EXPERTS[0] + 1} → {selectedScores[0].toFixed(2)}</em> : null}</div><i>score experts →</i></div> : null}

          {beat === 72 ? <div className="v12j-field-callout"><small>SAME OPERATION × 288</small><b>The router scores the routed expert field.</b><span>Brightness carries the scale; printing 288 numbers would teach nothing.</span></div> : null}
          {beat === 73 ? <div className="v12j-field-callout is-question"><small>PLACE YOUR BET</small><b>All 288 exist. How many routed experts actually work for this token here?</b></div> : null}
          {beat === 74 ? <div className="v12j-top8-reveal"><strong>TOP 8</strong><span>8 routed experts work · 280 remain available but inactive for this token in this layer</span></div> : null}
          {beat === 75 ? <div className="v12j-shared-reveal"><strong>+ 1 shared expert</strong><span>a separate always-on path also participates</span></div> : null}

          {active ? <ActiveExperts beat={beat} /> : null}
        </div>
      ) : null}

      {compare ? <div className="v12j-routing-compare"><h3>Same model. Different current representation. <em>Different route.</em></h3><p>Routing is decided per token from the current representation.</p>{['it', 'ball', 'dog'].map((token, row) => <div key={token}><strong>{token}</strong><span>{Array.from({ length: 36 }, (_, index) => <i key={index} data-on={(index * 5 + row * 7) % 13 < 4 ? 'true' : undefined} />)}</span><small>illustrative fingerprint</small></div>)}</div> : null}

      {reroute ? <div className="v12j-reroute"><h3>The next sparse layer asks again.</h3><div><span><small>LAYER N</small><b>top-8 route</b></span><i>→ representation changes →</i><span><small>LAYER N+1</small><b>fresh router decision</b></span></div><p>The token can take a different routed path later because Attention and earlier feed-forward transforms changed its representation.</p></div> : null}

      {payoff ? <div className="v12j-moe-payoff"><div className="v12j-payoff-capacity"><span><small>TOTAL MODEL CAPACITY</small><strong>{MODEL.totalParamsB}B</strong></span><i>contains many possible routes</i><span className="is-active"><small>ACTIVE PATH / TOKEN</small><strong>~{MODEL.activeParamsB}B</strong></span></div><div className="v12j-payoff-route"><b>{MODEL.moeLayers} sparse MoE layers</b><i>→</i><b>{MODEL.routedExperts} available / layer</b><i>→</i><strong>top-{MODEL.expertsPerToken} routed + {MODEL.sharedExperts} shared</strong></div><p><b>Important:</b> ~18B is the approximate whole active path through the model. It is <em>not</em> “8 ÷ 288 of 320B”.</p></div> : null}
    </motion.div>
  )
}

export function TransformerWorldV12({ beat }: { beat: number }) {
  const intro = beat <= 46
  const attention = beat >= 47 && beat <= 62
  const moe = beat >= 63

  return (
    <motion.section className="v12j-world v12j-transformer-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="v12j-world-label"><small>05–06 · ONE TRANSFORMER FLOOR</small><span>same representation · two connected jobs</span></div>

      {intro ? <motion.div className="v12j-transformer-floor" layoutId="v12-transformer-floor" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}><header><small>ONE TRANSFORMER LAYER</small><h2>The embedding does not jump through disconnected diagrams.</h2><p>The same “it” representation moves through two parts of the same floor.</p></header><div className="v12j-floor-map"><div className="is-attention"><small>ROOM 1</small><strong>Attention</strong><span>gather useful context</span></div><motion.div layoutId="v9-hero-vector"><HeroVector note="embedding arrives" compact /></motion.div><i>→</i><div><small>ROOM 2</small><strong>Feed-forward / MoE</strong><span>choose compute + transform</span></div></div>{beat === 46 ? <div className="v12j-floor-next"><small>FIRST HEADACHE</small><b>“it” has a vector, but which earlier words should influence it?</b></div> : null}</motion.div> : null}
      {attention ? <AttentionPanel beat={beat} /> : null}
      {moe ? <MoePanel beat={beat} /> : null}

      {!intro ? <div className="v12j-floor-location"><span data-active={attention ? 'true' : undefined}>ATTENTION</span><i>same floor</i><span data-active={moe ? 'true' : undefined}>FEED-FORWARD / MOE</span></div> : null}
    </motion.section>
  )
}
