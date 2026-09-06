import {
  createContext,
  type DragEvent,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

type DragContextValue = {
  activeId: string | null
  setActiveId: (id: string | null) => void
  onDropItem: (itemId: string, zoneId: string) => void
}

const DragContext = createContext<DragContextValue | null>(null)

export function DragGrid({
  children,
  onDrop,
  className = '',
}: {
  children: ReactNode
  onDrop: (itemId: string, zoneId: string) => void
  className?: string
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const value = useMemo(
    () => ({ activeId, setActiveId, onDropItem: onDrop }),
    [activeId, onDrop],
  )

  return (
    <DragContext.Provider value={value}>
      <div className={`drag-grid ${className}`.trim()}>{children}</div>
    </DragContext.Provider>
  )
}

function useDragGrid() {
  const context = useContext(DragContext)
  if (!context) throw new Error('Draggable and DropZone must be inside DragGrid')
  return context
}

export function Draggable({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  const { activeId, setActiveId } = useDragGrid()
  const dragging = activeId === id

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', id)
    setActiveId(id)
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={() => setActiveId(null)}
      className={`draggable ${dragging ? 'is-dragging' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

export function DropZone({
  id,
  children,
  className = '',
  active = false,
}: {
  id: string
  children: ReactNode
  className?: string
  active?: boolean
}) {
  const { activeId, setActiveId, onDropItem } = useDragGrid()
  const [over, setOver] = useState(false)

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const itemId = event.dataTransfer.getData('text/plain') || activeId
    if (itemId) onDropItem(itemId, id)
    setOver(false)
    setActiveId(null)
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      className={`drop-zone ${over ? 'is-over' : ''} ${active ? 'is-active' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
