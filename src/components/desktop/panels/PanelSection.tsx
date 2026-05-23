import type { ReactNode } from 'react'

export type PanelAccent = 'yellow' | 'blue' | 'mint' | 'project'

interface PanelSectionProps {
  title: string
  accent?: PanelAccent
  children: ReactNode
  className?: string
}

export function PanelSection({
  title,
  accent = 'blue',
  children,
  className = '',
}: PanelSectionProps) {
  return (
    <section className={`retro-panel-section ${className}`.trim()}>
      <h3 className={`retro-panel-section__title retro-panel-section__title--${accent}`}>
        {title}
      </h3>
      <div className="retro-panel-section__body">{children}</div>
    </section>
  )
}

export const TAG_ACCENTS: PanelAccent[] = ['yellow', 'blue', 'mint', 'project']

export function getTagAccent(index: number): PanelAccent {
  return TAG_ACCENTS[index % TAG_ACCENTS.length]
}
