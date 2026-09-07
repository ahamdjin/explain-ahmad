import { motion } from 'motion/react'
import { SketchAnnotation } from '../../../../visuals/SketchAnnotation'
import { MODEL } from '../data'
import { NarrativeCue } from '../shared'
import { CHAPTERS } from '../story'

const journeyIcons: Record<string, string> = {
  TEXT: '▤', TOKENS: '▦', 'TOKEN ID': '#', EMBEDDING: '▱', ATTENTION: '◎', MOE: '⋔', LAYERS: '▥', OUTPUT: '→',
}

export function ModelWorld({ beat }: { beat: number }) {
  const showName = beat >= 2
  const showTotal = beat >= 3
  const showActive = beat >= 4
  const highlight = beat >= 5
  const hook = beat >= 6
  const defineParameter = beat >= 7
  const defineActive = beat >= 8
  const showType = beat >= 9
  const architecture = beat >= 10
  const follow = beat >= 11
  const journey = beat >= 12
  const icons = beat >= 13
  const collapse = beat >= 14

  return (
    <motion.section className="v9-world v9-model-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="v9-model-sheet" animate={{ y: collapse ? '-7cqh' : 0, scale: collapse ? 0.94 : 1, opacity: journey ? 0.3 : 1 }} transition={{ type: 'spring', stiffness: 105, damping: 23 }}>
        <motion.i className="v9-sheet-rule v9-sheet-rule-top" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.75 }} />
        <motion.i className="v9-sheet-rule v9-sheet-rule-side" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.65, delay: 0.1 }} />

        <header className="v9-model-name">
          <motion.small animate={{ opacity: showName ? 1 : 0 }}>{MODEL.maker}</motion.small>
          <motion.h1 animate={{ opacity: showName ? 1 : 0, y: showName ? 0 : 8 }}>{MODEL.name}</motion.h1>
          <motion.p animate={{ opacity: showType ? 1 : 0 }}>Mixture of Experts (MoE) · the clue we will eventually unpack</motion.p>
          {showType ? <motion.span className="v10-model-plain" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>Many learned expert blocks exist, <b>but</b> one token does not need all of them at once.</motion.span> : null}
        </header>

        <div className="v9-model-hero">
          <motion.div className="v9-model-number" data-kind="total" animate={{ opacity: showTotal ? 1 : 0, y: showTotal ? 0 : 12 }}>
            <span>{highlight ? <SketchAnnotation type="highlight" color="#f3cd64" padding={5}>TOTAL PARAMETERS</SketchAnnotation> : 'TOTAL PARAMETERS'}</span>
            <strong>{MODEL.totalParamsB}B</strong>
            <p>all learned parameter values stored across the model</p>
            {defineParameter ? <motion.aside initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}><b>Parameter</b> = one learned number inside the model.</motion.aside> : null}
          </motion.div>

          <motion.div className="v9-model-vs" animate={{ opacity: showActive ? 1 : 0 }}><span>but</span><i /></motion.div>

          <motion.div className="v9-model-number" data-kind="active" animate={{ opacity: showActive ? 1 : 0, y: showActive ? 0 : 12 }}>
            <span>{highlight ? <SketchAnnotation type="highlight" color="#efaa78" padding={5}>ACTIVE FOR ONE TOKEN</SketchAnnotation> : 'ACTIVE FOR ONE TOKEN'}</span>
            <strong>~{MODEL.activeParamsB}B</strong>
            <p>the approximate parameter path participating for one token</p>
            {defineActive ? <motion.aside initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}><b>Active</b> = being used for this token right now.</motion.aside> : null}
          </motion.div>
        </div>

        <motion.aside className="v9-model-margin" animate={{ opacity: architecture ? 1 : 0, x: architecture ? 0 : 14 }}>
          <small>ONLY THE FACTS WE WILL NEED LATER</small>
          <div><b>{MODEL.layers}</b><span>Transformer layers</span></div>
          <div><b>{MODEL.moeLayers}</b><span>sparse-MoE layers</span></div>
          <div><b>{MODEL.routedExperts}</b><span>routed experts / MoE layer</span></div>
          <div><b>top-{MODEL.expertsPerToken} + {MODEL.sharedExperts}</b><span>routed + shared expert path</span></div>
          <em>{MODEL.vocabSize.toLocaleString()} vocabulary entries · {MODEL.hiddenSize.toLocaleString()} values in the main representation</em>
        </motion.aside>

        <motion.div className="v9-hook" animate={{ opacity: hook ? 1 : 0, y: hook ? 0 : 10 }}>
          <small>THE HEADACHE</small>
          <div><b>320B</b><i /><strong>?</strong><i /><b>~18B</b></div>
          <p>If 320B parameters exist, why are only ~18B active for one token?</p>
        </motion.div>
      </motion.div>

      {showType && !follow ? (
        <NarrativeCue kind="question" className="v11-model-clue">
          If the active path is smaller, <b>what inside the model is choosing it?</b>
        </NarrativeCue>
      ) : null}

      {follow ? (
        <motion.div className="v9-follow-copy" initial={{ opacity: 0, y: 14 }} animate={{ opacity: journey ? 0.45 : 1, y: 0 }}>
          <small>THEREFORE</small>
          <h2>Don’t memorize the architecture. Follow one token.</h2>
          <p>If selective compute is really the answer, the token’s path should prove it.</p>
        </motion.div>
      ) : null}

      {journey ? (
        <motion.div className="v9-journey-map" animate={{ top: collapse ? '2.5cqh' : '46cqh', scale: collapse ? 0.84 : 1 }} transition={{ type: 'spring', stiffness: 95, damping: 22 }}>
          {CHAPTERS.filter((chapter) => chapter.id !== 'MODEL').map((chapter, index) => (
            <motion.div className="v9-journey-node" key={chapter.id} layoutId={`v9-chapter-${chapter.id}`} data-first={index === 0 ? 'true' : undefined}>
              {index > 0 ? <motion.i className="v9-journey-link" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: index * 0.05 }} /> : null}
              <span className="v9-journey-icon">{icons ? journeyIcons[chapter.id] : '·'}</span>
              <strong>{chapter.label}</strong>
              <small>{chapter.hint}</small>
              {index === 0 && collapse ? <b>START</b> : null}
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </motion.section>
  )
}
