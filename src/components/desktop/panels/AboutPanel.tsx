import { SITE } from '../../../config/site'
import { getTagAccent, PanelSection } from './PanelSection'

function RetroLinkButton({ label, url }: { label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="retro-panel-link">
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

export function AboutPanel() {
  return (
    <article>
      <header className="retro-panel-hero">
        <h2 className="text-lg font-extrabold leading-tight">{SITE.name}</h2>
        <p className="mt-1 text-sm font-bold">{SITE.tagline}</p>
      </header>

      <PanelSection title="Présentation" accent="blue">
        <p className="text-sm leading-relaxed">{SITE.bio}</p>
      </PanelSection>

      <PanelSection title="Compétences" accent="mint">
        <ul className="flex flex-wrap gap-2">
          {SITE.skills.map((skill, index) => (
            <li key={skill} className={`retro-tag retro-tag--${getTagAccent(index)}`}>
              {skill}
            </li>
          ))}
        </ul>
      </PanelSection>

      <div className="mt-4">
        <RetroLinkButton label="LinkedIn" url={SITE.linkedinUrl} />
      </div>
    </article>
  )
}
