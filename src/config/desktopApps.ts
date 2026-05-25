import type { DesktopApp, Position } from '../types/desktop'
import { INTERNSHIPS } from './internships'
import { PROJECTS } from './projects'
import { SITE } from './site'

/** Grille d'icônes du bureau (colonne gauche pour apps/projets, droite pour stages). */
const ICON_LAYOUT = {
  columnX: 24,
  rightMargin: 24,
  iconWidth: 88,
  startY: 16,
  rowHeight: 100,
} as const

function getColumnX(side: 'left' | 'right'): number {
  if (side === 'left') return ICON_LAYOUT.columnX
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  return viewportWidth - ICON_LAYOUT.iconWidth - ICON_LAYOUT.rightMargin
}

export function getDefaultIconPosition(index: number, side: 'left' | 'right' = 'left'): Position {
  return {
    x: getColumnX(side),
    y: ICON_LAYOUT.startY + index * ICON_LAYOUT.rowHeight,
  }
}

function withPosition(
  app: Omit<DesktopApp, 'defaultPosition' | 'position'>,
  index: number,
  side: 'left' | 'right' = 'left',
  offset?: Partial<Position>,
): DesktopApp {
  const base = getDefaultIconPosition(index, side)
  const position = {
    x: base.x + (offset?.x ?? 0),
    y: base.y + (offset?.y ?? 0),
  }
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

  const internshipApps = INTERNSHIPS.map((internship, index) =>
    withPosition(
      {
        id: `internship-${internship.slug}`,
        type: 'internship' as const,
        title: internship.title,
        icon: internship.icon ?? 'internship-default',
        project: internship,
      },
      index,
      'right',
      internship.iconOffset,
    ),
  )

  const projectApps: Omit<DesktopApp, 'defaultPosition' | 'position'>[] = PROJECTS.map(
    (project) => ({
      id: `project-${project.slug}`,
      type: 'project' as const,
      title: project.title,
      icon: project.icon ?? 'project-default',
      project,
    }),
  )

  return [
    ...staticApps.map((app, index) => withPosition(app, index, 'left')),
    ...internshipApps,
    ...projectApps.map((app, index) => withPosition(app, staticApps.length + index, 'left')),
  ]
}
