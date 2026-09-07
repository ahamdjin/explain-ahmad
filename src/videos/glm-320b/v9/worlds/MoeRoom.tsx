import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { MODEL, ROUTE_WEIGHTS, SELECTED_EXPERTS } from '../data'
import { ProcessSpine } from '../ProcessSpine'
import { ChapterHeading, HeroVector, NarrativeCue, PaperNote, VectorStrip } from '../shared'

const selected = new Set<number>(SELECTED_EXPERTS)
const SELECTED_SCORES = [0.94, 0.91, 0.88, 0.85, 0.82, 0.79, 0.76, 0.73] as const

const MOE_STEPS = [
  { label: 'Dense baseline', detail: 'First see the normal version: one feed-forward MLP is used for every token.' },
  { label: 'Many experts', detail: 'Replace one feed-forward block with many possible learned MLP blocks.' },
  { label: 'Router scores', detail: 'A learned router reads the current representation and scores every routed expert.' },
  { label: 'Top-8 + shared', detail: 'Keep only the eight highest routed experts, plus the shared expert that always participates.' },
  { label: 'Run selected', detail: 'The same current representation is sent to the active expert paths.' },
  { label: 'Weight + mix', detail: 'Weight the routed expert outputs, combine them, and add the shared output.' },
  { label: 'Repeat + payoff', detail: 'Routing repeats for tokens and sparse layers; the selective path connects back to ~18B active.' },
] as const

type MoeActionKind = 'NOW' | 'QUESTION' | 'BUT' | 'THEREFORE' | 'ANSWER'
const action: Record<number, { kind: MoeActionKind; text: string }> = {
  63: { kind: 'NOW', text: 'Carry the same contextual “it” representation across the same Transformer floor.' },
  64: { kind: 'NOW', text: 'Start with the ordinary dense version: one feed-forward MLP runs for every token.' },
  65: { kind: 'QUESTION', text: 'How do we add far more learned capacity without running all of that capacity every time?' },
  66: { kind: 'THEREFORE', text: 'Replace one possible MLP with many possible learned MLP blocks.' },
  67: { kind: 'NOW', text: 'Pull back until the scale is visible: 288 routed experts plus one shared expert.' },
  68: { kind: 'NOW', text: 'Open one block so “expert” stops being a mysterious word.' },
  69: { kind: 'BUT', text: 'Many experts exist, but the token still needs a rule for deciding which ones should run.' },
  70: { kind: 'THEREFORE', text: 'A learned router reads the current contextual representation — not the token ID.' },
  71: { kind: 'NOW', text: 'Understand one expert score before asking the router to score all 288.' },
  72: { kind: 'THEREFORE', text: 'Repeat that same scoring operation across every routed expert.' },
  73: { kind: 'QUESTION', text: 'The 288 scores are frozen. How many expert paths do you think survive?' },
  74: { kind: 'ANSWER', text: 'Only the top 8 routed experts stay active here; the other 280 remain available but inactive for this token.' },
  75: { kind: 'NOW', text: 'Add the shared expert path that always participates.' },
  76: { kind: 'BUT', text: 'Choosing experts is not enough. The chosen experts still need to actually transform the representation.' },
  77: { kind: 'THEREFORE', text: 'Send the same current input representation to every active expert path.' },
  78: { kind: 'NOW', text: 'Open one expert: it is a learned feed-forward neural-network transform.' },
  79: { kind: 'THEREFORE', text: 'Run the selected expert transforms in parallel.' },
  80: { kind: 'BUT', text: 'Their outputs need not contribute equally.' },
  81: { kind: 'THEREFORE', text: 'Weight the routed outputs, combine them, then add the shared expert output.' },
  82: { kind: 'ANSWER', text: 'No: a different token representation can produce a different routing fingerprint.' },
  83: { kind: 'ANSWER', text: 'No guarantee again: the next sparse layer sees a changed representation and routes afresh.' },
  84: { kind: 'ANSWER', text: 'This selective path is the missing bridge between huge total capacity and much smaller active compute.' },
}

function moeStage(beat: number) {
  if (beat <= 65) return 0
  if (beat <= 69) return 1
  if (beat <= 73) return 2
  if (beat <= 75) return 3
  if (beat <= 79) return 4
  if (beat <= 81) return 5
  return 6
}

