import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import './story-button.css'

type StoryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  direction?: 'next' | 'back' | 'choice'
  hint?: string
  emphasis?: 'quiet' | 'normal' | 'strong'
}

export function StoryButton({
  children,
  direction = 'next',
  hint,
  emphasis = 'normal',
  className = '',
  ...props
}: StoryButtonProps) {
  const icon = direction === 'back' ? '←' : direction === 'choice' ? '↗' : '→'

  return (
    <button
      {...props}
      className={`story-button story-button-${direction} ${className}`.trim()}
      data-emphasis={emphasis}
      data-has-hint={hint ? 'true' : undefined}
    >
      <span className="story-button-label">{children}</span>
      {hint && <small className="story-button-hint">{hint}</small>}
      <span className="story-button-icon" aria-hidden="true">{icon}</span>
    </button>
  )
}

type StoryIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  icon: ReactNode
  emphasis?: 'quiet' | 'normal'
}

export function StoryIconButton({
  label,
  icon,
  emphasis = 'quiet',
  className = '',
  ...props
}: StoryIconButtonProps) {
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      className={`story-icon-button ${className}`.trim()}
      data-emphasis={emphasis}
      aria-label={label}
      title={props.title ?? label}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  )
}
