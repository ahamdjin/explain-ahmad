import type { ReactNode } from 'react'
import { SceneController } from '../engine/SceneController'
import { useStep } from '../engine/StepController'

type ClickStoryProps = {
  title: string
  totalSteps: number
  children: (step: number) => ReactNode
}

function StoryBody({ children }: Pick<ClickStoryProps, 'children'>) {
  const { step } = useStep()
  return <>{children(step)}</>
}

export function ClickStory({ title, totalSteps, children }: ClickStoryProps) {
  return (
    <SceneController title={title} maxStep={Math.max(totalSteps - 1, 0)}>
      <StoryBody>{children}</StoryBody>
    </SceneController>
  )
}
