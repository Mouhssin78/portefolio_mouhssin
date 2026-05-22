export type ThemeId = 'classic' | 'mac84' | 'teal' | 'bubblegum'

export interface RetroTheme {
  id: ThemeId
  name: string
  description: string
  colors: {
    '--color-retro-bg': string
    '--color-retro-grid': string
    '--color-retro-yellow': string
    '--color-retro-black': string
    '--color-retro-white': string
    '--color-retro-grey': string
    '--color-retro-blue': string
    '--color-retro-mint': string
    '--color-retro-project': string
  }
}

export const RETRO_THEMES: RetroTheme[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Jaune chaud et grille papier — style Mariano Pascual.',
    colors: {
      '--color-retro-bg': '#e4dfd4',
      '--color-retro-grid': '#b8b2a8',
      '--color-retro-yellow': '#f7d046',
      '--color-retro-black': '#111111',
      '--color-retro-white': '#faf8f4',
      '--color-retro-grey': '#c8c4bc',
      '--color-retro-blue': '#6ec4e8',
      '--color-retro-mint': '#7ee0b8',
      '--color-retro-project': '#e85555',
    },
  },
  {
    id: 'mac84',
    name: 'Mac 84',
    description: 'Beige doux et pastels — ambiance Macintosh vintage.',
    colors: {
      '--color-retro-bg': '#d4cfc4',
      '--color-retro-grid': '#a8a398',
      '--color-retro-yellow': '#e8c840',
      '--color-retro-black': '#1a1a1a',
      '--color-retro-white': '#f5f0e8',
      '--color-retro-grey': '#b8b4ac',
      '--color-retro-blue': '#7ab8d8',
      '--color-retro-mint': '#8ed4a8',
      '--color-retro-project': '#c85848',
    },
  },
  {
    id: 'teal',
    name: 'Teal Dream',
    description: 'Bleus profonds et menthe — bureau aquatique rétro.',
    colors: {
      '--color-retro-bg': '#c8ddd8',
      '--color-retro-grid': '#8ab4ac',
      '--color-retro-yellow': '#5ec4b8',
      '--color-retro-black': '#0d2820',
      '--color-retro-white': '#eef8f4',
      '--color-retro-grey': '#a8c8c0',
      '--color-retro-blue': '#48a8c8',
      '--color-retro-mint': '#68d8a8',
      '--color-retro-project': '#e87058',
    },
  },
  {
    id: 'bubblegum',
    name: 'Bubblegum',
    description: 'Rose et lavande — pop art des années 90.',
    colors: {
      '--color-retro-bg': '#e8d4e0',
      '--color-retro-grid': '#c8a8b8',
      '--color-retro-yellow': '#f088b8',
      '--color-retro-black': '#281020',
      '--color-retro-white': '#faf0f4',
      '--color-retro-grey': '#d8b8c8',
      '--color-retro-blue': '#9888e8',
      '--color-retro-mint': '#88e8c8',
      '--color-retro-project': '#9888e8',
    },
  },
]

export const DEFAULT_THEME_ID: ThemeId = 'classic'

export function getAlternativeThemes(currentId: ThemeId): RetroTheme[] {
  return RETRO_THEMES.filter((theme) => theme.id !== currentId).slice(0, 3)
}

export function getThemeById(id: ThemeId): RetroTheme {
  return RETRO_THEMES.find((theme) => theme.id === id) ?? RETRO_THEMES[0]
}

export function applyTheme(id: ThemeId): void {
  const theme = getThemeById(id)
  const root = document.documentElement

  root.dataset.retroTheme = theme.id

  for (const [variable, value] of Object.entries(theme.colors)) {
    root.style.setProperty(variable, value)
  }
}
