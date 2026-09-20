import { SectionRunner, runtimeSeconds } from '../../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'

/**
 * Video 2, Section 01 — the hook.
 *
 * Script: `video-script/video-2/SCRIPT.md` → HOOK + INTRO (draft, not locked).
 * Board:  `storyboard/video-2/SECTION_01.md` — the detailed board, which
 *         supersedes the old B01–B07 pass in `STORYBOARD.md`.
 */
const VO: string | undefined = undefined

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
      section={1}
      label="The incident, then rewind"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
