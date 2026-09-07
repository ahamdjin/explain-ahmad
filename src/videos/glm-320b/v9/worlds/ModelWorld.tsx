import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { SketchAnnotation } from '../../../../visuals/SketchAnnotation'
import { MODEL } from '../data'
import { CHAPTERS } from '../story'

const journeyIcons: Record<string, string> = {
  TEXT: '▤', TOKENS: '▦', 'TOKEN ID': '#', EMBEDDING: '▱', ATTENTION: '◎', MOE: '⋔', LAYERS: '▥', OUTPUT: '→',
}

const ACTIVE_RATIO = (MODEL.activeParamsB / MODEL.totalParamsB) * 100

export function ModelWorld({ beat }: { beat: number }) {
  const typeFocus = beat === 3
  const totalFocus = beat === 4 || beat === 7
  const activeFocus = beat === 5 || beat === 8
  const bothFocus = beat === 6 || beat === 10
  const highlightTotal = beat >= 4
  const highlightActive = beat >= 5
  const defineParameter = beat >= 7
  const defineActive = beat >= 8
  const architectureFocus = beat === 9
  const hook = beat >= 10
  const follow = beat >= 11
  const journey = beat >= 12
  const icons = beat >= 13
  const collapse = beat >= 14

  const pageOpacity = journey ? 0.1 : follow ? 0.18 : 1
  const pageScale = follow ? 0.965 : 1

  return (
    <motion.section className="v9-world v9-model-world v12-model-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.article
        className="v12-model-page"
        data-leaving={follow ? 'true' : undefined}
        initial={{ opacity: 0, y: '1.4cqh' }}
        animate={{ opacity: pageOpacity, y: follow ? '-3cqh' : 0, scale: pageScale }}
        transition={{ type: 'spring', stiffness: 105, damping: 24 }}
      >
        <header className="v12-model-header">
          <div className="v12-model-kicker"><span>{MODEL.maker}</span><i /><span>MODEL STUDY</span></div>
          <motion.h1
            animate={{ opacity: beat <= 3 ? 1 : 0.88, x: beat === 2 ? '.35cqw' : 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 24 }}
          >
            {beat === 2 ? <SketchAnnotation type="underline" color="#7b6b5e" strokeWidth={1.5} padding={3}>{MODEL.name}</SketchAnnotation> : MODEL.name}
          </motion.h1>
          <div className="v12-model-type-line">
            <span>Large language model</span><span>·</span>
            <motion.b animate={{ opacity: typeFocus ? 1 : 0.82, scale: typeFocus ? 1.025 : 1 }}>Mixture of Experts (MoE)</motion.b>
          </div>
          <motion.p className="v12-model-plain" animate={{ opacity: typeFocus ? 1 : beat >= 3 ? 0.82 : 0.48 }}>
            Many learned feed-forward expert blocks are available inside its sparse layers.
          </motion.p>
        </header>

        <div className="v12-capacity" style={{ '--active-ratio': `${ACTIVE_RATIO}%` } as CSSProperties}>
          <motion.section
            className="v12-stat"
            data-kind="total"
            data-focus={totalFocus || bothFocus ? 'true' : undefined}
            animate={{ opacity: totalFocus || bothFocus ? 1 : 0.68, scale: totalFocus ? 1.018 : 1 }}
            transition={{ type: 'spring', stiffness: 125, damping: 23 }}
          >
            <div className="v12-stat-label">
              {highlightTotal ? <SketchAnnotation type="highlight" color="#f3cd64" padding={4}>TOTAL PARAMETERS</SketchAnnotation> : 'TOTAL PARAMETERS'}
            </div>
            <strong>{MODEL.totalParamsB}B</strong>
            <div className="v12-stat-copy">
              <p>all learned parameter values stored across the whole model</p>
              <div className="v12-definition-slot">
                <motion.aside className="v12-stat-definition" animate={{ opacity: defineParameter ? 1 : 0, x: defineParameter ? 0 : '-.4cqw' }}>
                  <b>Parameter</b> = one learned value stored in the model.
                </motion.aside>
              </div>
            </div>
            <div className="v12-scale" aria-label="Full 320B parameter-capacity scale">
              <motion.i initial={{ scaleX: 0.18 }} animate={{ scaleX: beat >= 4 ? 1 : 0.28, opacity: beat >= 4 ? 1 : 0.3 }} transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1] }} />
              <small>same scale below</small>
            </div>
          </motion.section>

          <motion.section
            className="v12-stat"
            data-kind="active"
            data-focus={activeFocus || bothFocus ? 'true' : undefined}
            animate={{ opacity: activeFocus || bothFocus ? 1 : beat >= 5 ? 0.78 : 0.48, scale: activeFocus ? 1.018 : 1 }}
            transition={{ type: 'spring', stiffness: 125, damping: 23 }}
          >
            <div className="v12-stat-label">
              {highlightActive ? <SketchAnnotation type="highlight" color="#efaa78" padding={4}>ACTIVE FOR ONE TOKEN</SketchAnnotation> : 'ACTIVE FOR ONE TOKEN'}
            </div>
            <strong>~{MODEL.activeParamsB}B</strong>
            <div className="v12-stat-copy">
              <p>the approximate parameter path participating for one token</p>
              <div className="v12-definition-slot">
                <motion.aside className="v12-stat-definition" animate={{ opacity: defineActive ? 1 : 0, x: defineActive ? 0 : '.4cqw' }}>
                  <b>Active</b> = participating in this token's computation path now.
                </motion.aside>
              </div>
            </div>
            <div className="v12-scale" aria-label={`Active parameter scale: about ${ACTIVE_RATIO.toFixed(1)} percent of the 320B total by parameter count`}>
              <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: beat >= 5 ? 1 : 0, opacity: beat >= 5 ? 1 : 0 }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }} />
              <small>length compares 18B with 320B</small>
            </div>
          </motion.section>

          <motion.div className="v12-model-question" animate={{ opacity: hook ? 1 : 0.12 }}>
            <div className="v12-question-equation">
              <span><b>{MODEL.totalParamsB}B</b> stored</span><i /><strong>?</strong><i /><span><b>~{MODEL.activeParamsB}B</b> active / token</span>
            </div>
            <motion.h2 animate={{ y: hook ? 0 : '1cqh', opacity: hook ? 1 : 0 }}>
              {hook ? <SketchAnnotation type="underline" color="#b56e49" strokeWidth={2} padding={4}>How can both numbers be true?</SketchAnnotation> : 'How can both numbers be true?'}
            </motion.h2>
          </motion.div>
        </div>

        <motion.aside
          className="v12-architecture"
          data-focus={architectureFocus ? 'true' : undefined}
          animate={{ opacity: architectureFocus ? 1 : hook ? 0.58 : 0.64, scale: architectureFocus ? 1.018 : 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 23 }}
        >
          <small>MODEL ANATOMY</small>
          <h3>{MODEL.layers} Transformer layers</h3>
          <p>The feed-forward side changes after the first three layers.</p>

          <div className="v12-layer-anatomy">
            <motion.div className="v12-layer-stack" animate={{ opacity: architectureFocus ? 1 : 0.72 }} aria-label={`${MODEL.layers} layers: first ${MODEL.denseLayers} dense, next ${MODEL.moeLayers} sparse MoE`}>
              {Array.from({ length: MODEL.layers }, (_, index) => (
                <motion.i
                  key={index}
                  data-kind={index < MODEL.denseLayers ? 'dense' : 'moe'}
                  initial={{ scaleX: 0.25 }}
                  animate={{ scaleX: architectureFocus ? 1 : 0.72 }}
                  transition={{ delay: architectureFocus ? index * 0.008 : 0, duration: 0.25 }}
                />
              ))}
            </motion.div>
            <div className="v12-layer-legend">
              <div><b>{MODEL.denseLayers}</b><span>first layers use a dense MLP</span></div>
              <div><b>{MODEL.moeLayers}</b><span>later layers use sparse MoE feed-forward blocks</span></div>
            </div>
          </div>

          <div className="v12-expert-facts">
            <div><b>{MODEL.routedExperts}</b><span>routed experts available in each sparse MoE layer</span></div>
            <div><b>top-{MODEL.expertsPerToken}</b><span>routed experts selected per token in that sparse layer</span></div>
            <div><b>+ {MODEL.sharedExperts}</b><span>shared expert also participates</span></div>
          </div>
          <p className="v12-architecture-note">These are the architecture facts we need later. We have not explained the routing mechanism yet.</p>
        </motion.aside>
      </motion.article>

      {follow ? (
        <motion.div className="v9-follow-copy" initial={{ opacity: 0, y: 14 }} animate={{ opacity: journey ? 0.45 : 1, y: 0 }}>
          <small>BEFORE WE ANSWER IT</small>
          <h2>Follow one tiny piece of text.</h2>
          <p>We will open the model one chapter at a time.</p>
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
