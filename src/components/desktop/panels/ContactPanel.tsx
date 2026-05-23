import { SITE } from '../../../config/site'

function RetroLinkButton({ label, url }: { label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="retro-panel-link">
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

export function ContactPanel() {
  return (
    <article>
      <header className="retro-panel-hero">
        <h2 className="text-lg font-extrabold leading-tight">Contact</h2>
        <p className="mt-1 text-sm font-medium">Restons en contact</p>
      </header>

      <div className="retro-panel-card retro-panel-card--mint mb-4">
        <p className="mb-1 text-[11px] font-extrabold uppercase tracking-wider">Email</p>
        <a
          href={`mailto:${SITE.email}`}
          className="text-sm font-bold underline decoration-2 underline-offset-2 hover:opacity-80"
        >
          {SITE.email}
        </a>
      </div>

      <div className="retro-panel-card retro-panel-card--blue">
        <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wider">LinkedIn</p>
        <RetroLinkButton label="Voir mon profil" url={SITE.linkedinUrl} />
      </div>
    </article>
  )
}
