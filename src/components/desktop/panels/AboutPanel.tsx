import { INTERNSHIPS } from '../../../config/internships'
import { PROJECTS } from '../../../config/projects'
import { SITE } from '../../../config/site'
import { useDesktopStore } from '../../../store/useDesktopStore'
import { getTagAccent, PanelSection } from './PanelSection'

function RetroLinkButton({ label, url }: { label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="retro-panel-link">
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

function RetroAppButton({ label, appId }: { label: string; appId: string }) {
  const openApp = useDesktopStore((state) => state.openApp)

  return (
    <button type="button" className="retro-panel-link" onClick={() => openApp(appId)}>
      {label}
    </button>
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
        <div className="space-y-3 text-sm leading-relaxed">
          {SITE.about.presentation.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Compétences principales" accent="mint">
        <ul className="flex flex-wrap gap-2">
          {SITE.skills.map((skill, index) => (
            <li key={skill} className={`retro-tag retro-tag--${getTagAccent(index)}`}>
              {skill}
            </li>
          ))}
        </ul>
      </PanelSection>

      <PanelSection title="Domaines d'intérêt" accent="yellow">
        <ul className="flex flex-wrap gap-2">
          {SITE.about.interests.map((interest, index) => (
            <li key={interest} className={`retro-tag retro-tag--${getTagAccent(index)}`}>
              {interest}
            </li>
          ))}
        </ul>
      </PanelSection>

      <PanelSection title="Impacts clés" accent="project">
        <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed">
          {SITE.about.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </PanelSection>

      <PanelSection title="Projets personnels" accent="blue">
        <p className="mb-3 text-sm leading-relaxed">{SITE.about.personalProjectsIntro}</p>
        <div className="flex flex-wrap gap-2">
          {PROJECTS.map((project) => (
            <RetroAppButton
              key={project.slug}
              label={project.title}
              appId={`project-${project.slug}`}
            />
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Projets professionnels" accent="mint">
        <p className="mb-3 text-sm leading-relaxed">{SITE.about.professionalProjectsIntro}</p>
        <div className="flex flex-wrap gap-2">
          {INTERNSHIPS.map((internship) => (
            <RetroAppButton
              key={internship.slug}
              label={internship.title}
              appId={`internship-${internship.slug}`}
            />
          ))}
        </div>
      </PanelSection>

      <PanelSection title="LinkedIn" accent="yellow">
        <RetroLinkButton label="Voir mon profil" url={SITE.linkedinUrl} />
      </PanelSection>
    </article>
  )
}
