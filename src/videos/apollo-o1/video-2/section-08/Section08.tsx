import { SectionRunner, runtimeSeconds } from '../../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'

/**
 * Video 2, Section 03 — the follow-up denial.
 *
 * Script: `video-script/video-2/SCRIPT.md` → 5 — "DO YOU KNOW HOW THIS HAPPENED?".
 * Board:  `storyboard/video-2/SECTION_08.md`.
 */
const VO: string | undefined = undefined

export default function Section08({
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
      section={8}
      label="Did it want to survive?"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
