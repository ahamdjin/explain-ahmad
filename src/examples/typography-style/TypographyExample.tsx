import { useState } from 'react'
import { SplitReveal } from '../../components/SplitReveal'
import { StoryButton } from '../../components/StoryButton'

export default function TypographyExample() {
  const [run, setRun] = useState(0)

  return (
    <section className="type-showcase">
      <div className="type-showcase-grid" key={run}>
        <div className="type-big-number" aria-hidden="true">288</div>
        <div className="type-copy">
          <p className="eyebrow">MIXTURE OF EXPERTS</p>
          <SplitReveal mode="lines" stagger={0.09}>
            <h2>288 experts exist.</h2>
            <h2 className="type-accent">Only 8 wake up.</h2>
          </SplitReveal>
          <SplitReveal mode="words" stagger={0.025}>
            <p className="type-explanation">The typography itself carries the hierarchy: first scale, then contrast, then timing. We only split text in a scene that actually benefits from choreography.</p>
          </SplitReveal>
          <StoryButton onClick={() => setRun((value) => value + 1)} hint="Replay the choreography">Replay</StoryButton>
        </div>
        <div className="expert-dots" aria-hidden="true">
          {Array.from({ length: 32 }, (_, index) => <i key={index} className={index % 4 === 0 ? 'is-awake' : ''} />)}
        </div>
      </div>
    </section>
  )
}
