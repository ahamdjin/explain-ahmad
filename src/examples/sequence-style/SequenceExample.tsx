import { Arrow } from '../../components/Arrow'
import { Node } from '../../components/Node'
import { Reveal } from '../../components/Reveal'
import { Sequence } from '../../engine/Sequence'
import { Simulation } from '../../scenes/Simulation'

export default function SequenceExample() {
  return (
    <Simulation
      title="One narration beat at a time"
      description="Sequence is the default building block for controlled YouTube animation beats. Space / arrows move exactly one idea forward or backward."
    >
      <Sequence totalSteps={4}>
        {({ step, next, previous, reset }) => (
          <div className="sequence-demo">
            <div className="sequence-pipeline">
              <Node label="Token" accent />
              <Reveal show={step >= 1}><Arrow label="embed" /></Reveal>
              <Reveal show={step >= 1}><Node label="Embedding" square /></Reveal>
              <Reveal show={step >= 2}><Arrow label="project" /></Reveal>
              <Reveal show={step >= 2}><Node label="Q / K / V" square /></Reveal>
              <Reveal show={step >= 3}><Arrow label="attend" /></Reveal>
              <Reveal show={step >= 3}><Node label="Context" accent /></Reveal>
            </div>

            <p className="sequence-caption">
              {[
                'Start with one object.',
                'Reveal the transformation.',
                'Introduce the internal representation.',
                'Finish by showing the consequence.',
              ][step]}
            </p>

            <div className="scene-controls embedded-controls">
              <button onClick={previous} disabled={step === 0}>← Previous</button>
              <button onClick={reset}>Reset</button>
              <button onClick={next} disabled={step === 3}>Next →</button>
            </div>
          </div>
        )}
      </Sequence>
    </Simulation>
  )
}
