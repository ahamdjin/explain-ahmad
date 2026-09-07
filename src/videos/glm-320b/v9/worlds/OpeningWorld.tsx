import { AnimatePresence, motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { MODEL, SELECTED_EXPERTS } from '../data'

const PARAMETER_MARKS = Array.from({ length: 160 }, (_, index) => index)
const EXPERTS = Array.from({ length: MODEL.routedExperts }, (_, index) => index + 1)
const selectedExperts = new Set<number>(SELECTED_EXPERTS)

function ParameterField({ beat }: { beat: number }) {
  const showActive = beat >= 2
  const holdContrast = beat >= 3
  const askRest = beat >= 4

  return (
    <motion.div
      className="opening-parameter-scene"
      initial={false}
      animate={{ opacity: beat <= 4 ? 1 : 0, scale: askRest ? 0.96 : 1, y: askRest ? -8 : 0 }}
      transition={{ duration: 0.35 }}
      aria-hidden={beat > 4}
    >
      <div className="opening-model-tag">
        <small>Z.ai</small>
        <strong>{MODEL.name}</strong>
      </div>

      <motion.div className="opening-param-field" layout>
        {PARAMETER_MARKS.map((mark) => {
          const active = mark < 9
          return (
            <motion.i
              key={mark}
              className="opening-param-mark"
              data-active={showActive && active ? 'true' : 'false'}
              animate={{
                opacity: showActive && !active ? (holdContrast ? 0.2 : 0.34) : 1,
                scale: showActive && active ? 1.08 : 1,
              }}
              transition={{ delay: mark * 0.0015, duration: 0.22 }}
            />
          )
        })}
        {showActive ? <motion.span className="opening-active-ribbon" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} /> : null}
      </motion.div>

      <motion.div className="opening-total-stat" initial={false} animate={{ x: showActive ? -30 : 0 }}>
        <span>TOTAL PARAMETERS</span>
        <strong>{MODEL.totalParamsB}B</strong>
        <small>stored capacity</small>
      </motion.div>

      <AnimatePresence>
        {showActive ? (
          <motion.div className="opening-active-stat" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <span>ACTIVE / TOKEN</span>
            <strong>~{MODEL.activeParamsB}B</strong>
            <small>≈ 5.6% of the total</small>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {showActive ? (
        <motion.div className="opening-token opening-token-parameter" initial={{ x: '-15cqw', opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          token
        </motion.div>
      ) : null}

      {askRest ? (
        <motion.div className="opening-rest-question" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <i />
          <strong>Then what is all this for?</strong>
        </motion.div>
      ) : null}
    </motion.div>
  )
}

function ExpertWall({ beat }: { beat: number }) {
  const visible = beat >= 5 && beat <= 12
  const selectFew = beat >= 6
  const memoryHeadache = beat >= 7
  const temptingSmallSet = beat >= 8
  const routerVisible = beat >= 9
  const loadOnly = beat >= 10

  return (
    <motion.div
      className="opening-expert-scene"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: memoryHeadache ? '11cqw' : 0, scale: memoryHeadache ? 0.83 : 1 }}
      transition={{ type: 'spring', stiffness: 105, damping: 24 }}
      aria-hidden={!visible}
    >
      <motion.div className="opening-expert-heading" animate={{ x: memoryHeadache ? '3cqw' : 0 }}>
        <small>Mixture of Experts</small>
        <strong>{MODEL.routedExperts} possible routed experts</strong>
        <span>inside each sparse MoE layer</span>
      </motion.div>

      <div className="opening-expert-wall">
        {EXPERTS.map((expert) => {
          const selected = selectedExperts.has(expert)
          return (
            <motion.i
              key={expert}
              className="opening-expert-cell"
              data-selected={selectFew && selected ? 'true' : 'false'}
              data-sleep={loadOnly && !selected ? 'true' : 'false'}
              animate={{
                opacity: selectFew && !selected ? (loadOnly ? 0.09 : 0.22) : 1,
                scale: selectFew && selected ? 1.15 : 1,
              }}
              transition={{ duration: 0.18 }}
            >
              {selected && selectFew ? <b>{expert}</b> : null}
            </motion.i>
          )
        })}
      </div>

      <motion.div
        className="opening-shared-expert"
        animate={{ opacity: selectFew ? 1 : 0.25, scale: selectFew ? 1.04 : 1 }}
      >
        <i />
        <span>shared expert</span>
        <small>always on</small>
      </motion.div>

      {selectFew ? (
        <motion.div className="opening-selected-count" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <strong>8</strong> routed <span>+</span> <strong>1</strong> shared
          <small>for this token · this sparse layer</small>
        </motion.div>
      ) : null}

      {routerVisible ? (
        <motion.div className="opening-router" initial={{ opacity: 0, x: '-8cqw' }} animate={{ opacity: 1, x: 0 }}>
          <div className="opening-router-token">token</div>
          <strong>ROUTER</strong>
          <small>chooses experts</small>
          <div className="opening-router-beams" aria-hidden="true">
            {SELECTED_EXPERTS.map((expert, index) => (
              <motion.i
                key={expert}
                style={{ '--beam-index': index } as CSSProperties}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: index * 0.035 }}
              />
            ))}
          </div>
        </motion.div>
      ) : null}

      {temptingSmallSet ? (
        <motion.div className="opening-small-tray" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <span>Just keep these?</span>
          <div>{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
        </motion.div>
      ) : null}

      {loadOnly ? (
        <motion.div className="opening-load-proposal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span>LOAD ONLY SELECTED?</span>
          <i />
        </motion.div>
      ) : null}
    </motion.div>
  )
}

function WeightStore({ beat }: { beat: number }) {
  const visible = beat >= 7 && beat <= 12
  const temptingSmallSet = beat >= 8
  const loadOnly = beat >= 10
  const shrinkMachine = beat >= 11
  const finalQuestion = beat >= 12

  return (
    <motion.div
      className="opening-memory-scene"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? '-21cqw' : '-26cqw' }}
      transition={{ type: 'spring', stiffness: 100, damping: 24 }}
      aria-hidden={!visible}
    >
      <div className="opening-memory-title">
        <small>MODEL WEIGHTS</small>
        <strong>hundreds of GB</strong>
        <span>the full checkpoint is still huge</span>
      </div>

      <motion.div className="opening-memory-rack" animate={{ scale: shrinkMachine ? 0.86 : 1 }}>
        {Array.from({ length: 18 }, (_, shelf) => (
          <i key={shelf} data-fade={temptingSmallSet && shelf > 1 ? 'true' : 'false'}>
            {Array.from({ length: 5 }, (_, block) => <b key={block} />)}
          </i>
        ))}
      </motion.div>

      <div className="opening-memory-vs">
        <strong>small active path</strong>
        <i />
        <strong>huge weight set</strong>
      </div>

      {loadOnly ? (
        <motion.div className="opening-storage-switch" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span>selected experts</span>
          <i />
          <b>LOAD</b>
        </motion.div>
      ) : null}

      {shrinkMachine ? (
        <motion.div className="opening-small-machine" initial={{ opacity: 0, scale: 1.3 }} animate={{ opacity: 1, scale: 1 }}>
          <div><i /><i /><i /></div>
          <strong>much smaller machine?</strong>
          <span>?</span>
        </motion.div>
      ) : null}

      {finalQuestion ? (
        <motion.div className="opening-stop-question" initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }}>
          <strong>WHAT STOPS THIS?</strong>
          <i />
        </motion.div>
      ) : null}
    </motion.div>
  )
}

