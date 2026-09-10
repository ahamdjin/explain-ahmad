import { SectionRunner, runtimeSeconds } from '../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'

/** Drop a track at `public/vo/11.mp3` and set it here. `docs/VOICE_OVER.md`. */
const VO: string | undefined = undefined

/** Script: `video-script/11-could-you-store-only-the-18.md` */
export default function Section11({
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
      label="So could you store only the 18 billion?"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
