import { useRef } from 'react'
import Draggable from 'react-draggable'
import { useCoarsePointer } from '../../hooks/useCoarsePointer'
import { useDesktopStore } from '../../store/useDesktopStore'
import type { DesktopApp } from '../../types/desktop'
import { getIconComponent } from './icons/iconMap'

const DRAG_THRESHOLD = 5

interface DraggableDesktopIconProps {
  app: DesktopApp
}

export function DraggableDesktopIcon({ app }: DraggableDesktopIconProps) {
  const isCoarsePointer = useCoarsePointer()
  const nodeRef = useRef<HTMLButtonElement>(null)
  const startPosRef = useRef({ x: 0, y: 0 })
  const wasDraggedRef = useRef(false)

  const openApp = useDesktopStore((state) => state.openApp)
  const updateIconPosition = useDesktopStore((state) => state.updateIconPosition)

  const isImageIcon =
    app.icon.startsWith('/') ||
    app.icon.startsWith('data:') ||
    app.icon.startsWith('http://') ||
    app.icon.startsWith('https://')
  const Icon = isImageIcon ? null : getIconComponent(app.icon)

  const handleOpen = () => {
    if (!wasDraggedRef.current) {
      openApp(app.id)
    }
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      position={app.position}
      bounds="parent"
      disabled={isCoarsePointer}
      onStart={(_, data) => {
        startPosRef.current = { x: data.x, y: data.y }
        wasDraggedRef.current = false
      }}
      onDrag={(_, data) => {
        const dx = Math.abs(data.x - startPosRef.current.x)
        const dy = Math.abs(data.y - startPosRef.current.y)
        if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
          wasDraggedRef.current = true
        }
      }}
      onStop={(_, data) => {
        updateIconPosition(app.id, data.x, data.y)
      }}
    >
      <button
        ref={nodeRef}
        type="button"
        className={`retro-icon-tile absolute left-0 top-0 ${isCoarsePointer ? 'touch-manipulation' : 'touch-none'}`}
        onDoubleClick={isCoarsePointer ? undefined : handleOpen}
        onClick={
          isCoarsePointer
            ? handleOpen
            : (event) => {
                event.currentTarget.focus()
              }
        }
      >
        {isImageIcon ? (
          <img src={app.icon} alt="" width={52} height={52} className="object-contain" draggable={false} />
        ) : (
          Icon && <Icon />
        )}
        <span className="retro-icon-label">{app.title}</span>
      </button>
    </Draggable>
  )
}
