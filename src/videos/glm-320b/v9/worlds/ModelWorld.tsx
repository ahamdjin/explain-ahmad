import { AnimatePresence, motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { SketchAnnotation } from '../../../../visuals/SketchAnnotation'
import { MODEL } from '../data'
import { CHAPTERS } from '../story'

const journeyIcons: Record<string, string> = {
  TEXT: '▤', TOKENS: '▦', 'TOKEN ID': '#', EMBEDDING: '▱', ATTENTION: '◎', MOE: '⋔', LAYERS: '▥', OUTPUT: '→',
}

const ACTIVE_RATIO = (MODEL.activeParamsB / MODEL.totalParamsB) * 100

function statOpacity(beat: number, kind: 'total' | 'active') {
  if (beat >= 8) return 0.54
  if (kind === 'total') {
    if (beat < 3) return 0.52
    if (beat === 3) return 1
    if (beat >= 4) return 0.92
  }
  if (kind === 'active') {
    if (beat < 4) return 0.3
    if (beat === 4) return 1
    if (beat >= 5) return 0.92
  }
  return 0.7
}

export function ModelWorld({ beat }: { beat: number }) {
  const opening = beat <= 10
  const totalFocus = beat === 3
  const activeFocus = beat === 4
  const compareFocus = beat >= 5 && beat <= 7
  const definitions = beat >= 6
  const question = beat >= 7 && beat <= 9
  const architectureFocus = beat >= 8 && beat <= 9
  const partsLimit = beat >= 9
  const pathNext = beat >= 10
  const journey = beat >= 12
  const icons = beat >= 13
  const collapse = beat >= 14

  return (
    <motion.section className="v9-world v9-model-world v12-model-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AnimatePresence mode="wait" initial={false}>
        {opening ? (
          <motion.article
            key="opening-page"
            className="v12-model-page"
            initial={{ opacity: 0, y: '1.2cqh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-2.2cqh' }}
            transition={{ duration: 0.42, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <motion.header className="v12-model-header" animate={{ opacity: architectureFocus || pathNext ? 0.58 : 1 }}>
              <div className="v12-model-kicker"><span>{MODEL.maker}</span><i /><span>MODEL STUDY</span></div>
              <h1>
                {beat === 2 ? <SketchAnnotation type="underline" color="#7b6b5e" strokeWidth={1.5} padding={3}>{MODEL.name}</SketchAnnotation> : MODEL.name}
              </h1>
              <div className="v12-model-type-line">
                <span>Large language model</span><span>·</span><b>Mixture of Experts (MoE)</b>
              </div>
            </motion.header>

            <main className="v12-capacity">
              <motion.div className="v12-stat-row" animate={{ opacity: architectureFocus ? 0.58 : pathNext ? 0.42 : 1 }}>
                <motion.section
                  className="v12-stat"
                  data-kind="total"
                  data-focus={totalFocus || compareFocus || question ? 'true' : undefined}
                  animate={{ opacity: statOpacity(beat, 'total') }}
                >
                  <div className="v12-stat-label">TOTAL PARAMETERS</div>
                  <strong>{MODEL.totalParamsB}B</strong>
                  <p>all learned parameter values stored across the whole model</p>
                  <motion.span className="v12-local-definition" animate={{ opacity: definitions ? 1 : 0 }}>
                    <b>parameter</b> = one learned value
                  </motion.span>
                </motion.section>

                <motion.div className="v12-but" animate={{ opacity: beat >= 4 ? 1 : 0.12, y: beat === 4 ? -3 : 0 }}>
                  <span>BUT</span><i />
                </motion.div>

                <motion.section
                  className="v12-stat"
                  data-kind="active"
                  data-focus={activeFocus || compareFocus || question ? 'true' : undefined}
                  animate={{ opacity: statOpacity(beat, 'active') }}
                >
                  <div className="v12-stat-label">ACTIVE FOR ONE TOKEN</div>
                  <strong>~{MODEL.activeParamsB}B</strong>
                  <p>the approximate parameter path participating for this token</p>
                  <motion.span className="v12-local-definition" animate={{ opacity: definitions ? 1 : 0 }}>
                    <b>active</b> = participating in this computation now
                  </motion.span>
                </motion.section>
              </motion.div>

              <motion.div className="v12-scale-compare" animate={{ opacity: architectureFocus ? 0.46 : pathNext ? 0.36 : beat >= 3 ? 1 : 0.28 }} style={{ '--active-ratio': `${ACTIVE_RATIO}%` } as CSSProperties}>
                <div className="v12-scale-meta">
                  <small>SAME SCALE</small>
                  <motion.strong animate={{ opacity: beat >= 5 ? 1 : 0 }}>{ACTIVE_RATIO.toFixed(1)}%</motion.strong>
                  <motion.span animate={{ opacity: beat >= 5 ? 1 : 0 }}>18 ÷ 320 · size comparison only</motion.span>
                </div>
                <div className="v12-ruler-row" data-kind="total">
                  <b>320B</b>
                  <div><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: beat >= 3 ? 1 : 0 }} transition={{ duration: 0.72, ease: [0.2, 0.7, 0.2, 1] }} /></div>
                </div>
                <div className="v12-ruler-row" data-kind="active">
                  <b>~18B</b>
                  <div><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: beat >= 4 ? 1 : 0 }} transition={{ duration: 0.68, ease: [0.2, 0.7, 0.2, 1] }} /></div>
                </div>
              </motion.div>

              <div className="v12-model-question">
                <AnimatePresence mode="wait" initial={false}>
                  {pathNext ? (
                    <motion.div key="next-step" className="v12-question-state v12-question-next" initial={{ opacity: 0, y: '1cqh' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <small>SO</small>
                      <h2>Follow one token’s path.</h2>
                      <p>Instead of memorizing the parts list, watch where this token actually sends compute.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="headache" className="v12-question-state" initial={false} animate={{ opacity: question ? architectureFocus ? 0.56 : 1 : 0, y: question ? 0 : '1cqh' }} exit={{ opacity: 0, y: '-.6cqh' }}>
                      <small>THE HEADACHE</small>
                      <h2>How can both numbers be true?</h2>
                      <p>The model contains 320B parameters, <b>but</b> one token follows a much smaller active path.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </main>

            <motion.aside className="v12-architecture" animate={{ opacity: architectureFocus ? 1 : pathNext ? 0.62 : 0.32 }}>
              <div className="v12-anatomy-heading">
                <small>THE CLUE IS IN THE ARCHITECTURE</small>
                <h3>{MODEL.layers} Transformer layers</h3>
              </div>

              <div className="v12-layer-anatomy">
                <div className="v12-layer-strip" aria-label={`${MODEL.layers} layers: first ${MODEL.denseLayers} dense and next ${MODEL.moeLayers} sparse MoE`}>
                  {Array.from({ length: MODEL.layers }, (_, index) => (
                    <motion.i
                      key={index}
                      data-kind={index < MODEL.denseLayers ? 'dense' : 'moe'}
                      initial={{ scaleY: 0.28 }}
                      animate={{ scaleY: architectureFocus ? 1 : 0.58 }}
                      transition={{ delay: architectureFocus ? index * 0.007 : 0, duration: 0.2 }}
                    />
                  ))}
                </div>
                <div className="v12-layer-split">
                  <div><b>{MODEL.denseLayers}</b><span>dense layers first</span></div>
                  <div><b>{MODEL.moeLayers}</b><span>sparse MoE layers after</span></div>
                </div>
              </div>

              <div className="v12-sparse-layer">
                <small>INSIDE ONE SPARSE MoE LAYER</small>
                <div className="v12-sparse-flow">
                  <div><b>{MODEL.routedExperts}</b><span>routed experts available</span></div>
                  <i>→</i>
                  <div><b>top-{MODEL.expertsPerToken}</b><span>routed / token</span></div>
                  <b className="v12-plus">+</b>
                  <div><b>{MODEL.sharedExperts}</b><span>shared expert</span></div>
                </div>
              </div>

              <motion.div className="v12-anatomy-limit" animate={{ opacity: partsLimit ? 1 : 0 }}>
                <b>But this is still only the parts list.</b>
                <span>It does not show the path one token actually takes.</span>
              </motion.div>
            </motion.aside>
          </motion.article>
        ) : (
          <motion.div
            key="journey-phase"
            className="v12-journey-phase"
            initial={{ opacity: 0, y: '1.5cqh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38 }}
          >
            <motion.div className="v12-journey-intro" animate={{ opacity: collapse ? 0.2 : journey ? 0.58 : 1, y: collapse ? '-5cqh' : 0 }}>
              <small>TO ANSWER THE QUESTION</small>
              <h2>Follow one tiny piece of text.</h2>
              <p>We will watch the path form instead of asking you to memorize a parts list.</p>
            </motion.div>

            {journey ? (
              <motion.div
                className="v9-journey-map v12-journey-map"
                animate={{ top: collapse ? '2.2cqh' : '49cqh', scale: collapse ? 0.84 : 1 }}
                transition={{ type: 'spring', stiffness: 95, damping: 22 }}
              >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
