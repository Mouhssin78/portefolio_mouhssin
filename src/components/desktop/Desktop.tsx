import { useState } from 'react'
import { useWindowStore } from '../../store/useWindowStore'
import { DesktopSidebar } from './DesktopSidebar'
import { Dock } from './Dock'
import { FeaturedWindow } from './FeaturedWindow'
import { MenuBar } from './MenuBar'

function DebugPanel() {
  const [visible, setVisible] = useState(false)
  const windows = useWindowStore((state) => state.windows)
  const openWindow = useWindowStore((state) => state.openWindow)
  const closeWindow = useWindowStore((state) => state.closeWindow)
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow)
  const restoreWindow = useWindowStore((state) => state.restoreWindow)
  const focusWindow = useWindowStore((state) => state.focusWindow)

  if (!import.meta.env.DEV) return null

  return (
    <div className="absolute bottom-20 left-2 z-[9999]">
      <button
        type="button"
        className="retro-border bg-[var(--color-retro-yellow)] px-2 py-0.5 text-[10px] font-bold"
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? 'Hide Dev' : 'Dev'}
      </button>
      {visible && (
        <aside className="retro-border retro-shadow mt-1 max-h-64 w-64 overflow-y-auto bg-[var(--color-retro-white)] p-2 font-mono text-[10px]">
          {windows.map((window) => (
            <div key={window.id} className="mb-2 border border-[var(--color-retro-grid)] p-1.5">
              <p className="font-bold">{window.title}</p>
              <pre className="mt-1 whitespace-pre-wrap opacity-70">
                {JSON.stringify(
                  {
                    state: window.state,
                    x: window.position.x,
                    y: window.position.y,
                    zIndex: window.zIndex,
                  },
                  null,
                  0,
                )}
              </pre>
              <div className="mt-1 flex flex-wrap gap-1">
                {(['Open', 'Close', 'Min', 'Restore', 'Focus'] as const).map((action) => {
                  const handlers = {
                    Open: () => openWindow(window.id),
                    Close: () => closeWindow(window.id),
                    Min: () => minimizeWindow(window.id),
                    Restore: () => restoreWindow(window.id),
                    Focus: () => focusWindow(window.id),
                  }
                  return (
                    <button
                      key={action}
                      type="button"
                      className="retro-border cursor-pointer bg-[var(--color-retro-grey)] px-1 py-0.5 text-[9px] font-bold hover:bg-[var(--color-retro-yellow)]"
                      onClick={handlers[action]}
                    >
                      {action}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </aside>
      )}
    </div>
  )
}

export function Desktop() {
  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden">
      <div className="desktop-wallpaper absolute inset-0" aria-hidden="true" />

      <MenuBar />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden pb-24 pt-4">
        <FeaturedWindow />
        <DesktopSidebar />
      </main>

      <Dock />
      <DebugPanel />
    </div>
  )
}
