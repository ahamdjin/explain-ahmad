type ArrowProps = {
  label?: string
  direction?: 'right' | 'down'
}

export function Arrow({ label, direction = 'right' }: ArrowProps) {
  const isDown = direction === 'down'

  return (
    <div className={`arrow-wrap arrow-${direction}`}>
      {label && <span>{label}</span>}
      <svg viewBox="0 0 120 40" role="img" aria-label={label ?? 'arrow'}>
        <defs>
          <marker id="arrow-head" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill="currentColor" />
          </marker>
        </defs>
        {isDown ? (
          <line x1="60" y1="4" x2="60" y2="32" markerEnd="url(#arrow-head)" />
        ) : (
          <line x1="8" y1="20" x2="108" y2="20" markerEnd="url(#arrow-head)" />
        )}
      </svg>
    </div>
  )
}
