import type { ReactNode } from 'react'
import { StepController, useStep } from './StepController'

type SceneControllerProps = {
  title: string
  maxStep: number
  children: ReactNode
  keyboard?: boolean
}

function SceneChrome({ title, children }: { title: string; children: ReactNode }) {
  const { step, maxStep, next, previous, reset } = useStep()

  return (
    <section className="scene-controller">
      <div className="scene-topbar">
        <div>
          <p className="scene-kicker">CLICK STORY</p>
          <h2>{title}</h2>
        </div>
        <div className="step-readout">{step + 1} / {maxStep + 1}</div>
      </div>

      <div className="scene-stage" onClick={next} role="presentation">
        {children}
      </div>

      <div className="scene-controls">
        <button onClick={previous} disabled={step === 0}>← Previous</button>
        <button onClick={reset}>Reset</button>
        <button onClick={next} disabled={step === maxStep}>Next →</button>
      </div>
      <p className="scene-shortcut">Space / → next · ← previous · Home reset</p>
    </section>
  )
}

export function SceneController({
  title,
  maxStep,
  children,
  keyboard = true,
}: SceneControllerProps) {
  return (
    <StepController maxStep={maxStep} keyboard={keyboard}>
      <SceneChrome title={title}>{children}</SceneChrome>
    </StepController>
  )
}
