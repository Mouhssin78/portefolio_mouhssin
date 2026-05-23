import { create } from 'zustand'
import { buildDesktopApps } from '../config/desktopApps'
import type { DesktopApp, PanelState } from '../types/desktop'

const defaultPanelState: PanelState = {
  position: { x: 0, y: 0 },
  isMaximized: false,
  savedPosition: null,
}

interface DesktopStore {
  apps: DesktopApp[]
  activeAppId: string | null
  panelState: PanelState
  openApp: (id: string) => void
  closeApp: () => void
  updateIconPosition: (id: string, x: number, y: number) => void
  resetIconPositions: () => void
  resetDesktop: () => void
  getAppById: (id: string) => DesktopApp | undefined
  setPanelPosition: (x: number, y: number) => void
  togglePanelMaximize: () => void
  resetPanelState: () => void
}

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  apps: buildDesktopApps(),
  activeAppId: null,
  panelState: defaultPanelState,

  openApp: (id) => {
    const app = get().apps.find((entry) => entry.id === id)
    if (!app) return

    if (app.type === 'external' && app.url) {
      window.open(app.url, '_blank', 'noopener,noreferrer')
      return
    }

    set({ activeAppId: id, panelState: defaultPanelState })
  },

  closeApp: () => {
    set({ activeAppId: null, panelState: defaultPanelState })
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
      panelState: defaultPanelState,
      apps: state.apps.map((app) => ({
        ...app,
        position: { ...app.defaultPosition },
      })),
    }))
  },

  getAppById: (id) => {
    return get().apps.find((app) => app.id === id)
  },

  setPanelPosition: (x, y) => {
    set((state) => ({
      panelState: {
        ...state.panelState,
        position: { x, y },
      },
    }))
  },

  togglePanelMaximize: () => {
    set((state) => {
      if (state.panelState.isMaximized) {
        return {
          panelState: {
            ...state.panelState,
            isMaximized: false,
            position: state.panelState.savedPosition ?? state.panelState.position,
            savedPosition: null,
          },
        }
      }

      return {
        panelState: {
          ...state.panelState,
          isMaximized: true,
          savedPosition: { ...state.panelState.position },
        },
      }
    })
  },

  resetPanelState: () => {
    set({ panelState: defaultPanelState })
  },
}))
