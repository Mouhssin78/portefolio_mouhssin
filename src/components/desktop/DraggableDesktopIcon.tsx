import { useRef } from 'react'
import Draggable from 'react-draggable'
import { useDesktopStore } from '../../store/useDesktopStore'
import type { DesktopApp } from '../../types/desktop'
import { getIconComponent } from './icons/iconMap'

const DRAG_THRESHOLD = 5

interface DraggableDesktopIconProps {
  app: DesktopApp
}

export function DraggableDesktopIcon({ app }: DraggableDesktopIconProps) {
  const nodeRef = useRef<HTMLButtonElement>(null)
  const startPosRef = useRef({ x: 0, y: 0 })
  const wasDraggedRef = useRef(false)

  const openApp = useDesktopStore((state) => state.openApp)
  const updateIconPosition = useDesktopStore((state) => state.updateIconPosition)

  const Icon = getIconComponent(app.icon)

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
        className="retro-icon-tile absolute left-0 top-0 touch-none"
        onDoubleClick={handleOpen}
        onClick={(event) => {
          if (window.matchMedia('(pointer: coarse)').matches) handleOpen()
          event.currentTarget.focus()
        }}
      >
        <Icon />
        <span className="retro-icon-label">{app.title}</span>
      </button>
    </Draggable>
  )
}
