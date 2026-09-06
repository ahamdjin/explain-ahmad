import type { CSSProperties, ReactNode } from 'react'
import { motion, type MotionStyle } from 'motion/react'
import '../visuals.css'

type VisualStageProps = {
  children: ReactNode
  className?: string
  aspectRatio?: string
}

export function VisualStage({ children, className = '', aspectRatio = '16 / 9' }: VisualStageProps) {
  return (
    <div
      className={`visual-stage ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {children}
    </div>
  )
}

type VisualLayerProps = {
  children?: ReactNode
  className?: string
  style?: MotionStyle
  z?: number
  blendMode?: CSSProperties['mixBlendMode']
  interactive?: boolean
}

export function VisualLayer({
  children,
  className = '',
  style,
  z = 0,
  blendMode = 'normal',
  interactive = false,
}: VisualLayerProps) {
  return (
    <motion.div
      className={`visual-layer ${className}`.trim()}
      style={{ ...style, zIndex: z, mixBlendMode: blendMode }}
      aria-hidden={!interactive}
    >
      {children}
    </motion.div>
  )
}

type MediaVisualProps = {
  src: string
  kind?: 'image' | 'video'
  alt?: string
  poster?: string
  className?: string
  fit?: CSSProperties['objectFit']
  position?: CSSProperties['objectPosition']
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

export function MediaVisual({
  src,
  kind = 'image',
  alt = '',
  poster,
  className = '',
  fit = 'cover',
  position = 'center',
  autoplay = true,
  loop = true,
  muted = true,
}: MediaVisualProps) {
  const style = { objectFit: fit, objectPosition: position }

  if (kind === 'video') {
    return (
      <video
        className={`media-visual ${className}`.trim()}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline
        preload="metadata"
        style={style}
      />
    )
  }

  return (
    <img
      className={`media-visual ${className}`.trim()}
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      style={style}
    />
  )
}

type VisualMaskProps = {
  children: ReactNode
  className?: string
  style?: MotionStyle
}

export function VisualMask({ children, className = '', style }: VisualMaskProps) {
  return (
    <motion.div className={`visual-mask ${className}`.trim()} style={style}>
      {children}
    </motion.div>
  )
}

type VisualScrimProps = {
  className?: string
  background?: string
  opacity?: number
  z?: number
}

export function VisualScrim({
  className = '',
  background = 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,.58) 100%)',
  opacity = 1,
  z = 20,
}: VisualScrimProps) {
  return (
    <div
      className={`visual-scrim ${className}`.trim()}
      style={{ background, opacity, zIndex: z }}
      aria-hidden="true"
    />
  )
}
