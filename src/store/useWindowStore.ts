import { create } from 'zustand'
import { APPLICATIONS, CASCADE_OFFSET } from '../config/applications'
import type { AppWindow, WindowState } from '../types/window'

const INITIAL_Z_INDEX = 100

interface WindowStore {
  windows: AppWindow[]
  maxZIndex: number
  openCount: number
  openWindow: (id: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  focusWindow: (id: string) => void
  updatePosition: (id: string, x: number, y: number) => void
  closeAll: () => void
  getOpenWindows: () => AppWindow[]
  getWindowById: (id: string) => AppWindow | undefined
}

function createInitialWindows(): AppWindow[] {
  return APPLICATIONS.map((app) => ({
    ...app,
    state: 'closed' as WindowState,
    position: { ...app.defaultPosition },
    zIndex: INITIAL_Z_INDEX,
  }))
}

function getCascadePosition(
  defaultPosition: AppWindow['defaultPosition'],
  openCount: number,
): AppWindow['position'] {
  const offset = (openCount % 5) * CASCADE_OFFSET
  return {
    x: defaultPosition.x + offset,
    y: defaultPosition.y + offset,
  }
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: createInitialWindows(),
  maxZIndex: INITIAL_Z_INDEX,
  openCount: 0,

  openWindow: (id) => {
    set((state) => {
      const nextZIndex = state.maxZIndex + 1
      const nextOpenCount = state.openCount + 1

      return {
        maxZIndex: nextZIndex,
        openCount: nextOpenCount,
        windows: state.windows.map((window) => {
          if (window.id !== id) return window

          return {
            ...window,
            state: 'open',
            zIndex: nextZIndex,
            position: getCascadePosition(window.defaultPosition, nextOpenCount - 1),
          }
        }),
      }
    })
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, state: 'closed' } : window,
      ),
    }))
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, state: 'minimized' } : window,
      ),
    }))
  },

  restoreWindow: (id) => {
    set((state) => {
      const nextZIndex = state.maxZIndex + 1

      return {
        maxZIndex: nextZIndex,
        windows: state.windows.map((window) =>
          window.id === id
            ? { ...window, state: 'open', zIndex: nextZIndex }
            : window,
        ),
      }
    })
  },

  focusWindow: (id) => {
    set((state) => {
      const nextZIndex = state.maxZIndex + 1

      return {
        maxZIndex: nextZIndex,
        windows: state.windows.map((window) =>
          window.id === id ? { ...window, zIndex: nextZIndex } : window,
        ),
      }
    })
  },

  updatePosition: (id, x, y) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id ? { ...window, position: { x, y } } : window,
      ),
    }))
  },

  closeAll: () => {
    set((state) => ({
      windows: state.windows.map((window) => ({ ...window, state: 'closed' as WindowState })),
    }))
  },

  getOpenWindows: () => {
    return get().windows.filter(
      (window) => window.state === 'open' || window.state === 'minimized',
    )
  },

  getWindowById: (id) => {
    return get().windows.find((window) => window.id === id)
  },
}))
