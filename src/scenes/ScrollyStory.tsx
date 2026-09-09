import type { ReactNode } from 'react'
import { ScrollController, type ScrollStep } from '../engine/ScrollController'
import '../scrolly.css'

type ScrollyStoryProps = {
  title: string
  steps: ScrollStep[]
  children: (activeStep: number) => ReactNode
}

export function ScrollyStory({ title, steps, children }: ScrollyStoryProps) {
  return (
    <section className="scrolly-scene">
      <div className="scrolly-heading">
        <p className="scene-kicker">SCROLL STORY</p>
        <h2>{title}</h2>
      </div>
      <ScrollController steps={steps} renderVisual={children} />
    </section>
  )
}
