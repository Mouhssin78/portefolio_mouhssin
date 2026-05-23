import type { DesktopApp, Position } from '../types/desktop'
import { PROJECTS } from './projects'
import { SITE } from './site'

/** Grille d'icônes alignées à gauche du bureau (colonne unique). */
const ICON_LAYOUT = {
  columnX: 24,
  startY: 16,
  rowHeight: 100,
} as const

export function getDefaultIconPosition(index: number): Position {
  return {
    x: ICON_LAYOUT.columnX,
    y: ICON_LAYOUT.startY + index * ICON_LAYOUT.rowHeight,
  }
}

function withPosition(
  app: Omit<DesktopApp, 'defaultPosition' | 'position'>,
  index: number,
): DesktopApp {
  const position = getDefaultIconPosition(index)
  return {
    ...app,
    defaultPosition: position,
    position: { ...position },
  }
}

export function buildDesktopApps(): DesktopApp[] {
  const staticApps: Omit<DesktopApp, 'defaultPosition' | 'position'>[] = [
    {
      id: 'about',
      type: 'about',
      title: 'About',
      icon: 'about',
    },
    {
      id: 'contact',
      type: 'contact',
      title: 'Contact',
      icon: 'contact',
    },
    {
      id: 'linkedin',
      type: 'external',
      title: 'LinkedIn',
      icon: 'linkedin',
      url: SITE.linkedinUrl,
    },
  ]

  const projectApps: Omit<DesktopApp, 'defaultPosition' | 'position'>[] = PROJECTS.map(
    (project) => ({
      id: `project-${project.slug}`,
      type: 'project' as const,
      title: project.title,
      icon: project.icon ?? 'project-default',
      project,
    }),
  )

  return [...staticApps, ...projectApps].map(withPosition)
}
