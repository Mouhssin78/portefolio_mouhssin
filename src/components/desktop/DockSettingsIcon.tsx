import { useEffect, useRef, useState } from 'react'
import settingsIcon from '@images/settings.png'
import { getAlternativeThemes } from '../../config/themes'
import { useThemeStore } from '../../store/useThemeStore'

export function DockSettingsIcon() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const themeId = useThemeStore((state) => state.themeId)
  const setTheme = useThemeStore((state) => state.setTheme)
  const alternativeThemes = getAlternativeThemes(themeId)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return
      setOpen(false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const handleThemePick = (id: (typeof alternativeThemes)[number]['id']) => {
    setTheme(id)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      {open && (
        <div
          role="menu"
          aria-label="Choisir un thème"
          className="retro-border retro-shadow absolute bottom-[calc(100%+10px)] left-1/2 z-40 w-36 -translate-x-1/2 bg-[var(--color-retro-white)] p-2"
        >
          <p className="mb-2 text-center text-[9px] font-extrabold uppercase tracking-wide">
            Thèmes
          </p>
          <ul className="flex flex-col gap-1.5">
            {alternativeThemes.map((theme) => (
              <li key={theme.id}>
                <button
                  type="button"
                  role="menuitem"
                  className="retro-border flex w-full cursor-pointer items-center gap-2 bg-[var(--color-retro-grey)] px-2 py-1.5 text-left hover:bg-[var(--color-retro-yellow)]"
                  onClick={() => handleThemePick(theme.id)}
                >
                  <span className="flex shrink-0 gap-0.5" aria-hidden="true">
                    <span
                      className="retro-border h-4 w-4"
                      style={{ backgroundColor: theme.colors['--color-retro-bg'] }}
                    />
                    <span
                      className="retro-border h-4 w-4"
                      style={{ backgroundColor: theme.colors['--color-retro-yellow'] }}
                    />
                    <span
                      className="retro-border h-4 w-4"
                      style={{ backgroundColor: theme.colors['--color-retro-blue'] }}
                    />
                  </span>
                  <span className="text-[10px] font-bold leading-tight">{theme.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <div
            className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-[var(--color-retro-black)] bg-[var(--color-retro-white)]"
            aria-hidden="true"
          />
        </div>
      )}

      <button
        type="button"
        className="retro-dock-item touch-manipulation"
        title="Settings"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <div
          className="retro-border flex h-10 w-10 items-center justify-center bg-[var(--color-retro-yellow)]"
          aria-hidden="true"
        >
          <img
            src={settingsIcon}
            alt=""
            className="h-7 w-7 object-contain"
            draggable={false}
          />
        </div>
        <span className="retro-dock-item-label">Settings</span>
      </button>
    </div>
  )
}
