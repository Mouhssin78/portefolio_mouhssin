import { useEffect } from 'react'
import { SITE } from '../../config/site'
import { useDesktopStore } from '../../store/useDesktopStore'
import type { DesktopApp } from '../../types/desktop'

function PanelContent({ app }: { app: DesktopApp }) {
  switch (app.type) {
    case 'about':
      return (
        <div>
          <h2 className="mb-2 text-lg font-bold">{app.title}</h2>
          <p className="text-sm opacity-80">À compléter — étape 5</p>
        </div>
      )
    case 'contact':
      return (
        <div>
          <h2 className="mb-2 text-lg font-bold">{app.title}</h2>
          <p className="text-sm">
            Email :{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="font-bold underline hover:opacity-80"
            >
              {SITE.email}
            </a>
          </p>
        </div>
      )
    case 'project':
      if (!app.project) return null
      return (
        <div>
          <h2 className="mb-2 text-lg font-bold">{app.project.title}</h2>
          <p className="mb-4 text-sm">{app.project.shortDescription}</p>
          <ul className="flex flex-wrap gap-2">
            {app.project.technologies.map((tech) => (
              <li
                key={tech}
                className="retro-border bg-[var(--color-retro-grey)] px-2 py-0.5 text-xs font-bold"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )
    default:
      return null
  }
}

export function AppPanel() {
  const activeAppId = useDesktopStore((state) => state.activeAppId)
  const closeApp = useDesktopStore((state) => state.closeApp)
  const getAppById = useDesktopStore((state) => state.getAppById)

  const app = activeAppId ? getAppById(activeAppId) : undefined

  useEffect(() => {
    if (!app) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeApp()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [app, closeApp])

  if (!app || app.type === 'external') return null

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-panel-title"
        className="retro-window pointer-events-auto w-[min(92vw,520px)]"
      >
        <div className="retro-window-titlebar">
          <div className="retro-window-controls" aria-hidden="true">
            <span className="retro-window-control" />
            <span className="retro-window-control" />
          </div>
          <span id="app-panel-title">{app.title}</span>
          <button
            type="button"
            className="retro-close-btn"
            aria-label="Fermer"
            onClick={closeApp}
          >
            ×
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          <PanelContent app={app} />
        </div>
      </div>
    </div>
  )
}
