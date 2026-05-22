import { SITE } from '../../config/site'

export function FeaturedWindow() {
  return (
    <div className="retro-window relative w-[min(92vw,420px)]">
      <div className="retro-window-titlebar">
        <button type="button" className="retro-close-btn" aria-label="Fermer">
          ×
        </button>
        <span>{SITE.featuredTitle}</span>
        <div className="retro-window-controls" aria-hidden="true">
          <span className="retro-window-control" />
          <span className="retro-window-control" />
        </div>
      </div>

      <div className="relative overflow-hidden bg-[var(--color-retro-blue)] p-6">
        <div className="relative mx-auto aspect-[4/3] max-w-[320px]">
          <div className="absolute bottom-4 left-1/2 h-4 w-48 -translate-x-1/2 border-2 border-[var(--color-retro-black)] bg-[var(--color-retro-yellow)]" />
          <div className="absolute bottom-8 left-[28%] h-16 w-10 border-2 border-[var(--color-retro-black)] bg-[#e85555]" />
          <div className="absolute bottom-8 left-[42%] h-20 w-14 rounded-full border-2 border-[var(--color-retro-black)] bg-[var(--color-retro-mint)]" />
          <div className="absolute bottom-8 right-[28%] h-14 w-14 rotate-12 border-2 border-[var(--color-retro-black)] bg-[var(--color-retro-yellow)]" />
          <div className="absolute bottom-8 right-[18%] h-24 w-8 border-2 border-[var(--color-retro-black)] bg-[var(--color-retro-white)]" />
        </div>

        <p className="mt-4 text-center text-sm font-bold leading-snug">
          {SITE.name}
          <br />
          <span className="font-semibold opacity-80">{SITE.tagline}</span>
        </p>

        <span className="retro-badge-new">NEW!</span>
      </div>
    </div>
  )
}
