import { type CSSProperties } from 'react'
import { type Beat } from './director'

/**
 * Getting to a beat, and getting to a section.
 *
 * These exist to make the piece **reviewable**. Watching 164 beats in order to
 * reach the one you want to talk about is not review, it is endurance — and a
 * fault nobody can point at does not get fixed.
 *
 * So they are deliberately quiet. Both rails sit at 22% opacity until the
 * pointer is near them, because this is scaffolding for the people making the
 * video and not part of the video. `chrome=0` removes them for a recording.
 *
 * Every element is `data-no-advance`, or clicking a tick would also advance the
 * beat and you could never land on the one you aimed at.
 */

/** One tick per beat of the current section. */
export function BeatRail<P>({
  beats,
  index,
  onPick,
}: {
  beats: Beat<P>[]
  index: number
  onPick: (next: number) => void
}) {
  return (
    <div className="s1-rail" data-no-advance>
      {beats.map((beat, i) => (
        <button
          key={beat.id}
          type="button"
          className="s1-rail-tick"
          data-now={i === index ? 'true' : undefined}
          /* Width in proportion to the beat's own length, so the rail is a
           * timeline rather than a row of equal boxes. A long beat should look
           * long — that is half of what makes the rail readable at a glance. */
          style={{ '--w': `${beat.secs}` } as CSSProperties}
          onClick={() => onPick(i)}
          title={`${beat.n}. ${beat.title} — ${beat.secs}s`}
          aria-label={`Beat ${beat.n}: ${beat.title}`}
        >
          <span>{beat.n}</span>
        </button>
      ))}
    </div>
  )
}

/** One dot per section. Only `/watch` has more than one, so only it shows these. */
export function ChapterDots({
  count,
  index,
  labels,
  onPick,
}: {
  count: number
  index: number
  labels: string[]
  onPick: (next: number) => void
}) {
  return (
    <div className="s1-dots" data-no-advance>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          className="s1-dot"
          data-now={i === index ? 'true' : undefined}
          data-seen={i < index ? 'true' : undefined}
          onClick={() => onPick(i)}
          title={`${i + 1}. ${labels[i] ?? ''}`}
          aria-label={`Section ${i + 1}: ${labels[i] ?? ''}`}
          aria-current={i === index ? 'true' : undefined}
        >
          <i aria-hidden="true" />
          <em>{i + 1}</em>
        </button>
      ))}
    </div>
  )
}
