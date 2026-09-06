type CharacterProps = {
  name: string
  mood?: 'happy' | 'neutral' | 'sad'
  shape?: 'circle' | 'triangle'
  small?: boolean
}

const faces = {
  happy: '◕‿◕',
  neutral: '•ᴗ•',
  sad: '◕︵◕',
}

export function Character({ name, mood = 'neutral', shape = 'circle', small = false }: CharacterProps) {
  return (
    <div className={`character character-${shape} ${small ? 'is-small' : ''}`}>
      <div className="character-face">{faces[mood]}</div>
      {!small && <strong>{name}</strong>}
    </div>
  )
}
