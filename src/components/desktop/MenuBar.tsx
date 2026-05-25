import { useMemo, useState } from 'react'
import { SITE } from '../../config/site'
import { useClock } from '../../hooks/useClock'
import { useCoarsePointer } from '../../hooks/useCoarsePointer'
import { useDesktopStore } from '../../store/useDesktopStore'

function MenuDropdown({
  label,
  items,
  onSelect,
}: {
  label: string
  items: readonly { label: string; appId: string }[]
  onSelect: (appId: string) => void
}) {
  const isCoarsePointer = useCoarsePointer()
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={isCoarsePointer ? undefined : () => setOpen(true)}
      onMouseLeave={isCoarsePointer ? undefined : () => setOpen(false)}
    >
      <button
        type="button"
        className="retro-menu-item touch-manipulation"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={isCoarsePointer ? () => setOpen((value) => !value) : undefined}
      >
        {label}
      </button>
      {open && (
        <ul className="retro-border retro-shadow absolute left-0 top-full z-50 min-w-[140px] bg-[var(--color-retro-white)] py-1">
          {items.map((item) => (
            <li key={item.appId}>
              <button
                type="button"
                className="block w-full touch-manipulation px-3 py-1.5 text-left text-[13px] font-semibold hover:bg-[var(--color-retro-yellow)]"
                onClick={() => {
                  onSelect(item.appId)
                  setOpen(false)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function MenuBar() {
  const clock = useClock()
  const apps = useDesktopStore((state) => state.apps)
  const openApp = useDesktopStore((state) => state.openApp)

  const fileItems = useMemo(() => {
    const about = { label: 'About', appId: 'about' }
    const projects = apps
      .filter((app) => app.type === 'project')
      .map((app) => ({ label: app.title, appId: app.id }))
    return [about, ...projects]
  }, [apps])

  const contactItems = useMemo(
    () => [
      { label: 'Email', appId: 'contact' },
      { label: 'LinkedIn', appId: 'linkedin' },
    ],
    [],
  )

  return (
    <header className="retro-menu-bar relative z-50 flex h-9 shrink-0 items-center justify-between px-3">
      <div className="flex items-center gap-3">
        <div
          className="retro-border h-5 w-5 shrink-0 rounded-full bg-[var(--color-retro-black)]"
          aria-hidden="true"
        />
        <span className="text-[13px] font-bold tracking-tight">{SITE.name}</span>
        <nav className="ml-2 flex items-center">
          <MenuDropdown label="File" items={fileItems} onSelect={openApp} />
          <MenuDropdown label="Contact" items={contactItems} onSelect={openApp} />
        </nav>
      </div>

      <div className="flex items-center gap-4 text-[12px] font-semibold">
        <a
          href={`mailto:${SITE.email}`}
          className="hidden hover:underline sm:inline"
        >
          {SITE.email}
        </a>
        <a
          href={`mailto:${SITE.email}`}
          className="retro-border flex h-5 w-5 items-center justify-center bg-[var(--color-retro-white)] text-[10px]"
          aria-label="Email"
          title="Email"
        >
          ✉
        </a>
        <div
          className="retro-border flex h-5 w-7 items-center justify-center bg-[var(--color-retro-white)] px-0.5"
          aria-label="Batterie"
          title="Batterie"
        >
          <div className="h-2.5 w-4 border border-[var(--color-retro-black)] bg-[var(--color-retro-mint)]" />
        </div>
        <time className="tabular-nums">{clock}</time>
      </div>
    </header>
  )
}
