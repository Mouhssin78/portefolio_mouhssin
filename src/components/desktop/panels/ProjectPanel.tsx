import type { ProjectDetail } from '../../../types/desktop'
import { IconFolder, PROJECT_FOLDER_FILL } from '../icons/IconFolder'
import { getTagAccent, PanelSection } from './PanelSection'

function RetroLinkButton({ label, url }: { label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="retro-panel-link">
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

const STEP_LINE = /^\d+\.\s/
const STEPS_HEADER = /^Étapes du projet\s*:?\s*$/i

interface DescriptionBlock {
  type: 'paragraph' | 'steps-header' | 'steps'
  content: string | string[]
}

function parseLongDescription(text: string): DescriptionBlock[] {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
  const blocks: DescriptionBlock[] = []
  let stepItems: string[] = []

  const flushSteps = () => {
    if (stepItems.length > 0) {
      blocks.push({ type: 'steps', content: stepItems })
      stepItems = []
    }
  }

  for (const line of lines) {
    if (STEPS_HEADER.test(line)) {
      flushSteps()
      blocks.push({ type: 'steps-header', content: line.replace(/:$/, '') })
      continue
    }

    if (STEP_LINE.test(line)) {
      stepItems.push(line.replace(STEP_LINE, ''))
      continue
    }

    flushSteps()
    blocks.push({ type: 'paragraph', content: line })
  }

  flushSteps()
  return blocks
}

function DescriptionContent({ text }: { text: string }) {
  const blocks = parseLongDescription(text)

  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return <p key={index}>{block.content as string}</p>
        }

        if (block.type === 'steps-header') {
          return (
            <p key={index} className="pt-1 font-bold">
              {block.content as string}
            </p>
          )
        }

        return (
          <ol key={index} className="retro-panel-steps">
            {(block.content as string[]).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        )
      })}
    </div>
  )
}

export function ProjectPanel({ project }: { project: ProjectDetail }) {
  const validLinks = project.links?.filter((link) => link.label.trim() && link.url.trim()) ?? []

  return (
    <article>
      <header className="retro-panel-hero flex items-start gap-3">
        <div className="retro-border shrink-0 bg-[var(--color-retro-white)] p-1">
          <IconFolder fill={PROJECT_FOLDER_FILL} />
        </div>
        <div className="min-w-0 pt-0.5">
          <h2 className="text-lg font-extrabold leading-tight">{project.title}</h2>
          <p className="mt-1 text-sm font-medium leading-snug">{project.shortDescription}</p>
        </div>
      </header>

      {project.image && (
        <img
          src={project.image}
          alt={`Aperçu — ${project.title}`}
          className="retro-border retro-shadow mb-4 aspect-[16/9] w-full object-cover"
        />
      )}

      <PanelSection title="Description" accent="blue">
        <DescriptionContent text={project.longDescription} />
      </PanelSection>

      <PanelSection title="Stack" accent="mint">
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <li key={tech} className={`retro-tag retro-tag--${getTagAccent(index)}`}>
              {tech}
            </li>
          ))}
        </ul>
      </PanelSection>

      {validLinks.length > 0 && (
        <PanelSection title="Liens" accent="yellow">
          <div className="flex flex-wrap gap-2">
            {validLinks.map((link) => (
              <RetroLinkButton key={link.url} label={link.label} url={link.url} />
            ))}
          </div>
        </PanelSection>
      )}
    </article>
  )
}
