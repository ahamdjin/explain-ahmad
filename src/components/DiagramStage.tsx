import type { HTMLAttributes, ReactNode } from 'react'

type DiagramStageProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

/**
 * Diagram-first canvas. No card, toolbar, chrome or decorative shell.
 * The explanation should feel like the visual itself, not a website around it.
 */
export function DiagramStage({ children, className = '', ...props }: DiagramStageProps) {
  return (
    <div {...props} className={`diagram-stage ${className}`.trim()}>
      {children}
    </div>
  )
}

type DiagramLabelProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
}

export function DiagramLabel({ children, className = '', ...props }: DiagramLabelProps) {
  return (
    <span {...props} className={`diagram-label ${className}`.trim()}>
      {children}
    </span>
  )
}

type StoryNoteProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode
}

/** Small narration that supports the diagram rather than competing with it. */
export function StoryNote({ children, className = '', ...props }: StoryNoteProps) {
  return (
    <p {...props} className={`story-note ${className}`.trim()}>
      {children}
    </p>
  )
}
