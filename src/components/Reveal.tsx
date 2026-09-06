import type { ReactNode } from 'react'

type RevealProps = {
  show: boolean
  children: ReactNode
  className?: string
}

export function Reveal({ show, children, className = '' }: RevealProps) {
  return (
    <div className={`reveal ${show ? 'is-visible' : ''} ${className}`.trim()} aria-hidden={!show}>
      {children}
    </div>
  )
}
