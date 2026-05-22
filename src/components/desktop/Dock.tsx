import type { ReactNode } from 'react'
import { useWindowStore } from '../../store/useWindowStore'

interface DockIconShapeProps {
  className?: string
  style?: React.CSSProperties
  children?: ReactNode
}

function DockIconShape({ className, style, children }: DockIconShapeProps) {
  return (
    <div
      className={`retro-border flex h-10 w-10 items-center justify-center ${className ?? ''}`}
      style={style}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}

interface DockIconProps {
  label: string
  appId?: string
  onClick?: () => void
  children: ReactNode
}

function DockIcon({ label, appId, onClick, children }: DockIconProps) {
  const openWindow = useWindowStore((state) => state.openWindow)
  const closeAll = useWindowStore((state) => state.closeAll)

  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    if (appId === 'home') {
      closeAll()
      return
    }
    if (appId && appId !== 'trash') openWindow(appId)
  }

  return (
    <button type="button" className="retro-dock-item" onClick={handleClick} title={label}>
      {children}
      <span className="retro-dock-item-label">{label}</span>
    </button>
  )
}

export function Dock() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center pb-3">
      <div className="flex items-end gap-1 px-4 sm:gap-2">
        <DockIcon label="Home" appId="home">
          <DockIconShape className="rounded-full bg-[var(--color-retro-black)]" />
        </DockIcon>
        <DockIcon label="Mail" appId="contact">
          <DockIconShape className="bg-[var(--color-retro-yellow)]">
            <div className="h-0 w-0 border-x-[8px] border-b-[6px] border-x-transparent border-b-[var(--color-retro-black)]" />
          </DockIconShape>
        </DockIcon>
        <DockIcon label="Projects" appId="portfolio">
          <DockIconShape className="rounded-full bg-[#e85555]" />
        </DockIcon>
        <DockIcon label="About" appId="about">
          <DockIconShape className="rounded-full bg-[var(--color-retro-blue)]">
            <div className="h-3 w-3 rounded-full border-2 border-[var(--color-retro-black)] bg-white" />
          </DockIconShape>
        </DockIcon>
        <DockIcon label="Settings" appId="settings">
          <DockIconShape className="bg-[var(--color-retro-grey)]">
            <div className="h-3 w-3 rounded-full border-2 border-[var(--color-retro-black)]" />
          </DockIconShape>
        </DockIcon>
        <DockIcon label="Trash" appId="trash">
          <DockIconShape className="bg-[var(--color-retro-mint)]" />
        </DockIcon>
      </div>
      <div className="retro-dock-shelf mt-1 w-[min(90vw,520px)]" aria-hidden="true" />
    </footer>
  )
}
