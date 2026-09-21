import { SectionRunner, runtimeSeconds } from '../../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'

/**
 * Video 2, Section 03 — the technical trail.
 *
 * Script: `video-script/video-2/SCRIPT.md` → 2 — THE TECHNICAL TRAIL.
 * Board:  `storyboard/video-2/SECTION_03.md`.
 */
const VO: string | undefined = undefined

export default function Section03({
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
      section={3}
      label="The technical trail"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
