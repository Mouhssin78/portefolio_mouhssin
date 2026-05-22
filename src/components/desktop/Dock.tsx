import type { ReactNode } from 'react'
import homeIcon from '@images/home.png'
import restoreIcon from '@images/restore.png'
import aboutIcon from '@images/about.png'
import projectsIcon from '@images/projects.png'
import { useDesktopStore } from '../../store/useDesktopStore'
import { DockSettingsIcon } from './DockSettingsIcon'

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

function DockImageIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <DockIconShape className="bg-[var(--color-retro-yellow)]">
      <img src={src} alt={alt} className="h-7 w-7 object-contain" draggable={false} />
    </DockIconShape>
  )
}

interface DockIconProps {
  label: string
  appId?: string
  onClick?: () => void
  children: ReactNode
}

function DockIcon({ label, appId, onClick, children }: DockIconProps) {
  const openApp = useDesktopStore((state) => state.openApp)
  const resetDesktop = useDesktopStore((state) => state.resetDesktop)

  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    if (appId === 'home') {
      resetDesktop()
      return
    }
    if (appId) openApp(appId)
  }

  return (
    <button type="button" className="retro-dock-item" onClick={handleClick} title={label}>
      {children}
      <span className="retro-dock-item-label">{label}</span>
    </button>
  )
}

export function Dock() {
  const firstProjectId = useDesktopStore((state) =>
    state.apps.find((app) => app.type === 'project')?.id,
  )
  const resetIconPositions = useDesktopStore((state) => state.resetIconPositions)

  return (
    <footer className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center pb-3">
      <div className="flex items-end gap-1 px-4 sm:gap-2">
        <DockIcon label="Home" appId="home">
          <DockImageIcon src={homeIcon} alt="" />
        </DockIcon>
        <DockIcon label="Restore" onClick={() => resetIconPositions()}>
          <DockImageIcon src={restoreIcon} alt="" />
        </DockIcon>
        {firstProjectId && (
          <DockIcon label="Projects" appId={firstProjectId}>
            <DockImageIcon src={projectsIcon} alt="" />
          </DockIcon>
        )}
        <DockIcon label="About" appId="about">
          <DockImageIcon src={aboutIcon} alt="" />
        </DockIcon>
        <DockIcon label="LinkedIn" appId="linkedin">
          <DockIconShape className="bg-[var(--color-retro-yellow)] text-[10px] font-extrabold">
            in
          </DockIconShape>
        </DockIcon>
        <DockSettingsIcon />
      </div>
      <div className="retro-dock-shelf mt-1 w-[min(90vw,520px)]" aria-hidden="true" />
    </footer>
  )
}
