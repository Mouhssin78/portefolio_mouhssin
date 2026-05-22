import type { ProjectDetail } from '../../../types/desktop'
import { IconFolder, PROJECT_FOLDER_FILL } from '../icons/IconFolder'

function RetroLinkButton({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="retro-border retro-shadow inline-flex items-center gap-1.5 bg-[var(--color-retro-yellow)] px-3 py-1.5 text-xs font-bold transition-transform hover:-translate-y-0.5"
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

function ProjectImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="retro-border mb-5 overflow-hidden bg-[var(--color-retro-blue)]">
      <div className="relative flex aspect-[16/9] items-end justify-center overflow-hidden p-4">
        <div className="relative h-full w-full max-w-[260px]">
          <div className="absolute bottom-2 left-1/2 h-3 w-[85%] -translate-x-1/2 border-2 border-[var(--color-retro-black)] bg-[var(--color-retro-yellow)]" />
          <div className="absolute bottom-5 left-[22%] h-12 w-8 border-2 border-[var(--color-retro-black)] bg-[var(--color-retro-project)]" />
          <div className="absolute bottom-5 left-[38%] h-14 w-10 rounded-full border-2 border-[var(--color-retro-black)] bg-[var(--color-retro-mint)]" />
          <div className="absolute bottom-5 right-[30%] h-10 w-10 rotate-12 border-2 border-[var(--color-retro-black)] bg-[var(--color-retro-yellow)]" />
          <div className="absolute bottom-5 right-[18%] h-16 w-6 border-2 border-[var(--color-retro-black)] bg-[var(--color-retro-white)]" />
        </div>
      </div>
      <p className="border-t-2 border-[var(--color-retro-black)] bg-[var(--color-retro-grey)] px-3 py-1.5 text-center text-[10px] font-extrabold uppercase tracking-wide">
        {title}
      </p>
    </div>
  )
}

export function ProjectPanel({ project }: { project: ProjectDetail }) {
  const paragraphs = project.longDescription.split('\n').filter(Boolean)

  return (
    <article>
      <header className="mb-4 flex items-start gap-3">
        <div className="retro-border shrink-0 bg-[var(--color-retro-white)] p-1">
          <IconFolder fill={PROJECT_FOLDER_FILL} />
        </div>
        <div className="min-w-0 pt-1">
          <h2 className="text-lg font-extrabold leading-tight">{project.title}</h2>
          <p className="mt-1 text-sm font-medium leading-snug opacity-75">
            {project.shortDescription}
          </p>
        </div>
      </header>

      {project.image ? (
        <img
          src={project.image}
          alt={`Aperçu — ${project.title}`}
          className="retro-border retro-shadow mb-5 aspect-[16/9] w-full object-cover"
        />
      ) : (
        <ProjectImagePlaceholder title={project.title} />
      )}

      <section className="mb-5">
        <h3 className="mb-2 text-[11px] font-extrabold uppercase tracking-wider opacity-60">
          Description
        </h3>
        <div className="space-y-3 text-sm leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h3 className="mb-2 text-[11px] font-extrabold uppercase tracking-wider opacity-60">
          Stack
        </h3>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="retro-border bg-[var(--color-retro-grey)] px-2.5 py-1 text-xs font-bold"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {project.links && project.links.length > 0 && (
        <section>
          <h3 className="mb-2 text-[11px] font-extrabold uppercase tracking-wider opacity-60">
            Liens
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <RetroLinkButton key={link.url} label={link.label} url={link.url} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
