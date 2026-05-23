import { SITE } from '../../config/site'
import { AppPanel } from './AppPanel'
import { DesktopIconLayer } from './DesktopIconLayer'
import { Dock } from './Dock'
import { MenuBar } from './MenuBar'

function FakeStopButton() {
  return (
    <div className="absolute bottom-20 left-2 z-[9999]">
      <button
        type="button"
        className="retro-border cursor-default bg-[var(--color-retro-yellow)] px-2 py-0.5 text-[10px] font-bold"
        aria-disabled="true"
        title="Arrêter"
      >
        Arrêter
      </button>
    </div>
  )
}

export function Desktop() {
  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden">
      <div className="desktop-wallpaper absolute inset-0" aria-hidden="true">
        <div className="desktop-wallpaper-heading">
          <p className="desktop-wallpaper-title">{SITE.name}</p>
          <p className="desktop-wallpaper-tagline">{SITE.tagline}</p>
        </div>
      </div>

      <MenuBar />

      <main className="relative flex-1 overflow-hidden pb-24 pt-4">
        <DesktopIconLayer />
        <AppPanel />
      </main>

      <Dock />
      <FakeStopButton />
    </div>
  )
}
