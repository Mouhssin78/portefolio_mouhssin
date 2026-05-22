import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { applyTheme, DEFAULT_THEME_ID, type ThemeId } from '../config/themes'

interface ThemeStore {
  themeId: ThemeId
  setTheme: (id: ThemeId) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeId: DEFAULT_THEME_ID,
      setTheme: (themeId) => {
        applyTheme(themeId)
        set({ themeId })
      },
    }),
    {
      name: 'portfolio-retro-theme',
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.themeId)
      },
    },
  ),
)
