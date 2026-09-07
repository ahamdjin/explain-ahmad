import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { MODEL, SELECTED_EXPERTS } from '../data'

const PARAMETER_MARKS = Array.from({ length: 160 }, (_, index) => index)
const EXPERTS = Array.from({ length: MODEL.routedExperts }, (_, index) => index + 1)
const selectedExperts = new Set<number>(SELECTED_EXPERTS)

function ModelStamp() {
  return (
    <div className="opening2-model-stamp">
      <small>Z.ai</small>
      <strong>{MODEL.name}</strong>
    </div>
  )
}

function ParameterSetup({ beat }: { beat: number }) {
  const tokenArrives = beat >= 2
  const activeContrast = beat >= 3
  const quietMass = beat >= 4

  return (
    <motion.div
      className="opening2-parameter-scene"
      initial={false}
      animate={{
        opacity: beat <= 4 ? 1 : 0,
        scale: quietMass ? 0.96 : 1,
        y: quietMass ? '-1.4cqh' : 0,
      }}
      transition={{ type: 'spring', stiffness: 105, damping: 24 }}
      aria-hidden={beat > 4}
    >
      <ModelStamp />

      <div className="opening2-total-number">
        <span>total</span>
        <strong>{MODEL.totalParamsB}B</strong>
      </div>

      <motion.div
        className="opening2-param-field"
        animate={{
          x: quietMass ? '-4cqw' : 0,
          scale: quietMass ? 1.035 : 1,
        }}
        transition={{ type: 'spring', stiffness: 95, damping: 24 }}
      >
        {PARAMETER_MARKS.map((mark) => {
          const active = mark < 9
          return (
            <motion.i
              key={mark}
              className="opening2-param-mark"
              data-active={tokenArrives && active ? 'true' : undefined}
              animate={{
                opacity: tokenArrives && !active ? (activeContrast ? 0.16 : 0.3) : 1,
                scale: tokenArrives && active ? (activeContrast ? 1.12 : 1.06) : 1,
              }}
              transition={{ delay: mark * 0.0012, duration: 0.22 }}
            />
          )
        })}
      </motion.div>

      {tokenArrives ? (
        <motion.div
          className="opening2-token opening2-token-parameter"
          initial={{ opacity: 0, x: '-13cqw' }}
          animate={{ opacity: 1, x: activeContrast ? '4.5cqw' : 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
        >
          <i />
        </motion.div>
      ) : null}

      {tokenArrives ? (
        <motion.div
          className="opening2-active-number"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, scale: activeContrast ? 1.05 : 1 }}
        >
          <span>active</span>
          <strong>~{MODEL.activeParamsB}B</strong>
        </motion.div>
      ) : null}

      {quietMass ? (
        <motion.div
          className="opening2-rest-brace"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
        >
          <i />
          <b />
        </motion.div>
      ) : null}
    </motion.div>
  )
}

function WeightRack({ muted, compact }: { muted: boolean; compact: boolean }) {
  return (
    <motion.div
      className="opening2-weight-rack"
      animate={{
        opacity: muted ? 0.38 : 1,
        scale: compact ? 0.95 : 1,
      }}
      transition={{ type: 'spring', stiffness: 90, damping: 22 }}
    >
      <div className="opening2-weight-rack-tag">
        <i /><span>weights</span>
      </div>
      <div className="opening2-weight-shelves">
        {Array.from({ length: 18 }, (_, shelf) => (
          <i key={shelf}>
            {Array.from({ length: 5 }, (_, block) => <b key={block} />)}
          </i>
        ))}
      </div>
      <div className="opening2-gb-ruler" aria-hidden="true">
        {Array.from({ length: 8 }, (_, tick) => <i key={tick} />)}
        <span>GB</span>
      </div>
    </motion.div>
  )
}

function ExpertField({ selected, subdued }: { selected: boolean; subdued: boolean }) {
  return (
    <motion.div
      className="opening2-expert-field"
      animate={{ opacity: subdued ? 0.3 : 1, scale: subdued ? 0.98 : 1 }}
    >
      <div className="opening2-moe-mark">MoE</div>
      <div className="opening2-expert-grid">
        {EXPERTS.map((expert) => {
          const isSelected = selectedExperts.has(expert)
          return (
            <motion.i
              key={expert}
              className="opening2-expert-cell"
              data-selected={selected && isSelected ? 'true' : undefined}
              animate={{
                opacity: selected && !isSelected ? 0.17 : 1,
                scale: selected && isSelected ? 1.14 : 1,
              }}
              transition={{ duration: 0.18 }}
            >
              <b />
            </motion.i>
          )
        })}
      </div>
      <motion.div
        className="opening2-shared-cell"
        animate={{ opacity: selected ? 1 : 0.34, scale: selected ? 1.06 : 1 }}
      >
        <i />
      </motion.div>
      {selected ? (
        <motion.div className="opening2-selection-count" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <b>8</b><i /> <b>1</b>
        </motion.div>
      ) : null}
    </motion.div>
  )
}

function WorkingSet({ visible, insideMachine }: { visible: boolean; insideMachine: boolean }) {
  if (!visible) return null

  return (
    <motion.div
      className="opening2-working-set"
      data-machine={insideMachine ? 'true' : undefined}
      initial={{ opacity: 0, scale: 0.72, x: '-6cqw' }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
    >
      <div className="opening2-working-grid">
        {Array.from({ length: 9 }, (_, index) => (
          <motion.i
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.035 }}
          >
            {index === 8 ? <b /> : null}
          </motion.i>
        ))}
      </div>
      {insideMachine ? (
        <motion.div className="opening2-machine-shell" initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }}>
          <i /><i /><i />
        </motion.div>
      ) : null}
    </motion.div>
  )
}

