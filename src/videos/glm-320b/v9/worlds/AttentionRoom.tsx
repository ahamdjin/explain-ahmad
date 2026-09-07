import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { ATTENTION_WEIGHTS, ATTENTION_WORDS, FUTURE_GHOST_WORDS, IT_TOKEN_INDEX, MODEL } from '../data'
import { ProcessSpine } from '../ProcessSpine'
import { ChapterHeading, HeroVector, PaperNote } from '../shared'

const ATTENTION_STEPS = [
  { label: 'Make Q / K / V', detail: 'Create three learned views of the current representation.' },
  { label: 'Match Q with K', detail: 'Use Query and Keys to measure which earlier positions match.' },
  { label: 'Make weights', detail: 'Turn the match scores into attention weights.' },
  { label: 'Read Values', detail: 'Use those weights to decide how much information to take from each Value.' },
  { label: 'Mix context back', detail: 'Add the weighted Values and return the context to the same token position.' },
] as const

const action: Record<number, string> = {
  47: 'Start with the problem: the embedding still needs context.',
  48: 'Keep the same “it” representation physically attached to the same token.',
  49: 'Create three learned numerical views from that one representation.',
  50: 'Query looks, Key matches, Value carries information.',
  51: 'Give every available prompt position a Key and a Value.',
  52: 'Keep Q visibly anchored to “it”.',
  53: 'Compare Q(it) with each Key, one at a time.',
  54: 'In this teaching example, “ball” produces the strongest match.',
  55: 'Collect the local match results into one clean score row.',
  56: 'Turn those match scores into normalized attention weights.',
  57: 'More weight means more of that position can contribute in this view.',
  58: 'Keys have finished matching. Now read the Values.',
  59: 'Scale each Value by its attention weight.',
  60: 'Add the weighted Values together.',
  61: 'Return the mixed context to the same “it” position.',
  62: 'Zoom out: keep the idea, not this exact drawing of GLM attention.',
}

function attentionStage(beat: number) {
  if (beat <= 50) return 0
  if (beat <= 55) return 1
  if (beat <= 57) return 2
  if (beat <= 59) return 3
  return 4
}

function TokenContextGrid({ beat }: { beat: number }) {
  const showKV = beat >= 51 && beat <= 59
  const query = beat >= 52 && beat <= 57
  const comparing = beat >= 53 && beat <= 54
  const scores = beat >= 55 && beat <= 57
  const weights = beat >= 56 && beat <= 60
  const valuesOnly = beat >= 58

  return (
    <div className="v9-attention-token-grid">
      {ATTENTION_WORDS.map((word, index) => {
        const isIt = index === IT_TOKEN_INDEX
        const isBall = word === 'ball'
        const weight = ATTENTION_WEIGHTS[index]
        return (
          <motion.div
            className="v9-attention-token"
            key={`${word}-${index}`}
            data-it={isIt ? 'true' : undefined}
            data-hero={beat === 57 && isBall ? 'true' : undefined}
            animate={{ opacity: beat === 57 && !isBall && !isIt ? 0.22 : 1 }}
          >
            <strong>{word}</strong>
            {showKV ? (
              <div className="v9-kv-stack">
                {!valuesOnly ? <motion.span className="is-k" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>K</motion.span> : null}
                <motion.span className="is-v" initial={{ opacity: 0, y: 4 }} animate={{ opacity: valuesOnly ? 1 : 0.66, y: 0, scale: valuesOnly ? 1.08 : 1 }}>V</motion.span>
              </div>
            ) : null}
            {query && isIt ? <motion.div layoutId="v9-query-it" className="v9-query-anchor" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}><b>Q</b><span>from it</span><i /></motion.div> : null}
            {comparing && !isIt ? <motion.div className="v9-local-match" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: isBall && beat === 54 ? 1.15 : 1 }} transition={{ delay: index * 0.08 }}><span>Q·K</span><b>{weight}</b></motion.div> : null}
            {scores ? <motion.span className="v9-score-row-value" initial={{ y: -9, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{weight}</motion.span> : null}
            {weights ? (
              <motion.div className="v9-weight-under-token" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}>
                <i style={{ '--weight': `${weight}%` } as CSSProperties} />
                <b>{weight}%</b>
              </motion.div>
            ) : null}
          </motion.div>
        )
      })}
      {showKV ? (
        <div className="v9-causal-bracket">
          <span>the prompt available at this moment ends at “it”</span><i /><b>future tokens do not exist yet</b>
        </div>
      ) : null}
      {showKV ? <div className="v9-future-ghosts"><small>NOT GENERATED YET</small>{FUTURE_GHOST_WORDS.map((word) => <span key={word}>{word}</span>)}</div> : null}
    </div>
  )
}

