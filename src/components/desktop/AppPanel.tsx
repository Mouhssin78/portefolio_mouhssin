import { useEffect, useLayoutEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import Draggable from 'react-draggable'
import { useDesktopStore } from '../../store/useDesktopStore'
import type { DesktopApp } from '../../types/desktop'
import { AboutPanel } from './panels/AboutPanel'
import { ContactPanel } from './panels/ContactPanel'
import { ProjectPanel } from './panels/ProjectPanel'

const PANEL_WIDTH_CLASS = 'w-[min(92vw,480px)]'

function PanelContent({ app }: { app: DesktopApp }) {
  switch (app.type) {
    case 'about':
      return <AboutPanel />
    case 'contact':
      return <ContactPanel />
    case 'project':
      if (!app.project) return null
      return <ProjectPanel project={app.project} />
    default:
      return null
  }
}

interface PanelWindowChromeProps {
  app: DesktopApp
  isMaximized: boolean
  onClose: () => void
  onToggleMaximize: () => void
}

function PanelWindowChrome({
  app,
  isMaximized,
  onClose,
  onToggleMaximize,
}: PanelWindowChromeProps) {
  return (
    <>
      <div className="retro-window-titlebar">
        <div className="retro-window-controls" aria-hidden="true">
          <span className="retro-window-control" />
          <span className="retro-window-control" />
        </div>
        <span id="app-panel-title">{app.title}</span>
        <div className="retro-window-controls-right">
          <button
            type="button"
            className="retro-maximize-btn"
            aria-label={isMaximized ? 'Réduire' : 'Agrandir'}
            onClick={(event) => {
              event.stopPropagation()
              onToggleMaximize()
            }}
          >
            {isMaximized ? '⤢' : '□'}
          </button>
          <button
            type="button"
            className="retro-close-btn"
            aria-label="Fermer"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>

      <div
        className={
          isMaximized
            ? 'retro-window-content retro-window-body p-6'
            : 'retro-window-body max-h-[60vh] overflow-y-auto p-6'
        }
      >
        <PanelContent app={app} />
      </div>
    </>
  )
}

interface PanelWindowProps extends ComponentPropsWithoutRef<'div'> {
  app: DesktopApp
  isMaximized: boolean
  panelRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
  onToggleMaximize: () => void
}

function PanelWindow({
  app,
  isMaximized,
  panelRef,
  onClose,
  onToggleMaximize,
  className,
  style,
  ...rest
}: PanelWindowProps) {
  const shellClass = isMaximized
    ? 'retro-window pointer-events-auto retro-window--maximized'
    : `retro-window pointer-events-auto absolute left-0 top-0 ${PANEL_WIDTH_CLASS}`

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-panel-title"
      className={className ? `${shellClass} ${className}` : shellClass}
      style={style}
      {...rest}
    >
      <PanelWindowChrome
        app={app}
        isMaximized={isMaximized}
        onClose={onClose}
        onToggleMaximize={onToggleMaximize}
      />
    </div>
  )
}

export function AppPanel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const activeAppId = useDesktopStore((state) => state.activeAppId)
  const panelState = useDesktopStore((state) => state.panelState)
  const closeApp = useDesktopStore((state) => state.closeApp)
  const getAppById = useDesktopStore((state) => state.getAppById)
  const setPanelPosition = useDesktopStore((state) => state.setPanelPosition)
  const togglePanelMaximize = useDesktopStore((state) => state.togglePanelMaximize)

  const { position, isMaximized } = panelState
  const app = activeAppId ? getAppById(activeAppId) : undefined

  useLayoutEffect(() => {
    if (!activeAppId || isMaximized || !containerRef.current || !panelRef.current) return

    const container = containerRef.current
    const panel = panelRef.current

    setPanelPosition(
      Math.max(0, (container.clientWidth - panel.offsetWidth) / 2),
      Math.max(0, (container.clientHeight - panel.offsetHeight) / 2),
    )
  }, [activeAppId, isMaximized, setPanelPosition])

  useEffect(() => {
    if (!app) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeApp()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [app, closeApp])

  if (!app || app.type === 'external') return null

  const panelProps = {
    app,
    isMaximized,
    panelRef,
    onClose: closeApp,
    onToggleMaximize: togglePanelMaximize,
  }

  const draggableShellClass = `retro-window pointer-events-auto absolute left-0 top-0 ${PANEL_WIDTH_CLASS}`

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-30">
      {isMaximized ? (
        <PanelWindow {...panelProps} />
      ) : (
        <Draggable
          nodeRef={panelRef}
          position={position}
          handle=".retro-window-titlebar"
          cancel="button"
          bounds="parent"
          onDrag={(_, data) => setPanelPosition(data.x, data.y)}
          onStop={(_, data) => setPanelPosition(data.x, data.y)}
        >
          <div
            ref={panelRef}
            className={draggableShellClass}
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-panel-title"
          >
            <PanelWindowChrome
              app={app}
              isMaximized={false}
              onClose={closeApp}
              onToggleMaximize={togglePanelMaximize}
            />
          </div>
        </Draggable>
      )}
    </div>
  )
}
