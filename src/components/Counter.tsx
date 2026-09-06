type CounterProps = {
  label: string
  value: number | string
  suffix?: string
}

export function Counter({ label, value, suffix = '' }: CounterProps) {
  return (
    <div className="counter">
      <span>{label}</span>
      <strong>{value}{suffix}</strong>
    </div>
  )
}