export function AttentionRoom({ beat }: { beat: number }) {
  const problem = beat >= 47
  const anchored = beat >= 48
  const qkv = beat >= 49 && beat <= 50
  const tokenGrid = beat >= 51 && beat <= 59
  const values = beat >= 58 && beat <= 60
  const mix = beat >= 60
  const update = beat >= 61
  const caveat = beat >= 62

  return (
    <motion.div className="v9-room v9-attention-room" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ChapterHeading
        eyebrow="05 · ATTENTION · BUILD CONTEXT"
        note={caveat ? 'We used a familiar Q/K/V picture to teach the operation. GLM-5.3-Flash uses a hybrid attention architecture internally.' : 'Stay with one token: “it”. The diagram will keep every intermediate step visible.'}
      >
        {problem ? <>What should <mark>“it”</mark> use from the prompt?</> : <>Attention</>}
      </ChapterHeading>

      <ProcessSpine steps={ATTENTION_STEPS} active={attentionStage(beat)} action={action[beat]} tone="attention" />

      <div className="v9-attention-canvas">
        {beat === 47 ? (
          <motion.div className="v9-attention-question" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p>The embedding gives the model numbers for <b>it</b>.</p>
            <strong>But which earlier words are useful <em>here</em>?</strong>
            <div className="v9-question-sentence"><span>The dog dropped the </span><mark>ball</mark><span>, and </span><b>it</b><em> → rolled away .</em></div>
            <small>The gray continuation is not in the prompt yet. It is what we will eventually generate.</small>
          </motion.div>
        ) : null}

        {anchored && beat <= 50 ? (
          <div className="v9-attention-source">
            <div className="v9-source-word"><strong>it</strong><i /></div>
            <HeroVector note="4,096-value representation" />
          </div>
        ) : null}

        {qkv ? (
          <motion.div className="v9-qkv-branch" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <i className="v9-qkv-trunk" />
            {[
              { l: 'Q', name: 'Query', text: 'what this position uses to look for a match', tone: 'q' },
              { l: 'K', name: 'Key', text: 'what each position offers for matching', tone: 'k' },
              { l: 'V', name: 'Value', text: 'information that can be carried back', tone: 'v' },
            ].map((item, index) => (
              <motion.div key={item.l} data-tone={item.tone} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: beat === 50 ? index * 0.28 : index * 0.08 }}>
                <b>{item.l}</b><strong>{item.name}</strong><span>{item.text}</span><small>learned projection</small>
              </motion.div>
            ))}
            {beat === 50 ? <PaperNote className="v9-qkv-note">The English phrases are intuition. Q, K and V are learned numerical vectors.</PaperNote> : null}
          </motion.div>
        ) : null}

        {tokenGrid ? <TokenContextGrid beat={beat} /> : null}

        {values ? (
          <motion.div className="v9-value-lesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="v9-value-rule"><b>MATCHING IS DONE</b><span>Keys can step back. Values are the information we read.</span></div>
            {beat >= 59 ? (
              <div className="v9-value-gates">
                {ATTENTION_WORDS.map((word, index) => {
                  const weight = ATTENTION_WEIGHTS[index]
                  return <div key={`${word}-${index}`}><strong>{word}</strong><span>V</span><i><b style={{ height: `${Math.max(6, weight * 1.65)}%` }} /></i><small>{weight}% open</small></div>
                })}
              </div>
            ) : null}
          </motion.div>
        ) : null}

        {mix ? (
          <motion.div className="v9-attention-mixer" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="v9-value-stream-list">
              {ATTENTION_WORDS.map((word, index) => {
                const weight = ATTENTION_WEIGHTS[index]
                return <motion.div key={`${word}-${index}`} style={{ '--w': weight / 46 } as CSSProperties} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: index * 0.05 }}><b>{word}</b><i /><span>{weight}% × V</span></motion.div>
              })}
            </div>
            <div className="v9-sigma"><small>WEIGHTED MIX</small><strong>Σ</strong><span>add the weighted Values</span></div>
            {update ? <div className="v9-context-return"><i /><HeroVector note="same token position · richer context" changed /><p>Useful context is mixed back into the representation of <b>it</b>.</p></div> : null}
          </motion.div>
        ) : null}

        {caveat ? (
          <motion.div className="v9-attention-caveat" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="v9-head-fan">{Array.from({ length: 16 }, (_, i) => <i key={i} style={{ '--i': i } as CSSProperties} />)}</div>
            <strong>We drew one teaching view.</strong>
            <p>GLM-5.3-Flash is configured with <b>{MODEL.attentionHeads} attention heads</b> and a hybrid schedule: <b>{MODEL.linearAttentionLayers} linear-attention layers</b> + <b>{MODEL.sparseAttentionLayers} sparse-attention layers</b>.</p>
            <small>The point we carry forward: attention lets the current representation gather useful context. We are not claiming one attention map explains all model reasoning.</small>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  )
}
