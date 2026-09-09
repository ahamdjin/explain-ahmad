import { useState } from 'react'
import { SectionRunner, runtimeSeconds } from '../../../paper'
import { BEATS } from './beats'
import { INITIAL, applyPatches, type Route } from './scene'
import { Stage } from './Stage'
import './section-05.css'
import '@fontsource/patrick-hand/400.css'
import '@fontsource/caveat/400.css'

/** Section 05. Script: video-script/05-new-numbers-new-team.md */
export default function Section05({ onFinish }: { onFinish?: () => void } = {}) {
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
