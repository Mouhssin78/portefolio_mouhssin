import { useState } from 'react'
import { SITE } from '../../config/site'
import { useClock } from '../../hooks/useClock'
import { useWindowStore } from '../../store/useWindowStore'

const FILE_ITEMS = [
  { label: 'About', appId: 'about' },
  { label: 'Projects', appId: 'portfolio' },
] as const

const CONTACT_ITEMS = [{ label: 'Email', appId: 'contact' }] as const

function MenuDropdown({
  label,
  items,
  onSelect,
}: {
  label: string
  items: readonly { label: string; appId: string }[]
  onSelect: (appId: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button type="button" className="retro-menu-item">
        {label}
      </button>
      {open && (
        <ul className="retro-border retro-shadow absolute left-0 top-full z-50 min-w-[140px] bg-[var(--color-retro-white)] py-1">
          {items.map((item) => (
            <li key={item.appId}>
              <button
                type="button"
                className="block w-full px-3 py-1.5 text-left text-[13px] font-semibold hover:bg-[var(--color-retro-yellow)]"
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
  const openWindow = useWindowStore((state) => state.openWindow)

  return (
    <header className="retro-menu-bar relative z-50 flex h-9 shrink-0 items-center justify-between px-3">
      <div className="flex items-center gap-3">
        <div
          className="retro-border h-5 w-5 shrink-0 rounded-full bg-[var(--color-retro-black)]"
          aria-hidden="true"
        />
        <span className="text-[13px] font-bold tracking-tight">{SITE.name}</span>
        <nav className="ml-2 flex items-center">
          <MenuDropdown label="File" items={FILE_ITEMS} onSelect={openWindow} />
          <MenuDropdown label="Contact" items={CONTACT_ITEMS} onSelect={openWindow} />
          <button
            type="button"
            className="retro-menu-item"
            onClick={() => openWindow('settings')}
          >
            Settings
          </button>
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
