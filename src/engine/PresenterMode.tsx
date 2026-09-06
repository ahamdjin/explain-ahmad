import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type PresenterContextValue = {
  presenting: boolean
  toggle: () => void
  setPresenting: (value: boolean) => void
  toggleFullscreen: () => void
}

const PresenterContext = createContext<PresenterContextValue | null>(null)

function initialPresenterState() {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('present') === '1'
}

export function PresenterMode({ children }: { children: ReactNode }) {
  const [presenting, setPresenting] = useState(initialPresenterState)

  const toggle = () => setPresenting((value) => !value)
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen()
    } else {
      void document.exitFullscreen()
    }
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return

      if (event.key.toLowerCase() === 'p') {
        event.preventDefault()
        toggle()
      }

      if (event.key.toLowerCase() === 'f' && presenting) {
        event.preventDefault()
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [presenting])

  useEffect(() => {
    document.body.dataset.presenter = presenting ? 'true' : 'false'
    return () => {
      delete document.body.dataset.presenter
    }
  }, [presenting])

  const value = useMemo(
    () => ({ presenting, toggle, setPresenting, toggleFullscreen }),
    [presenting],
  )

  return (
    <PresenterContext.Provider value={value}>
      <div className={presenting ? 'presenter-mode is-presenting' : 'presenter-mode'}>
        {children}
      </div>
    </PresenterContext.Provider>
  )
}

export function usePresenterMode() {
  const context = useContext(PresenterContext)
  if (!context) throw new Error('usePresenterMode must be used inside PresenterMode')
  return context
}

export function PresenterControls() {
  const { presenting, toggle, toggleFullscreen } = usePresenterMode()

  return (
    <div className="presenter-controls">
      <button onClick={toggle}>{presenting ? 'Exit presenter' : 'Presenter mode'}</button>
      <button onClick={toggleFullscreen}>Fullscreen</button>
      <span>P presenter · F fullscreen</span>
    </div>
  )
}
