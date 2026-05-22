import { useWindowStore } from '../../store/useWindowStore'
import { DesktopIcon } from './DesktopIcon'
import { IconAbout } from './icons/IconAbout'
import { IconFolder } from './icons/IconFolder'
import { IconMail } from './icons/IconMail'

const SIDEBAR_ICONS = [
  { id: 'about', label: 'About', Icon: IconAbout },
  { id: 'portfolio', label: 'Projects', Icon: IconFolder },
  { id: 'contact', label: 'Contact', Icon: IconMail },
] as const

export function DesktopSidebar() {
  const openWindow = useWindowStore((state) => state.openWindow)

  return (
    <aside className="absolute right-6 top-16 z-20 flex flex-col gap-2">
      {SIDEBAR_ICONS.map(({ id, label, Icon }) => (
        <DesktopIcon key={id} label={label} onOpen={() => openWindow(id)}>
          <Icon />
        </DesktopIcon>
      ))}
    </aside>
  )
}
