import { SectionRunner, runtimeSeconds } from '../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import './section-07.css'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'

/** Section 07 -- the answer. Script: video-script/07-the-answer.md */
export default function Section07() {
  return (
    <SectionRunner
      beats={BEATS}
      initial={INITIAL}
      apply={applyPatches}
      label="Why the experts cannot just be loaded on demand"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
