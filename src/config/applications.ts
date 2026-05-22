import type { AppDefinition } from '../types/window'

const CASCADE_OFFSET = 30

export { CASCADE_OFFSET }

export const APPLICATIONS: AppDefinition[] = [
  {
    id: 'about',
    title: 'À propos — Mouhssin RABIHI',
    icon: '👤',
    defaultPosition: { x: 80, y: 60 },
    defaultSize: { width: 480, height: 360 },
  },
  {
    id: 'portfolio',
    title: 'Mes Projets',
    icon: '💼',
    defaultPosition: { x: 80 + CASCADE_OFFSET, y: 60 + CASCADE_OFFSET },
    defaultSize: { width: 560, height: 420 },
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: '✉️',
    defaultPosition: { x: 80 + CASCADE_OFFSET * 2, y: 60 + CASCADE_OFFSET * 2 },
    defaultSize: { width: 440, height: 380 },
  },
  {
    id: 'settings',
    title: 'Personnalisation',
    icon: '⚙️',
    defaultPosition: { x: 80 + CASCADE_OFFSET * 3, y: 60 + CASCADE_OFFSET * 3 },
    defaultSize: { width: 400, height: 320 },
  },
]
