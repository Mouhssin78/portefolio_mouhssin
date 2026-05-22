import { useDesktopStore } from '../../store/useDesktopStore'
import { DraggableDesktopIcon } from './DraggableDesktopIcon'

export function DesktopIconLayer() {
  const apps = useDesktopStore((state) => state.apps)

  return (
    <div className="absolute inset-0 z-20">
      {apps.map((app) => (
        <DraggableDesktopIcon key={app.id} app={app} />
      ))}
    </div>
  )
}
