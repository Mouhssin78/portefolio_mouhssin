export type AppType = 'about' | 'contact' | 'external' | 'project'

export interface Position {
  x: number
  y: number
}

export interface PanelState {
  position: Position
  isMaximized: boolean
  savedPosition: Position | null
}

export interface ProjectDetail {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  technologies: string[]
  links?: { label: string; url: string }[]
  image?: string
  /** Clé d'icône SVG (`project-default`) ou chemin asset (`/icons/...`). */
  icon?: string
}

export interface DesktopApp {
  id: string
  type: AppType
  title: string
  icon: string
  defaultPosition: Position
  position: Position
  url?: string
  project?: ProjectDetail
}