function DiveInside({ beat }: { beat: number }) {
  const rejectDump = beat >= 13
  const enter = beat >= 14

  if (!rejectDump) return null

  return (
    <motion.div className="opening-dive-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        className="opening-architecture-dump"
        initial={{ opacity: 0, rotate: -2, y: 12 }}
        animate={{ opacity: enter ? 0 : 1, rotate: enter ? 6 : -2, x: enter ? '52cqw' : 0 }}
        transition={{ type: 'spring', stiffness: 105, damping: 20 }}
      >
        <small>FULL ARCHITECTURE</small>
        {Array.from({ length: 12 }, (_, row) => <i key={row} style={{ width: `${46 + (row % 4) * 12}%` }} />)}
        <b>×</b>
        <span>not the way in</span>
      </motion.div>

      <motion.div
        className="opening-dive-token"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: enter ? 1.34 : 0.85, x: enter ? '9cqw' : '-16cqw' }}
        transition={{ type: 'spring', stiffness: 95, damping: 18 }}
      >
        <span>one token</span>
      </motion.div>

      {enter ? (
        <motion.div className="opening-model-door" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <i />
          <strong>follow it inside</strong>
          <span>start from what the model actually receives</span>
        </motion.div>
      ) : null}
    </motion.div>
  )
}

export function OpeningWorld({ beat }: { beat: number }) {
  return (
    <motion.section className="v9-world opening-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ParameterField beat={beat} />
      <ExpertWall beat={beat} />
      <WeightStore beat={beat} />
      <DiveInside beat={beat} />
    </motion.section>
  )
}
