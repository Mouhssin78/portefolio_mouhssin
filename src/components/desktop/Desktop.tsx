import { SITE } from '../../config/site'
import { AppPanel } from './AppPanel'
import { DesktopIconLayer } from './DesktopIconLayer'
import { Dock } from './Dock'
import { FakeStopButton } from './FakeStopButton'
import { MenuBar } from './MenuBar'

export function Desktop() {
  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden" data-desktop-root>
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
