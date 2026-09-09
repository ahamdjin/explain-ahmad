import { SectionRunner, runtimeSeconds } from '../../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'

/**
 * The voice-over, once it exists. When a track is present it drives the beats
 * rather than the other way round, so a beat cannot drift out of sync with the
 * sentence it belongs to. Until then `secs` drives and this stays undefined.
 */
const VO: string | undefined = undefined
import './section-07.css'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'

/** Section 07 -- the answer. Script: video-script/07-the-answer.md */
export default function Section07({
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
      // Drop a track at public/vo/07.mp3 and it becomes the master clock.
      audioSrc={VO}
      label="Why the experts cannot just be loaded on demand"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
