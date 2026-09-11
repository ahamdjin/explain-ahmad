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
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'

/** Section 03. Script: video-script/video-1/04-where-the-numbers-change.md */
export default function Section04({
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
      // Drop a track at public/vo/04.mp3 and it becomes the master clock.
      audioSrc={VO}
      label="Why the same word gets different numbers"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
