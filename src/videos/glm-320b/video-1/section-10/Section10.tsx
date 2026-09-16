import { SectionRunner, runtimeSeconds } from '../../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'

/** Drop a track at `public/vo/10.mp3` and set it here. `docs/VOICE_OVER.md`. */
const VO: string | undefined = undefined

/** Script: `video-script/video-1/10-and-then-it-does-it-again.md` */
export default function Section10({
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
      section={10}
      label="And then it does the whole thing again"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
