import { useState } from 'react'
import { GesturePager, useGesturePager } from '../../engine/GesturePager'
import { SceneDeck, SharedElement, useSceneDeck } from '../../engine/SceneDeck'
import { StoryButton } from '../../components/StoryButton'

const pagerSteps = [
  ['OBSERVE', 'The agent sees the task.', 'Inputs arrive: your goal, context, files, tools.'],
  ['THINK', 'It decides what matters next.', 'The scene changes completely instead of making you scroll through dead space.'],
  ['ACT', 'One tool gets called.', 'A single wheel gesture advances exactly one authored beat.'],
  ['VERIFY', 'The result comes back.', 'Then the agent checks whether the task is actually done.'],
] as const

function PagerChrome() {
  const { index, count, previous, next } = useGesturePager()
  return (
    <div className="nav-demo-controls">
      <StoryButton direction="back" onClick={previous} disabled={index === 0}>Back</StoryButton>
      <span>{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
      <StoryButton onClick={next} disabled={index === count - 1}>Continue</StoryButton>
    </div>
  )
}

function GestureStory() {
  return (
    <GesturePager className="agent-loop-pager">
      {pagerSteps.map(([eyebrow, title, body], index) => (
        <div className={`agent-loop-page agent-loop-page-${index + 1}`} key={eyebrow}>
          <div className="agent-loop-orbit" aria-hidden="true"><i /><i /><i /></div>
          <div className="agent-loop-copy">
            <p>{eyebrow}</p>
            <h2>{title}</h2>
            <span>{body}</span>
          </div>
          <div className="agent-loop-number">0{index + 1}</div>
          <PagerChrome />
        </div>
      ))}
    </GesturePager>
  )
}

const scenes = [
  { label: 'Prompt', copy: 'A request starts as one compact object.', accent: '01' },
  { label: 'Router', copy: 'The same object becomes the decision point.', accent: '02' },
  { label: 'Experts', copy: 'The layout changes, but the token keeps visual continuity.', accent: '03' },
  { label: 'Answer', copy: 'The object resolves into the final output.', accent: '04' },
]

function DeckScene({ sceneIndex }: { sceneIndex: number }) {
  const { index, count, previous, next } = useSceneDeck()
  const scene = scenes[sceneIndex]
  return (
    <div className={`transition-scene transition-scene-${sceneIndex + 1}`}>
      <div className="transition-scene-copy">
        <p>VIEW TRANSITION · {scene.accent}</p>
        <h3>{scene.label}</h3>
        <span>{scene.copy}</span>
      </div>
      <SharedElement name="travelling-token" className="travelling-token">
        <span>TOKEN</span>
        <strong>{scene.label}</strong>
      </SharedElement>
      <div className="transition-scene-actions">
        <StoryButton direction="back" onClick={previous} disabled={index === 0}>Previous</StoryButton>
        <StoryButton onClick={next} disabled={index === count - 1}>Next scene</StoryButton>
      </div>
    </div>
  )
}

function TransitionStory() {
  const [seed] = useState(0)
  return (
    <SceneDeck initialIndex={seed} className="transition-deck">
      {scenes.map((_, index) => <DeckScene key={index} sceneIndex={index} />)}
    </SceneDeck>
  )
}

export default function NavigationLabExample() {
  return (
    <section className="premium-pattern-page">
      <header className="pattern-heading">
        <p className="eyebrow">NAVIGATION SYSTEMS</p>
        <h2>Scroll when scroll helps. Step when a beat deserves control.</h2>
        <p>Hover the first stage and use a wheel/swipe. One gesture = one scene. The second stage uses buttons and browser-native shared-element transitions.</p>
      </header>
      <GestureStory />
      <TransitionStory />
    </section>
  )
}
