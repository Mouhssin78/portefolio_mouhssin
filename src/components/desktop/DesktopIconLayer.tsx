import { useCoarsePointer } from '../../hooks/useCoarsePointer'
import { useDesktopStore } from '../../store/useDesktopStore'
import { DraggableDesktopIcon } from './DraggableDesktopIcon'
import { MobileDesktopIcon } from './MobileDesktopIcon'

export function DesktopIconLayer() {
  const isCoarsePointer = useCoarsePointer()
  const apps = useDesktopStore((state) => state.apps)

  if (isCoarsePointer) {
    return (
      <div className="absolute inset-0 z-20 overflow-y-auto overscroll-contain px-2 pb-28 pt-2">
        <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-5">
          {apps.map((app) => (
            <MobileDesktopIcon key={app.id} app={app} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-20">
      {apps.map((app) => (
        <DraggableDesktopIcon key={app.id} app={app} />
      ))}
    </div>
  )
}
