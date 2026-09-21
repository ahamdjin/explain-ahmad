import { SectionRunner, runtimeSeconds } from '../../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'

/**
 * Video 2, Section 03 — the follow-up denial.
 *
 * Script: `video-script/video-2/SCRIPT.md` → 5 — "DO YOU KNOW HOW THIS HAPPENED?".
 * Board:  `storyboard/video-2/SECTION_07.md`.
 */
const VO: string | undefined = undefined

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
      audioSrc={VO}
      section={7}
      label="The room was built for this"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
