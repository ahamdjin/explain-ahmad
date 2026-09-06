type GraphProps = {
  values: number[]
  labels?: string[]
}

export function Graph({ values, labels = [] }: GraphProps) {
  const max = Math.max(...values, 1)

  return (
    <div className="mini-graph" aria-label="bar graph">
      {values.map((value, index) => (
        <div className="graph-column" key={`${labels[index] ?? index}-${value}`}>
          <div className="graph-bar" style={{ height: `${(value / max) * 100}%` }} />
          <span>{labels[index] ?? index + 1}</span>
        </div>
      ))}
    </div>
  )
}
