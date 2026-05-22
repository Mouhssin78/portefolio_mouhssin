import type { ProjectDetail } from '../types/desktop'

export const PROJECTS: ProjectDetail[] = [
  {
    slug: 'retro-os-portfolio',
    title: 'Retro OS Portfolio',
    shortDescription:
      'Portfolio interactif inspiré des interfaces vintage — bureau, icônes draggables et fenêtres rétro.',
    longDescription: `Ce projet est mon portfolio personnel, conçu comme un mini système d'exploitation rétro. L'utilisateur explore mes projets et informations via un bureau illustré, avec une barre de menu, un dock et des icônes déplaçables.

L'objectif était de créer une expérience mémorable et ludique, tout en restant performante et accessible. Chaque projet apparaît comme une icône sur le bureau et s'ouvre dans un panneau centré au style fenêtre classique.`,
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand'],
    links: [
      { label: 'GitHub', url: 'https://github.com/mouhssin-rabihi' },
      { label: 'Demo', url: 'https://mouhssin-rabihi.com' },
    ],
  },
]
