import { SectionRunner, runtimeSeconds } from '../../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches } from './scene'
import { Stage } from './Stage'
import '@fontsource/patrick-hand/400.css'

/**
 * Video 2, Section 01 — the hook.
 *
 * Script: `video-script/video-2/SCRIPT.md` → HOOK (draft, not locked).
 * Board:  `storyboard/video-2/STORYBOARD.md` → B01–B07.
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
      label="It replaced its replacement"
    >
      {(scene, feel) => <Stage scene={scene} feel={feel} />}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