function expertScore(index: number) {
  const selectedIndex = SELECTED_EXPERTS.findIndex((expert) => expert === index)
  if (selectedIndex >= 0) return SELECTED_SCORES[selectedIndex]
  return 0.08 + (((index * 47 + 13) % 57) / 100)
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
      <header><strong>The selected 8 now have to do work.</strong><span>We lift them out of the 288-expert field only so the transformation stays readable.</span></header>
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
      {route ? <div className="v9-routing-bus"><span>same input dispatched to active paths</span><i /></div> : null}
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
  const shared = beat >= 75 && beat <= 81
  const process = beat >= 76 && beat <= 81
  const mix = beat >= 81
  const compare = beat === 82
  const reroute = beat === 83
  const payoff = beat === 84

  const chapterNote = beat <= 65
    ? 'A dense feed-forward block is easy: every token uses one MLP. But how do we buy much more capacity without running all of it?'
    : beat <= 73
      ? 'Many possible expert blocks now exist. The next problem is selection: which ones should work for the current representation?'
      : 'The answer is emerging from the mechanism: score many possibilities, activate a small route, then combine the selected work.'

  return (
    <motion.div className="v9-room v9-moe-room" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ChapterHeading
        eyebrow="06 · MIXTURE OF EXPERTS · THE CAPACITY PROBLEM"
        note={chapterNote}
      >
        {beat === 63 ? <>Attention gave <mark>“it”</mark> context. But the layer is not finished.</> : <>How do we get <mark>more capacity</mark> without using all of it?</>}
      </ChapterHeading>
      <ProcessSpine steps={MOE_STEPS} active={moeStage(beat)} action={action[beat]} tone="moe" />

      <div className="v9-moe-canvas">
        {beat === 63 ? (
          <motion.div className="v9-floor-pan" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="v9-floor-room is-done"><small>ROOM 1</small><strong>Attention</strong><span>context gathered ✓</span></div>
            <motion.div className="v9-floor-vector"><HeroVector note="same contextual representation" changed /></motion.div>
            <div className="v9-floor-track"><i /></div>
            <div className="v9-floor-room is-next"><small>ROOM 2</small><strong>Feed-forward / MoE</strong><span>choose compute + transform</span></div>
          </motion.div>
        ) : null}

        {dense ? (
          <motion.div className="v9-dense-baseline" animate={{ scale: beat === 65 ? 1.15 : beat === 66 ? 0.72 : 1, x: beat === 66 ? '-23cqw' : 0, opacity: beat === 66 ? 0.42 : 1 }}>
            <HeroVector note="input" compact changed />
            <b className="v9-simple-arrow">→</b>
            <div className="v9-dense-mlp"><small>NORMAL DENSE VERSION</small><strong>ONE MLP</strong><i /><i /><i /><span>every token uses this feed-forward block</span></div>
            <b className="v9-simple-arrow">→</b>
            <VectorStrip compact changed />
            {beat === 65 ? <PaperNote className="v9-capacity-question" tone="yellow"><b>The headache:</b> more learned capacity is useful, but running all of that capacity for every token would spend much more compute.</PaperNote> : null}
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
                <small>LEARNED ROUTER</small><strong>read the current vector</strong><span>288 possibilities · choose by score · not by token ID</span>
                {scoreOne ? <motion.div className="v9-one-score" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><b>E{SELECTED_EXPERTS[0] + 1}</b><i /><strong>{SELECTED_SCORES[0].toFixed(2)}</strong><small>“how suitable is this expert now?”</small></motion.div> : null}
              </motion.div>
            ) : null}

            {beat === 72 ? <div className="v9-field-caption"><b>Same scoring operation × 288</b><span>Brightness carries the scale so we do not print 288 unreadable numbers.</span></div> : null}
            {beat === 73 ? <div className="v9-field-caption"><b>Scores frozen.</b><span>No answer highlighted yet.</span></div> : null}
            {beat === 73 ? <NarrativeCue kind="prediction" className="v11-moe-prediction"><b>288 experts exist.</b> How many of these scored routes do you think the token will actually use?</NarrativeCue> : null}
            {beat === 74 ? <motion.div className="v9-top8-callout" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}><strong>TOP 8</strong><span><b>Answer:</b> 8 work · 280 routed experts stay available but inactive for this token in this layer</span></motion.div> : null}
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

            {beat === 81 ? <NarrativeCue kind="next" className="v11-moe-followup"><b>Does every token use this same top 8?</b> Keep the expert field; change only the current representation.</NarrativeCue> : null}
          </motion.div>
        ) : null}

        {compare ? (
          <motion.div className="v9-route-compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3><b>Answer: no.</b> The router decides <em>per token</em>.</h3>
            <p>Keep the same 288-expert field. Change only the current representation, and a different routing fingerprint can emerge.</p>
            {['it', 'ball', 'dog'].map((token, row) => (
              <div key={token}><strong>{token}</strong><span>{Array.from({ length: 32 }, (_, index) => <i key={index} data-on={(index * 5 + row * 7) % 13 < 4 ? 'true' : undefined} />)}</span><small>different routing fingerprint</small></div>
            ))}
            <em>fingerprints are illustrative; the concept is per-token routing</em>
          </motion.div>
        ) : null}

        {reroute ? (
          <motion.div className="v9-reroute-story" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3>But does <b>“it”</b> keep the same eight on the next sparse layer?</h3>
            <div className="v9-reroute-line"><span><small>LAYER N</small><b>8 selected</b></span><i>→ representation changes →</i><span><small>LAYER N+1</small><b>score again</b></span></div>
            <p><b>Answer: no guarantee.</b> Attention + the previous feed-forward block changed the representation, therefore the next router makes a fresh decision.</p>
          </motion.div>
        ) : null}

        {payoff ? (
          <motion.div className="v9-moe-payoff" layoutId="v9-moe-floor" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <small>THE MECHANICAL PLOT TWIST</small>
            <div className="v9-total-capacity"><strong>{MODEL.totalParamsB}B</strong><span>TOTAL PARAMETERS</span><p>everything stored and available across the whole model</p><div className="v9-capacity-grid">{Array.from({ length: 96 }, (_, i) => <i key={i} />)}</div></div>
            <div className="v9-active-capacity"><strong>~{MODEL.activeParamsB}B</strong><span>ACTIVE / TOKEN</span><p>the approximate parameter path touched by one token through the whole model</p><div className="v9-active-path-line"><i /><i /><i /><i /><i /><i /></div></div>
            <PaperNote className="v9-18b-correction" tone="orange"><b>The other parameters did not vanish.</b> They remain stored capacity available to other routing decisions. And ~18B does <b>not</b> mean “the eight experts in one layer equal 18B”; it describes the broader active path through the model.</PaperNote>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  )
}
