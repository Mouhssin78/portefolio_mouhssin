import { useDesktopStore } from '../../store/useDesktopStore'
import type { DesktopApp } from '../../types/desktop'
import { getIconComponent } from './icons/iconMap'

interface MobileDesktopIconProps {
  app: DesktopApp
}

export function MobileDesktopIcon({ app }: MobileDesktopIconProps) {
  const openApp = useDesktopStore((state) => state.openApp)

  const isImageIcon =
    app.icon.startsWith('/') ||
    app.icon.startsWith('data:') ||
    app.icon.startsWith('http://') ||
    app.icon.startsWith('https://')
  const Icon = isImageIcon ? null : getIconComponent(app.icon)

  return (
    <button
      type="button"
      className="retro-icon-tile w-full touch-manipulation"
      onClick={() => openApp(app.id)}
    >
      {isImageIcon ? (
        <img src={app.icon} alt="" width={44} height={44} className="object-contain" draggable={false} />
      ) : (
        Icon && <Icon />
      )}
      <span className="retro-icon-label">{app.title}</span>
    </button>
  )
}
