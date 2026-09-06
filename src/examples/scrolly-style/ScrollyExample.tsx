import { Arrow } from '../../components/Arrow'
import { Node } from '../../components/Node'
import { Reveal } from '../../components/Reveal'
import { Diagram } from '../../scenes/Diagram'
import { ScrollyStory } from '../../scenes/ScrollyStory'

const steps = [
  {
    id: 'token',
    eyebrow: '01 · TOKEN',
    title: 'Start with one token.',
    body: 'The visual begins simple. Nothing appears until the narration needs it.',
  },
  {
    id: 'embedding',
    eyebrow: '02 · EMBEDDING',
    title: 'Turn it into a vector.',
    body: 'The existing visual stays on screen and evolves instead of cutting away.',
  },
  {
    id: 'qkv',
    eyebrow: '03 · Q K V',
    title: 'Project the embedding three ways.',
    body: 'Query, Key and Value appear only when they become relevant to the explanation.',
  },
  {
    id: 'attention',
    eyebrow: '04 · ATTENTION',
    title: 'Now connect the idea.',
    body: 'The final state reveals the relationship. Scroll became the animation timeline.',
  },
]

export default function ScrollyExample() {
  return (
    <ScrollyStory title="Build an attention diagram one idea at a time" steps={steps}>
      {(activeStep) => (
        <Diagram label="Progressive attention diagram">
          <div className="attention-flow">
            <Node label="it" accent />

            <Reveal show={activeStep >= 1}>
              <Arrow label="embedding" />
            </Reveal>

            <Reveal show={activeStep >= 1}>
              <Node label="[0.2, -0.7, …]" square />
            </Reveal>

            <Reveal show={activeStep >= 2} className="qkv-cluster">
              <Arrow />
              <div className="qkv-nodes">
                <Node label="Q" />
                <Node label="K" />
                <Node label="V" />
              </div>
            </Reveal>

            <Reveal show={activeStep >= 3} className="attention-result">
              <Arrow label="attention" />
              <Node label="context" accent square />
            </Reveal>
          </div>
        </Diagram>
      )}
    </ScrollyStory>
  )
}
