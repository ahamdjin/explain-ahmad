import { SectionRunner, runtimeSeconds } from '../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'

/**
 * The voice-over, once it exists. When a track is present it drives the beats
 * rather than the other way round, so a beat cannot drift out of sync with the
 * sentence it belongs to. Until then `secs` drives and this stays undefined.
 *
 * Drop a track at `public/vo/01.mp3` and set it here. `docs/VOICE_OVER.md`.
 */
const VO: string | undefined = undefined

/** Script: `video-script/01-what-18-billion-active-means.md` */
export default function Section01({
  onFinish,
  autoplay,
}: { onFinish?: () => void; autoplay?: boolean } = {}) {
  return (
    <SectionRunner
      beats={BEATS}
      initial={INITIAL}
      apply={applyPatches}
      onFinish={onFinish}
      autoplay={autoplay}
      audioSrc={VO}
      label="What does 18 billion active actually mean?"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
