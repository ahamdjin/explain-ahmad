import { useState } from 'react'
import { SectionRunner, runtimeSeconds } from '../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches, type Route } from './scene'
import { Stage } from './Stage'

/**
 * The voice-over, once it exists. When a track is present it drives the beats
 * rather than the other way round, so a beat cannot drift out of sync with the
 * sentence it belongs to. Until then `secs` drives and this stays undefined.
 */
const VO: string | undefined = undefined
import './section-05.css'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'

/** Section 05. Script: video-script/05-new-numbers-new-team.md */
export default function Section05({
  onFinish,
  autoplay,
}: { onFinish?: () => void; autoplay?: boolean } = {}) {
  /* The viewer's choice lives here, outside the beat state, because it is
   * theirs -- stepping back a beat should not undo what they picked. */
  const [route, setRoute] = useState<Route>('barked')
  const [picked, setPicked] = useState(false)

  return (
    <SectionRunner
      beats={BEATS}
      initial={INITIAL}
      apply={applyPatches}
      onFinish={onFinish}
      autoplay={autoplay}
      // Drop a track at public/vo/05.mp3 and it becomes the master clock.
      audioSrc={VO}
      label="How the router chooses which experts run"
    >
      {(scene, feel) => (
        <Stage
          scene={scene}
          feel={feel}
          route={route}
          picked={picked}
          onPick={(next) => {
            setRoute(next)
            setPicked(true)
          }}
        />
      )}
    </SectionRunner>
  )
}

export const RUNTIME_SECONDS = runtimeSeconds(BEATS)
