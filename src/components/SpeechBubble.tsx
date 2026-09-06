import type { ReactNode } from 'react'

export function SpeechBubble({ children }: { children: ReactNode }) {
  return <div className="speech-bubble">{children}</div>
}
