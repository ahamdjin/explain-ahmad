import type { ReactNode } from 'react'

export type ArtDirection = 'paper' | 'clean' | 'editorial' | 'technical'

type SceneFrameProps = {
  children: ReactNode
  art?: ArtDirection
  className?: string
  id?: string
}

export function SceneFrame({ children, art = 'paper', className = '', id }: SceneFrameProps) {
  return (
    <section id={id} className={`scene-frame ${className}`.trim()} data-art={art}>
      {children}
    </section>
  )
}

type VideoPageProps = {
  children: ReactNode
  className?: string
}

export function VideoPage({ children, className = '' }: VideoPageProps) {
  return <main className={`video-page ${className}`.trim()}>{children}</main>
}
