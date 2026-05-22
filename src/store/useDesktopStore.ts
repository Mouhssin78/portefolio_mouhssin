import { create } from 'zustand'
import { buildDesktopApps } from '../config/desktopApps'
import type { DesktopApp } from '../types/desktop'

interface DesktopStore {
  apps: DesktopApp[]
  activeAppId: string | null
  openApp: (id: string) => void
  closeApp: () => void
  updateIconPosition: (id: string, x: number, y: number) => void
  resetIconPositions: () => void
  resetDesktop: () => void
  getAppById: (id: string) => DesktopApp | undefined
}

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  apps: buildDesktopApps(),
  activeAppId: null,

  openApp: (id) => {
    const app = get().apps.find((entry) => entry.id === id)
    if (!app) return

    if (app.type === 'external' && app.url) {
      window.open(app.url, '_blank', 'noopener,noreferrer')
      return
    }

    set({ activeAppId: id })
  },

  closeApp: () => {
    set({ activeAppId: null })
  },

  updateIconPosition: (id, x, y) => {
    set((state) => ({
      apps: state.apps.map((app) =>
        app.id === id ? { ...app, position: { x, y } } : app,
      ),
    }))
  },

  resetIconPositions: () => {
    set((state) => ({
      apps: state.apps.map((app) => ({
        ...app,
        position: { ...app.defaultPosition },
      })),
    }))
  },

  resetDesktop: () => {
    set((state) => ({
      activeAppId: null,
      apps: state.apps.map((app) => ({
        ...app,
        position: { ...app.defaultPosition },
      })),
    }))
  },

  getAppById: (id) => {
    return get().apps.find((app) => app.id === id)
  },
}))
