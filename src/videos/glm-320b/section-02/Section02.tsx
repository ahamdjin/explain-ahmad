import { SectionRunner, runtimeSeconds } from '../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import './section-02.css'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'

/** Section 02 -- follow one word in. Script: video-script/02-follow-one-word.md */
export default function Section02({ onFinish }: { onFinish?: () => void } = {}) {
  return (
    <SectionRunner
      beats={BEATS}
      initial={INITIAL}
      apply={applyPatches}
      onFinish={onFinish}
      label="What the router actually reads"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