function Router({ visible, compact }: { visible: boolean; compact: boolean }) {
  if (!visible) return null

  return (
    <motion.div
      className="opening2-router-group"
      animate={{ x: compact ? '39cqw' : 0, y: compact ? '10cqh' : 0, scale: compact ? 0.78 : 1 }}
      transition={{ type: 'spring', stiffness: 95, damping: 22 }}
    >
      <motion.div className="opening2-router-token" initial={{ x: '-8cqw', opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <i />
      </motion.div>
      <motion.div className="opening2-router-node" initial={{ opacity: 0, scale: 0.78 }} animate={{ opacity: 1, scale: 1 }}>
        <strong>router</strong>
        <i />
      </motion.div>
      <div className="opening2-router-rays" aria-hidden="true">
        {SELECTED_EXPERTS.map((expert, index) => (
          <motion.i
            key={expert}
            style={{ '--ray': index } as CSSProperties}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: index * 0.035 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

function ExpertSystem({ beat }: { beat: number }) {
  const visible = beat >= 5 && beat <= 12
  const selected = beat >= 6
  const memoryVisible = beat >= 7
  const workingSet = beat >= 8
  const routerVisible = beat >= 9
  const compactIdea = beat >= 10
  const smallMachine = beat >= 11
  const holdMystery = beat >= 12

  return (
    <motion.div
      className="opening2-system-scene"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.28 }}
      aria-hidden={!visible}
    >
      <motion.div
        className="opening2-system-spine"
        animate={{ opacity: memoryVisible ? 1 : 0, scaleX: memoryVisible ? 1 : 0.4 }}
      />

      {memoryVisible ? <WeightRack muted={compactIdea} compact={smallMachine} /> : null}

      <motion.div
        className="opening2-expert-host"
        animate={{
          x: memoryVisible ? (compactIdea ? '11cqw' : '15cqw') : 0,
          y: compactIdea ? '-2cqh' : 0,
          scale: compactIdea ? 0.76 : 1,
          opacity: holdMystery ? 0.48 : 1,
        }}
        transition={{ type: 'spring', stiffness: 92, damping: 22 }}
      >
        <ExpertField selected={selected} subdued={compactIdea} />
      </motion.div>

      <Router visible={routerVisible} compact={compactIdea} />

      <motion.div
        className="opening2-working-host"
        animate={{
          x: compactIdea ? '-4cqw' : 0,
          y: smallMachine ? '-3cqh' : 0,
          scale: smallMachine ? 0.88 : 1,
        }}
      >
        <WorkingSet visible={workingSet} insideMachine={smallMachine} />
      </motion.div>

      {workingSet ? (
        <div className="opening2-transfer-lines" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <motion.i
              key={index}
              style={{ '--transfer': index } as CSSProperties}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: compactIdea ? 0.26 : 0.66 }}
              transition={{ delay: index * 0.04 }}
            />
          ))}
        </div>
      ) : null}

      {holdMystery ? (
        <motion.div
          className="opening2-mystery-hold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <i /><i /><i />
        </motion.div>
      ) : null}
    </motion.div>
  )
}

function DiveInside({ beat }: { beat: number }) {
  const rejectDiagram = beat >= 13
  const enter = beat >= 14

  if (!rejectDiagram) return null

  return (
    <motion.div className="opening2-dive-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        className="opening2-architecture-sheet"
        initial={{ opacity: 0, rotate: -1.5, x: '-4cqw' }}
        animate={{
          opacity: enter ? 0 : 0.72,
          rotate: enter ? -5 : -1.5,
          x: enter ? '-42cqw' : 0,
          scale: enter ? 0.82 : 1,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 21 }}
      >
        <div className="opening2-architecture-grid">
          {Array.from({ length: 45 }, (_, index) => <i key={index} data-moe={index >= 3 ? 'true' : undefined} />)}
        </div>
        <div className="opening2-architecture-lines">
          {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
        </div>
      </motion.div>

      <motion.div
        className="opening2-dive-token"
        initial={{ opacity: 0, x: '-18cqw', scale: 0.82 }}
        animate={{ opacity: 1, x: enter ? '17cqw' : 0, scale: enter ? 0.72 : 1 }}
        transition={{ type: 'spring', stiffness: 85, damping: 18 }}
      >
        <i />
      </motion.div>

      {enter ? (
        <motion.div
          className="opening2-model-door"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 95, damping: 19 }}
        >
          <div className="opening2-door-depth"><i /><i /><i /></div>
          <motion.div
            className="opening2-door-token"
            initial={{ x: '-15cqw', opacity: 0 }}
            animate={{ x: 0, opacity: 1, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 82, damping: 17, delay: 0.08 }}
          ><i /></motion.div>
        </motion.div>
      ) : null}
    </motion.div>
  )
}

export function OpeningWorld({ beat }: { beat: number }) {
  return (
    <motion.section className="v9-world opening-world opening2-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ParameterSetup beat={beat} />
      <ExpertSystem beat={beat} />
      <DiveInside beat={beat} />
    </motion.section>
  )
}
