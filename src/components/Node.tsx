import type { ReactNode } from 'react'

type NodeProps = {
  label: ReactNode
  accent?: boolean
  muted?: boolean
  square?: boolean
}

export function Node({ label, accent = false, muted = false, square = false }: NodeProps) {
  const classes = ['node', accent ? 'is-accent' : '', muted ? 'is-muted' : '', square ? 'is-square' : '']
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{label}</div>
}
