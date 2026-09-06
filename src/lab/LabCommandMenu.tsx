import { Command } from 'cmdk'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { usePresenterMode } from '../engine/PresenterMode'
import { labDemos } from './demoRegistry'

function isTypingTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null
  if (!element) return false
  return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.isContentEditable
}

export function LabCommandMenu({ currentDemo }: { currentDemo: string }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { presenting, toggle, toggleFullscreen } = usePresenterMode()

  useEffect(() => {
    if (presenting) setOpen(false)
  }, [presenting])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (presenting || isTypingTarget(event.target)) return

      const commandK = event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)
      const labKey = event.key.toLowerCase() === 'l' && !event.metaKey && !event.ctrlKey && !event.altKey

      if (!commandK && !labKey) return
      event.preventDefault()
      setOpen((value) => !value)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [presenting])

  const run = (action: () => void) => {
    setOpen(false)
    requestAnimationFrame(action)
  }

  return (
    <Command.Dialog
      open={!presenting && open}
      onOpenChange={setOpen}
      label="Explainer lab commands"
      loop
      overlayClassName="lab-command-overlay"
      contentClassName="lab-command-dialog"
    >
      <div className="lab-command-heading">
        <div>
          <span>EXPLAIN LAB</span>
          <strong>{labDemos.find((demo) => demo.id === currentDemo)?.label ?? currentDemo}</strong>
        </div>
        <kbd>Esc</kbd>
      </div>

      <Command.Input autoFocus placeholder="Switch demo or run a lab command…" className="lab-command-input" />

      <Command.List className="lab-command-list" label="Lab commands">
        <Command.Empty className="lab-command-empty">No matching command.</Command.Empty>

        <Command.Group heading="Demos" className="lab-command-group">
          {labDemos.map((demo) => (
            <Command.Item
              key={demo.id}
              value={`${demo.label} ${demo.hint}`}
              keywords={[...demo.keywords]}
              className="lab-command-item"
              data-current={demo.id === currentDemo ? 'true' : undefined}
              onSelect={() => run(() => navigate(`/lab/${demo.id}`))}
            >
              <div>
                <strong>{demo.label}</strong>
                <span>{demo.hint}</span>
              </div>
              {demo.id === currentDemo && <small>Current</small>}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Separator className="lab-command-separator" />

        <Command.Group heading="Lab" className="lab-command-group">
          <Command.Item className="lab-command-item" value="Back to library" keywords={['home', 'index']} onSelect={() => run(() => navigate('/'))}>
            <div><strong>Back to library</strong><span>Return to the module index</span></div>
            <small>↵</small>
          </Command.Item>
          <Command.Item className="lab-command-item" value="Presenter mode" keywords={['present', 'record', 'clean']} onSelect={() => run(toggle)}>
            <div><strong>Enter presenter mode</strong><span>Hide all lab chrome for recording</span></div>
            <small>P</small>
          </Command.Item>
          <Command.Item className="lab-command-item" value="Fullscreen" keywords={['screen', 'record']} onSelect={() => run(toggleFullscreen)}>
            <div><strong>Toggle fullscreen</strong><span>Use the browser viewport as the stage</span></div>
            <small>F</small>
          </Command.Item>
        </Command.Group>
      </Command.List>

      <div className="lab-command-footer">
        <span>↑ ↓ navigate</span>
        <span>Enter choose</span>
        <span>L / ⌘K reopen</span>
      </div>
    </Command.Dialog>
  )
}
