export type WindowState = 'closed' | 'open' | 'minimized'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface AppDefinition {
  id: string
  title: string
  icon: string
  defaultPosition: Position
  defaultSize: Size
}

export interface AppWindow extends AppDefinition {
  state: WindowState
  position: Position
  zIndex: number
}
