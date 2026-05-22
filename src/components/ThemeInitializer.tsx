import { useEffect } from 'react'
import { applyTheme } from '../config/themes'
import { useThemeStore } from '../store/useThemeStore'

/** Réapplique le thème sauvegardé au chargement (avant la réhydratation persist). */
export function ThemeInitializer() {
  useEffect(() => {
    applyTheme(useThemeStore.getState().themeId)
  }, [])

  return null
}
