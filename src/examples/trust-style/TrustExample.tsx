import { Arrow } from '../../components/Arrow'
import { Character } from '../../components/Character'
import { Counter } from '../../components/Counter'
import { Reveal } from '../../components/Reveal'
import { SpeechBubble } from '../../components/SpeechBubble'
import { ClickStory } from '../../scenes/ClickStory'

export default function TrustExample() {
  return (
    <ClickStory title="Cooperation changes the score" totalSteps={4}>
      {(step) => (
        <div className="trust-demo">
          <div className="trust-person">
            <Character name="Alex" mood={step >= 2 ? 'happy' : 'neutral'} />
            <Reveal show={step >= 1} className="bubble-slot">
              <SpeechBubble>I’ll cooperate.</SpeechBubble>
            </Reveal>
          </div>

          <Reveal show={step >= 2} className="trust-action">
            <Arrow label="cooperates" />
          </Reveal>

          <div className="trust-person">
            <Character name="Sam" mood={step >= 2 ? 'happy' : 'neutral'} />
            <Reveal show={step >= 3} className="bubble-slot">
              <SpeechBubble>That helped both of us.</SpeechBubble>
            </Reveal>
          </div>

          <div className="trust-scoreboard">
            <Counter label="Alex" value={step >= 2 ? 1 : 0} />
            <Counter label="Sam" value={step >= 2 ? 1 : 0} />
          </div>
        </div>
      )}
    </ClickStory>
  )
}
