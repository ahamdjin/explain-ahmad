import { useEffect, useRef } from 'react'
import type { MotionValue } from 'motion/react'

type ScrollVideoProps = {
  src: string
  progress: MotionValue<number>
  className?: string
  poster?: string
  preload?: 'none' | 'metadata' | 'auto'
}

export function ScrollVideo({ src, progress, className = '', poster, preload = 'metadata' }: ScrollVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const durationRef = useRef(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const onMetadata = () => { durationRef.current = Number.isFinite(video.duration) ? video.duration : 0 }
    video.addEventListener('loadedmetadata', onMetadata)
    onMetadata()

    const unsubscribe = progress.on('change', (value) => {
      if (!durationRef.current) return
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        const nextTime = Math.max(0, Math.min(1, value)) * durationRef.current
        if (Math.abs(video.currentTime - nextTime) > 0.016) video.currentTime = nextTime
      })
    })

    return () => {
      video.removeEventListener('loadedmetadata', onMetadata)
      unsubscribe()
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [progress])

  return (
    <video
      ref={ref}
      className={`scroll-video ${className}`.trim()}
      src={src}
      poster={poster}
      preload={preload}
      muted
      playsInline
    />
  )
}
