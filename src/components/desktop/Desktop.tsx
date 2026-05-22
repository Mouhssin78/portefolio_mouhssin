import { useState } from 'react'
import { useDesktopStore } from '../../store/useDesktopStore'
import { AppPanel } from './AppPanel'
import { DesktopIconLayer } from './DesktopIconLayer'
import { Dock } from './Dock'
import { FeaturedWindow } from './FeaturedWindow'
import { MenuBar } from './MenuBar'

function DebugPanel() {
  const [visible, setVisible] = useState(false)
  const apps = useDesktopStore((state) => state.apps)
  const activeAppId = useDesktopStore((state) => state.activeAppId)
  const openApp = useDesktopStore((state) => state.openApp)
  const closeApp = useDesktopStore((state) => state.closeApp)
  const resetIconPositions = useDesktopStore((state) => state.resetIconPositions)

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
          <p className="mb-2 font-bold">activeAppId: {activeAppId ?? 'null'}</p>
          {apps.map((app) => (
            <div key={app.id} className="mb-2 border border-[var(--color-retro-grid)] p-1.5">
              <p className="font-bold">{app.title}</p>
              <pre className="mt-1 whitespace-pre-wrap opacity-70">
                {JSON.stringify(
                  {
                    type: app.type,
                    x: app.position.x,
                    y: app.position.y,
                  },
                  null,
                  0,
                )}
              </pre>
              <div className="mt-1 flex flex-wrap gap-1">
                <button
                  type="button"
                  className="retro-border cursor-pointer bg-[var(--color-retro-grey)] px-1 py-0.5 text-[9px] font-bold hover:bg-[var(--color-retro-yellow)]"
                  onClick={() => openApp(app.id)}
                >
                  Open
                </button>
              </div>
            </div>
          ))}
          <div className="mt-2 flex flex-wrap gap-1">
            <button
              type="button"
              className="retro-border cursor-pointer bg-[var(--color-retro-grey)] px-1 py-0.5 text-[9px] font-bold hover:bg-[var(--color-retro-yellow)]"
              onClick={() => closeApp()}
            >
              Close
            </button>
            <button
              type="button"
              className="retro-border cursor-pointer bg-[var(--color-retro-grey)] px-1 py-0.5 text-[9px] font-bold hover:bg-[var(--color-retro-yellow)]"
              onClick={() => resetIconPositions()}
            >
              Reset positions
            </button>
          </div>
        </aside>
      )}
    </div>
  )
}

export function Desktop() {
  const activeAppId = useDesktopStore((state) => state.activeAppId)

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden">
      <div className="desktop-wallpaper absolute inset-0" aria-hidden="true" />

      <MenuBar />

      <main className="relative flex-1 overflow-hidden pb-24 pt-4">
        {!activeAppId && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <FeaturedWindow />
          </div>
        )}
        <DesktopIconLayer />
        <AppPanel />
      </main>

      <Dock />
      <DebugPanel />
    </div>
  )
}
