import { INK, expertColor } from '../ink'
import { PALETTE } from '../palette'

/**
 * One routed expert, drawn as a person.
 *
 * Same construction everywhere so the population reads as one family. Identity
 * is a number, never a job title -- real MoE experts are not interpretable
 * specialists, and labelling one "the maths expert" would be a lie the rest of
 * the video has to walk back. See art-direction/GLM_PAPER_WORLD.md §7.
 */
export function Specialist({
  index = 0,
  size = 64,
  asleep = false,
  dimmed = false,
  lit = false,
  label,
}: {
  index?: number
  size?: number
  asleep?: boolean
  dimmed?: boolean
  lit?: boolean
  label?: string
}) {
  return (
    <div
      className="s1-spec"
      data-dimmed={dimmed ? 'true' : undefined}
      data-lit={lit ? 'true' : undefined}
      style={{ '--size': `${size}px` } as React.CSSProperties}
    >
      <svg viewBox="0 0 40 52" aria-hidden="true">
        {lit ? <rect x="1" y="1" width="38" height="34" rx="11" fill={PALETTE.paperWhite} stroke={INK} strokeWidth="1.6" /> : null}
        <g stroke={INK} strokeWidth="2.1" strokeLinecap="round">
          <path d="M14 33v10" />
          <path d="M26 33v10" />
        </g>
        {/* `dimmed` also serves the always-on shared expert: neutral fill and a
            dashed edge, because it is not one of the eight and must not read
            as a member of the family. */}
        <rect
          x="5"
          y="3"
          width="30"
          height="30"
          rx="9"
          fill={dimmed ? PALETTE.idle : expertColor(index)}
          stroke={INK}
          strokeWidth="2.2"
          strokeDasharray={dimmed ? '5 4' : undefined}
        />
        {asleep ? (
          <g stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.7">
            <path d="M12 17h6" />
            <path d="M22 17h6" />
          </g>
        ) : (
          <g fill={INK}>
            <circle cx="15" cy="16" r="2.3" />
            <circle cx="25" cy="16" r="2.3" />
          </g>
        )}
        {label ? (
          <text x="20" y="49" textAnchor="middle" className="s1-spec-id" fill={INK}>
            {label}
          </text>
        ) : null}
      </svg>
    </div>
  )
}
