import { type ReactNode, useEffect, useRef, useState } from 'react'

export type ScrollStep = {
  id: string
  eyebrow?: string
  title: string
  body: string
}

type ScrollControllerProps = {
  steps: ScrollStep[]
  renderVisual: (activeStep: number) => ReactNode
}

export function ScrollController({ steps, renderVisual }: ScrollControllerProps) {
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return
        const index = Number((visible.target as HTMLElement).dataset.stepIndex)
        if (!Number.isNaN(index)) setActiveStep(index)
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0.1, 0.35, 0.65] },
    )

    stepRefs.current.forEach((element) => element && observer.observe(element))
    return () => observer.disconnect()
  }, [steps.length])

  return (
    <section className="scrolly-layout">
      <div className="scrolly-visual-wrap">
        <div className="scrolly-visual">{renderVisual(activeStep)}</div>
      </div>

      <div className="scrolly-copy">
        {steps.map((step, index) => (
          <article
            key={step.id}
            ref={(element) => { stepRefs.current[index] = element }}
            data-step-index={index}
            className={activeStep === index ? 'scrolly-step is-active' : 'scrolly-step'}
          >
            <p className="eyebrow">{step.eyebrow ?? `STEP ${index + 1}`}</p>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
