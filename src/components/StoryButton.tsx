import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type StoryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  direction?: 'next' | 'back' | 'choice'
  hint?: string
}

export function StoryButton({
  children,
  direction = 'next',
  hint,
  className = '',
  ...props
}: StoryButtonProps) {
  return (
    <button
      {...props}
      className={`story-button story-button-${direction} ${className}`.trim()}
    >
      <span>{children}</span>
      {hint && <small>{hint}</small>}
      <b aria-hidden="true">{direction === 'back' ? '←' : direction === 'choice' ? '↗' : '→'}</b>
    </button>
  )
}
